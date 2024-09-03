// import React, { useState, useEffect } from "react";
import React from "react";
import Table from "react-bootstrap/Table";


function LoanTracker(props) {
 // Display on view: 
 // Name > Starting Amount > Interest > Start Date > Term (Months) > Balance Left > Payment (+interest) > Projected End Date?

// Enter on add:
// Name, Amount, Interest, Start Date, Term (Months)
// Balance left after adding payment(s)
// Can calculate:
// Payment(+interest), Projected End Date? (use amount left - (original amount PAYMENT amount * term left)

 // Table only has: 
 // Name > Principal (+ interest) > 


 return <Table striped bordered hover>
 <thead>
   <tr>
     <th>#</th>
     <th>Loan</th>
     <th>Starting Balance</th>
     <th>Term (months)</th>
     <th>Principal</th>
     <th>Payment <span style={{fontSize: ".75rem"}}>(+interest)</span></th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>1</td>
     <td>Honda Civic 2016</td>
     <td>15,000 at %5</td>
     <td>60</td>
     <td>12,000</td>
     <td>250 (+35)</td>
   </tr>
 </tbody>
</Table>
}

export default LoanTracker;
