import React, { useContext } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import { setConversation } from '../../service/Api';

const Conversation = ({ user, isOnline }) => {
    const { setperson, account } = useContext(AccountContext);

    const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    const getUserInfo = async () => {
        setperson(user);
        await setConversation({ senderId: account.sub, receiverId: user.sub });
    };

    return (
        <div
            onClick={() => getUserInfo()}
            className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:bg-blue-50 transition-all duration-300 ease-in-out sm:flex-row sm:gap-4 sm:px-4 sm:py-3 md:flex-row md:gap-6 md:px-6 md:py-4"
        >
            {/* Profile Image */}
            <div className="flex-shrink-0">
                <img
                    className="rounded-full h-12 w-12 object-cover"
                    src={user.picture}
                    alt={`${user.name}'s profile`}
                />
            </div>

            {/* User Info */}
            <div className="flex-1">
                <div className="name text-lg font-semibold text-gray-800 sm:text-base md:text-lg">{user.name}</div>
                {/* Dynamic Status */}
                <div
                    className={`status text-sm ${isOnline ? 'text-green-500' : 'text-gray-500'
                        } sm:text-xs md:text-sm`}
                >

                </div>
            </div>

            {/* Current Time */}
            <div className="time text-sm text-gray-400 sm:text-xs md:text-sm">{currentTime}</div>
        </div>
    );
};

export default Conversation;
