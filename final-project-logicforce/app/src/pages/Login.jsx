import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import style from '../styles/allStyles.module.scss'
import Link from 'next/link';
import { useState } from 'react';
import Router from "next/router";
import MessageToast from '../components/MessageToast/MessageToast';
import Image from 'next/image';

export default function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [invalid_user, setUserCredential] = useState('');

  const handleUserLogin = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');

    if (!loginEmail || !loginPassword) return setError('All fields are required');

    let loginUser = {
        loginEmail,
        loginPassword
    };

    let response = await fetch('/api/userAuth', {
      method: 'POST',
      body: JSON.stringify(loginUser),
    });
   
    let res = (await response.json());
  
    if (res.success){
      localStorage.setItem('loggedInUserId', res.user_id);
      localStorage.setItem('userName', res.name);
      localStorage.setItem('userEmail', res.email);
      Router.push("/home");
    }
    else {
      setUserCredential(true)
    }
  };

  return (
    <div className={styles.container} style={{ 
      display: 'flex',
      height: '100vh',
      overflow: 'hidden'
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
        }
      `}</style>

      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Manage and visualize your expenses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Left Side - Image Section */}
      <div style={{
        width: '50%',
        position: 'relative',
        background: 'linear-gradient(135deg, #0F4C81, #1A1F71, #2A9D8F, #264653)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 10s ease infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* <Image 
          src="/login-image.jpg" // Replace with your actual image path
          alt="Financial management illustration"
          layout="fill"
          objectFit="cover"
          quality={90}
        /> */}
      </div>

      {/* Right Side - Login Form Section */}
      <div style={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: 'white'
      }}>
        {/* Error message for invalid credentials */}
        {invalid_user && <MessageToast displayMessage={"Invalid Credentials"} />}
        
        {/* Login Form */}
        <div className={style.newlogform} style={{
          width: '100%',
          maxWidth: '400px'
        }}>
          <h2 style={{ textAlign: 'center', color: '#0F4C81' }}> Login </h2>
          <form onSubmit={(e) => handleUserLogin(e)} id="register-user-form">
            <div style={{ marginBottom: '1rem' }}>
              <label className={style.formLabel}>Email ID</label>
              <input 
                name="loginEmail" 
                className={style.formInput}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="name@example.com"  
                pattern="[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$"
                type="text" 
                required 
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
              />
            </div>    
            <div style={{ marginBottom: '1rem' }}>
              <label className={style.formLabel}>Password</label>
              <input 
                name="loginPassword" 
                className={style.formInput}
                onChange={(e) => setLoginPassword(e.target.value)} 
                type="password" 
                required 
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  marginTop: '0.5rem',
                  boxSizing: 'border-box' // This ensures padding doesn't increase the total width
                }}
              />
            </div>   
            <button 
              className={style.newlog} 
              type="submit"
              style={{ 
                width: '52%', // This makes the button full width like the input
                padding: '0.75rem', 
                backgroundColor: '#0F4C81', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px',
                cursor: 'pointer',
                // textAlign: 'center',
                marginRight: '70px',
                boxSizing: 'border-box' // Ensures padding doesn't increase the total width
              }}
            >
              Login
            </button>
            <div style={{ 
              marginTop: '1rem', 
              textAlign: 'center',
              color: '#666'
            }}>
              Do not have an account? {' '}
              <Link href="/register" style={{ color: '#0F4C81', textDecoration: 'none' }}> 
                Register 
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}