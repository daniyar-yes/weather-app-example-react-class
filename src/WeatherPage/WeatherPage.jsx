import { useEffect, useState } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { IsDayContext } from "./IsDayContext";
import LocationCard from "./LocationCard/LocationCard";
import Thermometer from "./Thermometer/Thermometer";
import Search from "./Search/Search";
import CurrentCondition from "./CurrentCondition/CurrentCondition";

const navLinkStyle = ({ isActive }) => ({
  fontWeight: isActive ? 700 : 400,
  textDecoration: isActive ? "underline" : "none",
});

const WeatherPage = () => {
  /** Bumps on each "refresh" click so useEffect deps change without meaningless true/false flips. */
  const [fetchVersion, setFetchVersion] = useState(0);

  const [conditionImg, setConditionImg] = useState("");
  const [conditionText, setConditionText] = useState("");

  const [responseLocation, setResponseLocation] = useState(null);
  const [temperature, setTemperature] = useState({ tempC: null, tempF: null });

  const [isDay, setIsDay] = useState(null);

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
      setIsDay(result?.current?.is_day);
    }

    loadWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refetch only when `fetchVersion` changes (button); omit city/includeAqi to avoid a request on every keystroke
  }, [apiKey, fetchVersion]);

  const missingCondition = !conditionImg || !conditionText;
  const missingLocation = !responseLocation;

  return (
    <IsDayContext.Provider value={isDay}>
      <div style={{ padding: 16 }}>
        <Search
          city={city}
          onCityChange={setCity}
          includeAqi={includeAqi}
          onIncludeAqiChange={setIncludeAqi}
          onSubmit={handleClick}
        />

        <nav
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 12,
            marginBottom: 12,
          }}
        >
          <NavLink to="/" end style={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/thermometer" style={navLinkStyle}>
            Thermometer
          </NavLink>
          <NavLink to="/location" style={navLinkStyle}>
            Location
          </NavLink>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {!missingCondition ? (
                  <CurrentCondition
                    conditionImg={conditionImg}
                    conditionText={conditionText}
                  />
                ) : null}
                <Thermometer temperature={temperature} />
                <LocationCard responseLocation={responseLocation} />
              </>
            }
          />
          <Route
            path="/thermometer"
            element={<Thermometer temperature={temperature} />}
          />
          <Route
            path="/location"
            element={
              missingLocation ? (
                <p style={{ marginTop: 8 }}>
                  No location data yet. Click <strong>Call Back-End</strong>.
                </p>
              ) : (
                <LocationCard responseLocation={responseLocation} />
              )
            }
          />
          {/* Must be above `path="*"`, or the splat catches /house and sends users to "/" */}
          <Route path="/house" element={<Navigate to="/thermometer" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </IsDayContext.Provider>
  );
};

export default WeatherPage;
