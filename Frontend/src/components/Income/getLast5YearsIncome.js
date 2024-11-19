const getLast5YearsIncome = (income) => {
    let d = new Date();
    let thisYear = d.getFullYear();

  let last_5_years_income = [];
  let yearCurrent = 0;
  let yearOne = 0;
  let yearTwo = 0;
  let yearThree = 0;
  let yearFour = 0;
  income.map((dataObj) => {
    let amount = dataObj.amount;
    let time = dataObj.payment_interval;
    // console.log(amount)
    // console.log(dataObj.payment_interval)

    if (time === "Daily"){
      amount *= 365
    } else if (time === "Weekly"){
      amount *= 52
    } else if (time === "BiWeekly"){
      amount *= 26
    } else if (time === "SemiMonthly"){
      amount *= 24
    } else if (time === "Monthly"){
      amount *= 12
    }


    // occurring === null is if it's still an occurring payment
    if ((dataObj.occurring === null) && (parseInt(dataObj.start_date) === thisYear -1)){
      yearCurrent += amount;
      yearOne += amount;
    } else if ((dataObj.occurring === null) && (parseInt(dataObj.start_date) === thisYear -2)){
      yearCurrent += amount;
      yearOne += amount;
      yearTwo += amount;
    } else if ((dataObj.occurring === null) && (parseInt(dataObj.start_date) === thisYear -3)){
      yearCurrent += amount;
      yearOne += amount;
      yearTwo += amount;
      yearThree += amount;
    } else if ((dataObj.occurring === null) && (parseInt(dataObj.start_date) < thisYear)){
      yearCurrent += amount;
      yearOne += amount;
      yearTwo += amount;
      yearThree += amount;
      yearFour += amount;
    } else if (parseInt(dataObj.start_date) === thisYear){
      yearCurrent += amount;
    } else if (parseInt(dataObj.start_date) === thisYear - 1){
      yearOne += amount;
    } else if (parseInt(dataObj.start_date) === thisYear - 2){
      yearTwo += amount;
    } else if (parseInt(dataObj.start_date) === thisYear - 3){
      yearThree += amount;
    } else if (parseInt(dataObj.start_date) === thisYear - 4){
      yearFour += amount;
    }
    return 0;
  })
  last_5_years_income = [yearFour, yearThree, yearTwo, yearOne, yearCurrent]

  return last_5_years_income;
}


export default getLast5YearsIncome;