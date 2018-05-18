import React from "react";
import Hammer from "react-hammerjs";

export default class TimeItem extends React.Component {
  componentDidMount() {
    setTimeout(() => this.widthWrap = this.props.wrap.refs.line.clientWidth)
  }
  dragElement(e) {
    console.log(e, e.distance / (this.widthWrap / 100))
  }
  render() {
    this.startPosition = ((Number(this.props.start.slice(0, 2)) / 24) * 100) + (Number(this.props.start.slice(2, 4) / 1440) * 100);
    this.endPosition = ((Number(this.props.end.slice(0, 2)) / 24) * 100) + (Number(this.props.end.slice(2, 4) / 1440) * 100);
    return (
      <Hammer onPan={(e) => this.dragElement(e)}>
        <div className="time-line__item" style={{width: `${this.endPosition - this.startPosition}%`, left: `${this.startPosition}%`}}>
          <div className="time-line__control start"/>
          <Hammer>
            <div className="time-line__control end"/>
          </Hammer>
        </div>
      </Hammer>
    )
  }
}