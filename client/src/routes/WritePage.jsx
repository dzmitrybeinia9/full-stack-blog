import React, { useEffect } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Upload from '../components/Upload';

const WritePage = () => {

    const { isLoaded, isSignedIn } = useUser();
    const [value, setValue] = useState('');
    const { getToken } = useAuth();

    const [cover, setCover] = useState();
    const [img, setImg] = useState("");
    const [video, setVideo] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
    }, [img]);

    useEffect(() => {
        video &&
            setValue(
                (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
            );
    }, [video]);

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const token = await getToken();
            return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: (res) => {
            toast.success('Post created successfully');
            navigate(`/${res.data.slug}`);
        },
    })

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    if (!isSignedIn) {
        return <div>Sign in to write a post</div>
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newPost = {
            img: cover.filePath || "",
            title: formData.get('title'),
            desc: formData.get('desc'),
            category: formData.get('cat'),
            content: value,
        }

        mutation.mutate(newPost);
    }

    return (
        // respect the height of the navbar
        <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
            <h1 className='text-xl font-light'>Create a New Post</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-6'>
                <Upload
                    type='image'
                    setProgress={setProgress}
                    setData={setCover}
                >
                    <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>
                        Add a cover image
                    </button>
                </Upload>

                <input
                    className='text-4xl font-semibold bg-transparent outline-none'
                    type="text"
                    placeholder='My Awesome Story'
                    name="title"
                />
                <div className='flex items-center gap-4'>
                    <label htmlFor="" className='text-sm'>Choose a category:</label>
                    <select name="cat" id="" className='p-2 rounded-xl bg-white shadow-md'>
                        <option value="general">General</option>
                        <option value="web-design">Web Design</option>
                        <option value="development">Development</option>
                        <option value="databases">Databases</option>
                        <option value="seo">Search Engines</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>
                <textarea className='p-4 rounded-xl bg-white shadow-md' name="desc" placeholder='A Short Description'></textarea>
                <div className='flex flex-1'>
                    <div className='fle flex-col gap-2 mr-2'>
                        <Upload type="image" setProgress={setProgress} setData={setImg}>
                            🌆
                        </Upload>
                        <Upload type="video" setProgress={setProgress} setData={setVideo}>
                            ▶️
                        </Upload>
                    </div>
                    <ReactQuill
                        theme='snow'
                        className='flex-1 rounded-xl bg-white shadow-md'
                        value={value}
                        onChange={setValue}
                        readOnly={progress > 0 && progress < 100}
                    />
                </div>
                <button
                    disabled={mutation.isPending || (progress > 0 && progress < 100)}
                    className='bg-blue-800 rounded-2xl px-4 py-3 w-36 text-white font-medium mt-4 disabled:bg-blue-400 disabled:cursor-not-allowed'>
                    {mutation.isPending ? 'Loading...' : 'Send'}
                </button>
                "Progress": {progress}%
                {mutation.isError && <span>Error: {mutation.error.message}</span>}
            </form>
        </div>
    )
}

export default WritePage