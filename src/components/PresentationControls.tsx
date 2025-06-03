import React, { useState, useEffect } from 'react'
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SettingsIcon from '@mui/icons-material/Settings'

interface PresentationControlsProps {
  onSectionChange: (index: number) => void
  totalSections: number
}

export const PresentationControls: React.FC<PresentationControlsProps> = ({
  onSectionChange,
  totalSections,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSection] = useState(0)

  useEffect(() => {
    let interval: number

    if (isPlaying) {
      interval = window.setInterval(() => {
        const next = (currentSection + 1) % totalSections
        onSectionChange(next)
      }, 5000) // Change section every 5 seconds
    }

    return () => {
      if (interval) {
        window.clearInterval(interval)
      }
    }
  }, [isPlaying, totalSections, onSectionChange, currentSection])

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleRestart = () => {
    onSectionChange(0)
    setIsPlaying(false)
  }

  const actions = [
    { icon: isPlaying ? <PauseIcon /> : <PlayArrowIcon />, name: isPlaying ? 'Pause' : 'Play', onClick: handlePlay },
    { icon: <RestartAltIcon />, name: 'Restart', onClick: handleRestart },
  ]

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
      <SpeedDial
        ariaLabel="Presentation Controls"
        icon={<SpeedDialIcon openIcon={<SettingsIcon />} />}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  )
} 