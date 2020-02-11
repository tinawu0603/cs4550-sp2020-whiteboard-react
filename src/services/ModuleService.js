import { API_URL } from "../constants";

export const createModule = (courseId, module) =>
    fetch(`${API_URL}/courses/${courseId}/modules`, {
        method: 'POST',
        body: JSON.stringify(module),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findModuleForCourse = (courseId) =>
    fetch(`${API_URL}/courses/${courseId}/modules`)
        .then(response => response.json())

export const findModule = (moduleId) =>
    fetch(`${API_URL}/modules/${moduleId}`)
        .then(response => response.json())

export const updateModule = (moduleId, module) =>
    fetch(`${API_URL}/modules/${moduleId}`, {
        method: 'PUT',
        body: JSON.stringify(module),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const deleteModule = (moduleId) =>
    fetch(`${API_URL}/modules/${moduleId}`, {
        method: "DELETE"
    })
        .then(response => response.json())

export default {
    createCourse,
    findModuleForCourse,
    findModule,
    updateModule,
    deleteModule
}