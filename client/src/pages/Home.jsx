import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router";
import axios from "axios";

function Home() {

    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [search, setSearch] = useState("");

    const category = useLocation().search;

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 2;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(posts.length / postsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setTimeout(function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },2);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setTimeout(function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },2);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${category}`);
                setPosts(response.data);
                setAllPosts(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (search.trim()) {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/search?search=${search}`, {
                    withCredentials: true
                });
                setPosts(response.data);
            } catch (err) {
                console.log(err);
            }
        } else {
            setPosts(allPosts);
        }
    }

    return (
        <div className="homepage">
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={search}
                    placeholder="Search for Posts..."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <div className="posts">
                { Array.isArray(currentPosts) && currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                        <div className="post" key={post.id}>
                            <div className="image">
                                <img
                                    src={
                                        post.image_url && post.image_url.startsWith('http')
                                            ? post.image_url
                                            : `../uploads/${post.image_url}`
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="content">
                                <h1>{post.title}</h1>
                                <Link className="link" to={`/post/${post.id}`}>
                                    <button>Read more</button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-posts-message">No posts available.</p>
                )}
            </div>
            { Array.isArray(currentPosts) && currentPosts.length > 0 ? (
                <div className="pagination">
                    <button className="prev-page" onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span className="page-info">
                    Page {currentPage} of {totalPages}
                </span>
                    <button className="next-page" onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div> ) : null
            }
        </div>
    );
}

export default Home;