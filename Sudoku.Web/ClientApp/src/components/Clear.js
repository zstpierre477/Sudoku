import React from 'react';

class Check extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {       
        return (
            <button class="gridButton" onClick={this.props.clearCells.bind(this)}>Clear</button>
        );       
    }
}

export default Check;