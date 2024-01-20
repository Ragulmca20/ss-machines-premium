import { FC } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { Typography } from "@mui/material";
const NoDataFound: FC<{message:string}> = ({message}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <InfoIcon color="primary" />
      <Typography variant="h6" alignItems={"center"}>
       {message}
      </Typography>
    </div>
  );
};
export default NoDataFound;
