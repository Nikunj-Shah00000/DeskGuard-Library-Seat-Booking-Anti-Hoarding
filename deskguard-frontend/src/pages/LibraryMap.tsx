import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Grid, GridItem, VStack, HStack, Text, Flex, Skeleton, SkeletonText,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Seat, LibraryStats, ActivityEvent } from '../types';
import { generateSeats, getMockStats, mockActivity } from '../utils/mockData';
import SeatCard from '../components/SeatCard';
import SeatDetailPanel from '../components/SeatDetailPanel';
import Navbar from '../components/Navbar';

const MotionBox = motion(Box);

const StatBlock: React.FC<{ value: number | string; label: string; color: string; delay: number }> = ({
  value, label, color, delay,
}) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    flex={1}
    minW="0"
  >
    <Text
      fontSize={{ base: '2.5rem', md: '3.5rem' }}
      fontWeight="900"
      letterSpacing="-0.05em"
      color={color}
      lineHeight={0.95}
    >
      {value}
    </Text>
    <Text
      fontSize="8px"
      fontWeight="800"
      letterSpacing="0.18em"
      textTransform="uppercase"
      color="#9E8C7E"
      mt={1}
    >
      {label}
    </Text>
  </MotionBox>
);

const ActivityFeed: React.FC<{ events: ActivityEvent[] }> = ({ events }) => {
  const typeColor = {
    available: '#556B2F',
    occupied: '#B23A48',
    away: '#D4960A',
    abandoned: '#9E9E9E',
  };

  return (
    <VStack align="stretch" spacing={0} divider={<Box h="1px" bg="rgba(78,52,46,0.06)" />}>
      {events.map((evt, i) => (
        <MotionBox
          key={evt.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          py={3}
        >
          <HStack justify="space-between">
            <HStack spacing={2}>
              <Box w="6px" h="6px" borderRadius="full" bg={typeColor[evt.type]} flexShrink={0} />
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="xs" fontWeight="700" color="#2C1A17">
                  Seat {evt.seatNumber} — {evt.event}
                </Text>
                <Text fontSize="10px" color="#9E8C7E" fontWeight="500">{evt.student}</Text>
              </VStack>
            </HStack>
            <Text fontSize="9px" color="#B0A090" fontWeight="600">{evt.timestamp}</Text>
          </HStack>
        </MotionBox>
      ))}
    </VStack>
  );
};

const ZoneLegend: React.FC = () => (
  <HStack spacing={4} flexWrap="wrap">
    {[
      { color: '#556B2F', label: 'Available' },
      { color: '#B23A48', label: 'Occupied' },
      { color: '#D4960A', label: 'Away' },
      { color: '#9E9E9E', label: 'Abandoned' },
    ].map(l => (
      <HStack key={l.label} spacing={1.5}>
        <Box w="8px" h="8px" borderRadius="full" bg={l.color} />
        <Text fontSize="9px" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color="#9E8C7E">
          {l.label}
        </Text>
      </HStack>
    ))}
  </HStack>
);

const LibraryMap: React.FC = () => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [stats, setStats] = useState<LibraryStats | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeZone, setActiveZone] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const data = generateSeats();
      setSeats(data);
      setStats(getMockStats(data));
      setLoading(false);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  // Simulate live updates
  useEffect(() => {
    if (!seats.length) return;
    const interval = setInterval(() => {
      setSeats(prev => {
        const idx = Math.floor(Math.random() * prev.length);
        const statuses: Array<'available' | 'occupied' | 'away'> = ['available', 'occupied', 'away'];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const updated = [...prev];
        updated[idx] = { ...updated[idx], status: newStatus };
        setStats(getMockStats(updated));
        return updated;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [seats.length]);

  const handleCheckIn = useCallback((seatId: string) => {
    setSeats(prev => prev.map(s => s.id === seatId
      ? { ...s, status: 'occupied', checkedInAt: new Date().toISOString() }
      : s));
    setSelectedSeat(prev => prev && prev.id === seatId
      ? { ...prev, status: 'occupied', checkedInAt: new Date().toISOString() }
      : prev);
  }, []);

  const handleGoAway = useCallback((seatId: string) => {
    const awayEndsAt = new Date(Date.now() + 20 * 60 * 1000).toISOString();
    setSeats(prev => prev.map(s => s.id === seatId
      ? { ...s, status: 'away', awayStartedAt: new Date().toISOString(), awayEndsAt }
      : s));
    setSelectedSeat(prev => prev && prev.id === seatId
      ? { ...prev, status: 'away', awayStartedAt: new Date().toISOString(), awayEndsAt }
      : prev);
  }, []);

  const handleCheckOut = useCallback((seatId: string) => {
    setSeats(prev => prev.map(s => s.id === seatId
      ? { ...s, status: 'available', checkedInAt: undefined, awayEndsAt: undefined }
      : s));
    setSelectedSeat(null);
  }, []);

  const zones = ['A', 'B', 'C', 'D'];

  return (
    <Box minH="100vh" bg="#FAF4EC" position="relative">
      <Navbar />

      <Box
        position="fixed"
        right={selectedSeat ? '420px' : 0}
        top={0}
        left={0}
        bottom={0}
        transition="right 0.35s cubic-bezier(0.16,1,0.3,1)"
        overflowY="auto"
        pt="72px"
        zIndex={1}
      >
        <Box px={{ base: 4, md: 8, lg: 12 }} py={8}>
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            mb={8}
          >
            <HStack justify="space-between" alignItems="flex-end" flexWrap="wrap" gap={4}>
              <VStack align="flex-start" spacing={1}>
                <Text
                  fontSize="9px"
                  fontWeight="800"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color="#9E8C7E"
                >
                  Live Library Map
                </Text>
                <Text
                  fontSize={{ base: '2.8rem', md: '3.8rem' }}
                  fontWeight="900"
                  letterSpacing="-0.04em"
                  color="#2C1A17"
                  lineHeight={0.9}
                  textTransform="uppercase"
                >
                  Find.
                </Text>
                <Text
                  fontSize={{ base: '2.8rem', md: '3.8rem' }}
                  fontWeight="900"
                  letterSpacing="-0.04em"
                  color="#556B2F"
                  lineHeight={0.9}
                  textTransform="uppercase"
                >
                  Study.
                </Text>
              </VStack>

              {/* Stats */}
              {loading ? (
                <HStack spacing={6}>
                  {[1,2,3,4].map(i => (
                    <VStack key={i} spacing={1}>
                      <Skeleton w="50px" h="50px" />
                      <Skeleton w="60px" h="8px" />
                    </VStack>
                  ))}
                </HStack>
              ) : (
                <HStack spacing={{ base: 4, md: 8 }} divider={<Box w="1px" h="40px" bg="rgba(78,52,46,0.12)" />} flexWrap="wrap">
                  <StatBlock value={stats!.available} label="Available" color="#556B2F" delay={0.3} />
                  <StatBlock value={stats!.occupied} label="Occupied" color="#B23A48" delay={0.4} />
                  <StatBlock value={stats!.away} label="Away" color="#D4960A" delay={0.5} />
                  <StatBlock value={stats!.total} label="Total" color="#4E342E" delay={0.6} />
                </HStack>
              )}
            </HStack>
          </MotionBox>

          {/* Zone filter */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            mb={6}
          >
            <HStack spacing={3} flexWrap="wrap">
              <ZoneLegend />
              <Box flex={1} />
              <HStack spacing={2}>
                <Text fontSize="9px" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color="#9E8C7E">
                  Zone:
                </Text>
                {['All', ...zones].map(z => (
                  <Box
                    key={z}
                    as="button"
                    px={3}
                    py={1}
                    fontSize="10px"
                    fontWeight="700"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    borderRadius="2px"
                    bg={activeZone === z || (z === 'All' && !activeZone) ? '#4E342E' : 'transparent'}
                    color={activeZone === z || (z === 'All' && !activeZone) ? '#F5E9DA' : '#9E8C7E'}
                    border="1px solid"
                    borderColor={activeZone === z || (z === 'All' && !activeZone) ? '#4E342E' : 'rgba(78,52,46,0.2)'}
                    onClick={() => setActiveZone(z === 'All' ? null : z)}
                    cursor="pointer"
                    transition="all 0.15s"
                  >
                    {z}
                  </Box>
                ))}
              </HStack>
            </HStack>
          </MotionBox>

          {/* Main content: grid + activity */}
          <Grid templateColumns={{ base: '1fr', lg: '1fr 260px' }} gap={8}>
            {/* Seats grid by zone */}
            <GridItem>
              {loading ? (
                <Grid templateColumns="repeat(auto-fill, minmax(90px, 1fr))" gap={3}>
                  {Array.from({ length: 60 }).map((_, i) => (
                    <Skeleton key={i} h="90px" borderRadius="4px" />
                  ))}
                </Grid>
              ) : (
                <VStack align="stretch" spacing={6}>
                  {zones.filter(z => !activeZone || z === activeZone).map((zone, zi) => (
                    <MotionBox
                      key={zone}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: zi * 0.1 + 0.2 }}
                    >
                      <HStack mb={3} spacing={2} alignItems="center">
                        <Text
                          fontSize="10px"
                          fontWeight="800"
                          letterSpacing="0.2em"
                          textTransform="uppercase"
                          color="#9E8C7E"
                        >
                          Zone {zone}
                        </Text>
                        <Box flex={1} h="1px" bg="rgba(78,52,46,0.08)" />
                        <Text fontSize="9px" color="#C8B9A8" fontWeight="600">
                          {seats.filter(s => s.zone === zone && s.status === 'available').length} free
                        </Text>
                      </HStack>
                      <Grid templateColumns="repeat(auto-fill, minmax(88px, 1fr))" gap={3}>
                        {seats.filter(s => s.zone === zone).map(seat => (
                          <SeatCard
                            key={seat.id}
                            seat={seat}
                            onClick={setSelectedSeat}
                          />
                        ))}
                      </Grid>
                    </MotionBox>
                  ))}
                </VStack>
              )}
            </GridItem>

            {/* Activity feed */}
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                position={{ base: 'relative', lg: 'sticky' }}
                top={{ lg: '20px' }}
              >
                <Box
                  bg="#FEFAF5"
                  border="1px solid rgba(78,52,46,0.1)"
                  borderRadius="4px"
                  p={4}
                >
                  <HStack justify="space-between" mb={4}>
                    <Text
                      fontSize="9px"
                      fontWeight="800"
                      letterSpacing="0.2em"
                      textTransform="uppercase"
                      color="#9E8C7E"
                    >
                      Live Feed
                    </Text>
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Box w="6px" h="6px" borderRadius="full" bg="#556B2F" />
                    </motion.div>
                  </HStack>
                  {loading ? (
                    <VStack spacing={3}>
                      {[1,2,3,4,5].map(i => <SkeletonText key={i} noOfLines={2} w="100%" />)}
                    </VStack>
                  ) : (
                    <ActivityFeed events={mockActivity} />
                  )}
                </Box>

                {/* Quick tip */}
                <MotionBox
                  mt={4}
                  p={4}
                  bg="#F0F4E8"
                  borderRadius="4px"
                  border="1px solid rgba(85,107,47,0.2)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Text fontSize="9px" fontWeight="800" letterSpacing="0.15em" textTransform="uppercase" color="#556B2F" mb={1}>
                    How it works
                  </Text>
                  <Text fontSize="10px" color="#6D7F50" fontWeight="500" lineHeight={1.6}>
                    Scan the QR code on any desk to check in. Going for lunch? Hit Away — you get 20 minutes before your seat is released.
                  </Text>
                </MotionBox>
              </MotionBox>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      {/* Seat detail panel */}
      {selectedSeat && (
        <SeatDetailPanel
          seat={selectedSeat}
          onClose={() => setSelectedSeat(null)}
          onCheckIn={handleCheckIn}
          onGoAway={handleGoAway}
          onCheckOut={handleCheckOut}
        />
      )}
    </Box>
  );
};

export default LibraryMap;
