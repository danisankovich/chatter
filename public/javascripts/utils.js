import {EOL as eol} from 'os';
module.exports = {
  // checks password on signup to make sure if follws standards (lowercase, uppercase, number, length)
  invalidPasswordCheck: (password, passwordConfirm) => {
    let errorString = '';

    if (password.length < 3) {
      errorString = `${errorString}Password Must Be At Least 3 Characters Long${eol}`
    }
    if (!password.match(/[a-z]/g)) {
      errorString = `${errorString}Password Must Contain At Least 1 Lower Case Letter${eol}`
    };
    if (!password.match(/[A-Z]/g)) {
      errorString = `${errorString}Password Must Be At Least 1 Upper Case Letter${eol}`
    }
    if (!password.match(/[0-9]/g)) {
      errorString = `${errorString}Password Must Be At Least 1 Number${eol}`
    }
    if (password !== passwordConfirm) {
      errorString = `${errorString}Passwords Do Not Match${eol}`
    }

    return errorString;
  }
}
