import React, { useState, useRef, useEffect } from 'react'
import './PlayerBar.scss'

const PlayerBar = ({ song }) => {
    const [playing, setPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioRef = useRef(null)

    useEffect(() => {
        if (song?.url && audioRef.current) {
            audioRef.current.src = song.url
            audioRef.current.play().catch(() => {})
            setPlaying(true)
        }
    }, [song?.url])

    function togglePlay() {
        if (!audioRef.current) return
        if (playing) { audioRef.current.pause(); setPlaying(false) }
        else { audioRef.current.play(); setPlaying(true) }
    }

    function onTimeUpdate() {
        const a = audioRef.current
        if (!a) return
        setCurrentTime(a.currentTime)
        setDuration(a.duration || 0)
        setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0)
    }

    function onSeek(e) {
        const rect = e.currentTarget.getBoundingClientRect()
        const pct = (e.clientX - rect.left) / rect.width
        if (audioRef.current) audioRef.current.currentTime = pct * (audioRef.current.duration || 0)
    }

    function fmt(s) {
        if (!s || isNaN(s)) return '0:00'
        const m = Math.floor(s / 60)
        const sec = Math.floor(s % 60)
        return `${m}:${sec.toString().padStart(2, '0')}`
    }

    return (
        <div className="player-bar">
            <audio ref={audioRef} onTimeUpdate={onTimeUpdate} onEnded={() => setPlaying(false)} />

            {/* Info */}
            <div className="player-bar__info">
                <div className="player-bar__thumb">
                    {song?.posterUrl
                        ? <img src={song.posterUrl} alt={song.title} />
                        : <div className="player-bar__thumb-placeholder" />
                    }
                </div>
                <div className="player-bar__meta">
                    <p className="player-bar__title">{song?.title || 'No song playing'}</p>
                    <p className="player-bar__mood">{song?.mood || '—'}</p>
                </div>
                <button className="player-bar__fav">
                    <span className="material-symbols-outlined">favorite</span>
                </button>
            </div>

            {/* Controls */}
            <div className="player-bar__controls">
                <div className="player-bar__buttons">
                    <button className="player-bar__ctrl-btn">
                        <span className="material-symbols-outlined">shuffle</span>
                    </button>
                    <button className="player-bar__ctrl-btn">
                        <span className="material-symbols-outlined">skip_previous</span>
                    </button>
                    <button className="player-bar__play-btn" onClick={togglePlay}>
                        <span className="material-symbols-outlined">
                            {playing ? 'pause' : 'play_arrow'}
                        </span>
                    </button>
                    <button className="player-bar__ctrl-btn">
                        <span className="material-symbols-outlined">skip_next</span>
                    </button>
                    <button className="player-bar__ctrl-btn">
                        <span className="material-symbols-outlined">repeat</span>
                    </button>
                </div>

                <div className="player-bar__progress">
                    <span className="player-bar__time">{fmt(currentTime)}</span>
                    <div className="player-bar__track" onClick={onSeek}>
                        <div className="player-bar__fill" style={{ width: `${progress}%` }} />
                        <div className="player-bar__thumb-dot" style={{ left: `${progress}%` }} />
                    </div>
                    <span className="player-bar__time">{fmt(duration)}</span>
                </div>
            </div>

            {/* Volume */}
            <div className="player-bar__right">
                <span className="material-symbols-outlined player-bar__icon">lyrics</span>
                <span className="material-symbols-outlined player-bar__icon">queue_music</span>
                <span className="material-symbols-outlined player-bar__icon">volume_up</span>
                <div className="player-bar__volume">
                    <div className="player-bar__volume-fill" style={{ width: '66%' }} />
                </div>
            </div>
        </div>
    )
}

export default PlayerBar