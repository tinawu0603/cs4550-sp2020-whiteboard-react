import React from "react";
import ModuleListComponent from "./ModuleListComponent";
import LessonTabs from "./LessonTabs";
import TopicPills from "./TopicPills";
import "../../css/course-editor.style.client.css"

const CourseEditorComponent = ({ hideEditor }) =>
    <div>
        <div className="row course-editor">
            <div className="col-2">
                <ModuleListComponent
                    modules={[
                        { _id: "123", title: "CSS" },
                        { _id: "234", title: "HTML" },
                        { _id: "345", title: "React" }
                    ]} />
            </div>
            <div className="col-10">
                <div className="row lessons">
                    <LessonTabs
                        lessons={[
                            { _id: "123", title: "Build" },
                            { _id: "234", title: "Pages" },
                            { _id: "345", title: "Theme" },
                            { _id: "456", title: "Store" },
                            { _id: "567", title: "App" },
                            { _id: "678", title: "Settings" }
                        ]} />
                </div>

                <TopicPills topics={[
                    { _id: "123", title: "Topic 1" },
                    { _id: "234", title: "Topic 2" },
                    { _id: "345", title: "Topic 3" }
                ]} />
            </div>
        </div>
    </div>

export default CourseEditorComponent