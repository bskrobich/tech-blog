import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";

function Write() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');

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
        upload();
    }

    return (
        <div className="write">
            <div className="content">
                <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
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
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="category">
                        <input type="radio" name="category" value="tech" id="tech" onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor="tech">Tech</label>
                    </div>
                    <div className="category">
                        <input type="radio" name="category" value="reviews" id="reviews" onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor="reviews">Reviews</label>
                    </div>
                    <div className="category">
                        <input type="radio" name="category" value="science" id="science" onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor="science">Science</label>
                    </div>
                    <div className="category">
                        <input type="radio" name="category" value="entertainment" id="entertainment" onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor="entertainment">Entertainment</label>
                    </div>
                    <div className="category">
                        <input type="radio" name="category" value="ai" id="ai" onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor="ai">AI</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Write;