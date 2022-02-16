import { useState } from "react"
import React from "react"
import {FaSignInAlt} from 'react-icons/fa'

function Login(){
        const [formData, setFormData] = useState({
                email    :"",
                password :"",
        })
        const { email, password} = formData;

        const onChange = (e) =>{
                setFormData((prevState)=>({
                        ...prevState,
                        [e.target.name]:e.target.value,
                }))
        }

        const onSubmit = (e)=>{
                e.preventDefault()
        }
        return (<>
        <section className="heading">
                <h1><FaSignInAlt/> Login</h1>
                <p>Log in your account</p>
        </section>
        <section className="form">
                <form onSubmit={onSubmit}>
                
                {/* Email */}
                     <div className="form-group">
                        <input 
                        type="email"
                        className="form-control" 
                        id="email" 
                        name="email"
                        value={email} 
                        placeholder="Enter your email"
                        onChange={onChange} />
                     </div>
                {/* Password */}
                     <div className="form-group">
                        <input 
                        type="password"
                        className="form-control" 
                        id="password" 
                        name="password"
                        value={password} 
                        placeholder="Enter new password"
                        onChange={onChange} />
                     </div>
                
                <div className="form-group">
                        <button type="submit" className="btn btn-block">Login</button>
                </div>
                </form>
        </section>
        </>)
}
export default Login