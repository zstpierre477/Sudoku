class SudokuGame extends React.Component {
    constructor(props) {
        super(props);
        this.createNumberButtons = this.createNumberButtons.bind(this);
        this.renderNumberButtons = this.renderNumberButtons.bind(this);
        this.state = {
            sudokuGrid: new SudokuGrid(),
            timer: new Timer(0),
            numberButtons: this.createNumberButtons(),
            solve: new Solve(),
            check: new Check()
        };
    }

    componentDidMount() {
        this.setState({
            solve: new Solve(this.sudokuGrid.cells),
            check: new Check(this.sudokuGrid.cells)
        });
    }

    createNumberButtons() {
        let buttons = []
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                buttons.push(<NumberButton value={3 * i + j + 1} />)
            }
        }
        return buttons
    }

    renderNumberButtons() {
        let rows = []
        for (var i = 0; i < 3; i++) {
            let columns = []
            for (var j = 0; j < 3; j++) {
                columns.push(this.state.numberButtons[3 * i + j])
            }
            rows.push(<div id="numberButtonDivs">{columns}</div>)
        }
        return rows
    }

    render() {
        return (
            <div>
                <h1>Sudoku</h1>
                {this.state.timer.render()}
                {this.state.sudokuGrid.render()}
                <div id="numberButtonDiv">
                    {this.renderNumberButtons()}
                </div>
                <div id="solve-check">
                    {this.state.solve.render()}{this.state.check.render()}
                </div>
            </div>
        );
    }
}