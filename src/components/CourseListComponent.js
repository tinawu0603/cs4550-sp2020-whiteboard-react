import CourseTableComponent from "./CourseTableComponent"
import CourseGridComponent from "./CourseGridComponent"
import React from "react";
import { Link } from "react-router-dom";

const CourseListComponent =
    ({
        toggle,
        updateForm,
        newCourseTitle,
        addCourse,
        layout,
        courses,
        deleteCourse,
        updateCourse
    }) => <div className="container-fluid course-manager">
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
                                <Link to={"/"} className="nav-link course-manager-title wbdv-label wbdv-course-manager">
                                    Course Manager
                        </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <form className="form-inline">
                                    <input type="text" id="new-course-input" className="input-lg wbdv-field wbdv-new-course"
                                        aria-describedby="widget-input" placeholder="New Course Title" onChange={(e) => updateForm({
                                            newCourseTitle: e.target.value
                                        })}></input>
                                    <button type="button" className="btn-plus btn wbdv-button wbdv-add-course" onClick={() => {
                                        addCourse();
                                        document.getElementById("new-course-input").value = "";
                                    }}>
                                        <img src="img/plus.svg" alt=""></img>
                                    </button>
                                </form>
                            </li>
                            <li className="nav-item">
                                <button className="btn" type="button" onClick={toggle}>
                                    {
                                        layout === 'table' &&
                                        <img src="img/grid.svg" alt="" className="wbdv-icon"></img>
                                    }
                                    {
                                        layout === 'grid' &&
                                        <img src="img/list.svg" alt="" className="wbdv-icon"></img>
                                    }
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="container-fluid">
                    {
                        layout === 'table' &&
                        <CourseTableComponent
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse}
                            courses={courses} />
                    }
                    {
                        layout === 'grid'
                        && <CourseGridComponent
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse}
                            courses={courses} />
                    }
                </div>
            </div>

        </div >

export default CourseListComponent