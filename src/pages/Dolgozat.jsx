import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Dolgozat() {
    const [email, setEmail] = useState('');
    const [result, setResult] = useState(null);
    const [testType, setTestType] = useState('');
    
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setTestType(queryParams.get('testType'));
    }, [location]);

    const handleTestSolve = async () => {
        try {
            const response = await axios.post('/test/solve', {
                testType,
                email,
            });
            
            if (response.data.success) {
                setResult('Teszt sikeresen megoldva!');
            } else {
                setResult('Hiba történt: ' + response.data.message);
            }
        } catch (error) {
            setResult('Hiba történt a szerverrel való kommunikáció során.');
        }
    };

    return (
        <div>
            <h2>{testType} Teszt megoldása</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleTestSolve}>Oldd meg a tesztet</button>

            {result && <p>{result}</p>}
        </div>
    );
}
