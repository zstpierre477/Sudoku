import React from 'react';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.data.value};
        this.startedInGrid = props.data.startedInGrid;
    }

    render() {
        if (this.state.value === 0) {
            return (<div></div>);
        }
        else {
            return (<div>{this.state.value}</div>);
        }
    }
}

export default Cell;