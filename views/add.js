import { htmlWrapper } from './layout.js';

export const addTemplate = () => {
  const content = `
    <h1>Add Restaurant</h1>
    <form action="/restaurants/add" method="POST">
        <input type="text" name="name" class="input-field" placeholder="Restaurant Name" required autofocus maxlength="255">
        <button type="submit" class="btn">Save Restaurant</button>
    </form>
    <a class="nav-link" href="/restaurants">← Cancel and Go Back</a>
  `;
  return htmlWrapper('Add Restaurant', content);
};
