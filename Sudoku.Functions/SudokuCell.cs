using System.Collections.Generic;
using System.Linq;

namespace Sudoku.Functions
{
    public class SudokuCell
    {
        public int Value {get; set;}
        public bool StartedInGrid { get; set; }
        public List<int> CandidateValues { get; set; }

        public SudokuCell(int value = 0, bool startedInGrid = false, List<int> candidateValues = null) {
            Value = value;
            StartedInGrid = startedInGrid;
            CandidateValues = candidateValues == null ? new List<int>() : new List<int>(candidateValues);
        }
    }
}