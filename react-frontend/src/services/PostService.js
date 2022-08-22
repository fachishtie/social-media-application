import axios from 'axios'

const POST_BASE_REST_API_URL = 'http://localhost:8080/api/v1/posts'

class PostService{

    getAllPostsWithNames(){
        return axios.get(POST_BASE_REST_API_URL)
    }

    createPost(post){
        return axios.post(POST_BASE_REST_API_URL, post)
    }

    deletePost(postId){
        return axios.delete(POST_BASE_REST_API_URL + '/' + postId);
    }

    getPostAndPosterNameById(postId){
        return axios.get(POST_BASE_REST_API_URL + '/' + postId);
    }

}

export default new PostService();