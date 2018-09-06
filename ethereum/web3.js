import Web3 from 'web3';
let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
    console.log('MetaMask connected : ');
    web3.eth.getAccounts().then(console.log);
}
/*else {
    const provider = new Web3.providers.HttpProvider(
        `https://ropsten.infura.io/v3/${credentials.infura_key}`
    );
}*/

export default web3;