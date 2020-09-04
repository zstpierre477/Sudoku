import React from 'react';
import Timer from './Timer';
import Solve from './Solve';
import Check from './Check';
import NumberButton from './NumberButton';
import Cell from './Cell';
import Clear from './Clear';
import axios from 'axios';
import InputTypeButton from './InputTypeButton';

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
        this.handleCellClick = this.handleCellClick.bind(this);
        this.clearCells = this.clearCells.bind(this);
        this.setInputType = this.setInputType.bind(this);
        this.state = {
            loading: true,
            cells: [],
            stopTimer: false,
            currentNumber: 1,
            inputType: "Value",
            gameType: this.props.gameType
        };
        this.createCells();
    }
    
    createCells() {
        axios({
            method: 'post',
            url: 'https://localhost:44395/create',
            data: this.state.gameType,
            headers: { 'Content-Type': 'application/json' }
        })
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
        for (var i = number - 3; i < number; i++) {
            buttons.push(<NumberButton value={i+1} setCurrentNumber={this.setCurrentNumber} selected={this.state.currentNumber == i+1} />);
        }
        return buttons;
    }

    parseDataToCells(data) {
        let cells = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                cells.push(<Cell Position={(9 * i) + j} CornerNumbers={[]} CenterNumbers={[]} Value={data[i][j].Value} StartedInGrid={data[i][j].StartedInGrid} onClick={this.handleCellClick} />)
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

        return JSON.stringify(rows) + JSON.stringify(this.state.gameType);
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

    handleCellClick(startedInGrid, position) {
        if (startedInGrid == false && this.state.currentNumber != 0) {
            if (this.state.inputType == "Value") {
                this.setState(prevState => ({
                    cells: prevState.cells.map(
                        c => c.props.Position != position ? c : <Cell Position={position} StartedInGrid={false} onClick={this.handleCellClick}
                            CornerNumbers={c.props.CornerNumbers} CenterNumbers={c.props.CenterNumbers} Value={this.state.currentNumber == c.props.Value ? 0 : this.state.currentNumber} />
                    )
                }))
            }
            else {
                this.setState(prevState => ({
                    cells: prevState.cells.map(
                        c => {
                            if (c.props.Position != position) {
                                return c;
                            }
                            else {
                                if (this.state.inputType == "Center") {
                                    if (c.props.CenterNumbers.includes(this.state.currentNumber)) {
                                        return (<Cell Position={position} StartedInGrid={false} onClick={this.handleCellClick}
                                            CornerNumbers={c.props.CornerNumbers} Value={c.props.Value}
                                            CenterNumbers = { c.props.CenterNumbers.filter((value) => { return value != this.state.currentNumber; }) } />);
                                    }
                                    else {
                                        c.props.CenterNumbers.push(this.state.currentNumber);
                                        c.props.CenterNumbers.sort(function (a, b) { return a - b });
                                    }                                  
                                }
                                else if (this.state.inputType == "Corner") {
                                    if (c.props.CornerNumbers.includes(this.state.currentNumber)) {
                                        return (<Cell Position={position} StartedInGrid={false} onClick={this.handleCellClick}
                                            CenterNumbers={c.props.CenterNumbers} Value={c.props.Value}
                                            CornerNumbers={c.props.CornerNumbers.filter((value) => { return value != this.state.currentNumber; })} />);
                                    }
                                    else {
                                        c.props.CornerNumbers.push(this.state.currentNumber);
                                        c.props.CornerNumbers.sort(function (a, b) { return a - b });
                                    }                                   
                                } 
                                
                                return (<Cell Position={position} StartedInGrid={false} onClick={this.handleCellClick}
                                    CornerNumbers={c.props.CornerNumbers} CenterNumbers={c.props.CenterNumbers} Value={c.props.Value} />);
                            }
                        })
                }))                
            }         
        }
    }

    clearCells() {
        this.setState(prevState => ({
            cells: prevState.cells.map(
                c => c.props.StartedInGrid ? c : <Cell Position={c.props.Position} Value={0} CornerNumbers={[]} CenterNumbers={[]} StartedInGrid={false} onClick={this.handleCellClick} />
            )
        }))
    }

    setInputType(inputType) {
        this.setState({
            inputType: inputType
        });
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
                            <InputTypeButton inputType={"Value"} onClick={this.setInputType} selected={this.state.inputType == "Value"} />
                            {this.renderNumberButtons(3)}
                            <Check convertCellsForPost={this.convertCellsForPost} stopTimer={this.stopTimer} />
                        </div>
                        <div>
                            <InputTypeButton inputType={"Corner"} onClick={this.setInputType} selected={this.state.inputType == "Corner"} />
                            {this.renderNumberButtons(6)}
                            <Clear clearCells={this.clearCells} />
                        </div>
                        <div>
                            <InputTypeButton inputType={"Center"} onClick={this.setInputType} selected={this.state.inputType == "Center"} />
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