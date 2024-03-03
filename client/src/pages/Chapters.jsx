import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Chapters() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts`);
                if (!res.ok) {
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data.posts);
                    setLoading(false);
                    if (data.posts.length === 9) {
                        setShowMore(true);
                    } else {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        try {
            const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
            if (!res.ok) {
                return;
            }
            if (res.ok) {
                const data = await res.json();
                setPosts([...posts, ...data.posts]);
                if (data.posts.length === 9) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.error('Error fetching more posts:', error);
        }
    };

    return (
        <div className='p-7 w-full font-display max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
                Chapters
            </h1>
            {loading ? (
                <div className='flex justify-center items-center min-h-screen'>
                    <Spinner size='xl' />
                </div>
            ) : (
                <div className='p-7 flex flex-wrap gap-4 items-center justify-center'>
                    {!loading && posts.length === 0 && (
                        <p className='text-xl text-gray-500'>No posts found.</p>
                    )}
                    {!loading &&
                        posts &&
                        posts.map((post) => <PostCard key={post._id} post={post}
                
                        />)}
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className='text-teal-500 text-lg hover:underline p-7 w-full'
                        >
                            Show More
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
