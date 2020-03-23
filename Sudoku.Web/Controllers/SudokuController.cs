using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Sudoku.Functions;

namespace Sudoku.Web.Controllers
{
    public class SudokuController : Controller
    {
        public ISudokuSolver SudokuSolver { get; set; }
        public ISudokuGenerator SudokuGenerator { get; set; }

        public SudokuController(ISudokuSolver sudokuSolver, ISudokuGenerator sudokuGenerator)
        {
            SudokuGenerator = sudokuGenerator;
            SudokuSolver = SudokuSolver;
        }

        [Route("is-solved")]
        [HttpPost]
        public string IsSolved([FromBody] SudokuGrid grid)
        {
            var isSolved = SudokuSolver.IsSolved(grid);
            return JsonConvert.SerializeObject(isSolved);
        }

        [Route("solve")]
        [HttpPost]
        public string Solve([FromBody] SudokuGrid grid)
        {
            var solvedGrid = SudokuSolver.Solve(grid).SolvedGrid;
            return JsonConvert.SerializeObject(solvedGrid);
        }

        [Route("create-grid")]
        [HttpGet]
        public string CreateGrid(GameType gameType)
        {
            var grid = SudokuGenerator.GenerateGrid(gameType).GetGrid();
            return JsonConvert.SerializeObject(grid);
        }
    }
}
