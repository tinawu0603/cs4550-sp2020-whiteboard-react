import React from "react";
import LessonComponent from "./LessonComponent";
import "../../css/lesson-tabs.style.client.css"
import { connect } from "react-redux";
import LessonService from '../../services/LessonService'
import { findLessonsForModule, createLesson, deleteLesson } from '../../actions/lessonActions'

class LessonTabsComponent extends React.Component {
    state = {
        newLessonTitle: "New Lesson Title",
        lessons: [],
        courseId: this.props.courseId,
        moduleId: this.props.moduleId,
        lessonId: this.props.lessonId || "",
    }

    componentDidMount = async () => {
        const lessons = await LessonService.findLessonsForModule(this.props.moduleId)
        this.setState({
            lessons: lessons.sort(compare)
        })
    }

    componentDidUpdate = async () => {
        const lessons = await LessonService.findLessonsForModule(this.props.moduleId)
        this.setState({
            lessons: lessons.sort(compare)
        })
        this.render();
    }

    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return (
            <nav className="lesson-tabs nav-fill navbar-expand-lg navbar-pills">
                <ul className="navbar-lessons mr-auto navbar-nav">
                    {
                        this.state.lessons &&
                        this.state.lessons.map((lesson, index) => {
                            return (
                                <LessonComponent lesson={lesson} moduleId={lesson._modules} courseId={this.state.courseId} lessonId={this.state.lessonId} />
                            )
                        })
                    }
                    <li class="lesson nav-item">
                        <form className="form-inline course-editor">
                            <input type="text" id="new-lesson-input" className="input-lg"
                                aria-describedby="widget-input" placeholder="New Lesson Title" onChange={(e) => this.updateForm({
                                    newLessonTitle: e.target.value
                                })}></input>
                            <button type="button" className="btn-plus btn" onClick={() => {
                                this.props.createLesson(this.props.moduleId, {
                                    title: this.state.newLessonTitle
                                });
                                document.getElementById("new-lesson-input").value = "";
                            }}>
                                <img src="/img/plus.svg" alt=""></img>
                            </button>
                        </form>
                    </li>
                </ul>
            </nav >
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
        findLessonsForModule: (moduleId) =>
            LessonService.findLessonsForModule(moduleId)
                .then(actualLessons =>
                    dispatch(findLessonsForModule(actualLessons.sort(compare)))),
        deleteLesson: (lessonId) =>
            LessonService.deleteLesson(lessonId)
                .then(status =>
                    dispatch(deleteLesson(lessonId))),
        createLesson: (moduleId, lesson) =>
            LessonService.createLesson(moduleId, lesson)
                .then(actualLesson =>
                    dispatch(createLesson(actualLesson))),
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
    (LessonTabsComponent)
