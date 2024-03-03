import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [postIndex, setPostIndex] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    // Reverse the order of posts
                    const reversedPosts = data.posts.reverse();
                    setPosts(reversedPosts);
                    setLoading(false);
                    setError(false);
                    // Find the index of the current post in the reversed list
                    const index = reversedPosts.findIndex(post => post.slug === postSlug);
                    setPostIndex(index);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPosts();
    }, [postSlug]);

    const navigateToPost = (direction) => {
        if (direction === 'previous' && postIndex > 0) {
            setPostIndex(postIndex - 1);
        } else if (direction === 'next' && postIndex < posts.length - 1) {
            setPostIndex(postIndex + 1);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size="xl" />
        </div>
    );

    const currentPost = posts[postIndex];

    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen font-lora">
            {error && <p>Error fetching data.</p>}
            {currentPost && (
                <>
                    <h1 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto">{currentPost.title}</h1>
                    <Link to={`/search?category=${currentPost.category}`} className="self-center mt-5">
                        <Button color="gray" pill size='xs'>{currentPost.category}</Button>
                    </Link>
                    <img src={currentPost.image} alt={currentPost.title} className="mt-10 p-2 max-h-[300px] w-full object-cover" />
                    <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                        <span>{new Date(currentPost.createdAt).toLocaleDateString()}</span>
                        <span className="italic">{(currentPost.content.length / 1000).toFixed(0)} mins read</span>
                    </div>
                    <div className="p-3 font-medium text-justify max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{ __html: currentPost.content }} />

                    <div className="flex max-w-2xl mx-auto w-full justify-between mt-5">
                        <Button color="gray" onClick={() => navigateToPost('previous')} disabled={postIndex === 0}>Previous</Button>
                        <Button color="gray" outline onClick={() => navigateToPost('next')} disabled={postIndex === posts.length - 1}>Next</Button>
                    </div>
                    <CommentSection postId={currentPost._id} />
                </>
            )}
        </main>
    );
}
