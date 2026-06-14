import { motion } from "framer-motion";

type SeatStatus = "available" | "occupied" | "away" | "abandoned";

interface Seat {
  id: number;
  number: string;
  zone: string;
  row: number;
  status: SeatStatus;
  studentName?: string | null;
  checkedInAt?: string | null;
  awayEndsAt?: string | null;
}

const statusConfig = {
  available: { color: "#556B2F", bg: "rgba(85,107,47,0.08)", border: "rgba(85,107,47,0.3)", dot: "#556B2F" },
  occupied: { color: "#B23A48", bg: "rgba(178,58,72,0.08)", border: "rgba(178,58,72,0.3)", dot: "#B23A48" },
  away: { color: "#D4960A", bg: "rgba(212,150,10,0.08)", border: "rgba(212,150,10,0.3)", dot: "#D4960A" },
  abandoned: { color: "#9E9E9E", bg: "rgba(158,158,158,0.08)", border: "rgba(158,158,158,0.3)", dot: "#9E9E9E" },
};

interface SeatCardProps {
  seat: Seat;
  onClick: (seat: Seat) => void;
  index: number;
}

export default function SeatCard({ seat, onClick, index }: SeatCardProps) {
  const cfg = statusConfig[seat.status];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.012, duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(seat)}
      data-testid={`seat-card-${seat.id}`}
      className="relative flex flex-col items-center justify-center aspect-square rounded-sm transition-all cursor-pointer focus:outline-none"
      style={{
        background: cfg.bg,
        border: `1.5px solid ${cfg.border}`,
        minHeight: "52px",
      }}
    >
      {/* Status dot */}
      <motion.div
        className="absolute top-1.5 right-1.5 rounded-full"
        style={{ width: 6, height: 6, background: cfg.dot }}
        animate={
          seat.status === "away"
            ? { opacity: [1, 0.3, 1] }
            : seat.status === "abandoned"
            ? { opacity: [1, 0.5, 1] }
            : {}
        }
        transition={
          seat.status === "away" || seat.status === "abandoned"
            ? { duration: 1.5, repeat: Infinity }
            : {}
        }
      />

      {/* Seat number */}
      <span
        className="font-black text-foreground leading-none"
        style={{ fontSize: "1.1rem", letterSpacing: "-0.03em" }}
      >
        {seat.number}
      </span>

      {/* Status micro-label */}
      <span
        className="text-[7px] font-bold tracking-[0.08em] uppercase mt-0.5"
        style={{ color: cfg.color }}
      >
        {seat.status === "available" ? "Free" : seat.status === "occupied" ? "In use" : seat.status === "away" ? "Away" : "Gone"}
      </span>
    </motion.button>
  );
}

export type { Seat, SeatStatus };
