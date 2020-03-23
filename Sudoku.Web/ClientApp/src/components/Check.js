import React from 'react';
import CheckPopup from './CheckPopup';

class Check extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            popup: new CheckPopup(),
            cells: props.cells
        }
    }

    handleClick() {
        let solved = true;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cells: this.state.cells })
        };
        fetch('https://localhost:44388/is-solved', requestOptions)
            .then(res => res.json())
            .then((data) => solved = data);
        let message = "";
        if (solved) {
            message = "The sudoku puzzle is solved!";
        }
        else {
            message = "The sudoku puzzle is not solved.";
        }
        this.state.popup.open(message);
    }

    render() {
        return (<button id="checkButton" onClick={this.handleClick}>Check</button>);
    }
}

export default Check;