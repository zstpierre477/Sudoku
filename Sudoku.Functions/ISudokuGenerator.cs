namespace Sudoku.Functions
{
    public interface ISudokuGenerator
    {
        SudokuGrid GenerateGrid(GameType gameType);
    }
}
