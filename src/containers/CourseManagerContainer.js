import React from "react";
import CourseTableComponent from "../components/CourseTableComponent";
import CourseGridComponent from "../components/CourseGridComponent";
import CourseEditorComponent from "../components/CourseEditor/CourseEditorComponent";
import { findAllCourses, deleteCourse, createCourse, updateCourse } from "../services/CourseService";
import "../css/styles.css"
import "../css/course-manager-container.style.client.css"

class CourseManagerContainer extends React.Component {
    state = {
        layout: 'grid',
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
            <div className="container-fluid course-manager">
                {
                    this.state.showEditor &&
                    <div>
                        <nav className="navbar navbar-expand-lg nav-fill">
                            <div className="navbar-brand mr-auto">
                                <img src="icon.png" alt=""></img>
                                Whiteboard
                            </div>
                            <button type="button" className="navbar-toggler btn-hamburger wbdv-field wbdv-hamburger btn" data-toggle="collapse"
                                data-target="#collapsingNavbarSm">
                                <img src="img/hamburger.svg" className="navbar-toggler-icon" alt=""></img>
                            </button>
                            <div className="navbar-collapse collapse" id="collapsingNavbarSm">
                                <ul className="navbar-nav d-none d-lg-flex mr-auto">
                                    <li className="nav-item">
                                        <a className="nav-link course-manager-title wbdv-label wbdv-course-manager" href="#">
                                            Course Manager
                                    </a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <form className="form-inline">
                                            <button className="btn btn-return wbdv-row wbdv-button" type="button" onClick={this.hideEditor}>
                                                <img src="img/x.svg"></img>
                                            </button>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        <div className="container-fluid">
                            <CourseEditorComponent
                                hideEditor={this.hideEditor} />
                        </div>
                    </div>
                }

                {
                    !this.state.showEditor &&
                    <div>
                        <nav className="navbar navbar-expand-lg nav-fill">
                            <div className="navbar-brand mr-auto">
                                <img src="icon.png" alt=""></img>
                                Whiteboard
                            </div>
                            <button type="button" className="navbar-toggler btn-hamburger wbdv-field wbdv-hamburger btn" data-toggle="collapse"
                                data-target="#collapsingNavbarSm">
                                <img src="img/hamburger.svg" className="navbar-toggler-icon" alt=""></img>
                            </button>
                            <div className="navbar-collapse collapse" id="collapsingNavbarSm">
                                <ul className="navbar-nav d-none d-lg-flex mr-auto">
                                    <li className="nav-item">
                                        <a className="nav-link course-manager-title wbdv-label wbdv-course-manager" href="#">
                                            Course Manager
                                    </a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <form className="form-inline">
                                            <input type="text" id="new-course-input" className="input-lg wbdv-field wbdv-new-course"
                                                aria-describedby="widget-input" placeholder="New Course Title" onChange={(e) => this.updateForm({
                                                    newCourseTitle: e.target.value
                                                })}></input>
                                            <button type="button" className="btn-plus btn wbdv-button wbdv-add-course" onClick={() => {
                                                this.addCourse();
                                                document.getElementById("new-course-input").value = "";
                                            }}>
                                                <img src="img/plus.svg" alt=""></img>
                                            </button>
                                        </form>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn" type="button" onClick={this.toggle}>
                                            {
                                                this.state.layout === 'table' &&
                                                <img src="img/grid.svg" alt="" className="wbdv-icon"></img>
                                            }
                                            {
                                                this.state.layout === 'grid' &&
                                                <img src="img/list.svg" alt="" className="wbdv-icon"></img>
                                            }
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        <div className="container-fluid">
                            {
                                this.state.layout === 'table' &&
                                <CourseTableComponent
                                    showEditor={this.showEditor}
                                    deleteCourse={this.deleteCourse}
                                    updateCourse={this.updateCourse}
                                    courses={this.state.courses} />
                            }
                            {
                                this.state.layout === 'grid'
                                && <CourseGridComponent
                                    showEditor={this.showEditor}
                                    deleteCourse={this.deleteCourse}
                                    updateCourse={this.updateCourse}
                                    courses={this.state.courses} />
                            }
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default CourseManagerContainer
