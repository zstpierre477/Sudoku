import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import SudokuGame from 'SudokuGame';

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: true, game: new SudokuGame() }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(({ show: false }))
    }

    render() {
        if (this.state.show) {
            return (
                <div>
                    <h1>Welcome to Sudoku!</h1>
                    <div id="start"><button id="startButton" onClick={this.handleClick}>Start</button></div>
                </div>
            );
        }
        else {
            return (this.state.game);
        }
    }
}

ReactDOM.render(<Start />, document.getElementById('root'));
serviceWorker.unregister();
