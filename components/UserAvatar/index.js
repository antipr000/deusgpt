import React, { Fragment, useEffect, useState } from "react";
import { Fade, Paper, Popper } from "@mui/material";
import { Edit, Face } from "@mui/icons-material";
import EditProfileDialog from "./EditProfileDialog";
import { firebaseSignOut } from "../../firebase/utils";

const UserAvatar = ({ placement, user, className }) => {
  const [open, setOpen] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const getAvatarName = () => {
    if (user.firstName) {
      return `${user.firstName} ${user.lastName}`;
    } else {
      return user.email;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);

    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, []);

  return (
    <Fragment>
      {showEditProfile && (
        <EditProfileDialog
          open={showEditProfile}
          setOpen={setShowEditProfile}
          user={user}
        />
      )}
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <button
                className={`flex gap-2 p-2 normal-case ${className}`}
                onClick={() => setShowEditProfile(true)}
              >
                <Edit /> <span>Edit Profile</span>
              </button>
              <button
                className={`flex gap-2 p-2 normal-case ${className}`}
                onClick={() => firebaseSignOut()}
              >
                <Face /> <span>Logout</span>
              </button>
            </Paper>
          </Fade>
        )}
      </Popper>
      <button className="flex items-center gap-[5px]" onClick={handleClick}>
        <div
          className="min-w-[25px] h-[25px] rounded-[50%] bg-yellow-500
           text-white flex justify-center items-center"
        >
          {getAvatarName()[0]}
        </div>
        <div className="text-ellipsis whitespace-nowrap overflow-hidden text-black">
          {getAvatarName()}
        </div>
      </button>
    </Fragment>
  );
};

export default UserAvatar;
