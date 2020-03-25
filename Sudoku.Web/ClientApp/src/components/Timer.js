import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: parseInt(0, 10)
        };
    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));     
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    formatTime(secs) {
        let days = Math.floor(secs / 86400);
        let hours = Math.floor(secs / 3600) % 24;
        let minutes = Math.floor(secs / 60) % 60;
        let seconds = secs % 60;
        return [days, hours, minutes, seconds]
            .map(v => ('' + v).padStart(2, '0'))
            .filter((v, i) => v !== '00' || i > 0)
            .join(':');
    }

    render() {
        if (this.props.stop) {
            clearInterval(this.interval);
        }
        return (
            <h4>
                You've been playing for {this.formatTime(this.state.seconds)}
            </h4>
        );   
    }
}

export default Timer;