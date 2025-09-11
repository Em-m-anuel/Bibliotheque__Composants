// src/Components/Table/Table.jsx
import React, { useState } from 'react';
import './_table.scss';

const Table = ({ columns, data, sortable, paginated, className, ...props }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (columnName) => {
    if (!sortable) return;
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className={`table-container ${className || ''}`} {...props}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                onClick={() => handleSort(column.key)}
                className={sortable ? 'sortable' : ''}
              >
                {column.label}
                {sortColumn === column.key && (
                  <span>{sortDirection === 'asc' ? ' 🔼' : ' 🔽'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column.key}>{item[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {paginated && (
        <div className="pagination">
          {/* Logique de pagination à implémenter ici */}
          <p>La pagination sera affichée ici.</p>
        </div>
      )}
    </div>
  );
};

export default Table;