import React from "react";
import "../../css/lesson-tabs.style.client.css"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LessonService from '../../services/LessonService'
import { findLessonsForModule, deleteLesson } from '../../actions/lessonActions'

class LessonComponent extends React.Component {
    state = {
        updatedLessonTitle: "",
        editing: false,
        selectedUrl: `/course-editor/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson._id}`,
        unselectedUrl: `/course-editor/${this.props.courseId}/module/${this.props.moduleId}`,
        selected: this.props.lessonId !== "" && this.props.lessonId === this.props.lesson._id
    }

    componentDidUpdate() {
        this.render();
    }

    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return (
            <div>
                {
                    // Selected but not editing
                    this.state.selected && !this.state.editing &&
                    <li className="nav-item lesson"
                        style={{ 'backgroundColor': '#c30f0f' }}>
                        <Link to={this.state.unselectedUrl} className="nav-link active lesson-title" onClick={() =>
                            this.updateForm({
                                selected: false
                            })
                        }>{this.props.lesson.title}</Link>
                        <button className="btn" type="button" onClick={() => {
                            this.setState({
                                editing: true,
                                selected: true,
                                updatedLessonTitle: this.props.lesson.title
                            })
                        }}>
                            <img src="/img/edit-white.svg" alt="" className="edit-icon"></img>
                        </button>
                        <button className="btn btn-delete-lesson" type="button" onClick={() => {
                            this.props.deleteLesson(this.props.lesson._id);
                        }
                        }>
                            <img src="/img/x.svg" alt="" className="delete-icon"></img>
                        </button>
                    </li >
                }
                {
                    // Not selected and not editing
                    !this.state.selected && !this.state.editing &&
                    <li className="nav-item lesson"
                        style={{ 'backgroundColor': 'none' }}>
                        <Link to={this.state.selectedUrl} className="nav-link active lesson-title" onClick={() =>
                            this.updateForm({
                                selected: true
                            })
                        }>{this.props.lesson.title}</Link>
                        <button className="btn" type="button" onClick={() => {
                            this.setState({
                                editing: true,
                                selected: true,
                                updatedLessonTitle: this.props.lesson.title
                            })
                        }}>
                            <img src="/img/edit-white.svg" alt="" className="edit-icon"></img>
                        </button>
                        <button className="btn btn-delete-lesson" type="button" onClick={() => {
                            this.props.deleteLesson(this.props.lesson._id);
                        }
                        }>
                            <img src="/img/x.svg" alt="" className="delete-icon"></img>
                        </button>
                    </li>
                }
                {
                    // Editing this lesson
                    this.state.editing &&
                    <li class="nav-item lesson"
                        style={{ 'backgroundColor': '#c30f0f' }}>
                        <input type="text" id="edit-lesson-name" className="input-lg"
                            aria-describedby="widget-input" onChange={(e) => {
                                this.updateForm({
                                    updatedLessonTitle: e.target.value
                                });
                            }}></input>
                        <button className="btn" type="button" onClick={() => {
                            this.props.updateLesson(this.props.lesson._id, {
                                title: this.state.updatedLessonTitle
                            }, this.props.moduleId);
                            this.updateForm({
                                selected: false,
                                editing: false
                            });
                        }}>
                            <img src="/img/save.svg" alt="" className="save-icon"></img>
                        </button>
                        <button className="btn" type="button" onClick={() => {
                            this.updateForm({
                                selected: false,
                                editing: false
                            })
                        }}>
                            <img src="/img/x.svg" alt="" className="delete-icon"></img>
                        </button>
                    </li>
                }
            </div>
        )
    }
}

const compare = (a, b) => {
    if (a._createdAt <= b._createdAt) {
        return -1
    }
    else {
        return 0
    }
}

const stateToPropertyMapper = (state) => {
    return {
        lessons: state.lessons.lessons
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        deleteLesson: (lessonId) =>
            LessonService.deleteLesson(lessonId)
                .then(status =>
                    dispatch(deleteLesson(lessonId))),
        updateLesson: (lessonId, lesson, moduleId) => {
            LessonService.updateLesson(lessonId, lesson)
                .then(status =>
                    LessonService.findLessonsForModule(moduleId)
                        .then(actualLessons =>
                            dispatch(findLessonsForModule(actualLessons.sort(compare)))))
        }
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
    (LessonComponent)
