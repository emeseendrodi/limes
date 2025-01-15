import React from "react";
import "./styles/Regisztracio.css"


export default function Regisztracio(){

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
   


    const handleRegistration = async (e) => {
        e.preventDefault()
        const userData = {
            firstName,
            lastName,
            email,
            password
        };

        console.log(userData)

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
                     onChange={(e) => setLastName(e.target.value)} 
                     className="regist-form-el"/>

                    <input
                    required 
                    type="text" 
                    placeholder="Keresztnév"  
                    onChange={(e) => setFirstName(e.target.value)} 
                    className="regist-form-el" />

                    <input
                    required 
                    type="email" 
                    placeholder="Email cím" onChange={(e) => setEmail(e.target.value)} 
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
                Jelentkezz be itt!</h3>
            </div>
        </>
    )
}