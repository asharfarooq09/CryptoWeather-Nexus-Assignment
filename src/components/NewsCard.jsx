"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../redux/slice/newsSlice";
import Spinner from "@/components/Spinner";

export default function NewsCard() {
  const dispatch = useDispatch();
  const { data, loading, error, hasFetched } = useSelector(
    (state) => state.news
  );

  useEffect(() => {
    if (!hasFetched && !loading && !error) {
      dispatch(getNews());
    }
  }, [dispatch, hasFetched]);

  if (loading || !data) {
    return <Spinner message="Loading news..." />;
  }

  return (
    <div className="relative">
      <div className="overflow-x-auto overflow-y-hidden hide-scrollbar">
        <div className="inline-flex gap-6 p-2 min-w-full">
          {data.length === 0 ? (
            <p className="text-gray-400 text-center py-8 w-full">
              No news available at the moment.
            </p>
          ) : (
            data.map((article, index) => (
              <a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group flex-none"
                style={{ width: "380px" }}
              >
                <div
                  className="relative h-full bg-[#1a1c35] rounded-3xl p-1 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    background:
                      "linear-gradient(45deg, rgba(26,28,53,0.9), rgba(17,18,36,0.9))",
                  }}
                >
                  <div className="absolute inset-0.5 rounded-[22px] bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative bg-[#1a1c35] rounded-[22px] p-6 h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-3xl text-white/90">
                          📰
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                            {article.title}
                          </h3>
                          <span className="text-sm font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-md">
                            {article.source_id || "News"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="text-gray-300 text-sm line-clamp-3 mb-2">
                          {article.description || "No description available."}
                        </p>
                        <span className="text-sm text-gray-400">
                          {article.pubDate
                            ? new Date(article.pubDate).toLocaleDateString()
                            : "Recent"}
                        </span>
                      </div>

                      <div className="mt-6">
                        <div className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-400 p-[1px]">
                          <div className="relative bg-[#1a1c35] rounded-xl transition-all duration-300 group-hover:bg-transparent">
                            <div className="px-4 py-3 text-center text-white font-medium">
                              Read Full Article
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))
          )}
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
