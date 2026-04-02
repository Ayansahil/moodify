import React from 'react'
import './Header.scss'

const Header = ({ user, onLogout }) => {
    return (
        <header className="app-header">
            <div className="app-header__left">
                <span className="app-header__logo">Moodify</span>
            </div>

            <div className="app-header__right">
                <div className="app-header__user">
                    <div className="app-header__avatar">
                        {user?.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <button className="app-header__logout" onClick={onLogout} title="Logout">
                        <span className="material-symbols-outlined">logout</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header