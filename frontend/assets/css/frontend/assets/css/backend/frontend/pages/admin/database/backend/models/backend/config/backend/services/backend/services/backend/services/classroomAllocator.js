function assignRoom(classrooms, index) {

    if (classrooms.length === 0) {

        return null;

    }

    return classrooms[
        index % classrooms.length
    ];

}

module.exports = {

    assignRoom

};