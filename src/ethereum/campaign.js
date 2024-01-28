import web3 from './web3';
const compiledCampaign = require('./build/Campaign.json');

function getCampaign(address) {
    return new web3.eth.Contract(
        compiledCampaign.abi,
        address
    )
}

export default getCampaign;
