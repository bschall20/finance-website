import React from "react";
import { TbTargetArrow } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaBusinessTime } from "react-icons/fa6";
import { FaCalculator } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";

import { FaBookOpen } from "react-icons/fa6";
import { FaPuzzlePiece } from "react-icons/fa6";
import { FaBrain } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";

import Family from "../images/family.jpg";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function About() {
  return (
    <div id="about" className="center">
      <div className="aboutIntro pageIntro center">
        <h2>About Us</h2>
      </div>

      <div className="aboutInfo1 center my-5">
        <div className="aboutInfo1L center">
          <img
            src={Family}
            alt="A mother and father with their child."
            className="aboutImg"
          />
        </div>
        <div className="aboutInfo1R center">
          <h3>Build My Finance - Your Financial Partner</h3>
          <p className="aboutUs mb-5">
            Founded in 2024, we at Build My Finance are dedicated to providing
            the most accessible way to view your funds in a clean manner. In
            doing so, we believe that we can help you understand your goals in
            an organized fashion and navigate the complex world of finances,
            which can sometimes be uncomfortable. With us, we hope to make your
            world of money easier to pursue.
          </p>
          <div className="missionStatement center">
            <TbTargetArrow style={{ width: "500px", height: "50px" }} />
            <p>
              <span>
                <h4>Our Mission.</h4>
              </span>
              To make the world of finances easier to navigate and keep money in
              your hands. At Build My Finance, we believe the best way to view
              your money, is to see your money. Visualizing where you spend your
              money at and what you spend it on can help to provide a better
              understanding of where you may want to, or not want to, spend your
              hard earned cash.
            </p>
          </div>
        </div>
      </div>

      <div className="center aboutInfo2 mb-5 py-3">
        <p>
          <span>
            <FaPeopleGroup
              style={{ width: "35px", height: "35px" }}
              className="my-2"
            />
          </span>
          <br />
          Supporting you and your family
        </p>
        <p>
          <span>
            <FaBusinessTime
              style={{ width: "35px", height: "35px" }}
              className="my-2"
            />
          </span>
          <br />
          Saving your business time
        </p>
        <p>
          <span>
            <FaCalculator
              style={{ width: "35px", height: "35px" }}
              className="my-2"
            />
          </span>
          <br />
          Calculations done for you
        </p>
        <p>
          <span>
            <FaLock
              style={{ width: "35px", height: "35px" }}
              className="my-2"
            />
          </span>
          <br />
          Keeping your numbers secure
        </p>
      </div>

      <div className="center aboutInfo3 mb-5">
        <div>
          <p style={{ color: "#1C2758" }}>WHY CHOOSE BUILD MY FINANCE?</p>
          <h3 className="mb-3">Easy Access to Top Financial Products</h3>
          <p>
            We have established strong partnerships with leading financial
            companies & Banks to ensure you have access to the best loans,
            credit cards, insurance plans, and more. We work tirelessly to find
            the most competitive offers for our clients.
          </p>
          <Button variant="info">Let's Get Started</Button>
        </div>
        <Row xs={1} md={2} className="g-4">
          <Col>
            <Card className="mb-4">
              <FaBrain
                variant="top"
                style={{ width: "35px", height: "35px" }}
              />
              <Card.Body>
                <Card.Title>Expertise</Card.Title>
                <Card.Text>
                  We stay up to date to provide you with the correct
                  information, ensuring you're always ahead of things.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <FaBookOpen
                variant="top"
                style={{ width: "35px", height: "35px" }}
              />
              <Card.Body>
                <Card.Title>Financial Education</Card.Title>
                <Card.Text>
                  We provide educational tools to explain your financial
                  adventure. We aim to keep you informed throughout.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="my-4">
              <FaPuzzlePiece
                variant="top"
                style={{ width: "35px", height: "35px" }}
              />
              <Card.Body>
                <Card.Title>Personalized Solutions</Card.Title>
                <Card.Text>
                  Whether you're looking to plan for your own future, or for a
                  group, we're here with the right options covered for you.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <FaEye variant="top" style={{ width: "35px", height: "35px" }} />
              <Card.Body>
                <Card.Title>Transparency</Card.Title>
                <Card.Text>
                  You can trust us to provide clear and honest information about
                  the products and services we offer to help guide you.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default About;
