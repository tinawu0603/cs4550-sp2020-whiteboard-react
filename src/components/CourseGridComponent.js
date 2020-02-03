import React from "react";
import CourseCard from "./CourseCard"
import "../css/course-grid.style.client.css"

const CourseGridComponent = ({ courses, deleteCourse, showEditor, updateCourse }) =>
    <div>
        <div className="form-group row header-bar d-none d-lg-flex">
            <div className="col-sm-8">
                <button className="btn btn-headerbar wbdv-header wbdv-title" type="button" id="title-filter">
                    Recent Documents
            </button>
            </div>
            <div className="col-sm-2">
                <div className="dropdown">
                    <button className="btn btn-ownedby btn-headerbar wbdv-header wbdv-owner" type="button">
                        Owned by Me
                    </button>
                </div>
            </div>
            <div className="col-sm-2">
                <button className="btn btn-headerbar wbdv-header wbdv-sort" type="button">
                    Sort
            </button>
            </div>
        </div>
        <div className="card-columns">
            {
                courses.map(function (course, index) {
                    return (
                        <CourseCard
                            index={index}
                            course={course}
                            showEditor={showEditor}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse} />
                    )
                })
            }
        </div>
    </div>

export default CourseGridComponent