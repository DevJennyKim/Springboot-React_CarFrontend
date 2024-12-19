import {
  DataGrid,
  gridClasses,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import './CarList.scss';
import { getCars } from '../../api/api.js';
import { useEffect, useState } from 'react';
// import Snackbar from '@mui/material/Snackbar';

interface Link {
  href: string;
}

interface Links {
  profile: Link;
  search: Link;
  self: Link;
}

interface Car {
  brand: string;
  model: string;
  color: string;
  registerNumber: string;
  year: number;
  price: number;
  _links: Links;
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
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 12,
  });
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getCars();
        const carsData = response._embedded?.cars || [];
        setCars(carsData);
        console.log(carsData);
      } catch (error) {
        console.error('Error Fetching Cars: ', error);
      }
    };
    fetchCars();
  }, []);

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
    <div className="grid">
      <DataGrid
        rows={cars}
        columns={columns}
        disableRowSelectionOnClick={true}
        getRowId={(row) => row._links.self.href}
        slots={{ toolbar: CustomToolbar }}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 15, 20]}
      ></DataGrid>
    </div>
  );
}

export default CarList;
