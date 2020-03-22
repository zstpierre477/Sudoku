using System;

namespace Sudoku.Functions
{
    public class SudokuGrid
    {
        private SudokuCell[][] Grid { get; set; }

        public SudokuCell GetGridValue(int row, int column) {
            return Grid[row][column];
        }

        public void SetGridValue(int row, int column, int value, bool startInGrid = false) {
            Grid[row][column].Value = value;
            Grid[row][column].StartedInGrid = startInGrid;
        }

        public SudokuCell[] GetColumn(int column)
        {
            var col = new SudokuCell[9];
            for(var i = 0; i < 9; i++) {
                col[i] = Grid[i][column];
            }
            return col;
        }

        public SudokuCell[] GetRow(int row)
        {
            return Grid[row];
        }

        public SudokuCell[] GetBox(int row, int column) {
            var rowMod = row % 3;
            var columnMod = column % 3;

            var col = new SudokuCell[9];
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    col[3*i + j] = Grid[row - rowMod + i][column - columnMod + j];
                }
            }
            return col;
        }
    }
}