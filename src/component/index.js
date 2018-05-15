import React from "react";
import User from "./user";

type Props = {
  tasks: Array<Object>
}

export default class TasksList extends React.Component<Props> {
  render() {
    return (
      <div className="taskList">
        <div className="taskList__users">
          {this.props.tasks.map((task) => <User key={task.id} name={task.name} />)}
        </div>
        <div className="taskList__usersTime">
        </div>
      </div>
    )
  }
}