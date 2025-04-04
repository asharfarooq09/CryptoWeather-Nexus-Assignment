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
    <div className="relative">
      <div className="overflow-x-auto overflow-y-hidden hide-scrollbar">
        <div className="inline-flex gap-6 p-6 min-w-full">
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

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
