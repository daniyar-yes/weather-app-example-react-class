import { useEffect, useState } from "react";
import LocationCard from "./LocationCard/LocationCard";
import Termometer from "./Termometer/Termometer";
import Search from "./Search/Search";

const WeatherPage = () => {
  /** Bumps on each "refresh" click so useEffect deps change without meaningless true/false flips. */
  const [fetchVersion, setFetchVersion] = useState(0);

  const [conditionImg, setConditionImg] = useState("");
  const [conditionText, setConditionText] = useState("");

  const [responseLocation, setResponseLocation] = useState(null);
  const [temperature, setTemperature] = useState({ tempC: null, tempF: null });

  const [city, setCity] = useState("Dallas");
  const [includeAqi, setIncludeAqi] = useState(true);

  const baseUrl = "https://api.weatherapi.com";
  const endpoint = "v1/current.json";
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const cityParam = "q";
  const airParam = "aqi";

  function handleClick() {
    setFetchVersion((v) => v + 1);
  }

  useEffect(() => {
    async function loadWeather() {
      if (!apiKey) {
        console.error(
          "Missing VITE_WEATHER_API_KEY. Copy .env.example to .env.local and set your key.",
        );
        return;
      }

      const url = new URL(`${baseUrl}/${endpoint}`);
      url.searchParams.set("key", apiKey);
      url.searchParams.set(cityParam, city);
      url.searchParams.set(airParam, includeAqi ? "yes" : "no");

      const response = await fetch(url);
      const result = await response.json();
      console.log(result);

      setConditionImg(result?.current?.condition?.icon);
      setConditionText(result?.current?.condition?.text);
      setResponseLocation(result?.location);
      setTemperature({
        tempC: result?.current?.temp_c,
        tempF: result?.current?.temp_f,
      });
    }

    loadWeather();
  }, [apiKey, fetchVersion]);

  return (
    <>
      <Search
        city={city}
        onCityChange={setCity}
        includeAqi={includeAqi}
        onIncludeAqiChange={setIncludeAqi}
        onSubmit={handleClick}
      />

      {conditionImg && conditionText ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={conditionImg} alt="" />
          <p>Currently: {conditionText}</p>
        </div>
      ) : null}
      
      <Termometer temperature={temperature} />
      <LocationCard responseLocation={responseLocation} />
    </>
  );
};

export default WeatherPage;
