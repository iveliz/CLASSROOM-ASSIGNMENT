import React from 'react';

import Select from 'react-select';

const aquaticCreatures = [
  { label: 'Shark', value: 'Shark' },
  { label: 'Dolphin', value: 'Dolphin' },
  { label: 'Whale', value: 'Whale' },
  { label: 'Octopus', value: 'Octopus' },
  { label: 'Crab', value: 'Crab' },
  { label: 'Lobster', value: 'Lobster' },
]
function App() {
  return (
    <div className="App">
      <Select
        options={aquaticCreatures}
      />
    </div>
  );
}

export default App;