import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import instance from '../ethereum/factory';
import Layout from '../components/Layout';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await instance.methods.getDeployedCampaigns().call();

        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(campaignAddress => {
            return {
                header: campaignAddress,
                description: <a>View Campaign</a>,
                fluid: true,
            }
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Current Campaigns</h3>
                <Button 
                    content="Create Campaign"
                    floated="right"
                    icon="add"
                    primary
                />
                { this.renderCampaigns() }
            </Layout>
        );
    }
}

export default CampaignIndex;
