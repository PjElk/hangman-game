import React from "react";

// Component to display the word with underscores for unguessed letters
const WordDisplay = ({ word, guessedLetters, correctLetters, gameStatus }) => {
  return (
    <div className="word-display">
      {/* Split the word into individual letters and map over each letter */}
      {word.split("").map((letter, index) => (
        // Use the index as the key for each letter span
        <span key={index} className="letter">
          {/* 
            Display the letter if:
            1. The player has guessed the letter (it's in guessedLetters)
            2. The game is lost (gameStatus === "lost"), so we reveal all letters
            Otherwise, display an underscore ('_') to represent an unguessed letter.
          */}
          {
            guessedLetters.includes(letter) || gameStatus === "lost"
              ? letter // Show the letter if guessed or game is lost
              : "_" // Otherwise, display an underscore
          }
        </span>
      ))}
    </div>
  );
};

export default WordDisplay;
