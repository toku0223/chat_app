import React, { useState } from 'react';
import { messageData } from '../plugins/firebase';

const Chat = () => {
    const [message, setMessage] = useState('')
    const [userName, setUserName] = useState('')

    const createMessage = async () => {
        console.log('ready')
        const res = await messageData(message, userName)
        console.log('complete', res)

        setUserName()
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