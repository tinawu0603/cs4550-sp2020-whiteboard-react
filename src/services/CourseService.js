import { API_URL } from "../constants";

const coursesURL = API_URL + "/courses"

export const createCourse = (course) =>
    fetch(coursesURL, {
        method: 'POST',
        body: JSON.stringify(course),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findAllCourses = async () => {
    const response = await fetch(coursesURL)
    return await response.json()
}

export const findCourseById = async (id) => {
    const response = await fetch(`${coursesURL}/${id}`)
    return await response.json()
}

export const updateCourse = (id, course) =>
    fetch(`${coursesURL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(course),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const deleteCourse = async (id) => {
    const response = await fetch(`${coursesURL}/${id}`, {
        method: 'DELETE'
    })
    return await response.json()
}
