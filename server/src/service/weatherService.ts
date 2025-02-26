import dotenv from 'dotenv';
dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// Define a class for the Weather object
class Weather {
  temperature: number;
  description: string;

  constructor(temperature: number, description: string) {
    this.temperature = temperature;
    this.description = description;
  }
}

// Complete the WeatherService class
class WeatherService {
  // Expose getWeather as a public method that retrieves weather for a given city
  public getWeather: (city: string) => Promise<Weather>;

  // Define base URLs and API key
  private baseGeocodeURL: string = 'http://api.openweathermap.org/geo/1.0/direct';
  private baseWeatherURL: string = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey: string = process.env.OPENWEATHER_API_KEY || '';

  constructor() {
    // Bind the getWeather method so that it always has the correct "this"
    this.getWeather = this.getWeatherForCity.bind(this);
  }

  // Fetch the location data for a city and return its coordinates
  private async fetchLocationData(city: string): Promise<Coordinates | null> {
    const query = this.buildGeocodeQuery(city);
    const response = await fetch(query);
    const data = await response.json();
    if (data && data.length > 0) {
      return this.destructureLocationData(data[0]);
    }
    return null;
  }

  // Extract the latitude and longitude from the geocode response
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }

  // Build the URL for the geocoding API request
  private buildGeocodeQuery(city: string): string {
    return `${this.baseGeocodeURL}?q=${encodeURIComponent(city)}&limit=1&appid=${this.apiKey}`;
  }

  // Build the URL for the weather API request using the coordinates
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseWeatherURL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // Fetch weather data given coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    return response.json();
  }

  // Parse the current weather response into our Weather object
  private parseCurrentWeather(response: any): Weather {
    const temperature = response.main?.temp;
    const description = response.weather?.[0]?.description;
    return new Weather(temperature, description);
  }

  // Optionally, build a forecast array from additional weather data (stub implementation)
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    return weatherData.map(data => new Weather(data.main.temp, data.weather[0].description));
  }

  // Retrieve current weather data for a city
  async getWeatherForCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchLocationData(city);
    if (!coordinates) {
      throw new Error('Location not found');
    }
    const weatherResponse = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherResponse);
    return currentWeather;
  }
}

export default new WeatherService();
