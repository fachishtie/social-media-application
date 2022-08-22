import axios from 'axios'

const FRIENDS_BASE_REST_API_URL = 'http://localhost:8080/api/v1/friends'

class FriendsService{

    getAllFriendsWithNames(){
        return axios.get(FRIENDS_BASE_REST_API_URL)
    }

    createFriends(friends){
        return axios.post(FRIENDS_BASE_REST_API_URL, friends)
    }

    deleteFriends(friendsId){
        return axios.delete(FRIENDS_BASE_REST_API_URL + '/' + friendsId);
    }

    getFriendsByUserId(friendsUserId){
        return axios.get(FRIENDS_BASE_REST_API_URL + '/' + friendsUserId)
    }

    getFriendsAndFriendNameByUserId(friendsUserId){
        return axios.get(FRIENDS_BASE_REST_API_URL + '/userId/' + friendsUserId)
    }

}

export default new FriendsService();