import './styles/App.css'
import React, {useMemo, useState } from "react";
import PostList from "./components/PostList";

import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'JS', body: 'Descr' },
        { id: 2, title: 'PHP', body: 'HI' },
        { id: 3, title: 'HTML', body: 'prog lang' },
    ]);

    const [filter, setFilter] = useState({sort: '', query: ''});

    
    const sortedPosts = useMemo(()=> {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(filter.query))
    }, [filter.query, sortedPosts]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }


    return (
        <div className="App">
            <MyModal></MyModal>
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
                <PostList  
                    remove={removePost} 
                    posts={sortedAndSearchedPosts} 
                    title='List of posts'
                />
            
            
        </div>
    );
}

export default App;
