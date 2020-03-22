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
        let cells = []
        for (var i = 0; i < 81; i++) {
            cells.push(new Cell());
        }
        return cells;
    }

    componentDidMount() {
        fetch('http://localhost:44388/create-grid')
            .then(res => res.json())
            .then((data) => {
                this.setState({ cells: data })
            })
            .catch(console.log)
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