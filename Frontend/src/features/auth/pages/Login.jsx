import React, { useState } from 'react'
import "../styles/login.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import loginImg from '../../../assets/login.jpeg'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate("/")
    }

    return (
        <main className="login-page">

           
            <div className="image-panel">
                <img className="panel-image" src={loginImg} alt="Moodify visual" />

              
                <div className="panel-placeholder">
                    <div className="placeholder-inner">
                        <span className="placeholder-icon">🎭</span>
                        <p>Your image here</p>
                    </div>
                </div>

                <div className="panel-overlay" />

                <div className="panel-branding">
                    <div className="brand-name">
                        <div className="brand-icon">🎵</div>
                        <span>Moodify</span>
                    </div>
                    <p className="brand-tagline">Your all-in-one mood tracker.</p>
                </div>
            </div>

            {/* ── Right Form Panel ── */}
            <div className="form-container">
                <div className="form-inner">

                    <div className="auth-heading">
                        <h1>Welcome back</h1>
                        <p>Sign in to continue your journey</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <FormGroup
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email address"
                            placeholder="example@email.com"
                            type="email"
                        />
                        <FormGroup
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="••••••••"
                            type="password"
                        />

                        <div className="forgot-link">
                            <a href="#">Forgot password?</a>
                        </div>

                        <button className="button" type="submit" disabled={loading}>
                            {loading ? 'Signing in…' : 'Continue with Email'}
                        </button>
                    </form>

                    <p className="auth-footer">
                        Don't have an account?
                        <Link to="/register">Register here</Link>
                    </p>

                </div>
            </div>
        </main>
    )
}

export default Login