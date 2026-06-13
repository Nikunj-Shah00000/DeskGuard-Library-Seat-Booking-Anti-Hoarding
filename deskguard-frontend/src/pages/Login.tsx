import React, { useEffect, useRef } from 'react';
import { Box, Button, VStack, Text, HStack, Flex } from '@chakra-ui/react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const words = ['EVERY', 'SEAT.', 'EVERY', 'STUDENT.', 'FAIRLY.'];

const WordReveal: React.FC<{ word: string; delay: number; color?: string }> = ({ word, delay, color = '#2C1A17' }) => {
  return (
    <MotionBox
      overflow="hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.1 }}
    >
      <MotionBox
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Text
          fontSize={{ base: '13vw', md: '10vw', lg: '8vw' }}
          fontWeight="900"
          letterSpacing="-0.04em"
          lineHeight="0.92"
          textTransform="uppercase"
          color={color}
          userSelect="none"
        >
          {word}
        </Text>
      </MotionBox>
    </MotionBox>
  );
};

const FloatingLabel: React.FC<{ text: string; x: string; y: string; delay: number }> = ({ text, x, y, delay }) => (
  <MotionBox
    position="absolute"
    left={x}
    top={y}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 0.4, scale: 1 }}
    transition={{ delay, duration: 1 }}
  >
    <Text
      fontSize="xs"
      fontWeight="700"
      letterSpacing="0.2em"
      textTransform="uppercase"
      color="#556B2F"
      border="1px solid"
      borderColor="#556B2F"
      px={2}
      py={1}
    >
      {text}
    </Text>
  </MotionBox>
);

const AnimatedStudyRoom: React.FC = () => {
  return (
    <MotionBox
      position="absolute"
      right={{ base: '-10%', lg: '3%' }}
      top="50%"
      transform="translateY(-50%)"
      width={{ base: '55vw', lg: '42vw' }}
      opacity={0.85}
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 0.85 }}
      transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg viewBox="0 0 480 520" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Room perspective floor */}
        <motion.path
          d="M40 420 L240 340 L440 420 L440 520 L40 520 Z"
          fill="#E8D5BC"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        />
        {/* Back wall */}
        <rect x="40" y="80" width="400" height="340" fill="#F0E4D0" />
        {/* Window */}
        <motion.rect
          x="140" y="100" width="200" height="140" rx="4"
          fill="#B8D4E8"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <rect x="140" y="100" width="200" height="140" rx="4" fill="none" stroke="#9BB8CC" strokeWidth="3" />
        {/* Window cross */}
        <line x1="240" y1="100" x2="240" y2="240" stroke="#9BB8CC" strokeWidth="2" />
        <line x1="140" y1="170" x2="340" y2="170" stroke="#9BB8CC" strokeWidth="2" />
        {/* Window glow */}
        <motion.ellipse
          cx="240" cy="170" rx="70" ry="50"
          fill="rgba(200,220,240,0.3)"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Desk */}
        <motion.rect
          x="100" y="310" width="280" height="14" rx="3"
          fill="#6D4C41"
          animate={{ y: [310, 308, 310] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Desk legs */}
        <rect x="110" y="324" width="10" height="80" rx="2" fill="#5D4037" />
        <rect x="360" y="324" width="10" height="80" rx="2" fill="#5D4037" />
        {/* Desk surface items */}
        {/* Laptop */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="180" y="278" width="120" height="80" rx="4" fill="#37474F" />
          <rect x="185" y="283" width="110" height="70" rx="2" fill="#263238" />
          <motion.rect
            x="185" y="283" width="110" height="70" rx="2"
            fill="rgba(100,180,255,0.15)"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Screen glow lines */}
          <rect x="195" y="295" width="70" height="3" rx="1" fill="rgba(100,200,255,0.4)" />
          <rect x="195" y="303" width="55" height="3" rx="1" fill="rgba(100,200,255,0.3)" />
          <rect x="195" y="311" width="65" height="3" rx="1" fill="rgba(100,200,255,0.35)" />
          <rect x="195" y="319" width="40" height="3" rx="1" fill="rgba(100,200,255,0.25)" />
          {/* Base */}
          <rect x="220" y="308" width="40" height="6" rx="2" fill="#455A64" />
        </motion.g>
        
        {/* Books stack */}
        <rect x="130" y="294" width="35" height="18" rx="2" fill="#B23A48" />
        <rect x="128" y="279" width="35" height="18" rx="2" fill="#556B2F" />
        <rect x="130" y="265" width="35" height="17" rx="2" fill="#F4B400" />
        
        {/* Coffee mug */}
        <motion.g
          animate={{ rotate: [-1, 1, -1] }}
          style={{ originX: '350px', originY: '300px' }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <rect x="340" y="285" width="22" height="25" rx="3" fill="#8D6E63" />
          <rect x="342" y="287" width="18" height="12" rx="1" fill="rgba(200,100,50,0.5)" />
          <path d="M362 293 Q372 293 372 300 Q372 307 362 307" stroke="#8D6E63" strokeWidth="3" fill="none" />
          {/* Steam */}
          <motion.path
            d="M348 282 Q350 276 348 270"
            stroke="rgba(200,200,200,0.5)" strokeWidth="1.5" fill="none"
            animate={{ opacity: [0, 0.6, 0], y: [0, -5, -10] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.path
            d="M354 280 Q356 274 354 268"
            stroke="rgba(200,200,200,0.5)" strokeWidth="1.5" fill="none"
            animate={{ opacity: [0, 0.6, 0], y: [0, -5, -10] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          />
        </motion.g>

        {/* Bookshelf on wall */}
        <rect x="55" y="120" width="70" height="140" rx="2" fill="#795548" />
        <rect x="57" y="125" width="66" height="30" rx="1" fill="#5D4037" />
        {/* Shelf books */}
        {[0,1,2,3].map(i => (
          <motion.rect
            key={i}
            x={61 + i * 15} y={128} width={12} height={24} rx="1"
            fill={['#B23A48','#556B2F','#F4B400','#4E342E'][i]}
            animate={{ y: [128, 126, 128] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        <rect x="57" y="165" width="66" height="30" rx="1" fill="#5D4037" />
        {[0,1,2,3].map(i => (
          <motion.rect
            key={i}
            x={61 + i * 15} y={168} width={12} height={24} rx="1"
            fill={['#4E342E','#B23A48','#556B2F','#F4B400'][i]}
            animate={{ y: [168, 166, 168] }}
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.4 + 0.5 }}
          />
        ))}

        {/* Chair */}
        <motion.g
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ellipse cx="240" cy="408" rx="55" ry="12" fill="#4E342E" />
          <rect x="185" y="395" width="110" height="16" rx="4" fill="#6D4C41" />
          <rect x="208" y="411" width="8" height="50" rx="3" fill="#5D4037" />
          <rect x="264" y="411" width="8" height="50" rx="3" fill="#5D4037" />
          <ellipse cx="212" cy="461" rx="14" ry="5" fill="#4E342E" />
          <ellipse cx="268" cy="461" rx="14" ry="5" fill="#4E342E" />
          {/* Chair back */}
          <rect x="190" y="345" width="100" height="52" rx="8" fill="#5D4037" />
          <rect x="186" y="390" width="8" height="12" rx="2" fill="#4E342E" />
          <rect x="286" y="390" width="8" height="12" rx="2" fill="#4E342E" />
        </motion.g>

        {/* Desk lamp */}
        <motion.g
          animate={{ rotate: [-2, 2, -2] }}
          style={{ originX: '390px', originY: '310px' }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="385" y="300" width="10" height="14" rx="2" fill="#757575" />
          <line x1="390" y1="300" x2="370" y2="265" stroke="#757575" strokeWidth="4" strokeLinecap="round" />
          <line x1="370" y1="265" x2="395" y2="240" stroke="#757575" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="402" cy="238" rx="14" ry="8" fill="#F4B400" />
          <motion.ellipse
            cx="395" cy="268" rx="30" ry="20"
            fill="rgba(244, 180, 0, 0.12)"
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.g>
      </svg>
    </MotionBox>
  );
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (asAdmin = false) => {
    login(asAdmin);
    navigate('/library');
  };

  return (
    <Box minH="100vh" position="relative" overflow="hidden" bg="#FAF4EC">
      {/* Top bar */}
      <MotionBox
        position="fixed"
        top={0}
        left={0}
        right={0}
        px={{ base: 6, md: 10 }}
        py={5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        zIndex={10}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <HStack spacing={2} alignItems="center">
          <Box w="10px" h="10px" bg="#556B2F" borderRadius="full" />
          <Text fontWeight="800" fontSize="sm" letterSpacing="0.15em" textTransform="uppercase" color="#2C1A17">
            DeskGuard
          </Text>
        </HStack>
        <HStack spacing={6}>
          <Text fontSize="xs" fontWeight="600" letterSpacing="0.12em" textTransform="uppercase" color="#6D4C41" opacity={0.7}>
            Library Management
          </Text>
        </HStack>
      </MotionBox>

      {/* Main hero */}
      <Flex
        minH="100vh"
        px={{ base: 8, md: 14, lg: 20 }}
        pt="120px"
        pb="60px"
        alignItems="flex-start"
        position="relative"
      >
        {/* Left: huge kinetic type */}
        <VStack align="flex-start" spacing={0} maxW={{ base: '100%', lg: '55%' }} zIndex={2}>
          <WordReveal word="EVERY" delay={0.3} />
          <WordReveal word="SEAT." delay={0.5} color="#556B2F" />
          <Box h={4} />
          <WordReveal word="EVERY" delay={0.7} />
          <WordReveal word="STUDENT." delay={0.9} color="#4E342E" />
          <Box h={4} />
          <WordReveal word="FAIRLY." delay={1.1} color="#B23A48" />

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            mt={10}
          >
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color="#6D4C41"
              maxW="380px"
              lineHeight={1.7}
              fontWeight="500"
            >
              No more bag-hoarding. No more ghost desks. Real-time library seat tracking with smart anti-abandonment timers.
            </Text>
          </MotionBox>

          {/* CTA buttons */}
          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.7 }}
            mt={8}
          >
            <VStack align="flex-start" spacing={3}>
              <Button
                size="lg"
                bg="#4E342E"
                color="#F5E9DA"
                px={10}
                py={7}
                fontSize="sm"
                fontWeight="800"
                letterSpacing="0.12em"
                borderRadius="2px"
                _hover={{
                  bg: '#3E2723',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(78,52,46,0.35)',
                }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.2s"
                onClick={() => handleLogin(false)}
              >
                <HStack spacing={3}>
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                    <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
                    <path fill="#4A90D9" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
                    <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
                  </svg>
                  <span>Continue with Google</span>
                </HStack>
              </Button>

              <Button
                size="sm"
                variant="ghost"
                color="#556B2F"
                fontWeight="700"
                letterSpacing="0.1em"
                textTransform="uppercase"
                fontSize="xs"
                _hover={{ bg: 'rgba(85,107,47,0.08)' }}
                onClick={() => handleLogin(true)}
              >
                Sign in as Admin →
              </Button>
            </VStack>
          </MotionBox>

          {/* Stats row */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            mt={14}
          >
            <HStack spacing={8} divider={<Box w="1px" h="30px" bg="#C8B9A8" />}>
              {[
                { n: '60', label: 'Total Seats' },
                { n: '20min', label: 'Away Limit' },
                { n: '2hr', label: 'Auto-Expire' },
              ].map(stat => (
                <VStack key={stat.n} spacing={0} align="flex-start">
                  <Text fontSize="2xl" fontWeight="900" color="#4E342E" lineHeight={1}>{stat.n}</Text>
                  <Text fontSize="9px" fontWeight="700" letterSpacing="0.15em" textTransform="uppercase" color="#9E8C7E">{stat.label}</Text>
                </VStack>
              ))}
            </HStack>
          </MotionBox>
        </VStack>

        {/* Right: animated study room illustration */}
        <AnimatedStudyRoom />

        {/* Floating labels */}
        <FloatingLabel text="Live Tracking" x="5%" y="75%" delay={2.5} />
        <FloatingLabel text="Anti-Hoarding" x="38%" y="88%" delay={2.7} />
      </Flex>

      {/* Bottom scroll hint */}
      <MotionBox
        position="fixed"
        bottom={8}
        left="50%"
        style={{ translateX: '-50%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <VStack spacing={1}>
          <Text fontSize="9px" fontWeight="700" letterSpacing="0.2em" textTransform="uppercase" color="#9E8C7E">
            Scroll to explore
          </Text>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 1, height: 20, background: '#C8B9A8', margin: '0 auto' }}
          />
        </VStack>
      </MotionBox>
    </Box>
  );
};

export default Login;
