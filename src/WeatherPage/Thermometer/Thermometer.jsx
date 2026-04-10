import React from "react";

function cToF(c) {
  return (c * 9) / 5 + 32;
}

const Thermometer = ({ temperature }) => {
  const { tempC, tempF } = temperature || {};

  const minC = -45;
  const maxC = 55;
  const minF = cToF(minC);
  const maxF = cToF(maxC);

  const vbW = 200;
  const vbH = 220;
  const stemCx = vbW / 2;
  const bulbCy = vbH - 22;
  const bulbR = 18;
  const stemW = 18;
  const stemX = stemCx - stemW / 2;
  const stemTop = 36;
  const stemBottom = bulbCy - bulbR + 2;
  const innerPad = 3;
  const innerTop = stemTop + innerPad;
  const innerBottom = stemBottom - innerPad;
  const innerH = innerBottom - innerTop;

  const tC =
    tempC == null || Number.isNaN(tempC)
      ? null
      : Math.min(maxC, Math.max(minC, tempC));
  const fillRatio =
    tC == null || maxC === minC ? 0 : (tC - minC) / (maxC - minC);
  const fillH = fillRatio * innerH;
  const fillY = innerBottom - fillH;

  const labelCMaxX = stemX - 8;
  const labelCMinX = stemX - 8;
  const labelFMaxX = stemX + stemW + 8;
  const labelFMinX = stemX + stemW + 8;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 16,
        marginTop: 12,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          textAlign: "right",
          minWidth: 72,
          paddingBottom: 8,
        }}
      >
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>C</p>
        <p style={{ margin: "6px 0 0", fontSize: 18, fontWeight: 600 }}>
          {tC != null ? `${tC}°C` : "—"}
        </p>
      </div>

      <svg
        width={vbW}
        height={vbH}
        viewBox={`0 0 ${vbW} ${vbH}`}
        role="img"
        aria-label={
          tC == null
            ? "Thermometer, no reading"
            : `Thermometer ${tC}°C, ${tempF}°F, scales ${minC}–${maxC}°C`
        }
      >
        <title>Thermometer</title>
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
        <circle
          cx={stemCx}
          cy={bulbCy}
          r={bulbR}
          fill="#e8eaed"
          stroke="#9aa0a6"
          strokeWidth={1.5}
        />
        <circle
          cx={stemCx}
          cy={bulbCy}
          r={bulbR - 5}
          fill={tC == null ? "#ccc" : "#c62828"}
        />
        {tC != null && fillH > 0 && (
          <rect
            x={stemX + innerPad}
            y={fillY}
            width={stemW - innerPad * 2}
            height={fillH}
            fill="#c62828"
          />
        )}

        {/* Min/max labels only — horizontal ticks read like an extra minus before negative °C */}
        <text
          x={labelCMaxX}
          y={stemTop + 4}
          fontSize={11}
          fill="#444"
          textAnchor="end"
        >
          {maxC}°C
        </text>
        <text
          x={labelFMaxX}
          y={stemTop + 4}
          fontSize={11}
          fill="#444"
          textAnchor="start"
        >
          {Math.round(maxF)}°F
        </text>

        <text
          x={labelCMinX}
          y={stemBottom + 4}
          fontSize={11}
          fill="#444"
          textAnchor="end"
        >
          {minC}°C
        </text>
        <text
          x={labelFMinX}
          y={stemBottom + 4}
          fontSize={11}
          fill="#444"
          textAnchor="start"
        >
          {Math.round(minF)}°F
        </text>
      </svg>

      <div
        style={{
          textAlign: "left",
          minWidth: 72,
          paddingBottom: 8,
        }}
      >
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>F</p>
        <p style={{ margin: "6px 0 0", fontSize: 18, fontWeight: 600 }}>
          {tempF != null && !Number.isNaN(tempF) ? `${tempF}°F` : "—"}
        </p>
      </div>
    </div>
  );
};

export default Thermometer;
