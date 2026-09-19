"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Alert,
  Badge,
  Breadcrumbs,
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  LinkUrlInput,
  Otp,
  Radio,
  TextArea,
  Toggle,
  toast,
} from "mybharat-react-library";
import { CATEGORIES, OPPORTUNITIES, STATES } from "@/lib/data";
import { TickCircle } from "@/components/Icons";

const ReqMark = () => (
  <span aria-hidden className="ml-0.5 text-[color:var(--error)]">
    *
  </span>
);

const STEPS = ["Personal Details", "Interests & Motivation", "Verify & Submit"] as const;

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  dob: Date | null;
  gender: string;
  state: string | number | null;
  interests: string[];
  immediateAvailability: boolean;
  motivation: string;
  portfolio: string;
  termsAccepted: boolean;
  updatesConsent: boolean;
}

const INITIAL: FormState = {
  fullName: "",
  email: "",
  phone: "",
  dob: null,
  gender: "female",
  state: null,
  interests: [],
  immediateAvailability: true,
  motivation: "",
  portfolio: "",
  termsAccepted: false,
  updatesConsent: true,
};

function RegisterForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("opportunity");
  const preselectedMission = OPPORTUNITIES.find((o) => o.id === preselected);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validateStep = (current: number): boolean => {
    const e: Record<string, string> = {};
    if (current === 0) {
      if (form.fullName.trim().length < 3) e.fullName = "Enter your full name";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
        e.email = "Enter a valid email address";
      if (!/^\d{10}$/.test(form.phone))
        e.phone = "Enter a 10-digit mobile number";
      if (!form.dob) e.dob = "Select your date of birth";
      if (!form.state) e.state = "Select your state";
    }
    if (current === 1) {
      if (form.interests.length === 0)
        e.interests = "Pick at least one focus area";
      if (form.motivation.trim().length < 20)
        e.motivation = "Tell us a little more (min 20 characters)";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) {
      toast.error({ title: "Please fix the highlighted fields" });
      return;
    }
    if (step === 1 && !otpSent) {
      setOtpSent(true);
      toast.info({
        title: "OTP sent",
        description: `A 6-digit code was sent to +91 ${form.phone} (demo: use 123456).`,
      });
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const submit = () => {
    if (otp.replace(/\D/g, "").length !== 6) {
      toast.error({ title: "Enter the 6-digit OTP to continue" });
      return;
    }
    if (!form.termsAccepted) {
      toast.error({ title: "Accept the volunteer code of conduct" });
      return;
    }
    setSubmitted(true);
    toast.success({
      title: "Registration successful!",
      description: `Welcome aboard, ${form.fullName.split(" ")[0]}. Your volunteer ID is MYB-2026-${Math.floor(1000 + Math.random() * 9000)}.`,
      duration: 6000,
    });
  };

  const progress = useMemo(
    () => Math.round(((step + (submitted ? 1 : 0)) / STEPS.length) * 100),
    [step, submitted],
  );

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--success-soft)] text-[color:var(--success-strong)]">
          <TickCircle size={32} />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight">
          You&apos;re a My Bharat Volunteer now!
        </h1>
        <p className="text-muted mt-2 text-sm leading-relaxed">
          We&apos;ve sent your volunteer ID to{" "}
          <strong>{form.email}</strong>. Your profile is under review by the
          state nodal officer and will be activated within 24 hours.
        </p>
        <div className="surface mt-6 rounded-2xl p-5 text-left text-sm">
          <p className="flex justify-between border-b pb-2">
            <span className="text-muted">Name</span>
            <strong>{form.fullName}</strong>
          </p>
          <p className="text-muted flex justify-between border-b py-2">
            <span>State</span>
            <strong>{String(form.state)}</strong>
          </p>
          <p className="text-muted flex justify-between border-b py-2">
            <span>Focus areas</span>
            <strong>{form.interests.join(", ")}</strong>
          </p>
          {preselectedMission && (
            <p className="text-muted flex justify-between pt-2">
              <span>Applied mission</span>
              <strong className="text-right">{preselectedMission.title}</strong>
            </p>
          )}
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/opportunities">
            <Button variant="primary" styleType="filled">
              Browse Missions
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="neutral" styleType="outline">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Become a Volunteer", active: true },
        ]}
        className="mb-5"
      />

      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Volunteer Registration
      </h1>
      <p className="text-muted mt-1 text-sm">
        Join 1.4 crore+ young Indians building a Viksit Bharat.
      </p>

      {preselectedMission && (
        <Alert
          variant="success"
          title={`Applying for: ${preselectedMission.title}`}
          description={`${preselectedMission.city}, ${preselectedMission.state} · starts soon. Complete this form to lock your seat.`}
          className="mt-4"
        />
      )}

      {/* Stepper */}
      <ol className="mt-6 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                i < step
                  ? "bg-[color:var(--success)] text-[color:var(--myb-neutral-00)]"
                  : i === step
                    ? "brand-text brand-bg-soft ring-2"
                    : "text-muted surface"
              }`}
              style={
                i === step
                  ? ({ "--tw-ring-color": "var(--brand)" } as React.CSSProperties)
                  : undefined
              }
            >
              {i < step ? <TickCircle size={14} /> : i + 1}
            </span>
            <span
              className={`hidden text-xs font-medium sm:block ${
                i === step ? "" : "text-muted"
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="h-px flex-1 bg-current opacity-15" />
            )}
          </li>
        ))}
      </ol>

      <section className="surface mt-5 rounded-3xl p-6 sm:p-8">
        {step === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label={
                <>
                  Full Name
                  <ReqMark />
                </>
              }
              placeholder="e.g. Ananya Sharma"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              required
              error={!!errors.fullName}
              errorMessage={errors.fullName}
              className="sm:col-span-2"
            />
            <Input
              label={
                <>
                  Email Address
                  <ReqMark />
                </>
              }
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              required
              error={!!errors.email}
              errorMessage={errors.email}
            />
            <Input
              label={
                <>
                  Mobile Number
                  <ReqMark />
                </>
              }
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile"
              value={form.phone}
              onChange={(e) =>
                set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              required
              success={
                form.phone.length === 10 && !errors.phone ? true : undefined
              }
              successMessage={
                form.phone.length === 10 && !errors.phone
                  ? "Number looks good"
                  : undefined
              }
              error={!!errors.phone}
              errorMessage={errors.phone}
            />
            <div className="sm:col-span-2">
              <DatePicker
                label={
                  <>
                    Date of Birth
                    <ReqMark />
                  </>
                }
                value={form.dob}
                onChange={(d) => {
                  set("dob", d);
                  setErrors((e) => ({ ...e, dob: "" }));
                }}
                required
                error={!!errors.dob}
                helperText={errors.dob ?? "You must be 15–29 years old"}
              />
            </div>
            <fieldset className="sm:col-span-2">
              <legend className="mb-2 text-sm font-medium">
                Gender<ReqMark />
              </legend>
              <div className="flex flex-wrap gap-6">
                {[
                  { v: "female", l: "Female" },
                  { v: "male", l: "Male" },
                  { v: "other", l: "Other" },
                  { v: "na", l: "Prefer not to say" },
                ].map(({ v, l }) => (
                  <Radio
                    key={v}
                    name="gender"
                    label={l}
                    checked={form.gender === v}
                    onChange={() => set("gender", v)}
                  />
                ))}
              </div>
            </fieldset>
            <div className="sm:col-span-2">
              <p className="mb-2 text-sm font-medium">
                State / UT<ReqMark />
              </p>
              <Dropdown
                options={STATES.map((s) => ({ value: s, label: s }))}
                value={form.state ?? undefined}
                onChange={(v) => {
                  const val = Array.isArray(v) ? v[0] : v;
                  set("state", val ?? null);
                  setErrors((e) => ({ ...e, state: "" }));
                }}
                placeholder="Select your state"
                multiple={false}
                showLeftIcon={false}
              />
              {errors.state && (
                <p className="mt-1 text-xs text-[color:var(--error)]">{errors.state}</p>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-6">
            <fieldset>
              <legend className="mb-2 text-sm font-medium">
                Focus areas you&apos;d like to serve in<ReqMark />
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {CATEGORIES.map((c) => (
                  <Checkbox
                    key={c}
                    label={c}
                    checked={form.interests.includes(c)}
                    onChange={(e) =>
                      set(
                        "interests",
                        e.target.checked
                          ? [...form.interests, c]
                          : form.interests.filter((x) => x !== c),
                      )
                    }
                  />
                ))}
              </div>
              {errors.interests && (
                <p className="mt-2 text-xs text-[color:var(--error)]">{errors.interests}</p>
              )}
            </fieldset>

            <Toggle
              label="I am available to start immediately"
              checked={form.immediateAvailability}
              onChange={(e) => set("immediateAvailability", e.target.checked)}
            />

            <TextArea
              label={
                <>
                  Why do you want to volunteer?
                  <ReqMark />
                </>
              }
              helperText="Share a cause you care about or a skill you want to contribute."
              placeholder="I want to volunteer because…"
              value={form.motivation}
              onChange={(e) => {
                set("motivation", e.target.value);
                setErrors((er) => ({ ...er, motivation: "" }));
              }}
              maxLength={300}
              resize="vertical"
              required
              error={!!errors.motivation}
              errorMessage={errors.motivation}
            />

            <LinkUrlInput
              label="Portfolio / Social Link (optional)"
              placeholder="linkedin.com/in/username"
              value={form.portfolio}
              onChange={(e) => set("portfolio", e.target.value)}
              fullWidth
            />

            <Alert
              variant="info"
              title="Data privacy"
              description="Your details are used only for volunteer matching and are never shared with third parties."
            />
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-6">
            <div>
              <p className="text-sm font-medium">
                Verify your mobile number<ReqMark />
              </p>
              <p className="text-muted mt-1 text-xs">
                Enter the 6-digit code sent to +91{" "}
                {form.phone.replace(/^(\d{5})(\d{5})$/, "$1 $2")}{" "}
                <Badge variant="info" className="ml-1">
                  demo OTP: 123456
                </Badge>
              </p>
              <div className="mt-3">
                <Otp
                  length={6}
                  value={otp}
                  onChange={setOtp}
                  autoFocus
                  aria-label="One time password"
                />
              </div>
            </div>

            <div className="surface-muted space-y-3 rounded-2xl p-4">
              <Toggle
                label={
                  <span>
                    I accept the My Bharat Volunteer Code of Conduct
                    <ReqMark />
                  </span>
                }
                checked={form.termsAccepted}
                onChange={(e) => set("termsAccepted", e.target.checked)}
              />
              <Toggle
                label="Send me updates about new missions (recommended)"
                checked={form.updatesConsent}
                onChange={(e) => set("updatesConsent", e.target.checked)}
              />
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            variant="neutral"
            styleType="outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-muted hidden text-xs tabular-nums sm:block">
              Step {step + 1} of {STEPS.length} · {progress}% complete
            </span>
            {step < STEPS.length - 1 ? (
              <Button variant="primary" styleType="filled" onClick={next}>
                Continue
              </Button>
            ) : (
              <Button variant="primary" styleType="filled" onClick={submit}>
                Submit Registration
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="text-muted mx-auto max-w-3xl px-4 py-16 text-center text-sm">
          Loading registration form…
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
