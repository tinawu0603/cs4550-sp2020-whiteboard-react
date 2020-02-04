import React from "react";

class ModuleComponent extends React.Component {
    state = {
        selected: false
    }

    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return (
            <div>
                {
                    this.state.selected &&
                    <li class="module-item wbdv-module-item" onClick={() =>
                        this.updateForm({
                            selected: false
                        })
                    }
                        style={{ 'backgroundColor': '#c30f0f' }}>
                        <a class="module-link wbdv-module-item-title" href="#">{this.props.module.title}</a>
                    </li>
                }
                {
                    !this.state.selected &&
                    <li class="module-item wbdv-module-item" onClick={() =>
                        this.updateForm({
                            selected: true
                        })
                    }
                        style={{ 'backgroundColor': 'none' }}>
                        <a class="module-link wbdv-module-item-title" href="#">{this.props.module.title}</a>
                    </li>
                }
            </div >
        )
    }
}

export default ModuleComponent