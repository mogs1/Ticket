import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { createNote, getNotes, reset as notesReset } from '../features/note/noteSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import NoteItems from '../components/NoteItems'
import { FaPlus } from 'react-icons/fa'

const customStyles = {
	content: {
		width: '600px',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		position: 'relative',
	}
}


Modal.setAppElement('#root')

function Ticket() {
	const [noteText, setNoteText] = useState('')
	const [modalIsOpen, setModalIsOpen ] = useState(false)
	
	const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)
	const {notes, isLoading: noteIsLoading } = useSelector((state) => state.notes)
	
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams()
	const {ticketId} = useParams()
	
	useEffect(() => {
		if(isError) {
			toast.error(message)
		}
		
		dispatch(getTicket(ticketId))
		dispatch(getNotes(ticketId))
		// eslint-disable-next-line
	}, [isError, message, ticketId])
	
	const onCLosedTicket = () => {
		dispatch(closeTicket())
		toast.success('Ticket closed')
		
		navigate('/tickets')
	}
	
	if(isLoading || noteIsLoading) {
		return <Spinner />
	}
	
	if(isError) {
		return <h3>Something Went Wrong</h3>
	}
	
	// pen/close modal
	const openModal = () => setModalIsOpen(true)
	const closeModal = () => setModalIsOpen(false)

	// Create Note Submit
	const onNoteSubmit = (e) => {
		e.preventDefault()

		dispatch(createNote({noteText, ticketId}))
		closeModal()
	}
	
	return (
		<div className='ticket-page'>
	<header className="ticket-header">
		<BackButton url='/tickets' />
		<h2>
			Ticket ID: {ticket._id}
			<span className={`status status-${ticket.status}`}>{ticket.status}</span>
		</h2>
		<h3>
			Date Submitted: {new Date (ticket.createdAt).toLocaleString('en-US')}
		</h3>
		<h3>Product: {ticket.product}</h3>
		<hr />
		<div className="ticket-desc">
			<h3>Description of Issue</h3>
			<p>{ticket.description}</p>
		</div>

		<h2>Notes</h2>
	</header>

	{ticket.status !== 'Closed' && (
		<button onClick={openModal} className='btn'>
			<FaPlus /> Add Note
		</button>
	)}

	<Modal isOpen={modalIsOpen} 
	onRequestClose={closeModal}
	 style={customStyles} 
	 contentLabel='Add Note'>
		<h2>Add Note</h2>
		<button className='btn-close' onClick={closeModal}>X</button>

		<form action="" onSubmit={onNoteSubmit}>
			<div className="form-group">
				<textarea
				 name="noteText" 
				 id="noteText" 
				 className='form-control' 
				 placeholder='Note text'
				 value={noteText}
				 onChange={(e) => setNoteText(e.target.value)}></textarea>
			</div>
			<div className="form-control">
				<button className="btn" type='submit'>
					Submit
				</button>
			</div>
		</form>
	</Modal>

	{notes.map((note) => (
		<NoteItems key={note._id} note={note} />
	))}

	{ticket.status !== 'Closed' && (
		<button onClick={onCLosedTicket} className='btn btn-block btn-danger'>Close Ticket</button>
	)}
	</div>
  )
}

export default Ticket