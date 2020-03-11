import { MYSERVER } from "../constants";

export const createTopic = (lessonId, topic) =>
    fetch(`${MYSERVER}/api/lessons/${lessonId}/topics`, {
        method: 'POST',
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findTopicsForLesson = (lessonId) =>
    fetch(`${MYSERVER}/api/lessons/${lessonId}/topics`)
        .then(response => response.json())

export const findTopic = (topicId) =>
    fetch(`${MYSERVER}/api/topics/${topicId}`)
        .then(response => response.json())

export const updateTopic = (topicId, topic) =>
    fetch(`${MYSERVER}/api/topics/${topicId}`, {
        method: 'PUT',
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const deleteTopic = (topicId) =>
    fetch(`${MYSERVER}/api/topics/${topicId}`, {
        method: "DELETE"
    })
        .then(response => response.json())

export default {
    createTopic,
    findTopicsForLesson,
    findTopic,
    updateTopic,
    deleteTopic
}