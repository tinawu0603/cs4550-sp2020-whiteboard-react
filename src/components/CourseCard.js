import React from "react";
import '../css/course-card.style.client.css'

class CourseCard extends React.Component {
    state = {
        editing: false,
        updatedCourseTitle: ""
    }

    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return (
            <div className="card col-sm-4">
                <img className="card-img-top" src="img/card-img.png" />
                {
                    !this.state.editing &&
                    <div className="card-body">
                        <div className="row">
                            <a onClick={this.props.showEditor} href="#">
                                {this.props.course.title}
                            </a>
                        </div>
                        <div className="row">
                            <i className="course-info">Modified Just now</i>
                        </div>
                        <div className="row">
                            <div class="col-sm-6">
                                <button className="btn btn-block btn-edit-course" type="button" onClick={() => {
                                    this.setState({
                                        editing: true,
                                        updatedCourseTitle: this.props.course.title
                                    })
                                }}>
                                    <img src="img/edit.svg" className="edit-icon"></img>
                                    Rename
                                </button>
                            </div>
                            <div class="col-sm-6">
                                <button className="btn btn-block btn-delete-course" type="button" onClick={() => this.props.deleteCourse(this.props.course)}>
                                    <img src="img/x.svg" className="delete-icon"></img>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                }
                {
                    this.state.editing &&
                    <div className="card-body">
                        <div className="row">
                            <input type="text" id="edit-course-name" class="input-lg wbdv-field"
                                aria-describedby="widget-input" onChange={(e) => {
                                    this.updateForm({
                                        updatedCourseTitle: e.target.value
                                    });
                                }}></input>
                        </div>
                        <div className="row">
                            <i className="course-info">Modified Just now</i>
                        </div>
                        <div className="row">
                            <div class="col-sm-6">
                                <button className="btn btn-block btn-save-course" type="button" onClick={this.updateCourse} onClick={() => {
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
                                    <img src="img/save.svg" className="save-icon"></img>
                                    Save
                                </button>
                            </div>
                            <div class="col-sm-6">
                                <button className="btn btn-block btn-cancel-course" type="button" onClick={() => {
                                    this.setState({
                                        editing: false
                                    })
                                }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                }

            </div >
        )
    }
}

export default CourseCard