"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const C = {
  caramel: "#C28A4A",
  caramelLight: "#E0B884",
  olive: "#71803F",
  espresso: "#3E2F22",
  danger: "#B4503C",
  line: "#E8DECF",
  muted: "#8C7E6E",
};

const PIE_COLORS = ["#C28A4A", "#71803F", "#3E2F22", "#E0B884", "#B4503C", "#8B9A57", "#A06F35", "#586633", "#C9962E", "#8C7E6E"];

const axisStyle = { fontSize: 12, fontFamily: "Tajawal, sans-serif", fill: C.muted };

function ChartTip({ active, payload, label, suffix = " ر.س" }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-beige-line bg-white/95 px-3 py-2 shadow-card">
      {label && <p className="mb-1 text-xs font-bold text-ink">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} className="flex items-center gap-2 text-xs text-espresso-600">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color || p.fill }} />
          {p.name}: <span className="font-bold text-ink">{Number(p.value).toLocaleString("ar-SA")}{suffix}</span>
        </p>
      ))}
    </div>
  );
}

export function SalesAreaChart({ data }: { data: { label: string; revenue: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="gSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.caramel} stopOpacity={0.45} />
            <stop offset="100%" stopColor={C.caramel} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 4" stroke={C.line} vertical={false} />
        <XAxis dataKey="label" tick={axisStyle} axisLine={false} tickLine={false} reversed />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={48} orientation="right" />
        <Tooltip content={<ChartTip />} />
        <Area type="monotone" dataKey="revenue" name="المبيعات" stroke={C.caramel} strokeWidth={2.5} fill="url(#gSales)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RevenueExpenseBar({
  data,
}: {
  data: { label: string; الإيرادات: number; المصروفات: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }} barGap={4}>
        <CartesianGrid strokeDasharray="4 4" stroke={C.line} vertical={false} />
        <XAxis dataKey="label" tick={axisStyle} axisLine={false} tickLine={false} reversed />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={48} orientation="right" />
        <Tooltip content={<ChartTip />} cursor={{ fill: "rgba(194,138,74,0.06)" }} />
        <Legend wrapperStyle={{ fontFamily: "Tajawal", fontSize: 12 }} />
        <Bar dataKey="الإيرادات" fill={C.olive} radius={[6, 6, 0, 0]} maxBarSize={26} />
        <Bar dataKey="المصروفات" fill={C.caramel} radius={[6, 6, 0, 0]} maxBarSize={26} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function HBarChart({
  data,
  color = C.caramel,
}: {
  data: { name: string; value: number }[];
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(220, data.length * 42)}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
        <CartesianGrid strokeDasharray="4 4" stroke={C.line} horizontal={false} />
        <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} width={92} orientation="right" />
        <Tooltip content={<ChartTip suffix="" />} cursor={{ fill: "rgba(194,138,74,0.06)" }} />
        <Bar dataKey="value" name="الكمية" fill={color} radius={[0, 6, 6, 0]} maxBarSize={22} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ExpensePie({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={62}
          outerRadius={108}
          paddingAngle={2}
          stroke="#FBF8F2"
          strokeWidth={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTip />} />
        <Legend wrapperStyle={{ fontFamily: "Tajawal", fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function TrendLine({ data }: { data: { label: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="4 4" stroke={C.line} vertical={false} />
        <XAxis dataKey="label" tick={axisStyle} axisLine={false} tickLine={false} reversed />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={48} orientation="right" />
        <Tooltip content={<ChartTip />} />
        <Line type="monotone" dataKey="value" name="القيمة" stroke={C.olive} strokeWidth={2.5} dot={{ r: 3, fill: C.olive }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
