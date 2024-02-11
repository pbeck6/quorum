import React, { Component } from 'react';
import { 
    Button,
    Table,
    TableHeaderCell,
    TableHeader,
    TableBody,
    TableRow,
} from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import getCampaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class Requests extends Component {
    static async getInitialProps(context) {
        const address = context.query.address;
        const campaign = getCampaign(address);

        const requestCount = parseInt(await campaign.methods.getRequestsCount().call());
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(requestCount).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        );

        return { 
            address,
            requests,
            approversCount
        };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />;
        });
    }

    render() {
        return (
            <Layout>
                <h3>Current Requests</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>Description</TableHeaderCell>
                            <TableHeaderCell>Amount</TableHeaderCell>
                            <TableHeaderCell>Recipient</TableHeaderCell>
                            <TableHeaderCell>Approval Count</TableHeaderCell>
                            <TableHeaderCell>Approve</TableHeaderCell>
                            <TableHeaderCell>Finalize</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { this.renderRows() }
                    </TableBody>
                </Table>
                <Link href={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button 
                            content="New Request"
                            primary
                        />
                    </a>
                </Link>                
            </Layout>
        )
    }
}

export default Requests;
