const path = require ('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.join(__dirname, '..', 'build');
fs.removeSync(buildPath);

const campaignFactoryPath = path.join(__dirname, '..', 'contracts/CampaignFactory.sol');
const source = fs.readFileSync(campaignFactoryPath, 'utf-8');

function findImports(relativePath) {
    const absolutePath = path.join(__dirname, '..', 'contracts', relativePath);
    const importSource = fs.readFileSync(absolutePath, 'utf8');
    return { contents: importSource };
}

const input = {
    language: 'Solidity',
    sources: {
        'CampaignFactory.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

fs.ensureDirSync(buildPath);

for (let contract in output.contracts) {
    strippedContractName = contract.replace(".sol", "");
    fs.outputJSONSync(
        path.resolve(buildPath, strippedContractName + ".json"),
        output.contracts[contract][strippedContractName]
    );
}
