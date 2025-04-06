"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCryptos } from "../redux/slice/cryptoSlice";
import CryptoCard from "./CryptoCard";
import Spinner from "@/components/Spinner";

export default function CryptoRow() {
  const dispatch = useDispatch();
  const { data, loading, prices, hasFetched } = useSelector(
    (state) => state.crypto
  );

  useEffect(() => {
    if (!hasFetched) {
      dispatch(getCryptos());
    }
  }, [dispatch, hasFetched]);

  if (!hasFetched || loading || !Array.isArray(data) || data.length === 0) {
    return <Spinner message="Loading crypto data..." />;
  }

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-wrap justify-center gap-6">
        {data.map((coin, index) => (
          <CryptoCard
            key={coin.id}
            coin={coin}
            index={index}
            price={prices[coin.id]}
          />
        ))}
      </div>
    </div>
  );
}
