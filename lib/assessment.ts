import type { Track } from "./content";

export interface AssessmentOption {
  value: string;
  label: string;
  education?: string;
  results?: string[];
  exact?: boolean;
}

export interface AssessmentQuestion {
  id: string;
  label: string;
  question: string;
  education?: string;
  options: AssessmentOption[];
}

export const STEP_LABELS = ["Your situation", "A few details", "What we have handled", "Contact"];

export const TRACK_OPTIONS: { value: Track; title: string; description: string }[] = [
  {
    value: "employment",
    title: "Something happened at work",
    description: "Fired or forced out, harassed, retaliated against, or not paid what you are owed.",
  },
  {
    value: "injury",
    title: "I was injured",
    description: "A collision, a fall, a defective product, or the loss of a family member.",
  },
];

export const TRACKS: Record<Track, { label: string; fallback: string[]; questions: AssessmentQuestion[] }> = {
  employment: {
    label: "Employment litigation",
    fallback: ["r29", "rfeha"],
    questions: [
      {
        id: "issue",
        label: "What happened",
        question: "What brings you here?",
        options: [
          {
            value: "termination",
            label: "I was fired or forced out",
            education:
              "California is an at-will state, but at-will has limits. A termination that follows protected activity — reporting unlawful conduct, complaining about unpaid wages, requesting an accommodation — is treated differently under California law.",
            results: ["r29", "rfeha"],
          },
          {
            value: "harassment",
            label: "I am being harassed or discriminated against",
            education:
              "FEHA covers characteristics including race, sex, age, disability, religion and national origin. What was reported, to whom, and when it was documented usually matters more than any single incident.",
            results: ["rfeha", "r29"],
          },
          {
            value: "retaliation",
            label: "I reported something and was punished for it",
            education:
              "Labor Code section 1102.5 protects employees who report suspected violations of law, including reports made internally to a supervisor rather than to an outside agency.",
            results: ["r29", "r1m", "r758"],
          },
          {
            value: "wages",
            label: "I was not paid what I earned",
            education:
              "Unpaid overtime, missed meal and rest breaks, and unreimbursed expenses are separate claims that are often brought together. The records that prove them are usually held by the employer.",
            results: ["rfeha", "r29"],
          },
          {
            value: "other",
            label: "Something else happened at work",
            education:
              "Not every workplace problem is a legal claim, and a short conversation is the fastest way to find out which one you have.",
            results: ["r29", "rfeha"],
          },
        ],
      },
      {
        id: "employer",
        label: "Employer",
        question: "Where is your employer based?",
        education:
          "California law often applies to work performed in California even when the company is headquartered somewhere else.",
        options: [
          { value: "ca", label: "In California" },
          { value: "outside", label: "Outside California, but I work here" },
          { value: "unsure", label: "I am not sure" },
        ],
      },
      {
        id: "status",
        label: "Employment status",
        question: "Are you still working there?",
        options: [
          {
            value: "still",
            label: "Yes, I still work there",
            education:
              "You can speak with a lawyer while you are still employed. A consultation is private, and nothing is filed or disclosed to your employer without your direction.",
          },
          {
            value: "left",
            label: "No, I have left or was let go",
            education:
              "Keep any documents you already have — offer letters, reviews, pay records, written warnings, and the messages around your departure. What exists in writing tends to decide these matters.",
          },
          {
            value: "notice",
            label: "I am on leave or under notice",
            education:
              "Leave and notice periods are often when the most important documents are created. What is put in writing during that window is usually significant later.",
          },
        ],
      },
      {
        id: "timing",
        label: "Timing",
        question: "When did this happen?",
        education:
          "Deadlines differ by claim, and some administrative filings run in months rather than years. That is the main reason to ask early rather than late.",
        options: [
          { value: "recent", label: "Within the last three months" },
          { value: "months", label: "Three to twelve months ago" },
          { value: "years", label: "One to three years ago" },
          { value: "older", label: "More than three years ago" },
          { value: "ongoing", label: "It is still happening" },
        ],
      },
    ],
  },
  injury: {
    label: "Personal injury",
    fallback: ["r600", "rhigh6"],
    questions: [
      {
        id: "accident",
        label: "What happened",
        question: "What kind of incident was it?",
        options: [
          {
            value: "vehicle",
            label: "A vehicle collision",
            education:
              "Property damage does not decide injury. Low-speed collisions with little visible damage are routinely disputed on causation, and the medical record is what answers that.",
            results: ["r600", "rhigh6"],
            exact: true,
          },
          {
            value: "premises",
            label: "A fall, or an unsafe property",
            education:
              "Premises matters often turn on notice — how long the hazard was there, and what the owner knew. Photographs and incident reports taken early are difficult to replace later.",
          },
          {
            value: "medical",
            label: "Medical care that went wrong",
            education:
              "Medical negligence claims are document-driven and follow their own procedural track in California. Obtaining the complete records is usually the first step.",
          },
          {
            value: "product",
            label: "A defective product",
            education:
              "Keep the product, its packaging and the receipt if you still have them. In a product case the item itself is the evidence.",
          },
          {
            value: "death",
            label: "The loss of a family member",
            education:
              "California limits who may bring a wrongful death claim, and the answer depends on family relationship rather than on who paid the expenses.",
          },
          {
            value: "other",
            label: "Something else",
            education: "If you are not sure how to describe it, that is normal. Tell us what happened in your own words.",
          },
        ],
      },
      {
        id: "severity",
        label: "Injuries",
        question: "How serious are the injuries?",
        education:
          "Severity is documented rather than described. Contemporaneous medical records carry more weight than an account given months later.",
        options: [
          { value: "improving", label: "Treated, and improving" },
          { value: "ongoing", label: "Still under treatment" },
          { value: "surgery", label: "Surgery or a hospital stay" },
          { value: "permanent", label: "Permanent or life-changing" },
          { value: "private", label: "I would rather not say yet" },
        ],
      },
      {
        id: "treatment",
        label: "Medical care",
        question: "Have you seen a doctor?",
        options: [
          {
            value: "immediate",
            label: "Yes, straight away",
            education:
              "Prompt treatment creates the clearest record of what the incident caused, which is exactly what a carrier will scrutinise later.",
          },
          {
            value: "later",
            label: "Yes, but some time afterwards",
            education:
              "A delay is common and explainable. What matters is that the gap is documented rather than left for an adjuster to interpret.",
          },
          {
            value: "not-yet",
            label: "Not yet",
            education:
              "A gap between the incident and the first medical visit is the first thing an adjuster looks for. Being seen promptly protects both your health and the record.",
          },
        ],
      },
      {
        id: "insurance",
        label: "Insurance",
        question: "Has an insurance company contacted you?",
        education:
          "Insurance carriers evaluate a claim from the day it is reported. What is said early tends to shape everything that follows.",
        options: [
          {
            value: "called",
            label: "Yes, they have called",
            education:
              "An adjuster's first request is usually a recorded statement. You are not required to give one, and you may speak with a lawyer first.",
          },
          {
            value: "offer",
            label: "Yes, and they have made an offer",
            education:
              "A first offer is normally made before the full medical picture is known. Once it is accepted, the claim is usually closed for good.",
          },
          { value: "no", label: "No, not yet" },
          { value: "unsure", label: "I am not sure" },
        ],
      },
      {
        id: "timing",
        label: "Timing",
        question: "When did it happen?",
        education:
          "Claims against a city, county or other public agency can carry far shorter deadlines than claims against a private party.",
        options: [
          { value: "weeks", label: "Within the last few weeks" },
          { value: "months", label: "One to six months ago" },
          { value: "year", label: "Six months to two years ago" },
          { value: "older", label: "More than two years ago" },
        ],
      },
    ],
  },
};

export const TIME_OPTIONS = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "any", label: "Any time" },
];
