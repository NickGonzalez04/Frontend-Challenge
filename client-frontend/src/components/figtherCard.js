import React from 'react';
import { Wrap, Container, Box,Text, Badge, WrapItem } from "@chakra-ui/react"


const FighterCards = ({nftFighter})=>{


    return(
        <Wrap spacing="30px">
        {nftFighter.map((x,i)=>(
        
            <WrapItem>  
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Text mt="2" textAlign="center" fontWeight="extrabold">Fighter# :{i}</Text>
                <Text
          ml="8" textAlign="left" fontWeight="normal" fontSize={12} >Fighter Dna: {x.dna}</Text>
          <Box mb="2" display="flex">
                <Text ml="8" textAlign="left" fontWeight="bold">
                Power:
                {x.power > 70 ? 
                <Badge colorScheme='green'>{x.power}</Badge> 
                    : (x.power > 40 ? <Badge colorScheme='orange'>{x.power}</Badge> 
                         : <Badge colorScheme='red'>{x.power}</Badge>)
                }
                </Text>
                <Text ml="4" textAlign="left" fontWeight="bold">Speed:
                {x.speed > 70 ? 
                <Badge colorScheme='green'>{x.speed}</Badge> 
                    : (x.speed > 40 ? <Badge colorScheme='orange'>{x.speed}</Badge> 
                         : <Badge colorScheme='red'>{x.speed}</Badge>)
                }
                </Text>
                <Text ml="4" textAlign="left" fontWeight="bold">Price:
                    {x.price === 0 ?
                    <Badge colorScheme='red'>{x.price}</Badge> : ''}
                </Text>
                </Box>
            </Box>
  
            </WrapItem>
            
        ))}
        </Wrap>
    )
};

export default FighterCards;
