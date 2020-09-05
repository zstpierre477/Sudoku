using System.Linq;

namespace Sudoku.Functions
{
    public class SudokuSolver : ISudokuSolver
    {
        public SolvedSudokuGrid Solve(SudokuGrid sudokuGrid) {
            var currentGrid = new SudokuGrid(sudokuGrid);
            currentGrid.GenerateCandidateValues();
            return RecursivelySolve(currentGrid, 0, 0);
        }

        private SolvedSudokuGrid RecursivelySolve(SudokuGrid sudokuGrid, int row, int col)
        {
            var currentGrid = new SudokuGrid(sudokuGrid);
            var gridValue = currentGrid.GetGridValue(row, col);
            currentGrid.UpdateCandidateValues(row, col, gridValue.Value);
            var coords = currentGrid.GetSmallestCandidateValuesCellCoordinates();

            var values = currentGrid.GetCandidateValues(coords.Item1, coords.Item2);

            if (values.Count == 0)
            {
                if (IsSolved(currentGrid))
                {
                    return new SolvedSudokuGrid(currentGrid, true, true);
                }
                return new SolvedSudokuGrid(currentGrid, true, false);
            }

            SolvedSudokuGrid previouslySolvedGrid = null;
            foreach (var value in values.ToList())
            {
                currentGrid.SetGridValue(coords.Item1, coords.Item2, value);
                var solvedGrid = RecursivelySolve(currentGrid, coords.Item1, coords.Item2);

                if (solvedGrid.Solvable && (solvedGrid.Unique == false || previouslySolvedGrid != null))
                {
                    return new SolvedSudokuGrid(solvedGrid.SolvedGrid, false, true);
                }
                if (solvedGrid.Solvable && previouslySolvedGrid == null)
                {
                    previouslySolvedGrid = new SolvedSudokuGrid(solvedGrid.SolvedGrid, true, true);
                }
            }

            if (previouslySolvedGrid != null)
            {
                return new SolvedSudokuGrid(previouslySolvedGrid.SolvedGrid, previouslySolvedGrid.Unique, true);
            }

            return new SolvedSudokuGrid(currentGrid, true, false);
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