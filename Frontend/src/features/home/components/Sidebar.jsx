import React, { useState, useEffect } from 'react'
import './Sidebar.scss'

const NAV_ITEMS = [
    { icon: 'face_retouching_natural', label: 'Mood Scan',   id: 'mood-scanner' },
    { icon: 'explore',                 label: 'Discovery',   id: 'discovery' },
    { icon: 'library_music',           label: 'Library',     id: 'library' },
    { icon: 'psychology',              label: 'AI Assistant',id: 'ai-assistant' },
]

import cameraOverlay from '../../../assets/camera.webp'

const Sidebar = ({ mood }) => {
    const [activeSection, setActiveSection] = useState('mood-scanner');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px', // Adjust to trigger when section is centered
            threshold: 0
        };

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        
        NAV_ITEMS.forEach(item => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

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
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={`sidebar__nav-item ${activeSection === item.id ? 'sidebar__nav-item--active' : ''}`}
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