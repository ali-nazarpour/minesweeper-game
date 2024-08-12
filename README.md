# Minesweeper Game

## Overview

This is a classic **Minesweeper Game** developed with HTML, CSS, and JavaScript. The game challenges players to clear a grid of hidden mines using logical deduction. With a responsive design, smooth animations, and three difficulty levels, this project showcases a fun and interactive web application.

## Features

- **Responsive Design**: The game grid automatically adjusts to different screen sizes, providing a consistent user experience across devices.
- **Difficulty Levels**: Choose between Easy, Medium, and Hard levels, each with increasing grid sizes and mine counts.
- **Timer**: Track how long it takes to complete the game with a built-in timer that starts as soon as the game begins.
- **Flagging System**: Mark suspected mines with a flag to keep track of your progress.
- **Randomized Mine Placement**: Every game starts with a randomly generated minefield, ensuring a unique experience every time.
- **Win and Loss Notifications**: The game notifies players when they win or lose, adding to the excitement.

## Technologies Used

- **HTML5**: Structures the game’s interface and elements.
- **CSS3**: Styles the game, including the grid layout, buttons, and animations.
- **JavaScript (ES6+)**: Implements the game logic, including mine placement, user interactions, and game state management.
- **Node.js & NPM**: Used for managing dependencies and running a development server (if needed).

## How to Play

1. Select your desired difficulty level from the dropdown menu.
2. Click the **Reset Game** button to start a new game.
3. Click on a grid cell to reveal what's underneath:
   - If it's a mine, the game is over.
   - If it's an empty cell, a number will appear indicating how many mines are adjacent to that cell.
4. Right-click (or long-press on mobile) to place a flag on cells you suspect contain mines.
5. The game ends when all non-mine cells are revealed or when a mine is clicked.
6. The timer tracks your progress, and the game will notify you when you have won.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alinazarpoor/minesweeper-game.git
   ```
2. Navigate to the project directory:
   ```bash
   cd minesweeper-game
   ```
3. Install the dependencies (if any):
   ```bash
   npm install
   ```
4. Start the development server (optional):
   ```bash
   npm run dev
   ```
5. Open your web browser and navigate to the provided local server URL to play the game.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! If you have ideas for improving the game, feel free to open an issue or submit a pull request.
