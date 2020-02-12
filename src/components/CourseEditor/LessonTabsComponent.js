import React from "react";
import LessonComponent from "./LessonComponent";
import "../../css/lesson-tabs.style.client.css"
import { connect } from "react-redux";
import LessonService from '../../services/LessonService'
import { findLessonsForModule, createLesson, deleteLesson } from '../../actions/lessonActions'

class LessonTabsComponent extends React.Component {
    componentDidMount() {
        this.props.findLessonsForModule(this.props.moduleId)
    }

    render() {
        return (
            <nav className="lesson-tabs nav-fill navbar-expand-lg navbar-pills">
                <ul className="navbar-lessons mr-auto navbar-nav">
                    {
                        this.props.lessons.map(function (lesson, index) {
                            return (
                                <LessonComponent lesson={lesson} />
                            )
                        })
                    }
                    <button type="button" className="btn btn-new-lesson wbdv-new-page-btn lesson-title">+</button>
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
            LessonService.deleteLesson()
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
