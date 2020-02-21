import React from "react";
import "../../../css/widget-list.style.client.css";
import "../../../css/course-editor.style.client.css";
import "../../../css/styles.css";

class ParagraphWidgetComponent extends React.Component {
    state = {
        widget: this.props.widget,
        topicId: this.props.topicId,
    }

    componentDidUpdate() {
        this.render();
    }

    updateForm = (newState) => {
        this.setState(newState);
    }

    render() {
        return (
            <div>
                {
                    !this.props.preview &&
                    <div>
                        <h1>{this.state.widget.title}</h1>
                    </div>
                }
                {
                    !this.props.editing &&
                    <div>
                        <p>{this.state.widget.value}</p>
                    </div>
                }
                {
                    this.props.editing &&
                    <div>
                        <div className="row">
                            <label>Title: </label>
                            <input type="text" className="form-control" id="widget-name-input"
                                aria-describedby="widget-name-input" placeholder="Widget name"
                                onChange={(e) => {
                                    const newTitle = e.target.value;
                                    this.setState(prevState => ({
                                        widget: {
                                            ...prevState.widget,
                                            title: newTitle
                                        }
                                    }))
                                }} value={this.state.widget.title} />
                        </div>
                        <div className="row">
                            <label>Value: </label>
                            <textarea type="text" rows="3" className="form-control" id="widget-input" aria-describedby="widget-input"
                                placeholder="Paragraph text"
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    this.setState(prevState => ({
                                        widget: {
                                            ...prevState.widget,
                                            value: newValue
                                        }
                                    }))
                                }} value={this.state.widget.value} />
                        </div>
                        <div className="row">
                            <button type="button" className="btn-save btn" onClick={() =>
                                this.props.save(this.state.widget)
                            }>
                                Save
					        </button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default ParagraphWidgetComponent