import React from "react";
import Hammer from "react-hammerjs";

export default class TimeItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      start: null,
      end: null,
    };
  }
  componentWillMount() {
    console.log(((Number(this.props.start.slice(0, 2)) / 24) * 100) + (Number(this.props.start.slice(2, 4) / 1440) * 100));
    this.setState({
      start: ((Number(this.props.start.slice(0, 2)) / 24) * 100) + (Number(this.props.start.slice(2, 4) / 1440) * 100),
      end: ((Number(this.props.end.slice(0, 2)) / 24) * 100) + (Number(this.props.end.slice(2, 4) / 1440) * 100)
    })
  }
  dragEnd(e) {
    const widthWrap = this.props.wrap.refs.line.clientWidth;
    this.setState(prevState => {
      const range = e.deltaX < 0 ? ((e.deltaX * -1) / (widthWrap / 100)) : (e.deltaX / (widthWrap / 100));
      prevState.start = e.deltaX < 0 ? prevState.start - range : prevState.start + range;
      prevState.end = e.deltaX < 0 ? prevState.end - range : prevState.end + range;
      return prevState;
    }, () => e.target.style.marginLeft = 0);
  }
  render() {
    return (
      <Hammer onPan={(e) => e.target.style.marginLeft = `${e.deltaX}px`} onPanEnd={(e) => this.dragEnd(e)}>
        <div className="time-line__item" style={{width: `${this.state.end - this.state.start}%`, left: `${this.state.start}%`}}>
          <div className="time-line__control start"/>
          <Hammer>
            <div className="time-line__control end"/>
          </Hammer>
        </div>
      </Hammer>
    )
  }
}