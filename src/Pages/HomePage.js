import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { FaTemperatureLow, FaUmbrella, FaMapMarkerAlt } from "react-icons/fa";
import "./HomePage.css";
import icons from "../icons";
import geoLocation from "../components/index.js";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function HomePage() {
  const [weather, setWeather] = useState([]);
  // const [location, setLocation] = useState({ lat: "52.3676", lng: "4.9041" });
  const locationHook = geoLocation();
  const fetchData = async () => {
    const oneWeekFromNow = dayjs().add(7, "day").toISOString();
    const response = await axios.get(
      `https://api.tomorrow.io/v4/timelines?location=${locationHook.coordinates.lat},${locationHook.coordinates.lng}&fields=temperature&fields=precipitationIntensity&fields=weatherCode&fields=precipitationProbability&units=metric&timesteps=1d&endTime=${oneWeekFromNow}&apikey=${API_KEY}`
    );
    setWeather(response.data.data.timelines[0].intervals);
  };

  useEffect(() => {
    fetchData();
  }, [locationHook.coordinates.lat, locationHook.coordinates.lng]);
  const today = weather[0];

  return (
    <div className="weatherApp">
      {locationHook.loaded
        ? JSON.stringify(locationHook)
        : "Location data not available yet."}
      <h1 className="tablo">
        Amsterdam <FaMapMarkerAlt className="locationImg" />
      </h1>
      <div className="weatherForToday">
        {!today ? (
          "Loaded"
        ) : (
          <div className="todayWeather">
            <img src={icons[today.values.weatherCode]} />
            {console.log("WEATHER", today.startTime)}
            <p>{dayjs(today.startTime).format("ddd")}</p>
            <p>{dayjs(today.startTime).format("DD/MMM")}</p>
            <p className="todayTepm">{today.values.temperature.toFixed()}°C</p>
          </div>
        )}
      </div>
      <div className="weekWeather">
        {!weather
          ? "Loading"
          : weather.map((weather) => {
              // console.log("TODAY", today);
              console.log("weatherCode", weather.values.weatherCode);
              const dayOfTheWeek = dayjs(weather.startTime).format("ddd");
              const date = dayjs(weather.startTime).format("DD/MMM");
              return (
                <div className="weatherWall" key={weather.startTime}>
                  <div className="weatherCard">
                    <div className="dateTime">
                      <p className="dayOfTheWeek">{dayOfTheWeek}</p>
                      <p className="date">{date}</p>
                    </div>
                    <div className="tempItem">
                      <p>
                        {/* <FaTemperatureLow className="temperatureImg" /> */}
                        <img
                          className="temperatureImg"
                          src={icons[weather.values.weatherCode]}
                        />
                      </p>
                      <p className="temperature">
                        {weather.values.temperature.toFixed()}°C
                      </p>
                    </div>
                    <div className="umbrellaItem">
                      <FaUmbrella className="umbrellaImg" />
                      <p className="rain">
                        {weather.values.precipitationProbability}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
