import React, { Component } from 'react';
import { Form, FormField, Input, Button, Message } from 'semantic-ui-react';
import { withRouter } from 'next/router';
import getCampaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {
    state = {
        contribution: '',
        errorMessage: '',
        loading: false
    };

    submitNewContribution = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        const campaign = getCampaign(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.contribution, 'ether')
            })
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ loading: false, contribution: '' });

        this.props.router.push(`/campaigns/${this.props.address}`);
    }

    render() {
        return (
            <Form onSubmit={ this.submitNewContribution } error={ !!this.state.errorMessage }>
                <FormField>
                    <label>Contribution Amount</label>
                    <Input 
                        label='ether'
                        labelPosition='right'
                        value={ this.state.contribution }
                        onChange={(event) => this.setState({ contribution: event.target.value })}
                    />
                </FormField>
                <Message error header="Error" content={ this.state.errorMessage } />
                <Button loading={ this.state.loading } primary>
                    Contribute
                </Button>
            </Form>
        )
    }
};

export default withRouter(ContributeForm);