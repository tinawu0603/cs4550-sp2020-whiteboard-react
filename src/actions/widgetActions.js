export const CREATE_WIDGET = "CREATE_WIDGET"
export const createWidget = (widget) => ({
    type: CREATE_WIDGET,
    newWidget: widget
})

export const FIND_WIDGETS_FOR_TOPIC = "FIND_WIDGETS_FOR_TOPIC"
export const findWidgetsForTopic = (widgets) => ({
    type: FIND_WIDGETS_FOR_TOPIC,
    widgets: widgets
})

export const UPDATE_WIDGET = "UPDATE_WIDGET"
export const updateWidget = (widgetId, widget) => ({
    type: UPDATE_WIDGET,
    widgetId: widgetId,
    widget: widget
})

export const DELETE_WIDGET = "DELETE_WIDGET"
export const deleteWidget = (widgetId) => ({
    type: DELETE_WIDGET,
    widgetId: widgetId
})

export const UPDATE_WIDGET_UP = "UPDATE_WIDGET_UP"
export const updateWidgetUp = (widgets) => ({
    type: UPDATE_WIDGET_UP,
    widgets: widgets
})

export const UPDATE_WIDGET_DOWN = "UPDATE_WIDGET_DOWN"
export const updateWidgetDown = (widgets) => ({
    type: UPDATE_WIDGET_DOWN,
    widgets: widgets
})