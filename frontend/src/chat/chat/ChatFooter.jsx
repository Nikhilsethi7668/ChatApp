import React, { useEffect } from 'react';
import { FaSmile, FaPaperclip } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { uploadFile } from '../../service/Api';

function ChatFooter({ sendMessage, setmessage, message, setfile, file, setimage }) {

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                let response = await uploadFile(data);
                console.log(response.data[0])
                setimage(response.data)
            }
        }
        getImage();
    }, [file])
    const onFileChange = (e) => {
        setfile(e.target.files[0]);
        setmessage(e.target.files[0].name);
    }
    return (
        <div className="flex items-center min-h-[56px] px-2 sm:px-4 py-3 bg-gray-100 border-t">
            <button className="text-gray-600 hover:text-gray-800">
                <FaSmile className="text-xl" />
            </button>
            <label htmlFor="clip">

                <div className="clip m-3">
                    <FaPaperclip className="text-xl" />
                </div>

                <input
                    type="file" className='hidden' id='clip'
                    onChange={(e) => onFileChange(e)}
                />
            </label>

            <input
                type="text"
                placeholder="Type a message"
                className="flex-grow px-3 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                onChange={(e) => setmessage(e.target.value)}
                onKeyUp={(e) => sendMessage(e.key)}
                value={message}
            />
            <button className="ml-3 text-gray-600 hover:text-gray-800">
                <IoSend className="text-xl" />
            </button>
        </div >
    );
}

export default ChatFooter;
