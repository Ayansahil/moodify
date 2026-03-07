import{ useState } from 'react'
import "../styles/register.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import registerImg from '../../../assets/regitser.jpeg'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const { loading, handleRegister } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()
        await handleRegister({ username, password, email })
        navigate('/')
    }

    return (
        <main className="register-page">

            <div className="image-panel">
                <img className="panel-image" src={registerImg} alt="Moodify visual" />

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
                        <h1>Create Account</h1>
                        <p>Join us and start tracking your vibes</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <FormGroup
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            label="Full Name"
                            placeholder="John Doe"
                            type="text"
                        />
                        <FormGroup
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            placeholder="email@example.com"
                            type="email"
                        />
                        <FormGroup
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="••••••••"
                            type="password"
                        />

                        <p className="terms-note">
                            By signing up, you agree to our{' '}
                            <a href="#">Terms of Service</a> and{' '}
                            <a href="#">Privacy Policy</a>.
                        </p>

                        <button className="button" type="submit" disabled={loading}>
                            {loading ? 'Creating account…' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="auth-footer">
                        Already have an account?
                        <Link to="/login">Login here</Link>
                    </p>

                </div>
            </div>
        </main>
    )
}

export default Register