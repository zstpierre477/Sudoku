import React from 'react';

class InputTypeButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {   
        if (this.props.selected) {
            return (<button class="gridButtonSelected" onClick={this.props.onClick.bind(this, this.props.inputType)}>{this.props.inputType}</button>);
        }
        else {
            return (<button class="gridButton" onClick={this.props.onClick.bind(this, this.props.inputType)}>{this.props.inputType}</button>);
        }
    }
}

export default InputTypeButton;