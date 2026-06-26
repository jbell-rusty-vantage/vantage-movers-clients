"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { cn } from "@vantage/utils";
import { parseIsoDate, startOfToday, toIsoDate } from "./date-utils";
import "./move-date-picker.css";

export type MoveDatePickerVariant = "clients" | "main-site";

export interface MoveDatePickerProps {
  id?: string;
  /** ISO date string (YYYY-MM-DD) */
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onOpen?: () => void;
  placeholder?: string;
  hasError?: boolean;
  variant?: MoveDatePickerVariant;
  className?: string;
  disabled?: boolean;
}

interface PopoverCoords {
  top: number;
  left: number;
  width: number;
}

function CalendarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function MoveDatePicker({
  id,
  value,
  onChange,
  onBlur,
  onOpen,
  placeholder = "Select move date",
  hasError = false,
  variant = "clients",
  className,
  disabled = false,
}: MoveDatePickerProps) {
  const fallbackId = useId();
  const triggerId = id ?? fallbackId;
  const rootRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<PopoverCoords | null>(null);
  const [month, setMonth] = useState<Date>(() => parseIsoDate(value) ?? startOfToday());

  const selected = parseIsoDate(value);
  const displayValue = selected ? format(selected, "MMM d, yyyy") : "";
  const today = startOfToday();
  const calendarStartMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const calendarEndMonth = new Date(today.getFullYear() + 3, 11, 1);

  useEffect(() => {
    if (selected) {
      setMonth(selected);
    }
  }, [value, selected]);

  useEffect(() => {
    if (!open || !rootRef.current) {
      setCoords(null);
      return;
    }

    function updateCoords() {
      const trigger = rootRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8,
        left: rect.left,
        width: Math.min(rect.width, 320),
      });
    }

    updateCoords();
    window.addEventListener("resize", updateCoords);
    window.addEventListener("scroll", updateCoords, true);
    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: Event) {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || popoverRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
      onBlur?.();
    }

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        onBlur?.();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onBlur]);

  function openCalendar() {
    if (disabled) return;
    if (!open) {
      onOpen?.();
    }
    setOpen(true);
  }

  function handleSelect(date: Date | undefined) {
    if (!date) return;
    onChange(toIsoDate(date));
    setOpen(false);
    onBlur?.();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCalendar();
    }
    if (event.key === "ArrowDown" && !open) {
      event.preventDefault();
      openCalendar();
    }
  }

  return (
    <div
      ref={rootRef}
      className={cn("vdp", className)}
      data-variant={variant}
      data-open={open ? "true" : "false"}
      data-error={hasError ? "true" : "false"}
    >
      <button
        type="button"
        id={triggerId}
        className="vdp__trigger"
        onClick={openCalendar}
        onKeyDown={handleTriggerKeyDown}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={displayValue ? `Move date: ${displayValue}` : placeholder}
      >
        <span className={cn("vdp__value", !displayValue && "vdp__value--placeholder")}>
          {displayValue || placeholder}
        </span>
        <span className="vdp__icon">
          <CalendarIcon />
        </span>
      </button>

      {open &&
        coords &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={popoverRef}
            className="vdp__popover vdp__popover--portal"
            data-variant={variant}
            role="dialog"
            aria-label="Choose move date"
            style={{
              top: coords.top,
              left: coords.left,
              width: coords.width,
            }}
          >
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={handleSelect}
              month={month}
              onMonthChange={setMonth}
              captionLayout="dropdown"
              hideNavigation
              startMonth={calendarStartMonth}
              endMonth={calendarEndMonth}
              disabled={{ before: today }}
              showOutsideDays
              classNames={{
                root: "vdp__calendar",
                months: "vdp__months",
                month: "vdp__month",
                month_caption: "vdp__caption",
                caption_label: "vdp__caption-label",
                dropdowns: "vdp__dropdowns",
                dropdown_root: "vdp__dropdown-root",
                dropdown: "vdp__dropdown",
                months_dropdown: "vdp__dropdown vdp__dropdown--month",
                years_dropdown: "vdp__dropdown vdp__dropdown--year",
                month_grid: "vdp__grid",
                weekdays: "vdp__weekdays",
                weekday: "vdp__weekday",
                weeks: "vdp__weeks",
                week: "vdp__week",
                day: "vdp__day",
                day_button: "vdp__day-btn",
                selected: "vdp__day-btn--selected",
                today: "vdp__day-btn--today",
                outside: "vdp__day-btn--outside",
                disabled: "vdp__day-btn--disabled",
              }}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
