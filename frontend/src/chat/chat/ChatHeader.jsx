import React, { useContext, useState } from 'react';
import { FaSearch, FaEllipsisV } from 'react-icons/fa';
import { AccountContext } from '../../context/AccountProvider';

function ChatHeader({ person }) {
    const { activeUsers } = useContext(AccountContext);
    return (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-100 min-h-[56px]">
            <div className="flex items-center">
                <img
                    src={person.picture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                    <div className="text-sm font-semibold">{person.name}</div>
                    <div className="text-xs text-gray-500">

                        {activeUsers?.find(user => user.sub == person.sub) ? 'Online' : 'Offline'}
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
                <FaSearch className="text-gray-600 cursor-pointer hover:text-gray-800" />
                <FaEllipsisV className="text-gray-600 cursor-pointer hover:text-gray-800" />
            </div>
        </div>
    );
}

export default ChatHeader;
