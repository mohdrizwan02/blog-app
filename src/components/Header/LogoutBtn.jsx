import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/AuthService'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = ()=>{

        authService.logout().then((response)=>{
            if(response.success){
                dispatch(logout())
                localStorage.removeItem('user')
                console.log('logged out')
                navigate('/login')

            }
        })

       
    }

  return (
    <button onClick={handleLogout} >
        Logout
    </button>
  )
}

export default LogoutBtn