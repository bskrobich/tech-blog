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
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const postId = useLocation().pathname.split("/")[2];

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${postId}`);
                setPost(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPost();
    }, [postId]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/comments/?post=${postId}`, {
                    withCredentials: true
                });
                setComments(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchComments();
    }, [postId])

    const handleDeletePost = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/posts/${postId}`,{
                withCredentials: true
            });
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    const handleAddComment = async () => {
        if (!comment.trim()) return;
        try {
            const response = await axios.post(`http://localhost:3000/api/comments/?post=${postId}`, {
                content: comment,
                created_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            }, {
                withCredentials: true
            });
            setComments((prevComments) => [response.data, ...prevComments]);
            setComment("")
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:3000/api/comments/${commentId}`, {
                withCredentials: true
            });
            setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="single">
            <div className="container">
                <div className="content">
                    <img src={post.image_url && post.image_url.startsWith("http") ? post.image_url : `../uploads/${post.image_url}`} alt="" />
                    <div className="group-container">
                        <div className="user">
                            <span><b>By {post?.author}</b></span>
                            <p>Posted {moment(post?.updated_at).fromNow()}</p>
                        </div>
                        { ((parseInt(user?.id) === post?.user_id) || (user?.role === 'Admin')) &&
                            <div className="edit">
                            <Link to={`/write?edit=${post.id}`} state={post}>
                                <img src={Edit} alt="Edit"/>
                            </Link>
                            <img onClick={handleDeletePost} src={Delete} alt="Delete"/>
                        </div> }
                    </div>
                    <h1>
                        {post?.title}
                    </h1>
                    <p dangerouslySetInnerHTML={{ __html: post?.content }}></p>
                </div>
                <div className="menu">
                    <Menu category={post?.category}/>
                </div>
            </div>
            <div className="comments">
                <h3>Comments</h3>
                { user ?
                    ( <div className="comment-input">
                        <input type="text" value={comment} placeholder="Write a comment..." onChange={e => setComment(e.target.value)} />
                        <button onClick={handleAddComment}>Add Comment</button>
                    </div>) : <h4>You must be logged in to comment</h4>}
                <ul className="comment-list">
                    {comments.map((comment, index) => (
                        <li key={index} className="comment-item">
                            <div className="comment">
                                <div className="comment-author">{comment?.author}</div>
                                <div className="comment-content">{comment.content}</div>
                            </div>
                            <div className="delete-comment">
                                {
                                    ((user?.id=== comment?.author_id) || (parseInt(user?.id) === post?.user_id)  || (user?.role === 'Admin'))
                                    && <img onClick={() => handleDeleteComment(comment.id)} src={Delete} alt="Delete"/>
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Single;