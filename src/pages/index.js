import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
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
                <div>
                    <h3>Current Campaigns</h3>
                    { this.renderCampaigns() }
                    <Button 
                        content="Create Campaign"
                        icon="add"
                        primary
                    />
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;
