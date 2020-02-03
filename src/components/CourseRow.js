import React from "react";
import "../css/course-row.style.client.css"

class CourseRow extends React.Component {
    state = {
        editing: false,
        updatedCourseTitle: ""
    }

    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return (
            <div className="course-row row wbdv-row wbdv-course">
                {
                    !this.state.editing &&
                    <div className="col-sm-6 row wbdv-row wbdv-title">
                        <div className="col-sm-10">
                            <img src="img/doc.svg" alt="" className="doc-icon wbdv-row wbdv-icon"></img>
                            <a onClick={this.props.showEditor} href="#">
                                {this.props.course.title}
                            </a>
                        </div>
                        <div className="col-sm-2 d-none d-lg-flex">
                            <button className="btn btn-edit-course" type="button" onClick={() => {
                                this.setState({
                                    editing: true,
                                    updatedCourseTitle: this.props.course.title
                                })
                            }}>
                                <img src="img/edit.svg" className="edit-icon"></img>
                                Edit
                            </button>
                        </div>
                    </div>
                }
                {
                    this.state.editing &&
                    <div className="col-sm-6 row wbdv-row wbdv-title">
                        <div className="col-sm-8">
                            <input type="text" id="edit-course-name" class="input-lg wbdv-field"
                                aria-describedby="widget-input" onChange={(e) => {
                                    this.updateForm({
                                        updatedCourseTitle: e.target.value
                                    });
                                }}></input>
                        </div>
                        <div className="col-sm-2 d-none d-lg-flex">
                            <button className="btn btn-save-course" type="button" onClick={this.updateCourse} onClick={() => {
                                this.props.updateCourse({
                                    title: this.state.updatedCourseTitle,
                                    nuid: this.props.course.nuid,
                                    domain: this.props.course.domain,
                                    _id: this.props.course._id
                                });
                                this.setState({
                                    editing: false
                                });
                            }}>
                                Save
                            </button>
                        </div>
                        <div className="col-sm-2 d-none d-lg-flex">
                            <button className="btn btn-cancel-course" type="button" onClick={() => {
                                this.setState({
                                    editing: false
                                })
                            }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                }
                <div class="col-sm-2 course-info d-none d-lg-flex wbdv-row wbdv-owner">
                    <i>Me</i>
                </div>
                <div class="col-sm-2 course-info d-none d-lg-flex wbdv-row wbdv-modified-date">
                    <i>Just now</i>
                </div>
                <div class="col-sm-2">
                    <button class="btn btn-delete-course wbdv-row wbdv-button wbdv-delete" type="button" onClick={() => this.props.deleteCourse(this.props.course)}>
                        <img src="img/x.svg"></img>
                    </button>
                </div>
            </div >
        )
    }
}

export default CourseRow