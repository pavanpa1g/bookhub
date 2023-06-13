import {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {backgroundColor} from '../CssConstants/constants'
/* eslint-disable prettier/prettier */

import './index.css'

const Login = (props) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg,SetErrorMsg]  = useState('')
    const [error,setError] = useState(false)
    const [returnHome,setReturnHome]  = useState(false)


    useEffect(()=>{
        const jwtToken = Cookies.get('jwt_token')
        if(jwtToken !== undefined){
            setReturnHome(true)
        }
    },[])

    if(returnHome){
        return <Redirect to='/' />
    }

    const successFullLogin=(jwtToken)=>{
        const {history}= props
        Cookies.set('jwt_token',jwtToken,{expires:30,path:'/'})
        console.log(history)
        history.replace('/')
    }

    const onLogin = async (event)=>{
        event.preventDefault()
        
        const api = 'https://apis.ccbp.in/login'

        const userData = {
            username,
            password
        }

        const payload = {
            method:'POST',
            body:JSON.stringify(userData)
        }

        const response = await fetch(api,payload)
        const data = await response.json()

        if (response.ok){
            successFullLogin(data.jwt_token)
        }else{
            setError(true)
            SetErrorMsg(data.error_msg)
        }
        console.log(data)
    }


    const onUserNameChange = (event) => {
        setUserName(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div style={{ backgroundColor }} className='bg-container'>
            <img src='https://res.cloudinary.com/dlafvsqxz/image/upload/v1686305807/Rectangle_1467_vpttbk.png'
                className="image"
                alt='login website logo' />
            <form className='input-container' onSubmit={onLogin}>
                <div className='input-box-container'>
                    <img src='https://res.cloudinary.com/dlafvsqxz/image/upload/v1686312164/Group_7731_kozlt5.png'
                        alt='website login'
                        className='logo'
                    />
                    <label htmlFor='username' className='text'>Username*</label>
                    <input 
                        id='username' 
                        type='text' 
                        onChange={onUserNameChange} 
                        value={username} 
                        className='input'
                        placeholder='rahul' />
                    <label htmlFor='password' className='text'>Password*</label>
                    <input 
                        id='password' 
                        type='password' 
                        onChange={onPasswordChange} 
                        value={password} 
                        className='input'
                        placeholder='rahul@2021' />
                    {error &&
                    <p className='error'>{errorMsg}</p>
                    }
                    
                    <button type='submit' className='button'>Login</button>
                </div>
            </form>
        </div>
    )
}
export default Login