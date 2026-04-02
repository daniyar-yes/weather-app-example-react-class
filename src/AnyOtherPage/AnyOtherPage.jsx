import { useEffect, useState } from "react";

const WeatherPage = () => {
  const [flagForReload, setFlagForReload] = useState(false);

  const [conditionImg, setConditionImg] = useState('')
  const [conditionText, setConditionText] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')


  function handleClick() {
    setFlagForReload(!flagForReload)
  }

  useEffect(() => {
    async function loadWeather() {
      const response = await fetch('http://api.weatherapi.com/v1/current.json?key={}&q=Kansas City&aqi=yes');
      const result = await response.json();

      setConditionImg(result?.current?.condition?.icon)
      setConditionText(result?.current?.condition?.text)
      setLastUpdated(result?.current?.last_updated)
      console.log(result)
    }

    loadWeather();
  }, [flagForReload]);

  return (
    <>
      Today's Weather is:
      <button onClick={handleClick}>Call Back-End</button>
      <br></br>

      {conditionImg && <img src={conditionImg} alt='' />}
      {conditionText && <p>{conditionText}</p>}
      {lastUpdated && <p>{lastUpdated}</p>}
    </>
  );
};

export default WeatherPage;
