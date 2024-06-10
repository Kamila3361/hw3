"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const router = useRouter();
    const [error, setError] = useState();

    const postData = async () => {
        try{
            const response = await axios.post('https://dummyjson.com/auth/login', {
                username: username,
                password: password,
            });
            setToken(response.data.token);
            router.push("/");
        } catch (error: any) {
            setError(error?.response.status);
            console.error('Error posting data:', error);
        }
    }

    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token));
    }, [token]);

    if(error){
        return(
            <div>{error}</div>
        );
    }

    return (
        <div className="bg-white min-h-screen px-[250px] py-[100px]">
            <div className="bg-white flex flex-col items-center">
                <p className="text-5xl my-[50px]">Welcome back</p>
                <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} className="border border-black rounded-3xl px-[10px] py-[5px] my-[5px] text-lg"/>
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} className="border border-black rounded-3xl px-[10px] py-[5px] mb-[15px] text-lg"/>
                <button type="submit" onClick={postData} className="border border-black rounded-3xl px-[25px] py-[5px] text-lg hover:bg-gray-100">Login</button>
            </div>
        </div>
    );
}