import { API_URL } from "../constants";

export const createLesson = (moduleId, lesson) =>
    fetch(`${API_URL}/modules/${moduleId}/lessons`, {
        method: 'POST',
        body: JSON.stringify(lesson),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findLessonsForModule = (moduleId) =>
    fetch(`${API_URL}/modules/${moduleId}/lessons`)
        .then(response => response.json())

export const findLesson = (lessonId) =>
    fetch(`${API_URL}/lessons/${lessonId}`)
        .then(response => response.json())

export const updateLesson = (lessonId, lesson) =>
    fetch(`${API_URL}/lessons/${lessonId}`, {
        method: 'PUT',
        body: JSON.stringify(lesson),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const deleteLesson = (lessonId) =>
    fetch(`${API_URL}/lessons/${lessonId}`, {
        method: "DELETE"
    })
        .then(response => response.json())

export default {
    createLesson,
    findLessonsForModule,
    findLesson,
    updateLesson,
    deleteLesson
}