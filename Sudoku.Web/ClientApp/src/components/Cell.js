import React from 'react';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.renderCellValues = this.renderCellValues.bind(this);
        this.determineCellBorderingNumber = this.determineCellBorderingNumber.bind(this);
    }

    determineCellBorderingNumber() {
        let i = Math.floor(this.props.Position/9);
        let j = this.props.Position%9;
        let number = (3 * (i % 3) + (j % 3));
        return "cellBordering" + number;
    }

    renderCellValues() {
        if (this.props.Value == 0) {
            return (
                <span>
                    <span id="cellCornerNumbers">{this.props.CornerNumbers}</span>
                    <span id="cellCenterNumbers">{this.props.CenterNumbers}</span>
                </span>
            );
        }
        else {
            return (<span id="cellValue">{this.props.Value}</span>);
        }
    }

    render() {
        return (<td class={"cell" + this.props.StartedInGrid} id={this.determineCellBorderingNumber()} onClick={this.props.onClick.bind(this, this.props.StartedInGrid, this.props.Position)}><div>{this.renderCellValues()}</div></td >);
    }
}

export default Cell;