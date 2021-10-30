import React from 'react';
import { Menu,Box, MenuButton, Button} from '@chakra-ui/react';
import {
    useHistory,
    Link
  } from "react-router-dom";
import {ColorModeSwitcher} from '../ColorModeSwitcher';

const Navbar =()=> {

    
    return(
            <Menu mt={24} >
                <Box m={4} display="flex" justifyContent="end" >
                <Button ml={4} as={Button} colorScheme="gray" width={200} ><Link to="/">My Fighter Collection</Link></Button>
                <Button ml={4} as={Button} colorScheme="red" value="/marketPlace" width={200}><Link to="/Marketplace">Fighter MarketPlace</Link></Button>
                <ColorModeSwitcher justifySelf="flex-end"/>
                </Box>
            </Menu>
    )
}

export default Navbar;