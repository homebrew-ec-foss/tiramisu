/**
 * Enhanced featured post loader that works with featured.json
 * Loads and updates featured cards dynamically with lazy loading support
 */

class FeaturedPostLoader {
    constructor() {
        this.featuredData = null;
        this.isLoaded = false;
        this.isLoading = false;
        this.observer = null;
        this.featuredContainer = null;
        this.lazyLoadingEnabled = true;
    }

    // Method to disable lazy loading (useful for immediate loading)
    disableLazyLoading() {
        this.lazyLoadingEnabled = false;
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }

    // Method to enable lazy loading
    enableLazyLoading() {
        this.lazyLoadingEnabled = true;
        if (!this.isLoaded) {
            this.setupLazyLoading();
        }
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupLazyLoading());
        } else {
            this.setupLazyLoading();
        }
    }

    setupLazyLoading() {
        if (!this.lazyLoadingEnabled) return;

        this.featuredContainer = document.querySelector('#featured-section');
        
        if (!this.featuredContainer) {
            console.warn('Featured section container not found');
            return;
        }

        // Create intersection observer with some margin to preload before visible
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isLoaded && !this.isLoading) {
                    this.loadFeaturedContent();
                }
            });
        }, {
            root: null,
            rootMargin: '100px', // Start loading 100px before the section is visible
            threshold: 0.1
        });

        this.observer.observe(this.featuredContainer);
    }

    async loadFeaturedData() {
        if (this.isLoaded && this.featuredData) {
            return this.featuredData;
        }

        try {
            const response = await fetch('/static/featured.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.featuredData = await response.json();
            this.isLoaded = true;
            return this.featuredData;
        } catch (error) {
            console.error('Error fetching featured.json:', error);
            throw error;
        }
    }

    async loadFeaturedContent() {
        if (this.isLoading || this.isLoaded) return;
        
        this.isLoading = true;
        this.showLoadingState();

        try {
            // Simulate network delay for better UX (remove in production if not needed)
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Load the featured content
            await this.renderFeaturedCards();
            
            this.isLoaded = true;
            this.hideLoadingState();
            
            // Disconnect observer as we no longer need it
            if (this.observer) {
                this.observer.disconnect();
            }
            
        } catch (error) {
            console.error('Failed to load featured content:', error);
            this.showErrorState();
        } finally {
            this.isLoading = false;
        }
    }

    showLoadingState() {
        if (!this.featuredContainer) return;

        const loadingHTML = `
            <div class="featured-loading">
                <div class="featured-skeleton">
                    ${Array(4).fill(0).map(() => `
                        <div class="skeleton-card">
                            <div class="skeleton-image"></div>
                            <div class="skeleton-content">
                                <div class="skeleton-title"></div>
                                <div class="skeleton-date"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        this.featuredContainer.innerHTML = loadingHTML;
    }

    hideLoadingState() {
        if (!this.featuredContainer) return;
        
        const loadingElement = this.featuredContainer.querySelector('.featured-loading');
        if (loadingElement) {
            loadingElement.remove();
        }
    }

    showErrorState() {
        if (!this.featuredContainer) return;

        const errorHTML = `
            <div class="featured-error">
                <p>Failed to load featured content. <button onclick="window.featuredPostLoader.loadFeaturedContent()">Try again</button></p>
            </div>
        `;
        
        this.featuredContainer.innerHTML = errorHTML;
    }

    generateFeaturedCardsHTML(cards) {
        return cards.map(card => `
            <a href="${card.link}" 
               style="text-decoration: none; color: inherit; display: flex; flex-direction: column; padding: 0.6rem; border-radius: 8px; background-color: rgba(0,0,0,0.02); transition: background-color 0.15s ease; flex: 1;"
               data-card-id="${card.id}">
                <div style="width: 100%; height: 120px; background-image: url('${card.image}'); background-size: cover; background-position: center; border-radius: 6px; margin-bottom: 0.4rem;"></div>
                <h4 style="font-size: 0.9rem; margin: 0 0 0.2rem 0; color: var(--color-primary);">${card.title}</h4>
                <p style="font-size: 0.7rem; margin: 0; color: var(--color-text-dim);">${card.date}</p>
            </a>
        `).join('');
    }

    generateVideoHTML(videos) {
        return videos.map(video => {
            const iframeAttrs = video.type === 'youtube-nocookie' 
                ? 'id="ytplayer" type="text/html" width="640" height="360"'
                : 'width="560" height="315"';
            
            const allowAttrs = video.type === 'youtube-nocookie' 
                ? ''
                : 'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen';

            return `
                <div class="video-container">
                    <iframe ${iframeAttrs} 
                            src="${video.embedUrl}" 
                            title="${video.title}" 
                            frameborder="0" 
                            ${allowAttrs}></iframe>
                </div>
            `;
        }).join('');
    }

    generateSocialEmbedsHTML(embeds) {
        return embeds.map(embed => {
            switch(embed.type) {
                case 'twitter':
                    return `
                        <blockquote class="twitter-tweet" data-theme="${embed.theme || 'dark'}">
                            <p>${embed.content}</p>
                            <a href="https://twitter.com/hsp_ecc/status/${embed.tweetId}">View Tweet</a>
                        </blockquote>
                    `;
                case 'linkedin':
                    return `
                        <iframe src="${embed.embedUrl}" 
                                height="${embed.height || '665'}" 
                                width="100%" 
                                frameborder="0" 
                                allowfullscreen="" 
                                title="Embedded post"></iframe>
                    `;
                case 'instagram':
                    return `
                        <blockquote class="instagram-media" 
                                    data-instgrm-captioned 
                                    data-instgrm-permalink="${embed.permalink}" 
                                    data-instgrm-version="14" 
                                    style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
                            <div style="padding:16px;">
                                <a href="${embed.permalink}" target="_blank">
                                    <p>${embed.caption}</p>
                                </a>
                            </div>
                        </blockquote>
                    `;
                default:
                    return '';
            }
        }).join('');
    }

    async generateFullFeaturedHTML() {
        const data = await this.loadFeaturedData();
        
        const cardsHTML = this.generateFeaturedCardsHTML(data.featured_cards);
        const videosHTML = this.generateVideoHTML(data.featured_videos);
        const socialHTML = this.generateSocialEmbedsHTML(data.social_embeds);

        return `
            <div class="featured-card">
                <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                    ${cardsHTML}
                </div>
            </div>
            
            <div></div>
            
            <div class="video-card">
                <div class="video-card">
                    <div class="video-card">
                        ${videosHTML}
                    </div>
                </div>
            </div>
            
            ${socialHTML}
        `;
    }

    async renderFeaturedCards() {
        try {
            // Generate HTML from JSON data
            const featuredHTML = await this.generateFullFeaturedHTML();

            // Set the content with fade-in effect
            if (this.featuredContainer) {
                this.featuredContainer.innerHTML = featuredHTML;
                this.featuredContainer.style.opacity = '0';
                this.featuredContainer.style.transition = 'opacity 0.3s ease-in-out';
                
                // Trigger fade-in
                requestAnimationFrame(() => {
                    this.featuredContainer.style.opacity = '1';
                });
            }
            
            // Load external scripts for social media embeds
            this.loadSocialScripts();
            
            // Initialize any featured card functionality
            this.initializeFeaturedCards();
            
        } catch (error) {
            console.error('Error rendering featured cards:', error);
            throw error; // Re-throw to trigger error state
        }
    }

    loadSocialScripts() {
        // Load Instagram embed script
        if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
            const instagramScript = document.createElement('script');
            instagramScript.async = true;
            instagramScript.src = '//www.instagram.com/embed.js';
            document.head.appendChild(instagramScript);
        }
        
        // Load Twitter widgets script
        if (!document.querySelector('script[src*="platform.twitter.com/widgets.js"]')) {
            const twitterScript = document.createElement('script');
            twitterScript.async = true;
            twitterScript.charset = 'utf-8';
            twitterScript.src = 'https://platform.twitter.com/widgets.js';
            document.head.appendChild(twitterScript);
        }
    }

    async initializeFeaturedCards() {
        // This function can be called after dynamic loading
        // to update any existing cards with fresh data
        const cards = document.querySelectorAll('.featured-card a[data-card-id]');
        
        if (cards.length === 0) return;

        try {
            const data = await this.loadFeaturedData();
            
            cards.forEach(cardElement => {
                const cardId = cardElement.dataset.cardId;
                const cardData = data.featured_cards.find(card => card.id === cardId);
                
                if (cardData) {
                    // Update image
                    const imageDiv = cardElement.querySelector('div[style*="background-image"]');
                    if (imageDiv && cardData.image) {
                        imageDiv.style.backgroundImage = `url('${cardData.image}')`;
                    }
                    
                    // Update title
                    const titleElement = cardElement.querySelector('h4');
                    if (titleElement && cardData.title) {
                        titleElement.textContent = cardData.title;
                    }
                    
                    // Update date
                    const dateElement = cardElement.querySelector('p');
                    if (dateElement && cardData.date) {
                        dateElement.textContent = cardData.date;
                    }
                    
                    // Update link
                    if (cardData.link) {
                        cardElement.href = cardData.link;
                    }
                }
            });
        } catch (error) {
            console.error('Error initializing featured cards:', error);
        }
    }
}

// Create global instance
window.featuredPostLoader = new FeaturedPostLoader();

// Initialize lazy loading
window.featuredPostLoader.init();

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    // Auto-initialize if cards are already present and lazy loading is disabled
    if (!window.featuredPostLoader.lazyLoadingEnabled && 
        document.querySelectorAll('.featured-card a[data-card-id]').length > 0) {
        window.featuredPostLoader.initializeFeaturedCards();
    }
});

// Export for use in other scripts
window.initializeFeaturedCards = () => window.featuredPostLoader.initializeFeaturedCards();

// Legacy compatibility - expose as featuredLoader as well
window.featuredLoader = window.featuredPostLoader;