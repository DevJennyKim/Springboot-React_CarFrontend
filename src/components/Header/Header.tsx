import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Car Database</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
