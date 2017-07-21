import React from 'react';
import FormatDate from './FormatDate';
import FormatDateDrownList from './FormatDateDrownList';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {FormGroup, ControlLabel} from 'react-bootstrap';
class FormInitial extends React.Component {
    constructor(props) {
        super(props);
        this.format = this.format.bind(this);
    }

    format(cell, row) {
        return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
    }

    render() {
        let products = [{
            id: 1,
            name: "Product1",
            price: 120
        }, {
            id: 2,
            name: "Product2",
            price: 80
        }];
        let selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)"
        };
        return (
            <div>
                <FormGroup className="text-left">
                    <FormatDateDrownList/>
                    <BootstrapTable data={products} selectRow={selectRowProp} striped hover condensed
                                    insertRow deleteRow search>
                        <TableHeaderColumn dataField="id" isKey dataAlign="right" dataSort>Product
                            ID </TableHeaderColumn>
                        <TableHeaderColumn dataField="name" dataSort>Product Name </TableHeaderColumn>
                        <TableHeaderColumn dataField="price" dataAlign="center">Product
                            Price </TableHeaderColumn>
                    </BootstrapTable>
                    <ControlLabel>FormatDateDrownList</ControlLabel>
                    <FormatDateDrownList/>
                    <br/><br/>
                    <ControlLabel>FormatDate</ControlLabel>
                    <FormatDate/>
                    <FormatDateDrownList/>
                </FormGroup>
            </div>
        );
    }
}

export default FormInitial;
