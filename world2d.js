// 2D Square World & Place Interior Engine for SunnyDays: Life & Friendship Sim
// Features:
// - Every Place is an ACTUAL visual place with custom walls/sky, floors, architecture & interactive 3D-shaded SVG Furniture!
// - Parents (Mom & Dad) + Siblings (Sister & Brother) + Friends Avatars in Places!
// - Exact Age 0–6 Place Unlocks:
//   Age 0: Home & Car
//   Age 1: Ice Cream Shop & Playground
//   Age 2: Pizza Place & Nursery
//   Age 3: Toy Store & School Bus
//   Age 4: School & Snack Store
//   Age 5: Mall
//   Age 6: Best Friend's Home
// - Age 7+: Unlocks a RANDOM new place every year!
// - Buyable & Interactive Room Furniture System!

const FIXED_WORLD_PLACES = [
  {
    id: 'family-home',
    name: 'Family Home',
    icon: '🏡',
    unlockAge: 0,
    bg: '#FFEFE2', border: '#F4A261', roof: '#E76F51',
    roofStyle: 'pitched',
    desc: 'Live here with Mom, Dad & your Siblings (Ages 0–16)! Fireplace, Sofa, Dining Table & Kitchen!',
    actionLabel: '🏡 Family Home Actions',
    decor: ['🛋️', '🍲', ' fireplace']
  },
  {
    id: 'family-car',
    name: 'Family Car',
    icon: '🚗',
    unlockAge: 0,
    bg: '#E3F2FD', border: '#4EA8DE', roof: '#1D3557',
    roofStyle: 'garage',
    desc: 'Driveway & Road with your Family SUV, Garage, Basketball Hoop & Car Wash station!',
    actionLabel: '🚗 Joyride (-10% Energy ⚡)',
    decor: ['🚙', '🏀', '🧽']
  },
  {
    id: 'ice-cream-shop',
    name: 'Ice Cream Shop',
    icon: '🍦',
    unlockAge: 1,
    bg: '#FFE5EC', border: '#F15BB5', roof: '#C9184A',
    roofStyle: 'awning',
    desc: 'Unlocks at Age 1! Glass Freezer Counter, Sundae Booths, Gumball Machine & Milkshake Bar!',
    actionLabel: '🍦 Eat Ice Cream (+10% Energy ⚡)',
    decor: ['🍨', '🪑', '🍒']
  },
  {
    id: 'playground',
    name: 'Sunny Playground',
    icon: '🛝',
    unlockAge: 1,
    bg: '#E8F8E8', border: '#52B788', roof: '#2D6A4F',
    roofStyle: 'park',
    desc: 'Unlocks at Age 1! Giant Slide Tower, Double Swing Set, Sandbox & Park Bench!',
    actionLabel: '🛝 Play at Park (-15% Energy ⚡)',
    decor: ['🛝', '🌳', '🪣']
  },
  {
    id: 'pizza-place',
    name: 'Pizza Place',
    icon: '🍕',
    unlockAge: 2,
    bg: '#FFF3CD', border: '#F4A261', roof: '#D62828',
    roofStyle: 'awning',
    desc: 'Unlocks at Age 2! Glowing Brick Pizza Oven, Checkered Diner Booths, Soda Fountain & Jukebox!',
    actionLabel: '🍕 Eat Pizza (+10% Energy ⚡)',
    decor: ['🔥', '🍕', '🥤']
  },
  {
    id: 'nursery',
    name: 'Cozy Nursery',
    icon: '🍼',
    unlockAge: 2,
    bg: '#F3E8FF', border: '#9B5DE5', roof: '#7209B7',
    roofStyle: 'pitched',
    desc: 'Unlocks at Age 2! Wooden Toy Cubbies, Finger-Paint Easel, Nap Crib & Rainbow Play Tent!',
    actionLabel: '🍼 Finger-Paint (-15% Energy ⚡)',
    decor: ['🎨', '🧱', '🧸']
  },
  {
    id: 'toy-store',
    name: 'Wonder Toy Store',
    icon: '🧸',
    unlockAge: 3,
    bg: '#FFF0F3', border: '#FF758F', roof: '#E63946',
    roofStyle: 'awning',
    desc: 'Unlocks at Age 3! Giant Plushie Shelves, LEGO Demo Table, Ride-On Toy Train & T-Rex!',
    actionLabel: '🧸 Explore Toys (-15% Energy ⚡)',
    decor: ['🚂', '🧩', '🦖']
  },
  {
    id: 'school-bus',
    name: 'Yellow School Bus',
    icon: '🚌',
    unlockAge: 3,
    bg: '#FFF9DB', border: '#FCC419', roof: '#E67700',
    roofStyle: 'bus',
    desc: 'Unlocks at Age 3! Big Yellow School Bus, Bus Stop Shelter, Bench & Crosswalk!',
    actionLabel: '🚌 Ride School Bus (-15% Energy ⚡)',
    decor: ['🚌', '🚏', '🎒']
  },
  {
    id: 'school',
    name: 'Hometown School',
    icon: '🏫',
    unlockAge: 4,
    bg: '#E0F7FA', border: '#00BBF9', roof: '#0077B6',
    roofStyle: 'pitched',
    desc: 'Unlocks at Age 4! Green Chalkboard, Teacher Desk, Student Desks, Science Table & Lockers!',
    actionLabel: '📚 Study at School (-15% Energy ⚡)',
    decor: ['🏫', '📚', '🔬']
  },
  {
    id: 'snack-store',
    name: 'Corner Snack Store',
    icon: '🍿',
    unlockAge: 4,
    bg: '#FDE2E4', border: '#F28482', roof: '#BC4749',
    roofStyle: 'awning',
    desc: 'Unlocks at Age 4! Slushie Machines, Snack Aisles, Cold Drink Fridge & Pretzel Counter!',
    actionLabel: '🍿 Eat Snacks (+10% Energy ⚡)',
    decor: ['🥨', '🥤', '🍬']
  },
  {
    id: 'mall',
    name: 'Sunnyvale Mall',
    icon: '🛍️',
    unlockAge: 5,
    bg: '#EDE7F6', border: '#7E57C2', roof: '#4527A0',
    roofStyle: 'plaza',
    desc: 'Unlocks at Age 5! Mall Water Fountain, Fashion Boutique, Instant Photo Booth & Food Court!',
    actionLabel: '🛍️ Mall Hangout (-15% Energy ⚡)',
    decor: ['⛲', '👗', '📸']
  },
  {
    id: 'best-friend-home',
    name: "Best Friend's Home",
    icon: '🌟',
    unlockAge: 6,
    bg: '#FFF8E7', border: '#FFB703', roof: '#FB8500',
    roofStyle: 'pitched',
    desc: 'Unlocks at Age 6 to visit, and at Age 21 you move in together! Sectional Couch, Gaming TV & Kitchen!',
    actionLabel: '🌟 Bestie Hangout (-15% Energy ⚡)',
    decor: ['🛋️', '🎮', '🥞']
  },
  {
    id: 'gym',
    name: 'Powerhouse Gym',
    icon: '💪',
    unlockAge: 0,
    bg: '#FEF2F2', border: '#EF4444', roof: '#B91C1C',
    roofStyle: 'plaza',
    desc: 'Powerhouse Fitness Gym! Digital Treadmills, Barbell Bench Press, Dumbbell Rack, Boxing Bag & Smoothie Bar!',
    actionLabel: '💪 Work Out at Gym (-12% Energy ⚡)',
    decor: ['🏋️', '🏃', '🥊']
  }
];

// Pool of Random Places that unlock every year starting at Age 7+!
const RANDOM_PLACES_POOL = [
  {
    id: 'arcade',
    name: 'Neon Retro Arcade',
    icon: '🎮',
    bg: '#E8EAF6', border: '#5C6BC0', roof: '#283593',
    roofStyle: 'plaza',
    desc: 'Neon Arcade Cabinets, Giant Plushie Claw Machine, Air Hockey Table & Prize Booth!',
    actionLabel: '🎮 Play Arcade (-15% Energy ⚡)',
    decor: ['🕹️', '👾', '🎟️']
  },
  {
    id: 'aquarium',
    name: 'Starlight Aquarium',
    icon: '🐠',
    bg: '#E0F2F1', border: '#26A69A', roof: '#00695C',
    roofStyle: 'plaza',
    desc: 'Giant Panoramic Ocean Tank, Jellyfish Cylinder, Touch Tide Pool & Sea Otter Viewing Bench!',
    actionLabel: '🐠 Visit Sea Otters (-15% Energy ⚡)',
    decor: ['🐬', '🦦', '🪼']
  },
  {
    id: 'cinema',
    name: 'Popcorn Movie Theater',
    icon: '🎬',
    bg: '#FFEBEE', border: '#EF5350', roof: '#B71C1C',
    roofStyle: 'awning',
    desc: 'Giant Silver Screen with Velvet Curtains, Recliner Cinema Seats & Buttered Popcorn Stand!',
    actionLabel: '🎬 Watch Movie (-15% Energy ⚡)',
    decor: ['🍿', '🎥', '🎟️']
  },
  {
    id: 'skate-park',
    name: 'Roller & Skate Park',
    icon: '🛹',
    bg: '#E8F5E9', border: '#66BB6A', roof: '#2E7D32',
    roofStyle: 'park',
    desc: 'Concrete Halfpipe Ramp, Grind Rail, Skateboard & Rollerblade Rack & Park Bleachers!',
    actionLabel: '🛹 Skate & Ride (-15% Energy ⚡)',
    decor: ['🛹', '🚲', '🏅']
  },
  {
    id: 'pet-cafe',
    name: 'Cuddle Pet Sanctuary',
    icon: '🐾',
    bg: '#FFF3E0', border: '#FFA726', roof: '#E65100',
    roofStyle: 'pitched',
    desc: 'Multi-Tier Cat Tree Tower, Cozy Puppy & Bunny Playpen, Plush Armchair & Treat Counter!',
    actionLabel: '🐾 Cuddle Pets (-15% Energy ⚡)',
    decor: ['🐶', '🐱', '🐰']
  },
  {
    id: 'waterpark',
    name: 'Splash Wave Waterpark',
    icon: '🏖️',
    bg: '#E1F5FE', border: '#29B6F6', roof: '#0277BD',
    roofStyle: 'park',
    desc: 'Giant Spiral Water Slide, Sparkling Wave Pool, Sunny Lounge Chairs & Tiki Smoothie Hut!',
    actionLabel: '🏖️ Water Slides (-15% Energy ⚡)',
    decor: ['🌊', '🛟', '☀️']
  },
  {
    id: 'bowling',
    name: 'Cosmic Bowling Alley',
    icon: '🎳',
    bg: '#F3E5F5', border: '#AB47BC', roof: '#6A1B9A',
    roofStyle: 'plaza',
    desc: 'Glow-in-the-Dark Bowling Lanes, Pin Setter, Bowling Ball Rack & Retro Score Booth!',
    actionLabel: '🎳 Bowl a Strike (-15% Energy ⚡)',
    decor: ['🎳', '✨', '🏆']
  },
  {
    id: 'planetarium',
    name: 'Galaxy Planetarium',
    icon: '🔭',
    bg: '#E8EAF6', border: '#3F51B5', roof: '#1A237E',
    roofStyle: 'plaza',
    desc: 'Starry Projection Dome, Giant Brass Observatory Telescope, Saturn Model & Reclining Seats!',
    actionLabel: '🔭 Stargaze (-15% Energy ⚡)',
    decor: ['🪐', '🚀', '🌠']
  },
  {
    id: 'amusement-park',
    name: 'Wonder Wheel Funfair',
    icon: '🎡',
    bg: '#FCE4EC', border: '#EC407A', roof: '#AD1457',
    roofStyle: 'park',
    desc: 'Glowing Ferris Wheel, Cotton Candy Cart, Carnival Ring-Toss Booth & Coaster Track!',
    actionLabel: '🎡 Ferris Wheel (-15% Energy ⚡)',
    decor: ['🎢', '🎠', '🍭']
  },
  {
    id: 'bakery-cafe',
    name: 'Honeybee Bakery Café',
    icon: '🧁',
    bg: '#FFF8E1', border: '#FFCA28', roof: '#FF8F00',
    roofStyle: 'awning',
    desc: 'Glass Pastry & Cupcake Case, Espresso Counter, Cozy Bistro Table & Warm Bread Oven!',
    actionLabel: '🧁 Eat Pastries (+10% Energy ⚡)',
    decor: ['🥐', '☕', '🍰']
  },
  {
    id: 'starter-loft',
    name: 'Move-Out Starter Loft',
    icon: '🔑',
    bg: '#E0F7FA', border: '#00ACC1', roof: '#006064',
    roofStyle: 'plaza',
    desc: 'Cozy independent apartment (Age 16+)! Exposed Brick Wall, Loft Bed, Sofa, Guitar & Plants!',
    actionLabel: '😴 Sleep in Loft (+90% Energy ⚡)',
    decor: ['🪴', '🛋️', '🎸']
  },
  {
    id: 'uni-career',
    name: 'College & Career Plaza',
    icon: '🏛️',
    bg: '#ECEFF1', border: '#546E7A', roof: '#263238',
    roofStyle: 'plaza',
    desc: 'University Lecture Podium & Whiteboard, Tech Lab Workstations, Trophy Case & Campus Café!',
    actionLabel: '💼 Study / Work (-15% Energy ⚡)',
    decor: ['🎓', '💻', '🏆']
  }
];

// All Upgradeable / Move-In Homes from the Life Path Tab & Age 16 Move-Out!
const PLAYER_UPGRADE_HOMES_POOL = [
  {
    id: 'starter-loft',
    name: 'Move-Out Starter Loft',
    icon: '🔑',
    bg: '#E0F7FA', border: '#00ACC1', roof: '#006064',
    roofStyle: 'plaza',
    desc: 'Cozy independent apartment (Age 16+)! Exposed Brick Wall, Loft Bed, Sofa, Guitar & Plants!',
    actionLabel: '😴 Sleep in Loft (+90% Energy ⚡)',
    decor: ['🪴', '🛋️', '🎸'],
    isPlayerHome: true
  },
  {
    id: 'sunny-loft',
    name: 'Sunny Loft Apartment',
    icon: '🪴',
    bg: '#E0F2FE', border: '#0284C7', roof: '#0369A1',
    roofStyle: 'plaza',
    desc: 'Your bright Sunny Loft Apartment! Teal Loft Bed, Window Plants, Sofa, Board Game Table & Kitchen!',
    actionLabel: '🪴 Inside Sunny Loft',
    decor: ['🪴', '🛋️', '🎲'],
    isPlayerHome: true
  },
  {
    id: 'maple-cottage',
    name: 'Maple Porch Cottage',
    icon: '🏡',
    bg: '#FEF3C7', border: '#D97706', roof: '#B45309',
    roofStyle: 'pitched',
    desc: 'Your cozy Maple Porch Cottage! Warm Fireplace, Porch Swing, Fenced Pet Yard, Cozy Bed & Kitchen!',
    actionLabel: '🏡 Inside Maple Cottage',
    decor: ['🔥', '🐶', '🛋️'],
    isPlayerHome: true
  },
  {
    id: 'treehouse-villa',
    name: 'Lakeside Craft House',
    icon: '🏰',
    bg: '#F3E8FF', border: '#9333EA', roof: '#6B21A8',
    roofStyle: 'pitched',
    desc: 'Your dream Lakeside Craft House! Luxury Bed, Fireplace, Art & Tech Studio, Arcade & Garden!',
    actionLabel: '🏰 Inside Lakeside House',
    decor: ['🏰', '🎨', '🕹️'],
    isPlayerHome: true
  }
];

// 4x4 Grid coordinates (16 slots inside the 2D Square)
const GRID_COORDS_16 = [
  // Row 1 (Top)
  { x: 14, y: 14 }, { x: 38, y: 14 }, { x: 62, y: 14 }, { x: 86, y: 14 },
  // Row 2
  { x: 14, y: 38 }, { x: 38, y: 38 }, { x: 62, y: 38 }, { x: 86, y: 38 },
  // Row 3
  { x: 14, y: 62 }, { x: 38, y: 62 }, { x: 62, y: 62 }, { x: 86, y: 62 },
  // Row 4 (Bottom)
  { x: 14, y: 86 }, { x: 38, y: 86 }, { x: 62, y: 86 }, { x: 86, y: 86 }
];

function getUnlockedPlayerHomePlaces(state) {
  if (!state) return [];
  const homeIds = new Set();
  if (Array.isArray(state.ownedHomes)) {
    state.ownedHomes.forEach(id => {
      if (id && id !== 'family-room' && id !== 'family-home') homeIds.add(id);
    });
  }
  if (state.homeId && state.homeId !== 'family-room' && state.homeId !== 'family-home') {
    homeIds.add(state.homeId);
  }
  if (state.livingWith === 'moved-out-16') {
    homeIds.add('starter-loft');
  }
  const result = [];
  homeIds.forEach(hId => {
    const found = PLAYER_UPGRADE_HOMES_POOL.find(h => h.id === hId);
    if (found) {
      result.push({
        ...found,
        unlockAge: 0
      });
    }
  });
  return result;
}

function getActiveWorldPlaces(state) {
  const list = FIXED_WORLD_PLACES.map((p, idx) => ({
    ...p,
    x: GRID_COORDS_16[idx].x,
    y: GRID_COORDS_16[idx].y,
    w: 21,
    h: 19,
    isRandom: false
  }));

  // 1. Always prioritize showing all Homes the player owns/unlocked on the 2D Town Map!
  const remainingSlots = Math.max(0, GRID_COORDS_16.length - FIXED_WORLD_PLACES.length);
  const ownedHomePlaces = getUnlockedPlayerHomePlaces(state);
  const ownedHomeIds = new Set(ownedHomePlaces.map(h => h.id));

  // 2. Fill any remaining bottom-row slots with the most recent unlocked random places
  const unlockedRandomIds = (state.unlockedRandomPlaces || []).filter(id => !ownedHomeIds.has(id));
  const randomNeeded = Math.max(0, remainingSlots - ownedHomePlaces.length);
  const visibleRandomObjs = unlockedRandomIds.slice(-randomNeeded).map((rId, idx) => {
    const found = RANDOM_PLACES_POOL.find(r => r.id === rId);
    if (!found) return null;
    const unlockedAt = (state.randomUnlockAges && state.randomUnlockAges[rId]) || 7 + idx;
    return {
      ...found,
      unlockAge: unlockedAt,
      isRandom: true
    };
  }).filter(Boolean);

  const bottomRowPlaces = [...ownedHomePlaces, ...visibleRandomObjs].slice(0, remainingSlots);

  for (let i = 0; i < remainingSlots; i++) {
    const coord = GRID_COORDS_16[FIXED_WORLD_PLACES.length + i];
    const placeObj = bottomRowPlaces[i];
    if (placeObj) {
      list.push({
        ...placeObj,
        x: coord.x,
        y: coord.y,
        w: 21,
        h: 19
      });
      continue;
    }
    // Mystery Random Slot placeholder for Age 7+
    list.push({
      id: `mystery-slot-${i}`,
      name: 'Mystery Place',
      icon: '🎲',
      unlockAge: Math.max(7, state.age + 1 + i),
      x: coord.x,
      y: coord.y,
      w: 21,
      h: 19,
      bg: '#E9ECEF',
      border: '#ADB5BD',
      roof: '#868E96',
      desc: 'Unlocks a random new place at Age 7+ (or when you get a new Home)!',
      actionLabel: '🎲 Locked Mystery Place',
      decor: ['❓', '✨', '❓'],
      isMystery: true
    });
  }

  return list;
}

// =========================================================
// SVG FURNITURE LIBRARY FOR MY ROOM & ALL PLACES
// =========================================================

function renderCozyBedSVG(isNight = false, colorTheme = 'pink') {
  const blanketTop = colorTheme === 'teal' ? '#38BDF8' : (colorTheme === 'amber' ? '#FBBF24' : '#FB7185');
  const blanketBot = colorTheme === 'teal' ? '#0284C7' : (colorTheme === 'amber' ? '#D97706' : '#E11D48');
  return `
    <svg width="135" height="105" viewBox="0 0 135 105" xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">
      <!-- Shadow -->
      <ellipse cx="68" cy="98" rx="60" ry="6" fill="rgba(0,0,0,0.16)"/>
      <!-- Wooden Bed Frame & Headboard -->
      <rect x="10" y="26" width="18" height="70" rx="5" fill="#7C4A24"/>
      <rect x="14" y="30" width="10" height="40" rx="3" fill="#9A6034"/>
      <rect x="112" y="48" width="13" height="48" rx="4" fill="#7C4A24"/>
      <!-- Mattress -->
      <rect x="24" y="54" width="94" height="24" rx="6" fill="#FFFDF9" stroke="#E2E8F0" stroke-width="1.5"/>
      <!-- Soft Pillow -->
      <rect x="27" y="43" width="28" height="15" rx="7" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
      <!-- Plush Teddy on Pillow -->
      <circle cx="62" cy="48" r="7" fill="#C68642"/>
      <circle cx="57" cy="42" r="3" fill="#C68642"/>
      <circle cx="67" cy="42" r="3" fill="#C68642"/>
      <circle cx="60" cy="47" r="1.2" fill="#1E293B"/>
      <circle cx="64" cy="47" r="1.2" fill="#1E293B"/>
      <!-- Cozy Quilt / Blanket -->
      <path d="M52,53 L112,53 C116,53 118,56 118,60 L118,78 L52,78 Z" fill="${blanketTop}"/>
      <rect x="52" y="66" width="66" height="12" rx="3" fill="${blanketBot}"/>
      <!-- Bed Base Rail -->
      <rect x="16" y="76" width="104" height="12" rx="3" fill="#8C552B"/>
      ${isNight ? `<text x="68" y="24" font-size="14" text-anchor="middle">💤</text>` : ''}
    </svg>
  `;
}

function renderSofaAndLampSVG(isNight = false) {
  return `
    <svg width="142" height="138" viewBox="0 0 150 145" xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">
      <defs>
        <linearGradient id="sofaBackGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5B8DEF"/>
          <stop offset="100%" stop-color="#2B59C3"/>
        </linearGradient>
        <linearGradient id="sofaSeatGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4A7CE8"/>
          <stop offset="100%" stop-color="#1E40AF"/>
        </linearGradient>
        <linearGradient id="sofaArmGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#5284F0"/>
          <stop offset="100%" stop-color="#1D3B9E"/>
        </linearGradient>
        <linearGradient id="lampShadeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FDE047"/>
          <stop offset="55%" stop-color="#F59E0B"/>
          <stop offset="100%" stop-color="#D97706"/>
        </linearGradient>
        <linearGradient id="lampPoleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#D1D5DB"/>
          <stop offset="100%" stop-color="#9CA3AF"/>
        </linearGradient>
      </defs>
      <!-- Warm Lamp Glow Cone -->
      <polygon points="103,56 68,138 138,138" fill="rgba(253, 224, 71, ${isNight ? '0.32' : '0.14'})" pointer-events="none"/>
      <ellipse cx="62" cy="138" rx="50" ry="5" fill="rgba(0,0,0,0.14)"/>
      <ellipse cx="126" cy="138" rx="13" ry="3.5" fill="rgba(0,0,0,0.14)"/>
      <!-- Curved Silver Floor Lamp & Golden Dome Shade -->
      <path d="M126,133 L126,30 C126,13 103,13 103,28 L103,33" fill="none" stroke="url(#lampPoleGrad)" stroke-width="4.2" stroke-linecap="round"/>
      <path d="M88,52 C88,33 118,33 118,52 Z" fill="url(#lampShadeGrad)"/>
      <rect x="87" y="49" width="32" height="5.5" rx="2.7" fill="#F59E0B"/>
      <path d="M115,137 C115,129 137,129 137,137 Z" fill="url(#lampShadeGrad)"/>
      <rect x="114" y="135" width="24" height="3.5" rx="1.7" fill="#D97706"/>
      <!-- Sofa Feet & Cushions -->
      <rect x="21" y="131" width="9" height="7" rx="2.5" fill="#6366F1"/>
      <rect x="92" y="131" width="9" height="7" rx="2.5" fill="#6366F1"/>
      <rect x="24" y="74" width="36" height="40" rx="9" fill="url(#sofaBackGrad)"/>
      <rect x="61" y="74" width="36" height="40" rx="9" fill="url(#sofaBackGrad)"/>
      <line x1="60.5" y1="77" x2="60.5" y2="110" stroke="rgba(15, 23, 42, 0.22)" stroke-width="2"/>
      <rect x="23" y="106" width="37" height="14" rx="5" fill="url(#sofaSeatGrad)"/>
      <rect x="61" y="106" width="37" height="14" rx="5" fill="url(#sofaSeatGrad)"/>
      <rect x="20" y="117" width="82" height="16" rx="6" fill="#2347B5"/>
      <rect x="14" y="92" width="14" height="40" rx="7" fill="url(#sofaArmGrad)"/>
      <rect x="94" y="92" width="14" height="40" rx="7" fill="url(#sofaArmGrad)"/>
    </svg>
  `;
}

function renderDeskAndShelfSVG(isNight = false) {
  return `
    <svg width="115" height="110" viewBox="0 0 115 110" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="woodTopGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#D99B66"/>
          <stop offset="100%" stop-color="#B0723E"/>
        </linearGradient>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#38BDF8"/>
          <stop offset="100%" stop-color="#2563EB"/>
        </linearGradient>
      </defs>
      <ellipse cx="58" cy="103" rx="44" ry="4.5" fill="rgba(0,0,0,0.14)"/>
      <!-- Desk Chair tucked in -->
      <rect x="36" y="38" width="22" height="24" rx="6" fill="#475569"/>
      <rect x="44" y="62" width="6" height="36" fill="#334155"/>
      <rect x="34" y="96" width="26" height="5" rx="2.5" fill="#334155"/>
      <!-- Desk Legs & Drawer Unit -->
      <rect x="18" y="60" width="7" height="43" rx="3" fill="#8C582B"/>
      <rect x="68" y="60" width="28" height="43" rx="5" fill="#A46735"/>
      <rect x="72" y="66" width="20" height="10" rx="2.5" fill="#C88A55"/>
      <rect x="72" y="80" width="20" height="10" rx="2.5" fill="#C88A55"/>
      <!-- Desk Tabletop -->
      <rect x="12" y="54" width="90" height="8" rx="4" fill="url(#woodTopGrad)"/>
      <!-- Laptop / Monitor on Desk -->
      <rect x="30" y="30" width="32" height="22" rx="4" fill="#334155"/>
      <rect x="33" y="33" width="26" height="16" rx="2" fill="url(#screenGrad)"/>
      <rect x="42" y="51" width="8" height="4" fill="#64748B"/>
      <!-- Stack of Books & Desk Lamp -->
      <rect x="70" y="47" width="18" height="4" rx="2" fill="#F43F5E"/>
      <rect x="72" y="43" width="16" height="4" rx="2" fill="#10B981"/>
    </svg>
  `;
}

function renderTreasureShelfAndFridgeSVG() {
  const bdayCount = (typeof gameState !== 'undefined' && gameState && gameState.birthdayItems) ? gameState.birthdayItems.length : 0;
  return `
    <svg width="108" height="118" viewBox="0 0 108 118" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="54" cy="112" rx="46" ry="5" fill="rgba(0,0,0,0.14)"/>
      <!-- Tall Wooden Bookshelf / Treasure Rack -->
      <rect x="8" y="14" width="52" height="98" rx="5" fill="#9A5B2D" stroke="#713F12" stroke-width="1.5"/>
      <rect x="13" y="20" width="42" height="24" rx="2" fill="#FEF3C7"/>
      <rect x="13" y="50" width="42" height="24" rx="2" fill="#FEF3C7"/>
      <rect x="13" y="80" width="42" height="24" rx="2" fill="#FEF3C7"/>
      <!-- Shelf Treasures (Trophy, Books, Plushie, Gift Box) -->
      <text x="23" y="38" font-size="15">🧸</text>
      <text x="41" y="38" font-size="14">🎁</text>
      <rect x="16" y="57" width="6" height="16" rx="1" fill="#EF4444"/>
      <rect x="23" y="59" width="6" height="14" rx="1" fill="#3B82F6"/>
      <rect x="30" y="55" width="6" height="18" rx="1" fill="#10B981"/>
      <text x="41" y="69" font-size="14">🔬</text>
      <text x="22" y="98" font-size="14">🎨</text>
      <text x="39" y="98" font-size="14">🏆</text>
      <!-- Pastel Mint Mini Fridge on the Right -->
      <rect x="64" y="54" width="38" height="58" rx="7" fill="#6EE7B7" stroke="#059669" stroke-width="2"/>
      <line x1="65" y1="73" x2="101" y2="73" stroke="#059669" stroke-width="1.8"/>
      <rect x="68" y="60" width="4" height="9" rx="2" fill="#FFFFFF"/>
      <rect x="68" y="79" width="4" height="14" rx="2" fill="#FFFFFF"/>
      <text x="83" y="96" font-size="14" text-anchor="middle">🧃</text>
      ${bdayCount > 0 ? `<circle cx="54" cy="14" r="9" fill="#E11D48"/><text x="54" y="18" font-size="10" font-weight="bold" fill="#FFF" text-anchor="middle">${bdayCount}</text>` : ''}
    </svg>
  `;
}

function renderWardrobeAndMirrorSVG() {
  return `
    <svg width="95" height="122" viewBox="0 0 95 122" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="48" cy="116" rx="40" ry="5" fill="rgba(0,0,0,0.14)"/>
      <!-- Wooden Wardrobe Closet -->
      <rect x="8" y="14" width="52" height="100" rx="6" fill="#8D5524" stroke="#5C3614" stroke-width="2"/>
      <rect x="13" y="20" width="20" height="88" rx="3" fill="#A66A38"/>
      <rect x="35" y="20" width="20" height="88" rx="3" fill="#A66A38"/>
      <circle cx="30" cy="64" r="2.5" fill="#FDE047"/>
      <circle cx="38" cy="64" r="2.5" fill="#FDE047"/>
      <!-- Standing Oval Mirror -->
      <ellipse cx="75" cy="66" rx="14" ry="42" fill="#E0F2FE" stroke="#B45309" stroke-width="4"/>
      <line x1="68" y1="42" x2="78" y2="28" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="66" y="108" width="18" height="6" rx="3" fill="#78350F"/>
      <!-- Headphones / Music Note Badge -->
      <text x="34" y="42" font-size="15" text-anchor="middle">👕</text>
      <text x="75" y="68" font-size="14" text-anchor="middle">🎧</text>
    </svg>
  `;
}

function renderWindowSVG(isNight = false, label = '') {
  return `
    <svg width="92" height="74" viewBox="0 0 92 74" xmlns="http://www.w3.org/2000/svg">
      <!-- Window Frame -->
      <rect x="8" y="6" width="76" height="60" rx="6" fill="${isNight ? '#1E1B4B' : '#BAE6FD'}" stroke="#78350F" stroke-width="4"/>
      <!-- Sun or Moon & Stars -->
      ${isNight
        ? `<circle cx="32" cy="24" r="8" fill="#FEF08A"/><text x="58" y="28" font-size="11">✨</text><text x="26" y="50" font-size="10">⭐</text>`
        : `<circle cx="62" cy="22" r="9" fill="#FACC15"/><ellipse cx="32" cy="28" rx="12" ry="6" fill="#FFFFFF"/><ellipse cx="40" cy="26" rx="9" ry="5" fill="#FFFFFF"/>`
      }
      <!-- Window Panes -->
      <line x1="46" y1="6" x2="46" y2="66" stroke="#78350F" stroke-width="3.5"/>
      <line x1="8" y1="36" x2="84" y2="36" stroke="#78350F" stroke-width="3.5"/>
      <!-- Cozy Curtains -->
      <path d="M6,4 L22,4 C20,26 16,44 8,66 L6,66 Z" fill="#F43F5E" opacity="0.88"/>
      <path d="M86,4 L70,4 C72,26 76,44 84,66 L86,66 Z" fill="#F43F5E" opacity="0.88"/>
      <!-- Window Sill -->
      <rect x="4" y="64" width="84" height="6" rx="3" fill="#9A5B2D"/>
      ${label ? `<text x="46" y="58" font-size="9" fill="#FFF" text-anchor="middle" font-weight="bold">${label}</text>` : ''}
    </svg>
  `;
}

function renderCozyRugSVG(color1 = '#F43F5E', color2 = '#FDE047') {
  return `
    <svg width="180" height="44" viewBox="0 0 180 44" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="90" cy="22" rx="84" ry="18" fill="${color1}" stroke="${color2}" stroke-width="3.5"/>
      <ellipse cx="90" cy="22" rx="60" ry="11" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="2" stroke-dasharray="6,4"/>
    </svg>
  `;
}

// Extra Buyable / Placeable Room & Venue Furniture SVGs!
function renderArcadeCabinetSVG() {
  return `
    <svg width="78" height="114" viewBox="0 0 78 114" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="39" cy="108" rx="28" ry="5" fill="rgba(0,0,0,0.2)"/>
      <path d="M16,18 L62,18 L66,48 L58,58 L62,106 L16,106 L20,58 L12,48 Z" fill="#312E81" stroke="#818CF8" stroke-width="2.5"/>
      <rect x="20" y="21" width="38" height="10" rx="2" fill="#F43F5E"/>
      <text x="39" y="29" font-size="7" font-weight="bold" fill="#FFF" text-anchor="middle">ARCADE</text>
      <rect x="20" y="34" width="38" height="22" rx="3" fill="#06B6D4" stroke="#E0F2FE" stroke-width="1.5"/>
      <text x="39" y="49" font-size="13" text-anchor="middle">👾</text>
      <polygon points="14,58 64,58 58,66 20,66" fill="#4338CA"/>
      <circle cx="28" cy="61" r="2.5" fill="#FACC15"/>
      <circle cx="48" cy="61" r="2.5" fill="#EC4899"/>
      <rect x="28" y="74" width="22" height="24" rx="2" fill="#1E1B4B" stroke="#F59E0B" stroke-width="1.5"/>
    </svg>
  `;
}

function renderBeanbagSVG(color = '#EC4899') {
  return `
    <svg width="76" height="66" viewBox="0 0 76 66" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="38" cy="59" rx="31" ry="5" fill="rgba(0,0,0,0.15)"/>
      <path d="M12,46 C8,22 28,12 42,14 C56,16 68,30 64,48 C61,58 16,58 12,46 Z" fill="${color}" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
      <path d="M22,38 C28,44 48,44 54,38" fill="none" stroke="rgba(0,0,0,0.18)" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `;
}

function renderPottedPlantSVG() {
  return `
    <svg width="64" height="86" viewBox="0 0 64 86" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="80" rx="18" ry="4" fill="rgba(0,0,0,0.15)"/>
      <!-- Terracotta Pot -->
      <polygon points="18,54 46,54 41,79 23,79" fill="#EA580C" stroke="#9A3412" stroke-width="1.5"/>
      <rect x="16" y="49" width="32" height="7" rx="3" fill="#F97316"/>
      <!-- Lush Green Leaves -->
      <path d="M32,50 C14,42 10,22 22,18 C28,22 30,36 32,50 Z" fill="#16A34A"/>
      <path d="M32,50 C50,42 54,22 42,18 C36,22 34,36 32,50 Z" fill="#15803D"/>
      <path d="M32,50 C24,28 26,8 32,8 C38,8 40,28 32,50 Z" fill="#22C55E"/>
    </svg>
  `;
}

function renderFlatScreenTVSVG() {
  return `
    <svg width="110" height="90" viewBox="0 0 110 90" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="55" cy="84" rx="45" ry="4.5" fill="rgba(0,0,0,0.15)"/>
      <!-- Wooden Media Console -->
      <rect x="14" y="56" width="82" height="26" rx="4" fill="#78350F" stroke="#451A03" stroke-width="1.5"/>
      <rect x="20" y="61" width="32" height="16" rx="2" fill="#9A3412"/>
      <rect x="58" y="61" width="32" height="16" rx="2" fill="#9A3412"/>
      <!-- Widescreen TV -->
      <rect x="18" y="10" width="74" height="42" rx="4" fill="#1E293B" stroke="#475569" stroke-width="2"/>
      <rect x="22" y="14" width="66" height="34" rx="2" fill="#0EA5E9"/>
      <text x="55" y="36" font-size="16" text-anchor="middle">🎬✨</text>
      <rect x="48" y="52" width="14" height="5" fill="#334155"/>
    </svg>
  `;
}

function renderFireplaceSVG() {
  return `
    <svg width="114" height="106" viewBox="0 0 114 106" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="57" cy="100" rx="48" ry="5" fill="rgba(0,0,0,0.16)"/>
      <!-- Brick Chimney Breast -->
      <rect x="14" y="22" width="86" height="78" rx="4" fill="#B91C1C" stroke="#7F1D1D" stroke-width="2"/>
      <!-- Wood Mantelpiece -->
      <rect x="8" y="16" width="98" height="10" rx="4" fill="#78350F"/>
      <!-- Hearth Opening & Warm Fire -->
      <path d="M30,100 L30,54 C30,38 84,38 84,54 L84,100 Z" fill="#1E293B"/>
      <path d="M44,96 C40,74 52,60 57,50 C62,60 74,74 70,96 Z" fill="#F97316"/>
      <path d="M49,96 C47,80 54,70 57,62 C60,70 67,80 65,96 Z" fill="#FACC15"/>
      <!-- Family Frame on Mantel -->
      <rect x="45" y="2" width="24" height="15" rx="2" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
      <text x="57" y="13" font-size="10" text-anchor="middle">💛</text>
    </svg>
  `;
}

function renderDiningTableSVG() {
  return `
    <svg width="128" height="88" viewBox="0 0 128 88" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="64" cy="81" rx="52" ry="5" fill="rgba(0,0,0,0.14)"/>
      <!-- Left & Right Chairs -->
      <rect x="12" y="30" width="8" height="48" rx="3" fill="#9A3412"/>
      <rect x="12" y="54" width="24" height="6" rx="2" fill="#B45309"/>
      <rect x="30" y="58" width="5" height="20" rx="2" fill="#9A3412"/>
      <rect x="108" y="30" width="8" height="48" rx="3" fill="#9A3412"/>
      <rect x="92" y="54" width="24" height="6" rx="2" fill="#B45309"/>
      <rect x="93" y="58" width="5" height="20" rx="2" fill="#9A3412"/>
      <!-- Table Legs & Top -->
      <rect x="36" y="46" width="7" height="35" rx="2" fill="#78350F"/>
      <rect x="85" y="46" width="7" height="35" rx="2" fill="#78350F"/>
      <rect x="24" y="40" width="80" height="8" rx="4" fill="#D97706"/>
      <!-- Tablecloth & Warm Food -->
      <path d="M40,40 L88,40 L84,52 L44,52 Z" fill="#FEF2F2"/>
      <text x="52" y="37" font-size="15">🍲</text>
      <text x="74" y="37" font-size="14">🥗</text>
    </svg>
  `;
}

function renderFamilyCarSVG(isNight = false) {
  return `
    <svg width="190" height="105" viewBox="0 0 190 105" xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">
      ${isNight ? `<polygon points="172,58 235,38 235,88" fill="rgba(254, 240, 138, 0.38)"/>` : ''}
      <ellipse cx="95" cy="92" rx="78" ry="8" fill="rgba(0,0,0,0.24)"/>
      <!-- Car Body -->
      <path d="M22,56 L42,24 C46,18 54,16 64,16 L122,16 C132,16 140,20 146,28 L162,50 L174,54 C178,56 180,60 180,66 L180,80 C180,84 176,86 170,86 L20,86 C14,86 12,82 12,76 L12,64 C12,58 16,56 22,56 Z" fill="#2563EB" stroke="#1E3A8A" stroke-width="2.5"/>
      <!-- Windows -->
      <path d="M48,24 L86,24 L86,48 L34,48 Z" fill="#BAE6FD" stroke="#1E3A8A" stroke-width="2"/>
      <path d="M92,24 L136,24 L150,48 L92,48 Z" fill="#BAE6FD" stroke="#1E3A8A" stroke-width="2"/>
      <!-- Headlight & Taillight -->
      <rect x="171" y="58" width="9" height="10" rx="3" fill="#FEF08A"/>
      <rect x="12" y="60" width="7" height="10" rx="2" fill="#EF4444"/>
      <!-- Door Handles -->
      <rect x="68" y="55" width="12" height="4" rx="2" fill="#93C5FD"/>
      <rect x="106" y="55" width="12" height="4" rx="2" fill="#93C5FD"/>
      <!-- Wheels -->
      <circle cx="48" cy="84" r="16" fill="#1E293B" stroke="#475569" stroke-width="3"/>
      <circle cx="48" cy="84" r="7" fill="#CBD5E1"/>
      <circle cx="142" cy="84" r="16" fill="#1E293B" stroke="#475569" stroke-width="3"/>
      <circle cx="142" cy="84" r="7" fill="#CBD5E1"/>
    </svg>
  `;
}

function renderIceCreamCounterSVG() {
  return `
    <svg width="145" height="100" viewBox="0 0 145 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="72" cy="94" rx="64" ry="5" fill="rgba(0,0,0,0.14)"/>
      <!-- Glass Display Case -->
      <rect x="14" y="28" width="116" height="30" rx="6" fill="rgba(224, 242, 254, 0.85)" stroke="#EC4899" stroke-width="2.5"/>
      <!-- Colorful Gelato / Ice Cream Tubs -->
      <circle cx="32" cy="48" r="9" fill="#F472B6"/>
      <circle cx="52" cy="48" r="9" fill="#FDE047"/>
      <circle cx="72" cy="48" r="9" fill="#34D399"/>
      <circle cx="92" cy="48" r="9" fill="#60A5FA"/>
      <circle cx="112" cy="48" r="9" fill="#A78BFA"/>
      <!-- Pink & Cream Striped Counter Base -->
      <rect x="10" y="54" width="124" height="38" rx="6" fill="#FDF2F8" stroke="#DB2777" stroke-width="2.5"/>
      <rect x="22" y="56" width="14" height="34" fill="#FBCFE8"/>
      <rect x="50" y="56" width="14" height="34" fill="#FBCFE8"/>
      <rect x="78" y="56" width="14" height="34" fill="#FBCFE8"/>
      <rect x="106" y="56" width="14" height="34" fill="#FBCFE8"/>
      <!-- Giant Cone Sign on Top -->
      <text x="28" y="24" font-size="18">🍦</text>
      <text x="114" y="24" font-size="16">🍨</text>
    </svg>
  `;
}

function renderCafeBoothSVG(color = '#EC4899', foodIcon = '🍨') {
  return `
    <svg width="124" height="86" viewBox="0 0 124 86" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="62" cy="80" rx="52" ry="5" fill="rgba(0,0,0,0.14)"/>
      <!-- Left Booth Bench -->
      <rect x="8" y="30" width="26" height="48" rx="6" fill="${color}"/>
      <rect x="14" y="54" width="28" height="12" rx="4" fill="${color}"/>
      <!-- Right Booth Bench -->
      <rect x="90" y="30" width="26" height="48" rx="6" fill="${color}"/>
      <rect x="82" y="54" width="28" height="12" rx="4" fill="${color}"/>
      <!-- Center Pedestal Table -->
      <rect x="58" y="48" width="8" height="30" fill="#64748B"/>
      <rect x="44" y="75" width="36" height="5" rx="2.5" fill="#475569"/>
      <rect x="34" y="42" width="56" height="7" rx="3.5" fill="#FFFDF9" stroke="#CBD5E1" stroke-width="1.5"/>
      <text x="52" y="39" font-size="15">${foodIcon}</text>
      <text x="72" y="39" font-size="14">🥤</text>
    </svg>
  `;
}

function renderPlaygroundSlideSVG() {
  return `
    <svg width="148" height="125" viewBox="0 0 148 125" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="74" cy="116" rx="62" ry="6" fill="rgba(0,0,0,0.16)"/>
      <!-- Fort Tower Posts -->
      <rect x="24" y="38" width="8" height="78" fill="#B45309"/>
      <rect x="62" y="38" width="8" height="78" fill="#B45309"/>
      <!-- Red Pitched Fort Roof -->
      <polygon points="16,40 47,12 78,40" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>
      <!-- Platform & Guardrail -->
      <rect x="20" y="64" width="54" height="7" rx="3" fill="#D97706"/>
      <rect x="24" y="50" width="46" height="4" fill="#F59E0B"/>
      <!-- Climbing Ladder on Left -->
      <line x1="12" y1="115" x2="24" y2="66" stroke="#3B82F6" stroke-width="4" stroke-linecap="round"/>
      <line x1="22" y1="115" x2="32" y2="66" stroke="#3B82F6" stroke-width="4" stroke-linecap="round"/>
      <line x1="15" y1="102" x2="25" y2="102" stroke="#3B82F6" stroke-width="3"/>
      <line x1="18" y1="88" x2="28" y2="88" stroke="#3B82F6" stroke-width="3"/>
      <line x1="21" y1="75" x2="30" y2="75" stroke="#3B82F6" stroke-width="3"/>
      <!-- Swooping Yellow Slide Chute -->
      <path d="M68,66 C92,66 104,112 136,112" fill="none" stroke="#F59E0B" stroke-width="14" stroke-linecap="round"/>
      <path d="M68,66 C92,66 104,112 136,112" fill="none" stroke="#FDE047" stroke-width="9" stroke-linecap="round"/>
    </svg>
  `;
}

function renderSwingSetSVG() {
  return `
    <svg width="125" height="112" viewBox="0 0 125 112" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="62" cy="106" rx="50" ry="5" fill="rgba(0,0,0,0.14)"/>
      <!-- Metal A-Frame Bars -->
      <line x1="16" y1="105" x2="34" y2="18" stroke="#2563EB" stroke-width="5" stroke-linecap="round"/>
      <line x1="48" y1="105" x2="34" y2="18" stroke="#1D4ED8" stroke-width="5" stroke-linecap="round"/>
      <line x1="80" y1="105" x2="94" y2="18" stroke="#2563EB" stroke-width="5" stroke-linecap="round"/>
      <line x1="110" y1="105" x2="94" y2="18" stroke="#1D4ED8" stroke-width="5" stroke-linecap="round"/>
      <line x1="28" y1="18" x2="100" y2="18" stroke="#EF4444" stroke-width="6" stroke-linecap="round"/>
      <!-- Swing 1 -->
      <line x1="48" y1="20" x2="48" y2="78" stroke="#64748B" stroke-width="2"/>
      <line x1="60" y1="20" x2="60" y2="78" stroke="#64748B" stroke-width="2"/>
      <rect x="44" y="77" width="20" height="5" rx="2.5" fill="#FACC15"/>
      <!-- Swing 2 -->
      <line x1="72" y1="20" x2="72" y2="78" stroke="#64748B" stroke-width="2"/>
      <line x1="84" y1="20" x2="84" y2="78" stroke="#64748B" stroke-width="2"/>
      <rect x="68" y="77" width="20" height="5" rx="2.5" fill="#F43F5E"/>
    </svg>
  `;
}

function renderBrickPizzaOvenSVG() {
  return `
    <svg width="118" height="122" viewBox="0 0 118 122" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="59" cy="115" rx="48" ry="5" fill="rgba(0,0,0,0.16)"/>
      <!-- Chimney -->
      <rect x="44" y="6" width="30" height="28" fill="#991B1B"/>
      <!-- Brick Dome -->
      <path d="M14,74 C14,22 104,22 104,74 Z" fill="#DC2626" stroke="#7F1D1D" stroke-width="2.5"/>
      <!-- Base Stand -->
      <rect x="14" y="72" width="90" height="42" rx="4" fill="#78350F" stroke="#451A03" stroke-width="2"/>
      <!-- Glowing Oven Mouth -->
      <path d="M36,72 C36,46 82,46 82,72 Z" fill="#1E293B"/>
      <path d="M44,72 C44,54 74,54 74,72 Z" fill="#F97316"/>
      <ellipse cx="59" cy="69" rx="14" ry="4" fill="#FDE047"/>
      <text x="59" y="40" font-size="14" text-anchor="middle">🍕🔥</text>
    </svg>
  `;
}

function renderSchoolChalkboardSVG() {
  return `
    <svg width="160" height="84" viewBox="0 0 160 84" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="148" height="68" rx="5" fill="#14532D" stroke="#9A5B2D" stroke-width="5"/>
      <text x="80" y="34" font-size="12" fill="#FFFFFF" font-family="monospace" font-weight="bold" text-anchor="middle">ABC • 1 + 2 = 3 • 🔬</text>
      <text x="80" y="54" font-size="10" fill="#A7F3D0" font-family="sans-serif" text-anchor="middle">Hometown School 🌟</text>
      <!-- Chalk Ledge -->
      <rect x="4" y="74" width="152" height="6" rx="2" fill="#78350F"/>
      <rect x="34" y="71" width="12" height="3" fill="#FFFFFF"/>
      <rect x="52" y="70" width="16" height="4" rx="1" fill="#F59E0B"/>
    </svg>
  `;
}

function renderYellowSchoolBusSVG() {
  return `
    <svg width="205" height="108" viewBox="0 0 205 108" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="102" cy="96" rx="88" ry="7" fill="rgba(0,0,0,0.22)"/>
      <!-- Bus Body -->
      <path d="M16,24 C16,18 22,14 30,14 L162,14 C172,14 178,20 180,32 L180,50 L194,54 C198,56 200,60 200,66 L200,84 L16,84 Z" fill="#FACC15" stroke="#B45309" stroke-width="2.5"/>
      <!-- Black Safety Stripe -->
      <rect x="16" y="56" width="164" height="7" fill="#1E293B"/>
      <text x="96" y="62" font-size="6.5" font-weight="bold" fill="#FACC15" text-anchor="middle">SUNNYDAYS SCHOOL BUS</text>
      <!-- Windows -->
      <rect x="26" y="24" width="22" height="24" rx="3" fill="#BAE6FD" stroke="#1E293B" stroke-width="1.8"/>
      <rect x="54" y="24" width="22" height="24" rx="3" fill="#BAE6FD" stroke="#1E293B" stroke-width="1.8"/>
      <rect x="82" y="24" width="22" height="24" rx="3" fill="#BAE6FD" stroke="#1E293B" stroke-width="1.8"/>
      <rect x="110" y="24" width="22" height="24" rx="3" fill="#BAE6FD" stroke="#1E293B" stroke-width="1.8"/>
      <rect x="138" y="24" width="20" height="54" rx="3" fill="#475569" stroke="#1E293B" stroke-width="1.8"/>
      <path d="M162,24 L176,24 L178,48 L162,48 Z" fill="#BAE6FD" stroke="#1E293B" stroke-width="1.8"/>
      <!-- Red Stop Sign Octagon -->
      <circle cx="130" cy="52" r="9" fill="#EF4444" stroke="#FFFFFF" stroke-width="1.5"/>
      <text x="130" y="54.5" font-size="5.5" font-weight="bold" fill="#FFF" text-anchor="middle">STOP</text>
      <!-- Wheels -->
      <circle cx="52" cy="86" r="15" fill="#1E293B" stroke="#475569" stroke-width="3"/>
      <circle cx="52" cy="86" r="6" fill="#CBD5E1"/>
      <circle cx="158" cy="86" r="15" fill="#1E293B" stroke="#475569" stroke-width="3"/>
      <circle cx="158" cy="86" r="6" fill="#CBD5E1"/>
    </svg>
  `;
}

function renderMallFountainSVG() {
  return `
    <svg width="136" height="106" viewBox="0 0 136 106" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="68" cy="96" rx="58" ry="7" fill="rgba(0,0,0,0.14)"/>
      <!-- Water Sprays -->
      <path d="M68,28 C54,10 38,24 36,52" fill="none" stroke="#38BDF8" stroke-width="3" stroke-dasharray="4,3"/>
      <path d="M68,28 C82,10 98,24 100,52" fill="none" stroke="#38BDF8" stroke-width="3" stroke-dasharray="4,3"/>
      <path d="M68,14 L68,46" fill="none" stroke="#7DD3FC" stroke-width="4" stroke-linecap="round"/>
      <!-- Upper Basin -->
      <rect x="61" y="42" width="14" height="32" fill="#CBD5E1"/>
      <path d="M42,44 L94,44 C90,54 46,54 42,44 Z" fill="#94A3B8" stroke="#64748B" stroke-width="1.5"/>
      <!-- Lower Pool -->
      <ellipse cx="68" cy="78" rx="52" ry="12" fill="#38BDF8" stroke="#94A3B8" stroke-width="5"/>
      <rect x="16" y="78" width="104" height="14" rx="6" fill="#94A3B8"/>
      <text x="68" y="81" font-size="12" text-anchor="middle">✨💧✨</text>
    </svg>
  `;
}

// =========================================================
// EXACT BOBA MILK TEA & FRIDGE SHELF ITEM SVGs (MATCHING USER'S PAINT DRAWING!)
// =========================================================

function renderBobaMilkTeaSVG(size = 115) {
  // Exact match to the user's uploaded Paint drawing:
  // Clear/sky-tinted tapered cup + flat rim lid + purple straw + peachy-orange milk tea + vertical cream highlight + 5 brown tapioca pearls!
  const h = Math.round(size * 1.3);
  return `
    <svg width="${size}" height="${h}" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">
      <defs>
        <linearGradient id="bobaTeaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#F29567"/>
          <stop offset="55%" stop-color="#F5A67A"/>
          <stop offset="100%" stop-color="#F9BE94"/>
        </linearGradient>
      </defs>
      <!-- Purple Straw (Top half above lid + submerged part) -->
      <rect x="46" y="6" width="4" height="27" fill="#8C6FD1"/>
      <rect x="50" y="6" width="4" height="27" fill="#6342B0"/>
      <rect x="46" y="33" width="8" height="12" fill="#A794CE" opacity="0.78"/>
      <!-- Outer Translucent Cup Body -->
      <path d="M19,33 L81,33 L73,115 C72.5,120 69,123 64,123 L36,123 C31,123 27.5,120 27,115 Z"
        fill="rgba(216, 241, 255, 0.78)" stroke="rgba(180, 224, 248, 0.95)" stroke-width="2"/>
      <!-- Top Rim Lid -->
      <rect x="14" y="28" width="72" height="5.5" rx="2.7" fill="#C4E7FA" stroke="#A5D8F3" stroke-width="1"/>
      <!-- Peachy-Orange Milk Tea Fill -->
      <path d="M22.5,42 L77.5,42 L70.5,114 C70,118 67,120 63,120 L37,120 C33,120 30,118 29.5,114 Z"
        fill="url(#bobaTeaGrad)"/>
      <!-- Vertical Cream/White Highlight Strip on Right Side -->
      <path d="M65,48 L71.5,48 L67.5,96 L61.5,96 Z" fill="#FDE2CC" opacity="0.88"/>
      <!-- 5 Tapioca Boba Pearls at Bottom (2 upper row, 3 bottom row — exact match!) -->
      <circle cx="42" cy="99" r="4.6" fill="#6D4C41"/>
      <circle cx="58" cy="99" r="4.6" fill="#6D4C41"/>
      <circle cx="34" cy="111" r="4.6" fill="#6D4C41"/>
      <circle cx="50" cy="111" r="4.6" fill="#6D4C41"/>
      <circle cx="66" cy="111" r="4.6" fill="#6D4C41"/>
    </svg>
  `;
}

function renderFridgeFoodSVG(type) {
  if (type === 'boba') return renderBobaMilkTeaSVG(106);
  if (type === 'sandwich') {
    return `
      <svg width="96" height="82" viewBox="0 0 96 82" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="48" cy="66" rx="42" ry="12" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2.5"/>
        <polygon points="20,58 48,22 76,58" fill="#F59E0B" stroke="#B45309" stroke-width="2.5"/>
        <path d="M24,58 L72,58" stroke="#FACC15" stroke-width="5" stroke-linecap="round"/>
        <path d="M26,54 Q37,49 48,54 T70,54" fill="none" stroke="#22C55E" stroke-width="3.5" stroke-linecap="round"/>
      </svg>
    `;
  }
  if (type === 'soup') {
    return `
      <svg width="96" height="86" viewBox="0 0 96 86" xmlns="http://www.w3.org/2000/svg">
        <path d="M36,12 Q32,20 38,26 M48,8 Q44,16 50,24 M60,12 Q56,20 62,26" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
        <path d="M16,38 L80,38 C80,66 66,76 48,76 C30,76 16,66 16,38 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2.5"/>
        <ellipse cx="48" cy="38" rx="32" ry="9" fill="#FDE047" stroke="#FEF08A" stroke-width="2"/>
        <circle cx="38" cy="38" r="3.5" fill="#22C55E"/>
        <circle cx="56" cy="39" r="3.5" fill="#F97316"/>
      </svg>
    `;
  }
  if (type === 'pizza') {
    return `
      <svg width="96" height="82" viewBox="0 0 96 82" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="48" cy="64" rx="42" ry="12" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2.5"/>
        <polygon points="22,32 74,32 48,68" fill="#FACC15" stroke="#D97706" stroke-width="2.5"/>
        <rect x="20" y="25" width="56" height="9" rx="4.5" fill="#D97706"/>
        <circle cx="42" cy="44" r="5" fill="#DC2626"/>
        <circle cx="55" cy="46" r="5" fill="#DC2626"/>
        <circle cx="48" cy="56" r="4.5" fill="#DC2626"/>
      </svg>
    `;
  }
  if (type === 'apple-bowl') {
    return `
      <svg width="94" height="84" viewBox="0 0 94 84" xmlns="http://www.w3.org/2000/svg">
        <circle cx="36" cy="36" r="13" fill="#EF4444"/>
        <path d="M36,23 Q40,16 45,20" fill="none" stroke="#16A34A" stroke-width="3" stroke-linecap="round"/>
        <circle cx="57" cy="38" r="12" fill="#F43F5E"/>
        <circle cx="46" cy="42" r="7" fill="#6366F1"/>
        <path d="M16,42 L78,42 C76,66 64,74 47,74 C30,74 18,66 16,42 Z" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2.5"/>
      </svg>
    `;
  }
  if (type === 'pancakes') {
    return `
      <svg width="96" height="84" viewBox="0 0 96 84" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="48" cy="68" rx="42" ry="11" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
        <ellipse cx="48" cy="60" rx="28" ry="7" fill="#D97706" stroke="#92400E" stroke-width="1.5"/>
        <ellipse cx="48" cy="52" rx="27" ry="7" fill="#F59E0B" stroke="#92400E" stroke-width="1.5"/>
        <ellipse cx="48" cy="44" rx="26" ry="7" fill="#FBBF24" stroke="#92400E" stroke-width="1.5"/>
        <rect x="42" y="37" width="12" height="7" rx="2" fill="#FEF08A"/>
        <circle cx="36" cy="42" r="4" fill="#E11D48"/>
        <circle cx="60" cy="42" r="4" fill="#E11D48"/>
      </svg>
    `;
  }
  if (type === 'smoothie') {
    return `
      <svg width="86" height="98" viewBox="0 0 86 98" xmlns="http://www.w3.org/2000/svg">
        <line x1="48" y1="6" x2="43" y2="34" stroke="#10B981" stroke-width="5" stroke-linecap="round"/>
        <path d="M22,28 C22,14 64,14 64,28 Z" fill="rgba(255,255,255,0.75)" stroke="#CBD5E1" stroke-width="1.5"/>
        <polygon points="22,28 64,28 58,88 28,88" fill="#EC4899" stroke="#FBCFE8" stroke-width="2"/>
        <circle cx="43" cy="56" r="10" fill="#FDF2F8"/>
        <text x="43" y="60" font-size="11" text-anchor="middle">🍓</text>
      </svg>
    `;
  }
  // Cupcake default
  return `
    <svg width="86" height="86" viewBox="0 0 86 86" xmlns="http://www.w3.org/2000/svg">
      <polygon points="24,48 62,48 55,76 31,76" fill="#F472B6" stroke="#DB2777" stroke-width="2"/>
      <path d="M18,48 C14,32 30,24 43,26 C56,24 72,32 68,48 Z" fill="#FEF08A" stroke="#F59E0B" stroke-width="2"/>
      <circle cx="43" cy="20" r="6" fill="#EF4444"/>
      <path d="M43,14 Q48,8 52,10" fill="none" stroke="#16A34A" stroke-width="2"/>
    </svg>
  `;
}

function renderBackpackFurnitureSVG() {
  const count = (typeof gameState !== 'undefined' && gameState && Array.isArray(gameState.packedBag))
    ? gameState.packedBag.length
    : 3;
  return `
    <svg width="58" height="62" viewBox="0 0 64 68" xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">
      <!-- Floor Shadow -->
      <ellipse cx="32" cy="63" rx="22" ry="4.5" fill="rgba(0,0,0,0.2)"/>
      <!-- Top Carry Handle -->
      <path d="M23,13 C23,5 41,5 41,13" fill="none" stroke="#B45309" stroke-width="4" stroke-linecap="round"/>
      <!-- Side Bottle Pockets -->
      <rect x="7" y="34" width="7" height="20" rx="3.5" fill="#0284C7" stroke="#0369A1" stroke-width="1.5"/>
      <rect x="50" y="34" width="7" height="20" rx="3.5" fill="#0284C7" stroke="#0369A1" stroke-width="1.5"/>
      <!-- Main Backpack Body -->
      <rect x="12" y="13" width="40" height="47" rx="14" fill="#EF4444" stroke="#991B1B" stroke-width="2"/>
      <!-- Top Flap Highlight -->
      <path d="M14,26 C14,15 50,15 50,26 L50,30 L14,30 Z" fill="#F87171"/>
      <!-- Gold Zipper Line -->
      <line x1="15" y1="30" x2="49" y2="30" stroke="#FACC15" stroke-width="2.5" stroke-dasharray="3,2"/>
      <!-- Front Zip Pocket -->
      <rect x="18" y="35" width="28" height="20" rx="7" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.8"/>
      <line x1="21" y1="40" x2="43" y2="40" stroke="#FDE047" stroke-width="2"/>
      <!-- Star Patch & Packed Count Badge -->
      <circle cx="32" cy="22" r="6.5" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.5"/>
      <text x="32" y="25" font-size="8.5" font-weight="900" text-anchor="middle" fill="#92400E">${count}/6</text>
    </svg>
  `;
}

function renderGymTreadmillSVG() {
  return `
    <svg width="118" height="106" viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">
      <!-- Shadow -->
      <ellipse cx="60" cy="102" rx="50" ry="6" fill="rgba(0,0,0,0.18)"/>
      <!-- Running Deck & Belt -->
      <polygon points="14,88 96,82 104,95 10,98" fill="#1E293B" stroke="#475569" stroke-width="2.5"/>
      <line x1="24" y1="91" x2="88" y2="87" stroke="#38BDF8" stroke-width="2" stroke-dasharray="6,4"/>
      <!-- Side Rails -->
      <rect x="12" y="94" width="90" height="6" rx="3" fill="#64748B"/>
      <!-- Upright Frame & Handrails -->
      <line x1="88" y1="86" x2="78" y2="26" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
      <path d="M78,34 L48,46" fill="none" stroke="#EF4444" stroke-width="5" stroke-linecap="round"/>
      <!-- Digital Console Screen -->
      <rect x="64" y="12" width="30" height="18" rx="4" fill="#0F172A" stroke="#EF4444" stroke-width="2"/>
      <rect x="68" y="15" width="22" height="10" rx="2" fill="#22C55E"/>
      <text x="79" y="23" font-size="6.5" font-weight="900" text-anchor="middle" fill="#052E16">RUN ⚡</text>
    </svg>
  `;
}

function renderGymWeightBenchSVG() {
  return `
    <svg width="134" height="106" viewBox="0 0 136 110" xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">
      <!-- Shadow -->
      <ellipse cx="68" cy="102" rx="56" ry="6" fill="rgba(0,0,0,0.18)"/>
      <!-- Steel Rack Uprights -->
      <rect x="30" y="28" width="6" height="68" rx="2" fill="#475569"/>
      <rect x="100" y="28" width="6" height="68" rx="2" fill="#475569"/>
      <!-- Heavy Barbell Bar -->
      <line x1="8" y1="38" x2="128" y2="38" stroke="#94A3B8" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Left Weight Plates (Blue & Red) -->
      <rect x="14" y="22" width="7" height="32" rx="2.5" fill="#DC2626" stroke="#7F1D1D" stroke-width="1.5"/>
      <rect x="22" y="26" width="6" height="24" rx="2" fill="#2563EB" stroke="#1E3A8A" stroke-width="1.5"/>
      <!-- Right Weight Plates (Blue & Red) -->
      <rect x="108" y="26" width="6" height="24" rx="2" fill="#2563EB" stroke="#1E3A8A" stroke-width="1.5"/>
      <rect x="115" y="22" width="7" height="32" rx="2.5" fill="#DC2626" stroke="#7F1D1D" stroke-width="1.5"/>
      <!-- Padded Red Workout Bench -->
      <rect x="40" y="68" width="56" height="12" rx="5" fill="#EF4444" stroke="#991B1B" stroke-width="2"/>
      <rect x="48" y="80" width="8" height="18" rx="2" fill="#334155"/>
      <rect x="80" y="80" width="8" height="18" rx="2" fill="#334155"/>
      <!-- Mini Dumbbells on Floor -->
      <circle cx="58" cy="95" r="5" fill="#1E293B"/>
      <circle cx="78" cy="95" r="5" fill="#1E293B"/>
      <line x1="58" y1="95" x2="78" y2="95" stroke="#64748B" stroke-width="3"/>
    </svg>
  `;
}

function renderGymPunchingBagSVG() {
  return `
    <svg width="96" height="126" viewBox="0 0 96 126" xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">
      <!-- Floor Shadow & Yoga Mat -->
      <rect x="8" y="104" width="80" height="14" rx="7" fill="#8B5CF6" stroke="#5B21B6" stroke-width="2"/>
      <!-- Steel Stand & Chain -->
      <path d="M72,110 L72,10 L44,10" fill="none" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
      <line x1="44" y1="10" x2="44" y2="26" stroke="#94A3B8" stroke-width="3" stroke-dasharray="3,2"/>
      <!-- Heavy Red Boxing Bag -->
      <rect x="28" y="26" width="32" height="66" rx="14" fill="#DC2626" stroke="#7F1D1D" stroke-width="2.5"/>
      <rect x="28" y="42" width="32" height="7" fill="#FACC15"/>
      <rect x="28" y="70" width="32" height="7" fill="#FACC15"/>
      <text x="44" y="62" font-size="11" font-weight="900" text-anchor="middle" fill="#FFFFFF">🥊</text>
    </svg>
  `;
}

const BAG_PACKABLE_ITEMS = [
  // School & Study Essentials
  {
    id: 'notebook',
    name: 'Notebook & Pencil Case',
    icon: '📓',
    category: 'school',
    desc: '+10 Smarts 🧠 & +6 Story',
    effects: { smarts: 10, skill: ['story', 6] }
  },
  {
    id: 'sketchbook',
    name: 'Sketchbook & Crayons',
    icon: '🎨',
    category: 'school',
    desc: '+10 Art 🎨 & +8 Happiness',
    effects: { happiness: 8, skill: ['art', 10] }
  },
  {
    id: 'magnifier',
    name: 'Science Kit & Magnifier',
    icon: '🔬',
    category: 'school',
    desc: '+10 Science 🔬 & +8 Smarts',
    effects: { smarts: 8, skill: ['science', 10] }
  },
  {
    id: 'storybook',
    name: 'Favorite Adventure Book',
    icon: '📖',
    category: 'school',
    desc: '+8 Smarts 🧠 & +8 Happiness',
    effects: { smarts: 8, happiness: 8 }
  },
  // Lunchbox Snacks & Drinks
  {
    id: 'boba',
    name: 'Boba Bubble Milk Tea',
    icon: '🧋',
    category: 'snack',
    desc: '+16% ⚡ Energy & +12 Happiness',
    effects: { energy: 16, happiness: 12 }
  },
  {
    id: 'lunchbox',
    name: 'Grilled Cheese Lunchbox',
    icon: '🍱',
    category: 'snack',
    desc: '+16% ⚡ Energy & +8 Health',
    effects: { energy: 16, health: 8 }
  },
  {
    id: 'apple',
    name: 'Crisp Apple & Berry Pack',
    icon: '🍎',
    category: 'snack',
    desc: '+12% ⚡ Energy & +8 Health',
    effects: { energy: 12, health: 8 }
  },
  {
    id: 'juice',
    name: 'Strawberry Brain Smoothie',
    icon: '🧃',
    category: 'snack',
    desc: '+14% ⚡ Energy & +7 Smarts',
    effects: { energy: 14, smarts: 7 }
  },
  // Fun & Outing Gear
  {
    id: 'plushie',
    name: 'Mini Teddy Plush Buddy',
    icon: '🧸',
    category: 'fun',
    desc: '+12 Happiness 😊 & +8 Kindness',
    effects: { happiness: 12, kindness: 8 }
  },
  {
    id: 'camera',
    name: 'Instant Pocket Camera',
    icon: '📸',
    category: 'fun',
    desc: '+10 Happiness 😊 & +8 Art',
    effects: { happiness: 10, skill: ['art', 8] }
  },
  {
    id: 'waterbottle',
    name: 'Sport Water Bottle & Cap',
    icon: '🧴',
    category: 'fun',
    desc: '+10% ⚡ Energy & +8 Athletics',
    effects: { energy: 10, skill: ['athletics', 8] }
  },
  {
    id: 'handheld',
    name: 'Pocket Game Console',
    icon: '🎮',
    category: 'fun',
    desc: '+12 Happiness 😊 & +8 Smarts',
    effects: { happiness: 12, smarts: 8 }
  }
];

// =========================================================
// INTERACTIVE DECISIONS CATALOG (SCENARIOS + DAILY LIFE CHOICES!)
// =========================================================

const DECISION_SCENARIOS = [
  {
    id: 'dec-ice-cream-truck',
    title: '🍦 The Rainbow Ice Cream Truck!',
    icon: '🍦',
    badge: 'Sweet Dilemma',
    prompt: 'The rainbow Ice Cream Truck just rolled down your street playing jingle music! What do you decide to do?',
    choices: [
      {
        label: '1: Buy a Giant 3-Scoop Waffle Cone!',
        sub: '+15 😊 Happiness, +14% ⚡ Energy & Visit Ice Cream Shop!',
        outcomeText: '🍦 You got a giant 3-scoop waffle cone with rainbow sprinkles at the Ice Cream Shop!',
        targetPlaceId: 'ice-cream-shop',
        stats: { happiness: 15, energy: 14 }
      },
      {
        label: '2: Treat Your Best Friend to Ice Cream & Boba!',
        sub: '+16 🤝 Friend Bond, +14 😊 Happiness & +10 💛 Kindness',
        outcomeText: '🧋🍦 You treated your Best Friend to Ice Cream and Boba Milk Tea! They gave you the biggest hug!',
        targetPlaceId: 'ice-cream-shop',
        stats: { happiness: 14, kindness: 10, friendBoost: 16 }
      },
      {
        label: '3: Save Your Money in Your Piggy Bank Instead',
        sub: '+$12 🪙 Savings Bonus from Mom & +10 🧠 Smarts!',
        outcomeText: '🐷 You decided to save your money! Mom was so proud she added +$12 to your piggy bank!',
        stats: { money: 12, smarts: 10, kindness: 6 }
      },
      {
        label: '4: Open Your Home Fridge for Free Boba Milk Tea!',
        sub: 'Opens Fridge & Drinks Boba (+16% ⚡ Energy, +12 😊)',
        outcomeText: '🧊🧋 Smart choice! You grabbed a cold Boba Bubble Milk Tea right from the bottom shelf of your Fridge!',
        consumeItem: 'boba',
        stats: { smarts: 6 }
      }
    ]
  },
  {
    id: 'dec-lost-puppy',
    title: '🐶 Friendly Golden Puppy in the Park!',
    icon: '🐶',
    badge: 'Kindness Choice',
    prompt: 'A cute golden puppy with a shiny tag runs up to you wagging its tail! What do you decide to do?',
    choices: [
      {
        label: '1: Help Find the Puppy’s Owner Around Town',
        sub: '+$15 🪙 Thank-You Reward, +16 💛 Kindness & +14 😊 Happiness',
        outcomeText: '🐶💛 You reunited the puppy with its owner! They gave you a $15 reward and a huge thank-you!',
        stats: { money: 15, kindness: 16, happiness: 14 }
      },
      {
        label: '2: Play Fetch Together at the Sunny Playground!',
        sub: 'Travels to Playground (+14 😊, +10 💚 Health, +10 🏃 Athletics)',
        outcomeText: '🛝🐶 You ran around the Sunny Playground playing fetch with the happy puppy!',
        targetPlaceId: 'playground',
        stats: { happiness: 14, health: 10, skill: ['athletics', 10] }
      },
      {
        label: '3: Draw "Found Puppy" Posters at Your Study Desk',
        sub: 'Opens Study Desk (+12 🎨 Art, +10 🧠 Smarts, +10 💛 Kindness)',
        outcomeText: '🎨🐶 Your colorful posters helped everyone spot the puppy’s family right away!',
        targetStation: 'desk',
        stats: { smarts: 10, kindness: 10, skill: ['art', 12] }
      },
      {
        label: '4: Ask Mom & Dad to Help Take Care of It',
        sub: '+12 👨‍👩‍👧 Family Bond, +12 💛 Kindness & +10 😊 Happiness',
        outcomeText: '🏡🐶 Mom and Dad gave the puppy a bowl of water and helped call the number on its collar!',
        stats: { kindness: 12, happiness: 10, health: 6 }
      }
    ]
  },
  {
    id: 'dec-family-night',
    title: '🍕 Family Night Vote — You Pick!',
    icon: '🍕',
    badge: 'Family Decision',
    prompt: 'Mom and Dad say YOU get to choose what the whole family does together today! What is your decision?',
    choices: [
      {
        label: '1: Go Bake Our Own Pizza at the Pizza Place!',
        sub: 'Travels to Pizza Oven (+16% ⚡ Energy, +14 😊, +8 🧁 Cooking)',
        outcomeText: '🍕🔥 The whole family went to the Brick-Oven Pizza Place and baked a cheesy masterpiece!',
        targetPlaceId: 'pizza-place',
        targetStation: 'pizza',
        stats: { happiness: 14, energy: 16, skill: ['cooking', 8] }
      },
      {
        label: '2: Take the Family SUV for a Sunset Joyride!',
        sub: 'Travels to Family SUV & Drives (+14 😊 Happiness, +10 💛 Kindness)',
        outcomeText: '🚗🎶 Everyone hopped into the Family SUV and sang road-trip songs together!',
        targetPlaceId: 'family-car',
        liveAction: 'drive',
        stats: { happiness: 14, kindness: 10 }
      },
      {
        label: '3: Visit the Wonder Toy Store Together!',
        sub: 'Travels to Toy Store (+15 😊 Happiness & +$10 Toy Allowance!)',
        outcomeText: '🧸🦖 Dad gave you $10 toy allowance and you explored the Wonder Toy Store together!',
        targetPlaceId: 'toy-store',
        stats: { money: 10, happiness: 15, kindness: 8 }
      },
      {
        label: '4: Stay Home for Mom’s Warm Chicken Soup & Games',
        sub: 'Serves Mom’s Soup (+14% ⚡ Energy, +12 💚 Health, +10 😊)',
        outcomeText: '🍲🎲 You had a cozy night at home with Mom’s Warm Chicken Soup and family board games!',
        consumeItem: 'soup',
        stats: { happiness: 10, kindness: 10 }
      }
    ]
  },
  {
    id: 'dec-school-showcase',
    title: '🏫 The Big School Talent & Science Showcase!',
    icon: '🏆',
    badge: 'School Decision',
    prompt: 'Everyone at Hometown School is picking a special project to present! Which one do you decide to enter?',
    choices: [
      {
        label: '1: Bubbling Volcano & Robotics Science Project!',
        sub: 'Travels to School (+15 🧠 Smarts & +14 🔬 Science Skill)',
        outcomeText: '🔬🌋 Your bubbling volcano and robot won 1st Prize at Hometown School!',
        targetPlaceId: 'school',
        stats: { smarts: 15, happiness: 10, skill: ['science', 14] }
      },
      {
        label: '2: Paint a Giant Rainbow Town Mural!',
        sub: 'Travels to School (+14 🎨 Art Skill, +14 😊 Happiness)',
        outcomeText: '🎨🌈 Everyone clapped for your giant colorful mural in the school hallway!',
        targetPlaceId: 'school',
        stats: { happiness: 14, kindness: 8, skill: ['art', 14] }
      },
      {
        label: '3: Team Up with Your Best Friend on a Story Comic!',
        sub: '+15 🤝 Friend Bond, +12 📖 Storytelling & +12 😊 Happiness',
        outcomeText: '📖🌟 You and your Best Friend wrote and illustrated the funniest comic book in class!',
        targetPlaceId: 'school',
        stats: { happiness: 12, smarts: 10, friendBoost: 15, skill: ['story', 12] }
      },
      {
        label: '4: Take a Cozy Nap in Bed First so You’re Rested!',
        sub: 'Sleeps in Bed (+25% ⚡ Energy & +10 💚 Health)',
        outcomeText: '🛏️💤 You took a refreshing nap in your cozy bed so your brain is 100% recharged!',
        liveAction: 'sleep',
        stats: { health: 10, happiness: 8 }
      }
    ]
  },
  {
    id: 'dec-weekend-allowance',
    title: '🪙 Weekend Allowance & Helper Challenge!',
    icon: '🪙',
    badge: 'Money Decision',
    prompt: 'Mom and Dad offer you a bonus allowance if you pick a helpful project today! What do you choose?',
    choices: [
      {
        label: '1: Wash the Family SUV with the Soapy Sponge!',
        sub: '+$16 🪙 Allowance, +10 🏃 Athletics & Live Car Wash!',
        outcomeText: '🧽🫧 You scrubbed the Family SUV until it sparkled and earned $16!',
        targetPlaceId: 'family-car',
        liveAction: 'wash-car',
        stats: { money: 4, happiness: 10, kindness: 10, skill: ['athletics', 8] }
      },
      {
        label: '2: Pack & Organize Your Backpack & Bedroom',
        sub: '+$14 🪙 Allowance, +10 🧠 Smarts & Opens Bag Packing!',
        outcomeText: '🎒✨ You organized your room and packed your Backpack neatly! Mom gave you $14!',
        targetStation: 'bag',
        stats: { money: 14, smarts: 10, happiness: 10 }
      },
      {
        label: '3: Help Bake Cupcakes & Stock the Kitchen Fridge',
        sub: '+$14 🪙 Allowance, +12 🧁 Cooking & +12% ⚡ Energy',
        outcomeText: '🧁🧊 You baked fresh treats with Mom and earned $14 plus a warm cupcake!',
        stats: { money: 14, energy: 12, happiness: 12, skill: ['cooking', 12] }
      },
      {
        label: '4: Decorate Your Room with New Furniture Instead',
        sub: '+$10 🪙 Decor Grant & Opens Room Furniture Studio!',
        outcomeText: '🪑🪴 Mom gave you a $10 decorating bonus and opened the Room Furniture Studio!',
        targetStation: 'decor',
        stats: { money: 10, happiness: 12, skill: ['art', 6] }
      }
    ]
  },
  {
    id: 'dec-bestie-weekend',
    title: '🌟 Best Friend Weekend Adventure!',
    icon: '🌟',
    badge: 'Friendship Choice',
    prompt: 'Your Best Friend wants to go on a big adventure today and lets you decide where to go!',
    choices: [
      {
        label: '1: Sunnyvale Mall Photo Booth & Fountain!',
        sub: 'Travels to Mall (+16 🤝 Friend Bond, +15 😊 Happiness)',
        outcomeText: '🛍️📸 You and your Bestie took silly photo strips and tossed lucky coins in the Mall Fountain!',
        targetPlaceId: 'mall',
        stats: { happiness: 15, kindness: 10, friendBoost: 16, skill: ['art', 8] }
      },
      {
        label: '2: Gaming & Pancake Party at Best Friend’s Home!',
        sub: 'Travels to Best Friend’s Home (+18 🤝 Bond, +14% ⚡ Energy)',
        outcomeText: '🏡🥞 You played co-op games on the big TV and ate fluffy pancakes at Best Friend’s Home!',
        targetPlaceId: 'best-friend-home',
        stats: { happiness: 15, energy: 14, friendBoost: 18, skill: ['cooking', 6] }
      },
      {
        label: '3: Slushies & Pretzels at the Corner Snack Store!',
        sub: 'Travels to Corner Snack Store (+15% ⚡ Energy, +14 😊)',
        outcomeText: '🍿🥤 You both got blue-raspberry slushies and warm pretzels at the Corner Snack Store!',
        targetPlaceId: 'snack-store',
        stats: { happiness: 14, energy: 15, friendBoost: 14 }
      },
      {
        label: '4: Race Down the Giant Slide at the Playground!',
        sub: 'Travels to Playground & Slides (+15 😊, +10 🏃 Athletics)',
        outcomeText: '🛝☀️ You raced down the Giant Yellow Slide at the Sunny Playground!',
        targetPlaceId: 'playground',
        liveAction: 'slide',
        stats: { happiness: 15, health: 10, friendBoost: 14 }
      }
    ]
  },
  {
    id: 'dec-mystery-ticket',
    title: '🎁 The Golden Mystery Prize Ticket!',
    icon: '🎁',
    badge: 'Prize Decision',
    prompt: 'You found a Golden Prize Ticket! You can trade it in for one of four special rewards — which do you choose?',
    choices: [
      {
        label: '1: The Treasure Chest of Coins (+$25 Cash!)',
        sub: '+$25 🪙 Instant Savings & +12 😊 Happiness!',
        outcomeText: '🪙✨ You opened the Treasure Chest and added $25 to your savings!',
        stats: { money: 25, happiness: 12 }
      },
      {
        label: '2: The Ultimate Boba & Feast Basket!',
        sub: '+25% ⚡ Energy, +15 😊 Happiness & +10 💚 Health!',
        outcomeText: '🧋🥞 You chose the Ultimate Boba & Feast Basket and recharged +25% Energy!',
        stats: { energy: 25, happiness: 15, health: 10 }
      },
      {
        label: '3: The Master Genius & Artist Kit!',
        sub: '+15 🧠 Smarts, +12 🎨 Art & +12 🔬 Science!',
        outcomeText: '🧠🎨 You chose the Master Genius & Artist Kit and leveled up your Smarts, Art & Science!',
        stats: { smarts: 15, skill: ['art', 12], skill2: ['science', 12] }
      },
      {
        label: '4: The Friendship Party Box (Share with Everyone!)',
        sub: '+18 💛 Kindness & +15 🤝 Bond with ALL Friends!',
        outcomeText: '🎈💛 You shared the prize with all your friends! Everyone’s friendship bond soared!',
        stats: { kindness: 18, happiness: 15, allFriendsBoost: 15 }
      }
    ]
  }
];

const LIFE_RULE_DECISIONS = [
  {
    key: 'dailyFocus',
    title: '🎯 My Daily Focus Priority',
    options: [
      { id: 'balanced', label: '🌟 Balanced & Happy (+8 😊)', stats: { happiness: 8, kindness: 5 } },
      { id: 'study', label: '📚 Straight-A Scholar (+10 🧠)', stats: { smarts: 10, skill: ['science', 6] } },
      { id: 'creative', label: '🎨 Super Artist & Musician (+10 🎨)', stats: { happiness: 8, skill: ['art', 10] } },
      { id: 'active', label: '⚽ Sporty & Healthy (+10 💚)', stats: { health: 10, skill: ['athletics', 10] } }
    ]
  },
  {
    key: 'moneyRule',
    title: '🪙 My Pocket Money Rule',
    options: [
      { id: 'saver', label: '🐷 Piggy Bank Saver (+$10 Bonus!)', stats: { money: 10, smarts: 6 } },
      { id: 'treats', label: '🍦 Snacks & Ice Cream Lover (+12% ⚡, +10 😊)', stats: { energy: 12, happiness: 10 } },
      { id: 'generous', label: '🎁 Share with Family & Friends (+12 💛)', stats: { kindness: 12, friendBoost: 10 } }
    ]
  },
  {
    key: 'freeTimeRule',
    title: '🏡 My Favorite Free-Time Activity',
    options: [
      { id: 'boba-chill', label: '🧋 Sip Boba & Relax in Room (+12% ⚡)', stats: { energy: 12, happiness: 8 } },
      { id: 'outdoors', label: '🛝 Play Outside at the Park (+10 😊, +8 💚)', stats: { happiness: 10, health: 8 } },
      { id: 'gaming', label: '🎮 Co-Op Gaming with Bestie (+12 🤝)', stats: { happiness: 10, friendBoost: 12 } }
    ]
  }
];

// =========================================================
// DAILY SCHEDULE PLANNER CATALOG (4 TIME SLOTS: MORNING, AFTERNOON, EVENING, NIGHT)
// =========================================================

const DAILY_SCHEDULE_SLOTS = [
  {
    slotKey: 'morning',
    timeLabel: '🌅 Morning (8:00 AM)',
    color: '#F59E0B',
    bg: '#FFFBEB',
    options: [
      {
        id: 'pack-bag',
        name: '🎒 Pack My Bag & Eat Pancakes',
        desc: '+14% ⚡ Energy, +8 🧠 Smarts & Opens Bag Packing',
        targetStation: 'bag',
        stats: { energy: 14, smarts: 8, happiness: 8 }
      },
      {
        id: 'morning-boba',
        name: '🧋 Drink Boba Milk Tea from Fridge',
        desc: '+16% ⚡ Energy & +12 😊 Happiness (Opens Fridge)',
        consumeItem: 'boba',
        stats: { happiness: 6 }
      },
      {
        id: 'morning-school',
        name: '🏫 Morning Class at Hometown School',
        desc: '+12 🧠 Smarts & +10 🔬 Science (Travels to School)',
        targetPlaceId: 'school',
        stats: { smarts: 12, happiness: 6, skill: ['science', 10] }
      },
      {
        id: 'morning-park',
        name: '💪 Morning Workout at Powerhouse Gym',
        desc: '+12 💚 Health & +12 🏃 Athletics (Travels to Powerhouse Gym)',
        targetPlaceId: 'gym',
        liveAction: 'treadmill',
        stats: { health: 12, happiness: 10, skill: ['athletics', 12] }
      }
    ]
  },
  {
    slotKey: 'afternoon',
    timeLabel: '☀️ Afternoon (1:00 PM)',
    color: '#0284C7',
    bg: '#F0F9FF',
    options: [
      {
        id: 'afternoon-icecream',
        name: '🍦 Visit Rainbow Ice Cream Shop',
        desc: '+14 😊 Happiness & +12% ⚡ Energy (Travels to Ice Cream Shop)',
        targetPlaceId: 'ice-cream-shop',
        stats: { happiness: 14, energy: 12, kindness: 6 }
      },
      {
        id: 'afternoon-toys',
        name: '🧸 Explore the Wonder Toy Store',
        desc: '+14 😊 Happiness & +8 🧠 Smarts (Travels to Toy Store)',
        targetPlaceId: 'toy-store',
        stats: { happiness: 14, smarts: 8 }
      },
      {
        id: 'afternoon-mall',
        name: '🛍️ Hang Out at Sunnyvale Mall',
        desc: '+14 😊 Happiness & +14 🤝 Bestie Bond (Travels to Mall)',
        targetPlaceId: 'mall',
        stats: { happiness: 14, kindness: 8, friendBoost: 14 }
      },
      {
        id: 'afternoon-carwash',
        name: '🧽 Wash Family SUV for +$14 Allowance',
        desc: '+$14 🪙 Money & +8 💛 Kindness (Travels to Family SUV)',
        targetPlaceId: 'family-car',
        liveAction: 'wash-car',
        stats: { money: 2, happiness: 8, kindness: 8 }
      }
    ]
  },
  {
    slotKey: 'evening',
    timeLabel: '🌇 Evening (5:30 PM)',
    color: '#E11D48',
    bg: '#FFF1F2',
    options: [
      {
        id: 'evening-pizza',
        name: '🍕 Bake & Eat Dinner at Pizza Place',
        desc: '+18% ⚡ Energy, +12 😊 & +8 🧁 Cooking (Pizza Place)',
        targetPlaceId: 'pizza-place',
        targetStation: 'pizza',
        stats: { energy: 18, happiness: 12, skill: ['cooking', 8] }
      },
      {
        id: 'evening-desk',
        name: '💻 Draw & Study at Bedroom Desk',
        desc: '+10 🧠 Smarts & +10 🎨 Art (Opens Study Desk)',
        targetStation: 'desk',
        stats: { smarts: 10, happiness: 8, skill: ['art', 10] }
      },
      {
        id: 'evening-bestie',
        name: '🏡 Visit Best Friend’s Home',
        desc: '+15 🤝 Friend Bond & +12 😊 Happiness (Best Friend’s Home)',
        targetPlaceId: 'best-friend-home',
        stats: { happiness: 12, kindness: 8, friendBoost: 15 }
      },
      {
        id: 'evening-soup',
        name: '🍲 Eat Mom’s Warm Chicken Soup',
        desc: '+14% ⚡ Energy & +12 💚 Health (Serves Mom’s Soup)',
        consumeItem: 'soup',
        stats: { health: 6, kindness: 6 }
      }
    ]
  },
  {
    slotKey: 'night',
    timeLabel: '🌙 Night (8:30 PM)',
    color: '#4F46E5',
    bg: '#EEF2FF',
    options: [
      {
        id: 'night-sleep',
        name: '🛏️ Cozy Bedtime Sleep / Nap',
        desc: 'Restores ⚡ Energy & +8 💚 Health in Your Cozy Bed',
        liveAction: 'sleep',
        stats: { health: 8, happiness: 8 }
      },
      {
        id: 'night-story',
        name: '📖 Bedtime Story & Talk with Mom',
        desc: '+10 🧠 Smarts, +12 💛 Kindness & +10 😊 Happiness',
        stats: { smarts: 10, kindness: 12, happiness: 10, skill: ['story', 8] }
      },
      {
        id: 'night-wardrobe',
        name: '👕 Pick Tomorrow’s Outfit in Wardrobe',
        desc: '+10 😊 Happiness & +6 🎨 Art (Opens Wardrobe)',
        targetStation: 'wardrobe',
        stats: { happiness: 10, skill: ['art', 6] }
      },
      {
        id: 'night-jam',
        name: '🎧 Nighttime Music & Stargazing',
        desc: '+12 😊 Happiness & +8 🔬 Science',
        stats: { happiness: 12, smarts: 6, skill: ['science', 8] }
      }
    ]
  }
];

// =========================================================
// PLACE INTERIOR SCENE DEFINITIONS (EVERY PLACE HAS REAL FURNITURE!)
// =========================================================

function getPlaceSceneConfig(roomId, isNight) {
  const bestFriend = (typeof gameState !== 'undefined' && gameState) ? getTopFriend(gameState) : null;
  const bfFirst = bestFriend ? bestFriend.name.split(' ')[0] : 'Bestie';

  const scenes = {
    'my-room': {
      title: `🛏️ ${gameState ? gameState.name : 'Sunny'}'s Bedroom`,
      wallDay: '#EFE4B8',
      wallNight: '#353252',
      floorDay: '#FFC000',
      floorNight: '#A67C00',
      doorX: 54,
      backdrop: `
        <div class="room-furniture-item" style="left:16%; top:24%; z-index:2;" onclick="event.stopPropagation(); ${isNight ? 'sleepForEnergy()' : 'switchToNighttime()'}" title="Bedroom Window — Click to toggle Day/Night!">
          ${renderWindowSVG(isNight)}
        </div>
        <div class="room-furniture-item" style="left:50%; top:83%; z-index:2; pointer-events:none;">
          ${renderCozyRugSVG('#F43F5E', '#FDE047')}
        </div>
      `,
      furniture: [
        {
          id: 'room-bed',
          name: '🛏️ Cozy Bed (Sleep / Nap)',
          x: 14, y: 53,
          svg: renderCozyBedSVG(isNight, 'pink'),
          action: () => World2D.performLiveAction('sleep', 16)
        },
        {
          id: 'room-bag',
          name: '🎒 Pack My Bag!',
          x: 24, y: 59,
          svg: renderBackpackFurnitureSVG(),
          action: () => World2D.openStationView('bag')
        },
        {
          id: 'room-shelf',
          name: '🧊 Open Mini Fridge & Shelf',
          x: 34, y: 44,
          svg: renderTreasureShelfAndFridgeSVG(),
          action: () => World2D.openStationView('fridge')
        },
        {
          id: 'room-sofa',
          name: '🛋️ Sofa & Lamp (Chill / Nap)',
          x: 70, y: 47,
          svg: renderSofaAndLampSVG(isNight),
          action: () => World2D.performLiveAction('sleep', 68)
        },
        {
          id: 'room-desk',
          name: '💻 Study Desk (Draw & Code!)',
          x: 86, y: 52,
          svg: renderDeskAndShelfSVG(isNight),
          action: () => World2D.openStationView('desk')
        },
        {
          id: 'room-music-closet',
          name: '👕 Wardrobe & Music',
          x: 93, y: 44,
          svg: renderWardrobeAndMirrorSVG(),
          action: () => World2D.openStationView('wardrobe')
        }
      ]
    },

    'family-home': {
      title: '🏡 Family Home — Living & Dining Room',
      wallDay: '#FFE8D6',
      wallNight: '#2D2A4A',
      floorDay: '#D99B66',
      floorNight: '#8C582B',
      doorX: 54,
      backdrop: `
        <div class="room-furniture-item" style="left:20%; top:23%; z-index:2;" onclick="event.stopPropagation(); triggerPlaceAction('family-home')">
          ${renderWindowSVG(isNight, 'HOME')}
        </div>
        <div class="room-furniture-item" style="left:50%; top:83%; z-index:2; pointer-events:none;">
          ${renderCozyRugSVG('#EA580C', '#FDE047')}
        </div>
      `,
      furniture: [
        {
          id: 'fh-fireplace',
          name: '🔥 Family Fireplace',
          x: 16, y: 46,
          svg: renderFireplaceSVG(),
          action: () => World2D.interactWithFurniture(18, 'family-home', '🔥 Warmed up by the Family Fireplace with Mom & Dad!')
        },
        {
          id: 'fh-sofa',
          name: '🛋️ Living Room Sofa (Rest)',
          x: 37, y: 47,
          svg: renderSofaAndLampSVG(isNight),
          action: () => World2D.performLiveAction('sleep', 37)
        },
        {
          id: 'fh-table',
          name: '🍲 Family Dining & Cooking',
          x: 74, y: 54,
          svg: renderDiningTableSVG(),
          action: () => World2D.openStationView('pizza')
        },
        {
          id: 'fh-kitchen',
          name: '🧊 Open Home Fridge',
          x: 91, y: 45,
          svg: renderTreasureShelfAndFridgeSVG(),
          action: () => World2D.openStationView('fridge')
        }
      ]
    },

    'family-car': {
      title: '🚗 Family Driveway & SUV',
      wallDay: '#BAE6FD',
      wallNight: '#1E1B4B',
      floorDay: '#64748B',
      floorNight: '#334155',
      doorX: 16,
      backdrop: `
        <!-- Outdoor Driveway Trees, Clouds & Road Stripes -->
        <div style="position:absolute;left:0;right:0;top:79%;height:4px;border-top:4px dashed #FACC15;opacity:0.85;pointer-events:none;"></div>
        <div style="position:absolute;left:82%;top:26%;font-size:3.2rem;pointer-events:none;">🌳</div>
        <div style="position:absolute;left:32%;top:28%;font-size:2.8rem;pointer-events:none;">🌲</div>
      `,
      furniture: [
        {
          id: 'car-suv',
          name: '🚙 Drive Family SUV!',
          x: 52, y: 52,
          svg: renderFamilyCarSVG(isNight),
          action: () => World2D.performLiveAction('drive', 52, 'family-car')
        },
        {
          id: 'car-wash',
          name: '🧽 Wash the Car (+$12!)',
          x: 84, y: 56,
          svg: `<div style="font-size:2.4rem;filter:drop-shadow(0 4px 6px rgba(0,0,0,0.2));">🪣🧽💦</div>`,
          action: () => World2D.performLiveAction('wash-car', 82, 'family-car')
        },
        {
          id: 'car-hoop',
          name: '🏀 Shoot Hoops!',
          x: 28, y: 44,
          svg: `<div style="font-size:2.6rem;filter:drop-shadow(0 4px 6px rgba(0,0,0,0.2));">🏀🥅</div>`,
          action: () => { World2D.targetX = 28; doYearlyActivity('sports'); }
        }
      ]
    },

    'ice-cream-shop': {
      title: '🍦 Rainbow Scoops Ice Cream Shop',
      wallDay: '#FCE7F3',
      wallNight: '#3B1D3E',
      floorDay: '#FBCFE8',
      floorNight: '#831843',
      doorX: 54,
      backdrop: `
        <!-- Striped Parlor Awning at Top -->
        <div style="position:absolute;top:0;left:0;right:0;height:22px;background:repeating-linear-gradient(90deg,#EC4899 0,#EC4899 28px,#FFFFFF 28px,#FFFFFF 56px);border-bottom:3px solid #BE185D;z-index:5;pointer-events:none;"></div>
        <div class="room-furniture-item" style="left:20%; top:24%; z-index:2;" onclick="event.stopPropagation(); World2D.openStationView('icecream')">
          ${renderWindowSVG(isNight, '24 FLAVORS')}
        </div>
      `,
      furniture: [
        {
          id: 'ic-counter',
          name: '🍨 Scoop Your Own Ice Cream!',
          x: 26, y: 50,
          svg: renderIceCreamCounterSVG(),
          action: () => World2D.openStationView('icecream')
        },
        {
          id: 'ic-booth',
          name: '🪑 Sundae Parlor Booth',
          x: 78, y: 53,
          svg: renderCafeBoothSVG('#EC4899', '🍨'),
          action: () => World2D.interactWithFurniture(76, 'ice-cream-shop')
        },
        {
          id: 'ic-toppings',
          name: '🍒 Drink & Smoothie Fridge',
          x: 92, y: 50,
          svg: `<div style="font-size:2.3rem;filter:drop-shadow(0 4px 6px rgba(0,0,0,0.16));">🧋🍒🧁</div>`,
          action: () => World2D.openStationView('fridge')
        }
      ]
    },

    'playground': {
      title: '🛝 Sunny Town Playground & Park',
      wallDay: '#BAE6FD',
      wallNight: '#1E293B',
      floorDay: '#4ADE80',
      floorNight: '#166534',
      doorX: 54,
      backdrop: `
        <div style="position:absolute;left:8%;top:24%;font-size:3.4rem;pointer-events:none;">🌳</div>
        <div style="position:absolute;left:90%;top:24%;font-size:3.4rem;pointer-events:none;">🌲</div>
        <div class="room-furniture-item" style="left:50%; top:84%; z-index:2; pointer-events:none;">
          ${renderCozyRugSVG('#FDE68A', '#F59E0B')}
        </div>
      `,
      furniture: [
        {
          id: 'pg-slide',
          name: '🛝 Go Down the Giant Slide!',
          x: 25, y: 45,
          svg: renderPlaygroundSlideSVG(),
          action: () => World2D.performLiveAction('slide', 25, 'playground')
        },
        {
          id: 'pg-swings',
          name: '⛓️ Swing on the Swing Set!',
          x: 78, y: 46,
          svg: renderSwingSetSVG(),
          action: () => World2D.performLiveAction('swing', 78, 'playground')
        },
        {
          id: 'pg-sandbox',
          name: '🪣 Build a Sandcastle!',
          x: 44, y: 59,
          svg: `<div style="background:#FDE047;border:4px solid #D97706;border-radius:12px;padding:6px 14px;font-size:1.7rem;box-shadow:0 4px 10px rgba(0,0,0,0.16);">🏰🪣⚽</div>`,
          action: () => World2D.interactWithFurniture(44, 'playground')
        }
      ]
    },

    'pizza-place': {
      title: '🍕 Brick-Oven Pizza Parlor',
      wallDay: '#FFEDD5',
      wallNight: '#3B1F1E',
      floorDay: '#FCA5A5',
      floorNight: '#7F1D1D',
      doorX: 54,
      backdrop: `
        <div style="position:absolute;top:0;left:0;right:0;height:20px;background:repeating-linear-gradient(90deg,#DC2626 0,#DC2626 26px,#16A34A 26px,#16A34A 52px,#FFFFFF 52px,#FFFFFF 78px);border-bottom:3px solid #991B1B;z-index:5;pointer-events:none;"></div>
      `,
      furniture: [
        {
          id: 'pz-oven',
          name: '🔥 Make & Bake a Pizza!',
          x: 20, y: 45,
          svg: renderBrickPizzaOvenSVG(),
          action: () => World2D.openStationView('pizza')
        },
        {
          id: 'pz-booth',
          name: '🍕 Checkered Pizzeria Booth',
          x: 76, y: 53,
          svg: renderCafeBoothSVG('#DC2626', '🍕'),
          action: () => World2D.interactWithFurniture(76, 'pizza-place')
        },
        {
          id: 'pz-jukebox',
          name: '🧋 Cold Drinks & Boba Fridge',
          x: 40, y: 49,
          svg: `<div style="background:#FEF3C7;border:3px solid #D97706;border-radius:16px 16px 4px 4px;padding:8px 12px;font-size:1.7rem;box-shadow:0 4px 10px rgba(0,0,0,0.16);">🧋🥤🧀</div>`,
          action: () => World2D.openStationView('fridge')
        }
      ]
    },

    'nursery': {
      title: '🍼 Cozy Sprout Nursery & Playroom',
      wallDay: '#F3E8FF',
      wallNight: '#2E1065',
      floorDay: '#FDE68A',
      floorNight: '#92400E',
      doorX: 54,
      backdrop: `
        <div class="room-furniture-item" style="left:50%; top:83%; z-index:2; pointer-events:none;">
          ${renderCozyRugSVG('#A855F7', '#FDE047')}
        </div>
      `,
      furniture: [
        {
          id: 'ns-crib',
          name: '🛌 Nap in Cozy Crib',
          x: 18, y: 52,
          svg: renderCozyBedSVG(isNight, 'amber'),
          action: () => World2D.performLiveAction('sleep', 18)
        },
        {
          id: 'ns-cubbies',
          name: '🧊 Nursery Snack Fridge & Toys',
          x: 38, y: 44,
          svg: renderTreasureShelfAndFridgeSVG(),
          action: () => World2D.openStationView('fridge')
        },
        {
          id: 'ns-easel',
          name: '🎨 Finger-Paint Canvas!',
          x: 80, y: 51,
          svg: renderDiningTableSVG(),
          action: () => World2D.openStationView('desk')
        }
      ]
    },

    'toy-store': {
      title: '🧸 Wonder Toy Emporium',
      wallDay: '#FFE4E6',
      wallNight: '#3F1D2B',
      floorDay: '#FDE047',
      floorNight: '#A16207',
      doorX: 54,
      backdrop: `
        <div style="position:absolute;top:0;left:0;right:0;height:20px;background:repeating-linear-gradient(90deg,#E11D48 0,#E11D48 30px,#3B82F6 30px,#3B82F6 60px,#FACC15 60px,#FACC15 90px);z-index:5;pointer-events:none;"></div>
      `,
      furniture: [
        {
          id: 'ts-shelf',
          name: '🧸 Grand Plushie & Robot Shelf',
          x: 20, y: 44,
          svg: renderTreasureShelfAndFridgeSVG(),
          action: () => World2D.interactWithFurniture(20, 'toy-store')
        },
        {
          id: 'ts-lego',
          name: '🧩 Build & Draw Table!',
          x: 40, y: 54,
          svg: renderDiningTableSVG(),
          action: () => World2D.openStationView('desk')
        },
        {
          id: 'ts-arcade',
          name: '🚂 Ride-On Toy Train!',
          x: 78, y: 50,
          svg: `<div style="background:#FFF1F2;border:3px solid #F43F5E;border-radius:16px;padding:10px 16px;font-size:2.3rem;box-shadow:0 6px 14px rgba(0,0,0,0.16);">🚂🦖🤖</div>`,
          action: () => World2D.performLiveAction('drive', 78, 'toy-store')
        }
      ]
    },

    'school-bus': {
      title: '🚌 Main Street Bus Stop & Yellow School Bus',
      wallDay: '#E0F2FE',
      wallNight: '#1E1B4B',
      floorDay: '#64748B',
      floorNight: '#334155',
      doorX: 14,
      backdrop: `
        <div style="position:absolute;left:0;right:0;top:80%;height:4px;border-top:4px dashed #FACC15;pointer-events:none;"></div>
      `,
      furniture: [
        {
          id: 'sb-bus',
          name: '🚌 Ride Yellow School Bus!',
          x: 48, y: 50,
          svg: renderYellowSchoolBusSVG(),
          action: () => World2D.performLiveAction('drive', 48, 'school-bus')
        },
        {
          id: 'sb-shelter',
          name: '🚏 Bus Stop Shelter & Bench',
          x: 84, y: 52,
          svg: renderCafeBoothSVG('#0284C7', '🎒'),
          action: () => World2D.interactWithFurniture(82, 'school-bus')
        }
      ]
    },

    'school': {
      title: '🏫 Hometown School Classroom',
      wallDay: '#E0F2FE',
      wallNight: '#1E293B',
      floorDay: '#E6C280',
      floorNight: '#8C6D3B',
      doorX: 54,
      backdrop: `
        <div class="room-furniture-item" style="left:28%; top:24%; z-index:2;" onclick="event.stopPropagation(); World2D.openStationView('desk')">
          ${renderSchoolChalkboardSVG()}
        </div>
      `,
      furniture: [
        {
          id: 'sc-teacher',
          name: '🍎 Interactive Chalkboard & Desk!',
          x: 20, y: 52,
          svg: renderDeskAndShelfSVG(isNight),
          action: () => World2D.openStationView('desk')
        },
        {
          id: 'sc-desks',
          name: '📚 Student Desks (Study / Sleep)',
          x: 42, y: 55,
          svg: renderDiningTableSVG(),
          action: () => World2D.interactWithFurniture(42, 'school')
        },
        {
          id: 'sc-lab',
          name: '🧊 Cafeteria Lunch Fridge & Lab',
          x: 80, y: 45,
          svg: renderTreasureShelfAndFridgeSVG(),
          action: () => World2D.openStationView('fridge')
        },
        {
          id: 'sc-lockers',
          name: '🔐 School Hallway Lockers',
          x: 93, y: 45,
          svg: renderWardrobeAndMirrorSVG(),
          action: () => World2D.interactWithFurniture(88, 'school')
        }
      ]
    },

    'snack-store': {
      title: '🍿 Corner Snack & Smoothie Mart',
      wallDay: '#FEE2E2',
      wallNight: '#3B1D2E',
      floorDay: '#FDE68A',
      floorNight: '#92400E',
      doorX: 54,
      backdrop: `
        <div style="position:absolute;top:0;left:0;right:0;height:20px;background:repeating-linear-gradient(90deg,#EF4444 0,#EF4444 28px,#FEF08A 28px,#FEF08A 56px);z-index:5;pointer-events:none;"></div>
      `,
      furniture: [
        {
          id: 'sn-counter',
          name: '🍦 Make a Frozen Treat!',
          x: 24, y: 50,
          svg: renderIceCreamCounterSVG(),
          action: () => World2D.openStationView('icecream')
        },
        {
          id: 'sn-aisle',
          name: '🧊 Open Boba & Drink Cooler!',
          x: 78, y: 45,
          svg: renderTreasureShelfAndFridgeSVG(),
          action: () => World2D.openStationView('fridge')
        },
        {
          id: 'sn-table',
          name: '🥨 Snack Bar Seating',
          x: 44, y: 54,
          svg: renderCafeBoothSVG('#F97316', '🍿'),
          action: () => World2D.interactWithFurniture(44, 'snack-store')
        }
      ]
    },

    'mall': {
      title: '🛍️ Sunnyvale Grand Mall Atrium',
      wallDay: '#EDE9FE',
      wallNight: '#2E1065',
      floorDay: '#E2E8F0',
      floorNight: '#475569',
      doorX: 54,
      backdrop: `
        <div class="room-furniture-item" style="left:28%; top:22%; z-index:2;" onclick="event.stopPropagation(); triggerPlaceAction('mall')">
          ${renderWindowSVG(isNight, 'SUNNYVALE MALL')}
        </div>
      `,
      furniture: [
        {
          id: 'ml-fountain',
          name: '⛲ Grand Atrium Fountain',
          x: 36, y: 50,
          svg: renderMallFountainSVG(),
          action: () => World2D.interactWithFurniture(36, 'mall')
        },
        {
          id: 'ml-boutique',
          name: '👗 Fashion & Accessory Boutique',
          x: 16, y: 45,
          svg: renderWardrobeAndMirrorSVG(),
          action: () => { World2D.targetX = 18; openRestyleModal(); }
        },
        {
          id: 'ml-photobooth',
          name: '📸 Neon Photo Booth & Arcade',
          x: 76, y: 46,
          svg: renderArcadeCabinetSVG(),
          action: () => World2D.interactWithFurniture(76, 'mall')
        },
        {
          id: 'ml-plant',
          name: '🌴 Mall Atrium Palm',
          x: 89, y: 49,
          svg: renderPottedPlantSVG(),
          action: () => World2D.interactWithFurniture(86, 'mall')
        }
      ]
    },

    'best-friend-home': {
      title: `🌟 ${bfFirst}'s Home — Cozy Bestie Lounge`,
      wallDay: '#FEF3C7',
      wallNight: '#312E81',
      floorDay: '#F59E0B',
      floorNight: '#92400E',
      doorX: 54,
      backdrop: `
        <div class="room-furniture-item" style="left:20%; top:23%; z-index:2;" onclick="event.stopPropagation(); triggerPlaceAction('best-friend-home')">
          ${renderWindowSVG(isNight, 'BESTIES 🌟')}
        </div>
        <div class="room-furniture-item" style="left:50%; top:83%; z-index:2; pointer-events:none;">
          ${renderCozyRugSVG('#8B5CF6', '#FDE047')}
        </div>
      `,
      furniture: [
        {
          id: 'bf-sofa',
          name: '🛋️ Bestie Plush Couch & Lamp',
          x: 24, y: 47,
          svg: renderSofaAndLampSVG(isNight),
          action: () => World2D.interactWithFurniture(24, 'best-friend-home')
        },
        {
          id: 'bf-tv',
          name: '🎮 Co-op Gaming TV & Console',
          x: 42, y: 50,
          svg: renderFlatScreenTVSVG(),
          action: () => World2D.interactWithFurniture(42, 'best-friend-home')
        },
        {
          id: 'bf-kitchen',
          name: '🥞 Pancake Table & Kitchen',
          x: 78, y: 54,
          svg: renderDiningTableSVG(),
          action: () => World2D.interactWithFurniture(78, 'best-friend-home')
        },
        {
          id: 'bf-beanbag',
          name: '🟣 Cozy Beanbag Chair',
          x: 91, y: 56,
          svg: renderBeanbagSVG('#8B5CF6'),
          action: () => World2D.interactWithFurniture(88, 'best-friend-home')
        }
      ]
    },

    // =====================================================
    // AGE 7+ RANDOM PLACES — EACH WITH CUSTOM FURNITURE!
    // =====================================================
    'arcade': {
      title: '🎮 Neon Retro Arcade',
      wallDay: '#1E1B4B',
      wallNight: '#0F172A',
      floorDay: '#312E81',
      floorNight: '#1E1B4B',
      doorX: 54,
      backdrop: `
        <div class="room-furniture-item" style="left:50%; top:83%; z-index:2; pointer-events:none;">
          ${renderCozyRugSVG('#06B6D4', '#EC4899')}
        </div>
      `,
      furniture: [
        { id: 'arc-1', name: '🕹️ Space Invaders Cabinet', x: 18, y: 47, svg: renderArcadeCabinetSVG(), action: () => World2D.interactWithFurniture(18, 'arcade') },
        { id: 'arc-2', name: '👾 Co-Op Racing Simulator', x: 35, y: 50, svg: renderFlatScreenTVSVG(), action: () => World2D.interactWithFurniture(35, 'arcade') },
        { id: 'arc-3', name: '🧸 Giant Plushie Claw Machine', x: 76, y: 45, svg: renderTreasureShelfAndFridgeSVG(), action: () => World2D.interactWithFurniture(76, 'arcade') },
        { id: 'arc-4', name: '🍕 Arcade Snack Booth', x: 90, y: 54, svg: renderCafeBoothSVG('#6366F1', '🕹️'), action: () => World2D.interactWithFurniture(86, 'arcade') }
      ]
    },

    'aquarium': {
      title: '🐠 Starlight Bay Ocean Aquarium',
      wallDay: '#083344',
      wallNight: '#042F2E',
      floorDay: '#0E7490',
      floorNight: '#155E75',
      doorX: 54,
      backdrop: `
        <!-- Panoramic Ocean Window on Back Wall -->
        <div style="position:absolute;left:8%;top:12%;width:38%;height:46%;background:linear-gradient(180deg,#0284C7,#0369A1);border:4px solid #38BDF8;border-radius:16px;display:flex;align-items:center;justify-content:space-around;font-size:2rem;box-shadow:0 0 20px rgba(56,189,248,0.45);z-index:2;pointer-events:none;">
          <span>🐬</span><span>🦦</span><span>🐠</span><span>🪼</span>
        </div>
      `,
      furniture: [
        { id: 'aq-bench', name: '🦦 Sea Otter Viewing Couch', x: 26, y: 50, svg: renderSofaAndLampSVG(true), action: () => World2D.interactWithFurniture(26, 'aquarium') },
        { id: 'aq-touch', name: '🌊 Starfish Touch Tide Pool', x: 76, y: 52, svg: renderMallFountainSVG(), action: () => World2D.interactWithFurniture(76, 'aquarium') },
        { id: 'aq-gift', name: '🐚 Marine Lab & Souvenir Counter', x: 90, y: 48, svg: renderDeskAndShelfSVG(true), action: () => World2D.interactWithFurniture(88, 'aquarium') }
      ]
    },

    'cinema': {
      title: '🎬 Popcorn Palace Movie Theater',
      wallDay: '#450A0A',
      wallNight: '#2A0606',
      floorDay: '#991B1B',
      floorNight: '#7F1D1D',
      doorX: 54,
      backdrop: '',
      furniture: [
        { id: 'cn-screen', name: '🎥 Giant Cinema Screen', x: 24, y: 46, svg: renderFlatScreenTVSVG(), action: () => World2D.interactWithFurniture(24, 'cinema') },
        { id: 'cn-seats', name: '💺 Plush Recliner Seats', x: 42, y: 48, svg: renderSofaAndLampSVG(true), action: () => World2D.interactWithFurniture(42, 'cinema') },
        { id: 'cn-popcorn', name: '🍿 Buttered Popcorn & Soda Stand', x: 80, y: 50, svg: renderIceCreamCounterSVG(), action: () => World2D.interactWithFurniture(80, 'cinema') }
      ]
    },

    'skate-park': {
      title: '🛹 Sunnyvale Roller & Skate Park',
      wallDay: '#BAE6FD',
      wallNight: '#1E293B',
      floorDay: '#94A3B8',
      floorNight: '#475569',
      doorX: 54,
      backdrop: '',
      furniture: [
        { id: 'sk-ramp', name: '🛹 Halfpipe Skate Ramp', x: 24, y: 46, svg: renderPlaygroundSlideSVG(), action: () => World2D.interactWithFurniture(24, 'skate-park') },
        { id: 'sk-bench', name: '🛼 Skate & Bike Bench', x: 78, y: 53, svg: renderCafeBoothSVG('#16A34A', '🛹'), action: () => World2D.interactWithFurniture(78, 'skate-park') }
      ]
    },

    'pet-cafe': {
      title: '🐾 Cuddle Paws Pet Sanctuary & Café',
      wallDay: '#FFEDD5',
      wallNight: '#3B2314',
      floorDay: '#FDBA74',
      floorNight: '#9A3412',
      doorX: 54,
      backdrop: `
        <div class="room-furniture-item" style="left:50%; top:83%; z-index:2; pointer-events:none;">
          ${renderCozyRugSVG('#F97316', '#FEF08A')}
        </div>
      `,
      furniture: [
        { id: 'pc-couch', name: '🐶 Puppy & Kitty Cuddle Couch', x: 24, y: 47, svg: renderSofaAndLampSVG(isNight), action: () => World2D.interactWithFurniture(24, 'pet-cafe') },
        { id: 'pc-tree', name: '🐱 Multi-Tier Cat Tower & Toys', x: 42, y: 45, svg: renderTreasureShelfAndFridgeSVG(), action: () => World2D.interactWithFurniture(42, 'pet-cafe') },
        { id: 'pc-cafe', name: '☕ Paw-Print Pastry & Treat Bar', x: 78, y: 52, svg: renderCafeBoothSVG('#EA580C', '🐾'), action: () => World2D.interactWithFurniture(78, 'pet-cafe') },
        { id: 'pc-plant', name: '🪴 Sanctuary Fern', x: 91, y: 50, svg: renderPottedPlantSVG(), action: () => World2D.interactWithFurniture(88, 'pet-cafe') }
      ]
    },

    'waterpark': {
      title: '🏖️ Splash Wave Waterpark',
      wallDay: '#7DD3FC',
      wallNight: '#0C4A6E',
      floorDay: '#38BDF8',
      floorNight: '#0284C7',
      doorX: 54,
      backdrop: '',
      furniture: [
        { id: 'wp-slide', name: '🌊 Giant Aqua Tube Slide', x: 24, y: 45, svg: renderPlaygroundSlideSVG(), action: () => World2D.interactWithFurniture(24, 'waterpark') },
        { id: 'wp-pool', name: '🛟 Wave Pool Fountain', x: 42, y: 52, svg: renderMallFountainSVG(), action: () => World2D.interactWithFurniture(42, 'waterpark') },
        { id: 'wp-cabana', name: '☀️ Sunny Cabana Daybed', x: 80, y: 52, svg: renderCozyBedSVG(isNight, 'teal'), action: () => World2D.interactWithFurniture(80, 'waterpark') }
      ]
    },

    'bowling': {
      title: '🎳 Cosmic Glow Bowling Alley',
      wallDay: '#2E1065',
      wallNight: '#1E1B4B',
      floorDay: '#B45309',
      floorNight: '#78350F',
      doorX: 54,
      backdrop: '',
      furniture: [
        { id: 'bw-lane', name: '🎳 Neon Bowling Lane & Pins', x: 24, y: 49, svg: `<div style="background:#FEF3C7;border:3px solid #A855F7;border-radius:12px;padding:8px 18px;font-size:2rem;box-shadow:0 0 16px rgba(168,85,247,0.5);">🎳✨🎳</div>`, action: () => World2D.interactWithFurniture(24, 'bowling') },
        { id: 'bw-booth', name: '🍟 Bowler Seating & Nacho Table', x: 76, y: 53, svg: renderCafeBoothSVG('#9333EA', '🎳'), action: () => World2D.interactWithFurniture(76, 'bowling') },
        { id: 'bw-arcade', name: '🕹️ Alley Arcade Machine', x: 90, y: 47, svg: renderArcadeCabinetSVG(), action: () => World2D.interactWithFurniture(88, 'bowling') }
      ]
    },

    'planetarium': {
      title: '🔭 Galaxy Starlight Planetarium',
      wallDay: '#1E1B4B',
      wallNight: '#090D16',
      floorDay: '#312E81',
      floorNight: '#1E1B4B',
      doorX: 54,
      backdrop: `
        <div style="position:absolute;left:18%;top:14%;font-size:2.1rem;pointer-events:none;">🪐 ✨ 🌌 ⭐ 🚀</div>
      `,
      furniture: [
        { id: 'pl-scope', name: '🔭 Giant Observatory Telescope', x: 24, y: 48, svg: `<div style="background:#312E81;border:3px solid #FACC15;border-radius:16px;padding:10px 16px;font-size:2.3rem;box-shadow:0 0 18px rgba(250,204,21,0.35);">🔭🪐🌠</div>`, action: () => World2D.interactWithFurniture(24, 'planetarium') },
        { id: 'pl-seats', name: '🛋️ Stargazer Recliner Couch', x: 76, y: 48, svg: renderSofaAndLampSVG(true), action: () => World2D.interactWithFurniture(76, 'planetarium') }
      ]
    },

    'amusement-park': {
      title: '🎡 Wonder Wheel Funfair & Boardwalk',
      wallDay: '#FCE7F3',
      wallNight: '#1E1B4B',
      floorDay: '#FDE047',
      floorNight: '#854D0E',
      doorX: 54,
      backdrop: '',
      furniture: [
        { id: 'ap-coaster', name: '🎢 Coaster & Slide Tower', x: 24, y: 45, svg: renderPlaygroundSlideSVG(), action: () => World2D.interactWithFurniture(24, 'amusement-park') },
        { id: 'ap-treats', name: '🍭 Cotton Candy & Funnel Cake Booth', x: 78, y: 50, svg: renderIceCreamCounterSVG(), action: () => World2D.interactWithFurniture(78, 'amusement-park') }
      ]
    },

    'bakery-cafe': {
      title: '🧁 Honeybee Artisan Bakery Café',
      wallDay: '#FEF3C7',
      wallNight: '#3B2314',
      floorDay: '#D99B66',
      floorNight: '#78350F',
      doorX: 54,
      backdrop: `
        <div style="position:absolute;top:0;left:0;right:0;height:20px;background:repeating-linear-gradient(90deg,#F59E0B 0,#F59E0B 28px,#FFFBEB 28px,#FFFBEB 56px);border-bottom:3px solid #B45309;z-index:5;pointer-events:none;"></div>
      `,
      furniture: [
        { id: 'bk-case', name: '🥐 Warm Pastry & Cupcake Case', x: 24, y: 50, svg: renderIceCreamCounterSVG(), action: () => World2D.interactWithFurniture(24, 'bakery-cafe') },
        { id: 'bk-oven', name: '🍞 Artisan Bread Oven', x: 42, y: 46, svg: renderBrickPizzaOvenSVG(), action: () => World2D.interactWithFurniture(42, 'bakery-cafe') },
        { id: 'bk-booth', name: '☕ Cozy Café Table', x: 78, y: 53, svg: renderCafeBoothSVG('#D97706', '🥐'), action: () => World2D.interactWithFurniture(78, 'bakery-cafe') },
        { id: 'bk-plant', name: '🪴 Café Hanging Fern', x: 91, y: 50, svg: renderPottedPlantSVG(), action: () => World2D.interactWithFurniture(88, 'bakery-cafe') }
      ]
    },

    'starter-loft': {
      title: '🔑 Move-Out Starter Loft Apartment',
      wallDay: '#E0F2FE',
      wallNight: '#1E293B',
      floorDay: '#D99B66',
      floorNight: '#78350F',
      doorX: 54,
      backdrop: `
        <div class="room-furniture-item" style="left:22%; top:23%; z-index:2;" onclick="event.stopPropagation(); triggerPlaceAction('starter-loft')">
          ${renderWindowSVG(isNight, 'MY LOFT')}
        </div>
        <div class="room-furniture-item" style="left:50%; top:83%; z-index:2; pointer-events:none;">
          ${renderCozyRugSVG('#06B6D4', '#FDE047')}
        </div>
      `,
      furniture: [
        { id: 'lf-bed', name: '🛏️ Modern Loft Bed', x: 16, y: 52, svg: renderCozyBedSVG(isNight, 'teal'), action: () => World2D.interactWithFurniture(18, 'starter-loft') },
        { id: 'lf-sofa', name: '🛋️ Loft Sofa & Lamp', x: 38, y: 47, svg: renderSofaAndLampSVG(isNight), action: () => World2D.interactWithFurniture(38, 'starter-loft') },
        { id: 'lf-desk', name: '💻 Loft Desk & Studio', x: 78, y: 52, svg: renderDeskAndShelfSVG(isNight), action: () => World2D.interactWithFurniture(78, 'starter-loft') },
        { id: 'lf-plant', name: '🪴 Loft Monstera Plant', x: 91, y: 50, svg: renderPottedPlantSVG(), action: () => World2D.interactWithFurniture(88, 'starter-loft') }
      ]
    },

    'uni-career': {
      title: '🏛️ College & Career Plaza',
      wallDay: '#F1F5F9',
      wallNight: '#1E293B',
      floorDay: '#CBD5E1',
      floorNight: '#475569',
      doorX: 54,
      backdrop: `
        <div class="room-furniture-item" style="left:28%; top:24%; z-index:2;" onclick="event.stopPropagation(); triggerPlaceAction('uni-career')">
          ${renderSchoolChalkboardSVG()}
        </div>
      `,
      furniture: [
        { id: 'uc-desk', name: '💻 Tech & Career Workstation', x: 22, y: 52, svg: renderDeskAndShelfSVG(isNight), action: () => World2D.interactWithFurniture(22, 'uni-career') },
        { id: 'uc-table', name: '🎓 Seminar Study Table', x: 42, y: 54, svg: renderDiningTableSVG(), action: () => World2D.interactWithFurniture(42, 'uni-career') },
        { id: 'uc-trophy', name: '🏆 Honors & Career Shelf', x: 78, y: 45, svg: renderTreasureShelfAndFridgeSVG(), action: () => World2D.interactWithFurniture(78, 'uni-career') },
        { id: 'uc-lounge', name: '🛋️ Campus Lounge Couch', x: 90, y: 48, svg: renderBeanbagSVG('#0284C7'), action: () => World2D.interactWithFurniture(88, 'uni-career') }
      ]
    },

    'gym': {
      title: '💪 Powerhouse Fitness Gym',
      wallDay: '#E2E8F0',
      wallNight: '#1E293B',
      floorDay: '#3B82F6',
      floorNight: '#1D4ED8',
      doorX: 54,
      backdrop: `
        <!-- Gym Studio Wall Mirror & Motivational Banner -->
        <div style="position:absolute;left:28%;top:18%;width:210px;height:66px;background:linear-gradient(135deg,#BAE6FD,#E0F2FE);border:4px solid #334155;border-radius:10px;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.78rem;color:#0F172A;box-shadow:inset 0 2px 10px rgba(255,255,255,0.8);pointer-events:none;z-index:2;">
          🪞 POWERHOUSE GYM • STAY STRONG 💪
        </div>
        <div class="room-furniture-item" style="left:50%; top:84%; z-index:2; pointer-events:none;">
          ${renderCozyRugSVG('#EF4444', '#FACC15')}
        </div>
      `,
      furniture: [
        {
          id: 'gym-treadmill',
          name: '🏃 Run on Digital Treadmill!',
          x: 18, y: 50,
          svg: renderGymTreadmillSVG(),
          action: () => World2D.performLiveAction('treadmill', 18, 'gym')
        },
        {
          id: 'gym-bench',
          name: '🏋️ Lift Barbell & Dumbbells!',
          x: 38, y: 50,
          svg: renderGymWeightBenchSVG(),
          action: () => World2D.performLiveAction('lift-weights', 38, 'gym')
        },
        {
          id: 'gym-boxing',
          name: '🥊 Boxing Bag & Yoga Mat!',
          x: 76, y: 47,
          svg: renderGymPunchingBagSVG(),
          action: () => World2D.performLiveAction('boxing', 76, 'gym')
        },
        {
          id: 'gym-smoothie',
          name: '🥤 Protein Smoothie Fridge (+⚡)',
          x: 91, y: 45,
          svg: renderTreasureShelfAndFridgeSVG(),
          action: () => World2D.openStationView('fridge')
        }
      ]
    },

    'sunny-loft': {
      title: `🪴 ${gameState ? gameState.name : 'Sunny'}'s Sunny Loft Apartment`,
      wallDay: '#E0F2FE',
      wallNight: '#1E293B',
      floorDay: '#D99B66',
      floorNight: '#78350F',
      doorX: 54,
      backdrop: `
        <div class="room-furniture-item" style="left:20%; top:23%; z-index:2;" onclick="event.stopPropagation(); ${isNight ? 'sleepForEnergy()' : 'switchToNighttime()'}">
          ${renderWindowSVG(isNight, 'SUNNY LOFT')}
        </div>
        <div class="room-furniture-item" style="left:50%; top:83%; z-index:2; pointer-events:none;">
          ${renderCozyRugSVG('#0284C7', '#FDE047')}
        </div>
      `,
      furniture: [
        { id: 'sl-bed', name: '🛏️ Sunny Loft Bed (Sleep / Nap)', x: 15, y: 52, svg: renderCozyBedSVG(isNight, 'teal'), action: () => World2D.performLiveAction('sleep', 16) },
        { id: 'sl-fridge', name: '🧊 Loft Kitchen Fridge', x: 34, y: 44, svg: renderTreasureShelfAndFridgeSVG(), action: () => World2D.openStationView('fridge') },
        { id: 'sl-sofa', name: '🛋️ Loft Sofa & Lamp', x: 69, y: 47, svg: renderSofaAndLampSVG(isNight), action: () => World2D.performLiveAction('sleep', 69) },
        { id: 'sl-desk', name: '💻 Loft Studio Desk', x: 84, y: 52, svg: renderDeskAndShelfSVG(isNight), action: () => World2D.openStationView('desk') },
        { id: 'sl-plant', name: '🪴 Window Monstera Plant', x: 93, y: 50, svg: renderPottedPlantSVG(), action: () => World2D.openStationView('wardrobe') }
      ]
    },

    'maple-cottage': {
      title: `🏡 ${gameState ? gameState.name : 'Sunny'}'s Maple Porch Cottage`,
      wallDay: '#FEF3C7',
      wallNight: '#2D2A4A',
      floorDay: '#C2844F',
      floorNight: '#78350F',
      doorX: 54,
      backdrop: `
        <div class="room-furniture-item" style="left:22%; top:23%; z-index:2;" onclick="event.stopPropagation(); ${isNight ? 'sleepForEnergy()' : 'switchToNighttime()'}">
          ${renderWindowSVG(isNight, 'COTTAGE')}
        </div>
        <div class="room-furniture-item" style="left:50%; top:83%; z-index:2; pointer-events:none;">
          ${renderCozyRugSVG('#D97706', '#FEF08A')}
        </div>
      `,
      furniture: [
        { id: 'mc-bed', name: '🛏️ Cottage Canopy Bed (Sleep / Nap)', x: 14, y: 52, svg: renderCozyBedSVG(isNight, 'amber'), action: () => World2D.performLiveAction('sleep', 15) },
        { id: 'mc-fire', name: '🔥 Warm Cottage Fireplace', x: 33, y: 46, svg: renderFireplaceSVG(), action: () => World2D.interactWithFurniture(33, 'maple-cottage', '🔥 Warmed up by your Maple Cottage Fireplace! (+10 Happiness)') },
        { id: 'mc-sofa', name: '🛋️ Cottage Living Room Sofa', x: 68, y: 47, svg: renderSofaAndLampSVG(isNight), action: () => World2D.performLiveAction('sleep', 68) },
        { id: 'mc-fridge', name: '🧊 Cottage Kitchen & Fridge', x: 83, y: 45, svg: renderTreasureShelfAndFridgeSVG(), action: () => World2D.openStationView('fridge') },
        { id: 'mc-wardrobe', name: '👕 Cottage Oak Wardrobe', x: 93, y: 44, svg: renderWardrobeAndMirrorSVG(), action: () => World2D.openStationView('wardrobe') }
      ]
    },

    'treehouse-villa': {
      title: `🏰 ${gameState ? gameState.name : 'Sunny'}'s Lakeside Craft House`,
      wallDay: '#F3E8FF',
      wallNight: '#1E1B4B',
      floorDay: '#D99B66',
      floorNight: '#5B21B6',
      doorX: 54,
      backdrop: `
        <div class="room-furniture-item" style="left:22%; top:23%; z-index:2;" onclick="event.stopPropagation(); ${isNight ? 'sleepForEnergy()' : 'switchToNighttime()'}">
          ${renderWindowSVG(isNight, 'LAKESIDE')}
        </div>
        <div class="room-furniture-item" style="left:50%; top:83%; z-index:2; pointer-events:none;">
          ${renderCozyRugSVG('#9333EA', '#FDE047')}
        </div>
      `,
      furniture: [
        { id: 'tv-bed', name: '🛏️ Luxury Master Bed (Sleep / Nap)', x: 14, y: 52, svg: renderCozyBedSVG(isNight, 'pink'), action: () => World2D.performLiveAction('sleep', 15) },
        { id: 'tv-fire', name: '🔥 Grand Lakeside Fireplace', x: 31, y: 46, svg: renderFireplaceSVG(), action: () => World2D.interactWithFurniture(31, 'treehouse-villa', '🔥 Relaxed by your Lakeside Craft House Fireplace! (+12 Happiness)') },
        { id: 'tv-sofa', name: '🛋️ Designer Lounge Sofa & Lamp', x: 67, y: 47, svg: renderSofaAndLampSVG(isNight), action: () => World2D.performLiveAction('sleep', 67) },
        { id: 'tv-desk', name: '💻 Art & Hobby Craft Studio', x: 82, y: 52, svg: renderDeskAndShelfSVG(isNight), action: () => World2D.openStationView('desk') },
        { id: 'tv-fridge', name: '🧊 Gourmet Kitchen Fridge', x: 92, y: 45, svg: renderTreasureShelfAndFridgeSVG(), action: () => World2D.openStationView('fridge') }
      ]
    }
  };

  const scene = scenes[roomId] || scenes['my-room'];

  // If inside any of the player's homes, also add any extra Placed Furniture the player owns!
  const playerHomeRooms = new Set(['my-room', 'starter-loft', 'sunny-loft', 'maple-cottage', 'treehouse-villa']);
  if (playerHomeRooms.has(roomId) && typeof gameState !== 'undefined' && gameState) {
    const ownedNames = new Set([
      ...(gameState.inventory || []).map(i => i.name),
      ...(gameState.birthdayItems || []).map(b => b.name),
      ...(gameState.placedFurniture || [])
    ]);

    const extraFurniture = [];
    if (ownedNames.has('Arcade Cabinet') || ownedNames.has('Video Game Console')) {
      extraFurniture.push({
        id: 'extra-arcade',
        name: '🕹️ My Arcade Cabinet',
        x: 43, y: 45,
        svg: renderArcadeCabinetSVG(),
        action: () => { World2D.targetX = 43; showToast('🕹️ Played on your personal Arcade Cabinet! (+8 Happiness)'); gameState.stats.happiness = clampStat(gameState.stats.happiness + 8); renderAll(); }
      });
    }
    if (ownedNames.has('Cozy Beanbag Chair')) {
      extraFurniture.push({
        id: 'extra-beanbag',
        name: '🟣 Cozy Beanbag Chair',
        x: 26, y: 58,
        svg: renderBeanbagSVG('#EC4899'),
        action: () => { World2D.targetX = 26; gameState.energy = Math.min(100, gameState.energy + 8); showToast('🟣 Lounged in your Beanbag Chair! (+8% Energy ⚡)'); renderAll(); }
      });
    }
    if (ownedNames.has('Lush Monstera Plant')) {
      extraFurniture.push({
        id: 'extra-plant',
        name: '🪴 Lush Monstera Plant',
        x: 62, y: 52,
        svg: renderPottedPlantSVG(),
        action: () => { World2D.targetX = 62; gameState.stats.health = clampStat(gameState.stats.health + 5); showToast('🪴 Watered your Monstera Plant! (+5 Health 💚)'); renderAll(); }
      });
    }
    if (ownedNames.has('Big Flat-Screen TV')) {
      extraFurniture.push({
        id: 'extra-tv',
        name: '📺 Big Flat-Screen TV',
        x: 42, y: 24,
        svg: renderFlatScreenTVSVG(),
        action: () => { World2D.targetX = 42; gameState.stats.happiness = clampStat(gameState.stats.happiness + 8); showToast('📺 Watched your favorite show on the Flat-Screen TV! (+8 Happiness)'); renderAll(); }
      });
    }

    return {
      ...scene,
      furniture: [...scene.furniture, ...extraFurniture]
    };
  }

  return scene;
}

const World2D = {
  viewMode: 'room', // Default to the 2D Side-View Room ('room' or 'town')
  currentRoomId: 'my-room', // 'my-room' or any unlocked place ID ('family-home', 'school', etc.)
  stationView: null, // null | 'fridge' | 'desk' | 'pizza' | 'icecream' | 'wardrobe' | 'decor'
  liveAction: null, // null | { type: 'sleep'|'slide'|'swing'|'drive'|'wash-car', label: string, emoji: string }
  activeDialogue: null, // Active conversation state
  dialogueIndices: {}, // Tracks rotating conversation topic index per NPC
  askIndices: {}, // Tracks rotating batch of questions YOU can ask each NPC
  answeredUrgentNpcs: {}, // Tracks which NPCs have had their urgent ❗💬 answered this turn
  lastUrgentTurnKey: '', // Resets urgent ❗💬 prompts on a new day/age/timeOfDay
  guestNpcId: null, // NPC who accompanied you to a place via dialogue!
  fridgeActionItem: null,
  pizzaToppings: ['sauce', 'cheese'],
  pizzaBaked: false,
  iceCreamScoops: ['#F472B6', '#34D399'],
  deskPenColor: '#EF4444',
  playerX: 28,
  playerY: 56,
  targetX: 28,
  targetY: 56,
  isMoving: false,
  keys: {},
  npcs: [],
  activeZoneId: 'family-home',
  loopStarted: false,

  init() {
    if (this.loopStarted) return;
    this.loopStarted = true;

    window.addEventListener('keydown', e => {
      if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
      if (this.activeDialogue && !this.activeDialogue.resolved && ['1', '2', '3', '4', '5'].includes(e.key)) {
        const num = parseInt(e.key, 10);
        const opts = (this.activeDialogue.topic && this.activeDialogue.topic.options) || [];
        if (num >= 1 && num <= opts.length) {
          e.preventDefault();
          this.selectDialogueOption(num);
          return;
        }
      }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        if (this.stationView) return;
        this.keys[e.key.toLowerCase()] = true;
        if (e.key.startsWith('Arrow')) e.preventDefault();
      }
    });

    window.addEventListener('keyup', e => {
      this.keys[e.key.toLowerCase()] = false;
    });

    requestAnimationFrame(() => this.tick());
  },

  getDialogueTopicForNpc(npc) {
    const speakerName = npc.id === 'mom' ? 'Mom' : (npc.id === 'dad' ? 'Dad' : npc.name.split(' ')[0]);
    const idx = this.dialogueIndices[npc.id] || 0;

    // If the player is currently GROUNDED and talks to Mom or Dad, show the Grounded Scolding Dialogue!
    if (gameState && gameState.isGrounded && gameState.groundedDays > 0 && (npc.id === 'mom' || npc.id === 'dad')) {
      return {
        prompt: `${speakerName}: You are GROUNDED in your room (${gameState.groundedDays}d left) because you got scolded! What do you have to say for yourself? 😠🚫`,
        options: [
          {
            label: `I'm really sorry ${speakerName}! I promise to behave from now on! 🙏💛`,
            reply: `${speakerName}: Thank you for apologizing sincerely. I forgive you—you are UNGROUNDED! Come give me a hug! 💛🥰`,
            ungroundNow: true,
            stats: { kindness: 10, happiness: 8 }
          },
          {
            label: `I'll clean up my whole room and study at my Desk right now! 🧹📚`,
            reply: `${speakerName}: That is very responsible! Since you're cleaning up and studying, you are UNGROUNDED! 📚🌟`,
            ungroundNow: true,
            targetStation: 'desk',
            stats: { smarts: 8, kindness: 8, happiness: 6 }
          },
          {
            label: `Okay ${speakerName}, I'll stay in my room and rest quietly in bed 🛏️`,
            reply: `${speakerName}: Good. Take some time in your room to think about your choices. 🛏️`,
            stats: { energy: 8, kindness: 4 }
          },
          {
            label: `That's not fair! I won't listen! 😤`,
            reply: `${speakerName}: Excuse me?! Talking back means +1 EXTRA DAY GROUNDED in your room! 😠🚫`,
            extraGroundedDay: true,
            stats: { kindness: -6, happiness: -5 }
          }
        ]
      };
    }

    let topics = [];
    if (npc.id === 'mom') {
      topics = [
        {
          prompt: `Mom: Today we are going to the Ice Cream Shop! 🍦`,
          options: [
            {
              label: `Yay! Let's go right now! 🎉`,
              reply: `Mom: Woohoo! Let's head to the Ice Cream Shop together! 🍦💛`,
              targetPlaceId: 'ice-cream-shop',
              stats: { happiness: 10, kindness: 6 }
            },
            {
              label: `Wow! Can I stack 3 scoops on a waffle cone? 🤩`,
              reply: `Mom: You sure can! Let's step right up to the Ice Cream Scoop Counter! 🍨🌟`,
              targetPlaceId: 'ice-cream-shop',
              targetStation: 'icecream',
              stats: { happiness: 12, smarts: 4 }
            },
            {
              label: `Can I get strawberry swirl with rainbow sprinkles? 🍓✨`,
              reply: `Mom: Strawberry swirl with extra rainbow sprinkles coming right up! 🍓🍦`,
              targetPlaceId: 'ice-cream-shop',
              stats: { happiness: 11, kindness: 6, energy: 8 }
            },
            {
              label: `Can we go to the Sunny Playground instead? 🛝`,
              reply: `Mom: Good idea! Let's go play at the Sunny Playground instead! 🛝☀️`,
              targetPlaceId: 'playground',
              stats: { happiness: 10, health: 7 }
            },
            {
              label: `No thank you, let's stay cozy at home 🙏`,
              reply: `Mom: Okay sweetie, no problem! We can stay right here and relax instead. 💛`,
              isDecline: true,
              stats: { kindness: 6, energy: 6 }
            },
            {
              label: `Throw a tantrum & knock over the chairs! 😈 (Get Scolded!)`,
              reply: `Mom: HEY! Do NOT throw a tantrum! You are SCOLDED and GROUNDED to your bedroom! 😠🚫`,
              triggerGrounded: 'Mom scolded you for throwing a tantrum and knocking over chairs!',
              stats: { kindness: -8, happiness: -6 }
            }
          ]
        },
        {
          prompt: `Mom: Are you hungry, sweetie? What would you like from the kitchen? 🍽️`,
          options: [
            {
              label: `Boba Bubble Milk Tea from the bottom shelf! 🧋`,
              reply: `Mom: Coming right up! Fresh Boba Bubble Milk Tea with chewy tapioca pearls! 🧋💛`,
              consumeItem: 'boba',
              stats: { happiness: 8, kindness: 5 }
            },
            {
              label: `A bowl of your Warm Chicken Soup, please! 🍲`,
              reply: `Mom: Here's a steaming bowl of my homemade Chicken Soup! 🍲💚`,
              consumeItem: 'soup',
              stats: { health: 6, kindness: 6 }
            },
            {
              label: `Fluffy Honey Berry Pancakes! 🥞`,
              reply: `Mom: Fresh off the griddle with warm honey and berries! Enjoy! 🥞✨`,
              consumeItem: 'pancakes',
              stats: { happiness: 8, kindness: 5 }
            },
            {
              label: `Let's open the Fridge so I can pick myself! 🧊`,
              reply: `Mom: Go right ahead sweetie, both blue shelves are fully stocked! 🧊🌟`,
              targetStation: 'fridge',
              stats: { happiness: 5, kindness: 4 }
            },
            {
              label: `I'm full right now, no thank you Mom! 🙏`,
              reply: `Mom: Okay sweetie, snacks are in the Fridge whenever you get hungry! 💛`,
              isDecline: true,
              stats: { kindness: 6, energy: 5 }
            }
          ]
        },
        {
          prompt: `Mom: The sun is shining! What do you want to play at the Sunny Playground today? 🛝☀️`,
          options: [
            {
              label: `Zoom down the Giant Yellow Slide! 🛝`,
              reply: `Mom: Wheee! Look how fast you go down the Giant Slide! 🛝💛`,
              targetPlaceId: 'playground',
              liveAction: 'slide',
              stats: { happiness: 10, health: 6 }
            },
            {
              label: `Swing super high on the Double Swings! ⛓️`,
              reply: `Mom: Hold on tight, I'll give you a big push on the Swings! ⛓️✨`,
              targetPlaceId: 'playground',
              liveAction: 'swing',
              stats: { happiness: 10, health: 6 }
            },
            {
              label: `Walk around the park & enjoy the sunshine! 🌳`,
              reply: `Mom: A lovely park walk together! Look at the butterflies! 🦋☀️`,
              targetPlaceId: 'playground',
              stats: { happiness: 10, kindness: 8, health: 5 }
            },
            {
              label: `Can I draw & color at my Study Desk instead? 🎨`,
              reply: `Mom: Of course! I'd love to see what you draw on your desk pad! 🎨✏️`,
              targetStation: 'desk',
              stats: { smarts: 8, happiness: 6, skill: ['art', 6] }
            },
            {
              label: `No thank you, my legs are a little tired 🙏`,
              reply: `Mom: That's okay sweetie, rest up and we'll go to the park later! 💛`,
              isDecline: true,
              stats: { kindness: 5, energy: 8 }
            }
          ]
        },
        {
          prompt: `Mom: Here is $15 pocket money for being such a helpful kid! What will you do with it? 🪙`,
          options: [
            {
              label: `Thank you Mom! I'm saving it in my piggy bank! 🐷`,
              reply: `Mom: So smart and responsible! (+$15 Pocket Money!) 🐷🪙`,
              stats: { money: 15, smarts: 8, kindness: 8, happiness: 8 }
            },
            {
              label: `Let's go spend it at the Wonder Toy Store! 🧸`,
              reply: `Mom: Yay! Let's head to the Wonder Toy Store right now! (+$15!) 🧸🌟`,
              targetPlaceId: 'toy-store',
              stats: { money: 15, happiness: 12, kindness: 6 }
            },
            {
              label: `I want to buy new furniture for My Bedroom! 🪑`,
              reply: `Mom: Ooh, let's open the Room Furniture Catalog and decorate! (+$15!) 🪑✨`,
              openModal: 'furniture',
              stats: { money: 15, happiness: 10, skill: ['art', 5] }
            },
            {
              label: `You keep half, Mom — let's share it! 💛`,
              reply: `Mom: Aww, you have the sweetest heart in the world! (+$10 & +15 Kindness!) 💛🥰`,
              stats: { money: 10, kindness: 15, happiness: 12 }
            }
          ]
        },
        {
          prompt: `Mom: How are you feeling today, sweetie? Do you need anything? 💛`,
          options: [
            {
              label: `I feel super happy! Best day ever! 😊🌟`,
              reply: `Mom: Seeing your big smile makes my whole day brighter! 💛🌟`,
              stats: { happiness: 12, health: 6, kindness: 6 }
            },
            {
              label: `I'm a little sleepy, can I take a cozy nap in bed? 😴`,
              reply: `Mom: Tuck right into your cozy quilt, sweetie. Sweet dreams! 🛏️💤`,
              liveAction: 'sleep',
              stats: { happiness: 6, health: 6 }
            },
            {
              label: `Can you help me pick a fresh outfit from my Wardrobe? 👕`,
              reply: `Mom: Let's open your Wardrobe Closet and try on some cute outfits! 👕✨`,
              targetStation: 'wardrobe',
              stats: { happiness: 8, kindness: 5 }
            },
            {
              label: `Can you tell me a story before I go play? 📖`,
              reply: `Mom: Once upon a time in SunnyDays town... we had the greatest adventure! 📖✨`,
              stats: { smarts: 10, happiness: 10, kindness: 6 }
            }
          ]
        },
        {
          prompt: `Mom: Did you pack your bag for today, sweetie? What are you putting inside? 🎒`,
          options: [
            {
              label: `Let's open my Backpack right now and pack it! 🎒`,
              reply: `Mom: Great idea! Let's pick 6 items for your backpack pockets! 🎒✨`,
              targetStation: 'bag',
              stats: { smarts: 6, happiness: 8 }
            },
            {
              label: `I packed my Notebook, Sketchbook & Boba Milk Tea! 📓🧋`,
              reply: `Mom: Prepared for studying AND snacking! I'm so proud of you! 📓🧋💛`,
              targetStation: 'bag',
              stats: { smarts: 10, happiness: 10, kindness: 6 }
            },
            {
              label: `Can you help me pack a Grilled Cheese Lunchbox & Apple? 🍱🍎`,
              reply: `Mom: Just tucked a warm Grilled Cheese Lunchbox and Apple into your bag! 🍱🍎`,
              targetStation: 'bag',
              stats: { energy: 10, health: 8, kindness: 8 }
            },
            {
              label: `No thank you, I don't need my bag right now 🙏`,
              reply: `Mom: Okay sweetie, your backpack is right by your bed whenever you need it! 💛`,
              isDecline: true,
              stats: { kindness: 5, energy: 5 }
            }
          ]
        }
      ];
    } else if (npc.id === 'dad') {
      topics = [
        {
          prompt: `Dad: Today we are going to the Pizza Place! What kind of pizza should we get? 🍕`,
          options: [
            {
              label: `Yay! Let's bake our own Pepperoni & Cheese Pizza! 🍕🔥`,
              reply: `Dad: Awesome! Step up to the Brick Pizza Oven and pile on the toppings! 🍕🔥`,
              targetPlaceId: 'pizza-place',
              targetStation: 'pizza',
              stats: { happiness: 12, kindness: 6, skill: ['cooking', 6] }
            },
            {
              label: `Wow! Supreme Pizza with mushrooms, peppers & olives! 🍄🫑`,
              reply: `Dad: Now THAT is a gourmet pizza! Let's head into the Pizza Place! 🍕🌟`,
              targetPlaceId: 'pizza-place',
              stats: { happiness: 11, energy: 12, skill: ['cooking', 5] }
            },
            {
              label: `Extra cheesy Garlic Bread & a big slice at the booth! 🧀`,
              reply: `Dad: Save me a piece of garlic bread! Let's grab our booth! 🍽️💙`,
              targetPlaceId: 'pizza-place',
              stats: { happiness: 10, kindness: 8, energy: 10 }
            },
            {
              label: `Can we go to the Ice Cream Shop instead? 🍦`,
              reply: `Dad: Dessert first? Don't tell Mom—let's go to the Ice Cream Shop! 🍦😄`,
              targetPlaceId: 'ice-cream-shop',
              stats: { happiness: 12, kindness: 6 }
            },
            {
              label: `No thank you Dad, maybe tomorrow night! 🙏`,
              reply: `Dad: No worries kiddo, we'll do pizza night whenever you're ready! 💙`,
              isDecline: true,
              stats: { kindness: 6, energy: 5 }
            }
          ]
        },
        {
          prompt: `Dad: I've got the Family SUV keys! What should we do with the car today? 🚗`,
          options: [
            {
              label: `Yay! Let's go for a joyride with road-trip music! 🚗🎶`,
              reply: `Dad: Buckle up, kiddo! Windows down and favorite songs on the radio! 🚗🎶`,
              targetPlaceId: 'family-car',
              liveAction: 'drive',
              stats: { happiness: 12, kindness: 6 }
            },
            {
              label: `Let's wash the car with the soapy sponge for $8 allowance! 🧽🫧`,
              reply: `Dad: Deal! Grab the sudsy bucket—here's $8 for making the SUV sparkle! 🧽🪙`,
              targetPlaceId: 'family-car',
              liveAction: 'wash-car',
              stats: { happiness: 8, kindness: 8 }
            },
            {
              label: `Drive us over to the Wonder Toy Store! 🧸`,
              reply: `Dad: Next stop: Wonder Toy Store! Hop in! 🚙🧸`,
              targetPlaceId: 'toy-store',
              stats: { happiness: 12, kindness: 6 }
            },
            {
              label: `No thank you, I'll hang out at home for now 🙏`,
              reply: `Dad: Alright kiddo, the keys are on the hook whenever you want a ride! 💙`,
              isDecline: true,
              stats: { kindness: 5, energy: 6 }
            }
          ]
        },
        {
          prompt: `Dad: How are your studies and hobbies going, kiddo? Want to practice together? 📚`,
          options: [
            {
              label: `Let's draw & study at my Desk right now! ✏️🎨`,
              reply: `Dad: That's my champ! Let's open your Study Desk and create something awesome! ✏️🌟`,
              targetStation: 'desk',
              stats: { smarts: 10, happiness: 8, skill: ['art', 6] }
            },
            {
              label: `Quiz me on science, space, and math facts! 🔬🪐`,
              reply: `Dad: You got every single question right! You're a total genius, kiddo! 🧠🏆`,
              stats: { smarts: 14, happiness: 8, skill: ['tech', 6] }
            },
            {
              label: `Let's visit Hometown School together! 🏫`,
              reply: `Dad: Let's head over to Hometown School and check out the science table! 🏫🔬`,
              targetPlaceId: 'school',
              stats: { smarts: 10, happiness: 8 }
            },
            {
              label: `My brain is tired—tell me your funniest Dad Joke instead! 😂`,
              reply: `Dad: Why did the cookie go to the nurse? Because it felt crummy! Bwahaha! 🍪😂`,
              stats: { happiness: 14, kindness: 8, energy: 5 }
            }
          ]
        },
        {
          prompt: `Dad: If we visit the Wonder Toy Store, which toy display do you want to see first? 🧸`,
          options: [
            {
              label: `The Giant Teddy Bear & Plushie Shelves! 🧸`,
              reply: `Dad: Those plushies are almost bigger than you! Let's go see them! 🧸💙`,
              targetPlaceId: 'toy-store',
              stats: { happiness: 12, kindness: 8 }
            },
            {
              label: `The LEGO Building Table & Ride-On Toy Train! 🚂🧱`,
              reply: `Dad: All aboard the Toy Store Express! Let's build a giant LEGO castle too! 🚂🧱`,
              targetPlaceId: 'toy-store',
              stats: { happiness: 11, smarts: 10, skill: ['art', 5] }
            },
            {
              label: `The Roaring Green T-Rex Dinosaur! 🦖`,
              reply: `Dad: ROOOAR! Wait till you press the button on that T-Rex! Let's go! 🦖🌟`,
              targetPlaceId: 'toy-store',
              stats: { happiness: 14, smarts: 6 }
            },
            {
              label: `No thank you, I have plenty of toys right here 🙏`,
              reply: `Dad: Wow, so grateful and content! I'm proud of you, kiddo! 💙`,
              isDecline: true,
              stats: { kindness: 10, energy: 5 }
            }
          ]
        }
      ];
    } else if (npc.isSibling) {
      topics = [
        {
          prompt: `${speakerName}: Today we are going to the Sunny Playground! What should we play first? 🛝`,
          options: [
            {
              label: `Yay! Race you to the Giant Yellow Slide! 🛝🏃`,
              reply: `${speakerName}: Last one down the Giant Slide is a rotten egg! Go go go! 🛝🏃`,
              targetPlaceId: 'playground',
              liveAction: 'slide',
              stats: { happiness: 11, health: 6, skill: ['athletics', 7] }
            },
            {
              label: `Wow! Let's see who can swing higher on the Swings! ⛓️✨`,
              reply: `${speakerName}: Bet I can touch the clouds on the Swing Set! Come on! ⛓️☁️`,
              targetPlaceId: 'playground',
              liveAction: 'swing',
              stats: { happiness: 12, health: 6, skill: ['athletics', 6] }
            },
            {
              label: `Let's play tag and hide-and-seek on the grass! 🌳`,
              reply: `${speakerName}: You're IT! Try and catch me at the Playground! 🌳😄`,
              targetPlaceId: 'playground',
              stats: { happiness: 12, health: 8, skill: ['athletics', 8] }
            },
            {
              label: `No thank you, let's hang out at home instead 🙏`,
              reply: `${speakerName}: Cool with me! We can chill right here instead! 💛`,
              isDecline: true,
              stats: { kindness: 6, energy: 6 }
            }
          ]
        },
        {
          prompt: `${speakerName}: I'm craving treats! Should we hit the Corner Snack Store or Ice Cream Shop? 🍿🍦`,
          options: [
            {
              label: `Corner Snack Store for slushies & warm pretzels! 🥨🥤`,
              reply: `${speakerName}: Yes!! Blue raspberry slushies and salted pretzels, let's go! 🥨🥤`,
              targetPlaceId: 'snack-store',
              stats: { happiness: 12, energy: 10 }
            },
            {
              label: `Ice Cream Shop for giant waffle cones! 🍦🍨`,
              reply: `${speakerName}: Yay! Let's stack 3 scoops at the Ice Cream Shop! 🍦🌟`,
              targetPlaceId: 'ice-cream-shop',
              stats: { happiness: 12, energy: 10 }
            },
            {
              label: `Let's raid our own Fridge for Boba Bubble Milk Tea! 🧋`,
              reply: `${speakerName}: Genius move! Mom's Boba Tea on the bottom shelf is the best! 🧋✨`,
              targetStation: 'fridge',
              stats: { happiness: 10, smarts: 5 }
            },
            {
              label: `No thank you, I'm not hungry right now 🙏`,
              reply: `${speakerName}: More snacks for later then! 👍`,
              isDecline: true,
              stats: { kindness: 5, energy: 5 }
            }
          ]
        },
        {
          prompt: `${speakerName}: Hey! Want to play video games, draw comics, or practice music together? 🎮🎨`,
          options: [
            {
              label: `Let's team up in co-op video games! 🎮🏆`,
              reply: `${speakerName}: We beat the high score together! Best sibling duo ever! 🎮🔥`,
              stats: { happiness: 12, smarts: 6, skill: ['tech', 8] }
            },
            {
              label: `Let's draw superhero comics at my Study Desk! 🎨✏️`,
              reply: `${speakerName}: Whoa, your drawings look awesome! Let's color them in! 🎨🌟`,
              targetStation: 'desk',
              stats: { happiness: 10, smarts: 6, skill: ['art', 8] }
            },
            {
              label: `Let's put on a living-room music concert! 🎸🎤`,
              reply: `${speakerName}: One, two, three, rock on!! Mom and Dad cheered for our song! 🎸🎶`,
              stats: { happiness: 12, kindness: 6, skill: ['music', 9] }
            },
            {
              label: `Maybe in a little bit, I'm resting right now 😊`,
              reply: `${speakerName}: Anytime! Just call me when you're ready to play! 💛`,
              isDecline: true,
              stats: { kindness: 6, energy: 6 }
            }
          ]
        }
      ];
    } else {
      topics = [
        {
          prompt: `${speakerName}: Today we are going to the Ice Cream Shop! Which flavor are you getting? 🍦`,
          options: [
            {
              label: `Yay! Strawberry Swirl with rainbow sprinkles! 🍓✨`,
              reply: `${speakerName}: Yum!! Bestie ice cream trip—let's go get Strawberry Swirl! 🍓🍦`,
              targetPlaceId: 'ice-cream-shop',
              stats: { happiness: 12, kindness: 8, energy: 8 }
            },
            {
              label: `Wow! Mint Chocolate Chip & Vanilla Bean! 🍃🍫`,
              reply: `${speakerName}: Classic combo! Let's scoop our cones right now! 🍨🌟`,
              targetPlaceId: 'ice-cream-shop',
              targetStation: 'icecream',
              stats: { happiness: 12, smarts: 5, energy: 8 }
            },
            {
              label: `Let's get matching 3-scoop waffle cones together! 🍨💛`,
              reply: `${speakerName}: Matching bestie waffle cones!! Let's head to the Ice Cream Shop! 🍨💛`,
              targetPlaceId: 'ice-cream-shop',
              stats: { happiness: 14, kindness: 10, energy: 8 }
            },
            {
              label: `No thank you, let's go another day 🙏`,
              reply: `${speakerName}: No worries at all! Next time my treat! 😊`,
              isDecline: true,
              stats: { kindness: 6, energy: 5 }
            }
          ]
        },
        {
          prompt: `${speakerName}: Come over to my house (Best Friend's Home)! What should we do first? 🌟🏡`,
          options: [
            {
              label: `Play co-op games on your big TV & sectional couch! 🎮🛋️`,
              reply: `${speakerName}: Grab player two's controller! My living room is ready! 🎮🌟`,
              targetPlaceId: 'best-friend-home',
              stats: { happiness: 13, kindness: 8, skill: ['tech', 7] }
            },
            {
              label: `Make fluffy pancakes & smoothies in your kitchen! 🥞🥤`,
              reply: `${speakerName}: Bestie pancake party!! Let's head to my kitchen! 🥞🍓`,
              targetPlaceId: 'best-friend-home',
              stats: { happiness: 12, energy: 12, skill: ['cooking', 8] }
            },
            {
              label: `Tell funny stories & plan our future dream house! 🏡✨`,
              reply: `${speakerName}: When we turn 21 we're going to have the coolest house ever! 🏡💛`,
              targetPlaceId: 'best-friend-home',
              stats: { happiness: 14, kindness: 10 }
            },
            {
              label: `Come hang out in My Bedroom instead! 🛏️`,
              reply: `${speakerName}: Awesome! I love hanging out in your room! Let's go! 🛏️🌟`,
              targetPlaceId: 'my-room',
              stats: { happiness: 11, kindness: 8 }
            },
            {
              label: `No thank you, I need to rest up first 🙏`,
              reply: `${speakerName}: Anytime you want to visit, my door is always open! 💛`,
              isDecline: true,
              stats: { kindness: 6, energy: 6 }
            }
          ]
        },
        {
          prompt: `${speakerName}: Today we are going to Sunnyvale Mall! Where should we stop first? 🛍️`,
          options: [
            {
              label: `Take silly bestie photos in the Instant Photo Booth! 📸✨`,
              reply: `${speakerName}: Cheese!! We get to keep the photo strip forever! 📸💛`,
              targetPlaceId: 'mall',
              stats: { happiness: 14, kindness: 8, skill: ['art', 6] }
            },
            {
              label: `Toss a lucky coin into the Mall Water Fountain! ⛲🪙`,
              reply: `${speakerName}: Splash! I wished that we stay best friends forever! ⛲🌟`,
              targetPlaceId: 'mall',
              stats: { happiness: 12, kindness: 10 }
            },
            {
              label: `Check out the trendy outfits at the Fashion Boutique! 👗🕶️`,
              reply: `${speakerName}: You look like a total superstar in those outfits! 👗✨`,
              targetPlaceId: 'mall',
              stats: { happiness: 12, skill: ['art', 7] }
            },
            {
              label: `No thank you, let's save the Mall trip for later 🙏`,
              reply: `${speakerName}: Sounds good, we'll hang out right here instead! 🤝`,
              isDecline: true,
              stats: { kindness: 5, energy: 5 }
            }
          ]
        },
        {
          prompt: `${speakerName}: Hey bestie! Want to study at School, grab Pizza, or play at the Park? 🎒🌟`,
          options: [
            {
              label: `Let's team up at Hometown School & ace our project! 🏫📚`,
              reply: `${speakerName}: Gold stars for both of us! Best study partners ever! 🏫🌟`,
              targetPlaceId: 'school',
              stats: { smarts: 12, happiness: 10 }
            },
            {
              label: `Let's grab hot cheesy slices at the Pizza Place! 🍕`,
              reply: `${speakerName}: Yes!! Nothing beats a hot slice at the Pizza Place! 🍕🔥`,
              targetPlaceId: 'pizza-place',
              stats: { happiness: 12, energy: 10 }
            },
            {
              label: `Let's race over to the Sunny Playground! 🛝`,
              reply: `${speakerName}: Last one to the swings has to push! Come on! 🛝☀️`,
              targetPlaceId: 'playground',
              stats: { happiness: 12, health: 8, skill: ['athletics', 7] }
            },
            {
              label: `Let's just chat and share secrets right here! 💬💛`,
              reply: `${speakerName}: Talking with you always makes my day 100x better! 💬🥰`,
              stats: { happiness: 12, kindness: 10 }
            }
          ]
        }
      ];
    }

    return topics[idx % topics.length];
  },

  getAskTopicForNpc(npc) {
    const speakerName = npc.id === 'mom' ? 'Mom' : (npc.id === 'dad' ? 'Dad' : npc.name.split(' ')[0]);
    const idx = this.askIndices[npc.id] || 0;
    const playerName = (gameState && gameState.name) ? gameState.name : 'You';

    let batches = [];
    if (npc.id === 'mom') {
      batches = [
        {
          prompt: `🙋 ${playerName}: What do you want to ask Mom?`,
          isAskMode: true,
          options: [
            {
              label: `"Mom, can we go to the Ice Cream Shop today? 🍦"`,
              reply: `Mom: Yay! Of course sweetie, let's go get ice cream cones right now! 🍦💛`,
              targetPlaceId: 'ice-cream-shop',
              stats: { happiness: 12, kindness: 6 }
            },
            {
              label: `"Mom, can I have $15 pocket money please? 🪙"`,
              reply: `Mom: Since you asked so politely, here is $15 pocket money! 🪙💛`,
              stats: { money: 15, happiness: 10, kindness: 8 }
            },
            {
              label: `"Mom, I'm hungry! Can I have Boba Bubble Milk Tea? 🧋"`,
              reply: `Mom: Coming right up! Fresh Boba Bubble Milk Tea from the bottom shelf! 🧋✨`,
              consumeItem: 'boba',
              stats: { happiness: 10, kindness: 6 }
            },
            {
              label: `"Mom, can we go play on the Slide at the Sunny Playground? 🛝"`,
              reply: `Mom: Let's go! Put your shoes on, we're heading to the Sunny Playground! 🛝☀️`,
              targetPlaceId: 'playground',
              liveAction: 'slide',
              stats: { happiness: 12, health: 7 }
            },
            {
              label: `"Mom, can we go visit the Wonder Toy Store? 🧸"`,
              reply: `Mom: Yes! Let's go look at the plushies, LEGOs, and toy train together! 🧸🚂`,
              targetPlaceId: 'toy-store',
              stats: { happiness: 12, kindness: 6 }
            }
          ]
        },
        {
          prompt: `🙋 ${playerName}: Ask Mom another question!`,
          isAskMode: true,
          options: [
            {
              label: `"Mom, can we buy new furniture for My Bedroom? 🪑"`,
              reply: `Mom: Ooh, yes! Here's $10 to help—let's open the Room Furniture Catalog! 🪑✨`,
              openModal: 'furniture',
              stats: { money: 10, happiness: 10, skill: ['art', 5] }
            },
            {
              label: `"Mom, can you make me a bowl of Warm Chicken Soup? 🍲"`,
              reply: `Mom: Here's a hot, comforting bowl of my homemade Chicken Soup! 🍲💚`,
              consumeItem: 'soup',
              stats: { health: 10, kindness: 6 }
            },
            {
              label: `"Mom, can you help me draw & study at my Desk? 🎨✏️"`,
              reply: `Mom: I'd love to! Let's sit at your Study Desk and draw together! 🎨🌟`,
              targetStation: 'desk',
              stats: { smarts: 10, happiness: 8, skill: ['art', 6] }
            },
            {
              label: `"Mom, can we go to the Pizza Place for dinner? 🍕"`,
              reply: `Mom: Pizza night sounds delicious! Let's head to the Pizza Place! 🍕🔥`,
              targetPlaceId: 'pizza-place',
              stats: { happiness: 12, energy: 10 }
            },
            {
              label: `"Mom, how was your day today? I love you! 💛"`,
              reply: `Mom: Aww, my day is wonderful now that you asked! I love you so much, sweetie! 🥰💛`,
              stats: { happiness: 15, kindness: 15, health: 6 }
            }
          ]
        }
      ];
    } else if (npc.id === 'dad') {
      batches = [
        {
          prompt: `🙋 ${playerName}: What do you want to ask Dad?`,
          isAskMode: true,
          options: [
            {
              label: `"Dad, can we go bake a pizza at the Pizza Place? 🍕"`,
              reply: `Dad: You bet, kiddo! Let's fire up the Brick Pizza Oven right now! 🍕🔥`,
              targetPlaceId: 'pizza-place',
              targetStation: 'pizza',
              stats: { happiness: 12, kindness: 6, skill: ['cooking', 6] }
            },
            {
              label: `"Dad, can you take me for a joyride in the Family SUV? 🚗"`,
              reply: `Dad: Hop in! Road-trip tunes are cranked up! Beep beep! 🚗🎶`,
              targetPlaceId: 'family-car',
              liveAction: 'drive',
              stats: { happiness: 12, kindness: 6 }
            },
            {
              label: `"Dad, can I wash the car for $10 allowance money? 🧽🪙"`,
              reply: `Dad: Deal! Grab the soapy sponge & hose—here's $10 for helping out! 🧽🪙`,
              targetPlaceId: 'family-car',
              liveAction: 'wash-car',
              stats: { money: 2, happiness: 10, kindness: 8 }
            },
            {
              label: `"Dad, can we go see the Roaring T-Rex at the Toy Store? 🦖"`,
              reply: `Dad: ROOOAR! Let's head straight to the Wonder Toy Store! 🦖🧸`,
              targetPlaceId: 'toy-store',
              stats: { happiness: 14, smarts: 5 }
            },
            {
              label: `"Dad, can you tell me your funniest Dad Joke? 😂"`,
              reply: `Dad: What do you call cheese that isn't yours? Nacho cheese! Bwahaha! 🧀😂`,
              stats: { happiness: 15, kindness: 8 }
            }
          ]
        },
        {
          prompt: `🙋 ${playerName}: Ask Dad another question!`,
          isAskMode: true,
          options: [
            {
              label: `"Dad, can I have $15 allowance for my savings? 🪙"`,
              reply: `Dad: Sure thing, champ! Here's $15 for your piggy bank! 🪙💙`,
              stats: { money: 15, happiness: 10, smarts: 6 }
            },
            {
              label: `"Dad, can we go get ice cream cones together? 🍦"`,
              reply: `Dad: Double-scoop waffle cones, coming right up! Let's go! 🍦🌟`,
              targetPlaceId: 'ice-cream-shop',
              stats: { happiness: 12, kindness: 6 }
            },
            {
              label: `"Dad, can you help me with my homework at School? 🏫📚"`,
              reply: `Dad: Let's head to Hometown School and ace those lessons together! 🏫🏆`,
              targetPlaceId: 'school',
              stats: { smarts: 14, happiness: 8 }
            },
            {
              label: `"Dad, can you push me on the Playground Swings? ⛓️"`,
              reply: `Dad: Hold on tight, I'll push you all the way to the clouds! ⛓️☀️`,
              targetPlaceId: 'playground',
              liveAction: 'swing',
              stats: { happiness: 12, health: 8 }
            }
          ]
        }
      ];
    } else if (npc.isSibling) {
      batches = [
        {
          prompt: `🙋 ${playerName}: What do you want to ask ${speakerName}?`,
          isAskMode: true,
          options: [
            {
              label: `"Can we race down the Giant Slide at the Playground? 🛝"`,
              reply: `${speakerName}: You're on!! First one down the Giant Slide wins! 🛝🏃`,
              targetPlaceId: 'playground',
              liveAction: 'slide',
              stats: { happiness: 12, health: 6, skill: ['athletics', 7] }
            },
            {
              label: `"Can we get slushies & pretzels at the Corner Snack Store? 🥨🥤"`,
              reply: `${speakerName}: Yes!! Let's go grab slushies at the Corner Snack Store! 🥨🥤`,
              targetPlaceId: 'snack-store',
              stats: { happiness: 12, energy: 10 }
            },
            {
              label: `"Can we go get waffle cones at the Ice Cream Shop? 🍦"`,
              reply: `${speakerName}: Always down for ice cream! Let's go! 🍦🍨`,
              targetPlaceId: 'ice-cream-shop',
              stats: { happiness: 12, energy: 8 }
            },
            {
              label: `"Want to play co-op video games with me? 🎮"`,
              reply: `${speakerName}: Let's do it! Nobody can beat our sibling team! 🎮🏆`,
              stats: { happiness: 14, smarts: 6, skill: ['tech', 8] }
            },
            {
              label: `"Can you help me draw a comic at my Study Desk? 🎨"`,
              reply: `${speakerName}: Sure! Let's open your Study Desk and draw an epic comic! 🎨✏️`,
              targetStation: 'desk',
              stats: { happiness: 11, smarts: 6, skill: ['art', 8] }
            }
          ]
        }
      ];
    } else {
      batches = [
        {
          prompt: `🙋 ${playerName}: What do you want to ask ${speakerName}?`,
          isAskMode: true,
          options: [
            {
              label: `"Want to go to the Ice Cream Shop together? 🍦"`,
              reply: `${speakerName}: Yay!! Bestie ice cream trip! Let's go right now! 🍦💛`,
              targetPlaceId: 'ice-cream-shop',
              stats: { happiness: 13, kindness: 8, energy: 8 }
            },
            {
              label: `"Can I come over to your house (Best Friend's Home)? 🏡🌟"`,
              reply: `${speakerName}: Yes!! Come on in, let's play games and make pancakes! 🏡🥞`,
              targetPlaceId: 'best-friend-home',
              stats: { happiness: 14, kindness: 10 }
            },
            {
              label: `"Want to come hang out in My Bedroom? 🛏️"`,
              reply: `${speakerName}: I'd love to! Your room is so cozy! Let's go! 🛏️✨`,
              targetPlaceId: 'my-room',
              stats: { happiness: 12, kindness: 8 }
            },
            {
              label: `"Can we go to Sunnyvale Mall & use the Photo Booth? 🛍️📸"`,
              reply: `${speakerName}: Bestie photo strip time!! Let's head to Sunnyvale Mall! 📸🌟`,
              targetPlaceId: 'mall',
              stats: { happiness: 14, kindness: 8, skill: ['art', 6] }
            },
            {
              label: `"Want to go eat hot cheesy slices at the Pizza Place? 🍕"`,
              reply: `${speakerName}: Count me in! Let's go to the Pizza Place! 🍕🔥`,
              targetPlaceId: 'pizza-place',
              stats: { happiness: 12, energy: 10 }
            }
          ]
        }
      ];
    }

    return batches[idx % batches.length];
  },

  openDialogueWith(npcId, mode = null) {
    if (!gameState) return;
    if (!this.npcs || this.npcs.length === 0) {
      this.rebuildNPCs();
    }
    const npc = this.npcs.find(n => n.id === npcId) || this.npcs[0];
    if (!npc) return;

    SoundFX.pop();
    const activeMode = mode || (this.activeDialogue && this.activeDialogue.npcId === npc.id ? this.activeDialogue.mode : 'answer') || 'answer';
    const topic = activeMode === 'ask' ? this.getAskTopicForNpc(npc) : this.getDialogueTopicForNpc(npc);

    this.activeDialogue = {
      npcId: npc.id,
      npcName: npc.name,
      npcAvatar: npc.avatar,
      npcAge: npc.renderAge,
      isFamily: npc.isFamily,
      isSibling: npc.isSibling,
      siblingId: npc.siblingId,
      friendId: npc.friendId,
      mode: activeMode, // 'answer' (they ask you) or 'ask' (you ask them!)
      topic: topic,
      resolved: false,
      playerChoiceText: null,
      npcReplyText: null
    };
    this.renderWorldDOM();
  },

  switchDialogueMode(newMode) {
    if (!this.activeDialogue) return;
    this.openDialogueWith(this.activeDialogue.npcId, newMode);
  },

  nextDialogueTopic() {
    if (!this.activeDialogue) return;
    const npcId = this.activeDialogue.npcId;
    const mode = this.activeDialogue.mode || 'answer';
    if (mode === 'ask') {
      this.askIndices[npcId] = ((this.askIndices[npcId] || 0) + 1);
    } else {
      this.dialogueIndices[npcId] = ((this.dialogueIndices[npcId] || 0) + 1);
    }
    this.openDialogueWith(npcId, mode);
  },

  submitCustomAskQuestion(ev) {
    if (ev) ev.preventDefault();
    if (!gameState || !this.activeDialogue) return;
    const inputEl = document.getElementById('custom-dialogue-ask-input');
    if (!inputEl) return;
    const rawText = (inputEl.value || '').trim();
    if (!rawText) {
      showToast('✍️ Type a question to ask first!');
      return;
    }

    const dlg = this.activeDialogue;
    const speakerName = dlg.npcId === 'mom' ? 'Mom' : (dlg.npcId === 'dad' ? 'Dad' : dlg.npcName.split(' ')[0]);
    const q = rawText.toLowerCase();

    // Build a smart context-aware response + action based on what the player asked!
    let customOpt = {
      label: `"${rawText}"`,
      reply: `${speakerName}: Yes!! That sounds awesome, let's do it together! 🌟💛`,
      stats: { happiness: 11, kindness: 8 }
    };

    if (q.includes('ice cream') || q.includes('cone') || q.includes('scoop') || q.includes('sprinkle')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Yay! Yes, let's go to the Ice Cream Shop right now! 🍦💛`,
        targetPlaceId: 'ice-cream-shop',
        stats: { happiness: 14, kindness: 8, energy: 8 }
      };
    } else if (q.includes('boba') || q.includes('milk tea') || q.includes('bubble tea') || q.includes('tea')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Coming right up! Fresh Boba Bubble Milk Tea from the bottom shelf of the Fridge! 🧋✨`,
        consumeItem: 'boba',
        stats: { happiness: 12, kindness: 6 }
      };
    } else if (q.includes('soup') || q.includes('sick') || q.includes('medicine')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Here is a warm, healing bowl of homemade Chicken Soup! 🍲💚`,
        consumeItem: 'soup',
        stats: { health: 12, kindness: 8 }
      };
    } else if (q.includes('pancake') || q.includes('breakfast')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Fluffy Honey Berry Pancakes coming right up! 🥞✨`,
        consumeItem: 'pancakes',
        stats: { happiness: 12, kindness: 6 }
      };
    } else if (q.includes('hungry') || q.includes('food') || q.includes('eat') || q.includes('fridge') || q.includes('lunch') || q.includes('dinner')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Let's open the Fridge—both blue shelves are stocked with Boba Tea, Soup, and Pancakes! 🧊🍽️`,
        targetStation: 'fridge',
        stats: { happiness: 10, kindness: 6 }
      };
    } else if (q.includes('money') || q.includes('allowance') || q.includes('dollar') || q.includes('cash') || q.includes('coin') || q.includes('$')) {
      const amt = (dlg.npcId === 'mom' || dlg.npcId === 'dad') ? 15 : 6;
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Since you asked so nicely, here is $${amt} pocket money! 🪙💛`,
        stats: { money: amt, happiness: 12, kindness: 8 }
      };
    } else if (q.includes('pizza') || q.includes('pepperoni')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Pizza time!! Let's head to the Pizza Place together! 🍕🔥`,
        targetPlaceId: 'pizza-place',
        stats: { happiness: 13, energy: 10 }
      };
    } else if (q.includes('playground') || q.includes('park') || q.includes('slide') || q.includes('swing')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Yes! Let's go play at the Sunny Playground right now! 🛝☀️`,
        targetPlaceId: 'playground',
        liveAction: q.includes('swing') ? 'swing' : (q.includes('slide') ? 'slide' : null),
        stats: { happiness: 13, health: 8 }
      };
    } else if (q.includes('toy') || q.includes('plush') || q.includes('teddy') || q.includes('lego') || q.includes('dino') || q.includes('t-rex')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Woohoo! Let's go explore the Wonder Toy Store together! 🧸🦖`,
        targetPlaceId: 'toy-store',
        stats: { happiness: 14, kindness: 6 }
      };
    } else if (q.includes('car') || q.includes('drive') || q.includes('ride') || q.includes('suv') || q.includes('wash')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Grab the keys! Let's head out to the Family SUV! 🚗🎶`,
        targetPlaceId: 'family-car',
        liveAction: q.includes('wash') ? 'wash-car' : 'drive',
        stats: { happiness: 12, kindness: 6 }
      };
    } else if (q.includes('gym') || q.includes('workout') || q.includes('work out') || q.includes('exercise') || q.includes('weights') || q.includes('treadmill')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Let's go work out at Powerhouse Fitness Gym right now! 💪🏋️`,
        targetPlaceId: 'gym',
        stats: { health: 12, happiness: 10, skill: ['athletics', 12] }
      };
    } else if (q.includes('snack') || q.includes('slushie') || q.includes('pretzel')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Let's go grab slushies and warm pretzels at the Corner Snack Store! 🍿🥤`,
        targetPlaceId: 'snack-store',
        stats: { happiness: 12, energy: 10 }
      };
    } else if (q.includes('mall') || q.includes('photo') || q.includes('fountain') || q.includes('boutique')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Let's head over to Sunnyvale Mall right now! 🛍️📸`,
        targetPlaceId: 'mall',
        stats: { happiness: 13, kindness: 8 }
      };
    } else if (q.includes('school') || q.includes('homework') || q.includes('teacher') || q.includes('class')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Let's go to Hometown School and learn something awesome! 🏫📚`,
        targetPlaceId: 'school',
        stats: { smarts: 13, happiness: 9 }
      };
    } else if (q.includes('draw') || q.includes('desk') || q.includes('study') || q.includes('art')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Let's open your Study & Drawing Desk! 🎨✏️`,
        targetStation: 'desk',
        stats: { smarts: 10, happiness: 10, skill: ['art', 7] }
      };
    } else if (q.includes('bag') || q.includes('pack') || q.includes('backpack')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Let's open your Backpack and pack your 6 pocket slots! 🎒✨`,
        targetStation: 'bag',
        stats: { smarts: 8, happiness: 10, kindness: 6 }
      };
    } else if (q.includes('furniture') || q.includes('decorate') || q.includes('chair') || q.includes('tv')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Let's open the Room Furniture Catalog and pick out new decor! 🪑✨`,
        openModal: 'furniture',
        stats: { happiness: 11, kindness: 6 }
      };
    } else if (q.includes('best friend') || q.includes('your house') || q.includes('sleepover')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Come on over to Best Friend's Home! 🏡🌟`,
        targetPlaceId: 'best-friend-home',
        stats: { happiness: 14, kindness: 10 }
      };
    } else if (q.includes('sleep') || q.includes('nap') || q.includes('tired') || q.includes('bed')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Hop into your cozy bed for a rest! Sweet dreams! 🛏️💤`,
        liveAction: 'sleep',
        stats: { happiness: 8, health: 8 }
      };
    } else if (q.includes('sorry') || q.includes('apologize') || q.includes('unground') || q.includes('forgive')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Thank you for apologizing! I forgive you—you are UNGROUNDED! 💛🥰`,
        ungroundNow: true,
        stats: { kindness: 10, happiness: 8 }
      };
    } else if (q.includes('ground me') || q.includes('make a mess') || q.includes('tantrum') || q.includes('hate') || q.includes('no way')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: HEY! That is no way to behave! You are SCOLDED and GROUNDED to your room! 😠🚫`,
        triggerGrounded: `${speakerName} scolded you for acting out!`,
        stats: { kindness: -8, happiness: -6 }
      };
    } else if (q.includes('love') || q.includes('how are you') || q.includes('hug') || q.includes('best')) {
      customOpt = {
        label: `"${rawText}"`,
        reply: `${speakerName}: Aww, I love you so much! You always make me smile! 🥰💛`,
        stats: { happiness: 15, kindness: 15, health: 6 }
      };
    }

    // Inject this custom question as option 1 and execute it!
    dlg.topic = {
      prompt: `🙋 ${gameState.name} asked ${speakerName}:`,
      isAskMode: true,
      options: [customOpt]
    };
    this.selectDialogueOption(1);
  },

  doesNpcWantToTalk(npcOrId) {
    if (!gameState) return false;
    const turnKey = `${gameState.age}_${gameState.dayCount || 0}_${gameState.timeOfDay || 'day'}`;
    if (this.lastUrgentTurnKey !== turnKey) {
      this.lastUrgentTurnKey = turnKey;
      this.answeredUrgentNpcs = {};
    }

    const npcId = typeof npcOrId === 'string' ? npcOrId : (npcOrId && npcOrId.id);
    if (!npcId) return false;

    // Once you answer their urgent question this turn, their head icon switches to normal 💬
    if (this.answeredUrgentNpcs && this.answeredUrgentNpcs[npcId]) {
      return false;
    }

    // Mom and Dad always start the turn wanting to talk to you (❗💬)
    if (npcId === 'mom' || npcId === 'dad') {
      return true;
    }

    // Best Friend also starts wanting to talk to you (❗💬)
    const bestFriend = typeof getTopFriend === 'function' ? getTopFriend(gameState) : null;
    if (bestFriend && npcId === bestFriend.id) {
      return true;
    }

    // One rotating sibling or friend per day/age also wants to talk (❗💬), while others show normal 💬
    const seed = (gameState.age || 0) + (gameState.dayCount || 0);
    if (gameState.siblings && gameState.siblings.length > 0) {
      const activeSib = gameState.siblings[seed % gameState.siblings.length];
      if (activeSib && npcId === activeSib.id) return true;
    }

    return false;
  },

  closeDialogue() {
    SoundFX.pop();
    this.activeDialogue = null;
    this.renderWorldDOM();
  },

  selectDialogueOption(choiceNum) {
    if (!gameState || !this.activeDialogue || this.activeDialogue.resolved) return;
    const dlg = this.activeDialogue;
    const topic = dlg.topic;
    const options = (topic && topic.options) || [];
    const opt = options[choiceNum - 1];
    if (!opt) return;

    if (dlg.mode === 'ask') {
      this.askIndices[dlg.npcId] = ((this.askIndices[dlg.npcId] || 0) + 1);
    } else {
      this.dialogueIndices[dlg.npcId] = ((this.dialogueIndices[dlg.npcId] || 0) + 1);
      // Mark their urgent ❗💬 as answered so their head badge switches to normal 💬!
      if (!this.answeredUrgentNpcs) this.answeredUrgentNpcs = {};
      this.answeredUrgentNpcs[dlg.npcId] = true;
    }

    const playerWords = dlg.mode === 'ask' ? `🙋 Asked: ${opt.label}` : `${choiceNum}: ${opt.label}`;
    const reply = opt.reply;
    dlg.resolved = true;
    dlg.playerChoiceText = playerWords;
    dlg.npcReplyText = reply;

    // Apply custom stat/skill/money/energy effects for this specific answer
    const st = opt.stats || {};
    if (st.happiness) gameState.stats.happiness = clampStat(gameState.stats.happiness + st.happiness);
    if (st.kindness) gameState.stats.kindness = clampStat(gameState.stats.kindness + st.kindness);
    if (st.smarts) gameState.stats.smarts = clampStat(gameState.stats.smarts + st.smarts);
    if (st.health) gameState.stats.health = clampStat(gameState.stats.health + st.health);
    if (st.energy) gameState.energy = Math.min(100, Math.round(gameState.energy + st.energy));
    if (st.money) gameState.money += st.money;
    if (st.skill) {
      const [skName, skAmt] = st.skill;
      gameState.skills[skName] = Math.min(100, (gameState.skills[skName] || 0) + skAmt);
    }

    // Boost relationship bond & advance quests if not declining
    const bondGain = opt.isDecline ? 4 : 11;
    if (dlg.isSibling && dlg.siblingId && gameState.siblings) {
      const sib = gameState.siblings.find(s => s.id === dlg.siblingId);
      if (sib) sib.bond = clampStat((sib.bond || 80) + bondGain);
      if (!opt.isDecline && typeof advanceQuestProgress === 'function') advanceQuestProgress('sibling', dlg.siblingId);
    } else if (dlg.isFamily) {
      if (!opt.isDecline && typeof advanceQuestProgress === 'function') advanceQuestProgress('family', dlg.npcName);
    } else if (dlg.friendId) {
      const fr = gameState.friends.find(f => f.id === dlg.friendId);
      if (fr) fr.bond = clampStat(fr.bond + bondGain);
      if (!opt.isDecline && typeof advanceQuestProgress === 'function') advanceQuestProgress('friend', dlg.friendId);
    }

    if (opt.isDecline) {
      SoundFX.pop();
    } else {
      SoundFX.milestone();
    }

    addCurrentYearLog(`💬 ${topic.prompt} — You answered "${playerWords}" -> ${reply}`);
    showToast(`💬 ${playerWords} — ${reply}`);

    // Handle Grounded / Scolded / Ungrounded dialogue outcomes!
    if (opt.ungroundNow) {
      gameState.isGrounded = false;
      gameState.groundedDays = 0;
      gameState.groundedReason = '';
      addCurrentYearLog(`🙏 ${reply} — You are no longer Grounded!`);
    }
    if (opt.extraGroundedDay) {
      gameState.isGrounded = true;
      gameState.groundedDays = (gameState.groundedDays || 1) + 1;
      delete this.answeredUrgentNpcs[dlg.npcId];
      addCurrentYearLog(`🚫 ${reply} (Now grounded for ${gameState.groundedDays} days!)`);
    }
    if (opt.triggerGrounded && typeof groundPlayer === 'function') {
      this.activeDialogue = null;
      groundPlayer(opt.triggerGrounded, 2);
      return;
    }

    // If the choice serves a specific Fridge item (like Boba Tea, Soup, or Pancakes)
    if (opt.consumeItem) {
      this.activeDialogue = null;
      this.openStationView('fridge');
      this.consumeFridgeShelfItem(opt.consumeItem);
      return;
    }

    // If the choice opens the Furniture Catalog modal
    if (opt.openModal === 'furniture' && typeof openFurnitureShopModal === 'function') {
      this.activeDialogue = null;
      saveGame();
      renderLeftProfile();
      renderCenterTimeline();
      renderRightPanel();
      this.renderWorldDOM();
      openFurnitureShopModal();
      return;
    }

    // If the choice travels to a place together
    if (opt.targetPlaceId) {
      if (gameState.isGrounded && gameState.groundedDays > 0 && opt.targetPlaceId !== 'my-room') {
        showToast(`🚫 You are GROUNDED in your room (${gameState.groundedDays}d left)! Apologize to Mom or Clean Your Room first!`);
      } else {
        this.guestNpcId = dlg.npcId;
        this.currentRoomId = opt.targetPlaceId;
        this.viewMode = 'room';
        this.stationView = null;
        this.playerX = 28;
        this.playerY = 56;
        this.targetX = 28;
        this.targetY = 56;
        if (typeof advanceQuestProgress === 'function') {
          advanceQuestProgress('place', opt.targetPlaceId);
        }
      }
    }

    // If the choice opens an interactive station (Fridge, Desk, Pizza Oven, Ice Cream Counter, Wardrobe)
    if (opt.targetStation) {
      this.activeDialogue = null;
      this.openStationView(opt.targetStation);
      saveGame();
      renderLeftProfile();
      renderCenterTimeline();
      renderRightPanel();
      return;
    }

    // If the choice triggers a live animation (Slide, Swing, Drive, Wash Car, Sleep)
    if (opt.liveAction) {
      this.activeDialogue = null;
      this.performLiveAction(opt.liveAction, 28, opt.targetPlaceId || this.currentRoomId);
      return;
    }

    saveGame();
    renderLeftProfile();
    renderCenterTimeline();
    renderRightPanel();
    this.renderWorldDOM();
  },

  switchView(mode, roomId = null) {
    if (!gameState) return;
    if (gameState.isGrounded && gameState.groundedDays > 0 && (mode === 'town' || (roomId && roomId !== 'my-room'))) {
      SoundFX.pop();
      this.openGroundedDoorModal();
      return;
    }
    SoundFX.pop();
    this.stationView = null;
    this.liveAction = null;
    this.viewMode = mode === 'town' ? 'town' : 'room';
    if (roomId) {
      this.currentRoomId = roomId;
    }
    if (this.viewMode === 'room') {
      this.playerX = 28;
      this.playerY = 56;
      this.targetX = 28;
      this.targetY = 56;
      if (this.currentRoomId && this.currentRoomId !== 'my-room') {
        this.activeZoneId = this.currentRoomId;
      }
    } else {
      this.placePlayerAtCurrentHome();
    }
    this.renderWorldDOM();
  },

  openStationView(type) {
    if (!gameState) return;
    SoundFX.pop();
    this.viewMode = 'room';
    this.stationView = type;
    this.liveAction = null;
    this.fridgeActionItem = null;
    if (type === 'pizza') {
      this.pizzaBaked = false;
    }
    this.renderWorldDOM();
    if (type === 'desk') {
      setTimeout(() => this.initDeskCanvas(), 40);
    }
  },

  closeStationView() {
    SoundFX.pop();
    this.stationView = null;
    this.fridgeActionItem = null;
    this.renderWorldDOM();
  },

  consumeFridgeShelfItem(itemId) {
    if (!gameState) return;
    const FRIDGE_SHELF_ITEMS = {
      'boba': {
        name: 'Boba Bubble Milk Tea',
        icon: '🧋',
        svgType: 'boba',
        cost: 0,
        energy: 16,
        happiness: 12,
        health: 4,
        msg: '🧋 Sipped sweet Boba Bubble Milk Tea through the purple straw! (+16% ⚡ Energy, +12 😊 Happiness)'
      },
      'sandwich': {
        name: 'Warm Grilled Cheese Sandwich',
        icon: '🥪',
        svgType: 'sandwich',
        cost: 0,
        energy: 14,
        happiness: 7,
        health: 6,
        msg: '🥪 Ate a crunchy Warm Grilled Cheese Sandwich from the shelf! (+14% ⚡ Energy, +6 💚 Health)'
      },
      'soup': {
        name: "Mom's Warm Chicken Soup",
        icon: '🍲',
        svgType: 'soup',
        cost: 0,
        energy: 12,
        happiness: 6,
        health: 10,
        cureSick: true,
        msg: "🍲 Slurped Mom's Warm Chicken Soup! (+12% ⚡ Energy, +10 💚 Health & Cured Sickness!)"
      },
      'pizza': {
        name: 'Cheesy Pepperoni Pizza Slice',
        icon: '🍕',
        svgType: 'pizza',
        cost: 0,
        energy: 18,
        happiness: 11,
        health: 2,
        msg: '🍕 Ate a cheesy Pepperoni Pizza Slice from the fridge! (+18% ⚡ Energy, +11 😊 Happiness)'
      },
      'apple-bowl': {
        name: 'Crisp Apple & Berry Bowl',
        icon: '🍎',
        svgType: 'apple-bowl',
        cost: 0,
        energy: 10,
        happiness: 5,
        health: 8,
        msg: '🍎 Munched a Crisp Apple & Berry Bowl! (+10% ⚡ Energy, +8 💚 Health)'
      },
      'pancakes': {
        name: 'Fluffy Honey Berry Pancakes',
        icon: '🥞',
        svgType: 'pancakes',
        cost: 0,
        energy: 16,
        happiness: 10,
        skill: ['cooking', 5],
        msg: '🥞 Enjoyed Fluffy Honey Berry Pancakes! (+16% ⚡ Energy, +10 😊 Happiness, +5 🧁 Cooking)'
      },
      'smoothie': {
        name: 'Strawberry Brain Smoothie',
        icon: '🧃',
        svgType: 'smoothie',
        cost: 0,
        energy: 15,
        health: 8,
        smarts: 7,
        msg: '🧃 Drank a cold Strawberry Brain Smoothie! (+15% ⚡ Energy, +8 💚 Health, +7 🧠 Smarts)'
      },
      'cupcake': {
        name: 'Rainbow Frosted Cupcake',
        icon: '🧁',
        svgType: 'cupcake',
        cost: 0,
        energy: 15,
        happiness: 12,
        skill: ['cooking', 4],
        msg: '🧁 Ate a Rainbow Frosted Cupcake! (+15% ⚡ Energy, +12 😊 Happiness)'
      }
    };

    const item = FRIDGE_SHELF_ITEMS[itemId];
    if (!item) return;

    gameState.energy = Math.min(100, Math.round(gameState.energy + (item.energy || 12)));
    if (item.happiness) gameState.stats.happiness = clampStat(gameState.stats.happiness + item.happiness);
    if (item.health) gameState.stats.health = clampStat(gameState.stats.health + item.health);
    if (item.smarts) gameState.stats.smarts = clampStat(gameState.stats.smarts + item.smarts);
    if (item.skill) {
      const [sk, amt] = item.skill;
      gameState.skills[sk] = Math.min(100, (gameState.skills[sk] || 0) + amt);
    }
    if (item.cureSick && gameState.isSick) {
      gameState.isSick = false;
    }

    this.fridgeActionItem = item;
    SoundFX.milestone();
    addCurrentYearLog(item.msg);
    showToast(item.msg);
    if (typeof advanceQuestProgress === 'function') {
      advanceQuestProgress('eat');
      if (this.currentRoomId && this.currentRoomId !== 'my-room') {
        advanceQuestProgress('place', this.currentRoomId);
      }
    }
    saveGame();
    renderLeftProfile();
    renderCenterTimeline();
    renderRightPanel();
    this.renderWorldDOM();
  },

  performLiveAction(actionType, targetX = 28, placeId = null) {
    if (!gameState) return;
    this.stationView = null;

    if (actionType === 'sleep') {
      this.playerX = targetX;
      this.playerY = 50;
      this.targetX = targetX;
      this.targetY = 50;
      const isNight = gameState.timeOfDay === 'night';
      this.liveAction = {
        type: 'sleep',
        label: isNight ? '🌙😴 Sleeping deeply in Bed (+90% ⚡)...' : '🛋️💤 Taking a cozy Daytime Nap (+25% ⚡)...',
        emoji: '💤 Zzz...'
      };
      this.renderWorldDOM();
      setTimeout(() => {
        if (isNight) {
          sleepForEnergy();
        } else {
          napDaytime();
        }
        setTimeout(() => {
          this.liveAction = null;
          this.playerY = 56;
          this.targetY = 56;
          this.renderWorldDOM();
        }, 1200);
      }, 900);
      return;
    }

    if (actionType === 'slide') {
      if (!spendEnergy(12)) return;
      SoundFX.milestone();
      this.playerX = 22;
      this.playerY = 28;
      this.targetX = 22;
      this.targetY = 28;
      this.liveAction = {
        type: 'slide',
        label: '🛝 Climbing up the ladder & sliding down! Wheee!',
        emoji: '🛝 Wheee!!'
      };
      this.renderWorldDOM();
      setTimeout(() => {
        this.targetX = 44;
        this.targetY = 56;
        gameState.stats.happiness = clampStat(gameState.stats.happiness + 9);
        gameState.stats.health = clampStat(gameState.stats.health + 8);
        gameState.skills.athletics = Math.min(100, (gameState.skills.athletics || 0) + 9);
        addCurrentYearLog('🛝 Climbed the Playground tower and zoomed down the Giant Yellow Slide! (+9 Happiness, +8 Health, +9 Athletics)');
        showToast('🛝 Wheee!! Zoomed down the Giant Slide! (+9 Happiness, +9 Athletics)');
        if (typeof advanceQuestProgress === 'function') {
          advanceQuestProgress('place', placeId || 'playground');
        }
        saveGame();
        renderLeftProfile();
        renderCenterTimeline();
        renderRightPanel();
        setTimeout(() => {
          this.liveAction = null;
          this.renderWorldDOM();
        }, 1300);
      }, 450);
      return;
    }

    if (actionType === 'swing') {
      if (!spendEnergy(10)) return;
      SoundFX.friend();
      this.playerX = targetX;
      this.playerY = 47;
      this.targetX = targetX;
      this.targetY = 47;
      this.liveAction = {
        type: 'swing',
        label: '⛓️ Swinging high into the sky!',
        emoji: '⛓️✨ Higher!'
      };
      gameState.stats.happiness = clampStat(gameState.stats.happiness + 10);
      gameState.stats.health = clampStat(gameState.stats.health + 6);
      addCurrentYearLog('⛓️ Pumped your legs and swung super high on the Double Swing Set! (+10 Happiness, +6 Health)');
      showToast('⛓️ Swinging high on the Swing Set! (+10 Happiness)');
      if (typeof advanceQuestProgress === 'function') {
        advanceQuestProgress('place', placeId || 'playground');
      }
      saveGame();
      renderLeftProfile();
      renderCenterTimeline();
      renderRightPanel();
      this.renderWorldDOM();
      setTimeout(() => {
        this.liveAction = null;
        this.playerY = 56;
        this.targetY = 56;
        this.renderWorldDOM();
      }, 1800);
      return;
    }

    if (actionType === 'drive') {
      if (!spendEnergy(10)) return;
      SoundFX.milestone();
      this.playerX = 32;
      this.playerY = 52;
      this.targetX = 72;
      this.targetY = 52;
      this.liveAction = {
        type: 'drive',
        label: placeId === 'school-bus' ? '🚌 Riding the Yellow School Bus down Main Street! 🎶' : '🚗 Cruising in the Family SUV! Beep beep! 🎶',
        emoji: '🎶 Beep Beep!'
      };
      gameState.stats.happiness = clampStat(gameState.stats.happiness + 10);
      gameState.stats.kindness = clampStat(gameState.stats.kindness + 6);
      addCurrentYearLog(`${placeId === 'school-bus' ? '🚌 Rode the Yellow School Bus' : '🚗 Went for a joyride in the Family SUV'} singing road-trip songs! (+10 Happiness, +6 Kindness)`);
      showToast(`${placeId === 'school-bus' ? '🚌 Riding the School Bus!' : '🚗 Cruising in the Family SUV!'} (+10 Happiness)`);
      if (typeof advanceQuestProgress === 'function') {
        advanceQuestProgress('place', placeId || 'family-car');
      }
      saveGame();
      renderLeftProfile();
      renderCenterTimeline();
      renderRightPanel();
      this.renderWorldDOM();
      setTimeout(() => {
        this.liveAction = null;
        this.playerY = 56;
        this.targetY = 56;
        this.renderWorldDOM();
      }, 1800);
      return;
    }

    if (actionType === 'wash-car') {
      if (!spendEnergy(12)) return;
      SoundFX.milestone();
      this.playerX = 60;
      this.playerY = 55;
      this.targetX = 60;
      this.targetY = 55;
      this.liveAction = {
        type: 'wash-car',
        label: '🧽💦 Scrubbing & rinsing the Family SUV until it sparkles!',
        emoji: '🫧🧽 Sparkle! +$12'
      };
      gameState.money += 12;
      gameState.stats.kindness = clampStat(gameState.stats.kindness + 8);
      gameState.stats.health = clampStat(gameState.stats.health + 5);
      addCurrentYearLog('🧽 Washed and scrubbed the Family SUV in the driveway! Dad paid you $12 allowance (+8 Kindness, +5 Health)!');
      showToast('🧽🫧 Scrubbed the Family Car! Earned +$12 & +8 Kindness!');
      if (typeof advanceQuestProgress === 'function') {
        advanceQuestProgress('place', 'family-car');
      }
      saveGame();
      renderLeftProfile();
      renderCenterTimeline();
      renderRightPanel();
      this.renderWorldDOM();
      setTimeout(() => {
        this.liveAction = null;
        this.renderWorldDOM();
      }, 1800);
      return;
    }

    if (actionType === 'treadmill') {
      if (!spendEnergy(12)) return;
      SoundFX.milestone();
      this.playerX = targetX;
      this.playerY = 48;
      this.targetX = targetX;
      this.targetY = 48;
      this.liveAction = {
        type: 'swing',
        label: '🏃⚡ Sprinting on the Digital Treadmill at Powerhouse Gym!',
        emoji: '🏃💨 Cardio! +12 🏃'
      };
      gameState.stats.health = clampStat(gameState.stats.health + 12);
      gameState.stats.happiness = clampStat(gameState.stats.happiness + 9);
      gameState.skills.athletics = Math.min(100, (gameState.skills.athletics || 0) + 12);
      addCurrentYearLog('🏃 Ran a high-speed cardio sprint on the Digital Treadmill at Powerhouse Gym! (+12 Health, +12 Athletics, +9 Happiness)');
      showToast('🏃💨 Treadmill Cardio Sprint! +12 Health & +12 Athletics!');
      if (typeof advanceQuestProgress === 'function') {
        advanceQuestProgress('place', 'gym');
        advanceQuestProgress('activity', 'sports');
      }
      saveGame();
      renderLeftProfile();
      renderCenterTimeline();
      renderRightPanel();
      this.renderWorldDOM();
      setTimeout(() => {
        this.liveAction = null;
        this.playerY = 56;
        this.targetY = 56;
        this.renderWorldDOM();
      }, 1700);
      return;
    }

    if (actionType === 'lift-weights') {
      if (!spendEnergy(14)) return;
      SoundFX.milestone();
      this.playerX = targetX;
      this.playerY = 49;
      this.targetX = targetX;
      this.targetY = 49;
      this.liveAction = {
        type: 'swing',
        label: '🏋️💪 Pumping iron on the Barbell Bench Press & Dumbbells!',
        emoji: '🏋️💪 Strong! +14 🏃'
      };
      gameState.stats.health = clampStat(gameState.stats.health + 11);
      gameState.stats.happiness = clampStat(gameState.stats.happiness + 10);
      gameState.skills.athletics = Math.min(100, (gameState.skills.athletics || 0) + 14);
      addCurrentYearLog('🏋️ Lifted weights on the Barbell Bench Press at Powerhouse Gym! (+14 Athletics, +11 Health, +10 Happiness)');
      showToast('🏋️💪 Bench Press & Dumbbells! +14 Athletics & +11 Health!');
      if (typeof advanceQuestProgress === 'function') {
        advanceQuestProgress('place', 'gym');
        advanceQuestProgress('activity', 'sports');
      }
      saveGame();
      renderLeftProfile();
      renderCenterTimeline();
      renderRightPanel();
      this.renderWorldDOM();
      setTimeout(() => {
        this.liveAction = null;
        this.playerY = 56;
        this.targetY = 56;
        this.renderWorldDOM();
      }, 1700);
      return;
    }

    if (actionType === 'boxing') {
      if (!spendEnergy(12)) return;
      SoundFX.milestone();
      this.playerX = targetX;
      this.playerY = 50;
      this.targetX = targetX;
      this.targetY = 50;
      this.liveAction = {
        type: 'swing',
        label: '🥊🔥 Practicing boxing combos & stretching on the Yoga Mat!',
        emoji: '🥊💥 Pow! +12 💚'
      };
      gameState.stats.health = clampStat(gameState.stats.health + 12);
      gameState.stats.happiness = clampStat(gameState.stats.happiness + 10);
      gameState.skills.athletics = Math.min(100, (gameState.skills.athletics || 0) + 12);
      addCurrentYearLog('🥊 Trained on the Heavy Boxing Bag and stretched on the Yoga Mat at Powerhouse Gym! (+12 Health, +12 Athletics, +10 Happiness)');
      showToast('🥊💥 Boxing & Yoga Workout! +12 Health & +12 Athletics!');
      if (typeof advanceQuestProgress === 'function') {
        advanceQuestProgress('place', 'gym');
        advanceQuestProgress('activity', 'sports');
      }
      saveGame();
      renderLeftProfile();
      renderCenterTimeline();
      renderRightPanel();
      this.renderWorldDOM();
      setTimeout(() => {
        this.liveAction = null;
        this.playerY = 56;
        this.targetY = 56;
        this.renderWorldDOM();
      }, 1700);
      return;
    }
  },

  initDeskCanvas() {
    const canvas = document.getElementById('desk-sketch-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFDF9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw starter cute doodle prompt
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('✏️ Drag mouse here to draw!', 14, 22);

    let drawing = false;
    const getPos = e => {
      const r = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - r.left) * (canvas.width / r.width),
        y: (clientY - r.top) * (canvas.height / r.height)
      };
    };
    const start = e => {
      e.stopPropagation();
      drawing = true;
      const p = getPos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    };
    const move = e => {
      if (!drawing) return;
      e.stopPropagation();
      const p = getPos(e);
      ctx.strokeStyle = this.deskPenColor || '#EF4444';
      ctx.lineWidth = 4.5;
      ctx.lineCap = 'round';
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    };
    const end = () => { drawing = false; };

    canvas.onmousedown = start;
    canvas.onmousemove = move;
    canvas.onmouseup = end;
    canvas.onmouseleave = end;
    canvas.ontouchstart = start;
    canvas.ontouchmove = move;
    canvas.ontouchend = end;
  },

  finishDeskDrawing() {
    if (!gameState) return;
    if (!spendEnergy(10)) return;
    SoundFX.milestone();
    gameState.stats.happiness = clampStat(gameState.stats.happiness + 10);
    gameState.skills.art = Math.min(100, (gameState.skills.art || 0) + 10);
    if (gameState.isGrounded) {
      gameState.isGrounded = false;
      gameState.groundedDays = 0;
      gameState.groundedReason = '';
      addCurrentYearLog('🎨 Drew an awesome artwork & studied at your Desk! Mom & Dad were proud of your focus and ungrounded you! (+10 Art, +10 Happiness)');
      showToast('🎨 Masterpiece finished! Mom & Dad ungrounded you! 🎉');
    } else {
      addCurrentYearLog('🎨 Drew an awesome artwork on your Sketchpad at the Desk! (+10 Art Skill, +10 Happiness)');
      showToast('🎨 Masterpiece finished! +10 Art Skill & +10 Happiness!');
    }
    if (typeof advanceQuestProgress === 'function') {
      advanceQuestProgress('study');
      advanceQuestProgress('activity', 'art');
      if (this.currentRoomId && this.currentRoomId !== 'my-room') {
        advanceQuestProgress('place', this.currentRoomId);
      }
    }
    saveGame();
    renderAll();
  },

  finishDeskCodingQuiz() {
    if (!gameState) return;
    if (!spendEnergy(12)) return;
    SoundFX.milestone();
    gameState.stats.smarts = clampStat(gameState.stats.smarts + 12);
    gameState.skills.science = Math.min(100, (gameState.skills.science || 0) + 10);
    if (gameState.isGrounded) {
      gameState.isGrounded = false;
      gameState.groundedDays = 0;
      gameState.groundedReason = '';
      addCurrentYearLog('💻 Completed your study & coding challenge at the Desk! Mom & Dad were proud and ungrounded you! (+12 Smarts, +10 Science)');
      showToast('💻 Study complete! Mom & Dad ungrounded you! 🎉');
    } else {
      addCurrentYearLog('💻 Coded a project and aced your study challenge at the Desk! (+12 Smarts, +10 Science Skill)');
      showToast('💻 Study & Coding complete! +12 Smarts & +10 Science!');
    }
    if (typeof advanceQuestProgress === 'function') {
      advanceQuestProgress('study');
      if (this.currentRoomId && this.currentRoomId !== 'my-room') {
        advanceQuestProgress('place', this.currentRoomId);
      }
    }
    saveGame();
    renderAll();
  },

  togglePizzaTopping(topId) {
    SoundFX.pop();
    this.pizzaBaked = false;
    if (this.pizzaToppings.includes(topId)) {
      this.pizzaToppings = this.pizzaToppings.filter(t => t !== topId);
    } else {
      this.pizzaToppings.push(topId);
    }
    this.renderWorldDOM();
  },

  bakeAndEatPizza() {
    if (!gameState) return;
    SoundFX.milestone();
    if (!this.pizzaBaked) {
      this.pizzaBaked = true;
      showToast('🔥 Your custom pizza is bubbling golden-brown in the Brick Oven! Click "🍕 Eat Fresh Pizza!"');
      this.renderWorldDOM();
      return;
    }
    gameState.energy = Math.min(100, Math.round(gameState.energy + 18));
    gameState.stats.happiness = clampStat(gameState.stats.happiness + 12);
    gameState.skills.cooking = Math.min(100, (gameState.skills.cooking || 0) + 10);
    addCurrentYearLog(`🍕 Made, baked & ate a fresh Brick-Oven Pizza with ${this.pizzaToppings.join(', ')}! (+18% ⚡ Energy, +12 Happiness, +10 Cooking)`);
    showToast('🍕 Yum! Ate your homemade Brick-Oven Pizza! (+18% ⚡ Energy, +10 Cooking)');
    if (typeof advanceQuestProgress === 'function') {
      advanceQuestProgress('eat');
      advanceQuestProgress('place', this.currentRoomId === 'my-room' ? 'pizza-place' : this.currentRoomId);
    }
    this.pizzaBaked = false;
    saveGame();
    renderAll();
  },

  addIceCreamScoop(colorHex) {
    SoundFX.pop();
    if (this.iceCreamScoops.length >= 4) {
      this.iceCreamScoops.shift();
    }
    this.iceCreamScoops.push(colorHex);
    this.renderWorldDOM();
  },

  eatBuiltIceCream() {
    if (!gameState) return;
    SoundFX.milestone();
    gameState.energy = Math.min(100, Math.round(gameState.energy + 15));
    gameState.stats.happiness = clampStat(gameState.stats.happiness + 12);
    addCurrentYearLog(`🍦 Scooped and ate a ${this.iceCreamScoops.length}-Scoop Ice Cream Cone! (+15% ⚡ Energy, +12 Happiness)`);
    showToast(`🍦 Delicious ${this.iceCreamScoops.length}-Scoop Cone! (+15% ⚡ Energy, +12 Happiness)`);
    if (typeof advanceQuestProgress === 'function') {
      advanceQuestProgress('eat');
      advanceQuestProgress('place', 'ice-cream-shop');
    }
    saveGame();
    renderAll();
  },

  renderStationViewDOM(sq) {
    // 1. EXACT FRIDGE INTERIOR VIEW (Matches user's uploaded Paint drawing: Light-blue #A6DEF7 + two #009BE5 blue shelves + Boba Milk Tea cup on bottom-left shelf!)
    if (this.stationView === 'fridge') {
      sq.style.background = '#A6DEF7';
      const activeItem = this.fridgeActionItem;

      const topShelfItems = [
        { id: 'apple-bowl', label: '🍎 Apple Bowl (+10% ⚡)', x: 18 },
        { id: 'pancakes', label: '🥞 Berry Pancakes (+16% ⚡)', x: 41 },
        { id: 'smoothie', label: '🧃 Brain Smoothie (+15% ⚡)', x: 64 },
        { id: 'cupcake', label: '🧁 Rainbow Cupcake (+15% ⚡)', x: 85 }
      ];

      const bottomShelfItems = [
        { id: 'boba', label: '🧋 Boba Milk Tea (+16% ⚡)', x: 18 },
        { id: 'sandwich', label: '🥪 Grilled Cheese (+14% ⚡)', x: 42 },
        { id: 'soup', label: '🍲 Mom’s Soup (+12% ⚡ & Cure)', x: 65 },
        { id: 'pizza', label: '🍕 Hot Pizza Slice (+18% ⚡)', x: 86 }
      ];

      sq.innerHTML = `
        <!-- Top-Left Fridge Header Pill -->
        <div class="side-room-badge" style="background:#FFFFFF;border-color:#0284C7;color:#0369A1;" onclick="event.stopPropagation()">
          🧊 Inside the Fridge — Click Any Drink or Food on the Shelves to Eat/Drink It! (⚡ ${Math.round(gameState.energy)}%)
        </div>

        <!-- Top-Right Back Button -->
        <button type="button" class="room-floor-pill primary-room-pill"
          style="position:absolute;top:10px;right:12px;z-index:30;"
          onclick="event.stopPropagation(); World2D.closeStationView()">
          ⬅️ Close Fridge
        </button>

        <!-- TOP BRIGHT-BLUE HORIZONTAL SHELF BAR (Matches User's Drawing!) -->
        <div style="position:absolute;left:0;right:0;top:21%;height:13.5%;background:#009BE5;z-index:2;pointer-events:none;"></div>

        <!-- BOTTOM BRIGHT-BLUE HORIZONTAL SHELF BAR (Matches User's Drawing!) -->
        <div style="position:absolute;left:0;right:0;top:66.5%;height:13.5%;background:#009BE5;z-index:2;pointer-events:none;"></div>

        <!-- TOP SHELF VISUAL ITEMS -->
        ${topShelfItems.map(it => `
          <div class="room-furniture-item fridge-shelf-item ${activeItem && activeItem.svgType === it.id ? 'just-consumed' : ''}"
            style="left:${it.x}%; top:24%; z-index:10;"
            onclick="event.stopPropagation(); World2D.consumeFridgeShelfItem('${it.id}')"
            title="Click to eat/drink ${it.label}">
            ${renderFridgeFoodSVG(it.id)}
            <span class="furniture-hover-pill" style="opacity:1;bottom:-14px;font-size:0.62rem;">${it.label}</span>
          </div>
        `).join('')}

        <!-- BOTTOM SHELF VISUAL ITEMS (With Exact Boba Milk Tea Cup at Left = 18%, matching User's Drawing!) -->
        ${bottomShelfItems.map(it => `
          <div class="room-furniture-item fridge-shelf-item ${activeItem && activeItem.svgType === it.id ? 'just-consumed' : ''}"
            style="left:${it.x}%; top:${it.id === 'boba' ? '69%' : '71%'}; z-index:10;"
            onclick="event.stopPropagation(); World2D.consumeFridgeShelfItem('${it.id}')"
            title="Click to eat/drink ${it.label}">
            ${renderFridgeFoodSVG(it.id)}
            <span class="furniture-hover-pill" style="opacity:1;bottom:-14px;font-size:0.62rem;">${it.label}</span>
          </div>
        `).join('')}

        <!-- Live Avatar Eating / Drinking Reaction Banner when you click an item! -->
        ${activeItem ? `
          <div class="fridge-avatar-eating-popup" onclick="event.stopPropagation()">
            <div style="display:flex;align-items:center;gap:8px;">
              ${renderAvatarSVG(gameState.avatar, gameState.age, 48)}
              <span style="font-size:1.7rem;animation:bounceYou 0.5s infinite alternate;">${activeItem.icon}</span>
              <div>
                <strong style="font-size:0.8rem;color:#0369A1;display:block;">Yum! ${gameState.name} is enjoying ${activeItem.name}!</strong>
                <span style="font-size:0.72rem;color:#15803D;font-weight:800;">+${activeItem.energy}% ⚡ Energy! (Now ${Math.round(gameState.energy)}%)</span>
              </div>
            </div>
          </div>
        ` : ''}
      `;
      this.renderZoneActionBar();
      return;
    }

    // 2. INTERACTIVE STUDY DESK, SKETCHPAD & LAPTOP VIEW
    if (this.stationView === 'desk') {
      sq.style.background = 'linear-gradient(180deg, #1E293B 0%, #334155 68%, #B45309 68%, #92400E 100%)';
      const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#1E293B'];

      sq.innerHTML = `
        <div class="side-room-badge" onclick="event.stopPropagation()">
          💻🎨 At Your Desk — Draw on the Sketchpad or Code on Your Laptop!
        </div>
        <button type="button" class="room-floor-pill primary-room-pill"
          style="position:absolute;top:10px;right:12px;z-index:30;"
          onclick="event.stopPropagation(); World2D.closeStationView()">
          ⬅️ Leave Desk
        </button>

        <div style="position:absolute;inset:46px 16px 48px 16px;display:grid;grid-template-columns:1.15fr 1fr;gap:14px;z-index:10;" onclick="event.stopPropagation()">
          <!-- Left: Live Interactive Drawing Sketchpad -->
          <div style="background:#FFF;border:3px solid #F59E0B;border-radius:14px;padding:8px;display:flex;flex-direction:column;align-items:center;box-shadow:0 6px 16px rgba(0,0,0,0.2);">
            <div style="display:flex;align-items:center;justify-content:space-between;width:100%;margin-bottom:4px;">
              <strong style="font-size:0.76rem;color:#B45309;">🎨 Live Sketchpad (Draw Here!)</strong>
              <div style="display:flex;gap:4px;">
                ${colors.map(c => `
                  <button type="button" style="width:16px;height:16px;border-radius:50%;background:${c};border:${this.deskPenColor === c ? '2.5px solid #000' : '1px solid #ccc'};cursor:pointer;"
                    onclick="World2D.deskPenColor='${c}';"></button>
                `).join('')}
              </div>
            </div>
            <canvas id="desk-sketch-canvas" width="260" height="145" style="width:100%;height:135px;border:1.5px dashed #CBD5E1;border-radius:8px;cursor:crosshair;background:#FFFDF9;"></canvas>
            <div style="display:flex;gap:6px;margin-top:6px;">
              <button type="button" class="energy-btn eat-btn" onclick="World2D.finishDeskDrawing()">✨ Finish Drawing (+10 Art 🎨)</button>
              <button type="button" class="energy-btn wait-night-btn" onclick="World2D.initDeskCanvas()">🗑️ Clear</button>
            </div>
          </div>

          <!-- Right: Interactive Laptop Screen & Study Challenge -->
          <div style="background:#0F172A;border:4px solid #64748B;border-radius:14px;padding:10px;color:#E2E8F0;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 6px 16px rgba(0,0,0,0.25);">
            <div>
              <div style="font-size:0.74rem;color:#38BDF8;font-weight:800;margin-bottom:4px;">💻 SUNNY-OS LAPTOP & STUDY LAB</div>
              <div style="background:#1E293B;padding:8px;border-radius:8px;font-family:monospace;font-size:0.72rem;color:#A7F3D0;line-height:1.35;">
                &gt; project: "SunnyDays_Game.js"<br/>
                &gt; smarts_level: ${gameState.stats.smarts}%<br/>
                &gt; science_skill: ${gameState.skills.science || 10}
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;margin-top:6px;">
              <button type="button" class="energy-btn sleep-btn" onclick="World2D.finishDeskCodingQuiz()">
                🚀 Write Code & Study (+12 Smarts 🧠, +10 Science)
              </button>
              <button type="button" class="energy-btn nap-btn" onclick="triggerPlaceAction('${this.currentRoomId === 'school' ? 'school' : 'room-desk'}')">
                📋 More Desk / Classroom Choices
              </button>
            </div>
          </div>
        </div>
      `;
      this.renderZoneActionBar();
      return;
    }

    // 3. INTERACTIVE PIZZA & COOKING COUNTER VIEW
    if (this.stationView === 'pizza') {
      sq.style.background = 'linear-gradient(180deg, #7F1D1D 0%, #991B1B 65%, #FDE68A 65%, #F59E0B 100%)';
      const hasSauce = this.pizzaToppings.includes('sauce');
      const hasCheese = this.pizzaToppings.includes('cheese');
      const hasPep = this.pizzaToppings.includes('pepperoni');
      const hasMush = this.pizzaToppings.includes('mushrooms');
      const hasBasil = this.pizzaToppings.includes('basil');

      sq.innerHTML = `
        <div class="side-room-badge" onclick="event.stopPropagation()">
          🍕🔥 Interactive Brick-Oven Pizza Kitchen — Click Toppings & Bake!
        </div>
        <button type="button" class="room-floor-pill primary-room-pill"
          style="position:absolute;top:10px;right:12px;z-index:30;"
          onclick="event.stopPropagation(); World2D.closeStationView()">
          ⬅️ Done Cooking
        </button>

        <!-- Interactive Pizza Dough on Wooden Peel -->
        <div style="position:absolute;left:50%;top:45%;transform:translate(-50%,-50%);text-align:center;z-index:10;" onclick="event.stopPropagation()">
          <svg width="175" height="175" viewBox="0 0 180 180">
            <!-- Outer Crust -->
            <circle cx="90" cy="90" r="76" fill="${this.pizzaBaked ? '#D97706' : '#FDE68A'}" stroke="#B45309" stroke-width="5"/>
            <!-- Tomato Sauce -->
            ${hasSauce ? `<circle cx="90" cy="90" r="64" fill="#DC2626"/>` : ''}
            <!-- Melted Mozzarella Cheese -->
            ${hasCheese ? `<circle cx="90" cy="90" r="58" fill="${this.pizzaBaked ? '#FACC15' : '#FEF9C3'}"/>` : ''}
            <!-- Pepperoni Slices -->
            ${hasPep ? `
              <circle cx="68" cy="65" r="10" fill="#B91C1C"/><circle cx="112" cy="68" r="10" fill="#B91C1C"/>
              <circle cx="90" cy="92" r="10" fill="#B91C1C"/><circle cx="66" cy="112" r="10" fill="#B91C1C"/>
              <circle cx="114" cy="110" r="10" fill="#B91C1C"/>
            ` : ''}
            <!-- Mushrooms -->
            ${hasMush ? `
              <text x="86" y="64" font-size="16">🍄</text>
              <text x="54" y="94" font-size="16">🍄</text>
              <text x="116" y="94" font-size="16">🍄</text>
            ` : ''}
            <!-- Fresh Basil -->
            ${hasBasil ? `
              <text x="74" y="125" font-size="16">🌿</text>
              <text x="102" y="85" font-size="16">🌿</text>
            ` : ''}
          </svg>
        </div>

        <div class="room-floor-actions-bar" onclick="event.stopPropagation()">
          <button type="button" class="room-floor-pill" onclick="World2D.togglePizzaTopping('sauce')">🍅 Sauce ${hasSauce ? '✓' : ''}</button>
          <button type="button" class="room-floor-pill" onclick="World2D.togglePizzaTopping('cheese')">🧀 Cheese ${hasCheese ? '✓' : ''}</button>
          <button type="button" class="room-floor-pill" onclick="World2D.togglePizzaTopping('pepperoni')">🍕 Pepperoni ${hasPep ? '✓' : ''}</button>
          <button type="button" class="room-floor-pill" onclick="World2D.togglePizzaTopping('mushrooms')">🍄 Veggies ${hasMush ? '✓' : ''}</button>
          <button type="button" class="room-floor-pill" onclick="World2D.togglePizzaTopping('basil')">🌿 Basil ${hasBasil ? '✓' : ''}</button>
          <button type="button" class="room-floor-pill primary-room-pill" onclick="World2D.bakeAndEatPizza()">
            ${this.pizzaBaked ? '🍽️ Eat Fresh Pizza (+18% ⚡)!' : '🔥 Bake in Brick Oven!'}
          </button>
        </div>
      `;
      this.renderZoneActionBar();
      return;
    }

    // 4. INTERACTIVE ICE CREAM SCOOP COUNTER VIEW
    if (this.stationView === 'icecream') {
      sq.style.background = 'linear-gradient(180deg, #FCE7F3 0%, #FBCFE8 66%, #F472B6 66%, #EC4899 100%)';
      sq.innerHTML = `
        <div class="side-room-badge" onclick="event.stopPropagation()">
          🍦🍨 Scoops & Sprinkles Parlor — Click Flavors to Stack Your Waffle Cone!
        </div>
        <button type="button" class="room-floor-pill primary-room-pill"
          style="position:absolute;top:10px;right:12px;z-index:30;"
          onclick="event.stopPropagation(); World2D.closeStationView()">
          ⬅️ Done Scooping
        </button>

        <div style="position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);z-index:10;" onclick="event.stopPropagation()">
          <svg width="150" height="190" viewBox="0 0 150 190">
            <!-- Waffle Cone -->
            <polygon points="48,105 102,105 75,182" fill="#D97706" stroke="#92400E" stroke-width="3"/>
            <!-- Stacked Ice Cream Scoops -->
            ${this.iceCreamScoops.map((col, idx) => {
              const cy = 92 - idx * 24;
              return `<circle cx="75" cy="${cy}" r="24" fill="${col}" stroke="rgba(0,0,0,0.12)" stroke-width="2"/>`;
            }).join('')}
            <!-- Cherry on Top -->
            <circle cx="75" cy="${92 - (this.iceCreamScoops.length - 1) * 24 - 24}" r="7" fill="#E11D48"/>
          </svg>
        </div>

        <div class="room-floor-actions-bar" onclick="event.stopPropagation()">
          <button type="button" class="room-floor-pill" onclick="World2D.addIceCreamScoop('#F472B6')">🍓 Strawberry</button>
          <button type="button" class="room-floor-pill" onclick="World2D.addIceCreamScoop('#34D399')">🌿 Mint Chip</button>
          <button type="button" class="room-floor-pill" onclick="World2D.addIceCreamScoop('#FDE047')">🍦 Vanilla Bean</button>
          <button type="button" class="room-floor-pill" onclick="World2D.addIceCreamScoop('#60A5FA')">🫐 Blue Raspberry</button>
          <button type="button" class="room-floor-pill primary-room-pill" onclick="World2D.eatBuiltIceCream()">
            🍦 Eat My Cone (+15% ⚡)!
          </button>
          <button type="button" class="room-floor-pill" style="background:#EF4444;color:#FFF;" onclick="World2D.closeStationView()">
            ⬅️ Out
          </button>
        </div>
      `;
      this.renderZoneActionBar();
      return;
    }

    // 5. INTERACTIVE WARDROBE & MIRROR VIEW (With Top-Right & Bottom-Right "⬅️ Out" Buttons!)
    if (this.stationView === 'wardrobe') {
      sq.style.background = 'linear-gradient(180deg, #F3E8FF 0%, #E9D5FF 67%, #9A5B2D 67%, #78350F 100%)';
      sq.innerHTML = `
        <div class="side-room-badge" onclick="event.stopPropagation()">
          👕🎧 Inside Your Wardrobe & Mirror — Click to Change Outfit, Hair, Color & Accessories!
        </div>
        <button type="button" class="room-floor-pill"
          style="position:absolute;top:10px;right:12px;z-index:30;background:#EF4444;color:#FFF;border-color:#991B1B;"
          onclick="event.stopPropagation(); World2D.closeStationView()">
          ⬅️ Out (Back to Room) ✖
        </button>

        <div style="position:absolute;inset:44px 14px 48px 14px;display:grid;grid-template-columns:145px 1fr;gap:12px;z-index:10;" onclick="event.stopPropagation()">
          <!-- Left: Live Full-Length Mirror with Your Avatar -->
          <div style="background:linear-gradient(180deg,#E0F2FE,#BAE6FD);border:4px solid #B45309;border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px;box-shadow:0 6px 16px rgba(0,0,0,0.18);">
            ${renderAvatarSVG(gameState.avatar, gameState.age, 92)}
            <strong style="font-size:0.74rem;color:#1E293B;margin-top:4px;">${gameState.name}</strong>
          </div>

          <!-- Right: Quick Wardrobe Racks (Outfit, Color, Hair, Accessory) -->
          <div style="background:rgba(255,255,255,0.94);border:2.5px solid #9333EA;border-radius:14px;padding:8px 10px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;">
            <div>
              <strong style="font-size:0.7rem;color:#6B21A8;display:block;margin-bottom:3px;">👕 OUTFIT STYLE:</strong>
              <div style="display:flex;gap:4px;flex-wrap:wrap;">
                ${AVATAR_PALETTE.outfitStyles.map(os => `
                  <button type="button" class="pill-choice ${gameState.avatar.outfit === os.id ? 'active' : ''}" style="padding:3px 8px;font-size:0.7rem;"
                    onclick="gameState.avatar.outfit='${os.id}'; SoundFX.pop(); saveGame(); renderAll();">${os.name}</button>
                `).join('')}
              </div>
            </div>
            <div>
              <strong style="font-size:0.7rem;color:#6B21A8;display:block;margin-bottom:3px;">🎨 OUTFIT COLOR:</strong>
              <div style="display:flex;gap:6px;flex-wrap:wrap;">
                ${AVATAR_PALETTE.shirtColors.map(sh => `
                  <button type="button" class="swatch-btn ${gameState.avatar.shirt === sh.id ? 'active' : ''}" style="width:22px;height:22px;background:${sh.fill};"
                    onclick="gameState.avatar.shirt='${sh.id}'; SoundFX.pop(); saveGame(); renderAll();"></button>
                `).join('')}
              </div>
            </div>
            <div>
              <strong style="font-size:0.7rem;color:#6B21A8;display:block;margin-bottom:3px;">💇 HAIR STYLE:</strong>
              <div style="display:flex;gap:4px;flex-wrap:wrap;">
                ${AVATAR_PALETTE.hairStyles.map(hs => `
                  <button type="button" class="pill-choice ${gameState.avatar.hairStyle === hs.id ? 'active' : ''}" style="padding:3px 8px;font-size:0.7rem;"
                    onclick="gameState.avatar.hairStyle='${hs.id}'; SoundFX.pop(); saveGame(); renderAll();">${hs.name}</button>
                `).join('')}
              </div>
            </div>
            <div>
              <strong style="font-size:0.7rem;color:#6B21A8;display:block;margin-bottom:3px;">🕶️ ACCESSORY:</strong>
              <div style="display:flex;gap:4px;flex-wrap:wrap;">
                ${AVATAR_PALETTE.accessories.map(acc => `
                  <button type="button" class="pill-choice ${gameState.avatar.accessory === acc.id ? 'active' : ''}" style="padding:3px 8px;font-size:0.7rem;"
                    onclick="gameState.avatar.accessory='${acc.id}'; SoundFX.pop(); saveGame(); renderAll();">${acc.name}</button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="room-floor-actions-bar" onclick="event.stopPropagation()">
          <button type="button" class="room-floor-pill" onclick="gameState.avatar.accessory='headphones'; gameState.stats.happiness=clampStat(gameState.stats.happiness+8); showToast('🎵🎧 Jamming out with Headphones! (+8 Happiness)'); saveGame(); renderAll();">
            🎵🎧 Jam to Music (+8 😊)
          </button>
          <button type="button" class="room-floor-pill" onclick="openRestyleModal()">
            🪞 Full Styling Popup
          </button>
          <button type="button" class="room-floor-pill primary-room-pill" style="background:#EF4444;color:#FFF;" onclick="World2D.closeStationView()">
            ⬅️ Out (Back to Room)
          </button>
        </div>
      `;
      this.renderZoneActionBar();
      return;
    }

    // 6. INTERACTIVE ROOM DECOR & FURNITURE VIEW (With Top-Right & Bottom-Right "⬅️ Out" Buttons!)
    if (this.stationView === 'decor') {
      sq.style.background = 'linear-gradient(180deg, #ECFDF5 0%, #D1FAE5 67%, #D99B66 67%, #B45309 100%)';
      const furnitureItems = (typeof STORE_CATALOG !== 'undefined') ? STORE_CATALOG.filter(i => i.section === 'furniture') : [];
      const ownedSet = new Set([
        ...(gameState.inventory || []).map(i => i.name),
        ...(gameState.birthdayItems || []).map(b => b.name),
        ...(gameState.placedFurniture || [])
      ]);

      sq.innerHTML = `
        <div class="side-room-badge" onclick="event.stopPropagation()">
          🪑🪴 Room Decor & Furniture Studio (🪙 Savings: $${gameState.money})
        </div>
        <button type="button" class="room-floor-pill"
          style="position:absolute;top:10px;right:12px;z-index:30;background:#EF4444;color:#FFF;border-color:#991B1B;"
          onclick="event.stopPropagation(); World2D.closeStationView()">
          ⬅️ Out (Back to Room) ✖
        </button>

        <div style="position:absolute;inset:44px 14px 48px 14px;background:rgba(255,255,255,0.95);border:2.5px solid #10B981;border-radius:14px;padding:8px 12px;overflow-y:auto;z-index:10;display:grid;grid-template-columns:1fr 1fr;gap:8px;" onclick="event.stopPropagation()">
          ${furnitureItems.map(item => {
            const isOwned = ownedSet.has(item.name);
            const canAfford = gameState.money >= item.cost;
            return `
              <div style="border:1.5px solid ${isOwned ? '#10B981' : '#E2E8F0'};background:${isOwned ? '#F0FDF4' : '#FFF'};border-radius:10px;padding:6px 8px;display:flex;align-items:center;justify-content:space-between;gap:6px;">
                <div style="display:flex;align-items:center;gap:6px;">
                  <span style="font-size:1.35rem;">${item.icon}</span>
                  <div>
                    <strong style="font-size:0.73rem;display:block;">${item.name} ($${item.cost})</strong>
                    <span style="font-size:0.65rem;color:#059669;font-weight:700;">${isOwned ? '✓ Placed in Room' : item.desc}</span>
                  </div>
                </div>
                <button type="button" class="energy-btn ${canAfford ? 'eat-btn' : 'wait-night-btn'}" style="padding:4px 8px;font-size:0.68rem;"
                  onclick="${canAfford ? `buyStoreItem('${item.id}'); World2D.renderWorldDOM();` : `showToast('Need $${item.cost}!')`}">
                  ${isOwned ? '✓ Owned' : `Buy $${item.cost}`}
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <div class="room-floor-actions-bar" onclick="event.stopPropagation()">
          <button type="button" class="room-floor-pill" onclick="World2D.openStationView('wardrobe')">
            👕 Open Wardrobe
          </button>
          <button type="button" class="room-floor-pill primary-room-pill" style="background:#EF4444;color:#FFF;" onclick="World2D.closeStationView()">
            ⬅️ Out (Back to Room)
          </button>
        </div>
      `;
      this.renderZoneActionBar();
      return;
    }

    // 7. INTERACTIVE BAG PACKING STATION VIEW (6 Backpack Pocket Slots + Item Shelves + School & Outing Presets!)
    if (this.stationView === 'bag') {
      this.ensureBagInitialized();
      sq.style.background = 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 66%, #92400E 66%, #78350F 100%)';

      const allItems = this.getAllPackableBagItems();
      const packedIds = gameState.packedBag || [];
      const slotNames = [
        'Top Zip Pocket',
        'Main Pocket #1',
        'Main Pocket #2',
        'Lunchbox Pocket',
        'Left Bottle Slot',
        'Right Side Slot'
      ];

      sq.innerHTML = `
        <div class="side-room-badge" style="background:#FFF;border-color:#D97706;color:#92400E;" onclick="event.stopPropagation()">
          🎒 Pack Your Bag (${packedIds.length} / 6 Slots Packed) — Click Items on the Right to Pack, or Click a Pocket to Unpack/Use!
        </div>
        <button type="button" class="room-floor-pill"
          style="position:absolute;top:10px;right:12px;z-index:30;background:#EF4444;color:#FFF;border-color:#991B1B;"
          onclick="event.stopPropagation(); World2D.closeStationView()">
          ⬅️ Out (Back to Room) ✖
        </button>

        <div style="position:absolute;inset:44px 14px 48px 14px;display:grid;grid-template-columns:1.05fr 1.25fr;gap:12px;z-index:10;" onclick="event.stopPropagation()">
          <!-- LEFT: Open Backpack with 6 Interactive Pocket Slots -->
          <div style="background:linear-gradient(180deg,#FEE2E2 0%,#FECACA 100%);border:3.5px solid #B91C1C;border-radius:18px;padding:10px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 8px 20px rgba(0,0,0,0.18);">
            <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px dashed #F87171;padding-bottom:5px;margin-bottom:6px;">
              <strong style="font-size:0.8rem;color:#991B1B;">🎒 ${gameState.name}'s Open Backpack (${packedIds.length}/6)</strong>
              <div style="display:flex;gap:4px;">
                <button type="button" class="dialogue-close-x" style="background:#0284C7;" onclick="World2D.autoPackBagPreset('school')" title="Auto-pack School Supplies & Lunch">🏫 School</button>
                <button type="button" class="dialogue-close-x" style="background:#16A34A;" onclick="World2D.autoPackBagPreset('outing')" title="Auto-pack Park & Fun Gear">🛝 Outing</button>
                <button type="button" class="dialogue-close-x" style="background:#64748B;" onclick="World2D.autoPackBagPreset('clear')" title="Empty all slots">🧹 Empty</button>
              </div>
            </div>

            <!-- 6 Pocket Slots Grid inside the Backpack -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;flex:1;">
              ${[0, 1, 2, 3, 4, 5].map(slotIdx => {
                const itemId = packedIds[slotIdx];
                const item = itemId ? allItems.find(i => i.id === itemId) : null;
                if (item) {
                  return `
                    <div style="background:#FFFFFF;border:2px solid #16A34A;border-radius:12px;padding:6px 8px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 2px 6px rgba(0,0,0,0.08);">
                      <div style="display:flex;align-items:center;gap:6px;">
                        <span style="font-size:1.45rem;line-height:1;">${item.icon}</span>
                        <div style="min-width:0;flex:1;">
                          <strong style="font-size:0.71rem;color:#1E293B;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</strong>
                          <span style="font-size:0.61rem;color:#15803D;font-weight:700;display:block;">${item.desc}</span>
                        </div>
                      </div>
                      <div style="display:flex;gap:4px;margin-top:4px;">
                        <button type="button" style="flex:1;background:#DCFCE7;color:#166534;border:1px solid #16A34A;border-radius:6px;font-size:0.63rem;font-weight:800;padding:2px 4px;cursor:pointer;"
                          onclick="World2D.usePackedBagItem('${item.id}')">✨ Use</button>
                        <button type="button" style="background:#FEE2E2;color:#991B1B;border:1px solid #F87171;border-radius:6px;font-size:0.63rem;font-weight:800;padding:2px 6px;cursor:pointer;"
                          onclick="World2D.togglePackBagItem('${item.id}')">✖ Unpack</button>
                      </div>
                    </div>
                  `;
                }
                return `
                  <div style="background:rgba(255,255,255,0.55);border:2px dashed #F87171;border-radius:12px;padding:6px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#991B1B;text-align:center;">
                    <span style="font-size:1.1rem;opacity:0.55;">🎒</span>
                    <strong style="font-size:0.66rem;">Empty: ${slotNames[slotIdx]}</strong>
                    <span style="font-size:0.58rem;opacity:0.75;">Click an item on the right ➜</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- RIGHT: Packable Items Shelf (School, Snacks & Outing Gear) -->
          <div style="background:rgba(255,255,255,0.95);border:3px solid #D97706;border-radius:18px;padding:9px 11px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;box-shadow:0 8px 20px rgba(0,0,0,0.16);">
            <strong style="font-size:0.76rem;color:#92400E;">📦 Click Any Item Below to Pack or Unpack It:</strong>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
              ${allItems.map(item => {
                const isPacked = packedIds.includes(item.id);
                return `
                  <div style="border:2px solid ${isPacked ? '#16A34A' : '#E2E8F0'};background:${isPacked ? '#F0FDF4' : '#FFFDF9'};border-radius:10px;padding:5px 7px;display:flex;align-items:center;justify-content:space-between;gap:6px;cursor:pointer;transition:transform 0.12s ease;"
                    onclick="World2D.togglePackBagItem('${item.id}')">
                    <div style="display:flex;align-items:center;gap:6px;min-width:0;flex:1;">
                      <span style="font-size:1.3rem;">${item.icon}</span>
                      <div style="min-width:0;flex:1;">
                        <strong style="font-size:0.7rem;color:#1E293B;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.name}</strong>
                        <span style="font-size:0.6rem;color:#64748B;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.desc}</span>
                      </div>
                    </div>
                    <span style="font-size:0.64rem;font-weight:800;padding:2px 6px;border-radius:999px;background:${isPacked ? '#16A34A' : '#FEF3C7'};color:${isPacked ? '#FFF' : '#92400E'};white-space:nowrap;">
                      ${isPacked ? '✓ Packed' : '+ Pack'}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <div class="room-floor-actions-bar" onclick="event.stopPropagation()">
          <button type="button" class="room-floor-pill" onclick="World2D.autoPackBagPreset('school')">
            🏫 Pack for School
          </button>
          <button type="button" class="room-floor-pill" onclick="World2D.autoPackBagPreset('outing')">
            🛝 Pack for Park & Outing
          </button>
          <button type="button" class="room-floor-pill primary-room-pill" style="background:#16A34A;color:#FFF;" onclick="World2D.finishPackingAndZipBag()">
            ✨ Zip Up & Carry Bag! (+8 😊, +6 🧠)
          </button>
          <button type="button" class="room-floor-pill" style="background:#EF4444;color:#FFF;" onclick="World2D.closeStationView()">
            ⬅️ Out
          </button>
        </div>
      `;
      this.renderZoneActionBar();
      return;
    }

    // 8. INTERACTIVE DECISIONS CENTER VIEW ("What Will You Choose?" Scenarios + Daily Life Rules!)
    if (this.stationView === 'decisions') {
      this.ensureDecisionsInitialized();
      sq.style.background = 'linear-gradient(180deg, #EDE9FE 0%, #DDD6FE 66%, #4C1D95 66%, #2E1065 100%)';

      const scenario = this.getCurrentDecisionScenario();
      const rules = gameState.lifeRules || {};
      const lastOutcome = this.lastDecisionOutcome;

      sq.innerHTML = `
        <div class="side-room-badge" style="background:#FFF;border-color:#7C3AED;color:#5B21B6;" onclick="event.stopPropagation()">
          🧭 Decisions Center (🏆 ${gameState.decisionsMadeCount || 0} Decisions Made) — Choose What You Want to Do!
        </div>
        <button type="button" class="room-floor-pill"
          style="position:absolute;top:10px;right:12px;z-index:30;background:#EF4444;color:#FFF;border-color:#991B1B;"
          onclick="event.stopPropagation(); World2D.closeStationView()">
          ⬅️ Out (Back) ✖
        </button>

        <div style="position:absolute;inset:44px 14px 48px 14px;display:grid;grid-template-columns:1.3fr 0.95fr;gap:12px;z-index:10;" onclick="event.stopPropagation()">
          <!-- LEFT: Active "What Will You Choose?" Scenario Card -->
          <div style="background:#FFFFFF;border:3px solid #7C3AED;border-radius:18px;padding:10px 12px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 8px 20px rgba(0,0,0,0.18);overflow-y:auto;">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:4px;">
                <span style="background:#F3E8FF;color:#6D28D9;border:1px solid #C4B5FD;font-size:0.66rem;font-weight:800;padding:2px 8px;border-radius:999px;">
                  ${scenario.icon} ${scenario.badge}
                </span>
                <button type="button" class="dialogue-close-x" style="background:#7C3AED;" onclick="World2D.nextDecisionScenario()">
                  🔄 Next Scenario
                </button>
              </div>
              <strong style="font-size:0.88rem;color:#1E293B;display:block;margin-bottom:3px;">${scenario.title}</strong>
              <p style="font-size:0.74rem;color:#475569;margin-bottom:8px;line-height:1.3;">${scenario.prompt}</p>
            </div>

            ${lastOutcome && lastOutcome.scenarioId === scenario.id ? `
              <div style="background:#F0FDF4;border:2px solid #16A34A;border-radius:12px;padding:8px 10px;margin-bottom:6px;">
                <strong style="font-size:0.76rem;color:#166534;display:block;margin-bottom:3px;">✓ Decision Made: ${lastOutcome.choiceLabel}</strong>
                <p style="font-size:0.73rem;color:#15803D;margin-bottom:6px;">${lastOutcome.text}</p>
                <button type="button" class="energy-btn eat-btn" style="font-size:0.72rem;padding:5px 12px;" onclick="World2D.nextDecisionScenario()">
                  🧭 Next Decision Scenario ➜
                </button>
              </div>
            ` : `
              <div style="display:flex;flex-direction:column;gap:5px;">
                ${scenario.choices.map((ch, idx) => `
                  <button type="button" class="dialogue-choice-pill choice-${Math.min(4, idx + 1)}"
                    style="padding:5px 9px;display:flex;flex-direction:column;gap:1px;"
                    onclick="World2D.makeScenarioDecision('${scenario.id}', ${idx})">
                    <span style="font-size:0.75rem;font-weight:800;">${ch.label}</span>
                    <span style="font-size:0.63rem;opacity:0.85;font-weight:700;">${ch.sub}</span>
                  </button>
                `).join('')}
              </div>
            `}
          </div>

          <!-- RIGHT: Personal Life Rules & Quick Choices -->
          <div style="background:rgba(255,255,255,0.95);border:3px solid #D97706;border-radius:18px;padding:9px 11px;overflow-y:auto;display:flex;flex-direction:column;gap:7px;box-shadow:0 8px 20px rgba(0,0,0,0.16);">
            <strong style="font-size:0.76rem;color:#92400E;">⚙️ Choose Your Personal Rules & Priorities:</strong>
            ${LIFE_RULE_DECISIONS.map(rule => {
              const currentVal = rules[rule.key] || rule.options[0].id;
              return `
                <div style="background:#FFFBEB;border:1.5px solid #FDE68A;border-radius:10px;padding:5px 7px;">
                  <strong style="font-size:0.69rem;color:#92400E;display:block;margin-bottom:4px;">${rule.title}</strong>
                  <div style="display:flex;flex-direction:column;gap:3px;">
                    ${rule.options.map(opt => {
                      const active = currentVal === opt.id;
                      return `
                        <button type="button"
                          style="text-align:left;font-size:0.66rem;font-weight:800;padding:3px 7px;border-radius:7px;cursor:pointer;border:1.5px solid ${active ? '#16A34A' : '#E2E8F0'};background:${active ? '#DCFCE7' : '#FFFFFF'};color:${active ? '#166534' : '#334155'};"
                          onclick="World2D.setLifeRuleDecision('${rule.key}', '${opt.id}')">
                          ${active ? '✓ ' : ''}${opt.label}
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="room-floor-actions-bar" onclick="event.stopPropagation()">
          <button type="button" class="room-floor-pill" onclick="World2D.nextDecisionScenario()">
            🔄 New Decision Dilemma
          </button>
          <button type="button" class="room-floor-pill" onclick="switchTab('decisions')">
            📋 View All Decisions in Side Panel
          </button>
          <button type="button" class="room-floor-pill primary-room-pill" style="background:#EF4444;color:#FFF;" onclick="World2D.closeStationView()">
            ⬅️ Out (Back)
          </button>
        </div>
      `;
      this.renderZoneActionBar();
      return;
    }

    // 9. INTERACTIVE DAILY SCHEDULE PLANNER VIEW (4 Time Slots: Morning, Afternoon, Evening, Night!)
    if (this.stationView === 'schedule') {
      this.ensureScheduleInitialized();
      sq.style.background = 'linear-gradient(180deg, #E0F2FE 0%, #BAE6FD 66%, #0369A1 66%, #075985 100%)';

      const sched = gameState.dailySchedule || {};
      const doneSlots = gameState.completedScheduleSlots || {};

      sq.innerHTML = `
        <div class="side-room-badge" style="background:#FFF;border-color:#0284C7;color:#0369A1;" onclick="event.stopPropagation()">
          📅 ${gameState.name}'s Daily Schedule — Plan Your 4 Time Slots & Click "▶ Do Now" or "✨ Run Full Day"!
        </div>
        <button type="button" class="room-floor-pill"
          style="position:absolute;top:10px;right:12px;z-index:30;background:#EF4444;color:#FFF;border-color:#991B1B;"
          onclick="event.stopPropagation(); World2D.closeStationView()">
          ⬅️ Out (Back) ✖
        </button>

        <div style="position:absolute;inset:44px 14px 48px 14px;display:grid;grid-template-columns:1fr 1fr;gap:8px;z-index:10;overflow-y:auto;" onclick="event.stopPropagation()">
          ${DAILY_SCHEDULE_SLOTS.map(slot => {
            const activeOptId = sched[slot.slotKey] || slot.options[0].id;
            const activeOpt = slot.options.find(o => o.id === activeOptId) || slot.options[0];
            const isDone = !!doneSlots[slot.slotKey];
            return `
              <div style="background:${slot.bg};border:2.5px solid ${isDone ? '#16A34A' : slot.color};border-radius:14px;padding:7px 9px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 4px 12px rgba(0,0,0,0.12);">
                <div>
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:4px;margin-bottom:4px;">
                    <strong style="font-size:0.76rem;color:#1E293B;">${slot.timeLabel}</strong>
                    <div style="display:flex;gap:4px;align-items:center;">
                      ${isDone ? `<span style="background:#DCFCE7;color:#166534;font-size:0.6rem;font-weight:800;padding:1px 6px;border-radius:999px;">✓ Done</span>` : ''}
                      <button type="button" class="dialogue-close-x" style="background:#16A34A;padding:2px 8px;"
                        onclick="World2D.executeScheduleSlot('${slot.slotKey}')">
                        ▶ Do Now
                      </button>
                    </div>
                  </div>
                  <div style="background:#FFFFFF;border:1.5px solid ${slot.color};border-radius:8px;padding:4px 7px;margin-bottom:5px;">
                    <strong style="font-size:0.72rem;color:#0F172A;display:block;">${activeOpt.name}</strong>
                    <span style="font-size:0.61rem;color:#059669;font-weight:700;display:block;">${activeOpt.desc}</span>
                  </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;">
                  ${slot.options.map(opt => {
                    const sel = opt.id === activeOpt.id;
                    return `
                      <button type="button"
                        style="text-align:left;font-size:0.61rem;font-weight:800;padding:3px 5px;border-radius:6px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border:1.5px solid ${sel ? slot.color : '#CBD5E1'};background:${sel ? '#FFFFFF' : 'rgba(255,255,255,0.65)'};color:${sel ? '#0F172A' : '#475569'};"
                        onclick="World2D.setScheduleSlotActivity('${slot.slotKey}', '${opt.id}')"
                        title="${opt.name} (${opt.desc})">
                        ${sel ? '✓ ' : ''}${opt.name}
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="room-floor-actions-bar" onclick="event.stopPropagation()">
          <button type="button" class="room-floor-pill" onclick="World2D.applySchedulePreset('school')">
            🏫 School Day Preset
          </button>
          <button type="button" class="room-floor-pill" onclick="World2D.applySchedulePreset('fun')">
            🍦 Fun & Bestie Preset
          </button>
          <button type="button" class="room-floor-pill" onclick="World2D.applySchedulePreset('allowance')">
            🪙 Chores & Money Preset
          </button>
          <button type="button" class="room-floor-pill primary-room-pill" style="background:#16A34A;color:#FFF;" onclick="World2D.runFullDailySchedule()">
            ✨ Run Full Day Schedule! (+$10 🪙 Bonus!)
          </button>
          <button type="button" class="room-floor-pill" style="background:#EF4444;color:#FFF;" onclick="World2D.closeStationView()">
            ⬅️ Out
          </button>
        </div>
      `;
      this.renderZoneActionBar();
      return;
    }
  },

  ensureScheduleInitialized() {
    if (!gameState) return;
    if (!gameState.dailySchedule) {
      gameState.dailySchedule = {
        morning: 'pack-bag',
        afternoon: 'afternoon-icecream',
        evening: 'evening-pizza',
        night: 'night-sleep'
      };
    }
    if (!gameState.completedScheduleSlots) {
      gameState.completedScheduleSlots = {};
    }
  },

  setScheduleSlotActivity(slotKey, optId) {
    if (!gameState) return;
    this.ensureScheduleInitialized();
    const slot = DAILY_SCHEDULE_SLOTS.find(s => s.slotKey === slotKey);
    const opt = slot && slot.options.find(o => o.id === optId);
    if (!slot || !opt) return;

    gameState.dailySchedule[slotKey] = optId;
    gameState.completedScheduleSlots[slotKey] = false;
    SoundFX.pop();
    showToast(`📅 Scheduled ${slot.timeLabel}: ${opt.name}!`);
    saveGame();
    renderRightPanel();
    this.renderWorldDOM();
  },

  applySchedulePreset(presetType) {
    if (!gameState) return;
    this.ensureScheduleInitialized();
    if (presetType === 'school') {
      gameState.dailySchedule = {
        morning: 'morning-school',
        afternoon: 'afternoon-toys',
        evening: 'evening-desk',
        night: 'night-sleep'
      };
      showToast('📅 Applied "🏫 School & Study Day" Schedule!');
    } else if (presetType === 'fun') {
      gameState.dailySchedule = {
        morning: 'morning-boba',
        afternoon: 'afternoon-icecream',
        evening: 'evening-bestie',
        night: 'night-jam'
      };
      showToast('📅 Applied "🍦 Fun & Bestie Outing" Schedule!');
    } else if (presetType === 'allowance') {
      gameState.dailySchedule = {
        morning: 'pack-bag',
        afternoon: 'afternoon-carwash',
        evening: 'evening-soup',
        night: 'night-story'
      };
      showToast('📅 Applied "🪙 Chores & Family" Schedule!');
    }
    gameState.completedScheduleSlots = {};
    SoundFX.milestone();
    saveGame();
    renderRightPanel();
    this.renderWorldDOM();
  },

  executeScheduleSlot(slotKey) {
    if (!gameState) return;
    this.ensureScheduleInitialized();
    const slot = DAILY_SCHEDULE_SLOTS.find(s => s.slotKey === slotKey);
    if (!slot) return;
    const activeOptId = gameState.dailySchedule[slotKey] || slot.options[0].id;
    const opt = slot.options.find(o => o.id === activeOptId) || slot.options[0];

    const st = opt.stats || {};
    if (st.happiness) gameState.stats.happiness = clampStat(gameState.stats.happiness + st.happiness);
    if (st.kindness) gameState.stats.kindness = clampStat(gameState.stats.kindness + st.kindness);
    if (st.smarts) gameState.stats.smarts = clampStat(gameState.stats.smarts + st.smarts);
    if (st.health) gameState.stats.health = clampStat(gameState.stats.health + st.health);
    if (st.energy) gameState.energy = Math.min(100, Math.round(gameState.energy + st.energy));
    if (st.money) gameState.money += st.money;
    if (st.skill) {
      const [sk, amt] = st.skill;
      gameState.skills[sk] = Math.min(100, (gameState.skills[sk] || 0) + amt);
    }
    if (st.friendBoost && typeof getTopFriend === 'function') {
      const bf = getTopFriend(gameState);
      if (bf) bf.bond = clampStat(bf.bond + st.friendBoost);
    }

    gameState.completedScheduleSlots[slotKey] = true;
    SoundFX.milestone();
    addCurrentYearLog(`📅 Schedule [${slot.timeLabel}]: Completed "${opt.name}" (${opt.desc})!`);
    showToast(`📅 ${slot.timeLabel}: ${opt.name}! (${opt.desc})`);

    if (opt.consumeItem) {
      this.openStationView('fridge');
      this.consumeFridgeShelfItem(opt.consumeItem);
      return;
    }

    if (opt.targetPlaceId) {
      this.currentRoomId = opt.targetPlaceId;
      this.viewMode = 'room';
      this.stationView = null;
      this.playerX = 28;
      this.playerY = 56;
      this.targetX = 28;
      this.targetY = 56;
      if (typeof advanceQuestProgress === 'function') {
        advanceQuestProgress('place', opt.targetPlaceId);
      }
    }

    if (opt.targetStation) {
      this.openStationView(opt.targetStation);
      saveGame();
      renderAll();
      return;
    }

    if (opt.liveAction) {
      this.stationView = null;
      this.performLiveAction(opt.liveAction, 28, opt.targetPlaceId || this.currentRoomId);
      return;
    }

    saveGame();
    renderAll();
  },

  runFullDailySchedule() {
    if (!gameState) return;
    this.ensureScheduleInitialized();
    const summaryNames = [];

    DAILY_SCHEDULE_SLOTS.forEach(slot => {
      const activeOptId = gameState.dailySchedule[slot.slotKey] || slot.options[0].id;
      const opt = slot.options.find(o => o.id === activeOptId) || slot.options[0];
      summaryNames.push(`${slot.timeLabel.split(' ')[0]} ${opt.name}`);
      gameState.completedScheduleSlots[slot.slotKey] = true;

      const st = opt.stats || {};
      if (st.happiness) gameState.stats.happiness = clampStat(gameState.stats.happiness + Math.round(st.happiness * 0.6));
      if (st.kindness) gameState.stats.kindness = clampStat(gameState.stats.kindness + Math.round(st.kindness * 0.6));
      if (st.smarts) gameState.stats.smarts = clampStat(gameState.stats.smarts + Math.round(st.smarts * 0.6));
      if (st.health) gameState.stats.health = clampStat(gameState.stats.health + Math.round(st.health * 0.6));
      if (st.energy) gameState.energy = Math.min(100, Math.round(gameState.energy + Math.round(st.energy * 0.6)));
      if (st.money) gameState.money += st.money;
      if (st.skill) {
        const [sk, amt] = st.skill;
        gameState.skills[sk] = Math.min(100, (gameState.skills[sk] || 0) + Math.round(amt * 0.6));
      }
      if (st.friendBoost && typeof getTopFriend === 'function') {
        const bf = getTopFriend(gameState);
        if (bf) bf.bond = clampStat(bf.bond + Math.round(st.friendBoost * 0.6));
      }
    });

    // Full schedule completion bonus!
    gameState.money += 10;
    gameState.energy = Math.min(100, Math.round(gameState.energy + 15));
    SoundFX.milestone();
    addCurrentYearLog(`📅✨ Completed Full Daily Schedule (${summaryNames.join(' -> ')})! Earned +$10 Routine Bonus & +15% ⚡ Energy!`);
    showToast('📅✨ Completed your Full Daily Schedule! (+$10 🪙 Bonus, +15% ⚡ Energy & All Slot Boosts!)');
    saveGame();
    renderAll();
  },

  ensureDecisionsInitialized() {
    if (!gameState) return;
    if (typeof gameState.decisionIndex !== 'number') {
      gameState.decisionIndex = 0;
    }
    if (typeof gameState.decisionsMadeCount !== 'number') {
      gameState.decisionsMadeCount = 0;
    }
    if (!gameState.lifeRules) {
      gameState.lifeRules = {
        dailyFocus: 'balanced',
        moneyRule: 'saver',
        freeTimeRule: 'boba-chill'
      };
    }
  },

  getCurrentDecisionScenario() {
    this.ensureDecisionsInitialized();
    const idx = (gameState.decisionIndex || 0) % DECISION_SCENARIOS.length;
    return DECISION_SCENARIOS[idx];
  },

  nextDecisionScenario() {
    if (!gameState) return;
    this.ensureDecisionsInitialized();
    SoundFX.pop();
    this.lastDecisionOutcome = null;
    gameState.decisionIndex = ((gameState.decisionIndex || 0) + 1) % DECISION_SCENARIOS.length;
    saveGame();
    renderRightPanel();
    this.renderWorldDOM();
  },

  makeScenarioDecision(scenarioId, choiceIdx) {
    if (!gameState) return;
    this.ensureDecisionsInitialized();
    const scenario = DECISION_SCENARIOS.find(s => s.id === scenarioId) || this.getCurrentDecisionScenario();
    const ch = scenario && scenario.choices[choiceIdx];
    if (!ch) return;

    const st = ch.stats || {};
    if (st.happiness) gameState.stats.happiness = clampStat(gameState.stats.happiness + st.happiness);
    if (st.kindness) gameState.stats.kindness = clampStat(gameState.stats.kindness + st.kindness);
    if (st.smarts) gameState.stats.smarts = clampStat(gameState.stats.smarts + st.smarts);
    if (st.health) gameState.stats.health = clampStat(gameState.stats.health + st.health);
    if (st.energy) gameState.energy = Math.min(100, Math.round(gameState.energy + st.energy));
    if (st.money) gameState.money += st.money;
    if (st.skill) {
      const [sk, amt] = st.skill;
      gameState.skills[sk] = Math.min(100, (gameState.skills[sk] || 0) + amt);
    }
    if (st.skill2) {
      const [sk2, amt2] = st.skill2;
      gameState.skills[sk2] = Math.min(100, (gameState.skills[sk2] || 0) + amt2);
    }
    if (st.friendBoost && typeof getTopFriend === 'function') {
      const bf = getTopFriend(gameState);
      if (bf) bf.bond = clampStat(bf.bond + st.friendBoost);
    }
    if (st.allFriendsBoost && Array.isArray(gameState.friends)) {
      gameState.friends.forEach(f => { f.bond = clampStat(f.bond + st.allFriendsBoost); });
    }

    gameState.decisionsMadeCount = (gameState.decisionsMadeCount || 0) + 1;
    gameState.decisionIndex = ((gameState.decisionIndex || 0) + 1) % DECISION_SCENARIOS.length;

    SoundFX.milestone();
    addCurrentYearLog(`🧭 Decision [${scenario.title}]: Chose "${ch.label}" — ${ch.outcomeText}`);
    showToast(`🧭 ${ch.outcomeText}`);

    if (ch.consumeItem) {
      this.openStationView('fridge');
      this.consumeFridgeShelfItem(ch.consumeItem);
      return;
    }

    if (ch.targetPlaceId) {
      this.currentRoomId = ch.targetPlaceId;
      this.viewMode = 'room';
      this.stationView = null;
      this.playerX = 28;
      this.playerY = 56;
      this.targetX = 28;
      this.targetY = 56;
      if (typeof advanceQuestProgress === 'function') {
        advanceQuestProgress('place', ch.targetPlaceId);
      }
    }

    if (ch.targetStation) {
      this.openStationView(ch.targetStation);
      saveGame();
      renderAll();
      return;
    }

    if (ch.liveAction) {
      this.stationView = null;
      this.performLiveAction(ch.liveAction, 28, ch.targetPlaceId || this.currentRoomId);
      return;
    }

    saveGame();
    renderAll();
  },

  setLifeRuleDecision(ruleKey, optId) {
    if (!gameState) return;
    this.ensureDecisionsInitialized();
    const rule = LIFE_RULE_DECISIONS.find(r => r.key === ruleKey);
    if (!rule) return;
    const opt = rule.options.find(o => o.id === optId);
    if (!opt) return;

    gameState.lifeRules[ruleKey] = optId;
    const st = opt.stats || {};
    if (st.happiness) gameState.stats.happiness = clampStat(gameState.stats.happiness + st.happiness);
    if (st.kindness) gameState.stats.kindness = clampStat(gameState.stats.kindness + st.kindness);
    if (st.smarts) gameState.stats.smarts = clampStat(gameState.stats.smarts + st.smarts);
    if (st.health) gameState.stats.health = clampStat(gameState.stats.health + st.health);
    if (st.energy) gameState.energy = Math.min(100, Math.round(gameState.energy + st.energy));
    if (st.money) gameState.money += st.money;
    if (st.skill) {
      const [sk, amt] = st.skill;
      gameState.skills[sk] = Math.min(100, (gameState.skills[sk] || 0) + amt);
    }
    if (st.friendBoost && typeof getTopFriend === 'function') {
      const bf = getTopFriend(gameState);
      if (bf) bf.bond = clampStat(bf.bond + st.friendBoost);
    }

    gameState.decisionsMadeCount = (gameState.decisionsMadeCount || 0) + 1;
    SoundFX.milestone();
    addCurrentYearLog(`🧭 Life Rule Decision [${rule.title}]: Set to "${opt.label}"!`);
    showToast(`🧭 Set ${rule.title} to: ${opt.label}!`);
    saveGame();
    renderAll();
  },

  ensureBagInitialized() {
    if (!gameState) return;
    if (!Array.isArray(gameState.packedBag)) {
      gameState.packedBag = ['notebook', 'boba', 'lunchbox'];
    }
  },

  getAllPackableBagItems() {
    const baseList = [...BAG_PACKABLE_ITEMS];
    const seenNames = new Set(baseList.map(b => b.name.toLowerCase()));
    if (gameState && Array.isArray(gameState.inventory)) {
      gameState.inventory.forEach((invItem, idx) => {
        if (!invItem || !invItem.name) return;
        if (seenNames.has(invItem.name.toLowerCase())) return;
        seenNames.add(invItem.name.toLowerCase());
        baseList.push({
          id: invItem.id || `inv-pack-${idx}`,
          name: invItem.name,
          icon: invItem.icon || '🎁',
          category: invItem.category || 'fun',
          desc: invItem.desc || '+8 Happiness 😊',
          effects: invItem.effects || { happiness: 8 }
        });
      });
    }
    return baseList;
  },

  togglePackBagItem(itemId) {
    if (!gameState) return;
    this.ensureBagInitialized();
    const allItems = this.getAllPackableBagItems();
    const item = allItems.find(i => i.id === itemId);
    if (!item) return;

    const idx = gameState.packedBag.indexOf(itemId);
    if (idx !== -1) {
      gameState.packedBag.splice(idx, 1);
      SoundFX.pop();
      showToast(`🎒 Unpacked ${item.icon} ${item.name} from your bag!`);
    } else {
      if (gameState.packedBag.length >= 6) {
        SoundFX.pop();
        showToast('🎒 Your Backpack is full (6/6 slots)! Unpack an item first.');
        return;
      }
      gameState.packedBag.push(itemId);
      SoundFX.pop();
      showToast(`🎒 Packed ${item.icon} ${item.name} into your bag (${gameState.packedBag.length}/6)!`);
    }
    saveGame();
    this.renderWorldDOM();
  },

  autoPackBagPreset(presetType) {
    if (!gameState) return;
    this.ensureBagInitialized();
    if (presetType === 'school') {
      gameState.packedBag = ['notebook', 'sketchbook', 'magnifier', 'lunchbox', 'boba', 'apple'];
      SoundFX.milestone();
      showToast('🏫 Packed your bag with School Supplies, Boba Tea & Lunchbox (6/6)!');
    } else if (presetType === 'outing') {
      gameState.packedBag = ['boba', 'lunchbox', 'plushie', 'camera', 'waterbottle', 'handheld'];
      SoundFX.milestone();
      showToast('🛝 Packed your bag for an Outing with Boba Tea, Camera, Plushie & Game Console (6/6)!');
    } else if (presetType === 'clear') {
      gameState.packedBag = [];
      SoundFX.pop();
      showToast('🧹 Emptied all 6 slots of your backpack!');
    }
    saveGame();
    this.renderWorldDOM();
  },

  usePackedBagItem(itemId) {
    if (!gameState) return;
    this.ensureBagInitialized();
    const allItems = this.getAllPackableBagItems();
    const item = allItems.find(i => i.id === itemId);
    if (!item) return;

    const eff = item.effects || {};
    if (eff.energy) gameState.energy = Math.min(100, Math.round(gameState.energy + eff.energy));
    if (eff.happiness) gameState.stats.happiness = clampStat(gameState.stats.happiness + eff.happiness);
    if (eff.health) gameState.stats.health = clampStat(gameState.stats.health + eff.health);
    if (eff.smarts) gameState.stats.smarts = clampStat(gameState.stats.smarts + eff.smarts);
    if (eff.kindness) gameState.stats.kindness = clampStat(gameState.stats.kindness + eff.kindness);
    if (eff.skill) {
      const [sk, amt] = eff.skill;
      gameState.skills[sk] = Math.min(100, (gameState.skills[sk] || 0) + amt);
    }

    SoundFX.milestone();
    addCurrentYearLog(`🎒 Used ${item.icon} ${item.name} from your packed bag! (${item.desc})`);
    showToast(`🎒 Used ${item.icon} ${item.name} from your bag! (${item.desc})`);
    if (eff.energy && typeof advanceQuestProgress === 'function') {
      advanceQuestProgress('eat');
    }
    saveGame();
    renderLeftProfile();
    renderCenterTimeline();
    renderRightPanel();
    this.renderWorldDOM();
  },

  finishPackingAndZipBag() {
    if (!gameState) return;
    this.ensureBagInitialized();
    const allItems = this.getAllPackableBagItems();
    const packedObjs = (gameState.packedBag || []).map(id => allItems.find(i => i.id === id)).filter(Boolean);
    if (packedObjs.length === 0) {
      showToast('🎒 Pack at least 1 item into your bag before zipping it up!');
      return;
    }

    gameState.stats.happiness = clampStat(gameState.stats.happiness + 8);
    gameState.stats.smarts = clampStat(gameState.stats.smarts + 6);
    gameState.stats.kindness = clampStat(gameState.stats.kindness + 4);

    const namesStr = packedObjs.map(i => `${i.icon} ${i.name}`).join(', ');
    SoundFX.milestone();
    addCurrentYearLog(`🎒 Packed your bag (${packedObjs.length}/6 slots): ${namesStr}! (+8 Happiness, +6 Smarts)`);
    showToast(`🎒 Zipped up your bag with ${packedObjs.length} items! Ready for the day! (+8 😊, +6 🧠)`);
    this.stationView = null;
    saveGame();
    renderLeftProfile();
    renderCenterTimeline();
    renderRightPanel();
    this.renderWorldDOM();
  },

  openGroundedDoorModal() {
    if (!gameState) return;
    SoundFX.pop();
    const modal = document.getElementById('event-modal');
    const content = document.getElementById('event-modal-body');

    content.innerHTML = `
      <div class="modal-top-row">
        <div class="modal-header-badge" style="margin-bottom:0;background:#FEE2E2;color:#B91C1C;border:1px solid #FCA5A5;">🚫 GROUNDED IN YOUR ROOM (${gameState.groundedDays} Day${gameState.groundedDays > 1 ? 's' : ''} Left)</div>
        <button type="button" class="modal-out-btn" onclick="closeModal()">⬅️ Stay in Room ✖</button>
      </div>
      <h2>🚫 Mom Says: "You Are Grounded!"</h2>
      <p class="modal-story-text" style="background:#FFF1F2;border:1.5px solid #FECDD3;border-radius:12px;padding:10px 12px;color:#9F1239;">
        <strong>Why you got grounded:</strong> ${gameState.groundedReason || 'You got scolded for misbehaving!'}<br/>
        You cannot leave your bedroom to visit town places until you earn back Mom & Dad's trust or finish your grounded days!
      </p>
      <div class="choice-list">
        <button class="choice-btn" onclick="closeModal(); apologizeToUnGround();">
          <span style="font-size:1.4rem;">🙏</span>
          <div style="flex:1;">
            <strong>1: Apologize Sincerely to Mom & Promise to Behave</strong>
            <div style="font-size:0.76rem;color:#15803D;">Mom forgives you right away! (+8 Kindness 💛 & Ungrounded!)</div>
          </div>
          <span class="conseq-tag conseq-good">Unground Now ➜</span>
        </button>
        <button class="choice-btn" onclick="closeModal(); cleanRoomToUnGround();">
          <span style="font-size:1.4rem;">🧹</span>
          <div style="flex:1;">
            <strong>2: Clean Up Your Whole Bedroom & Do Chores (-10% ⚡)</strong>
            <div style="font-size:0.76rem;color:#15803D;">Impresses Mom & Dad! (+7 Kindness, +6 Happiness & Ungrounded!)</div>
          </div>
          <span class="conseq-tag conseq-good">Clean & Unground ➜</span>
        </button>
        <button class="choice-btn" onclick="closeModal(); World2D.openStationView('desk');">
          <span style="font-size:1.4rem;">💻</span>
          <div style="flex:1;">
            <strong>3: Go Study or Draw at Your Bedroom Desk</strong>
            <div style="font-size:0.76rem;color:#0369A1;">Finishing a study or drawing session at your Desk lifts your grounding!</div>
          </div>
          <span class="conseq-tag conseq-good">Open Desk ➜</span>
        </button>
        <button class="choice-btn" onclick="closeModal(); World2D.openDialogueWith('mom', 'answer');">
          <span style="font-size:1.4rem;">❗💬</span>
          <div style="flex:1;">
            <strong>4: Talk Directly to Mom in Your Bedroom</strong>
            <div style="font-size:0.76rem;color:#6C757D;">Hear what Mom has to say and choose your response!</div>
          </div>
          <span class="conseq-tag">Talk to Mom ➜</span>
        </button>
      </div>
    `;
    modal.classList.remove('hidden');
  },

  openDoorPlacesModal(ev) {
    if (ev) ev.stopPropagation();
    if (!gameState) return;
    if (gameState.isGrounded && gameState.groundedDays > 0) {
      this.openGroundedDoorModal();
      return;
    }
    SoundFX.pop();
    const places = getActiveWorldPlaces(gameState);
    const modal = document.getElementById('event-modal');
    const content = document.getElementById('event-modal-body');

    content.innerHTML = `
      <div class="modal-top-row">
        <div class="modal-header-badge" style="margin-bottom:0;">🚪 Room Door — Choose Where to Go!</div>
        <button type="button" class="modal-out-btn" onclick="closeModal()">⬅️ Out / Close ✖</button>
      </div>
      <h2>Step Through the Door</h2>
      <p class="modal-story-text">Every place has its own real interior, furniture, and people! Pick a place to enter, or view the full 2D Town Map:</p>
      <div class="choice-list" style="max-height:400px;overflow-y:auto;padding-right:4px;">
        <button class="choice-btn" onclick="closeModal(); World2D.enterRoom('my-room');">
          <span style="font-size:1.4rem;">🛏️</span>
          <div style="flex:1;">
            <strong>${gameState.name}'s Bedroom (My Room)</strong>
            <div style="font-size:0.76rem;color:#6C757D;">Cozy Bed, Blue Sofa & Lamp, Study Desk, Treasure Shelf, Mini Fridge & Wardrobe</div>
          </div>
          <span class="conseq-tag conseq-good">Enter Room ➜</span>
        </button>
        ${places.map(p => {
          const unlocked = !p.isMystery && gameState.age >= p.unlockAge;
          return `
            <button class="choice-btn" style="opacity:${unlocked ? '1' : '0.55'};"
              onclick="${unlocked ? `closeModal(); World2D.enterRoom('${p.id}');` : `showToast('🔒 ${p.name} unlocks at Age ${p.unlockAge}!')`}">
              <span style="font-size:1.4rem;">${unlocked ? p.icon : '🔒'}</span>
              <div style="flex:1;">
                <strong>${p.name}</strong>
                <div style="font-size:0.76rem;color:#6C757D;">${unlocked ? p.desc : `Unlocks at Age ${p.unlockAge}`}</div>
              </div>
              <span class="conseq-tag ${unlocked ? 'conseq-good' : 'conseq-risky'}">${unlocked ? 'Visit Place ➜' : `Age ${p.unlockAge}`}</span>
            </button>
          `;
        }).join('')}
      </div>
      <div style="margin-top:14px;display:flex;justify-content:space-between;align-items:center;">
        <button class="secondary-btn" onclick="closeModal(); World2D.switchView('town');">🗺️ View Full Town Map</button>
        <button class="secondary-btn" onclick="closeModal()">Cancel</button>
      </div>
    `;
    modal.classList.remove('hidden');
  },

  enterRoom(roomId, openModalImmediately = false) {
    if (!gameState) return;
    if (roomId !== 'my-room' && gameState.isGrounded && gameState.groundedDays > 0) {
      this.openGroundedDoorModal();
      return;
    }
    if (roomId !== 'my-room') {
      const places = getActiveWorldPlaces(gameState);
      const place = places.find(p => p.id === roomId);
      if (place && (place.isMystery || gameState.age < place.unlockAge)) {
        showToast(`🔒 ${place.name} unlocks at Age ${place.unlockAge}!`);
        return;
      }
      this.activeZoneId = roomId;
    }
    const alreadyInThisRoom = (this.viewMode === 'room' && this.currentRoomId === roomId && !this.stationView);
    this.stationView = null;
    this.liveAction = null;
    this.currentRoomId = roomId;
    this.viewMode = 'room';
    this.playerX = 28;
    this.playerY = 56;
    this.targetX = 28;
    this.targetY = 56;
    SoundFX.pop();
    this.renderWorldDOM();

    // If the user clicked the active chip again or requested immediate modal, open choices; otherwise let them see the actual place & furniture first!
    if (roomId !== 'my-room' && (openModalImmediately || alreadyInThisRoom) && typeof triggerPlaceAction === 'function') {
      triggerPlaceAction(roomId);
    } else if (roomId !== 'my-room') {
      const places = getActiveWorldPlaces(gameState);
      const pObj = places.find(p => p.id === roomId);
      if (pObj) {
        showToast(`${pObj.icon} Entered ${pObj.name}! Click any furniture or person inside!`);
      }
    }
  },

  interactWithFurniture(targetX, placeId, customToast = null) {
    if (!gameState) return;
    this.targetX = Math.max(12, Math.min(88, targetX));
    this.targetY = 56;
    SoundFX.pop();
    if (customToast) {
      showToast(customToast);
    }
    if (typeof triggerPlaceAction === 'function') {
      triggerPlaceAction(placeId);
    }
  },

  placePlayerAtCurrentHome() {
    if (!gameState) return;
    if (this.viewMode === 'room') {
      this.playerX = 28;
      this.playerY = 56;
      this.targetX = 28;
      this.targetY = 56;
      return;
    }
    const places = getActiveWorldPlaces(gameState);
    let homeZone = 'family-home';
    if (gameState.homeId && gameState.homeId !== 'family-room' && places.some(p => p.id === gameState.homeId)) {
      homeZone = gameState.homeId;
    } else if (gameState.livingWith === 'best-friend') {
      homeZone = 'best-friend-home';
    } else if (gameState.livingWith === 'moved-out-16') {
      const hasLoft = places.find(p => p.id === 'starter-loft');
      homeZone = hasLoft ? 'starter-loft' : 'mall';
    }

    const place = places.find(p => p.id === homeZone) || places[0];
    this.playerX = place.x;
    this.playerY = place.y + 2;
    this.targetX = this.playerX;
    this.targetY = this.playerY;
  },

  rebuildNPCs() {
    if (!gameState) return;
    const places = getActiveWorldPlaces(gameState);
    const isNight = gameState.timeOfDay === 'night';
    const npcs = [];

    // 1. Parents (Mom & Dad) at Family Home / Family Car
    npcs.push({
      id: 'mom',
      name: 'Mom 💛',
      isFamily: true,
      placeId: 'family-home',
      x: 9,
      y: 13,
      quote: isNight ? '🌙 Time for bed, sweetie! Sleep gives +90% Energy!' : '☀️ Have a wonderful day, sweetie! 💛',
      avatar: {
        gender: 'girl',
        skin: gameState.avatar.skin,
        hairColor: gameState.avatar.hairColor,
        hairStyle: 'long-wave',
        outfit: 'cardigan',
        shirt: 'berry',
        accessory: 'none'
      },
      renderAge: Math.min(75, gameState.age + 27)
    });

    npcs.push({
      id: 'dad',
      name: 'Dad 💙',
      isFamily: true,
      placeId: isNight ? 'family-home' : 'family-car',
      x: isNight ? 19 : 34,
      y: 13,
      quote: isNight ? '🌙 Goodnight, kiddo! Sweet dreams!' : '☀️ Hop in the Family Car anytime! 🚗',
      avatar: {
        gender: 'boy',
        skin: gameState.avatar.skin,
        hairColor: gameState.avatar.hairColor,
        hairStyle: 'short-part',
        outfit: 'hoodie',
        shirt: 'sky',
        accessory: 'round-glasses'
      },
      renderAge: Math.min(78, gameState.age + 29)
    });

    // 2. Siblings (Big Sister & Brother) who grow up with you!
    if (gameState.siblings && gameState.siblings.length > 0) {
      gameState.siblings.forEach((sib, sIdx) => {
        const sibAge = Math.max(0, gameState.age + sib.ageDiff);
        let sibPlaceId = 'family-home';
        if (!isNight) {
          if (gameState.age >= 2 && sIdx === 0) sibPlaceId = 'pizza-place';
          else if (gameState.age >= 1 && sIdx === 1) sibPlaceId = 'playground';
          else if (gameState.age >= 1 && sIdx === 0) sibPlaceId = 'ice-cream-shop';
        }

        const pObj = places.find(p => p.id === sibPlaceId) || places[0];
        npcs.push({
          id: sib.id,
          name: `${sib.name} (${sib.relation})`,
          isFamily: true,
          isSibling: true,
          siblingId: sib.id,
          placeId: pObj.id,
          x: pObj.x + (sIdx === 0 ? -4 : 4),
          y: pObj.y + (isNight ? 4 : 1),
          quote: isNight ? '🌙 Yawn... sleepy time!' : (sib.quote || "☀️ Let's play together!"),
          avatar: sib.avatar,
          renderAge: sibAge
        });
      });
    }

    // 3. Friends placed across Unlocked Places (and Best Friend in Best Friend's Home once Age 6+!)
    const bestFriend = getTopFriend(gameState);
    const unlockedNonHome = places.filter(p => !p.isMystery && gameState.age >= p.unlockAge && p.id !== 'family-home');

    gameState.friends.forEach((f, idx) => {
      let targetPlace = unlockedNonHome[idx % unlockedNonHome.length] || places[0];
      let offsetX = (idx % 2 === 0 ? -4 : 4);
      let offsetY = 1;
      let quote = isNight
        ? `🌙 Starry night, ${gameState.name}!`
        : `☀️ Hey ${gameState.name}! Let's hang out!`;

      const bfHome = places.find(p => p.id === 'best-friend-home');
      if (bfHome && gameState.age >= bfHome.unlockAge && bestFriend && f.id === bestFriend.id) {
        targetPlace = bfHome;
        offsetX = -4;
        offsetY = 1;
        quote = gameState.age >= 21
          ? `Best roommates ever, ${gameState.name}! 🌟🏡`
          : (isNight ? `🌙 Sleepover time at my house, bestie!` : `☀️ Welcome to my house, bestie! 🌟`);
      }

      npcs.push({
        id: f.id,
        name: f.name.split(' ')[0],
        fullName: f.name,
        isFamily: false,
        friendId: f.id,
        placeId: targetPlace.id,
        x: Math.max(6, Math.min(94, targetPlace.x + offsetX)),
        y: Math.max(8, Math.min(92, targetPlace.y + offsetY)),
        quote: quote,
        avatar: f.avatar,
        renderAge: gameState.age
      });
    });

    this.npcs = npcs;
    this.renderWorldDOM();
  },

  handleSquareClick(event) {
    const sq = document.getElementById('world-2d-square');
    if (!sq || !gameState) return;
    const rect = sq.getBoundingClientRect();
    const clickX = ((event.clientX - rect.left) / rect.width) * 100;
    const clickY = ((event.clientY - rect.top) / rect.height) * 100;

    if (this.viewMode === 'room') {
      this.targetX = Math.max(12, Math.min(88, clickX));
      this.targetY = Math.max(50, Math.min(64, clickY));
      SoundFX.pop();
      return;
    }

    const places = getActiveWorldPlaces(gameState);
    const clickedPlace = places.find(p =>
      Math.abs(clickX - p.x) <= p.w / 2 && Math.abs(clickY - p.y) <= p.h / 2
    );

    if (clickedPlace && (clickedPlace.isMystery || gameState.age < clickedPlace.unlockAge)) {
      SoundFX.pop();
      if (clickedPlace.isMystery) {
        showToast('🎲 Mystery Place! Age up to 7+ to unlock random new places every year!');
      } else {
        showToast(`🔒 ${clickedPlace.name} unlocks at Age ${clickedPlace.unlockAge}!`);
      }
      return;
    }

    this.targetX = Math.max(6, Math.min(94, clickX));
    this.targetY = Math.max(8, Math.min(92, clickY));
    SoundFX.pop();
  },

  walkToRoomStation(stationId, targetX = null) {
    if (!gameState) return;
    if (targetX !== null) {
      this.targetX = targetX;
      this.targetY = 56;
    }
    if (stationId === 'room-door') {
      this.openDoorPlacesModal();
      return;
    }
    this.activeZoneId = stationId;
    if (typeof triggerPlaceAction === 'function') {
      triggerPlaceAction(stationId);
    }
  },

  walkToPlace(placeId) {
    if (!gameState) return;
    const places = getActiveWorldPlaces(gameState);
    const place = places.find(p => p.id === placeId);
    if (!place) return;
    if (place.isMystery) {
      showToast('🎲 Mystery Place! Unlocks randomly at Age 7+!');
      return;
    }
    if (gameState.age < place.unlockAge) {
      showToast(`🔒 ${place.name} unlocks at Age ${place.unlockAge}!`);
      return;
    }
    // Enter this place's actual interior room with all its custom furniture!
    this.enterRoom(place.id, false);
  },

  clickNpcAvatar(npcId, ev) {
    if (ev) ev.stopPropagation();
    const npc = this.npcs.find(n => n.id === npcId);
    if (!npc) return;

    if (this.viewMode === 'room') {
      this.targetX = Math.max(12, Math.min(88, npc.roomX || 48));
      this.targetY = 56;
    } else {
      this.targetX = Math.max(6, Math.min(94, npc.x + 3));
      this.targetY = Math.max(8, Math.min(92, npc.y + 2));
    }

    // If this NPC has ❗💬 (they want to talk to you), open their question ('answer' mode)
    const defaultMode = this.doesNpcWantToTalk(npc.id) ? 'answer' : 'answer';
    this.openDialogueWith(npc.id, defaultMode);
  },

  renderDialogueOverlayHTML() {
    if (!this.activeDialogue || !gameState) return '';
    const dlg = this.activeDialogue;
    const isAsk = dlg.mode === 'ask';
    const shortName = dlg.npcId === 'mom' ? 'Mom' : (dlg.npcId === 'dad' ? 'Dad' : dlg.npcName.split(' ')[0]);
    const options = (dlg.topic && dlg.topic.options) || [];
    const keyNums = options.map((_, i) => i + 1).join(' / ');

    return `
      <div class="world-dialogue-overlay" onclick="event.stopPropagation()">
        <div class="dialogue-top-header">
          <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
            <span>💬 <strong>${dlg.npcName}</strong></span>
            <button type="button" class="dialogue-mode-tab ${!isAsk ? 'active-mode-tab' : ''}" onclick="World2D.switchDialogueMode('answer')">
              💬 Answer ${shortName}
            </button>
            <button type="button" class="dialogue-mode-tab ${isAsk ? 'active-mode-tab' : ''}" onclick="World2D.switchDialogueMode('ask')">
              🙋 Ask ${shortName} a Question
            </button>
          </div>
          <div style="display:flex;gap:6px;align-items:center;">
            ${!dlg.resolved ? `
              <button type="button" class="dialogue-close-x" style="background:#3B82F6;" onclick="World2D.nextDialogueTopic()">
                🔄 ${isAsk ? 'More Questions' : 'Next Question'}
              </button>
            ` : ''}
            <button type="button" class="dialogue-close-x" onclick="World2D.closeDialogue()">⬅️ Out ✖</button>
          </div>
        </div>
        <div class="dialogue-body-row">
          <div class="dialogue-speaker-avatar">
            ${renderAvatarSVG(isAsk ? gameState.avatar : dlg.npcAvatar, isAsk ? gameState.age : dlg.npcAge, 50)}
          </div>
          <div class="dialogue-speech-content">
            <div class="dialogue-npc-line">${dlg.topic.prompt} <small style="font-weight:600;color:#64748B;">(Click or press ${keyNums})</small></div>
            ${dlg.resolved ? `
              <div class="dialogue-player-reply-tag">🗣️ ${gameState.name}: "${dlg.playerChoiceText}"</div>
              <div class="dialogue-npc-followup">${dlg.npcReplyText}</div>
              <div class="dialogue-choices-row" style="margin-top:6px;">
                <button type="button" class="dialogue-choice-pill choice-1" onclick="World2D.nextDialogueTopic()">
                  💬 ${isAsk ? 'Ask Another Question' : 'Next Question'}
                </button>
                <button type="button" class="dialogue-choice-pill choice-4" onclick="World2D.switchDialogueMode('${isAsk ? 'answer' : 'ask'}')">
                  ${isAsk ? `💬 Let ${shortName} Ask Me` : `🙋 Ask ${shortName} a Question`}
                </button>
                <button type="button" class="dialogue-choice-pill choice-5" onclick="World2D.closeDialogue()">
                  ✓ Done Talking
                </button>
              </div>
            ` : `
              <div class="dialogue-choices-row">
                ${options.map((opt, idx) => {
                  const num = idx + 1;
                  const styleClass = opt.isDecline ? 'choice-5' : `choice-${Math.min(4, num)}`;
                  return `
                    <button type="button" class="dialogue-choice-pill ${styleClass}" onclick="World2D.selectDialogueOption(${num})">
                      <strong>${num}:</strong> ${isAsk ? `Ask: ${opt.label}` : opt.label}
                    </button>
                  `;
                }).join('')}
              </div>
              <form class="dialogue-custom-ask-form" onsubmit="World2D.submitCustomAskQuestion(event)">
                <input id="custom-dialogue-ask-input" type="text" class="dialogue-custom-ask-input"
                  placeholder="✍️ Or type your own question to ask ${shortName} (e.g. Can we get ice cream? Can I have $15?)"
                  maxlength="90" />
                <button type="submit" class="dialogue-custom-ask-btn">🙋 Ask ${shortName}!</button>
              </form>
            `}
          </div>
        </div>
      </div>
    `;
  },

  tick() {
    if (gameState) {
      const speed = 0.65;
      let movedByKey = false;
      const minY = this.viewMode === 'room' ? 50 : 8;
      const maxY = this.viewMode === 'room' ? 64 : 92;

      if (this.keys['arrowup'] || this.keys['w']) {
        this.playerY = Math.max(minY, this.playerY - speed);
        movedByKey = true;
      }
      if (this.keys['arrowdown'] || this.keys['s']) {
        this.playerY = Math.min(maxY, this.playerY + speed);
        movedByKey = true;
      }
      if (this.keys['arrowleft'] || this.keys['a']) {
        this.playerX = Math.max(10, this.playerX - speed);
        movedByKey = true;
      }
      if (this.keys['arrowright'] || this.keys['d']) {
        this.playerX = Math.min(90, this.playerX + speed);
        movedByKey = true;
      }

      if (movedByKey) {
        this.targetX = this.playerX;
        this.targetY = this.playerY;
        this.isMoving = true;
      } else {
        const dx = this.targetX - this.playerX;
        const dy = this.targetY - this.playerY;
        const dist = Math.hypot(dx, dy);
        if (dist > 0.5) {
          this.playerX += (dx / dist) * Math.min(dist, speed * 1.15);
          this.playerY += (dy / dist) * Math.min(dist, speed * 1.15);
          this.isMoving = true;
        } else {
          this.isMoving = false;
        }
      }

      this.updatePlayerPositionDOM();
    }

    requestAnimationFrame(() => this.tick());
  },

  updatePlayerPositionDOM() {
    const playerEl = document.getElementById('world-player-token');
    if (playerEl) {
      playerEl.style.left = `${this.playerX}%`;
      playerEl.style.top = `${this.playerY}%`;
      playerEl.classList.toggle('is-walking', !!this.isMoving);
    }

    if (this.viewMode === 'room') {
      return;
    }

    const places = getActiveWorldPlaces(gameState);
    const zone = places.find(p =>
      !p.isMystery &&
      gameState.age >= p.unlockAge &&
      Math.abs(this.playerX - p.x) <= p.w / 2 &&
      Math.abs(this.playerY - p.y) <= p.h / 2
    );

    const newZoneId = zone ? zone.id : null;
    if (newZoneId !== this.activeZoneId) {
      this.activeZoneId = newZoneId;
      this.renderZoneActionBar();
    }
  },

  renderQuickPlacesStrip() {
    const strip = document.getElementById('quick-places-strip');
    if (!strip || !gameState) return;
    const places = getActiveWorldPlaces(gameState);
    const unlockedPlaces = places.filter(p => !p.isMystery && gameState.age >= p.unlockAge);
    const questPlaceIds = new Set(
      (gameState.activeQuests || [])
        .filter(q => !q.completed && !q.claimed && q.targetPlaceId)
        .map(q => q.targetPlaceId)
    );

    strip.innerHTML = `
      <span class="quick-strip-label">🚪 Visit Places:</span>
      <button type="button" class="quick-place-chip ${this.viewMode === 'room' && this.currentRoomId === 'my-room' ? 'active-chip' : ''}"
        onclick="World2D.enterRoom('my-room')">
        🛏️ My Room
      </button>
      ${unlockedPlaces.map(p => `
        <button type="button" class="quick-place-chip ${this.viewMode === 'room' && this.currentRoomId === p.id ? 'active-chip' : ''} ${questPlaceIds.has(p.id) ? 'quest-target-chip' : ''}"
          onclick="World2D.enterRoom('${p.id}')">
          ${p.icon} ${p.name}${questPlaceIds.has(p.id) ? ' 🎯' : ''}
        </button>
      `).join('')}
    `;
  },

  renderWorldDOM() {
    const sq = document.getElementById('world-2d-square');
    if (!sq || !gameState) return;

    const isNight = gameState.timeOfDay === 'night';
    const isRoom = this.viewMode === 'room';
    sq.classList.toggle('night-mode', isNight);
    sq.classList.toggle('room-mode', isRoom);
    document.body.classList.toggle('night-theme', isNight);

    // Update Mode Switcher Buttons & Title
    const btnRoom = document.getElementById('btn-view-room');
    const btnTown = document.getElementById('btn-view-town');
    if (btnRoom) btnRoom.classList.toggle('active', isRoom);
    if (btnTown) btnTown.classList.toggle('active', !isRoom);

    const places = getActiveWorldPlaces(gameState);
    const currentPlaceObj = places.find(p => p.id === this.currentRoomId);
    const sceneConfig = getPlaceSceneConfig(this.currentRoomId, isNight);

    const viewTitle = document.getElementById('world-view-title');
    if (viewTitle) {
      viewTitle.textContent = isRoom
        ? `${sceneConfig.title} — Click Any Furniture, Person, or the Door!`
        : `🗺️ 2D Town Map — Click Any Building or Park to Enter It!`;
    }

    this.renderQuickPlacesStrip();

    // ==========================================
    // VIEW MODE 1: 2D SIDE-VIEW PLACE & ROOM INTERIORS (WITH REAL FURNITURE & INTERACTIVE STATIONS!)
    // ==========================================
    if (isRoom) {
      if (this.stationView) {
        this.renderStationViewDOM(sq);
        return;
      }

      const wallColor = isNight ? sceneConfig.wallNight : sceneConfig.wallDay;
      const floorColor = isNight ? sceneConfig.floorNight : sceneConfig.floorDay;
      sq.style.background = `linear-gradient(to bottom, ${wallColor} 0%, ${wallColor} 66.8%, #000000 66.8%, #000000 68%, ${floorColor} 68%, ${floorColor} 100%)`;

      // Find NPCs at this place so they stand inside the place with you!
      // In My Room, Mom stands near the door so you can click her to talk anytime!
      let roomNpcs = [];
      if (this.currentRoomId === 'my-room') {
        const momNpc = this.npcs.find(n => n.id === 'mom');
        if (momNpc) roomNpcs = [momNpc];
      } else {
        roomNpcs = this.npcs.filter(n => n.placeId === this.currentRoomId).slice(0, 3);
        if (this.guestNpcId && !roomNpcs.some(n => n.id === this.guestNpcId)) {
          const guest = this.npcs.find(n => n.id === this.guestNpcId);
          if (guest) roomNpcs.unshift(guest);
          roomNpcs = roomNpcs.slice(0, 3);
        }
      }

      const npcPositions = [48, 65, 32];
      const roomNpcsHtml = roomNpcs.map((npc, idx) => {
        const rx = npcPositions[idx % npcPositions.length];
        npc.roomX = rx;
        const wantsToTalk = this.doesNpcWantToTalk(npc.id);
        return `
          <div class="world-avatar-token npc-token room-standing-token"
            style="left:${rx}%; top:54%;"
            title="${wantsToTalk ? `${npc.name} wants to talk to you! (❗💬)` : `Click to talk with ${npc.name} (💬)`}"
            onclick="World2D.clickNpcAvatar('${npc.id}', event)">
            <div class="npc-head-talk-badge ${wantsToTalk ? 'wants-to-talk' : 'normal-talk'}">${wantsToTalk ? '❗💬' : '💬'}</div>
            <div class="avatar-mini-bubble">${npc.quote}</div>
            <div class="token-fullbody-wrap">
              ${renderAvatarSVG(npc.avatar, npc.renderAge, 52)}
            </div>
            <span class="token-name-tag ${npc.isFamily ? 'family-tag' : 'friend-tag'}">${wantsToTalk ? '❗💬' : '💬'} ${npc.name}</span>
          </div>
        `;
      }).join('');

      const liveActionClass = this.liveAction ? `live-action-${this.liveAction.type}` : '';
      const roomPlayerHtml = `
        <div id="world-player-token" class="world-avatar-token player-token room-standing-token ${this.isMoving ? 'is-walking' : ''} ${liveActionClass}"
          style="left:${this.playerX}%; top:${this.playerY}%;">
          ${this.liveAction ? `<div class="live-action-bubble">${this.liveAction.emoji}</div>` : ''}
          <div class="token-fullbody-wrap player-fullbody">
            ${renderAvatarSVG(gameState.avatar, gameState.age, 54)}
          </div>
          <span class="token-name-tag you-tag">${gameState.name} (Age ${gameState.age})</span>
        </div>
      `;

      // Render all interactive furniture items for this specific place!
      window._currentSceneFurnitureActions = {};
      const furnitureHtml = sceneConfig.furniture.map((f, idx) => {
        const fnKey = `furn_${idx}`;
        window._currentSceneFurnitureActions[fnKey] = f.action;
        return `
          <div class="room-furniture-item"
            style="left:${f.x}%; top:${f.y}%;"
            onclick="event.stopPropagation(); if(window._currentSceneFurnitureActions['${fnKey}']) window._currentSceneFurnitureActions['${fnKey}']();"
            title="Click to use ${f.name}">
            ${f.svg}
            <span class="furniture-hover-pill">${f.name}</span>
          </div>
        `;
      }).join('');

      sq.innerHTML = `
        <!-- Top-Left Place / Room Name Badge -->
        <div class="side-room-badge" onclick="event.stopPropagation()">
          ${sceneConfig.title} (${isNight ? '🌙 Night' : '☀️ Day'})
        </div>

        <!-- Grey Ceiling Light Circle on Top Border -->
        <div class="room-ceiling-light"
          onclick="event.stopPropagation(); ${isNight ? 'sleepForEnergy()' : 'switchToNighttime()'}"
          title="${isNight ? 'Click to Sleep (+90% ⚡) & Wake Up in Daytime' : 'Click Light to Switch to Nighttime 🌙'}">
        </div>

        <!-- Place Backdrop (Windows, Rugs, Chalkboard, Awning, Ocean Tank, etc.) -->
        ${sceneConfig.backdrop || ''}

        <!-- Soft Grey Arched Door on the Wall (Sitting on the Floor Line!) -->
        <div class="room-arched-door"
          style="left:${sceneConfig.doorX || 54}%;"
          onclick="World2D.openDoorPlacesModal(event)"
          title="${gameState.isGrounded && gameState.groundedDays > 0 ? '🚫 You are Grounded! Click to Apologize or Clean Room' : 'Click Door to Go to Other Places!'}">
          <div class="door-inner-arch"></div>
          <div class="door-knob"></div>
          <span class="door-hover-label">${gameState.isGrounded && gameState.groundedDays > 0 ? '🚫 Grounded!' : '🚪 Places Door'}</span>
        </div>

        <!-- Custom Interactive Furniture for This Specific Place! -->
        ${furnitureHtml}

        ${roomNpcsHtml}
        ${roomPlayerHtml}
        ${gameState.isGrounded && gameState.groundedDays > 0 ? `
          <div class="live-action-top-banner" style="background:rgba(185,28,28,0.95);color:#FFFFFF;border:2px solid #FCA5A5;display:flex;align-items:center;gap:8px;padding:5px 12px;" onclick="event.stopPropagation()">
            <span>🚫 <strong>GROUNDED IN ROOM (${gameState.groundedDays}d left)!</strong></span>
            <button type="button" class="dialogue-close-x" style="background:#16A34A;" onclick="apologizeToUnGround()">🙏 Apologize to Mom</button>
            <button type="button" class="dialogue-close-x" style="background:#0284C7;" onclick="cleanRoomToUnGround()">🧹 Clean Room</button>
          </div>
        ` : ''}
        ${this.liveAction ? `<div class="live-action-top-banner">${this.liveAction.label}</div>` : ''}
        ${this.renderDialogueOverlayHTML()}
      `;
      this.renderZoneActionBar();
      return;
    }

    // Reset inline background when switching back to Town Map
    sq.style.background = '';

    // ==========================================
    // VIEW MODE 2: 2D TOWN SQUARE (16 MINIATURE BUILDINGS & VENUES)
    // ==========================================
    const playerHtml = `
      <div id="world-player-token" class="world-avatar-token player-token ${this.isMoving ? 'is-walking' : ''}"
        style="left:${this.playerX}%; top:${this.playerY}%;">
        <div class="token-you-pointer">▼ YOU</div>
        <div class="token-fullbody-wrap player-fullbody">
          ${renderAvatarSVG(gameState.avatar, gameState.age, 44)}
        </div>
        <span class="token-name-tag you-tag">${gameState.name} (${gameState.age})</span>
      </div>
    `;

    const skyOverlayHtml = isNight
      ? `
        <div class="world-sky-pill night-sky-pill" onclick="event.stopPropagation(); sleepForEnergy();" title="Click to Sleep through the Night (+90% Energy)">
          🌙 NIGHTTIME ✨ (Click to Sleep +90% ⚡)
        </div>
      `
      : `
        <div class="world-sky-pill day-sky-pill" onclick="event.stopPropagation(); switchToNighttime();" title="Click to switch to Nighttime">
          ☀️ DAYTIME ☁️ (Nap Only • Click for 🌙 Night)
        </div>
      `;

    const bestFriend = getTopFriend(gameState);
    const bfFirst = bestFriend ? bestFriend.name.split(' ')[0] : 'Bestie';
    const questPlaceIds = new Set(
      (gameState.activeQuests || [])
        .filter(q => !q.completed && !q.claimed && q.targetPlaceId)
        .map(q => q.targetPlaceId)
    );

    const placesHtml = places.map(p => {
      const unlocked = !p.isMystery && gameState.age >= p.unlockAge;
      const isQuestTarget = unlocked && questPlaceIds.has(p.id);
      const hasUpgradedHome = gameState.homeId && gameState.homeId !== 'family-room';
      const isCurrentHome =
        (hasUpgradedHome && p.id === gameState.homeId) ||
        (!hasUpgradedHome && gameState.livingWith === 'family' && p.id === 'family-home') ||
        (!hasUpgradedHome && gameState.livingWith === 'moved-out-16' && p.id === 'starter-loft') ||
        (!hasUpgradedHome && gameState.livingWith === 'best-friend' && p.id === 'best-friend-home');

      let displayTitle = p.name;
      if (p.id === 'best-friend-home' && bestFriend) {
        displayTitle = `${bfFirst}'s Home`;
      }

      const nightBg = unlocked && isNight ? '#2B3054' : (unlocked ? p.bg : '#E9ECEF');
      const nightBorder = unlocked && isNight ? '#FFD166' : (unlocked ? p.border : '#ADB5BD');
      const roofExtraClass = unlocked && p.roofStyle === 'awning' ? 'awning-roof-bar' : '';
      const enterTargetId = p.id === 'family-home' ? 'my-room' : p.id;

      return `
        <div class="world-place-box ${unlocked ? 'unlocked' : 'locked'} ${(isCurrentHome || p.isPlayerHome) ? 'current-home-glow' : ''} ${unlocked && isNight ? 'night-lit-building' : ''}"
          style="left:${p.x}%; top:${p.y}%; width:${p.w}%; height:${p.h}%; background:${nightBg}; border-color:${nightBorder}"
          onclick="World2D.walkToPlace('${p.id}')">
          <div class="place-roof-bar ${roofExtraClass}" style="background:${unlocked ? p.roof : '#868E96'}">
            <span>${p.icon} ${displayTitle}</span>
            ${isQuestTarget ? `<span class="home-star-tag" style="background:#A855F7;color:#FFF;" title="Active Quest Here!">🎯 Quest</span>` : ((isCurrentHome || p.isPlayerHome) ? `<span class="home-star-tag" onclick="event.stopPropagation(); World2D.enterRoom('${enterTargetId}');" title="Click to Enter Your Home!">🏠 Home</span>` : '')}
          </div>
          <div class="place-interior">
            ${unlocked ? `
              <div class="mini-building-facade">
                <span class="mini-window ${isNight ? 'lit' : ''}"></span>
                <div class="place-decor-row">
                  ${p.decor.slice(0, 2).map(d => `<span>${d}</span>`).join('')}
                </div>
                <span class="mini-door" style="background:${p.roof}"></span>
              </div>
              ${isNight ? `<span class="night-window-lamp" title="Cozy Night Lights">🕯️</span>` : ''}
            ` : `
              <div class="place-lock-overlay">
                <span class="lock-icon">${p.isMystery ? '🎲' : '🔒'}</span>
                <strong>${p.isMystery ? 'Age 7+ Random' : `Age ${p.unlockAge}`}</strong>
              </div>
            `}
          </div>
        </div>
      `;
    }).join('');

    const npcsHtml = this.npcs.map(npc => {
      const place = places.find(p => p.id === npc.placeId);
      if (place && (place.isMystery || gameState.age < place.unlockAge)) return '';
      const wantsToTalk = this.doesNpcWantToTalk(npc.id);
      return `
        <div class="world-avatar-token npc-token"
          style="left:${npc.x}%; top:${npc.y}%;"
          title="${wantsToTalk ? `${npc.name} wants to talk to you! (❗💬)` : `Click to talk with ${npc.name} (💬)`}"
          onclick="World2D.clickNpcAvatar('${npc.id}', event)">
          <div class="npc-head-talk-badge ${wantsToTalk ? 'wants-to-talk' : 'normal-talk'}">${wantsToTalk ? '❗💬' : '💬'}</div>
          <div class="avatar-mini-bubble">${npc.quote}</div>
          <div class="token-fullbody-wrap">
            ${renderAvatarSVG(npc.avatar, npc.renderAge, 40)}
          </div>
          <span class="token-name-tag ${npc.isFamily ? 'family-tag' : 'friend-tag'}">${wantsToTalk ? '❗💬' : '💬'} ${npc.name}</span>
        </div>
      `;
    }).join('');

    const nightStarsHtml = isNight ? `
      <div class="night-stars-layer">
        <span style="left:26%;top:5%">✨</span>
        <span style="left:50%;top:4%">⭐</span>
        <span style="left:74%;top:6%">🌟</span>
        <span style="left:26%;top:25%">🏮</span>
        <span style="left:50%;top:25%">🏮</span>
        <span style="left:74%;top:25%">🏮</span>
        <span style="left:26%;top:49%">🏮</span>
        <span style="left:50%;top:49%">🏮</span>
        <span style="left:74%;top:49%">🏮</span>
        <span style="left:26%;top:73%">🏮</span>
        <span style="left:50%;top:73%">🏮</span>
        <span style="left:74%;top:73%">🏮</span>
      </div>
    ` : '';

    sq.innerHTML = `
      <div class="world-road-h" style="top:24%;height:4%;"></div>
      <div class="world-road-h" style="top:48%;height:4%;"></div>
      <div class="world-road-h" style="top:72%;height:4%;"></div>
      <div class="world-road-v" style="left:24%;width:4%;"></div>
      <div class="world-road-v" style="left:48%;width:4%;"></div>
      <div class="world-road-v" style="left:72%;width:4%;"></div>
      ${skyOverlayHtml}
      ${nightStarsHtml}
      ${placesHtml}
      ${npcsHtml}
      ${playerHtml}
      ${this.renderDialogueOverlayHTML()}
    `;

    this.renderZoneActionBar();
  },

  renderZoneActionBar() {
    const bar = document.getElementById('world-zone-bar');
    if (!bar || !gameState) return;

    if (this.viewMode === 'room') {
      const places = getActiveWorldPlaces(gameState);
      const currentPlace = places.find(p => p.id === this.currentRoomId);
      const sceneConfig = getPlaceSceneConfig(this.currentRoomId, gameState.timeOfDay === 'night');

      bar.innerHTML = `
        <div class="zone-bar-info">
          <strong>Inside: ${sceneConfig.title}</strong>
          <small>${currentPlace ? currentPlace.desc : 'Click any furniture item in your room, talk to Mom, or click the Grey Door to travel!'}</small>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="zone-action-btn" style="background:linear-gradient(135deg,#F59E0B,#D97706);" onclick="World2D.openDialogueWith('mom', 'answer')">
            ${this.doesNpcWantToTalk('mom') ? '❗💬' : '💬'} Talk to Mom
          </button>
          <button class="zone-action-btn" style="background:linear-gradient(135deg,#8B5CF6,#6D28D9);" onclick="World2D.openDialogueWith('mom', 'ask')">
            🙋 Ask Mom
          </button>
          <button class="zone-action-btn" style="background:linear-gradient(135deg,#EF4444,#DC2626);" onclick="World2D.openStationView('bag')">
            🎒 Pack Bag (${Array.isArray(gameState.packedBag) ? gameState.packedBag.length : 3}/6)
          </button>
          <button class="zone-action-btn" style="background:linear-gradient(135deg,#0284C7,#0369A1);" onclick="World2D.openStationView('schedule')">
            📅 Schedule
          </button>
          <button class="zone-action-btn" style="background:linear-gradient(135deg,#7C3AED,#4F46E5);" onclick="World2D.openStationView('decisions')">
            🧭 Decisions
          </button>
          ${this.currentRoomId !== 'my-room' ? `
            <button class="zone-action-btn" onclick="triggerPlaceAction('${this.currentRoomId}')">
              🎯 ${currentPlace ? currentPlace.name : 'Place'} Choices
            </button>
          ` : `
            <button class="zone-action-btn" style="background:linear-gradient(135deg,#059669,#10B981);" onclick="openFurnitureShopModal()">
              🪑 Room Furniture
            </button>
          `}
          <button class="zone-action-btn" onclick="World2D.openDoorPlacesModal()">
            🚪 Door (All Places)
          </button>
          <button class="zone-action-btn" style="background:linear-gradient(135deg,#3A0CA3,#4361EE);" onclick="World2D.switchView('town')">
            🗺️ Full Map
          </button>
        </div>
      `;
      return;
    }

    const places = getActiveWorldPlaces(gameState);
    const place = places.find(p => p.id === this.activeZoneId);
    if (!place) {
      bar.innerHTML = `
        <div class="zone-bar-info">
          <span>🚶 Walking around <strong>${gameState.hometown.name}</strong></span>
          <small>Use <strong>WASD / Arrow Keys</strong> or click any <strong>Building / Place</strong> to go inside!</small>
        </div>
        <button class="zone-action-btn" onclick="World2D.enterRoom('my-room')">
          🛏️ Enter My Room
        </button>
      `;
      return;
    }

    bar.innerHTML = `
      <div class="zone-bar-info">
        <strong>${place.icon} Outside: ${place.name}</strong>
        <small>${place.desc}</small>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="zone-action-btn" style="background:linear-gradient(135deg,#7209B7,#4361EE);" onclick="World2D.enterRoom('${place.id}')">
          🚪 Go Inside ${place.name}
        </button>
        <button class="zone-action-btn" onclick="triggerPlaceAction('${place.id}')">
          🎯 Choices (${place.name})
        </button>
      </div>
    `;
  }
};
