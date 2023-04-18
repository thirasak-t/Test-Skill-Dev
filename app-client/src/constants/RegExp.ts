const usernameRegExp = /^[A-Za-z0-9_]{4,12}$/;

const passwordRegExp = /^(?=.*[0-9a-zA-Z])[0-9a-zA-Z_\-\+\\\/!@#\$%\^&\*]{6,}$/;

export { usernameRegExp, passwordRegExp };
