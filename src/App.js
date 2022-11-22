import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react";
import Message from "./Components/Message";
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { app } from "./Firebase";
import { useEffect, useState } from "react";


const auth = getAuth(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
}

const logoutHandler = () => {
  signOut(auth)
}


function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data)
    })

    return () => {
      unsubscribe();
    }
  })

  return (
    <Box bgColor={"red.100"}>

      {
        user ? (<Container bg={"white"} h={"100vh"}>
          <VStack h={"full"} p={'4'}>
            <Button onClick={logoutHandler} colorScheme={'whatsapp'} w={"full"}>Sign Out</Button>
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





        </Container>) :
          <VStack h={'100vh'} justifyContent={'center'}>
            <Button onClick={loginHandler} colorScheme={'whatsapp'}>
              Sign in with Google
            </Button>
          </VStack>

      }


    </Box>
  );
}

export default App;
