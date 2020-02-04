import React from "react";

class LessonComponent extends React.Component {
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
                    <li className="nav-item lesson" onClick={() =>
                        this.updateForm({
                            selected: false
                        })
                    }
                        style={{ 'backgroundColor': '#c30f0f' }}>
                        <a className="nav-link active lesson-title" href="#">{this.props.lesson.title}</a>
                    </li >
                }
                {
                    !this.state.selected &&
                    <li className="nav-item lesson" onClick={() =>
                        this.updateForm({
                            selected: true
                        })
                    }
                        style={{ 'backgroundColor': 'none' }}>
                        <a className="nav-link active lesson-title" href="#">{this.props.lesson.title}</a>
                    </li >
                }
            </div>
        )
    }
}

export default LessonComponent