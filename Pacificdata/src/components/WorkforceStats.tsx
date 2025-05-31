import React, { useState } from 'react'
import { Paper, Typography, Grid, IconButton, Collapse, Box } from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import InfoIcon from '@mui/icons-material/Info'

const genderData = [
  { 
    name: 'Male Operators', 
    value: 93,
    details: 'Majority of agricultural operators are male, showing gender disparity in the sector'
  },
  { 
    name: 'Female Operators', 
    value: 7,
    details: 'Female participation in agricultural operations remains low'
  },
]

const ageData = [
  { 
    name: 'Under 40 years', 
    value: 13,
    details: 'Low participation of young farmers indicates aging workforce concerns'
  },
  { 
    name: 'Over 40 years', 
    value: 87,
    details: 'High proportion of older farmers suggests need for youth engagement'
  },
]

const COLORS = ['#2E7D32', '#81C784']

export const WorkforceStats: React.FC = () => {
  const [showGenderInfo, setShowGenderInfo] = useState(false)
  const [showAgeInfo, setShowAgeInfo] = useState(false)
  const [activeIndex, setActiveIndex] = useState<{ gender?: number; age?: number }>({})

  const onPieEnter = (type: 'gender' | 'age', index: number) => {
    setActiveIndex(prev => ({ ...prev, [type]: index }))
  }

  const onPieLeave = (type: 'gender' | 'age') => {
    setActiveIndex(prev => ({ ...prev, [type]: undefined }))
  }

  return (
    <Paper elevation={3} sx={{ p: 3, height: '400px', overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom color="primary">
        Agricultural Workforce Demographics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <Typography variant="subtitle1" align="center">Gender Distribution</Typography>
            <IconButton size="small" onClick={() => setShowGenderInfo(!showGenderInfo)}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Box>
          <Collapse in={showGenderInfo}>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
              {genderData[activeIndex.gender !== undefined ? activeIndex.gender : 0].details}
            </Typography>
          </Collapse>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={(_, index) => onPieEnter('gender', index)}
                onMouseLeave={() => onPieLeave('gender')}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {genderData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    opacity={activeIndex.gender !== undefined && activeIndex.gender !== index ? 0.3 : 1}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <Typography variant="subtitle1" align="center">Age Distribution</Typography>
            <IconButton size="small" onClick={() => setShowAgeInfo(!showAgeInfo)}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Box>
          <Collapse in={showAgeInfo}>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
              {ageData[activeIndex.age !== undefined ? activeIndex.age : 0].details}
            </Typography>
          </Collapse>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={ageData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={(_, index) => onPieEnter('age', index)}
                onMouseLeave={() => onPieLeave('age')}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {ageData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    opacity={activeIndex.age !== undefined && activeIndex.age !== index ? 0.3 : 1}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Paper>
  )
} 