import React from 'react';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.determineCellBorderingNumber = this.determineCellBorderingNumber.bind(this);
    }

    determineCellBorderingNumber() {
        let i = Math.floor(this.props.Position/9);
        let j = this.props.Position%9;
        let number = (3 * (i % 3) + (j % 3));
        return "cellBordering" + number;
    }

    render() {
        if (this.props.Value === 0) {
            return (<td class={"cell" + this.props.StartedInGrid} id={this.determineCellBorderingNumber()} onClick={this.props.onClick.bind(this, this.props.StartedInGrid, this.props.Position)}><div /></td>);
        }
        else {
            return (<td class={"cell" + this.props.StartedInGrid} id={this.determineCellBorderingNumber()} onClick={this.props.onClick.bind(this, this.props.StartedInGrid, this.props.Position)}><div>{ this.props.Value }</div></td >);
        }
    }
}

export default Cell;