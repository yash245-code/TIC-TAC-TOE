document.addEventListener("DOMContentLoaded", () => {
    const boardCells = document.querySelectorAll(".BoardCell");
    const resetButton = document.querySelector(".GameResetButton");
    const popup = document.querySelector(".PopupHide");
    const popupMessage = document.getElementById("Message");
    const popupResetBtn = document.querySelector(".PopupResetBtn");

    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    // Winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    // Function to check for winner
    function checkWinner() {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                gameActive = false;
                const winner = boardState[a] === "X" ? "Player 1" : "Player 2";
                showPopup(`${winner} Wins! 🎉`);
                return;
            }
        }
    
        // Check for a draw
        if (!boardState.includes("")) {
            gameActive = false;
            showPopup("It's a Draw! 🤝");
        }
    }

    // Function to handle cell click
    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute("data-cell-index")) - 1;

        if (boardState[cellIndex] || !gameActive) return;

        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWinner();

        // Switch player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    // Function to show popup
    function showPopup(message) {
        popupMessage.textContent = message;
        popup.classList.remove("PopupHide");
        popup.classList.add("PopupShow");
    }

    // Function to reset game
    function resetGame() {
        boardState.fill("");
        boardCells.forEach(cell => cell.textContent = "");
        currentPlayer = "X";
        gameActive = true;
        popup.classList.remove("PopupShow");
        popup.classList.add("PopupHide");
    }

    // Event Listeners
    boardCells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
    popupResetBtn.addEventListener("click", resetGame);
});
