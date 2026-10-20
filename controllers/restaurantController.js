import pool from '../config/db.js';
import { pickerTemplate } from '../views/picker.js';
import { listTemplate } from '../views/list.js';
import { addTemplate } from '../views/add.js';

export const getRandomRestaurant = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT name FROM restaurant ORDER BY RAND() LIMIT 1');
    const pickedName = rows.length > 0 ? rows[0].name : "No restaurants found!";
    res.send(pickerTemplate(pickedName));
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllRestaurants = async (req, res) => {
  try {
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const search = (req.query.search || '').trim();

    let countQuery = 'SELECT COUNT(*) AS total FROM restaurant';
    let dataQuery = 'SELECT name FROM restaurant';
    let queryParams = [];

    if (search !== '') {
      const matchPattern = `%${search}%`;
      countQuery += ' WHERE name LIKE ?';
      dataQuery += ' WHERE name LIKE ?';
      queryParams.push(matchPattern);
    }

    dataQuery += ' ORDER BY name ASC LIMIT ? OFFSET ?';
    
    const [[{ total }]] = await pool.query(countQuery, queryParams);
    const totalPages = Math.ceil(total / limit);
    const [rows] = await pool.query(dataQuery, [...queryParams, limit, offset]);

    res.send(listTemplate(rows, total, page, totalPages, search));
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const showAddForm = (req, res) => {
  res.send(addTemplate());
};

export const addRestaurant = async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).send("Name field is required.");
  }
  
  try {
    await pool.query('INSERT INTO restaurant (name) VALUES (?)', [name.trim()]);
    res.redirect('/restaurants'); 
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteRestaurant = async (req, res) => {
  const { name, page, search } = req.body;
  
  const params = new URLSearchParams();
  if (page) params.append('page', page);
  if (search) params.append('search', search);
  const queryString = params.toString() ? `?${params.toString()}` : '';

  try {
    await pool.query('DELETE FROM restaurant WHERE name = ?', [name]);
    res.redirect(`/restaurants${queryString}`);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Internal Server Error");
  }
};
