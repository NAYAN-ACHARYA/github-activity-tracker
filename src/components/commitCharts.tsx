// src/components/CommitsChart.tsx
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";
  import { useEffect, useState } from "react";
  import { fetchContributionsGraphQL } from "./fetchContributions";
  
  type ContributionData = {
    date: string;
    count: number;
  };
  
  export default function CommitsChart({ username }: { username: string }) {
    const [data, setData] = useState<ContributionData[]>([]);
    const token = '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'



    useEffect(() => {
      fetchContributionsGraphQL(username, token).then((raw) => {
        console.log("Chart Data →", raw);
        const sorted = [...raw].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setData(sorted);
      });
    }, [username]);
  
    return (
      <div className="mt-8 w-full h-[350px]">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Daily Contributions
        </h2>
        <ResponsiveContainer width="100%" height={300}>
  <AreaChart
    data={data}
    margin={{ top: 20, right: 20, bottom: 40, left: 0 }}
  >
    <XAxis
      dataKey="date"
      interval="preserveStartEnd"
      angle={-40}
      textAnchor="end"
      height={60}
      tickFormatter={(dateStr: string) => {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return "";
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }}
    />
    <YAxis />
    <Tooltip
      formatter={(value: any) => [`${value} commits`, "Contributions"]}
      labelFormatter={(label: any) =>
        `Date: ${new Date(label).toLocaleDateString()}`
      }
    />
    <Area
      type="monotone"
      dataKey="count"
      stroke="#6366f1"
      fill="#a5b4fc"
    />
  </AreaChart>
</ResponsiveContainer>

      </div>
    );
  }
  