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
import { useCookies } from "react-cookie";

import Family from "../images/family.jpg";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function About() {
  // Ignore unused variables on next line:
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(null);
  return (
    <div id="about" className="center">
      <div className="aboutIntro pageIntro center">
        <h2>About Us</h2>
      </div>

      <div className="aboutInfo1 center">
        <div className="aboutInfo1L center">
          <img
            src={Family}
            alt="A mother and father with their child."
            className="aboutImg"
          />
        </div>
        <div className="aboutInfo1R center">
          <div className="aboutInfo1RHeader">
            <img
              src={Family}
              alt="A mother and father with their child."
              className="aboutImg2"
            />
            <div className="center" style={{flexDirection: "column"}}>
              <h3>Build My Finance - Your Financial Partner</h3>
              <p className="mb-5">
                Founded in 2024, we at Build My Finance are dedicated to
                providing the most accessible way to view your funds in a clean
                manner. In doing so, we believe that we can help you understand
                your goals in an organized fashion and navigate the complex
                world of finances, which can sometimes be uncomfortable. With
                us, we hope to make your world of money easier to pursue.
              </p>
            </div>
          </div>
          <div className="missionStatement center">
            {/* <TbTargetArrow style={{ width: "500px", height: "50px" }} /> */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <TbTargetArrow
                style={{ width: "4rem", height: "4rem", marginRight: "1rem" }}
              />
            </div>
            {/* <TbTargetArrow/> */}
            <div>
              <h4>Our Mission.</h4>
              <p>
                To make the world of finances easier to navigate and keep money
                in your hands. At Build My Finance, we believe the best way to
                view your money, is to see your money. Visualizing where you
                spend your money at and what you spend it on can help to provide
                a better understanding of where you may want to, or not want to,
                spend your hard earned cash.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="center aboutInfo2 mb-5 py-3">
        <Row xs={2} lg={4}>
          <Col>
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
          </Col>

          <Col>
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
          </Col>

          <Col>
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
          </Col>

          <Col>
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
          </Col>
        </Row>
      </div>

      <div className="center aboutInfo3 mb-5">
        <div className="aboutInfo3Header">
          <p style={{ color: "#1C2758" }}>WHY CHOOSE BUILD MY FINANCE?</p>
          <h3 className="mb-3">Easy Access to Your Financials</h3>
          <p>
            We have established detailed graphics mixed with your financial
            numbers to aid in finding your spending patterns and assist you with
            whatever goals you may have. From you, your family, or your
            business, we're here to assist you and your future.
          </p>
          {cookies.Email ? (
            <a href="/financemanagement">
              <Button variant="info">Let's Get Started</Button>
            </a>
          ) : (
            <a href="/signin">
              <Button variant="info">Let's Get Started</Button>
            </a>
          )}
        </div>
        <div>
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
              <Card className="my-4" style={{ backgroundColor: "#0DCAF0" }}>
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
                <FaEye
                  variant="top"
                  style={{ width: "35px", height: "35px" }}
                />
                <Card.Body>
                  <Card.Title>Transparency</Card.Title>
                  <Card.Text>
                    You can trust us to provide clear and honest information
                    about the products and services we offer to help guide you.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default About;
