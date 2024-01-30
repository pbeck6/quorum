import React, { Component } from 'react';
import { Card, Grid, GridColumn, GridRow, Button } from 'semantic-ui-react';
import Link from 'next/link';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import getCampaign from '../../ethereum/campaign';

class Campaign extends Component {
    static async getInitialProps(context) {
        const campaign = getCampaign(context.query.address);
        const campaignSummary = await campaign.methods.getSummary().call();

        return {
            address: context.query.address, 
            minimumContribution: campaignSummary[0].toString(),
            balance: campaignSummary[1].toString(),
            requestCount: campaignSummary[2].toString(),
            approversCount: campaignSummary[3].toString(),
            manager: campaignSummary[4]
        };
    }

    renderCards() {
        const items = [
            {
                header: this.props.manager,
                meta: 'Address of Manager',
                description:
                    'The manager created this campaign and can create requests to withdraw money.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: this.props.minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description:
                    'You must contribute at least this much wei to become an approver.'
            },
            {
                header: this.props.requestCount,
                meta: 'Number of Requests',
                description:
                    'A spending request for the current campaign which must be approved by approvers.'
            },
            {
                header: this.props.approversCount,
                meta: 'Number of Approvers',
                description:
                    'Number of people who have already donated to this campaign.'
            },
            {
                header: web3.utils.fromWei(this.props.balance, 'ether'),
                meta: 'Current Campaign Balance (ether)',
                description:
                    'How much money this campaign has left to spend.'
            }
        ]

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h3>Show Campaign { this.props.address }</h3>
                <Grid>
                    <GridRow>
                        <GridColumn width={10}>
                            {this.renderCards()}
                        </GridColumn>
                        <GridColumn width={6}>
                            <ContributeForm address={ this.props.address }/>
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn>
                            <Link href={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button 
                                        content="View Requests"
                                        primary
                                    />
                                </a>
                            </Link>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </Layout>
        )
    }
}

export default Campaign;
