import React from "react";
import CourseListComponent from "../components/CourseListComponent"
import CourseEditorComponent from "../components/CourseEditor/CourseEditorComponent";
import { findAllCourses, deleteCourse, createCourse, updateCourse } from "../services/CourseService";
import "../css/styles.css"
import "../css/course-manager-container.style.client.css"
import { BrowserRouter as Router, Link, Route } from "react-router-dom"

class CourseManagerContainer extends React.Component {
    state = {
        layout: 'table',
        showEditor: false,
        newCourseTitle: "New Course Title",
        courses: []
    }

    componentDidMount = async () => {
        const courses = await findAllCourses()
        this.setState({
            courses: courses
        })
    }

    toggle = () =>
        this.setState(prevState => {
            if (prevState.layout === 'table') {
                return ({
                    layout: 'grid'
                })
            } else {
                return ({
                    layout: 'table'
                })
            }
        })

    deleteCourse = (course) =>
        deleteCourse(course._id)
            .then(status => {
                this.setState(prevState => {
                    return ({
                        courses: prevState
                            .courses
                            .filter(function (crs) {
                                return crs._id !== course._id
                            })
                    })
                })
            })

    updateCourse = (course) =>
        updateCourse(course._id, course).then(async () => {
            const courses = await findAllCourses();
            this.setState({
                courses: courses
            });
        })

    addCourse = () =>
        createCourse({
            title: this.state.newCourseTitle
        }).then(actualCourse => this.setState(prevState => {
            return ({
                courses: [
                    ...prevState.courses,
                    actualCourse
                ]
            })
        })
        )

    showEditor = () =>
        this.setState({
            showEditor: true
        })

    hideEditor = () =>
        this.setState({
            showEditor: false
        })

    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return (
            <Router>
                <Route path="/"
                    exact={true}
                    render={() =>
                        <CourseListComponent
                            toggle={this.toggle}
                            updateForm={this.updateForm}
                            newCourseTitle={this.state.newCourseTitle}
                            addCourse={this.addCourse}
                            layout={this.state.layout}
                            courses={this.state.courses}
                            deleteCourse={this.deleteCourse}
                            updateCourse={this.updateCourse} />
                    } />
                <Route path="/grid"
                    exact={true}
                    render={(props) =>
                        <CourseListComponent {...props}
                            toggle={this.toggle}
                            updateForm={this.updateForm}
                            newCourseTitle={this.state.newCourseTitle}
                            addCourse={this.addCourse}
                            layout="grid"
                            toggleLink="table"
                            courses={this.state.courses}
                            deleteCourse={this.deleteCourse}
                            updateCourse={this.updateCourse} />
                    } />
                <Route path="/table"
                    exact={true}
                    render={(props) =>
                        <CourseListComponent {...props}
                            toggle={this.toggle}
                            updateForm={this.updateForm}
                            newCourseTitle={this.state.newCourseTitle}
                            addCourse={this.addCourse}
                            layout="table"
                            toggleLink="grid"
                            courses={this.state.courses}
                            deleteCourse={this.deleteCourse}
                            updateCourse={this.updateCourse} />
                    } />
                <Route path="/course-editor/:courseId"
                    exact={true}
                    render={(props) =>
                        <CourseEditorComponent {...props}
                            courseId={props.match.params.courseId} />
                    } />
                <Route path="/course-editor/:courseId/module/:moduleId"
                    exact={true}
                    render={(props) =>
                        <CourseEditorComponent
                            {...props}
                            courseId={props.match.params.courseId}
                            moduleId={props.match.params.moduleId} />
                    } />
                <Route path="/course-editor/:courseId/module/:moduleId/lesson/:lessonId"
                    exact={true}
                    render={(props) =>
                        <CourseEditorComponent
                            {...props}
                            courseId={props.match.params.courseId}
                            moduleId={props.match.params.moduleId}
                            lessonId={props.match.params.lessonId} />
                    } />
                <Route path="/course-editor/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId"
                    exact={true}
                    render={(props) =>
                        <CourseEditorComponent
                            {...props}
                            courseId={props.match.params.courseId}
                            moduleId={props.match.params.moduleId}
                            lessonId={props.match.params.lessonId}
                            topicId={props.match.params.topicId} />
                    } />
            </Router>
        )
    }
}

export default CourseManagerContainer
