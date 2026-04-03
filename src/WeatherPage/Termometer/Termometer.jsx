import React from "react";

/** Padding around current so scale min/max bracket the reading (fallback when no forecast min/max). */
function scaleAround(value, pad, hardMin, hardMax) {
  if (value == null || Number.isNaN(value)) return { min: hardMin, max: hardMax };
  let min = Math.floor(value - pad);
  let max = Math.ceil(value + pad);
  if (max - min < 10) {
    const mid = (min + max) / 2;
    min = Math.floor(mid - 5);
    max = Math.ceil(mid + 5);
  }
  return {
    min: Math.max(hardMin, min),
    max: Math.min(hardMax, max),
  };
}

function ThermometerScale({ unit, current, min, max, label }) {
  const vbW = 72;
  const vbH = 220;
  const bulbCy = vbH - 22;
  const bulbR = 18;
  const stemX = 27;
  const stemW = 18;
  const stemTop = 28;
  const stemBottom = bulbCy - bulbR + 2;
  const innerPad = 3;
  const innerTop = stemTop + innerPad;
  const innerBottom = stemBottom - innerPad;
  const innerH = innerBottom - innerTop;

  const t =
    current == null || Number.isNaN(current)
      ? null
      : Math.min(max, Math.max(min, current));
  const fillRatio =
    t == null || max === min ? 0 : (t - min) / (max - min);
  const fillH = fillRatio * innerH;
  const fillY = innerBottom - fillH;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
      <svg
        width={90}
        height={vbH}
        viewBox={`0 0 ${vbW} ${vbH}`}
        role="img"
        aria-label={
          t == null
            ? `${label} thermometer, no reading`
            : `${label} thermometer, ${t}°${unit}, between ${min} and ${max}`
        }
      >
        <title>
          {t == null
            ? `${label}`
            : `${t}°${unit} (scale ${min}–${max}°${unit})`}
        </title>
        {/* stem outline */}
        <rect
          x={stemX}
          y={stemTop}
          width={stemW}
          height={stemBottom - stemTop}
          rx={stemW / 2}
          fill="#e8eaed"
          stroke="#9aa0a6"
          strokeWidth={1.5}
        />
        {/* bulb outline */}
        <circle
          cx={vbW / 2}
          cy={bulbCy}
          r={bulbR}
          fill="#e8eaed"
          stroke="#9aa0a6"
          strokeWidth={1.5}
        />
        {/* mercury bulb */}
        <circle
          cx={vbW / 2}
          cy={bulbCy}
          r={bulbR - 5}
          fill={t == null ? "#ccc" : "#c62828"}
        />
        {/* mercury column */}
        {t != null && fillH > 0 && (
          <rect
            x={stemX + innerPad}
            y={fillY}
            width={stemW - innerPad * 2}
            height={fillH}
            fill="#c62828"
          />
        )}
        {/* max tick (top) */}
        <text x={stemX + stemW + 6} y={stemTop + 4} fontSize={11} fill="#444">
          {max}°{unit}
        </text>
        <line
          x1={stemX + stemW}
          y1={stemTop + 1}
          x2={stemX + stemW + 5}
          y2={stemTop + 1}
          stroke="#444"
          strokeWidth={1}
        />
        {/* min tick (bottom of stem) */}
        <text x={stemX + stemW + 6} y={stemBottom + 4} fontSize={11} fill="#444">
          {min}°{unit}
        </text>
        <line
          x1={stemX + stemW}
          y1={stemBottom}
          x2={stemX + stemW + 5}
          y2={stemBottom}
          stroke="#444"
          strokeWidth={1}
        />
        {/* current value */}
        {t != null && (
          <text
            x={vbW / 2}
            y={stemTop - 6}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fill="#1a1a1a"
          >
            {t}°{unit}
          </text>
        )}
      </svg>
    </div>
  );
}

/**
 * @param {{ tempC: number|null, tempF: number|null }} temperature
 * @param {{ minC?: number, maxC?: number, minF?: number, maxF?: number }} [bounds] optional day min/max from forecast API later
 */
const Termometer = ({ temperature, bounds }) => {
  const { tempC, tempF } = temperature || {};
  const padC = 12;
  const padF = 22;

  let minC, maxC, minF, maxF;
  if (
    bounds?.minC != null &&
    bounds?.maxC != null &&
    bounds?.minF != null &&
    bounds?.maxF != null
  ) {
    minC = bounds.minC;
    maxC = bounds.maxC;
    minF = bounds.minF;
    maxF = bounds.maxF;
  } else {
    const c = scaleAround(tempC, padC, -45, 55);
    const f = scaleAround(tempF, padF, -50, 130);
    minC = c.min;
    maxC = c.max;
    minF = f.min;
    maxF = f.max;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 32,
        marginTop: 12,
        marginBottom: 12,
      }}
    >
      <ThermometerScale
        unit="C"
        current={tempC}
        min={minC}
        max={maxC}
        label="Celsius"
      />
      <ThermometerScale
        unit="F"
        current={tempF}
        min={minF}
        max={maxF}
        label="Fahrenheit"
      />
    </div>
  );
};

export default Termometer;
