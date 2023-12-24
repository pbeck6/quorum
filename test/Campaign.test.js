const assert = require('assert');
const { Web3 } = require('web3');
const ganache = require('ganache');

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../src/ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../src/ethereum/build/Campaign.json');

let accounts;
let factoryContract;
let campaign;
let campaignAddress;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    // Create new Contract instance and deploy
    factoryContract = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '10000000' });

    await factoryContract.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '10000000'
    });

    [campaignAddress] = await factoryContract.methods.getDeployedCampaigns().call();

    // Create new Contract instance from existing deployed contract
    campaign = new web3.eth.Contract(
        compiledCampaign.abi,
        campaignAddress
    );
});

describe('Campaign', () => {
    it('gets an existing campaign', () => {
        assert.ok(campaign.options.address);
    });

    it('marks caller of createCampaign as campaign manager', async () => {
        const manager = await campaign.methods.manager().call();

        assert.equal(accounts[0], manager);
    });

    it('accepts contributors and makes them approvers', async () => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: '101'
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        const isNotContributor = await campaign.methods.approvers(accounts[2]).call();

        assert.equal(true, isContributor);
        assert.equal(false, isNotContributor);
    });

    it('checks for a minimum contribution amount before adding to approvers', async () => {
        try {
            await campaign.methods.contribute().send({
                from: accounts[1],
                value: '99'
            });
            assert(false);
        } catch (error) {
            const isContributor = await campaign.methods.approvers(accounts[1]).call();

            assert.equal(false, isContributor);
        };
    });

    it('allows a manager to create a spend request', async () => {
        await campaign.methods
            .createRequest(
                description = 'New spending request for test',
                value = '102',
                recipient = accounts[1]
            ).send({
                from: accounts[0],
                gas: '10000000'
            });

        const newRequest = await campaign.methods.requests(0).call();

        assert.equal('New spending request for test', newRequest.description);
        assert.equal(accounts[1], newRequest.recipient);
    });

});
