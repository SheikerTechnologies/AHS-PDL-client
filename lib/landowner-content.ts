/**
 * i18n-ready content for the Landowner Partnership page.
 * Each text field is an object with `en` (English) and `bn` (Bengali) strings.
 * Use `getText(content, lang)` to retrieve the appropriate language.
 */

export type Lang = "en" | "bn";
export type I18nString = { en: string; bn: string };

export function getText(text: I18nString, lang: Lang): string {
  return text[lang];
}

// ─── Hero ───────────────────────────────────────────────────────
export const heroContent = {
  headline: {
    en: "Turn your land into lasting value — with a partner you can trust",
    bn: "আপনার জমিকে স্থায়ী মূল্যে রূপান্তর করুন — একজন বিশ্বস্ত অংশীদারের সাথে",
  } as I18nString,
  subtext: {
    en: "Join forces with AHS Properties to develop your land with zero risk, full transparency, and maximum returns.",
    bn: "এএইচএস প্রপার্টিজের সাথে আপনার জমি উন্নয়ন করুন শূন্য ঝুঁকি, সম্পূর্ণ স্বচ্ছতা এবং সর্বোচ্চ রিটার্নে।",
  } as I18nString,
};

// ─── Why Partner ────────────────────────────────────────────────
export const whyPartnerSection = {
  heading: {
    en: "Why Partner with AHS",
    bn: "কেন এএইচএস-এর সাথে অংশীদার হবেন",
  } as I18nString,
  subheading: {
    en: "We bring decades of experience, a trusted reputation, and a full in-house team to every partnership.",
    bn: "আমরা প্রতিটি অংশীদারিত্বে দশকের অভিজ্ঞতা, বিশ্বস্ত সুনাম এবং একটি পূর্ণ অভ্যন্তরীণ টিম নিয়ে আসি।",
  } as I18nString,
  cards: [
    {
      icon: "ShieldCheck",
      title: { en: "Complete Transparency", bn: "সম্পূর্ণ স্বচ্ছতা" } as I18nString,
      description: {
        en: "Every cost, every approval, every step — shared openly with you from day one.",
        bn: "প্রতিটি খরচ, প্রতিটি অনুমোদন, প্রতিটি পদক্ষেপ — প্রথম দিন থেকেই আপনার সাথে খোলামেলা ভাগ করে নেওয়া হয়।",
      } as I18nString,
    },
    {
      icon: "CalendarCheck",
      title: { en: "On-Time Handover", bn: "সময়মতো হস্তান্তর" } as I18nString,
      description: {
        en: "We have a proven track record of delivering projects on schedule, every time.",
        bn: "আমাদের সময়মতো প্রকল্প হস্তান্তরের প্রমাণিত রেকর্ড রয়েছে।",
      } as I18nString,
    },
    {
      icon: "Building2",
      title: { en: "In-House Architect & Engineer Team", bn: "নিজস্ব স্থপতি ও প্রকৌশলী দল" } as I18nString,
      description: {
        en: "From design to execution, our in-house experts handle everything — no third-party delays.",
        bn: "নকশা থেকে বাস্তবায়ন পর্যন্ত, আমাদের নিজস্ব বিশেষজ্ঞরা সবকিছুই পরিচালনা করেন — কোনো থার্ড-পার্টি বিলম্ব নেই।",
      } as I18nString,
    },
    {
      icon: "Handshake",
      title: { en: "Dedicated Landowner Relations Team", bn: "নিবেদিত জমির মালিক সম্পর্ক দল" } as I18nString,
      description: {
        en: "A single point of contact who keeps you informed and supported throughout the project.",
        bn: "একক যোগাযোগের ব্যক্তি যিনি পুরো প্রকল্প জুড়ে আপনাকে অবহিত এবং সহায়তা রাখেন।",
      } as I18nString,
    },
  ],
};

// ─── Process Timeline ───────────────────────────────────────────
export const processTimelineSection = {
  heading: {
    en: "How It Works",
    bn: "কিভাবে এটি কাজ করে",
  } as I18nString,
  subheading: {
    en: "A simple, transparent 5-step journey from your land to a completed development.",
    bn: "আপনার জমি থেকে একটি সম্পূর্ণ উন্নয়ন পর্যন্ত একটি সহজ, স্বচ্ছ ৫-ধাপের যাত্রা।",
  } as I18nString,
  steps: [
    {
      number: 1,
      title: { en: "Land Evaluation", bn: "জমি মূল্যায়ন" } as I18nString,
      description: {
        en: "Our experts visit your site to assess location, access, and potential.",
        bn: "আমাদের বিশেষজ্ঞরা আপনার সাইট পরিদর্শন করে অবস্থান, প্রবেশযোগ্যতা এবং সম্ভাবনা মূল্যায়ন করেন।",
      } as I18nString,
    },
    {
      number: 2,
      title: { en: "Feasibility & FAR Assessment", bn: "সম্ভাব্যতা ও এফএআর মূল্যায়ন" } as I18nString,
      description: {
        en: "We calculate the maximum buildable area, FAR, and project viability.",
        bn: "আমরা সর্বোচ্চ নির্মাণযোগ্য এলাকা, এফএআর এবং প্রকল্পের কার্যকারিতা গণনা করি।",
      } as I18nString,
    },
    {
      number: 3,
      title: { en: "Agreement & Space Sharing", bn: "চুক্তি ও স্থান ভাগাভাগি" } as I18nString,
      description: {
        en: "A clear, fair agreement outlining revenue sharing and responsibilities.",
        bn: "রাজস্ব ভাগাভাগি এবং দায়িত্ব উল্লেখ করে একটি স্পষ্ট, ন্যায্য চুক্তি।",
      } as I18nString,
    },
    {
      number: 4,
      title: { en: "Design Approval", bn: "নকশা অনুমোদন" } as I18nString,
      description: {
        en: "We present the architectural design for your approval before construction begins.",
        bn: "নির্মাণ শুরুর আগে আমরা আপনার অনুমোদনের জন্য স্থাপত্য নকশা উপস্থাপন করি।",
      } as I18nString,
    },
    {
      number: 5,
      title: { en: "Construction & Handover", bn: "নির্মাণ ও হস্তান্তর" } as I18nString,
      description: {
        en: "We build and deliver the project on time, with regular updates throughout.",
        bn: "আমরা সময়মতো প্রকল্প নির্মাণ ও হস্তান্তর করি, পুরো সময় জুড়ে নিয়মিত আপডেট সহ।",
      } as I18nString,
    },
  ],
};

// ─── Space Calculator ───────────────────────────────────────────
export const spaceCalculatorSection = {
  heading: {
    en: "Space-Share Estimator",
    bn: "স্থান-ভাগাভাগি Estimator",
  } as I18nString,
  subheading: {
    en: "Get a preliminary estimate of your land's development potential.",
    bn: "আপনার জমির উন্নয়ন সম্ভাবনার একটি প্রাথমিক অনুমান পান।",
  } as I18nString,
  landSizeLabel: {
    en: "Land Size (Katha)",
    bn: "জমির পরিমাণ (কাঠা)",
  } as I18nString,
  roadWidthLabel: {
    en: "Front Road Width (Feet)",
    bn: "সামনের রাস্তার প্রস্থ (ফুট)",
  } as I18nString,
  estimatedFAR: {
    en: "Estimated FAR",
    bn: "আনুমানিক FAR",
  } as I18nString,
  estimatedUnits: {
    en: "Estimated Units",
    bn: "আনুমানিক ইউনিট",
  } as I18nString,
  disclaimer: {
    en: "This is a preliminary estimate; the actual calculation will be determined after a site visit.",
    bn: "এটি একটি প্রাথমিক অনুমান; প্রকৃত গণনা সাইট ভিজিটের পরে নির্ধারণ করা হবে।",
  } as I18nString,
};

// ─── Testimonials ───────────────────────────────────────────────
export const testimonialsSection = {
  heading: {
    en: "What Landowners Say",
    bn: "জমির মালিকরা কী বলেন",
  } as I18nString,
  items: [
    {
      quote: {
        en: "AHS turned my family's plot into a stunning residential building. The transparency throughout the process gave us complete peace of mind.",
        bn: "এএইচএস আমার পরিবারের জমিটিকে একটি চমৎকার আবাসিক ভবনে রূপান্তরিত করেছে। পুরো প্রক্রিয়ায় স্বচ্ছতা আমাদের সম্পূর্ণ মানসিক শান্তি দিয়েছে।",
      } as I18nString,
      name: { en: "Md. Kamal Hossain", bn: "মোঃ কামাল হোসেন" } as I18nString,
      project: { en: "AHS Jolshiri Lakeview 15", bn: "এএইচএস জলশিরি লেকভিউ ১৫" } as I18nString,
    },
    {
      quote: {
        en: "I was hesitant about space sharing at first, but the AHS team explained everything clearly. The returns have exceeded my expectations.",
        bn: "প্রথমে স্থান ভাগাভাগি নিয়ে আমি দ্বিধাগ্রস্ত ছিলাম, কিন্তু এএইচএস টিম সবকিছু স্পষ্টভাবে ব্যাখ্যা করেছে। রিটার্ন আমার প্রত্যাশা ছাড়িয়ে গেছে।",
      } as I18nString,
      name: { en: "Fatima Begum", bn: "ফাতিমা বেগম" } as I18nString,
      project: { en: "AHS Jolshiri Central 16", bn: "এএইচএস জলশিরি সেন্ট্রাল ১৬" } as I18nString,
    },
    {
      quote: {
        en: "They handed over the project exactly on the promised date. The quality of construction is outstanding. Highly recommended!",
        bn: "তারা প্রতিশ্রুত তারিখেই প্রকল্প হস্তান্তর করেছে। নির্মাণের মান অসাধারণ। অত্যন্ত সুপারিশ করছি!",
      } as I18nString,
      name: { en: "Engr. Shafiqur Rahman", bn: "ইঞ্জি. শফিকুর রহমান" } as I18nString,
      project: { en: "AHS VIP Square", bn: "এএইচএস ভিআইপি স্কয়ার" } as I18nString,
    },
    {
      quote: {
        en: "The dedicated landowner relations team kept us updated every step of the way. It felt like a true partnership, not just a transaction.",
        bn: "নিবেদিত জমির মালিক সম্পর্ক দল আমাদের প্রতিটি ধাপে আপডেট রেখেছে। এটি একটি সত্যিকারের অংশীদারিত্বের মতো অনুভূত হয়েছে, শুধু একটি লেনদেন নয়।",
      } as I18nString,
      name: { en: "Nasrin Sultana", bn: "নাসরিন সুলতানা" } as I18nString,
      project: { en: "AHS Coastal View Residences", bn: "এএইচএস কোস্টাল ভিউ রেসিডেন্স" } as I18nString,
    },
  ],
};

// ─── FAQ ────────────────────────────────────────────────────────
export const faqSection = {
  heading: {
    en: "Frequently Asked Questions",
    bn: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
  } as I18nString,
  items: [
    {
      question: {
        en: "What is FAR (Floor Area Ratio)?",
        bn: "FAR (ফ্লোর এরিয়া রেশিও) কী?",
      } as I18nString,
      answer: {
        en: "FAR is the ratio of a building's total floor area to the size of the land it sits on. For example, if your land is 10 Katha and the permitted FAR is 3.5, you can build up to 35 Katha of total floor space. RAJUK sets these ratios based on road width and land location. A higher road width typically allows a higher FAR.",
        bn: "FAR হলো একটি ভবনের মোট ফ্লোর এলাকার সাথে জমির আকারের অনুপাত। উদাহরণস্বরূপ, যদি আপনার জমি ১০ কাঠা হয় এবং অনুমোদিত FAR ৩.৫ হয়, তাহলে আপনি সর্বোচ্চ ৩৫ কাঠা মোট ফ্লোর স্পেস তৈরি করতে পারেন। রাজউক রাস্তার প্রস্থ এবং জমির অবস্থানের ভিত্তিতে এই অনুপাত নির্ধারণ করে। বেশি রাস্তার প্রস্থ সাধারণত বেশি FAR অনুমোদন করে।",
      } as I18nString,
    },
    {
      question: {
        en: "What is space sharing and how does it work?",
        bn: "স্থান ভাগাভাগি কী এবং এটি কীভাবে কাজ করে?",
      } as I18nString,
      answer: {
        en: "Space sharing is a partnership model where you contribute your land and AHS Properties handles the design, approvals, construction, and sales. The completed units are shared between you and AHS according to a pre-agreed ratio. You get possession of your share of the built area — which is worth significantly more than the undeveloped land alone — without having to invest any construction costs.",
        bn: "স্থান ভাগাভাগি একটি অংশীদারিত্ব মডেল যেখানে আপনি আপনার জমি contribute করেন এবং এএইচএস প্রপার্টিজ নকশা, অনুমোদন, নির্মাণ এবং বিক্রয় পরিচালনা করে। সম্পূর্ণ ইউনিটগুলি পূর্বনির্ধারিত অনুপাত অনুযায়ী আপনার এবং এএইচএস-এর মধ্যে ভাগ করা হয়। আপনি বিল্ট এরিয়ার আপনার অংশের মালিকানা পান — যা অসম্পূর্ণ জমির চেয়ে উল্লেখযোগ্যভাবে বেশি মূল্যের — কোনো নির্মাণ খরচ বিনিয়োগ না করেই।",
      } as I18nString,
    },
    {
      question: {
        en: "How much parking will be provided?",
        bn: "কতটুকু পার্কিং প্রদান করা হবে?",
      } as I18nString,
      answer: {
        en: "Parking is provided as per RAJUK building codes and BNBC (Bangladesh National Building Code) standards. Typically, each apartment unit gets at least one dedicated car parking space in the basement or ground floor. Additional visitor parking is also included in the design.",
        bn: "রাজউক বিল্ডিং কোড এবং বিএনবিসি (বাংলাদেশ ন্যাশনাল বিল্ডিং কোড) মান অনুযায়ী পার্কিং প্রদান করা হয়। সাধারণত, প্রতিটি অ্যাপার্টমেন্ট ইউনিট বেসমেন্ট বা গ্রাউন্ড ফ্লোরে কমপক্ষে একটি নির্ধারিত গাড়ি পার্কিং স্পেস পায়। অতিরিক্ত দর্শনার্থী পার্কিংও নকশায় অন্তর্ভুক্ত থাকে।",
      } as I18nString,
    },
    {
      question: {
        en: "What is the typical handover timeline?",
        bn: "সাধারণ হস্তান্তরের সময়রেখা কেমন?",
      } as I18nString,
      answer: {
        en: "For a standard G+6 to G+8 residential building, the construction timeline is typically 24 to 30 months from the start of construction, depending on the size and complexity. This includes foundation work, structural construction, finishing, and utility connections. We provide a detailed project schedule at the start so you know exactly what to expect.",
        bn: "একটি সাধারণ জি+৬ থেকে জি+৮ আবাসিক ভবনের জন্য, নির্মাণের সময়রেখা সাধারণত নির্মাণ শুরুর ২৪ থেকে ৩০ মাস, আকার এবং জটিলতার উপর নির্ভর করে। এর মধ্যে ফাউন্ডেশন কাজ, কাঠামোগত নির্মাণ, ফিনিশিং এবং ইউটিলিটি সংযোগ অন্তর্ভুক্ত। আমরা শুরুতে একটি বিস্তারিত প্রকল্প সময়সূচী প্রদান করি যাতে আপনি কী আশা করবেন তা জানতে পারেন।",
      } as I18nString,
    },
    {
      question: {
        en: "Is basement construction included?",
        bn: "বেসমেন্ট নির্মাণ কি অন্তর্ভুক্ত?",
      } as I18nString,
      answer: {
        en: "Yes, where feasible and as per RAJUK requirements, we include basement levels for parking and utility services. The number of basement floors depends on the land size, soil condition, and approved FAR. Our in-house engineering team conducts a thorough geotechnical survey before finalizing the design.",
        bn: "হ্যাঁ, যেখানে সম্ভব এবং রাজউকের প্রয়োজনীয়তা অনুযায়ী, আমরা পার্কিং এবং ইউটিলিটি পরিষেবার জন্য বেসমেন্ট অন্তর্ভুক্ত করি। বেসমেন্ট ফ্লোরের সংখ্যা জমির আকার, মাটির অবস্থা এবং অনুমোদিত FAR-এর উপর নির্ভর করে। আমাদের নিজস্ব ইঞ্জিনিয়ারিং টিম নকশা চূড়ান্ত করার আগে একটি পুঙ্খানুপুঙ্খ ভূ-প্রযুক্তিগত জরিপ পরিচালনা করে।",
      } as I18nString,
    },
    {
      question: {
        en: "Do I need to pay any fees upfront?",
        bn: "আমার কি কোনো ফি আগাম দিতে হবে?",
      } as I18nString,
      answer: {
        en: "No. In our space-sharing model, AHS Properties bears all development costs — from design and approvals to construction and marketing. Your land is your contribution. You only share the completed units, not the construction expenses. We only move forward after you are fully comfortable with the agreement.",
        bn: "না। আমাদের স্থান-ভাগাভাগি মডেলে, এএইচএস প্রপার্টিজ সমস্ত উন্নয়ন খরচ বহন করে — নকশা এবং অনুমোদন থেকে নির্মাণ এবং বিপণন পর্যন্ত। আপনার জমি আপনার অবদান। আপনি শুধুমাত্র সম্পূর্ণ ইউনিট ভাগ করেন, নির্মাণ ব্যয় নয়। আমরা তখনই এগিয়ে যাই যখন আপনি চুক্তিতে সম্পূর্ণ স্বাচ্ছন্দ্য বোধ করেন।",
      } as I18nString,
    },
    {
      question: {
        en: "What approvals does AHS obtain for the project?",
        bn: "এএইচএস প্রকল্পের জন্য কী কী অনুমোদন নেয়?",
      } as I18nString,
      answer: {
        en: "We handle all regulatory approvals including: RAJUK building plan approval, fire department clearance, environmental clearance, utility connections (gas, electricity, water), and the final completion certificate. Our legal team ensures every project is fully compliant with all Bangladesh government regulations.",
        bn: "আমরা সমস্ত নিয়ন্ত্রক অনুমোদন পরিচালনা করি: রাজউক বিল্ডিং প্ল্যান অনুমোদন, ফায়ার ডিপার্টমেন্ট ক্লিয়ারেন্স, পরিবেশগত ক্লিয়ারেন্স, ইউটিলিটি সংযোগ (গ্যাস, বিদ্যুৎ, পানি), এবং চূড়ান্ত সমাপ্তি সার্টিফিকেট। আমাদের আইনি দল নিশ্চিত করে যে প্রতিটি প্রকল্প বাংলাদেশ সরকারের সমস্ত নিয়ম মেনে সম্পূর্ণরূপে সম্মত।",
      } as I18nString,
    },
  ],
};

