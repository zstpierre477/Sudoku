﻿using System;

namespace Sudoku.Functions
{
    public class SudokuGenerator : ISudokuGenerator
    {
        private ISudokuSolver SudokuSolver { get; set; }

        public SudokuGenerator(ISudokuSolver sudokuSolver)
        {
            SudokuSolver = sudokuSolver;
        }

        public SudokuGrid GenerateGrid(GameType gameType)
        {
            var grid = new SudokuGrid();
            bool unique;
            var count = 0;
            while (true)
            {
                while (count < 22)
                {
                    var row = new Random().Next(0, 9);
                    var column = new Random().Next(0, 9);
                    var value = new Random().Next(1, 10);

                    if (grid.GetGridValue(row, column).Value == 0)
                    {
                        if (SudokuSolver.IsValidMove(row, column, value, grid))
                        {
                            grid.SetGridValue(row, column, value, true);
                            count++;
                        }
                    }
                }

                var solvedGrid = SudokuSolver.Solve(new SudokuGrid(grid));

                if (solvedGrid.Solvable)
                {
                    unique = solvedGrid.Unique;
                    break;
                }

                grid = new SudokuGrid();
                count = 0;
            }

            while (unique == false)
            {
                var row = new Random().Next(0, 9);
                var column = new Random().Next(0, 9);
                var value = new Random().Next(1, 10);

                if (grid.GetGridValue(row, column).Value == 0)
                {
                    if (SudokuSolver.IsValidMove(row, column, value, grid))
                    {
                        grid.SetGridValue(row, column, value, true);
                        var solvedGrid = SudokuSolver.Solve(new SudokuGrid(grid));

                        if (solvedGrid.Solvable == false)
                        {
                            grid.SetGridValue(row, column, 0, false);
                        }
                        else
                        {
                            unique = solvedGrid.Unique;
                        }
                    }
                }
            }

            return grid;
        }
    }
}