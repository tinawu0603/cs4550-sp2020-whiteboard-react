import { API_URL } from "../constants";

export const createTopic = (lessonId, topic) =>
    fetch(`${API_URL}/lessons/${lessonId}/topics`, {
        method: 'POST',
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findTopicsForLesson = (lessonId) =>
    fetch(`${API_URL}/lessons/${lessonId}/topics`)
        .then(response => response.json())

export const findTopic = (topicId) =>
    fetch(`${API_URL}/topics/${topicId}`)
        .then(response => response.json())

export const updateTopic = (topicId, topic) =>
    fetch(`${API_URL}/topics/${topicId}`, {
        method: 'PUT',
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const deleteTopic = (topicId) =>
    fetch(`${API_URL}/topics/${topicId}`, {
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