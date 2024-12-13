
const Logout = () => {
    localStorage.removeItem('token'); // Xóa token
    window.location.href = '/home';
};

export default Logout;