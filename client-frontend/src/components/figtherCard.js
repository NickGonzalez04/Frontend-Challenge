import React from 'react';
import { Wrap, Box,Text, Badge, WrapItem } from "@chakra-ui/react"
import { CONTRACT_ADDRESS, NFTAbi} from "../utils/constants";
import Web3 from 'web3';
import { getOwnedTokensIds } from '../utils/contractFunctions';

const web3 = new Web3(Web3.givenProvider);
const web3Contract = new web3.eth.Contract(NFTAbi.abi, CONTRACT_ADDRESS);

const FighterCards = ({nftFighter})=>{

    const checkSale = async(num)=> {
        let isOnsale = await web3Contract.methods.getIsNFTOnSale().call();
        return isOnsale;
    }
   

    return(
        <Wrap spacing="30px" justify="center">
        {nftFighter.map((x,i)=>(
            <WrapItem key={i} >  
            <Box  maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" justifyContent="center">
                <Text mt="2" textAlign="center" fontWeight="extrabold">Fighter# :{i}</Text>
                {/* <Text ml="8" textAlign="left" fontWeight="normal" fontSize={12}>Dna: {x.dna}</Text> */}
            <Box mr="2" mb="2" display="flex" justifyContent="center" alignItems="center" >
                <Text ml="2" textAlign="left" fontWeight="bold">
                Power:
                {x.power > 70 ? 
                <Badge ml="2" colorScheme='green'>{x.power}</Badge> 
                    : (x.power > 40 ? <Badge ml="2" colorScheme='orange'>{x.power}</Badge> 
                         : <Badge ml="2" colorScheme='red'>{x.power}</Badge>)
                }
                </Text>
                <Text ml="2" textAlign="left" fontWeight="bold">Speed:
                {x.speed > 70 ? 
                <Badge ml="2" colorScheme='green'>{x.speed}</Badge> 
                    : (x.speed > 40 ? <Badge ml="2" colorScheme='orange'>{x.speed}</Badge> 
                         : <Badge ml="2" colorScheme='red'>{x.speed}</Badge>)
                }
                </Text>
                {x.price > 0 ?
                <Text ml="2" textAlign="left" fontWeight="bold">Price:
                    <Badge ml="2" colorScheme='green'>ETH {web3.utils.fromWei(x.price, 'ether')}</Badge>
                </Text>  : <Badge ml="4" colorScheme='red'>Unlisted</Badge>}
                <Text>
                  
                </Text>
                </Box>
            </Box>
            </WrapItem>   
        ))}
        </Wrap>
    )
};

export default FighterCards;
