import moment from "moment";
import React from "react";
import PropTypes from 'prop-types';
import User from "./user";
import TimeLine from "./TimeLine";
import Hammer from "hammerjs";

export const MAX_DURATION = 86400;
export const ONE_PROCENT = MAX_DURATION / 100;

export default class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      wrap: null,
      control: new Hammer(document.querySelector('body'))
    };

    this.event = {
      init: false,
      id: null,
      index: null,
    };

    this.state.control.on('pan', (e) => {
      if (e.target.classList.contains("time-line__item")) {
        e.target.classList.add("focus");
        this.event.init = true;
        this.event.id = Number(e.target.getAttribute("atr-item"));
        this.event.index = Number(e.target.getAttribute("atr-index"));
      }
      if (this.event.init) {
        const widthWrap = this.state.wrap.clientWidth;
        const range = e.deltaX / (widthWrap / 100);
        this.changeTaskPosition(range, this.event.id, this.event.index);
      }
    });

    this.state.control.on("panend", () => {
      this.endChangeTaskPosition(this.event.id, this.event.index);
      this.event.init = false;
      this.event.id = null;
      this.event.index = null;
      const tasksBlocks = document.querySelectorAll(".time-line__item");
      for (let i = 0; i < tasksBlocks.length; i++) {
        tasksBlocks[i].classList.remove("focus");
      }
    })
  }

  componentDidMount() {
    const wrap = this.refs.wrap;
    this.setState({wrap});
  }

  // initWrap = (wrap) => this.setState({wrap});

  getChildContext() {
    return {
      convertSecondToWidth: this.convertSecondToWidth,
      convertTimeFormat: this.convertTimeFormat,
      changeTaskPosition: this.changeTaskPosition,
      endChangeTaskPosition: this.endChangeTaskPosition,
      control: this.state.constructor
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

  convertSecondToWidth = (time) => (time / MAX_DURATION) * 100;
  convertTimeFormat = (time) => moment.duration(time);

  changeTaskPosition = (range, id, index) => {
    const duration = Math.trunc(ONE_PROCENT * range);
    this.setState(prevState => {
      const findLine = prevState.tasks.find((line) => line.id === id);
      if (findLine && findLine.timeLine && findLine.timeLine[index]) {
        const activeTask = findLine.timeLine[index];
        if (activeTask.prevPosition) {
          if ((activeTask.prevPosition.start + duration) < 0) {
            activeTask.start = 0;
            activeTask.end = activeTask.prevPosition.end - activeTask.prevPosition.start;
          } else if ((activeTask.prevPosition.end + duration) > MAX_DURATION) {
            activeTask.start = activeTask.start;
          } else activeTask.start = activeTask.prevPosition.start + duration;

          if ((activeTask.prevPosition.end + duration) > MAX_DURATION) {
            activeTask.end = MAX_DURATION;
            activeTask.start = MAX_DURATION - (activeTask.prevPosition.end - activeTask.prevPosition.start);
          } else if ((activeTask.prevPosition.start + duration) < 0) {
            activeTask.end = activeTask.end
          } else activeTask.end = activeTask.prevPosition.end + duration;

        } else {
          activeTask.prevPosition = {
            start: activeTask.start,
            end: activeTask.end
          };
          if (activeTask.prevPosition.end + duration < MAX_DURATION && activeTask.prevPosition.start + duration >= 0) {
            activeTask.start = activeTask.prevPosition.start + duration;
            activeTask.end = activeTask.prevPosition.end + duration;
          }
        }
      }
      return prevState;
    });
  };

  endChangeTaskPosition = (id, index) => {
    this.setState(prevState => {
      const findLine = prevState.tasks.find((line) => line.id === id);
      if (findLine && findLine.timeLine && findLine.timeLine[index]) {
        delete findLine.timeLine[index].prevPosition
      }
      return prevState;
    })
  };

  render() {
    return (
      <div className="taskList">
        <div className="taskList__users">
          {this._renderUserName()}
        </div>
        <div className="taskList__usersTime" ref="wrap">
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
  convertSecondToWidth: PropTypes.func,
  convertTimeFormat: PropTypes.func,
  changeTaskPosition: PropTypes.func,
  endChangeTaskPosition: PropTypes.func,
  control: PropTypes.func
};