"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const TokenChart = ({ collection }) => {
    const [options, setOptions] = useState({
        series: [1, 2, 3, 4, 5, 6],
        colors: ["#089B9B", "#D9D9D9"], // Add a color for the remaining portion
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        plotOptions: {
            pie: {
                expandOnClick: false,
                customScale: 1,
                donut: {
                    labels: {
                        show: false,
                    },
                },
            },
        },
    });

    // useEffect(() => {
    //     const percentage = parseFloat(collection?.token_percentage);

    //     if (!isNaN(percentage)) {
    //         setOptions((prevOptions) => ({
    //             ...prevOptions,
    //             series: [percentage, 100 - percentage], // Add the remaining percentage
    //         }));
    //     }
    // }, [collection]);

    return (
        <div className="w-full">
            <div>
                <div id="chart-timeline">
                    {typeof window !== "undefined" && (
                        <>
                            <ApexCharts
                                options={options}
                                series={options.series}
                                type="donut"
                                height={150}
                                width="150"
                            />
                        </>
                    )}
                </div>
                <p className="text-base">
                    {/* <b className="text-[#555555]">
                      {collection?.available_tokens}
                  </b>{" "} */}
                    {/* <span className="text-[#737070] text-sm">
                        {Intl.NumberFormat("en-US").format(
                            collection?.available_tokens - 2000
                        )}{" "}
                        of{" "}
                        {Intl.NumberFormat("en-US").format(
                            collection?.available_tokens
                        )}{" "}
                        Tokens Available
                    </span> */}
                </p>
            </div>
        </div>
    );
};

export default TokenChart;
