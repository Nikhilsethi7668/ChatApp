import React from 'react';
import { MdOutlineSearch } from "react-icons/md";

const Search = ({ settext }) => {
    return (
        <div className='h-[5vh] relative flex items-center justify-center px-4 sm:px-6 md:px-8'>
            <div className="icon absolute left-4 sm:left-6 md:left-8">
                <MdOutlineSearch className='text-3xl' />
            </div>
            <div className="content h-[100%] w-full max-w-lg">
                <input
                    className='w-full h-[85%] bg-zinc-200 pr-10 border-black border rounded-lg sm:w-[30vw] md:w-[25vw]'
                    placeholder='Search or start new chat'
                    type="text"
                    onChange={(e) => { settext(e.target.value) }}
                />
            </div>
        </div>
    );
};

export default Search;
