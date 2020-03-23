namespace Sudoku.Functions
{
    public interface ISudokuSolver
    {
        SolvedSudokuGrid Solve(SudokuGrid sudokuGrid);
        bool IsSolved(SudokuGrid sudokuGrid);
        bool IsValidMove(int row, int column, int value, SudokuGrid grid);
    }
}
