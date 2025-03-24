import React from "react";

const Characters = ({ items }) => {
  return (
    <main className="cards">
      {items.map((item) => (
        <CharacterItem key={item._id} item={item}></CharacterItem>
      ))}
    </main>
  );
};

const CharacterItem = ({ item }) => {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <img src={item.photoUrl} alt="" />
        </div>
        <div className="card-back">
          <h1>{item.name}</h1>
          <ul>
            <li>
              <strong>Affiliation:</strong>{" "}
              {item.affiliation ? item.affiliation : "None"}
            </li>
            <li>
              <strong>Allies:</strong>{" "}
              {item.allies.length > 0 ? item.allies.join(", ") : "None"}
            </li>
            <li>
              <strong>Enemies:</strong>{" "}
              {item.enemies.length ? item.enemies.join(", ") : "None"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Characters;
