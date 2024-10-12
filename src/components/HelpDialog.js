import React, { useState } from "react";

// HelpDialog component provides instructions for the game when the player clicks "Help"
const HelpDialog = () => {
  // State to track whether the help dialog is open or closed
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="help-dialog">
      {/* 
        Button that toggles the help dialog. 
        When clicked, it sets isOpen to the opposite of its current value (open if closed, close if open).
      */}
      <button onClick={() => setIsOpen(!isOpen)}>Help</button>

      {/* 
        Conditionally render the help content if isOpen is true.
        This means the help instructions are shown only when the dialog is open.
      */}
      {isOpen && (
        <div className="help-content">
          {/* Help content title and game instructions */}
          <h3>How to Play</h3>
          <p>
            Guess the word letter by letter. You lose if you make 11 incorrect
            guesses.
          </p>

          {/* Button to close the help dialog, setting isOpen to false */}
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default HelpDialog;
