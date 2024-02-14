# Quorum


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-quorum">About The Project</a></li>
    <li><a href="#local-development">Local Development</a></li>
    <li><a href="#built-with">Built With</a></li>
  </ol>
</details>

## About Quorum

Quorum is a decentralized app for launching and managing crowd-fund campaigns. Using smart contracts, Quorum puts more control into the hands of contributors on how their campaign funds are spent, compared to a traditional centralized approach.

## Local Development

After cloning the repository to your local environment, install dependencies using `npm install`. Once installation is complete, compile the campaign contract by navigating to the `src/ethereum/scripts` directory and running `node compile.js`. Inside the `deploy.js` file, create your own provider instance before deploying your contract to the blockchain. 

Make note of your deployed contract address, which will be passed to the UI via the `factory.js` file in the `src/ethereum` directory. For out-of-the-box campaign views via UI, pass in your network endpoint to the `web3.js` file in the `src/ethereum` directory. To interact with the campaign (eg. make contributions), users can use a browser extension such as MetaMask to inject their own wallet.

You can then run `npm run dev` to see a local instance of your DApp at `localhost:3000`.

### Built With

  * [Quorum](https://ethereum.org/) - The cryptocurrency powering Quorum
  * [Solidity](https://soliditylang.org/) - OOP language for building smart contracts
  * [Next.js](https://nextjs.org/) - Front-end framework
