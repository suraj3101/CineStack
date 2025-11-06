import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../api/tmdbApi";
import Modal from "./Modal";
import "./DiscoverSection.css";

function DiscoverSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeGenre, setActiveGenre] = useState("All");

  const {
    data: allGenres,
    isLoading: isLoadingGenres,
    isError: isErrorGenres,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });
}

export default DiscoverSection;
