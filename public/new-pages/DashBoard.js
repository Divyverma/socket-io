import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
    const [username, setUserame] = useState("");
    const [room, setRoom] = useState("");

    const navigate = useNavigate();


    const handleSubmit = () => {
        console.log(username, room)
        if (!username || !room) {
            toast.error("Both Name and RoomId is neccessory")
            return;
        }
        navigate(`/chat/${room}`, {
            state:{
                username,
            }
        })
        toast.success("Joined the Room")

    }

    return (
        <div className='divi'>
            <h1 className='head'>Start <span>Anonymous</span> Chat</h1>

            <div className='input-wrap'>
                <input value={username}
                    onChange={(e) => setUserame(e.target.value)}
                    type='text'
                    placeholder='Username'
                />
                <input value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    type='text'
                    placeholder='Room Name'
                />
                <button onClick={handleSubmit} >Join</button>
            </div>
        </div>
    )
}

export default DashBoard
