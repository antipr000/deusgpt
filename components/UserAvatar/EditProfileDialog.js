import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateUser } from "../../api";

const Input = ({ onChange, name, ...rest }) => {
  return (
    <input
      {...rest}
      name={name}
      onChange={(e) => onChange(name, e.target.value)}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 
            text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground 
            focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 
            focus-visible:border-ring"
    />
  );
};

const EditProfileDialog = ({ open, setOpen, user }) => {
  const [userData, setUserData] = useState({...user});

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const onUpdate = async () => {
    const { firstName, lastName } = userData;

    if (!firstName || !lastName) {
      window.alert("Both First Name and Last Name are mandatory!");
    } else {
      await updateUser(userData);
      handleClose();
    }
  };

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        id="customized-dialog-title"
      >
        <span className="font-[900]">Edit Profile</span>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <div className="flex flex-col gap-2">
          <Input
            required
            name="firstName"
            value={userData.firstName}
            onChange={onChange}
            placeholder="First Name"
          />
          <Input
            required
            name="lastName"
            value={userData.lastName}
            onChange={onChange}
            placeholder="Last Name"
          />
        </div>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <button className="w-full font-medium" autoFocus onClick={onUpdate}>
          Update
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
