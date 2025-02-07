import React from 'react';
import styles from '../styles/landing.module.scss';
import { useState } from 'react';
import { Box, Typography, Button, AppBar, Toolbar, Container, Grid, Card, CardContent, Menu, MenuItem, color } from '@mui/material';
import { useTranslation } from 'react-i18next';
//import background from './images/Landingimage.jpg';
//import { Link } from 'react-router-dom';



const LandingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    const languageCode = language === 'English' ? 'en' : 
                         language === 'Spanish' ? 'es' : 
                         language === 'Mandarin' ? 'zh' : 'en';
    
    i18n.changeLanguage(languageCode).then(() => {
      console.log(`Language switched to: ${languageCode}`);
    }).catch((error) => {
      console.error("Error switching language:", error);
    });
    
    // Close the menu after selecting a language
    handleMenuClose();
  };
  
  return (
<div className={styles.mainF}>
      {/* Navigation Bar */}
<AppBar position="static" color="black">
<Toolbar>
<Typography variant="h6" sx={{ flexGrow: 1 }}>
            {/* FundFlow */}
            {t('FundFlow')}
</Typography>
<Button
            color="inherit"
            onClick={handleMenuClick}
            aria-controls={open ? 'language-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {/* Language */}
            {t('Language')}
          </Button>
          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleLanguageChange('English')}>English</MenuItem>
            <MenuItem onClick={() => handleLanguageChange('Spanish')}>Spanish</MenuItem>
          </Menu>
<Button color="inherit" href="/register">
            {/* Register */}
            {t('Register')}
</Button>
<Button color="inherit" href="/Login">
            {/* Login */}
            {t('Login')}
</Button>
</Toolbar>
</AppBar>
 
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          minWidth: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          // marginTop: '-20px'
        }}
      >
        {/* CSS Animation Styles */}
        <style>
          {`
            @keyframes gradientAnimation {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
 
            .animated-background {
              background: linear-gradient(135deg, #0F4C81, #1A1F71, #2A9D8F, #264653);
              background-size: 400% 400%;
              animation: gradientAnimation 10s ease infinite;
              height: 100%;
              width: 100%;
              position: absolute;
              z-index: 0;
            }
          `}
        </style>
 
        {/* Animated Background */}
        <div className="animated-background"></div>
 
        {/* Content */}
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h1" gutterBottom sx={{fontweight: 'bold'}} >
            {/* Fundflow */}
            {t('FundFlow')}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {/* Empowering Smart Personal Finances, One Flow at a Time */}
            {t('Empowering Smart Personal Finances, One Flow at a Time')}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href="/register"
            size="large"
            sx={{ mt: 2 }}
          >
            {/* Get Started */}
            {t('Get Started')}
          </Button>
</Container>
</Box>
 
      {/* What We Do Section */}
<Container sx={{ py: 10 }}>
<Typography variant="h4" align="center" gutterBottom sx={{fontweight: 'bold'}}>
          What We Do
</Typography>
<Typography variant="body1" align="center" sx={{ mb: 4 }}>
          At FundFlow, we simplify personal finance management through cutting-edge technology and user-centric design. Our platform provides intuitive tools to track expenses, create budgets, and set financial goals effortlessly. Leveraging AI, FundFlow offers insights and recommendations to help you make informed financial decisions. Whether you’re saving for your first home, planning a dream vacation, or simply striving for better financial health,
          FundFlow is here to guide you every step of the way.
</Typography>
</Container>
 
      {/* Key Features Section */}
<Box sx={{ backgroundColor: '#0F4C81', py: 8 }}>
<Container>
<Typography variant="h4" align="center" gutterBottom sx={{fontweight: 'bold'}} >
            Key Features
</Typography>
<Grid container spacing={4} sx={{ mt: 2 }}>
            {[
              { title: 'Expense Tracking', description: 'Monitor your spending habits with real-time insights.' },
              { title: 'Budgeting Made Easy', description: 'Create, adjust, stick to budgets tailored to goals.' },
              { title: 'AI-Powered Chatbot', description: 'Get personalized financial advice 24/7.' },
            ].map((feature, index) => (
<Grid item xs={12} md={4} key={index}>
<Card>
<CardContent>
<Typography variant="h6" gutterBottom>
                      {feature.title}
</Typography>
<Typography variant="body2">{feature.description}</Typography>
</CardContent>
</Card>
</Grid>
            ))}
</Grid>
</Container>
</Box>
 
      {/* Who We Are Section */}
<Container sx={{ py: 8 }}>
<Typography variant="h4" align="center" gutterBottom sx={{fontweight: 'bold'}} >
          Who We Are
</Typography>
<Typography variant="body1" align="center" sx={{ mb: 4 }}>
          FundFlow is a team of passionate technologists dedicated to transforming how people manage money. Based in Boston, MA, we are driven by a mission to empower individuals to take control of their finances with confidence.We believe that personal finance should be accessible, straightforward, and empowering. By combining state-of-the-art technology with a deep understanding of human behavior, we strive to make FundFlow the go-to solution for financial well-being.
</Typography>
</Container>
 
      {/* Footer */}
<Box
        sx={{
          backgroundColor: '#0F4C81',
          color: 'white',
          textAlign: 'center',
          py: 3,
        }}
>
<Typography variant="body2">
          © 2024 FundFlow. All rights reserved.
</Typography>
</Box>
</div>
  );
};
 
export default LandingPage;
 