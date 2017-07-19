import React from 'react';
import DatePickerDrown from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
const language = typeof window !== 'undefined' && window.navigator ? (window.navigator.userLanguage || window.navigator.language || '').toLowerCase() : '';
const dateFormat = !language || language === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
class FormatDateDrownList extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            startDate: moment(),
            separator: dateFormat.match(/[^A-Z]/)[0]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBadInput = this.handleBadInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleInputChange(e) {
        debugger
            const originalValue = e.target.value.concat(e.key);
            const inputValue = originalValue.replace(/(-|\/\/)/g, this.state.separator).slice(0, 10);

            let month, day, year;
            if (dateFormat.match(/MM.DD.YYYY/)) {
                if (!inputValue.match(/[0-1][0-9].[0-3][0-9].[1-2][0-9][0-9][0-9]/)) {
                    debugger;
                    return this.handleBadInput(originalValue);
                }

                month = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
                day = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
                year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
            } else if (dateFormat.match(/DD.MM.YYYY/)) {
                if (!inputValue.match(/[0-3][0-9].[0-1][0-9].[1-2][0-9][0-9][0-9]/)) {
                    debugger;
                    return this.handleBadInput(originalValue);
                }

                day = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
                month = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
                year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
            } else {
                if (!inputValue.match(/[1-2][0-9][0-9][0-9].[0-1][0-9].[0-3][0-9]/)) {
                    debugger;
                    return this.handleBadInput(originalValue);
                }

                year = inputValue.slice(0, 4).replace(/[^0-9]/g, '');
                month = inputValue.slice(5, 7).replace(/[^0-9]/g, '');
                day = inputValue.slice(8, 10).replace(/[^0-9]/g, '');
            }

            const monthInteger = parseInt(month, 10);
            const dayInteger = parseInt(day, 10);
            const yearInteger = parseInt(year, 10);
            if (monthInteger > 12 || dayInteger > 31) {
                debugger;
                return this.handleBadInput(originalValue);
            }

            if (!isNaN(monthInteger) && !isNaN(dayInteger) && !isNaN(yearInteger) && monthInteger <= 12 && dayInteger <= 31 && yearInteger > 999) {
                const selectedDate = new Date(yearInteger, monthInteger - 1, dayInteger, 12, 0, 0, 0);
                this.setState({
                    selectedDate: selectedDate,
                });

                if (this.props.onChange) {
                    this.props.onChange(selectedDate.toISOString(), inputValue);
                }
            }

            this.setState({
                startDate: inputValue
            });
    }

    handleBadInput(originalValue) {
        debugger
        const parts = originalValue.replace(new RegExp(`[^0-9${this.state.separator}]`), '').split(this.state.separator);
        if (dateFormat.match(/MM.DD.YYYY/) || dateFormat.match(/DD.MM.YYYY/)) {
            if (parts[0] && parts[0].length > 2) {
                parts[1] = parts[0].slice(2) + (parts[1] || '');
                parts[0] = parts[0].slice(0, 2);
            }
            if (parts[1] && parts[1].length > 2) {
                parts[2] = parts[1].slice(2) + (parts[2] || '');
                parts[1] = parts[1].slice(0, 2);
            }
            if (parts[2]) {
                parts[2] = parts[2].slice(0, 4);
            }
        } else {
            if (parts[0] && parts[0].length > 4) {
                parts[1] = parts[0].slice(4) + (parts[1] || '');
                parts[0] = parts[0].slice(0, 4);
            }
            if (parts[1] && parts[1].length > 2) {
                parts[2] = parts[1].slice(2) + (parts[2] || '');
                parts[1] = parts[1].slice(0, 2);
            }
            if (parts[2]) {
                parts[2] = parts[2].slice(0, 2);
            }
        }
        this.setState({
            startDate: parts.join(this.state.separator)
        });
    }

    handleKeyDown(e) {
        if (e.key.match(/[0-9]/)) {
            this.handleInputChange(e);
        } else {
            let key = e.keyCode || e.charCode;

            if (key === 8 || key === 46) {
                this.setState({
                    startDate: ''
                });
            }
        }
        console.log(this.state.startDate);
    }

    render() {
        console.log(`prueba =`, this.state);

        return (
            <div>
                <DatePickerDrown
                    selected={this.state.startDate}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    value={this.state.startDate}
                    dropdownMode="select"
                />
            </div>
        );
    }
}

export  default FormatDateDrownList;
