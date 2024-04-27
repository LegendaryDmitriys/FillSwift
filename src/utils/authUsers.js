export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;

};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
};

// export const checkTokenExpiration = () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         const decodedToken = JSON.parse(atob(token.split('.')[1]));
//         console.log(decodedToken)
//         const expirationTime = decodedToken.exp * 1000;
//         console.log(expirationTime)
//         const currentTime = new Date().getTime();
//         if (currentTime > expirationTime) {
//
//             localStorage.removeItem('token');
//         }
//     }
// };