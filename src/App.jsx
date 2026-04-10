import { Route, Routes } from "react-router-dom";
import WeatherPage from "./WeatherPage/WeatherPage";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<WeatherPage />} />
    </Routes>
  );
}

export default App;
