"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Box, Typography, Card, CardContent } from "@mui/material";
import Loader from "@/utiles/Loader";

const MoveDetails = () => {
  const router = useRouter();
  const { url } = router.query;
  const [moveDetails, setMoveDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url) {
      const fetchMoveDetails = async () => {
        try {
          const response = await axios.get(url);
          setMoveDetails(response.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchMoveDetails();
      // console.log(moveDetails);
    }
  }, [url]);

  if (loading) return <Loader />;
  if (error)
    return (
      <Typography color="error" variant="h6" align="center">
        {error}
      </Typography>
    );

  return (
    <Box p={4} textAlign="center">
      <Typography variant="h4" mb={4} color="primary" fontWeight="bold">
        Move Details
      </Typography>
      {moveDetails && (
        <Card
          sx={{
            maxWidth: 500,
            mx: "auto",
            boxShadow: 5,
            p: 4,
            backgroundColor: "#f0f0f0",
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom color="textSecondary" mb={2}>
              Move Name:{" "}
              <Typography
                variant="h6"
                component="span"
                color="primary"
                fontWeight="bold"
              >
                {moveDetails.name || "Not found"}
              </Typography>
            </Typography>
            <Typography variant="body1" mb={2}>
              Power: {moveDetails.power ? moveDetails.power : "Power Not Found"}
            </Typography>
            <Typography variant="body1" mb={2}>
              PP: {moveDetails.pp ? moveDetails.pp : "PP Not Found"}
            </Typography>
            <Typography variant="body1" mb={2}>
              Type:{" "}
              {moveDetails.type.name ? moveDetails.type.name : "Type Not Found"}
            </Typography>
            <Typography variant="body1" mb={2}>
              Accuracy:{" "}
              {moveDetails.accuracy
                ? moveDetails.accuracy
                : "Accuracy Not Found"}
            </Typography>
            <Typography variant="body1" mb={2}>
              Effect:{" "}
              {moveDetails.effect_entries[0]?.effect
                ? moveDetails.effect_entries[0].effect
                : "Effect Not Found"}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default MoveDetails;
