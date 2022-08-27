import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db, messageData } from '../plugins/firebase';

const Chat = () => {
    const location = useLocation();
    const state = location.state

    const [message, setMessage] = useState('')
    const [userName, setUserName] = useState(state)

    useEffect(() => {
        const q = query(collection(db, "Messages"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push(doc.data().userName);
                console.log(doc.data())
            });
            console.log("Current cities in CA: ", cities.join(", "));
        });

    }, [])

    const createMessage = async () => {
        console.log('ready')
        const res = await messageData(message, userName)
        setUserName(state.displayName)
        console.log(userName)
        console.log('complete', res)
    }

    return (
        <>
            <h2>{userName}</h2><p>{message}</p>
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