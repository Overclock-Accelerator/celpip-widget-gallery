import { VariantLabel } from "./VariantLabel";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type Sitting = {
  city: string;
  centreName?: string;
  date: string;
  time: string;
  seatsLeft?: number | string;
  price?: string;
  ctaHref?: string;
};

export type BookingPanelProps = {
  heading?: string;
  subheading?: string;
  sittings?: Sitting[];
};

// Defaults: realistic mock sittings 2–3 weeks out, $315 CAD.

const defaultSittings: Sitting[] = [
  {
    city: "Toronto",
    centreName: "Paragon Test Centre — Yonge & Bloor",
    date: "Sat May 17",
    time: "9:00 AM",
    seatsLeft: 3,
    price: "$315 CAD",
  },
  {
    city: "Mississauga",
    centreName: "Paragon Test Centre — Square One",
    date: "Sun May 18",
    time: "1:00 PM",
    seatsLeft: 8,
    price: "$315 CAD",
  },
  {
    city: "Vancouver",
    centreName: "Paragon Test Centre — Burrard",
    date: "Sat May 24",
    time: "9:00 AM",
    seatsLeft: "Last 1!",
    price: "$315 CAD",
  },
  {
    city: "Calgary",
    centreName: "Paragon Test Centre — Downtown",
    date: "Sun May 25",
    time: "9:00 AM",
    seatsLeft: 12,
    price: "$315 CAD",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BookingPanelInline — horizontal row of compact cards, one per sitting.
// ─────────────────────────────────────────────────────────────────────────────

export function BookingPanelInline({
  heading = "Book your CELPIP — sittings open this week",
  subheading = "Live seat availability. Secure your spot in under two minutes.",
  sittings = defaultSittings,
}: BookingPanelProps = {}) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h3 className="font-heading text-2xl font-bold text-[#0B2341]">{heading}</h3>
        {subheading && <p className="text-gray-500 mt-1">{subheading}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sittings.map((s, i) => (
          <div
            key={i}
            className="border-2 border-[#0B2341]/10 hover:border-[#00A651] transition-colors rounded-lg p-4 flex flex-col"
          >
            <p className="font-heading text-sm font-bold text-[#00A651] uppercase tracking-wider">
              {s.city}
            </p>
            <p className="font-heading text-lg font-bold text-[#0B2341] mt-1">{s.date}</p>
            <p className="text-gray-600 text-sm">{s.time}</p>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span
                className={
                  typeof s.seatsLeft === "string" || (typeof s.seatsLeft === "number" && s.seatsLeft <= 3)
                    ? "text-[#00A651] font-bold"
                    : "text-gray-500"
                }
              >
                {typeof s.seatsLeft === "string"
                  ? s.seatsLeft
                  : `${s.seatsLeft} seats left`}
              </span>
              {s.price && <span className="text-gray-700 font-semibold">{s.price}</span>}
            </div>
            <button className="mt-4 bg-[#00A651] hover:bg-[#00C764] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
              Book this date
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BookingPanelStacked — vertical list with more detail per sitting.
// ─────────────────────────────────────────────────────────────────────────────

export function BookingPanelStacked({
  heading = "Imminent CELPIP sittings near you",
  subheading = "Pick a date that works. Confirmation arrives in under a minute.",
  sittings = defaultSittings,
}: BookingPanelProps = {}) {
  return (
    <div className="rounded-xl bg-[#0B2341] p-6 md:p-8">
      <div className="mb-6">
        <h3 className="font-heading text-2xl font-bold text-white">{heading}</h3>
        {subheading && <p className="text-gray-300 mt-1">{subheading}</p>}
      </div>
      <ul className="space-y-3">
        {sittings.map((s, i) => {
          const lowSeats =
            typeof s.seatsLeft === "string" ||
            (typeof s.seatsLeft === "number" && s.seatsLeft <= 3);
          return (
            <li
              key={i}
              className="bg-[#153A5C] rounded-lg p-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
            >
              <div className="md:w-1/4">
                <p className="font-heading text-[#17FFDC] text-xs font-bold uppercase tracking-wider">
                  {s.city}
                </p>
                <p className="font-heading text-xl font-bold text-white mt-1">{s.date}</p>
                <p className="text-gray-300 text-sm">{s.time}</p>
              </div>
              <div className="md:flex-1 text-sm text-gray-300">
                {s.centreName && <p className="font-medium text-white">{s.centreName}</p>}
                <p className="text-gray-400 text-xs mt-1">
                  Free parking on-site &middot; Photo ID required &middot; Arrive 30 min early
                </p>
              </div>
              <div className="flex md:flex-col md:items-end gap-3 md:gap-1 items-center justify-between md:justify-center md:w-40">
                <div className="text-right">
                  <p
                    className={`text-xs font-bold uppercase tracking-wider ${
                      lowSeats ? "text-[#00A651]" : "text-gray-300"
                    }`}
                  >
                    {typeof s.seatsLeft === "string"
                      ? s.seatsLeft
                      : `${s.seatsLeft} seats left`}
                  </p>
                  {s.price && <p className="text-white font-semibold mt-0.5">{s.price}</p>}
                </div>
                <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap">
                  Book this date
                </button>
              </div>
            </li>
          );
        })}
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
      <VariantLabel label="A — Inline Date Cards" />
      <BookingPanelInline />

      <VariantLabel label="B — Stacked Detail Rows" />
      <BookingPanelStacked />
    </>
  );
}
