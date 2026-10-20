import { htmlWrapper } from './layout.js';

export const pickerTemplate = (restaurantName) => {
  const content = `
    <h1>${restaurantName}</h1>
    <button class="btn" onclick="window.location.reload()">Pick a Restaurant</button>
    <a class="nav-link" href="/restaurants">Manage All Restaurants →</a>
  `;
  return htmlWrapper('Random Restaurant Picker', content);
};
