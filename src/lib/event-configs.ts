export interface EventRole {
  label: string
  img: string
}

export interface GuestCountOption {
  label: string
  icon: string
  img: string
}

export interface EventDetailField {
  key: string
  type: 'text' | 'select' | 'checkboxes' | 'textarea'
  label: string
  placeholder?: string
  options?: string[]
  required?: boolean
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FeatureItem {
  icon: string
  title: string
  desc: string
}

export interface TestimonialItem {
  quote: string
  name: string
  img: string
}

export interface GalleryItem {
  src: string
  alt: string
}

export interface EventConfig {
  slug: string
  eventType: string
  heroTagline: string
  heroHeadline: string
  heroQuestion: string
  heroOptions: { label: string; img: string }[]
  socialProofText: string
  socialProofSubtext: string
  features: FeatureItem[]
  testimonials: TestimonialItem[]
  gallery: GalleryItem[]
  aboutHeadline: string
  aboutText: string[]
  aboutImages: string[]
  faq: FAQItem[]
  ctaText: string
  ctaSubtext: string
  // Date step
  dateHeadline: string
  dateSubtext: string
  dateOptions: { label: string; icon: string; img: string }[]
  // Guest count
  guestCountHeadline: string
  guestCountSubtext: string
  guestCountOptions: GuestCountOption[]
  // Event details step (unique per type)
  detailsHeadline: string
  detailsSubtext: string
  detailFields: EventDetailField[]
  // Lead capture
  roles: EventRole[]
  roleHeadline: string
  roleSubtext: string
  formHeadline: string
  formSubtext: string
  nameLabel: string
  secondFieldLabel: string
  submitText: string
  showCompanyUrl?: boolean
  // Thank you
  thankYouHeadline: string
  thankYouText: string
  thankYouCTA?: { label: string; href: string }
  // Analytics
  analyticsEventName: string
  // Total steps in funnel
  totalSteps: number
}

// ─── CORPORATE EVENTS ─────────────────────────────────────────────
export const corporateConfig: EventConfig = {
  slug: 'corporate',
  eventType: 'Corporate Events',
  heroTagline: "Detroit's Premier Event Venue",
  heroHeadline: 'Elevate your next corporate event on the Detroit River',
  heroQuestion: 'Have you hosted an event at The Roostertail?',
  heroOptions: [
    { label: 'Yes!', img: '/images/roostertail-501_websize.webp' },
    { label: 'Not yet', img: '/images/roostertail-858_websize.webp' },
  ],
  socialProofText: 'Trusted by leading organizations across Michigan',
  socialProofSubtext: 'From Fortune 500 galas to nonprofit fundraisers, we deliver.',
  features: [
    { icon: '🎤', title: 'Full AV & staging', desc: 'Projectors, podiums, and permanently installed LED lighting' },
    { icon: '🍽️', title: 'Plated or buffet dining', desc: 'Chef-prepared menus for every taste' },
    { icon: '🥂', title: 'Full bar service', desc: 'Open bar, cash bar, or custom packages' },
    { icon: '🪑', title: 'Flexible configurations', desc: 'Layouts tailored to your event' },
    { icon: '📶', title: 'High-speed Wi-Fi', desc: 'Reliable internet for all attendees' },
    { icon: '🅿️', title: 'On-site parking', desc: 'Convenient self-parking for your guests' },
    { icon: '🌅', title: 'Waterfront backdrop', desc: 'Stunning views of the Detroit River' },
    { icon: '📋', title: 'Venue coordinator', desc: 'Your point person from planning to breakdown' },
    { icon: '👔', title: 'Professional staff', desc: 'Full service team handles every detail' },
    { icon: '🏡', title: 'Private patio access', desc: 'Exclusive outdoor space for receptions' },
  ],
  testimonials: [
    {
      quote: "our event was held in the stunning Marine Room at sunset, and the backdrop of the Detroit River added a touch of magic to our evening. Nicole Spicuzza and the entire team exceeded our expectations in every way.",
      name: 'Priscilla Perkins, Accounting Aid Society',
      img: '/images/roostertail-601_websize.webp',
    },
    {
      quote: "We selected the Roostertail to host a corporate event for about 230 people. From day one to day of, the staff was top notch. The food is amazing, every detail was thought out. If you are wondering whether to book the Roostertail, do it. Trust me.",
      name: 'Jennifer Pepperell',
      img: '/images/roostertail-901_websize.webp',
    },
    {
      quote: "We were treated so very well. What a beautiful facility. Everyone was the epitome of professionalism, and everyone was so friendly and helpful. Successful things only happen due to great leadership and teamwork. You have all of that.",
      name: 'Dave Boze, Stardusters Big Band',
      img: '/images/roostertail-649_websize.webp',
    },
  ],
  gallery: [
    { src: '/images/roostertail-501_websize.webp', alt: 'Corporate event setup' },
    { src: '/images/roostertail-858_websize.webp', alt: 'Ballroom configured for corporate event' },
    { src: '/images/roostertail-901_websize.webp', alt: 'Networking reception' },
    { src: '/images/roostertail-649_websize.webp', alt: 'Plated dinner service' },
    { src: '/images/roostertail-601_websize.webp', alt: 'Grand ballroom' },
    { src: '/images/roostertail-930_websize.webp', alt: 'Professional reception' },
  ],
  aboutHeadline: "Where business meets the waterfront",
  aboutText: [
    "The Roostertail has been Detroit's go-to event destination since 1958. Our waterfront venue combines stunning views with the infrastructure your corporate event demands.",
    "From conferences to award ceremonies, team celebrations to client dinners, our professional staff ensures every detail is handled so you can focus on your guests.",
  ],
  aboutImages: ['/images/roostertail-501_websize.webp', '/images/roostertail-858_websize.webp'],
  faq: [
    { question: 'What AV equipment is included?', answer: 'Our venue includes permanently installed LED lighting, wireless microphones, a projector with screen, and stage lighting. Additional equipment can be arranged through our preferred vendors.' },
    { question: 'Can we customize the room layout?', answer: 'Yes. We will recommend the setup that best fits your event.' },
    { question: 'What catering options are available?', answer: 'We offer plated dinners, buffet service, cocktail receptions, and breakfast/lunch meetings. Our chef can accommodate dietary restrictions and customize menus to your preferences.' },
    { question: 'Is there parking for guests?', answer: 'Yes, we have a large on-site parking lot with convenient self-parking for all attendees.' },
    { question: 'How far in advance should we book?', answer: 'We recommend booking 3-6 months in advance for corporate events, especially for weekend dates. Weekday availability is often more flexible.' },
    { question: 'Can we bring in outside vendors?', answer: 'Bar service is provided in-house. We do allow outside catering and offer a discount on the package if you choose to use your own caterer, though we generally recommend our in-house chef. Outside decor and AV vendors are welcome, and our coordinator will help manage all vendor logistics.' },
  ],
  ctaText: 'Impress your team. Elevate your event.',
  ctaSubtext: 'Talk to one of our venue coordinators and see if we are the right fit.',
  dateHeadline: 'When are you thinking?',
  dateSubtext: 'Helps us check availability for your date',
  dateOptions: [
    { label: 'This month', icon: '📅', img: '/images/roostertail-501_websize.webp' },
    { label: 'Next 1-3 months', icon: '🗓️', img: '/images/roostertail-858_websize.webp' },
    { label: '3-6 months out', icon: '📆', img: '/images/roostertail-601_websize.webp' },
    { label: '6+ months out', icon: '🔮', img: '/images/roostertail-901_websize.webp' },
  ],
  guestCountHeadline: 'How many attendees?',
  guestCountSubtext: 'Helps us recommend the right room configuration',
  guestCountOptions: [
    { label: 'Under 50', icon: '👥', img: '/images/roostertail-649_websize.webp' },
    { label: '50-150', icon: '🏢', img: '/images/roostertail-501_websize.webp' },
    { label: '150-300', icon: '🎉', img: '/images/roostertail-858_websize.webp' },
    { label: '300+', icon: '✨', img: '/images/roostertail-930_websize.webp' },
  ],
  detailsHeadline: 'Tell us about your event',
  detailsSubtext: 'So we can tailor our proposal to your needs',
  detailFields: [
    { key: 'companyName', type: 'text', label: 'Company / Organization', placeholder: 'Company name', required: true },
    { key: 'eventSubType', type: 'select', label: 'Type of event', options: ['Conference / Meeting', 'Awards / Gala', 'Team Celebration', 'Other'], required: true },
    { key: 'cateringStyle', type: 'select', label: 'Catering preference', options: ['No Food', 'Plated Dinner', 'Buffet', 'Other'], required: false },
  ],
  roles: [
    { label: 'CEO / Owner', img: '/images/roostertail-601_websize.webp' },
    { label: 'Manager', img: '/images/roostertail-901_websize.webp' },
    { label: 'Employee / Admin', img: '/images/roostertail-649_websize.webp' },
    { label: 'Event Planner', img: '/images/roostertail-930_websize.webp' },
    { label: 'Other', img: '/images/roostertail-486_websize.webp' },
  ],
  roleHeadline: 'Who are you?',
  roleSubtext: 'Helps us personalize your experience',
  formHeadline: "Let's put a proposal together for you",
  formSubtext: 'Our events team will personally reach out within 24 hours.',
  nameLabel: 'Your name',
  secondFieldLabel: 'Company name',
  showCompanyUrl: true,
  submitText: "Let's get in touch with the coordinator \u2192",
  thankYouHeadline: "We'll be in touch soon",
  thankYouText: 'One of our venue coordinators will personally reach out within 24 hours to discuss your corporate event.',
  analyticsEventName: 'corporate_funnel',
  totalSteps: 8,
}

// ─── HOLIDAY PARTIES ──────────────────────────────────────────────
export const holidayConfig: EventConfig = {
  slug: 'holiday',
  eventType: 'Christmas Parties',
  heroTagline: "Detroit's Waterfront Venue",
  heroHeadline: 'Throw the Christmas party they will actually talk about',
  heroQuestion: 'Have you celebrated at The Roostertail?',
  heroOptions: [
    { label: 'Yes!', img: '/images/holiday-roostertail-242_websize.webp' },
    { label: 'Not yet', img: '/images/holiday-roostertail-82_websize.webp' },
  ],
  socialProofText: 'Detroit\'s favorite Christmas party destination',
  socialProofSubtext: 'Over 10,000 celebrations hosted since 1958.',
  features: [
    { icon: '🎄', title: 'Festive atmosphere', desc: 'A stunning venue that sets the Christmas mood' },
    { icon: '🍽️', title: 'Custom holiday menus', desc: 'Seasonal dishes crafted by our chef' },
    { icon: '🥂', title: 'Full bar service', desc: 'Open bar, signature cocktails, or custom packages' },
    { icon: '📸', title: 'Photo-worthy setting', desc: 'Waterfront views and elegant decor' },
    { icon: '🅿️', title: 'On-site parking', desc: 'Convenient self-parking included' },
    { icon: '🌅', title: 'Waterfront views', desc: 'Panoramic views of the Detroit River' },
    { icon: '🏡', title: 'Private patio', desc: 'Exclusive outdoor space available' },
    { icon: '📋', title: 'Venue coordinator', desc: 'Your point person for all logistics' },
    { icon: '👔', title: 'Full service staff', desc: 'Setup, service, and breakdown handled' },
    { icon: '🎅', title: 'Holiday decor', desc: 'Festive decorations throughout the venue' },
  ],
  testimonials: [
    {
      quote: "Another spectacular Echo Global Logistics holiday party. The Roostertail created a magical evening for us. It was decorated beautifully, a Winter Wonderland with special touches around every corner. Nicole and her team treated us all like royalty.",
      name: 'Suzanne Parrish, Echo Global Logistics',
      img: '/images/holiday-roostertail-486_websize.webp',
    },
    {
      quote: "We recently hosted The Masonic Temple Detroit's holiday party at the Roostertail, and it was truly unforgettable. The staff went above and beyond to make our entire team feel spoiled and celebrated all night long.",
      name: 'Erin Miracle, Masonic Temple Detroit',
      img: '/images/holiday-roostertail-934_websize.webp',
    },
    {
      quote: "We had our corporate holiday party at the Roostertail and they were amazing. Nicole and the staff were courteous and on top of everything all night. Every employee complimented what a great venue it was.",
      name: 'Danielle Roland',
      img: '/images/holiday-roostertail-930_websize.webp',
    },
  ],
  gallery: [
    { src: '/images/holiday-roostertail-242_websize.webp', alt: 'The Roostertail decorated for Christmas' },
    { src: '/images/holiday-roostertail-586_websize.webp', alt: 'Chef carving prime rib' },
    { src: '/images/holiday-roostertail-501_websize.webp', alt: 'Festive dining with holiday decor' },
    { src: '/images/holiday-roostertail-858_websize.webp', alt: 'Couple at the holiday celebration' },
    { src: '/images/holiday-roostertail-930_websize.webp', alt: 'Dance floor Christmas party' },
    { src: '/images/holiday-roostertail-263_websize.webp', alt: 'Roostertail gingerbread house' },
  ],
  aboutHeadline: "The Christmas celebration they deserve",
  aboutText: [
    "Whether it's a company Christmas party for 300 or an intimate family gathering, The Roostertail on the Detroit River creates the kind of celebration people remember.",
    "Our team handles everything from custom menus to coordinating the details so you can enjoy the party alongside your guests.",
  ],
  aboutImages: ['/images/holiday-roostertail-833_websize.webp', '/images/holiday-roostertail-901_websize.webp'],
  faq: [
    { question: 'How early should we book for Christmas?', answer: 'Prime December dates fill up fast. We recommend inquiring by August to secure your preferred date.' },
    { question: 'Can you handle large company parties?', answer: 'We accommodate up to 1,500+ guests across our venue. Our average party is around 150 guests, with 400 being a great target for open-house events that use every room.' },
    { question: 'Do you provide holiday decorations?', answer: 'Our venue provides elegant baseline decor. For custom holiday theming, we work with preferred decorators who can transform the space to your vision.' },
    { question: 'Can we bring in outside vendors?', answer: 'Bar service is provided in-house. We do allow outside catering and offer a discount on the package if you choose to use your own caterer, though we generally recommend our in-house chef. Outside decor and AV vendors are welcome, and our coordinator will help manage all vendor logistics.' },
    { question: 'Can we do a cocktail-style party instead of seated?', answer: 'Yes! Cocktail receptions are very popular for Christmas events. We offer appetizer stations, passed hors d\'oeuvres, and bar setups designed for mingling.' },
  ],
  ctaText: 'Make this Christmas one to remember.',
  ctaSubtext: 'Talk to one of our venue coordinators about your Christmas party.',
  dateHeadline: 'When is the party?',
  dateSubtext: 'Popular dates fill quickly during the holidays',
  dateOptions: [
    { label: 'November', icon: '🍂', img: '/images/holiday-roostertail-601_websize.webp' },
    { label: 'December', icon: '🎄', img: '/images/holiday-roostertail-242_websize.webp' },
    { label: 'January', icon: '🥂', img: '/images/holiday-roostertail-588_websize.webp' },
    { label: 'Other month', icon: '📅', img: '/images/holiday-roostertail-486_websize.webp' },
  ],
  guestCountHeadline: 'How many guests?',
  guestCountSubtext: 'Helps us recommend the right setup',
  guestCountOptions: [
    { label: 'Under 50', icon: '🎄', img: '/images/holiday-roostertail-263_websize.webp' },
    { label: '50-150', icon: '🎉', img: '/images/holiday-roostertail-501_websize.webp' },
    { label: '150-300', icon: '🥂', img: '/images/holiday-roostertail-486_websize.webp' },
    { label: '300+', icon: '✨', img: '/images/holiday-roostertail-934_websize.webp' },
  ],
  detailsHeadline: 'A few more details',
  detailsSubtext: 'So we can match you with the right package',
  detailFields: [
    { key: 'partyType', type: 'select', label: 'Company or personal?', options: ['Company / Corporate', 'Personal / Family', 'Nonprofit / Organization'], required: true },
    { key: 'cateringStyle', type: 'select', label: 'Food options', options: ['Buffet', 'Plated Dinner', 'Food Stations'], required: true },
  ],
  roles: [
    { label: 'Event Planner', img: '/images/holiday-roostertail-586_websize.webp' },
    { label: 'Office Manager', img: '/images/holiday-roostertail-848_websize.webp' },
    { label: 'Host / Hostess', img: '/images/holiday-roostertail-901_websize.webp' },
    { label: 'Other', img: '/images/holiday-roostertail-833_websize.webp' },
  ],
  roleHeadline: 'Who are you?',
  roleSubtext: 'Helps us personalize your experience',
  formHeadline: "Let's plan your Christmas celebration",
  formSubtext: 'Our events team will personally reach out within 24 hours.',
  nameLabel: 'Your name',
  secondFieldLabel: 'Company or group name',
  showCompanyUrl: true,
  submitText: "Let's get in touch with the coordinator \u2192",
  thankYouHeadline: "Let's make it a celebration",
  thankYouText: 'One of our venue coordinators will personally reach out within 24 hours to discuss your holiday event.',
  analyticsEventName: 'holiday_funnel',
  totalSteps: 8,
}

// ─── PROM ─────────────────────────────────────────────────────────
export const promConfig: EventConfig = {
  slug: 'prom',
  eventType: 'Prom',
  heroTagline: "Detroit's Iconic Waterfront Venue",
  heroHeadline: 'Make prom night unforgettable',
  heroQuestion: 'Have you been to an event at The Roostertail?',
  heroOptions: [
    { label: 'Yes!', img: '/images/events/dsc03447.webp' },
    { label: 'Not yet', img: '/images/roostertail-934_websize.webp' },
  ],
  socialProofText: 'Where Detroit celebrates prom',
  socialProofSubtext: 'The venue your students will remember forever.',
  features: [
    { icon: '💃', title: 'Massive dance floor', desc: 'LED floor with custom lighting' },
    { icon: '💡', title: 'Permanently installed LED lighting', desc: 'Custom colors and effects, DJ-ready' },
    { icon: '📸', title: 'Photo backdrops', desc: 'Instagram-worthy spots everywhere' },
    { icon: '🌅', title: 'Waterfront views', desc: 'Stunning prom photos on the Detroit River' },
    { icon: '🍽️', title: 'Dinner service', desc: 'Plated or buffet options for your group' },
    { icon: '🥤', title: 'Non-alcoholic bar', desc: 'Pop, juice, water, and frozen slushies' },
    { icon: '🅿️', title: 'On-site parking', desc: 'Safe, well-lit parking for students' },
    { icon: '🔒', title: 'In-house security', desc: 'Security on site for the full event' },
    { icon: '📋', title: 'Venue coordinator', desc: 'We handle all the logistics' },
    { icon: '✨', title: 'Lighting effects', desc: 'Custom uplighting and dance floor effects' },
  ],
  testimonials: [
    {
      quote: "Walled Lake Western High School held their senior prom at The Roostertail. The venue is absolutely gorgeous and the students deemed it Instagram-worthy. The students loved the balcony and floor-to-ceiling windows looking over the Detroit River.",
      name: 'Jessica Sanchez, Walled Lake Western High School',
      img: '/images/events/dsc03447.webp',
    },
    {
      quote: "We hosted our In the Clouds Prom at the Roostertail. From start to finish, Nicole worked with our staff every step of the way. The food, snacks, and desserts were talked about by all the students well after prom was over.",
      name: 'Kendra Spurgeon, Class of 2024',
      img: '/images/roostertail-934_websize.webp',
    },
    {
      quote: "Nicole and the Roostertail staff made our event flawless from setup to closing out the night. The space was designed perfectly for our group size. The event was simply beautiful. I got so many compliments on how great it turned out.",
      name: 'Conicka T., Graduation Committee',
      img: '/images/roostertail-447_websize.webp',
    },
  ],
  gallery: [
    { src: '/images/events/dsc03447.webp', alt: 'Prom group photo' },
    { src: '/images/roostertail-934_websize.webp', alt: 'Celebration' },
    { src: '/images/led-dance-floor-the-tail-logo.webp', alt: 'LED dance floor' },
    { src: '/images/dance-floor-packed-party-waterfront.webp', alt: 'Packed dance floor' },
    { src: '/images/events/venue-lobby-grand-staircase-blue-accent-wall.webp', alt: 'Grand entrance staircase' },
    { src: '/images/roostertail-447_websize.webp', alt: 'Event atmosphere' },
  ],
  aboutHeadline: "A prom they will never forget",
  aboutText: [
    "The Roostertail has been creating unforgettable nights on the Detroit River since 1958. Our venue gives your students the red-carpet experience they deserve.",
    "From the grand staircase entrance to the waterfront dance floor, every detail is designed to make prom night special. Our professional team handles all the logistics so you can enjoy the night.",
  ],
  aboutImages: ['/images/events/dsc03447.webp', '/images/events/venue-lobby-grand-staircase-blue-accent-wall.webp'],
  faq: [
    { question: 'How many students can you accommodate?', answer: 'Our venue comfortably hosts 100-400+ students with a dance floor, dining area, and photo spaces.' },
    { question: 'Is alcohol served at prom events?', answer: 'No alcohol is served at prom events. We offer a pop and juice station with water and frozen slushies.' },
    { question: 'What about security?', answer: 'We have in-house security on site and implement safe prom guidelines. We also work with your school administration on entry procedures and guest list management.' },
    { question: 'Can we bring our own DJ?', answer: 'Yes! You can bring your own DJ, or we can connect you with our preferred vendors.' },
    { question: 'How far in advance should we book?', answer: 'Prom dates (April-June) book up quickly. We recommend reaching out 6-9 months in advance.' },
    { question: 'Can students take photos outside?', answer: 'Absolutely. Our waterfront dock, fountains, and patio are popular photo spots. Natural lighting during golden hour makes for incredible photos.' },
  ],
  ctaText: 'Give them a prom they will talk about for years.',
  ctaSubtext: 'Talk to one of our venue coordinators about prom.',
  dateHeadline: 'When is prom?',
  dateSubtext: 'Popular spring dates fill up quickly',
  dateOptions: [
    { label: 'April 2027', icon: '🌷', img: '/images/events/dsc03447.webp' },
    { label: 'May 2027', icon: '🌸', img: '/images/roostertail-934_websize.webp' },
    { label: 'June 2027', icon: '☀️', img: '/images/events/venue-lobby-grand-staircase-blue-accent-wall.webp' },
    { label: '2028 or later', icon: '🔮', img: '/images/roostertail-447_websize.webp' },
  ],
  guestCountHeadline: 'How many students?',
  guestCountSubtext: 'Helps us plan the right setup',
  guestCountOptions: [
    { label: '50-100', icon: '🎓', img: '/images/events/dsc03447.webp' },
    { label: '100-200', icon: '💃', img: '/images/roostertail-934_websize.webp' },
    { label: '200-350', icon: '🎉', img: '/images/dance-floor-packed-party-waterfront.webp' },
    { label: '350+', icon: '✨', img: '/images/events/venue-lobby-grand-staircase-blue-accent-wall.webp' },
  ],
  detailsHeadline: 'A few details about prom',
  detailsSubtext: 'Helps us create the perfect proposal',
  detailFields: [
    { key: 'schoolName', type: 'text', label: 'School name', placeholder: 'Your school name', required: true },
    { key: 'promTheme', type: 'text', label: 'Prom theme (if you have one)', placeholder: 'e.g., Enchanted Garden, Old Hollywood', required: false },
    { key: 'diningStyle', type: 'select', label: 'Dining preference', options: ['Plated Dinner', 'Buffet', 'Appetizers Only', 'Not Sure Yet'], required: false },
  ],
  roles: [
    { label: 'Student', img: '/images/events/dsc03447.webp' },
    { label: 'Parent', img: '/images/events/venue-lobby-grand-staircase-blue-accent-wall.webp' },
    { label: 'Teacher / Advisor', img: '/images/roostertail-447_websize.webp' },
    { label: 'Prom Committee', img: '/images/roostertail-934_websize.webp' },
  ],
  roleHeadline: 'Who are you?',
  roleSubtext: 'Helps us personalize your experience',
  formHeadline: "Let's make prom happen",
  formSubtext: 'Our events team will personally reach out within 24 hours.',
  nameLabel: 'Your name',
  secondFieldLabel: 'School name',
  submitText: "Let's get in touch with the coordinator \u2192",
  thankYouHeadline: "Prom is going to be amazing",
  thankYouText: 'One of our venue coordinators will personally reach out within 24 hours to discuss your prom.',
  analyticsEventName: 'prom_funnel',
  totalSteps: 8,
}

// ─── BIRTHDAYS ────────────────────────────────────────────────────
export const birthdayConfig: EventConfig = {
  slug: 'birthday',
  eventType: 'Birthdays',
  heroTagline: "Detroit's Waterfront Venue",
  heroHeadline: 'Celebrate in style on the Detroit River',
  heroQuestion: 'Have you celebrated at The Roostertail?',
  heroOptions: [
    { label: 'Yes!', img: '/images/events/dsc03553.webp' },
    { label: 'Not yet', img: '/images/events/greetingcardconferenceevent-294.webp' },
  ],
  socialProofText: 'Where Detroit celebrates milestones',
  socialProofSubtext: 'From sweet sixteens to 50th birthdays, we make every milestone special.',
  features: [
    { icon: '🎂', title: 'Bring your own cake', desc: 'Cake cutting service included' },
    { icon: '🍽️', title: 'Catering options', desc: 'Full dinner, appetizers, or dessert-only' },
    { icon: '🥂', title: 'Full bar service', desc: 'Open bar, cash bar, or custom packages' },
    { icon: '💡', title: 'Dance floor & LED lighting', desc: 'Spacious dance floor with permanently installed LED lighting' },
    { icon: '📸', title: 'Photo-worthy spots', desc: 'Waterfront and interior backdrops' },
    { icon: '🅿️', title: 'On-site parking', desc: 'Convenient self-parking included' },
    { icon: '🌅', title: 'Waterfront setting', desc: 'Stunning views of the Detroit River' },
    { icon: '✨', title: 'Custom lighting', desc: 'Uplighting to match your color scheme' },
    { icon: '📋', title: 'Venue coordinator', desc: 'We handle the logistics' },
    { icon: '🎈', title: 'Decor flexibility', desc: 'Bring your own decor or use ours' },
  ],
  testimonials: [
    {
      quote: "Thanks for an amazing 50th birthday party. It was excellence from start to finish. The venue looked amazing and the team was so attentive, ensuring everything went smoothly. They added so many extra surprises with no additional charge.",
      name: 'Tamaka Butler',
      img: '/images/events/dsc03553.webp',
    },
    {
      quote: "Jayla's Sweet 16 was looking so elegant and relaxing with ravishing lighting and room decoration. You made her Sweet 16 unforgettable with your creative skills and faultless arranging abilities.",
      name: 'Stacey and Jayla Scott',
      img: '/images/events/greetingcardconferenceevent-294.webp',
    },
    {
      quote: "My husband had his 50th birthday party there and it was absolutely amazing. Shawna Eaton-Peplinski is the best. She took care of everything for us. The food was amazing. Everything was perfect.",
      name: 'Sheimika Hardaway',
      img: '/images/roostertail-509_websize.webp',
    },
  ],
  gallery: [
    { src: '/images/events/dsc03553.webp', alt: 'Birthday celebration' },
    { src: '/images/events/greetingcardconferenceevent-294.webp', alt: 'Celebration moment' },
    { src: '/images/roostertail-263_websize.webp', alt: 'Party atmosphere' },
    { src: '/images/events/canned-seltzers-ice-bucket-bar-display.webp', alt: 'Drinks display' },
    { src: '/images/roostertail-509_websize.webp', alt: 'Venue celebration' },
    { src: '/images/roostertail-833_websize.webp', alt: 'Event ambiance' },
  ],
  aboutHeadline: "A birthday as unique as they are",
  aboutText: [
    "Whether you are planning an intimate dinner for 30 or a blowout celebration for 200, The Roostertail on the Detroit River is the backdrop your milestone deserves.",
    "Our flexible packages let you customize everything from the menu to the lighting. Bring your own cake, your own DJ, your own vibe. We handle the rest.",
  ],
  aboutImages: ['/images/events/dsc03553.webp', '/images/roostertail-263_websize.webp'],
  faq: [
    { question: 'Can we bring our own birthday cake?', answer: 'Absolutely! Cake cutting and service is included. Just bring the cake and we take care of plating and distribution.' },
    { question: 'What is the minimum guest count?', answer: 'We can accommodate birthday celebrations as intimate as 30 guests up to 400+ guests.' },
    { question: 'Can we customize the lighting?', answer: 'Yes! Our venue features customizable uplighting that can match your party\'s color scheme or theme.' },
    { question: 'Do you offer both daytime and evening events?', answer: 'Yes, we host birthday brunches, afternoon celebrations, and evening parties. Our waterfront is especially beautiful at sunset.' },
    { question: 'Can we bring our own DJ?', answer: 'Yes! You can bring your own DJ or band. Our permanently installed LED lighting syncs beautifully to any setup.' },
  ],
  ctaText: 'Give them a celebration they deserve.',
  ctaSubtext: 'Talk to one of our venue coordinators about your birthday event.',
  dateHeadline: 'When is the celebration?',
  dateSubtext: 'Helps us check availability',
  dateOptions: [
    { label: 'This month', icon: '🎂', img: '/images/events/dsc03553.webp' },
    { label: 'Next 1-3 months', icon: '🎈', img: '/images/events/greetingcardconferenceevent-294.webp' },
    { label: '3-6 months out', icon: '📅', img: '/images/roostertail-263_websize.webp' },
    { label: '6+ months out', icon: '🔮', img: '/images/roostertail-509_websize.webp' },
  ],
  guestCountHeadline: 'How many guests?',
  guestCountSubtext: 'Helps us recommend the right setup',
  guestCountOptions: [
    { label: 'Under 50', icon: '🎂', img: '/images/events/dsc03553.webp' },
    { label: '50-100', icon: '🎈', img: '/images/events/canned-seltzers-ice-bucket-bar-display.webp' },
    { label: '100-200', icon: '🎉', img: '/images/roostertail-263_websize.webp' },
    { label: '200+', icon: '✨', img: '/images/roostertail-833_websize.webp' },
  ],
  detailsHeadline: 'Tell us about the birthday',
  detailsSubtext: 'So we can create the perfect celebration',
  detailFields: [
    { key: 'birthdayPerson', type: 'text', label: 'Who is the birthday for?', placeholder: 'Name of the guest of honor', required: true },
    { key: 'birthdayDate', type: 'text', label: 'When is the birthday?', placeholder: 'e.g., March 15', required: false },
    { key: 'milestone', type: 'select', label: 'Age / milestone', options: ['Sweet 16', '18th Birthday', '21st Birthday', '30th Birthday', '40th Birthday', '50th Birthday', 'Over 50', 'Kids Party', 'Other'], required: true },
  ],
  roles: [
    { label: 'The Birthday Person', img: '/images/events/greetingcardconferenceevent-294.webp' },
    { label: 'Family Member', img: '/images/events/dsc03553.webp' },
    { label: 'Friend / Partner', img: '/images/roostertail-509_websize.webp' },
    { label: 'Event Planner', img: '/images/roostertail-833_websize.webp' },
  ],
  roleHeadline: 'Who are you?',
  roleSubtext: 'Helps us personalize your experience',
  formHeadline: "Let's plan this celebration",
  formSubtext: 'Our events team will personally reach out within 24 hours.',
  nameLabel: 'Your name',
  secondFieldLabel: 'Guest of honor\'s name',
  submitText: "Let's get in touch with the coordinator \u2192",
  thankYouHeadline: "It's going to be a celebration",
  thankYouText: 'One of our venue coordinators will personally reach out within 24 hours to discuss your birthday event.',
  analyticsEventName: 'birthday_funnel',
  totalSteps: 8,
}

// ─── SHOWERS ──────────────────────────────────────────────────────
export const showerConfig: EventConfig = {
  slug: 'shower',
  eventType: 'Showers',
  heroTagline: "Detroit's Waterfront Venue",
  heroHeadline: 'A picture-perfect setting for your shower',
  heroQuestion: 'Have you been to an event at The Roostertail?',
  heroOptions: [
    { label: 'Yes!', img: '/images/events/dsc05521.webp' },
    { label: 'Not yet', img: '/images/events/elegant-place-setting-emerald-table-runner-overhead.webp' },
  ],
  socialProofText: 'Where beautiful showers happen',
  socialProofSubtext: 'Elegant spaces with natural light and waterfront views.',
  features: [
    { icon: '☀️', title: 'Natural light', desc: 'Floor-to-ceiling windows for stunning photos' },
    { icon: '🍽️', title: 'Brunch & lunch menus', desc: 'Curated menus perfect for showers' },
    { icon: '🥂', title: 'Mimosa & cocktail bar', desc: 'Signature drinks for the occasion' },
    { icon: '🎀', title: 'Decor flexibility', desc: 'Bring your own or use our elegant setup' },
    { icon: '🎁', title: 'Gift table space', desc: 'Dedicated area for gifts and displays' },
    { icon: '🎮', title: 'Games area', desc: 'Space for activities and fun' },
    { icon: '🌅', title: 'Waterfront backdrop', desc: 'Stunning photos by the river' },
    { icon: '📸', title: 'Photo-ready venue', desc: 'Every corner is Instagram-worthy' },
    { icon: '📋', title: 'Venue coordinator', desc: 'We handle all the logistics' },
    { icon: '🅿️', title: 'On-site parking', desc: 'Convenient self-parking included' },
  ],
  testimonials: [
    {
      quote: "We cannot begin to thank the team enough for giving us the most perfect bridal shower experience. Nicole insured our shower was everything we envisioned and more. All of our guests were blown away with the venue and the team. 10 out of 10.",
      name: 'Tyra Garcia-Garrison',
      img: '/images/events/dsc05521.webp',
    },
    {
      quote: "I worked with Nicole and secured the Club Room for my baby shower. The decor they provided was absolutely beautiful. I highly suggest the Club Room for an intimate space with gorgeous sunlit views. The food was incredible.",
      name: 'Rand S.',
      img: '/images/events/elegant-place-setting-emerald-table-runner-overhead.webp',
    },
    {
      quote: "Great place to have an event. I recommend anyone in Detroit who wants to have a bridal shower, baby shower, or dinner to have it at the Roostertail. Great people, and Nicole helped out a lot.",
      name: 'Shaquita Davenport',
      img: '/images/events/dsc03600.webp',
    },
  ],
  gallery: [
    { src: '/images/events/dsc05521.webp', alt: 'Elegant table setup' },
    { src: '/images/events/elegant-place-setting-emerald-table-runner-overhead.webp', alt: 'Place settings' },
    { src: '/images/events/dsc03600.webp', alt: 'Shower celebration' },
    { src: '/images/roostertail-242_websize.webp', alt: 'Venue atmosphere' },
    { src: '/images/roostertail-433_websize.webp', alt: 'Celebration moment' },
    { src: '/images/roostertail-212_websize.webp', alt: 'Event setting' },
  ],
  aboutHeadline: "Effortlessly elegant",
  aboutText: [
    "The Roostertail's waterfront setting and natural light make it the perfect backdrop for bridal and baby showers. Our elegant spaces photograph beautifully and create the intimate atmosphere your celebration deserves.",
    "From brunch to afternoon tea, our curated menus and dedicated coordinator make planning simple so you can focus on celebrating.",
  ],
  aboutImages: ['/images/events/dsc05521.webp', '/images/roostertail-433_websize.webp'],
  faq: [
    { question: 'What times are available for showers?', answer: 'Afternoons are the most popular time for showers. We also host morning brunch and evening time slots.' },
    { question: 'What is the minimum guest count?', answer: 'We can accommodate intimate showers starting at 20 guests up to 300+ guests.' },
    { question: 'Can we do our own decorating?', answer: 'Yes! You are welcome to bring your own decorations, or we can connect you with our preferred decorators for custom setups.' },
    { question: 'Do you offer brunch menus?', answer: 'Yes, our brunch packages are specifically designed for showers and include options like mimosa bars, waffle stations, and fresh fruit displays.' },
    { question: 'Is there space for games and activities?', answer: 'Absolutely. We set aside dedicated areas for gift tables, games, and photo displays based on your needs.' },
  ],
  ctaText: 'An elegant celebration made simple.',
  ctaSubtext: 'Talk to one of our venue coordinators about your shower.',
  dateHeadline: 'When is the shower?',
  dateSubtext: 'Helps us check availability',
  dateOptions: [
    { label: 'This month', icon: '🎀', img: '/images/events/dsc05521.webp' },
    { label: 'Next 1-3 months', icon: '🌸', img: '/images/events/elegant-place-setting-emerald-table-runner-overhead.webp' },
    { label: '3-6 months out', icon: '📅', img: '/images/events/dsc03600.webp' },
    { label: 'Just exploring', icon: '🔮', img: '/images/roostertail-242_websize.webp' },
  ],
  guestCountHeadline: 'How many guests?',
  guestCountSubtext: 'Helps us recommend the right space',
  guestCountOptions: [
    { label: 'Under 30', icon: '🎀', img: '/images/events/dsc05521.webp' },
    { label: '30-60', icon: '🌸', img: '/images/events/elegant-place-setting-emerald-table-runner-overhead.webp' },
    { label: '60-100', icon: '🥂', img: '/images/events/dsc03600.webp' },
    { label: '100+', icon: '✨', img: '/images/roostertail-433_websize.webp' },
  ],
  detailsHeadline: 'Tell us about the shower',
  detailsSubtext: 'So we can recommend the perfect setup',
  detailFields: [
    { key: 'showerType', type: 'select', label: 'Type of shower', options: ['Bridal Shower', 'Baby Shower', 'Other'], required: true },
    { key: 'timeOfDay', type: 'select', label: 'Preferred time', options: ['Morning Brunch', 'Afternoon Lunch', 'Evening Celebration'], required: true },
    { key: 'catering', type: 'select', label: 'Catering preference', options: ['Appetizers', 'Lunch', 'Brunch'], required: false },
  ],
  roles: [
    { label: 'The Bride / Guest of Honor', img: '/images/events/dsc05521.webp' },
    { label: 'Mother / Family Member', img: '/images/events/elegant-place-setting-emerald-table-runner-overhead.webp' },
    { label: 'Maid of Honor / Friend', img: '/images/events/dsc03600.webp' },
    { label: 'Other', img: '/images/roostertail-212_websize.webp' },
  ],
  roleHeadline: 'Who are you?',
  roleSubtext: 'Helps us personalize your experience',
  formHeadline: "Let's make it beautiful",
  formSubtext: 'Our events team will personally reach out within 24 hours.',
  nameLabel: 'Your name',
  secondFieldLabel: 'Guest of honor\'s name',
  submitText: "Let's get in touch with the coordinator \u2192",
  thankYouHeadline: "It's going to be beautiful",
  thankYouText: 'One of our venue coordinators will personally reach out within 24 hours to discuss your shower.',
  analyticsEventName: 'shower_funnel',
  totalSteps: 8,
}

// ─── OTHER EVENTS ─────────────────────────────────────────────────
export const otherConfig: EventConfig = {
  slug: 'other',
  eventType: 'Other Events',
  heroTagline: "Detroit's Waterfront Venue Since 1958",
  heroHeadline: 'Your event. Your vision. Our waterfront.',
  heroQuestion: 'Have you been to an event at The Roostertail?',
  heroOptions: [
    { label: 'Yes!', img: '/images/events/roostertail-building-exterior-vintage-neon-sign-night.webp' },
    { label: 'Not yet', img: '/images/events/ballroom-empty-setup-paper-lanterns-waterfront-golden-hour.webp' },
  ],
  socialProofText: 'Over 10,000 events hosted since 1958',
  socialProofSubtext: 'Whatever you are celebrating, we have done it before.',
  features: [
    { icon: '🏛️', title: 'Versatile spaces', desc: 'Multiple rooms for any event type' },
    { icon: '🍽️', title: 'Full catering', desc: 'Chef-prepared menus customized to you' },
    { icon: '🥂', title: 'Bar service', desc: 'Open bar, cash bar, or custom packages' },
    { icon: '💡', title: 'Dance floor & stage', desc: 'Stage, dance floor, and permanently installed LED lighting' },
    { icon: '🌅', title: 'Waterfront views', desc: 'Right on the Detroit River' },
    { icon: '🅿️', title: 'On-site parking', desc: 'Convenient self-parking included' },
    { icon: '📋', title: 'Venue coordinator', desc: 'Your point person for planning' },
    { icon: '👔', title: 'Service staff', desc: 'Full setup, service, and breakdown' },
    { icon: '🏡', title: 'Private patio', desc: 'Exclusive outdoor space' },
    { icon: '✨', title: 'Custom lighting', desc: 'Uplighting to set the mood' },
  ],
  testimonials: [
    {
      quote: "My high school class just had their 30th reunion at the Roostertail and I cannot say enough wonderful things about the night. The decor was outstanding, the food top notch, and the views out of this world. They managed to out-do our prom.",
      name: 'Danielle DeLuca-Pytell, Reunion Committee',
      img: '/images/events/roostertail-building-exterior-vintage-neon-sign-night.webp',
    },
    {
      quote: "We celebrated our 50th Wedding Anniversary in the Club Room. We spoke with Shawna and told her our story. She embraced us, our family, and designed an evening we will never forget. Six children, 20 grandchildren, and 2 great grandchildren treated to an elegant atmosphere.",
      name: 'Linda Pittiglio',
      img: '/images/events/ballroom-empty-setup-paper-lanterns-waterfront-golden-hour.webp',
    },
    {
      quote: "Working with Nicole and Shawna on our Cass Tech 50th high school reunion was absolutely wonderful. They have fantastic attention to detail. Our reunion gala will be talked about for years to come because the Roostertail delivered.",
      name: 'Corlyss Jenkins, Cass Tech Reunion',
      img: '/images/events/temptations-motown-group-blue-suits-venue-entrance.webp',
    },
  ],
  gallery: [
    { src: '/images/events/roostertail-building-exterior-vintage-neon-sign-night.webp', alt: 'Roostertail exterior' },
    { src: '/images/events/ballroom-empty-setup-paper-lanterns-waterfront-golden-hour.webp', alt: 'Ballroom at golden hour' },
    { src: '/images/events/temptations-motown-group-blue-suits-venue-entrance.webp', alt: 'Live performance at The Roostertail' },
    { src: '/images/events/lobster-steak-dinner-plates-server-tray.webp', alt: 'Fine dining' },
    { src: '/images/events/cocktail-hour-guests-mingling-paper-lanterns.webp', alt: 'Cocktail hour' },
    { src: '/images/events/cocktail-hour-guests-mingling-paper-lanterns.webp', alt: 'Event celebration' },
  ],
  aboutHeadline: "Whatever the occasion, we are ready",
  aboutText: [
    "Since 1958, The Roostertail has hosted every kind of celebration you can imagine. Reunions, fundraisers, retirements, graduations, galas, memorials, and everything in between.",
    "Our waterfront venue and experienced staff adapt to your vision. Tell us what you are planning and we will make it happen.",
  ],
  aboutImages: ['/images/events/temptations-motown-group-blue-suits-venue-entrance.webp', '/images/events/roostertail-building-exterior-vintage-neon-sign-night.webp'],
  faq: [
    { question: 'What types of events do you host?', answer: 'We host reunions, fundraisers, galas, retirements, graduations, memorials, celebrations of life, religious ceremonies, quinceañeras, and more. If you can celebrate it, we have hosted it.' },
    { question: 'How many guests can you accommodate?', answer: 'Our venue accommodates 30 to 400+ guests depending on the event format and room selection.' },
    { question: 'Can we customize the menu?', answer: 'Please talk to a venue coordinator for specific details regarding your menu.' },
    { question: 'Do you offer daytime events?', answer: 'Yes, we host morning, afternoon, and evening events. Our waterfront is especially beautiful during daylight hours.' },
    { question: 'How far in advance should we book?', answer: 'We recommend 2-6 months advance booking, depending on the day of the week and time of year. Weekend dates fill up faster.' },
  ],
  ctaText: 'Whatever the occasion, let us help.',
  ctaSubtext: 'Talk to one of our venue coordinators.',
  dateHeadline: 'When is your event?',
  dateSubtext: 'Helps us check availability',
  dateOptions: [
    { label: 'This month', icon: '📅', img: '/images/events/roostertail-building-exterior-vintage-neon-sign-night.webp' },
    { label: 'Next 1-3 months', icon: '🗓️', img: '/images/events/ballroom-empty-setup-paper-lanterns-waterfront-golden-hour.webp' },
    { label: '3-6 months out', icon: '📆', img: '/images/events/temptations-motown-group-blue-suits-venue-entrance.webp' },
    { label: 'Just exploring', icon: '🔮', img: '/images/events/cocktail-hour-guests-mingling-paper-lanterns.webp' },
  ],
  guestCountHeadline: 'How many guests?',
  guestCountSubtext: 'Helps us recommend the right space',
  guestCountOptions: [
    { label: 'Under 50', icon: '👥', img: '/images/events/roostertail-building-exterior-vintage-neon-sign-night.webp' },
    { label: '50-150', icon: '🎉', img: '/images/events/ballroom-empty-setup-paper-lanterns-waterfront-golden-hour.webp' },
    { label: '150-300', icon: '🥂', img: '/images/events/temptations-motown-group-blue-suits-venue-entrance.webp' },
    { label: '300+', icon: '✨', img: '/images/events/cocktail-hour-guests-mingling-paper-lanterns.webp' },
  ],
  detailsHeadline: 'Tell us about your event',
  detailsSubtext: 'So we can put together the right proposal',
  detailFields: [
    { key: 'eventSubType', type: 'textarea', label: 'What kind of event are you planning?', placeholder: 'Tell us about your event...', required: true },
    { key: 'catering', type: 'select', label: 'Catering needs', options: ['Buffet', 'Food Stations', 'Appetizers', 'Plated Dinner'], required: false },
    { key: 'additionalNotes', type: 'text', label: 'Anything else we should know?', placeholder: 'Tell us about your vision...', required: false },
  ],
  roles: [
    { label: 'Event Organizer', img: '/images/events/roostertail-building-exterior-vintage-neon-sign-night.webp' },
    { label: 'Family Member', img: '/images/events/ballroom-empty-setup-paper-lanterns-waterfront-golden-hour.webp' },
    { label: 'Event Planner', img: '/images/events/lobster-steak-dinner-plates-server-tray.webp' },
    { label: 'Other', img: '/images/events/temptations-motown-group-blue-suits-venue-entrance.webp' },
  ],
  roleHeadline: 'Who are you?',
  roleSubtext: 'Helps us personalize your experience',
  formHeadline: "Let's bring your vision to life",
  formSubtext: 'Our events team will personally reach out within 24 hours.',
  nameLabel: 'Your name',
  secondFieldLabel: 'Organization or group name (optional)',
  submitText: "Let's get in touch with the coordinator \u2192",
  thankYouHeadline: "We're excited to help",
  thankYouText: 'One of our venue coordinators will personally reach out within 24 hours to discuss your event.',
  analyticsEventName: 'other_funnel',
  totalSteps: 8,
}

// All configs indexed by slug
export const eventConfigs: Record<string, EventConfig> = {
  corporate: corporateConfig,
  holiday: holidayConfig,
  prom: promConfig,
  birthday: birthdayConfig,
  shower: showerConfig,
  other: otherConfig,
}

// Event type card data for the main events hub page
export const eventTypeCards = [
  { slug: 'wedding', label: 'Weddings', img: '/images/couple-dock-waterfront-golden-hour.webp', desc: 'All-inclusive waterfront weddings on the Detroit River' },
  { slug: 'corporate', label: 'Corporate Events', img: '/images/roostertail-501_websize.webp', desc: 'Conferences, galas, and team celebrations' },
  { slug: 'holiday', label: 'Holiday Parties', img: '/images/roostertail-588_websize.webp', desc: 'The holiday party they will actually talk about' },
  { slug: 'prom', label: 'Prom', img: '/images/events/dsc03447.webp', desc: 'Make prom night unforgettable' },
  { slug: 'birthday', label: 'Birthdays', img: '/images/events/470.webp', desc: 'Celebrate milestones in style' },
  { slug: 'shower', label: 'Showers', img: '/images/events/dsc05521.webp', desc: 'Picture-perfect bridal and baby showers' },
  { slug: 'other', label: 'Other Events', img: '/images/events/roostertail-building-exterior-vintage-neon-sign-night.webp', desc: 'Reunions, galas, fundraisers, and more' },
]
