class DashboardManager {
  constructor() {
    this.config = null;
    this.eventId = null;
    this.participantCount = 0;
    this.lastUpdateTime = Date.now();
  }

  async init(eventId) {
    this.eventId = eventId;
    try {
      const response = await fetch('/static/dashboard/events.json');
      if (!response.ok) throw new Error('Failed to load events config');
      this.config = await response.json();
      console.log('Dashboard config loaded:', this.config);
      this.setupDashboard();
      this.startDataFetch();
    } catch (error) {
      console.error('Error loading dashboard config:', error);
      this.showError('Failed to load dashboard configuration');
    }
  }

  setupDashboard() {
    const event = this.config[this.eventId];
    if (!event) {
      this.showError(`Event '${this.eventId}' not found in configuration`);
      return;
    }

    // Set CSS custom properties for theming
    const root = document.documentElement;
    root.style.setProperty('--primary-color', event.colors.primary);
    root.style.setProperty('--primary-color-alpha', event.colors.primaryAlpha || event.colors.primary + '80');
    root.style.setProperty('--primary-color-intense', event.colors.primaryIntense || event.colors.primary);
    root.style.setProperty('--bg-color', event.colors.background);
    root.style.setProperty('--border-color', event.colors.border);
    root.style.setProperty('--glow-color', event.colors.glow);
    root.style.setProperty('--glow-color-intense', event.colors.glowIntense || event.colors.glow);

    // Set background image if available
    const backgroundLayer = document.querySelector('.background-layer');
    if (backgroundLayer && event.poster) {
      backgroundLayer.style.backgroundImage = `url(${event.poster})`;
    }

    document.title = event.title || 'Event Dashboard';

    this.renderDashboard(event);
    this.createHomeBanner(event);
  }

  createHomeBanner(event) {
    setTimeout(() => {
        const banner = document.createElement('div');
        Object.assign(banner.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
            backdropFilter: 'blur(10px)',
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
        
        // Add click handler to go back to home
        banner.addEventListener('click', () => {
            window.location.href = '/';
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
              right: 15px !important;
              top: 15px !important;
              max-width: 200px !important;
              padding: 12px 16px !important;
            }
          }
          
          @media (max-width: 768px) {
            .banner-floating {
              right: 10px !important;
              top: 10px !important;
              padding: 10px 14px !important;
              font-size: 12px !important;
              max-width: 180px !important;
              gap: 8px !important;
              min-height: 50px !important;
            }
            
            .banner-floating img {
              width: 35px !important;
              height: 35px !important;
            }
          }
          
          @media (max-width: 480px) {
            .banner-floating {
              right: 8px !important;
              top: 8px !important;
              padding: 8px 12px !important;
              font-size: 11px !important;
              max-width: 160px !important;
              gap: 6px !important;
              min-height: 45px !important;
            }
            
            .banner-floating img {
              width: 30px !important;
              height: 30px !important;
            }
          }
          
          @media (max-width: 360px) {
            .banner-floating {
              right: 5px !important;
              top: 5px !important;
              padding: 6px 10px !important;
              font-size: 10px !important;
              max-width: 140px !important;
              gap: 5px !important;
              min-height: 40px !important;
            }
            
            .banner-floating img {
              width: 25px !important;
              height: 25px !important;
            }
          }
          
          .banner-floating {
            word-wrap: break-word;
            text-align: center;
          }
        `;
        document.head.appendChild(style);
        
        banner.className = 'banner-floating';

        const img = document.createElement('img');
        img.src = event.poster || "/static/images/gallery/project-expo-2/expo2.0.png";
        img.style.width = '45px';
        img.style.height = '45px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '50%';
        img.style.flexShrink = '0';
        banner.appendChild(img);

        const textContainer = document.createElement('div');
        textContainer.style.display = 'flex';
        textContainer.style.flexDirection = 'column';
        textContainer.style.alignItems = 'center';
        textContainer.style.minWidth = '0';
        
        const homeText = document.createElement('div');
        homeText.textContent = "← HOME";
        homeText.style.fontSize = '11px';
        homeText.style.fontWeight = '500';
        homeText.style.opacity = '0.8';
        homeText.style.marginBottom = '2px';
        textContainer.appendChild(homeText);

        const dashboardText = document.createElement('div');
        dashboardText.textContent = "Dashboard";
        dashboardText.style.fontWeight = 'bold';
        dashboardText.style.fontSize = '13px';
        textContainer.appendChild(dashboardText);
        
        banner.appendChild(textContainer);

        document.body.appendChild(banner);
    }, 1000);
  }

  renderDashboard(event) {
    const container = document.querySelector('.content-container');
    if (!container) {
      console.error('Content container not found');
      return;
    }

    const spinnerSrc = event.spinner || '/static/icons/hsp.svg';
    container.innerHTML = `
      <div class="card">
        <div class="label">${event.displayName || event.title || 'Participants'}</div>
        <div class="number" id="participantCount">${this.participantCount}</div>
        <div class="spinner-container">
          <object data="${spinnerSrc}" type="image/svg+xml" style="width: 100px; height: 100px;"></object>
        </div>
      </div>
    `;
  }

  async fetchParticipantCount() {
    const event = this.config[this.eventId];
    if (!event || !event.gsheetUrl) {
      console.error('No Google Sheets URL configured for event:', this.eventId);
      return;
    }

    try {
      const response = await fetch(event.gsheetUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const csvText = await response.text();
      console.log('Downloaded CSV:', csvText);
      
      // Step 2: Store in array
      const arr = csvText.trim().split(',');
      console.log('Array:', arr);
      
      // Step 3: Use it when called
      let dataColumn = event.dataColumn || 0;
      let count = parseInt(arr[dataColumn]) || 0;
      
      console.log(`Using column ${dataColumn}: ${arr[dataColumn]} -> ${count}`);
      
      this.participantCount = count;
      this.updateDisplay();
      this.lastUpdateTime = Date.now();
      
    } catch (error) {
      console.error('Error fetching participant count:', error);
      this.showError('Failed to load participant data');
    }
  }

  updateDisplay() {
    const countElement = document.getElementById('participantCount');
    if (countElement) {
      countElement.textContent = this.participantCount;
    }
  }

  startDataFetch() {
    // Initial fetch
    this.fetchParticipantCount();
    
    // Set up periodic updates
    const event = this.config[this.eventId];
    const updateInterval = event.updateInterval || 5000; // Default 5 seconds
    
    setInterval(() => {
      this.fetchParticipantCount();
    }, updateInterval);
  }

  showError(message) {
    const container = document.querySelector('.content-container');
    if (container) {
      container.innerHTML = `
        <div class="card">
          <div class="label">Error</div>
          <div style="color: #ff6b6b; font-size: 18px; margin: 20px 0;">${message}</div>
        </div>
      `;
    }
  }

  // Method for floating banner integration
  async initFloatingBanner(targetElement, eventId) {
    this.eventId = eventId;
    try {
      const response = await fetch('/static/dashboard/events.json');
      if (!response.ok) throw new Error('Failed to load events config');
      this.config = await response.json();
      
      const event = this.config[this.eventId];
      if (!event) {
        console.error(`Event '${this.eventId}' not found`);
        return;
      }

      // Set CSS custom properties for theming
      const root = document.documentElement;
      root.style.setProperty('--primary-color', event.colors.primary);
      root.style.setProperty('--primary-color-alpha', event.colors.primaryAlpha || event.colors.primary + '80');
      root.style.setProperty('--border-color', event.colors.border);

      this.startDataFetch();
      
    } catch (error) {
      console.error('Error initializing floating banner:', error);
    }
  }
}

// Export for use in other files
window.DashboardManager = DashboardManager;
