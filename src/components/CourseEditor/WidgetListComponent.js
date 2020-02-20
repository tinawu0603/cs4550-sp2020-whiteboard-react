import React from "react";
import { connect } from "react-redux";
import "../../css/widget-list.style.client.css"
import "../../css/course-editor.style.client.css"
import "../../css/styles.css"
import HeadingWidgetComponent from "./Widget/HeadingWidgetComponent";
import WidgetService from "../../services/WidgetService";
import { findWidgetsForTopic, createWidget, deleteWidget, updateWidgetUp, updateWidgetDown } from '../../actions/widgetActions'
import ParagraphWidgetComponent from "./Widget/ParagraphWidgetComponent";

class WidgetListComponent extends React.Component {
    state = {
        newWidgetTitle: "New Widget Title",
        newWidgetType: "HEADING",
        newWidgetValue: "",
        widgets: [],
        widget: {},
        topicId: this.props.topicId
    }

    componentDidMount = async () => {
        const widgets = await WidgetService.findWidgetsForTopic(this.props.topicId)
        this.setState({
            widgets: widgets.sort(compare)
        })
    }

    componentDidUpdate = async () => {
        const widgets = await WidgetService.findWidgetsForTopic(this.props.topicId);
        this.setState({
            widgets: widgets.sort(compare)
        })
    }

    save = (widget) => {
        this.setState(prevState => {
            return {
                widget: widget
            }
        })
        this.props.updateWidget(widget.id, widget);
        this.setState({ widget: {} });
    }

    render() {
        return (
            <ul className="wbdv-widget-list">
                <li>
                    <label class="widget-title">
                        Widget List
                    </label>
                    <label class="preview-title">
                        Preview
					</label>
                    <label class="switch" for="preview">
                        <input id="preview" type="checkbox" />
                        <span class="slider round"></span>
                    </label>
                </li>
                {
                    this.state.widgets && this.state.widgets.map(widget =>
                        <li key={widget.id} className="editor widget-item">
                            <div className="row">
                                <button type="button" className="btn-x btn" onClick={() => this.props.deleteWidget(widget.id)}>
                                    <img src="/img/x.svg" alt="" />
                                </button>
                                <select className="custom-select widget-type-select" onChange={(e) => {
                                    widget.type = e.target.value;
                                    this.props.updateWidget(widget.id, widget);
                                }} value={widget.type}>
                                    <option value="HEADING">Heading</option>
                                    <option value="PARAGRAPH">Paragraph</option>
                                </select>
                                <button className="button btn btn-edit" onClick={() =>
                                    this.setState({
                                        widget: widget
                                    })}>
                                    <img className="btn-edit" src="/img/edit.svg" alt="" />
                                </button>
                                <button type="button" class="btn-down btn" onClick={() => {
                                    this.props.updateWidgetDown(widget);
                                }}>
                                    <img className="btn-arrow" src="/img/arrow-down.svg" alt="" />
                                </button>
                                <button type="button" className="btn-up btn" onClick={() => {
                                    this.props.updateWidgetUp(widget);
                                }}>
                                    <img className="btn-arrow" src="/img/arrow-up.svg" alt="" />
                                </button>
                            </div>
                            {
                                widget.type === "HEADING" &&
                                <HeadingWidgetComponent
                                    save={this.save}
                                    editing={widget.id === this.state.widget.id}
                                    widget={widget} />
                            }
                            {
                                widget.type === "PARAGRAPH" &&
                                <ParagraphWidgetComponent
                                    save={this.save}
                                    editing={widget.id === this.state.widget.id}
                                    widget={widget} />
                            }
                        </li>
                    )
                }
                <li className="new-widget-section">
                    <div class="row new-widget">
                        <label className="new-widget-label">Widget Title</label>
                        <input type="text" id="new-widget-title-input" className="input-lg"
                            aria-describedby="widget-input" placeholder="Widget Name" onChange={(e) => this.setState({
                                newWidgetTitle: e.target.value
                            })}></input>
                        <label className="new-widget-label">Widget Value</label>
                        <input type="text" id="new-widget-value-input" className="input-lg"
                            aria-describedby="widget-input" placeholder="Widget Value" onChange={(e) => this.setState({
                                newWidgetValue: e.target.value
                            })}></input>
                        <select className="custom-select widget-type-select" id="create-widget-select">
                            <option selected value="HEADING">Heading</option>
                            <option value="PARAGRAPH">Paragraph</option>
                        </select>
                        <button type="button" class="btn-plus btn btn-new-widget" onClick={() => {
                            this.props.createWidget(this.props.topicId, {
                                title: this.state.newWidgetTitle,
                                value: this.state.newWidgetValue,
                                type: document.getElementById("create-widget-select").value
                            });
                            document.getElementById("new-widget-title-input").value = "";
                            document.getElementById("new-widget-value-input").value = "";
                            document.getElementById("create-widget-select").value = "HEADING";
                        }}>
                            <img src="/img/plus.svg" alt="" />
                        </button>
                    </div>
                </li>
            </ul>
        )
    }

}

const compare = (a, b) => {
    if (a.order < b.order) {
        return -1
    }
    else {
        return 0
    }
}

const stateToPropertyMapper = (state) => {
    return {
        widgets: state.widgets.widgets
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        updateWidget: (widgetId, widget, topicId) => {
            WidgetService.updateWidget(widgetId, widget)
                .then(status =>
                    WidgetService.findWidgetsForTopic(topicId)
                        .then(actualWidgets =>
                            dispatch(findWidgetsForTopic(actualWidgets.sort(compare)))))
        },

        deleteWidget: (widgetId) =>
            WidgetService.deleteWidget(widgetId)
                .then(status =>
                    dispatch(deleteWidget(widgetId))),

        createWidget: (topicId, widget) =>
            WidgetService.createWidget(topicId, widget)
                .then(actualWidget =>
                    dispatch(createWidget(actualWidget))),

        findWidgetsForTopic: (topicId) =>
            WidgetService.findWidgetsForTopic(topicId)
                .then(actualWidgets =>
                    dispatch(findWidgetsForTopic(actualWidgets.sort(compare)))),

        updateWidgetUp: (widget) =>
            WidgetService.updateWidgetUp(widget)
                .then(actualWidgets =>
                    dispatch(updateWidgetUp(actualWidgets.sort(compare)))),

        updateWidgetDown: (widget) => {
            WidgetService.updateWidgetDown(widget)
                .then(actualWidgets =>
                    dispatch(updateWidgetDown(actualWidgets.sort(compare))))
        }

    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)
    (WidgetListComponent)