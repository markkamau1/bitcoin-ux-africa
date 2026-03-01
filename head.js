(function () {
  // ── Shared <head> injector ────────────────────────────────────────────────
  // Injects everything that is identical across every page:
  //   charset, viewport, font preconnects, Google Fonts
  //
  // Favicons are hardcoded directly in each page's <head> — NOT injected here.
  // Safari ignores dynamically injected favicons; hardcoding is required.
  //
  // Page-specific tags (title, description, canonical, OG, Twitter, schema)
  // stay hardcoded in each page's own <head>.
  //
  // CSS: top-level pages use inline <style>; blog posts load ../../css/style.css
  // directly in their own <head> — head.js does not touch CSS.
  // ─────────────────────────────────────────────────────────────────────────

  const tags = [
    // Character set & viewport
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',

    // ── Google Fonts ───────────────────────────────────────────────────────
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">',
  ];

  // Insert all tags at the very start of <head>, before anything else
  const head = document.head;
  const firstChild = head.firstChild;

  // Insert in reverse so they end up in the correct order
  for (let i = tags.length - 1; i >= 0; i--) {
    const tmp = document.createElement('template');
    tmp.innerHTML = tags[i];
    head.insertBefore(tmp.content.firstChild, firstChild);
  }
})();
