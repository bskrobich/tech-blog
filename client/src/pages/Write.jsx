import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import {useLocation} from "react-router";
import moment from "moment";

function Write() {
    const state = useLocation().state;
    const [content, setContent] = useState(state?.content || '');
    const [title, setTitle] = useState(state?.title || '');
    const [image, setImage] = useState(state?.image_url || null);
    const [category, setCategory] = useState(state?.category || '');

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            const res = await axios.post('http://localhost:3000/api/upload', formData);
            return res.data;
        } catch(error) {
            console.log(error);
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        let url = image;
        if (image && typeof image === 'object') {
            url = await upload();
        }
        try {
            state ? await axios.put(`http://localhost:3000/api/posts/${state.id}`,
                    {
                            title: title,
                            content: content,
                            category: category,
                            image_url: image ? url : "",
                            updated_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                    }, { withCredentials: true })
                : await axios.post(`http://localhost:3000/api/posts/`,
                    {
                            title: title,
                            content: content,
                            category: category,
                            image_url: image ? url : "",
                            created_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                    }, { withCredentials: true });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="write">
            <div className="content">
                <input type="text" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
                <div className="text-container">
                    <ReactQuill className="text" value={content} onChange={setContent} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b>Draft
                    </span>
                    <input style={{display:"none"}} type="file" name="" id="file" onChange={e => setImage(e.target.files[0])} />
                    <label className="upload" htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save draft</button>
                        <button onClick={handleClick}>{state ? 'Update' : 'Publish'}</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="category">
                        <input type="radio" checked={category === 'Tech'} name="category" value="Tech" id="tech" onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor="tech">Tech</label>
                    </div>
                    <div className="category">
                        <input type="radio" checked={category === 'Politics'} name="category" value="Politics" id="politics" onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor="politics">Politics</label>
                    </div>
                    <div className="category">
                        <input type="radio" checked={category === 'Science'} name="category" value="Science" id="science" onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor="science">Science</label>
                    </div>
                    <div className="category">
                        <input type="radio" checked={category === 'Entertainment'} name="category" value="Entertainment" id="entertainment" onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor="entertainment">Entertainment</label>
                    </div>
                    <div className="category">
                        <input type="radio" checked={category === 'AI'} name="category" value="AI" id="ai" onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor="ai">AI</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Write;