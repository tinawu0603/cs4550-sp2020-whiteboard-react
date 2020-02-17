import { LOCALHOST8080 } from "../constants";

export const createWidget = (topicId, widget) =>
    fetch(`${LOCALHOST8080}/api/topics/${topicId}/widgets`, {
        method: 'POST',
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findWidgetsForTopic = (topicId) =>
    fetch(`${LOCALHOST8080}/api/topics/${topicId}/widgets`)
        .then(response => response.json())

export const findWidgetById = (widgetId) =>
    fetch(`${LOCALHOST8080}/api/widgets/${widgetId}`)
        .then(response => response.json())

export const updateWidget = (widgetId, widget) =>
    fetch(`${LOCALHOST8080}/api/widgets/${widgetId}`, {
        method: 'PUT',
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const deleteWidget = (widgetId) =>
    fetch(`${LOCALHOST8080}/api/widgets/${widgetId}`, {
        method: "DELETE"
    })
        .then(response => response.json())

export default {
    createWidget,
    findWidgetsForTopic,
    findWidgetById,
    updateWidget,
    deleteWidget
}