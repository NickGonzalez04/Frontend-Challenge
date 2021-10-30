import React, { useState, useEffect } from 'react';
import {FighterIds, UserWallet} from './utils/userWallet';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  ChakraProvider,
  Box,
  VStack,
  Menu,
  Grid,
  theme,
  Button,
  ButtonGroup
} from '@chakra-ui/react';
import { Logo } from './Logo';
import Homepage from './pages/nftCollections';
import MarketPlace from './pages/marketPlace';
import Navbar from './components/nav'
import Web3 from 'web3'
import { CONTRACT_ADDRESS, NFTAbi} from './utils/constants';
import MintFighter from './components/mintButton'
import FigtherCard from './components/figtherCard';
import { getOwnedTokensIds, getTokensIds} from './utils/contractFunctions';
import OwnedFighterCards from './components/ownedNftCards';
const { ethereum } = window;

const web3 = new Web3(ethereum);
const web3Contract = new web3.eth.Contract(NFTAbi.abi, CONTRACT_ADDRESS);

function App() {
  const [ currentAccount, setCurrentAcct ] = useState("");
  const [ fighters, setFighters ] = useState([]);
  const [ Ids, setIds] = useState([])
 // Check if metamask wallet is connected
 const checkIfWalletIsConnected = async () => {
  if(ethereum.networkVersion != "4"){
    alert("Need to be on the Rinkeby Test net!");
    return;
  }
  if(!ethereum) {
    alert("Make sure you're signed into METAMASK");
  }

  const account = await ethereum.request({method: "eth_accounts"});
  if(account.length !== 0) {
    const acct = account[0];
    setCurrentAcct(acct);
    // getCountNFTs();
    let owner = await getOwnedTokensIds(acct).then((res)=>{
      console.log(res)
      return res;
    });
    let ids = await getTokensIds(acct).then((res)=>{
      console.log(res)
      return res;
    });
    setFighters(owner);
    setIds(ids)
  } else {
    alert("Not an authorized Account. Sign in to MetaMask");
  }
}

// Connect to metamask wallet
const walletConnect = async () => {
try {
  if(ethereum.networkVersion != "4"){
    alert("Need to be on the Rinkeby Test net!");
    return;
  }
  if (!ethereum) {
    alert("Need to get MetaMask!");
    return;
  }
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  // set wallet address to state once connected established
  // Get owned tokens from wallet id
  setCurrentAcct(accounts[0]);
  let owner = await getOwnedTokensIds(accounts[0]).then((res)=>{
    // console.log(res)
    return res;
  });
  let ids = await getTokensIds(accounts[0]).then((res)=>{
    console.log(res)
    return res;
  });
  setFighters(owner);
  setIds(ids);
} catch (error) {
  console.log(error);
}

};


useEffect(()=>{
checkIfWalletIsConnected();

},[])


  return (<Router>
    <UserWallet.Provider value={currentAccount}>
      <FighterIds.Provider value={fighters}>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
        <Navbar />
          <VStack spacing={8}>
            <Logo h="24vmin" pointerEvents="none" />
              <Switch>
                <Route exact path="/">
                  <Homepage walletConnect={walletConnect} ids={Ids}/>
                </Route>
                <Route exact path="/Marketplace">
                <MarketPlace />
                </Route>
              </Switch>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
      </FighterIds.Provider>
    </UserWallet.Provider>
    </Router>
  );
}

export default App;
