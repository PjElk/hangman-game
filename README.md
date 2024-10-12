Hangman Game

Game Overview

This is a simple Hangman game built using React. The objective of the game is to guess the word by selecting individual letters. For each wrong guess, a part of the hangman figure is drawn. You lose if you make too many incorrect guesses.

How to Play

1. The game will display a series of underscores representing the letters in the word you need to guess.
2. You must guess the word by selecting letters from the provided alphabet.
3. Each correct letter will be revealed in the correct position(s) of the word.
4. Each incorrect guess will result in a part of the hangman being drawn.
5. The game ends when:
   - You Win: All letters of the word are correctly guessed.
   - You Lose: The hangman is fully drawn after 11 incorrect guesses.
6. If you lose, the correct word will be displayed at the end of the game.
7. You can restart the game at any time by clicking the "Restart" button.

Installation and Running Instructions

Follow these steps to install and run the app on your local machine:

Prerequisites

Make sure you have the following installed on your machine:

- Node.js (Download and install from [https://nodejs.org/](https://nodejs.org/))
- npm (Comes with Node.js installation)

Instructions

1. Clone the repository

   Open a terminal or command prompt and run the following command to clone the project to your local machine:

   git clone https://github.com/PjElk/hangman-game.git

2. Navigate to the project directory

   After cloning the repository, navigate into the project directory:

   cd hangman-game

3. Install dependencies

   Use npm to install the required dependencies:

   npm install

4. Run the application

After installing the dependencies, start the development server:

npm start

5. Open the application in your browser

After running npm start, the app will be available at http://localhost:3000/. Open your browser and navigate to this URL to play the game.
