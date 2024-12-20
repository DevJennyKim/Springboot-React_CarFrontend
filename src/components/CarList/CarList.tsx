import {
  DataGrid,
  GridPagination,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import './CarList.scss';
import * as api from '../../api/api.ts';
import * as type from '../../models/Index.js';
import AddEditModal from '../AddEditModal/AddEditModal.tsx';
import { useEffect, useState } from 'react';
// import Snackbar from '@mui/material/Snackbar';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: 'Change density' } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: 'Export data' },
          button: { variant: 'outlined' },
        }}
      />
    </GridToolbarContainer>
  );
}

function CarList() {
  const [cars, setCars] = useState<type.Car[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<type.Car | null>(null);

  const CustomFooter = () => {
    return (
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          color="neutral"
          variant="soft"
          startDecorator={<Add />}
          type="button"
          onClick={() => {
            clickAdd();
          }}
        >
          Add
        </Button>
        <GridPagination />
      </Box>
    );
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.getCars();
        const carsData =
          response._embedded?.cars ||
          [].map((car: type.Car) => ({
            ...car,
            registerNumber: car.registerNumber || '',
          }));
        setCars(carsData);
        console.log('CarData:', carsData);
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
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCar(null);
  };
  const clickAdd = async () => {
    setModalOpen(true);
  };
  const handleSaveCar = async (carData: type.FormData) => {
    console.log(carData);

    try {
      const updatedCarData = {
        ...carData,
      };
      if (selectedCar) {
        await api.updateCar(selectedCar._links.self.href, updatedCarData);
        setCars((prevCars) =>
          prevCars.map((car) =>
            car._links.self.href === selectedCar._links.self.href
              ? { ...car, ...updatedCarData }
              : car
          )
        );
        alert('Car updated successfully!');
      } else {
        const response = await api.postCar(carData);
        setCars((prevCars) => [...prevCars, response]);
        alert('Car added successfully!');
      }
      setModalOpen(false);
      setSelectedCar(null);
    } catch (error) {
      console.error('Error Saving Car: ', error);
      alert('Failed to save the car.');
    }
  };

  const columns = [
    { field: 'brand', headerName: 'Brand', width: 200 },
    { field: 'model', headerName: 'Model', width: 200 },
    { field: 'color', headerName: 'Color', width: 200 },
    { field: 'registerNumber', headerName: 'Register Number', width: 200 },
    { field: 'year', headerName: 'Year', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },

    {
      field: 'editActions',
      headerName: 'Edit',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<type.Car>) => (
        <button className="btn-edit" onClick={() => editCar(params.row)}>
          <EditIcon />
        </button>
      ),
    },
    {
      field: 'deleteActions',
      headerName: 'Delete',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<type.Car>) => (
        <button
          className="btn-delete"
          onClick={() => removeCar(params.row._links.self.href)}
        >
          <DeleteIcon />
        </button>
      ),
    },
  ];

  return (
    <div className="grid">
      <DataGrid
        rows={cars}
        columns={columns}
        className=""
        disableRowSelectionOnClick={true}
        getRowId={(row) => row._links.self.href}
        slots={{ toolbar: CustomToolbar, footer: CustomFooter }}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 15, 20]}
      />
      <AddEditModal
        open={modalOpen}
        onClose={handleModalClose}
        selectedCar={selectedCar}
        onSave={handleSaveCar}
      />
    </div>
  );
}

export default CarList;
