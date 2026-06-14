import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { useLogin, getGetMeQueryKey } from "@workspace/api-client-react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

function StudyRoomIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 420 360" className="w-full max-w-[420px]" fill="none">
        {/* Room background glow */}
        <ellipse cx="210" cy="300" rx="180" ry="40" fill="rgba(78,52,46,0.06)" />

        {/* Desk 1 */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="40" y="160" width="140" height="12" rx="3" fill="#8D6E63" />
          <rect x="44" y="172" width="132" height="6" rx="2" fill="#A1887F" opacity={0.6} />
          <rect x="50" y="178" width="8" height="60" rx="3" fill="#8D6E63" />
          <rect x="164" y="178" width="8" height="60" rx="3" fill="#8D6E63" />
          {/* Laptop */}
          <rect x="80" y="128" width="80" height="34" rx="3" fill="#37474F" />
          <rect x="83" y="131" width="74" height="27" rx="2" fill="#1C313A" />
          <rect x="83" y="131" width="74" height="27" rx="2" fill="rgba(100,200,255,0.08)" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={90} y={137 + i * 6} width={40 + i * 8} height="2" rx="1" fill="rgba(100,200,255,0.25)" />
          ))}
          <rect x="107" y="162" width="16" height="4" rx="1" fill="#455A64" />
        </motion.g>

        {/* Desk 2 */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          <rect x="240" y="140" width="140" height="12" rx="3" fill="#6D4C41" />
          <rect x="244" y="152" width="132" height="6" rx="2" fill="#8D6E63" opacity={0.6} />
          <rect x="250" y="158" width="8" height="70" rx="3" fill="#6D4C41" />
          <rect x="364" y="158" width="8" height="70" rx="3" fill="#6D4C41" />
          {/* Laptop */}
          <rect x="280" y="108" width="80" height="34" rx="3" fill="#37474F" />
          <rect x="283" y="111" width="74" height="27" rx="2" fill="#1C313A" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={290} y={117 + i * 6} width={35 + i * 8} height="2" rx="1" fill="rgba(100,200,255,0.2)" />
          ))}
          <rect x="307" y="142" width="16" height="4" rx="1" fill="#455A64" />
          {/* Bag */}
          <rect x="345" y="120" width="30" height="22" rx="4" fill="#5D4037" />
          <path d="M350 120 Q360 112 370 120" stroke="#4E342E" strokeWidth="2" fill="none" />
        </motion.g>

        {/* Bookshelf */}
        <rect x="0" y="60" width="18" height="160" rx="2" fill="#8D6E63" opacity={0.4} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect
            key={i}
            x="2"
            y={65 + i * 22}
            width="14"
            height="18"
            rx="1"
            fill={["#556B2F", "#B23A48", "#4E342E", "#D4960A", "#6D4C41", "#556B2F", "#B23A48"][i]}
            opacity={0.7}
          />
        ))}

        {/* Plant */}
        <rect x="390" y="200" width="20" height="30" rx="3" fill="#8D6E63" opacity={0.5} />
        <ellipse cx="400" cy="196" rx="22" ry="18" fill="#556B2F" opacity={0.7} />
        <ellipse cx="388" cy="190" rx="14" ry="12" fill="#4A5F28" opacity={0.6} />
        <ellipse cx="412" cy="192" rx="14" ry="11" fill="#4A5F28" opacity={0.5} />

        {/* Floating particles */}
        {[
          { x: 130, y: 80, color: "#556B2F", delay: 0 },
          { x: 290, y: 60, color: "#B23A48", delay: 0.6 },
          { x: 200, y: 40, color: "#D4960A", delay: 1.2 },
          { x: 350, y: 90, color: "#4E342E", delay: 0.3 },
          { x: 80, y: 50, color: "#556B2F", delay: 0.9 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i % 2 === 0 ? 3 : 2}
            fill={p.color}
            animate={{ opacity: [0, 1, 0], y: [0, -8, 0] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: p.delay }}
          />
        ))}

        {/* QR code on desk 1 */}
        <motion.g
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <rect x="56" y="138" width="22" height="22" rx="2" fill="white" stroke="#4E342E" strokeWidth="1" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={59 + r * 6}
                y={141 + c * 6}
                width={4}
                height={4}
                rx="0.5"
                fill={(r + c) % 2 === 0 ? "#4E342E" : "transparent"}
              />
            ))
          )}
        </motion.g>

        {/* Reading lamp */}
        <line x1="390" y1="260" x2="390" y2="200" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" />
        <line x1="390" y1="200" x2="372" y2="172" stroke="#9E9E9E" strokeWidth="3" strokeLinecap="round" />
        <motion.ellipse
          cx="366"
          cy="169"
          rx="10"
          ry="6"
          fill="#F4B400"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.ellipse
          cx="320"
          cy="180"
          rx="40"
          ry="12"
          fill="rgba(244,180,0,0.06)"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

function FloatingLabel({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-card border border-border rounded-sm"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-muted-foreground">{text}</span>
    </motion.div>
  );
}

export default function Login() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const loginMutation = useLogin({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
        setLocation("/library");
      },
    },
  });

  const handleLogin = (isAdmin: boolean) => {
    loginMutation.mutate({ data: { isAdmin } });
  };

  return (
    <div
      className="relative min-h-screen bg-background overflow-hidden"
      data-testid="page-login"
    >
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-16 gap-12 lg:gap-0">
        {/* Left: text + CTAs */}
        <div className="flex-1 flex flex-col justify-center pt-20 lg:pt-0 max-w-xl">
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p
              className="text-[9px] font-extrabold tracking-[0.25em] uppercase text-muted-foreground mb-6"
            >
              Library Seat Management
            </p>

            <h1
              className="font-black uppercase leading-none"
              style={{ letterSpacing: "-0.04em", fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              <span className="block text-foreground">Study</span>
              <span className="block text-foreground">Without</span>
              <span
                className="block"
                style={{ color: "#B23A48" }}
              >
                Hoarding.
              </span>
            </h1>

            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-6 max-w-sm"
            >
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                Real-time seat tracking for university libraries.
                Anti-hoarding with auto-release timers. Fair access for everyone.
              </p>
            </MotionDiv>
          </MotionDiv>

          {/* CTA buttons */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="flex flex-col gap-3 mt-10 max-w-xs"
          >
            <button
              onClick={() => handleLogin(false)}
              disabled={loginMutation.isPending}
              data-testid="button-google-login"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-foreground text-background text-xs font-extrabold tracking-[0.1em] uppercase rounded-sm transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
              style={{
                boxShadow: "0 8px 30px rgba(44,26,23,0.25)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
                <path fill="#4A90D9" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
                <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z" />
              </svg>
              {loginMutation.isPending ? "Signing in..." : "Continue with Google"}
            </button>

            <button
              onClick={() => handleLogin(true)}
              data-testid="button-admin-login"
              className="text-xs font-bold tracking-[0.1em] uppercase text-accent py-2 hover:underline transition-all text-left"
              style={{ color: "#556B2F" }}
            >
              Sign in as Admin
            </button>
          </MotionDiv>

          {/* Stats row */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="flex items-center gap-6 mt-12"
          >
            {[
              { n: "60", label: "Total Seats" },
              { n: "20min", label: "Away Limit" },
              { n: "2hr", label: "Auto-Expire" },
            ].map((stat, i) => (
              <div key={stat.n} className={`flex flex-col ${i > 0 ? "pl-6 border-l border-border" : ""}`}>
                <span className="text-2xl font-black text-foreground leading-none" style={{ letterSpacing: "-0.03em" }}>
                  {stat.n}
                </span>
                <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-muted-foreground mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="flex gap-3 mt-6 flex-wrap"
          >
            <FloatingLabel text="Live Tracking" delay={2.5} />
            <FloatingLabel text="Anti-Hoarding" delay={2.7} />
            <FloatingLabel text="Auto-Release" delay={2.9} />
          </MotionDiv>
        </div>

        {/* Right: illustration */}
        <MotionDiv
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex-1 flex items-center justify-center w-full lg:max-w-lg"
          style={{ minHeight: "360px" }}
        >
          <StudyRoomIllustration />
        </MotionDiv>
      </div>

      {/* Scroll hint */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-5 bg-border"
        />
      </MotionDiv>
    </div>
  );
}
