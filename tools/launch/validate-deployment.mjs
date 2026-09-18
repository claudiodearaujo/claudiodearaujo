const targetOrigin = (
  process.env.TARGET_ORIGIN ?? 'https://claudiodearaujo-site.onrender.com'
).replace(/\/$/, '');
const expectedOrigin = (process.env.EXPECTED_ORIGIN ?? targetOrigin).replace(/\/$/, '');
const expectedSitemapUrls = Number(process.env.EXPECTED_SITEMAP_URLS ?? '21');

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

async function fetchText(path, init) {
  const response = await fetch(`${targetOrigin}${path}`, init);
  const text = await response.text();
  return { response, text };
}

function header(response, name) {
  return response.headers.get(name) ?? '';
}

console.log(`Validating deployment: ${targetOrigin}`);
console.log(`Expected public origin: ${expectedOrigin}`);

const home = await fetchText('/pt');
assert(home.response.status === 200, `/pt expected 200, got ${home.response.status}`);
assert(
  !header(home.response, 'x-robots-tag').toLowerCase().includes('noindex'),
  'production must not send X-Robots-Tag: noindex',
);
assert(
  header(home.response, 'x-frame-options').toUpperCase() === 'DENY',
  'X-Frame-Options must be DENY',
);
assert(
  header(home.response, 'x-content-type-options').toLowerCase() === 'nosniff',
  'X-Content-Type-Options must be nosniff',
);
assert(
  header(home.response, 'referrer-policy') === 'strict-origin-when-cross-origin',
  'Referrer-Policy mismatch',
);
assert(
  header(home.response, 'permissions-policy').includes('camera=()'),
  'Permissions-Policy missing camera restriction',
);
assert(
  header(home.response, 'content-security-policy').includes("default-src 'self'"),
  'Content-Security-Policy missing',
);
assert(
  home.text.includes(`rel="canonical" href="${expectedOrigin}/pt"`),
  'Home canonical mismatch',
);
assert(
  home.text.includes(`property="og:url" content="${expectedOrigin}/pt"`),
  'Home og:url mismatch',
);
assert(
  !home.text.includes('name="robots" content="noindex'),
  'Home must be indexable in production',
);

const lucyos = await fetchText('/pt/work/lucyos');
assert(lucyos.response.status === 200, `LucyOS expected 200, got ${lucyos.response.status}`);
assert(
  lucyos.text.includes(`rel="canonical" href="${expectedOrigin}/pt/work/lucyos"`),
  'LucyOS canonical mismatch',
);
assert(
  lucyos.text.includes(`property="og:url" content="${expectedOrigin}/pt/work/lucyos"`),
  'LucyOS og:url mismatch',
);

const robots = await fetchText('/robots.txt');
assert(robots.response.status === 200, `robots.txt expected 200, got ${robots.response.status}`);
assert(!/^Disallow:\s*\/$/m.test(robots.text), 'production robots.txt must not disallow all');
assert(
  robots.text.includes(`Sitemap: ${expectedOrigin}/sitemap.xml`),
  'robots.txt sitemap origin mismatch',
);

const sitemap = await fetchText('/sitemap.xml');
assert(sitemap.response.status === 200, `sitemap.xml expected 200, got ${sitemap.response.status}`);
const locations = [...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert(
  locations.length === expectedSitemapUrls,
  `sitemap expected ${expectedSitemapUrls} URLs, got ${locations.length}`,
);
assert(
  locations.every((url) => url.startsWith(`${expectedOrigin}/`)),
  'sitemap contains URL outside expected origin',
);

const favicon = await fetch(`${targetOrigin}/favicon.svg`);
assert(favicon.status === 200, `favicon expected 200, got ${favicon.status}`);
assert(
  (favicon.headers.get('content-type') ?? '').includes('image/svg+xml'),
  'favicon content-type must be image/svg+xml',
);

const missing = await fetch(`${targetOrigin}/launch-readiness-route-that-does-not-exist`, {
  redirect: 'manual',
});
assert(missing.status === 404, `unknown route expected HTTP 404, got ${missing.status}`);

if (process.env.WWW_ORIGIN) {
  const wwwOrigin = process.env.WWW_ORIGIN.replace(/\/$/, '');
  const response = await fetch(`${wwwOrigin}/pt`, { redirect: 'manual' });
  assert(
    [301, 302, 307, 308].includes(response.status),
    `www redirect expected 3xx, got ${response.status}`,
  );
  assert(
    (response.headers.get('location') ?? '').startsWith(expectedOrigin),
    'www redirect target mismatch',
  );
}

if (failures.length) {
  console.error('\nDeployment validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('\nDeployment validation passed.');
console.log('- security headers: ok');
console.log('- canonical / og:url: ok');
console.log(`- robots / sitemap: ${locations.length} URLs`);
console.log('- favicon: ok');
console.log('- HTTP 404: ok');
