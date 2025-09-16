// Recruitment live banner

setTimeout(() => {
    const banner = document.createElement('div');
    Object.assign(banner.style, {
        position: 'fixed',
        bottom: '28px',
        left: '28px',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        color: '#00ff66',
        padding: '14px 18px',
        borderRadius: '12px',
        fontSize: '15px',
        zIndex: '1100',
        boxShadow: '0 8px 36px rgba(0,0,0,0.65), 0 0 26px rgba(0, 255, 102, 0.36)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        border: '1px solid rgba(0, 255, 102, 0.6)',
        cursor: 'pointer',
        transition: 'transform 0.12s ease, opacity 0.18s ease'
    });

    banner.addEventListener('mouseenter', () => banner.style.transform = 'translateY(-3px) scale(1.02)');
    banner.addEventListener('mouseleave', () => banner.style.transform = 'translateY(0) scale(1)');

    // Navigate to /apply when clicked
    banner.addEventListener('click', (e) => {
        // If user clicked the close button, don't navigate
        if (e.target && e.target.classList && e.target.classList.contains('recruit-close')) return;
        window.location.href = '/apply';
    });

    banner.className = 'recruit-banner';

    const icon = document.createElement('div');
    icon.style.width = '44px';
    icon.style.height = '44px';
    icon.style.borderRadius = '8px';
    icon.style.background = 'linear-gradient(135deg, #001217, #06251c)';
    icon.style.display = 'flex';
    icon.style.alignItems = 'center';
    icon.style.justifyContent = 'center';
    icon.style.flexShrink = '0';

    const dot = document.createElement('div');
    dot.style.width = '10px';
    dot.style.height = '10px';
    dot.style.borderRadius = '50%';
    dot.style.background = '#00ff66';
    dot.style.boxShadow = '0 0 12px rgba(0,255,102,0.95)';
    icon.appendChild(dot);

    banner.appendChild(icon);

    const textWrap = document.createElement('div');
    textWrap.style.display = 'flex';
    textWrap.style.flexDirection = 'column';
    textWrap.style.minWidth = '0';

    const title = document.createElement('div');
    title.textContent = 'Recruitments live';
    title.style.fontWeight = '700';
    title.style.fontSize = '15px';
    title.style.letterSpacing = '0.2px';
    title.style.color = '#eafff0';
    title.style.textShadow = '0 0 8px rgba(0, 255, 102, 0.28)';
    textWrap.appendChild(title);

    const subtitle = document.createElement('div');
    subtitle.textContent = 'Apply now →';
    subtitle.style.fontSize = '12px';
    subtitle.style.opacity = '0.75';
    subtitle.style.marginTop = '2px';
    textWrap.appendChild(subtitle);

    banner.appendChild(textWrap);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'recruit-close';
    closeBtn.setAttribute('aria-label', 'Dismiss recruitment banner');
    Object.assign(closeBtn.style, {
        marginLeft: '8px',
        background: 'transparent',
        border: 'none',
        color: '#d6ffd7',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '6px',
        lineHeight: '1'
    });
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        banner.style.opacity = '0';
        banner.style.pointerEvents = 'none';
        setTimeout(() => banner.remove(), 220);
    });

    banner.appendChild(closeBtn);

    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 640px) {
        .recruit-banner {
          left: 12px !important;
          right: 12px !important;
          bottom: 12px !important;
          width: auto !important;
          padding: 12px !important;
          border-radius: 10px !important;
        }
        .recruit-banner div { word-break: break-word; }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Auto-hide after 12 seconds
    setTimeout(() => {
        if (banner && banner.parentNode) {
            banner.style.opacity = '0';
            banner.style.pointerEvents = 'none';
            setTimeout(() => { if (banner.parentNode) banner.remove(); }, 220);
        }
    }, 12000);

}, 900);
