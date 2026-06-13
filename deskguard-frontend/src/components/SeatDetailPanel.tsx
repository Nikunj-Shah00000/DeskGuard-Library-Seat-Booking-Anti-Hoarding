import React, { useEffect, useState } from 'react';
import {
  Box, VStack, HStack, Text, Button, Divider, Badge, Flex,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Seat, SeatStatus } from '../types';
import { X } from 'lucide-react';

const MotionBox = motion(Box);

interface SeatDetailPanelProps {
  seat: Seat | null;
  onClose: () => void;
  onCheckIn: (seatId: string) => void;
  onGoAway: (seatId: string) => void;
  onCheckOut: (seatId: string) => void;
  currentUserId?: string;
}

const statusConfig = {
  available: { color: '#556B2F', bg: '#F0F4E8', label: 'AVAILABLE', accent: '#556B2F' },
  occupied: { color: '#B23A48', bg: '#FBF0F1', label: 'OCCUPIED', accent: '#B23A48' },
  away: { color: '#D4960A', bg: '#FEF8E7', label: 'AWAY', accent: '#F4B400' },
  abandoned: { color: '#757575', bg: '#F5F5F5', label: 'ABANDONED', accent: '#9E9E9E' },
};

const AwayTimer: React.FC<{ endsAt?: string }> = ({ endsAt }) => {
  const [remaining, setRemaining] = useState('--:--');

  useEffect(() => {
    if (!endsAt) return;
    const calc = () => {
      const diff = new Date(endsAt).getTime() - Date.now();
      if (diff <= 0) { setRemaining('00:00'); return; }
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setRemaining(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [endsAt]);

  return (
    <Text
      fontSize="3.5rem"
      fontWeight="900"
      letterSpacing="-0.04em"
      color="#D4960A"
      lineHeight={1}
      sx={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {remaining}
    </Text>
  );
};

const DeskIllustration: React.FC<{ status: SeatStatus }> = ({ status }) => {
  const colors = {
    available: { desk: '#8D6E63', glow: 'rgba(85,107,47,0.15)', top: '#A1887F' },
    occupied: { desk: '#5D4037', glow: 'rgba(178,58,72,0.15)', top: '#6D4C41' },
    away: { desk: '#7B5E4E', glow: 'rgba(244,180,0,0.2)', top: '#8D6E63' },
    abandoned: { desk: '#757575', glow: 'rgba(150,150,150,0.1)', top: '#9E9E9E' },
  };
  const c = colors[status];

  return (
    <Box w="100%" display="flex" justifyContent="center" py={6}>
      <svg viewBox="0 0 300 180" width="260" height="156" fill="none">
        {/* Glow backdrop */}
        <motion.ellipse
          cx="150" cy="130" rx="100" ry="30"
          fill={c.glow}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Desk top */}
        <motion.rect
          x="30" y="85" width="240" height="14" rx="4"
          fill={c.desk}
          animate={{ y: [85, 83, 85] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Desk front */}
        <rect x="34" y="99" width="232" height="8" rx="2" fill={c.top} opacity={0.6} />
        {/* Legs */}
        <rect x="44" y="107" width="10" height="50" rx="3" fill={c.desk} />
        <rect x="246" y="107" width="10" height="50" rx="3" fill={c.desk} />

        {/* Laptop on desk */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="100" y="50" width="100" height="37" rx="3" fill="#37474F" />
          <rect x="103" y="53" width="94" height="31" rx="2" fill="#263238" />
          {status !== 'abandoned' && (
            <motion.rect
              x="103" y="53" width="94" height="31" rx="2"
              fill="rgba(100,180,255,0.1)"
              animate={{ opacity: [0.05, 0.2, 0.05] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          {/* Lines on screen */}
          {status !== 'abandoned' && [0,1,2].map(i => (
            <rect key={i} x="112" y={60 + i * 7} width={50 + i * 10} height="2" rx="1" fill="rgba(100,200,255,0.3)" />
          ))}
          <rect x="140" y="87" width="20" height="4" rx="1" fill="#455A64" />
        </motion.g>

        {/* QR code on desk */}
        {status === 'available' && (
          <motion.g
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <rect x="60" y="68" width="30" height="30" rx="2" fill="white" stroke="#4E342E" strokeWidth="1.5" />
            {/* Simple QR pattern */}
            {[0,1,2,3].map(r => [0,1,2,3].map(col => (
              <rect key={`${r}-${col}`} x={63+r*6} y={71+col*6} width={4} height={4} rx="0.5"
                fill={Math.random() > 0.4 ? '#4E342E' : 'transparent'} />
            )))}
          </motion.g>
        )}

        {/* Bag on desk if occupied */}
        {status === 'occupied' && (
          <motion.g animate={{ y: [0, -1, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            <rect x="220" y="66" width="36" height="24" rx="4" fill="#6D4C41" />
            <path d="M228 66 Q236 58 244 66" stroke="#5D4037" strokeWidth="2" fill="none" />
          </motion.g>
        )}

        {/* Clock if away */}
        {status === 'away' && (
          <motion.g animate={{ rotate: [0, 360] }} style={{ originX: '230px', originY: '75px' }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}>
            <circle cx="230" cy="75" r="16" fill="none" stroke="#F4B400" strokeWidth="2" />
            <line x1="230" y1="75" x2="230" y2="63" stroke="#F4B400" strokeWidth="2" strokeLinecap="round" />
            <line x1="230" y1="75" x2="238" y2="75" stroke="#F4B400" strokeWidth="2" strokeLinecap="round" />
          </motion.g>
        )}
      </svg>
    </Box>
  );
};

const SeatDetailPanel: React.FC<SeatDetailPanelProps> = ({
  seat, onClose, onCheckIn, onGoAway, onCheckOut,
}) => {
  if (!seat) return null;
  const cfg = statusConfig[seat.status];

  const formatTime = (iso?: string) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDuration = (iso?: string) => {
    if (!iso) return '—';
    const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (mins < 60) return `${mins}m`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  };

  return (
    <AnimatePresence>
      <MotionBox
        key="panel"
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        position="fixed"
        right={0}
        top={0}
        bottom={0}
        w={{ base: '100%', md: '420px' }}
        bg="#FEFAF5"
        borderLeft="1px solid"
        borderColor="rgba(78,52,46,0.12)"
        overflowY="auto"
        zIndex={100}
        boxShadow="-20px 0 60px rgba(78,52,46,0.12)"
      >
        {/* Close button */}
        <Box position="sticky" top={0} bg="#FEFAF5" zIndex={5} borderBottom="1px solid rgba(78,52,46,0.08)" px={6} py={4}>
          <HStack justify="space-between">
            <Text fontSize="9px" fontWeight="800" letterSpacing="0.2em" textTransform="uppercase" color="#9E8C7E">
              Seat Details
            </Text>
            <Box
              as="button"
              onClick={onClose}
              p={2}
              borderRadius="2px"
              _hover={{ bg: 'rgba(78,52,46,0.08)' }}
              cursor="pointer"
            >
              <X size={16} color="#4E342E" />
            </Box>
          </HStack>
        </Box>

        <VStack align="stretch" spacing={0} px={6} pb={10}>
          {/* Big seat number */}
          <Box py={6} borderBottom="1px solid rgba(78,52,46,0.08)">
            <Text
              fontSize="0.7rem"
              fontWeight="800"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="#9E8C7E"
              mb={1}
            >
              SEAT
            </Text>
            <Text
              fontSize="6rem"
              fontWeight="900"
              letterSpacing="-0.05em"
              color="#2C1A17"
              lineHeight={0.9}
            >
              {seat.number}
            </Text>
            <HStack mt={3} spacing={3}>
              <Box
                px={3}
                py={1}
                bg={cfg.bg}
                borderRadius="2px"
                border="1px solid"
                borderColor={`${cfg.color}40`}
              >
                <Text
                  fontSize="10px"
                  fontWeight="800"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                  color={cfg.color}
                >
                  {cfg.label}
                </Text>
              </Box>
              <Text fontSize="xs" color="#9E8C7E" fontWeight="500">
                Zone {seat.zone} — Row {seat.row}
              </Text>
            </HStack>
          </Box>

          {/* Illustration */}
          <DeskIllustration status={seat.status} />

          {/* Away timer if applicable */}
          {seat.status === 'away' && (
            <Box
              py={5}
              px={4}
              bg="#FEF8E7"
              borderRadius="4px"
              border="1px solid rgba(244,180,0,0.3)"
              mb={4}
            >
              <Text fontSize="9px" fontWeight="800" letterSpacing="0.2em" textTransform="uppercase" color="#D4960A" mb={2}>
                Away Time Remaining
              </Text>
              <AwayTimer endsAt={seat.awayEndsAt} />
              <Text fontSize="xs" color="#9E8C7E" mt={1} fontWeight="500">
                Auto-expires at {formatTime(seat.awayEndsAt)}
              </Text>
            </Box>
          )}

          {/* Info rows */}
          <VStack align="stretch" spacing={0} divider={<Box h="1px" bg="rgba(78,52,46,0.06)" />}>
            {[
              { label: 'Last Check-in', value: formatTime(seat.checkedInAt) },
              { label: 'Time at Desk', value: getDuration(seat.checkedInAt) },
              { label: 'Last Activity', value: formatTime(seat.lastActivity) },
              { label: 'Location', value: `Zone ${seat.zone}, Row ${seat.row}` },
            ].map(row => (
              <HStack key={row.label} justify="space-between" py={3}>
                <Text fontSize="xs" fontWeight="600" color="#9E8C7E" letterSpacing="0.05em">
                  {row.label}
                </Text>
                <Text fontSize="xs" fontWeight="700" color="#2C1A17">
                  {row.value}
                </Text>
              </HStack>
            ))}
          </VStack>

          {/* Actions */}
          <VStack align="stretch" spacing={2} mt={6}>
            {seat.status === 'available' && (
              <Button
                bg="#556B2F"
                color="white"
                size="md"
                borderRadius="2px"
                fontWeight="800"
                letterSpacing="0.1em"
                textTransform="uppercase"
                fontSize="xs"
                py={6}
                _hover={{ bg: '#4A5F28', transform: 'translateY(-1px)', boxShadow: '0 8px 24px rgba(85,107,47,0.3)' }}
                onClick={() => onCheckIn(seat.id)}
              >
                Check In Here
              </Button>
            )}
            {seat.status === 'occupied' && (
              <>
                <Button
                  bg="#F4B400"
                  color="#2C1A17"
                  size="md"
                  borderRadius="2px"
                  fontWeight="800"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  fontSize="xs"
                  py={6}
                  _hover={{ bg: '#E6A900', transform: 'translateY(-1px)' }}
                  onClick={() => onGoAway(seat.id)}
                >
                  Go Away (20 min)
                </Button>
                <Button
                  variant="outline"
                  borderColor="#B23A48"
                  color="#B23A48"
                  size="md"
                  borderRadius="2px"
                  fontWeight="800"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  fontSize="xs"
                  py={6}
                  _hover={{ bg: 'rgba(178,58,72,0.06)' }}
                  onClick={() => onCheckOut(seat.id)}
                >
                  Check Out
                </Button>
              </>
            )}
            {seat.status === 'away' && (
              <>
                <Button
                  bg="#556B2F"
                  color="white"
                  size="md"
                  borderRadius="2px"
                  fontWeight="800"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  fontSize="xs"
                  py={6}
                  _hover={{ bg: '#4A5F28', transform: 'translateY(-1px)' }}
                  onClick={() => onCheckIn(seat.id)}
                >
                  I'm Back
                </Button>
              </>
            )}
            {seat.status === 'abandoned' && (
              <Box px={4} py={3} bg="#FBF0F1" borderRadius="4px" border="1px solid rgba(178,58,72,0.2)">
                <Text fontSize="xs" color="#B23A48" fontWeight="600" textAlign="center">
                  Desk auto-released. A librarian has been notified.
                </Text>
              </Box>
            )}
          </VStack>
        </VStack>
      </MotionBox>
    </AnimatePresence>
  );
};

export default SeatDetailPanel;
