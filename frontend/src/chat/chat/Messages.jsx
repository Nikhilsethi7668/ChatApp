import React, { useRef, useEffect, useContext } from 'react';
import Message from './Message';
import { AccountContext } from '../../context/AccountProvider';

function Messages({ allMessages }) {
    const messagesEndRef = useRef(null);
    const { account } = useContext(AccountContext)

    // Scroll to the bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [allMessages]);

    return (
        <div className="flex-col h-[100%] bg-gray-100 text-black p-4 overflow-y-scroll">
            {allMessages && allMessages.length > 0 ? (
                allMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.senderId === account.sub ? 'justify-end' : 'justify-start'
                            } mb-4`}
                    >
                        <Message message={message} />
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-400">No messages yet. Start chatting!</p>
            )}
            <div ref={messagesEndRef}></div>
        </div>
    );
}

export default Messages;
