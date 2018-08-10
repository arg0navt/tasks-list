import React from "react";
import TimeItem from "./TimeItem";

export default class TimeLine extends React.Component {
  render() {
    return (
      <div className="time-line">
        {this.props.timeSlices.map((item, index) => <TimeItem
          index={index}
          id={this.props.id}
          wrap={this}
          {...item}
          key={this.props.id + index}
        />)}
      </div>
    )
  }
}