import React, { Component } from 'react'
import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'
import PropTypes from 'prop-types'

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 5) * cos
  const sy = cy + (outerRadius + 5) * sin
  const mx = cx + (outerRadius + 10) * cos
  const my = cy + (outerRadius + 10) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 11
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fontWeight={'bold'}
        fill={fill}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontWeight={'bold'}
      >
        {value}
      </text>
    </g>
  )
}

class Donut extends Component {
  static propTypes = {
    data: PropTypes.array,
    innerRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    outerRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
  }
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
    }
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    })
  }

  render() {
    return (
      <ResponsiveContainer width="100%" aspect={1}>
        <PieChart margin={{ top: 10, right: 50, left: 30, bottom: 0 }}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={this.props.data}
            dataKey="value"
            innerRadius={this.props.innerRadius}
            outerRadius={this.props.outerRadius}
            fill={this.props.color}
            onMouseEnter={(data, activeIndex) => {
              this.onPieEnter(data, activeIndex)
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    )
  }
}

export default Donut
