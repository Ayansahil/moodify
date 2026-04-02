import React, { useState } from 'react'
import { useSong } from '../hooks/useSong'
import { useAuth } from '../../auth/hooks/useAuth'
import { useNavigate } from 'react-router'

// Components
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import HeroSection from '../components/HeroSection'
import MoodCards from '../components/MoodCards'
import RecommendedSongs from '../components/RecommendedSongs'
import PlayerBar from '../components/PlayerBar'
import BottomNav from '../components/BottomNav'
import FaceExpression from '../../Expression/components/FaceExpression'

import '../../shared/styles/home.scss'

const Home = () => {
    const { song, handleGetSong } = useSong()
    const { user, handleLogout } = useAuth()
    const [mood, setMood] = useState('')
    const navigate = useNavigate()

    async function onLogout() {
        await handleLogout()
        navigate('/login')
    }

    const onMoodDetected = (detectedMood) => {
        setMood(detectedMood)
        handleGetSong({ mood: detectedMood })
    }

    return (
        <div className="home-dashboard">
            {/* Sidebar - Desktop only */}
            <Sidebar mood={mood} />

            <div className="home-dashboard__main">
                <Header 
                    mood={mood} 
                    user={user} 
                    onLogout={onLogout} 
                />

                <main className="home-dashboard__content">
                    <div className="home-dashboard__scroll-area hide-scrollbar">
                        <HeroSection 
                            mood={mood} 
                            onPlay={() => { if(mood) handleGetSong({ mood }) }} 
                        />
                        
                        <div className="home-dashboard__view">
                            <MoodCards />
                            
                            {/* Recommended Content */}
                            <RecommendedSongs currentSong={song} />

                            {/* Popular Artists - UI Placeholder */}
                            <section className="dashboard-section">
                                <div className="dashboard-section__header">
                                    <h2 className="dashboard-section__title">Popular Artists</h2>
                                    <button className="btn btn--text">View All</button>
                                </div>
                                <div className="dashboard-section__grid">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="artist-card">
                                            <div className="artist-card__avatar" />
                                            <div className="artist-card__info">
                                                <p className="artist-card__name">Artist Name {i}</p>
                                                <p className="artist-card__listeners">3.1M Listeners</p>
                                            </div>
                                            <button className="btn btn--text">
                                                <span className="material-symbols-outlined">more_horiz</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Recent Albums - UI Placeholder */}
                            <section className="dashboard-section">
                                <div className="dashboard-section__header">
                                    <h2 className="dashboard-section__title">Recent Albums</h2>
                                    <button className="btn btn--text">Show All</button>
                                </div>
                                <div className="dashboard-section__albums">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="album-card">
                                            <div className="album-card__poster" />
                                            <p className="album-card__title">Album Title {i}</p>
                                            <p className="album-card__artist">Artist {i}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            
                        </div>

                        {/* Mood Scanner Container - Now at the very bottom */}
                        <section className="mood-scanner-section">
                            <div className="mood-scanner-section__header">
                                <h2 className="mood-scanner-section__title">AI Mood Scanner</h2>
                                <p className="mood-scanner-section__subtitle">Detecting your vibe in real-time</p>
                            </div>
                            <div className="mood-scanner-section__body">
                                <FaceExpression onClick={onMoodDetected} />
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* Bottom Player */}
            <PlayerBar song={song} />
            <BottomNav />
        </div>
    )
}

export default Home