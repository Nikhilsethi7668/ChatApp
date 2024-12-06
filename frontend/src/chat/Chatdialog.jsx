import React, { useContext } from 'react';
import Menu from './menu/Menu';
import EmptyChat from './chat/EmptyChat';
import Chatbox from './chat/Chatbox';
import { AccountContext } from '../context/AccountProvider';

const Chatdialog = () => {
    const { person } = useContext(AccountContext);
    return (
        <div className="flex flex-col lg:flex-row w-full h-full">
            {/* Menu Section */}
            <div className="menu w-full lg:w-[35vw]">
                <Menu />
            </div>

            {/* Chat Section */}
            <div className="chat w-full lg:w-[70vw] bg-zinc-300 border-l-2 border-black">
                {Object.keys(person).length > 0 ? <Chatbox /> : <EmptyChat />}
            </div>
        </div>
    );
};

export default Chatdialog;
