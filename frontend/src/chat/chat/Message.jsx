import React, { useContext } from 'react';
import { AccountContext } from '../../context/AccountProvider';

function Message({ message }) {
    const { person, account } = useContext(AccountContext);

    // Determine alignment based on the sender
    const isSender = account.sub === message.senderId;

    return (
        <div
            className={`flex ${isSender ? 'justify-end' : 'justify-start'
                } mb-4 `}
        >
            <div
                className={`flex flex-col ${isSender ? 'bg-blue-600' : 'bg-gray-800'
                    } text-white p-4 rounded-lg shadow-md max-w-[20vw] break-words`}
                style={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                }}
            >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs text-gray-400 mt-2 self-end">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </p>
            </div>
        </div>
    );
}

export default Message;
