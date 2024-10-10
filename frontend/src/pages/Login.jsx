import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import { FaSignInAlt } from "react-icons/fa"
import {useSelector, useDispatch} from 'react-redux'
import { login, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Register() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const {users, isError, isSuccess, isLoading, message} = useSelector(state => state.auth)

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

	const { email, password } = formData

	const onChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value
	}))
	}

	const onSubmit = (e) => {
		e.preventDefault()

		const useData = {
			email,
			password
		}

		dispatch(login(useData))
	}

	
	if(isLoading) {
		return <Spinner />
	}

	return (
	  <>
	  <section className="heading">
		<h1 className="">
			<FaSignInAlt /> Register
		</h1>
		<p>Please Login in to Get Support</p>
	  </section>
	  <section className="form">
		<form onSubmit={onSubmit}>
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