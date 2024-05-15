export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;

};

export const isStaff = () => {
    return localStorage.getItem('isStaff') === 'true';
};

export  const isOperator = () => {
    return localStorage.getItem('isOperator') === 'true';
}


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isStaff');
    localStorage.removeItem('isOperator');
    window.location.href = '/';
};

