import React from "react";
import state1 from "../assets/state1.gif";
import state2 from "../assets/state2.gif";
import state3 from "../assets/state3.gif";
import state4 from "../assets/state4.gif";
import state5 from "../assets/state5.gif";
import state6 from "../assets/state6.gif";
import state7 from "../assets/state7.gif";
import state8 from "../assets/state8.gif";
import state9 from "../assets/state9.gif";
import state10 from "../assets/state10.gif";
import state11 from "../assets/state11.gif";

// Component to display the hangman image based on the number of wrong guesses
const HangmanDrawing = ({ wrongGuesses, gameStatus }) => {
  // Array holding the hangman images for each wrong guess step
  const images = [
    state1,
    state2,
    state3,
    state4,
    state5,
    state6,
    state7,
    state8,
    state9,
    state10,
    state11, // Final image (state11.gif) for the 11th incorrect guess
  ];

  return (
    <div className="hangman-drawing" style={{ position: "relative" }}>
      {/* 
          Display the hangman image corresponding to the current number of wrong guesses.
          Math.min to ensure that the array index doesn't exceed 10 (for the final image).
          The hangman progresses from state1.gif (0 wrong guesses) to state11.gif (11 wrong guesses).
        */}
      <img
        src={images[Math.min(wrongGuesses, 10)]} // Display the correct image based on wrong guesses
        alt={`Step ${wrongGuesses}`} // Alt text for accessibility, shows the current step
        className="img-fluid" // Bootstrap class to make the image responsive
      />

      {/* 
          If the game is lost and the number of wrong guesses is exactly 11 (the maximum),
          overlay a "Game Over" message in red, positioned over the hangman image.
        */}
      {gameStatus === "lost" && wrongGuesses === 11 && (
        <div
          style={{
            position: "absolute", // Make the text appear over the image
            top: "50%", // Vertically center the text
            left: "50%", // Horizontally center the text
            transform: "translate(-50%, -50%)", // Adjust the positioning to exactly center the text
            color: "red", // Red color for the "Game Over" message
            fontSize: "3rem", // Large font size to make the message stand out
            fontWeight: "bold", // Bold text for emphasis
            textAlign: "center", // Center the text within the div
          }}
        >
          Game Over {/* The actual "Game Over" text displayed on the screen */}
        </div>
      )}
    </div>
  );
};

export default HangmanDrawing;
