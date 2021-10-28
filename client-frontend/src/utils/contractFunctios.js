import { CONTRACT_ADDRESS, NFTAbi} from './utils/constants';
import Web3 from "web3";


const web3 = new Web3(window.ethereum);
const web3Contract = new web3.eth.Contract(NFTAbi.abi, CONTRACT_ADDRESS);


export const getFighterNFTs =()=>{
    web3Contract.methods.tokens().call()
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err);
    })
};

const getMarketPlaceNFTs = () => {
    web3Contract.methods.

};

const getCountNFTs = async() =>{
    const {ethereum} = window;
    if(ethereum) {
        let nftAmount = await web3Contract.methods.getNumberOfNFTs().call()
          .then((res)=>{
            console.log(res)
          })
          .catch((err)=>{
            console.log(err)
          })
        console.log(nftAmount)
    }
};
