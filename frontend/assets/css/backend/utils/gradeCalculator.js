function calculateGrade(percent){

    if(percent>=90) return "A+";

    if(percent>=80) return "A";

    if(percent>=70) return "B";

    if(percent>=60) return "C";

    if(percent>=50) return "D";

    return "F";

}

module.exports={

calculateGrade

};