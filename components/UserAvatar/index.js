import React, { Fragment, useEffect, useState } from "react";
import { Fade, Paper, Popper } from "@mui/material";
import { AdminPanelSettings, Edit, Face, Payments } from "@mui/icons-material";
import EditProfileDialog from "./EditProfileDialog";
import { firebaseSignOut } from "../../firebase/utils";
import PaymentsHistoryDialog from "./PaymentsHistoryDialog";
import { useRouter } from "next/navigation";

const UserAvatar = ({ placement, user, className, onlyIcon = false }) => {
  const [open, setOpen] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const router = useRouter();
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
      {showPayments && (
        <PaymentsHistoryDialog
          open={showPayments}
          setOpen={setShowPayments}
          user={user}
        />
      )}
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              {user.isAdmin && (
                <button
                  className={`flex gap-2 p-2 normal-case ${className}`}
                  onClick={() => router.push("/admin")}
                >
                  <AdminPanelSettings /> <span>Admin Panel</span>
                </button>
              )}

              <button
                className={`flex gap-2 p-2 normal-case ${className}`}
                onClick={() => setShowPayments(true)}
              >
                <Payments /> <span>Payments</span>
              </button>

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
        {!onlyIcon && (
          <div className="text-ellipsis whitespace-nowrap overflow-hidden text-black">
            {getAvatarName()}
          </div>
        )}
      </button>
    </Fragment>
  );
};

export default UserAvatar;
