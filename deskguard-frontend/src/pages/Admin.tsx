import React, { useState, useEffect } from 'react';
import {
  Box, Grid, GridItem, VStack, HStack, Text, Flex, Skeleton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Seat, LibraryStats } from '../types';
import { generateSeats, getMockStats, mockActivity } from '../utils/mockData';
import Navbar from '../components/Navbar';

const MotionBox = motion(Box);

const AnimatedCounter: React.FC<{ value: number; delay?: number }> = ({ value, delay = 0 }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      let start = 0;
      const step = Math.max(1, Math.floor(value / 30));
      const interval = setInterval(() => {
        start += step;
        if (start >= value) { setDisplay(value); clearInterval(interval); }
        else setDisplay(start);
      }, 40);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [value, delay]);

  return <>{display}</>;
};

const BigStatCard: React.FC<{
  value: number;
  label: string;
  subLabel: string;
  color: string;
  bgColor: string;
  borderColor: string;
  delay: number;
}> = ({ value, label, subLabel, color, bgColor, borderColor, delay }) => (
  <MotionBox
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    bg={bgColor}
    border="1.5px solid"
    borderColor={borderColor}
    borderRadius="4px"
    p={6}
    position="relative"
    overflow="hidden"
  >
    <Text
      fontSize={{ base: '4.5rem', md: '6rem' }}
      fontWeight="900"
      letterSpacing="-0.06em"
      color={color}
      lineHeight={0.85}
    >
      <AnimatedCounter value={value} delay={delay} />
    </Text>
    <Text
      fontSize="xs"
      fontWeight="800"
      letterSpacing="0.2em"
      textTransform="uppercase"
      color={color}
      opacity={0.8}
      mt={2}
    >
      {label}
    </Text>
    <Text fontSize="10px" color="#9E8C7E" fontWeight="500" mt={1}>
      {subLabel}
    </Text>
    <Box
      position="absolute"
      top={0}
      right={0}
      w="4px"
      h="100%"
      bg={color}
      opacity={0.5}
    />
  </MotionBox>
);

const OccupancyBar: React.FC<{ stats: LibraryStats }> = ({ stats }) => {
  const segments = [
    { value: stats.occupied, color: '#B23A48', label: 'Occupied' },
    { value: stats.away, color: '#F4B400', label: 'Away' },
    { value: stats.abandoned, color: '#9E9E9E', label: 'Abandoned' },
    { value: stats.available, color: '#556B2F', label: 'Available' },
  ];

  return (
    <Box>
      <Text fontSize="9px" fontWeight="800" letterSpacing="0.2em" textTransform="uppercase" color="#9E8C7E" mb={3}>
        Occupancy Breakdown
      </Text>
      <Box h="12px" borderRadius="2px" overflow="hidden" display="flex">
        {segments.map((s, i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            animate={{ width: `${(s.value / stats.total) * 100}%` }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: s.color, height: '100%' }}
          />
        ))}
      </Box>
      <HStack spacing={4} mt={3} flexWrap="wrap">
        {segments.map(s => (
          <HStack key={s.label} spacing={1.5}>
            <Box w="6px" h="6px" borderRadius="full" bg={s.color} />
            <Text fontSize="9px" fontWeight="600" color="#9E8C7E">
              {s.label}: <Text as="span" fontWeight="800" color="#2C1A17">{s.value}</Text>
            </Text>
          </HStack>
        ))}
      </HStack>
    </Box>
  );
};

const HeatmapGrid: React.FC<{ seats: Seat[] }> = ({ seats }) => {
  const statusColor = {
    available: '#556B2F',
    occupied: '#B23A48',
    away: '#F4B400',
    abandoned: '#9E9E9E',
  };

  return (
    <Box>
      <Text fontSize="9px" fontWeight="800" letterSpacing="0.2em" textTransform="uppercase" color="#9E8C7E" mb={3}>
        Seat Heatmap
      </Text>
      <Box
        display="grid"
        gridTemplateColumns="repeat(15, 1fr)"
        gap="3px"
        p={3}
        bg="#F5EDE0"
        borderRadius="4px"
      >
        {seats.map(seat => (
          <motion.div
            key={seat.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: Math.random() * 0.5 }}
            style={{
              aspectRatio: '1',
              borderRadius: '2px',
              background: statusColor[seat.status],
              opacity: seat.status === 'available' ? 0.6 : 0.9,
            }}
            whileHover={{ scale: 1.4 }}
          />
        ))}
      </Box>
    </Box>
  );
};

const PeakChart: React.FC = () => {
  const hours = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
  const values = [15, 28, 45, 52, 38, 48, 55, 58, 50, 42, 30, 18, 8];
  const max = Math.max(...values);

  return (
    <Box>
      <Text fontSize="9px" fontWeight="800" letterSpacing="0.2em" textTransform="uppercase" color="#9E8C7E" mb={4}>
        Peak Usage Today
      </Text>
      <HStack align="flex-end" spacing={2} h="80px">
        {values.map((v, i) => (
          <VStack key={i} spacing={1} flex={1}>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(v / max) * 72}px` }}
              transition={{ delay: 0.8 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                background: v === max ? '#B23A48' : '#4E342E',
                borderRadius: '2px 2px 0 0',
                opacity: v === max ? 1 : 0.5,
              }}
            />
          </VStack>
        ))}
      </HStack>
      <HStack spacing={2} mt={1}>
        {hours.map((h, i) => (
          <Text key={i} flex={1} fontSize="7px" color="#B0A090" fontWeight="600" textAlign="center">
            {i % 3 === 0 ? h : ''}
          </Text>
        ))}
      </HStack>
    </Box>
  );
};

const Admin: React.FC = () => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [stats, setStats] = useState<LibraryStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      const data = generateSeats();
      setSeats(data);
      setStats(getMockStats(data));
      setLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  const abandonedSeats = seats.filter(s => s.status === 'abandoned');

  return (
    <Box minH="100vh" bg="#FAF4EC">
      <Navbar />
      <Box px={{ base: 4, md: 8, lg: 12 }} pt="88px" pb={12} position="relative" zIndex={1}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          mb={10}
        >
          <Text fontSize="9px" fontWeight="800" letterSpacing="0.25em" textTransform="uppercase" color="#9E8C7E" mb={2}>
            Librarian Command Center
          </Text>
          <Text
            fontSize={{ base: '3rem', md: '5rem' }}
            fontWeight="900"
            letterSpacing="-0.04em"
            color="#2C1A17"
            lineHeight={0.88}
            textTransform="uppercase"
          >
            Without
          </Text>
          <Text
            fontSize={{ base: '3rem', md: '5rem' }}
            fontWeight="900"
            letterSpacing="-0.04em"
            color="#B23A48"
            lineHeight={0.88}
            textTransform="uppercase"
          >
            Hoarding.
          </Text>
        </MotionBox>

        {/* Big stat cards */}
        {loading ? (
          <Grid templateColumns={{ base: '1fr 1fr', md: 'repeat(4, 1fr)' }} gap={4} mb={8}>
            {[1,2,3,4].map(i => <Skeleton key={i} h="160px" borderRadius="4px" />)}
          </Grid>
        ) : (
          <Grid templateColumns={{ base: '1fr 1fr', md: 'repeat(4, 1fr)' }} gap={4} mb={8}>
            <BigStatCard
              value={stats!.available}
              label="Available"
              subLabel="Ready to occupy"
              color="#556B2F"
              bgColor="#F0F4E8"
              borderColor="rgba(85,107,47,0.2)"
              delay={0.2}
            />
            <BigStatCard
              value={stats!.occupied}
              label="Occupied"
              subLabel="Students studying"
              color="#B23A48"
              bgColor="#FBF0F1"
              borderColor="rgba(178,58,72,0.2)"
              delay={0.3}
            />
            <BigStatCard
              value={stats!.away}
              label="Away"
              subLabel="On break timer"
              color="#D4960A"
              bgColor="#FEF8E7"
              borderColor="rgba(244,180,0,0.25)"
              delay={0.4}
            />
            <BigStatCard
              value={stats!.abandoned}
              label="Abandoned"
              subLabel="Need reset"
              color="#757575"
              bgColor="#F5F5F5"
              borderColor="rgba(150,150,150,0.2)"
              delay={0.5}
            />
          </Grid>
        )}

        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6} mb={6}>
          {/* Left column */}
          <GridItem>
            <VStack spacing={4} align="stretch">
              {/* Occupancy breakdown */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                bg="#FEFAF5"
                border="1px solid rgba(78,52,46,0.1)"
                borderRadius="4px"
                p={6}
              >
                {loading ? <Skeleton h="60px" /> : stats && <OccupancyBar stats={stats} />}
              </MotionBox>

              {/* Peak chart */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                bg="#FEFAF5"
                border="1px solid rgba(78,52,46,0.1)"
                borderRadius="4px"
                p={6}
              >
                {loading ? <Skeleton h="100px" /> : <PeakChart />}
              </MotionBox>
            </VStack>
          </GridItem>

          {/* Right column */}
          <GridItem>
            <VStack spacing={4} align="stretch">
              {/* Heatmap */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                bg="#FEFAF5"
                border="1px solid rgba(78,52,46,0.1)"
                borderRadius="4px"
                p={6}
              >
                {loading ? <Skeleton h="120px" /> : <HeatmapGrid seats={seats} />}
              </MotionBox>

              {/* Live event feed */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                bg="#FEFAF5"
                border="1px solid rgba(78,52,46,0.1)"
                borderRadius="4px"
                p={6}
              >
                <HStack justify="space-between" mb={4}>
                  <Text fontSize="9px" fontWeight="800" letterSpacing="0.2em" textTransform="uppercase" color="#9E8C7E">
                    Event Feed
                  </Text>
                  <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                    <Box w="6px" h="6px" borderRadius="full" bg="#556B2F" />
                  </motion.div>
                </HStack>
                {loading ? (
                  <VStack spacing={2}>{[1,2,3].map(i => <Skeleton key={i} h="40px" w="100%" />)}</VStack>
                ) : (
                  <VStack spacing={0} align="stretch" divider={<Box h="1px" bg="rgba(78,52,46,0.06)" />}>
                    {mockActivity.map((evt, i) => {
                      const typeColor: Record<string, string> = {
                        available: '#556B2F', occupied: '#B23A48', away: '#D4960A', abandoned: '#9E9E9E',
                      };
                      return (
                        <HStack key={evt.id} py={2.5} justify="space-between">
                          <HStack spacing={2}>
                            <Box w="5px" h="5px" borderRadius="full" bg={typeColor[evt.type]} />
                            <Text fontSize="10px" fontWeight="700" color="#2C1A17">
                              Seat {evt.seatNumber} — {evt.event}
                            </Text>
                          </HStack>
                          <Text fontSize="9px" color="#B0A090" fontWeight="600">{evt.timestamp}</Text>
                        </HStack>
                      );
                    })}
                  </VStack>
                )}
              </MotionBox>
            </VStack>
          </GridItem>
        </Grid>

        {/* Abandoned seats */}
        {!loading && abandonedSeats.length > 0 && (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            bg="#FBF0F1"
            border="1.5px solid rgba(178,58,72,0.25)"
            borderRadius="4px"
            p={6}
          >
            <HStack mb={4} spacing={2}>
              <Box w="8px" h="8px" borderRadius="full" bg="#B23A48" />
              <Text fontSize="9px" fontWeight="800" letterSpacing="0.2em" textTransform="uppercase" color="#B23A48">
                Abandoned Desks — Needs Attention
              </Text>
            </HStack>
            <HStack spacing={3} flexWrap="wrap">
              {abandonedSeats.map(seat => (
                <Box
                  key={seat.id}
                  px={4}
                  py={2}
                  bg="white"
                  border="1px solid rgba(178,58,72,0.2)"
                  borderRadius="2px"
                >
                  <Text fontSize="1.4rem" fontWeight="900" color="#2C1A17" lineHeight={1}>
                    {seat.number}
                  </Text>
                  <Text fontSize="8px" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="#9E9E9E">
                    Zone {seat.zone}
                  </Text>
                </Box>
              ))}
            </HStack>
          </MotionBox>
        )}
      </Box>
    </Box>
  );
};

export default Admin;
