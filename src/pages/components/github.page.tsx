import { api } from "~/utils/api";

const GithubInfo = () => {
  const lastYearContribution:number = api.common.lastYearContribution.useQuery().data||0;
  console.log('lastYearContribution',lastYearContribution)
  return (
    <div className="mx-auto w-full max-w-[1280px] bg-gray-50">
      {/* contributions */}
      <p>{lastYearContribution ? lastYearContribution : "loading"}</p>
      {/* chart */}
      <img
        src="https://ghchart.rshah.org/409ba5/ScottWangVirgoCX"
        alt="ScottWangVirgoCX's Github Chart"
      />
    </div>
  );
};
export default GithubInfo;
