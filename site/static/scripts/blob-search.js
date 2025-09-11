// blob-search.js
// Command+K search for posts using static/featured.json

(function() {
  // Load posts from featured.json
  async function fetchPosts() {
    const res = await fetch('/static/index.json');
    if (!res.ok) return [];
    const data = await res.json();
    // Convert object to array of post objects
    return Object.entries(data).map(([key, value]) => ({
      url: value.CompleteURL || key,
      title: value.Frontmatter?.Title || key,
      description: value.Frontmatter?.Description || '',
      tags: value.Frontmatter?.Tags || [],
      preview: value.Frontmatter?.PreviewImage || '',
    }));
  }

  // Create search modal
  function createModal() {
    const modal = document.createElement('div');
    modal.id = 'blob-search-modal';
    modal.style = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.18);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      z-index: 9999; visibility: hidden;
    `;
    modal.innerHTML = `
      <div id="blob-search-popup" style="background: #181a1b; color: #f3f3f3; border-radius: 18px; box-shadow: 0 8px 32px rgba(0,0,0,0.28); padding: 2em 2.2em; min-width: 320px; max-width: 480px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; align-items: stretch;">
        <input id="blob-search-input" type="text" placeholder="Search posts..." style="width: 100%; font-size: 1.2em; padding: 0.5em; border-radius: 8px; border: 1px solid #333; background: #222; color: #f3f3f3; margin-bottom: 1em;" />
        <ul id="blob-search-results" style="list-style:none; padding:0; margin:0; max-height: 320px; overflow-y: auto;"></ul>
        <button id="blob-search-close" style="margin-top:1em; align-self: flex-end; background:#222; color:#fff; border:none; border-radius:6px; padding:0.5em 1.2em; font-size:1em; cursor:pointer;">Close</button>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  // Show/hide modal
  function showModal() {
    modal.style.visibility = 'visible';
    input.focus();
  }
  function hideModal() {
    modal.style.visibility = 'hidden';
    input.value = '';
    results.innerHTML = '';
  }

  // Search logic
  function searchPosts(posts, query) {
    query = query.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      (post.description && post.description.toLowerCase().includes(query)) ||
      (post.tags && post.tags.join(' ').toLowerCase().includes(query))
    );
  }

  // Main
  let posts = [];
  const modal = createModal();
  const input = modal.querySelector('#blob-search-input');
  const results = modal.querySelector('#blob-search-results');
  modal.querySelector('#blob-search-close').onclick = hideModal;

  fetchPosts().then(data => { posts = data; });

  input.oninput = function() {
    const found = searchPosts(posts, input.value);
    results.innerHTML = found.map(post =>
      `<li style='margin-bottom:1.4em; padding-bottom:0.4em; border-bottom:1px solid rgba(255,255,255,0.07);'>
        <a href='/${post.url}' style='font-size:1.1em; color:#fff; text-decoration:none; font-weight:bold;'>${post.title}</a><br>
        <span style='color:#eaeaea; font-size:0.98em;'>${post.description || ''}</span>
        ${post.tags && post.tags.length ? `<br><span style='font-size:0.9em; color:#00fb6b;'>${post.tags.join(', ')}</span>` : ''}
      </li>`
    ).join('') || `<li style='color:#888;'>No results</li>`;
  };

  // Command+K listener
  window.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      showModal();
    }
    if (e.key === 'Escape') hideModal();
  });
})();
