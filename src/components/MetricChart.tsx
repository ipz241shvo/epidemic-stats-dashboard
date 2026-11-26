import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartPoint, ChartType } from '../types/chart'
import { formatCompact, formatNumber } from '../utils/format'

interface MetricChartProps {
  type: ChartType
  data: ChartPoint[]
  label: string
}

const AXIS_TICK = { fill: 'var(--muted)', fontSize: 12 }
const TOOLTIP_STYLE = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  color: 'var(--text)',
}

function MetricChart({ type, data, label }: MetricChartProps) {
  const axes = (
    <>
      <CartesianGrid stroke="var(--surface-alt)" vertical={false} />
      <XAxis
        dataKey="name"
        tick={AXIS_TICK}
        interval={data.length > 12 ? 'preserveStartEnd' : 0}
        angle={-35}
        textAnchor="end"
        height={70}
      />
      <YAxis tick={AXIS_TICK} tickFormatter={formatCompact} width={60} />
      <Tooltip
        contentStyle={TOOLTIP_STYLE}
        formatter={(value) => formatNumber(Number(value))}
      />
    </>
  )

  return (
    <div className="chart__body">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'bar' ? (
          <BarChart data={data}>
            {axes}
            <Bar dataKey="value" name={label} fill="var(--accent)" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            {axes}
            <Line
              type="monotone"
              dataKey="value"
              name={label}
              stroke="var(--accent)"
              strokeWidth={2}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

export default MetricChart