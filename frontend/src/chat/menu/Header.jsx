import React, { useContext, useEffect, useState, useRef } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import { MdHistoryToggleOff } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import InfoDrawer from '../../components/drawer/InfoDrawer';

const Header = () => {
    const { account } = useContext(AccountContext);
    const [picture, setPicture] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerData, setDrawerData] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const fetchPicture = async () => {
            const pic = await account.picture;
            setPicture(pic);
            console.log(`Picture URL is ${pic}`);
        };
        fetchPicture();
    }, [account.picture]);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleImageClick = () => {
        setDrawerData({ picture });
        setDrawerOpen(true);
    };

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to log out?");
        if (confirmed) {
            window.location.reload();
        }
    };

    return (
        <div className='h-[7vh] w-full bg-zinc-200'>
            <div className="components flex justify-between ml-2 h-full items-center px-4 sm:px-6 md:px-8">
                <div className="image h-full" onClick={handleImageClick}>
                    {picture ? (
                        <img src={picture} alt="Profile" className="h-12 w-12 rounded-full cursor-pointer" />
                    ) : (
                        <span>Loading...</span>
                    )}
                </div>
                <div className="right flex gap-3 sm:gap-5 items-center relative">
                    <div className="c1">
                        <MdHistoryToggleOff className='text-2xl sm:text-3xl' />
                    </div>
                    <div className="c2">
                        <MdOutlineMessage className='text-2xl sm:text-3xl' />
                    </div>

                    <div className="c3 relative" onClick={toggleMenu}>
                        <IoMdMore className='text-2xl sm:text-3xl cursor-pointer' />
                        {menuOpen && (
                            <div
                                ref={menuRef}
                                className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50"
                            >
                                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">New Group</div>
                                <div onClick={handleImageClick} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</div>
                                <div
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {drawerOpen && <InfoDrawer data={drawerData} onClose={() => setDrawerOpen(false)} />}
        </div>
    );
};

export default Header;
