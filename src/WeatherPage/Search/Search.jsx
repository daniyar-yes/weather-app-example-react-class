import React from "react";

const Search = ({
  city,
  onCityChange,
  includeAqi,
  onIncludeAqiChange,
  onSubmit,
  isDay
}) => (
  <div style={{background: isDay ? 'yellow' : 'blue', padding: '10px'}}>
    <input
      type="text"
      value={city}
      onChange={(e) => onCityChange(e.target.value)}
      placeholder="City or location"
      aria-label="Location search"
    />
    <label style={{ marginLeft: 8, userSelect: "none" }}>
      <input
        type="checkbox"
        name="includeAir"
        checked={includeAqi}
        onChange={(e) => onIncludeAqiChange(e.target.checked)}
      />{" "}
      Include AQI
    </label>
    <button type="button" onClick={onSubmit} style={{ marginLeft: 8 }}>
      Call Back-End
    </button>
  </div>
);

export default Search;
