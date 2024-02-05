import React, { Component } from 'react';
import { FormField, Button, Form, Input, Message } from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../../../../components/Layout';
import getCampaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';

class RequestNew extends Component {
    state = {
        description: '',
        value: '',
        recipient: '',
        loading: false,
        errorMessage: ''
    };

    static async getInitialProps(context) {
        return {
            address: context.query.address
        };
    }

    submitNewRequest = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        try {
            const campaign = getCampaign(this.props.address);
            const { description, value, recipient } = this.state;
            const accounts = await web3.eth.getAccounts();

            await campaign.methods
                .createRequest(
                    description, 
                    web3.utils.toWei(value, 'ether'), 
                    recipient
                )
                .send({
                    from: accounts[0]
            });
            
            this.setState({ 
                description: '', 
                value: '', 
                recipient: ''
            });
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
                <Link href={`/campaigns/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>   
                <h3>Create a Request</h3>
                <Form onSubmit={ this.submitNewRequest } error={ !!this.state.errorMessage }>
                    <FormField>
                        <label>Description</label>
                        <Input 
                            value={this.state.description}
                            onChange={event => 
                                this.setState({ description: event.target.value })}
                        />
                    </FormField>
                    <FormField>
                        <label>Value in ether</label>
                        <Input 
                            value={this.state.value}
                            onChange={event => 
                                this.setState({ value: event.target.value })}
                        />
                    </FormField>
                    <FormField>
                        <label>Recipient</label>
                        <Input 
                            value={this.state.recipient}
                            onChange={event => 
                                this.setState({ recipient: event.target.value })}
                        />
                    </FormField>
                    <Message error header="Error" content={this.state.errorMessage} />
                    <Button loading={ this.state.loading } primary>Create</Button>
                </Form>        
            </Layout>
        )
    }
}

export default RequestNew;
