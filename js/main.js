function DrawCellBorder(row, column, cell){
  //Draws the 2 vertical and 2 horizontal lines found in a traditional sudoku grid.

  var border_color="crimson";

  //drawing vertical lines
  if (column==2){cell.style["border-right"]="1px solid "+border_color};
  if (column==3){cell.style["border-left"]="1px solid "+border_color};

  if (column==5){cell.style["border-right"]="1px solid "+border_color};
  if (column==6){cell.style["border-left"]="1px solid "+border_color};

  //drawing horizontal lines
  if (row==2){cell.style["border-bottom"]="1px solid "+border_color};
  if (row==3){cell.style["border-top"]="1px solid "+border_color};

  if (row==5){cell.style["border-bottom"]="1px solid "+border_color};
  if (row==6){cell.style["border-top"]="1px solid "+border_color};
}

function CreateSudokuGrid(table_id){
  //Creates the sudoku grid displayed on the webpage.

  var table=document.getElementById(table_id);

  for (var i=0; i<9; i++){
    var row=table.insertRow(-1);

    for (var j=0; j<9; j++){
      var cell=row.insertCell(-1);
      DrawCellBorder(i, j, cell)
      
      var textbox=document.createElement("input");
      textbox.setAttribute("type", "text");
      textbox.setAttribute("id", "cell_"+((i*9)+j));
      textbox.setAttribute("value", "");

      cell.appendChild(textbox);
    }
  }
}

function SolveSudokuPuzzle(){
  //This function is called when the "Solve" button on the webpage is pressed.

  var sudoku=new Sudoku();
  sudoku.Solve();
}

function Main(){
  //This function is called after the webpage is loaded.

  CreateSudokuGrid("SudokuGrid");
}  