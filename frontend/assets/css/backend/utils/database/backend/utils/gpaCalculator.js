function calculateGPA(subjects){

    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach(subject=>{

        totalCredits += subject.credits;

        totalPoints +=
            subject.gradePoint *
            subject.credits;

    });

    if(totalCredits===0){
        return 0;
    }

    return Number(
        (totalPoints/totalCredits)
        .toFixed(2)
    );

}

module.exports = {

    calculateGPA

};