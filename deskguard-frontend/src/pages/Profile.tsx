import React from 'react';
import { Box, VStack, HStack, Text, Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const MotionBox = motion(Box);

const StudyArtwork: React.FC = () => (
  <Box display="flex" justifyContent="center" py={8}>
    <svg viewBox="0 0 320 240" width="280" height="210" fill="none">
      {/* Open book */}
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Left page */}
        <path d="M60 80 Q100 70 160 80 L160 180 Q100 185 60 175 Z" fill="#F5EDE0" stroke="#C8B9A8" strokeWidth="1.5" />
        {/* Right page */}
        <path d="M160 80 Q220 70 260 80 L260 175 Q220 185 160 180 Z" fill="#FAF4EC" stroke="#C8B9A8" strokeWidth="1.5" />
        {/* Spine */}
        <line x1="160" y1="78" x2="160" y2="182" stroke="#8D6E63" strokeWidth="3" />
        {/* Lines on pages */}
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={75} y1={100 + i*15} x2={148} y2={102 + i*15} stroke="rgba(139,115,100,0.3)" strokeWidth="1" />
        ))}
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={172} y1={100 + i*15} x2={248} y2={102 + i*15} stroke="rgba(139,115,100,0.3)" strokeWidth="1" />
        ))}
      </motion.g>

      {/* Floating sparkles */}
      {[
        { x: 80, y: 55 }, { x: 240, y: 50 }, { x: 160, y: 30 }, { x: 290, y: 120 }, { x: 35, y: 130 }
      ].map((pos, i) => (
        <motion.circle
          key={i}
          cx={pos.x} cy={pos.y} r={i % 2 === 0 ? 3 : 2}
          fill={['#556B2F', '#F4B400', '#B23A48', '#4E342E', '#556B2F'][i]}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* Reading lamp */}
      <line x1="270" y1="200" x2="270" y2="140" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" />
      <line x1="270" y1="140" x2="250" y2="110" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" />
      <motion.ellipse
        cx="244" cy="108" rx="12" ry="7"
        fill="#F4B400"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  </Box>
);

const Profile: React.FC = () => {
  const { user } = useAuth();

  const sessions = [
    { date: 'Today', seat: '07', duration: '2h 15m', zone: 'A' },
    { date: 'Yesterday', seat: '23', duration: '3h 40m', zone: 'B' },
    { date: 'Mon', seat: '15', duration: '1h 55m', zone: 'A' },
    { date: 'Sun', seat: '34', duration: '4h 10m', zone: 'C' },
  ];

  return (
    <Box minH="100vh" bg="#FAF4EC">
      <Navbar />
      <Box px={{ base: 4, md: 8, lg: 12 }} pt="88px" pb={12} position="relative" zIndex={1}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={10}>
          {/* Left */}
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Text fontSize="9px" fontWeight="800" letterSpacing="0.25em" textTransform="uppercase" color="#9E8C7E" mb={4}>
                Your Profile
              </Text>
              <Text
                fontSize={{ base: '3.5rem', md: '5rem' }}
                fontWeight="900"
                letterSpacing="-0.04em"
                color="#2C1A17"
                lineHeight={0.88}
                textTransform="uppercase"
              >
                {user?.name?.split(' ')[0] || 'Student'}
              </Text>
              <Text
                fontSize={{ base: '3.5rem', md: '5rem' }}
                fontWeight="900"
                letterSpacing="-0.04em"
                color="#556B2F"
                lineHeight={0.88}
                textTransform="uppercase"
              >
                Focus.
              </Text>

              <StudyArtwork />

              <HStack spacing={6} mt={4} divider={<Box w="1px" h="40px" bg="rgba(78,52,46,0.12)" />}>
                {[
                  { n: '47', label: 'Sessions' },
                  { n: '124h', label: 'Study Time' },
                  { n: 'A', label: 'Fav Zone' },
                ].map(s => (
                  <VStack key={s.n} spacing={0} align="flex-start">
                    <Text fontSize="2.5rem" fontWeight="900" color="#4E342E" lineHeight={1}>{s.n}</Text>
                    <Text fontSize="8px" fontWeight="700" letterSpacing="0.15em" textTransform="uppercase" color="#9E8C7E">{s.label}</Text>
                  </VStack>
                ))}
              </HStack>
            </MotionBox>
          </GridItem>

          {/* Right */}
          <GridItem>
            <VStack align="stretch" spacing={4} mt={{ base: 6, lg: 16 }}>
              {/* Account info */}
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                bg="#FEFAF5"
                border="1px solid rgba(78,52,46,0.1)"
                borderRadius="4px"
                p={5}
              >
                <Text fontSize="9px" fontWeight="800" letterSpacing="0.2em" textTransform="uppercase" color="#9E8C7E" mb={4}>
                  Account
                </Text>
                <VStack spacing={0} align="stretch" divider={<Box h="1px" bg="rgba(78,52,46,0.06)" />}>
                  {[
                    { label: 'Name', value: user?.name || '—' },
                    { label: 'Email', value: user?.email || '—' },
                    { label: 'Role', value: user?.role || 'student' },
                    { label: 'Member Since', value: 'Sept 2024' },
                  ].map(row => (
                    <HStack key={row.label} justify="space-between" py={2.5}>
                      <Text fontSize="xs" fontWeight="600" color="#9E8C7E">{row.label}</Text>
                      <Text fontSize="xs" fontWeight="700" color="#2C1A17" textTransform={row.label === 'Role' ? 'capitalize' : undefined}>
                        {row.value}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </MotionBox>

              {/* Recent sessions */}
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
                bg="#FEFAF5"
                border="1px solid rgba(78,52,46,0.1)"
                borderRadius="4px"
                p={5}
              >
                <Text fontSize="9px" fontWeight="800" letterSpacing="0.2em" textTransform="uppercase" color="#9E8C7E" mb={4}>
                  Recent Sessions
                </Text>
                <VStack spacing={0} align="stretch" divider={<Box h="1px" bg="rgba(78,52,46,0.06)" />}>
                  {sessions.map((s, i) => (
                    <MotionBox
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                    >
                      <HStack justify="space-between" py={3}>
                        <HStack spacing={3}>
                          <Box
                            w="32px" h="32px"
                            bg="#F5EDE0"
                            borderRadius="2px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text fontSize="sm" fontWeight="900" color="#4E342E">{s.seat}</Text>
                          </Box>
                          <VStack align="flex-start" spacing={0}>
                            <Text fontSize="xs" fontWeight="700" color="#2C1A17">Seat {s.seat}</Text>
                            <Text fontSize="9px" color="#9E8C7E" fontWeight="500">Zone {s.zone}</Text>
                          </VStack>
                        </HStack>
                        <VStack align="flex-end" spacing={0}>
                          <Text fontSize="xs" fontWeight="700" color="#4E342E">{s.duration}</Text>
                          <Text fontSize="9px" color="#9E8C7E" fontWeight="500">{s.date}</Text>
                        </VStack>
                      </HStack>
                    </MotionBox>
                  ))}
                </VStack>
              </MotionBox>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
