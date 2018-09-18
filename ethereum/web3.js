import Web3 from 'web3';
let web3;

const provider = new Web3.providers.HttpProvider(
    `http://13.125.247.228:8545`
);
web3 = new Web3(provider);

export default web3;