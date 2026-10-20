import express from 'express';
import 'dotenv/config';
import { 
  getRandomRestaurant, 
  getAllRestaurants, 
  showAddForm, 
  addRestaurant, 
  deleteRestaurant 
} from './controllers/restaurantController.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// Map Routes to Controller Handlers
app.get('/', getRandomRestaurant);
app.get('/restaurants', getAllRestaurants);
app.get('/restaurants/add', showAddForm);
app.post('/restaurants/add', addRestaurant);
app.post('/restaurants/delete', deleteRestaurant);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
