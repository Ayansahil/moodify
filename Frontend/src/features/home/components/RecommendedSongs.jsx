import React from 'react'
import './RecommendedSongs.scss'

const RecommendedSongs = ({ currentSong, songs = [] }) => {
    // Dummy songs for visual alignment with screenshot if no songs provided
    const displaySongs = songs.length > 0 ? songs : [
        { 
            title: currentSong?.title || 'No song yet', 
            artist: currentSong?.mood || '—', 
            album: 'Moodify Special', 
            duration: '3:45', 
            active: true, 
            posterUrl: currentSong?.posterUrl 
        },
        { 
            title: 'Solar Flare', 
            artist: 'Ray Trace', 
            album: 'Stellar Waves', 
            duration: '4:12', 
            active: false, 
            posterUrl: 'https://ik.imagekit.io/0cef4ey58/cohort-2/moodify/posters/solar_flare.jpg'
        },
        { 
            title: 'Digital Horizon', 
            artist: 'Lumina Flux', 
            album: 'Neon Genesis', 
            duration: '3:28', 
            active: false, 
            posterUrl: 'https://ik.imagekit.io/0cef4ey58/cohort-2/moodify/posters/digital_horizon.jpg'
        },
    ]

    return (
        <section className="recommended">
            <div className="recommended__header">
                <h2 className="recommended__title">Recommended Songs</h2>
                <button className="btn btn--text">View All</button>
            </div>

            <div className="recommended__table-container">
                <table className="recommended__table">
                    <thead>
                        <tr>
                            <th className="recommended__th recommended__th--num">#</th>
                            <th className="recommended__th recommended__th--title">TITLE</th>
                            <th className="recommended__th recommended__th--album">ALBUM</th>
                            <th className="recommended__th recommended__th--time">
                                <span className="material-symbols-outlined">schedule</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {displaySongs.map((song, i) => (
                            <tr key={i} className={`rec-song-row ${song.active ? 'rec-song-row--active' : ''}`}>
                                <td className="rec-song-row__num">{i + 1}</td>
                                <td className="rec-song-row__title-cell">
                                    <div className="rec-song-row__thumb">
                                        {song.posterUrl
                                            ? <img src={song.posterUrl} alt={song.title} />
                                            : <div className="rec-song-row__thumb-placeholder" />
                                        }
                                        <div className="rec-song-row__play-overlay">
                                            <span className="material-symbols-outlined">play_arrow</span>
                                        </div>
                                    </div>
                                    <div className="rec-song-row__info">
                                        <p className="rec-song-row__name">{song.title}</p>
                                        <p className="rec-song-row__artist">{song.artist}</p>
                                    </div>
                                </td>
                                <td className="rec-song-row__album">{song.album || '—'}</td>
                                <td className="rec-song-row__duration">{song.duration || '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default RecommendedSongs