// @flow

import React from 'react';
import TasksList from "./component";

const data = [
  {
    id: 0,
    name: "Jon",
    timeLine: [
      {
        start: 7200000,
        end: 15000000
      },
      {
        start: 17000000,
        end: 30000000
      }
    ]
  }
];

class App extends React.Component<{}> {
  render() {
    return (
      <div className="App">
        <TasksList tasks={data} />
      </div>
    );
  }
}

export default App;