(function () {
  const ctaHTML = `
<section class="cta-section" aria-labelledby="post-cta-heading">
  <h2 id="post-cta-heading">Building a Bitcoin wallet<br>for African users?</h2>
  <p>We're building the shared UX infrastructure the ecosystem needs. Start with our research, or work with us directly.</p>
  <div class="cta-buttons">
    <a href="mailto:mark@bitcoinux.com" class="btn-white">Get in Touch</a>
    <a href="/uxsupport.html" class="btn-outline">Need UX Support?</a>
  </div>
</section>`;

  const el = document.createElement('div');
  el.innerHTML = ctaHTML;
  document.currentScript.replaceWith(el.firstElementChild);
})();
