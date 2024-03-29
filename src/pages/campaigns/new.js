import React, { Component } from 'react';
import { FormField, Button, Form, Input, Message } from 'semantic-ui-react'
import { withRouter } from 'next/router';
import Layout from '../../components/Layout'; 
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    submitNewCampaign = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();

            await factory.methods
            .createCampaign(this.state.minimumContribution)
            .send({
                from: accounts[0]
            });
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ loading: false });

        this.props.router.push('/');
    }

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={ this.submitNewCampaign } error={ !!this.state.errorMessage }>
                    <FormField>
                        <label>Minimum contribution</label>
                        <Input 
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event => 
                                this.setState({ minimumContribution: event.target.value })}
                        />
                    </FormField>
                    <Message error header="Error" content={this.state.errorMessage} />
                    <Button loading={ this.state.loading } primary>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default withRouter(CampaignNew);
