import React from "react";
import TopicComponent from "./TopicComponent"
import "../../css/topic-pills.style.client.css"
import TopicService from '../../services/TopicService'

class TopicPillsComponent extends React.Component {
    componentDidMount() {
        this.props.findTopicsForLesson(this.props.lessonId)
    }

    render() {
        return (
            <div className="topic-pills">
                <ul className="nav navbar-pills navbar-topics">
                    {
                        this.props.topics.map(function (topic, index) {
                            return (
                                <TopicComponent topic={topic} />
                            )
                        })
                    }
                    <li className="nav-item">
                        <button type="button" className="btn btn-new-topic wbdv-new-page-btn">+</button>
                    </li>
                </ul>
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
        findTopicsForLesson: (lessonId) =>
            TopicService.findTopicsForLesson(lessonId)
                .then(actualTopics =>
                    dispatch(findTopicsForLesson(actualTopics.sort(compare)))),
        deleteTopic: (topicId) =>
            TopicService.deleteTopic()
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