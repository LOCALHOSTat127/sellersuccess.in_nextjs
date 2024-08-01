/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
const NotFoundPage = () => {
    const pageStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh',
      background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
      color: '#333',
      textAlign: 'center',
      fontFamily: '"Arial", sans-serif',
      padding: '0 20px',
      boxSizing: 'border-box',
    };
  
    const headingStyle = {
      fontSize: '3rem',
      margin: '0',
      fontWeight: 'bold',
      '@media (max-width: 600px)': {
        fontSize: '2.5rem',
      },
    };
  
    const messageStyle = {
      fontSize: '1.25rem',
      margin: '20px 0',
      '@media (max-width: 600px)': {
        fontSize: '1rem',
      },
    };
  
    const buttonStyle = {
      padding: '10px 20px',
      fontSize: '1rem',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      marginTop: '20px',
      '@media (max-width: 600px)': {
        padding: '8px 16px',
        fontSize: '0.875rem',
      },
    };
  
    return (
      <div style={pageStyle}>
        <img
          src={"/assets/svg/404.svg"}
          alt="page not found"
          style={{
            maxWidth: '300px',
            height: 'auto',
          }}
        />
        <h1 style={headingStyle}>404</h1>
        <p style={messageStyle}>Oops! The page you’re looking for doesn’t exist.</p>
        <a href="/" style={buttonStyle}>Go Home</a>
      </div>
    );
  };
  
  export default NotFoundPage;
  