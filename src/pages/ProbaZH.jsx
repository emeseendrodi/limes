import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import AuthContext from "../context/AuthContext"; 

const mapTestTitle = (title) => {
  switch (title) {
    case 'FIRST':
      return '1. Próbadolgozat';
    case 'SECOND':
      return '2. Próbadolgozat';
    case 'LAST':
      return 'Összetett Próbadolgozat';
    default:
      return title; 
  }
};

export default function ProbaZH() {
  const { userEmail } = useContext(AuthContext); 
  const [testOverview, setTestOverview] = useState([]); 

  useEffect(() => {
    if (userEmail) {
      Axios.get(`/api/test/overview?email=${userEmail}`)
        .then((response) => {
          setTestOverview(response.data);
        })
        .catch((error) => {
          console.error("API hiba:", error);
        });
    }
  }, [userEmail]); 

  if (!testOverview.length) {
    return <p>Betöltés...</p>; 
  }

  return (
    <div className="tananyag-box">
      <ul>
        {testOverview.map((test, index) => (
          <li className="week" key={index}>
            <h3>{mapTestTitle(test.title)}</h3> 
            {test.isTestCompleted ? (
              <p>A tesztet már megoldottad!</p>
            ) : (
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
