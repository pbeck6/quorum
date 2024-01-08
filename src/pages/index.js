import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import instance from '../ethereum/factory';

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
        return <div>{ this.renderCampaigns() }</div>
    }
}

export default CampaignIndex;
