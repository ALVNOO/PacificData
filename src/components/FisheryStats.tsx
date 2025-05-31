import React, { useState } from 'react'
import { Paper, Typography, Grid, Tabs, Tab, Box } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

interface FishingMethod {
  method: string
  households: number
  details: string
}

const pearlFarmData = [
  {
    year: '1988',
    farms: 250,
  },
  {
    year: '2000',
    farms: 182,
  },
  {
    year: '2011',
    farms: 35,
  },
]

const fishingMethodsData: FishingMethod[] = [
  {
    method: 'Hook & Line',
    households: 45,
    details: 'Traditional fishing method, most common among subsistence fishers'
  },
  {
    method: 'Net Fishing',
    households: 35,
    details: 'Used for both small and medium-scale fishing operations'
  },
  {
    method: 'Shell Collection',
    households: 20,
    details: 'Important for local food security and traditional practices'
  },
]

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`fishery-tabpanel-${index}`}
      aria-labelledby={`fishery-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

export const FisheryStats: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const [hoveredBar, setHoveredBar] = useState<string | null>(null)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Paper elevation={3} sx={{ p: 3, height: '400px' }}>
      <Typography variant="h6" gutterBottom color="primary">
        Fishery & Pearl Farming Statistics
      </Typography>
      
      <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 2 }}>
        <Tab label="Pearl Farming" />
        <Tab label="Fishing Methods" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={pearlFarmData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip 
              contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="farms" 
              name="Number of Pearl Farms" 
              stroke="#0288D1" 
              strokeWidth={2}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart 
            data={fishingMethodsData}
            onMouseMove={(e) => {
              if (e.activeTooltipIndex !== undefined) {
                setHoveredBar(fishingMethodsData[e.activeTooltipIndex].method)
              }
            }}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="method" />
            <YAxis />
            <Tooltip
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as FishingMethod
                  return (
                    <div style={{ background: 'white', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
                      <p><strong>{data.method}</strong></p>
                      <p>{data.households}% of households</p>
                      <p style={{ fontSize: '0.9em', color: '#666' }}>{data.details}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar 
              dataKey="households" 
              name="% of Fishing Households" 
              fill="#0288D1"
              opacity={hoveredBar ? 0.3 : 1}
            />
          </BarChart>
        </ResponsiveContainer>
      </TabPanel>
    </Paper>
  )
} 