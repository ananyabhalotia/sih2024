import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Fetch a single item
  async function getItem() {
    try {
      const response = await fetch(
        `http://localhost:1337/api/items/${itemId}?populate=image`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const itemJson = await response.json();
      setItem(itemJson.data);
    } catch (error) {
      setError("Failed to fetch item data. Please try again later.");
      console.error("Failed to fetch item:", error);
    }
  }

  // Fetch related items
  async function getItems() {
    try {
      const response = await fetch(`http://localhost:1337/api/items?populate=image`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const itemsJson = await response.json();
      setItems(itemsJson.data);
    } catch (error) {
      setError("Failed to fetch related items. Please try again later.");
      console.error("Failed to fetch related items:", error);
    }
  }

  useEffect(() => {
    getItem();
    getItems(); // fetch related items separately
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps
  const renderRichText = (richText) => {
    if (!Array.isArray(richText)) return null;
  
    return richText.map((node, index) => {
      switch (node.type) {
        case "paragraph":
          return (
            <p key={index}>
              {node.children.map((child, i) => (
                <span
                  key={i}
                  style={{
                    fontWeight: child.bold ? "bold" : "normal",
                    fontStyle: child.italic ? "italic" : "normal",
                    textDecoration: child.underline ? "underline" : "none",
                  }}
                >
                  {child.text}
                </span>
              ))}
            </p>
          );
        case "heading":
          return React.createElement(
            `h${node.level}`, 
            { key: index }, 
            node.children.map((child, i) => (
              <span
                key={i}
                style={{
                  fontWeight: child.bold ? "bold" : "normal",
                  fontStyle: child.italic ? "italic" : "normal",
                  textDecoration: child.underline ? "underline" : "none",
                }}
              >
                {child.text}
              </span>
            ))
          );
        default:
          return null;
      }
    });
  };
  
  
  const renderDescription = () => {
    const description = item?.attributes?.longDescription;
if (typeof description === "object") {
  return renderRichText(description);
}
return description ?? "Description not available";
  };

  return (
    <Box width="80%" m="80px auto">
      {error && <Typography color="error">{error}</Typography>}
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.attributes?.name}
            layout="fill"
            src={
              item?.attributes?.image?.data
                ? `http://localhost:1337${item?.attributes?.image?.data?.attributes?.url}`
                : "/path/to/placeholder-image.jpg" 
            }
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.attributes?.name ?? "Name not available"}</Typography>
            <Typography>${item?.attributes?.price ?? "Price not available"}</Typography>
            <Typography sx={{ mt: "20px" }}>{renderDescription()}</Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.attributes?.category ?? "Unknown"}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{renderDescription()}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((relatedItem, i) => (
            <Item key={`${relatedItem.attributes?.name}-${i}`} item={relatedItem} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
