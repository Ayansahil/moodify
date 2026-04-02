import React from 'react'
import './BottomNav.scss'

const NAV = [
    { icon: 'face_retouching_natural', active: true  },
    { icon: 'explore',                 active: false },
    { icon: 'library_music',           active: false },
    { icon: 'person',                  active: false },
]

const BottomNav = () => {
    return (
        <nav className="bottom-nav">
            {NAV.map((item, i) => (
                <button key={i} className={`bottom-nav__btn ${item.active ? 'bottom-nav__btn--active' : ''}`}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                </button>
            ))}
        </nav>
    )
}

export default BottomNav