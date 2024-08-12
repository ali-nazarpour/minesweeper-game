document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const difficultySelector = document.getElementById("difficulty");
  const resetButton = document.getElementById("reset");
  const timerDisplay = document.getElementById("timer");

  let width, height, minesCount, squares, isGameOver, timer, timeElapsed, flags;

  const difficulties = {
    easy: { width: 8, height: 8, mines: 10 },
    medium: { width: 16, height: 16, mines: 40 },
    hard: { width: 24, height: 24, mines: 99 },
  };

  function initGame() {
    clearInterval(timer);
    timerDisplay.textContent = "Time: 0";
    timeElapsed = 0;
    timer = setInterval(() => {
      timeElapsed++;
      timerDisplay.textContent = `Time: ${timeElapsed}`;
    }, 1000);

    const difficulty = difficultySelector.value;
    ({ width, height, mines: minesCount } = difficulties[difficulty]);
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${width}, 40px)`;
    squares = [];
    isGameOver = false;
    flags = 0;

    const minesArray = Array(minesCount).fill("mine");
    const emptyArray = Array(width * height - minesCount).fill("empty");
    const gameArray = emptyArray.concat(minesArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * height; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      square.addEventListener("click", function () {
        click(square);
      });

      square.oncontextmenu = function (e) {
        e.preventDefault();
        addFlag(square);
      };
    }

    calculateAdjacentMines();
  }

  function calculateAdjacentMines() {
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      if (squares[i].classList.contains("empty")) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("mine"))
          total++;
        if (
          i > width - 1 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains("mine")
        )
          total++;
        if (i > width && squares[i - width].classList.contains("mine")) total++;
        if (
          i > width + 1 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains("mine")
        )
          total++;
        if (
          i < width * height - 1 &&
          !isRightEdge &&
          squares[i + 1].classList.contains("mine")
        )
          total++;
        if (
          i < width * height - width &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains("mine")
        )
          total++;
        if (
          i < width * height - width - 1 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains("mine")
        )
          total++;
        if (
          i < width * height - width &&
          squares[i + width].classList.contains("mine")
        )
          total++;
        squares[i].setAttribute("data", total);
      }
    }
  }

  function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains("revealed") && flags < minesCount) {
      if (!square.classList.contains("flagged")) {
        square.classList.add("flagged");
        square.innerHTML = "🚩";
        flags++;
        checkForWin();
      } else {
        square.classList.remove("flagged");
        square.innerHTML = "";
        flags--;
      }
    }
  }

  function click(square) {
    if (isGameOver) return;
    if (
      square.classList.contains("revealed") ||
      square.classList.contains("flagged")
    )
      return;

    if (square.classList.contains("mine")) {
      gameOver(square);
    } else {
      revealSquare(square);
    }
  }

  function revealSquare(square) {
    let total = square.getAttribute("data");
    square.classList.add("revealed");
    if (total != 0) {
      square.innerHTML = total;
    } else {
      checkAdjacentSquares(square.id);
    }
  }

  function checkAdjacentSquares(currentId) {
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id;
        click(document.getElementById(newId));
      }
      if (currentId > width - 1 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 - width].id;
        click(document.getElementById(newId));
      }
      if (currentId > width) {
        const newId = squares[parseInt(currentId) - width].id;
        click(document.getElementById(newId));
      }
      if (currentId > width + 1 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 - width].id;
        click(document.getElementById(newId));
      }
      if (currentId < width * height - 1 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id;
        click(document.getElementById(newId));
      }
      if (currentId < width * height - width && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 + width].id;
        click(document.getElementById(newId));
      }
      if (currentId < width * height - width - 1 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + width].id;
        click(document.getElementById(newId));
      }
      if (currentId < width * height - width) {
        const newId = squares[parseInt(currentId) + width].id;
        click(document.getElementById(newId));
      }
    }, 10);
  }

  function checkForWin() {
    let matches = 0;
    squares.forEach((square) => {
      if (
        square.classList.contains("flagged") &&
        square.classList.contains("mine")
      ) {
        matches++;
      }
    });
    if (matches === minesCount) {
      clearInterval(timer);
      isGameOver = true;
      setTimeout(() => alert("Congratulations! You won!"), 100);
    }
  }

  function gameOver(square) {
    clearInterval(timer);
    isGameOver = true;

    squares.forEach((square) => {
      if (square.classList.contains("mine")) {
        square.innerHTML = "💣";
        square.classList.add("revealed");
      }
    });
    setTimeout(() => alert("Game Over!"), 100);
  }

  difficultySelector.addEventListener("change", initGame);
  resetButton.addEventListener("click", initGame);

  initGame();
});
