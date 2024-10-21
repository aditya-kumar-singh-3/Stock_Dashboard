"use client";
import React, { ChangeEvent, useEffect, useState } from "react";


interface Stock {
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  changesPercentage: number;
}

const Content = () => {
  const API_KEY = "XHW90nfHXfaGQ3AJz1O3UIj8J4Y5jG3b";
  const API_URL = `https://financialmodelingprep.com/api/v3/quote/AAPL,GOOGL,MSFT,AMZN,TSLA,NFLX,NVDA,BABA,FB,TWTR,UBER,SQ,PYPL,INTC,AMD?apikey=${API_KEY}`;

  const [inputValue, setInputValue] = useState("");
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const json: Stock[] = await response.json();
        console.log(json);
        setStocks(json);
        setFilteredStocks(json);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    sortStocks();
  }, [sortOrder, stocks]);

  const sortStocks = () => {
    const sortedStocks = [...filteredStocks].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredStocks(sortedStocks);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = stocks.filter(
        (stock) => stock.changesPercentage >= parseFloat(value)
      );
      setFilteredStocks(filtered);
    } else {
      setFilteredStocks(stocks);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const getColor = (percentage: number) => {
    if (percentage < 0) return "red";
    if (percentage > 5) return "green";
    return "white";
  };

  return (
    <>
      <div>
        <div className="flex md:flex-row flex-col gap-3 mt-32 w-full md:translate-x-20 ">
          {" "}
          <input
            type="number"
            placeholder="Enter Percentage"
            value={inputValue}
            onChange={handleInputChange}
            className="md:w-64 w-64 font-bold text-black p-2 md:text-xl rounded-full px-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />{" "}
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="md:w-56 w-64 p-2 border border-black-400 focus:outline-none text-black rounded-full px-4 font-bold text-xl"
          >
            {" "}
            <option value="asc">Sort by Price (Asc)</option>{" "}
            <option value="desc">Sort by Price (Desc)</option>{" "}
          </select>{" "}
        </div>
      </div>

      <div className="overflow-x-auto mt-20 mb-20 md:ml-20 md:mr-20">
        <table className="min-w-full table-auto border-collapse border border-gray-400">
          <thead className="bg-blue-950">
            <tr>
              <th className="px-4 py-2 border">S.No.</th>
              <th className="px-4 py-2 border">Stocks</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Symbol</th>
              <th className="px-4 py-2 border">Market Cap (in Dollars)</th>
              <th className="px-4 py-2 border">% Change</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredStocks) && filteredStocks.length > 0 ? (
              filteredStocks.map((stock, index) => (
                <tr key={stock.symbol} className="text-center">
                  <td
                    className="px-4 py-2 border"
                    style={{ color: getColor(stock.changesPercentage) }}
                  >
                    {index + 1}
                  </td>
                  <td
                    className="px-4 py-2 border"
                    style={{ color: getColor(stock.changesPercentage) }}
                  >
                    {stock.name}
                  </td>
                  <td
                    className="px-4 py-2 border"
                    style={{ color: getColor(stock.changesPercentage) }}
                  >
                    {stock.price}
                  </td>
                  <td
                    className="px-4 py-2 border"
                    style={{ color: getColor(stock.changesPercentage) }}
                  >
                    {stock.symbol}
                  </td>
                  <td className="px-4 py-2 border">{stock.marketCap}</td>
                  <td
                    className="px-4 py-2 border"
                    style={{ color: getColor(stock.changesPercentage) }}
                  >
                    {stock.changesPercentage.toFixed(2)}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Content;
