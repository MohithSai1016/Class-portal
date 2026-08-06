function filterTimetable(rows, filters){

    return rows.filter(item=>{

        if(
            filters.day &&
            item.day_of_week!==filters.day
        ){

            return false;

        }

        if(
            filters.semester &&
            Number(item.semester)!==
            Number(filters.semester)
        ){

            return false;

        }

        if(
            filters.section &&
            item.section!==filters.section
        ){

            return false;

        }

        return true;

    });

}

module.exports={

filterTimetable

};