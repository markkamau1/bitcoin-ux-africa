/**
 * ============================================================
 *  BITCOIN UX AFRICA — BLOG POSTS REGISTRY
 * ============================================================
 *  This is the SINGLE SOURCE OF TRUTH for all blog posts.
 *
 *  HOW TO ADD A NEW BLOG POST:
 *  1. Add a new object to the BLOG_POSTS array below.
 *  2. That's it. Every "You May Also Like" slider on every
 *     blog post page will automatically include the new post
 *     (and automatically exclude it on its own page).
 *
 *  FIELD REFERENCE:
 *  - id        : unique slug string, must match the HTML filename
 *                e.g. "why-bitcoin-ux-infrastructure-matters"
 *  - title     : full post title
 *  - excerpt   : 1–2 sentence description shown on the card
 *  - category  : label shown in the category badge
 *  - date      : display date string
 *  - image     : path relative to /images/blog/ (from root)
 *  - imageAlt  : alt text for the image
 *  - url       : path to the post HTML file (from root)
 *  - linkLabel : text for the read more link, e.g. "Read Report →"
 * ============================================================
 */

const BLOG_POSTS = [
    {
        id: "why-bitcoin-ux-infrastructure-matters",
        title: "Why Bitcoin UX Infrastructure Matters: The Case for Africa",
        excerpt: "Bitcoin wallets fail 73% of African users on basic tasks. Not a protocol problem. A UX infrastructure problem. Here's how we fix it.",
        category: "White Paper",
        date: "February 7, 2026",
        image: "images/blog/bitcoin-ux-infrastructure.jpg",
        imageAlt: "Bitcoin UX Infrastructure for Africa White Paper",
        url: "blog/posts/why-bitcoin-ux-infrastructure-matters.html",
        linkLabel: "Read White Paper →"
    },
    {
        id: "state-of-bitcoin-ux-africa-2026",
        title: "The State of Bitcoin UX in Africa 2026: Research Report",
        excerpt: "Original research from 340+ user tests across Kenya, Nigeria, Ghana, South Africa and Ethiopia. What's broken, what's working, and what builders must fix.",
        category: "Research Report",
        date: "February 17, 2026",
        image: "images/blog/state-of-bitcoin-ux-2026.jpg",
        imageAlt: "The State of Bitcoin UX in Africa 2026 Research Report",
        url: "blog/posts/state-of-bitcoin-ux-africa-2026.html",
        linkLabel: "Read Report →"
    },
    {
        id: "why-89-percent-fail-first-transaction",
        title: "Why 89% of African Bitcoin Users Fail Their First Transaction",
        excerpt: "Original research from 340+ tests reveals the exact failure points and the UX fixes that reduce abandonment by 67%.",
        category: "UX Research",
        date: "February 15, 2026",
        image: "images/blog/first-transaction-failure.jpg",
        imageAlt: "Why 89% of African Bitcoin Users Fail",
        url: "blog/posts/why-89-percent-fail-first-transaction.html",
        linkLabel: "Read Research →"
    },
    {
        id: "bitcoin-wallet-patterns",
        title: "5 Bitcoin Wallet UX Patterns That Increase User Retention by 40%",
        excerpt: "Through testing with 500+ African users, we've identified the critical design patterns that make the difference between users staying or leaving.",
        category: "Design Patterns",
        date: "February 1, 2026",
        image: "images/blog/bitcoin-wallet-patterns.jpg",
        imageAlt: "Bitcoin Wallet Design Patterns",
        url: "blog/posts/bitcoin-wallet-patterns.html",
        linkLabel: "Read Article →"
    },
    {
        id: "seed-phrase-ux",
        title: "Why 73% of Users Fail at Seed Phrase Backup (And How to Fix It)",
        excerpt: "Our research across 6 African countries reveals the hidden barriers in self-custody onboarding. It's not about intelligence, it's about design.",
        category: "User Research",
        date: "January 28, 2026",
        image: "images/blog/seed-phrase-ux.jpg",
        imageAlt: "Seed Phrase User Experience",
        url: "blog/posts/seed-phrase-ux.html",
        linkLabel: "Read Article →"
    }
    /*
     * ── ADD NEW POSTS BELOW THIS LINE ──────────────────────
     * Copy and paste this template, fill in the fields:
     *
     * ,{
     *     id: "your-post-slug",
     *     title: "Your Post Title Here",
     *     excerpt: "Short 1-2 sentence description of the post.",
     *     category: "Category Label",
     *     date: "Month DD, YYYY",
     *     image: "images/blog/your-image.jpg",
     *     imageAlt: "Descriptive alt text for the image",
     *     url: "blog/posts/your-post-slug.html",
     *     linkLabel: "Read Article →"
     * }
     *
     * ── THAT'S ALL YOU NEED TO DO ──────────────────────────
     */
];
