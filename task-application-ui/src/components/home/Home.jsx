import React from 'react'
import "./Home.css";
import backgroundImg from "../../img/bg.webp";
import createImg from "../../img/create.png";
import completeImg from "../../img/complete.png";
import addImg from "../../img/add.png";

const homepageStyle = {
  backgroundImage : `url(${backgroundImg})`
}

export default function Home() {
  return (
    <div className='homepage' style={homepageStyle}>
      <section className='banner'>
        <h2>Sign Up for free</h2>
        <div>
            <button className='signup-btn'>Sign Up</button>
        </div>
      </section>
      <section className='card-section'>
        <div className="cards">
          <div className="card">
            <div className="card-img">
              <img src={createImg} alt="not found"/>
            </div>
            <div className="card-title">Create your todo Lists</div>
            <div className="card-text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum sed distinctio tempora eaque culpa dolores facere amet necessitatibus voluptas! Animi!
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src={addImg} alt="not found"/>
            </div>
            <div className="card-title">Add tasks to List</div>
            <div className="card-text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum sed distinctio tempora eaque culpa dolores facere amet necessitatibus voluptas! Animi!
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src={completeImg} alt="not found" style={{background: "white"}}/>
            </div>
            <div className="card-title">Checklist your tasks</div>
            <div className="card-text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum sed distinctio tempora eaque culpa dolores facere amet necessitatibus voluptas! Animi!
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
