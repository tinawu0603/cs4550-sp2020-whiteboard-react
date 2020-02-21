import React from "react";
import "../../../css/widget-list.style.client.css"
import "../../../css/course-editor.style.client.css"
import "../../../css/styles.css"

class HeadingWidgetComponent extends React.Component {
    state = {
        widget: this.props.widget,
        topicId: this.props.topicId
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
                        {this.state.widget.size === 1 && <h1>{this.state.widget.value}</h1>}
                        {this.state.widget.size === 2 && <h2>{this.state.widget.value}</h2>}
                        {this.state.widget.size === 3 && <h3>{this.state.widget.value}</h3>}
                        {this.state.widget.size === 4 && <h4>{this.state.widget.value}</h4>}
                        {this.state.widget.size === 5 && <h5>{this.state.widget.value}</h5>}
                        {this.state.widget.size === 6 && <h6>{this.state.widget.value}</h6>}
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
                            <label>Size: </label>
                            <select className="custom-select heading-size-select"
                                onChange={(e) => {
                                    const newSize = parseInt(e.target.value);
                                    this.setState(prevState => ({
                                        widget: {
                                            ...prevState.widget,
                                            size: newSize
                                        }
                                    }))
                                }} value={this.state.widget.size}>
                                <option selected value={1}>Heading 1</option>
                                <option value={2}>Heading 2</option>
                                <option value={3}>Heading 3</option>
                                <option value={4}>Heading 4</option>
                                <option value={5}>Heading 5</option>
                                <option value={6}>Heading 6</option>
                            </select>
                        </div>
                        <div className="row">
                            <label>Value: </label>
                            <input type="text" className="form-control" id="widget-input" aria-describedby="widget-input"
                                placeholder="Heading text"
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

export default HeadingWidgetComponent