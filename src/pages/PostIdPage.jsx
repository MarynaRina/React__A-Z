import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loader from '../components/UI/Loader/Loader';
import '../styles/App.css'



const PostIdPage = (props) => {
    const params = useParams();
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(params.id);
        setPost(response.data)
    });
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentByPostId(params.id);
        setComments(response.data)
    });

    useEffect(() => {
        fetchPostById(params.id);
        fetchComments(params.id);
    }, [])

    return (
        <div>
            <h1 className='post__page-title'>Страница поста c ID = {params.id}</h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h1 className='comments-title' style={{ marginTop: 400, fontSize: 24, color: '#DB649E', paddingBottom: '4px'}}>
                Комментарии
            </h1>
            {isComLoading
                ? <Loader/>
                : <div>
                   {comments.map(comment => 
                        <div key={comment.id} style={{marginTop: 15, fontSize: 18}}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )} 
                </div>
            }
        </div>
    )
}

export default PostIdPage;