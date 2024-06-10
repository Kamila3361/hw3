"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import User from "@/app/ui/user";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import axiosInterceptorInstance from "@/app/axios/axiosInterceptorInstance";

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

export default function Page({params}: {params: Params}){
    const slug = params.slug;
    const [post, setPost] = useState<PostInter>();
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try{
            const response = await axiosInterceptorInstance.get(`/auth/posts/${slug}`);
            console.log(response.data);
            setPost(response.data);
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

    if(loading){
        return <div className="min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen px-[300px] pt-[100px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <p className="text-4xl font-extrabold mb-[25px]">{post?.title}</p>
                <div className="flex flex-row justify-start items-center mb-[25px]">
                    <User userId={post?.userId || 0} />
                </div>
                <div className="flex flex-row justify-between pr-[15px] pl-[5px] my-[25px] border-t border-b py-[10px] border-gray-100">
                    <div className="flex flex-col md:flex-row gap-[10px]">
                        {post?.tags.map((tag, i) => (
                            <p key={i} className="bg-gray-200 py-[5px] px-[10px] rounded-3xl text-sm dark:bg-gray-900 text-gray-900 dark:text-gray-100">{tag}</p>
                        ))}
                    </div>
                    <div className="flex flex-row items-center gap-[5px]">
                        <Image 
                            src="/like.svg"
                            alt="like button"
                            width={25}
                            height={25}
                        />
                        <p className="mr-[10px]">{post?.reactions.likes}</p>
                        <Image 
                            src="/dislike.svg"
                            alt="dislike button"
                            width={25}
                            height={25}
                        />
                        <p className="mr-[10px]">{post?.reactions.dislikes}</p>
                        <Image 
                            src="/view.svg"
                            alt="views photo"
                            width={25}
                            height={25}
                        />
                        <p>{post?.views}</p>
                    </div>
                </div>
                <div>
                    <p>{post?.body}</p>
                </div>
            </div>
        </div>
    );
}
