import { useState } from 'react';

export default function Auth({ onLogin, onRegister }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        if (!isLogin && !formData.name.trim()) newErrors.name = "Name is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) newErrors.password = "Password is required";
        else if (!isLogin && formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
        if (errors.auth) setErrors(prev => ({ ...prev, auth: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setErrors((prev) => ({ ...prev, auth: null }));
            try {
                if (isLogin) {
                    await onLogin(formData.email, formData.password);
                } else {
                    await onRegister({ name: formData.name, email: formData.email, password: formData.password });
                }
            } catch (error) {
                let errorMessage = "Authentication failed";
                if (error.code === 'auth/invalid-credential') {
                    errorMessage = "Invalid email or password. If you don't have an account, please Sign up first.";
                } else if (error.code === 'auth/email-already-in-use') {
                    errorMessage = "An account with this email already exists.";
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = "Password should be at least 6 characters.";
                } else if (error.message) {
                    errorMessage = error.message;
                }
                setErrors({ auth: errorMessage });
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '1rem' }}>
            <div className="card fade-in" style={{ width: '100%', maxWidth: '420px', padding: '3.5rem 2.5rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontWeight: 800, fontSize: '2rem' }}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p style={{ textAlign: 'center', color: 'var(--text-dim)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
                    {isLogin ? 'Sign in to access premium events' : 'Join the Tic Vedika community today'}
                </p>

                {errors.auth && (
                    <div style={{ 
                        background: 'rgba(239, 68, 68, 0.1)', 
                        color: '#ef4444', 
                        padding: '0.85rem', 
                        borderRadius: 'var(--radius-sm)', 
                        marginBottom: '2rem', 
                        textAlign: 'center', 
                        fontSize: '0.85rem', 
                        border: '1px solid rgba(239, 68, 68, 0.2)' 
                    }}>
                        {errors.auth}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input type="text" name="name" className={`form-input ${errors.name ? 'error' : ''}`} value={formData.name} onChange={handleChange} placeholder="John Doe" />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" name="email" className={`form-input ${errors.email ? 'error' : ''}`} value={formData.email} onChange={handleChange} placeholder="email@example.com" />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className={`form-input ${errors.password ? 'error' : ''}`} value={formData.password} onChange={handleChange} placeholder="••••••••" />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" name="confirmPassword" className={`form-input ${errors.confirmPassword ? 'error' : ''}`} value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
                            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '1rem' }}>
                        {isLogin ? 'Sign In' : 'Register Now'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-dim)' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button
                        type="button"
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', marginLeft: '4px' }}
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setErrors({});
                            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                        }}
                    >
                        {isLogin ? 'Create one' : 'Sign in here'}
                    </button>
                </p>
            </div>
        </div>
    );
}
