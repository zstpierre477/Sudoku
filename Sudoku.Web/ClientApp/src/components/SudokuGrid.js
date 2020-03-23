import React from 'react';
import Cell from './Cell';

class SudokuGrid extends React.Component {
    constructor(props) {
        super(props);
        this.renderCells = this.renderCells.bind(this);
        this.createCells = this.createCells.bind(this);
        this.state = {
            cells: this.createCells()
        };
    }

    createCells() {
        let data = fetch('http://localhost:44388/create-grid');
        let json = data.then(response => response.json());
        let done = json.then(cells => this.setState({ cells: cells }));
        let more = done.catch(error => {
                // handle error
            });
    }

    renderCells() {
        let rows = []
        for (var i = 0; i < 9; i++) {
            let columns = []
            for (var j = 0; j < 9; j++) {
                columns.push(<td id={"cellBordering" + (3 * (i % 3) + (j % 3))}>{new Cell(this.state.cells[i * 9 + j])}</td>)
            }
            rows.push(<tr id={"row" + i}>{columns}</tr>)
        }
        return (
            <div>
                <table id="grid">
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }

    render() {
        return (this.renderCells());
    }
}

export default SudokuGrid;