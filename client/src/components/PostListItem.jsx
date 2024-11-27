import React from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'

const PostListItem = ({ post }) => {
    console.log(post); 
    return (
        <div className='flex flex-col xl:flex-row gap-8 mb-8'>
            {/* image */}
            {post.img && <div className='md:hidden xl:block xl:w-1/3'>
                <Image
                    path={post.img}
                    className="rounded-3xl object-cover"
                    w={735}
                ></Image>
            </div>}
            {/* details */}
            <div className='flex flex-col gap-4 xl:w-2/3'>
                <Link
                    to={`/${post.slug}`}
                    className='text-4xl font-semibold'
                >
                    {post.title}
                </Link>
                <div
                    className='flex items-center gap-2 text-gray-400 text-sm'
                >
                    <span>Written By</span>
                    <Link className='text-blue-800' to={`/posts?author=${post.user.username}`}>{post.user.username}</Link>
                    <span>on</span>
                    <Link className='text-blue-800'>{post.category}</Link>
                    <span>{format(post.createdAt)}</span>
                </div>
                <p>
                    {post.desc}
                </p>
                <Link to={`/${post.slug}`} className='underline text-blue-800 text-sm'>Read More</Link>
            </div>
        </div>
    )
}

export default PostListItem