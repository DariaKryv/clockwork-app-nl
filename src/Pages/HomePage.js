import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { FaUmbrella, FaMapMarkerAlt } from "react-icons/fa";
import "./HomePageWeekWeather.css";
import "./HomePageTodayWeather.css";
import icons from "../icons";
import geoLocation from "../components/index.js";

const API_KEY = process.env.REACT_APP_API_KEY;
const LOCATION_API_KEY = process.env.REACT_APP_LOCATION_API_KEY;

export default function HomePage() {
  const [weather, setWeather] = useState([]);
  const [locationName, setLocationName] = useState("Loading your location");
  const locationHook = geoLocation();

  useEffect(() => {
    const fetchWeather = async () => {
      const oneWeekFromNow = dayjs().add(7, "day").toISOString();
      const response = await axios.get(
        `https://api.tomorrow.io/v4/timelines?location=${locationHook.coordinates.lat},${locationHook.coordinates.lng}&fields=temperature&fields=precipitationIntensity&fields=weatherCode&fields=precipitationProbability&units=metric&timesteps=1d&endTime=${oneWeekFromNow}&apikey=${API_KEY}`
      );
      setWeather(response.data.data.timelines[0].intervals);
    };
    const fetchLocationName = async () => {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=${LOCATION_API_KEY}&q=${locationHook.coordinates.lat}+${locationHook.coordinates.lng}&pretty=1`
      );
      setLocationName(response.data.results[0].components.city);
    };
    fetchLocationName();
    fetchWeather();
  }, [locationHook.coordinates.lat, locationHook.coordinates.lng]);
  const today = weather[0];

  return (
    <div className="weatherApp">
      <h1 className="tablo">
        <FaMapMarkerAlt className="locationImg" />
        {locationName}
      </h1>
      <div className="weatherForToday-container">
        {!today ? (
          "Loaded"
        ) : (
          <div className="weatherForToday">
            <img src={icons[today.values.weatherCode]} alt="Weather icon" />
            <div className="dayAndTemp-container">
              <div className="dateToday-Item">
                <p className="weekDayToday">
                  {dayjs(today.startTime).format("dddd")}
                </p>
                <p className="dateDayToday">
                  {dayjs(today.startTime).format("DD/MMM")}
                </p>
              </div>
              <div className="tepmToday-Item">
                <p>
                  {today.values.temperature.toFixed()}
                  <span>°C</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="weekWeather">
        {!weather
          ? "Loading"
          : weather.map((weather) => {
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
                        <img
                          className="temperatureImg"
                          src={icons[weather.values.weatherCode]}
                          alt="weather icon"
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
