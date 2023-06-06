import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const GithubInfo = () => {
  const workAccount = "ScottWangVirgoCX";
  const personalAccount = "scottascott";
  const workAccountLastYearContribution: number =
    api.common.lastYearContribution.useQuery(
      { usrName: workAccount },
      { refetchOnWindowFocus: false }
    ).data || 0;
  const personalAccountLastYearContribution: number =
    api.common.lastYearContribution.useQuery(
      { usrName: personalAccount },
      { refetchOnWindowFocus: false }
    ).data || 0;
  useEffect(() => {
    console.log(1);
  }, [workAccountLastYearContribution, personalAccountLastYearContribution]);
  return (
    <div className="mx-auto w-full max-w-[1280px] bg-gray-50">
      {/* contributions */}
      <p>
        {workAccountLastYearContribution
          ? workAccountLastYearContribution
          : "loading"}
      </p>
      {/* chart */}
      <img
        src={`https://ghchart.rshah.org/409ba5/${workAccount}`}
        alt="ScottWangVirgoCX's Github Chart"
      />
    </div>
  );
};
export default GithubInfo;
