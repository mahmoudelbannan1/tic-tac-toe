import { useState } from "react";

const Player = ({ initialName, sympol, isActive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const handleEditClick = () => {
    setIsEditing((editing) => !editing);
  };
  const handleChangeInput = (e) => {
    setName(e.target.value);
  };
  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {isEditing ? (
            <input type="text" value={name} onChange={handleChangeInput} />
          ) : (
            <span className="player-name">{name}</span>
          )}
          <span className="player-symbol">{sympol}</span>
        </span>
        <button onClick={handleEditClick}>
          {isEditing ? "Save" : "Edite"}
        </button>
      </li>
    </>
  );
};

export default Player;
