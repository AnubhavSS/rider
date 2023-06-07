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
    <div style={{ position: 'sticky', bottom: 0, left: 0, width: '97%',margin: '0 auto'  }}>
      <FormControl p={3} >
        
          <InputGroup bg={'white'} >
          <Input placeholder="Type a message...." autoComplete="off" value={input ?? ''}  onChange={(e) => setinput(e.target.value)} />

          {/* Attachment */}
          <InputRightElement>
          <Flex direction="row" mr={6}>
          <Popover placement="top-start">
            <PopoverTrigger>
             
               <Box  as='button' mx={1.5} >  <GrAttachment /></Box>
            </PopoverTrigger>
            <PopoverContent w="fit-content" bg="customGreen" border="0">
              <PopoverBody color="white" minWidth="100px" borderRadius="lg" p={2} m={1}>
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
