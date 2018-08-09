import React from "react";
import PropTypes from 'prop-types';
import Hammer from "react-hammerjs";
import TimeLine from "./TimeLine";

export default class TimeItem extends React.Component {
  dragElement(e) {
    const widthWrap = this.props.wrap.refs.line.clientWidth;
    const range = e.deltaX < 0 ? ((e.deltaX * -1) / (widthWrap / 100)) : (e.deltaX / (widthWrap / 100));
    this.context.changeTaskPosition(range, this.props.id, this.props.index);
  }
  dragEnd(e) {
    // const widthWrap = this.props.wrap.refs.line.clientWidth;
    // this.setState(prevState => {
    //   const range = e.deltaX < 0 ? ((e.deltaX * -1) / (widthWrap / 100)) : (e.deltaX / (widthWrap / 100));
    //   if(e.deltaX < 0) {
    //     if(this.state.start - range <= 0){
    //       prevState.end = this.state.end - this.state.start;
    //       prevState.start = 0;
    //     } else {
    //       prevState.start = prevState.start - range;
    //       prevState.end = prevState.end - range;
    //     }
    //   } else {
    //     if(this.state.end + range >= 100) {
    //       prevState.start = 100 - (this.state.end - this.state.start);
    //       prevState.end = 100;
    //     } else {
    //       prevState.start = prevState.start + range;
    //       prevState.end = prevState.end + range;
    //     }
    //   }
    //   return prevState;
    // }, () => e.target.style.marginLeft = 0);
  }
  render() {
    const start = this.context.convertMillisecondToWidth(this.props.start);
    const end = this.context.convertMillisecondToWidth(this.props.end);
    return (
      <Hammer onPan={(e) => this.dragElement(e)} onPanEnd={(e) => this.dragEnd(e)}>
        <div className="time-line__item" style={{width: `${end - start}%`, left: `${start}%`}} />
      </Hammer>
    )
  }
}

TimeItem.contextTypes = {
  convertMillisecondToWidth: PropTypes.func,
  convertTimeFormat: PropTypes.func,
  changeTaskPosition: PropTypes.func
};