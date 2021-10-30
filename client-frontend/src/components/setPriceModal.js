import React, { useState, useContext } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Lorem,
    useDisclosure, Input, Text,  Image, Stack
  } from "@chakra-ui/react"
import { FighterIds, UserWallet } from '../utils/userWallet';
import { putOnMarketPlace } from '../utils/contractFunctions';
import Web3 from 'web3'
const web3 = new Web3(window.ethereum);

const PriceModal =({nftId, i})=>{
    const acct = useContext(UserWallet);
    const fighter = useContext(FighterIds);
    const [isLoading, setIsLoading] = useState(false);
    const { onOpen, onClose, isOpen} = useDisclosure();
    const [ price, setPrice] = useState();
    
    const listFighter=()=>{
        let list = putOnMarketPlace(nftId, web3.utils.toWei(`${price}`, 'ether'), acct).then((res=>{ 
            setIsLoading(true);
            return res; 
        })).catch((error)=>{
            console.log(error)
        })
        setIsLoading(false);
        return list
    }
 
return(
    <>
    <Button m="4" size="sm" colorScheme='red' onClick={onOpen}>List On Sale</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>List your Fighter# {nftId} for sale</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Text mb="2" fontWeight="bold">Price</Text>
          <Stack alignItems="center" direction="row"><Image boxSize="36px" src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=014"/>
          <Text fontSize="14" fontWeight="normal" alignItems="center">ETH</Text>
          <Input placeholder="Enter Amount" value={price} onChange={(event)=> setPrice(event.target.value)}/></Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button 
            onClick={onClose}
            variant="ghost"
            onClick={listFighter}
            >Complete Listing</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
)}


export default PriceModal;