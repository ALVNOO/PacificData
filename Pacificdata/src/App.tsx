import { Box, Container, Typography, Paper, Grid, Divider, Fade, useScrollTrigger } from '@mui/material'
import { AgricultureDecline } from './components/AgricultureDecline'
import { LandUsage } from './components/LandUsage'
import { WorkforceStats } from './components/WorkforceStats'
import { FisheryStats } from './components/FisheryStats'
import { PresentationControls } from './components/PresentationControls'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState, useRef } from 'react'

const MotionPaper = motion(Paper)

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  index: number
  currentSection: number
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0, index, currentSection }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView || index === currentSection) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: delay * 0.1 }
      })
    } else {
      controls.start({
        y: 50,
        opacity: 0
      })
    }
  }, [inView, controls, delay, index, currentSection])

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={controls}
    >
      {children}
    </motion.div>
  )
}

const App = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  const scrollToSection = (index: number) => {
    sectionsRef.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const backgroundVariants = {
    initial: {
      backgroundPosition: '0% 50%'
    },
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
      style={{
        background: 'linear-gradient(135deg, rgba(46,125,50,0.1) 0%, rgba(2,136,209,0.1) 50%, rgba(46,125,50,0.1) 100%)',
        backgroundSize: '400% 400%',
        minHeight: '100vh',
        paddingBottom: '4rem'
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AnimatedSection index={0} currentSection={currentSection}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Cook Islands Agricultural Census 2011
          </Typography>
        </AnimatedSection>
        
        <Grid container spacing={3}>
          {[
            {
              title: 'Background & Objectives',
              content: [
                'The 2011 Agricultural Census of the Cook Islands represents a significant milestone in understanding the evolution of agricultural practices in this Pacific nation. Conducted alongside the Census of Population and Dwellings (CoPD) 2011, this comprehensive survey aimed to optimize resources and reach even the most remote areas, particularly in the Northern Group where access is limited.',
                'This strategic approach not only helped in reducing operational costs but also ensured a more complete and accurate data collection process. The census focused on measuring both agricultural and fishing activities at the household level, providing crucial insights into the changing patterns of land use and food production since the previous censuses of 1988 and 2000.'
              ]
            },
            {
              title: 'Regional Context & Challenges',
              content: [
                'The Cook Islands, comprising 15 islands spread across two million square kilometers of ocean, faces unique agricultural challenges. Rarotonga, the main island, has experienced the most dramatic changes due to rapid urbanization and tourism development. This has led to a significant shift in land use patterns and agricultural practices.',
                'The outer islands, particularly in the Northern Group, maintain stronger ties to traditional farming methods and subsistence agriculture. However, they face challenges such as limited access to markets, modern farming techniques, and agricultural inputs. These regional differences highlight the need for tailored agricultural policies and support systems.'
              ]
            }
          ].map((section, index) => (
            <Grid item xs={12} key={section.title}>
              <div ref={el => sectionsRef.current[index] = el!}>
                <AnimatedSection index={index + 1} currentSection={currentSection} delay={index * 2}>
                  <MotionPaper
                    elevation={3}
                    sx={{ p: 3, position: 'relative', overflow: 'hidden' }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      right: index % 2 ? 'auto' : 0,
                      left: index % 2 ? 0 : 'auto',
                      width: '150px',
                      height: '150px',
                      background: `radial-gradient(circle, ${index % 2 ? 'rgba(2,136,209,0.1)' : 'rgba(46,125,50,0.1)'} 0%, rgba(255,255,255,0) 70%)`,
                      borderRadius: index % 2 ? '0 0 100% 0' : '0 0 0 100%'
                    }} />
                    <Typography variant="h5" gutterBottom color="primary">
                      {section.title}
                    </Typography>
                    {section.content.map((paragraph, i) => (
                      <Typography key={i} variant="body1" paragraph>
                        {paragraph}
                      </Typography>
                    ))}
                  </MotionPaper>
                </AnimatedSection>
              </div>
            </Grid>
          ))}

          <Grid item xs={12} md={6}>
            <AnimatedSection index={3} currentSection={currentSection} delay={4}>
              <div ref={el => sectionsRef.current[2] = el!}>
                <AgricultureDecline />
              </div>
            </AnimatedSection>
          </Grid>

          <Grid item xs={12} md={6}>
            <AnimatedSection index={4} currentSection={currentSection} delay={4}>
              <div ref={el => sectionsRef.current[3] = el!}>
                <LandUsage />
              </div>
            </AnimatedSection>
          </Grid>

          <Grid item xs={12}>
            <AnimatedSection index={5} currentSection={currentSection} delay={6}>
              <div ref={el => sectionsRef.current[4] = el!}>
                <MotionPaper
                  elevation={3}
                  sx={{ p: 3, position: 'relative', overflow: 'hidden' }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(46,125,50,0.1) 0%, rgba(255,255,255,0) 70%)',
                    borderRadius: '100% 0 0 0'
                  }} />
                  <Typography variant="h5" gutterBottom color="primary">
                    Economic Impact & Future Considerations
                  </Typography>
                  <Typography variant="body1" paragraph>
                    The decline in agricultural activity has significant implications for the Cook Islands' economy and food security. With only 2% of households now fully dependent on agriculture for income, there's a clear shift away from traditional farming as a primary economic activity. This transition presents both challenges and opportunities for the nation's development.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    The limited use of modern agricultural inputs, with only 30% using herbicides and 20% using inorganic fertilizers, suggests potential for productivity improvements. However, the aging farming population and low youth participation raise concerns about the sector's future sustainability.
                  </Typography>
                </MotionPaper>
              </div>
            </AnimatedSection>
          </Grid>

          <Grid item xs={12} md={6}>
            <AnimatedSection index={6} currentSection={currentSection} delay={8}>
              <div ref={el => sectionsRef.current[5] = el!}>
                <WorkforceStats />
              </div>
            </AnimatedSection>
          </Grid>

          <Grid item xs={12} md={6}>
            <AnimatedSection index={7} currentSection={currentSection} delay={8}>
              <div ref={el => sectionsRef.current[6] = el!}>
                <FisheryStats />
              </div>
            </AnimatedSection>
          </Grid>

          <Grid item xs={12}>
            <AnimatedSection index={8} currentSection={currentSection} delay={10}>
              <div ref={el => sectionsRef.current[7] = el!}>
                <MotionPaper
                  elevation={3}
                  sx={{ p: 3, position: 'relative', overflow: 'hidden' }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(2,136,209,0.1) 0%, rgba(255,255,255,0) 70%)',
                    borderRadius: '0 100% 0 0'
                  }} />
                  <Typography variant="h5" gutterBottom color="primary">
                    Environmental and Sustainability Aspects
                  </Typography>
                  <Typography variant="body1" paragraph>
                    The increase in fallow land and virgin bush areas, while indicating a decline in active cultivation, has inadvertent environmental benefits. These areas can serve as natural carbon sinks and support biodiversity conservation. However, the challenge lies in balancing environmental preservation with food security needs.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    The dramatic decline in pearl farming, from 182 farms in 2000 to just 35 in 2011, highlights the vulnerability of aquaculture to environmental and market changes. This experience offers valuable lessons for developing resilient agricultural and aquacultural practices in the face of climate change and market fluctuations.
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ fontStyle: 'italic' }}>
                    Data Source: Cook Islands Agricultural Census 2011
                  </Typography>
                </MotionPaper>
              </div>
            </AnimatedSection>
          </Grid>
        </Grid>
      </Container>

      <PresentationControls
        onSectionChange={(index) => {
          setCurrentSection(index)
          scrollToSection(index)
        }}
        totalSections={8}
      />
    </motion.div>
  )
}

export default App 