namespace Sudoku.Functions
{
    public interface ISudokuSolver
    {
        SudokuGrid Solve(SudokuGrid sudokuGrid);
        bool IsSolved(SudokuGrid sudokuGrid);
    }
}
