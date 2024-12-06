import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../context/AccountProvider';

const InfoDrawer = ({ data, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState(data ? data.username : 'Nikhil'); // 
    const [about, setAbout] = useState(data ? data.about : 'Eat !! Sleep!! Code !! Repeat !!'); 
   
    const { account } = useContext(AccountContext);

    // State to toggle edit mode for username and about
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [showUsernamePopup, setShowUsernamePopup] = useState(false); // State to control username popup visibility

    useEffect(() => {
        setIsOpen(true); // Trigger animation when the drawer is opened
    }, []);

    const closeDrawer = () => {
        setIsOpen(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleEditUsername = () => {
        // Show the popup when trying to edit the username
        setShowUsernamePopup(true);
    };

    const handleClosePopup = () => {
        setShowUsernamePopup(false);
    };

    const handleEditAbout = () => {
        setIsEditingAbout((prev) => !prev); // Toggle edit mode for about section
    };

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 ${isOpen ? 'block' : 'hidden'}`}
        >
            <div
                className={`fixed top-0 left-0 h-full bg-white w-full sm:w-[30%] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}
            >
                <div className="flex justify-between p-4">
                    <div className="text-lg font-bold">Profile Info</div>
                    <button onClick={closeDrawer} className="text-xl">X</button>
                </div>
                <div className="p-4">
                    {data ? (
                        <div>
                            {/* Profile Picture */}
                            <img src={data.picture} alt="Profile" className="w-32 h-32 rounded-full mx-auto sm:w-48 sm:h-48" />
                            <div className="text-center mt-4">Profile Picture</div>

                            {/* Username Section */}
                            <div className="mt-6">
                                <div className="flex items-center justify-between">
                                    {isEditingUsername ? (
                                        <input
                                            type="text"
                                            value={account.name}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full border-b-2 border-gray-300 focus:outline-none"
                                            placeholder="Enter Username"
                                        />
                                    ) : (
                                        <div className="text-lg">{account.name}</div>
                                    )}
                                    <button onClick={handleEditUsername} className="ml-2">
                                        <i className="text-xl text-gray-500 cursor-pointer">✏️</i>
                                    </button>
                                </div>
                                <div className="text-sm text-gray-500 mt-2">Username</div>
                            </div>

                            {/* About Section */}
                            <div className="mt-6">
                                <div className="flex items-center justify-between">
                                    {isEditingAbout ? (
                                        <textarea
                                            value={about}
                                            onChange={(e) => setAbout(e.target.value)}
                                            rows="3"
                                            className="w-full border-b-2 border-gray-300 focus:outline-none"
                                            placeholder="Tell us about yourself"
                                        />
                                    ) : (
                                        <div className="text-lg">{about}</div>
                                    )}
                                    <button onClick={handleEditAbout} className="ml-2">
                                        <i className="text-xl text-gray-500 cursor-pointer">✏️</i>
                                    </button>
                                </div>
                                <div className="text-sm text-gray-500 mt-2">About</div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            {/* Username Popup */}
            {showUsernamePopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-[300px] sm:w-[400px] text-center">
                        <h2 className="text-lg font-bold">Username can't be changed</h2>
                        <p className="text-gray-500 mt-2">Sorry, you cannot edit the username.</p>
                        <button
                            onClick={handleClosePopup}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoDrawer;
