import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'


function NewTicket() {
	const {users} = useSelector((state) => state.auth)
	const {isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)

	const [name] = useState(users.name)
	const [email] = useState(users.email)
	const [product, setProduct] = useState('Redmi')
	const [description, setDescription] = useState('')

	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		if(isError) {
			toast.error(message)
		}

		if(isSuccess) {
			dispatch(reset())
			navigate('/tickets')
		}
	}, [isError, isSuccess, dispatch, navigate, message])

	const onSubmit = (e) => {
		e.preventDefault()

		dispatch(createTicket({product, description}))
	}

	if(isLoading) {
		return <Spinner />
	}

  return (
	<>
	<BackButton url='/' />
	<section className='heading'>
		<h1>New Ticket</h1>
		<p>Please fill out the form below</p>
	</section>

	<section className='form'>
		<div className="form-group">
			<label htmlFor="name">Customer Name</label>
			<input type="text"
			 className="form-control"
			 value={name}
			 disabled />
		</div>
		<div className="form-group">
			<label htmlFor="name">Customer Email</label>
			<input type="text"
			 className="form-control"
			 value={email}
			 disabled />
		</div>

		<form className='form-group' onSubmit={onSubmit}>
			<label htmlFor="product">Product</label>
			<select name="product" 
			 id="product"
			 value={product}
			 onChange={(e) => setProduct(e.target.value)}>
				<option value="redmi">Redmi</option>
				<option value="realme">realme</option>
				<option value="Smart-watch">Smart-watch</option>
				<option value="xiaomi">Xiaomi</option>
			</select>
			<div className="form-group">
				<label htmlFor="description">Description of the issue</label>
				<textarea 
				 name="description" 
				 id="description" 
				 className='form-control'
				 placeholder='Description'
				 value={description}
				 onChange={(e) => setDescription(e.target.value)}></textarea>
				<div className="form-group">
					<button className="btn btn-block">
						Submit
					</button>
				</div>
			</div>
		</form>
	</section>
	</>
  )
}

export default NewTicket