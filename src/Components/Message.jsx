import React from 'react'
import { HStack, Text, Avatar } from '@chakra-ui/react'
const Message = ({ text, uri, user = 'other' }) => {
    return (
        <HStack alignSelf={user === 'me' ? 'flex-end' : 'flex-start'} borderRadius={'base'} bg="gray.100" py={'2'} px={user === 'me' ? '4' : '2'}>

            {
                user === 'other' && <Avatar src={uri}></Avatar>
            }
            <Text color={'black'}>{text}</Text>

            {
                user === 'me' && <Avatar src={uri}></Avatar>
            }

        </HStack>
    )
}

export default Message;
