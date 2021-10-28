import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Web3 from "web3";
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
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Homepage from './pages/homepage';
import MarketPlace from './pages/marketPlace';
import Navbar from './components/nav'



function App() {
  

  return (<Router>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
        <Navbar />
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
    
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <Route exact path="/Marketplace">
                <MarketPlace />
                </Route>
              </Switch>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
    </Router>
  );
}

export default App;
