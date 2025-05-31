import React, { useState } from 'react'
import { Paper, Typography, Box, Chip } from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Sector } from 'recharts'

const data = [
  { name: 'Root Crops/Vegetables', value: 40, details: 'Includes lettuce, tomatoes, cassava, and taro' },
  { name: 'Fallow Land', value: 30, details: 'Unused agricultural land in recovery' },
  { name: 'Virgin Bush', value: 20, details: 'Uncultivated natural vegetation' },
  { name: 'Other Uses', value: 10, details: 'Including scattered trees and mixed crops' },
]

const COLORS = ['#2E7D32', '#4CAF50', '#81C784', '#C8E6C9']

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 15}
        outerRadius={outerRadius + 15}
        fill={fill}
      />
    </g>
  )
}

export const LandUsage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>()
  const [selectedSegment, setSelectedSegment] = useState<number | undefined>()

  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    setActiveIndex(undefined)
  }

  const handleClick = (data: any, index: number) => {
    setSelectedSegment(selectedSegment === index ? undefined : index)
  }

  return (
    <Paper elevation={3} sx={{ p: 3, height: '400px' }}>
      <Typography variant="h6" gutterBottom color="primary">
        Land Usage Distribution (2011)
      </Typography>
      {selectedSegment !== undefined && (
        <Box sx={{ mb: 2 }}>
          <Chip
            label={`${data[selectedSegment].name}: ${data[selectedSegment].details}`}
            color="primary"
            variant="outlined"
            onDelete={() => setSelectedSegment(undefined)}
          />
        </Box>
      )}
      <ResponsiveContainer width="100%" height={selectedSegment !== undefined ? "75%" : "85%"}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                opacity={selectedSegment !== undefined && selectedSegment !== index ? 0.3 : 1}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  )
} 