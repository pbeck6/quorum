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
});
