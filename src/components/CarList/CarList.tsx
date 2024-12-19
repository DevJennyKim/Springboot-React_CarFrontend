import {
  DataGrid,
  gridClasses,
  GridRenderCellParams,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import './CarList.scss';
import * as api from '../../api/api.ts';
import * as type from '../../models/Index.js';
import AddEditModal from '../AddEditModal/AddEditModal.tsx';
import { useEffect, useState } from 'react';
// import Snackbar from '@mui/material/Snackbar';

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function CarList() {
  const [cars, setCars] = useState<type.Car[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 12,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<type.Car | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.getCars();
        const carsData = response._embedded?.cars || [];
        setCars(carsData);
        console.log(carsData);
      } catch (error) {
        console.error('Error Fetching Cars: ', error);
      }
    };
    fetchCars();
  }, []);

  const removeCar = async (carHref: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await api.deleteCar(carHref);
        setCars((prevCars) =>
          prevCars.filter((car) => car._links.self.href !== carHref)
        );
        alert('Car deleted successfully!');
      } catch (error) {
        console.error('Error Removing Car: ', error);
        alert('Failed to delete the car.');
      }
    }
  };
  const editCar = (car: type.Car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };
  const handleSaveCar = async (carHref: string, carData: type.FormData) => {};
  const columns = [
    { field: 'brand', headerName: 'Brand', width: 200 },
    { field: 'model', headerName: 'Model', width: 200 },
    { field: 'color', headerName: 'Color', width: 200 },
    { field: 'year', headerName: 'Year', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },

    {
      field: 'editActions',
      headerName: 'Edit',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<Car>) => (
        <button className="edit-button" onClick={() => editCar(params.row)}>
          Edit
        </button>
      ),
    },
    {
      field: 'deleteActions',
      headerName: 'Delete',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<Car>) => (
        <button
          className="delete-button"
          onClick={() => removeCar(params.row._links.self.href)}
        >
          Delete
        </button>
      ),
    },

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
      />
      <AddEditModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedCar={selectedCar}
        onSave={handleSaveCar}
      />
    </div>
  );
}

export default CarList;
