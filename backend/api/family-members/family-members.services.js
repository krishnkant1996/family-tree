exports.createFamilyMembers = async(data={}, transactionId=null) => {

    let result = await DB.FamilyMembers.createFamilyMembers(data, transactionId);
    if(result) {
        return { success: true, data: result, messages: 'FAMILY_MEMBER_ADDED_SUCCUSSFULLY', status: HTTP_STATUS.OK }
    }
    return { success: false, data: {}, messages: 'NOT_FOUND', status: HTTP_STATUS.NOT_FOUND }
}


exports.delete = async(data={}, transactionId=null) => {

    let result = await DB.FamilyMembers.deleteMembers(data, transactionId);
    if(result) {
        return { success: true, data: result, messages: 'FAMILY_MEMBER_DELETED_SUCCUSSFULLY', status: HTTP_STATUS.OK }
    }
    return { success: false, data: {}, messages: 'NOT_FOUND', status: HTTP_STATUS.NOT_FOUND }
}

