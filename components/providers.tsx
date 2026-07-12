"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import type { OrderMode } from "@/lib/data";
import { OrderModal } from "@/components/order-modal";

export type OrderPreset = { kg?: number; mode?: OrderMode };

type Toast = { id: number; message: string; kind: "success" | "error" };

type AppContextValue = {
  openOrder: (preset?: OrderPreset) => void;
  toast: (message: string, kind?: Toast["kind"]) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <AppProviders>");
  return ctx;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [orderOpen, setOrderOpen] = useState(false);
  const [preset, setPreset] = useState<OrderPreset>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const openOrder = useCallback((p?: OrderPreset) => {
    setPreset(p ?? {});
    setOrderOpen(true);
  }, []);

  const toast = useCallback((message: string, kind: Toast["kind"] = "success") => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, message, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);

  return (
    <AppContext.Provider value={{ openOrder, toast }}>
      {children}

      <OrderModal open={orderOpen} preset={preset} onClose={() => setOrderOpen(false)} />

      {/* Toasts */}
      <div className="pointer-events-none fixed inset-x-0 top-20 z-[1200] flex flex-col items-center gap-2 px-4">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium shadow-lg backdrop-blur ${
                t.kind === "success"
                  ? "bg-deep/95 text-white"
                  : "bg-ember/95 text-white"
              }`}
            >
              {t.kind === "success" ? (
                <CheckCircle2 className="size-4 shrink-0 text-brand-bright" />
              ) : (
                <AlertTriangle className="size-4 shrink-0 text-gold" />
              )}
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}
