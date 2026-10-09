import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fill } from './fill.mjs';

test('slot filled: a top-level key puts its string in the HTML', () => {
  const footer = 'Karma organizes and cites documents. It does not interpret, recommend or decide.';
  assert.equal(fill('<p>{{footer}}</p>', { footer }), `<p>${footer}</p>`);
});

test('nested key: a dotted slot reads the nested value', () => {
  const content = { badge: { fictional: 'Fictional patient' } };
  assert.equal(fill('<span>{{badge.fictional}}</span>', content), '<span>Fictional patient</span>');
});

test('markup in a value is escaped', () => {
  const content = { note: 'Tom & Jerry <b>"hi"</b>' };
  assert.equal(
    fill('{{note}}', content),
    'Tom &amp; Jerry &lt;b&gt;&quot;hi&quot;&lt;/b&gt;',
  );
});

test('missing key: fill throws and names the key', () => {
  assert.throws(() => fill('{{footer}} {{nav.howItWorks}}', { footer: 'x' }), /nav\.howItWorks/);
});

test('missing key: an object where a string is expected counts as missing', () => {
  assert.throws(() => fill('{{badge}}', { badge: { fictional: 'x' } }), /badge/);
});

test('unused key: extra content keys do not stop the build', () => {
  const content = { footer: 'x', later: { story: 'kept for later stories' } };
  assert.equal(fill('{{footer}}', content), 'x');
});

test('blank value: an empty or whitespace-only string counts as missing', () => {
  assert.throws(() => fill('{{footer}}', { footer: '' }), /footer/);
  assert.throws(() => fill('{{nav.howItWorks}}', { nav: { howItWorks: '  \n ' } }), /nav\.howItWorks/);
});

test('malformed slot: a slot the pattern rejects stops the fill and is named', () => {
  assert.throws(() => fill('<a>{{nav.how-it}}</a>', { nav: {} }), /\{\{nav\.how-it\}\}/);
  assert.throws(() => fill('<p>{{ }}</p>', {}), /\{\{ \}\}/);
  assert.throws(() => fill('<p>{{footer}} }}</p>', { footer: 'x' }), /\}\}/);
});
