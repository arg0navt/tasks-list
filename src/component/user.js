import React from "react";

type Props = {
  name: string,
}

export default class User extends React.Component<Props> {
  render() {
    return (
      <div className="userInfo">
        <p className="userInfo__name">{this.props.name}</p>
      </div>
    )
  }
}