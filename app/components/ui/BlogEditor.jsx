"use client"
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Navbar from '../common/Navbar';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = (content, delta, source, editor) => {
    setEditorHtml(editor.getHTML());
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post('/api/blogs', {
        title,
        content: editorHtml
      });
      setTitle('');
      setEditorHtml('');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className='mt-28'>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <ReactQuill 
        value={editorHtml}
        onChange={handleChange}
        modules={BlogEditor.modules}
        formats={BlogEditor.formats}
      />
      <button onClick={handleCreate}>Create Blog</button>
    </div>
    </>
  );
};

// Modules and formats for the Quill editor
BlogEditor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']                                        
  ],
};

BlogEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default BlogEditor;
