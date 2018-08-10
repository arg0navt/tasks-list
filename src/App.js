import React from 'react';
import TasksList from "./component";

const data = [
  {
    id: 0,
    name: "Jon",
    timeLine: [
      {
        start: 72000,
        end: 15000
      },
      {
        start: 17000,
        end: 30000
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