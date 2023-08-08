import { Box, CircularProgress, Typography } from "@mui/material";

export default function CircularProgressWithLabel({ value }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" value={value} size={80} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" component="div">{`${Math.round(
            value,
          )}%`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
