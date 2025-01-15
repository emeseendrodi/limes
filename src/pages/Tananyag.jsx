import React from "react";
import "./styles/Tananyag.css";
import { Link } from "react-router-dom";

export default function Tananyag() {
  return (
    <div className="tananyag-box">
      <ul>
        <li>
          
        </li>
        <li>
          <div className="week week-1">
            <h3>1. hét</h3>
            <Link to="feladat">
            <h2>1. téma: Számhalmazok tulajdonságai</h2>
          </Link>
            <Link to="feladat">
              <h2>2. téma: Nevetetes sorozatok</h2>
            </Link>
          </div>
        </li>
        <li>
          <div className="week week-2">
            <h3>2. hét</h3>
            <h2>3. téma: Sorozatok határértéke, végtelen sorok</h2>
          </div>
        </li>
        <li>
          <div className="week week-3">
            <h3>3. hét</h3>
            <h2>4. téma: Végtelen sorozatok és konvergenciájuk</h2>
          </div>
        </li>
        <li>
          <div className="week week-4">
            <h3>4. hét</h3>
            <h2>5. téma: Matematikai indukció</h2>
          </div>
        </li>
      </ul>
    </div>
  );
}
