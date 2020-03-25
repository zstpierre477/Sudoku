import React from 'react';
import Timer from './Timer';
import Solve from './Solve';
import Check from './Check';
import NumberButton from './NumberButton';
import Cell from './Cell';
import Clear from './Clear';
import axios from 'axios';

class SudokuGame extends React.Component {
    constructor(props) {
        super(props);
        this.renderNumberButtons = this.renderNumberButtons.bind(this);
        this.createCells = this.createCells.bind(this);
        this.convertCellsForPost = this.convertCellsForPost.bind(this);
        this.parseDataToCells = this.parseDataToCells.bind(this);
        this.renderCells = this.renderCells.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.setCurrentNumber = this.setCurrentNumber.bind(this);
        this.setCellValue = this.setCellValue.bind(this);
        this.clearCells = this.clearCells.bind(this);
        this.state = {
            loading: true,
            cells: [],
            stopTimer: false,
            currentNumber: 0
        };
        this.createCells();
    }
    
    createCells() {
        axios.get('https://localhost:44388/create')
        .then((response) => {
            this.parseDataToCells(response.data);
            this.setState({
                loading: false
            });
        }, (error) => {
            console.log(error);
        });
    }

    renderNumberButtons(number) {
        let buttons = [];
        for (var i = number-3; i < number; i++) {
            buttons.push(<NumberButton value={i+1} setCurrentNumber={this.setCurrentNumber} />);
        }
        return buttons;
    }

    parseDataToCells(data) {
        let cells = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                cells.push(<Cell Position={(9*i)+j} Value={data[i][j].Value} StartedInGrid={data[i][j].StartedInGrid} onClick={this.setCellValue} />)
            }          
        }

        this.setState({
            cells: cells
        });
    }

    convertCellsForPost() {
        let rows = [];
        for (let i = 0; i < 9; i++) {
            let columns = [];
            for (let j = 0; j < 9; j++) {
                columns.push(this.state.cells[9 * i + j].props);
            }
            rows.push(columns);
        }

        return JSON.stringify(rows);
    };

    renderCells() {
        let rows = [];
        for (var i = 0; i < 9; i++) {
            let columns = [];
            for (var j = 0; j < 9; j++) {
                columns.push(this.state.cells[i * 9 + j]);
            }
            rows.push(<tr id={"row" + i}>{columns}</tr>);
        }
        return (
            <div>
                <table id="grid">
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }

    stopTimer() {
        this.setState({
            stopTimer: true
        });
    }

    setCurrentNumber(number) {
        this.setState({
            currentNumber: number
        });
    }

    setCellValue(startedInGrid, position) {
        if (startedInGrid == false) {
            this.setState(prevState => ({
                cells: prevState.cells.map(
                    c => c.props.Position === position ? <Cell Position={position} Value={this.state.currentNumber} StartedInGrid={startedInGrid} onClick={this.setCellValue} /> : c
                )
            }))
        }
    }

    clearCells() {
        this.setState(prevState => ({
            cells: prevState.cells.map(
                c => c.props.StartedInGrid ? c : <Cell Position={c.props.Position} Value={0} StartedInGrid={false} onClick={this.setCellValue} />
            )
        }))
    }

    render() {
        if (this.state.loading) {
            return (
                <div class="loader"></div>
            );
        }
        else {
            return (
                <div>
                    <h1>Sudoku</h1>
                    <Timer stop={this.state.stopTimer} />
                    {this.renderCells()}
                    <div id="buttons">
                        <div>
                            {this.renderNumberButtons(3)}
                            <Check convertCellsForPost={this.convertCellsForPost} stopTimer={this.stopTimer} />
                        </div>
                        <div>
                            {this.renderNumberButtons(6)}
                            <Clear clearCells={this.clearCells} />
                        </div>
                        <div>
                            {this.renderNumberButtons(9)}
                            <Solve onClick={this.parseDataToCells} convertCellsForPost={this.convertCellsForPost} stopTimer={this.stopTimer} />
                        </div>
                    </div>
                </div>
            );
        }       
    }
}

export default SudokuGame;