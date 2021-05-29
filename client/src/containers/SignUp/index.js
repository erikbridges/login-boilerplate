import React, {useState} from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import "./CSS/index.styl";
import { Link } from "wouter";

export default function SignUp() {
  const [state, setState] = useState({
    phone: "",
    verifyUser: false
  })
  return (
    <div className="register">
      <div className="triple-spinner" />
       <div className="register-box">
         <div className="register-dialog">
            <h2>Sign Up</h2>
            <p>Please enter your details here.</p>
            <div className="error-box"></div>
         </div>
         <form className="register-form">
            <div className="register-input-wrap">
                <label>Username</label>
               <input placeholder="username" />
            </div>
            <div className="register-input-wrap">
              <label>Email</label>
               <input placeholder="email" />
            </div>
            <div className="register-input-wrap">
            <label>Phone number</label>
              <PhoneInput
                  country={'us'}
                  value={state.phone}
                  onChange={phone => setState({ ...state, phone })}
                  
                />
            </div>
            <div className="register-input-wrap">
            <label>Password</label>
               <input placeholder="password" type="password" />
            </div>
            <div className="register-btn-wrap">
              <a>Sign Up</a>
              <Link to="/">Already a user?</Link>
            </div>
         </form>
       </div>
    </div>
  );
}

// 3 Simple Step Process
// Fill out information
// Verify The User (Change State to Verify User with Recaptcha)
// Recaptcha
// Done. ^_^