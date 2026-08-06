function calculateCGPA(results){

    if(results.length===0){
        return 0;
    }

    const total =
        results.reduce(
            (sum,row)=>sum+row.gpa,
            0
        );

    return Number(
        (total/results.length)
        .toFixed(2)
    );

}

module.exports = {

    calculateCGPA

};
