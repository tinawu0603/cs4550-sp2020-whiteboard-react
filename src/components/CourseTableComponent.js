import React from "react";
import CourseRowComponent from "./CourseRowComponent";
import "../css/course-table.style.client.css"

const CourseTableComponent = ({ courses, deleteCourse, showEditor, updateCourse }) =>
    <div>
        <div className="form-group row header-bar d-none d-lg-flex">
            <div className="col-sm-6">
                <button className="btn btn-headerbar wbdv-header wbdv-title" type="button" id="title-filter">
                    Title
            </button>
            </div>
            <div className="col-sm-2">
                <div className="dropdown">
                    <button className="btn btn-ownedby btn-headerbar wbdv-header wbdv-owner" type="button">
                        Owned by
                    </button>
                </div>
            </div>
            <div className="col-sm-2">
                <button className="btn btn-headerbar wbdv-header wbdv-last-modified" type="button" id="last-modified-filter">
                    Last modified
                </button>
            </div>
            <div className="col-sm-2">
                <button className="btn btn-headerbar wbdv-header wbdv-sort" type="button">
                    Sort
            </button>
            </div>
        </div>
        {
            courses.map(function (course, index) {
                return (
                    <CourseRowComponent
                        index={index}
                        course={course}
                        showEditor={showEditor}
                        deleteCourse={deleteCourse}
                        updateCourse={updateCourse} />
                )
            })
        }
    </div >

export default CourseTableComponent