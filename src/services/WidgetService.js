import { MYSERVER } from "../constants";

export const createWidget = (topicId, widget) =>
    fetch(`${MYSERVER}/api/topics/${topicId}/widgets`, {
        method: 'POST',
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findWidgetsForTopic = (topicId) =>
    fetch(`${MYSERVER}/api/topics/${topicId}/widgets`)
        .then(response => response.json())

export const findWidgetById = (widgetId) =>
    fetch(`${MYSERVER}/api/widgets/${widgetId}`)
        .then(response => response.json())

export const updateWidget = (widgetId, widget) =>
    fetch(`${MYSERVER}/api/widgets/${widgetId}`, {
        method: 'PUT',
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const deleteWidget = (widgetId) =>
    fetch(`${MYSERVER}/api/widgets/${widgetId}`, {
        method: "DELETE"
    })
        .then(response => response.json())

export const updateWidgetUp = (widget) =>
    fetch(`${MYSERVER}/api/widgets/up`, {
        method: 'POST',
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const updateWidgetDown = (widget) =>
    fetch(`${MYSERVER}/api/widgets/down`, {
        method: 'POST',
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export default {
    createWidget,
    findWidgetsForTopic,
    findWidgetById,
    updateWidget,
    deleteWidget,
    updateWidgetUp,
    updateWidgetDown
}