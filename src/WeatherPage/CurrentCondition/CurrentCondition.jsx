import React from 'react'

const CurrentCondition = ({ conditionImg, conditionText }) => {
  return (
       <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={conditionImg} alt="" />
          <p>Currently: {conditionText}</p>
        </div>
  )
}

export default CurrentCondition