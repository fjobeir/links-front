import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import './Signin.css'

const Signin = () => {
    const appCtx = useContext(AppContext)
    console.log(appCtx)
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()
    const login = () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        fetch('http://localhost:3000/users/signin', {
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(response => {
            response.json().then(loggedIn => {
                if (loggedIn.success) {
                    window.localStorage.setItem('token', loggedIn.token)
                    appCtx.setToken(loggedIn.token)
                    navigate('/me')
                } else {
                    window.alert(loggedIn.messages)
                }
            })
        }).catch(e => console.log(e))
    }
    return <div id="login">
        <h2>Please Sign In</h2>
        <div className='mt-3'>
            <input type='email' ref={emailRef} className='form-control' placeholder='Email' />
        </div>
        <div className='mt-3'>
            <input type='password' ref={passwordRef} className='form-control' placeholder='Password' />
        </div>
        <div className='mt-3'>
            <input onClick={login} type='button' value='Sign In' className='btn btn-primary' />
        </div>
    </div>
}

export default Signin