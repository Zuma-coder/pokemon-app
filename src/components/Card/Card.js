import React from "react";

const Card = (props) => {
  const { data } = props;

  return (
    <div className="card">
      <div className="cardImg">
        <img src={data.sprites.front_default} alt="" />
      </div>
      <h3 className="cardName">{data.name}</h3>
      <div className="cardTypes">
        {data.types.map((type) => {
          return (
            <div>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <p>重さ：{data.weight}</p>
      </div>
    </div>
  );
};

export default Card;
