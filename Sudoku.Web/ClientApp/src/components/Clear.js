import React from 'react';

class Clear extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {       
        return (
            <button class="gridButton" onClick={this.props.clearCells.bind(this)}>Clear All</button>
        );       
    }
}

export default Clear;