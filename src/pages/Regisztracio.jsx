import React from "react";
import "./styles/Regisztracio.css"
import { Link } from "react-router-dom";
import axios from 'axios';


export default function Regisztracio(){

    const [forename, setForeName] = React.useState('');
    const [surename, setSureName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
   
    const handleRegistration = async (e) => {
        e.preventDefault()
        try {
          const userData = {
            forename,
            surename,
            email,
            password
          };
    
          const response = await axios.post('/api/student/register', userData);
          console.log('User registered:', response.data);
    
        } catch (error) {
          console.error('Registration error:', error);
        }
      };



    return(
        <>
            <div className="regist-box">
                <h1>Regisztráció</h1>
                <form className="regist-form" onSubmit={handleRegistration}>

                    <input 
                     required
                     type="text"
                     placeholder="Vezetéknév" 
                     onChange={(e) => setSureName(e.target.value)} 
                     className="regist-form-el"/>

                    <input
                    required 
                    type="text" 
                    placeholder="Keresztnév"  
                    onChange={(e) => setForeName(e.target.value)} 
                    className="regist-form-el" />

                    <input
                    required 
                    type="email" 
                    placeholder="Email cím" 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="regist-form-el"/>

                    <input
                    required 
                    type="password" 
                    placeholder="Jelszó"
                    minLength={8}  
                    onChange={(e) => setPassword(e.target.value)} 
                    className="regist-form-el"/>

                    <button type="submit" className="form-submit">Regisztráció</button>
                </form>

                <h3>Már van fiókod? <br></br>
                <Link to="../bejelentkezes" >Jelentkezz be itt!</Link></h3>
            </div>
        </>
    )
}