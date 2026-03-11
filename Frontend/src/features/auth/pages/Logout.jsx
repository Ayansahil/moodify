import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Logout = () => {
    const { handleLogout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        async function doLogout() {
            await handleLogout()
            navigate('/login')
        }
        doLogout()
    }, [])

    return null 
}

export default Logout