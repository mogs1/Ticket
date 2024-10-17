import axios from 'axios'

const API_URL = 'https://client-server-ticket.onrender.com/api/users'

// Register user
const register = async (userData) => {
	const response = await axios.post(API_URL, userData)

	if(response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}
	return response.data
}

const login = async (userData) => {
	const response = await axios.post(`${API_URL}/login`, userData)

	if(response.data) {
		localStorage.setItem('user', JSON.stringify(response.data))
	}
	return response.data
}

// logout User
const logout = () => localStorage.removeItem('user')

const authService = {
	register,
	login,
	logout
}

export default authService