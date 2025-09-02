---
title: home
layout: page
scripts: [featured_post.js]
---

<script>
setTimeout(() => {
    const banner = document.createElement('div');
        Object.assign(banner.style, {
            position: 'fixed',
            top: '140px',
            right: '50px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#00fb6b',
            padding: '16px 20px',
            borderRadius: '50px',
            fontSize: '14px',
            zIndex: '1000',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 20px rgba(0, 251, 107, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid rgba(0, 251, 107, 0.6)',
            textShadow: '0 0 10px rgba(0, 251, 107, 0.8)',
            animation: 'bannerFloat 4s ease-in-out infinite alternate, bannerPulse 3s ease-in-out infinite alternate',
            maxWidth: '280px',
            minHeight: '70px',
            backdropFilter: 'blur(15px)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
        });
    
    // Add hover effect
    banner.addEventListener('mouseenter', () => {
        banner.style.transform = 'scale(1.05)';
    });
    
    banner.addEventListener('mouseleave', () => {
        banner.style.transform = 'scale(1)';
    });
    
    // Add click handler to redirect to dashboard
    banner.addEventListener('click', () => {
        window.open('/dashboard/?event=project-expo-2', '_blank');
    });
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bannerPulse {
        from {
          box-shadow: 0 4px 20px rgba(0,0,0,0.5), 0 0 20px rgba(0, 251, 107, 0.4);
          border-color: rgba(0, 251, 107, 0.6);
        }
        to {
          box-shadow: 0 4px 25px rgba(0,0,0,0.6), 0 0 35px rgba(0, 251, 107, 0.7);
          border-color: rgba(0, 251, 107, 0.9);
        }
      }
      
      @keyframes bannerFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      
      @media (max-width: 1024px) {
        .banner-floating {
          right: 40px !important;
          top: 130px !important;
          max-width: 250px !important;
        }
      }
      
      @media (max-width: 768px) {
        .banner-floating {
          right: 30px !important;
          top: 120px !important;
          padding: 12px 16px !important;
          font-size: 13px !important;
          max-width: 220px !important;
          gap: 10px !important;
        }
        
        .banner-floating img {
          width: 40px !important;
          height: 40px !important;
        }
      }
      
      @media (max-width: 480px) {
        .banner-floating {
          right: 20px !important;
          top: 110px !important;
          padding: 10px 14px !important;
          font-size: 12px !important;
          max-width: 200px !important;
          gap: 8px !important;
        }
        
        .banner-floating img {
          width: 35px !important;
          height: 35px !important;
        }
      }
      
      .banner-floating {
        word-wrap: break-word;
        text-align: center;
      }
    `;
    document.head.appendChild(style);
    
    banner.className = 'banner-floating';

    const imageContainer = document.createElement('div');
    imageContainer.style.position = 'relative';
    imageContainer.style.flexShrink = '0';
    
    const img = document.createElement('img');
    img.src = "/static/images/gallery/project-expo-2/expo2.0.png";
    img.style.width = '45px';
    img.style.height = '45px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '50%';
    img.style.opacity = '0.8';
    imageContainer.appendChild(img);

    const countOverlay = document.createElement('div');
    countOverlay.style.position = 'absolute';
    countOverlay.style.top = '50%';
    countOverlay.style.left = '50%';
    countOverlay.style.transform = 'translate(-50%, -50%)';
    countOverlay.style.color = '#00fb6b';
    countOverlay.style.fontWeight = 'bold';
    countOverlay.style.fontSize = '16px';
    countOverlay.style.textShadow = '0 0 2px rgba(0, 0, 0, 1), 0 0 5px rgba(0, 251, 107, 0.8)';
    countOverlay.id = 'live-count';
    countOverlay.textContent = "0";
    imageContainer.appendChild(countOverlay);
    
    banner.appendChild(imageContainer);

    const textContainer = document.createElement('div');
    textContainer.style.display = 'flex';
    textContainer.style.flexDirection = 'column';
    textContainer.style.alignItems = 'flex-start';
    textContainer.style.minWidth = '0';
    
    const text = document.createElement('div');
    text.textContent = "";
    text.style.fontSize = '13px';
    text.style.fontWeight = '500';
    text.style.opacity = '0.9';
    text.style.lineHeight = '1';
    text.style.textShadow = '0 0 1px rgba(0, 0, 0, 0.8)';
    textContainer.appendChild(text);

    const subText = document.createElement('div');
    subText.textContent = "loading...";
    subText.id = 'banner-subtitle';
    subText.style.fontSize = '11px';
    subText.style.fontWeight = '400';
    subText.style.opacity = '0.7';
    subText.style.marginTop = '2px';
    subText.style.textShadow = '0 0 1px rgba(0, 0, 0, 0.8)';
    textContainer.appendChild(subText);
    
    banner.appendChild(textContainer);

    document.body.appendChild(banner);

    // Fetch live participant count - using modular dashboard system
    async function fetchParticipantCount() {
        try {
            // Load the dashboard configuration
            const configResponse = await fetch('/static/dashboard/events.json');
            if (!configResponse.ok) throw new Error('Failed to load config');
            const config = await configResponse.json();
            
            const event = config['project-expo-2'];
            if (!event || !event.gsheetUrl) {
                throw new Error('Event configuration not found');
            }
            
            const bannerSubtitle = document.getElementById('banner-subtitle');
            if (bannerSubtitle && event.displayName) {
                bannerSubtitle.textContent = event.displayName.toLowerCase();
            }
            
            // Use the configured Google Sheets URL
            const response = await fetch(event.gsheetUrl);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const csvText = await response.text();
            console.log('Banner - Downloaded CSV:', csvText);
            
            const arr = csvText.trim().split(',');
            console.log('Banner - Array:', arr);
            
            let dataColumn = event.dataColumn || 0;
            let count = parseInt(arr[dataColumn]) || 0;
            
            console.log(`Banner - Using column ${dataColumn}: ${arr[dataColumn]} -> ${count}`);
            
            // Update the live count display
            document.getElementById('live-count').textContent = count;
        } catch (error) {
            console.error('Banner - Error fetching participant count:', error);
            document.getElementById('live-count').textContent = "?";
        }
    }
    
    // Initial fetch and then update every 5 seconds (same as dashboard)
    fetchParticipantCount();
    setInterval(fetchParticipantCount, 5000);
}, 1000);
</script>
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

# Featured

<div class="home-featured">

<a class="featured-card" href="/announcements/project-expo-2.html">
  <img class="featured-card-image" loading="lazy" src="/static/images/project-expo-2-thumb.jpg" alt="Project Expo 2.0" />
  <h2 class="featured-card-title">Project Expo 2.0</h2>
  <p class="featured-card-date">August 2025</p>
  <p class="featured-card-desc">A showcase of innovative student projects, collaboration, and creativity at HSP PESUECC.</p>
</a>

<a class="featured-card" href="/announcements/fosstalks-2.html">
  <img class="featured-card-image" loading="lazy" src="" />
  <h2 class="featured-card-title"></h2>
  <p class="featured-card-date"></p>
  <p class="featured-card-desc"></p>
</a>

<div style="break-inside: avoid; width: 100%; max-width: 340px; margin-bottom: 1.5rem;">
<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DCMTaliysuj/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/DCMTaliysuj/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/DCMTaliysuj/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by HSP PESU-ECC (@hsp.pesuecc)</a></p></div></blockquote>
</div>
<script async src="//www.instagram.com/embed.js"></script>
<div class="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/rdO_nXb3i3c?si=Cx5jOswj2bZSZUBB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">Here&#39;s what we&#39;ll be cooking over the summer in Tilde 3.0 👀🔥<br><br>Chronicle - Real time collaborative Markdown editor 📝<br><br>ModelForge - Low code ML model training framework 🧠<br><br>Psh - Fancy POSIX-like shell 👨‍💻<br><br>Load balancer in Rust 🦀<br><br>Introduction to RISC-V 👾</p>&mdash; HSP (@hsp_ecc) <a href="https://twitter.com/hsp_ecc/status/1804041112434413742?ref_src=twsrc%5Etfw">June 21, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!-- <blockquote class="twitter-tweet"><p lang="en" dir="ltr">fully in-memory join + streaming (select + filter + distinct + select-with-pushdown) iterators ✅<br>(join is not really an iterator at this point)<br>the next step is to make the Row struct completely JSON-based so I can implement projection, and add some form of page-based storage <a href="https://t.co/t8KZwjQBrL">pic.twitter.com/t8KZwjQBrL</a></p>&mdash; Anirudh Rowjee @ rowjee.com (@AnirudhRowjee)<a href="https://twitter.com/AnirudhRowjee/status/1880934001474740628?ref_src=twsrc%5Etfw">January 19, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

 <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7282422011279122432" height="665" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe> -->

<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7278945323375337472" height="665" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>

<!-- For Youtube Videos, please wrap the iframe around a div with the calss name video-container-->
<div class="video-container">
<iframe id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube-nocookie.com/embed/raQrUlURXEc" frameborder="0"></iframe>
</div>

</div>

## But what is FOSS?

In contrast to proprietary software, <span style="color:#00fb6b; font-style:italic;">Free and Open Source Software</span> or FOSS is open for all to study, use, modify and redistribute under an open-source license. A good example is <a href="https://github.com/anna-ssg/anna">anna</a>, a lightning-fast static site generator developed by our members that powers this very website! ⚡

To learn more about FOSS, check out <a href="https://homebrew.hsp-ec.xyz">Homebrew</a> - our very own FOSS wing that's open to all open-source enthusiasts! ♥️

<!--
## Links
-->

<!-- <div class="home-nav">

[Homebrew FOSS by HSP PESUECC](https://homebrew.hsp-ec.xyz/)

[Instagram](https://www.instagram.com/hsp.pesuecc/)

[LinkedIn](https://www.linkedin.com/company/hsp-pesu-ecc/)

[X](https://x.com/hsp_ecc)

[YouTube](https://www.youtube.com/channel/UCtFFsoFIBV0udCCf6ryNFAQ)

</div> -->
