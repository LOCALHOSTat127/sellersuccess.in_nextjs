import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CircleLoading = ({size_}) => {
  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px",
    }}
  >
    <CircularProgress size={size_} />
  </Box>
  )
}

export default CircleLoading