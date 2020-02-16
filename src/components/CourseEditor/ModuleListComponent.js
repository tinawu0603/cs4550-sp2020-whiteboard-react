import React from "react";
import ModuleComponent from "./ModuleComponent";
import "../../css/module-list.style.client.css"
import "../../css/course-editor.style.client.css"
import "../../css/styles.css"
import { connect } from "react-redux";
import ModuleService from '../../services/ModuleService'
import { findModulesForCourse, createModule, deleteModule } from '../../actions/moduleActions'

class ModuleListComponent extends React.Component {
    state = {
        newModuleTitle: "New Module Title",
        modules: [],
        courseId: this.props.courseId,
        moduleId: this.props.moduleId || ""
    }

    componentDidMount = async () => {
        const modules = await ModuleService.findModulesForCourse(this.props.courseId)
        this.setState({
            modules: modules.sort(compare)
        })
    }

    componentDidUpdate = async () => {
        const modules = await ModuleService.findModulesForCourse(this.props.courseId)
        this.setState({
            modules: modules.sort(compare)
        })
        this.render();
    }

    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return (
            <div className="module-list course-editor">
                <ul className="list-group wbdv-module-list">
                    {
                        this.state.modules &&
                        this.state.modules.map((module, index) => {
                            return (
                                <ModuleComponent module={module} courseId={module._courses} moduleId={this.state.moduleId} />
                            )
                        })
                    }
                    <li className="module-item wbdv-module-item">
                        <div className="row">
                            <input type="text" id="new-module-input" className="input-lg"
                                aria-describedby="widget-input" placeholder="New Module" onChange={(e) => this.updateForm({
                                    newModuleTitle: e.target.value
                                })}></input>
                        </div>
                        <div className="row">
                            <button type="button" className="btn btn-plus btn-block btn-module-plus" onClick={() => {
                                this.props.createModule(this.props.courseId, { title: this.state.newModuleTitle });
                                document.getElementById("new-module-input").value = "";
                            }}>
                                <img src="/img/plus.svg" alt=""></img>
                            </button>
                        </div>
                    </li>
                </ul >
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
        findModulesForCourse: (courseId) =>
            ModuleService.findModulesForCourse(courseId)
                .then(actualModules =>
                    dispatch(findModulesForCourse(actualModules.sort(compare)))),
        deleteModule: (moduleId) =>
            ModuleService.deleteModule()
                .then(status =>
                    dispatch(deleteModule(moduleId))),
        createModule: (courseId, module) =>
            ModuleService.createModule(courseId, module)
                .then(actualModule =>
                    dispatch(createModule(actualModule))),
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
    (ModuleListComponent)