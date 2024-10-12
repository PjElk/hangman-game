import React from "react";
import GameBoard from "./components/GameBoard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <GameBoard />
      </main>
      <footer>
        <p>Hangman Game - Capstone Project</p>
      </footer>
    </div>
  );
}

export default App;
