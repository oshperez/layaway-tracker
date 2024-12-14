"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  closed: number;
  overdue: number;
  paid: number;
}

function LayawaysBarChart({ open, closed, overdue, paid }: Props) {
  const data = [
    { label: "Open", value: open },
    { label: "Closed", value: closed },
    { label: "Overdue", value: overdue },
    { label: "Paid", value: paid },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default LayawaysBarChart;
