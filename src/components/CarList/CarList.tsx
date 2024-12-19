import {
  DataGrid,
  gridClasses,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { useState } from 'react';
// import Snackbar from '@mui/material/Snackbar';
interface Car {
  brand: string;
  model: string;
  color: string;
  registerNumber: string;
  year: number;
  price: number;
}
function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [open, setOpen] = useState(false);

  const columns = [
    { field: 'brand', headerName: 'Brand', width: 200 },
    { field: 'model', headerName: 'Model', width: 200 },
    { field: 'color', headerName: 'Color', width: 200 },
    { field: 'year', headerName: 'Year', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    {
      field: '_links.car.href',
      headerName: '',
      sortable: false,
      filterable: false,
    },
    {
      field: '_links.self.href',
      headerName: '',
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <>
      <DataGrid rows={cars} columns={columns}></DataGrid>
    </>
  );
}

export default CarList;
