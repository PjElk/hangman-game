import React from "react";

// Keyboard component renders buttons for each letter and handles guesses
const Keyboard = ({ onGuess, guessedLetters, correctLetters }) => {
  // Array of all letters in the alphabet
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="keyboard">
      {/* Map over each letter to create a button for every letter in the alphabet */}
      {letters.map((letter) => (
        <button
          key={letter} // Set key as the letter itself for unique identification
          onClick={() => onGuess(letter)} // Call onGuess function when the button is clicked
          disabled={guessedLetters.includes(letter)} // Disable button if the letter has already been guessed
          style={{
            // Style the button based on whether it's a correct guess
            backgroundColor: correctLetters.includes(letter) ? "green" : "gray",
            color: "white", // Keep the text color white for better readability
          }}
        >
          {letter} {/* Display the letter on the button */}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
