import Avatar from '@mui/material/Avatar';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db, messageData } from '../plugins/firebase';
import "./chat.css";


const Chat = () => {
    const location = useLocation();
    const state = location.state

    const [message, setMessage] = useState('')
    const [userName, setUserName] = useState(state.substring(0, state.indexOf("/")))
    const [dm, setDm] = useState([])
    const [url, setURL] = useState(state.substring(state.indexOf("/") + 1))

    const messagesRef = collection(db, "Messages")
    useEffect(() => {
        // 名前とイメージURLの分離
        console.log(state.substring(0, state.indexOf("/")))
        console.log(state.substring(state.indexOf("/") + 1))

        console.log(url)

        // メッセージの受信
        const q = query(collection(db, "Messages"), orderBy("timestamp", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());

            });
            console.log("Current cities in CA: ", messages.join(", "));
            setDm(messages)
        });

    }, [])
    console.log(dm, "test")
    const q1 = query(messagesRef, orderBy("timestamp", "desc"))



    const createMessage = async () => {
        console.log('ready')
        const res = await messageData(message, userName, url)
        console.log(userName)
        console.log('complete', res)
    }

    const pressEnter = (e) => {
        if (e.key == 'Enter') {
            e.preventDefault()
        }
    }
    return (
        <>
            <ul>
                {
                    dm.map((d, index) => {
                        return (
                            <li key={index}>
                                <Avatar alt="Remy Sharp" src={d.avatarURL} />
                                <p>{d.userName}</p>
                                <p>{d.message}</p>
                            </li>

                        )
                    })
                }
            </ul>
            <input
                type="text"
                color="primary"
                placeholder="メッセージを入力してください。"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={createMessage}

            >
                送信
            </button>
        </>
    )
}

export default Chat;