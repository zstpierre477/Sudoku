using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Sudoku.Functions
{
    public class SudokuGrid
    {
        private SudokuCell[][] Grid { get; set; }

        public SudokuGrid()
        {
            Grid = new SudokuCell[9][];
            for (var i = 0; i < 9; i++)
            {
                Grid[i] = new SudokuCell[9];   
                for (var j = 0; j < 9; j++)
                {
                    Grid[i][j] = new SudokuCell();
                }
            }
        }

        public SudokuGrid(SudokuGrid sudokuGrid)
            : this(sudokuGrid.Grid) { }

        public SudokuGrid(SudokuCell[][] grid)
        {
            Grid = new SudokuCell[9][];
            for (var i = 0; i < 9; i++)
            {
                Grid[i] = new SudokuCell[9];
                for (var j = 0; j < 9; j++)
                {
                    Grid[i][j] = new SudokuCell(grid[i][j].Value, grid[i][j].StartedInGrid, grid[i][j].CandidateValues);
                }
            }
        }

        public SudokuCell[][] GetCells()
        {
            return Grid;
        }

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

        public SudokuCell[][] GetGrid()
        {
            return Grid;
        }

        public Tuple<int, int> GetSmallestCandidateValuesCellCoordinates()
        {
            var coords = new Tuple<int, int>(0, 0);
            var min = 10;

            for (var i = 0; i < 9; i++)
            {
                for (var j = 0; j < 9; j++)
                {
                    var valueCount = Grid[i][j].CandidateValues.Count();
                    if (valueCount < min && valueCount != 0)
                    {
                        coords = new Tuple<int, int>(i, j);
                        min = Grid[i][j].CandidateValues.Count();
                    }
                }
            }

            return coords;
        }

        public void GenerateCandidateValues()
        {
            for (var i = 0; i < 9; i++)
            {
                for (var j = 0; j < 9; j++)
                {
                    if (Grid[i][j].StartedInGrid)
                    {
                        continue;
                    }

                    Grid[i][j].CandidateValues = Enumerable.Range(1, 9).ToList();
                    var boxRow = i / 3;
                    var boxCol = j / 3;
                    for (var k = 0; k < 9; k++)
                    {
                        Grid[i][j].CandidateValues.Remove(Grid[k][j].Value);
                        Grid[i][j].CandidateValues.Remove(Grid[i][k].Value);
                    }

                    for (var k = 0; k < 3; k++)
                    {
                        Grid[i][j].CandidateValues.Remove(Grid[boxRow*3][(boxCol*3)+k].Value);
                        Grid[i][j].CandidateValues.Remove(Grid[(boxRow*3)+1][(boxCol*3)+k].Value);
                        Grid[i][j].CandidateValues.Remove(Grid[(boxRow*3)+2][(boxCol*3)+k].Value);
                    }
                }
            }
        }

        public void UpdateCandidateValues(int row, int column, int value)
        {
            if (value != 0)
            {
                Grid[row][column].CandidateValues = new List<int>();
            }

            var boxRow = row/3;
            var boxCol = column/3;
            for (var i = 0; i < 9; i++)
            {
                Grid[row][i].CandidateValues.Remove(value);
                Grid[i][column].CandidateValues.Remove(value);
            }

            for (var i = 0; i < 3; i++)
            {
                Grid[boxRow*3][(boxCol*3)+i].CandidateValues.Remove(value);
                Grid[(boxRow*3)+1][(boxCol*3)+i].CandidateValues.Remove(value);
                Grid[(boxRow*3)+2][(boxCol*3)+i].CandidateValues.Remove(value);
            }
        }

        public List<int> GetCandidateValues(int row, int col)
        {
            return Grid[row][col].CandidateValues;
        }
    }
}