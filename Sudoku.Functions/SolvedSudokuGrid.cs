namespace Sudoku.Functions
{
    public class SolvedSudokuGrid
    {
        public SolvedSudokuGrid(SudokuGrid sudokuGrid, bool unique, bool solvable)
        {
            SolvedGrid = new SudokuGrid(sudokuGrid);
            Unique = unique;
            Solvable = solvable;
        }

        public SudokuGrid SolvedGrid { get; set; }
        public bool Unique { get; set; }
        public bool Solvable { get; set; }
    }
}
