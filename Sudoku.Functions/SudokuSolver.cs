using System.Linq;

namespace Sudoku.Functions
{
    public class SudokuSolver : ISudokuSolver
    {
        public SolvedSudokuGrid Solve(SudokuGrid sudokuGrid) {
            var solves = 0;
            var currentGrid = new SudokuGrid(sudokuGrid);
            var solvedGrid = new SudokuGrid();
            for (var row = 0; row < 9; row++)
            {
                for (var column = 0; column < 9; column++)
                {
                    var gridValue = currentGrid.GetGridValue(row, column);
                    if (gridValue.StartedInGrid == false)
                    {
                        var value = gridValue.Value;
                        var changed = false;
                        while (value < 9)
                        {
                            if (IsValidMove(row, column, value + 1, currentGrid))
                            {
                                currentGrid.SetGridValue(row, column, value + 1);                              
                                if (row == 8 && column == 8)
                                {
                                    solvedGrid = new SudokuGrid(currentGrid);
                                    solves++;
                                    if (solves > 1)
                                    {
                                        return new SolvedSudokuGrid(solvedGrid, solves == 1, solves > 0);
                                    }
                                    else
                                    {
                                        currentGrid.SetGridValue(row, column, 0);
                                    }
                                }
                                else
                                {
                                    changed = true;
                                    break;
                                }
                            }
                            value++;
                        }
                        if (changed == false)
                        {
                            currentGrid.SetGridValue(row, column, 0);
                            do
                            {
                                if (column != 0)
                                {
                                    column--;
                                }
                                else
                                {
                                    if (row != 0)
                                    {
                                        row--;
                                        column = 8;
                                    }
                                    else
                                    {
                                        return new SolvedSudokuGrid(solvedGrid, solves == 1, solves > 0);
                                    }
                                }
                            } while (currentGrid.GetGridValue(row, column).StartedInGrid);
                            if (column != 0)
                            {
                                column--;
                            }
                            else
                            {
                                if (row != 0)
                                {
                                    row--;
                                    column = 8;
                                }
                                else
                                {
                                    return new SolvedSudokuGrid(solvedGrid, solves == 1, solves > 0);
                                }
                            }
                        }
                    }
                }
            }
            return new SolvedSudokuGrid(solvedGrid, solves == 1, solves > 0);
        }

        public bool IsSolved (SudokuGrid sudokuGrid) {
            for (var i = 0; i < 9; i++) {
                var row = sudokuGrid.GetRow(i);
                var column = sudokuGrid.GetColumn(i);
                for (var j = 0; j < 9; j++) {
                    if (row.Any(r => r.Value == j+1) == false ||
                    column.Any(c => c.Value == j+1) == false) {
                        return false;
                    }
                }              
            }

            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    var box = sudokuGrid.GetBox(i*3, j*3);
                    for (var k = 0; k < 9; k++) {
                        if (box.Any(b => b.Value == k+1) == false) {
                            return false;
                        }
                    }
                }
            }

            return true;
        }

        public bool IsValidMove(int row, int column, int value, SudokuGrid sudokuGrid) {         
            for (var i = 0; i < 9; i++) {
                if (i != row && sudokuGrid.GetGridValue(i, column).Value == value) {
                    return false;
                }
                if (i != column && sudokuGrid.GetGridValue(row, i).Value == value) {
                    return false;
                }
            }

            var rowMod = row % 3;
            var columnMod = column % 3;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if ((i != rowMod || j != columnMod) 
                    && sudokuGrid.GetGridValue((row - rowMod) + i,(column - columnMod) + j).Value == value) {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}