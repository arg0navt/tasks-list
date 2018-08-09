import React from "react";
import PropTypes from 'prop-types';
import Hammer from "react-hammerjs";
import TimeLine from "./TimeLine";

export default class TimeItem extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      start: context.convertMillisecondToWidth(props.start),
      end: context.convertMillisecondToWidth(props.end),
    };
  }
  dragElement(e) {
    const widthWrap = this.props.wrap.refs.line.clientWidth;
    const range = e.deltaX < 0 ? ((e.deltaX * -1) / (widthWrap / 100)) : (e.deltaX / (widthWrap / 100));
    if(e.deltaX < 0) {
      if (this.state.start - range >= 0) {
        e.target.style.marginLeft = `${e.deltaX}px`;
      } else e.target.style.marginLeft = `-${this.state.start * (widthWrap / 100)}px`;
    } else {
      if(this.state.end + range <= 100) {
        e.target.style.marginLeft = `${e.deltaX}px`;
      } else {
        e.target.style.marginLeft = `${(100 - (this.state.end - this.state.start) - this.state.start) * (widthWrap / 100)}px`;
      }
    }
  }
  dragEnd(e) {
    const widthWrap = this.props.wrap.refs.line.clientWidth;
    this.setState(prevState => {
      const range = e.deltaX < 0 ? ((e.deltaX * -1) / (widthWrap / 100)) : (e.deltaX / (widthWrap / 100));
      if(e.deltaX < 0) {
        if(this.state.start - range <= 0){
          prevState.end = this.state.end - this.state.start;
          prevState.start = 0;
        } else {
          prevState.start = prevState.start - range;
          prevState.end = prevState.end - range;
        }
      } else {
        if(this.state.end + range >= 100) {
          prevState.start = 100 - (this.state.end - this.state.start);
          prevState.end = 100;
        } else {
          prevState.start = prevState.start + range;
          prevState.end = prevState.end + range;
        }
      }
      return prevState;
    }, () => e.target.style.marginLeft = 0);
  }
  render() {
    return (
      <Hammer onPan={(e) => this.dragElement(e)} onPanEnd={(e) => this.dragEnd(e)}>
        <div className="time-line__item" style={{width: `${this.state.end - this.state.start}%`, left: `${this.state.start}%`}} />
      </Hammer>
    )
  }
}

TimeItem.contextTypes = {
  convertMillisecondToWidth: PropTypes.func,
  convertTimeFormat: PropTypes.func
};