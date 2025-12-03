"use strict";
const grid = document.getElementById("grid-infintie-scroll");
const tableContainer = document.createElement("div");
grid.appendChild(tableContainer);
const table = document.createElement("table");
const tableHead = document.createElement("thead");
const tableBody = document.createElement("tbody");
const tableFoot = document.createElement("tfoot");
table.append(tableHead, tableBody, tableFoot);
tableContainer.classList.add("infintie-scroll-div");
tableContainer.appendChild(table);

const headers = [
  "Company",
  "Contact",
  "Country",
  "Revenue",
  "Employees",
  "Founded",
];
const totalSize = 200;
const batchSize = 20;
let currentLoadedRows = 0;

const rowsData = Array.from({ length: totalSize }, (_, index) => [
  `Company_${index + 1}`,
  `Contact_${index + 1}`,
  `Country_${index + 1}`,
  `$${(index + 1) * 100}K`,
  `${(index + 1) * 20}`,
  `${1980 + index}`,
]);

const headerRow = document.createElement("tr");
headers.forEach((header) => {
  const th = document.createElement("th");
  th.textContent = header;
  headerRow.appendChild(th);
});
tableHead.appendChild(headerRow);

const renderRows = (rows) => {
  rows.forEach((row) => {
    const tableRow = document.createElement("tr");
    row.forEach((cellData) => {
      const cell = document.createElement("td");
      cell.textContent = cellData;
      tableRow.appendChild(cell);
    });
    tableBody.appendChild(tableRow);
  });
};

const loadInitialRows = () => {
  const initialRows = rowsData.slice(0, batchSize);
  renderRows(initialRows);
  currentLoadedRows = batchSize;
};

const loadMoreRows = () => {
  if (currentLoadedRows >= totalSize) return;

  const nextBatchStart = currentLoadedRows;
  const nextBatchEnd = Math.min(currentLoadedRows + batchSize, totalSize);
  const nextBatch = rowsData.slice(nextBatchStart, nextBatchEnd);

  renderRows(nextBatch);
  currentLoadedRows += batchSize;
};

tableContainer.addEventListener("scroll", () => {
  console.log("scroll");
  const { scrollTop, scrollHeight, clientHeight } = tableContainer;

  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loadMoreRows();
  }
});

loadInitialRows();
