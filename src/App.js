import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react";
import Message from "./Components/Message";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from "./Firebase";
import { useState } from "react";


const auth = getAuth(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
}


function App() {
  const [user, setUser] = useState(false);

  return (
    <Box bgColor={"red.100"}>

      <Container bg={"white"} h={"100vh"}>
        <VStack h={"full"} p={'4'}>
          <Button colorScheme={'whatsapp'} w={"full"}>Sign Out</Button>
          <VStack h="full" w={'full'} overflowY='auto'>

            <Message text={"sample message"} />
            <Message text={"sample message"} user={"me"} />






          </VStack>

          <form style={{

            width: "100%"
          }}>
            <HStack>
              <Input placeholder="Enter a message..." />
              <Button colorScheme={'whatsapp'} type="submit">Send</Button>
            </HStack>

          </form>


        </VStack>





      </Container>



    </Box>
  );
}

export default App;
