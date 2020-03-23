import React from 'react';

class NumberButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.value = props.value;
    }

    handleClick() {
    }

    render() {
        return (<button id="numberButton" onClick={this.handleClick}>{this.value}</button>);
    }
}

export default NumberButton;