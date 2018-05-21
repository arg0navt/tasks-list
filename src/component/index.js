import React from "react";
import User from "./user";
import TimeLine from "./TimeLine";

type Props = {
  tasks: Array<Object>
}

const timeMeasure = () => {
  const result = [];
  for(let i = -1; i <= 47; i++) {
    if(i < 0) {result.push("00:00")}
    else if (i === 47) {result.push("")}
    else {result.push(`${i/2 < 9 ? '0'+ (i/2).toFixed() : (i/2).toFixed()}:${!(i % 2) ? 30 : '00'}`)}
  }
  return result;
};

export default class TasksList extends React.Component<Props> {
  render() {
    return (
      <div className="taskList">
        <div className="taskList__users">
          {this.props.tasks.map((task) => <User key={task.id} name={task.name} />)}
        </div>
        <div className="taskList__usersTime">
          {this.props.tasks.map((task) => <TimeLine key={task.id} timeSlices={task.timeLine} />)}
          <div className="time-measure">
            {timeMeasure().map((item) => <div key={item} className="time-measure__item"><p>{item}</p></div>)}
          </div>
        </div>
      </div>
    )
  }
}