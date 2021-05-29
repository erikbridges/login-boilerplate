import React from 'react';
import PhoneInput from 'react-phone-input-2'

export default function Forgot() {
    const [state, setState] = useState({
        phone: "",
        account: false
      })
    return (
        <div>
            <div>
                <div>
                    <h2>Forgot password</h2>
                    <p>Please enter the phone number associated with the account and we will send you a code to reset your password.</p>
                </div>
                <form>
                    <div>
                        <label>Phone number</label>
                        <PhoneInput
                            country={'us'}
                            value={state.phone}
                            onChange={phone => setState({ ...state, phone })}
                            
                            />
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
  );
}

// Dev Notes:
// Grab the id of the associated account using localStorage and change state to account found.
// Change the password and confirm it don't forget to use reCaptcha to verify it.