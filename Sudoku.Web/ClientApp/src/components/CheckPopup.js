import React from 'react';

class CheckPopup extends React.Component {
    constructor(props) {
        super(props);
    }       

    render() {
        return (
            <div class="modal">
                <div class="popup">
                    <div class="popup-content">
                        <span>{this.props.message}</span>
                        <span><button onClick={this.props.closePopup.bind(this)}>Close</button></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckPopup;