import React, { useState } from "react";

const useFetching = (callback) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = async (...args) => {
    try {
      setLoading(true);
      await callback(...args);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
