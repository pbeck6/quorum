import web3 from './web3';
const compiledFactory = require('./build/CampaignFactory.json');

const instance = new web3.eth.Contract(
    compiledFactory.abi,
    '0xAddressToDeployedContract'
);

export default instance;
