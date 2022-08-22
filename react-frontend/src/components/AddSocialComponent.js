import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useHistory, useParams} from 'react-router-dom'
import SocialService from '../services/SocialService'


const AddSocialComponent = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [emailId, setemailId] = useState('')
  const [password, setpassword] = useState('')
  const history = useHistory();
  const {id} = useParams();
  
  const saveOrUpdateSocial = (e) => {
      e.preventDefault();

    const social = {firstName, lastName, emailId, password}

    if(id){
        SocialService.updateSocial(id, social).then((response) => {
            history.push('/socials')
        }).catch(error =>{
            console.log(error);
        })
    }else{

        SocialService.createSocial(social).then((response)=>{

            console.log(response.data)
    
            history.push('/socials');
    
        }).catch(error => {
            console.log(error)
        })
    }
    

  }

  useEffect(() => {

    SocialService.getSocialById(id).then((response) => {
        setFirstName(response.data.firstName)
        setlastName(response.data.lastName)
        setemailId(response.data.emailId)
        setpassword(response.data.password)
    }).catch(error => {
        console.log(error)
    })

  }, [])
  
  const title = () => {
      if(id){
          return <h2 className = "text-center"> Update Social </h2>
      }else{
          return <h2 className = "text-center"> Add Social </h2>
      }
  }

  return (
    <div>
        <br/><br/>
        <div className = "container">
            <div className = "row">
                <div className = "card col-md-6 offset-md-3 offset-md-3">
                    {
                        title()
                    }
                    <div className = "card-body">
                        <form>
                            <div className = "form-group mb-2">
                                <label className = "form-label"> First name :</label>
                                <input
                                    type = "text"
                                    placeholder = "Enter first name"
                                    name = "firstName"
                                    className = "form-control"
                                    value = {firstName}
                                    onChange = {(e) => setFirstName(e.target.value)}
                                > 
                                </input>
                            </div>

                            <div className = "form-group mb-2">
                                <label className = "form-label"> Last name :</label>
                                <input
                                    type = "text"
                                    placeholder = "Enter last name"
                                    name = "lastName"
                                    className = "form-control"
                                    value = {lastName}
                                    onChange = {(e) => setlastName(e.target.value)}
                                > 
                                </input>
                            </div>
                            <div className = "form-group mb-2">
                                <label className = "form-label"> Email Id :</label>
                                <input
                                    type = "text"
                                    placeholder = "Enter email Id"
                                    name = "emailId"
                                    className = "form-control"
                                    value = {emailId}
                                    onChange = {(e) => setemailId(e.target.value)}
                                > 
                                </input>
                            </div>
                            <div className = "form-group mb-2">
                                <label className = "form-label"> Password: </label>
                                <input
                                    type = "text"
                                    placeholder = "Enter password"
                                    name = "password"
                                    className = "form-control"
                                    value = {password}
                                    onChange = {(e) => setpassword(e.target.value)}
                                > 
                                </input>
                            </div>
                            <button className = "btn btn-success" onClick = {(e) => saveOrUpdateSocial(e)}> Submit</button>
                            <Link to = "/socials" className = "btn btn-danger"> Cancel </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddSocialComponent