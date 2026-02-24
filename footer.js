(function () {
  const footerHTML = `
<footer>
  <div class="footer-inner">
    <div>
      <div class="footer-links">
        <a href="/index.html">Home</a>
        <a href="/index.html#bitcoin-ux-insights">Research</a>
        <a href="/about.html">About</a>
        <a href="/uxsupport.html">UX Support</a>
      </div>
      <div class="footer-social" style="margin-top:16px;">
        <a href="https://x.com/bitcoin_ux" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://primal.net/p/nprofile1qqsfy4zqpj34sls53sk36h98g7tcpmt8pp53fkaxe24knxnvapz8jtgjdu0u6" target="_blank" rel="noopener noreferrer" aria-label="Nostr / Primal">
          <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M155.506 253.036C146.645 254.976 137.44 255.999 127.997 255.999C102.077 255.999 77.9567 248.295 57.8008 235.051C52.7974 227.894 50.5525 223.955 48.915 221.081C48.1036 219.657 47.4413 218.495 46.6664 217.332C39.0311 205.053 35.0362 189.28 34.1651 170.748C31.4666 113.326 66.3642 76.6573 102.015 70.6387C124.613 66.8235 142.572 70.6872 156.347 78.0534C144.169 74.666 129.652 74.4622 113.102 79.2C72.9831 92.1309 59.6091 131.451 65.3414 174.994C75.3453 229.555 128.842 249.111 155.506 253.036Z"/><path d="M41.2387 222.111C33.7762 208.86 27.0184 189.088 26.1739 171.123C23.3092 110.164 60.5628 69.5235 100.683 62.7503C155.371 53.5175 185.775 85.8934 196.256 109.923C196.695 109.628 196.873 109.043 196.641 108.539C179.408 71.0662 143.765 45.3331 102.592 45.3331C55.8419 45.3331 14.127 78.8691 0 128.71C0.200633 165.642 16.0426 198.871 41.2387 222.111Z"/><path d="M199.997 233.844C190.764 240.137 180.665 245.253 169.916 248.977C164.755 248.078 159.037 246.959 155.011 246.171C153.103 245.797 151.574 245.498 150.666 245.332C126.318 240.885 82.7834 225.195 73.246 173.749C70.5513 153.063 72.4812 134.02 79.3156 118.916C86.0487 104.035 97.6686 92.6275 115.39 86.8682C135.987 81.2567 153.055 84.0378 165.732 90.8469C162.612 90.1887 159.386 89.8437 156.085 89.8437C128.652 89.8437 106.414 113.671 106.414 143.063C106.414 154.799 109.959 165.648 115.966 174.447C115.966 174.447 133.16 206.926 179.966 204.023C221.7 201.434 243.373 163.999 245.956 150.172C247.298 142.986 248 135.575 248 127.999C248 61.7256 194.274 7.99997 128.001 7.99997C77.851 7.99997 34.8866 38.7631 16.9488 82.4478C10.8898 90.3409 5.6727 99.0914 1.46875 108.554C10.8367 47.0899 63.9194 0 128.001 0C198.693 0 256 57.3073 256 127.999C256 171.996 233.803 210.805 199.997 233.844Z"/></svg>
        </a>
      </div>
    </div>
    <div class="footer-right">
      <div class="footer-domain">bitcoinux.africa</div>
      <div class="footer-copy">&copy; 2026 Bitcoin UX Africa</div>
    </div>
  </div>
</footer>`;

  // Insert footer CSS
  const footerCSS = `
    footer{background:#0a0d0b;padding:48px;}
    .footer-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px;}
    .footer-links{display:flex;gap:28px;flex-wrap:wrap;}
    .footer-links a{color:rgba(255,255,255,0.35);text-decoration:none;font-size:0.85rem;transition:color .2s;}
    .footer-links a:hover{color:#f97316;}
    .footer-social{display:flex;gap:16px;align-items:center;}
    .footer-social a{color:rgba(255,255,255,0.3);transition:color .2s;}
    .footer-social a:hover{color:#f97316;}
    .footer-right{text-align:right;}
    .footer-domain{font-family:'DM Mono',monospace;font-size:12px;color:rgba(249,115,22,0.5);letter-spacing:0.08em;}
    .footer-copy{font-size:0.8rem;color:rgba(255,255,255,0.2);margin-top:6px;}
    @media(max-width:768px){
      footer{padding:40px 24px;}
      .footer-inner{flex-direction:column;align-items:flex-start;}
      .footer-right{text-align:left;}
    }
  `;

  const style = document.createElement('style');
  style.textContent = footerCSS;
  document.head.appendChild(style);

  // Replace existing <footer> if present, otherwise append
  const existing = document.querySelector('footer');
  if (existing) {
    existing.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
})();
