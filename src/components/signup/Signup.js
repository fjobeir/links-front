import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

const Signup = () => {
    const navigate = useNavigate()
    const nameRef = useRef()
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const signup = async () => {
        const name = nameRef.current.value
        const username = usernameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const response = await fetch('http://localhost:3000/users/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                username,
                email,
                password
            })
        })
        const userRegistered = await response.json()
        if (userRegistered.success) {
            // redirect to sign in
            navigate('/signin')
        } else {
            window.alert(userRegistered.messages)
        }
    }
    return (
        <div id="signup">
            <h2>Please fill the form below</h2>
            <div className='mt-3'>
                <input type='text' ref={nameRef} className='form-control' placeholder='Name' />
            </div>
            <div className='mt-3'>
                <input type='text' ref={usernameRef} className='form-control' placeholder='Username' />
            </div>
            <div className='mt-3'>
                <input type='email' ref={emailRef} className='form-control' placeholder='Email' />
            </div>
            <div className='mt-3'>
                <input type='password' ref={passwordRef} className='form-control' placeholder='Password' />
            </div>
            <div className='mt-3'>
                <input onClick={signup} type='button' value='Sign Up' className='btn btn-primary' />
            </div>
        </div>
    )
}

export default Signup