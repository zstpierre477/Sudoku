import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import SudokuGame from './components/SudokuGame';

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            games: 1
        }
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleRestartClick = this.handleRestartClick.bind(this);
    }

    handleStartClick() {
        this.setState(({ show: false }))
    }

    handleRestartClick() {
        this.setState(({ games: this.state.games+1 }))
    }

    render() {
        if (this.state.show) {
            return (
                <div>
                    <h1>Welcome to Sudoku!</h1>
                    <div id="start"><button id="startButton" onClick={this.handleStartClick}>Start</button></div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div id="restart"><button id="restartButton" onClick={this.handleRestartClick}>Generate New Puzzle</button></div>
                    <div key={this.state.games}>
                        <SudokuGame />
                    </div> 
                </div>
            );
        }
    }
}

ReactDOM.render(<Start />, document.getElementById('root'));
registerServiceWorker();