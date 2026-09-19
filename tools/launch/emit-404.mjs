import { copyFile, readFile } from 'node:fs/promises';
import path from 'node:path';

// Every known route is prerendered, so the static host serves its own generic
// page for anything else and the app's 404 component is never reached. Static
// hosts serve a top-level 404.html for unmatched paths, so publishing the CSR
// shell under that name lets the router resolve the ** route on the client
// while the host keeps answering with HTTP 404.

const root = process.cwd();
const angularConfig = JSON.parse(await readFile(path.join(root, 'angular.json'), 'utf8'));
const [projectName, project] = Object.entries(angularConfig.projects)[0];
const outputPath =
  project.architect.build.options.outputPath ?? path.join('dist', projectName, 'browser');
const browserRoot = path.isAbsolute(outputPath)
  ? outputPath
  : path.join(root, outputPath.endsWith('browser') ? outputPath : path.join(outputPath, 'browser'));

const source = path.join(browserRoot, 'index.csr.html');
const target = path.join(browserRoot, '404.html');

try {
  await copyFile(source, target);
} catch (error) {
  console.error(`Could not publish 404.html from ${source}: ${error.message}`);
  process.exit(1);
}

console.log(`Published ${path.relative(root, target)} from the client-side rendering shell.`);
