import React, {useState, useEffect} from 'react';
import { CONTRACT_ADDRESS, NFTAbi} from '../utils/constants';
import FighterCards from '../components/figtherCard'
import Web3 from 'web3';

import { Box, Text } from "@chakra-ui/react"


const web3 = new Web3(window.ethereum);
const web3Contract = new web3.eth.Contract(NFTAbi.abi, CONTRACT_ADDRESS);

const MarketPlace = () => {
    const [ mktPlace, setmktPlace ] = useState([]);



  const marketPlc = async () =>{
        let nftTotal = await web3Contract.methods.totalSupply().call();
        console.log(web3Contract.methods.balanceOf(CONTRACT_ADDRESS))
        console.log(Number(nftTotal))
        const supply = await Promise.all(new Array(parseInt(nftTotal)).fill(null).map((x, i)=>
        web3Contract.methods.tokens(i).call()
        .then((res)=>{
            console.log(res)
            return res;
        }).catch((err)=>{
            console.log(err);
        })))
        setmktPlace(supply);
        return supply;
    }

 


    useEffect(()=>{
      marketPlc();
    },[]);



    return(
        <div>
            <Text fontSize="24" fontWeight="bold">Market Place</Text>
            <br></br>
            <Box  display="flex" alignItems="center">
                <FighterCards nftFighter={mktPlace} /> 
            </Box>
        </div>)
};


export default MarketPlace;