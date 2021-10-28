import React from 'react';
import { CONTRACT_ADDRESS, NFTAbi} from "../utils/constants";
import Web3 from 'web3';
import {  Button,

} from '@chakra-ui/react';

const web3 = new Web3(window.ethereum);
const web3Contract = new web3.eth.Contract(NFTAbi.abi, CONTRACT_ADDRESS);

const MintFighter = ({currentAccount}) => {
console.log(currentAccount)


const getCountNFTs = async () =>{
    let total = await web3Contract.methods.totalSupply().call()
        .then((res)=>{
          return res;
      })
        .catch((err)=>{
          console.log(err)
        })
  return total;
};
    const getRandomNFT = async ()=> {
        const max = await getCountNFTs()
        const randomNum = Math.floor(Math.random() * parseInt(max)) +1;
        let wei = web3.utils.toWei("1", "ether");
        web3Contract.methods.createRandomFighter(randomNum).send({from: currentAccount, value: wei})
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

return (
    
    <Button
    size="md"
    height="48px"
    width="200px"
    border="2px"
    borderColor="red.500"
    onClick={getRandomNFT}>
        Build your team!
    </Button>
)

};


export default MintFighter;