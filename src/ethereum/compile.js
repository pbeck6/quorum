const path = require ('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts/CampaignFactory.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

function findImports(relativePath) {
    const absolutePath = path.resolve(__dirname, 'contracts', relativePath);
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
