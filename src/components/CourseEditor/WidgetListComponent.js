import React from "react";
import { connect } from "react-redux";
import "../../css/widget-list.style.client.css"
import "../../css/course-editor.style.client.css"
import "../../css/styles.css"
import HeadingWidgetComponent from "./Widget/HeadingWidgetComponent";
import WidgetService from "../../services/WidgetService";
import { findWidgetsForTopic, createWidget, deleteWidget, updateWidgetUp, updateWidgetDown, updateWidget } from '../../actions/widgetActions'
import ParagraphWidgetComponent from "./Widget/ParagraphWidgetComponent";
import ListWidgetComponent from "./Widget/ListWidgetComponent";
import ImageWidgetComponent from "./Widget/ImageWidgetComponent";

class WidgetListComponent extends React.Component {
    state = {
        newWidgetTitle: "New Widget Title",
        newWidgetType: "HEADING",
        newWidgetValue: "",
        widgets: [],
        widget: {},
        topicId: this.props.topicId ? parseInt(this.props.topicId) : "",
        preview: false
    }

    componentDidMount = async () => {
        await this.props.findWidgetsForTopic(this.props.topicId);
    }

    save = (widget) => {
        this.setState(prevState => {
            return {
                widget: widget
            }
        })
        this.props.updateWidget(parseInt(widget.id), widget);
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
                        <input id="preview" type="checkbox" onClick={() =>
                            this.setState({ preview: !this.state.preview })} />
                        <span class="slider round"></span>
                    </label>
                </li>
                {
                    Array.isArray(this.props.widgets) && this.props.widgets.length > 0 && this.state.preview && this.props.widgets.map(widget =>
                        <li key={widget.id} className="editor widget-item">
                            {
                                widget.type === "HEADING" &&
                                <HeadingWidgetComponent
                                    preview={this.state.preview}
                                    save={this.save}
                                    editing={widget.id === parseInt(this.state.widget.id)}
                                    widget={widget} />
                            }
                            {
                                widget.type === "PARAGRAPH" &&
                                <ParagraphWidgetComponent
                                    preview={this.state.preview}
                                    save={this.save}
                                    editing={widget.id === parseInt(this.state.widget.id)}
                                    widget={widget} />
                            }
                            {
                                widget.type === "LIST" &&
                                <ListWidgetComponent
                                    preview={this.state.preview}
                                    save={this.save}
                                    editing={widget.id === parseInt(this.state.widget.id)}
                                    widget={widget} />
                            }
                            {
                                widget.type === "IMAGE" &&
                                <ImageWidgetComponent
                                    preview={this.state.preview}
                                    save={this.save}
                                    editing={widget.id === parseInt(this.state.widget.id)}
                                    widget={widget} />
                            }
                        </li>
                    )
                }
                {
                    Array.isArray(this.props.widgets) && this.props.widgets.length > 0 && !this.state.preview && this.props.widgets.map(widget =>
                        <li key={widget.id} className="editor widget-item">
                            <div className="row">
                                <button type="button" className="btn-x btn" onClick={() => this.props.deleteWidget(widget.id)}>
                                    <img src="/img/x.svg" alt="" />
                                </button>
                                <select className="custom-select widget-type-select" onChange={(e) => {
                                    widget.type = e.target.value;
                                    this.props.updateWidget(parseInt(widget.id), widget);
                                }} value={widget.type}>
                                    <option value="HEADING">Heading</option>
                                    <option value="PARAGRAPH">Paragraph</option>
                                    <option value="LIST">List</option>
                                    <option value="IMAGE">Image</option>
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
                                    editing={widget.id === parseInt(this.state.widget.id)}
                                    widget={widget} />
                            }
                            {
                                widget.type === "PARAGRAPH" &&
                                <ParagraphWidgetComponent
                                    save={this.save}
                                    editing={widget.id === parseInt(this.state.widget.id)}
                                    widget={widget} />
                            }
                            {
                                widget.type === "LIST" &&
                                <ListWidgetComponent
                                    save={this.save}
                                    editing={widget.id === parseInt(this.state.widget.id)}
                                    widget={widget} />
                            }
                            {
                                widget.type === "IMAGE" &&
                                <ImageWidgetComponent
                                    save={this.save}
                                    editing={widget.id === parseInt(this.state.widget.id)}
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
                            <option value="LIST">List</option>
                            <option value="IMAGE">Image</option>
                        </select>
                        <button type="button" class="btn-plus btn btn-new-widget" onClick={() => {
                            this.props.createWidget(parseInt(this.props.topicId), {
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

const stateToPropertyMapper = (state) => {
    return {
        widgets: state.widgets.widgets
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        updateWidget: (widgetId, widget, topicId) => {
            WidgetService.updateWidget(parseInt(widgetId), widget)
                .then(status =>
                    dispatch(updateWidget(parseInt(widgetId), widget)))
        },

        deleteWidget: (widgetId) =>
            WidgetService.deleteWidget(parseInt(widgetId))
                .then(status =>
                    dispatch(deleteWidget(widgetId))),

        createWidget: (topicId, widget) =>
            WidgetService.createWidget(parseInt(topicId), widget)
                .then(actualWidget =>
                    dispatch(createWidget(actualWidget))),

        findWidgetsForTopic: (topicId) => {
            if (topicId) {
                WidgetService.findWidgetsForTopic(topicId)
                    .then(actualWidgets =>
                        dispatch(findWidgetsForTopic(actualWidgets)))
            }
        },

        updateWidgetUp: (widget) =>
            WidgetService.updateWidgetUp(widget)
                .then(actualWidgets =>
                    dispatch(updateWidgetUp(actualWidgets))),

        updateWidgetDown: (widget) => {
            WidgetService.updateWidgetDown(widget)
                .then(actualWidgets =>
                    dispatch(updateWidgetDown(actualWidgets)))
        }

    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)
    (WidgetListComponent)