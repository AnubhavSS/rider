import React, { useState,FC } from 'react';
import {  Flex, FormControl, Input, Popover, PopoverTrigger, PopoverContent, PopoverBody ,Box,InputGroup,InputRightElement} from '@chakra-ui/react';

import { AiOutlineSend } from 'react-icons/ai';
import { GrAttachment } from 'react-icons/gr';
import { BsCamera, BsCameraVideo } from 'react-icons/bs';
import { HiDocument } from 'react-icons/hi';

interface ChatMessage {
  message: string;
  id: number;
}

interface BottombarProps {
  sentMessage: (message: ChatMessage) => void;
}

const Bottombar: FC<BottombarProps> = ({ sentMessage }) => {
  const [input, setinput] = useState<string|null>('');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sentMessage({ message: '@12' + input, id: Math.floor(Math.random() * 1000000) });
    setinput('');
  };

  return (
   <>
    <div style={{ position: 'sticky', bottom: 0, left: 0, width: '92%',margin: '0 auto'  }}>
      <FormControl p={3} >
        
          <InputGroup bg={'white'} >
          <Input placeholder="Type a message...." autoComplete="off" value={input ?? ''} size='lg'   onChange={(e) => setinput(e.target.value)} />

          {/* Attachment */}
          <InputRightElement mt={1} >
          <Flex direction="row" mr={6}>
          <Popover placement="top-start">
            <PopoverTrigger>
             
               <Box  as='button' mx={1.5} boxSize={'4'} >  <GrAttachment /></Box>
            </PopoverTrigger>
            <PopoverContent w="fit-content" bg="customGreen" border="0" borderRadius="full">
              <PopoverBody color="white" minWidth="100px"  p={2} m={1}>
                <Flex alignItems="center" justifyContent='space-between'  >
                  <BsCamera />
                  <BsCameraVideo />
                  <HiDocument />
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Box  as='button' mx={1.5} onClick={sendMessage}> <AiOutlineSend /></Box>
          </Flex>
          </InputRightElement>
          </InputGroup>
       
      </FormControl>
    </div>
    </>
  );
};



export default Bottombar
