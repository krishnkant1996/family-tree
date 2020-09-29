exports.createFamily = async(data={}, transactionId=null) => {
    let result = await DB.Family.createFamily(data, transactionId);
    if(result) {
        return { success: true, data: result, messages: 'FAMILY_CREATED_SUCCUSSFULLY', status: HTTP_STATUS.OK }
    }
    return { success: false, data: {}, messages: 'NOT_FOUND', status: HTTP_STATUS.NOT_FOUND }
}

exports.list = async(params) => {
    let result = await DB.Family.list(params);
    if(result) {
        return { success: true, data: result, messages: 'FAMILY_LIST', status: HTTP_STATUS.OK }
    }
    return { success: false, data: {}, messages: 'NOT_FOUND', status: HTTP_STATUS.NOT_FOUND }
}
exports.delete = async(data={}, transactionId=null) => {
    let result = await DB.Family.deleteFamily(data, transactionId);
    if(result) {
        return { success: true, data: result, messages: 'FAMILY_DELETED_SUCCUSSFULLY', status: HTTP_STATUS.OK }
    }
    return { success: false, data: {}, messages: 'NOT_FOUND', status: HTTP_STATUS.NOT_FOUND }
}


