'use strict';
import { sortIcon, renderInput, renderPaginator } from './utils';


const grid = document.getElementById('grid');
const table = document.createElement('table');
const tableHead = document.createElement('thead');
const tableBody = document.createElement('tbody');
const tableFoot = document.createElement('tfoot');
table.append(tableHead, tableBody, tableFoot);
grid.appendChild(table);


const headers = ['Company', 'Contact', 'Country', 'Revenue', 'Employees', 'Founded'];
const totalSize = 200;
const pageSize = 10;
let currentPage = 1;

const rowsData = Array.from({ length: totalSize }, (_, index) => [
  `Company_${index + 1}`,
  `Contact_${index + 1}`,
  `Country_${index + 1}`,
  `$${(index + 1) * 100}K`,
  `${(index + 1) * 20}`,
  `${1980 + index}`
]);

const filterRows = (filterText, rows, columnIndex) =>
  filterText ? rows.filter(row => row[columnIndex].toLowerCase().includes(filterText.toLowerCase())) : rows;

const sortRows = (sortOrder, rows, columnIndex) => {
  if (sortOrder === 0) return rows;
  return [...rows].sort((a, b) => {
    const comparison = a[columnIndex].localeCompare(b[columnIndex], undefined, { numeric: true });
    return sortOrder === 1 ? comparison : -comparison;
  });
};

const renderRows = (rows) => {
  tableBody.innerHTML = ''; 
  rows.forEach(row => {
    const tableRow = document.createElement('tr');
    row.forEach(cellData => {
      const cell = document.createElement('td');
      cell.textContent = cellData;
      tableRow.appendChild(cell);
    });
    tableBody.appendChild(tableRow);
  });
};

const addSortListeners = (headerRow, rows) => {
  let sortOrder = 0;
  Array.from(headerRow.children).forEach((header, index) => {
    header.addEventListener('click', () => {
      sortOrder = sortOrder === 1 ? -1 : sortOrder === 0 ? 1 : 0;
      sortIcon(sortOrder, header);
      const sortedRows = sortRows(sortOrder, rows, index);
      renderRows(sortedRows);
    });
  });
};

const renderHeader = () => {
  const headerRow = document.createElement('tr');
  headers.forEach((header, index) => {
    const th = document.createElement('th');
    th.innerHTML = `<p>${header}</p>`;
    
    renderInput(th, '', 'text', '', header, [], (event) => {
      const filteredRows = filterRows(event.target.value, rowsData, index);
      renderRows(filteredRows);
    });
    
    sortIcon(0, th);
    headerRow.appendChild(th);
  });
  tableHead.appendChild(headerRow);
  return headerRow;
};

const loadMoreRows = ()=>{
  if(currentPage<Math.ceil(totalSize / pageSize)){
    currentPage++;
    const newRows= paginate()
    renderRows(newRows)
  }
}
const scrollHandler= ()=>{
  console.log('scrolling')
  const scrollHeight = grid.scrollHeight;
  const scrollTop = grid.scrollTop;
  const clientHeight = grid.clientHeight;
  if(scrollTop +clientHeight > scrollHeight -100){
      loadMoreRows()
  }
}


const paginate = () => {
  const start = (currentPage - 1) * pageSize;
  return rowsData.slice(start, start + pageSize);
};

const onPrev = () => {
  if (currentPage > 1) {
    currentPage--;
    renderRows(paginate());
  }
};



const onNext = () => {
  if (currentPage < Math.ceil(totalSize / pageSize)) {
    currentPage++;
    renderRows(paginate());
  }
};

const headerRow = renderHeader();
renderPaginator(tableFoot, onPrev, onNext);
addSortListeners(headerRow, paginate());
renderRows(paginate());

grid.addEventListener('scroll', scrollHandler)