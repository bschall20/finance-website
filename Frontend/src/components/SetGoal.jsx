import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import AddGoalModal from "./AddGoalModal";

function SetGoal(props) {
  // Show amount saved since date using differential on heatmap (ie spent $48 on friday, saved $52 towards goal. behind or ahead of schedule)

  const [addGoalModalShow, setAddGoalModalShow] = useState(false);
  const addGoal = () => {
    console.log("Add Goal clicked.");
    setAddGoalModalShow(true);
  };

  return (
    <div>
      <h2>Set Goal</h2>
      <p>set goal component</p>
      {/* <button
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
      {/* <EditModal
      show={editModalShow}
      onHide={() => setEditModalShow(false)}
      id={0}
      num={0}
      title={0}
      amount={0}
      expensetype={0}
      date={0}
    /> */}
    <AddGoalModal show={addGoalModalShow}
      onHide={() => setAddGoalModalShow(false)}/>
    </div>
  );
}

export default SetGoal;
