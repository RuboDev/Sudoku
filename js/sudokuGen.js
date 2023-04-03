// Este script genera un sudoku con espacios en blanco con una única solución. La variable numberOfCellsToLeave determina cuantas celdas se dejan en 0 y por tanto la dificultad.
// La dificultad puede variar un poco aunque tengan el mismo numero de celdas en 0
// El código y los comentarios los ha escrito Chat-GPT, le he pedido que me ayudara a crear un programa que genere sudokus incompletos de solución unica y dificultad variable.
function generateSudoku() {
    let board = new Array(9).fill().map(() => new Array(9).fill(' ')); // Crear un tablero de 9x9 con valores iniciales de 0
  
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let subgridRow = Math.floor(i / 3); // Obtener la fila de la subcuadrícula
        let subgridCol = Math.floor(j / 3); // Obtener la columna de la subcuadrícula
  
        // Llenar la subcuadrícula con números aleatorios
        if (board[i][j] == ' ') {
          let num = Math.floor(Math.random() * 9) + 1;
          let attempts = 0;
          while (!isValid(board, i, j, num, subgridRow, subgridCol)) {
            num = Math.floor(Math.random() * 9) + 1;
            attempts++;
            if (attempts > 50) {
              // Si se hacen más de 50 intentos para generar un número válido, se reinicia el tablero
              return generateSudoku();
            }
          }
          board[i][j] = num;
        }
      }
    }
  
    // Eliminar algunos números aleatorios del tablero para generar un sudoku incompleto
    let numberOfCellsToLeave = 40; // Número de celdas que se rellenarán - Number of cells that will be filled with numbers
    let cellsLeft = 81;
    while (cellsLeft > numberOfCellsToLeave) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      if (board[row][col] != ' ') {
        cellsLeft--;
        let temp = board[row][col];
        board[row][col] = ' ';
  
        // Chequear si el sudoku tiene solución única
        let solutions = findAllSolutions(board);
        if (solutions.length != 1) {
          board[row][col] = temp;
          cellsLeft++;
        }
      }
    }
  
    return board;
  }
  
  function findAllSolutions(board) {
    let solutions = [];
    solveSudoku(board, solutions);
    return solutions;
  }
  
  function solveSudoku(board, solutions) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] == ' ') {
          for (let num = 1; num <= 9; num++) {
            let subgridRow = Math.floor(row / 3);
            let subgridCol = Math.floor(col / 3);
            if (isValid(board, row, col, num, subgridRow, subgridCol)) {
              board[row][col] = num;
              if (isSolved(board)) {
                solutions.push([...board.map(row => [...row])]);
              } else {
                solveSudoku(board, solutions);
            }
            board[row][col] = ' ';
          }
        }
        return;
      }
    }
  }
}

function isValid(board, row, col, num, subgridRow, subgridCol) {
  // Chequear si el número se repite en la fila o en la columna
  for (let i = 0; i < 9; i++) {
    if (board[row][i] == num || board[i][col] == num) {
      return false;
    }
  }

  // Chequear si el número se repite en la subcuadrícula
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[subgridRow * 3 + i][subgridCol * 3 + j] == num) {
        return false;
      }
    }
  }

  return true;
}

function isSolved(board) {
  // Chequear si todas las celdas están llenas
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == 0) {
        return false;
      }
    }
  }

  // Chequear si el sudoku es válido
  for (let i = 0; i < 9; i++) {
    let row = new Set();
    let col = new Set();
    let subgrid = new Set();

    for (let j = 0; j < 9; j++) {
      row.add(board[i][j]);
      col.add(board[j][i]);
      subgrid.add(board[Math.floor(i / 3) * 3 + Math.floor(j / 3)][(i % 3) * 3 + (j % 3)]);
    }

    if (row.size != 9 || col.size != 9 || subgrid.size != 9) {
      return false;
    }
  }

  return true;
}

//console.log(generateSudoku());

/* En este código, el método findAllSolutions() utiliza la técnica de backtracking para encontrar todas las soluciones posibles del sudoku. 
El método solveSudoku() es el encargado de realizar la búsqueda recursiva de las soluciones, utilizando la técnica de 
backtracking para probar diferentes combinaciones de números en las celdas vacías.

El método isValid() se utiliza para verificar si un número es válido para colocar en una celda determinada. Por último, el método isSolved() se 
utiliza para verificar si el sudoku está completo y es válido.

En la función generateSudoku(), una vez que se genera un sudoku completo, se eliminan algunos números aleatorios del tablero para crear un 
sudoku incompleto. Luego, se utiliza el método findAllSolutions() para verificar si el sudoku tiene solución única. Si no es así, 
se restaura el número eliminado y se vuelve a intentar con otra celda.

De esta manera, podemos asegurarnos de que el sudoku siempre tenga una solución única. Sin embargo, ten en cuenta que 
esto puede aumentar el tiempo de generación del sudoku y puede haber algunas configuraciones de tablero que sean más difíciles que otras, 
incluso con el mismo número de celdas vacías. */
