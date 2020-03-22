class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props ?.data ?.value ?? 0};
        this.startedInGrid = props ?.data ?.startedInGrid ?? false;
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