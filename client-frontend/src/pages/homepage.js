import React, {useState, useEffect} from 'react';
import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    Button,
    ButtonGroup
  } from '@chakra-ui/react';
import MintFighter from '../components/mintButton'

const { ethereum } = window;


const Homepage = () => {
    const [ currentAccount, setCurrentAcct ] = useState("");

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
      console.log("Connected", accounts[0]);
      setCurrentAcct(accounts[0]);

    } catch (error) {
      console.log(error);
    }
  };



  useEffect(()=>{
    checkIfWalletIsConnected();
 
  },[])

  const accountNotConnected = () => (
    <div>
      <Button
        size="md"
        height="48px"
        width="200px"
        border="2px"
        borderColor="red.500"
        onClick={walletConnect}>
      Connect Wallet
    </Button>
    </div>
  )

    return(
        <div>
        {currentAccount === "" ? (
              accountNotConnected()
            ) : (
            <MintFighter currentAccount={currentAccount}/>  
         )}
         </div>
    )
};

export default Homepage;