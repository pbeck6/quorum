import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';

class Campaign extends Component {
    render() {
        return (
            <Layout>
                <h3>Show Campaign {`${this.props.router.query.address}`}</h3>
            </Layout>
        )
    }
}

export default withRouter(Campaign);
