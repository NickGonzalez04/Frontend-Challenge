import Web3 from 'web3';
import { CONTRACT_ADDRESS, NFTAbi} from '../utils/constants';

// Contract Instance
const web3 = new Web3(window.ethereum);
const web3Contract = new web3.eth.Contract(NFTAbi.abi, CONTRACT_ADDRESS);



// Get tokens for owner
// returns an array of Token ids
export const getOwnedTokensIds = async(acct) => {
        let wallet = await acct;
        let ids = [];
        let tok = [];
        let tokenOwenedBalacnced = await web3Contract.methods.balanceOf(wallet).call();
        for(let i=0; i < tokenOwenedBalacnced; i++){
            let ownedIds = await web3Contract.methods.tokenOfOwnerByIndex(wallet, i).call()
                 ids.push(ownedIds);
            let fighter = await web3Contract.methods.tokens(ids[i]).call()
            tok.push(fighter);
        }
        return tok;
    }

    export const getTokensIds = async(acct) => {
        let wallet = await acct;
        let ids = [];

        let tokenOwenedBalacnced = await web3Contract.methods.balanceOf(wallet).call();
        for(let i=0; i < tokenOwenedBalacnced; i++){
            let ownedIds = await web3Contract.methods.tokenOfOwnerByIndex(wallet, i).call()
                 ids.push(ownedIds);
    
        }
        return ids;
    }
    
    
// Check NFTs sale status 
// returns boolean
export const checkIfOnSale = async(id)=> {
    let isOnsale = await web3Contract.methods.getIsNFTOnSale(id).call();
    return isOnsale;
}

export const putOnMarketPlace = async(id, price, account)=>{
    let onSale = await web3Contract.methods.setNFTPrice(id, price).send({from: account});
    return onSale;
}
// Get total supply of tokens minted
export const getTotalCountOfNFTs = async () =>{
    let total = await web3Contract.methods.totalSupply().call()
        .then((res)=>{
          return res;
      })
        .catch((err)=>{
          console.log(err)
        })
  return total;
};
 
