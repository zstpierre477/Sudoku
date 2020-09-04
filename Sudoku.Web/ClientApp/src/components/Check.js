import React from 'react';
import CheckPopup from './CheckPopup';
import axios from 'axios';

class Check extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.renderPopup = this.renderPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.state = {
            popupMessage: "Hi",
            popupVisible: false
        }
    }

    handleClick() {
        let solved = true;
        axios({
            method: 'post',
            url: 'https://sudoku-zstpierre4.azurewebsites.net/check',
            data: this.props.convertCellsForPost(),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
            solved = response.data;
            let message = "";
            if (solved) {
                message = "The sudoku puzzle is solved!";
                this.props.stopTimer();
            }
            else {
                message = "The sudoku puzzle is not solved.";
            }
            this.setState({
                popupMessage: message,
                popupVisible: true
            });
        }, (error) => {
            console.log(error);
        });
    }

    renderPopup() {
        if (this.state.popupVisible) {
            return(
                <CheckPopup message={this.state.popupMessage} closePopup={this.closePopup} />
            );
        }      
    }

    closePopup() {
        this.setState({popupVisible: false});
    }

    render() {       
        return (
            <span>
                <button class="gridButton" onClick={this.handleClick}>Check</button>
                {this.renderPopup()}
            </span>    
            );       
        }
    }
    
export default Check;