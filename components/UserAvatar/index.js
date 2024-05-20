import React, { Fragment, useEffect, useState } from "react";
import { Button, Fade, Paper, Popper } from "@mui/material";
import { Edit } from "@mui/icons-material";

const UserAvatar = ({ placement, user }) => {
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

  //   useEffect(() => {
  //     document.addEventListener("click", handleClose);

  //     return () => {
  //       document.removeEventListener("click", handleClose);
  //     };
  //   }, []);

  return (
    <Fragment>
      <Popper
        style={{ zIndex: 1200, marginBottom: "10px" }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <button
                className="flex gap-2 p-2 normal-case"
                onClick={() => setShowEditProfile(true)}
              >
                <Edit /> <span>Edit Profile</span>
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
