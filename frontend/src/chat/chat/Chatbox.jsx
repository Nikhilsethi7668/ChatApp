import React, { useContext, useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import ChatFooter from './ChatFooter';
import { AccountContext } from '../../context/AccountProvider';
import { getConversation, getMessages, newMessage } from '../../service/Api';

function Chatbox() {
    const { person, account, socket } = useContext(AccountContext);
    const [conversation, setConversation] = useState({});
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [file, setfile] = useState(null);
    const [image, setimage] = useState('');
    const [incomingMessage, setIncomingMessage] = useState(null);

    // Listen for incoming messages
    useEffect(() => {
        if (socket.current) {
            socket.current.on('getMessage', (data) => {
                setIncomingMessage({
                    ...data,
                    createdAt: Date.now(),
                });
            });
        }
    }, [socket]);

    // Fetch conversation and messages when `person` changes
    useEffect(() => {
        const fetchConversationAndMessages = async () => {
            try {
                const data = await getConversation({
                    senderId: account.sub,
                    receiverId: person.sub,
                });
                setConversation(data || {});
                if (data?._id) {
                    const messages = await getMessages(data._id);
                    setAllMessages(messages || []);
                }
            } catch (error) {
                console.error('Error fetching conversation or messages:', error);
            }
        };

        fetchConversationAndMessages();
    }, [account.sub, person.sub]);

    // Update messages list when a new message is received
    useEffect(() => {
        if (
            incomingMessage &&
            conversation?.members?.includes(incomingMessage.senderId)
        ) {
            setAllMessages((prevMessages) => [...prevMessages, incomingMessage]);
        }
    }, [incomingMessage, conversation]);

    // Handle sending a message
    const sendMessage = async (key) => {
        if (key === 'Enter' && message.trim()) {
            const newMessageData = file
                ? {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'file',
                    text: image,
                }
                : {
                    senderId: account.sub,
                    receiverId: person.sub,
                    conversationId: conversation._id,
                    type: 'text',
                    text: message,
                };

            try {
                // Emit message via socket
                socket.current.emit('sendMessages', newMessageData);

                // Save the message to the database
                await newMessage(newMessageData);

                // Update the local messages list
                setAllMessages((prevMessages) => [...prevMessages, newMessageData]);

                // Clear the input fields
                setMessage('');
                setfile(null);
                setimage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-gray-50 md:rounded-lg shadow-md">
            {/* Header */}
            <div className="md:h-[10%]">
                <ChatHeader person={person} />
            </div>

            {/* Messages Section */}
            <div className="flex-grow overflow-y-scroll">
                <Messages person={person} allMessages={allMessages} />
            </div>

            {/* Footer Section */}
            <div className="md:h-[15%]">
                <ChatFooter
                    sendMessage={sendMessage}
                    setmessage={setMessage}
                    message={message}
                    setfile={setfile}
                    file={file}
                    setimage={setimage}
                />
            </div>
        </div>
    );
}

export default Chatbox;
