import React, { Component } from 'react';
import {
    TableRow,
    TableCell,
    Button,
} from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class RequestRow extends Component {
    onApprove = async () => {
        const accounts = await web3.eth.getAccounts();
        await this.props.campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
    }

    onFinalize = async () => {
        const accounts = await web3.eth.getAccounts();
        await this.props.campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });
    }

    render () {
        const { id, request, approversCount } = this.props;
        const readyToFinalize = parseInt(request.approvalCount) > parseInt(approversCount) / 2;

        return (
            <TableRow disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <TableCell>{id}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>{web3.utils.fromWei(request.value, 'ether')}</TableCell>
                <TableCell>{request.recipient}</TableCell>
                <TableCell>{parseInt(request.approvalCount)} / {parseInt(approversCount)}</TableCell>
                <TableCell>
                    { request.complete ? null : ( 
                        <Button color="green" basic onClick={this.onApprove}>
                            Approve
                        </Button>
                    )}
                </TableCell>
                <TableCell>
                    { request.complete ? null : ( 
                        <Button color="teal" basic onClick={this.onFinalize}>
                            Finalize
                        </Button>
                    )}
                </TableCell>
            </TableRow>
        );
    }
};

export default RequestRow;
