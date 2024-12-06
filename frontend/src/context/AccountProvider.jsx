import React, { createContext, useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'
export const AccountContext = createContext(null);
const AccountProvider = ({ children }) => {
    const [account, setaccount] = useState();
    const [person, setperson] = useState({});
    const [activeUsers, setactiveUsers] = useState([])
    const socket = useRef();
    useEffect(() => {
        socket.current = io('https://echochat-xomy.onrender.com/')
    }, [])
    return (

        <AccountContext.Provider value={{
            account,
            setaccount,

            person,
            setperson,
            socket,
            activeUsers,
            setactiveUsers
        }}>
            {children}

        </AccountContext.Provider>
    )
}

export default AccountProvider
