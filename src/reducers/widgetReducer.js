import { CREATE_WIDGET, DELETE_WIDGET, FIND_WIDGETS_FOR_TOPIC, UPDATE_WIDGET } from "../actions/widgetActions";

const initialState = {
    widgets: []
}

const widgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_WIDGETS_FOR_TOPIC:
            return {
                widgets: action.widgets
            }
        case CREATE_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    action.newWidget
                ]
            }
        case DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => widget._id !== action.widgetId)
            }
        case UPDATE_WIDGET:
            return {
                widgets: state.widgets.map(widget => widget._id === action.widgetId ? action.widget : widget)
            }
        default:
            return state
    }
}

export default widgetReducer