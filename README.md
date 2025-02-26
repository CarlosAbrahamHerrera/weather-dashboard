# Simple Weather API

This is my very first API project built with Node.js and Express! It lets you get current weather data for a city, saves your search history, and even lets you delete a city from your history.

## What It Does

- **Get Weather:**  
  Send a city name and receive the current weather info.
  
- **Search History:**  
  Saves the cities you search for so you can see them later.
  
- **Delete History:**  
  Remove a city from your search history if you want.

## How to Run It

1. **Install Node.js:**  
   Download and install Node.js from [nodejs.org](https://nodejs.org).

2. **Clone This Repository:**

   ~~~bash
   git clone https://github.com/yourusername/simple-weather-api.git
   cd simple-weather-api
   ~~~

3. **Install Dependencies:**

   ~~~bash
   npm install
   ~~~

4. **Create a `.env` File:**  
   In the root folder, create a file called `.env` and add your configuration:

   ~~~dotenv
   PORT=3001
   OPENWEATHER_API_KEY=your_api_key_here
   ~~~

5. **Start the Server:**

   ~~~bash
   npm start
   ~~~

   The server will run at [http://localhost:3001](http://localhost:3001).

## API Endpoints

### Get Weather
- **Endpoint:** `POST /`
- **Description:**  
  Send a JSON body with a city name and get the weather.
- **Example Request:**

   ~~~json
   {
     "city": "New York"
   }
   ~~~

- **Example Response:**

   ~~~json
   {
     "city": "New York",
     "weatherData": {
       "temperature": 20,
       "description": "sunny"
     }
   }
   ~~~

### Get Search History
- **Endpoint:** `GET /history`
- **Description:**  
  Get a list of cities you've searched for.
- **Example Response:**

   ~~~json
   [
     { "name": "New York", "id": 1 },
     { "name": "London", "id": 2 }
   ]
   ~~~

### Delete a City from History
- **Endpoint:** `DELETE /history/:id`
- **Description:**  
  Remove a city from your search history.
- **Example Response:**

   ~~~json
   { "message": "City removed successfully" }
   ~~~

## Thanks!

Thanks for checking out my project. I hope this simple API helps you learn how to build your own weather app. Happy coding!


