import React from 'react';

class NumberButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<button class="gridButton" onClick={this.props.setCurrentNumber.bind(this, this.props.value)}>{this.props.value}</button>);
    }
}

export default NumberButton;