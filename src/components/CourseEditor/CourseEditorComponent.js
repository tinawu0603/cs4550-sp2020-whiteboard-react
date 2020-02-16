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

const rootReducer = combineReducers({
    modules: moduleReducer,
    lessons: lessonReducer,
    topics: topicReducer
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
                <div className="col-4">
                    {/* Module List */}
                    <ModuleListComponent
                        courseId={courseId}
                        moduleId={moduleId} />
                </div>
                <div className="col-8">
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
                    <div class="row">
                        <button type="button" class="save-topic btn">
                            Save
					</button>
                        <label class="preview-title">
                            Preview
					</label>
                        <label class="switch" for="preview">
                            <input id="preview" type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="container editor">
                        <div class="row">
                            <div class="col-sm-12">
                                <label class="widget-title">
                                    Heading Widget
							</label>
                                <button type="button" class="btn-x btn">
                                    <img src="img/x.svg" alt="" />
                                </button>
                                <select class="custom-select widget-type-select">
                                    <option selected>Heading</option>
                                    <option value="1">Text</option>
                                    <option value="2">Image</option>
                                </select>
                                <button type="button" class="btn-down btn">
                                    <img class="btn-arrow" src="img/arrow-down.svg" alt="" />
                                </button>
                                <button type="button" class="btn-up btn">
                                    <img class="btn-arrow" src="img/arrow-up.svg" alt="" />
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <input type="text" class="form-control" id="widget-input" aria-describedby="widget-input"
                                    placeholder="Heading text" value="Heading text" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <select class="custom-select heading-size-select">
                                    <option selected value="1">Heading 1</option>
                                    <option value="2">Heading 2</option>
                                    <option value="3">Heading 3</option>
                                    <option value="4">Heading 4</option>
                                    <option value="5">Heading 5</option>
                                    <option value="6">Heading 6</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <input type="text" class="form-control" id="widget-name-input"
                                    aria-describedby="widget-name-input" placeholder="Widget name" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <label class="preview-title">
                                    Preview
							</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <h1>Heading text</h1>
                            </div>
                        </div>
                    </div>
                    <div class="container editor">
                        <div class="row new-widget">
                            <div class="col-sm-12">
                                <button type="button" class="btn-plus btn">
                                    <img src="img/plus.svg" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </Provider >

export default CourseEditorComponent