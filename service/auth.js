const sessionIdToUserIdMap = new Map()

function setUser(sessionId, userId) {
    sessionIdToUserIdMap.set(sessionId, userId)
}

function getUser(sessionId) {
    return sessionIdToUserIdMap.get(sessionId)
}

module.exports = {
    setUser,
    getUser
}