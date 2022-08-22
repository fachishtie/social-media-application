import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import SocialService from '../services/SocialService'

const ListSocialComponent = () => {
  
  const [socials, setSocials] = useState([])  

  useEffect(() => {
    getAllSocials();
  }, [])
  
  const getAllSocials = () => {
    SocialService.getAllSocials().then((response) => {
        setSocials(response.data)
        console.log(response.data)
    }).catch(error => {
        console.log(error);
    })
  }

  const deleteSocial = (socialId) => {
      SocialService.deleteSocial(socialId).then((response) => {
      getAllSocials();

      }).catch(error => {
          console.log(error);
      })
  }

  return (
    <div className = "container">
        <h2 className = "text-center"> List Socials</h2>
        <Link to = "/add-social" className = "btn btn-primary mb-2" >Add Social</Link>
        <table className = "table table-bordered table-striped">
            <thead>
                <th> First Name </th>
                <th> Last Name </th>
                <th> Email Id </th>
                <th> Password</th>
                <th> Actions </th>
            </thead>
            <tbody>
                {
                    socials.map(
                        social =>
                        <tr key = {social.id}>
                            <td> {social.firstName}</td>
                            <td> {social.lastName}</td>
                            <td> {social.emailId}</td>
                            <td> {social.password} </td>
                            <td>
                                <Link className = "btn btn-info" to = {`/edit-social/${social.id}`}> Update </Link>
                                <button className = "btn btn-danger" onClick = {() => deleteSocial(social.id)} style = {{marginLeft:"10px"}}> Delete </button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListSocialComponent