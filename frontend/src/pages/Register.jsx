import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa"
import {useSelector, useDispatch} from 'react-redux'
import { register, reset} from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	})

	const {name, email, password, password2} = formData

	const navigate = useNavigate()

	const dispatch = useDispatch()

	const {users, isError, isSuccess, isLoadiing, message} = useSelector( state => state.auth)

	useEffect(() => {
		//Error message 
		if(isError) {
			toast.error(message)
		}

		//Redirect when logged in
		if(isSuccess || users) {
			toast.success(message)
			navigate('/')
		}

		// dispatch(reset())

	}, [isError, isSuccess, message, users, dispatch, navigate])

	const onChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value
	}))
	}

	const onSubmit = (e) => {
		e.preventDefault()

	if(password !== password2) {
		toast.error('Password does not match')
	} else {
		const userData = {
			name,
			email,
			password
		}

		dispatch(register(userData))
	}

}
	
	if(isLoadiing) 
		{ <Spinner /> }
	 
		return (
	  <>
	  <section className="heading">
		<h1 className="">
			<FaUser /> Register
		</h1>
		<p>Please Create an Account</p>
	  </section>
	  <section className="form">
		<form onSubmit={onSubmit}>
			<div className="form-group">
				<input type="text"
				className="form-control"
				id="name"
				value={name}
				name="name" 
				onChange={onChange}
				placeholder="Enter your name"
				required/>
			</div>
			<div className="form-group">
				<input type="text"
				className="form-control"
				id=""
				value={email}
				name="email" 
				onChange={onChange}
				placeholder="Enter your email"
				required/>
			</div>
			<div className="form-group">
				<input type="text"
				className="form-control"
				id="password"
				value={password}
				name="password" 
				onChange={onChange}
				placeholder="Enter your password"
				required/>
			</div>
			<div className="form-group">
				<input type="text"
				className="form-control"
				id="password2"
				value={password2}
				name="password2" 
				onChange={onChange}
				placeholder="Confirm Your Password"
				required/>
			</div>

			<div className="form-group">
				<button
				type="submit" 
				className="btn btn-block">
					Sumbit
				</button>
			</div>
		</form>
	  </section>
		  
	  </>
	)
  }
  
  export default Register