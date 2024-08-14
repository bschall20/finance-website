import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import GoalModal from "./GoalModal";

function SetGoal(props) {
  // Show amount saved since date using differential on heatmap (ie spent $48 on friday, saved $52 towards goal. behind or ahead of schedule)

  const [addGoalModalShow, setAddGoalModalShow] = useState(false);
  const addGoal = () => {
    console.log("Add Goal clicked.");
    setAddGoalModalShow(true);
  };

  return (
    <div>
      <h2>Add Goal</h2>
      {/* MAKE THE BUTTON CIRCULAR!!!!!!
        <button
        // variant="primary"
        style={{
          borderRadius: "100%",
          fontSize: "1.5rem",
          padding: "1.5rem",
          height: "1.5rem",
          width: "1.5rem",
          lineHeight: "0px",
          //   overflow: "hidden"
        }}
        onClick={addGoal}
      >
        +
      </button> */}
      <Button variant="primary" size="lg" style={{}} onClick={addGoal}>
        +
      </Button>

      <GoalModal
        show={addGoalModalShow}
        showsubmit={1}
        postgoal={1}
        id={props.id}
        num={props.num}
        title={props.title}
        amount={props.amount}
        // startdate={props.startdate}
        goaldate={props.goaldate}
        onHide={() => setAddGoalModalShow(false)}
      />
    </div>
  );
}

export default SetGoal;
