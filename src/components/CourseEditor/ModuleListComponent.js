import React from "react";
import ModuleComponent from "./ModuleComponent";
import "../../css/module-list.style.client.css"
import { connect } from "react-redux";
import ModuleService from '../../services/ModuleService'

class ModuleListComponent extends React.Component {
    componentDidMount() {
        this.props.findModulesForCourse(this.props.courseId)
    }

    render() {
        return (
            <div className="module-list">
                <ul className="list-group wbdv-module-list">
                    {
                        this.props.modules.map(function (module, index) {
                            return (
                                <ModuleComponent module={module} />
                            )
                        })
                    }
                    <li class="module-item wbdv-module-item">
                        <a class="module-link wbdv-module-item-title" href="#">Add Module</a>
                    </li>
                    <li class="module-item wbdv-module-item">
                        <a class="module-link wbdv-module-item-title" href="#">Delete Module</a>
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