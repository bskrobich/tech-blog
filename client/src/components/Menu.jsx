import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router";

function Menu({category}) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/?category=${category}`);
                setPosts(response.data.reverse());
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [category]);

    return (
        <div className="menu">
            <h1>More from Geek Speak</h1>
            {posts.map( post => (
                <div className="post" key={post.id}>
                    <img src={post.image_url} alt=""/>
                    <h2>{post.title}</h2>
                    <Link className="link" to={`/post/${post.id}`}>
                        <button>Read more</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Menu;