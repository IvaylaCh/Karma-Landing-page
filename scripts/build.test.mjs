// End-to-end tests for build.mjs. Each runs the real build in a throwaway copy of the
// project, so the repo's own dist/ is never touched.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, symlinkSync, unlinkSync, writeFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = fileURLToPath(new URL('..', import.meta.url));

function makeProject(parts) {
  const dir = mkdtempSync(join(tmpdir(), 'karma-build-'));
  for (const part of parts) cpSync(join(repo, part), join(dir, part), { recursive: true });
  return dir;
}

function runBuild(dir) {
  return spawnSync(process.execPath, [join(dir, 'scripts', 'build.mjs')], { cwd: dir, encoding: 'utf8' });
}

test('missing key: build exits non-zero, names the key, and leaves an existing dist/ unchanged', () => {
  const dir = makeProject(['src', 'scripts']);
  try {
    const contentPath = join(dir, 'src', 'content.json');
    const content = JSON.parse(readFileSync(contentPath, 'utf8'));
    delete content.footer;
    writeFileSync(contentPath, JSON.stringify(content));
    mkdirSync(join(dir, 'dist'));
    writeFileSync(join(dir, 'dist', 'sentinel.txt'), 'previous build');

    const result = runBuild(dir);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /footer/);
    assert.deepEqual(readdirSync(join(dir, 'dist')), ['sentinel.txt']);
    assert.equal(readFileSync(join(dir, 'dist', 'sentinel.txt'), 'utf8'), 'previous build');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('success: build writes an offline page with every asset, matching the committed dist/', () => {
  const dir = makeProject(['src', 'scripts', 'design-system/fonts', 'design-system/assets/Code']);
  const link = join(dir, 'node_modules');
  symlinkSync(join(repo, 'node_modules'), link, 'junction');
  try {
    const result = runBuild(dir);
    assert.equal(result.status, 0, result.stderr);

    const out = join(dir, 'dist');
    const html = readFileSync(join(out, 'index.html'), 'utf8');
    const css = readFileSync(join(out, 'styles.css'), 'utf8');
    for (const text of [html, css]) assert.doesNotMatch(text, /https?:\/\/|googleapis/);

    for (const font of ['Geologica-Sharp-Variable.woff2', 'OverpassMono-Variable.woff2']) {
      assert.ok(existsSync(join(out, font)), `${font} copied`);
    }
    // In-page links such as "#how" point at sections, not files.
    const assets = [...html.matchAll(/\s(?:src|href)="([^"#][^"]*)"/g)].map((m) => m[1]);
    assert.ok(assets.length > 0);
    for (const asset of assets) assert.ok(existsSync(join(out, asset)), `${asset} present in dist/`);

    assert.equal(html, readFileSync(join(repo, 'dist', 'index.html'), 'utf8'), 'committed dist/index.html is stale: run npm run build');
    assert.equal(css, readFileSync(join(repo, 'dist', 'styles.css'), 'utf8'), 'committed dist/styles.css is stale: run npm run build');
  } finally {
    unlinkSync(link); // remove the junction itself before deleting the folder
    rmSync(dir, { recursive: true, force: true });
  }
});

test('content: the two headline lines read as the tagline, so they cannot drift apart', () => {
  const content = JSON.parse(readFileSync(join(repo, 'src', 'content.json'), 'utf8'));
  assert.equal(`${content.hero.titleLine1} ${content.hero.titleLine2}`, content.tagline);
});
