import React, { useState } from "react";
import './MainComponent.css'

import { usePosts } from '../../Hook/usePosts';
import InvertButton from "../Invert Button/Invert";

export default function MainComponent(){

    const {posts, onAddPost, onClearPosts, searchQuery, setSearchQuery, archived } = usePosts();


    const [showArchive, setShowArchive] = useState(false);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    function titleHandler(e){
        setTitle(e.target.value);
    }

    function bodyHandler(e){
        setBody(e.target.value);
    }

    function formHandler(e){
        e.preventDefault(); //prevent from refreshing,if not used, app will be refreshed and will go toprevious state
        if (!body || !title) return; //requires both body & title
        onAddPost({title: title, body: body }) // equals onAddPost({title, body}), both work same
        setTitle('');
        setBody('')
    }
    return(
        <>
        <div className="container">

        <div className="top-container">

            <div className="left">
                <InvertButton />
                <h1>M 'n M Blogs</h1>
            </div>

            <div className="right">
                <p> <i className="fas fa-paper-plane"></i> {posts.length} posts found</p>
                <input  placeholder="Search posts..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
                <button onClick={onClearPosts}>Clear Posts</button>
            </div>

        </div>

        <div className="bottom-container">
            
            <form className="top" onSubmit={formHandler}>
                <input placeholder="Enter Title..." value={title} onChange={titleHandler}/>
                <textarea placeholder="Enter body..." cols="100" rows="1" value={body} onChange={bodyHandler}></textarea>
                <button>Add Post</button>
            </form>

            <div className="blog-posts">
                <ul>
                 {posts.map((post, i) => (
                    <li key={i}>
                        <h3 className="title">{post.title}</h3>
                        <p className="body-text">{post.body.slice(0,100)}</p>
                    </li>
             ))}
                </ul>
            </div>

            <div className="archive">
                <h1> Archived Posts </h1>
                <button onClick={() => {setShowArchive(!showArchive)}}>{showArchive ? 'Hide Archived Posts ' : 'Show Archived Posts'}</button>
            </div>
             <div className="show-archive">
                {showArchive && (
                <ul>
                    {archived.map((post, i) => (
                        <li key={i}>
                        <p className="body-text">
                            <strong>{post.title}:</strong> {post.body.slice(0, 50)}....
                        </p>
                        <button onClick={() => onAddPost(post)}>Add as new post</button>
                        </li>
                ))}
                </ul>
      )} </div>

            

        </div>

        <footer>Created by Muqeem Malik using faker-js/faker</footer>

        </div>
        </>
    )
}