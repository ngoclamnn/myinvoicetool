var columnDefs = [
  {headerName: "Make", field: "make"},
  {headerName: "Model", field: "model"},
  {headerName: "Price", field: "price"},
  {headerName: "Model", field: "model"},
  {headerName: "Model", field: "model"},
  {headerName: "Model", field: "model"},
  {headerName: "Model", field: "model"},
  {headerName: "Model", field: "model"},
  {headerName: "Model", field: "model"},
  {headerName: "Model", field: "model"}
];
    
// specify the data
var rowData = [
  {make: "Toyota", model: "Celica", price: 35000},
  {make: "Ford", model: "Mondeo", price: 32000},
  {make: "Porsche", model: "Boxter", price: 72000}
];
    
// let the grid know which columns and what data to use
var gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  defaultColDef: {
    editable: true,
    sortable: true
  }
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
});