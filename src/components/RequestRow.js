import React, { Component } from 'react';
import { TableRow, TableCell } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class RequestRow extends Component {
    render () {
        const { id, request, approversCount } = this.props;

        return (
            <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{web3.utils.fromWei(request.value, 'ether')}</TableCell>
                <TableCell>{request.recipient}</TableCell>
                <TableCell>{request.approvalCount} / {approversCount}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        );
    }
};

export default RequestRow;