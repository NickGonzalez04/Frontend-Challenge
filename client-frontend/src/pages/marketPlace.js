import React, {useState, useEffect} from 'react';
import { CONTRACT_ADDRESS, NFTAbi} from '../utils/constants';
import FighterCards from '../components/figtherCard'
import Web3 from 'web3';

import { Center, Link } from "@chakra-ui/react"


const web3 = new Web3(window.ethereum);
const web3Contract = new web3.eth.Contract(NFTAbi.abi, CONTRACT_ADDRESS);

const MarketPlace = () => {
    const [ mktPlace, setmktPlace ] = useState([]);


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

  const marketPlc = async () =>{
        const nftTotal = await getCountNFTs();
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

    const getNFTPrice=()=>{
        
    }
    useEffect(()=>{
      marketPlc();
    },[]);



    return(
        <div>

        <h1>Market Place</h1>
        <Center ml="24">
           <FighterCards nftFighter={mktPlace} /> 
        </Center>
        </div>)
};


export default MarketPlace;