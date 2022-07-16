import React, { useState } from "react";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
import Player from "./components/Player";
import Box from "./components/Box";
import "./styles/styles.css";
import "./styles/players.css";
import "./styles/box.css";

export default function App() {
  const [players, setPlayers] = useState([
    {
      id: nanoid(),
      "player-name": "Player Name",
      symbol: "X",
      savePlayer: false,
      overlay: false,
    },
    {
      id: nanoid(),
      "player-name": "Player Name",
      symbol: "O",
      savePlayer: false,
      overlay: false,
    },
  ]);

  const [startGame, setStartGame] = useState(1);

  const [boxes, setBoxes] = useState([]);

  const [turn, setTurn] = useState({});

  const [boxArray, setBoxArray] = useState([]);

  const [gameOver, setGameOver] = useState({});

  React.useEffect(() => {
    players.every((player) => player.savePlayer)
      ? setStartGame(false)
      : setStartGame(2);
  }, [players]);

  function openOverlay(playerId) {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        return player.id === playerId ? { ...player, overlay: true } : player;
      })
    );
  }

  function handleChange(event, playerId) {
    const { name, value } = event.target;
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        return player.id === playerId
          ? { ...player, [name]: value, savePlayer: false }
          : player;
      })
    );
  }

  function savePlayerName(playerId) {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        return player.id === playerId
          ? { ...player, savePlayer: true, overlay: false }
          : player;
      })
    );
  }

  function startNewGame() {
    setStartGame(true);
    const newArray = [];
    for (let i = 0; i < 9; i++) {
      newArray.push({ id: nanoid(), value: "", isHeld: false });
    }
    setBoxes(newArray);
    setTurn({ symbol: "X", name: players[0]["player-name"] });
    setBoxArray([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setGameOver({ isGameOver: false, wonBy: "" });
  }

  function changeTurn(boxId, boxIndex) {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        return box.id === boxId
          ? { ...box, value: turn.symbol, isHeld: true }
          : box;
      })
    );

    setBoxArray((prevBoxArray) =>
      prevBoxArray.map((box, index) => {
        return index === boxIndex && turn.symbol === "X"
          ? box + 1
          : index === boxIndex && turn.symbol === "O"
          ? box + 2
          : box;
      })
    );

    setTurn((prevTurn) => {
      return prevTurn.symbol === "X"
        ? { symbol: "O", name: players[1]["player-name"] }
        : { symbol: "X", name: players[0]["player-name"] };
    });
  }

  React.useEffect(() => {
    const firstValue = boxArray[0];
    const isallSelected = boxArray.every((box) => box);
    const isAllSame = boxArray.every((box) => box === firstValue);
    if (
      (boxArray[0] === 1 && boxArray[1] === 1 && boxArray[2] === 1) ||
      (boxArray[3] === 1 && boxArray[4] === 1 && boxArray[5] === 1) ||
      (boxArray[6] === 1 && boxArray[7] === 1 && boxArray[8] === 1) ||
      (boxArray[0] === 1 && boxArray[3] === 1 && boxArray[6] === 1) ||
      (boxArray[1] === 1 && boxArray[4] === 1 && boxArray[7] === 1) ||
      (boxArray[2] === 1 && boxArray[5] === 1 && boxArray[8] === 1) ||
      (boxArray[0] === 1 && boxArray[4] === 1 && boxArray[8] === 1) ||
      (boxArray[2] === 1 && boxArray[4] === 1 && boxArray[6] === 1)
    ) {
      console.log("X won");
      setGameOver({ isGameOver: true, wonBy: players[0]["player-name"] });
    } else if (
      (boxArray[0] === 2 && boxArray[1] === 2 && boxArray[2] === 2) ||
      (boxArray[3] === 2 && boxArray[4] === 2 && boxArray[5] === 2) ||
      (boxArray[6] === 2 && boxArray[7] === 2 && boxArray[8] === 2) ||
      (boxArray[0] === 2 && boxArray[3] === 2 && boxArray[6] === 2) ||
      (boxArray[1] === 2 && boxArray[4] === 2 && boxArray[7] === 2) ||
      (boxArray[2] === 2 && boxArray[5] === 2 && boxArray[8] === 2) ||
      (boxArray[0] === 2 && boxArray[4] === 2 && boxArray[8] === 2) ||
      (boxArray[2] === 2 && boxArray[4] === 2 && boxArray[6] === 2)
    ) {
      console.log("Y won");
      setGameOver({
        isGameOver: true,
        wonBy: players[1]["player-name"],
      });
    } else if (isallSelected && !isAllSame) {
      console.log("Match draw");
      setGameOver({ isGameOver: true, wonBy: "Draw" });
    }
  }, [boxArray]);

  const playersElement = players.map((player, index) => (
    <Player
      key={player.id}
      player={player}
      playerNo={index + 1}
      handleChange={handleChange}
      savePlayerName={savePlayerName}
      openOverlay={openOverlay}
      startGame={startGame}
    />
  ));

  const boxElement = boxes.map((box, index) => (
    <Box
      key={box.id}
      id={box.id}
      value={box.value}
      isHeld={box.isHeld}
      changeTurn={changeTurn}
      index={index}
      isGameOver={gameOver.isGameOver}
    />
  ));

  return (
    <div className="App">
      {gameOver.isGameOver && gameOver.wonBy !== "Draw" && <Confetti />}
      <header>
        <h1 className="header--title">TIC TAC TOE</h1>
      </header>
      <div className="players--container">{playersElement}</div>
      {!startGame && (
        <button className="start-game btn" onClick={startNewGame}>
          Start Game
        </button>
      )}
      {startGame === true && !gameOver.isGameOver && (
        <h2 className="player--turn">
          Your turn , <span className="player--name">{turn.name}</span>
        </h2>
      )}
      {gameOver.isGameOver && (
        <div className="game-result">
          <h2 className="player--turn">
            <span>{gameOver.wonBy}</span>{" "}
            {gameOver.wonBy !== "Draw" ? "Won" : "!"}
          </h2>
          <button className="play-again btn" onClick={startNewGame}>
            Play Again
          </button>
        </div>
      )}
      {startGame === true && <ul className="box--container">{boxElement}</ul>}
    </div>
  );
}
