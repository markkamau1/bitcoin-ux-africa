# Adding a New Blog Post — Bitcoin UX Africa

## Every new post needs 3 things done:

---

### 1. Add to the registry (`blog/blog-posts-data.js`)

Open `blog/blog-posts-data.js` and add a new entry at the top of the `BLOG_POSTS` array
(most recent first):

```js
{
    id: "your-post-slug",               // must match the HTML filename (without .html)
    title: "Your Full Post Title",
    excerpt: "1–2 sentence summary shown on cards.",
    category: "Research Report",        // badge label: White Paper / UX Research / Design Patterns / etc.
    date: "March 1, 2026",
    image: "images/blog/your-image.jpg",
    imageAlt: "Descriptive alt text",
    url: "blog/posts/your-post-slug.html",
    linkLabel: "Read Article →"         // or "Read Report →" / "Read White Paper →"
},
```

✅ That's all it takes. Every existing blog post's "You May Also Like" slider will
   automatically include your new post on their next page load.

---

### 2. Create the HTML file (`blog/posts/your-post-slug.html`)

Copy any existing post file (e.g. `why-89-percent-fail-first-transaction.html`) and:

- Update the `<title>` and `<meta name="description">`
- Update the hero content (category badge, date, title)
- Write the post body inside `<main>`
- Change **one line** at the bottom — the `CURRENT_POST_ID`:

```html
<script>
    const CURRENT_POST_ID = "your-post-slug";  <!-- ← only change this -->
</script>
<script src="../../blog/blog-posts-data.js"></script>
<script src="../../blog/you-may-also-like.js"></script>
```

The slider will automatically show all posts EXCEPT the one being read.

---

### 3. Add the blog card to `index.html`

In the `#blog-slider-track` div, add a new `<article class="blog-card">` block:

```html
<!-- ========== BLOG POST N: Your Post Title ========== -->
<article class="blog-card">
    <div class="blog-image">
        <img src="images/blog/your-image.jpg" alt="Your alt text"
             loading="lazy"
             onerror="this.onerror=null;this.src='';this.closest('.blog-image').classList.add('img-fallback');this.style.display='none';">
    </div>
    <div class="blog-content">
        <div class="blog-meta">
            <span class="blog-category">Research Report</span>
            <span class="blog-date">March 1, 2026</span>
        </div>
        <h3>Your Full Post Title</h3>
        <p>1–2 sentence excerpt.</p>
        <a href="blog/posts/your-post-slug.html" class="blog-link">Read Article →</a>
    </div>
</article>
<!-- ========== END: Your Post Title ========== -->
```

---

## File structure

```
/
├── index.html
├── blog/
│   ├── blog-posts-data.js        ← REGISTRY: edit this for every new post
│   ├── you-may-also-like.js      ← engine: never needs editing
│   ├── you-may-also-like.css     ← styles: never needs editing
│   └── posts/
│       ├── why-89-percent-fail-first-transaction.html
│       ├── state-of-bitcoin-ux-africa-2026.html
│       ├── why-bitcoin-ux-infrastructure-matters.html
│       ├── bitcoin-wallet-patterns.html
│       ├── seed-phrase-ux.html
│       └── your-new-post.html    ← new posts go here
└── images/
    └── blog/
        └── your-image.jpg        ← 800×440px recommended
```

---

## Summary: what to change per new post

| File | What to do |
|------|-----------|
| `blog/blog-posts-data.js` | Add 1 new entry to the array |
| `blog/posts/your-slug.html` | Copy existing post, update content + `CURRENT_POST_ID` |
| `index.html` | Add 1 new `<article class="blog-card">` block |
| `images/blog/` | Add the post image (800×440px) |
