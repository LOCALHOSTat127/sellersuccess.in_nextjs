"use client";
import { useState, useEffect } from 'react';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch } from "react-redux";
import { setShareDiloag } from "../store/configSlice";

// CircularProgressWithLabel component to display a progress circle with percentage
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

// SideControls component to handle scroll progress and show icons for sharing
const SideControls = ({ fd = "column", gp = "24px", fw }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const dispatch = useDispatch();

  // Handles the action to open the share dialog
  const handleShareDialog = () => {
    dispatch(setShareDiloag(true));
  };

  // Sets up an effect to update the scroll percentage based on window scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      setScrollPercentage(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: fd,
        gap: gp,
        width: "100%",
        justifyContent: fw && "space-between"
      }}
    >
      <Tooltip onClick={handleShareDialog} title="Share" arrow placement="right">
        <IconButton>
          <ReplyAllIcon />
        </IconButton>
      </Tooltip>
      <CircularProgressWithLabel value={scrollPercentage} />
    </div>
  );
};

export default SideControls;
