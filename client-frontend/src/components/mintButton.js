import React, { useState, useContext} from 'react';
import { CONTRACT_ADDRESS, NFTAbi} from "../utils/constants";
import Web3 from 'web3';
import {  Button,

} from '@chakra-ui/react';
import { UserWallet } from '../utils/userWallet';

const web3 = new Web3(window.ethereum);
const web3Contract = new web3.eth.Contract(NFTAbi.abi, CONTRACT_ADDRESS);

const MintFighter = ({ setFighters }) => {
    const acct = useContext(UserWallet);
    const [isMinting, setMinting] = useState(false);



    const getRandomNFT = async ()=> {
        const max = await await web3Contract.methods.totalSupply().call();
        console.log('max tokens', parseInt(max))
        const randomNum = Math.floor(Math.random() * parseInt(max));
   
        web3Contract.methods.createRandomFighter(randomNum).send({from: acct, value: web3.utils.toWei('0.05', 'ether')}, function(error, transactionHash){
            console.log('transactionhash', transactionHash);
            setMinting(true);
        })
        .then(async (res)=>{
            let newFighter = await res;
            alert('Fighter Minted!')
            setMinting(false)
            setFighters(newFighter);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

return (
    
    <Button
    mb="8"
    size="md"
    height="48px"
    width="200px"
    border="2px"
    isLoading={isMinting}
    loadingText="Minting Fighter..."
    borderColor="red.500"
    onClick={getRandomNFT}>
       Mint your Fighter!
    </Button>
)

};


export default MintFighter;