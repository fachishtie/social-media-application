import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import FriendsService from '../services/FriendsService';
import SocialService from '../services/SocialService';

const Friends = () => {

    const [friends, setFriends] = useState([])
    const [socials, setSocials] = useState([])
    const {id} = useParams()
    
    useEffect(() => {
        getAllFriends();
        getAllSocials();
    }, [])

    const getAllFriends = () => {
        FriendsService.getFriendsAndFriendNameByUserId(id).then((response)=>{
  
            setFriends(response.data)
  
        }).catch(error => {
              console.log(error)
        })
    }

    const getAllSocials = () => {
        SocialService.getAllSocials().then((response) =>{

            setSocials(response.data)

        }).catch(error => {
              console.log(error)
        })
    }

    const saveFriend = (socialId) => {
        let userId = id
        let friendId = socialId
        let friends = {userId, friendId}
        FriendsService.createFriends(friends).then((response)=> {
            
            getAllFriends();
            getAllSocials();
            console.log(response.data)

        })
        userId = socialId;
        friendId = id;
        friends = {userId, friendId}
        FriendsService.createFriends(friends).then((response)=>{

            getAllFriends();
            getAllSocials();
            console.log(response.data)

        })
        getAllFriends();
        getAllSocials();
        window.location.reload();
    }

    const deleteFriend = (id) => {
        const idFriend = id;
        FriendsService.deleteFriends(idFriend).then((response) =>{
            
            console.log(response.data)
            getAllFriends();
            getAllSocials();

        }).catch(error => {
            console.log(error)
        })
        getAllFriends();
        getAllSocials();
        window.location.reload();
    }

    const getNames = (friendId) => {
        let name;
        SocialService.getSocialById(friendId).then((response)=>{
            name = (response.data.firstName)
        }).catch(error => {
            console.log(error)
        })
        return <span> {name} </span>;
    }

  return (
    <div>
        <span> Your Friends: </span>
        {
            friends.map((friend) => {
                return <div> 
                    {friend.fullName}
                    <button onClick = {() => deleteFriend(friend.friends.id)}> Delete Friend</button>
                </div>
            })
        }
        <br></br>
        <span> Add Friend: </span>
        {
            socials.map((social) => {
                return <div>
                    {social.firstName} {social.lastName}{social.id}
                    <button onClick = {() => saveFriend(social.id)}> Add Friend </button>
                </div>
            })
        }
        <br></br>
        <Link to = {`/homepage/${id}`}>
            <button> Back </button>
        </Link>
    </div>
  )
}

export default Friends