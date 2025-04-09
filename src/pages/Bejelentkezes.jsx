import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

export default function Bejelentkezes() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const loginData = { email, password };
  
      const response = await axios.post('/api/student/login', loginData);
  
      if (response.data.sessionToken) {
        login(response.data.sessionToken); 
        setIsLoggingIn(true);
  
        setTimeout(() => {
          navigate('/profil');
        }, 1500);
      } else {
        setErrorMessage('Hiba történt a bejelentkezés során. Kérlek próbáld újra.');
      }
    } catch (error) {
      setErrorMessage('Hiba történt a bejelentkezés során. Próbáld újra.');
    }
  };

  // Show success message when logging in
  if (isLoggingIn) {
    return (
      <div className="regist-box">
        <h1>Sikeres bejelentkezés!</h1>
        <p>Kérlek várj, amíg átirányítunk a profil oldaladra...</p>
      </div>
    );
  }

  return (
    <div className="regist-box">
      <h1>Bejelentkezés</h1>

      {/* Login form */}
      <form className="regist-form" onSubmit={handleLogin}>
        <input
          required
          type="email"
          placeholder="Email cím"
          onChange={(e) => setEmail(e.target.value)}
          className="regist-form-el"
        />
        <input
          required
          type="password"
          placeholder="Jelszó"
          onChange={(e) => setPassword(e.target.value)}
          className="regist-form-el"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="form-submit">Bejelentkezés</button>
      </form>

      {/* Registration link */}
      <h3>
        Még nincs fiókod?<br />
        <Link to="../regisztracio">Regisztrálj itt!</Link>
      </h3>
    </div>
  );
}
