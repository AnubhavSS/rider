import React, { useState,FC } from 'react';
import { Button, Flex, FormControl, Input, Popover, PopoverTrigger, PopoverContent, PopoverBody } from '@chakra-ui/react';

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
    <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
      <FormControl p={3} bg="white">
        <Flex direction="row">
          <Input placeholder="Type a message...." autoComplete="off" value={input ?? ''}  onChange={(e) => setinput(e.target.value)} />

          {/* Attachment */}
          <Popover placement="top-start">
            <PopoverTrigger>
              <Button type="submit" mx={1.5}>
                <GrAttachment />
              </Button>
            </PopoverTrigger>
            <PopoverContent w="fit-content" bg="customGreen" border="0">
              <PopoverBody color="white" minWidth="100px" borderRadius="lg" p={2} m={1}>
                <Flex alignItems="center" justifyContent="space-between">
                  <BsCamera />
                  <BsCameraVideo />
                  <HiDocument />
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Button type="submit" mx={'1.5'} onClick={sendMessage}>
            <AiOutlineSend />
          </Button>
        </Flex>
      </FormControl>
    </div>
    </>
  );
};



export default Bottombar