---
title: home
layout: page
scripts: ["featured_post.js", "blob-search.js"]
---

<h1 style="margin-top: 0.4rem; font-family: Inter; font-size: 3.2rem; font-weight: 700;">HSP PESUECC</h1>

<p style="margin-top: 0.2rem; font-size: 1.5rem; font-weight: 300; font-family: AzeretMono, monospace;"> 
We are a FOSS-driven <span style="color:#00fb6b; font-style:bold;">student
developer community</span> based at PES University, Electronic City Campus. 
</p>

<div id="hsp-spinner" style="display:flex; justify-content:center; align-items:center; margin: 1.25rem 0 2rem;">
  <div style="width: min(380px, 90vw);">
    <object data="/static/images/hsp-spinner.svg" type="image/svg+xml" width="100%" height="100%" aria-label="HSP spinning logo" role="img">
      <img src="/static/images/hsp-spinner.svg" alt="HSP spinning logo" style="width:100%;height:auto;" />
    </object>
  </div>
</div>

Since 2021, we have been dedicated to raising awareness about open source and
fostering a culture of knowledge sharing. Today, our community has blossomed
into a thriving family of over a 100 members, united by a shared passion for
learning, innovation, and collaboration!



<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.2em;">
  <h1 style="margin: 0; font-size: 2.2em; font-weight: 700;">Featured</h1>
  <img src="/static/images/gallery/blob/blob-beanie.svg" alt="Blob Mascot" id="blob-mascot" style="height: 2.6em; width: auto; animation: popUp 1.8s cubic-bezier(.2,1.8,.5,-0.8) infinite alternate; cursor:pointer; filter: drop-shadow(0 1px 4px #00fb6b55); background: #181a1b; border-radius: 40% 40% 48% 48% / 50% 50% 60% 60%; padding: 2px; margin-left: 2em; object-fit: cover; object-position: center;" />
</div>
<div style="text-align:left; color:#00fb6b; font-size:1em; font-weight:400; margin-bottom:2em; margin-top:0.7em;">
  <span style="opacity:0.8;">Search all posts: <span style="font-weight:500;">Cmd+K</span> or <span style="font-weight:500;">Ctrl+K</span> <span style="font-size:0.95em;">(or tap blob)</span></span>
</div>

<div id="featured-section" class="home-featured">
  <div id="lazy-blob" style="display:flex; justify-content:center; align-items:center; min-height:120px;">
  <img src="/static/images/gallery/blob/blob-beanie.svg" alt="Loading mascot" style="width:90px; animation: popUp 1.4s cubic-bezier(.2,1.8,.5,-0.8) infinite alternate; filter: drop-shadow(0 8px 24px #00fb6b7f); background: #181a1b; border-radius: 50%; padding: 8px;" />
  </div>
  <style>
    @keyframes popUp {
      0% { transform: scale(0.8); }
      60% { transform: scale(1.15); }
      80% { transform: scale(0.95); }
      100% { transform: scale(1); }
    }
  </style>
</div>
<script>
window.blobSearchOpen = function() {
  var modal = document.getElementById('blob-search-modal');
  if (modal) {
    modal.style.visibility = 'visible';
    var input = modal.querySelector('#blob-search-input');
    if (input) input.focus();
  }
};
document.addEventListener('DOMContentLoaded', function() {
  var blob = document.getElementById('blob-mascot');
  if (blob) {
    blob.onclick = window.blobSearchOpen;
  }
});
</script>


## But what is FOSS?

In contrast to proprietary software, <span style="color:#00fb6b; font-style:italic;">Free and Open Source Software</span> or FOSS is open for all to study, use, modify and redistribute under an open-source license. A good example is <a href="https://github.com/anna-ssg/anna">anna</a>, a lightning-fast static site generator developed by our members that powers this very website! ⚡

To learn more about FOSS, check out <a href="https://homebrew.hsp-ec.xyz">Homebrew</a> - our very own FOSS wing that's open to all open-source enthusiasts! ♥️

