import { createContext } from "react";

/** Set by WeatherPage from the API; read anywhere under the Provider with useContext(IsDayContext). */
export const IsDayContext = createContext(null);
