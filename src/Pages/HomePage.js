import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { FaTemperatureLow, FaCloudRain, FaMapMarkerAlt } from "react-icons/fa";
import "./HomePage.css";
const API_KEY = process.env.REACT_APP_API_KEY;

export default function HomePage() {
  const [weather, setWeather] = useState([]);

  const fetchData = async () => {
    const oneWeekFromNow = dayjs().add(7, "day").toISOString();
    const response = await axios.get(
      `https://api.tomorrow.io/v4/timelines?location=52.3676,4.9041&fields=temperature&fields=precipitationIntensity&fields=precipitationProbability&units=metric&timesteps=1d&endTime=${oneWeekFromNow}&apikey=${API_KEY}`
    );
    setWeather(response.data.data.timelines[0].intervals);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="weatherApp">
      <h1 className="tablo">
        Amsterdam <FaMapMarkerAlt />
      </h1>
      <div className="weekWeather">
        {!weather
          ? "Loading"
          : weather.map((weather) => {
              const dayOfTheWeek = dayjs(weather.startTime).format("ddd");
              const date = dayjs(weather.startTime).format("DD/MM");
              return (
                <div className="weatherCard" key={weather.startTime}>
                  <div className="dateTime">
                    <p className="dayOfTheWeek">{dayOfTheWeek}</p>
                    <p className="date">{date}</p>
                  </div>
                  <FaTemperatureLow />
                  <p className="temperature">
                    {weather.values.temperature.toFixed()}°C
                  </p>
                  <FaCloudRain />
                  <p className="rain">
                    {weather.values.precipitationProbability}%
                  </p>
                </div>
              );
            })}
      </div>
    </div>
  );
}
