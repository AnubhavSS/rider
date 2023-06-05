
import { useEffect,useState,useRef } from 'react'
import { Flex, Text, Avatar,Box } from '@chakra-ui/react'
import Topbar from './components/Topbar'
import Bottombar from './components/Bottombar'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'


interface Sender{
  image:string;
  is_kyc_verified:boolean;
  self:false;
  user_id:string;
}

interface Chats{
      id:string;
      message:string;
      sender:Sender;
      time:string;
}
interface ChatMessage {
  message: string;
  id: number;
}

interface Response{
  chats:Array<Chats>;
  from:string;
  message:string;
  name:string;
  status:string;
  to:string;
}

function App() {
  const [info, setinfo] = useState<Response|null>(null)
 const [page, setPage] = useState<number>(0);
const [index, setindex] = useState<number>(5)
const ref=useRef(null)



const fetchChats = async (page:number):Promise<Response> => {
  try {
    const response = await fetch(`https://qa.corider.in/assignment/chat?page=${page}`);//fetch chats from api
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    return data || {};
  } catch (error) {
    console.error(error);
    return {} as Response ;
  }
};

useEffect(() => {
  const initialFetch = async () => {
    const initialChats = await fetchChats(0);
    
   setinfo(initialChats)
  };

  initialFetch();


}, []);

const sentMessage = (val:ChatMessage) => {
 
  const newChats = [...(info?.chats || [])];
  const newChatItem: Chats = {
    id: val.id.toString(),
    message: val.message,
    sender: {
      image: '', // Provide a default value
      is_kyc_verified: false, // Provide a default value
      self: false, // Provide a default value
      user_id: '' // Provide a default value
    },
    time: new Date().toLocaleString() // Provide a default value
  };
  newChats.splice(index, 0, newChatItem);

  setinfo((prevInfo) => ({
    ...(prevInfo as Response), // Explicitly cast prevInfo to Response type
    chats: newChats,
  }));
};

  const loadMoreChats =  async () => {
   
    const nextPage = page + 1;
    const newChats = await fetchChats(nextPage);//fetching more chats
    setinfo((prevInfo) => {
      return {
        ...(prevInfo as Response), 
        chats: [...(prevInfo?.chats || []), ...newChats.chats],
      };
    });
    
    setPage(nextPage); 
    setindex(index+5)
  
  };


  // When ScrollBar hits bottom 
  useBottomScrollListener(loadMoreChats, {
    offset: 100,
    debounce: 1,
    triggerOnNoScroll: true
  });
  


  return (
    <>
      
    <Flex flex={1} h={'100vh'} direction={'column'}>

      {/* Topbar */}
        <Topbar name={info?.name} to={info?.to} from={info?.from} />
      
 
        {/* Main Body */}

       <Box>
        <Flex flex={1} direction={'column'} pt={4} mx={5}  position='relative'    >


        <Box textAlign="center" color='gray.300'>
      <Box borderBottom="1px solid " mx="auto" width="100%" my={4} />
      <Box as="span" bg="white" px={2} fontSize='smaller' position="relative" top="-30px">
        {info?.chats && info.chats[0].time}
      </Box>
    </Box>

        {/* Incoming */} 
        
        {info?.chats &&
  info.chats.slice(0,index).map((item) =>
    item.id.length!==6 ? (
      <Flex key={item.id}>
        <Avatar src={item.sender.image} marginEnd={1} size='sm' />
        <Flex bg='whiteAlpha.200' w='fit-content' minWidth='100px' borderRadius='lg' p={2} m={1}>
          <Text boxShadow='lg' p='6' rounded='md' fontSize='md' ref={ref}   >
            {item.message}
          </Text>
        </Flex>
      </Flex>
    ) : (
      <Flex key={item.id} bg='customBlue' alignSelf='flex-end' w='fit-content' minWidth='100px' borderRadius='lg' p={2} m={1}>
        <Text color={'white'} fontSize='md'>
          {item.message.substring(3)}
        </Text>
      </Flex>
    )
  )}
        </Flex>
        </Box>
        {/* Text input area */}
        <Bottombar sentMessage={sentMessage} />
       
        
      </Flex>
    </>
    
  )
}

export default App
