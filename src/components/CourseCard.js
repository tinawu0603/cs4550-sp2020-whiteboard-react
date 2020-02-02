import React from "react";
import '../../public/css/course-card.style.client.css'

export default class CourseCard extends React.Component {
    render() {
        return (
            <div className="card" styles={{ width: '18rem' }}>
                <img className="card-img-top" src="https://picsum.photos/300/200" />
                <div className="card-body">
                    <h5 className="card-title">Card Title</h5>
                    <p className="card-text">Card Text.</p>
                    <a href="#" className="btn btn-primary">More...</a>
                </div>
            </div>
        )
    }
}