import { useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Share, Star } from '@mui/icons-material'; // Import icons for interactivity

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: { url },
    },
  } = image;

  const primaryColor = "#002B5B"; // Navy Blue
  const accentColor = "#FF6F61"; // Coral for more visual pop
  const secondaryColor = "black"; // Dark Orange
  const darkTextColor = "#333333"; // Charcoal
  const borderColor = "#D3D3D3"; // Light gray for border
  const hoverBackgroundColor = "rgba(0, 0, 0, 0.7)";

  return (
    <Box
      width={width}
      sx={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: isHovered ? "0px 12px 24px rgba(0, 0, 0, 0.5)" : "0px 6px 16px rgba(0, 0, 0, 0.3)",
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
        "&:hover": {
          transform: "translateY(-10px) scale(1.03)",
        },
        backgroundColor: "#ffffff",
        border: `1px solid ${borderColor}`,
        cursor: "pointer",
      }}
      onClick={() => navigate(`/item/${item.id}`)}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {/* IMAGE */}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        {isLoading && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <img
          alt={name}
          src={`http://localhost:1337${url}`}
          width="100%"
          height="auto"
          onLoad={() => setIsLoading(false)}
          style={{
            borderRadius: "12px 12px 0 0",
            objectFit: "cover",
            transition: "transform 0.5s ease-in-out",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            filter: isHovered ? "brightness(0.9) contrast(1.2)" : "none",
          }}
        />
        <Box
          display={isHovered ? "flex" : "none"}
          alignItems="center"
          justifyContent="center"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor={hoverBackgroundColor}
          color="white"
          sx={{
            transition: "background-color 0.3s ease",
            borderRadius: "12px",
            backdropFilter: "blur(5px)", // Add blur for a frosted glass effect
          }}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/item/${item.id}`);
            }}
            sx={{
              backgroundImage: `linear-gradient(45deg, ${accentColor}, #FF8C00)`,
              color: "white",
              "&:hover": {
                backgroundImage: `linear-gradient(45deg, #FF8C00, ${accentColor})`,
                transform: "scale(1.15)",
              },
              padding: "10px 25px",
              borderRadius: "8px",
              fontWeight: "bold",
              transition: "transform 0.3s ease, background 0.3s ease",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
            }}
          >
            Apply
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              // Add share functionality here
            }}
            sx={{
              marginLeft: "10px",
              color: "white",
              "&:hover": {
                transform: "scale(1.3) rotate(15deg)",
              },
              transition: "transform 0.3s ease",
            }}
          >
            <Share />
          </Button>
        </Box>
      </Box>

      {/* DETAILS */}
      <Box
        p="20px"
        sx={{
          backgroundColor: "white", 
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        <Typography variant="subtitle2" sx={{ color: darkTextColor }}>
          {category.replace(/([A-Z])/g, " ₹1").replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          mt="8px"
          sx={{
            color: primaryColor, 
            transition: "color 0.3s ease",
            "&:hover": {
              color: accentColor,
              textDecoration: "underline", 
              letterSpacing: "0.5px", // Small letter spacing to add style
            },
          }}
        >
          {name}
        </Typography>
        <Typography
          fontWeight="bold"
          mt="6px"
          sx={{
            fontSize: "1.4rem", // Increased font size for emphasis
            color: secondaryColor,
            transition: "color 0.3s ease",
            "&:hover": {
              color: primaryColor, // Change to primary color on hover
            },
          }}
        >
          ₹{price}
        </Typography>
      </Box>
    </Box>
  );
};

export default Item;
