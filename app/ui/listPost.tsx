"use client";

import Post from "./post";
import axios from "axios";
import { useState, useEffect } from "react";
import axiosInterceptorInstance from "../axios/axiosInterceptorInstance";

interface PostInter{
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    }
    views: number;
    userId: number;
}

export default function ListPost(){
    const [posts, setPosts] = useState<PostInter[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try{
            const response = await axiosInterceptorInstance.get("/auth/posts");
            console.log(response.data);
            setPosts(response.data.posts);
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

    return (
        <div className="flex flex-col gap-[10px] dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {posts.map((post) => (
                <Post key={post.id} {...post}/>
            ))}
        </div>
    );
}