import React from "react";
import LifeBlocks from "../images/life-blocks.jpg"

function Home() {
  return (
    <div id="home">

      <div className="homeIntro">
        <div className="homeIntroL">
          <h2>Visualize All of Your <br /> Finances in One Place.</h2>
          <p>Personalize all of your incomes and expenses with graphic charts to better plan for your future.</p>
          <button className="btn btn-success">Sign Up Today.</button>
        </div>
        <div className="homeIntroR">
          <img src={LifeBlocks} alt="Life Building Blocks" className="lifeBlocks"/>
        </div>
      </div>

      {/* <div className="homeIntrov">
        <div className="homeIntroL">
          <p>This is the Home page.</p>
          <p>WOOP WOOP!!</p>
        </div>
        <div className="homeIntroR">
          <p>This is the Home page.</p>
          <p>WOOP WOOP!!</p>
        </div>
      </div> */}
    </div>
  );
}

export default Home;
