namespace Sudoku.Functions
{
    public class SudokuCell
    {
        public int Value {get; set;}
        public bool StartedInGrid { get; set; }

        public SudokuCell(int value = 0, bool startedInGrid = false) {
            Value = value;
            StartedInGrid = startedInGrid;
        }
    }
}