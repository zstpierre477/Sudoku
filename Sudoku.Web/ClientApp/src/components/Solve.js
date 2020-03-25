import React from 'react';
import axios from 'axios';

class Solve extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        axios({
            method: 'post',
            url: 'https://localhost:44388/solve',
            data: this.props.convertCellsForPost(),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            this.props.onClick(response.data);
            this.props.stopTimer();
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        return (<button class="gridButton" onClick={this.handleClick}>Solve</button>);
    }
}

export default Solve;