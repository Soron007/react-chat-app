import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react";
import Message from "./Components/Message";
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { app } from "./Firebase";
import { useEffect, useRef, useState } from "react";
import {
  getFirestore,
  addDoc, collection, serverTimestamp,
  onSnapshot, query, orderBy
} from 'firebase/firestore'


const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
}

const logoutHandler = () => {
  signOut(auth)
}




function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const divForScroll = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp()

      });


      divForScroll.current.scrollIntoView({ behavior: "smooth" });

      // Scroll into view
    }
    catch (error) {
      alert(error);
    }

  }

  useEffect(() => {

    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"))

    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data)
    });

    const unsubscribeForMessage = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((item) => {
        const id = item.id;
        return { id, ...item.data() };
      }))
    });

    return () => {
      unsubscribe();
      unsubscribeForMessage();
    }
  }, []);

  return (
    <Box bgColor={"red.100"}>

      {
        user ? (<Container bg={"white"} h={"100vh"}>
          <VStack h={"full"} p={'4'}>
            <Button onClick={logoutHandler} colorScheme={'whatsapp'} w={"full"}>Sign Out</Button>


            <VStack h="full" w={'full'} overflowY='auto' css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}>

              {
                messages.map((msg) => {
                  return (
                    <Message key={msg.id} text={msg.text} uri={msg.uri} user={msg.uid === user.uid ? 'me' : 'other'} />
                  )
                })
              }


              <div ref={divForScroll}></div>
            </VStack>


            <form onSubmit={submitHandler} style={{

              width: "100%"
            }}>
              <HStack>
                <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter a message..." />
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
