import Head from 'next/head';
import Link from 'next/link';
import style from '../../styles/allStyles.module.scss';
import MessageToast from '../MessageToast/MessageToast';
import { useState } from 'react';
import Router from "next/router";
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

export default function RegUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [pwdError, setPwdError] = useState('');
    const [message, setMessage] = useState('');

    const handleUserRegister = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        setError('');
        setMessage('');

        if (!name || !email || !password || !confirmpassword) 
            return setError('All fields are required');
        if (password !== confirmpassword)
            return setPwdError('Passwords do not match');

        let body = {
            name,
            email,
            password,
            createdAt: new Date().toISOString(),
        };
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);

        let response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(body),
        });

        let data = await response.json();

        if (data.success) {
            setName('');
            setEmail('');
            setPassword('');
            Router.push("/?showRegister=true");
            return setMessage(data.message);
        } else {
            return setError(data.message);
        }
    };

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'row',
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
            marginTop: '-65px',
            marginBottom: '-65px'
        }}>
            <style jsx global>{`
                @keyframes gradientAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                body {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    width: 100%;
                }
            `}</style>

            <Head>
                <title>Expense Tracker - Register</title>
                <meta name="description" content="Manage and visualize your expenses" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            {/* Left Side - Gradient Background */}
            <div style={{
                flex: 1,
                background: 'linear-gradient(135deg, #0F4C81, #1A1F71, #2A9D8F, #264653)',
                backgroundSize: '400% 400%',
                animation: 'gradientAnimation 10s ease infinite',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center',
            }}>
                <div style={{
                    maxWidth: '400px',
                    padding: '2rem',
                }}>
                    <h1>Welcome to Expense Tracker</h1>
                    <p>Join us and take control of your finances today!</p>
                </div>
            </div>

            {/* Right Side - Registration Form */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '2rem',
            }}>
                {/* Error message toasts */}
                {error && <MessageToast displayMessage={error} />}
                {pwdError && <MessageToast displayMessage={pwdError} />}

                <div className={style.newlogform} style={{
                    width: '100%',
                    maxWidth: '400px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    padding: '2rem',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}>
                    <h2 style={{ textAlign: 'center', color: '#0F4C81' }}>New User Registration</h2>
                    
                    <form onSubmit={(e) => handleUserRegister(e)} id="register-user-form">
                        <div style={{ marginBottom: '1rem' }}>
                            <label className={style.formLabel}>Name</label>
                            <input 
                                name="name"
                                type="text"
                                className={style.formInput}
                                onChange={(e) => setName(e.target.value)}
                                required 
                                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label className={style.formLabel}>Email ID</label>
                            <input 
                                name="email" 
                                type="text" 
                                className={style.formInput}
                                placeholder="name@example.com" 
                                onChange={(e) => setEmail(e.target.value)}
                                pattern="[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$"
                                required 
                                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                            />                       
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label className={style.formLabel}>Password</label>
                            <input 
                                name="password" 
                                type="password" 
                                className={style.formInput}
                                onChange={(e) => setPassword(bcrypt.hashSync(e.target.value, salt))}
                                required 
                                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                            />                       
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label className={style.formLabel}>Confirm Password</label>
                            <input 
                                name="confirmpassword" 
                                type="password" 
                                className={style.formInput}
                                onChange={(e) => setconfirmPassword(bcrypt.hashSync(e.target.value, salt))}
                                required 
                                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                            />                       
                        </div>
                        <button 
                            type="submit"
                            style={{ 
                                width: '100%', 
                                padding: '0.75rem', 
                                backgroundColor: '#0F4C81', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginTop: '1rem',
                            }}
                        >
                            Register
                        </button>
                        <div style={{ 
                            marginTop: '1rem', 
                            textAlign: 'center',
                            color: '#666',
                        }}>
                            Already have an account? {' '}
                            <Link href="/Login" style={{ color: '#0F4C81', textDecoration: 'none' }}> 
                                Sign In 
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
