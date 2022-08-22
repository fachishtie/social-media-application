import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [color1, setColor1] = useState("#00BFFF")
  const [color2, setColor2] = useState("#00BFFF")

  return (
    <div>
        <div style = 
        {{marginTop: "25px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center"}}>
            <Link 
            to = '/signup' 
            style = 
            {{textDecoration: "none"}}>
                <button 
                style = 
                {{ 
                backgroundColor: `${color1}`,
                }}
                onMouseEnter={() => setColor1("#0066AC")}
                onMouseLeave={() => setColor1("#00BFFF")}>
                    Sign Up
                </button>
            </Link>
        </div>
        <div style = 
        {{marginTop: "25px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center"}}>
            <Link 
            to = '/loginpage'
            style = 
            {{textDecoration: "none"}}>
                <button 
                style = 
                {{
                backgroundColor: `${color2}`,
                }}
                onMouseEnter={() => setColor2("#0066AC")}
                onMouseLeave={() => setColor2("#00BFFF")}>
                    Login
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Login