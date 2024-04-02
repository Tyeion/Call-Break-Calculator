import React, { useState, useRef } from 'react';
import './TableCard.css'; // Import CSS file for styling

function TableCard() {
    const [rows, setRows] = useState([]);
    const [columnNames, setColumnNames] = useState(['PLAYER 1', 'PLAYER 2', 'PLAYER 3', 'PLAYER 4']);
    const [nameSet, setNameSet] = useState(Array(columnNames.length).fill(false)); // Track if name is set for each column
    const [rowDone, setRowDone] = useState(Array(rows.length).fill(false)); // Track if row is done for each row
    const [expectedMode, setExpectedMode] = useState(true); // Track if the table is in "Expected" mode
    const [editingRow, setEditingRow] = useState(null); // Track the row being edited
    const numRowsRef = useRef();

  // Function to add rows based on user input
  const addRows = () => {
    const numRows = Number(numRowsRef.current.value);
    const newRows = Array.from({ length: numRows }, (_, index) => ({
      id: rows.length + index + 1,
      data: Array(columnNames.length).fill(''), // Initialize each cell with an empty string
    }));
    setRows([...rows, ...newRows]);
    setRowDone([...rowDone, ...Array(numRows).fill(false)]);
  };

  // Function to handle column name change
  const handleColumnNameChange = (index, newName) => {
    const newColumnNames = [...columnNames];
    newColumnNames[index] = newName;
    setColumnNames(newColumnNames);
  };

  // Function to fix column name
  const fixColumnName = (index) => {
    if (!nameSet[index]) {
      const newNameSet = [...nameSet];
      newNameSet[index] = true;
      setNameSet(newNameSet);
      alert(`Column name "${columnNames[index]}" is fixed. You won't be able to change it again.`);
    }
  };

  // Function to handle number change in a row
  const handleNumberChange = (rowIndex, columnIndex, newValue) => {
    const newRows = [...rows];
    newRows[rowIndex].data[columnIndex] = newValue; // Set the value directly
    setRows(newRows);
  };

  // Function to fix a row
  const fixRow = (rowIndex) => {
    if (!rowDone[rowIndex]) {
      const newRowDone = [...rowDone];
      newRowDone[rowIndex] = true;
      setRowDone(newRowDone);
      alert(`Row ${rowIndex + 1} is fixed. You won't be able to change it again.`);
    }
  };

  // Function to handle the click of the "Actual" button
  const handleActualClick = (rowIndex) => {
    setEditingRow(rowIndex); // Set the index of the row being edited
  };

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            {columnNames.map((columnName, index) => (
              <th key={index}>
                {nameSet[index] ? ( // Render input field if name is not already set
                  <span>{columnName}</span>
                ) : (
                  <div>
                    <input
                      type="text"
                      value={columnName}
                      onChange={(e) => handleColumnNameChange(index, e.target.value)}
                    />
                    <button onClick={() => fixColumnName(index)}>Done</button>
                  </div>
                )}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Render dynamic rows */}
          {rows.map((row, rowIndex) => (
            <tr key={row.id}>
              {row.data.map((cellValue, columnIndex) => (
                <td key={`${rowIndex}-${columnIndex}`}>
                  <input
                    type="number"
                    value={cellValue}
                    onChange={(e) => handleNumberChange(rowIndex, columnIndex, e.target.value)}
                    readOnly={!expectedMode && rowDone[rowIndex]} // Add readOnly attrib ute conditionally
                    disabled={!expectedMode} // Disable the input field when not in "Expected" mode

                  />
                </td>
              ))}
              <td>
                {!rowDone[rowIndex] && (
                  <button onClick={() => fixRow(rowIndex)}>Done</button>
                )}
                <button onClick={() => handleActualClick(rowIndex)}>Actual</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-row-section">
        <input ref={numRowsRef} type="number" placeholder="Enter number of rows" />
        <button onClick={addRows}>Add Rows</button>
      </div>
    </div>
  );
}

export default TableCard;
