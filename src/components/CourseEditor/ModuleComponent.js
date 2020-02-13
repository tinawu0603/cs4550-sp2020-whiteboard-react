import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom"
import ModuleService from '../../services/ModuleService'
import { findModulesForCourse, createModule, deleteModule, updateModule } from '../../actions/moduleActions'

class ModuleComponent extends React.Component {
    state = {
        updatedModuleTitle: '',
        editing: false,
        selectedUrl: `/course-editor/${this.props.courseId}/module/${this.props.module._id}`,
        unselectedUrl: `/course-editor/${this.props.courseId}`,
        selected: this.props.moduleId !== "" && this.props.moduleId === this.props.module._id
    }

    componentDidUpdate() {
        this.render();
    }

    updateForm = (newState) => {
        this.setState(newState);
    }

    render() {
        return (
            <div>
                {
                    // Selected but not editing
                    this.state.selected && !this.state.editing &&
                    <li class="module-item wbdv-module-item"
                        style={{ 'backgroundColor': '#c30f0f' }}>
                        <Link to={this.state.unselectedUrl} className="module-link wbdv-module-item-title" onClick={() => {
                            this.updateForm({
                                selected: false
                            });
                        }
                        }>{this.props.module.title}</Link>
                        <button className="btn" type="button" onClick={() => {
                            this.setState({
                                editing: true,
                                selected: true,
                                updatedModuleTitle: this.props.module.title
                            })
                        }}>
                            <img src="/img/edit-white.svg" className="edit-icon"></img>
                        </button>
                        <button className="btn btn-delete-course" type="button" onClick={() => {
                            this.props.deleteModule(this.props.module._id);
                        }
                        }>
                            <img src="/img/x.svg" className="delete-icon"></img>
                        </button>
                    </li>
                }
                {
                    // Not selected and not editing
                    !this.state.selected && !this.state.editing &&
                    <li class="module-item wbdv-module-item"
                        style={{ 'backgroundColor': 'none' }}>
                        <Link to={this.state.selectedUrl} className="module-link wbdv-module-item-title" onClick={() =>
                            this.updateForm({
                                selected: true
                            })} > {this.props.module.title}</Link>
                        <button className="btn" type="button" onClick={() => {
                            this.setState({
                                editing: true,
                                selected: true,
                                updatedModuleTitle: this.props.module.title
                            })
                        }}>
                            <img src="/img/edit-white.svg" className="edit-icon"></img>
                        </button>
                        <button className="btn btn-delete-course" type="button" onClick={() => {
                            this.props.deleteModule(this.props.module._id);
                        }
                        }>
                            <img src="/img/x.svg" className="delete-icon"></img>
                        </button>
                    </li>
                }
                {
                    // Editing this module
                    this.state.editing &&
                    <li class="module-item wbdv-module-item"
                        style={{ 'backgroundColor': '#c30f0f' }}>
                        <input type="text" id="edit-module-name" className="input-lg wbdv-field"
                            aria-describedby="widget-input" onChange={(e) => {
                                this.updateForm({
                                    updatedModuleTitle: e.target.value
                                });
                            }}></input>
                        <button className="btn" type="button" onClick={() => {
                            this.props.updateModule(this.props.module._id, {
                                title: this.state.updatedModuleTitle
                            }, this.props.courseId);
                            this.updateForm({
                                selected: false,
                                editing: false
                            });
                        }}>
                            <img src="/img/save.svg" className="save-icon"></img>
                        </button>
                        <button className="btn" type="button" onClick={() => {
                            this.updateForm({
                                selected: false,
                                editing: false
                            })
                        }}>
                            <img src="/img/x.svg" className="delete-icon"></img>
                        </button>
                    </li>
                }
            </div >
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
        modules: state.modules.modules
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        deleteModule: (moduleId) =>
            ModuleService.deleteModule(moduleId)
                .then(status =>
                    dispatch(deleteModule(moduleId))),
        updateModule: (moduleId, module, courseId) => {
            ModuleService.updateModule(moduleId, module)
                .then(status =>
                    ModuleService.findModulesForCourse(courseId)
                        .then(actualModules =>
                            dispatch(findModulesForCourse(actualModules.sort(compare)))))
        }
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
    (ModuleComponent)