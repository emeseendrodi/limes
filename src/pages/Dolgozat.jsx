import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import AuthContext from '../context/AuthContext';

function FeladatLeiras({ assignment, currentIndex }) {
  return (
    <div>
      <h3>{currentIndex + 1}. feladat</h3> 
      <h2>{assignment.assignmentTitle}</h2>
      <p>{assignment.description}</p>
      {assignment.picture && (
        <div
          key="assignment-picture"
          dangerouslySetInnerHTML={{ __html: assignment.picture }}
        />
      )}
    </div>
  );
}

function Megoldas({ solution }) {
  return (
    <div>
      <h3>{solution.title}</h3>
      <p>{solution.details}</p>
      {solution.picture && (
        <div
          key="solution-picture"
          dangerouslySetInnerHTML={{ __html: solution.picture }}
        />
      )}
    </div>
  );
}

export default function Dolgozat() {
  const { testType } = useParams();
  const navigate = useNavigate();
  const { token, userEmail } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);

  useEffect(() => {
    if (!testType || !token) return; 

    Axios.get(`/api/test?testType=${testType}`, {
      headers: {
        'Authorization': `Bearer ${token}`,  
      },
    })
      .then((response) => {
        const assignmentIds = response.data;
        setAssignments(assignmentIds);
        if (assignmentIds.length > 0) {
          loadAssignment(assignmentIds[0]);
        }
      })
      .catch((error) => console.error('Hiba a feladatok lekérésénél:', error));
  }, [testType, token]);

  const loadAssignment = (assignmentId) => {
    if (!assignmentId) {
      console.error('Nincs megadva assignmentId');
      return;
    }

    Axios.get(`/api/test/assignment?assignmentId=${assignmentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    })
      .then((response) => {
        setCurrentAssignment(response.data);
        setCurrentSolutionIndex(0);
      })
      .catch((error) => console.error('Hiba a feladat lekérésénél:', error));
  };

  const submitTest = () => {
    if (!token) return; 

    Axios.post('/api/test/solve', {
      email: userEmail,
      testType: testType,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,  
      },
    })
      .then((response) => {
        if (response.data.success) {
          navigate('/probazh');
        } else {
          alert(response.data.message || 'Hiba történt a beküldés során!');
        }
      })
      .catch((error) => console.error('Hiba a beküldés során:', error));
  };

  const nextStep = () => {
    if (currentSolutionIndex < currentAssignment.solution.length) {
      setCurrentSolutionIndex(currentSolutionIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentSolutionIndex > 0) {
      setCurrentSolutionIndex(currentSolutionIndex - 1);
    }
  };

  const nextAssignment = () => {
    if (currentIndex < assignments.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      loadAssignment(assignments[nextIndex]);
    } else {
      submitTest();
    }
  };

  const prevAssignment = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      loadAssignment(assignments[prevIndex]);
    }
  };

  const renderPrevAssignmentButton = () => (
    currentIndex > 0 && currentSolutionIndex === 0 ? (
      <button onClick={prevAssignment}>Előző Feladat</button>
    ) : null
  );

  const renderNavigationButtons = () => {
    if (currentSolutionIndex === 0) {
      return <button onClick={nextStep}>Megoldás</button>;
    } else {
      return (
        <>
          <button onClick={prevStep}>Vissza</button>
          {currentSolutionIndex < currentAssignment.solution.length ? (
            <button onClick={nextStep}>Tovább</button>
          ) : (
            <>
              {currentIndex < assignments.length - 1 ? (
                <button onClick={nextAssignment}>Következő Feladat</button>
              ) : (
                <button onClick={submitTest}>Befejezés</button>
              )}
            </>
          )}
        </>
      );
    }
  };

  if (!currentAssignment) {
    return <div className='feladat-box'>Betöltés...</div>;
  }

  const totalSteps = currentAssignment.solution.length + 1;
  const currentStep = currentSolutionIndex;
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="feladat-box">
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>

      {currentSolutionIndex === 0 ? (
        <FeladatLeiras assignment={currentAssignment} currentIndex={currentIndex} />
      ) : (
        <Megoldas solution={currentAssignment.solution[currentSolutionIndex - 1]} />
      )}

      <div className="navigation-buttons">
        {renderPrevAssignmentButton()}
        {renderNavigationButtons()}
      </div>
    </div>
  );
}
