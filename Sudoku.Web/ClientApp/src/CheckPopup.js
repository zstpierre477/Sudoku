class CheckPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            value: "POPUP!"
        };
        this.close = this.close.bind(this);
    }

    close() {
        this.setState({
            visible: false
        });
    }

    open(message) {
        this.setState({
            visible: true
        });
        this.setValue(message);
    }

    setValue(message) {
        this.setState({
            value: message
        });
    }

    render() {
        if (this.state.visible) {
            return (
                <div>
                    <div>{this.state.value}</div>
                    <div><button onClick={this.close}>Close</button></div>
                </div>
            );
        }
    }
}