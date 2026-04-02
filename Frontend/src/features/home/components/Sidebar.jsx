import React from 'react'
import './Sidebar.scss'

const NAV_ITEMS = [
    { icon: 'face_retouching_natural', label: 'Mood Scan',   active: true  },
    { icon: 'explore',                 label: 'Discovery',   active: false },
    { icon: 'library_music',           label: 'Library',     active: false },
    { icon: 'psychology',              label: 'AI Assistant',active: false },
]

import cameraOverlay from '../../../assets/camera.webp'

const Sidebar = ({ mood, cameraFeed }) => {
    return (
        <aside className="sidebar">
            {/* ... persona card ... */}
            <div className="sidebar__persona">
                <div className="sidebar__persona-icon">
                    <span className="material-symbols-outlined">face_retouching_natural</span>
                </div>
                <div>
                    <p className="sidebar__persona-title">AI Persona</p>
                    <p className="sidebar__persona-mood">Mood: {mood || 'Scanning…'}</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="sidebar__nav">
                {NAV_ITEMS.map(item => (
                    <a
                        key={item.label}
                        href="#"
                        className={`sidebar__nav-item ${item.active ? 'sidebar__nav-item--active' : ''}`}
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span>{item.label}</span>
                    </a>
                ))}
            </nav>

            {/* Camera Feed Card */}
            <div className="sidebar__camera">
                <div className="sidebar__camera-scan-line" />
                <img src={cameraOverlay} alt="Camera Feed" className="sidebar__camera-img" />
                <div className="sidebar__camera-overlay" />
                <div className="sidebar__camera-info">
                    <div className="sidebar__camera-status">
                        <span className="sidebar__camera-dot" />
                        <span>AI Mood Detection Active</span>
                    </div>
                    <p>Scanning facial micro-expressions...</p>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar