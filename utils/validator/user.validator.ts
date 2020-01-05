export const validateUsername = (name: string): boolean =>
    !!name.match('/^w{5,}$/g');

export const validatePassword = (password: string): boolean =>
    !!password.match('/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g');
