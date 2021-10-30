import React, { useState, useContext} from 'react';
import {
    Button,
 
  } from '@chakra-ui/react';
import Web3 from 'web3'
import { CONTRACT_ADDRESS, NFTAbi} from '../utils/constants';
import MintFighter from '../components/mintButton'
import FigtherCard from '../components/figtherCard';
import { getOwnedTokensIds} from '../utils/contractFunctions';
import OwnedFighterCards from '../components/ownedNftCards';
import { FighterIds, UserWallet } from '../utils/userWallet';


const Homepage = ({walletConnect, ids}) => {
    const acct = useContext(UserWallet)
    const fighters = useContext(FighterIds);


  const accountNotConnected = () => (  
      <Button
        size="md"
        height="48px"
        width="200px"
        border="2px"
        borderColor="red.500"
        onClick={()=> walletConnect()}>
      Connect Wallet
    </Button>
  )

    return(
        <div>
        {acct === "" ? (
              accountNotConnected()
            ) : (
        <MintFighter />  
         )}
          <div> 
           <OwnedFighterCards fighters={fighters} ids={ids}/>
          </div>
         </div>
    )
};

export default Homepage;