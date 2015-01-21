/**
 * Copyright Digital Engagement Xperience 2014
 * Created by Andrew
 *
 */

/**
 * Translate into a common format for feedback items (e.g. comments or replies).
 *
 * @param feedbackId ID of the feedback
 * @param fromId ID of the user who created the feedback
 * @param fromName name of the user who created the feedback
 * @param message feedback text
 * @param time creation
 * @return {{id: *, from: {id: *, name: *}, message: *, time: *}}
 */
function translateFeedback(feedbackId, fromId, fromName, message, time) {
    return {
        id: feedbackId,
        from: {
            id: fromId,
            name: fromName
        },
        message: message,
        time: time
    };
}

module.exports = translateFeedback;
