import React, { useState } from 'react'
import Header from './Header'
import Search from './Search'
import Conversations from './Conversations'

const Menu = () => {
    const [text, setText] = useState("");

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Search Bar */}
            <div className="px-4 sm:px-6 md:px-8 py-4">
                <Search settext={setText} />
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-auto px-4 sm:px-6 md:px-8 py-4">
                <Conversations text={text} />
            </div>
        </div>
    )
}

export default Menu;
