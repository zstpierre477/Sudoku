import React from 'react';
import Timer from './Timer';
import Solve from './Solve';
import Check from './Check';
import NumberButton from './NumberButton';
import SudokuGrid from './SudokuGrid';

class SudokuGame extends React.Component {
    constructor(props) {
        super(props);
        this.createNumberButtons = this.createNumberButtons.bind(this);
        this.renderNumberButtons = this.renderNumberButtons.bind(this);
        this.state = {
            sudokuGrid: new SudokuGrid(),
            timer: new Timer(0),
            numberButtons: this.createNumberButtons()
        };
        this.setState({
            solve: new Solve(this.state.sudokuGrid.state.cells),
            check: new Check(this.state.sudokuGrid.state.cells)
        });
    }

    createNumberButtons() {
        let buttons = []
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                buttons.push(new NumberButton(3*i+j+1))
            }
        }
        return buttons
    }

    renderNumberButtons() {
        let rows = []
        for (var i = 0; i < 3; i++) {
            let columns = []
            for (var j = 0; j < 3; j++) {
                columns.push(this.state.numberButtons[3*i+j])
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

export default SudokuGame;