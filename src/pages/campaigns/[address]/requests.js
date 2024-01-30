import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../../../components/Layout';

class Requests extends Component {
    static async getInitialProps(context) {
        return {
            address: context.query.address
        };
    }

    render() {
        return (
            <Layout>
                <h1>Request List Placeholder</h1>
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
