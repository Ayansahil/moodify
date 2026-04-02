import React from 'react'
import './MoodCards.scss'

const CARDS = [
    { 
        title: 'Morning Sun',   
        desc: 'Vibrant energy to start', 
        posterUrl: 'https://ik.imagekit.io/0cef4ey58/cohort-2/moodify/posters/morning_sun.jpg' 
    },
    { 
        title: 'Synth Wave',    
        desc: 'Retro futuristic beats',  
        posterUrl: 'https://ik.imagekit.io/0cef4ey58/cohort-2/moodify/posters/synth_wave.jpg' 
    },
    { 
        title: 'Midnight City', 
        desc: 'Deep house and chill',    
        posterUrl: 'https://ik.imagekit.io/0cef4ey58/cohort-2/moodify/posters/midnight_city.jpg' 
    },
    { 
        title: 'Soul Echo',     
        desc: 'Warm R&B and soul',       
        posterUrl: 'https://ik.imagekit.io/0cef4ey58/cohort-2/moodify/posters/soul_echo.jpg' 
    },
]

const MoodCards = () => {
    return (
        <section className="mood-cards">
            <div className="mood-cards__header">
                <h2 className="mood-cards__title">Made for your mood</h2>
                <button className="btn btn--text">View All</button>
            </div>
            <div className="mood-cards__scroll hide-scrollbar">
                {CARDS.map((card) => (
                    <div key={card.title} className="mood-card">
                        <div className="mood-card__thumb">
                            {card.posterUrl 
                                ? <img src={card.posterUrl} alt={card.title} className="mood-card__img" />
                                : <div className="mood-card__thumb-placeholder" />
                            }
                            <div className="mood-card__play-overlay">
                                <div className="mood-card__play-btn">
                                    <span className="material-symbols-outlined">play_arrow</span>
                                </div>
                            </div>
                        </div>
                        <h3 className="mood-card__name">{card.title}</h3>
                        <p className="mood-card__desc">{card.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MoodCards