import React from 'react'
import Image from '../components/Image'
import { Link, useParams } from 'react-router-dom'
import PostMenuActions from '../components/PostMenuActions'
import Search from '../components/Search'
import Comments from '../components/Comments'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { format } from 'timeago.js'

const fetchPost = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
    console.log(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
    return res.data;
}

const SinglePostPage = () => {

    const { slug } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ['post', slug],
        queryFn: () => fetchPost(slug),
    });

    if (isPending) return 'Loading...';
    if (error) return 'An error has occurred: ' + error.message;
    if (!data) return 'Post not found';

    return (
        <div className='flex flex-col gap-8'>
            {/* details */}
            <div className='flex gap-8'>
                <div className='lg:w-3/5 flex flex-col gap-8'>
                    <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>{data.title}</h1>
                    <div className='flex items-center gap-2 text-gray-400 text-sm'>
                        <span>Written By</span>
                        <Link className='text-blue-800'>{data.user.username}</Link>
                        <span>on</span>
                        <Link className='text-blue-800'>{data.user.category}</Link>
                        <span>{format(data.createdAt)}</span>
                    </div>
                    <p className='text-gray-500 font-medium'>
                        {data.desc}
                    </p>
                </div>
                {data.img && <div className='hidden lg:block w-2/5'>
                    <Image path={data.img} w={600} className="rounded-2xl"></Image>
                </div>}
            </div>

            {/* content */}
            <div className='flex flex-col md:flex-row gap-8'>
                {/* text */}
                <div className='lg:text-lg flex flex-col gap-6 text-justify'>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis natus magni labore adipisci velit, quae esse veniam sunt quos id ipsam sit dolor ea ipsa iure saepe eius, earum quis sequi nostrum. Natus quam aliquid voluptas adipisci, et doloribus qui modi laudantium magni animi voluptate eaque culpa labore quaerat consequuntur, in rem cumque perspiciatis cupiditate placeat. Aut, velit? Amet iure necessitatibus suscipit reiciendis maiores molestiae alias culpa nesciunt aperiam laboriosam earum, enim natus quo! Quasi minima earum fugit veniam tenetur necessitatibus odit neque dolor aspernatur repudiandae, eligendi error, delectus ratione optio ab eveniet ipsum possimus repellat perspiciatis cum! Officiis, sed?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus tempore nihil, aliquid repellat perferendis itaque ut consequatur eum soluta fugit quod fugiat aut molestiae illum dicta animi autem accusamus. Modi reprehenderit libero iusto aspernatur porro quas rem eveniet excepturi necessitatibus, ullam asperiores qui sapiente repellendus aliquid aperiam, maxime corrupti adipisci atque assumenda eius doloremque? Deleniti, at illum vitae impedit, consequatur animi delectus sunt voluptatum illo vel non? Tenetur sed impedit, consectetur, eaque aspernatur in, modi fugiat eos aliquam ab optio deserunt. Quis, inventore. Impedit qui, sunt repudiandae fuga et earum rerum voluptate incidunt nesciunt pariatur maiores? Sint provident molestias expedita.
                    </p>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex fugiat labore, modi in quas cupiditate maxime sit fuga molestias vero nam voluptate placeat reprehenderit totam ratione repudiandae atque repellat deserunt velit culpa, animi rerum officia quae delectus! Aut, sunt autem! Unde, vero doloremque facilis rerum exercitationem esse dignissimos delectus fugiat ea praesentium iure. Veniam accusamus nesciunt molestiae beatae, aspernatur voluptatibus, sequi cum, a commodi corrupti incidunt natus officia assumenda! Accusamus, nobis quasi harum molestiae illum ipsa doloribus neque labore sequi in, eum error adipisci vero odio aliquid. Porro tenetur ut nemo vero mollitia reprehenderit tempora, delectus ducimus. Culpa, quisquam nesciunt?
                    </p>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex fugiat labore, modi in quas cupiditate maxime sit fuga molestias vero nam voluptate placeat reprehenderit totam ratione repudiandae atque repellat deserunt velit culpa, animi rerum officia quae delectus! Aut, sunt autem! Unde, vero doloremque facilis rerum exercitationem esse dignissimos delectus fugiat ea praesentium iure. Veniam accusamus nesciunt molestiae beatae, aspernatur voluptatibus, sequi cum, a commodi corrupti incidunt natus officia assumenda! Accusamus, nobis quasi harum molestiae illum ipsa doloribus neque labore sequi in, eum error adipisci vero odio aliquid. Porro tenetur ut nemo vero mollitia reprehenderit tempora, delectus ducimus. Culpa, quisquam nesciunt?
                    </p>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex fugiat labore, modi in quas cupiditate maxime sit fuga molestias vero nam voluptate placeat reprehenderit totam ratione repudiandae atque repellat deserunt velit culpa, animi rerum officia quae delectus! Aut, sunt autem! Unde, vero doloremque facilis rerum exercitationem esse dignissimos delectus fugiat ea praesentium iure. Veniam accusamus nesciunt molestiae beatae, aspernatur voluptatibus, sequi cum, a commodi corrupti incidunt natus officia assumenda! Accusamus, nobis quasi harum molestiae illum ipsa doloribus neque labore sequi in, eum error adipisci vero odio aliquid. Porro tenetur ut nemo vero mollitia reprehenderit tempora, delectus ducimus. Culpa, quisquam nesciunt?
                    </p>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex fugiat labore, modi in quas cupiditate maxime sit fuga molestias vero nam voluptate placeat reprehenderit totam ratione repudiandae atque repellat deserunt velit culpa, animi rerum officia quae delectus! Aut, sunt autem! Unde, vero doloremque facilis rerum exercitationem esse dignissimos delectus fugiat ea praesentium iure. Veniam accusamus nesciunt molestiae beatae, aspernatur voluptatibus, sequi cum, a commodi corrupti incidunt natus officia assumenda! Accusamus, nobis quasi harum molestiae illum ipsa doloribus neque labore sequi in, eum error adipisci vero odio aliquid. Porro tenetur ut nemo vero mollitia reprehenderit tempora, delectus ducimus. Culpa, quisquam nesciunt?
                    </p>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex fugiat labore, modi in quas cupiditate maxime sit fuga molestias vero nam voluptate placeat reprehenderit totam ratione repudiandae atque repellat deserunt velit culpa, animi rerum officia quae delectus! Aut, sunt autem! Unde, vero doloremque facilis rerum exercitationem esse dignissimos delectus fugiat ea praesentium iure. Veniam accusamus nesciunt molestiae beatae, aspernatur voluptatibus, sequi cum, a commodi corrupti incidunt natus officia assumenda! Accusamus, nobis quasi harum molestiae illum ipsa doloribus neque labore sequi in, eum error adipisci vero odio aliquid. Porro tenetur ut nemo vero mollitia reprehenderit tempora, delectus ducimus. Culpa, quisquam nesciunt?
                    </p>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex fugiat labore, modi in quas cupiditate maxime sit fuga molestias vero nam voluptate placeat reprehenderit totam ratione repudiandae atque repellat deserunt velit culpa, animi rerum officia quae delectus! Aut, sunt autem! Unde, vero doloremque facilis rerum exercitationem esse dignissimos delectus fugiat ea praesentium iure. Veniam accusamus nesciunt molestiae beatae, aspernatur voluptatibus, sequi cum, a commodi corrupti incidunt natus officia assumenda! Accusamus, nobis quasi harum molestiae illum ipsa doloribus neque labore sequi in, eum error adipisci vero odio aliquid. Porro tenetur ut nemo vero mollitia reprehenderit tempora, delectus ducimus. Culpa, quisquam nesciunt?
                    </p>
                </div>
                {/* menu */}
                <div
                    className='px-4 h-max sticky top-8'
                >
                    <h1 className='mb-4 text-sm font-medium'>Author</h1>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-12'>
                            {data.user.img && <Image
                                path={data.user.img}
                                w={48}
                                h={48}
                                className="w-12 h-12 rounded-full object-cover"
                            />}
                            <Link className='text-blue-800'>{data.user.username}</Link>
                        </div>
                        <p className='text-sm text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, ducimus?</p>
                        <div className='flex gap-2'>
                            <Link>
                                <Image
                                    path={"full-stack-blog/facebook.svg"}
                                />
                            </Link>
                            <Link>
                                <Image
                                    path={"full-stack-blog/instagram.svg"}
                                />
                            </Link>

                        </div>
                    </div>
                    <PostMenuActions post={data} />
                    <h1 className='mt-8 mb-4 text-sm font-medium'>Calegories</h1>
                    <div className='flex flex-col gap-2 text-sm'>
                        <Link
                            to='/posts'
                            className='underline'
                        >
                            All Posts
                        </Link>
                        <Link
                            to='/posts?cat=web-design'
                            className='underline'
                        >
                            Web Design
                        </Link>
                        <Link
                            to='/posts?cat=development'
                            className='underline'
                        >
                            Development
                        </Link>
                        <Link
                            to='/posts?cat=databases'
                            className='underline'
                        >
                            Databases
                        </Link>
                        <Link
                            to='/posts?cat=search-engines'
                            className='underline'
                        >
                            Search Engines
                        </Link>
                        <Link
                            to='/posts?cat=marketing'
                            className='underline'
                        >
                            Marketing
                        </Link>
                    </div>
                    <h1 className='mt-8 mb-4 text-sm font-medium'>Search</h1>
                    <Search />
                </div>
            </div>
            <Comments postId={data._id} />
        </div>
    )
}

export default SinglePostPage