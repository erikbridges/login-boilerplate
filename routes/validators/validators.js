const validator = require("validator");
const emailValidator = require("email-validator");
const axios = require("axios");


module.exports = {
        validateEmail: async function (input) {
            // Validates Email Addresses
          const isValid = emailValidator.validate(input)
          if (!isValid) {
              return isValid
          } 
          // Check For Disposable Email Addresses if it returns true, reject the request.
          const { data } = await axios.get(`https://open.kickbox.com/v1/disposable/${input}`);

          if (data.disposable) {
              return false
          }
           
          // All Checks are good!
          return true
        },

        validateUsername: function (input) {
            /*
                * Only contains alphanumeric characters, underscore and dot.
                * Underscore and dot can't be at the end or start of a username (e.g _username / username_ / .username / username.).
                * Underscore and dot can't be next to each other (e.g user_.name).
                * Underscore or dot can't be used multiple times in a row (e.g user__name / user..name).
                * Number of characters must be between 8 to 20. 
            */
           const userValid = validator.matches(input, /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/);
           return !userValid ? false : true
        },

        validatePassword: function (input) {
            // Minimum eight - 50 characters, at least one letter, one number, and one special character
            const passValid = validator.matches(input, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/);
            console.log(input)
            return !passValid ? false : true
        },

        validatePhoneNum: function (input) {
            // Matches phone numbers including the ones for international users.
            const phoneValid = validator.matches(input, /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
  
            return !phoneValid ? false : true
        }
    }
