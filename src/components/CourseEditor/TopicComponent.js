import React from "react";
import "../../css/topic.style.client.css"

class TopicComponent extends React.Component {
    state = {
        selected: false
    }

    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return (
            <div>
                {
                    this.state.selected &&
                    <li className="nav-item topic" onClick={() =>
                        this.updateForm({
                            selected: false
                        })
                    }
                        style={{ 'backgroundColor': '#c30f0f' }}>
                        <a className="nav-link active topic-title" href="#">{this.props.topic.title}</a>
                    </li >
                }
                {
                    !this.state.selected &&
                    <li className="nav-item topic" onClick={() =>
                        this.updateForm({
                            selected: true
                        })
                    }
                        style={{ 'backgroundColor': 'none' }}>
                        <a className="nav-link active topic-title" href="#">{this.props.topic.title}</a>
                    </li >
                }
            </div>
        )
    }
}

export default TopicComponent