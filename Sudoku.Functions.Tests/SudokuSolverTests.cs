using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Shouldly;

namespace Sudoku.Functions.Tests
{
    [TestClass]
    public class SudokuSolverTests
    {
        private ISudokuSolver SudokuSolver { get; set; }

        [TestInitialize]
        public void Setup()
        {
            SudokuSolver = new SudokuSolver();
        }

        [TestMethod]
        public void All1sGridNotSolvable()
        {
            var cells = GenerateCellGrid(1, true);

            var grid = new SudokuGrid(cells);

            var result = SudokuSolver.Solve(grid);

            result.Solvable.ShouldBe(false);
            result.Unique.ShouldBe(true);
            SudokuSolver.IsSolved(result.SolvedGrid).ShouldBe(false);
        }

        [TestMethod]
        public void EmptyGridNotUnique()
        {
            var cells = GenerateCellGrid(0, false);

            var grid = new SudokuGrid(cells);

            var result = SudokuSolver.Solve(grid);

            result.Solvable.ShouldBe(true);
            result.Unique.ShouldBe(false);
            SudokuSolver.IsSolved(result.SolvedGrid).ShouldBe(true);
        }

        [TestMethod]
        public void UniqueGridSolved()
        {
            var values = new[] { 0,0,0,6,0,7,0,0,4,
                                 0,7,0,0,9,0,0,1,0,
                                 4,0,0,0,1,0,0,0,6,
                                 6,0,0,0,5,0,8,0,0,
                                 3,1,0,0,0,0,0,5,2,
                                 0,0,8,0,4,0,0,0,3,
                                 2,0,0,0,6,0,0,0,0,
                                 0,6,0,0,8,0,0,0,0,
                                 5,0,0,2,0,4,0,0,0};

            var cells = GenerateCellGrid(values);

            var grid = new SudokuGrid(cells);

            var result = SudokuSolver.Solve(grid);

            result.Unique.ShouldBe(true);
            result.Solvable.ShouldBe(true);
            SudokuSolver.IsSolved(result.SolvedGrid).ShouldBe(true);
        }

        [TestMethod]
        public void GenerateCandidateValues()
        {
            var values = new[] { 1,9,5,6,2,7,3,8,4,
                8,7,6,4,9,3,2,1,5,
                4,3,2,5,1,8,7,9,6,
                6,2,9,3,5,1,8,4,7,
                3,1,4,8,7,6,9,5,2,
                7,5,8,9,4,2,1,6,3,
                2,4,7,1,6,9,5,3,8,
                9,6,3,7,8,5,0,0,0,
                5,8,1,2,3,4,0,0,0};

            var cells = GenerateCellGrid(values);

            var grid = new SudokuGrid(cells);

            grid.GenerateCandidateValues();

            grid.GetCandidateValues(7, 6).Count.ShouldBe(1);
            grid.GetCandidateValues(7, 7).Count.ShouldBe(1);
            grid.GetCandidateValues(7, 8).Count.ShouldBe(1);
            grid.GetCandidateValues(8, 6).Count.ShouldBe(1);
            grid.GetCandidateValues(8, 7).Count.ShouldBe(1);
            grid.GetCandidateValues(8, 8).Count.ShouldBe(1);
        }

        [TestMethod]
        public void SolvedGridIsSolved()
        {
            var values = new[] { 1,9,5,6,2,7,3,8,4,
                                 8,7,6,4,9,3,2,1,5,
                                 4,3,2,5,1,8,7,9,6,
                                 6,2,9,3,5,1,8,4,7,
                                 3,1,4,8,7,6,9,5,2,
                                 7,5,8,9,4,2,1,6,3,
                                 2,4,7,1,6,9,5,3,8,
                                 9,6,3,7,8,5,4,2,1,
                                 5,8,1,2,3,4,6,7,9};

            var cells = GenerateCellGrid(values);

            var grid = new SudokuGrid(cells);

            var result = SudokuSolver.IsSolved(grid);

            result.ShouldBe(true);
        }

        [TestMethod]
        public void InvalidGridIsNotSolved()
        {
            var values = new[] { 1,2,3,4,5,6,7,8,9,
                                 1,2,3,4,5,6,7,8,9,
                                 1,2,3,4,5,6,7,8,9,
                                 1,2,3,4,5,6,7,8,9,
                                 1,2,3,4,5,6,7,8,9,
                                 1,2,3,4,5,6,7,8,9,
                                 1,2,3,4,5,6,7,8,9,
                                 1,2,3,4,5,6,7,8,9,
                                 1,2,3,4,5,6,7,8,9};

            var cells = GenerateCellGrid(values);

            var grid = new SudokuGrid(cells);

            var result = SudokuSolver.IsSolved(grid);

            result.ShouldBe(false);
        }

        [TestMethod]
        public void UnFinishedGridIsNotSolved()
        {
            var values = new[] { 0,0,0,6,0,7,0,0,4,
                                 0,7,0,0,9,0,0,1,0,
                                 4,0,0,0,1,0,0,0,6,
                                 6,0,0,0,5,0,8,0,0,
                                 3,1,0,0,0,0,0,5,2,
                                 0,0,8,0,4,0,0,0,3,
                                 2,0,0,0,6,0,0,0,0,
                                 0,6,0,0,8,0,0,0,0,
                                 5,0,0,2,0,4,0,0,0};

            var cells = GenerateCellGrid(values);

            var grid = new SudokuGrid(cells);

            var result = SudokuSolver.IsSolved(grid);

            result.ShouldBe(false);
        }

        private SudokuCell[][] GenerateCellGrid(int value, bool startInGrid)
        {
            var cells = new SudokuCell[9][];
            for (var i = 0; i < 9; i++)
            {
                cells[i] = new SudokuCell[9];
                for (var j = 0; j < 9; j++)
                {
                    cells[i][j] = new SudokuCell(value, startInGrid);
                }
            }

            return cells;
        }

        private SudokuCell[][] GenerateCellGrid(int[] values)
        {
            var cells = new SudokuCell[9][];
            for (var i = 0; i < 9; i++)
            {
                cells[i] = new SudokuCell[9];
                for (var j = 0; j < 9; j++)
                {
                    var value = values[9 * i + j];
                    cells[i][j] = new SudokuCell(value, value != 0);
                }
            }

            return cells;
        }
    }
}
