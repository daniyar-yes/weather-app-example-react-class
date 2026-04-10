import styles from "./GeoLocation.module.css";
import SunMoon from "./SunMoon/SunMoon";
import mapGif from '../../../assets/map.gif'

/** Nested <svg> size; top-left offset by half so center matches old circle cx/cy (same % viewport). */
const ICON = 12;
const ICON_HALF = ICON / 2;

const GeoLocation = ({ city, lat, lon }) => {
  const lonFactorX = (lon / 360) * 100;
  const latFactorY = (lat / 180) * 100;

  const cxPct = 50 + lonFactorX;
  const cyPct = 50 - latFactorY;
  const iconX = `calc(${cxPct}% - ${ICON_HALF}px)`;
  const iconY = `calc(${cyPct}% - ${ICON_HALF}px)`;

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div className={styles.visualsContainer}>
        <img src={mapGif} alt="map" className={styles.mapImg} />
        <svg className={styles.mapSvg}>
          <svg
            x={iconX}
            y={iconY}
            width={ICON}
            height={ICON}
            viewBox={`${-ICON_HALF} ${-ICON_HALF} ${ICON} ${ICON}`}
            overflow="visible"
            style={{ overflow: "visible" }}
          >
            <SunMoon />
          </svg>
        </svg>
      </div>
      <div className={styles.mapLegend}>
        <span>North: {lat}°</span>
        <span>East: {lon}°</span>
        <span>📍City: {city}</span>
      </div>
    </div>
  );
};

export default GeoLocation;
