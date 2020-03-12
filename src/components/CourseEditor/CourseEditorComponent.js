import React from "react";
import ModuleListComponent from "./ModuleListComponent";
import LessonTabsComponent from "./LessonTabsComponent";
import TopicPillsComponent from "./TopicPillsComponent";
import "../../css/course-editor.style.client.css"
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { Link } from "react-router-dom";
import moduleReducer from "../../reducers/moduleReducer"
import lessonReducer from "../../reducers/lessonReducer"
import topicReducer from "../../reducers/topicReducer"
import "../../css/styles.css"
import "../../css/course-manager-container.style.client.css"
import WidgetListComponent from "./WidgetListComponent";
import widgetReducer from "../../reducers/widgetReducer";

const rootReducer = combineReducers({
    modules: moduleReducer,
    lessons: lessonReducer,
    topics: topicReducer,
    widgets: widgetReducer
})

const store = createStore(rootReducer)

const CourseEditorComponent = ({ history, courseId, moduleId, lessonId, topicId }) =>
    <Provider store={store}>
        <div className="course-manager">
            <nav className="navbar navbar-expand-lg nav-fill">
                <div className="navbar-brand mr-auto">
                    <img src="/icon.png" alt=""></img>
                    Whiteboard
                </div>
                <button type="button" className="navbar-toggler btn-hamburger wbdv-field wbdv-hamburger btn" data-toggle="collapse"
                    data-target="#collapsingNavbarSm">
                    <img src="img/hamburger.svg" className="navbar-toggler-icon" alt=""></img>
                </button>
                <div className="navbar-collapse collapse" id="collapsingNavbarSm">
                    <ul className="navbar-nav d-none d-lg-flex mr-auto">
                        <li className="nav-item">
                            <Link to="/table" className="nav-link course-manager-title wbdv-label wbdv-course-manager">
                                Course Manager
                        </Link>
                        </li>
                    </ul>
                    <ul className="ml-auto navbar-nav">
                        <li className="nav-item">
                            <form className="form-inline">
                                <Link to="/table">
                                    <button className="btn btn-return wbdv-row wbdv-button" type="button" onClick={() => {
                                        history.push("/");
                                    }}>
                                        <img src="/img/x.svg" alt=""></img>

                                    </button>
                                </Link>
                            </form>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="row course-editor">
                <div className="col-2">
                    {/* Module List */}
                    <ModuleListComponent
                        courseId={courseId}
                        moduleId={moduleId} />
                </div>
                <div className="col-10">
                    {/* Lesson Tabs */}
                    <LessonTabsComponent
                        moduleId={moduleId}
                        courseId={courseId}
                        lessonId={lessonId} />
                    {/* Topic Pills */}
                    <TopicPillsComponent
                        lessonId={lessonId}
                        moduleId={moduleId}
                        courseId={courseId}
                        topicId={topicId} />

                    {/* Widgets */}
                    <WidgetListComponent
                        lessonId={lessonId}
                        moduleId={moduleId}
                        courseId={courseId}
                        topicId={topicId} />
                </div>
            </div>

        </div>
    </Provider >

export default CourseEditorComponent