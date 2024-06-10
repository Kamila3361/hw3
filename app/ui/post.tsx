import Image from "next/image";
import User from "./user";
import Link from "next/link";

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


export default function Post({ id, title, body, tags, reactions, userId }: PostInter){
    
    return(
        <div className="bg-white flex flex-col lg:w-[1100px] p-[50px] drop-shadow-sm dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="flex flex-row items-center justify-start gap-[8px]">
                <User userId={userId} />
            </div>
            <div>
                <Link href={`/posts/${id}`}>
                    <div>
                        <h1 className="text-2xl font-bold my-[5px]">{title}</h1>
                        <p>{body.slice(0, 200)}...</p>
                    </div>
                </Link>
                <div className="flex flex-row justify-between my-[10px] items-center pr-[20px]">
                    <div className="flex flex-col md:flex-row gap-[10px]">
                        {tags.map((tag, i) => (
                            <p key={i} className="bg-gray-200 py-[5px] px-[10px] rounded-3xl text-sm dark:bg-gray-900 text-gray-900 dark:text-gray-100">{tag}</p>
                        ))}
                    </div>
                    <div className="flex flex-row gap-[5px] items-center bg-gray-100 py-[5px] px-[15px] rounded-3xl text-sm dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                        <Image 
                            src="/like.svg"
                            alt="like button"
                            width={25}
                            height={25}
                        />
                        <p>{reactions.likes}</p>
                        <span className="text-2xl mx-[5px]">&#124;</span>
                        <Image 
                            src="/dislike.svg"
                            alt="dislike button"
                            width={25}
                            height={25}
                        />
                        <p>{reactions.dislikes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}