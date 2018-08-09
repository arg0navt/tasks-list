import moment from "moment";
import React from "react";
import PropTypes from 'prop-types';
import User from "./user";
import TimeLine from "./TimeLine";

export const MAX_DURATION = 86400000;

export default class TasksList extends React.Component {
  getChildContext() {
    return {
      convertMillisecondToWidth: this.convertMillisecondToWidth,
      convertTimeFormat: this.convertTimeFormat
    }
  }

  _renderMeasure = () => {
    for (var i = -1, result = []; i <= 47; i++) {
      if (i < 0) {
        result.push("00:00")
      } else if (i === 47) {
        result.push("")
      } else result.push(`${i / 2 < 9 ? '0' + (i / 2).toFixed() : (i / 2).toFixed()}:${!(i % 2) ? 30 : '00'}`)
    }
    return result.map((item) => <div key={item} className="time-measure__item"><p>{item}</p></div>)
  };

  _renderLine = () => this.props.tasks.map((task) => <TimeLine key={task.id} timeSlices={task.timeLine}/>);
  _renderUserName = () => this.props.tasks.map((task) => <User key={task.id} name={task.name}/>);

  convertMillisecondToWidth = (time) => (time / MAX_DURATION) * 100;
  convertTimeFormat = (time) => moment.duration(time);

  render() {
    return (
      <div className="taskList">
        <div className="taskList__users">
          {this._renderUserName()}
        </div>
        <div className="taskList__usersTime">
          {this._renderLine()}
          <div className="time-measure">
            {this._renderMeasure()}
          </div>
        </div>
      </div>
    )
  }
}

TasksList.childContextTypes = {
  convertMillisecondToWidth: PropTypes.func,
  convertTimeFormat: PropTypes.func
};