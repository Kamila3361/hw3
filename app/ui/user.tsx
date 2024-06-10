import Image from "next/image";
import { useState, useEffect } from "react";
import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

interface User{
    firstName: string;
    lastName: string;
    image: string;
}

export default function User({userId}: {userId: number}){
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try{
            const response = await axiosInterceptorInstance.get(`/auth/users/${userId}`);
            console.log(response.data);
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
            throw new Error('Could not get data');
        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    return(
        <div className="flex flex-row justify-start items-center dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Image 
                src={user?.image || "https://dummyjson.com/icon/emilys/128"}
                alt="profile image"
                width={45}
                height={45}
                className="mr-[5px]"
            />
            <p>{user?.firstName} {user?.lastName} &#183; <span>Follow</span></p>
        </div>
    );
}
