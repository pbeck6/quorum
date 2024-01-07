import React, { Component } from 'react';
import instance from '../ethereum/factory';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await instance.methods.getDeployedCampaigns().call();

        return { campaigns };
    }

    render() {
        return <div>{ this.props.campaigns[0] }</div>
    }
}

export default CampaignIndex;
