function CourseServiceClient() {
    this.createCourse = createCourse;
    this.findAllCourses = findAllCourses;
    this.findCourseById = findCourseById;
    this.deleteCourse = deleteCourse;
    this.updateCourse = updateCourse;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/001280266/courses';
    var self = this;
    function createCourse(course) {
        return fetch(self.url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
    }
    function findAllCourses() {
        return fetch(self.url)
            .then(response => response.json())
    }
    function findCourseById(id) {
        return fetch(`${self.url}/${id}`)
            .then(response => response.json())
    }
    function updateCourse(id, course) {
        return fetch(`${self.url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
    }
    function deleteCourse(id) {
        return fetch(`${self.url}/${id}`, {
            method: 'DELETE'
        })
    }
}