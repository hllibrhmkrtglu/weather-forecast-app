import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { apiKey } from './weather';
import { turkishCities } from './turkeyCities';
import "./App.css"

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=tr&units=metric&appid=${apiKey}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const formattedCity = turkishCities.find(c => c.toLowerCase() === city.toLowerCase());
    if (formattedCity) {
      setCity(formattedCity);
      fetchData();
    } else {
      setWeatherData(null);
    }
  }, [city]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const filterFiveDaysData = () => {
    // Sadece 5 günü al
    const filteredData = weatherData.list.filter((item, index) => index % 8 === 0);
    return filteredData;
  };

  return (
    <div className='App'>
      <h1 className='tittle'>Günlük Hava Durumu</h1>
      <input
        className='citySerch'
        type="text"
        placeholder="Şehir Giriniz.."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {weatherData ? (
        <div className='container'>
          <h2>{capitalizeFirstLetter(weatherData.city.name)}</h2>
          <div className="daily-weather-container">
            {filterFiveDaysData().map((item, index) => (
              <div key={index} className="daily-weather">
                <p>{item.dt_txt.split(' ')[0]}</p>
                <p>Sıcaklık: {item.main.temp} °C</p>
                <p>Hava: {capitalizeFirstLetter(item.weather[0].description)}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='contain'>
          <h2>Hava Durumu Bilgisini Alın!</h2>
          <p>Şehir adınızı girerek 5 günlük hava durumu bilgisini öğrenin.</p>
        </div>
      )}

    </div>
  );
}

export default App;
