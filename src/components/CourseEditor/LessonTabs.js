import React from "react";
import Lesson from "./LessonComponent";
import "../../css/lesson-tabs.style.client.css"

const LessonTabs = ({ lessons }) =>
    <div className="lesson-tabs">
        <ul className="nav navbar-pills navbar-lessons">
            {
                lessons.map(function (lesson, index) {
                    return (
                        <Lesson lesson={lesson} />
                    )
                })
            }
            <li className="nav-item">
                <button type="button" className="btn btn-new-lesson wbdv-new-page-btn lesson-title">+</button>
            </li>
        </ul>
    </div>

export default LessonTabs
