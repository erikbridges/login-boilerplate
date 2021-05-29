import React from 'react';

export default function Settings() {
  return (
    <div>
        <h1>Settings</h1>
        <div>
            <label htmlFor="">Change Username</label>
            <input />
        </div>
        <div>
            <label htmlFor="">Change Password</label>
            <input />
        </div>
        <div>
            <label htmlFor="">Change Phone</label>
            <input />
        </div>
        <button>Save</button>
    </div>
  );
}

// All changes must be verified using a 6 digit code that was sent through the user's phone via sms
// Recaptcha the saved data to block any potential botting.

// Grab current data and fill the inputs up. When a change is found, update it.