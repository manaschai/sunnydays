// Dynamic Character Avatar Generator for SunnyDays: A Wholesome Life Sim
// Supports Gender (Girl / Boy), Outfit Styles, Hair Styles, Accessories, and Aging (0 to 90+)!

const AVATAR_PALETTE = {
  genders: [
    { id: 'girl', name: 'Girl', icon: '👧', defaultHair: 'long-wave', defaultOutfit: 'cardigan' },
    { id: 'boy', name: 'Boy', icon: '👦', defaultHair: 'short-part', defaultOutfit: 'hoodie' }
  ],
  skinTones: [
    { id: 'warm-light', name: 'Peach', fill: '#FFDFC4', shadow: '#F0C4A2', blush: '#FFB6A3' },
    { id: 'fair-rose', name: 'Rosy Fair', fill: '#F7D5BA', shadow: '#E5B898', blush: '#F4978E' },
    { id: 'golden-tan', name: 'Golden Honey', fill: '#E5B887', shadow: '#CE9B66', blush: '#D98A6C' },
    { id: 'olive', name: 'Warm Olive', fill: '#C99768', shadow: '#B07D4F', blush: '#B86F52' },
    { id: 'caramel', name: 'Caramel', fill: '#A86E44', shadow: '#8C5630', blush: '#8F4B32' },
    { id: 'deep-umber', name: 'Rich Cocoa', fill: '#6E4228', shadow: '#54301B', blush: '#5A2B18' }
  ],
  hairColors: [
    { id: 'espresso', name: 'Espresso Brown', fill: '#3B2314', highlight: '#5A3822' },
    { id: 'chestnut', name: 'Chestnut', fill: '#6E3B1F', highlight: '#8F512F' },
    { id: 'golden', name: 'Sunny Blonde', fill: '#E6B84D', highlight: '#F5D076' },
    { id: 'strawberry', name: 'Ginger Copper', fill: '#C85A32', highlight: '#E0764F' },
    { id: 'midnight', name: 'Midnight Black', fill: '#1F242D', highlight: '#3A4252' },
    { id: 'lavender', name: 'Pastel Berry', fill: '#8B5FBF', highlight: '#A87TD8' },
    { id: 'teal', name: 'Ocean Mint', fill: '#2B8A7E', highlight: '#45ABA0' }
  ],
  hairStyles: [
    { id: 'short-part', name: 'Classic Side Part' },
    { id: 'spiky', name: 'Breezy Spikes' },
    { id: 'fluffy', name: 'Fluffy Tuft' },
    { id: 'curly', name: 'Cloud Curls' },
    { id: 'bob', name: 'Cozy Bob' },
    { id: 'long-wave', name: 'Sunny Waves' },
    { id: 'ponytail', name: 'High Ponytail' },
    { id: 'pigtails', name: 'Twin Puffs' }
  ],
  outfitStyles: [
    { id: 'hoodie', name: 'Cozy Hoodie' },
    { id: 'overalls', name: 'Denim Overalls' },
    { id: 'varsity', name: 'Varsity Jacket' },
    { id: 'cardigan', name: 'Preppy Cardigan' },
    { id: 'sundress', name: 'Collared Tunic / Dress' }
  ],
  shirtColors: [
    { id: 'coral', name: 'Coral Red', fill: '#FF6B6B', accent: '#FFE66D', dark: '#D94E4E' },
    { id: 'sky', name: 'Sky Blue', fill: '#4EA8DE', accent: '#FFFFFF', dark: '#2E82B8' },
    { id: 'mint', name: 'Meadow Mint', fill: '#52B788', accent: '#D8F3DC', dark: '#379268' },
    { id: 'sunflower', name: 'Sunflower', fill: '#F4A261', accent: '#FFF3D6', dark: '#D68240' },
    { id: 'lavender', name: 'Lilac Purple', fill: '#9B5DE5', accent: '#FEE440', dark: '#7A3EC4' },
    { id: 'berry', name: 'Strawberry Pink', fill: '#F15BB5', accent: '#FFFFFF', dark: '#CC3992' }
  ],
  accessories: [
    { id: 'none', name: 'None' },
    { id: 'round-glasses', name: 'Round Glasses' },
    { id: 'star-clip', name: 'Star Hairpin' },
    { id: 'ribbon-bow', name: 'Cute Ribbon Bow' },
    { id: 'cap', name: 'Sporty Cap' },
    { id: 'headphones', name: 'Neck Headphones' },
    { id: 'freckles', name: 'Sunny Freckles' }
  ]
};

function getLifeStageInfo(age) {
  if (age <= 3) return { id: 'toddler', label: 'Little Sprout', bg1: '#FFF6D6', bg2: '#FFE4A3', scale: 0.88 };
  if (age <= 10) return { id: 'child', label: 'Elementary Kid', bg1: '#E6F7FF', bg2: '#BFE8FF', scale: 0.90 };
  if (age <= 13) return { id: 'preteen', label: 'Middle Schooler', bg1: '#E9F9EC', bg2: '#C2F0CC', scale: 0.91 };
  if (age <= 17) return { id: 'teen', label: 'High Schooler', bg1: '#F4EBFF', bg2: '#DEC4FF', scale: 0.92 };
  if (age <= 24) return { id: 'young-adult', label: 'Young Adult', bg1: '#FFEBF2', bg2: '#FFC9DE', scale: 0.92 };
  if (age <= 59) return { id: 'adult', label: 'Adult', bg1: '#E6F7F4', bg2: '#BCECE3', scale: 0.92 };
  return { id: 'senior', label: 'Golden Years', bg1: '#FFF5E4', bg2: '#F9DEC0', scale: 0.91 };
}

function renderAvatarSVG(config, age = 8, size = 130) {
  const gender = config.gender || 'girl';
  const isGirl = gender === 'girl';
  const skinObj = AVATAR_PALETTE.skinTones.find(s => s.id === config.skin) || AVATAR_PALETTE.skinTones[0];
  const hairColorObj = AVATAR_PALETTE.hairColors.find(h => h.id === config.hairColor) || AVATAR_PALETTE.hairColors[0];
  const shirtObj = AVATAR_PALETTE.shirtColors.find(s => s.id === config.shirt) || AVATAR_PALETTE.shirtColors[0];
  const styleId = config.hairStyle || (isGirl ? 'long-wave' : 'short-part');
  const outfitId = config.outfit || (isGirl ? 'cardigan' : 'hoodie');
  const accessory = config.accessory || 'none';
  const stage = getLifeStageInfo(age);

  // Silver hair blend in senior years
  const hairFill = age >= 62 ? '#DCE4EC' : (age >= 52 ? '#93A1B5' : hairColorObj.fill);
  const hairHi = age >= 52 ? '#F1F5F9' : (hairColorObj.highlight || '#5A3822');
  const isToddler = age <= 3;
  const isSenior = age >= 60;
  const uid = Math.random().toString(36).substring(2, 8);

  // Natural Full-Body Proportions (inspired by the reference illustration!)
  // Head center: (60, 42), Torso: y=62..106, Tapered Legs: y=104..150, Shoes: y=147..162
  const pantsFill = outfitId === 'overalls'
    ? '#5B8BD0'
    : (isGirl ? '#C8B6FF' : '#64748B');
  const pantsShadow = outfitId === 'overalls'
    ? '#3B6E9C'
    : (isGirl ? '#A78BFA' : '#475569');
  const shoeFill = '#29B6F6'; // Vibrant sky-blue shoes like the reference drawing!
  const shoeDark = '#0288D1';

  // Ultra-subtle line color so outlines are soft and barely visible
  const softLine = 'rgba(43, 45, 66, 0.15)';
  const faintSeam = 'rgba(43, 45, 66, 0.18)';

  // 1. Flowing Hair Back Silhouette (Draping naturally behind head, shoulders & torso)
  let hairBack = '';
  if (!isToddler) {
    if (styleId === 'long-wave' || (isGirl && styleId !== 'bob' && styleId !== 'ponytail' && styleId !== 'pigtails' && styleId !== 'curly')) {
      hairBack = `
        <!-- Voluminous Flowing Long Hair Behind Shoulders & Torso -->
        <path d="M40,28 C25,40 24,72 34,94 C39,104 42,112 44,116 L76,116 C82,102 85,78 81,52 C79,36 72,26 60,24 Z"
          fill="${hairFill}" stroke="${softLine}" stroke-width="0.7" stroke-linejoin="round"/>
        <path d="M33,52 C29,70 33,88 41,104" stroke="${hairHi}" stroke-width="2" fill="none" opacity="0.3" stroke-linecap="round"/>
        <path d="M77,54 C80,74 78,94 73,110" stroke="${hairHi}" stroke-width="2" fill="none" opacity="0.3" stroke-linecap="round"/>
      `;
    } else if (styleId === 'bob') {
      hairBack = `
        <path d="M39,30 C29,42 30,66 39,72 L81,72 C88,65 89,42 79,30 Z"
          fill="${hairFill}" stroke="${softLine}" stroke-width="0.7"/>
      `;
    } else if (styleId === 'ponytail') {
      hairBack = `
        <path d="M72,32 C88,28 96,52 86,82 C79,74 76,56 71,44 Z"
          fill="${hairFill}" stroke="${softLine}" stroke-width="0.7"/>
        <circle cx="73" cy="36" r="4.5" fill="${shirtObj.accent}"/>
      `;
    } else if (styleId === 'pigtails') {
      hairBack = `
        <path d="M40,34 C22,36 18,64 28,86 C35,76 38,56 41,44 Z" fill="${hairFill}" stroke="${softLine}" stroke-width="0.7"/>
        <path d="M80,34 C98,36 102,64 92,86 C85,76 82,56 79,44 Z" fill="${hairFill}" stroke="${softLine}" stroke-width="0.7"/>
      `;
    } else if (styleId === 'curly') {
      hairBack = `
        <circle cx="38" cy="44" r="13" fill="${hairFill}"/>
        <circle cx="82" cy="44" r="13" fill="${hairFill}"/>
        <circle cx="36" cy="62" r="12" fill="${hairFill}"/>
        <circle cx="84" cy="62" r="12" fill="${hairFill}"/>
        <circle cx="40" cy="78" r="11" fill="${hairFill}"/>
        <circle cx="80" cy="78" r="11" fill="${hairFill}"/>
      `;
    }
  }

  // 2. Natural Arms & Hands Relaxed Downwards at Sides
  const topFill = isGirl && config.shirt === 'coral' ? '#FF9EBB' : shirtObj.fill;
  const naturalArmsSVG = `
    <!-- Left Arm & Hand Down -->
    <path d="M47,66 C41,73 38,84 38,95 C38,99 43,99 44,95 C45,86 47,77 50,70 Z"
      fill="${skinObj.fill}" stroke="${softLine}" stroke-width="0.7" stroke-linejoin="round"/>
    <path d="M48,65 C42,71 39,79 39,85 L45,86 C46,80 48,74 51,69 Z"
      fill="${topFill}" stroke="${softLine}" stroke-width="0.6" stroke-linejoin="round"/>
    <ellipse cx="41" cy="96.5" rx="3.4" ry="4" fill="${skinObj.fill}" stroke="${softLine}" stroke-width="0.6"/>

    <!-- Right Arm & Hand Down -->
    <path d="M71,66 C77,73 80,84 80,95 C80,99 75,99 74,95 C73,86 71,77 68,70 Z"
      fill="${skinObj.fill}" stroke="${softLine}" stroke-width="0.7" stroke-linejoin="round"/>
    <path d="M70,65 C76,71 79,79 79,85 L73,86 C72,80 70,74 67,69 Z"
      fill="${topFill}" stroke="${softLine}" stroke-width="0.6" stroke-linejoin="round"/>
    <ellipse cx="77" cy="96.5" rx="3.4" ry="4" fill="${skinObj.fill}" stroke="${softLine}" stroke-width="0.6"/>
  `;

  // 3. Natural Long Tapered Legs & Rounded Sky-Blue Shoes
  let legsAndShoesSVG = '';
  if (isToddler) {
    legsAndShoesSVG = `
      <g class="svg-leg-left">
        <path d="M49,103 L58,103 L57,138 L49,138 Z" fill="${pantsFill}" stroke="${softLine}" stroke-width="0.7"/>
        <ellipse cx="53" cy="143" rx="5.5" ry="7.5" fill="${shoeFill}" stroke="${softLine}" stroke-width="0.7"/>
      </g>
      <g class="svg-leg-right">
        <path d="M61,103 L70,103 L72,138 L64,138 Z" fill="${pantsFill}" stroke="${softLine}" stroke-width="0.7"/>
        <ellipse cx="68" cy="143" rx="5.5" ry="7.5" fill="${shoeFill}" stroke="${softLine}" stroke-width="0.7"/>
      </g>
    `;
  } else if (outfitId === 'sundress') {
    legsAndShoesSVG = `
      <g class="svg-leg-left">
        <path d="M49,104 L58,104 L57,147 L50,147 Z" fill="${skinObj.fill}" stroke="${softLine}" stroke-width="0.7"/>
        <path d="M50,145 C48,153 49,160 53.5,160 C58,160 58,153 57,145 Z" fill="${shoeFill}" stroke="${softLine}" stroke-width="0.7"/>
      </g>
      <g class="svg-leg-right">
        <path d="M61,104 L70,104 L74,147 L66,147 Z" fill="${skinObj.fill}" stroke="${softLine}" stroke-width="0.7"/>
        <path d="M66,145 C66,153 68,160 72,160 C76,160 76,152 74,145 Z" fill="${shoeFill}" stroke="${softLine}" stroke-width="0.7"/>
      </g>
      <!-- Flared Skirt Over Hips -->
      <path d="M43,96 Q60,100 77,96 L81,116 Q60,121 39,116 Z" fill="${shirtObj.dark}" stroke="${softLine}" stroke-width="0.7"/>
    `;
  } else {
    // Natural Tapered Pants/Trousers & Rounded Sky-Blue Shoes (with subtle, barely-visible lines!)
    legsAndShoesSVG = `
      <!-- Left Leg & Shoe -->
      <g class="svg-leg-left">
        <path d="M46,101 L59,102 L58,146 L49,146 Z"
          fill="${pantsFill}" stroke="${softLine}" stroke-width="0.7" stroke-linejoin="round"/>
        <line x1="52" y1="106" x2="52" y2="142" stroke="#FFFFFF" stroke-width="1.2" opacity="0.25" stroke-linecap="round"/>
        <path d="M49,145 C47,153 48,160 53.5,160 C58.5,160 59,153 58,145 Z"
          fill="${shoeFill}" stroke="${softLine}" stroke-width="0.7"/>
        <ellipse cx="52.5" cy="151" rx="2" ry="3.5" fill="#FFFFFF" opacity="0.35"/>
      </g>

      <!-- Right Leg & Shoe -->
      <g class="svg-leg-right">
        <path d="M60,102 L73,100 L76,145 L67,146 Z"
          fill="${pantsFill}" stroke="${softLine}" stroke-width="0.7" stroke-linejoin="round"/>
        <line x1="66" y1="106" x2="70" y2="141" stroke="${pantsShadow}" stroke-width="1.2" opacity="0.25" stroke-linecap="round"/>
        <path d="M67,145 C67,153 69,161 74,160 C78.5,159 78,152 76,144 Z"
          fill="${shoeFill}" stroke="${softLine}" stroke-width="0.7"/>
        <ellipse cx="71.5" cy="151" rx="2" ry="3.5" fill="#FFFFFF" opacity="0.35"/>
      </g>
    `;
  }

  // 4. Natural Rounded Torso / Top (with faint, subtle seam lines)
  let torsoSVG = '';
  if (outfitId === 'overalls') {
    torsoSVG = `
      <path d="M51,64 C43,70 41,86 44,102 Q60,107 75,101 C78,86 75,70 68,64 Q60,61 51,64 Z"
        fill="${topFill}" stroke="${softLine}" stroke-width="0.7"/>
      <path d="M48,74 L71,74 L73,102 Q60,106 46,102 Z" fill="#467FAF" stroke="${softLine}" stroke-width="0.7"/>
      <line x1="51" y1="65" x2="51" y2="75" stroke="#467FAF" stroke-width="4"/>
      <line x1="68" y1="65" x2="68" y2="75" stroke="#467FAF" stroke-width="4"/>
      <circle cx="51" cy="77" r="2" fill="#FFD166"/>
      <circle cx="68" cy="77" r="2" fill="#FFD166"/>
    `;
  } else if (outfitId === 'varsity') {
    torsoSVG = `
      <path d="M51,64 C43,70 41,86 44,102 Q60,107 75,101 C78,86 75,70 68,64 Q60,61 51,64 Z"
        fill="${topFill}" stroke="${softLine}" stroke-width="0.7"/>
      <path d="M54,64 L65,64 L64,104 L55,104 Z" fill="#FFFFFF" stroke="${softLine}" stroke-width="0.6"/>
      <path d="M51,64 L60,74 L68,64" fill="none" stroke="${shirtObj.accent}" stroke-width="2"/>
    `;
  } else {
    torsoSVG = `
      <path d="M51,64 C42,71 40,87 44,102 Q60,108 75,101 C79,86 76,70 68,64 Q60,61 51,64 Z"
        fill="url(#topGrad_${uid})" stroke="${softLine}" stroke-width="0.7" stroke-linejoin="round"/>
      <!-- Faint, Subtle Center Seam & Lapel Detail -->
      <path d="M59,64 Q58,84 57,104" stroke="${faintSeam}" stroke-width="0.9" fill="none" stroke-linecap="round"/>
      <path d="M58,66 L49,84 L55,89" fill="none" stroke="${faintSeam}" stroke-width="0.85" stroke-linejoin="round"/>
      <ellipse cx="66" cy="82" rx="4.5" ry="10" fill="#FFFFFF" opacity="0.18"/>
    `;
  }

  // 5. Expressive Natural Face, Eyes & Soft Warm Smile
  const eyesAndSmileSVG = `
    <!-- Soft Rosy Cheeks -->
    <ellipse cx="50" cy="46" rx="4.2" ry="2.4" fill="${skinObj.blush}" opacity="0.55"/>
    <ellipse cx="70" cy="46" rx="4.2" ry="2.4" fill="${skinObj.blush}" opacity="0.55"/>

    <!-- Expressive Eyes -->
    ${isGirl ? `
      <path d="M47,39 Q45,37 44,35.5" stroke="rgba(31,36,45,0.65)" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M73,39 Q75,37 76,35.5" stroke="rgba(31,36,45,0.65)" stroke-width="1.1" stroke-linecap="round"/>
    ` : ''}
    <circle cx="52" cy="40" r="2.4" fill="#2B2D42"/>
    <circle cx="68" cy="40" r="2.4" fill="#2B2D42"/>
    <circle cx="52.8" cy="39.1" r="0.9" fill="#FFFFFF"/>
    <circle cx="68.8" cy="39.1" r="0.9" fill="#FFFFFF"/>

    <!-- Brows -->
    <path d="M48,34 Q52,32 56,34" stroke="${hairFill}" stroke-width="1.3" fill="none" opacity="0.75" stroke-linecap="round"/>
    <path d="M64,34 Q68,32 72,34" stroke="${hairFill}" stroke-width="1.3" fill="none" opacity="0.75" stroke-linecap="round"/>

    <!-- Cute Subtle Nose -->
    <circle cx="60" cy="43.5" r="0.9" fill="${skinObj.shadow}" opacity="0.75"/>

    <!-- Soft Curved Smile -->
    <path d="M52,48.5 Q60,54.5 68,48.5" stroke="rgba(43,45,66,0.55)" stroke-width="1.3" fill="none" stroke-linecap="round"/>
  `;

  // 6. Natural Hair Crown & Bangs Framing the Forehead
  let hairFront = '';
  if (isToddler) {
    hairFront = `
      <path d="M53,22 Q60,13 67,22" fill="none" stroke="${hairFill}" stroke-width="3.5" stroke-linecap="round"/>
    `;
  } else if (styleId === 'spiky') {
    hairFront = `
      <path d="M39,37 L43,21 L52,26 L60,15 L68,25 L77,19 L81,37 C72,28 48,28 39,37 Z"
        fill="${hairFill}" stroke="${softLine}" stroke-width="0.7" stroke-linejoin="round"/>
    `;
  } else {
    hairFront = `
      <path d="M39,38 C39,21 48,17 60,17 C72,17 81,21 81,38 C76,30 71,27 67,33 C64,27 59,25 54,31 C49,26 44,29 39,38 Z"
        fill="${hairFill}" stroke="${softLine}" stroke-width="0.7" stroke-linejoin="round"/>
      <path d="M47,23 Q60,19 72,24" stroke="${hairHi}" stroke-width="2" fill="none" opacity="0.35" stroke-linecap="round"/>
    `;
  }

  // 7. Accessories (Glasses, Star Clip, Ribbon, Cap, Headphones, Freckles)
  let extras = '';
  if (accessory === 'round-glasses' || isSenior) {
    extras += `
      <g stroke="rgba(43,45,66,0.55)" stroke-width="1.3" fill="rgba(255,255,255,0.22)">
        <circle cx="52" cy="40" r="6"/>
        <circle cx="68" cy="40" r="6"/>
        <line x1="58" y1="40" x2="62" y2="40"/>
      </g>
    `;
  }
  if (accessory === 'star-clip' && !isToddler) {
    extras += `<polygon points="73,24 75,28 79,28 76,30 77,34 73,32 69,34 70,30 67,28 71,28" fill="#FFD166"/>`;
  }
  if (accessory === 'ribbon-bow' && !isToddler) {
    extras += `
      <g transform="translate(73, 25) rotate(12)">
        <polygon points="0,0 -7,-5 -6,4" fill="#FF5D8F"/>
        <polygon points="0,0 7,-5 6,4" fill="#FF5D8F"/>
        <circle cx="0" cy="0" r="2.2" fill="#FFCAD4"/>
      </g>
    `;
  }
  if (accessory === 'cap' && !isToddler) {
    extras += `
      <path d="M39,31 C40,17 49,14 60,14 C71,14 80,17 81,31 Z" fill="${shirtObj.fill}"/>
      <path d="M38,30 Q60,26 88,32 Q74,35 38,30 Z" fill="${shirtObj.dark}"/>
    `;
  }
  if (accessory === 'headphones' && !isToddler) {
    extras += `
      <path d="M40,38 C40,18 80,18 80,38" fill="none" stroke="#2B2D42" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="40" cy="41" rx="4.5" ry="6.5" fill="#29B6F6"/>
      <ellipse cx="80" cy="41" rx="4.5" ry="6.5" fill="#29B6F6"/>
    `;
  }
  if (accessory === 'freckles') {
    extras += `
      <g fill="#7F4F24" opacity="0.45">
        <circle cx="48" cy="45" r="0.9"/><circle cx="51" cy="46.5" r="0.9"/>
        <circle cx="69" cy="46.5" r="0.9"/><circle cx="72" cy="45" r="0.9"/>
      </g>
    `;
  }

  const isMapSprite = size <= 54;
  const svgHeight = Math.round(size * 1.38);

  return `
    <svg width="${size}" height="${svgHeight}" viewBox="0 0 120 172" xmlns="http://www.w3.org/2000/svg" class="avatar-svg ${isMapSprite ? 'avatar-map-sprite' : ''}">
      <defs>
        <linearGradient id="topGrad_${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${topFill}"/>
          <stop offset="100%" stop-color="${shirtObj.fill}"/>
        </linearGradient>
        <clipPath id="stageClip_${uid}">
          <rect x="4" y="4" width="112" height="164" rx="18"/>
        </clipPath>
      </defs>

      ${isMapSprite ? `
        <!-- Soft Ground Shadow on 2D Map -->
        <ellipse cx="62" cy="159" rx="20" ry="4.5" fill="rgba(0,0,0,0.16)"/>
      ` : `
        <!-- Cozy Room Stage Backdrop (Cream Wall + Golden Amber Floor, with soft subtle lines!) -->
        <g clip-path="url(#stageClip_${uid})">
          <rect x="4" y="4" width="112" height="124" fill="#EFE4B8"/>
          <rect x="4" y="128" width="112" height="40" fill="#FFC000"/>
          <line x1="4" y1="128" x2="116" y2="128" stroke="rgba(43,45,66,0.18)" stroke-width="1.2"/>
          <ellipse cx="62" cy="158" rx="22" ry="4.5" fill="rgba(0,0,0,0.1)"/>
        </g>
      `}

      <!-- Natural Full-Body Character (Hands Down & Soft Barely-Visible Outlines) -->
      <g transform="translate(60, 148) scale(${stage.scale}) translate(-60, -148)">
        <!-- 1. Flowing Hair Back -->
        ${hairBack}

        <!-- 2. Slender Neck -->
        <rect x="55" y="54" width="10" height="12" rx="4" fill="${skinObj.fill}" stroke="${softLine}" stroke-width="0.6"/>

        <!-- 3. Long Tapered Legs & Sky-Blue Shoes -->
        ${legsAndShoesSVG}

        <!-- 4. Natural Arms & Hands Down at Sides -->
        ${naturalArmsSVG}

        <!-- 5. Natural Rounded Torso / Jacket -->
        ${torsoSVG}

        <!-- 6. Natural Rounded Head & Face -->
        <ellipse cx="60" cy="40" rx="19" ry="18.5" fill="${skinObj.fill}" stroke="${softLine}" stroke-width="0.7"/>

        <!-- 7. Eyes, Cheeks & Happy Smile -->
        ${eyesAndSmileSVG}

        <!-- 8. Hair Crown & Bangs -->
        ${hairFront}

        <!-- 9. Accessories -->
        ${extras}
      </g>

      ${isMapSprite ? '' : `
        <rect x="4" y="4" width="112" height="164" rx="18" fill="none" stroke="rgba(43,45,66,0.16)" stroke-width="1.2"/>
      `}
    </svg>
  `;
}
