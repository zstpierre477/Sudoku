class Solve extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            cells: props ?.cells ?? []
        }
    }

    handleClick() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cells: this.state.cells })
        };
        fetch('https://localhost:44388/solve', requestOptions)
            .then(res => res.json())
            .then((data) => this.setState({ cells: data }));
    }

    render() {
        return (<button id="solveButton" onClick={this.handleClick}>Solve</button>);
    }
}