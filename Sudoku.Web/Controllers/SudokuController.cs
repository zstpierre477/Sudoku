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
            SudokuSolver = sudokuSolver;
        }

        [Route("check")]
        [HttpPost]
        public string CheckIsSolved([FromBody] SudokuCell[][] cells, GameType gameType)
        {
            var isSolved = SudokuSolver.IsSolved(new SudokuGrid(cells));
            return JsonConvert.SerializeObject(isSolved);
        }

        [Route("solve")]
        [HttpPost]
        public string Solve([FromBody] SudokuCell[][] cells, GameType gameType)
        {
            foreach(var row in cells)
            {
                foreach (var column in row)
                {
                    if (column.StartedInGrid == false)
                    {
                        column.Value = 0;
                    }
                }
            }

            var solvedGrid = SudokuSolver.Solve(new SudokuGrid(cells)).SolvedGrid;
            return JsonConvert.SerializeObject(solvedGrid.GetCells());
        }

        [Route("create")]
        [HttpPost]
        public string CreateGrid(GameType gameType)
        {
            var grid = SudokuGenerator.GenerateGrid(gameType).GetGrid();
            return JsonConvert.SerializeObject(grid);
        }
    }
}
