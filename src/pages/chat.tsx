import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { messageData } from '../plugins/firebase';

const Chat = () => {
    const [message, setMessage] = useState('')
    const [userName, setUserName] = useState('')

    interface stateType {
        displayName: string,
        }
    
    const state = useLocation().state as stateType;


    const createMessage = async () => {
        console.log('ready')
        const res = await messageData(message, userName)
        setUserName(state.displayName)
        console.log('complete', res)

    }

    return (
        <>
            <input
                type="text"
                placeholder="メッセージを入力してください。"
                value={message}
                onChange={(e) => setMessage(e.target.value)} />
            <button onClick={createMessage}>送信</button>
        </>
    )
}

export default Chat;