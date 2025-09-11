
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
    img.src = "/static/images/gallery/modal-editors/modal-editors.png";
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
