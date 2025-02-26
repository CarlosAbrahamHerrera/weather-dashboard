import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    // Fetch weather data from WeatherService
    const weatherData = await WeatherService.getWeather(city);

    // Save city to search history
    await HistoryService.addCity(city);

    res.json({ city, weatherData });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET Request: Retrieve search history
router.get('/history', async (req, res) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// BONUS: DELETE Request: Remove a city from search history by ID
router.delete('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Convert id to a number (assuming IDs are stored as numbers)
    const removed = await HistoryService.removeCity(Number(id));
    if (!removed) {
      return res.status(404).json({ error: 'City not found in history' });
    }
    res.json({ message: 'City removed from history successfully' });
  } catch (error) {
    console.error('Error deleting city from history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
