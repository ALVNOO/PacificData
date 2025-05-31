import React, { useState } from 'react'
import { Paper, Typography, Button, ButtonGroup, Fade } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const fullData = [
  {
    year: '1988',
    commercial: 18,
    subsistence: 49,
    nonAgricultural: 15,
  },
  {
    year: '2000',
    commercial: 14,
    subsistence: 35,
    nonAgricultural: 30,
  },
  {
    year: '2011',
    commercial: 9,
    subsistence: 20,
    nonAgricultural: 50,
  },
]

export const AgricultureDecline: React.FC = () => {
  const [selectedYears, setSelectedYears] = useState<string[]>(['1988', '2011'])
  const [hoveredBar, setHoveredBar] = useState<string | null>(null)

  const filteredData = fullData.filter(item => selectedYears.includes(item.year))

  const handleYearToggle = (year: string) => {
    if (selectedYears.includes(year)) {
      if (selectedYears.length > 1) {
        setSelectedYears(selectedYears.filter(y => y !== year))
      }
    } else {
      setSelectedYears([...selectedYears, year])
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 3, height: '400px' }}>
      <Typography variant="h6" gutterBottom color="primary">
        Agricultural Activity Decline (1988-2011)
      </Typography>
      <ButtonGroup size="small" sx={{ mb: 2 }}>
        {fullData.map(({ year }) => (
          <Button
            key={year}
            variant={selectedYears.includes(year) ? "contained" : "outlined"}
            onClick={() => handleYearToggle(year)}
          >
            {year}
          </Button>
        ))}
      </ButtonGroup>
      <ResponsiveContainer width="100%" height="75%">
        <BarChart data={filteredData}
          onMouseMove={(e) => {
            if (e.activeTooltipIndex !== undefined) {
              setHoveredBar(Object.keys(fullData[0])[e.activeTooltipIndex + 1])
            }
          }}
          onMouseLeave={() => setHoveredBar(null)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis label={{ value: 'Percentage of Households (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
            contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }}
          />
          <Legend />
          <Bar 
            dataKey="commercial" 
            name="Commercial Agriculture" 
            fill="#2E7D32"
            opacity={hoveredBar && hoveredBar !== 'commercial' ? 0.3 : 1}
            animationDuration={1000}
          />
          <Bar 
            dataKey="subsistence" 
            name="Subsistence Agriculture" 
            fill="#4CAF50"
            opacity={hoveredBar && hoveredBar !== 'subsistence' ? 0.3 : 1}
            animationDuration={1000}
          />
          <Bar 
            dataKey="nonAgricultural" 
            name="Non-Agricultural" 
            fill="#81C784"
            opacity={hoveredBar && hoveredBar !== 'nonAgricultural' ? 0.3 : 1}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
} 