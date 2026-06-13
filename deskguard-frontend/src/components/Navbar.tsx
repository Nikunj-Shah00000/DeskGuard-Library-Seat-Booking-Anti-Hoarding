import React from 'react';
import { Box, HStack, Text, Flex, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Map, BarChart2, User, LogOut } from 'lucide-react';

const MotionBox = motion(Box);

const NavLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ to, icon, label, active, onClick }) => (
  <Box
    as="button"
    onClick={onClick}
    px={3}
    py={2}
    display="flex"
    alignItems="center"
    gap={2}
    borderRadius="2px"
    bg={active ? '#4E342E' : 'transparent'}
    color={active ? '#F5E9DA' : '#6D4C41'}
    transition="all 0.15s"
    _hover={{ bg: active ? '#3E2723' : 'rgba(78,52,46,0.08)', color: '#4E342E' }}
    cursor="pointer"
  >
    <Box opacity={0.9}>{icon}</Box>
    <Text fontSize="10px" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase">
      {label}
    </Text>
  </Box>
);

const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      bg="rgba(250,244,236,0.92)"
      backdropFilter="blur(12px)"
      borderBottom="1px solid rgba(78,52,46,0.1)"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Flex px={{ base: 4, md: 8 }} py={3} align="center" justify="space-between">
        {/* Logo */}
        <HStack spacing={2} cursor="pointer" onClick={() => navigate('/library')}>
          <Box w="8px" h="8px" bg="#556B2F" borderRadius="full" />
          <Text fontWeight="900" fontSize="sm" letterSpacing="0.1em" textTransform="uppercase" color="#2C1A17">
            DeskGuard
          </Text>
        </HStack>

        {/* Nav items */}
        <HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
          <NavLink
            to="/library"
            icon={<Map size={14} />}
            label="Map"
            active={location.pathname === '/library'}
            onClick={() => navigate('/library')}
          />
          {isAdmin && (
            <NavLink
              to="/admin"
              icon={<BarChart2 size={14} />}
              label="Admin"
              active={location.pathname === '/admin'}
              onClick={() => navigate('/admin')}
            />
          )}
          <NavLink
            to="/profile"
            icon={<User size={14} />}
            label="Profile"
            active={location.pathname === '/profile'}
            onClick={() => navigate('/profile')}
          />
        </HStack>

        {/* User + logout */}
        <HStack spacing={3}>
          <Box
            w="8px" h="8px" borderRadius="full" bg="#556B2F"
            as={motion.div as any}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity } as any}
          />
          <Text fontSize="xs" fontWeight="600" color="#6D4C41" display={{ base: 'none', md: 'block' }}>
            {user?.name}
          </Text>
          <Box
            as="button"
            onClick={() => { logout(); navigate('/'); }}
            p={2}
            borderRadius="2px"
            color="#9E8C7E"
            _hover={{ color: '#B23A48', bg: 'rgba(178,58,72,0.06)' }}
            cursor="pointer"
            transition="all 0.15s"
          >
            <LogOut size={14} />
          </Box>
        </HStack>
      </Flex>
    </MotionBox>
  );
};

export default Navbar;
