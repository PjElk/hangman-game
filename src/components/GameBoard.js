import React, { useState, useEffect } from "react";
import WordDisplay from "./WordDisplay";
import Keyboard from "./Keyboard";
import HangmanDrawing from "./HangmanDrawing";
import HelpDialog from "./HelpDialog";
import Confetti from "react-confetti"; //use react confetti when user wins
import { Container, Button } from "react-bootstrap";

const MAX_WRONG = 11; // Maximum number of wrong guesses allowed

function GameBoard() {
  // State to store the word the player has to guess
  const [word, setWord] = useState("");

  // State to keep track of all letters guessed by the player
  const [guessedLetters, setGuessedLetters] = useState([]);

  // State to keep track of correct letters guessed
  const [correctLetters, setCorrectLetters] = useState([]);

  // State to track how many wrong guesses have been made
  const [wrongGuesses, setWrongGuesses] = useState(0);

  // Track the current game status: either 'playing', 'won', or 'lost'
  const [gameStatus, setGameStatus] = useState("playing");

  // State to hold the list of words loaded from the dictionary file
  const [words, setWords] = useState([]);

  // Boolean flag to track whether the word list is loaded
  const [isWordsLoaded, setIsWordsLoaded] = useState(false);

  // Function to start a new game by picking a random word
  const startNewGame = (wordList) => {
    // If wordList is empty or undefined, log an error and stop
    if (!wordList || wordList.length === 0) {
      console.error("Word list is empty or undefined");
      return;
    }

    // Pick a random word from the list and convert it to uppercase
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    if (!randomWord) {
      console.error("Random word is undefined");
      return;
    }

    // Reset the game state with the new word and clear all previous guesses
    setWord(randomWord.toUpperCase());
    setGuessedLetters([]);
    setCorrectLetters([]);
    setWrongGuesses(0);
    setGameStatus("playing");
  };

  // useEffect hook to load the words from the dictionary file when the component is first rendered
  useEffect(() => {
    // Fetch words from the dictionary.txt file
    fetch("/dictionary.txt")
      .then((response) => response.text())
      .then((text) => {
        // Split the text by newlines to create a word list
        const wordList = text
          .split("\n")
          .filter((word) => /^[A-Za-z]+$/.test(word.trim())) // Only keep valid words (alphabetic characters)
          .map((word) => word.trim()); // Remove any surrounding whitespace

        // Set the word list state and flag that words have been loaded
        setWords(wordList);
        setIsWordsLoaded(true);

        // Start a new game with the loaded word list
        startNewGame(wordList);
      })
      .catch((error) => {
        // If fetching the words fails, log an error
        console.error("Failed to load words:", error);
        setIsWordsLoaded(false);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to handle each guessed letter
  const handleGuess = (letter) => {
    // Ignore the guess if the letter has already been guessed or the game is not in 'playing' state
    if (guessedLetters.includes(letter) || gameStatus !== "playing") return;

    // Add the guessed letter to the list of guessed letters
    setGuessedLetters([...guessedLetters, letter]);

    // If the guessed letter is part of the word
    if (word.includes(letter)) {
      // Add it to the correct letters list and check if the player has won
      setCorrectLetters([...correctLetters, letter]);
      checkForWin([...guessedLetters, letter]);
    } else {
      // Increment the number of wrong guesses and check if the player has lost
      setWrongGuesses((prev) => {
        const newWrongGuesses = prev + 1;
        if (newWrongGuesses >= MAX_WRONG) {
          setGameStatus("lost"); // Change the game status to 'lost' if MAX_WRONG is reached
        }
        return newWrongGuesses;
      });
    }
  };

  // Function to check if all letters of the word have been guessed correctly
  const checkForWin = (guessed) => {
    // Skip the check if the game is no longer in 'playing' state
    if (gameStatus !== "playing") return;

    // Split the word into letters and check if every letter has been guessed
    const wordLetters = word.split("");
    const allGuessed = wordLetters.every((letter) => guessed.includes(letter));

    // If all letters have been guessed, change the game status to 'won'
    if (allGuessed) {
      setGameStatus("won");
    }
  };

  // Function to handle restarting the game
  const handleRestart = () => {
    // Only restart if the words have been loaded
    if (isWordsLoaded) {
      startNewGame(words);
    }
  };

  return (
    <Container className="game-board text-center">
      {/* Show confetti animation if the player wins */}
      {gameStatus === "won" && <Confetti />}

      {/* Game title */}
      <h1 className="mt-4 mb-5">Hangman Game</h1>

      {/* Hangman drawing component, passes wrongGuesses and gameStatus */}
      <div className="hangman-drawing">
        <HangmanDrawing wrongGuesses={wrongGuesses} gameStatus={gameStatus} />
      </div>

      {/* Display the correct word if the player loses */}
      {gameStatus === "lost" && (
        <div className="correct-word mt-3">
          <h3>
            The correct word was: <strong>{word}</strong>
          </h3>
        </div>
      )}

      {/* Display the current word with guessed letters */}
      <WordDisplay
        word={word}
        guessedLetters={guessedLetters}
        correctLetters={correctLetters}
        gameStatus={gameStatus} // Pass the game status to reveal the word after loss
      />

      {/* Display the keyboard for guessing letters when the game is in 'playing' state */}
      {gameStatus === "playing" && (
        <Keyboard
          onGuess={handleGuess}
          guessedLetters={guessedLetters}
          correctLetters={correctLetters}
        />
      )}

      {/* Show win message and restart button if the player has won */}
      {gameStatus === "won" && (
        <div className="win-message">
          <h2 className="text-success">Congratulations! You Won!</h2>
          <Button
            onClick={handleRestart}
            variant="success"
            disabled={!isWordsLoaded}
          >
            Restart
          </Button>
        </div>
      )}

      {/* Show lose message and restart button if the player has lost */}
      {gameStatus === "lost" && (
        <div className="lose-message">
          <Button
            onClick={handleRestart}
            variant="danger"
            className="mt-3"
            disabled={!isWordsLoaded}
          >
            Restart
          </Button>
        </div>
      )}

      {/* HelpDialog component to show game instructions */}
      <HelpDialog />
    </Container>
  );
}

export default GameBoard;
