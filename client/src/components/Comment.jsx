import React from 'react'
import Image from './Image'

const Comment = () => {
    return (
        <div className='p-4 bg-slate-50 rounded-xl mb-8'>
            <div className='flex items-center gap-4'>
                <Image
                    path={"full-stack-blog/userImg.jpeg"}
                    className="rounded-full object-cover w-10 h-10"
                    w={40}
                />
                <span className='font-medium'>John Doe</span>
                <span className='text-sm text-gray-500'>2 days ago</span>
            </div>
            <div className='mt-4'>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur, quisquam obcaecati suscipit explicabo, molestias quibusdam illo velit quo quos accusamus accusantium soluta qui. Vitae veritatis laboriosam, consequuntur minus autem aliquam esse, neque hic, distinctio nisi cumque exercitationem corrupti? Unde cum quas labore rem placeat modi dignissimos quo iure assumenda sint.
                </p>
            </div>
        </div>
    )
}

export default Comment