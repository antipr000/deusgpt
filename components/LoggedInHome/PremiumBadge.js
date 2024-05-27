import { Diamond } from "@mui/icons-material";
import { Typography } from "@mui/material";

const PremiumBadge = () => {
  return (
    <div
      className="d-flex flex-row p-2 justify-center"
      style={{
        gap: "5px",
        backgroundColor: "#6237A0",
        borderRadius: "5px",
        alignItems: "center",
        marginLeft: "2px",
        marginRight: "2px",
        width: "80%",
        alignSelf: "center",
      }}
    >
      <Diamond fontSize="small" htmlColor="white" />
      <Typography color="white"> Premium </Typography>
    </div>
  );
};

export default PremiumBadge;
