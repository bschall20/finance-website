import React from "react";
import LifeBlocks from "../images/life-blocks.jpg";
import Relax from "../images/relax.jpg";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";

function Home() {
  return (
    <div id="home">
      <div className="homeSlim">
        <div className="homeIntro">
          <div className="homeIntroL">
            <h2>
              Visualize All of Your <br /> Finances in One Place.
            </h2>
            <p>
              Personalize all of your incomes and expenses with graphic charts
              to better plan for your future.
            </p>
            <button className="btn btn-success">Sign Up Today.</button>
          </div>
          <div className="homeIntroR">
            <img
              src={LifeBlocks}
              alt="Life Building Blocks"
              className="lifeBlocks"
            />
          </div>
        </div>

        <div className="home2">
          <div className="home2Info">
            <h2>Planning Has Never Been Easier</h2>
            <p>
              Insert your expenses to get a look at how your financial future
              will impact you. Adjust the variables to fit your planning needs
              and feel more secure.
            </p>
          </div>
        </div>

        <div className="homeCards">
          <CardGroup>
            <Card border="primary" style={{ border: "none" }}>
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
              <FaHandHoldingDollar variant="top" className="cardImg" />
              <Card.Body>
                <Card.Title>Guided Finances</Card.Title>
                <Card.Text>
                  Get feedback on what you're spending and where you're spending
                  it. View charts that display which sectors you're spending the
                  most of your money in. Choose to increase or decrease your
                  spending as it applies.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card border="success" className="mx-5" style={{ border: "none" }}>
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
              <FaRegClock variant="top" className="cardImg" />
              <Card.Body className="midCard">
                <Card.Title>24/7 Access</Card.Title>
                <Card.Text>
                  Available around the clock for your charting and financing
                  needs. Apply any changes to your account finances, at any
                  time.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card border="primary" style={{ border: "none" }}>
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
              <FaCalendarDays variant="top" className="cardImg" />
              <Card.Body>
                <Card.Title>Time Tracking</Card.Title>
                <Card.Text>
                  Understand your finances in daily, weekly, monthly, and yearly
                  increments. See a calender to display whether you're ahead or
                  behind of your financial goals and plan to adjust your timely
                  goals.
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </div>
      </div>

      <div className="homeOutro center">
        <div className="homeOutroContent center">
          <div className="homeOutroL">
            <img
              src={Relax}
              alt="Girl leaning against wall with headphones in."
              className="relaxImg"
            />
          </div>
          <div className="homeOutroR">
            <h2>Kickback and Relax.</h2>
            <p>
              Relax and remain stress-free on the state of your financials with
              our advanced planning for your future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
