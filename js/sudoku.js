function Sudoku(){
  this.EmptyCells=[];

  this.GetCell=GetCell;
  this.FindEmptyCells=FindEmptyCells;
  this.DigitsInRow=DigitsInRow;
  this.DigitsInColumn=DigitsInColumn;
  this.DigitsInBox=DigitsInBox;
  this.IsMoveValid=IsMoveValid;
  this.NextCandidateDigit=NextCandidateDigit;
  this.Solve=Solve;
}

function GetCell(row, column){
  //Returns the cell's input element.

  return document.getElementById("cell_"+((row*9)+column));  
}

function FindEmptyCells(){
  //Finds empty cells in grid and stores their location in 
  //EmptyCells attribute.

  this.EmptyCells=[];

  for (var row=0; row<9; row++){
    for (var column=0; column<9; column++){
      var cell=this.GetCell(row, column);
      if (cell.value==""){this.EmptyCells.push([row, column]);}
    }
  }
}

function DigitsInRow(row){
  //Returns the digits in a given row.

  digits=[];

  for (column=0; column<9; column++){
    var cell=this.GetCell(row, column);
    var digit=parseInt(cell.value);
    digits.push(digit);
  }

  return digits;   
}

function DigitsInColumn(column){
  //Returns the digits in a given column.

  var digits=[];

  for (var row=0; row<9; row++){
    var cell=this.GetCell(row, column);
    var digit=parseInt(cell.value);
    digits.push(digit);    
  }

  return digits;
}

function DigitsInBox(row, column){
  //Returns the digits in a given box in which the row and column intersect.

  digits=[];

  for (var r=Math.floor(row/3)*3; r<(Math.floor(row/3)+1)*3; r++){
    for (var c=Math.floor(column/3)*3; c<(Math.floor(column/3)+1)*3; c++){
      var cell=this.GetCell(r, c);
      var digit=parseInt(cell.value);
      digits.push(digit);
    }
  }

  return digits;
}

function IsMoveValid(digit, row, column){
  //Returns true if the digit can be written in the given cell; otherwise false. 

  if (this.DigitsInRow(row).indexOf(digit)>=0){return false}
  if (this.DigitsInColumn(column).indexOf(digit)>=0){return false}
  if (this.DigitsInBox(row, column).indexOf(digit)>=0){return false}

  return true;
}

function NextCandidateDigit(row, column){
  //Returns the next valid digit that can be written in a given cell.
  //Returns 1 if the cell is empty.
  //Returns null if no valid digit can be written in the cell.

  var current_digit=this.GetCell(row, column).value;
  var candidate_digit=(current_digit=="")?1:parseInt(current_digit)+1;

  while (this.IsMoveValid(candidate_digit, row, column)==false){
    candidate_digit+=1;
  }

  return (candidate_digit>9)?null:candidate_digit;
}

function Solve(){
  //Solves the sudoku puzzle by backtracking.

  this.FindEmptyCells();
  var i=0;

  while (i<this.EmptyCells.length && i>=0){
    var row=this.EmptyCells[i][0];
    var column=this.EmptyCells[i][1];
    var cell=this.GetCell(row, column);
    var candidate_digit=this.NextCandidateDigit(row, column);

    cell.style["background-color"]="#92CDDC";    

    if (candidate_digit!==null){
      //if candidate digit is valid then write it and move to the next empty cell

      cell.value=candidate_digit;
      i+=1;
    }
    else {
      //if candidate digit is invalid then erase the previously written digit
      //and go back to the previous "empty" cell

      cell.value="";
      i-=1;
    }
  }  

  if (i<0){alert("Invalid puzzle!")}
} 