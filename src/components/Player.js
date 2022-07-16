import React from "react";

export default function Player({
  player,
  playerNo,
  handleChange,
  savePlayerName,
  openOverlay,
  startGame,
}) {
  return (
    <div>
      {!player.overlay && startGame!==true && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3
            onClick={() => openOverlay(player.id)}
            className="player--symbol outside--overlay"
          >
            {player.symbol}
          </h3>
          <p
            className="player--name"
            style={{ textIndent: "0", textAlign: "center" }}
          >
            {player["player-name"]}
          </p>
        </div>
      )}

      
      {player.overlay && startGame!==true && (
        <div className="player--container">
          <p className="player--no">Player {playerNo}</p>

          <input
            name="player-name"
            className="player--name"
            placeholder="PLAYER NAME"
            onChange={(event) => handleChange(event, player.id)}
            value={player["player-name"]}
            autoComplete="off"
            maxLength={13}
          />
          <h3 className="player--symbol">{player.symbol}</h3>

          {player["player-name"] && !player.savePlayer && (
            <button
              className="save--player"
              onClick={() => savePlayerName(player.id)}
            >
              Save
            </button>
          )}
        </div>
      )}
    </div>
  );
}
