import React, {useEffect, useState} from 'react'
import SignUpPage from './SignUpPage'
import SocialService from '../services/SocialService'
import { Link, useHistory, useParams } from 'react-router-dom'




const HomePage = () => {
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [emailId, setemailId] = useState('')
    const [password, setpassword] = useState('')
    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        SocialService.getSocialById(id).then((response) => {
            setfirstName(response.data.firstName)
            setlastName(response.data.lastName)
            setemailId(response.data.emailId)
            setpassword(response.data.password)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const deleteSocial = () => {
        SocialService.deleteSocial(id).then((response) => {
            setfirstName(response.data.firstName)
            setlastName(response.data.lastName)
            setemailId(response.data.emailId)
            setpassword(response.data.password)
        }).catch(error => {
            console.log(error)
        })
    }

    const handleFeed = () => {
        history.push(`/feed/${id}`)
    }

    const handleFriends = () => {
        history.push(`/friends/${id}`)
    }

  return (
    <div>
        <th> Account Info </th>
        <tb> First Name:  {firstName} </tb>
        <br></br>
        <tb> Last Name:  {lastName} </tb>
        <br></br>
        <tb> Email:  {emailId} </tb>
        <br></br>
        <tb> Password: {password} </tb>
        <br></br>
        <Link to = "/">
            <button> Log Out </button>
        </Link>
        <Link to = "/">
            <button className = "btn btn-danger" onClick = {() => deleteSocial(id)} style = {{marginLeft:"10px"}}> Delete </button>
        </Link>
        <button onClick = {() => handleFeed()}> Feed </button>
        <button onClick = {() => handleFriends()}> Friends </button>
    </div>
  )
}

export default HomePage