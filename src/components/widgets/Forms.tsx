import { VariantLabel } from "./VariantLabel";

export type FormField = {
  type: "text" | "email" | "tel" | "select" | "textarea";
  placeholder: string;
  options?: string[];
  span?: 1 | 2;
};

export type FormProps = {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  fields?: FormField[];
};

const defaultSimpleLeadFields: FormField[] = [
  { type: "text", placeholder: "Your Name" },
  { type: "email", placeholder: "Email Address" },
  {
    type: "select",
    placeholder: "Select Country",
    options: ["Canada", "India", "Philippines", "UAE", "Australia"],
  },
];

export function FormSimpleLead({
  heading = "Stay Updated",
  subheading = "Get notified about new test dates and prep resources in your area.",
  ctaLabel = "Subscribe",
  fields = defaultSimpleLeadFields,
}: FormProps = {}) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-8 max-w-xl">
      <h3 className="font-heading text-xl font-bold text-[#0B2341] mb-2">{heading}</h3>
      {subheading && <p className="text-gray-500 text-sm mb-6">{subheading}</p>}
      <div className="space-y-3">
        {fields.map((f, i) =>
          f.type === "select" ? (
            <select key={i} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-400">
              <option>{f.placeholder}</option>
              {f.options?.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              key={i}
              type={f.type}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
              placeholder={f.placeholder}
            />
          ),
        )}
        <button className="w-full bg-[#00A651] hover:bg-[#00C764] text-white font-semibold py-3 rounded-lg transition-colors">
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

export function FormInline({
  heading = "Download Free Practice Test",
  subheading = "Enter your email and we'll send it right over.",
  ctaLabel = "Send It",
  fields = [{ type: "email", placeholder: "Your Email" }],
}: FormProps = {}) {
  const firstField = fields[0] ?? { type: "email" as const, placeholder: "Your Email" };
  return (
    <div className="rounded-xl bg-[#0B2341] p-8">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <h3 className="font-heading text-xl font-bold text-white mb-1">{heading}</h3>
          {subheading && <p className="text-gray-400 text-sm">{subheading}</p>}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <input
            type={firstField.type === "select" || firstField.type === "textarea" ? "text" : firstField.type}
            className="flex-1 border border-[#153A5C] bg-[#153A5C] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-400"
            placeholder={firstField.placeholder}
          />
          <button className="bg-[#00A651] hover:bg-[#00C764] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap">
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

const defaultB2BFields: FormField[] = [
  { type: "text", placeholder: "First Name", span: 1 },
  { type: "text", placeholder: "Last Name", span: 1 },
  { type: "email", placeholder: "Work Email", span: 1 },
  { type: "text", placeholder: "Organization", span: 1 },
  {
    type: "select",
    placeholder: "How can we help?",
    options: ["Score acceptance", "Bulk testing", "Partnership inquiry"],
    span: 2,
  },
  { type: "textarea", placeholder: "Additional details...", span: 2 },
];

export function FormB2BContact({
  heading = "Institutional Inquiries",
  subheading = "For organizations interested in using CELPIP scores for admissions or hiring.",
  ctaLabel = "Submit Inquiry",
  fields = defaultB2BFields,
}: FormProps = {}) {
  return (
    <div className="rounded-xl bg-gray-50 border border-gray-200 p-8 max-w-2xl">
      <h3 className="font-heading text-xl font-bold text-[#0B2341] mb-1">{heading}</h3>
      {subheading && <p className="text-gray-500 text-sm mb-6">{subheading}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f, i) => {
          const spanClass = f.span === 2 ? "md:col-span-2" : "";
          if (f.type === "select") {
            return (
              <select
                key={i}
                className={`border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-400 ${spanClass}`}
              >
                <option>{f.placeholder}</option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            );
          }
          if (f.type === "textarea") {
            return (
              <textarea
                key={i}
                className={`border border-gray-300 rounded-lg px-4 py-2.5 text-sm ${spanClass}`}
                rows={3}
                placeholder={f.placeholder}
              />
            );
          }
          return (
            <input
              key={i}
              type={f.type}
              className={`border border-gray-300 rounded-lg px-4 py-2.5 text-sm ${spanClass}`}
              placeholder={f.placeholder}
            />
          );
        })}
        <button className="bg-[#0B2341] hover:bg-[#153A5C] text-white font-semibold py-3 rounded-lg transition-colors md:col-span-2">
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

export function FormVariants() {
  return (
    <>
      <VariantLabel label="A — Simple Lead Capture" />
      <FormSimpleLead />

      <VariantLabel label="B — Inline Horizontal" />
      <FormInline />

      <VariantLabel label="C — Contact Form (B2B)" />
      <FormB2BContact />
    </>
  );
}
