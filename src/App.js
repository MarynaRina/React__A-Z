import './styles/App.css'
import React, { useState } from "react";
import PostList from "./components/PostList";
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'JS', body: 'Descr' },
        { id: 2, title: 'PHP', body: 'HI' },
        { id: 3, title: 'HTML', body: 'prog lang' },
    ]);

    const [post, setPost] = useState({
        title: '',
        body: ''
    });
    const [body, setBody] = useState('');

    const addNewPost = (e) => {
        e.preventDefault();
        
        setPosts([...posts, {...post, id: Date.now()}])
        setPost({title: '',body: ''})
    }

    return (
        <div className="App">
            <form>
                <MyInput 
                    value={post.title}
                    onChange={e => setPost({
                        ...post, title: e.target.value})}
                    type='text' 
                    placeholder='Post title'
                />
                <MyInput 
                    value={post.body}
                    onChange={e => setPost({
                        ...post, body: e.target.value})}
                    type='text' 
                    placeholder='Post description'
                />
                <MyButton onClick={addNewPost}>Create post</MyButton>
            </form>
            <PostList posts={posts} title='List of posts'/>
        </div>
    );
}

export default App;
