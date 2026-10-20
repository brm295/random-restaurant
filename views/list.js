import { htmlWrapper } from './layout.js';

export const listTemplate = (restaurants, totalCount, currentPage, totalPages, searchQuery) => {
  const mappedItems = restaurants.map(r => `
    <li style="padding: 0.75rem 1rem; border-bottom: 1px solid #e0e0e0; color: #444; display: flex; justify-content: space-between; align-items: center;">
        <span>${r.name}</span>
        <form action="/restaurants/delete" method="POST" style="margin:0;" onsubmit="return confirm('Are you sure you want to delete ${r.name}?');">
            <input type="hidden" name="name" value="${r.name}">
            <input type="hidden" name="page" value="${currentPage}">
            <input type="hidden" name="search" value="${searchQuery}">
            <button type="submit" class="btn btn-danger">Delete</button>
        </form>
    </li>
  `).join('');

  const listContainer = restaurants.length === 0 
    ? '<p style="text-align: center; color: #666;">No matching restaurants found.</p>' 
    : `<ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; border: 1px solid #e0e0e0; border-radius: 4px; text-align: left;">${mappedItems}</ul>`;

  const searchParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : '';
  const prevClass = currentPage <= 1 ? 'disabled' : '';
  const nextClass = currentPage >= totalPages ? 'disabled' : '';

  const content = `
    <h1 style="justify-content: center;">Restaurants <span class="badge">${totalCount}</span></h1>
    
    <form method="GET" action="/restaurants" id="search-form">
        <input type="text" name="search" id="search-bar" class="input-field" placeholder="Search all restaurants..." value="${searchQuery}" autocomplete="off">
    </form>
    
    <a href="/restaurants/add" class="btn">+ Add New Restaurant</a>

    ${listContainer}

    <div class="pagination-container">
        <a href="/restaurants?page=1" class="btn-page ${prevClass}">← First</a>
        <a href="/restaurants?page=${currentPage - 1}${searchParam}" class="btn-page ${prevClass}">← Prev</a>
        <span class="page-info">Page ${currentPage} of ${totalPages || 1}</span>
        <a href="/restaurants?page=${currentPage + 1}${searchParam}" class="btn-page ${nextClass}">Next →</a>
        <a href="/restaurants?page=${totalPages}" class="btn-page ${nextClass}">Last →</a>
    </div>
    
    <div style="text-align: center;">
        <a class="nav-link" href="/">← Go Back to Picker</a>
    </div>

    <script>
        const searchBar = document.getElementById('search-bar');
        const searchForm = document.getElementById('search-form');
        
        let typingTimer;
        searchBar.addEventListener('input', () => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                searchForm.submit();
            }, 400);
        });

        const val = searchBar.value;
        searchBar.value = '';
        searchBar.value = val;
        searchBar.focus();
    </script>
  `;

  return htmlWrapper('All Restaurants', content);
};
