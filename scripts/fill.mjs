// Fills {{dotted.key}} slots in an HTML template with values from the content object.
// Pure function: no file access, so the tests can call it directly.

const SLOT = /\{\{\s*([A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)*)\s*\}\}/g;

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
}

// Walks "a.b.c" into content.a.b.c; returns undefined when any step is missing.
export function lookup(content, path) {
  let value = content;
  for (const part of path.split('.')) {
    if (value === null || typeof value !== 'object' || !Object.hasOwn(value, part)) return undefined;
    value = value[part];
  }
  return value;
}

// Returns the filled template. Throws one error naming every missing key,
// so the build can stop before it writes anything.
export function fill(template, content) {
  const missing = new Set();
  const html = template.replace(SLOT, (_slot, path) => {
    const value = lookup(content, path);
    // A blank string would render as empty text, so it counts as missing too.
    if ((typeof value !== 'string' && typeof value !== 'number') || String(value).trim() === '') {
      missing.add(path);
      return '';
    }
    return escapeHtml(value);
  });
  if (missing.size > 0) {
    throw new Error(`content.json has no text for: ${[...missing].join(', ')}`);
  }
  // Escaped values cannot contain braces that form a slot, so any "{{" or "}}" left
  // is a slot the pattern did not accept, such as {{nav.how-it}} or {{ }}.
  const leftover = html.match(/\{\{[^]*?\}\}|\{\{|\}\}/);
  if (leftover) {
    throw new Error(`index.html has a malformed slot: ${leftover[0]}`);
  }
  return html;
}
