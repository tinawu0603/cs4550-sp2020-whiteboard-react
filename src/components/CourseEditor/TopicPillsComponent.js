import React from "react";
import TopicComponent from "./TopicComponent"
import "../../css/topic-pills.style.client.css"
import { connect } from "react-redux";
import TopicService from '../../services/TopicService'
import { findTopicsForLesson, createTopic, deleteTopic } from '../../actions/topicActions'

class TopicPillsComponent extends React.Component {
    state = {
        newTopicTitle: "New Topic Title",
        topics: [],
        courseId: this.props.courseId,
        moduleId: this.props.moduleId,
        lessonId: this.props.lessonId,
        topicId: this.props.topicId || "",
    }

    componentDidMount = async () => {
        const topics = await TopicService.findTopicsForLesson(this.props.lessonId)
        this.setState({
            topics: topics.sort(compare)
        })
    }

    componentDidUpdate = async () => {
        const topics = await TopicService.findTopicsForLesson(this.props.lessonId)
        this.setState({
            topics: topics.sort(compare)
        })
        this.render();
    }

    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return (
            <div className="topic-pills">
                <ul className="nav navbar-pills navbar-topics">
                    {
                        this.state.topics &&
                        this.state.topics.map((topic, index) => {
                            return (
                                <TopicComponent topic={topic} moduleId={this.state.moduleId} courseId={this.state.courseId} lessonId={this.state.lessonId} topicId={this.state.topicId} />
                            )
                        })
                    }
                    <li className="nav-item">
                        <form className="form-inline course-editor">
                            <input type="text" id="new-topic-input" className="input-lg"
                                aria-describedby="widget-input" placeholder="New Topic Title" onChange={(e) => this.updateForm({
                                    newTopicTitle: e.target.value
                                })}></input>
                            <button type="button" className="btn btn-plus" onClick={() => {
                                this.props.createTopic(this.props.lessonId, {
                                    title: this.state.newTopicTitle
                                });
                                document.getElementById("new-topic-input").value = "";
                            }}>
                                <img src="/img/plus.svg" alt=""></img>
                            </button>
                        </form>
                    </li>
                </ul>
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
        lessons: state.topics.topics
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findTopicsForLesson: (lessonId) =>
            TopicService.findTopicsForLesson(lessonId)
                .then(actualTopics =>
                    dispatch(findTopicsForLesson(actualTopics.sort(compare)))),
        deleteTopic: (topicId) =>
            TopicService.deleteTopic(topicId)
                .then(status =>
                    dispatch(deleteTopic(topicId))),
        createTopic: (lessonId, topic) =>
            TopicService.createTopic(lessonId, topic)
                .then(actualTopic =>
                    dispatch(createTopic(actualTopic))),
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
    (TopicPillsComponent)