import React, { Fragment } from 'react';
import { Link } from 'wouter';
import "./CSS/index.styl";

export default function Login() {
  return (
        <div className="login">
            <div className="triple-spinner" />

            <form className="login-form">
                <div className="login-title">
                    <h2>Login</h2>
                </div>
                <div className="login-wrapper">
                    <label>Username</label>
                    <input type="text" placeholder="username" />
                </div>
                <div className="login-wrapper">
                    <label>Password</label>
                    <input type="text" placeholder="password" />
                </div>
                <div className="login-buttons">
                    <a id="btn-style">Login</a>
                    <Link to="/register"> Not a member? Sign Up </Link>            
                </div>
                <div className="login-buttons">
                    <a>Forgot Password</a>
                </div>
            </form>
        </div>
  );
}
