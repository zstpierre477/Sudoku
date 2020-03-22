namespace Sudoku.Functions
{
    public class SudokuCell
    {
        public int Value {get; set;}
        public bool StartedInGrid { get; set; }

        public SudokuCell(int value, bool startedInGrid) {
            Value = value;
            StartedInGrid = startedInGrid;
        }
    }
}