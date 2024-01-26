import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import getCampaign from '../../ethereum/campaign';

class Campaign extends Component {
    static async getInitialProps(context) {
        const campaign = getCampaign(context.query.address);
        const campaignSummary = await campaign.methods.getSummary().call();

        return { campaignSummary };
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
