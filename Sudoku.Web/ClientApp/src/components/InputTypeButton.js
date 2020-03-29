import React from 'react';

class InputTypeButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {       
        return (
            <button class="gridButton" onClick={this.props.onClick.bind(this, this.props.inputType)}>{this.props.inputType}</button>
        );       
    }
}

export default InputTypeButton;