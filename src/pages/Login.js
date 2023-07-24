import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Axios from 'axios'
import Swal from 'sweetalert'

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        if (token) navigate('/dashboard')
        document.title = 'Web Challange - Sign In'
    }, [])
    
    const handler = async (e) => {
        e.preventDefault()

        if (username !== '' && password !== '' ) {

            const payload = {
                username : username,
                password : password
            }

            await Axios.post(`https://dummyjson.com/auth/login`, payload)
            .then((response) => {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                navigate('/dashboard')
            })
            .catch((error) => {
                console.error(error)
                Swal("Sorry!", "User Id atau Password salah!", "error")
            })
        } else {
            Swal("Info!", "User Id atau Password kosong!", "info")
        }
    }

    return (
        <div>
            <div className='header'>
                <div>
                    <img src={window.env.PUBLIC_URL + '/header-login.png'} />
                </div>
                <div className='logo'>
                    <img src={window.env.PUBLIC_URL + '/logo.png'} style={{ width: '65%' }} />
                </div>
            </div>
            <div className='container-login'>
                <div className='login'>
                    <div className='login-header'>
                        <strong style={{fontSize : 25}}>Login</strong><br/>
                        <small style={{fontSize : 15}}>Please sign to continue</small>
                    </div>
                    <form onSubmit={handler}>
                        <div className='login-content'>
                            <div className='form-container-input'>
                                <label style={{fontSize : 15}}>User ID</label>
                                <input type='text' className='form-input' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='User ID'/>
                            </div>
                            <div className='form-container-input'>
                                <label style={{fontSize : 15}}>Password</label>
                                <input type='password' className='form-input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                            </div>
                            <div className='form-container-submit'>
                                <button type='submit' className='btn-submit'>Login</button>
                            </div>
                        </div>
                    </form>
                    <div className='login-footer'>
                        <small style={{fontSize : 15}}>Dont't have an account?</small>
                        <small style={{fontSize : 15, color : 'red'}}> Sign Up</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login