import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import SocialService from '../services/SocialService'

const LoginPage = () => {

  const [emailId, setEmailId] = useState('')
  const [password, setpassword] = useState('')
  const history = useHistory();
  let valid = false;

  const getEmail = (e) => {
      const social = {emailId, password}
      SocialService.loginAndReturnSocial(social).then((response) => {
          console.log(response.data.id)
          history.push(`/homepage/${response.data.id}`)
      }).catch(error => {
        console.log(error)
    })
  }

  return (
    <div>
        <th> Enter Email and Password </th>
        <form>
            <div className = "form-group mb-2">
             <label className = "form-label"> Email :</label>
                <input
                     type = "text"
                     placeholder = {"Enter Email"}
                     name = "emailId"
                     className = "form-control"
                     value = {emailId}
                     onChange = {(e) => setEmailId(e.target.value)}
                > 
                </input>
            </div>
            <div className = "form-group mb-2">
             <label className = "form-label"> Password :</label>
                <input
                     type = "text"
                     placeholder = {"Enter Password"}
                     name = "password"
                     className = "form-control"
                     value = {password}
                     onChange = {(e) => setpassword(e.target.value)}
                > 
                </input>
            </div>
        </form>
        <button className = "btn btn-success" onClick = {(e) => getEmail(e)}> Submit</button>
        <Link to = "/">
        <button> Cancel </button>
        </Link>
    </div>
  )
}

export default LoginPage