using Microsoft.VisualStudio.TestTools.UnitTesting;
using Shouldly;

namespace Sudoku.Functions.Tests
{
    [TestClass]
    public class SudokuGeneratorTests
    {
        private ISudokuGenerator SudokuGenerator { get; set; }
        private ISudokuSolver SudokuSolver { get; set; }

        [TestInitialize]
        public void Setup()
        {
            SudokuSolver = new SudokuSolver();
            SudokuGenerator = new SudokuGenerator(SudokuSolver);           
        }

        [TestMethod]
        public void GeneratorTest()
        {
            var grid = SudokuGenerator.GenerateGrid(GameType.Sudoku);

            var solvedGrid = SudokuSolver.Solve(grid);

            solvedGrid.Solvable.ShouldBe(true);
            solvedGrid.Unique.ShouldBe(true);
            SudokuSolver.IsSolved(solvedGrid.SolvedGrid).ShouldBe(true);
        }
    }
}
