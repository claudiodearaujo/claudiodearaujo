import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// The published Content-Security-Policy lists a hash per inline script instead of
// allowing 'unsafe-inline'. Those scripts come from index.html and from Angular's
// hydration bootstrap, so an Angular upgrade can change them. This gate compares
// the built output against the committed list and fails the build on a mismatch,
// which turns a silent production breakage into a local one.
//
// Run with --update to record the current hashes after an intentional change.

const root = process.cwd();
const manifestFile = path.join(root, 'tools', 'launch', 'csp-script-hashes.json');
const shouldUpdate = process.argv.includes('--update');

const angularConfig = JSON.parse(await readFile(path.join(root, 'angular.json'), 'utf8'));
const [projectName, project] = Object.entries(angularConfig.projects)[0];
const configured = project.architect.build.options.outputPath;
const browserRoot = path.join(
  root,
  configured ? path.join(configured, 'browser') : path.join('dist', projectName, 'browser'),
);

// Data blocks such as application/ld+json and application/json are not scripts
// and are not subject to script-src, so only executable types are hashed.
const executableTypes = new Set(['', 'text/javascript', 'module', 'application/javascript']);

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const found = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(directory, entry.name);
      if (entry.isDirectory()) return htmlFiles(full);
      return full.endsWith('.html') ? [full] : [];
    }),
  );
  return found.flat();
}

const hashes = new Set();
for (const file of await htmlFiles(browserRoot)) {
  const html = await readFile(file, 'utf8');
  for (const [, attributes, body] of html.matchAll(
    /<script(?![^>]*\ssrc=)([^>]*)>([\s\S]*?)<\/script>/g,
  )) {
    const type = (attributes.match(/\stype\s*=\s*"([^"]*)"/i)?.[1] ?? '').toLowerCase();
    if (!executableTypes.has(type)) continue;
    hashes.add(`sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}`);
  }
}

const current = [...hashes].sort();

if (shouldUpdate) {
  await writeFile(manifestFile, `${JSON.stringify(current, null, 2)}\n`, 'utf8');
  console.log(
    `Recorded ${current.length} inline script hash(es) in ${path.basename(manifestFile)}.`,
  );
  console.log('Copy them into the script-src directive in render.yaml:');
  for (const hash of current) console.log(`  '${hash}'`);
  process.exit(0);
}

let expected;
try {
  expected = JSON.parse(await readFile(manifestFile, 'utf8'));
} catch {
  console.error(
    `Missing ${manifestFile}. Run \`npm run csp:update\` and copy the hashes into render.yaml.`,
  );
  process.exit(1);
}

const missing = current.filter((hash) => !expected.includes(hash));
const stale = expected.filter((hash) => !current.includes(hash));
const policy = await readFile(path.join(root, 'render.yaml'), 'utf8');
const unpublished = current.filter((hash) => !policy.includes(hash));

if (missing.length || stale.length || unpublished.length) {
  console.error('\nInline script hashes no longer match the published policy:');
  for (const hash of missing) console.error(`- built but not recorded: ${hash}`);
  for (const hash of stale) console.error(`- recorded but no longer built: ${hash}`);
  for (const hash of unpublished) console.error(`- missing from render.yaml script-src: ${hash}`);
  console.error('\nRun `npm run csp:update` and copy the hashes into render.yaml.');
  process.exit(1);
}

console.log(`Content-Security-Policy: ${current.length} inline script hash(es) verified.`);
