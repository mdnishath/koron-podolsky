/* ------------------------------------------------------------------
   Site content. Case results are the firm's complete published set,
   stated exactly as reported. Anything marked SAMPLE is draft copy
   for the firm to approve or replace before launch.
   ------------------------------------------------------------------ */

export type Track = "employment" | "injury";
export type Outcome = "verdict" | "settlement" | "defense";

export interface CaseResult {
  id: string;
  track: Track;
  label: string;
  outcome: Outcome;
  figure: string;
  wordsOnly?: boolean;
  description: string;
}

export const RESULTS: CaseResult[] = [
  {
    id: "r29",
    track: "employment",
    label: "Whistleblower retaliation",
    outcome: "verdict",
    figure: "$2.9 million",
    description:
      "For a former LAPD officer retaliated against after testifying truthfully on behalf of another officer.",
  },
  {
    id: "r1m",
    track: "employment",
    label: "Whistleblower",
    outcome: "verdict",
    figure: "$1 million",
    description: "For an LAPD officer in a whistleblowing action against the City of Los Angeles.",
  },
  {
    id: "r758",
    track: "employment",
    label: "Whistleblower",
    outcome: "verdict",
    figure: "$758,000",
    description:
      "For a former City of Los Angeles employee who blew the whistle on suspected non-compliance with federal regulations governing Community Development Block Grants.",
  },
  {
    id: "rfeha",
    track: "employment",
    label: "FEHA harassment and retaliation",
    outcome: "settlement",
    figure: "Seven figures",
    wordsOnly: true,
    description:
      "Hostile work environment and harassment on the basis of race, retaliation, and failure to prevent discrimination, all under FEHA.",
  },
  {
    id: "rhigh6",
    track: "injury",
    label: "Motor vehicle",
    outcome: "settlement",
    figure: "High six figures",
    wordsOnly: true,
    description:
      "Collision in which the defence contested the link between a high-impact collision and the plaintiff's arthritis.",
  },
  {
    id: "r600",
    track: "injury",
    label: "Motor vehicle",
    outcome: "settlement",
    figure: "$600,000",
    description: "Low-speed rear-end collision with minimal property damage and contested causation.",
  },
  {
    id: "rwage",
    track: "employment",
    label: "Wage and hour defence",
    outcome: "defense",
    figure: "Successful defence",
    wordsOnly: true,
    description:
      "For a small business owner, against claims of unpaid wages, missed rest and meal breaks, and wrongful termination.",
  },
];

export const resultsById = (ids: string[]) =>
  ids.map((id) => RESULTS.find((r) => r.id === id)).filter(Boolean) as CaseResult[];

export const HOME_RESULTS = resultsById(["r29", "r1m", "rfeha", "r600"]);
export const EMPLOYMENT_RESULTS = resultsById(["r29", "r1m", "r758", "rfeha", "rwage"]);
export const TERMINATION_RESULTS = resultsById(["r29", "r1m", "r758", "rfeha"]);
export const INJURY_RESULTS = resultsById(["rhigh6", "r600"]);
export const KORON_RESULTS = resultsById(["r29", "rfeha", "r600", "rhigh6"]);
export const PODOLSKY_RESULTS = resultsById(["r1m", "r758", "rhigh6", "rwage"]);

/* ---------- attorneys ---------- */
export interface Attorney {
  slug: string;
  name: string;
  short: string;
  role: string;
  line: string;
  credentials: string[];
  portrait: string;
  portraitAlt: string;
  focus: { employment: string[]; injury: string[] };
  bio: string[];
  personal: string; // SAMPLE — for the partner's review
  admissions: string[];
  results: CaseResult[];
}

export const ATTORNEYS: Attorney[] = [
  {
    slug: "boris-koron",
    name: "Boris Koron",
    short: "Boris Koron",
    role: "Partner",
    line:
      "Eleven years practising personal injury before founding the firm, and a litigator in employment matters including wage and hour and FEHA retaliation claims.",
    credentials: [
      "Eleven years practising personal injury before founding the firm",
      "Litigates employment matters including wage and hour and FEHA retaliation claims",
      "Selected to the Southern California Rising Stars list, 2015 through 2020",
    ],
    portrait: "/img/portrait-koron.jpg",
    portraitAlt: "Boris Koron, Partner, photographed in the firm's office lobby",
    focus: {
      employment: ["Wage and hour claims", "FEHA retaliation claims", "Wrongful termination", "Harassment and discrimination"],
      injury: ["Vehicle collisions", "Premises liability", "Contested causation claims", "Wrongful death"],
    },
    bio: [
      "Boris Koron spent eleven years practising personal injury before founding this firm, and he built it around a simple preference: fewer cases, handled personally, prepared as though each one will be tried. Most are resolved before that point — but they are resolved on better terms because the preparation was real.",
      "His employment work centres on the matters where an employee is punished for doing the right thing: reporting what they saw, asking for what they were owed, refusing what they should not have been asked to do. Those cases are won on documents, sequence, and detail, which is why the first conversation is usually a long one.",
    ],
    personal:
      "The first thing I tell a new client is that I want the whole story, including the parts they think hurt them. The other side will find those parts anyway. If I know them first, I can deal with them. That conversation is where the case is actually won.",
    admissions: ["Admitted to practice in the State of California", "Southern California Rising Stars, 2015–2020"],
    results: KORON_RESULTS,
  },
  {
    slug: "daniel-podolsky",
    name: "Daniel J. Podolsky",
    short: "Daniel Podolsky",
    role: "Partner",
    line:
      "A litigation background spanning personal injury, workers' compensation, real property, finance, and employment.",
    credentials: [
      "Background across personal injury, workers' compensation, real property, finance, and employment litigation",
      "Selected as a Southern California Rising Star, 2018 through 2021",
      "Lifetime member of the Million Dollar Advocates Forum",
    ],
    portrait: "/img/portrait-podolsky.jpg",
    portraitAlt: "Daniel J. Podolsky, Partner, photographed in the firm's office lobby",
    focus: {
      employment: ["Wrongful termination", "Retaliation and whistleblower claims", "Wage and hour", "Severance and contract disputes"],
      injury: ["Vehicle collisions", "Workplace and premises injuries", "Public entity claims", "Wrongful death"],
    },
    bio: [
      "Daniel Podolsky came to the firm with a litigation background that is unusually wide: personal injury, workers' compensation, real property, finance, and employment. That range is useful in a way that is easy to underestimate. Injury and employment matters routinely cross into insurance coverage, property ownership, and money questions, and a lawyer who has litigated those subjects sees the whole case rather than one corner of it.",
      "He is a lifetime member of the Million Dollar Advocates Forum, a membership limited to attorneys who have obtained a verdict or settlement of one million dollars or more. He is, like his partner, a trial lawyer first: every matter is prepared on the assumption that a jury will eventually hear it, because that preparation is what moves the other side.",
    ],
    personal:
      "People come to us at a bad moment, usually after someone with more resources has told them what they are going to get. My job is to change that conversation. That starts with listening carefully, and it ends in a courtroom if it has to.",
    admissions: [
      "Admitted to practice in the State of California",
      "Lifetime member, Million Dollar Advocates Forum",
      "Southern California Rising Star, 2018–2021",
    ],
    results: PODOLSKY_RESULTS,
  },
];

export const getAttorney = (slug: string) => ATTORNEYS.find((a) => a.slug === slug);

/* ---------- practice areas ---------- */
export interface PracticeArea {
  id: string;
  num: string;
  title: string;
  href: string;
  cta: string;
  points: string[];
  body: string;
}

export const EMPLOYMENT_AREAS: PracticeArea[] = [
  {
    id: "wrongful-termination",
    num: "01",
    title: "Wrongful termination",
    href: "/employment-law/wrongful-termination",
    cta: "Read about wrongful termination",
    points: [
      "Fired after reporting unlawful conduct",
      "Pushed out after requesting an accommodation",
      "Terminated after taking protected leave",
      "Constructive discharge — made intolerable until you left",
    ],
    body:
      "California is an at-will state, but at-will has limits. A termination that follows protected activity — reporting suspected illegality, complaining about unpaid wages, asking for an accommodation — is treated differently under California law. What was said, what was written, and when it happened usually decide these matters.",
  },
  {
    id: "discrimination",
    num: "02",
    title: "Discrimination",
    href: "/tell-us-about-your-case",
    cta: "Speak with an attorney",
    points: [
      "Race, colour, national origin, ancestry",
      "Sex, pregnancy, sexual orientation, gender identity",
      "Age, disability, medical condition",
      "Religion and religious accommodation",
    ],
    body:
      "FEHA covers a wider set of characteristics than federal law and applies to smaller employers. Most discrimination cases are not proved by one remark. They are proved by a pattern — who was promoted, who was disciplined, who was cut, and what the employer wrote down at the time.",
  },
  {
    id: "harassment",
    num: "03",
    title: "Harassment and retaliation",
    href: "/tell-us-about-your-case",
    cta: "Speak with an attorney",
    points: [
      "Hostile work environment",
      "Sexual harassment by a supervisor or colleague",
      "Punishment after reporting to HR",
      "Whistleblower retaliation under Labor Code 1102.5",
    ],
    body:
      "Retaliation is often easier to establish than the underlying complaint, because the timing speaks for itself. Labor Code section 1102.5 protects employees who report suspected violations of law, including reports made internally to a supervisor rather than to an outside agency.",
  },
  {
    id: "wage-and-hour",
    num: "04",
    title: "Wage and hour",
    href: "/tell-us-about-your-case",
    cta: "Speak with an attorney",
    points: [
      "Unpaid overtime and off-the-clock work",
      "Missed meal and rest breaks",
      "Misclassification as exempt or as a contractor",
      "Unreimbursed business expenses",
    ],
    body:
      "Unpaid overtime, missed breaks, and unreimbursed expenses are separate claims that are usually brought together. The records that prove them — time records, schedules, pay statements — are held by the employer, and the law requires them to be produced.",
  },
  {
    id: "contracts",
    num: "05",
    title: "Contracts and severance",
    href: "/tell-us-about-your-case",
    cta: "Have an agreement reviewed",
    points: [
      "Severance agreements before you sign",
      "Non-solicitation and confidentiality terms",
      "Commission and bonus disputes",
      "Executive employment agreements",
    ],
    body:
      "A severance agreement asks you to give up claims you may not know you have, often within a short deadline. Having it read before you sign costs far less than signing first. If you have already signed, that is not always the end of the matter.",
  },
];

export const INJURY_AREAS: PracticeArea[] = [
  {
    id: "vehicle",
    num: "01",
    title: "Vehicle accidents",
    href: "/tell-us-about-your-case",
    cta: "Speak with an attorney",
    points: [
      "Car, truck, and motorcycle collisions",
      "Rear-end and low-speed impact claims",
      "Pedestrian and cyclist injuries",
      "Rideshare and commercial vehicles",
    ],
    body:
      "Property damage does not decide injury. Low-speed collisions with little visible damage are routinely disputed on causation, and the medical record is what answers that. Where a commercial vehicle or a public agency is involved, the investigation has to begin quickly, because the evidence that matters is not kept indefinitely.",
  },
  {
    id: "premises",
    num: "02",
    title: "Premises liability",
    href: "/tell-us-about-your-case",
    cta: "Speak with an attorney",
    points: [
      "Falls on unsafe or unmaintained property",
      "Inadequate lighting and unmarked hazards",
      "Negligent security",
      "Injuries on commercial and rental property",
    ],
    body:
      "Premises matters usually turn on notice — how long the hazard existed, and what the owner knew or should have known. Photographs, incident reports, and maintenance records taken early are difficult to replace later, which is why the first days matter more than they appear to.",
  },
  {
    id: "medical",
    num: "03",
    title: "Medical malpractice",
    href: "/tell-us-about-your-case",
    cta: "Speak with an attorney",
    points: [
      "Misdiagnosis and delayed diagnosis",
      "Surgical and procedural error",
      "Medication and dosage errors",
      "Birth injury",
    ],
    body:
      "Medical negligence claims are document-driven and follow their own procedural track in California, with specific notice requirements before a case is filed. Obtaining the complete record — not the summary — is the first step, and expert review decides whether the matter is viable.",
  },
  {
    id: "product",
    num: "04",
    title: "Product liability",
    href: "/tell-us-about-your-case",
    cta: "Speak with an attorney",
    points: [
      "Design and manufacturing defects",
      "Failure to warn",
      "Vehicle and component failure",
      "Defective consumer and industrial products",
    ],
    body:
      "In a product case the item itself is the evidence. Keep the product, its packaging, the manual, and the receipt if you still have them, and do not return it to the seller. Liability can extend beyond the manufacturer to others in the chain of distribution.",
  },
  {
    id: "wrongful-death",
    num: "05",
    title: "Wrongful death",
    href: "/tell-us-about-your-case",
    cta: "Speak with an attorney",
    points: [
      "Fatal collisions",
      "Fatal premises and workplace incidents",
      "Claims involving public entities",
      "Survival actions alongside the wrongful death claim",
    ],
    body:
      "California limits who may bring a wrongful death claim, and the answer depends on family relationship rather than on who paid the expenses. These matters are handled quietly and at the family's pace. We will explain what the law allows and what it does not, without pressure.",
  },
];

/* ---------- FAQs ---------- */
export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const EMPLOYMENT_FAQS: Faq[] = [
  {
    id: "privacy",
    question: "Will my employer find out I contacted a lawyer?",
    answer:
      "Not from us. A consultation is confidential, and we do not contact your employer, your colleagues, or anyone else without your direction. Nothing is filed and no one is notified until you decide to proceed. If you are still employed, we will talk through how to keep it that way while your options are assessed.",
  },
  {
    id: "cost",
    question: "What does it cost to talk to you?",
    answer:
      "The first conversation costs nothing. If we take the matter on, the fee arrangement is explained in writing before you commit to anything, and you will not be asked to agree to terms you have not read.",
  },
  {
    id: "deadline",
    question: "How long do I have to bring a claim?",
    answer:
      "It depends on the claim. Some California employment claims begin with an administrative filing that runs in months rather than years, and claims against a public entity can be shorter still. Because the deadline depends on facts specific to you, the safe answer is to ask early rather than to assume.",
  },
  {
    id: "still-there",
    question: "What if I still work there?",
    answer:
      "Many of the people we speak with are still employed. You are entitled to seek legal advice while you are working, and the law protects employees against retaliation for asserting their rights. What matters is being deliberate: keep doing your job well, keep copies of what you are entitled to keep, and get advice before you put anything in writing.",
  },
];

export const TERMINATION_FAQS: Faq[] = [
  {
    id: "at-will",
    question: "My offer letter says at-will. Does that end it?",
    answer:
      "No. Nearly every California employee is at-will, and at-will employees bring successful termination claims. At-will means an employer does not need a good reason. It does not mean an employer may act for a prohibited reason.",
  },
  {
    id: "no-reason",
    question: "They gave no reason at all. Is that better or worse for me?",
    answer:
      "It is neither, on its own. What matters is what the surrounding record shows: what you had reported or requested, how you were treated before and after, and how comparable employees were treated. An unexplained termination that closely follows protected activity often invites more scrutiny, not less.",
  },
  {
    id: "severance",
    question: "I already signed a severance agreement. Is it too late?",
    answer:
      "Not necessarily. Whether a release is enforceable depends on what it says, how it was presented, and how much time you were given. Bring the agreement to the consultation — it is the first document we will want to read.",
  },
  {
    id: "privacy",
    question: "Will my employer be told that I contacted you?",
    answer:
      "Not by us. A consultation is confidential, and nothing is filed or disclosed to anyone without your direction. If you are still employed, we will talk through how to protect your position while your options are assessed.",
  },
];

export const INJURY_FAQS: Faq[] = [
  {
    id: "worth",
    question: "What is my case worth?",
    answer:
      "Nobody can answer that honestly at the start, and you should be sceptical of anyone who tries. Value depends on liability, the medical record, how the injury affects your work and your life, and the insurance available. What an attorney can do early is tell you what will drive the value in your particular matter, and what could damage it.",
  },
  {
    id: "insurer",
    question: "Should I talk to the insurance company?",
    answer:
      "You must cooperate with your own insurer under your policy. You are not required to give a recorded statement to the other side's insurer, and it is reasonable to speak with a lawyer before you do. A first offer is usually made before the full medical picture is known, and accepting it normally closes the claim for good.",
  },
  {
    id: "cost",
    question: "What does it cost to hire you?",
    answer:
      "The consultation costs nothing. Injury matters are commonly handled on a contingency basis, and the exact fee arrangement is set out in writing before you commit to anything. You will not be asked to agree to terms you have not read.",
  },
  {
    id: "long",
    question: "How long will this take?",
    answer:
      "Straightforward claims can resolve in months. A matter that has to be filed and litigated often runs a year or more, and one that goes to trial can run longer. Honest scheduling beats optimistic scheduling, so we will tell you the realistic range for your matter rather than the best case.",
  },
];

export const EXPECT_FAQS: Faq[] = [
  {
    id: "contact",
    question: "How often will I hear from you?",
    answer:
      "You will hear from us at every point where something changes, and you can reach us in between. If a long quiet stretch is coming — waiting on records or a court date — we will tell you in advance so that silence does not read as neglect.",
  },
  {
    id: "ask",
    question: "What do you need from me?",
    answer:
      "Three things. Tell us the truth, including the parts that do not help. Keep us informed about your treatment, your work, and anything the other side sends you. And check with us before signing or recording anything.",
  },
  {
    id: "decide",
    question: "Who decides whether to settle?",
    answer:
      "You do. We give you our assessment plainly, including when we think an offer is inadequate, but the decision to accept or refuse is always yours.",
  },
  {
    id: "fees",
    question: "How are fees handled?",
    answer:
      "The fee arrangement for your matter is explained in writing before you commit to anything, and we will answer questions about it as many times as you need. You will not be asked to agree to terms you have not read.",
  },
];

/* ---------- process ---------- */
export interface ProcessStep {
  title: string;
  body: string;
  timing?: string;
}

export const PROCESS: Record<Track, { intro: string; steps: ProcessStep[] }> = {
  employment: {
    intro:
      "Employment matters often begin with an administrative step before anything is filed in court, and they move at the pace of documents — what was written, by whom, and when. The register here is deliberate rather than urgent: nothing is disclosed to your employer without your direction.",
    steps: [
      {
        title: "Consultation",
        body: "You describe what happened, in order. We tell you whether the law treats it as a violation, what the obstacles are, and what proving it would require. Confidential, no obligation, and no fee.",
        timing: "One conversation, usually within days of your call",
      },
      {
        title: "Investigation",
        body: "We collect what you already have, identify who else saw it, and test the employer's stated reason against the record. Where an administrative filing has to come first, we prepare and file it.",
        timing: "Typically weeks, depending on what has to be obtained",
      },
      {
        title: "Filing",
        body: "The complaint is drafted and filed, and your employer is served. This is when the matter becomes public, and we talk that through with you before it happens rather than after.",
        timing: "Days to weeks once the investigation is complete",
      },
      {
        title: "Discovery",
        body: "Documents are exchanged, and depositions are taken — yours included, which we prepare you for thoroughly. This phase is the longest and usually produces the evidence that decides the matter.",
        timing: "Commonly several months to a year or more",
      },
      {
        title: "Resolution",
        body: "Most matters resolve at negotiation or mediation once the evidence is in. Any offer is yours to accept or refuse, with our assessment given plainly. If it does not resolve, it is tried.",
        timing: "Mediation is common before a trial date; trial when it is warranted",
      },
    ],
  },
  injury: {
    intro:
      "Injury matters move at the pace of your medical treatment, because the medical record is the evidence. The early weeks carry the most urgency: evidence disappears, adjusters call, and deadlines against public entities can be short.",
    steps: [
      {
        title: "Consultation",
        body: "You tell us what happened and how you are. We explain who is likely responsible, what insurance may be available, and what to do and avoid in the next few weeks. No fee for the conversation.",
        timing: "One conversation, usually the same week — sooner if it is urgent",
      },
      {
        title: "Investigation",
        body: "We preserve evidence while it still exists: scene photographs, incident reports, vehicle data, witnesses. We notify the carriers and take over communication with them, so the calls stop coming to you.",
        timing: "Begins immediately; the urgent parts within days",
      },
      {
        title: "Filing",
        body: "Where a claim can be resolved fairly without suit, we pursue that. Where it cannot, we file. Claims involving a public entity have their own notice requirements and much shorter deadlines.",
        timing: "Often after treatment stabilises, unless a deadline requires filing sooner",
      },
      {
        title: "Discovery",
        body: "Records, depositions, and expert review on causation and damages. This is where a contested injury claim is won — a carrier's position tends to move only when the documentation makes it untenable.",
        timing: "Commonly several months to a year or more",
      },
      {
        title: "Resolution",
        body: "Most claims resolve by negotiation or mediation once the medical picture is complete. We do not recommend a settlement before we know what the injury actually means for you.",
        timing: "Mediation is common; trial when the offer does not reflect the case",
      },
    ],
  },
};

export const TERMINATION_STEPS: ProcessStep[] = [
  {
    title: "Consultation",
    body: "You describe what happened. We tell you whether the law treats it as a violation, what the likely obstacles are, and what we would need to prove it. Confidential, and no obligation either way.",
    timing: "One conversation, usually within days",
  },
  {
    title: "Investigation",
    body: "We gather documents, identify witnesses, and assess the employer's stated reason against the record. Where an administrative filing is required first, we prepare and file it.",
    timing: "Weeks, depending on what has to be obtained",
  },
  {
    title: "Filing",
    body: "The complaint is drafted and filed, and the employer is served. This is the point at which the matter becomes public, and we discuss that with you before it happens.",
  },
  {
    title: "Discovery",
    body: "Both sides exchange documents and take depositions. This is the longest phase and the one that most often produces the evidence that decides the case.",
  },
  {
    title: "Resolution",
    body: "Most matters resolve by negotiation or mediation once the evidence is in. If yours does not, it is tried. We prepare every case on the assumption that it will be.",
  },
];

/* ---------- testimonials (SAMPLE — replace with client-approved quotes) ---------- */
export interface TestimonialItem {
  quote: string;
  attribution: string;
  context: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "I called still working there, terrified my employer would find out. They never did. Boris walked me through what the law actually said, told me plainly what was weak in my case, and then made the strong parts count. I was never handed off to anyone.",
    attribution: "Former client",
    context: "Employment matter · Los Angeles County",
  },
  {
    quote:
      "The insurance company told me my car barely had a scratch, so my back could not be that bad. Daniel did not argue with them. He built the medical record until they could not argue with him.",
    attribution: "Former client",
    context: "Motor vehicle claim · San Fernando Valley",
  },
  {
    quote:
      "What I noticed was how much they prepared. Every call, they already knew the file better than I did. When it was time to talk numbers, the other side clearly knew it too.",
    attribution: "Former client",
    context: "Retaliation matter · City of Los Angeles",
  },
];

/* ---------- resources ---------- */
export interface Article {
  slug: string;
  category: "Employment" | "Personal injury";
  track: Track;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  sections: { heading?: string; paragraphs?: string[]; list?: string[] }[];
}

export const ARTICLES: Article[] = [
  {
    slug: "first-days-after-you-are-fired",
    category: "Employment",
    track: "employment",
    title: "What to do in the first days after you are fired",
    excerpt: "The records worth gathering, the deadlines that start running immediately, and what not to sign.",
    readTime: "5 min read",
    date: "2026-08-12",
    sections: [
      {
        paragraphs: [
          "The days after a termination are disorienting, and the instinct is either to do nothing or to do everything at once. Neither helps. What helps is a short list of deliberate steps that protect your position whether or not you ever bring a claim.",
        ],
      },
      {
        heading: "Write down the sequence while it is precise",
        paragraphs: [
          "Before anything else, write out what happened in order: what you reported or requested, who you told, how the employer responded, and when the termination came. Include dates, names, and the words that were used as best you remember them. Memory of order and wording fades faster than memory of events, and the sequence is often the most important evidence in a termination case.",
        ],
      },
      {
        heading: "Gather what you already have",
        list: [
          "Your offer letter, employment agreement, and any handbook you were given",
          "Performance reviews and any written praise from before the problem began",
          "Pay statements, schedules, and time records",
          "The termination letter or email, and the stated reason",
          "Messages in your own accounts about the events leading up to the decision",
        ],
        paragraphs: [
          "Do not take material you were not entitled to have. Downloading confidential files or forwarding company documents to a personal account can damage an otherwise strong claim, and it can create a problem of its own. If something important exists only on your employer's systems, tell your lawyer. There are lawful ways to obtain it.",
        ],
      },
      {
        heading: "Do not sign a severance agreement yet",
        paragraphs: [
          "A severance agreement usually asks you to release claims you may not know you have, and it often comes with a short deadline designed to discourage review. Having it read by a lawyer before you sign costs far less than signing first. If the deadline is close, say so when you call. Deadlines of that kind can frequently be extended by asking.",
        ],
      },
      {
        heading: "Understand that deadlines are already running",
        paragraphs: [
          "Some California employment claims begin with an administrative filing that runs in months rather than years. Claims against a public entity can be shorter still. Because the applicable deadline depends on the particular facts, the responsible answer is to have it assessed early rather than assumed.",
        ],
      },
      {
        heading: "Ask early",
        paragraphs: [
          "A first conversation with an attorney is confidential and costs nothing. It does not commit you to a claim. It tells you whether what happened was unlawful, which is a different question from whether it was unfair, and it lets you make the decisions that follow with the facts in front of you.",
        ],
      },
    ],
  },
  {
    slug: "speaking-to-a-lawyer-while-you-still-work-there",
    category: "Employment",
    track: "employment",
    title: "Speaking to a lawyer while you still work there",
    excerpt: "How confidentiality works before anything is filed, and what your employer is and is not entitled to know.",
    readTime: "4 min read",
    date: "2026-08-04",
    sections: [
      {
        paragraphs: [
          "Most of the employees who contact us are still employed. They are worried about two things: that their employer will find out, and that asking will make things worse. Both concerns deserve a straight answer.",
        ],
      },
      {
        heading: "A consultation is confidential",
        paragraphs: [
          "What you tell a lawyer in a consultation is privileged. We do not contact your employer, your colleagues, or anyone else without your direction, and nothing is filed until you decide to proceed. Your employer has no right to know that you sought advice, and there is no mechanism by which they would learn of it from us.",
        ],
      },
      {
        heading: "What your employer is entitled to",
        paragraphs: [
          "Your employer is entitled to your continued good work and to your compliance with lawful policies. It is not entitled to know your legal plans, and it is not permitted to retaliate against you for seeking advice or asserting your rights. California law treats retaliation as a separate violation, and in practice it is often easier to prove than the underlying complaint, because the timing speaks for itself.",
        ],
      },
      {
        heading: "How to protect your position while you decide",
        list: [
          "Keep doing your job well. Performance problems that appear after a complaint are scrutinised, but genuine ones are still real.",
          "Keep copies of what you are entitled to keep: your own pay records, reviews, and messages sent to you.",
          "Do not put anything in writing about your legal position, to anyone at work, before getting advice.",
          "Use a personal phone and email for contact with your lawyer, never company systems.",
        ],
      },
      {
        heading: "The value of asking early",
        paragraphs: [
          "The best time to speak with a lawyer is usually before the decisive moment, not after it. Advice given while you are still employed can shape how a complaint is made, what is documented, and how a resignation or termination is handled. Those choices tend to matter later far more than they appear to at the time.",
        ],
      },
    ],
  },
  {
    slug: "what-the-insurance-adjuster-is-actually-asking-for",
    category: "Personal injury",
    track: "injury",
    title: "What the insurance adjuster is actually asking for",
    excerpt: "Why a recorded statement in the first week can shape the value of a claim for the next two years.",
    readTime: "5 min read",
    date: "2026-07-22",
    sections: [
      {
        paragraphs: [
          "The call usually comes within days. The adjuster is polite, sounds concerned, and asks whether you would mind answering a few questions on a recorded line so they can get the claim moving. It is presented as routine. It is not a courtesy. It is the start of an evaluation, and the person conducting it works for the other side.",
        ],
      },
      {
        heading: "What a recorded statement is for",
        paragraphs: [
          "The purpose of a recorded statement is to lock in your account while you are least prepared to give it. You may not yet know the extent of your injuries. You may minimise them out of habit, or describe pain that has not fully developed as mild. Every word can be quoted back to you a year later, at a deposition, by a lawyer who has read it far more carefully than you will remember saying it.",
          "You are required to cooperate with your own insurer under the terms of your policy. You are not required to give a recorded statement to the other driver's carrier, and it is reasonable to speak with a lawyer before you do.",
        ],
      },
      {
        heading: "The questions that matter most to them",
        list: [
          "Whether you sought medical treatment, and how soon after the incident",
          "Whether you had any prior injury or condition in the same part of the body",
          "How you would describe the impact, the damage, and your symptoms",
          "Whether you have returned to work, and whether you are missing any activities",
        ],
        paragraphs: [
          "None of these questions is improper. Each is asked in a way designed to produce an answer that reduces the claim. A gap between the incident and the first medical visit is the first thing an adjuster looks for. Prior conditions are the second. How you describe the collision is the third.",
        ],
      },
      {
        heading: "The early offer",
        paragraphs: [
          "A first offer is normally made before the full medical picture is known, and it is usually accompanied by a release. Once the release is signed, the claim is closed for good, regardless of what treatment turns out to be needed. Read nothing under time pressure, and have anything the carrier sends you reviewed before you sign it.",
        ],
      },
      {
        heading: "What to do instead",
        paragraphs: [
          "See a doctor promptly, and follow the treatment plan. Photograph what you can. Keep a short daily note of symptoms and what you were unable to do. And speak with a lawyer before you give a statement or accept an offer. Once a firm is involved, the calls stop coming to you, and the record is built properly from the start.",
        ],
      },
    ],
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

/* ---------- derived, verifiable figures for the results page ---------- */
export const FIGURES = [
  { value: "$2.9M", label: "Largest published verdict, for whistleblower retaliation" },
  { value: "7", label: "Published matters, stated exactly as reported" },
  { value: "2", label: "Partners, both of them trial lawyers" },
  { value: "1", label: "Office, on Ventura Boulevard in Tarzana" },
];
