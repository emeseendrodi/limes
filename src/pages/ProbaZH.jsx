import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import AuthContext from "../context/AuthContext"; 

const mapTestTitle = (title) => {
  switch (title) {
    case 'FIRST':
      return 'Próbadolgozat I.';
    case 'SECOND':
      return 'Próbadolgozat II.';
    case 'LAST':
      return 'Összevont Próbadolgozat';
    default:
      return title; 
  }
};

export default function ProbaZH() {
  const { token } = useContext(AuthContext); 
  const [testOverview, setTestOverview] = useState([]); 

  useEffect(() => {
    Axios.get(`/api/test/overview`, {
      headers: {
        'Authorization': `Bearer ${token}`,  
      }
    })
    .then((response) => {
      setTestOverview(response.data);
    })
    .catch((error) => {
      console.error("API hiba:", error);
    });
  }, [token]);  

  if (!testOverview.length) {
    return (
      <div className="tananyag-box">
        <p>Betöltés...</p>
      </div>
    );
  }

  return (
    <div className="tananyag-box">
      <ul>
        {testOverview.map((test, index) => (
          <li className="week" key={index}>
            <h3>{mapTestTitle(test.title)}</h3> 
            {test.testCompleted ? 
            <p>
                Ezt a tesztet már egyszer megoldottad. 
                <br />
                <Link to={`/dolgozat/${test.title}`}>
                  Ha újra szeretnéd próbálni, kattints ide!
                </Link>
              </p> : (
              <Link to={`/dolgozat/${test.title}`}>
                Oldd meg a tesztet!
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
