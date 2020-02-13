import React from "react";
import "../../css/topic.style.client.css"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TopicService from '../../services/TopicService'
import { findTopicsForLesson, deleteTopic } from '../../actions/topicActions'

class TopicComponent extends React.Component {
    state = {
        updatedTopicTitle: "",
        editing: false,
        selectedUrl: `/course-editor/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic._id}`,
        unselectedUrl: `/course-editor/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}`,
        selected: this.props.topicId !== "" && this.props.topicId === this.props.topic._id
    }

    componentDidUpdate() {
        this.render();
    }

    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return (
            <div>
                {
                    // Selected but not editing
                    this.state.selected && !this.state.editing &&
                    <li className="nav-item topic"
                        style={{ 'backgroundColor': '#c30f0f' }}>
                        <Link to={this.state.unselectedUrl} className="nav-link active topic-title" onClick={() =>
                            this.updateForm({
                                selected: false
                            })
                        }>{this.props.topic.title}</Link>
                        <button className="btn" type="button" onClick={() => {
                            this.setState({
                                editing: true,
                                selected: true,
                                updatedTopicTitle: this.props.topic.title
                            })
                        }}>
                            <img src="/img/edit-white.svg" className="edit-icon"></img>
                        </button>
                        <button className="btn btn-delete-topic" type="button" onClick={() => {
                            this.props.deleteTopic(this.props.topic._id);
                        }
                        }>
                            <img src="/img/x.svg" className="delete-icon"></img>
                        </button>
                    </li>
                }
                {
                    // Not selected and not editing
                    !this.state.selected && !this.state.editing &&
                    <li className="nav-item topic"
                        style={{ 'backgroundColor': 'none' }}>
                        <Link to={this.state.selectedUrl} className="nav-link active topic-title" onClick={() =>
                            this.updateForm({
                                selected: true
                            })
                        }>{this.props.topic.title}</Link>
                        <button className="btn" type="button" onClick={() => {
                            this.setState({
                                editing: true,
                                selected: true,
                                updatedTopicTitle: this.props.topic.title
                            })
                        }}>
                            <img src="/img/edit-white.svg" className="edit-icon"></img>
                        </button>
                        <button className="btn btn-delete-topic" type="button" onClick={() => {
                            this.props.deleteTopic(this.props.topic._id);
                        }
                        }>
                            <img src="/img/x.svg" className="delete-icon"></img>
                        </button>
                    </li >
                }
                {
                    // Editing this topic
                    this.state.editing &&
                    <li className="nav-item topic"
                        style={{ 'backgroundColor': '#c30f0f' }}>
                        <input type="text" id="edit-topic-name" className="input-lg"
                            aria-describedby="widget-input" onChange={(e) => {
                                this.updateForm({
                                    updatedTopicTitle: e.target.value
                                });
                            }}></input>
                        <button className="btn" type="button" onClick={() => {
                            this.props.updateTopic(this.props.topic._id, {
                                title: this.state.updatedTopicTitle
                            }, this.props.lessonId);
                            this.updateForm({
                                editing: false
                            });
                        }}>
                            <img src="/img/save.svg" className="save-icon"></img>
                        </button>
                        <button className="btn" type="button" onClick={() => {
                            this.updateForm({
                                editing: false
                            })
                        }}>
                            <img src="/img/x.svg" className="delete-icon"></img>
                        </button>
                    </li>
                }
            </div>
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
        lessons: state.topics.topics
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        deleteTopic: (topicId) =>
            TopicService.deleteTopic(topicId)
                .then(status =>
                    dispatch(deleteTopic(topicId))),
        updateTopic: (topicId, topic, lessonId) => {
            TopicService.updateTopic(topicId, topic)
                .then(status =>
                    TopicService.findTopicsForLesson(lessonId)
                        .then(actualTopics =>
                            dispatch(findTopicsForLesson(actualTopics.sort(compare)))))
        }
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)
    (TopicComponent)
