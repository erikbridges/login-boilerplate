import React from 'react';
import "./CSS/index.styl";
import { Link } from "wouter";

function Index() {
  return (
    <div className="verify">
      <div className="verify-box">
        <div className="verify-info">
          <h1>Verify</h1>
          <p>Please enter the verification code that was sent through your phone number. </p>
        </div>
        <div className="verify-input">
          <input type="text"/>
        </div>
        <div className="verify-buttons">
          <a id="btn-theme">Submit</a>
          <a>Resend Code</a>
        </div>
        <div className="verify-buttons">
          <Link to="/">Go Back</Link>
        </div>
      </div>  
    </div>
  );
}
export default Index;
