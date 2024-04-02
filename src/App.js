import React from 'react';
import HeaderCard from './HeaderCard'; // Import HeaderCard component
import TableCard from './TableCard';
function App() {
  return (
    <div className="App">
      <HeaderCard title="CALL-BREAK CALCULATOR" /> {/* Use HeaderCard component */}
      <TableCard></TableCard>
    </div>
  );
}

export default App;
