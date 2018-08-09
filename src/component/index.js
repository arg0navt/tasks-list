import moment from "moment";
import React from "react";
import PropTypes from 'prop-types';
import User from "./user";
import TimeLine from "./TimeLine";

export const MAX_DURATION = 86400000;
export const ONE_PROCENT = 864000;

export default class TasksList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: props.tasks
    }
  }

  getChildContext() {
    return {
      convertMillisecondToWidth: this.convertMillisecondToWidth,
      convertTimeFormat: this.convertTimeFormat,
      changeTaskPosition: this.changeTaskPosition
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

  _renderLine = () => this.state.tasks.map((task) => <TimeLine key={task.id} timeSlices={task.timeLine} id={task.id}/>);
  _renderUserName = () => this.state.tasks.map((task) => <User key={task.id} name={task.name}/>);

  convertMillisecondToWidth = (time) => (time / MAX_DURATION) * 100;
  convertTimeFormat = (time) => moment.duration(time);

  changeTaskPosition = (range, id, index) => {
    const duration = Math.trunc(ONE_PROCENT * range);
    this.setState(prevState => {
      const findLine = prevState.tasks.find((line) => line.id === id);
      console.log(range, duration);
      if(findLine && findLine.timeLine && findLine.timeLine[index]) {
        findLine.timeLine[index] = {end: findLine.timeLine[index].end + duration, start: findLine.timeLine[index].start + duration};
      }
      return prevState;
    })
    // if(e.deltaX < 0) {
    //   if (this.state.start - range >= 0) {
    //     e.target.style.marginLeft = `${e.deltaX}px`;
    //   } else e.target.style.marginLeft = `-${this.state.start * (widthWrap / 100)}px`;
    // } else {
    //   if(this.state.end + range <= 100) {
    //     e.target.style.marginLeft = `${e.deltaX}px`;
    //   } else {
    //     e.target.style.marginLeft = `${(100 - (this.state.end - this.state.start) - this.state.start) * (widthWrap / 100)}px`;
    //   }
    // }
  }

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
  convertTimeFormat: PropTypes.func,
  changeTaskPosition: PropTypes.func
};