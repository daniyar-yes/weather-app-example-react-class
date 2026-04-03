import { useEffect, useState } from "react";
import LocationCard from "./LocationCard/LocationCard";
import Termometer from "./Termometer/Termometer";

const WeatherPage = () => {
  /** Bumps on each "refresh" click so useEffect deps change without meaningless true/false flips. */
  const [fetchVersion, setFetchVersion] = useState(0);

  const [conditionImg, setConditionImg] = useState('')
  const [conditionText, setConditionText] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')

  const [responseLocation, setResponseLocation] = useState(null);
  const [temperature, setTemperature] = useState({ tempC: null, tempF: null})

  const baseUrl = 'https://api.weatherapi.com';
  const endpoint = 'v1/current.json';
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const cityParam = 'q';
  const city = 'London';
  const airParam = 'aqi';
  const includeAir = 'yes';
  console.log('render')

  function handleClick() {
    setFetchVersion((v) => v + 1);
  }

  useEffect(() => {
    async function loadWeather() {
      if (!apiKey) {
        console.error('Missing VITE_WEATHER_API_KEY. Copy .env.example to .env.local and set your key.');
        return;
      }

      const url = new URL(`${baseUrl}/${endpoint}`);
      url.searchParams.set('key', apiKey);
      url.searchParams.set(cityParam, city);
      url.searchParams.set(airParam, includeAir);

      const response = await fetch(url);
      const result = await response.json();
      console.log(result);

      setConditionImg(result?.current?.condition?.icon);
      setConditionText(result?.current?.condition?.text);
      setLastUpdated(result?.current?.last_updated);
      setResponseLocation(result?.location);
      setTemperature({tempC: result?.current?.temp_c, tempF: result?.current?.temp_f})
    }

    loadWeather();
  }, [apiKey, fetchVersion]);

  return (
    <>
      Today's Weather is:
      <button onClick={handleClick}>Call Back-End</button>
      <br></br>
      <LocationCard responseLocation={responseLocation}/>
      <Termometer temperature={temperature}/>
      {conditionImg && <img src={conditionImg} alt='' />}
      {conditionText && <p>Currently: {conditionText}</p>}
      {lastUpdated ? <p>{lastUpdated}</p> : <p>Can't tell if udpated</p>}
    </>
  );
};

export default WeatherPage;
