import React from "react";
import ModuleListComponent from "./ModuleListComponent";
import LessonTabsComponent from "./LessonTabsComponent";
import TopicPillsComponent from "./TopicPillsComponent";
import "../../css/course-editor.style.client.css"

const CourseEditorComponent = ({ hideEditor }) =>
    <div>
        <div className="row course-editor">
            <div className="col-2">
                {/* Module List */}
                <ModuleListComponent
                    modules={[
                        { _id: "123", title: "CSS" },
                        { _id: "234", title: "HTML" },
                        { _id: "345", title: "React" }
                    ]} />
            </div>
            <div className="col-10">
                {/* Lesson Tabs */}
                <LessonTabsComponent
                    lessons={[
                        { _id: "123", title: "Build" },
                        { _id: "234", title: "Pages" },
                        { _id: "345", title: "Theme" },
                        { _id: "456", title: "Store" },
                        { _id: "567", title: "App" },
                        { _id: "678", title: "Settings" }
                    ]} />

                {/* Topic Pills */}
                <TopicPillsComponent topics={[
                    { _id: "123", title: "Topic 1" },
                    { _id: "234", title: "Topic 2" },
                    { _id: "345", title: "Topic 3" }
                ]} />

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

export default CourseEditorComponent