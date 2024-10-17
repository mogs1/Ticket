import axios from "axios";

const API_URL = 'https://client-server-ticket.onrender.com/api/tickets/'


// Create Note ticket
const createNote = async (noteText, ticketId, token ) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	const response = await axios.post(API_URL + ticketId + '/notes',
		{
			text: noteText,
		},
		 config)

	return response.data
}

//Get user ticket
const getNotes = async (ticketId, token ) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	}

	const response = await axios.get(API_URL + ticketId + '/notes', config)

	return response.data
}

const noteService = {
	getNotes,
	createNote,
}

export default noteService