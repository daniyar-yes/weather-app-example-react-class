import React from "react";

/** Padding around current so scale min/max bracket the reading (fallback when no forecast min/max). */


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
        {/* min tick (bottom of stem) */}
        <text x={stemX + stemW + 6} y={stemBottom + 4} fontSize={11} fill="#444">
          {min}°{unit}
        </text>
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


const Termometer = ({ temperature }) => {
  const { tempC, tempF } = temperature || {};

  let minC = -45;
  let maxC = 55;
  let minF = -50;
  let maxF = 130;

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
