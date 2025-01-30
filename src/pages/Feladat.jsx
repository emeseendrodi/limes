import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Feladat.css";


function FeladatLeiras({ feladat }) {
    return (
        <div>
            <h1>{feladat.cim}</h1>
            <p>{feladat.leiras}</p>
            
            <div 
                className="svg-container" 
                
                dangerouslySetInnerHTML={{ __html: feladat.kep }} 
            />
    </div>
    );
}

function Megoldas({ megoldas }) {
    return (
        <div>
            <h2>{megoldas.cim}</h2>
            <p>{megoldas.reszletek}</p>
           
        </div>
    );
}

export default function Feladat() {
    const [currentFeladat, setCurrentFeladat] = useState(0);
    const [currentMegoldas, setCurrentMegoldas] = useState(0);  

    const data = [
        {
            feladat: {
                cim: "1. feladat",
                leiras: "Határozzuk meg az első számhalmaz alsó- és felső határát!",
                kep: ``
            },
            megoldasok: [
                { cim: "Megoldás 1.1", reszletek: "Első megoldás lépései..." },
                { cim: "Megoldás 1.2", reszletek: "Második megoldás lépései..." },
                { cim: "Megoldás 1.3", reszletek: "Harmadik megoldás lépései..." },
                { cim: "Megoldás 1.4", reszletek: "Negyedik megoldás lépései..." }
            ]
        },
        {
            feladat: {
                cim: "2. feladat",
                leiras: "Határozzuk meg a második számhalmaz alsó- és felső határát!",
                kep: `<svg>valami</svg>`
            },
            megoldasok: [
                { cim: "Megoldás 2.1", reszletek: "Első megoldás lépései..." },
                { cim: "Megoldás 2.2", reszletek: "Második megoldás lépései..." }
            ]
        }
    ];

    const feladat = data[currentFeladat];
    const totalSteps = feladat.megoldasok.length + 1;
    const currentStep = currentMegoldas === 0 ? 0 : currentMegoldas;

    const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

    const nextStep = () => {
        currentMegoldas < feladat.megoldasok.length
            ? setCurrentMegoldas(currentMegoldas + 1)
            : null;
    };

    const prevStep = () => {
        currentMegoldas > 0
            ? setCurrentMegoldas(currentMegoldas - 1)
            : setCurrentMegoldas(0);  
    };

    const nextFeladat = () => {
        currentFeladat < data.length - 1
            ? (setCurrentFeladat(currentFeladat + 1), setCurrentMegoldas(0)) 
            : null;
    };

    const prevFeladat = () => {
        currentFeladat > 0
            ? (setCurrentFeladat(currentFeladat - 1), setCurrentMegoldas(0)) 
            : null;
    };

    const renderPrevFeladatButton = () => (
        currentFeladat > 0 && currentMegoldas === 0 ? <button onClick={prevFeladat}>Előző Feladat</button> : null
    );

    const renderNavigationButtons = () => {
        if (currentMegoldas === 0) {
            return <button onClick={nextStep}>Megoldás</button>;
        } else {
            return (
                <>
                    <button onClick={prevStep}>Vissza</button>
                    {currentMegoldas < feladat.megoldasok.length ? (
                        <button onClick={nextStep}>Tovább</button>
                    ) : (
                        <>
                            {currentFeladat < data.length - 1 ? (
                                <button onClick={nextFeladat}>Következő Feladat</button>
                            ) : (
                                <Link to="/tananyag">
                                    <button>Vissza a Tananyaghoz</button>
                                </Link>
                            )}
                        </>
                    )}
                </>
            );
        }
    };

    return (
        <div className="feladat-box">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>

            {currentMegoldas === 0 ? (
                <FeladatLeiras feladat={feladat.feladat} />
            ) : (
                <Megoldas megoldas={feladat.megoldasok[currentMegoldas - 1]} />
            )}

            <div className="navigation-buttons">
                {renderPrevFeladatButton()}
                {renderNavigationButtons()}
            </div>
        </div>
    );
}
