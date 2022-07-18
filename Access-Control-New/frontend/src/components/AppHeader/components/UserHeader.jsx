import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import { Dialog, DialogContent, Menu, MenuItem, Typography } from '@mui/material';
import * as React from 'react';
import '../styles.scss';
import { useDispatch } from 'react-redux';
import { logout } from 'features/auth/userSlice';
import ChangePassword from 'features/auth/components/ChangePassword';

const MODE = {
  CHANGEPASSWORD: 'change_password'
}

export default function UserHeader() {
  const dispatch = useDispatch();
  const [mode, setMode] = React.useState('')

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
  };
  
  const handleChangePassword = () => {
    setMode(MODE.CHANGEPASSWORD);
    handleClose();
  }

  const handleCloseDialog = () => {
    setMode('');
  };

  return (
    <>
      <AccountCircleIcon
        className="pointer"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        sx={{ mt: '2rem' }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <PersonIcon className="mr-8" />
          <Typography textAlign="center">Thông tin</Typography>
        </MenuItem>
        <MenuItem onClick={handleChangePassword}>
          <LockIcon className="mr-8" />
          <Typography textAlign="center">Đổi mật khẩu</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose} divider>
          <SettingsIcon className="mr-8" />
          <Typography textAlign="center">Cài đặt</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon className="mr-8" />
          <Typography textAlign="center">Đăng xuất</Typography>
        </MenuItem>
      </Menu>

      <Dialog
        PaperProps={{
          sx: { position: 'fixed', top: '10vh', left: 'auto', m: 0, width: '400px' },
        }}
        fullWidth
        open={!!mode}
        onClose={handleCloseDialog}
      >
        <DialogContent>
          {mode === MODE.CHANGEPASSWORD && <ChangePassword closeDialog={handleCloseDialog} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
