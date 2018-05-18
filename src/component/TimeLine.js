import React from "react";
import TimeItem from "./TimeItem";

export default class TimeLine extends React.Component {
  render() {
    return (
      <div className="time-line" ref="line">
        {this.props.timeSlices.map((item) => <TimeItem wrap={this} {...item} key={item.start+item.end} />)}
      </div>
    )
  }
}