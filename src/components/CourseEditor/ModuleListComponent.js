import React from "react";
import ModuleComponent from "./ModuleComponent";
import "../../css/module-list.style.client.css"

const ModuleListComponent = ({ modules }) =>
    <div className="module-list">
        <ul className="list-group wbdv-module-list">
            {
                modules.map(function (module, index) {
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


export default ModuleListComponent