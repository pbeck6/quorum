import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import getCampaign from '../../ethereum/campaign';

class Campaign extends Component {
    static async getInitialProps(context) {
        const campaign = getCampaign(context.query.address);
        const campaignSummary = await campaign.methods.getSummary().call();

        return { 
            minimumContribution: campaignSummary[0],
            balance: campaignSummary[1],
            requestCount: campaignSummary[2],
            approversCount: campaignSummary[3],
            manager: campaignSummary[4]
         };
    }

    render() {
        return (
            <Layout>
                <h3>Show Campaign {`${this.props.router.query.address}`}</h3>
            </Layout>
        )
    }
}

export default withRouter(Campaign);
