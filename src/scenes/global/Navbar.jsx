import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, Typography, TextField, InputAdornment } from "@mui/material";
import {
  PersonOutline,
  MenuOutlined,
  SearchOutlined,
  RateReviewOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the search page with the query parameter
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery(""); // Clear the search bar after submission
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="80px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
      boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
      sx={{ transition: "background-color 0.3s ease" }}
    >
      {/* Main content */}
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Logo Section */}
        <Box
          onClick={() => navigate("/")}
          sx={{
            "&:hover": { cursor: "pointer", color: shades.primary[500] },
            transition: "color 0.3s ease",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: "bold",
              color: shades.secondary[500],
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              transition: "color 0.3s ease",
            }}
          >
            GAP STEALER
          </Typography>
        </Box>

        {/* Search Section */}
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: shades.neutral[100], // Light background for contrast
            borderRadius: "24px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
            width: "400px",
            maxWidth: "100%",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search for products..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
              sx: {
                padding: "6px 12px",
                borderRadius: "24px",
                backgroundColor: "white",
              },
            }}
            sx={{
              border: "none",
              "& .MuiOutlinedInput-root": {
                border: "none",
              },
              width: "100%",
            }}
          />
        </Box>

        {/* Icon Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          {/* User Icon */}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <IconButton
              sx={{
                color: "black",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  color: shades.primary[500],
                },
              }}
            >
              <PersonOutline />
            </IconButton>
          </Link>

          {/* Cart Badge */}
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{
                color: "black",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  color: shades.primary[500],
                },
              }}
            >
              <RateReviewOutlined />
            </IconButton>
          </Badge>

          {/* Menu Icon */}
          <IconButton
            sx={{
              color: "black",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                color: shades.primary[500],
              },
            }}
          >
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
