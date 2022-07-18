import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import React from "react";
import "../styles.scss";

export default function Notification() {
  return (
    <>
      <Badge
        badgeContent={990}
        max={9}
        color="primary"
        className="pointer mr-10"
      >
        <NotificationsIcon cationsIcon />
      </Badge>
    </>
  );
}
