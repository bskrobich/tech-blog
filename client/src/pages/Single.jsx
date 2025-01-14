import React, {useContext, useEffect, useState} from 'react';
import Edit from '../images/edit.png'
import Delete from '../images/delete.png'
import {Link, useLocation, useNavigate} from "react-router";
import Menu from "../components/Menu.jsx";
import axios from "axios";
import moment from "moment";
import {AuthContext} from "../context/authContext.jsx";

function Single() {

    const [post, setPost] = useState({});

    const postId = useLocation().pathname.split("/")[2];

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const comments =
        [
            "Great article!",
            "Very informative.",
            "I totally agree with this point of view!"
        ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${postId}`);
                setPost(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [postId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/posts/${postId}`,{
                withCredentials: true
            });
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="single">
            <div className="container">
                <div className="content">
                    <img
                        src={post?.image_url}
                        alt=""/>
                    <div className="group-container">
                        <div className="user">
                            <span><b>By {post?.author}</b></span>
                            <p>Posted {moment(post?.updated_at).fromNow()}</p>
                        </div>
                        { ((parseInt(user?.id) === post?.user_id) || (user?.role === 'Admin')) &&
                            <div className="edit">
                            <Link to="/write?edit=1">
                                <img src={Edit} alt="Edit"/>
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="Delete"/>
                        </div> }
                    </div>
                    <h1>
                        {post?.title}
                    </h1>
                    <p>
                        {post?.content}
                    </p>
                </div>
                <div className="menu">
                    <Menu category={post?.category}/>
                </div>
            </div>
            <div className="comments">
                <h3>Comments</h3>
                <div className="comment-input">
                    <input type="text" placeholder="Write a comment..."/>
                    <button>Add Comment</button>
                </div>
                <ul className="comment-list">
                    {comments.map((comment, index) => (
                        <li key={index} className="comment-item">
                            <div className="comment-author">Bartosz S.</div>
                            <div className="comment-content">{comment}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Single;