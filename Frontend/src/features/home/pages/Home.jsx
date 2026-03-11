import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import { useSong } from '../hooks/useSong'
import Player from '../components/Player'
import { useAuth } from '../../auth/hooks/useAuth'
import { useNavigate } from 'react-router'
import '../../shared/styles/home.scss'

const Home = () => {

    const { handleGetSong } = useSong()
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    async function onLogout() {
        await handleLogout()
        navigate('/login')
    }

    return (
        <main className="home-page">
            <header className="home-header">
                <span className="home-header__username">{user?.username}</span>
                <button className="home-header__logout" onClick={onLogout}>
                    Logout
                </button>
            </header>

            <FaceExpression
                onClick={(expression) => { handleGetSong({ mood: expression }) }}
            />
            <Player />
        </main>
    )
}

export default Home