import { VariantLabel } from "./VariantLabel";

// ─────────────────────────────────────────────────────────────────────────────
// Types — a "Sitting" is one bookable test session at a specific centre.
// ─────────────────────────────────────────────────────────────────────────────

export type Sitting = {
  city: string;
  centreName?: string;
  date: string;
  time: string;
  seatsLeft?: number;
  price?: string;
  ctaHref?: string;
  address?: string;
  parkingNote?: string;
};

export type BookingPanelProps = {
  heading?: string;
  subheading?: string;
  sittings?: Sitting[];
};

// Realistic mock sittings 2-3 weeks out, $315 CAD.
const defaultSittings: Sitting[] = [
  {
    city: "Toronto",
    centreName: "Toronto — Yonge & Eglinton",
    date: "Sat, May 17",
    time: "9:00 AM",
    seatsLeft: 8,
    price: "$315 CAD",
    address: "2300 Yonge St, Suite 1600, Toronto",
    parkingNote: "Underground parking available — $12 flat rate.",
  },
  {
    city: "Mississauga",
    centreName: "Mississauga — Square One",
    date: "Sun, May 18",
    time: "1:00 PM",
    seatsLeft: 3,
    price: "$315 CAD",
    address: "100 City Centre Dr, Mississauga",
    parkingNote: "Free parking in the Square One garage (Level P2).",
  },
  {
    city: "Vancouver",
    centreName: "Vancouver — Downtown",
    date: "Sat, May 24",
    time: "9:30 AM",
    seatsLeft: 1,
    price: "$315 CAD",
    address: "550 Robson St, Vancouver",
    parkingNote: "Transit recommended — Vancouver City Centre Station 2 min walk.",
  },
  {
    city: "Calgary",
    centreName: "Calgary — Beltline",
    date: "Sun, May 25",
    time: "10:00 AM",
    seatsLeft: 12,
    price: "$315 CAD",
    address: "1100 — 1st St SW, Calgary",
    parkingNote: "Street parking and nearby paid lots available.",
  },
];

function seatsBadge(seatsLeft?: number) {
  if (seatsLeft === undefined) return null;
  const isLast = seatsLeft <= 1;
  const isLow = seatsLeft <= 3;
  const text = isLast ? "Last 1!" : `${seatsLeft} seats left`;
  const cls = isLast
    ? "bg-[#FFBD17] text-[#0B2341]"
    : isLow
      ? "bg-[#00A651] text-white"
      : "bg-[#0B2341]/10 text-[#0B2341]";
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${cls}`}>
      {text}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BookingPanelInline — horizontal row of 3-4 cards with strong "Book" CTA.
// ─────────────────────────────────────────────────────────────────────────────

export function BookingPanelInline({
  heading = "Book your CELPIP test",
  subheading = "Open sittings in the next two weeks. Reserve your seat now — most centres fill within 7 days.",
  sittings = defaultSittings,
}: BookingPanelProps = {}) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h3 className="font-heading text-2xl font-bold text-[#0B2341]">{heading}</h3>
        {subheading && <p className="text-gray-500 mt-1 text-sm">{subheading}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sittings.map((s, i) => (
          <div
            key={i}
            className="border border-[#0B2341]/15 rounded-lg p-5 flex flex-col bg-gray-50 hover:border-[#00A651] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="font-heading font-bold text-[#0B2341] text-base leading-tight">
                {s.city}
              </p>
              {seatsBadge(s.seatsLeft)}
            </div>
            <p className="font-heading text-lg text-[#0B2341] font-semibold leading-tight">
              {s.date}
            </p>
            <p className="text-gray-500 text-sm mb-3">{s.time}</p>
            {s.price && (
              <p className="text-gray-600 text-sm mb-4">
                <span className="font-semibold text-[#0B2341]">{s.price}</span>
              </p>
            )}
            <button className="mt-auto w-full bg-[#00A651] hover:bg-[#00C764] text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
              Book this date
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BookingPanelStacked — vertical list with more detail per row.
// ─────────────────────────────────────────────────────────────────────────────

export function BookingPanelStacked({
  heading = "Available test sittings",
  subheading = "Pick the date and centre that works for you. Booking is confirmed instantly with payment.",
  sittings = defaultSittings,
}: BookingPanelProps = {}) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h3 className="font-heading text-2xl font-bold text-[#0B2341]">{heading}</h3>
        {subheading && <p className="text-gray-500 mt-1 text-sm">{subheading}</p>}
      </div>
      <ul className="divide-y divide-gray-200">
        {sittings.map((s, i) => (
          <li
            key={i}
            className="py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <p className="font-heading font-bold text-[#0B2341] text-lg">
                  {s.centreName ?? s.city}
                </p>
                {seatsBadge(s.seatsLeft)}
              </div>
              <p className="font-heading text-[#0B2341] text-base font-semibold">
                {s.date} <span className="text-gray-500 font-normal">at {s.time}</span>
              </p>
              {s.address && (
                <p className="text-gray-500 text-sm mt-1">{s.address}</p>
              )}
              {s.parkingNote && (
                <p className="text-gray-400 text-xs mt-1 italic">{s.parkingNote}</p>
              )}
            </div>
            <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-2 md:shrink-0">
              {s.price && (
                <p className="font-heading font-bold text-[#0B2341]">{s.price}</p>
              )}
              <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap">
                Book this date
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BookingPanelVariants — gallery showcase
// ─────────────────────────────────────────────────────────────────────────────

export function BookingPanelVariants() {
  return (
    <>
      <VariantLabel label="A — Inline Card Row" />
      <BookingPanelInline />

      <VariantLabel label="B — Stacked Detailed List" />
      <BookingPanelStacked />
    </>
  );
}
