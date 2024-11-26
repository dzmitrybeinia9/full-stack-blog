import React from 'react'
import Image from './Image'
import { format } from 'timeago.js'

const Comment = ({ comment }) => {
    return (
        <div className='p-4 bg-slate-50 rounded-xl mb-8'>
            <div className='flex items-center gap-4'>
                {comment.user.img && (<Image
                    path={comment.user.img}
                    className="rounded-full object-cover w-10 h-10"
                    w={40}
                />)}
                <span className='font-medium'>{comment.user.username}</span>
                <span className='text-sm text-gray-500'>{format(comment.createdAt)}</span>
            </div>
            <div className='mt-4'>
                <p>
                    {comment.desc}
                </p>
            </div>
        </div>
    )
}

export default Comment