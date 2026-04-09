import React from "react";

/** Local coords centered on (0,0) — parent <g transform="translate(cxPx, cyPx)"> matches old circle cx/cy. */
function Sun() {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <g>
      <circle
        cx={0}
        cy={0}
        r={2.2}
        fill="#ffca28"
        stroke="#f57f17"
        strokeWidth={0.35}
      />
      {rays.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const c = Math.cos(rad);
        const s = Math.sin(rad);
        return (
          <line
            key={deg}
            x1={c * 2.6}
            y1={s * 2.6}
            x2={c * 3.7}
            y2={s * 3.7}
            stroke="#f57f17"
            strokeWidth={0.4}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

function Moon() {
  return (
    <path
      d="M 0.8 -4.2 A 4.3 4.3 0 1 1 0.8 4.2 A 3.55 3.55 0 1 0 0.8 -4.2 Z"
      fill="#eceff4"
      stroke="#4c566a"
      strokeWidth={0.35}
    />
  );
}

const SunMoon = ({ isDay }) => (
  <g style={{ pointerEvents: "none" }}>{isDay ? <Sun /> : <Moon />}</g>
);

export default SunMoon;
