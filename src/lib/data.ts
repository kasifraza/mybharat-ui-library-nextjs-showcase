export type OpportunityStatus = "open" | "filling-fast" | "closing-soon";

export interface Opportunity {
  id: string;
  title: string;
  organisation: string;
  category: string;
  state: string;
  city: string;
  startDate: string;
  duration: string;
  seatsLeft: number;
  status: OpportunityStatus;
  description: string;
  responsibilities: string[];
  perks: string[];
}

export const CATEGORIES = [
  "Environment",
  "Education",
  "Health",
  "Sports",
  "Culture & Arts",
  "Disaster Relief",
] as const;

export const STATES = [
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal",
  "Gujarat",
  "Rajasthan",
] as const;

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "clean-yamuna-drive",
    title: "Clean Yamuna River Drive",
    organisation: "Namami Gange Mission",
    category: "Environment",
    state: "Delhi",
    city: "New Delhi",
    startDate: "2026-10-05",
    duration: "2 weeks",
    seatsLeft: 120,
    status: "open",
    description:
      "Join thousands of young volunteers in a massive cleanliness drive along the Yamuna ghats. Learn about river ecology while making a direct impact on urban water health.",
    responsibilities: [
      "Assist in waste segregation at designated ghats",
      "Educate visitors about single-use plastic alternatives",
      "Support logistics for collection and disposal teams",
    ],
    perks: [
      "Government certificate of participation",
      "Meals and safety gear provided",
      "Eco-warrior badge on My Bharat profile",
    ],
  },
  {
    id: "digital-literacy-mission",
    title: "Digital Literacy Mission",
    organisation: "Ministry of Electronics & IT",
    category: "Education",
    state: "Maharashtra",
    city: "Pune",
    startDate: "2026-10-12",
    duration: "1 month",
    seatsLeft: 45,
    status: "filling-fast",
    description:
      "Teach essential digital skills — UPI payments, online government services, and internet safety — to senior citizens and first-time smartphone users in your neighbourhood.",
    responsibilities: [
      "Conduct weekly digital literacy workshops",
      "Create simple bilingual learning material",
      "Track learner progress and share feedback",
    ],
    perks: [
      "Digital Ambassador certificate",
      "Training kit and curriculum access",
      "Priority for national-level internships",
    ],
  },
  {
    id: "fit-india-youth-games",
    title: "Fit India Youth Games Volunteering",
    organisation: "Ministry of Youth Affairs & Sports",
    category: "Sports",
    state: "Karnataka",
    city: "Bengaluru",
    startDate: "2026-11-02",
    duration: "10 days",
    seatsLeft: 200,
    status: "open",
    description:
      "Be the backbone of the Fit India Youth Games. Manage athlete check-ins, coordinate venues, and help conductIndia's biggest community sports festival.",
    responsibilities: [
      "Manage registration and athlete accreditation desks",
      "Coordinate with venue marshals for event flow",
      "Support first-aid and hydration stations",
    ],
    perks: [
      "Official games volunteer kit",
      "Meet-and-greet with national athletes",
      "Sports ministry recognition letter",
    ],
  },
  {
    id: "swasth-nivesh-health-camp",
    title: "Rural Health Awareness Camp",
    organisation: "National Health Mission",
    category: "Health",
    state: "Uttar Pradesh",
    city: "Varanasi",
    startDate: "2026-09-28",
    duration: "1 week",
    seatsLeft: 18,
    status: "closing-soon",
    description:
      "Support doctors and ASHA workers in conducting door-to-door health surveys, anaemia screening camps, and nutrition awareness sessions across 15 villages.",
    responsibilities: [
      "Assist in setting up screening camps",
      "Conduct household health surveys",
      "Distribute IEC material on nutrition and hygiene",
    ],
    perks: [
      "Community health volunteer certificate",
      "Field experience with NHM doctors",
      "Stipend for travel expenses",
    ],
  },
  {
    id: "ek-bharat-culture-fest",
    title: "Ek Bharat Shreshtha Bharat Cultural Fest",
    organisation: "Ministry of Culture",
    category: "Culture & Arts",
    state: "Tamil Nadu",
    city: "Chennai",
    startDate: "2026-11-20",
    duration: "3 days",
    seatsLeft: 80,
    status: "open",
    description:
      "Celebrate India's cultural diversity. Volunteer at state pavilions, folk performance stages, and heritage walk checkpoints during this mega cultural exchange festival.",
    responsibilities: [
      "Guide visitors across state pavilions",
      "Assist artists backstage and on stage",
      "Manage feedback and experience surveys",
    ],
    perks: [
      "Backstage access to folk performances",
      "Cultural fest merchandise",
      "Certificate signed by Ministry of Culture",
    ],
  },
  {
    id: "apda-mitra-response",
    title: "Aapda Mitra Disaster Response Training",
    organisation: "National Disaster Management Authority",
    category: "Disaster Relief",
    state: "Gujarat",
    city: "Ahmedabad",
    startDate: "2026-10-18",
    duration: "2 weeks",
    seatsLeft: 60,
    status: "open",
    description:
      "Get certified in community-level disaster response — first aid, search & rescue basics, flood preparedness — and join the Aapda Mitra volunteer force.",
    responsibilities: [
      "Complete certified disaster response modules",
      "Participate in mock drill exercises",
      "Map local emergency resources",
    ],
    perks: [
      "NDMA certified training",
      "Aapda Mitra ID card",
      "Life-saving practical skills",
    ],
  },
  {
    id: "each-one-teach-one",
    title: "Each One Teach One — Evening Classes",
    organisation: "Samagra Shiksha Abhiyan",
    category: "Education",
    state: "West Bengal",
    city: "Kolkata",
    startDate: "2026-10-01",
    duration: "3 months",
    seatsLeft: 35,
    status: "filling-fast",
    description:
      "Run evening foundational literacy and numeracy classes for out-of-school children in community learning centres, with structured workbooks and mentor support.",
    responsibilities: [
      "Teach foundational literacy hour daily",
      "Maintain attendance and progress records",
      "Engage parents through monthly meetings",
    ],
    perks: [
      "Teaching experience certificate",
      "Structured curriculum and training",
      "Letter of recommendation for top performers",
    ],
  },
  {
    id: "van-mahotsav-plantation",
    title: "Van Mahotsav Mega Plantation",
    organisation: "Ministry of Environment, Forest & Climate Change",
    category: "Environment",
    state: "Rajasthan",
    city: "Jaipur",
    startDate: "2026-10-25",
    duration: "1 day",
    seatsLeft: 500,
    status: "open",
    description:
      "Be part of a single-day record attempt — 1 lakh saplings planted across Jaipur district. Teams of 10 will adopt and geo-tag plantation zones.",
    responsibilities: [
      "Plant and geo-tag saplings in assigned zones",
      "Install tree guards and watering rings",
      "Record plantation data on the app",
    ],
    perks: [
      "Green Champion e-certificate",
      "Breakfast and refreshments",
      "Adopt-a-tree digital certificate",
    ],
  },
  {
    id: "blood-donation-yuva",
    title: "Yuva Blood Donation Marathon",
    organisation: "Raktdaan Amrit Mahotsav",
    category: "Health",
    state: "Delhi",
    city: "New Delhi",
    startDate: "2026-10-10",
    duration: "2 days",
    seatsLeft: 90,
    status: "open",
    description:
      "Volunteer as donor coordinators, registration desk managers, and post-donation care buddies for a 48-hour city-wide blood donation marathon.",
    responsibilities: [
      "Manage donor registration and queue flow",
      "Assist medical staff with donor comfort",
      "Run awareness counters for bone marrow registry",
    ],
    perks: [
      "Raktveer badge and certificate",
      "Donor care training",
      "Free health screening",
    ],
  },
  {
    id: "khelo-bharat-community",
    title: "Khelo Bharat Community Coaches",
    organisation: "Sports Authority of India",
    category: "Sports",
    state: "Maharashtra",
    city: "Nagpur",
    startDate: "2026-11-08",
    duration: "6 weeks",
    seatsLeft: 25,
    status: "filling-fast",
    description:
      "Train under SAI master coaches and then coach foundational athletics and kabaddi to children in municipal school grounds every weekend.",
    responsibilities: [
      "Attend weekend coach training sessions",
      "Run 2-hour community coaching drills",
      "Identify talented children for SAI trials",
    ],
    perks: [
      "SAI community coach certificate",
      "Sports kit allowance",
      "Direct referral to Khelo India trials",
    ],
  },
  {
    id: "heritage-monument-guides",
    title: "Heritage Monument Youth Guides",
    organisation: "Archaeological Survey of India",
    category: "Culture & Arts",
    state: "Delhi",
    city: "New Delhi",
    startDate: "2026-10-15",
    duration: "2 months",
    seatsLeft: 40,
    status: "open",
    description:
      "Become a certified young heritage guide at Humayun's Tomb and Qutub Minar. Conduct free guided tours for school groups every weekend.",
    responsibilities: [
      "Complete heritage guide training modules",
      "Conduct weekend guided tours",
      "Assist with visitor experience surveys",
    ],
    perks: [
      "ASI heritage guide certification",
      "Free entry to all ASI monuments",
      "Public speaking and storytelling skills",
    ],
  },
  {
    id: "flood-relief-assam",
    title: "Flood Relief Volunteer Corps",
    organisation: "State Disaster Response Force",
    category: "Disaster Relief",
    state: "West Bengal",
    city: "Siliguri",
    startDate: "2026-09-30",
    duration: "3 weeks",
    seatsLeft: 12,
    status: "closing-soon",
    description:
      "Support relief distribution, shelter management, and water purification drives for communities affected by seasonal floods in north Bengal.",
    responsibilities: [
      "Pack and distribute relief kits",
      "Assist at community shelter kitchens",
      "Support water testing and purification",
    ],
    perks: [
      "SDRF field volunteer certificate",
      "Accommodation and meals",
      "Insurance cover during deployment",
    ],
  },
];

export const STATUS_META: Record<
  OpportunityStatus,
  { label: string; badgeVariant: "success" | "warning" | "error" }
> = {
  open: { label: "Open", badgeVariant: "success" },
  "filling-fast": { label: "Filling Fast", badgeVariant: "warning" },
  "closing-soon": { label: "Closing Soon", badgeVariant: "error" },
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
