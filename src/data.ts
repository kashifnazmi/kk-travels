import { Destination, TravelService, Testimonial, BlogPost, FAQItem } from './types';

export const STATS = [
  { value: 12, suffix: 'K+', label: 'Happy Travelers' },
  { value: 150, suffix: '+', label: 'Unique Destinations' },
  { value: 15, suffix: 'Y+', label: 'Travel Experience' },
  { value: 99, suffix: '%', label: 'Satisfaction Rate' },
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-bali',
    title: 'Bali Island Paradise',
    subtitle: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    category: 'International',
    rating: 4.9,
    reviewCount: 342,
    duration: '6 Days / 5 Nights',
    price: 849,
    originalPrice: 1099,
    featured: true,
    tags: ['Beach', 'Culture', 'Luxury', 'Honeymoon'],
    description: 'Immerse yourself in Bali’s deep spiritual heritage, crystal-clear blue lagoons, lush tiered rice terraces, and dramatic sunsets reflecting on pristine modern resorts.',
    highlights: [
      'Private villa with private infinity pool',
      'Guided sunset tour of Uluwatu Temple & Kecak dance',
      'Balinese traditional spa and massage session',
      'Sacred Monkey Forest & Ubud cultural markets trek',
      'Snorkeling at Nusa Penida private beach'
    ],
    itinerary: [
      'Day 1: Arrival in Denpasar, transfer to your private beach villa in Seminyak. Welcome drink & evening beach buffet.',
      'Day 2: Morning yoga session inside Ubud rice terrace. Afternoon art market shopping & spa.',
      'Day 3: Speedboat transfer to Nusa Penida. Snorkel with manta rays and take pictures at Kelingking Beach.',
      'Day 4: Guided trek to Mount Batur at sunrise. Relaxing hot springs soak after noon.',
      'Day 5: Sunset pilgrimage to beautiful Uluwatu Temple. Traditional fire dance performance at dusk.',
      'Day 6: Final leisure breakfast, souvenir packing, and private chauffeur drive to airport.'
    ]
  },
  {
    id: 'dest-swiss',
    title: 'Alpine Swiss Magic',
    subtitle: 'Interlaken & Zermatt, Switzerland',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    category: 'International',
    rating: 4.95,
    reviewCount: 218,
    duration: '7 Days / 6 Nights',
    price: 2490,
    originalPrice: 2950,
    featured: true,
    tags: ['Alps', 'Snow', 'Adventure', 'Scenic'],
    description: 'Experience majestic snow-covered peaks, scenic alpine trains, tranquil deep blue lakes, and luxury Swiss chalet stays under the eye of the legendary Matterhorn.',
    highlights: [
      'Scenic train passage on the Glacier Express',
      'Zermatt Matterhorn Glacier Paradise cable car ride',
      'Five-star alpine boutique chalet with outdoor hot pool',
      'Private Swiss chocolate workshop in Interlaken',
      'Guided snow trekking or skiing in Jungfraujoch'
    ],
    itinerary: [
      'Day 1: Arrival in Zurich, luxury panoramic shuttle to Interlaken. Check-in at lakeview chalet.',
      'Day 2: Mountain train to Jungfraujoch (Top of Europe). Guided Sphinx Observatory tour.',
      'Day 3: Cruise across Lake Thun, alpine village strolls, and private Swiss cheese fondue testing.',
      'Day 4: Travel through scenic rail system to car-free Zermatt village with pristine mountain views.',
      'Day 5: Ride the Gornergrat cogwheel railway. Spectacular Matterhorn view and photo walk.',
      'Day 6: Glacier skiing experience or custom spa day. Evening Alpine champagne toast.',
      'Day 7: Sunrise Matterhorn photography check-out. High-speed express travel back to Zurich.'
    ]
  },
  {
    id: 'dest-maldives',
    title: 'Ultra-Luxury Maldives Lagoon',
    subtitle: 'Male Atoll, Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    category: 'Honeymoon',
    rating: 4.88,
    reviewCount: 412,
    duration: '5 Days / 4 Nights',
    price: 1899,
    originalPrice: 2200,
    featured: true,
    tags: ['Water Villa', 'Private Reef', 'Romantic'],
    description: 'Wake up above the water in premium glass-bottomed villas. Swim alongside whale sharks, dine in subterranean glass restaurants, and view perfect turquoise horizons.',
    highlights: [
      'Five-star overwater bungalow with steps directly to the ocean lagoon',
      'All-inclusive private dining with personalized chef',
      'Unsurpassed candlelit ocean pier dinner with live acoustic band',
      'PADI scuba dive at protected vibrant coral gardens',
      'Round-trip marine seaplane transfer of breathtaking atolls'
    ],
    itinerary: [
      'Day 1: Seaplane arrival inside Male. Guided tour of the resort lagoon and romantic water villa allocation.',
      'Day 2: Undersea restaurant lunch. Evening sunset yacht cruise with complimentary high-grade champagne.',
      'Day 3: Deep ocean dolphin safari and coral reef snorkeling. Beach picnic lunch on a isolated sandbar.',
      'Day 4: Indulgent couples massage on private water deck. Candlelit gourmet dining on the oceanfront pier.',
      'Day 5: Wake-up photography. Tropical breakfast cruise, and speed-flight back transfer.'
    ]
  },
  {
    id: 'dest-leh',
    title: 'Ladakh High Passes Adventure',
    subtitle: 'Leh & Nubra Valley, India',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    category: 'Adventure',
    rating: 4.79,
    reviewCount: 184,
    duration: '8 Days / 7 Nights',
    price: 650,
    originalPrice: 850,
    featured: true,
    tags: ['Trekking', 'Mountain Passes', 'Biking', 'Lakes'],
    description: 'Fulfill your ultimate travel bucket list with high-altitude lakes, ancient Buddhist monasteries, camel desert treks, and conquering the highest motorable road in the world.',
    highlights: [
      'Overnight luxury camping on the brilliant shores of Pangong Lake',
      'Drive across the world-famous Khardung La pass (17,580 ft)',
      'Double-humped camel safari among Nubra sand dunes',
      'Spiritual touring of Thiksey & Hemis monasteries',
      'Royal Leh Palace visit and Himalayan bonfire night'
    ],
    itinerary: [
      'Day 1: Fly into Leh. Full day rest and altitude acclimatization at deluxe boutique mountain hotel.',
      'Day 2: Morning walk to Leh Palace. Sunset viewpoints from Shanti Stupa with panoramic city sights.',
      'Day 3: Scenic drive to Nubra Valley passing Khardung La. Sand dune camel safari during dusk hours.',
      'Day 4: Explore beautiful Diskit Monastery. Scenic drive to pristine retreat camp near Shyok river.',
      'Day 5: Breath-taking road trip to infinite Pangong Lake (the lake of five colors). Lakeside stargazing.',
      'Day 6: Early morning lake reflection photography. Travel back to Leh via Chang La pass.',
      'Day 7: Day adventure of sangam (confluence of Indus & Zanskar) and Magnetic Hill wonders.',
      'Day 8: Departure from Leh with lifetime Himalayan memories.'
    ]
  },
  {
    id: 'dest-kerala',
    title: 'Emerald Kerala Backwaters',
    subtitle: 'Alleppey & Munnar, India',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    category: 'Domestic',
    rating: 4.85,
    reviewCount: 290,
    duration: '6 Days / 5 Nights',
    price: 490,
    originalPrice: 620,
    featured: false,
    tags: ['Nature', 'Houseboat', 'Tea Gardens', 'Spices'],
    description: 'Drift away on luxury houseboats navigating tranquil palm-fringed waterways, visit expansive mist-shrouded green tea plantations, and sample aromatic spice gardens.',
    highlights: [
      'Full-day private houseboat cruise with authentic Kerala cuisine',
      'Luxury resort stay amidst mist-kissed Munnar tea gardens',
      'Sighting wild elephants inside Periyar Wildlife Sanctuary',
      'Ayurvedic healing therapy and restorative massage sessions',
      'Traditional Kathakali performance and village artisans walk'
    ],
    itinerary: [
      'Day 1: Arrival in Cochin, direct scenic drive to Munnar hill station. Check-in and evening tea lounge.',
      'Day 2: Morning Munnar tea estate tour, Eravikulam National Park to spot Nilgiri Tahr, and waterfall stops.',
      'Day 3: Travel to Periyar. Guided spice plantation discovery walk and evening lake boating.',
      'Day 4: Drive to Alleppey. Board traditional wooden ultra-luxury Kettuvallam (Houseboat). Backwater cruise.',
      'Day 5: Transfer to pristine Kovalam beach. Sunrise spa treatments and afternoon sea surfing.',
      'Day 6: Morning coastal walk, seafood brunch, and drop-off at Cochin airport.'
    ]
  },
  {
    id: 'dest-kyoto',
    title: 'Spiritual Kyoto Serenity',
    subtitle: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    category: 'Religious',
    rating: 4.91,
    reviewCount: 165,
    duration: '6 Days / 5 Nights',
    price: 1550,
    originalPrice: 1850,
    featured: false,
    tags: ['Temples', 'Tradition', 'Cherry Blossom', 'Zen'],
    description: 'Discover the heart of Japan. Wander through mesmerizing red torii gates, participate in traditional tea ceremonies, and marvel at shining golden Zen pavilions.',
    highlights: [
      'Private walking tour of Fushimi Inari Shrine and bamboo forests',
      'Exclusive traditional tea ceremony inside a secret geisha estate',
      'Gourmet Multi-course Kaiseki dinner at a Michelin-rated restaurant',
      'Bespoke kimono dressing and professional city photo session',
      'Zen garden meditation course guided by an English-speaking Buddhist priest'
    ],
    itinerary: [
      'Day 1: Welcome to Kyoto. Luxury airport pickup and bullet train link to luxury ryokan stay.',
      'Day 2: Early morning walk at Fushimi Inari torii corridors. Afternoon stroll in Arashiyama Bamboo Grove.',
      'Day 3: Explore Kinkaku-ji (Golden Pavilion) and historic Kiyomizu-dera. Traditional matcha tea experience.',
      'Day 4: Discover Gion historic district. Afternoon geisha culture session and sake brewery tour.',
      'Day 5: Zen meditation at a serene temple. Custom free-time day for shopping, parks, or Osaka day excursion.',
      'Day 6: Final Japanese wellness breakfast, souvenir packing, and bullet train transfer back.'
    ]
  },
  {
    id: 'dest-rajasthan',
    title: 'Royal Rajasthan Heritage',
    subtitle: 'Jaipur, Jodhpur & Udaipur, India',
    image: 'https://images.unsplash.com/photo-1477587458883-471a5bd08bc4?auto=format&fit=crop&w=1200&q=80',
    category: 'Family',
    rating: 4.87,
    reviewCount: 233,
    duration: '7 Days / 6 Nights',
    price: 720,
    originalPrice: 950,
    featured: false,
    tags: ['Palaces', 'Royalty', 'Desert', 'Culture'],
    description: 'Relive the golden age of royalty. Travel past massive fortresses, dine like kings in grand lakeside palaces, and ride camels over infinite sands under golden desert suns.',
    highlights: [
      'Grand stay inside real converted Heritage Palace hotel',
      'Private jeep ride up to Amber Fort in Jaipur',
      'Scenic sunset boat cruise on Lake Pichola in Udaipur',
      'Rajasthani royal dinner with live folk dances and puppet arts',
      'Guided historical exploration of Mehrangarh Fort in Jodhpur'
    ],
    itinerary: [
      'Day 1: Pick up in Delhi and drive to Jaipur. Check-in to Taj Palace hotel with rose petal shower.',
      'Day 2: Amber Fort tour with mirror palace secrets, Hawa Mahal photography, and local astronomical Jantar Mantar.',
      'Day 3: Scenic desert-route drive to the Blue City, Jodhpur. Sighting Mehrangarh Fort and Jaswant Thada.',
      'Day 4: Travel to the Lake City of Udaipur. Sunset tea on the banks of gorgeous Lake Pichola.',
      'Day 5: Lake Pichola luxury cruise. Sighting Jag Mandir palace and visiting majestic City Palace Museum.',
      'Day 6: Traditional Rajasthani pottery tour, local luxury markets shop, and puppet musical theater night.',
      'Day 7: Final breakfast, drive to Udaipur airport for convenient homeward flight connections.'
    ]
  },
  {
    id: 'dest-varanasi',
    title: 'Sacred Ganges & Spiritual Hubs',
    subtitle: 'Varanasi, India',
    image: 'https://images.unsplash.com/photo-1561361531-99e224e7202c?auto=format&fit=crop&w=1200&q=80',
    category: 'Religious',
    rating: 4.89,
    reviewCount: 154,
    duration: '4 Days / 3 Nights',
    price: 380,
    originalPrice: 490,
    featured: false,
    tags: ['Spirituality', 'Rivers', 'Ghats', 'Aarti'],
    description: 'Experience one of the oldest living cities in human civilization. Watch spectacular sunset oil lamp ceremonies on the Ganges and hear ancient Vedic hymns.',
    highlights: [
      'Dawn rowing boat cruise along main Ganges ghats',
      'VIP reservation for Ganga Aarti (Oil lamp ritual)',
      'Excursion to Sarnath, where Lord Buddha gave his first sermon',
      'Walk through hidden temple alleyways of holy Kashi Vishwanath',
      'Savoring authentic Varanasi street sweets and culinary heritage'
    ],
    itinerary: [
      'Day 1: Warm spiritual greeting at Varanasi airport, transfer to premium Ganga-facing luxury heritage lodging.',
      'Day 2: Dawn boat tour showing spiritual morning fire bath rituals of millions. Walk through oldest city alleys.',
      'Day 3: Road excursion to historical Sarnath ruins and museums. Sunset return to view majestic evening Ganga Aarti.',
      'Day 4: Morning temple visiting and handloom shopping (famous Banarasi silks). Airport drop-off in the afternoon.'
    ]
  }
];

export const SERVICES: TravelService[] = [
  {
    id: 'srv-flight',
    title: 'Seamless Flight Booking',
    description: 'We procure exclusive consolidator fares with major elite carriers worldwide, ensuring stress-free premium cabins and convenient schedules.',
    iconName: 'Plane',
    benefits: ['Zero-change fee options', 'Complimentary lounge vouchers', 'Luggage tracking guards', 'Instant seat booking engines']
  },
  {
    id: 'srv-hotel',
    title: 'Elite Hotel Partner Allocations',
    description: 'Access curated directories of 5-star properties, boutique luxury stays, private castles, and overwater paradise islands with complimentary upgrades.',
    iconName: 'Hotel',
    benefits: ['Late Check-out priority', 'Complimentary resort breakfasts', 'Wellness spa vouchers', 'Lowest rate match guarantee']
  },
  {
    id: 'srv-visa',
    title: 'Visa & Immigration Assistance',
    description: 'Expert, end-to-end guidance from documentation reviews to consulate scheduling for guaranteed quick and secure approvals.',
    iconName: 'FileText',
    benefits: ['98.7% visa success assurance', 'Express document pick-up/drop-off', 'One-to-one visa counseling', 'Real-time online status trackers']
  },
  {
    id: 'srv-cab',
    title: 'Private Chauffeur & Transports',
    description: 'Travel safely inside high-quality, air-conditioned vehicles driven by professional local, English-speaking chauffeurs, optimized for sightseeing comfort.',
    iconName: 'Car',
    benefits: ['GPS-equipped luxury fleet', 'Refreshment bar in car', 'Unlimited mileage package inclusions', '24/7 client dispatch backup']
  },
  {
    id: 'srv-insurance',
    title: 'Premium Travel Protection',
    description: 'Complete peace of mind with robust travel insurance covering health, luggage loss, trip pauses, flight delays, and worldwide emergency evacuations.',
    iconName: 'ShieldCheck',
    benefits: ['Fast, digital claims portal', 'No-cache medical network', 'Luggage protection guarantees', '24/7 International emergency help desk']
  },
  {
    id: 'srv-guide',
    title: 'Expert Native Guides',
    description: 'Unlocking hidden wonders, local culture, secret food spots, and deep architectural history with verified, warm multi-lingual native experts.',
    iconName: 'MapPin',
    benefits: ['Passionate, host certified', 'Off-the-beaten-path trails', 'Bespoke translation services', 'Child-friendly custom programs']
  }
];

export const SPECIAL_DEAL = {
  title: 'Exclusive Summer Escape Offer',
  subtitle: 'Bali Island Gateway Ultra Luxury',
  discountText: 'Save up to 25% + Free Couple Spa & Heli-Tour',
  originalPrice: 1099,
  dealPrice: 849,
  promoCode: 'KKSUMMER25',
  endsAt: '2026-07-20T23:59:59Z',
  imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'Luxury Destination Travel Writer',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    text: 'KK Travels exceeded our wildest dreams! Our Bali honeymoon felt like a royal fairytale. The private infinity villas and seamless transfers allowed us to relax completely. Their 24/7 WhatsApp concierge was a lifesaver.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Rajesh Malhotra',
    role: 'Managing Director, Malhotra Group',
    location: 'New Delhi, India',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    text: 'For our annual multi-generational family tour across Rajasthan, KK Travels was outstanding. Handled senior citizens and hyperactive infants flawlessly. The heritage palace hotel selections were exquisite.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Clarissa Mercer',
    role: 'Creative Director',
    location: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    text: 'The Swiss Alpine trip organized by KK Travels was sheer paradise. Riding the Glacier Express with pre-negotiated priority glass cabins was breath-taking. They live up to their reputation for high-class execution.',
    rating: 5
  }
];

export const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    title: 'Traditional Temple in Ubud, Bali',
    region: 'Bali'
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    title: 'Snow-capped Swiss Alps Reflection',
    region: 'Switzerland'
  },
  {
    url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    title: 'Private Overwater Maldives Villas',
    region: 'Maldives'
  },
  {
    url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    title: 'Serene Pangong Lake in Ladakh',
    region: 'India'
  },
  {
    url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    title: 'Alleppey Backwater Palm Houseboat',
    region: 'India'
  },
  {
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    title: 'Kyoto Golden Pavilion and Zen Lake',
    region: 'Japan'
  },
  {
    url: 'https://images.unsplash.com/photo-1477587458883-471a5bd08bc4?auto=format&fit=crop&w=800&q=80',
    title: 'Glorious Rajasthan Palace Facade',
    region: 'India'
  },
  {
    url: 'https://images.unsplash.com/photo-1561361531-99e224e7202c?auto=format&fit=crop&w=800&q=80',
    title: 'Ganga Daily Aarti Ceremony in Varanasi',
    region: 'India'
  },
  {
    url: 'https://images.unsplash.com/photo-1522083165195-342750297f6c?auto=format&fit=crop&w=800&q=80',
    title: 'Eiffel Tower Sunset over Seine River, Paris',
    region: 'France'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Top 10 Hidden Secret Spots in Bali',
    excerpt: 'Skip the massive crowds! Explore these secluded virgin beaches, forgotten water temples, and traditional villages nestled deep in the tropical rainforest of Bali.',
    content: 'Bali has evolved into a global travel hotspot, but beyond the instagrammable swing cafes and heavily packed tourist tracks lies an older, quieter, and deeply spiritual paradise. Today, we reveal the absolute secrets of Northern Bali and East Karangasem. Visit Sekumpul Waterfalls—the absolute king of Balinese waterfalls, consisting of seven hidden cascades nestled in a primeval jungle canyon. Discover Lempuyang Temple’s quiet sibling temples where the view is just as striking without the three-hour queue. Finally, experience Pasut Beach, a beautiful volcanic dark-sand coastline bordered by leaning coconut groves where you will see local fisherman repair boats against an orange tide.',
    date: 'May 24, 2026',
    author: 'Elena Rostova',
    authorRole: 'Chief Adventure Explorer',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    category: 'Travel Guide',
    readTime: '5 min read'
  },
  {
    id: 'blog-2',
    title: 'Unpacking the Perfect Swiss Alps Pack Essentials',
    excerpt: 'Packing for a climate that ranges from cozy heated valley trains to freezing snowy mountain peaks can be difficult. Here is our official executive style guide.',
    content: 'When people travel to Zermatt or Jungfraujoch, they often misjudge the extreme microclimates of the Alps. The absolute gold rule is temperature-regulated high-tech layering. Start with a fine, sweat-wicking merino wool base layer. Add an active middle layer such as a premium goose-down lightweight jacket, and secure the exterior with a high-waterproof windbreaker coat. Footwear must support deep treads with sturdy ankle protection—ideal for transition walking from icy glaciers to cobble-stone village squares. Lastly, do not forget high-altitude sunglasses to protect your eyes from intense mountain snow reflections!',
    date: 'April 12, 2026',
    author: 'Oliver Sterling',
    authorRole: 'Luxury Outfitting Advisor',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    category: 'Packing Guide',
    readTime: '4 min read'
  },
  {
    id: 'blog-3',
    title: 'Vedic Philosophy & The Mysteries Of Varanasi',
    excerpt: 'Varanasi is not just a vacation; it is a profound spiritual awakening. Discover how to absorb the culture respectfully, with key insights from local spiritual experts.',
    content: 'Dating back over 3,000 years, Varanasi represents the continuous beating heart of Hindu ontology and Vedic realization. The city teaches the impermanence of physical life with simple grace. When visiting, we advise starting absolute early at 5:00 AM, renting an eco-friendly wooden rowing boat, and drifting quietly along the ancient ghats as the city wakes up with sunrise dips, copper oil lamp prayers, and classical sitar echo streams. Learn about the holy weavers of Sarai Mohana who create majestic Banarasi silk sarees with gold and silver threads—a craft preserved through twelve generations of the same bloodlines.',
    date: 'March 02, 2026',
    author: 'Kashif Nazmi',
    authorRole: 'Director of Cultural Tourism',
    image: 'https://images.unsplash.com/photo-1561361531-99e224e7202c?auto=format&fit=crop&w=800&q=80',
    category: 'Spiritual Heritage',
    readTime: '7 min read'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I submit an inquiry and initiate a package booking?',
    answer: 'Simply complete the customized "Booking Inquiry Form" located on any destination card or our contact page. Once received, our dedicated regional expert will connect with you via WhatsApp or Email within 2 hours to walk you through personalized flight schedules, private villas, and customized daily options.',
    category: 'Booking'
  },
  {
    id: 'faq-2',
    question: 'Can I customize the listed tour packages and itineraries?',
    answer: 'Absolutely! Our itineraries are 100% templates to get you started. KK Travels specializes in completely customized travel and luxury bespoke stays. We can swap hotels, expand stays, add custom adventure modules, or arrange private events like beach proposals and surprise birthday celebrations.',
    category: 'General'
  },
  {
    id: 'faq-3',
    question: 'What is your refund policy in case of unforeseen cancellations?',
    answer: 'We offer ultra-flexible booking terms. Flight cancellations conform to direct airline guidelines. For land packages and private boutique chalets, we offer 100% cash refunds or flexible date modifications for cancellations made up to 14 days prior to departure. We strongly advocate adding travel insurance during checkout for additional security.',
    category: 'Payment'
  },
  {
    id: 'faq-4',
    question: 'Do you offer assistance with entry visas and travel insurance?',
    answer: 'Yes! Every international tour package we offer includes expert end-to-end visa counseling, comprehensive checklist reviews, and priority visa appointment scheduling. We also allocate premium worldwide travel insurance policies custom-tailored to cover sudden trip pauses, luggage safety, and global medical emergencies.',
    category: 'Documents'
  },
  {
    id: 'faq-5',
    question: 'Are flight bookings included in the prices shown above?',
    answer: 'The base pricing represents deluxe ground tours, 5-star hotel partners, private chauffeured transport, expert local tour guides, and entry monument passes. Flights are not included automatically inside the starting pricing, but our ticketing desk will quote the most cost-effective premium airfare from your home airport.',
    category: 'Payment'
  }
];
