"use client";

import { isMobileWidth } from "@/app/lib/utils";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const ApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const NewFairLaunchChart = ({ collection }) => {
  const [options, setOptions] = useState({
    series: [],
    label: [],
    colors: ["#8B82FF", "#F3BA2F", "#EA6A32"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
      fontSize: "14px",
      fontWeight: 400,
      labels: {
        colors: ["#9E9693"],
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 10,
      },
      // floating: false, // Controls whether the legend is floating
      // tooltip: {
      //     enabled: true // Enables tooltips on legend items
      // }
    },
    plotOptions: {
      pie: {
        // expandOnClick: true,
        expandOnHover: true,
        // customScale: 0.8,
        stroke: {
          show: false,
          width: 0,
        },
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    chart: {
      background: "transparent",
      border: "none",
    },
  });

  // Example of setting series dynamically
  // useEffect(() => {
  //     const percentage = parseFloat(collection?.token_percentage);

  //     if (!isNaN(percentage)) {
  //         setOptions((prevOptions) => ({
  //             ...prevOptions,
  //             series: [percentage, 100 - percentage],
  //         }));
  //     }
  // }, [collection]);

  useEffect(() => {
    if (collection) {
      const seriesData = [
        parseFloat(collection?.presale || 0),
        parseFloat(collection?.liquidity || 0),
        parseFloat(collection?.locked || 0),
        parseFloat(collection?.unlocked || 0),
        parseFloat(collection?.burnt || 0),
        parseFloat(collection?.staking_rewards || 0),
      ];

      const labels = [
        "Presale",
        "Liquidity",
        "Locked",
        "Unlocked",
        "Burnt",
        "Staking Rewards",
      ];

      setOptions((prevOptions) => ({
        ...prevOptions,
        series: seriesData,
        labels: labels,
      }));
    }
  }, [collection]);

  return (
    <div className="w-full">
      <div id="chart-timeline" className="border-none w-full">
        <div className="max-w-xl w-full">
          <ApexCharts
            options={options}
            series={options.series}
            type="donut"
            height={450}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default NewFairLaunchChart;
