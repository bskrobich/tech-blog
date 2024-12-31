import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Write() {
    const [value, setValue] = useState('');
    return (
        <div className="write">
            <div className="content">
                <input placeholder="Title" />
                <div className="text-container">
                    <ReactQuill className="text" theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b>Draft
                    </span>
                    <input style={{display:"none"}} type="file" name="" id="file"/>
                    <label className="upload" htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save draft</button>
                        <button>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="category">
                        <input type="radio" name="category" value="tech" id="tech"/>
                        <label htmlFor="tech">Tech</label>
                    </div>
                    <div className="category">
                        <input type="radio" name="category" value="reviews" id="reviews"/>
                        <label htmlFor="reviews">Reviews</label>
                    </div>
                    <div className="category">
                        <input type="radio" name="category" value="science" id="science"/>
                        <label htmlFor="science">Science</label>
                    </div>
                    <div className="category">
                        <input type="radio" name="category" value="entertainment" id="entertainment"/>
                        <label htmlFor="entertainment">Entertainment</label>
                    </div>
                    <div className="category">
                        <input type="radio" name="category" value="ai" id="ai"/>
                        <label htmlFor="ai">AI</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Write;