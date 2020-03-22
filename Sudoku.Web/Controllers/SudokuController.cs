using Microsoft.AspNetCore.Mvc;
using Sudoku.Functions;
using System.Runtime.CompilerServices;

namespace Sudoku.Web.Controllers
{
    public class SudokuController : Controller
    {
        public ISudokuSolver SudokuSolver { get; set; }
        public ISudokuGenerator SudokuGenerator { get; set; }

        [Route("is-solved")]
        [HttpPost]
        public bool IsSolved([FromBody] SudokuGrid grid)
        {
            return SudokuSolver.IsSolved(grid);
        }

        [Route("solve")]
        [HttpPost]
        public SudokuGrid Solve([FromBody] SudokuGrid grid)
        {
            return SudokuSolver.Solve(grid);
        }

        [Route("create-grid")]
        [HttpGet]
        public SudokuGrid CreateGrid(GameType gameType)
        {
            return SudokuGenerator.GenerateGrid(gameType);
        }
    }
}
