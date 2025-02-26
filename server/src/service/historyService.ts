import { promises as fs } from 'fs';
import path from 'path';

// Define the City class
class City {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

// Define the HistoryService class
class HistoryService {
  private filePath = path.join(__dirname, '../data/searchHistory.json');

  // Read from searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data) as City[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      console.error('Error reading file:', error);
      throw error;
    }
  }

  // Write updated cities array to searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf8');
    } catch (error) {
      console.error('Error writing to file:', error);
      throw error;
    }
  }

  // Get all cities from searchHistory.json
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  // Add a new city to searchHistory.json
  async addCity(cityName: string): Promise<void> {
    const cities = await this.read();
    const id = cities.length > 0 ? Math.max(...cities.map(c => c.id)) + 1 : 1; // Auto-increment ID
    const newCity = new City(cityName, id);
    
    cities.push(newCity);
    await this.write(cities);
  }

  // Remove a city by ID from searchHistory.json
  async removeCity(id: number): Promise<boolean> {
    let cities = await this.read();
    const initialLength = cities.length;
    
    cities = cities.filter(city => city.id !== id);

    if (cities.length === initialLength) {
      return false; // No city was removed (ID not found)
    }

    await this.write(cities);
    return true;
  }
}

export default new HistoryService();
