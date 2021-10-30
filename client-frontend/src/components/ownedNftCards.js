import React, {useContext, useEffect, useState} from   'react';
import { Wrap, Box,Text, Badge, WrapItem, Button, useDisclosure } from "@chakra-ui/react"
import { CONTRACT_ADDRESS, NFTAbi} from "../utils/constants";
import Web3 from 'web3';
import PriceModal from '../components/setPriceModal';
import { getOwnedTokensIds, getTokensIds, putOnMarketPlace } from '../utils/contractFunctions';
import { UserWallet } from '../utils/userWallet';

const web3 = new Web3(Web3.givenProvider);
const web3Contract = new web3.eth.Contract(NFTAbi.abi, CONTRACT_ADDRESS);

const OwnedFighterCards = ({fighters , ids})=>{
    const acct = useContext(UserWallet);


    return(
        <Wrap spacing="30px" justify="center">
            {fighters.map((x,i)=>(
            <WrapItem key={i} >  
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" justifyContent="center">
                <Text mt="2" textAlign="center" fontWeight="extrabold">Fighter# :{ids[i]}</Text>
                <Text ml="4" textAlign="left" fontWeight="semibold" fontSize={12}>Dna: {x.dna}</Text>
            <Box mb="2" display="flex" alignItems="center" >
                <Text ml="4" textAlign="left" fontWeight="bold">
                Power:
                {x.power > 70 ? 
                <Badge ml="2" colorScheme='green'>{x.power}</Badge> 
                    : (x.power > 40 ? <Badge ml="2"colorScheme='orange'>{x.power}</Badge> 
                         : <Badge ml="2" colorScheme='red'>{x.power}</Badge>)
                }
                </Text>
                <Text ml="4" textAlign="left" fontWeight="bold">Speed:
                {x.speed > 70 ? 
                <Badge ml="2" colorScheme='green'>{x.speed}</Badge> 
                    : (x.speed > 40 ? <Badge ml="2" colorScheme='orange'>{x.speed}</Badge> 
                         : <Badge ml="2" colorScheme='red'>{x.speed}</Badge>)
                }
                </Text>
                {x.price > 0 ?
                <Text ml="4" textAlign="left" fontWeight="bold">Price:
                    <Badge ml="2" colorScheme='red'>ETH {web3.utils.fromWei(x.price, 'ether')}</Badge>
                </Text> :
                  <PriceModal nftId={ids[i]} />}
                </Box>
            </Box>
            
            </WrapItem>   
        ))}

        </Wrap>
    )
};

export default OwnedFighterCards;