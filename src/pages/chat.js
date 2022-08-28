import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db, messageData } from '../plugins/firebase';

const Chat = () => {
    const location = useLocation();
    const state = location.state

    const [message, setMessage] = useState('')
    const [userName, setUserName] = useState(state)
    const [dm, setDm] = useState([])

    const messagesRef = collection(db, "Messages")

    useEffect(() => {
        const q = query(collection(db, "Messages"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());

            });
            console.log("Current cities in CA: ", messages.join(", "));
            setDm(messages)
        });

    }, [])
    console.log(dm)
    const q1 = query(messagesRef, orderBy("userName", "desc"))

    const createMessage = async () => {
        console.log('ready')
        const res = await messageData(message, userName)
        console.log(userName)
        console.log('complete', res)
    }

    return (
        <>

            <ul>
                {
                    dm.map((d, index) => {
                        return (

                            <li key={index}>
                                <p>{d.userName}</p>
                                <p>{d.message}</p>
                            </li>

                        )
                    })
                }
            </ul>
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