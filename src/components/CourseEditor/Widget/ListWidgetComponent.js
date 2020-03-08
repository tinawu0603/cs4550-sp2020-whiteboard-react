import React from "react";
import "../../../css/widget-list.style.client.css";
import "../../../css/course-editor.style.client.css";
import "../../../css/styles.css";

const ulVals = (value) => {
    var valList = [];
    valList = value.split(/\r?\n/);
    return (
        <ul>
            {
                valList.map(val =>
                    <li>{val}</li>)
            }
        </ul>
    );
};

const olVals = (value) => {
    var valList = [];
    valList = value.split(/\r?\n/);
    return (
        <ol>
            {
                valList.map(val =>
                    <li>{val}</li>)
            }
        </ol>
    );
};

class ListWidgetComponent extends React.Component {
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
                        {/* Widget size: 1 -> Unordered List | 2 -> Ordered List */}
                        {this.state.widget.size === 1 && ulVals(this.state.widget.value)}
                        {this.state.widget.size === 2 && olVals(this.state.widget.value)}
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
                            <label>Type: </label>
                            <select className="custom-select list-size-select"
                                onChange={(e) => {
                                    const newSize = parseInt(e.target.value);
                                    this.setState(prevState => ({
                                        widget: {
                                            ...prevState.widget,
                                            size: newSize
                                        }
                                    }))
                                }} value={this.state.widget.size}>
                                <option selected value={1}>Unordered List</option>
                                <option value={2}>Ordered List</option>
                            </select>
                        </div>
                        <div className="row">
                            <label>Value: </label>
                            <textarea type="text" rows="3" className="form-control" id="widget-input" aria-describedby="widget-input"
                                placeholder="Enter one list item per line"
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
            </div >

        )
    }
}

export default ListWidgetComponent