import React from 'react';
import { Box, Text, VStack, HStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Seat } from '../types';

const MotionBox = motion(Box);

interface SeatCardProps {
  seat: Seat;
  onClick: (seat: Seat) => void;
}

const statusConfig = {
  available: { color: '#556B2F', bg: 'rgba(85,107,47,0.12)', label: 'FREE', glow: '0 0 14px rgba(85,107,47,0.45)' },
  occupied: { color: '#B23A48', bg: 'rgba(178,58,72,0.1)', label: 'TAKEN', glow: '0 0 14px rgba(178,58,72,0.4)' },
  away: { color: '#D4960A', bg: 'rgba(244,180,0,0.12)', label: 'AWAY', glow: '0 0 14px rgba(244,180,0,0.45)' },
  abandoned: { color: '#9E9E9E', bg: 'rgba(158,158,158,0.1)', label: 'GONE', glow: '0 0 8px rgba(158,158,158,0.2)' },
};

const SeatCard: React.FC<SeatCardProps> = ({ seat, onClick }) => {
  const cfg = statusConfig[seat.status];

  return (
    <MotionBox
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(seat)}
      cursor="pointer"
      bg="#FEFAF5"
      border="1.5px solid"
      borderColor={`${cfg.color}33`}
      borderRadius="4px"
      p={3}
      position="relative"
      overflow="hidden"
      style={{ boxShadow: cfg.glow }}
      transition={{ duration: 0.15 }}
    >
      {/* Status dot top right */}
      <motion.div
        animate={seat.status === 'away' ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1.2, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: cfg.color,
        }}
      />

      <VStack align="flex-start" spacing={1}>
        <Text
          fontSize="1.6rem"
          fontWeight="900"
          letterSpacing="-0.03em"
          color="#2C1A17"
          lineHeight={1}
        >
          {seat.number}
        </Text>
        <Text
          fontSize="8px"
          fontWeight="800"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color={cfg.color}
        >
          {cfg.label}
        </Text>
        <Text
          fontSize="9px"
          fontWeight="500"
          color="#9E8C7E"
          letterSpacing="0.05em"
        >
          Zone {seat.zone}
        </Text>
      </VStack>

      {/* Bottom accent */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="2px"
        bg={cfg.color}
        opacity={0.6}
      />
    </MotionBox>
  );
};

export default SeatCard;
