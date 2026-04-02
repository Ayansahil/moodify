import React from 'react'
import './HeroSection.scss'

const MOOD_META = {
    happy:     { label: 'Happy Vibes',   desc: 'Based on your facial analysis, we\'ve curated an upbeat selection of high-energy tracks.', emoji: '😊' },
    sad:       { label: 'Melancholy Mix',desc: 'Soulful tracks that understand your mood and offer comfort.',                       emoji: '😢' },
    angry:     { label: 'Power Mode',    desc: 'Intense beats to channel your fire into pure productivity.',                      emoji: '😠' },
    surprised: { label: 'Wow Factor',    desc: 'Unexpected sounds for unexpected moments of discovery.',                           emoji: '😲' },
    neutral:   { label: 'Chill Zone',    desc: 'Balanced tracks for a calm and focused mind.',                                      emoji: '😐' },
}

const HeroSection = ({ mood, onPlay }) => {
    const meta = MOOD_META[mood] || MOOD_META.neutral

    return (
        <section className={`hero hero--${mood || 'neutral'}`}>
            <div className="hero__bg-gradient" />
            <div className="hero__content">
                <div className="hero__mood-chip">
                    CURRENT MOOD: {mood?.toUpperCase() || 'SCANNING'}
                </div>
                <h1 className="hero__title">{meta.label}</h1>
                <p className="hero__desc">{meta.desc}</p>
                <div className="hero__actions">
                    <button className="btn btn--primary" onClick={onPlay}>
                        <span className="material-symbols-outlined">play_arrow</span>
                        PLAY NOW
                    </button>
                    <button className="btn btn--ghost">VIEW MIX</button>
                </div>
            </div>
        </section>
    )
}

export default HeroSection