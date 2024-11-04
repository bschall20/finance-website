import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Contact() {
  return (
    <div id="contact" className="center">
      <div className="pageIntro contactIntro center">
        <h2>Contact Us</h2>
      </div>

      <div className="contactContent center">
        <div className="contactInfo center">
          <p style={{ color: "#1C2758" }}>LET'S GET IN TOUCH</p>
          <h2 className="mb-3">Connect With Us.</h2>
          <p>
            Your financial success and satisfaction are our top priorities. <br/>
            Let us know how we can provide the best support for you.
          </p>
        </div>

        <div className="contactForm">
          <h2>Send Us A Message</h2>
          <p>Provide feedback or ask a question, we're here for it all.</p>
          <Form
            action="mailto:"
            method="post"
            encType="text/plain"
          >
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="Name"
                required="required"
                name="Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                required="required"
                name="Email"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Phone</Form.Label>
              <Form.Control as="textarea" rows={1} placeholder="Phone" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Your Message Here"
                required="required"
                name="Message"
              />
              <Form.Text className="text-muted">
                *We'll never share your information with anyone else.
              </Form.Text>
            </Form.Group>
            <Button type="submit">Send Message</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
