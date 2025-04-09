import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import './styles/Feladat.css';

function FeladatLeiras({ assignment, currentIndex }) {
  return (
    <div>
      <h3>{currentIndex + 1}. feladat</h3>
      <h2>{assignment.assignmentTitle}</h2>
      <p>{assignment.description}</p>
      {assignment.picture && (
        <div
          key="assignment-picture"
          className="svg-container"
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
          className="svg-container"
          dangerouslySetInnerHTML={{ __html: solution.picture }}
        />
      )}
    </div>
  );
}

export default function Feladat() {
  const { weeklyLectureId } = useParams();
  const { token } = useContext(AuthContext);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [RemainingAssignments, setRemainingAssignments] = useState(0); 

  // Assignments betöltése
  const loadAssignment = async (previousId = 0, isCompleted = false) => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/lecture/nextAssignment", {
        params: {
          weeklyLectureId: parseInt(weeklyLectureId),
          isWeelkyLectureAllreadyCompleted: isCompleted,
          previousAssignemntId: previousId
        },
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      
      if (response.data) {
        setCurrentAssignment(response.data);
        setCurrentSolutionIndex(0);
        setIsCompleted(false);
        setRemainingAssignments(response.data.remainingAssignmentsInLecture); // Set remaining assignments
        return true;
      }
      return false;
    } catch (error) {
      console.error("Hiba történt a feladat lekérésekor:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Előző feladat betöltése
  const loadPreviousAssignment = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/lecture/previousAssignment", {
        params: {
          weeklyLectureId: parseInt(weeklyLectureId)
        },
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      
      if (response.data) {
        setCurrentAssignment(response.data);
        setCurrentSolutionIndex(0);
        setCurrentIndex(prev => prev - 1);
        setRemainingAssignments(response.data.remainingAssignmentsInLecture + 1); 
      }
    } catch (error) {
      console.error("Hiba történt az előző feladat lekérésekor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Feladat beküldése
  const submitAssignment = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/lecture/solveAssignment", {
        assignmentId: currentAssignment.assignmentId
      }, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (response.data.success) {
        if (response.data.hasNextAssignmentInLecture) {
          const loadSuccess = await loadAssignment(currentAssignment.assignmentId, true);
          
          if (loadSuccess) {
            setCurrentIndex(prev => prev + 1);
          } else {
            console.error("Nem sikerült betölteni a következő feladatot");
          }
        } else {
          setIsCompleted(true);
        }
      } else {
        alert(response.data.message || "Hiba történt a beküldés során!");
      }
    } catch (error) {
      console.error("Hiba történt a feladat beküldésekor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // loadAssignment meghívása az első feladat betöltéséhez
  useEffect(() => {
    if (token && weeklyLectureId) {
      loadAssignment();
    }
  }, [token, weeklyLectureId]);

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

  const renderPrevAssignmentButton = () => (
    currentIndex > 0 && currentSolutionIndex === 0 ? (
      <button onClick={loadPreviousAssignment} disabled={isLoading}>
        Előző Feladat
      </button>
    ) : null
  );

  const renderNavigationButtons = () => {
    if (currentSolutionIndex === 0) {
      return (
        <button onClick={nextStep} disabled={isLoading}>
          Megoldás
        </button>
      );
    } else {
      return (
        <>
          <button onClick={prevStep} disabled={isLoading}>
            Vissza
          </button>
          {currentSolutionIndex < currentAssignment.solution.length ? (
            <button onClick={nextStep} disabled={isLoading}>
              Tovább
            </button>
          ) : (
            <>
              {RemainingAssignments > 0 ? (
                <button onClick={submitAssignment} disabled={isLoading}>
                  {isLoading ? "Betöltés..." : "Következő Feladat"}
                </button>
              ) : (
                <Link to="/tananyag">
                  <button onClick={submitAssignment}>
                    {isLoading ? "Betöltés..." : "Vissza a Tananyaghoz"}
                  </button>
                </Link>
              )}
            </>
          )}
        </>
      );
    }
  };

  if (!currentAssignment || isLoading) {
    return <div className="feladat-box">Betöltés...</div>;
  }

  const totalSteps = currentAssignment.solution.length + 1;
  const currentStep = currentSolutionIndex;
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="feladat-box">
      <div 
        className="progress-bar" 
        style={{ width: `${progressPercentage}%` }}
      />
      
      {currentSolutionIndex === 0 ? (
        <FeladatLeiras 
          assignment={currentAssignment} 
          currentIndex={currentIndex} 
        />
      ) : (
        <Megoldas 
          solution={currentAssignment.solution[currentSolutionIndex - 1]} 
        />
      )}

      <div className="navigation-buttons">
        {renderPrevAssignmentButton()}
        {renderNavigationButtons()}
      </div>
    </div>
  );
}
