import React from "react";
import Topic from "./TopicComponent"
import "../../css/topic-pills.style.client.css"

const TopicPills = ({ topics }) =>
    <div className="topic-pills">
        <ul className="nav navbar-pills navbar-topics">
            {
                topics.map(function (topic, index) {
                    return (
                        <Topic topic={topic} />
                    )
                })
            }
            <li className="nav-item">
                <button type="button" className="btn btn-new-topic wbdv-new-page-btn">+</button>
            </li>
        </ul>
    </div>

export default TopicPills