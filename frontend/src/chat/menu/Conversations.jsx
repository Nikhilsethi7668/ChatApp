import React, { useContext, useEffect, useState } from 'react';
import { getusers } from '../../service/Api';
import Conversation from './Conversation';
import { AccountContext } from '../../context/AccountProvider';

const Conversations = ({ text }) => {
    const [users, setUsers] = useState([]);
    const { account, socket, setactiveUsers } = useContext(AccountContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getusers();
                if (Array.isArray(response)) {
                    const filteredData = response.filter((user) =>
                        user.name.toLowerCase().includes(text.toLowerCase())
                    );
                    setUsers(filteredData);
                } else {
                    console.error("Unexpected response format:", response);
                }
            } catch (error) {
                console.error("Error fetching users:", error.message);
            }
        };
        fetchData();
    }, [text]);
    useEffect(() => {
        socket.current.emit("addUsers", account);
        socket.current.on("getUsers", users => {
            setactiveUsers(users)

        }, [account])
    })

    return (
        <div className="overflow-y-auto max-h-screen px-4 sm:px-6 md:px-8">
            {user.length>0?users.map((user, index) => (
                user.sub !== account.sub && (
                    <div key={user.sub} className="mb-4">
                        <Conversation user={user} />
                    </div>
                )
            )): <h1>Loading...</h1>}
        </div>
    );
};

export default Conversations;
