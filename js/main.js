function createTable(tableData) {
  var sudoku = document.getElementsByClassName("sudoku");

  if (sudoku.length !== 0) {
    sudoku[0].parentNode.removeChild(sudoku[0]);
  }

  var table = document.createElement("table");
  table.classList.add("sudoku");
  table.classList.add("table");

  var tableBody = document.createElement("tbody");

  tableData.forEach(function (rowData) {
    var row = document.createElement("tr");
    row.classList.add("align-middle"); //alinea texto al centro eje Y

    rowData.forEach(function (cellData) {
      var cell = document.createElement("td");

      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);

      // Crear un input en las celdas cuyo texto sea ' '
      if (cell.textContent === " ") {
        var cellInput = document.createElement("input");
        cellInput.type = "text";
        cellInput.id = "sudoku-input-" + cell.cellIndex;
        cell.appendChild(cellInput);
      }
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  var sudokuGridContainer = document.getElementsByClassName("sudoku-grid");
  sudokuGridContainer[0].appendChild(table);
}

function doThis() {
  console.log("DO THIS");
}
