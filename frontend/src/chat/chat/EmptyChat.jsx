import React from 'react';

const EmptyChat = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100">
            <div className="text-center bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
                <p className="text-xl sm:text-2xl font-semibold text-gray-800">Your chat is empty.</p>
                <p className="mt-3 text-base sm:text-lg text-gray-600">
                    Start a new conversation by selecting a contact.
                </p>
            </div>
        </div>
    );
};

export default EmptyChat;
