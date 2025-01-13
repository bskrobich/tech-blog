import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router";
import axios from "axios";

function Home() {

    const [posts, setPosts] = useState([]);

    const category = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${category}`);
                setPosts(response.data.reverse());
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [category]);

    return (
        <div className="homepage">
            <div className="posts">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map(post => (
                        <div className="post" key={post.id}>
                            <div className="image">
                                <img src={post.image_url} alt="" />
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
                    <p className="no-posts-message">No posts available</p>
                )}
            </div>
        </div>
    );
}

export default Home;