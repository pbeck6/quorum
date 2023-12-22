const assert = require('assert');
const { Web3 } = require('web3');
const ganache = require('ganache');

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../src/ethereum/build/CampaignFactory.json');

let accounts;
let factoryContract;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factoryContract = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '10000000' });
});

describe('CampaignFactory', () => {
    it('deploys a contract for CampaignFactory', () => {
        assert.ok(factoryContract.options.address);
    });

    it('gets a list of existing campaigns, if any', async () => {
        const campaigns = await factoryContract.methods.getDeployedCampaigns().call();
        assert.equal(campaigns.length, 0);
    });
});
