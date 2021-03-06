/**
 * Created by informatica on 26/06/17.
 */
import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import {HelpBlock} from 'react-bootstrap';

//otro probar https://hacker0x01.github.io/react-datepicker/
class FormatDate extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = this.getInitialState();
    }

    getInitialState() {
        var value = new Date().toISOString();
        return {
            value: value
        }
    }

    handleChange(value, formattedValue) {
        this.setState({
            value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }

    componentDidUpdate() {
        // Access ISO String and formatted values from the DOM.
        var hiddenInputElement = document.getElementById("example-datepicker");
        console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
        console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
    }

//
    render() {
        return (
            <div>
                <div>
                    <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange}/>
                    <HelpBlock>Help</HelpBlock>
                </div>
            </div>
        )
    }
}
export default FormatDate;