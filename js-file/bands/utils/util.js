export const trueArrMembersFromBandRes = (arr) => {
    if (arr.members) {
        let goodArrMembers = [];
        let arrMembers = arr.members;
        for (let index = 0; index < arrMembers.length; index++) {
            const member = arrMembers[index];
            goodArrMembers.push({
                id: member.id,
                artist: member.artist,
                instrument: member.instrument,
                year: member.year,
            });
        }
        return goodArrMembers;
    }
    else {
        return null;
    }
};
