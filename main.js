const cell = document.querySelectorAll(".cell");
const container = document.querySelector("body");
const cells = Array.from(cell);

let gameOver = false;
let currentPlayer = "X";
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkForWinner() {
  winningCombinations.forEach(function (Combinations) {
    let check = Combinations.every(
      (idx) => cells[idx].innerText.trim() === currentPlayer
    );
    if (check) {
      //   highlightCells(Combinations);
      //   Combinations.forEach(function (idx) {
      //     cells[idx].classList.add("highlight");
      //   });
      gameOver = true;
      gameEnd(currentPlayer);
      console.log(currentPlayer + " Has Won!!");
    }
  });
}

function gameEnd(situation) {
  if (situation === "tie") {
    container.innerHTML = `
    <div class="card">
        <h1>Match Tie!</h1>
    </div>
    `;
  } else {
    container.innerHTML = `
      <div class="card">
      <h1>${situation} Won the Match!</h1>
      </div>
      `;
  }
}

function allFull() {
  if (!cells.some((e) => e.innerText === "") && !gameOver) {
    gameEnd("tie");
  }
}

cells.forEach(function (cell) {
  cell.addEventListener("click", function () {
    if (cell.innerText.trim() != "") return;
    cell.innerText = currentPlayer;
    checkForWinner();
    allFull();
    currentPlayer = currentPlayer == "X" ? "O" : "X";
  });
});
