import { useState } from "react";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListSeats,
  useGetStats,
  useListActivity,
  getListSeatsQueryKey,
  getGetStatsQueryKey,
  getListActivityQueryKey,
} from "@workspace/api-client-react";
import Navbar from "@/components/Navbar";
import SeatCard, { type Seat } from "@/components/SeatCard";
import SeatDetailPanel from "@/components/SeatDetailPanel";

const STATUS_COLORS: Record<string, string> = {
  available: "#556B2F",
  occupied: "#B23A48",
  away: "#D4960A",
  abandoned: "#9E9E9E",
};

function ZoneLegend() {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {[
        { color: "#556B2F", label: "Available" },
        { color: "#B23A48", label: "Occupied" },
        { color: "#D4960A", label: "Away" },
        { color: "#9E9E9E", label: "Abandoned" },
      ].map((l) => (
        <div key={l.label} className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
          <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-muted-foreground">{l.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function LibraryMap() {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  const { data: seats = [], isLoading: seatsLoading } = useListSeats({
    query: { queryKey: getListSeatsQueryKey(), refetchInterval: 30000 },
  });

  const { data: stats } = useGetStats({ query: { queryKey: getGetStatsQueryKey(), refetchInterval: 30000 } });
  const { data: activity = [] } = useListActivity({ query: { queryKey: getListActivityQueryKey(), refetchInterval: 15000 } });

  const zones = ["A", "B", "C", "D"];

  const handleSeatClick = (seat: Seat) => {
    setSelectedSeat(seat);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-library">
      <Navbar />
      <div className="px-4 md:px-8 lg:px-12 pt-20 pb-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-[9px] font-extrabold tracking-[0.25em] uppercase text-muted-foreground mb-2">
            Library Seat Map
          </p>
          <div className="flex items-end gap-6 flex-wrap">
            <h1
              className="font-black uppercase leading-none text-foreground"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.04em" }}
            >
              Study
            </h1>
            <h1
              className="font-black uppercase leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.04em", color: "#556B2F" }}
            >
              Freely.
            </h1>
          </div>
        </motion.div>

        {/* Quick stats */}
        {stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
          >
            {[
              { value: stats.available, label: "Available", color: "#556B2F", bg: "rgba(85,107,47,0.08)" },
              { value: stats.occupied, label: "Occupied", color: "#B23A48", bg: "rgba(178,58,72,0.08)" },
              { value: stats.away, label: "Away", color: "#D4960A", bg: "rgba(212,150,10,0.08)" },
              { value: stats.abandoned, label: "Abandoned", color: "#9E9E9E", bg: "rgba(158,158,158,0.08)" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="rounded-sm p-4 border"
                style={{ background: s.bg, borderColor: s.color + "40" }}
                data-testid={`stat-${s.label.toLowerCase()}`}
              >
                <span
                  className="font-black leading-none block"
                  style={{ fontSize: "2.5rem", letterSpacing: "-0.04em", color: s.color }}
                >
                  {s.value}
                </span>
                <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-muted-foreground mt-1 block">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Seat grid */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <ZoneLegend />
              <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-muted-foreground">
                {stats?.occupancyRate ?? 0}% Occupied
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {zones.map((zone) => {
                const zoneSeats = seats.filter((s) => s.zone === zone);
                return (
                  <motion.div
                    key={zone}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: zones.indexOf(zone) * 0.1 }}
                    className="bg-card border border-border rounded-sm p-4"
                    data-testid={`zone-${zone}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-muted-foreground">
                        Zone {zone}
                      </span>
                      <span className="text-[9px] font-bold text-muted-foreground">
                        {zoneSeats.filter((s) => s.status === "available").length} free
                      </span>
                    </div>

                    {seatsLoading ? (
                      <div className="grid grid-cols-5 gap-1.5">
                        {Array.from({ length: 15 }).map((_, i) => (
                          <div key={i} className="aspect-square bg-muted rounded-sm animate-pulse" />
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-5 gap-1.5">
                        {zoneSeats.map((seat, i) => (
                          <SeatCard
                            key={seat.id}
                            seat={seat as Seat}
                            onClick={handleSeatClick}
                            index={i}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Activity feed */}
          <div className="xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card border border-border rounded-sm p-5 sticky top-20"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-extrabold tracking-[0.2em] uppercase text-muted-foreground">
                  Live Activity
                </span>
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#556B2F" }}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              </div>

              <div className="flex flex-col divide-y divide-border" data-testid="activity-feed">
                {activity.slice(0, 8).map((evt, i) => (
                  <motion.div
                    key={evt.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="py-3 flex items-start justify-between gap-2"
                    data-testid={`activity-event-${evt.id}`}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: STATUS_COLORS[evt.type] ?? "#9E9E9E" }}
                      />
                      <div>
                        <p className="text-xs font-bold text-foreground leading-tight">
                          Seat {evt.seatNumber} — {evt.event}
                        </p>
                        {evt.student && (
                          <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{evt.student}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-[9px] text-muted-foreground font-semibold flex-shrink-0">{evt.timestamp}</span>
                  </motion.div>
                ))}

                {activity.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-xs text-muted-foreground font-medium">No recent activity</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <SeatDetailPanel seat={selectedSeat} onClose={() => setSelectedSeat(null)} />

      {/* Overlay */}
      {selectedSeat && (
        <div
          className="fixed inset-0 bg-foreground/10 z-40 backdrop-blur-sm"
          onClick={() => setSelectedSeat(null)}
        />
      )}
    </div>
  );
}
