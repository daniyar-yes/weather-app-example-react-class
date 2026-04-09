import React from "react";
import GeoLocation from "./GeoLocation/GeoLocation";

const LocationCard = ({ responseLocation }) => {
  if (!responseLocation) return;

  const name = responseLocation?.name;
  const country = responseLocation?.country;
  const region = responseLocation?.region;
  const timeZone = responseLocation?.tz_id;
  const coordinates = {
    lat: responseLocation?.lat,
    lon: responseLocation?.lon,
  };
  const localTime = responseLocation?.localtime;

  return (
    <div>
      <GeoLocation city={name} lat={coordinates.lat} lon={coordinates.lon} />
      <br></br>
      <div>Country: {country}</div>
      <div>Region: {region}</div>
      <div>Timezone: {timeZone}</div>
      <div>Local date & time: {localTime}</div>
    </div>
  );
};

export default LocationCard;
