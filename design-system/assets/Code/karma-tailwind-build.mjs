/**
 * Karma — rebuild the two Tailwind files from the design system's tokens.json.
 *
 *   node karma-tailwind-build.mjs path/to/tokens.json [output-folder]
 *
 * It writes karma-tailwind-v3-preset.js and karma-tailwind-v4-theme.css into the output
 * folder (default: the current folder). Run it after you change the palette in the design
 * system: save there, download tokens.json, run this, commit the two files.
 *
 * How a token becomes a class (one token = one class name, in v3 and v4 alike):
 *   colour token   `ink`               -> colors.ink        -> text-ink, bg-ink, border-ink …
 *   type style     `body`              -> fontSize.body     -> text-body
 *   shadow token   `shadow-card`       -> boxShadow.card    -> shadow-card
 *   size token     `size-content-max`  -> maxWidth.content  -> max-w-content
 *   size token     `size-panel`        -> width.panel       -> w-panel
 *   spacing and radius tokens equal Tailwind's defaults (p-4, rounded-2xl), so they need no config.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const [src = 'tokens.json', outDir = '.'] = process.argv.slice(2);
const tokens = JSON.parse(readFileSync(src, 'utf8'));
const firstTheme = tokens.color.themes[0].id;

// ---------------------------------------------------------------- colours
// A colour token's value is either a colour ("#2563EB") or an alias ("{accent}").
// The main palette holds the colours; semantic tokens are aliases of it.
const colours = tokens.color.tokens.map((t) => ({
  name: t.name,
  value: typeof t.value === 'string' ? t.value : t.value[firstTheme],
}));
const byName = new Map(colours.map((c) => [c.name, c.value]));
const isAlias = (v) => /^\{[^{}]+\}$/.test(v);
const aliasTarget = (v) => v.slice(1, -1);

// v3 needs the final colour, so follow an alias to the end of its chain.
function resolve(name, depth = 0) {
  const v = byName.get(name);
  if (v === undefined) throw new Error(`Unknown colour token: ${name}`);
  if (!isAlias(v)) return v;
  if (depth > 16) throw new Error(`Alias chain too deep at ${name}`);
  return resolve(aliasTarget(v), depth + 1);
}

// ---------------------------------------------------------------- type, shadows, sizes
const sansStyles = tokens.type.groups.filter((g) => g.family === 'sans').flatMap((g) => g.styles);
const stack = (s) => s.split(',').map((x) => x.trim());
const shadows = tokens.shadow.tokens;
const sizes = Object.fromEntries(tokens.size.tokens.map((t) => [t.name, t.value]));

// ---------------------------------------------------------------- v3 preset
const fontSize = {};
for (const s of sansStyles) {
  const opts = { lineHeight: s.lineHeight };
  if (s.letterSpacing) opts.letterSpacing = s.letterSpacing;
  if (s.fontWeight) opts.fontWeight = String(s.fontWeight);
  fontSize[s.name] = [s.fontSize, opts];
}
const preset = {
  theme: {
    extend: {
      colors: Object.fromEntries(colours.map((c) => [c.name, resolve(c.name)])),
      fontFamily: { sans: stack(tokens.type.families.sans), mono: stack(tokens.type.families.mono) },
      fontSize,
      boxShadow: Object.fromEntries(shadows.map((t) => [t.name.replace(/^shadow-/, ''), t.value])),
      maxWidth: { content: sizes['size-content-max'] },
      width: { panel: sizes['size-panel'] },
    },
  },
};
// JSON, with simple keys unquoted so it reads like a normal config file.
const js = (o) => JSON.stringify(o, null, 2).replace(/^(\s*)"([A-Za-z_][A-Za-z0-9_]*)":/gm, '$1$2:');
const v3 =
  '/**\n' +
  ' * Karma — Tailwind v3 preset. Generated from the design system\'s tokens.json by karma-tailwind-build.mjs.\n' +
  " * Use: module.exports = { presets: [require('./karma-tailwind-v3-preset.js')], content: [...] }\n" +
  ' * It EXTENDS the default theme, so today\'s slate-50 / emerald-600 classes keep working in the frozen\n' +
  ' * demo screens. New screens use only the Karma names below (bg-page, text-state-met-ink, ...).\n' +
  ' * Aliases are resolved to their final colour here; v4 keeps them as variables.\n' +
  ' */\n' +
  'module.exports = ' + js(preset) + ';\n';

// ---------------------------------------------------------------- v4 theme
const lines = [
  '/*',
  " * Karma — Tailwind v4 theme. Generated from the design system's tokens.json by karma-tailwind-build.mjs.",
  ' * Use: @import "tailwindcss"; @import "./karma-tailwind-v4-theme.css";',
  ' * Class names are the same as with the v3 preset: bg-page, text-state-met-ink, text-body, shadow-card ...',
  ' * The main palette is written as colours; every semantic token points at it with var(), so changing',
  ' * a palette colour here changes everything that uses it.',
  ' * Keep the woff2 next to this file (self-hosted, no network).',
  ' */',
  '',
];
for (const f of tokens.type.fonts) {
  lines.push('@font-face {', `  font-family: "${f.family}";`, `  src: url("./${basename(f.file)}") format("woff2");`,
    `  font-weight: ${f.weight};`, `  font-style: ${f.style ?? 'normal'};`, '  font-display: swap;', '}', '');
}
lines.push('@theme {');
for (const c of colours) {
  const v = isAlias(c.value) ? `var(--color-${aliasTarget(c.value)})` : c.value;
  lines.push(`  --color-${c.name}: ${v};`);
}
lines.push('', `  --font-sans: ${tokens.type.families.sans};`, `  --font-mono: ${tokens.type.families.mono};`, '');
for (const s of sansStyles) {
  lines.push(`  --text-${s.name}: ${s.fontSize};`, `  --text-${s.name}--line-height: ${s.lineHeight};`);
  if (s.letterSpacing) lines.push(`  --text-${s.name}--letter-spacing: ${s.letterSpacing};`);
  if (s.fontWeight) lines.push(`  --text-${s.name}--font-weight: ${s.fontWeight};`);
}
lines.push('');
for (const t of shadows) lines.push(`  --${t.name}: ${t.value};`);
lines.push('', `  --container-content: ${sizes['size-content-max']};`, `  --container-panel: ${sizes['size-panel']};`, '}');
const v4 = lines.join('\n') + '\n';

writeFileSync(join(outDir, 'karma-tailwind-v3-preset.js'), v3);
writeFileSync(join(outDir, 'karma-tailwind-v4-theme.css'), v4);
console.log(`Wrote karma-tailwind-v3-preset.js and karma-tailwind-v4-theme.css (${colours.length} colours, ${sansStyles.length} text sizes).`);
