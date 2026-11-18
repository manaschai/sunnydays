// SunnyDays: A Wholesome Year-by-Year Life & Friendship Simulator
// Core Game Engine & UI Controller

let gameState = null;

// Cozy Web Audio Synthesizer (zero external audio files needed)
const SoundFX = {
  ctx: null,
  enabled: true,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  playTone(freqs, duration = 0.12, type = 'sine') {
    if (!this.enabled) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      freqs.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + i * duration);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime + i * duration);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (i + 1) * duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * duration);
        osc.stop(this.ctx.currentTime + (i + 1) * duration);
      });
    } catch (e) {
      // Ignore audio errors if blocked by browser autoplay policy
    }
  },
  pop() { this.playTone([523.25, 659.25], 0.08, 'triangle'); },
  ageUp() { this.playTone([440, 554.37, 659.25, 880], 0.1, 'sine'); },
  milestone() { this.playTone([523.25, 659.25, 783.99, 1046.5], 0.13, 'triangle'); },
  friend() { this.playTone([587.33, 739.99, 880], 0.1, 'sine'); }
};

// Default Creator State
const creatorConfig = {
  name: 'Sunny',
  previewAge: 8,
  hometownId: 'maple-creek',
  traitId: 'kindhearted',
  avatar: {
    gender: 'girl',
    skin: 'warm-light',
    hairColor: 'chestnut',
    hairStyle: 'long-wave',
    outfit: 'cardigan',
    shirt: 'coral',
    accessory: 'star-clip'
  }
};

function initApp() {
  renderCreatorScreen();
  const saved = localStorage.getItem('sunnydays_save_v1');
  const continueBtn = document.getElementById('btn-continue-saved');
  if (saved && continueBtn) {
    try {
      const parsed = JSON.parse(saved);
      const pill = document.getElementById('save-status-pill');
      if (pill && parsed && parsed.name) {
        pill.textContent = `✓ Saved (${parsed.name}, Age ${parsed.age})`;
      }
    } catch (e) {}
    continueBtn.classList.remove('hidden');
    continueBtn.onclick = () => {
      try {
        gameState = JSON.parse(saved);
        if (!gameState.avatar.gender) gameState.avatar.gender = 'girl';
        if (!gameState.avatar.outfit) gameState.avatar.outfit = 'cardigan';
        startGameDashboard();
      } catch (e) {
        console.error('Could not load save:', e);
      }
    };
  }
}

function renderCreatorScreen() {
  const previewEl = document.getElementById('creator-avatar-preview');
  if (previewEl) {
    previewEl.innerHTML = renderAvatarSVG(creatorConfig.avatar, creatorConfig.previewAge, 150);
  }

  // Render Age Preview Stage Switcher
  const ageBar = document.getElementById('creator-age-preview-bar');
  if (ageBar) {
    const previewStages = [
      { age: 2, label: '👶 Toddler' },
      { age: 8, label: '🎒 Kid' },
      { age: 16, label: '🎧 Teen' },
      { age: 28, label: '🌟 Adult' },
      { age: 68, label: '🌅 Senior' }
    ];
    ageBar.innerHTML = previewStages.map(ps => `
      <button type="button" class="age-preview-chip ${creatorConfig.previewAge === ps.age ? 'active' : ''}"
        onclick="setCreatorPreviewAge(${ps.age})">${ps.label}</button>
    `).join('');
  }

  // Render Gender Toggle
  const genderContainer = document.getElementById('creator-gender-options');
  if (genderContainer) {
    genderContainer.innerHTML = AVATAR_PALETTE.genders.map(g => `
      <button type="button" class="gender-btn ${creatorConfig.avatar.gender === g.id ? 'active' : ''}"
        onclick="selectCreatorGender('${g.id}')">
        <span class="gender-icon">${g.icon}</span>
        <span>${g.name}</span>
      </button>
    `).join('');
  }

  const nameInput = document.getElementById('creator-name-input');
  if (nameInput && document.activeElement !== nameInput) {
    nameInput.value = creatorConfig.name;
  }

  // Render Skin Swatches
  const skinContainer = document.getElementById('creator-skin-options');
  skinContainer.innerHTML = AVATAR_PALETTE.skinTones.map(s => `
    <button type="button" class="swatch-btn ${creatorConfig.avatar.skin === s.id ? 'active' : ''}"
      style="background:${s.fill}" title="${s.name}"
      onclick="updateCreatorAvatar('skin', '${s.id}')"></button>
  `).join('');

  // Render Hair Color Swatches
  const hairColorContainer = document.getElementById('creator-hair-color-options');
  hairColorContainer.innerHTML = AVATAR_PALETTE.hairColors.map(h => `
    <button type="button" class="swatch-btn ${creatorConfig.avatar.hairColor === h.id ? 'active' : ''}"
      style="background:${h.fill}" title="${h.name}"
      onclick="updateCreatorAvatar('hairColor', '${h.id}')"></button>
  `).join('');

  // Render Hair Styles
  const hairStyleContainer = document.getElementById('creator-hair-style-options');
  hairStyleContainer.innerHTML = AVATAR_PALETTE.hairStyles.map(hs => `
    <button type="button" class="pill-choice ${creatorConfig.avatar.hairStyle === hs.id ? 'active' : ''}"
      onclick="updateCreatorAvatar('hairStyle', '${hs.id}')">${hs.name}</button>
  `).join('');

  // Render Outfit Styles
  const outfitContainer = document.getElementById('creator-outfit-options');
  if (outfitContainer) {
    outfitContainer.innerHTML = AVATAR_PALETTE.outfitStyles.map(os => `
      <button type="button" class="pill-choice ${creatorConfig.avatar.outfit === os.id ? 'active' : ''}"
        onclick="updateCreatorAvatar('outfit', '${os.id}')">${os.name}</button>
    `).join('');
  }

  // Render Shirt Colors
  const shirtContainer = document.getElementById('creator-shirt-options');
  shirtContainer.innerHTML = AVATAR_PALETTE.shirtColors.map(sh => `
    <button type="button" class="swatch-btn ${creatorConfig.avatar.shirt === sh.id ? 'active' : ''}"
      style="background:${sh.fill}" title="${sh.name}"
      onclick="updateCreatorAvatar('shirt', '${sh.id}')"></button>
  `).join('');

  // Render Accessories
  const accContainer = document.getElementById('creator-accessory-options');
  accContainer.innerHTML = AVATAR_PALETTE.accessories.map(acc => `
    <button type="button" class="pill-choice ${creatorConfig.avatar.accessory === acc.id ? 'active' : ''}"
      onclick="updateCreatorAvatar('accessory', '${acc.id}')">${acc.name}</button>
  `).join('');

  // Render Hometowns
  const townContainer = document.getElementById('creator-hometown-options');
  townContainer.innerHTML = GAME_DATA.hometowns.map(t => `
    <div class="select-card ${creatorConfig.hometownId === t.id ? 'active' : ''}"
      onclick="selectCreatorTown('${t.id}')">
      <div class="select-card-header">
        <span class="select-card-icon">${t.icon}</span>
        <strong>${t.name}</strong>
      </div>
      <p>${t.tagline}</p>
    </div>
  `).join('');

  // Render Traits
  const traitContainer = document.getElementById('creator-trait-options');
  traitContainer.innerHTML = GAME_DATA.traits.map(tr => `
    <div class="select-card ${creatorConfig.traitId === tr.id ? 'active' : ''}"
      onclick="selectCreatorTrait('${tr.id}')">
      <div class="select-card-header">
        <span class="select-card-icon">${tr.icon}</span>
        <strong>${tr.name}</strong>
      </div>
      <p>${tr.desc}</p>
    </div>
  `).join('');
}

function setCreatorPreviewAge(age) {
  SoundFX.pop();
  creatorConfig.previewAge = age;
  renderCreatorScreen();
}

function selectCreatorGender(genderId) {
  SoundFX.pop();
  creatorConfig.avatar.gender = genderId;
  const gObj = AVATAR_PALETTE.genders.find(g => g.id === genderId);
  if (gObj) {
    creatorConfig.avatar.hairStyle = gObj.defaultHair;
    creatorConfig.avatar.outfit = gObj.defaultOutfit;
    creatorConfig.avatar.accessory = genderId === 'girl' ? 'star-clip' : 'none';
  }
  const nameInput = document.getElementById('creator-name-input');
  const currentName = nameInput ? nameInput.value.trim() : creatorConfig.name;
  const allPresets = [...GAME_DATA.presetNamesByGender.girl, ...GAME_DATA.presetNamesByGender.boy];
  if (allPresets.includes(currentName)) {
    const list = GAME_DATA.presetNamesByGender[genderId] || GAME_DATA.presetNamesByGender.girl;
    creatorConfig.name = list[0];
    if (nameInput) nameInput.value = creatorConfig.name;
  }
  renderCreatorScreen();
}

function updateCreatorAvatar(key, val) {
  SoundFX.pop();
  creatorConfig.avatar[key] = val;
  renderCreatorScreen();
}

function selectCreatorTown(id) {
  SoundFX.pop();
  creatorConfig.hometownId = id;
  renderCreatorScreen();
}

function selectCreatorTrait(id) {
  SoundFX.pop();
  creatorConfig.traitId = id;
  renderCreatorScreen();
}

function randomizeCreator() {
  SoundFX.ageUp();
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const gId = pick(AVATAR_PALETTE.genders).id;
  const nameList = GAME_DATA.presetNamesByGender[gId] || GAME_DATA.presetNamesByGender.girl;
  creatorConfig.name = pick(nameList);
  creatorConfig.hometownId = pick(GAME_DATA.hometowns).id;
  creatorConfig.traitId = pick(GAME_DATA.traits).id;
  creatorConfig.avatar = {
    gender: gId,
    skin: pick(AVATAR_PALETTE.skinTones).id,
    hairColor: pick(AVATAR_PALETTE.hairColors).id,
    hairStyle: pick(AVATAR_PALETTE.hairStyles).id,
    outfit: pick(AVATAR_PALETTE.outfitStyles).id,
    shirt: pick(AVATAR_PALETTE.shirtColors).id,
    accessory: pick(AVATAR_PALETTE.accessories).id
  };
  document.getElementById('creator-name-input').value = creatorConfig.name;
  renderCreatorScreen();
}

function startNewLife() {
  const nameVal = document.getElementById('creator-name-input').value.trim() || 'Sunny';
  const hometown = GAME_DATA.hometowns.find(h => h.id === creatorConfig.hometownId) || GAME_DATA.hometowns[0];
  const trait = GAME_DATA.traits.find(t => t.id === creatorConfig.traitId) || GAME_DATA.traits[0];

  // Pick initial childhood neighbor friend
  const childFriends = GAME_DATA.friendPool.filter(f => f.metStage === 'child');
  const starterFriend = JSON.parse(JSON.stringify(childFriends[0]));
  starterFriend.bond = 38;
  starterFriend.metAtAge = 0;

  // Create Siblings (Big Sister & Brother) who grow up with you!
  const siblings = [
    {
      id: 'sib-lily',
      name: nameVal === 'Lily' ? 'Emma' : 'Lily',
      relation: 'Big Sister',
      gender: 'girl',
      ageDiff: 3, // Starts at age 3 when you are age 0
      bond: 85,
      quote: "You're the coolest little sibling ever! 💛",
      avatar: {
        gender: 'girl',
        skin: creatorConfig.avatar.skin,
        hairColor: creatorConfig.avatar.hairColor,
        hairStyle: 'ponytail',
        outfit: 'overalls',
        shirt: 'lavender',
        accessory: 'star-clip'
      }
    },
    {
      id: 'sib-milo',
      name: nameVal === 'Milo' ? 'Noah' : 'Milo',
      relation: 'Big Brother',
      gender: 'boy',
      ageDiff: 1, // Starts at age 1 when you are age 0
      bond: 85,
      quote: "Race you to the Playground! 🏃",
      avatar: {
        gender: 'boy',
        skin: creatorConfig.avatar.skin,
        hairColor: creatorConfig.avatar.hairColor,
        hairStyle: 'spiky',
        outfit: 'hoodie',
        shirt: 'mint',
        accessory: 'cap'
      }
    }
  ];

  gameState = {
    name: nameVal,
    age: 0,
    week: 1,
    day: 1,
    timeOfDay: 'day', // 'day' (Nap only) or 'night' (Sleep +90% unlocked)
    energy: 100,
    maxEnergy: 100,
    isSick: false,
    hometown: hometown,
    trait: trait,
    avatar: JSON.parse(JSON.stringify(creatorConfig.avatar)),
    stats: {
      happiness: clampStat(78 + (hometown.bonus.happiness || 0) + (trait.mods.happiness || 0)),
      health: clampStat(80 + (hometown.bonus.health || 0) + (trait.mods.health || 0)),
      smarts: clampStat(65 + (hometown.bonus.smarts || 0) + (trait.mods.smarts || 0)),
      kindness: clampStat(75 + (hometown.bonus.kindness || 0) + (trait.mods.kindness || 0))
    },
    money: 20,
    skills: {
      art: (trait.skillBonus && trait.skillBonus.art) || 10,
      science: (trait.skillBonus && trait.skillBonus.science) || 10,
      athletics: (trait.skillBonus && trait.skillBonus.athletics) || 10,
      cooking: (trait.skillBonus && trait.skillBonus.cooking) || 10,
      story: (trait.skillBonus && trait.skillBonus.story) || 10
    },
    clubId: null,
    teenJobId: null,
    lifePath: null,
    majorId: null,
    career: null,
    pets: [],
    homeId: 'family-room',
    livingWith: 'family',
    siblings: siblings,
    unlockedRandomPlaces: [],
    randomUnlockAges: {},
    birthdayItems: [],
    inventory: [
      {
        id: 'starter-apple',
        name: 'Crisp Apple & Berry Bowl',
        icon: '🍎',
        category: 'food',
        qty: 2,
        desc: '+10% Energy ⚡, +6 Health & +4 Happiness',
        effects: { energy: 10, health: 6, happiness: 4 }
      },
      {
        id: 'starter-sandwich',
        name: 'Warm Grilled Cheese Sandwich',
        icon: '🥪',
        category: 'food',
        qty: 1,
        desc: '+14% Energy ⚡, +5 Health & +6 Happiness',
        effects: { energy: 14, health: 5, happiness: 6 }
      }
    ],
    friends: [starterFriend],
    scrapbook: [
      {
        age: 0,
        title: `Born in ${hometown.name} ${hometown.icon}`,
        desc: `Welcomed by Mom, Dad, Big Sister ${siblings[0].name}, and Big Brother ${siblings[1].name}!`
      }
    ],
    timeline: [
      {
        age: 0,
        type: 'milestone',
        title: `Welcome to the World, ${nameVal}! 🌟`,
        entries: [
          `👨‍👩‍👧‍👦 You were born into a loving family with Mom, Dad, Big Sister ${siblings[0].name} (Age 3), and Big Brother ${siblings[1].name} (Age 1)!`,
          `🔓 AGE 0 UNLOCKS: 🏡 Family Home & 🚗 Family Car are unlocked on the 2D Town Square!`,
          `👋 Next-door baby playmate: ${starterFriend.name}!`
        ]
      }
    ],
    activeTab: 'friends'
  };

  SoundFX.milestone();
  saveGame();
  startGameDashboard();
}

function startGameDashboard() {
  document.getElementById('creator-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  if (!gameState.maxEnergy || gameState.maxEnergy <= 10) {
    gameState.maxEnergy = 100;
    gameState.energy = 100;
  }
  if (typeof gameState.isSick === 'undefined') {
    gameState.isSick = false;
  }
  if (!gameState.week) gameState.week = 1;
  if (!gameState.day) gameState.day = 1;
  if (!gameState.timeOfDay) gameState.timeOfDay = 'day';
  if (!gameState.livingWith) {
    gameState.livingWith = gameState.age >= 21 ? 'best-friend' : 'family';
  }
  if (!gameState.unlockedRandomPlaces) gameState.unlockedRandomPlaces = [];
  if (!gameState.randomUnlockAges) gameState.randomUnlockAges = {};
  if (!gameState.birthdayItems) gameState.birthdayItems = [];
  if (!gameState.inventory) {
    gameState.inventory = [
      {
        id: 'starter-apple',
        name: 'Crisp Apple & Berry Bowl',
        icon: '🍎',
        category: 'food',
        qty: 2,
        desc: '+10% Energy ⚡, +6 Health & +4 Happiness',
        effects: { energy: 10, health: 6, happiness: 4 }
      }
    ];
    // Migrate any existing birthdayItems into inventory
    (gameState.birthdayItems || []).forEach(bItem => {
      gameState.inventory.push({
        id: `bday-${bItem.name.toLowerCase().replace(/\s+/g, '-')}-${bItem.age}`,
        name: bItem.name,
        icon: bItem.icon,
        category: 'item',
        qty: 1,
        ageUnlocked: bItem.age,
        desc: `Birthday Gift (Age ${bItem.age}) — Click Use to enjoy!`,
        effects: { happiness: 8 }
      });
    });
  }
  if (!gameState.siblings) {
    gameState.siblings = [
      {
        id: 'sib-lily',
        name: 'Lily',
        relation: 'Big Sister',
        gender: 'girl',
        ageDiff: 3,
        bond: 85,
        quote: "You're the coolest sibling ever! 💛",
        avatar: { gender: 'girl', skin: gameState.avatar.skin, hairColor: gameState.avatar.hairColor, hairStyle: 'ponytail', outfit: 'overalls', shirt: 'lavender', accessory: 'star-clip' }
      },
      {
        id: 'sib-milo',
        name: 'Milo',
        relation: 'Big Brother',
        gender: 'boy',
        ageDiff: 1,
        bond: 85,
        quote: 'Race you to the Playground! 🏃',
        avatar: { gender: 'boy', skin: gameState.avatar.skin, hairColor: gameState.avatar.hairColor, hairStyle: 'spiky', outfit: 'hoodie', shirt: 'mint', accessory: 'cap' }
      }
    ];
  }
  ensureQuestsInitialized();
  if (typeof World2D !== 'undefined') {
    World2D.init();
    World2D.placePlayerAtCurrentHome();
  }
  renderAll();
}

function clampStat(val) {
  return Math.max(5, Math.min(100, Math.round(val)));
}

// ==========================================
// 🎯 QUEST SYSTEM (STORY MILESTONE QUESTS + REPEATABLE TOWN QUESTS)
// ==========================================

const STORY_QUEST_CATALOG = [
  {
    id: 'sq-family-cuddles',
    title: 'First Family Cuddles',
    icon: '💛',
    minAge: 0,
    category: 'story',
    triggerType: 'family',
    goal: 1,
    desc: 'Give Mom or Dad a warm hug in the Family Home or Friends tab!',
    rewardText: '+$12, +8 Happiness & +6 Kindness',
    rewards: { money: 12, happiness: 8, kindness: 6 },
    goType: 'family'
  },
  {
    id: 'sq-family-car',
    title: 'Driveway Joyride',
    icon: '🚗',
    minAge: 0,
    category: 'story',
    triggerType: 'place',
    targetPlaceId: 'family-car',
    goal: 1,
    desc: 'Visit the Family Car in the driveway and do a car activity!',
    rewardText: '+$15, +8 Happiness & +10% Energy ⚡',
    rewards: { money: 15, happiness: 8, energy: 10 },
    goType: 'place',
    goTarget: 'family-car'
  },
  {
    id: 'sq-cozy-sleep',
    title: 'Sweet Dreams in My Room',
    icon: '🛏️',
    minAge: 0,
    category: 'story',
    triggerType: 'sleep',
    goal: 1,
    desc: 'Take a cozy Daytime Nap or full Nighttime Sleep in your Bed!',
    rewardText: '+$12, +8 Health & +15% Energy ⚡',
    rewards: { money: 12, health: 8, energy: 15 },
    goType: 'room-bed'
  },
  {
    id: 'sq-ice-cream',
    title: 'First Scoop of Rainbow',
    icon: '🍦',
    minAge: 1,
    category: 'story',
    triggerType: 'place',
    targetPlaceId: 'ice-cream-shop',
    goal: 1,
    desc: 'Visit the newly unlocked Ice Cream Shop and enjoy a treat!',
    rewardText: '+$18, +10 Happiness & Free Ice Cream Cone',
    rewards: { money: 18, happiness: 10 },
    goType: 'place',
    goTarget: 'ice-cream-shop'
  },
  {
    id: 'sq-playground',
    title: 'Sunny Playground Adventurer',
    icon: '🛝',
    minAge: 1,
    category: 'story',
    triggerType: 'place',
    targetPlaceId: 'playground',
    goal: 1,
    desc: 'Head to the Sunny Playground and try the Giant Slide or Swings!',
    rewardText: '+$18, +10 Athletics & +8 Health',
    rewards: { money: 18, health: 8, skill: ['athletics', 10] },
    goType: 'place',
    goTarget: 'playground'
  },
  {
    id: 'sq-pizza-night',
    title: 'Cheesy Pizza Party',
    icon: '🍕',
    minAge: 2,
    category: 'story',
    triggerType: 'place',
    targetPlaceId: 'pizza-place',
    goal: 1,
    desc: 'Visit the Brick-Oven Pizza Place with your family or friends!',
    rewardText: '+$20, +10 Cooking & +8 Happiness',
    rewards: { money: 20, happiness: 8, skill: ['cooking', 10] },
    goType: 'place',
    goTarget: 'pizza-place'
  },
  {
    id: 'sq-nursery-art',
    title: 'Cozy Nursery Masterpiece',
    icon: '🍼',
    minAge: 2,
    category: 'story',
    triggerType: 'place',
    targetPlaceId: 'nursery',
    goal: 1,
    desc: 'Visit the Cozy Nursery and finger-paint or nap on the mats!',
    rewardText: '+$20, +10 Art & +8 Smarts',
    rewards: { money: 20, smarts: 8, skill: ['art', 10] },
    goType: 'place',
    goTarget: 'nursery'
  },
  {
    id: 'sq-toy-store',
    title: 'Wonder Toy Emporium Explorer',
    icon: '🧸',
    minAge: 3,
    category: 'story',
    triggerType: 'place',
    targetPlaceId: 'toy-store',
    goal: 1,
    desc: 'Explore the shelves and puzzle tables at the Wonder Toy Store!',
    rewardText: '+$22, +10 Smarts & +10 Happiness',
    rewards: { money: 22, smarts: 10, happiness: 10 },
    goType: 'place',
    goTarget: 'toy-store'
  },
  {
    id: 'sq-school-bus',
    title: 'All Aboard the Yellow Bus!',
    icon: '🚌',
    minAge: 3,
    category: 'story',
    triggerType: 'place',
    targetPlaceId: 'school-bus',
    goal: 1,
    desc: 'Hop on the Yellow School Bus at the Main Street Bus Stop!',
    rewardText: '+$22, +10 Kindness & +10 Friend Bond',
    rewards: { money: 22, kindness: 10, friendBoost: 10 },
    goType: 'place',
    goTarget: 'school-bus'
  },
  {
    id: 'sq-first-school',
    title: 'First Day at Hometown School',
    icon: '🏫',
    minAge: 4,
    category: 'story',
    triggerType: 'place',
    targetPlaceId: 'school',
    goal: 1,
    desc: 'Attend class at Hometown School and Study or Teach a Friend!',
    rewardText: '+$25, +12 Smarts & +10 Science',
    rewards: { money: 25, smarts: 12, skill: ['science', 10] },
    goType: 'place',
    goTarget: 'school'
  },
  {
    id: 'sq-snack-store',
    title: 'After-School Snack Run',
    icon: '🍿',
    minAge: 4,
    category: 'story',
    triggerType: 'place',
    targetPlaceId: 'snack-store',
    goal: 1,
    desc: 'Stop by the Corner Snack Store for warm pretzels or smoothies!',
    rewardText: '+$22, +10 Happiness & +8 Kindness',
    rewards: { money: 22, happiness: 10, kindness: 8 },
    goType: 'place',
    goTarget: 'snack-store'
  },
  {
    id: 'sq-mall-outing',
    title: 'Grand Sunnyvale Mall Trip',
    icon: '🛍️',
    minAge: 5,
    category: 'story',
    triggerType: 'place',
    targetPlaceId: 'mall',
    goal: 1,
    desc: 'Visit the Sunnyvale Mall fountain, photo booth, and boutiques!',
    rewardText: '+$30, +12 Happiness & +10 All Friends Bond',
    rewards: { money: 30, happiness: 12, allFriendsBoost: 10 },
    goType: 'place',
    goTarget: 'mall'
  },
  {
    id: 'sq-bestie-home',
    title: "Best Friend's House Hangout",
    icon: '🌟',
    minAge: 6,
    category: 'story',
    triggerType: 'place',
    targetPlaceId: 'best-friend-home',
    goal: 1,
    desc: "Visit your Best Friend's Home to play games or cook pancakes!",
    rewardText: '+$35, +18 Best Friend Bond & +10 Happiness',
    rewards: { money: 35, happiness: 10, friendBoost: 18 },
    goType: 'place',
    goTarget: 'best-friend-home'
  },
  {
    id: 'sq-room-decorator',
    title: 'Interior Room Decorator',
    icon: '🪑',
    minAge: 0,
    category: 'story',
    triggerType: 'buy',
    goal: 1,
    desc: 'Buy any piece of Room Furniture or Item from the Store!',
    rewardText: '+$30, +12 Happiness & +8 Art',
    rewards: { money: 30, happiness: 12, skill: ['art', 8] },
    goType: 'furniture'
  },
  {
    id: 'sq-join-club',
    title: 'After-School Club Member',
    icon: '🏅',
    minAge: 6,
    category: 'story',
    triggerType: 'club',
    goal: 1,
    desc: 'Join an After-School Club in the Life Path tab!',
    rewardText: '+$30, +10 Smarts & +10 Happiness',
    rewards: { money: 30, smarts: 10, happiness: 10 },
    goType: 'tab',
    goTarget: 'career'
  },
  {
    id: 'sq-teen-job',
    title: 'First Part-Time Job',
    icon: '💼',
    minAge: 14,
    category: 'story',
    triggerType: 'job',
    goal: 1,
    desc: 'Sign up for an After-School Teen Job in the Life Path tab!',
    rewardText: '+$50, +12 Smarts & +10 Kindness',
    rewards: { money: 50, smarts: 12, kindness: 10 },
    goType: 'tab',
    goTarget: 'career'
  },
  {
    id: 'sq-college-career',
    title: 'Dream Career Trailblazer',
    icon: '🎓',
    minAge: 18,
    category: 'story',
    triggerType: 'career',
    goal: 1,
    desc: 'Choose a University Major (18–21) or Dream Career (22+) in Life Path!',
    rewardText: '+$80, +15 Smarts & +12 Happiness',
    rewards: { money: 80, smarts: 15, happiness: 12 },
    goType: 'tab',
    goTarget: 'career'
  }
];

function generateRepeatableTownQuest(existingIds = []) {
  const age = gameState ? gameState.age : 0;
  const places = (typeof getActiveWorldPlaces !== 'undefined' && gameState)
    ? getActiveWorldPlaces(gameState).filter(p => !p.isMystery && age >= p.unlockAge)
    : [];
  const randomPlace = places.length > 0 ? places[Math.floor(Math.random() * places.length)] : null;

  const templates = [
    ...(randomPlace ? [{
      key: `tq-visit-${randomPlace.id}`,
      title: `Outing to ${randomPlace.name}`,
      icon: randomPlace.icon,
      triggerType: 'place',
      targetPlaceId: randomPlace.id,
      goal: 1,
      desc: `Visit ${randomPlace.icon} ${randomPlace.name} and complete any activity inside!`,
      rewardText: '+$18, +8 Happiness & +6 Smarts',
      rewards: { money: 18, happiness: 8, smarts: 6 },
      goType: 'place',
      goTarget: randomPlace.id
    }] : []),
    {
      key: 'tq-sibling-play',
      title: 'Sibling Squad Hangout',
      icon: '👫',
      triggerType: 'sibling',
      goal: 1,
      desc: 'Play and hang out with Big Sister Lily or Big Brother Milo!',
      rewardText: '+$16, +12 Sibling Bond & +8 Happiness',
      rewards: { money: 16, happiness: 8, siblingBoost: 12 },
      goType: 'sibling'
    },
    {
      key: 'tq-friend-hangout',
      title: 'Bestie Connection',
      icon: '🤝',
      triggerType: 'friend',
      goal: 1,
      desc: 'Hang out, chat, or give a gift to any of your Friends!',
      rewardText: '+$18, +12 Friend Bond & +8 Kindness',
      rewards: { money: 18, kindness: 8, friendBoost: 12 },
      goType: 'tab',
      goTarget: 'friends'
    },
    {
      key: 'tq-family-hug',
      title: 'Warm Family Time',
      icon: '🏡',
      triggerType: 'family',
      goal: 1,
      desc: 'Give Mom or Dad a warm hug or spend family time together!',
      rewardText: '+$14, +8 Happiness & +8 Kindness',
      rewards: { money: 14, happiness: 8, kindness: 8 },
      goType: 'family'
    },
    {
      key: 'tq-study-desk',
      title: 'Study & Brain Boost',
      icon: '💻',
      triggerType: 'study',
      goal: 1,
      desc: 'Study at your Bedroom Desk, Hometown School, or read in Activities!',
      rewardText: '+$20, +10 Smarts & +8 Science',
      rewards: { money: 20, smarts: 10, skill: ['science', 8] },
      goType: 'room-desk'
    },
    {
      key: 'tq-healthy-snack',
      title: 'Nutritious Snack Time',
      icon: '🍎',
      triggerType: 'eat',
      goal: 1,
      desc: 'Eat any meal or snack to recharge your Energy!',
      rewardText: '+$15, +8 Health & +12% Energy ⚡',
      rewards: { money: 15, health: 8, energy: 12 },
      goType: 'eat'
    },
    {
      key: 'tq-hobby-practice',
      title: 'Creative Hobby Spark',
      icon: '🎨',
      triggerType: 'activity',
      goal: 1,
      desc: 'Practice any Hobby in the Activities tab (Art, Sports, Science, Cooking, or Library)!',
      rewardText: '+$18, +9 Happiness & +8 Art',
      rewards: { money: 18, happiness: 9, skill: ['art', 8] },
      goType: 'tab',
      goTarget: 'activities'
    },
    {
      key: 'tq-store-treat',
      title: 'Town Shopper & Decorator',
      icon: '🪑',
      triggerType: 'buy',
      goal: 1,
      desc: 'Buy any Furniture, Food, Toy, or Outfit from the Store!',
      rewardText: '+$24 & +10 Happiness',
      rewards: { money: 24, happiness: 10 },
      goType: 'furniture'
    }
  ];

  const available = templates.filter(t => !existingIds.includes(t.key));
  const picked = available.length > 0
    ? available[Math.floor(Math.random() * available.length)]
    : templates[Math.floor(Math.random() * templates.length)];

  return {
    id: `${picked.key}-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
    templateKey: picked.key,
    title: picked.title,
    icon: picked.icon,
    category: 'town',
    triggerType: picked.triggerType,
    targetPlaceId: picked.targetPlaceId || null,
    goal: picked.goal,
    progress: 0,
    completed: false,
    claimed: false,
    desc: picked.desc,
    rewardText: picked.rewardText,
    rewards: picked.rewards,
    goType: picked.goType,
    goTarget: picked.goTarget || null
  };
}

function ensureQuestsInitialized() {
  if (!gameState) return;
  if (!gameState.claimedStoryQuestIds) gameState.claimedStoryQuestIds = [];
  if (!gameState.activeQuests) gameState.activeQuests = [];
  if (typeof gameState.questsCompletedCount !== 'number') gameState.questsCompletedCount = 0;

  // 1. Add any newly unlocked Story Quests for the player's current age
  const activeIds = new Set(gameState.activeQuests.map(q => q.id));
  const claimedIds = new Set(gameState.claimedStoryQuestIds);

  STORY_QUEST_CATALOG.forEach(sq => {
    if (gameState.age >= sq.minAge && !activeIds.has(sq.id) && !claimedIds.has(sq.id)) {
      gameState.activeQuests.push({
        ...JSON.parse(JSON.stringify(sq)),
        progress: 0,
        completed: false,
        claimed: false
      });
    }
  });

  // 2. Ensure the player always has 3 Repeatable Town Quests active
  const townQuests = gameState.activeQuests.filter(q => q.category === 'town' && !q.claimed);
  const existingKeys = townQuests.map(q => q.templateKey || q.id);
  const needed = Math.max(0, 3 - townQuests.length);
  for (let i = 0; i < needed; i++) {
    const newTq = generateRepeatableTownQuest(existingKeys);
    existingKeys.push(newTq.templateKey);
    gameState.activeQuests.push(newTq);
  }
}

function advanceQuestProgress(triggerType, detail = null) {
  if (!gameState || !gameState.activeQuests) return;
  let newlyCompleted = [];

  gameState.activeQuests.forEach(q => {
    if (q.completed || q.claimed) return;
    let matches = false;
    if (q.triggerType === triggerType) {
      if (q.targetPlaceId) {
        matches = (detail === q.targetPlaceId);
      } else {
        matches = true;
      }
    } else if (q.triggerType === 'study' && triggerType === 'place' && (detail === 'school' || detail === 'room-desk' || detail === 'uni-career')) {
      matches = true;
    }

    if (matches) {
      q.progress = Math.min(q.goal, (q.progress || 0) + 1);
      if (q.progress >= q.goal) {
        q.completed = true;
        newlyCompleted.push(q);
      }
    }
  });

  if (newlyCompleted.length > 0) {
    SoundFX.milestone();
    const first = newlyCompleted[0];
    addCurrentYearLog(`🎯 QUEST COMPLETED: "${first.title}"! Click "🎁 Claim Reward" in Quests for ${first.rewardText}!`);
    showToast(`🎯 Quest Complete: ${first.icon} ${first.title}! Claim your reward!`);
  }
}

function claimQuestReward(questId) {
  if (!gameState || !gameState.activeQuests) return;
  const idx = gameState.activeQuests.findIndex(q => q.id === questId);
  if (idx === -1) return;
  const q = gameState.activeQuests[idx];
  if (!q.completed || q.claimed) return;

  q.claimed = true;
  gameState.questsCompletedCount = (gameState.questsCompletedCount || 0) + 1;

  const rw = q.rewards || {};
  if (rw.money) gameState.money += rw.money;
  if (rw.energy) gameState.energy = Math.min(100, Math.round(gameState.energy + rw.energy));
  if (rw.happiness) gameState.stats.happiness = clampStat(gameState.stats.happiness + rw.happiness);
  if (rw.health) gameState.stats.health = clampStat(gameState.stats.health + rw.health);
  if (rw.smarts) gameState.stats.smarts = clampStat(gameState.stats.smarts + rw.smarts);
  if (rw.kindness) gameState.stats.kindness = clampStat(gameState.stats.kindness + rw.kindness);
  if (rw.skill) {
    const [sk, amt] = rw.skill;
    gameState.skills[sk] = Math.min(100, (gameState.skills[sk] || 0) + amt);
  }
  if (rw.friendBoost) {
    const bf = getTopFriend(gameState);
    if (bf) bf.bond = clampStat(bf.bond + rw.friendBoost);
  }
  if (rw.allFriendsBoost) {
    gameState.friends.forEach(f => { f.bond = clampStat(f.bond + rw.allFriendsBoost); });
  }
  if (rw.siblingBoost && gameState.siblings) {
    gameState.siblings.forEach(s => { s.bond = clampStat((s.bond || 80) + rw.siblingBoost); });
  }

  if (q.category === 'story') {
    if (!gameState.claimedStoryQuestIds.includes(q.id)) {
      gameState.claimedStoryQuestIds.push(q.id);
    }
    addScrapbookMoment(`Quest Completed: ${q.title} ${q.icon}`, `Finished "${q.title}" at Age ${gameState.age} (${q.rewardText}).`);
  }

  // Remove claimed quest from active list and replenish Town Quests
  gameState.activeQuests.splice(idx, 1);
  ensureQuestsInitialized();

  SoundFX.milestone();
  addCurrentYearLog(`🎁 CLAIMED QUEST REWARD: ${q.icon} ${q.title} -> Received ${q.rewardText}!`);
  showToast(`🎁 Claimed "${q.title}"! (${q.rewardText})`);
  saveGame();
  renderAll();
}

function rerollTownQuests() {
  if (!gameState || !gameState.activeQuests) return;
  SoundFX.pop();
  gameState.activeQuests = gameState.activeQuests.filter(q => q.category === 'story' || q.completed);
  ensureQuestsInitialized();
  showToast('🔄 Refreshed your Town Quest Board with new quests!');
  saveGame();
  renderAll();
}

function executeQuestGoAction(questId) {
  if (!gameState || !gameState.activeQuests) return;
  const q = gameState.activeQuests.find(x => x.id === questId);
  if (!q) return;
  if (q.completed) {
    claimQuestReward(q.id);
    return;
  }

  if (q.goType === 'place' && q.goTarget) {
    if (typeof World2D !== 'undefined') {
      World2D.enterRoom(q.goTarget, true);
    }
  } else if (q.goType === 'room-bed') {
    if (typeof World2D !== 'undefined') {
      World2D.enterRoom('my-room');
      World2D.walkToRoomStation('room-bed', 18);
    }
  } else if (q.goType === 'room-desk') {
    if (typeof World2D !== 'undefined') {
      World2D.enterRoom('my-room');
      World2D.walkToRoomStation('room-desk', 82);
    }
  } else if (q.goType === 'family') {
    interactWithFamily('Mom & Dad');
  } else if (q.goType === 'sibling') {
    const firstSib = gameState.siblings && gameState.siblings[0];
    if (firstSib) hangOutWithSibling(firstSib.id);
  } else if (q.goType === 'eat') {
    openFoodChoiceModal();
  } else if (q.goType === 'furniture') {
    openFurnitureShopModal();
  } else if (q.goType === 'tab' && q.goTarget) {
    switchTab(q.goTarget);
  }
}

// ==========================================
// ENERGY, SLEEP (+90%), EAT (+10%), & SICKNESS (+5% DECAY)
// ==========================================

function getEnergyCost(baseCost = 15) {
  if (!gameState) return baseCost;
  // When sick, energy decays +5% faster!
  return baseCost + (gameState.isSick ? 5 : 0);
}

function spendEnergy(baseCost = 15) {
  if (!gameState) return false;
  const cost = getEnergyCost(baseCost);
  if (gameState.energy < cost) {
    if (gameState.timeOfDay === 'day') {
      showToast(`⚡ Low Energy (${Math.round(gameState.energy)}%)! Take a "🛋️ Daytime Nap (+25%)" or "🍎 Eat (+10%)"!`);
    } else {
      showToast(`⚡ Low Energy (${Math.round(gameState.energy)}%)! Click "😴 Nighttime Sleep (+90%)" to recharge!`);
    }
    return false;
  }
  gameState.energy = Math.max(0, Math.round(gameState.energy - cost));

  // Doing a daytime activity transitions the day into evening / Nighttime (🌙)
  if (gameState.timeOfDay === 'day') {
    gameState.timeOfDay = 'night';
  }

  // If energy gets very low (<25%), chance of catching a mild cold (Sick!)
  if (!gameState.isSick && gameState.energy < 25 && Math.random() < 0.45) {
    gameState.isSick = true;
    addCurrentYearLog('🤒 Oh no! Because your energy got low, you caught the sniffles! (Energy decays +5% faster while sick — Sleep at night or take Soup/Medicine!)');
    showToast('🤒 You got Sick! Energy now decays +5% faster!');
  }
  return true;
}

function napDaytime() {
  if (!gameState) return;
  if (gameState.timeOfDay === 'night') {
    showToast('🌙 It is already Nighttime! You can take a full Sleep (+90% Energy) now!');
    return;
  }
  SoundFX.pop();
  const before = Math.round(gameState.energy);
  gameState.energy = Math.min(100, Math.round(gameState.energy + 25));
  const gained = gameState.energy - before;
  gameState.stats.health = clampStat(gameState.stats.health + 2);
  gameState.timeOfDay = 'night';

  addCurrentYearLog(`🛋️ Took a cozy Daytime Nap (+25% Energy -> ${gameState.energy}% Energy). Now it is 🌙 Nighttime!`);
  showToast(`🛋️ Daytime Nap! +${gained}% Energy — It is now 🌙 Nighttime!`);
  advanceQuestProgress('sleep');
  saveGame();
  renderAll();
}

function switchToNighttime() {
  if (!gameState) return;
  SoundFX.pop();
  gameState.timeOfDay = 'night';
  showToast('🌙 Evening has arrived! Nighttime Sleep (+90% Energy) is now available.');
  saveGame();
  renderAll();
}

function sleepForEnergy() {
  if (!gameState) return;
  if (gameState.timeOfDay !== 'night') {
    showToast('☀️ Sleep (+90%) is a Nighttime-only activity! In Daytime you can only Nap (+25% ⚡)!');
    return;
  }
  SoundFX.ageUp();
  const before = Math.round(gameState.energy);
  gameState.energy = Math.min(100, Math.round(gameState.energy + 90));
  const gained = gameState.energy - before;
  gameState.stats.health = clampStat(gameState.stats.health + 5);
  gameState.timeOfDay = 'day'; // Wake up the next morning in Daytime!

  if (gameState.isSick) {
    gameState.isSick = false;
    addCurrentYearLog(`🌙😴 Slept deeply through the night (+90% Energy -> ${gameState.energy}%) and recovered from being sick! 💚`);
    showToast(`🌙😴 Nighttime Sleep (+${gained}% Energy), Cured Sickness & Woke Up Next Day ☀️!`);
  } else {
    addCurrentYearLog(`🌙😴 Slept through the night (+90% Energy -> ${gameState.energy}%) and woke up refreshed the next morning ☀️!`);
    showToast(`🌙😴 Nighttime Sleep! +90% Energy (Now ${gameState.energy}%) & Next Day ☀️!`);
  }
  advanceQuestProgress('sleep');
  advanceDays(1, true);
}

const FOOD_MENU_CHOICES = [
  {
    id: 'boba-tea',
    name: 'Boba Bubble Milk Tea',
    icon: '🧋',
    cost: 0,
    tag: 'Fridge Favorite 🧋 (Free)',
    tagClass: 'conseq-good',
    desc: '+16% Energy ⚡, +12 Happiness & +4 Health',
    effects: { energy: 16, happiness: 12, health: 4 }
  },
  {
    id: 'apple-bowl',
    name: 'Crisp Apple & Berry Bowl',
    icon: '🍎',
    cost: 0,
    tag: 'Healthy & Free 💚',
    tagClass: 'conseq-good',
    desc: '+10% Energy ⚡, +6 Health & +4 Happiness',
    effects: { energy: 10, health: 6, happiness: 4 }
  },
  {
    id: 'grilled-cheese',
    name: 'Warm Grilled Cheese & Veggie Sandwich',
    icon: '🥪',
    cost: 0,
    tag: 'Home Kitchen 💚',
    tagClass: 'conseq-good',
    desc: '+14% Energy ⚡, +5 Health & +6 Happiness',
    effects: { energy: 14, health: 5, happiness: 6 }
  },
  {
    id: 'chicken-soup',
    name: "Mom's Warm Chicken Noodle Soup",
    icon: '🍲',
    cost: 0,
    tag: 'Cures Sickness 🤒💚',
    tagClass: 'conseq-good',
    desc: '+12% Energy ⚡, +10 Health & Cures Sickness!',
    effects: { energy: 12, health: 10, happiness: 5, cureSick: true }
  },
  {
    id: 'berry-pancakes',
    name: 'Fluffy Honey & Berry Pancakes',
    icon: '🥞',
    cost: 3,
    tag: 'Cozy Breakfast 🌟 ($3)',
    tagClass: 'conseq-good',
    desc: '+16% Energy ⚡, +9 Happiness & +4 Cooking Skill',
    effects: { energy: 16, happiness: 9, skill: ['cooking', 4] }
  },
  {
    id: 'brain-salad',
    name: 'Superfood Brain Salad & Smoothie',
    icon: '🥗',
    cost: 5,
    tag: 'Brain Boost 🧠 ($5)',
    tagClass: 'conseq-good',
    desc: '+15% Energy ⚡, +10 Health & +7 Smarts',
    effects: { energy: 15, health: 10, smarts: 7 }
  },
  {
    id: 'cheesy-pizza',
    name: 'Hot Cheesy Pepperoni Pizza Slice',
    icon: '🍕',
    cost: 4,
    tag: 'Tasty Treat 🍕 ($4)',
    tagClass: 'conseq-good',
    desc: '+18% Energy ⚡, +11 Happiness, -2 Health',
    effects: { energy: 18, happiness: 11, health: -2 }
  },
  {
    id: 'rainbow-icecream',
    name: 'Triple-Scoop Rainbow Ice Cream',
    icon: '🍦',
    cost: 4,
    tag: 'Brain-Freeze Risk ❄️ ($4)',
    tagClass: 'conseq-risky',
    desc: '+12% Energy ⚡, +13 Happiness (25% Brain Freeze: -3 Smarts)',
    effects: { energy: 12, happiness: 13, brainFreezeChance: 0.25 }
  },
  {
    id: 'fizzy-candy',
    name: 'Giant Fizzy Sour Candy & Soda Pack',
    icon: '🍬',
    cost: 3,
    tag: 'Sugar Rush Risk ⚠️ ($3)',
    tagClass: 'conseq-risky',
    desc: '+22% Energy ⚡ (Sugar Rush!), +8 Happiness, -7 Health & 35% Sick chance 🤒',
    effects: { energy: 22, happiness: 8, health: -7, sickChance: 0.35 }
  }
];

function eatForEnergy() {
  openFoodChoiceModal();
}

function openFoodChoiceModal() {
  if (!gameState) return;
  SoundFX.pop();
  const modal = document.getElementById('event-modal');
  const content = document.getElementById('event-modal-body');

  content.innerHTML = `
    <div class="modal-header-badge">🍽️ Choose Your Food & Effects (🪙 Savings: $${gameState.money})</div>
    <h2>What Would You Like to Eat or Pack?</h2>
    <p class="modal-story-text">Every food has different Energy, Health, Smarts, or Happiness effects! Eat now or pack food into your <strong>🎒 Inventory</strong> for later.</p>
    <div class="choice-list" style="max-height:410px;overflow-y:auto;padding-right:4px;">
      ${FOOD_MENU_CHOICES.map(food => {
        const canAfford = gameState.money >= food.cost;
        return `
          <div class="friend-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;">
            <div style="display:flex;align-items:center;gap:10px;flex:1;">
              <span style="font-size:1.7rem;">${food.icon}</span>
              <div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <strong>${food.name}</strong>
                  <span class="conseq-tag ${food.tagClass}">${food.tag}</span>
                </div>
                <div style="font-size:0.76rem;color:#4A4E69;margin-top:2px;">${food.desc}</div>
              </div>
            </div>
            <div style="display:flex;gap:6px;flex-shrink:0;">
              <button type="button" class="energy-btn eat-btn"
                onclick="${canAfford ? `eatFoodChoice('${food.id}')` : `showToast('You need $${food.cost} for ${food.name}!')`}">
                🍽️ Eat ${food.cost > 0 ? `($${food.cost})` : '(Free)'}
              </button>
              <button type="button" class="energy-btn sleep-btn"
                onclick="${canAfford ? `packFoodToInventory('${food.id}')` : `showToast('You need $${food.cost} to pack ${food.name}!')`}">
                🎒 Keep
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <div style="margin-top:14px;display:flex;justify-content:space-between;align-items:center;">
      <button type="button" class="secondary-btn" onclick="closeModal(); switchTab('inventory');">🎒 Open My Inventory (${(gameState.inventory || []).length})</button>
      <button type="button" class="secondary-btn" onclick="closeModal()">Close</button>
    </div>
  `;
  modal.classList.remove('hidden');
}

function applyFoodEffects(food, fromInventory = false) {
  const eff = food.effects || {};
  const gain = eff.energy || 10;
  gameState.energy = Math.min(100, Math.round(gameState.energy + gain));

  if (eff.health) gameState.stats.health = clampStat(gameState.stats.health + eff.health);
  if (eff.happiness) gameState.stats.happiness = clampStat(gameState.stats.happiness + eff.happiness);
  if (eff.smarts) gameState.stats.smarts = clampStat(gameState.stats.smarts + eff.smarts);
  if (eff.kindness) gameState.stats.kindness = clampStat(gameState.stats.kindness + eff.kindness);
  if (eff.skill) {
    const [sk, amt] = eff.skill;
    gameState.skills[sk] = Math.min(100, (gameState.skills[sk] || 0) + amt);
  }

  let extraNote = '';
  if (eff.cureSick && gameState.isSick) {
    gameState.isSick = false;
    extraNote = ' 💚 Cured Sickness!';
  }
  if (eff.brainFreezeChance && Math.random() < eff.brainFreezeChance) {
    gameState.stats.smarts = clampStat(gameState.stats.smarts - 3);
    extraNote += ' 🥶 Brain freeze (-3 Smarts)!';
  }
  if (eff.sickChance && !gameState.isSick && Math.random() < eff.sickChance) {
    gameState.isSick = true;
    extraNote += ' 🤒 Sugar crash tummy ache (You got Sick)!';
  }

  SoundFX.pop();
  addCurrentYearLog(`${food.icon} Ate ${food.name}${fromInventory ? ' from Inventory' : ''} (${food.desc})${extraNote}`);
  showToast(`${food.icon} Ate ${food.name}! +${gain}% Energy ⚡${extraNote}`);
  advanceQuestProgress('eat');
}

function eatFoodChoice(foodId) {
  if (!gameState) return;
  const food = FOOD_MENU_CHOICES.find(f => f.id === foodId);
  if (!food) return;
  if (gameState.money < food.cost) {
    showToast(`You need $${food.cost} to buy ${food.name}!`);
    return;
  }
  gameState.money -= food.cost;
  closeModal();
  applyFoodEffects(food, false);
  saveGame();
  renderAll();
}

function packFoodToInventory(foodId) {
  if (!gameState) return;
  const food = FOOD_MENU_CHOICES.find(f => f.id === foodId);
  if (!food) return;
  if (gameState.money < food.cost) {
    showToast(`You need $${food.cost} to pack ${food.name}!`);
    return;
  }
  gameState.money -= food.cost;
  addToInventory({
    id: `food-${food.id}`,
    name: food.name,
    icon: food.icon,
    category: 'food',
    qty: 1,
    desc: food.desc,
    effects: food.effects
  });
  SoundFX.pop();
  showToast(`🎒 Packed ${food.icon} ${food.name} into your Inventory!`);
  saveGame();
  renderAll();
  openFoodChoiceModal();
}

function addToInventory(newItem) {
  if (!gameState.inventory) gameState.inventory = [];
  const existing = gameState.inventory.find(i => i.name === newItem.name && i.category === newItem.category);
  if (existing) {
    existing.qty = (existing.qty || 1) + (newItem.qty || 1);
  } else {
    gameState.inventory.unshift({
      id: newItem.id || `inv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: newItem.name,
      icon: newItem.icon || '🎁',
      category: newItem.category || 'item',
      qty: newItem.qty || 1,
      ageUnlocked: newItem.ageUnlocked ?? gameState.age,
      desc: newItem.desc || '+8 Happiness',
      effects: newItem.effects || { happiness: 8 }
    });
  }
}

function useInventoryItem(invIdx) {
  if (!gameState || !gameState.inventory || !gameState.inventory[invIdx]) return;
  const item = gameState.inventory[invIdx];

  if (item.category === 'food') {
    applyFoodEffects(item, true);
    item.qty = (item.qty || 1) - 1;
    if (item.qty <= 0) {
      gameState.inventory.splice(invIdx, 1);
    }
    saveGame();
    renderAll();
    return;
  }

  // Using or Equipping a Birthday / Room Item from Inventory!
  const eff = item.effects || {};
  if (eff.energy) gameState.energy = Math.min(100, Math.round(gameState.energy + Math.min(15, eff.energy)));
  if (eff.happiness) gameState.stats.happiness = clampStat(gameState.stats.happiness + 6);
  if (eff.health) gameState.stats.health = clampStat(gameState.stats.health + 4);
  if (eff.smarts) gameState.stats.smarts = clampStat(gameState.stats.smarts + 5);
  if (eff.kindness) gameState.stats.kindness = clampStat(gameState.stats.kindness + 5);
  if (eff.skill) {
    const [sk, amt] = eff.skill;
    gameState.skills[sk] = Math.min(100, (gameState.skills[sk] || 0) + Math.min(5, amt));
  }

  // Check if item maps to an Avatar outfit or accessory!
  const lower = item.name.toLowerCase();
  if (lower.includes('headphones')) gameState.avatar.accessory = 'headphones';
  else if (lower.includes('cap')) gameState.avatar.accessory = 'cap';
  else if (lower.includes('glasses') || lower.includes('sunglasses')) gameState.avatar.accessory = 'round-glasses';
  else if (lower.includes('hood')) gameState.avatar.outfit = 'hoodie';
  else if (lower.includes('suit') || lower.includes('cardigan')) gameState.avatar.outfit = 'cardigan';

  SoundFX.milestone();
  addCurrentYearLog(`🎒 Used ${item.icon} ${item.name} from your Inventory (${item.desc})!`);
  showToast(`🎒 Used ${item.icon} ${item.name}! (${item.desc})`);
  saveGame();
  renderAll();
}

// ==========================================
// 🛒 TOWN STORE CATALOG (FOOD, TOYS/TECH, CLOTHES)
// ==========================================

const STORE_CATALOG = [
  // 1. Food & Snacks (Stored in Inventory to Eat anytime!)
  {
    id: 'store-apple-pack',
    section: 'food',
    name: 'Crisp Apple & Berry Pack',
    icon: '🍎',
    cost: 2,
    category: 'food',
    desc: '+10% Energy ⚡, +6 Health & +4 Happiness',
    effects: { energy: 10, health: 6, happiness: 4 }
  },
  {
    id: 'store-soup-jar',
    section: 'food',
    name: 'Healing Chicken Soup Jar',
    icon: '🍲',
    cost: 4,
    category: 'food',
    desc: '+12% Energy ⚡, +10 Health & Cures Sickness 🤒!',
    effects: { energy: 12, health: 10, happiness: 5, cureSick: true }
  },
  {
    id: 'store-pancake-box',
    section: 'food',
    name: 'Honey Berry Pancake Box',
    icon: '🥞',
    cost: 3,
    category: 'food',
    desc: '+16% Energy ⚡, +9 Happiness & +4 Cooking',
    effects: { energy: 16, happiness: 9, skill: ['cooking', 4] }
  },
  {
    id: 'store-brain-salad',
    section: 'food',
    name: 'Superfood Brain Salad & Smoothie',
    icon: '🥗',
    cost: 5,
    category: 'food',
    desc: '+15% Energy ⚡, +10 Health & +7 Smarts',
    effects: { energy: 15, health: 10, smarts: 7 }
  },
  {
    id: 'store-pizza-box',
    section: 'food',
    name: 'Hot Cheesy Pizza Box',
    icon: '🍕',
    cost: 4,
    category: 'food',
    desc: '+18% Energy ⚡, +11 Happiness, -2 Health',
    effects: { energy: 18, happiness: 11, health: -2 }
  },
  {
    id: 'store-cupcake-pack',
    section: 'food',
    name: 'Bakery Cupcake 4-Pack',
    icon: '🧁',
    cost: 5,
    category: 'food',
    desc: '+18% Energy ⚡, +12 Happiness & +5 Cooking',
    effects: { energy: 18, happiness: 12, skill: ['cooking', 5] }
  },

  // 2. Room Furniture & Decor (Placed visually inside My Room & Starter Loft + kept in Inventory!)
  {
    id: 'store-beanbag',
    section: 'furniture',
    name: 'Cozy Beanbag Chair',
    icon: '🟣',
    cost: 12,
    category: 'item',
    desc: 'Appears in My Room! Click it for +8% Energy ⚡ & +10 Happiness!',
    effects: { energy: 8, happiness: 10 }
  },
  {
    id: 'store-plant',
    section: 'furniture',
    name: 'Lush Monstera Plant',
    icon: '🪴',
    cost: 10,
    category: 'item',
    desc: 'Appears in My Room! Click it for +8 Health 💚 & +8 Happiness!',
    effects: { health: 8, happiness: 8 }
  },
  {
    id: 'store-sofa-lamp',
    section: 'furniture',
    name: 'Plush Blue Sofa & Golden Floor Lamp',
    icon: '🛋️',
    cost: 25,
    category: 'item',
    desc: 'Core Room Furniture! +20% Energy ⚡ & +12 Happiness!',
    effects: { energy: 20, happiness: 12 }
  },
  {
    id: 'store-study-desk',
    section: 'furniture',
    name: 'Wooden Study Desk & Chair',
    icon: '🪑',
    cost: 22,
    category: 'item',
    desc: 'Core Room Furniture! +10 Smarts 🧠 & +8 Happiness!',
    effects: { smarts: 10, happiness: 8 }
  },
  {
    id: 'store-mini-fridge',
    section: 'furniture',
    name: 'Mini Fridge',
    icon: '🧊',
    cost: 28,
    category: 'item',
    desc: 'Core Room Furniture! +15% Energy ⚡ & +8 Cooking!',
    effects: { energy: 15, skill: ['cooking', 8] }
  },
  {
    id: 'store-flat-tv',
    section: 'furniture',
    name: 'Big Flat-Screen TV',
    icon: '📺',
    cost: 35,
    category: 'item',
    desc: 'Mounts on your Bedroom Wall! +14 Happiness & +8 Smarts!',
    effects: { happiness: 14, smarts: 8 }
  },
  {
    id: 'store-arcade-cabinet',
    section: 'furniture',
    name: 'Arcade Cabinet',
    icon: '🕹️',
    cost: 45,
    category: 'item',
    desc: 'Places a glowing Neon Arcade Cabinet in My Room! +16 Happiness & +10 Friend Bond!',
    effects: { happiness: 16, friendBoost: 10 }
  },

  // 3. Toys, Tech & Room Gear (Stored in Inventory + Displayed on Room Shelf!)
  {
    id: 'store-teddy',
    section: 'gear',
    name: 'Teddy Bear',
    icon: '🧸',
    cost: 8,
    category: 'item',
    desc: '+10 Happiness & +6 Kindness',
    effects: { happiness: 10, kindness: 6 }
  },
  {
    id: 'store-crayons',
    section: 'gear',
    name: 'Deluxe Coloring & Crayon Set',
    icon: '🎨',
    cost: 6,
    category: 'item',
    desc: '+10 Art Skill & +8 Happiness',
    effects: { happiness: 8, skill: ['art', 10] }
  },
  {
    id: 'store-science-set',
    section: 'gear',
    name: 'Science Set',
    icon: '🔬',
    cost: 15,
    category: 'item',
    desc: '+10 Smarts & +10 Science Skill',
    effects: { smarts: 10, skill: ['science', 10] }
  },
  {
    id: 'store-flashlight',
    section: 'gear',
    name: 'Explorer Flashlight & Backpack',
    icon: '🔦',
    cost: 14,
    category: 'item',
    desc: '+9 Smarts & +9 Athletics',
    effects: { smarts: 9, skill: ['athletics', 9] }
  },
  {
    id: 'store-music-player',
    section: 'gear',
    name: 'Music Player',
    icon: '🎵',
    cost: 20,
    category: 'item',
    desc: '+12 Happiness & +9 Art & Music Skill',
    effects: { happiness: 12, skill: ['art', 9] }
  },
  {
    id: 'store-headphones',
    section: 'gear',
    name: 'Headphones',
    icon: '🎧',
    cost: 24,
    category: 'item',
    desc: '+12 Happiness, +8 Art & Equips Headphones!',
    effects: { happiness: 12, skill: ['art', 8] }
  },
  {
    id: 'store-game',
    section: 'gear',
    name: 'Video Game Console',
    icon: '🎮',
    cost: 32,
    category: 'item',
    desc: '+14 Happiness & +10 Friend Bond (Unlocks Arcade Cabinet in Room!)',
    effects: { happiness: 14, friendBoost: 10 }
  },
  {
    id: 'store-tablet',
    section: 'gear',
    name: 'Drawing & Study Tablet',
    icon: '📱',
    cost: 42,
    category: 'item',
    desc: '+10 Smarts & +9 Art Skill',
    effects: { smarts: 10, skill: ['art', 9] }
  },
  {
    id: 'store-laptop',
    section: 'gear',
    name: 'Laptop Computer',
    icon: '💻',
    cost: 60,
    category: 'item',
    desc: '+12 Smarts & +12 Science Skill',
    effects: { smarts: 12, skill: ['science', 12] }
  },

  // 3. Clothes, Shoes & Accessories
  {
    id: 'store-hoodie-jeans',
    section: 'clothes',
    name: 'Cozy Hoodie & Jeans',
    icon: '🧥',
    cost: 16,
    category: 'item',
    desc: '+10 Happiness, +6 Health & Equips Hoodie!',
    effects: { happiness: 10, health: 6 }
  },
  {
    id: 'store-sneakers',
    section: 'clothes',
    name: 'Fast Running Sneakers',
    icon: '👟',
    cost: 15,
    category: 'item',
    desc: '+10 Athletics & +7 Health',
    effects: { health: 7, skill: ['athletics', 10] }
  },
  {
    id: 'store-cap',
    section: 'clothes',
    name: 'Sporty Cap',
    icon: '🧢',
    cost: 10,
    category: 'item',
    desc: '+8 Happiness, +6 Athletics & Equips Cap!',
    effects: { happiness: 8, skill: ['athletics', 6] }
  },
  {
    id: 'store-sunglasses',
    section: 'clothes',
    name: 'Cool Sunglasses',
    icon: '🕶️',
    cost: 12,
    category: 'item',
    desc: '+10 Happiness & Equips Glasses!',
    effects: { happiness: 10, kindness: 4 }
  },
  {
    id: 'store-suit',
    section: 'clothes',
    name: 'Sharp Suit & Cardigan',
    icon: '🤵',
    cost: 22,
    category: 'item',
    desc: '+11 Happiness, +8 Kindness & Equips Cardigan!',
    effects: { happiness: 11, kindness: 8 }
  }
];

function buyStoreItem(storeItemId) {
  if (!gameState) return;
  const prod = STORE_CATALOG.find(p => p.id === storeItemId);
  if (!prod) return;
  if (gameState.money < prod.cost) {
    showToast(`🪙 You need $${prod.cost} to buy ${prod.name} (You have $${gameState.money})!`);
    return;
  }

  gameState.money -= prod.cost;
  addToInventory({
    id: prod.id,
    name: prod.name,
    icon: prod.icon,
    category: prod.category,
    qty: 1,
    desc: prod.desc,
    effects: prod.effects
  });

  // If it's a gear/clothes item, also display it on the room shelf & apply a small purchase joy boost!
  if (prod.category === 'item') {
    if (!gameState.birthdayItems) gameState.birthdayItems = [];
    if (!gameState.birthdayItems.some(b => b.name === prod.name)) {
      gameState.birthdayItems.unshift({
        age: gameState.age,
        name: prod.name,
        icon: prod.icon
      });
    }
    const lower = prod.name.toLowerCase();
    if (lower.includes('headphones')) gameState.avatar.accessory = 'headphones';
    else if (lower.includes('cap')) gameState.avatar.accessory = 'cap';
    else if (lower.includes('sunglasses')) gameState.avatar.accessory = 'round-glasses';
    else if (lower.includes('hoodie')) gameState.avatar.outfit = 'hoodie';
    else if (lower.includes('suit')) gameState.avatar.outfit = 'cardigan';
  }

  SoundFX.milestone();
  addCurrentYearLog(`🛒 Bought ${prod.icon} ${prod.name} for $${prod.cost} at the Store and kept it in your 🎒 Inventory!`);
  showToast(`🛒 Purchased ${prod.icon} ${prod.name} (-$${prod.cost})! Added to 🎒 Inventory & Room!`);
  advanceQuestProgress('buy', prod.section);
  saveGame();
  renderAll();
}

function openFurnitureShopModal() {
  if (!gameState) return;
  SoundFX.pop();
  const modal = document.getElementById('event-modal');
  const content = document.getElementById('event-modal-body');
  const furnitureItems = STORE_CATALOG.filter(i => i.section === 'furniture');
  const ownedSet = new Set([
    ...(gameState.inventory || []).map(i => i.name),
    ...(gameState.birthdayItems || []).map(b => b.name),
    ...(gameState.placedFurniture || [])
  ]);

  content.innerHTML = `
    <div class="modal-top-row">
      <div class="modal-header-badge" style="margin-bottom:0;">🪑 Room Furniture & Interior Decor (🪙 Savings: $${gameState.money})</div>
      <button type="button" class="modal-out-btn" onclick="closeModal()">⬅️ Out / Close ✖</button>
    </div>
    <h2>Decorate & Upgrade Your Room</h2>
    <p class="modal-story-text" style="margin:6px 0 12px;">Your room comes with your <strong>Cozy Bed, Blue Sofa & Golden Floor Lamp, Study Desk, Treasure Shelf, Mini Fridge, and Wardrobe</strong>! Buy extra furniture below to place it right inside your 2D Room:</p>
    <div class="choice-list" style="max-height:330px;overflow-y:auto;padding-right:4px;">
      ${furnitureItems.map(item => {
        const isOwned = ownedSet.has(item.name);
        const canAfford = gameState.money >= item.cost;
        return `
          <div class="friend-card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;">
            <div style="display:flex;align-items:center;gap:10px;flex:1;">
              <span style="font-size:1.7rem;">${item.icon}</span>
              <div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <strong>${item.name} ($${item.cost})</strong>
                  ${isOwned ? `<span class="conseq-tag conseq-good">✓ In Room</span>` : ''}
                </div>
                <div style="font-size:0.76rem;color:#4A4E69;margin-top:2px;">${item.desc}</div>
              </div>
            </div>
            <button type="button" class="energy-btn ${canAfford ? 'eat-btn' : 'wait-night-btn'}"
              onclick="${canAfford ? `buyStoreItem('${item.id}'); openFurnitureShopModal();` : `showToast('You need $${item.cost} for ${item.name}!')`}">
              ${isOwned ? `🛒 Buy Another ($${item.cost})` : `🪑 Buy & Place ($${item.cost})`}
            </button>
          </div>
        `;
      }).join('')}
    </div>
    <div style="margin-top:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;">
      <button type="button" class="secondary-btn" onclick="closeModal(); World2D.enterRoom('my-room');">🛏️ Back to My Room</button>
      <button type="button" class="modal-out-btn" onclick="closeModal()">⬅️ Out / Done</button>
    </div>
  `;
  modal.classList.remove('hidden');
}

function cureSickness() {
  if (!gameState) return;
  SoundFX.milestone();
  gameState.isSick = false;
  gameState.energy = Math.min(100, Math.round(gameState.energy + 10));
  gameState.stats.health = clampStat(gameState.stats.health + 8);
  addCurrentYearLog('🍲 Had warm homemade soup and rest — you are no longer sick! (+10% Energy, +8 Health)');
  showToast('💚 All better! Sickness cured & +10% Energy!');
  saveGame();
  renderAll();
}

// ==========================================
// 10 WEEKS (7 DAYS PER WEEK = 70 DAYS) TO BIRTHDAY
// ==========================================

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function advanceDays(numDays = 1, fromSleep = false) {
  if (!gameState) return;
  if (!gameState.week) gameState.week = 1;
  if (!gameState.day) gameState.day = 1;

  if (!fromSleep) {
    // Passing days without sleeping drains daily energy (and +5% faster if Sick!)
    const dailyDrain = (numDays === 1 ? 6 : 15) + (gameState.isSick ? 5 : 0);
    gameState.energy = Math.max(0, Math.round(gameState.energy - dailyDrain));
    if (!gameState.isSick && gameState.energy < 25 && Math.random() < 0.35) {
      gameState.isSick = true;
      addCurrentYearLog('🤒 Your energy got low and you caught a cold! (Energy decays +5% faster while sick!)');
    }
  }

  let reachedBirthday = false;
  for (let i = 0; i < numDays; i++) {
    gameState.day += 1;
    if (gameState.day > 7) {
      gameState.day = 1;
      gameState.week += 1;
      if (gameState.week > 10) {
        gameState.week = 1;
        gameState.day = 1;
        reachedBirthday = true;
        break;
      }
    }
  }

  if (reachedBirthday) {
    ageUpOneYear();
  } else {
    if (!fromSleep) {
      SoundFX.pop();
      const dayName = DAY_NAMES[(gameState.day - 1) % 7];
      showToast(`📅 Week ${gameState.week}/10 • Day ${gameState.day}/7 (${dayName})`);
    }
    saveGame();
    renderAll();
  }
}

function saveGame() {
  if (gameState) {
    gameState.lastSavedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    localStorage.setItem('sunnydays_save_v1', JSON.stringify(gameState));
    const pill = document.getElementById('save-status-pill');
    if (pill) {
      pill.textContent = `✓ Saved (${gameState.name}, Age ${gameState.age})`;
    }
    const continueBtn = document.getElementById('btn-continue-saved');
    if (continueBtn) {
      continueBtn.classList.remove('hidden');
    }
  }
}

function manualSaveGame() {
  if (!gameState) {
    showToast('Create or load a character first to save your game! 🌱');
    return;
  }
  saveGame();
  // Also back up to Slot 1 automatically on manual save if Slot 1 is empty
  const slots = getSaveSlots();
  if (!slots[0]) {
    slots[0] = JSON.parse(JSON.stringify(gameState));
    localStorage.setItem('sunnydays_slots_v1', JSON.stringify(slots));
  }
  SoundFX.milestone();
  showToast(`💾 Game Saved! (${gameState.name} • Age ${gameState.age} • $${gameState.money})`);
}

function getSaveSlots() {
  try {
    const raw = localStorage.getItem('sunnydays_slots_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 3) return parsed;
    }
  } catch (e) {}
  return [null, null, null];
}

function saveToSlot(slotIdx) {
  if (!gameState) {
    showToast('Start a life first before saving to a slot!');
    return;
  }
  const slots = getSaveSlots();
  gameState.lastSavedAt = new Date().toLocaleString();
  slots[slotIdx] = JSON.parse(JSON.stringify(gameState));
  localStorage.setItem('sunnydays_slots_v1', JSON.stringify(slots));
  saveGame();
  SoundFX.milestone();
  showToast(`💾 Saved ${gameState.name} (Age ${gameState.age}) to Slot #${slotIdx + 1}!`);
  openSaveSlotsModal();
}

function loadFromSlot(slotIdx) {
  const slots = getSaveSlots();
  const data = slots[slotIdx];
  if (!data) return;
  gameState = JSON.parse(JSON.stringify(data));
  saveGame();
  closeModal();
  SoundFX.milestone();
  startGameDashboard();
  showToast(`📂 Loaded ${gameState.name} (Age ${gameState.age}) from Slot #${slotIdx + 1}!`);
}

function exportSaveFile() {
  if (!gameState) {
    showToast('No active game to export yet!');
    return;
  }
  saveGame();
  const blob = new Blob([JSON.stringify(gameState, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sunnydays-${gameState.name.toLowerCase()}-age-${gameState.age}.json`;
  a.click();
  URL.revokeObjectURL(url);
  SoundFX.milestone();
  showToast(`⬇️ Downloaded save file for ${gameState.name} (Age ${gameState.age})!`);
}

function importSaveFile(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported && typeof imported.age === 'number' && imported.name) {
        gameState = imported;
        saveGame();
        closeModal();
        SoundFX.milestone();
        startGameDashboard();
        showToast(`📂 Imported ${gameState.name} (Age ${gameState.age})!`);
      } else {
        showToast('Invalid SunnyDays save file!');
      }
    } catch (err) {
      showToast('Could not read save file!');
    }
  };
  reader.readAsText(file);
}

function openSaveSlotsModal() {
  SoundFX.pop();
  const modal = document.getElementById('event-modal');
  const content = document.getElementById('event-modal-body');
  const slots = getSaveSlots();

  content.innerHTML = `
    <div class="modal-header-badge">💾 Save & Load Manager</div>
    <h2>Your SunnyDays Save Slots</h2>
    <p class="modal-story-text">Your progress auto-saves after every action, and you can also save to 3 slots or download a backup file!</p>
    <div class="choice-list">
      ${slots.map((slot, idx) => `
        <div class="friend-card" style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <div>
            <strong>📂 Slot #${idx + 1}: ${slot ? `${slot.name} (Age ${slot.age} • $${slot.money})` : 'Empty Slot'}</strong>
            <div style="font-size:0.76rem;color:#6C757D;">
              ${slot ? `${slot.hometown ? slot.hometown.name : ''} • Saved ${slot.lastSavedAt || 'recently'}` : 'Click "Save Here" to store your current life'}
            </div>
          </div>
          <div style="display:flex;gap:6px;">
            ${gameState ? `<button type="button" class="energy-btn eat-btn" onclick="saveToSlot(${idx})">💾 Save Here</button>` : ''}
            ${slot ? `<button type="button" class="energy-btn sleep-btn" onclick="loadFromSlot(${idx})">▶ Load</button>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:16px;flex-wrap:wrap;">
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${gameState ? `<button type="button" class="secondary-btn" onclick="exportSaveFile()">⬇️ Download Save (.json)</button>` : ''}
        <label class="secondary-btn" style="cursor:pointer;display:inline-block;">
          ⬆️ Import Save (.json)
          <input type="file" accept=".json" style="display:none;" onchange="importSaveFile(event)" />
        </label>
      </div>
      <button type="button" class="secondary-btn" onclick="closeModal()">Close</button>
    </div>
  `;
  modal.classList.remove('hidden');
}

function resetToCreator() {
  SoundFX.pop();
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('creator-screen').classList.remove('hidden');
  renderCreatorScreen();
}

// ==========================================
// FRIENDSHIP SYSTEM
// ==========================================

function getFriendshipTier(bond) {
  if (bond >= 90) return { label: 'Lifelong Bestie 🌟', color: '#F59E0B', badgeClass: 'tier-bestie' };
  if (bond >= 70) return { label: 'Best Friend 💛', color: '#EC4899', badgeClass: 'tier-best' };
  if (bond >= 45) return { label: 'Good Friend 😊', color: '#10B981', badgeClass: 'tier-good' };
  if (bond >= 25) return { label: 'Buddy 👋', color: '#3B82F6', badgeClass: 'tier-buddy' };
  return { label: 'Classmate / Neighbor 🌱', color: '#6B7280', badgeClass: 'tier-new' };
}

function getFriendLifeStatus(friend, age) {
  if (age <= 4) return `Playgroup Playmate • Loves ${friend.favoriteInterest}`;
  if (age <= 10) return `Elementary Classmate • Dreams of ${friend.childhoodDream}`;
  if (age <= 13) return `Middle School Pal • ${friend.trait}`;
  if (age <= 17) return `High School Friend • Currently ${friend.teenUpdate}`;
  if (age <= 21) return `Young Adult • Currently ${friend.collegeUpdate}`;
  if (age <= 64) return `Working as ${friend.adultJob}`;
  return `Retired ${friend.adultJob} • Living the Golden Years`;
}

function getHangoutActivityText(friend, age) {
  const first = friend.name.split(' ')[0];
  if (age <= 4) return `You and ${first} built a giant tower of wooden blocks and giggled all afternoon!`;
  if (age <= 10) return `You and ${first} rode bikes to the park, traded stickers, and shared ice pops!`;
  if (age <= 13) return `You and ${first} listened to music, worked on ${friend.favoriteInterest.toLowerCase()}, and swapped stories!`;
  if (age <= 17) return `You and ${first} hung out after school grabbing smoothies and talking about the future!`;
  if (age <= 24) return `You and ${first} met up at a cozy café for board games and late-afternoon laughs!`;
  return `You and ${first} spent a wonderful Saturday catching up over homemade food and shared memories!`;
}

function meetNewFriendFromPool(forcedId = null) {
  const existingIds = new Set(gameState.friends.map(f => f.id));
  let candidates = GAME_DATA.friendPool.filter(f => !existingIds.has(f.id));
  if (candidates.length === 0) return null;

  let chosen = null;
  if (forcedId) {
    chosen = candidates.find(c => c.id === forcedId);
  }
  if (!chosen) {
    const stageId = getLifeStageInfo(gameState.age).id;
    const stageMatches = candidates.filter(c => c.metStage === stageId);
    chosen = stageMatches.length > 0 ? stageMatches[0] : candidates[0];
  }

  const newFriend = JSON.parse(JSON.stringify(chosen));
  newFriend.bond = gameState.trait.id === 'kindhearted' ? 38 : 30;
  newFriend.metAtAge = gameState.age;
  gameState.friends.push(newFriend);
  SoundFX.friend();
  return newFriend;
}

function hangOutWithFriend(friendId) {
  const friend = gameState.friends.find(f => f.id === friendId);
  if (!friend) return;
  if (!spendEnergy(15)) return;

  const oldTier = getFriendshipTier(friend.bond).label;
  const gain = gameState.trait.id === 'kindhearted' ? 16 : 13;
  friend.bond = clampStat(friend.bond + gain);
  const newTier = getFriendshipTier(friend.bond).label;

  gameState.stats.happiness = clampStat(gameState.stats.happiness + 6);
  gameState.stats.kindness = clampStat(gameState.stats.kindness + 4);

  const text = getHangoutActivityText(friend, gameState.age);
  addCurrentYearLog(`🤝 ${text} (+${gain} Friendship with ${friend.name}, -${getEnergyCost(15)}% Energy)`);

  if (oldTier !== newTier && friend.bond >= 70) {
    addScrapbookMoment(
      `Best Friends with ${friend.name}! 💛`,
      `At age ${gameState.age}, you and ${friend.name} became ${newTier}!`
    );
    SoundFX.milestone();
    showToast(`🎉 Milestone! You and ${friend.name} are now ${newTier}!`);
  } else {
    SoundFX.friend();
    showToast(`Hung out with ${friend.name}! Friendship +${gain} 💛`);
  }

  advanceQuestProgress('friend', friend.id);
  saveGame();
  renderAll();
}

function heartToHeartWithFriend(friendId) {
  const friend = gameState.friends.find(f => f.id === friendId);
  if (!friend) return;
  if (!spendEnergy(12)) return;

  const gain = gameState.trait.id === 'kindhearted' ? 15 : 12;
  friend.bond = clampStat(friend.bond + gain);
  gameState.stats.kindness = clampStat(gameState.stats.kindness + 6);
  gameState.stats.smarts = clampStat(gameState.stats.smarts + 3);
  gameState.stats.happiness = clampStat(gameState.stats.happiness + 5);

  const first = friend.name.split(' ')[0];
  addCurrentYearLog(`💬 Had a warm heart-to-heart chat with ${first} about ${friend.favoriteInterest.toLowerCase()} and life dreams (-${getEnergyCost(12)}% Energy).`);
  SoundFX.friend();
  showToast(`Heart-to-heart with ${first}! Kindness +6, Friendship +${gain}`);
  advanceQuestProgress('friend', friend.id);
  saveGame();
  renderAll();
}

function openGiftModal(friendId) {
  const friend = gameState.friends.find(f => f.id === friendId);
  if (!friend) return;

  const modal = document.getElementById('event-modal');
  const content = document.getElementById('event-modal-body');

  content.innerHTML = `
    <div class="modal-header-badge">🎁 Choose a Thoughtful Gift</div>
    <h2>Give a Gift to ${friend.name}</h2>
    <p class="modal-subtext">Hint: ${friend.name.split(' ')[0]} loves <strong>${friend.favoriteInterest}</strong>! Your Savings: <strong>$${gameState.money}</strong></p>
    <div class="gift-grid">
      ${GAME_DATA.gifts.map(g => {
        const isFav = g.id === friend.favoriteGift;
        const canAfford = gameState.money >= g.cost;
        return `
          <button class="gift-card-btn ${!canAfford ? 'disabled' : ''}"
            onclick="${canAfford ? `sendGiftToFriend('${friend.id}', '${g.id}')` : `showToast('Not enough pocket money / savings yet!')`}">
            <span class="gift-icon">${g.icon}</span>
            <div class="gift-info">
              <strong>${g.name} ($${g.cost})</strong>
              <small>Great for: ${g.bestFor} ${isFav ? '⭐ Favorite!' : ''}</small>
            </div>
          </button>
        `;
      }).join('')}
    </div>
    <div style="margin-top:16px;text-align:right;">
      <button class="secondary-btn" onclick="closeModal()">Cancel</button>
    </div>
  `;
  modal.classList.remove('hidden');
}

function sendGiftToFriend(friendId, giftId) {
  const friend = gameState.friends.find(f => f.id === friendId);
  const gift = GAME_DATA.gifts.find(g => g.id === giftId);
  if (!friend || !gift || gameState.money < gift.cost) return;

  gameState.money -= gift.cost;
  const isFav = gift.id === friend.favoriteGift;
  const gain = isFav ? 24 : 14;
  friend.bond = clampStat(friend.bond + gain);
  gameState.stats.kindness = clampStat(gameState.stats.kindness + 7);
  gameState.stats.happiness = clampStat(gameState.stats.happiness + 6);

  closeModal();
  if (isFav) {
    SoundFX.milestone();
    addCurrentYearLog(`🎁 Gave ${friend.name} their favorite gift (${gift.name} ${gift.icon})! Their eyes lit up with joy! (+${gain} Friendship)`);
    showToast(`🌟 Favorite Gift! ${friend.name} loved the ${gift.name}! (+${gain} Bond)`);
  } else {
    SoundFX.friend();
    addCurrentYearLog(`🎁 Gifted ${gift.name} ${gift.icon} to ${friend.name}! (+${gain} Friendship)`);
    showToast(`Gave ${gift.name} to ${friend.name}! (+${gain} Bond)`);
  }
  advanceQuestProgress('friend', friend.id);
  saveGame();
  renderAll();
}

function activelyMakeNewFriend() {
  const existingIds = new Set(gameState.friends.map(f => f.id));
  const remaining = GAME_DATA.friendPool.filter(f => !existingIds.has(f.id));
  if (remaining.length === 0) {
    showToast('You have already met every single friend in town! You are a social legend! 🌟');
    return;
  }
  if (!spendEnergy(15)) return;

  const nf = meetNewFriendFromPool();
  if (nf) {
    gameState.stats.kindness = clampStat(gameState.stats.kindness + 5);
    gameState.stats.happiness = clampStat(gameState.stats.happiness + 6);
    addCurrentYearLog(`👋 You introduced yourself and made a wonderful new friend: ${nf.name} (${nf.trait})! (-${getEnergyCost(15)}% Energy)`);
    showToast(`New Friend Met: ${nf.name}! 👋`);
    saveGame();
    renderAll();
  }
}

// ==========================================
// YEARLY ACTIVITIES & HOBBIES
// ==========================================

function doYearlyActivity(actType) {
  if (!spendEnergy(15)) return;
  SoundFX.pop();

  if (actType === 'library') {
    gameState.stats.smarts = clampStat(gameState.stats.smarts + 7);
    gameState.skills.story = Math.min(100, gameState.skills.story + 8);
    addCurrentYearLog(`📚 Read adventure & science books at the library (+7 Smarts, +8 Storytelling, -${getEnergyCost(15)}% Energy).`);
    showToast('Library session! +7 Smarts, +8 Storytelling 📚');
  } else if (actType === 'art') {
    gameState.stats.happiness = clampStat(gameState.stats.happiness + 7);
    gameState.skills.art = Math.min(100, gameState.skills.art + 9);
    addCurrentYearLog(`🎨 Painted watercolors and practiced music (+7 Happiness, +9 Art & Music, -${getEnergyCost(15)}% Energy).`);
    showToast('Creative studio time! +7 Happiness, +9 Art 🎨');
  } else if (actType === 'sports') {
    gameState.stats.health = clampStat(gameState.stats.health + 8);
    gameState.stats.happiness = clampStat(gameState.stats.happiness + 4);
    gameState.skills.athletics = Math.min(100, gameState.skills.athletics + 9);
    addCurrentYearLog(`🏃 Played outdoor games in the fresh air (+8 Health, +9 Athletics, -${getEnergyCost(15)}% Energy).`);
    showToast('Outdoor adventure! +8 Health, +9 Athletics 🏃');
  } else if (actType === 'cooking') {
    // Eating what you baked also gives +10% Eat Energy!
    gameState.energy = Math.min(100, Math.round(gameState.energy + 10));
    gameState.stats.happiness = clampStat(gameState.stats.happiness + 6);
    gameState.stats.kindness = clampStat(gameState.stats.kindness + 5);
    gameState.skills.cooking = Math.min(100, gameState.skills.cooking + 9);
    addCurrentYearLog('🧁 Baked & ate warm treats (+10% Eat Energy, +6 Happiness, +9 Cooking).');
    showToast('Baked & ate delicious treats! +10% Energy, +9 Cooking 🧁');
  } else if (actType === 'science') {
    gameState.stats.smarts = clampStat(gameState.stats.smarts + 8);
    gameState.skills.science = Math.min(100, gameState.skills.science + 9);
    addCurrentYearLog(`🔬 Built cool science experiments and coding projects (+8 Smarts, +9 Science, -${getEnergyCost(15)}% Energy).`);
    showToast('Tinkering & Coding! +8 Smarts, +9 Science 🔬');
  } else if (actType === 'volunteer') {
    gameState.stats.kindness = clampStat(gameState.stats.kindness + 9);
    gameState.stats.happiness = clampStat(gameState.stats.happiness + 7);
    gameState.friends.forEach(f => { f.bond = clampStat(f.bond + 4); });
    addCurrentYearLog(`🌻 Helped out in ${gameState.hometown.name} (+9 Kindness, +7 Happiness, +4 All Friends, -${getEnergyCost(15)}% Energy).`);
    showToast('Community Helper! +9 Kindness, +4 Bond with all friends 🌻');
  }

  advanceQuestProgress('activity', actType);
  if (actType === 'library' || actType === 'science') {
    advanceQuestProgress('study', actType);
  }
  saveGame();
  renderAll();
}

// ==========================================
// CLUBS, JOBS, CAREERS, PETS & HOMES
// ==========================================

function joinSchoolClub(clubId) {
  const club = GAME_DATA.schoolClubs.find(c => c.id === clubId);
  if (!club) return;
  gameState.clubId = club.id;
  gameState.skills[club.skill] = Math.min(100, gameState.skills[club.skill] + 6);
  gameState.stats[club.stat] = clampStat(gameState.stats[club.stat] + 5);

  // Check if club friend is already met; if not, meet them!
  const alreadyMet = gameState.friends.find(f => f.id === club.friendMatch);
  if (!alreadyMet) {
    const nf = meetNewFriendFromPool(club.friendMatch);
    if (nf) {
      addCurrentYearLog(`${club.icon} Joined the ${club.name} and met club buddy ${nf.name}!`);
      showToast(`Joined ${club.name} & met ${nf.name}! 🎉`);
    }
  } else {
    alreadyMet.bond = clampStat(alreadyMet.bond + 10);
    addCurrentYearLog(`${club.icon} Joined the ${club.name} with ${alreadyMet.name}!`);
    showToast(`Joined ${club.name}! 🎉`);
  }

  advanceQuestProgress('club', club.id);
  SoundFX.milestone();
  saveGame();
  renderAll();
}

function selectTeenJob(jobId) {
  const job = GAME_DATA.teenJobs.find(j => j.id === jobId);
  if (!job) return;
  gameState.teenJobId = job.id;
  SoundFX.pop();
  addCurrentYearLog(`${job.icon} Started a part-time job as a ${job.name} ($${job.pay}/yr)!`);
  showToast(`Hired as ${job.name}! ${job.icon}`);
  advanceQuestProgress('job', job.id);
  saveGame();
  renderAll();
}

function selectMajor(majorId) {
  const m = GAME_DATA.collegeMajors.find(x => x.id === majorId);
  if (!m) return;
  gameState.majorId = m.id;
  gameState.skills[m.skill] = Math.min(100, gameState.skills[m.skill] + 10);
  SoundFX.milestone();
  addCurrentYearLog(`${m.icon} Declared your University Major in ${m.name}!`);
  showToast(`Major selected: ${m.name}! 🎓`);
  advanceQuestProgress('career', m.id);
  saveGame();
  renderAll();
}

function selectCareer(careerId) {
  const c = GAME_DATA.careers.find(x => x.id === careerId);
  if (!c) return;
  gameState.career = {
    id: c.id,
    levelIndex: 0,
    yearsInRole: 0
  };
  SoundFX.milestone();
  addCurrentYearLog(`${c.icon} Started your career as a ${c.levels[0]} (${c.title})!`);
  addScrapbookMoment(`Started Career: ${c.title} ${c.icon}`, `Began working as a ${c.levels[0]} at age ${gameState.age}.`);
  showToast(`Hired as ${c.levels[0]}! 🎉`);
  advanceQuestProgress('career', c.id);
  saveGame();
  renderAll();
}

function adoptPet(petId) {
  const pet = GAME_DATA.pets.find(p => p.id === petId);
  if (!pet) return;
  if (gameState.pets.includes(pet.id)) return;
  if (gameState.money < pet.cost) {
    showToast(`You need $${pet.cost} to adopt ${pet.name}!`);
    return;
  }

  gameState.money -= pet.cost;
  gameState.pets.push(pet.id);
  gameState.stats.happiness = clampStat(gameState.stats.happiness + 12);
  gameState.stats.kindness = clampStat(gameState.stats.kindness + 8);
  SoundFX.milestone();
  addCurrentYearLog(`${pet.icon} Adopted ${pet.name}! Best furry/shelled friend ever!`);
  addScrapbookMoment(`Adopted ${pet.name} ${pet.icon}`, `Welcomed ${pet.name} into the family at age ${gameState.age}!`);
  showToast(`Adopted ${pet.name}! ${pet.icon}`);
  saveGame();
  renderAll();
}

function upgradeHome(homeId) {
  const home = GAME_DATA.homes.find(h => h.id === homeId);
  if (!home || gameState.homeId === home.id) return;
  if (gameState.money < home.cost) {
    showToast(`You need $${home.cost} to move into the ${home.name}!`);
    return;
  }

  gameState.money -= home.cost;
  gameState.homeId = home.id;
  gameState.stats.happiness = clampStat(gameState.stats.happiness + 15);
  SoundFX.milestone();
  addCurrentYearLog(`${home.icon} Moved into your new ${home.name}! All your friends came over to help unpack!`);
  addScrapbookMoment(`Moved into ${home.name} ${home.icon}`, `Got the keys to your ${home.name} at age ${gameState.age}!`);
  showToast(`Welcome to your new ${home.name}! 🏡`);
  saveGame();
  renderAll();
}

function hostFriendReunionParty() {
  const cost = gameState.age >= 18 ? 40 : 10;
  if (gameState.money < cost) {
    showToast(`You need $${cost} for party snacks and decorations!`);
    return;
  }
  if (!spendEnergy(20)) return;

  gameState.money -= cost;
  gameState.stats.happiness = clampStat(gameState.stats.happiness + 12);
  gameState.stats.kindness = clampStat(gameState.stats.kindness + 8);
  gameState.friends.forEach(f => { f.bond = clampStat(f.bond + 12); });

  SoundFX.milestone();
  addCurrentYearLog(`🎈 Hosted an epic Friendship Gathering! Every single friend gained +12 Bond (-${getEnergyCost(20)}% Energy)!`);
  showToast('Friendship Party! +12 Bond with all friends! 🎈');
  saveGame();
  renderAll();
}

// ==========================================
// AGING UP & YEARLY STORY MODAL
// ==========================================

const BIRTHDAY_AGE_ITEM_POOLS = {
  1: [
    { name: 'Teddy Bear', icon: '🧸', desc: '+10 Happiness & +6 Kindness', effects: { happiness: 10, kindness: 6 } },
    { name: 'Blanket', icon: '🧶', desc: '+15% Energy ⚡ & +8 Health', effects: { energy: 15, health: 8 } },
    { name: 'Comfy Shirt', icon: '👕', desc: '+8 Happiness & +6 Health', effects: { happiness: 8, health: 6 } },
    { name: 'Pillow', icon: '🛌', desc: '+20% Energy ⚡ & +6 Happiness', effects: { energy: 20, happiness: 6 } },
    { name: 'Shorts', icon: '🩳', desc: '+8 Happiness & +6 Athletics', effects: { happiness: 8, skill: ['athletics', 6] } }
  ],
  2: [
    { name: 'Blocks', icon: '🧱', desc: '+8 Smarts & +6 Science', effects: { smarts: 8, skill: ['science', 6] } },
    { name: 'Book', icon: '📖', desc: '+9 Smarts & +8 Storytelling', effects: { smarts: 9, skill: ['story', 8] } },
    { name: 'Toy House', icon: '🏠', desc: '+10 Happiness & +6 Kindness', effects: { happiness: 10, kindness: 6 } },
    { name: 'Cute Robe', icon: '👘', desc: '+12% Energy ⚡ & +8 Happiness', effects: { energy: 12, happiness: 8 } },
    { name: 'Crayons', icon: '🖍️', desc: '+9 Art Skill & +7 Happiness', effects: { happiness: 7, skill: ['art', 9] } },
    { name: 'Notebook', icon: '📓', desc: '+7 Smarts & +8 Storytelling', effects: { smarts: 7, skill: ['story', 8] } }
  ],
  3: [
    { name: 'Pen', icon: '🖊️', desc: '+7 Smarts & +7 Storytelling', effects: { smarts: 7, skill: ['story', 7] } },
    { name: 'Marker', icon: '🖍️', desc: '+9 Art Skill & +7 Happiness', effects: { happiness: 7, skill: ['art', 9] } },
    { name: 'Science Set', icon: '🔬', desc: '+10 Smarts & +10 Science Skill', effects: { smarts: 10, skill: ['science', 10] } },
    { name: 'Toy Dog', icon: '🐶', desc: '+10 Happiness & +8 Kindness', effects: { happiness: 10, kindness: 8 } },
    { name: 'Cap', icon: '🧢', desc: '+8 Happiness & +6 Athletics', effects: { happiness: 8, skill: ['athletics', 6] } },
    { name: 'Comic Book', icon: '🦸', desc: '+9 Happiness & +8 Storytelling', effects: { happiness: 9, skill: ['story', 8] } },
    { name: 'Sunglasses', icon: '🕶️', desc: '+10 Happiness & Cool Style!', effects: { happiness: 10, kindness: 4 } }
  ],
  4: [
    { name: 'Flashlight', icon: '🔦', desc: '+8 Smarts & +8 Athletics', effects: { smarts: 8, skill: ['athletics', 8] } },
    { name: 'Explorer Set', icon: '🧭', desc: '+10 Athletics & +8 Science', effects: { skill: ['athletics', 10], smarts: 8 } },
    { name: 'Hoodie', icon: '🧥', desc: '+9 Happiness & +6 Health', effects: { happiness: 9, health: 6 } },
    { name: 'Jeans', icon: '👖', desc: '+8 Happiness & +6 Health', effects: { happiness: 8, health: 6 } },
    { name: 'Sneakers', icon: '👟', desc: '+10 Athletics & +7 Health', effects: { health: 7, skill: ['athletics', 10] } },
    { name: 'Scrapbook', icon: '📒', desc: '+9 Storytelling & +8 Kindness', effects: { kindness: 8, skill: ['story', 9] } }
  ],
  5: [
    { name: 'Backpack', icon: '🎒', desc: '+9 Smarts & +7 Happiness', effects: { smarts: 9, happiness: 7 } },
    { name: 'Toy Ice Cream', icon: '🍦', desc: '+10 Happiness & +7 Cooking', effects: { happiness: 10, skill: ['cooking', 7] } },
    { name: 'Scarf', icon: '🧣', desc: '+8 Health & +7 Happiness', effects: { health: 8, happiness: 7 } },
    { name: 'Socks', icon: '🧦', desc: '+10% Energy ⚡ & +6 Health', effects: { energy: 10, health: 6 } },
    { name: 'Coloring Set', icon: '🎨', desc: '+10 Art Skill & +8 Happiness', effects: { happiness: 8, skill: ['art', 10] } },
    { name: 'Ruler', icon: '📏', desc: '+8 Smarts & +6 Science', effects: { smarts: 8, skill: ['science', 6] } }
  ],
  '6-9': [
    { name: 'Bag', icon: '👜', desc: '+9 Happiness & +6 Kindness', effects: { happiness: 9, kindness: 6 } },
    { name: 'Lamp', icon: '🛋️', desc: '+12% Energy ⚡ & +8 Smarts', effects: { energy: 12, smarts: 8 } },
    { name: 'Suit', icon: '🤵', desc: '+10 Happiness & +8 Kindness', effects: { happiness: 10, kindness: 8 } },
    { name: 'Wig', icon: '💇', desc: '+12 Happiness & +8 Art Skill', effects: { happiness: 12, skill: ['art', 8] } },
    { name: 'Mini Fridge', icon: '🧊', desc: '+15% Energy ⚡ & +8 Cooking', effects: { energy: 15, skill: ['cooking', 8] } },
    { name: 'Mini Tablet', icon: '📱', desc: '+9 Smarts & +9 Science Skill', effects: { smarts: 9, skill: ['science', 9] } },
    { name: 'Clock', icon: '⏰', desc: '+12% Energy ⚡ & +7 Smarts', effects: { energy: 12, smarts: 7 } }
  ],
  '10-14': [
    { name: 'Extra Allowance ($20)', icon: '💵', desc: '+$20 Money & +8 Happiness', effects: { money: 20, happiness: 8 } },
    { name: 'Tablet', icon: '📱', desc: '+10 Smarts & +9 Art Skill', effects: { smarts: 10, skill: ['art', 9] } },
    { name: 'Laptop', icon: '💻', desc: '+12 Smarts & +12 Science Skill', effects: { smarts: 12, skill: ['science', 12] } },
    { name: 'Game', icon: '🎮', desc: '+14 Happiness & +10 Friend Bond', effects: { happiness: 14, friendBoost: 10 } },
    { name: 'Phone', icon: '📲', desc: '+12 Happiness & +10 All Friends Bond', effects: { happiness: 12, allFriendsBoost: 10 } },
    { name: 'Watch', icon: '⌚', desc: '+8 Smarts & +7 Happiness', effects: { smarts: 8, happiness: 7 } },
    { name: 'Hood', icon: '🧥', desc: '+9 Happiness & +6 Health', effects: { happiness: 9, health: 6 } },
    { name: 'Jeans', icon: '👖', desc: '+8 Happiness & +6 Health', effects: { happiness: 8, health: 6 } },
    { name: 'Music Player', icon: '🎵', desc: '+12 Happiness & +9 Art & Music Skill', effects: { happiness: 12, skill: ['art', 9] } },
    { name: 'Headphones', icon: '🎧', desc: '+12 Happiness, +8 Art & Equips Headphones!', effects: { happiness: 12, skill: ['art', 8], equipAccessory: 'headphones' } }
  ]
};

function getAgeGiftPool(age) {
  if (age === 1) return BIRTHDAY_AGE_ITEM_POOLS[1];
  if (age === 2) return BIRTHDAY_AGE_ITEM_POOLS[2];
  if (age === 3) return BIRTHDAY_AGE_ITEM_POOLS[3];
  if (age === 4) return BIRTHDAY_AGE_ITEM_POOLS[4];
  if (age === 5) return BIRTHDAY_AGE_ITEM_POOLS[5];
  if (age >= 6 && age <= 9) return BIRTHDAY_AGE_ITEM_POOLS['6-9'];
  if (age >= 10 && age <= 14) return BIRTHDAY_AGE_ITEM_POOLS['10-14'];
  return null; // Age > 14 (14+) uses random money gifts (not more than $800)!
}

function generateBirthdayPresents() {
  const bf = getTopFriend(gameState);
  const bfName = bf ? bf.name.split(' ')[0] : 'Bestie';
  const senders = [
    { sender: 'From Mom 🏡', boxIcon: '🎁' },
    { sender: 'From Dad 🚗', boxIcon: '🎀' },
    { sender: 'From Siblings Lily & Milo 👫', boxIcon: '💝' },
    { sender: `From Best Friend ${bfName} 🌟`, boxIcon: '🎊' }
  ];

  const age = gameState.age;
  const itemPool = getAgeGiftPool(age);

  // Ages 1–14: Pick 4 random distinct items from the exact age item pool!
  if (itemPool && itemPool.length > 0) {
    const shuffled = [...itemPool].sort(() => Math.random() - 0.5);
    const chosen4 = shuffled.slice(0, 4);

    return chosen4.map((item, idx) => {
      const sInfo = senders[idx % senders.length];
      return {
        id: idx,
        opened: false,
        sender: sInfo.sender,
        boxIcon: sInfo.boxIcon,
        openIcon: item.icon,
        title: `${item.icon} ${item.name}`,
        desc: item.desc,
        apply() {
          const eff = item.effects || {};
          if (eff.money) gameState.money += eff.money;
          if (eff.energy) gameState.energy = Math.min(100, Math.round(gameState.energy + eff.energy));
          if (eff.happiness) gameState.stats.happiness = clampStat(gameState.stats.happiness + eff.happiness);
          if (eff.health) gameState.stats.health = clampStat(gameState.stats.health + eff.health);
          if (eff.smarts) gameState.stats.smarts = clampStat(gameState.stats.smarts + eff.smarts);
          if (eff.kindness) gameState.stats.kindness = clampStat(gameState.stats.kindness + eff.kindness);
          if (eff.skill) {
            const [sk, amt] = eff.skill;
            gameState.skills[sk] = Math.min(100, (gameState.skills[sk] || 0) + amt);
          }
          if (eff.friendBoost && bf) {
            bf.bond = clampStat(bf.bond + eff.friendBoost);
          }
          if (eff.allFriendsBoost) {
            gameState.friends.forEach(f => { f.bond = clampStat(f.bond + eff.allFriendsBoost); });
          }
          if (eff.equipAccessory && gameState.avatar) {
            gameState.avatar.accessory = eff.equipAccessory;
          }
          if (!gameState.birthdayItems) gameState.birthdayItems = [];
          gameState.birthdayItems.unshift({
            age: gameState.age,
            name: item.name,
            icon: item.icon
          });
          addToInventory({
            id: `bday-${item.name.toLowerCase().replace(/\s+/g, '-')}-${gameState.age}`,
            name: item.name,
            icon: item.icon,
            category: 'item',
            qty: 1,
            ageUnlocked: gameState.age,
            desc: item.desc,
            effects: item.effects
          });
          addCurrentYearLog(`${sInfo.boxIcon} Present #${idx + 1} (${sInfo.sender}): Unwrapped ${item.icon} ${item.name} (${item.desc}) & added to Inventory!`);
        }
      };
    });
  }

  // Age 14+ (Age 15+): Random Money Gifts (strictly NOT more than $800!)
  // Each present gives random cash between $40 and $200 so neither any present nor the total of all 4 ever exceeds $800!
  return senders.map((sInfo, idx) => {
    const cashAmount = Math.floor(40 + Math.random() * 161); // $40 to $200 per present (Total max <= $800)
    return {
      id: idx,
      opened: false,
      sender: sInfo.sender,
      boxIcon: sInfo.boxIcon,
      openIcon: '💵',
      title: `💵 $${cashAmount} Birthday Cash`,
      desc: `+$${cashAmount} Savings (Max $800 limit) & +6 Happiness`,
      apply() {
        gameState.money += cashAmount;
        gameState.stats.happiness = clampStat(gameState.stats.happiness + 6);
        if (!gameState.birthdayItems) gameState.birthdayItems = [];
        gameState.birthdayItems.unshift({
          age: gameState.age,
          name: `$${cashAmount} Birthday Cash`,
          icon: '💵'
        });
        addCurrentYearLog(`${sInfo.boxIcon} Present #${idx + 1} (${sInfo.sender}): Unwrapped 💵 $${cashAmount} Birthday Cash (+6 Happiness)!`);
      }
    };
  });
}

function ageUpOneYear() {
  // Reset 10-Week / 7-Day Birthday Calendar for the new year!
  gameState.week = 1;
  gameState.day = 1;

  // Aging up a year naturally costs 20% Energy (or 25% if Sick!)
  const yearDecay = getEnergyCost(20);
  gameState.energy = Math.max(0, Math.round(gameState.energy - yearDecay));

  gameState.age += 1;
  SoundFX.milestone();

  const yearlyLogs = [];
  yearlyLogs.push(`🎂 HAPPY BIRTHDAY! You completed 10 Weeks (70 Days) and turned Age ${gameState.age}! You received 4 Birthday Presents! 🎁🎁🎁🎁`);
  yearlyLogs.push(`⚡ Yearly Energy used: -${yearDecay}%${gameState.isSick ? ' (includes +5% Sick decay!)' : ''}. Current Energy: ${gameState.energy}%.`);

  // Random chance (18%) of catching a seasonal cold if not already sick
  if (!gameState.isSick && Math.random() < 0.18) {
    gameState.isSick = true;
    yearlyLogs.push('🤒 You caught a seasonal cold this year! While sick, your Energy decays +5% faster — click "😴 Sleep (+90%)" or "🍲 Cure Sick"!');
  }

  // 1. Childhood allowance / Teen job / Adult career income
  if (gameState.age >= 5 && gameState.age <= 13) {
    const allowance = gameState.age * 2;
    gameState.money += allowance;
    yearlyLogs.push(`🪙 Received $${allowance} in piggy-bank allowance and birthday cards.`);
  } else if (gameState.age >= 14 && gameState.age <= 21) {
    if (gameState.teenJobId) {
      const job = GAME_DATA.teenJobs.find(j => j.id === gameState.teenJobId);
      if (job) {
        gameState.money += job.pay;
        gameState.stats[job.stat] = clampStat(gameState.stats[job.stat] + 3);
        yearlyLogs.push(`${job.icon} Earned $${job.pay} working part-time as a ${job.name}.`);
      }
    } else {
      gameState.money += 20;
    }
  } else if (gameState.age >= 22 && gameState.age <= 64) {
    if (!gameState.career) {
      // Auto-assign a fitting starter career if player hasn't chosen one yet
      const topSkill = Object.entries(gameState.skills).sort((a, b) => b[1] - a[1])[0][0];
      const matched = GAME_DATA.careers.find(c => c.reqSkill === topSkill) || GAME_DATA.careers[0];
      gameState.career = { id: matched.id, levelIndex: 0, yearsInRole: 0 };
      yearlyLogs.push(`${matched.icon} Began working as a ${matched.levels[0]} (${matched.title})!`);
    }
    const cObj = GAME_DATA.careers.find(c => c.id === gameState.career.id);
    if (cObj) {
      const salary = Math.round(cObj.baseSalary * (1 + gameState.career.levelIndex * 0.35));
      gameState.money += salary;
      gameState.career.yearsInRole += 1;
      gameState.skills[cObj.reqSkill] = Math.min(100, gameState.skills[cObj.reqSkill] + 4);
      yearlyLogs.push(`${cObj.icon} Earned $${salary} as a ${cObj.levels[gameState.career.levelIndex]}.`);

      // Check for promotion every 4 years!
      if (gameState.career.yearsInRole >= 4 && gameState.career.levelIndex < cObj.levels.length - 1) {
        gameState.career.levelIndex += 1;
        gameState.career.yearsInRole = 0;
        const newRole = cObj.levels[gameState.career.levelIndex];
        yearlyLogs.push(`🏆 PROMOTION! You were promoted to ${newRole}!`);
        addScrapbookMoment(`Promoted to ${newRole} 🏆`, `Celebrated a big career promotion at age ${gameState.age}!`);
      }
    }
  } else if (gameState.age >= 65) {
    const pension = 320;
    gameState.money += pension;
    yearlyLogs.push(`🌅 Enjoyed your Golden Years retirement pension (+$${pension}).`);
  }

  // 2. Club bonus during school years
  if (gameState.age >= 6 && gameState.age <= 17 && gameState.clubId) {
    const club = GAME_DATA.schoolClubs.find(c => c.id === gameState.clubId);
    if (club) {
      gameState.skills[club.skill] = Math.min(100, gameState.skills[club.skill] + 4);
      yearlyLogs.push(`${club.icon} Had a blast at ${club.name} meetings (+4 ${club.skill.toUpperCase()}).`);
    }
  }

  // 3. Pet companionship bonuses
  if (gameState.pets.length > 0) {
    gameState.stats.happiness = clampStat(gameState.stats.happiness + gameState.pets.length * 4);
    yearlyLogs.push(`🐾 Your beloved pet${gameState.pets.length > 1 ? 's' : ''} brought daily smiles and cozy cuddles!`);
  }

  // 3b. Check if any Fixed Places (Ages 1-6) unlocked at this exact age!
  if (typeof FIXED_WORLD_PLACES !== 'undefined') {
    const newlyUnlocked = FIXED_WORLD_PLACES.filter(p => p.unlockAge === gameState.age && p.unlockAge > 0);
    if (newlyUnlocked.length > 0) {
      const names = newlyUnlocked.map(p => `${p.icon} ${p.name}`).join(' & ');
      yearlyLogs.push(`🔓 NEW PLACES UNLOCKED (Age ${gameState.age}): ${names}! Click them on the 2D Square!`);
    }
  }

  // 3c. At Age 7+, unlock a RANDOM place from RANDOM_PLACES_POOL!
  if (gameState.age >= 7 && typeof RANDOM_PLACES_POOL !== 'undefined') {
    if (!gameState.unlockedRandomPlaces) gameState.unlockedRandomPlaces = [];
    if (!gameState.randomUnlockAges) gameState.randomUnlockAges = {};

    // At age 16, ensure starter-loft unlocks if not already unlocked
    let poolCandidates = RANDOM_PLACES_POOL.filter(r => !gameState.unlockedRandomPlaces.includes(r.id));
    let picked = null;
    if (gameState.age === 16 && poolCandidates.some(r => r.id === 'starter-loft')) {
      picked = poolCandidates.find(r => r.id === 'starter-loft');
    } else if (poolCandidates.length > 0) {
      picked = poolCandidates[Math.floor(Math.random() * poolCandidates.length)];
    }

    if (picked) {
      gameState.unlockedRandomPlaces.push(picked.id);
      gameState.randomUnlockAges[picked.id] = gameState.age;
      yearlyLogs.push(`🎲 RANDOM PLACE UNLOCKED (Age ${gameState.age}): ${picked.icon} ${picked.name}! Walk over to check it out on the 2D Square!`);
      showToast(`🎲 Unlocked Random Place: ${picked.icon} ${picked.name}!`);
    }
  }

  // 3d. At Age 21, automatically move into your Best Friend's Home!
  if (gameState.age === 21) {
    gameState.livingWith = 'best-friend';
    const bf = getTopFriend(gameState);
    const bfName = bf ? bf.name : 'your Best Friend';
    yearlyLogs.push(`🌟🏡 AGE 21 MOVE-IN: You moved into ${bfName}'s Home on the 2D Square!`);
    if (typeof World2D !== 'undefined') {
      World2D.placePlayerAtCurrentHome();
    }
  }

  // 4. Create the new timeline year card
  const ev = getYearlyEventForPlayer(gameState);
  gameState.timeline.unshift({
    age: gameState.age,
    type: ev.milestone ? 'milestone' : 'normal',
    title: `Age ${gameState.age} — ${ getLifeStageInfo(gameState.age).label }`,
    entries: yearlyLogs
  });

  if (ev.milestone) {
    addCurrentYearLog(`🌟 MILESTONE: ${ev.milestone}`);
  }
  if (ev.scrapbook) {
    addScrapbookMoment(ev.scrapbook, `Memorable milestone at age ${gameState.age}.`);
  }

  // Generate the 4 Birthday Presents for this Birthday!
  window._birthdayPresents = generateBirthdayPresents();

  // Unlock any new age-based Story Quests!
  ensureQuestsInitialized();

  // Show the interactive Birthday Presents + Story Choice modal for this year
  openYearlyEventModal(ev);
  saveGame();
  renderAll();
}

function openYearlyEventModal(ev) {
  const modal = document.getElementById('event-modal');
  const content = document.getElementById('event-modal-body');
  const presents = window._birthdayPresents || [];
  const openedCount = presents.filter(p => p.opened).length;

  content.innerHTML = `
    <div class="modal-header-badge">🎂 Happy ${gameState.age}th Birthday! (10 Weeks Completed!)</div>

    <!-- 4 BIRTHDAY PRESENTS SECTION -->
    <div class="birthday-presents-box">
      <div class="presents-header-row">
        <strong>🎁 Your 4 Birthday Presents (${openedCount} / 4 Opened)</strong>
        ${openedCount < 4 ? `<button type="button" class="unwrap-all-btn" onclick="unwrapAllBirthdayPresents()">✨ Unwrap All 4!</button>` : `<span class="all-opened-tag">✓ All 4 Unwrapped!</span>`}
      </div>
      <div class="presents-grid-4">
        ${presents.map((p, idx) => `
          <div class="present-card ${p.opened ? 'opened' : 'unopened'}"
            onclick="${p.opened ? '' : `unwrapBirthdayPresent(${idx})`}">
            <div class="present-icon">${p.opened ? p.openIcon : p.boxIcon}</div>
            <div class="present-sender">${p.sender}</div>
            ${p.opened ? `
              <strong class="present-title">${p.title}</strong>
              <small class="present-desc">${p.desc}</small>
            ` : `
              <strong class="present-click-label">Click to Unwrap!</strong>
            `}
          </div>
        `).join('')}
      </div>
    </div>

    <h2>${ev.title}</h2>
    <p class="modal-story-text">${ev.text}</p>
    <div class="choice-list">
      ${ev.choices.map((c, idx) => `
        <button class="choice-btn" onclick="resolveYearlyChoice(${idx})">
          <span class="choice-arrow">➜</span>
          <span>${c.label}</span>
        </button>
      `).join('')}
    </div>
  `;

  window._currentYearlyEvent = ev;
  modal.classList.remove('hidden');
}

function unwrapBirthdayPresent(idx) {
  const presents = window._birthdayPresents;
  if (!presents || !presents[idx] || presents[idx].opened) return;
  presents[idx].opened = true;
  presents[idx].apply();
  SoundFX.milestone();
  saveGame();
  renderAll();
  if (window._currentYearlyEvent) {
    openYearlyEventModal(window._currentYearlyEvent);
  }
}

function unwrapAllBirthdayPresents() {
  const presents = window._birthdayPresents || [];
  let anyOpened = false;
  presents.forEach(p => {
    if (!p.opened) {
      p.opened = true;
      p.apply();
      anyOpened = true;
    }
  });
  if (anyOpened) {
    SoundFX.milestone();
    showToast('🎁 Unwrapped all 4 Birthday Presents! 🎉');
    saveGame();
    renderAll();
    if (window._currentYearlyEvent) {
      openYearlyEventModal(window._currentYearlyEvent);
    }
  }
}

function resolveYearlyChoice(choiceIdx) {
  // Automatically unwrap any remaining birthday presents so the player never misses their 4 presents!
  const presents = window._birthdayPresents || [];
  presents.forEach(p => {
    if (!p.opened) {
      p.opened = true;
      p.apply();
    }
  });
  const ev = window._currentYearlyEvent;
  if (!ev || !ev.choices[choiceIdx]) {
    closeModal();
    return;
  }

  const choice = ev.choices[choiceIdx];
  const eff = choice.effects || {};

  if (eff.happiness) gameState.stats.happiness = clampStat(gameState.stats.happiness + eff.happiness);
  if (eff.health) gameState.stats.health = clampStat(gameState.stats.health + eff.health);
  if (eff.smarts) gameState.stats.smarts = clampStat(gameState.stats.smarts + eff.smarts);
  if (eff.kindness) gameState.stats.kindness = clampStat(gameState.stats.kindness + eff.kindness);
  if (eff.money) gameState.money = Math.max(0, gameState.money + eff.money);

  if (eff.skill) {
    const [sk, amt] = eff.skill;
    gameState.skills[sk] = Math.min(100, (gameState.skills[sk] || 0) + amt);
  }
  if (eff.skill2) {
    const [sk, amt] = eff.skill2;
    gameState.skills[sk] = Math.min(100, (gameState.skills[sk] || 0) + amt);
  }
  if (eff.setClub) {
    gameState.clubId = eff.setClub;
  }
  if (eff.setLifePath) {
    gameState.lifePath = eff.setLifePath;
  }
  if (eff.setLivingWith) {
    gameState.livingWith = eff.setLivingWith;
    if (typeof World2D !== 'undefined') {
      World2D.placePlayerAtCurrentHome();
    }
  }
  if (eff.friendBoost) {
    const topF = getTopFriend(gameState);
    if (topF) topF.bond = clampStat(topF.bond + eff.friendBoost);
  }
  if (eff.allFriendsBoost) {
    gameState.friends.forEach(f => { f.bond = clampStat(f.bond + eff.allFriendsBoost); });
  }

  addCurrentYearLog(`✨ ${choice.log}`);

  if (choice.scrapbook) {
    addScrapbookMoment(choice.scrapbook, choice.log);
  }

  if (choice.meetNewFriend) {
    const nf = meetNewFriendFromPool();
    if (nf) {
      addCurrentYearLog(`👋 New Friend Alert! You met ${nf.name} (${nf.trait})!`);
      showToast(`Met a new friend: ${nf.name}! 👋`);
    }
  }

  SoundFX.pop();
  closeModal();
  saveGame();
  renderAll();
}

function closeModal() {
  document.getElementById('event-modal').classList.add('hidden');
}

function addCurrentYearLog(text) {
  if (!gameState.timeline || gameState.timeline.length === 0) return;
  gameState.timeline[0].entries.push(text);
}

function addScrapbookMoment(title, desc) {
  if (!gameState.scrapbook.some(s => s.title === title)) {
    gameState.scrapbook.unshift({
      age: gameState.age,
      title,
      desc
    });
  }
}

// ==========================================
// UI RENDERING
// ==========================================

function switchTab(tabId) {
  SoundFX.pop();
  gameState.activeTab = tabId;
  renderRightPanel();
}

function renderAll() {
  if (!gameState) return;
  renderLeftProfile();
  renderCenterTimeline();
  renderRightPanel();
  if (typeof World2D !== 'undefined') {
    World2D.rebuildNPCs();
  }
}

function interactWithFamily(memberName = 'Mom & Dad') {
  if (!gameState) return;
  SoundFX.friend();
  gameState.stats.happiness = clampStat(gameState.stats.happiness + 6);
  gameState.stats.health = clampStat(gameState.stats.health + 4);
  gameState.stats.kindness = clampStat(gameState.stats.kindness + 4);
  addCurrentYearLog(`👨‍👩‍👧‍👦 Spent warm quality time with ${memberName} (+6 Happiness, +4 Health, +4 Kindness).`);
  showToast(`Family time with ${memberName}! +6 Happiness 💛`);
  advanceQuestProgress('family', memberName);
  saveGame();
  renderAll();
}

function hangOutWithSibling(siblingId) {
  if (!gameState || !gameState.siblings) return;
  const sib = gameState.siblings.find(s => s.id === siblingId);
  if (!sib) return;
  if (!spendEnergy(12)) return;

  sib.bond = clampStat((sib.bond || 80) + 10);
  gameState.stats.happiness = clampStat(gameState.stats.happiness + 8);
  gameState.stats.kindness = clampStat(gameState.stats.kindness + 5);

  SoundFX.friend();
  const sibAge = Math.max(0, gameState.age + sib.ageDiff);
  addCurrentYearLog(`👫 Played and hung out with your ${sib.relation} ${sib.name} (Age ${sibAge})! (+8 Happiness, -${getEnergyCost(12)}% Energy)`);
  showToast(`Hung out with ${sib.relation} ${sib.name}! +8 Happiness 💛`);
  advanceQuestProgress('sibling', sib.id);
  saveGame();
  renderAll();
}

// ==========================================
// PLACE-SPECIFIC CHOICE & CONSEQUENCE SYSTEM
// ==========================================

const PLACE_CONSEQUENCE_EVENTS = {
  'family-home': {
    title: '🏡 Inside the Family Home',
    prompt: 'You are in the Family Home with Mom, Dad, and your Siblings! What do you want to do?',
    options: [
      {
        label: '😴 Sleep in your warm bed (+90% Energy, +1 Day)',
        tag: 'Restful Choice 💚',
        tagClass: 'conseq-good',
        consequence: 'You slept deeply (+90% Energy, +5 Health, cured any sickness, +1 Day)!',
        effects: { sleep: true }
      },
      {
        label: '🧹 Help Mom & Dad clean up and set the table',
        tag: 'Helpful Choice 🌟',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: Mom & Dad are super proud and give you $8 allowance! (+8 Kindness, +6 Happiness, -10% Energy)',
        effects: { energyCost: 10, money: 8, kindness: 8, happiness: 6 }
      },
      {
        label: '🛋️ Jump on the couch pillows & stay up way past bedtime!',
        tag: 'Risky Consequence ⚠️',
        tagClass: 'conseq-risky',
        consequence: 'CONSEQUENCE: You had a blast (+6 Happiness), but Mom grounded you from TV and you got exhausted (-25% Energy, -6 Kindness, 35% Sick chance)!',
        effects: { energyCost: 25, happiness: 6, kindness: -6, sickChance: 0.35 }
      }
    ]
  },
  'family-car': {
    title: '🚗 At the Family Car',
    prompt: 'Dad jingles the keys to the Family Car in the driveway! What do you do?',
    options: [
      {
        label: '🎶 Sing road-trip songs with Dad & your Siblings',
        tag: 'Fun Choice 💚',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: Everyone sang along at the top of their lungs! (+8 Happiness, +8 Sibling Bond, -10% Energy)',
        effects: { energyCost: 10, happiness: 8, siblingBoost: 8 }
      },
      {
        label: '🧽 Wash & sponge down the Family Car until it sparkles',
        tag: 'Helpful Choice 🌟',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: Dad pays you $12 for washing the car! (+6 Kindness, +5 Health, -15% Energy)',
        effects: { energyCost: 15, money: 12, kindness: 6, health: 5 }
      },
      {
        label: '🥤 Drink fizzy juice in the backseat without a lid!',
        tag: 'Messy Consequence ⚠️',
        tagClass: 'conseq-risky',
        consequence: 'CONSEQUENCE: Bump in the road! You spilled sticky juice all over the seat (+10% Eat Energy, but -8 Happiness & -7 Kindness scrubbing it up)!',
        effects: { eat: true, happiness: -8, kindness: -7 }
      }
    ]
  },
  'ice-cream-shop': {
    title: '🍦 At the Ice Cream Shop',
    prompt: 'The glass counter is filled with 24 colorful ice cream flavors! What do you choose?',
    options: [
      {
        label: '🍨 Order a Rainbow Sprinkle Cone & share with a friend ($4)',
        tag: 'Sweet Choice 💚',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: Delicious! (+10% Eat Energy, +8 Happiness, +8 Friend Bond, -$4)',
        effects: { eat: true, money: -4, happiness: 8, friendBoost: 8 }
      },
      {
        label: '🧹 Help the scoop chef wipe tables for a free sundae & tip',
        tag: 'Helpful Choice 🌟',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: The owner gives you a free sundae (+10% Eat Energy) AND a $7 helper tip (+7 Kindness)!',
        effects: { eat: true, money: 7, kindness: 7, happiness: 5 }
      },
      {
        label: '🥶 Gulp down a 5-Scoop Brain-Freeze Tower in 5 seconds!',
        tag: 'Brain-Freeze Consequence ⚠️',
        tagClass: 'conseq-risky',
        consequence: 'CONSEQUENCE: OUCH! Mega Brain-Freeze & tummy ache! (+10% Eat Energy, but -9 Health and 45% chance of getting Sick 🤒)!',
        effects: { eat: true, health: -9, sickChance: 0.45 }
      }
    ]
  },
  'playground': {
    title: '🛝 At the Sunny Playground',
    prompt: 'Kids are laughing on the swings, monkey bars, and giant slide! What do you do?',
    options: [
      {
        label: '🤝 Take turns & push your siblings and friends on the swings',
        tag: 'Kind Choice 💚',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: Everyone loves playing with you! (+9 Kindness, +8 Happiness, +10 Friend & Sibling Bond, -12% Energy)',
        effects: { energyCost: 12, kindness: 9, happiness: 8, friendBoost: 10, siblingBoost: 10 }
      },
      {
        label: '🏃 Race across the monkey bars & climb the rope net',
        tag: 'Active Choice 🌟',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: You got stronger and faster! (+10 Athletics Skill, +8 Health, -15% Energy)',
        effects: { energyCost: 15, health: 8, skill: ['athletics', 10] }
      },
      {
        label: '💦 Leap off the top of the swing set into a deep mud puddle!',
        tag: 'Muddy Consequence ⚠️',
        tagClass: 'conseq-risky',
        consequence: 'CONSEQUENCE: SPLAT! You scraped your knee and got covered head-to-toe in cold mud (-10 Health, -20% Energy, 40% chance of getting Sick 🤒)!',
        effects: { energyCost: 20, health: -10, happiness: 4, sickChance: 0.4 }
      }
    ]
  },
  'pizza-place': {
    title: '🍕 At the Pizza Place',
    prompt: 'Warm cheesy pizza is fresh out of the brick oven! What is your move?',
    options: [
      {
        label: '🍕 Share a warm family-size pizza with friends ($6)',
        tag: 'Tasty Choice 💚',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: Best pizza slice in town! (+10% Eat Energy, +9 Happiness, +8 All Friends Bond, -$6)',
        effects: { eat: true, money: -6, happiness: 9, allFriendsBoost: 8 }
      },
      {
        label: '👨‍🍳 Learn how to toss pizza dough with the chef',
        tag: 'Skill Choice 🌟',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: You tossed dough like a pro! (+10% Eat Energy, +10 Cooking Skill, +6 Smarts)',
        effects: { eat: true, smarts: 6, skill: ['cooking', 10] }
      },
      {
        label: '🌶️ Pile 10 scoops of fiery hot chili flakes onto your slice!',
        tag: 'Spicy Consequence ⚠️',
        tagClass: 'conseq-risky',
        consequence: 'CONSEQUENCE: Your tongue is on fire! You had to chug 4 glasses of water (+10% Eat Energy, but -8 Health & -6 Happiness)!',
        effects: { eat: true, health: -8, happiness: -6 }
      }
    ]
  },
  'nursery': {
    title: '🍼 At the Cozy Nursery',
    prompt: 'Colorful blocks, storybooks, and finger-paints fill the Cozy Nursery! What do you do?',
    options: [
      {
        label: '🎨 Paint a picture and help put away all the blocks',
        tag: 'Gold Star Choice 💚',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: You won the Gold Star Helper badge! (+9 Kindness, +8 Art Skill, +7 Happiness, -10% Energy)',
        effects: { energyCost: 10, kindness: 9, happiness: 7, skill: ['art', 8] }
      },
      {
        label: '😴 Curl up on a soft nursery mat for a power nap (+40% Energy)',
        tag: 'Restful Choice 🌟',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: You woke up refreshed! (+40% Energy, +4 Health)',
        effects: { energyGain: 40, health: 4 }
      },
      {
        label: '🖌️ Paint your own hair & shoes with bright blue finger-paint!',
        tag: 'Silly Consequence ⚠️',
        tagClass: 'conseq-risky',
        consequence: 'CONSEQUENCE: Everyone giggled (+5 Happiness), but you spent an hour scrubbing blue paint off at the sink (-16% Energy, -5 Smarts)!',
        effects: { energyCost: 16, happiness: 5, smarts: -5 }
      }
    ]
  },
  'toy-store': {
    title: '🧸 At the Wonder Toy Store',
    prompt: 'Aisles of plushies, train sets, board games, and puzzles! What do you do?',
    options: [
      {
        label: '🧩 Solve the giant demo LEGO & puzzle challenge table',
        tag: 'Clever Choice 💚',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: You solved the puzzle and won a prize sticker! (+9 Smarts, +8 Happiness, -12% Energy)',
        effects: { energyCost: 12, smarts: 9, happiness: 8 }
      },
      {
        label: '🎁 Buy a surprise plushie for your Best Friend or Sibling ($10)',
        tag: 'Generous Choice 🌟',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: They hugged you tight! (-$10, +14 Friend & Sibling Bond, +10 Kindness)',
        effects: { money: -10, kindness: 10, friendBoost: 14, siblingBoost: 14 }
      },
      {
        label: '🦖 Turn on 25 roaring toy dinosaurs all at the same time!',
        tag: 'Noisy Consequence ⚠️',
        tagClass: 'conseq-risky',
        consequence: 'CONSEQUENCE: ROOOAR! The toy store manager scolded you and made you turn every single one off (-9 Kindness, -15% Energy)!',
        effects: { energyCost: 15, kindness: -9, happiness: -4 }
      }
    ]
  },
  'school-bus': {
    title: '🚌 On the Yellow School Bus',
    prompt: 'The Yellow School Bus rumbles down Main Street! Where do you sit and what do you do?',
    options: [
      {
        label: '👋 Save a seat for a shy classmate & swap stories',
        tag: 'Friendly Choice 💚',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: You made their whole morning brighter! (+10 Kindness, +12 Friend Bond, +7 Happiness, -10% Energy)',
        effects: { energyCost: 10, kindness: 10, happiness: 7, friendBoost: 12 }
      },
      {
        label: '📖 Quiz your siblings with flashcards during the ride',
        tag: 'Smart Choice 🌟',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: You both felt super prepared for class! (+9 Smarts, +8 Sibling Bond, -10% Energy)',
        effects: { energyCost: 10, smarts: 9, siblingBoost: 8 }
      },
      {
        label: '✈️ Throw paper airplanes out the bus window!',
        tag: 'Trouble Consequence ⚠️',
        tagClass: 'conseq-risky',
        consequence: 'CONSEQUENCE: The bus driver pulled over and gave you a behavior warning note (-10 Kindness, -6 Happiness, -5 Smarts)!',
        effects: { kindness: -10, happiness: -6, smarts: -5 }
      }
    ]
  },
  'school': {
    title: '🏫 At Hometown School',
    prompt: 'The school bell rings and class begins! Do you Study, Teach a Friend, or Sleep in Class?',
    options: [
      {
        label: '📚 Study hard, take notes, and ace the class lesson!',
        tag: 'Study Choice 💚 (-15% ⚡)',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: You studied hard and got an A+ on the test! (+12 Smarts, +8 Science Skill, +7 Happiness, -15% Energy)',
        effects: { energyCost: 15, smarts: 12, happiness: 7, skill: ['science', 8] }
      },
      {
        label: '🤝 Teach a friend the lesson & help them understand the homework',
        tag: 'Teach Friend 🌟 (-14% ⚡)',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: Teaching your friend helped you both get great grades! (+9 Smarts, +10 Kindness, +15 Friend Bond, +8 Storytelling, -14% Energy)',
        effects: { energyCost: 14, smarts: 9, kindness: 10, friendBoost: 15, skill: ['story', 8] }
      },
      {
        label: '😴 Sleep in class on your desk (+35% Energy ⚡, but teacher catches you!)',
        tag: 'Sleep in Class ⚠️ (+35% ⚡)',
        tagClass: 'conseq-risky',
        consequence: 'CONSEQUENCE: Sleeping in class gave you +35% Energy ⚡, but the teacher caught you snoring on your textbook and docked your grade (-8 Smarts, -5 Kindness)!',
        effects: { energyGain: 35, smarts: -8, kindness: -5 }
      }
    ]
  },
  'snack-store': {
    title: '🍿 At the Corner Snack Store',
    prompt: 'Shelves of warm pretzels, fruit smoothies, popcorn, and sour candies! What do you pick?',
    options: [
      {
        label: '🥨 Eat a warm pretzel & fresh fruit smoothie ($4)',
        tag: 'Healthy Choice 💚',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: Refreshing and energizing! (+10% Eat Energy, +6 Health, +6 Happiness, -$4)',
        effects: { eat: true, money: -4, health: 6, happiness: 6 }
      },
      {
        label: '🍿 Buy a big popcorn bag to share with siblings & friends ($6)',
        tag: 'Sharing Choice 🌟',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: Everyone loved sharing snacks with you! (+10% Eat Energy, +9 Kindness, +10 All Friends Bond, -$6)',
        effects: { eat: true, money: -6, kindness: 9, allFriendsBoost: 10 }
      },
      {
        label: '🍬 Eat 8 packets of fizzy sour popping candy all at once!',
        tag: 'Tummy Ache Consequence ⚠️',
        tagClass: 'conseq-risky',
        consequence: 'CONSEQUENCE: Your stomach is fizzing like a volcano! (+10% Eat Energy, but -9 Health and 40% chance of getting Sick 🤒)!',
        effects: { eat: true, health: -9, sickChance: 0.4 }
      }
    ]
  },
  'mall': {
    title: '🛍️ At Sunnyvale Mall',
    prompt: 'Music plays in the bustling Sunnyvale Mall! Where do you head?',
    options: [
      {
        label: '📸 Take silly group photos in the Photo Booth with friends ($6)',
        tag: 'Memory Choice 💚',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: You got awesome photo strips! (+11 Happiness, +12 All Friends Bond, -$6, -12% Energy)',
        effects: { energyCost: 12, money: -6, happiness: 11, allFriendsBoost: 12 }
      },
      {
        label: '🎁 Help wrap presents at the Community Charity Booth',
        tag: 'Helpful Choice 🌟',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: You earned a $18 helper stipend and made shoppers smile! (+$18, +8 Kindness, -15% Energy)',
        effects: { energyCost: 15, money: 18, kindness: 8 }
      },
      {
        label: '💸 Blow your savings on random flashy gadgets you don’t need!',
        tag: 'Broke Consequence ⚠️',
        tagClass: 'conseq-risky',
        consequence: 'CONSEQUENCE: Buyer’s remorse! You spent -$25 and the gadget broke on the way home (-6 Smarts, -5 Happiness)!',
        effects: { money: -25, smarts: -6, happiness: -5 }
      }
    ]
  },
  'best-friend-home': {
    title: "🌟 At Your Best Friend's Home",
    prompt: "You're hanging out at your Best Friend's Home! What do you want to do together?",
    options: [
      {
        label: '🎲 Play co-op board games & swap life stories',
        tag: 'Bestie Choice 💚',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: Your lifelong bond grew even stronger! (+16 Best Friend Bond, +10 Happiness, -12% Energy)',
        effects: { energyCost: 12, happiness: 10, friendBoost: 16 }
      },
      {
        label: '🥞 Cook pancakes together in the kitchen (+10% Eat Energy)',
        tag: 'Cozy Choice 🌟',
        tagClass: 'conseq-good',
        consequence: 'CONSEQUENCE: Fluffy pancakes! (+10% Eat Energy, +12 Best Friend Bond, +8 Cooking Skill)',
        effects: { eat: true, friendBoost: 12, skill: ['cooking', 8] }
      },
      {
        label: '🎮 Pull a wild all-nighter playing video games until 4 AM!',
        tag: 'Exhausted Consequence ⚠️',
        tagClass: 'conseq-risky',
        consequence: 'CONSEQUENCE: You beat the high score (+10 Best Friend Bond), but you crashed from exhaustion (-30% Energy, -8 Health, 45% Sick chance 🤒)!',
        effects: { energyCost: 30, health: -8, friendBoost: 10, sickChance: 0.45 }
      }
    ]
  }
};

function getPlaceConsequenceEvent(placeId) {
  const isNight = gameState && gameState.timeOfDay === 'night';

  if (placeId === 'room-bed') {
    return {
      title: `🛏️ At My Cozy Bed (${isNight ? '🌙 Nighttime' : '☀️ Daytime'})`,
      prompt: isNight
        ? '🌙 It is Nighttime in your bedroom! Curl up under your blanket for a full Nighttime Sleep (+90% Energy)!'
        : '☀️ It is Daytime in your bedroom! (In Daytime you can only Nap — full Sleep is only at Nighttime 🌙!)',
      options: [
        isNight
          ? {
              label: '🌙😴 Nighttime Sleep in your cozy bed (+90% Energy, +1 Day)',
              tag: 'Night Sleep 💚',
              tagClass: 'conseq-good',
              consequence: 'You slept deeply in your bed (+90% Energy, +5 Health, cured any sickness, +1 Day)!',
              effects: { sleep: true }
            }
          : {
              label: '🛋️ Take a Daytime Nap on your bed (+25% Energy -> turns to 🌙 Night)',
              tag: 'Daytime Nap 💚',
              tagClass: 'conseq-good',
              consequence: 'You took a cozy Daytime Nap (+25% Energy) and evening (🌙 Nighttime) arrived!',
              effects: { nap: true }
            },
        {
          label: '🧸 Chill under your blanket with your Pillow & Teddy Bear (+15% Energy)',
          tag: 'Cozy Rest 🌟',
          tagClass: 'conseq-good',
          consequence: 'CONSEQUENCE: You relaxed in bed and recharged! (+15% Energy, +8 Happiness)',
          effects: { energyGain: 15, happiness: 8 }
        },
        {
          label: '🤸 Jump up and down on your mattress like a trampoline!',
          tag: 'Messy Consequence ⚠️',
          tagClass: 'conseq-risky',
          consequence: 'CONSEQUENCE: Super fun (+7 Happiness), but your sheets flew everywhere and you wore yourself out (-18% Energy)!',
          effects: { energyCost: 18, happiness: 7 }
        }
      ]
    };
  }

  if (placeId === 'room-desk') {
    return {
      title: '💻 At Your Bedroom Study & Tech Desk',
      prompt: 'Your desk has your Lamp, Notebook, Science Set, Tablet & Laptop! What do you do?',
      options: [
        {
          label: '📚 Study & do projects at your desk',
          tag: 'Smart Choice 💚 (-14% ⚡)',
          tagClass: 'conseq-good',
          consequence: 'CONSEQUENCE: Great study session in your room! (+11 Smarts, +8 Science Skill, -14% Energy)',
          effects: { energyCost: 14, smarts: 11, skill: ['science', 8] }
        },
        {
          label: '📒 Draw & write stories in your Notebook & Scrapbook',
          tag: 'Creative Choice 🌟 (-12% ⚡)',
          tagClass: 'conseq-good',
          consequence: 'CONSEQUENCE: You created awesome pages in your notebook! (+9 Art, +8 Storytelling, +8 Happiness, -12% Energy)',
          effects: { energyCost: 12, happiness: 8, skill: ['art', 9] }
        },
        {
          label: '🎮 Play video games at your desk for 6 hours straight!',
          tag: 'Eye-Strain Consequence ⚠️',
          tagClass: 'conseq-risky',
          consequence: 'CONSEQUENCE: You beat a boss (+9 Happiness), but got blurry eyes and forgot your homework (-20% Energy, -6 Smarts)!',
          effects: { energyCost: 20, happiness: 9, smarts: -6 }
        }
      ]
    };
  }

  if (placeId === 'room-shelf') {
    const count = (gameState.birthdayItems || []).length;
    return {
      title: `🎁 At Your Birthday Treasures & Mini Fridge (${count} Items)`,
      prompt: 'Your bedroom shelf displays your unwrapped Birthday Presents and your Mini Fridge!',
      options: [
        {
          label: '🧸 Play with & organize your Birthday Treasures',
          tag: 'Happy Choice 💚 (-10% ⚡)',
          tagClass: 'conseq-good',
          consequence: 'CONSEQUENCE: Your room looks awesome and your favorite gifts made you smile! (+12 Happiness, +6 Kindness, -10% Energy)',
          effects: { energyCost: 10, happiness: 12, kindness: 6 }
        },
        {
          label: '🧊 Grab a cool fruit snack from your bedroom Mini Fridge (+10% Energy)',
          tag: 'Snack Choice 🌟 (+10% ⚡)',
          tagClass: 'conseq-good',
          consequence: 'CONSEQUENCE: Refreshing bedroom snack! (+10% Eat Energy, +6 Happiness, +4 Health)',
          effects: { eat: true, happiness: 6, health: 4 }
        },
        {
          label: '🌪️ Dump every single toy and box onto the floor at once!',
          tag: 'Clutter Consequence ⚠️',
          tagClass: 'conseq-risky',
          consequence: 'CONSEQUENCE: You tripped over blocks and had to spend an hour cleaning your floor (-18% Energy, -4 Smarts)!',
          effects: { energyCost: 18, smarts: -4 }
        }
      ]
    };
  }

  if (placeId === 'room-music-closet') {
    return {
      title: '🎧 At Your Music & Wardrobe Corner',
      prompt: 'Put on your Headphones & Music Player, or change your Avatar outfit in the Wardrobe!',
      options: [
        {
          label: '🎵🎧 Jam out with your Music Player & Headphones!',
          tag: 'Music Choice 💚 (-10% ⚡)',
          tagClass: 'conseq-good',
          consequence: 'CONSEQUENCE: Awesome beats! You jammed out with your Headphones on (+12 Happiness, +9 Art & Music, -10% Energy)!',
          effects: { energyCost: 10, happiness: 12, skill: ['art', 9], equipAccessory: 'headphones' }
        },
        {
          label: '👕 Open your Wardrobe Mirror to Customize Avatar & Outfit',
          tag: 'Wardrobe 🌟',
          tagClass: 'conseq-good',
          consequence: 'Opened your Bedroom Wardrobe!',
          effects: { openWardrobe: true }
        },
        {
          label: '🔊 Blast speakers at max volume and shake the walls!',
          tag: 'Noisy Consequence ⚠️',
          tagClass: 'conseq-risky',
          consequence: 'CONSEQUENCE: Everyone in the house knocked on your door complaining about the noise (-8 Kindness, -15% Energy)!',
          effects: { energyCost: 15, kindness: -8 }
        }
      ]
    };
  }

  if (placeId === 'family-home') {
    return {
      title: `🏡 Inside the Family Home (${isNight ? '🌙 Nighttime' : '☀️ Daytime'})`,
      prompt: isNight
        ? '🌙 It is Nighttime in the Family Home! You can now take a full Nighttime Sleep (+90% Energy)!'
        : '☀️ It is Daytime in the Family Home! (In Daytime you can only Nap — full Sleep is only at Nighttime 🌙!)',
      options: [
        isNight
          ? {
              label: '🌙😴 Nighttime Sleep in your warm bed (+90% Energy, +1 Day)',
              tag: 'Night Sleep 💚',
              tagClass: 'conseq-good',
              consequence: 'You slept deeply through the night (+90% Energy, +5 Health, cured any sickness, +1 Day)!',
              effects: { sleep: true }
            }
          : {
              label: '🛋️ Take a Daytime Nap on the couch (+25% Energy -> turns to 🌙 Night)',
              tag: 'Daytime Nap 💚',
              tagClass: 'conseq-good',
              consequence: 'You took a cozy Daytime Nap (+25% Energy) and evening (🌙 Nighttime) arrived!',
              effects: { nap: true }
            },
        {
          label: '🧹 Help Mom & Dad clean up and set the table',
          tag: 'Helpful Choice 🌟',
          tagClass: 'conseq-good',
          consequence: 'CONSEQUENCE: Mom & Dad are super proud and give you $8 allowance! (+8 Kindness, +6 Happiness, -10% Energy)',
          effects: { energyCost: 10, money: 8, kindness: 8, happiness: 6 }
        },
        {
          label: '🛋️ Jump on the couch pillows & stay up way past bedtime!',
          tag: 'Risky Consequence ⚠️',
          tagClass: 'conseq-risky',
          consequence: 'CONSEQUENCE: You had a blast (+6 Happiness), but Mom grounded you from TV and you got exhausted (-25% Energy, -6 Kindness, 35% Sick chance)!',
          effects: { energyCost: 25, happiness: 6, kindness: -6, sickChance: 0.35 }
        }
      ]
    };
  }

  if (PLACE_CONSEQUENCE_EVENTS[placeId]) {
    return PLACE_CONSEQUENCE_EVENTS[placeId];
  }
  // Fallback for any Age 7+ Random Place!
  const allPlaces = typeof getActiveWorldPlaces !== 'undefined' ? getActiveWorldPlaces(gameState) : [];
  const pObj = allPlaces.find(p => p.id === placeId) || (typeof RANDOM_PLACES_POOL !== 'undefined' && RANDOM_PLACES_POOL.find(r => r.id === placeId));
  const pName = pObj ? `${pObj.icon} ${pObj.name}` : 'This Place';

  if (placeId === 'starter-loft') {
    return {
      title: `🔑 Inside Your Move-Out Starter Loft (${isNight ? '🌙 Nighttime' : '☀️ Daytime'})`,
      prompt: isNight
        ? '🌙 It is Nighttime in your Loft! You can now take a full Nighttime Sleep (+90% Energy)!'
        : '☀️ It is Daytime in your Loft! (In Daytime you can only Nap — full Sleep is only at Nighttime 🌙!)',
      options: [
        isNight
          ? {
              label: '🌙😴 Nighttime Sleep in your loft bed (+90% Energy, +1 Day)',
              tag: 'Night Sleep 💚',
              tagClass: 'conseq-good',
              consequence: 'You slept peacefully in your loft (+90% Energy, +5 Health, +1 Day)!',
              effects: { sleep: true }
            }
          : {
              label: '🛋️ Take a Daytime Nap in your loft (+25% Energy -> turns to 🌙 Night)',
              tag: 'Daytime Nap 💚',
              tagClass: 'conseq-good',
              consequence: 'You took a Daytime Nap (+25% Energy) and evening (🌙 Nighttime) arrived!',
              effects: { nap: true }
            },
        {
          label: '🪴 Water your houseplants & cook a healthy meal (+10% Energy)',
          tag: 'Cozy Choice 🌟',
          tagClass: 'conseq-good',
          consequence: 'CONSEQUENCE: Your loft looks amazing and you ate well! (+10% Eat Energy, +8 Happiness, +6 Cooking)',
          effects: { eat: true, happiness: 8, skill: ['cooking', 6] }
        },
        {
          label: '🎸 Blast loud guitar music at midnight!',
          tag: 'Noisy Consequence ⚠️',
          tagClass: 'conseq-risky',
          consequence: 'CONSEQUENCE: Your neighbors knocked on the wall complaining (-8 Kindness, -20% Energy)!',
          effects: { energyCost: 20, kindness: -8, skill: ['art', 5] }
        }
      ]
    };
  }

  if (placeId === 'uni-career') {
    return {
      title: '🏛️ At College & Career Plaza',
      prompt: 'You are in the lecture hall at College & Career Plaza! Do you Study, Teach a Friend, or Sleep in Class?',
      options: [
        {
          label: '📚 Study hard for exams & projects',
          tag: 'Study Choice 💚 (-15% ⚡)',
          tagClass: 'conseq-good',
          consequence: 'CONSEQUENCE: You aced your college coursework! (+13 Smarts, +9 Science Skill, +8 Happiness, -15% Energy)',
          effects: { energyCost: 15, smarts: 13, happiness: 8, skill: ['science', 9] }
        },
        {
          label: '🤝 Teach a friend & lead a study group',
          tag: 'Teach Friend 🌟 (-14% ⚡)',
          tagClass: 'conseq-good',
          consequence: 'CONSEQUENCE: Your study group passed with flying colors! (+10 Smarts, +10 Kindness, +15 Friend Bond, -14% Energy)',
          effects: { energyCost: 14, smarts: 10, kindness: 10, friendBoost: 15 }
        },
        {
          label: '😴 Sleep in lecture hall (+35% Energy ⚡, but professor catches you!)',
          tag: 'Sleep in Class ⚠️ (+35% ⚡)',
          tagClass: 'conseq-risky',
          consequence: 'CONSEQUENCE: Sleeping in class gave you +35% Energy ⚡, but the professor called on you while you were snoring (-9 Smarts, -5 Kindness)!',
          effects: { energyGain: 35, smarts: -9, kindness: -5 }
        }
      ]
    };
  }

  if (placeId === 'bakery-cafe') {
    return {
      title: '🧁 At Honeybee Bakery Café',
      prompt: 'The smell of warm cinnamon rolls and hot cocoa fills the air!',
      options: [
        {
          label: '🥐 Enjoy a warm cinnamon roll & hot cocoa ($5)',
          tag: 'Sweet Choice 💚',
          tagClass: 'conseq-good',
          consequence: 'CONSEQUENCE: Pure coziness! (+10% Eat Energy, +9 Happiness, -$5)',
          effects: { eat: true, money: -5, happiness: 9 }
        },
        {
          label: '🧁 Help the baker frost cupcakes (+10% Energy & +$12 tip)',
          tag: 'Helpful Choice 🌟',
          tagClass: 'conseq-good',
          consequence: 'CONSEQUENCE: You learned pastry art and earned $12! (+10% Eat Energy, +$12, +9 Cooking Skill)',
          effects: { eat: true, money: 12, skill: ['cooking', 9] }
        },
        {
          label: '🎂 Eat an entire bowl of raw frosting!',
          tag: 'Sugar-Crash Consequence ⚠️',
          tagClass: 'conseq-risky',
          consequence: 'CONSEQUENCE: Huge sugar crash & tummy ache (-9 Health, 40% Sick chance 🤒)!',
          effects: { eat: true, health: -9, sickChance: 0.4 }
        }
      ]
    };
  }

  return {
    title: `At ${pName}`,
    prompt: `You arrived at ${pName}! Choose what to do (watch out for consequences!):`,
    options: [
      {
        label: `🌟 Have a fun, mindful outing at ${pName} with friends`,
        tag: 'Great Choice 💚',
        tagClass: 'conseq-good',
        consequence: `CONSEQUENCE: You had an awesome time at ${pName}! (+10 Happiness, +10 Friend Bond, +6 Smarts, -14% Energy)`,
        effects: { energyCost: 14, happiness: 10, smarts: 6, friendBoost: 10 }
      },
      {
        label: `🤝 Help out staff & visitors at ${pName}`,
        tag: 'Helpful Choice 🌟',
        tagClass: 'conseq-good',
        consequence: `CONSEQUENCE: Everyone appreciated your kindness and gave you a $15 reward! (+$15, +9 Kindness, -15% Energy)`,
        effects: { energyCost: 15, money: 15, kindness: 9 }
      },
      {
        label: `⚡ Go overboard showing off & ignore the rules at ${pName}!`,
        tag: 'Risky Consequence ⚠️',
        tagClass: 'conseq-risky',
        consequence: `CONSEQUENCE: You overdid it, got scolded by staff, and wore yourself out (-22% Energy, -7 Kindness, -6 Health, 35% Sick chance 🤒)!`,
        effects: { energyCost: 22, kindness: -7, health: -6, sickChance: 0.35 }
      }
    ]
  };
}

function triggerPlaceAction(placeId) {
  if (!gameState) return;
  SoundFX.pop();
  const ev = getPlaceConsequenceEvent(placeId);
  const modal = document.getElementById('event-modal');
  const content = document.getElementById('event-modal-body');

  content.innerHTML = `
    <div class="modal-top-row">
      <div class="modal-header-badge" style="margin-bottom:0;">🗺️ Place Choice & Consequence</div>
      <button type="button" class="modal-out-btn" onclick="closeModal()">⬅️ Out / Close ✖</button>
    </div>
    <h2>${ev.title}</h2>
    <p class="modal-story-text">${ev.prompt}</p>
    <div class="choice-list">
      ${ev.options.map((opt, idx) => `
        <button class="choice-btn conseq-choice-btn" onclick="resolvePlaceConsequence('${placeId}', ${idx})">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:3px;">
              <strong>${opt.label}</strong>
              <span class="conseq-tag ${opt.tagClass}">${opt.tag}</span>
            </div>
          </div>
        </button>
      `).join('')}
    </div>
    <div style="margin-top:14px;display:flex;justify-content:space-between;align-items:center;">
      <button class="secondary-btn" onclick="closeModal()">⬅️ Out / Cancel</button>
    </div>
  `;
  modal.classList.remove('hidden');
}

function resolvePlaceConsequence(placeId, optionIdx) {
  const ev = getPlaceConsequenceEvent(placeId);
  if (!ev || !ev.options[optionIdx]) {
    closeModal();
    return;
  }

  const opt = ev.options[optionIdx];
  const eff = opt.effects || {};

  if (eff.sleep) {
    closeModal();
    sleepForEnergy();
    return;
  }
  if (eff.nap) {
    closeModal();
    napDaytime();
    return;
  }
  if (eff.openWardrobe) {
    openRestyleModal();
    return;
  }
  if (eff.equipAccessory && gameState.avatar) {
    gameState.avatar.accessory = eff.equipAccessory;
  }

  if (eff.energyCost) {
    if (!spendEnergy(eff.energyCost)) {
      closeModal();
      return;
    }
  }

  if (eff.eat) {
    gameState.energy = Math.min(100, Math.round(gameState.energy + 10));
  }
  if (eff.energyGain) {
    gameState.energy = Math.min(100, Math.round(gameState.energy + eff.energyGain));
  }
  if (eff.money) {
    gameState.money = Math.max(0, gameState.money + eff.money);
  }
  if (eff.happiness) gameState.stats.happiness = clampStat(gameState.stats.happiness + eff.happiness);
  if (eff.health) gameState.stats.health = clampStat(gameState.stats.health + eff.health);
  if (eff.smarts) gameState.stats.smarts = clampStat(gameState.stats.smarts + eff.smarts);
  if (eff.kindness) gameState.stats.kindness = clampStat(gameState.stats.kindness + eff.kindness);

  if (eff.skill) {
    const [sk, amt] = eff.skill;
    gameState.skills[sk] = Math.min(100, (gameState.skills[sk] || 0) + amt);
  }
  if (eff.friendBoost) {
    const bf = getTopFriend(gameState);
    if (bf) bf.bond = clampStat(bf.bond + eff.friendBoost);
  }
  if (eff.allFriendsBoost) {
    gameState.friends.forEach(f => { f.bond = clampStat(f.bond + eff.allFriendsBoost); });
  }
  if (eff.siblingBoost && gameState.siblings) {
    gameState.siblings.forEach(s => { s.bond = clampStat((s.bond || 80) + eff.siblingBoost); });
  }

  let gotSickNow = false;
  if (eff.sickChance && !gameState.isSick && Math.random() < eff.sickChance) {
    gameState.isSick = true;
    gotSickNow = true;
  }

  closeModal();
  addCurrentYearLog(`📍 ${ev.title}: ${opt.consequence}${gotSickNow ? ' 🤒 You also caught a cold (Energy decays +5% faster)!' : ''}`);
  if (gotSickNow) {
    showToast(`🤒 Consequence: You got Sick! (${opt.consequence})`);
  } else {
    showToast(opt.consequence);
  }

  advanceQuestProgress('place', placeId);
  if (eff.eat) advanceQuestProgress('eat');

  // Advance 1 day on the 10-Week Birthday Calendar when you do a place event!
  advanceDays(1, true);
}

function renderLeftProfile() {
  const stage = getLifeStageInfo(gameState.age);
  const gObj = AVATAR_PALETTE.genders.find(g => g.id === gameState.avatar.gender) || AVATAR_PALETTE.genders[0];
  document.getElementById('player-avatar-box').innerHTML = renderAvatarSVG(gameState.avatar, gameState.age, 125);
  document.getElementById('player-name-heading').textContent = `${gObj.icon} ${gameState.name}`;
  document.getElementById('player-stage-badge').textContent = `Age ${gameState.age} • ${gObj.name} • ${stage.label}`;
  document.getElementById('player-town-line').textContent = `${gameState.hometown.icon} ${gameState.hometown.name} • ${gameState.trait.icon} ${gameState.trait.name}`;
  document.getElementById('player-money-badge').textContent = `$${gameState.money}`;

  // Status badges (Home, Club, Career, Pets)
  const homeObj = GAME_DATA.homes.find(h => h.id === gameState.homeId) || GAME_DATA.homes[0];
  let roleText = 'Growing & Exploring 🌱';
  if (gameState.age >= 5 && gameState.age <= 10) roleText = 'Elementary School Student 🎒';
  else if (gameState.age >= 11 && gameState.age <= 13) roleText = 'Middle School Student 🏫';
  else if (gameState.age >= 14 && gameState.age <= 17) roleText = 'High School Student 🎺';
  else if (gameState.age >= 18 && gameState.age <= 21) {
    const maj = GAME_DATA.collegeMajors.find(m => m.id === gameState.majorId);
    roleText = maj ? `University: ${maj.name} 🎓` : 'Young Adult Explorer 🌟';
  } else if (gameState.age >= 22 && gameState.age <= 64 && gameState.career) {
    const cObj = GAME_DATA.careers.find(c => c.id === gameState.career.id);
    if (cObj) roleText = `${cObj.icon} ${cObj.levels[gameState.career.levelIndex]}`;
  } else if (gameState.age >= 65) {
    roleText = 'Retired Legend 🌅';
  }

  document.getElementById('player-status-summary').innerHTML = `
    <div class="mini-status-pill">${roleText}</div>
    <div class="mini-status-pill">${homeObj.icon} ${homeObj.name}</div>
    ${gameState.pets.length > 0 ? `<div class="mini-status-pill">🐾 ${gameState.pets.length} Pet${gameState.pets.length > 1 ? 's' : ''}</div>` : ''}
  `;

  // Core Stats
  const statList = [
    { key: 'happiness', label: 'Happiness', icon: '😊', color: '#F59E0B' },
    { key: 'health', label: 'Health', icon: '💚', color: '#10B981' },
    { key: 'smarts', label: 'Smarts', icon: '🧠', color: '#3B82F6' },
    { key: 'kindness', label: 'Kindness', icon: '🤝', color: '#EC4899' }
  ];

  document.getElementById('core-stats-container').innerHTML = statList.map(st => {
    const val = gameState.stats[st.key];
    return `
      <div class="stat-row">
        <div class="stat-label">
          <span>${st.icon} ${st.label}</span>
          <strong>${val}%</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${val}%;background:${st.color}"></div>
        </div>
      </div>
    `;
  }).join('');

  // Skills
  const skillList = [
    { key: 'art', label: 'Art & Music 🎨' },
    { key: 'science', label: 'Science & Tech 🚀' },
    { key: 'athletics', label: 'Athletics & Nature 🏃' },
    { key: 'cooking', label: 'Cooking & Baking 🧁' },
    { key: 'story', label: 'Storytelling 📚' }
  ];

  document.getElementById('skills-container').innerHTML = skillList.map(sk => {
    const val = gameState.skills[sk.key] || 0;
    return `
      <div class="skill-chip">
        <span>${sk.label}</span>
        <strong>Lv.${Math.floor(val / 10) + 1} (${val})</strong>
      </div>
    `;
  }).join('');

  // Active Quests Preview in Left Profile
  ensureQuestsInitialized();
  const questsSidebar = document.getElementById('active-quests-sidebar');
  if (questsSidebar) {
    const activeQ = (gameState.activeQuests || []).filter(q => !q.claimed);
    // Put completed-unclaimed quests first so the player sees rewards ready!
    const sortedQ = [...activeQ].sort((a, b) => (b.completed ? 1 : 0) - (a.completed ? 1 : 0));
    if (sortedQ.length === 0) {
      questsSidebar.innerHTML = `<div class="skill-chip" style="color:#888;justify-content:center;">All Quests Done! Click Quest Board ➜</div>`;
    } else {
      questsSidebar.innerHTML = sortedQ.slice(0, 4).map(q => `
        <div class="skill-chip ${q.completed ? 'quest-ready-chip' : ''}" style="cursor:pointer;align-items:center;"
          onclick="executeQuestGoAction('${q.id}')" title="${q.desc} (Reward: ${q.rewardText})">
          <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${q.icon} ${q.title} (${q.progress || 0}/${q.goal})</span>
          <strong style="color:${q.completed ? '#15803D' : '#D9532F'};white-space:nowrap;margin-left:6px;">
            ${q.completed ? '🎁 Claim!' : '📍 Go'}
          </strong>
        </div>
      `).join('');
    }
  }

  // Update Quests Tab Badge Count
  const questTabBtn = document.querySelector('.tab-btn[data-tab="quests"]');
  if (questTabBtn) {
    const readyCount = (gameState.activeQuests || []).filter(q => q.completed && !q.claimed).length;
    questTabBtn.textContent = readyCount > 0 ? `🎯 Quests (${readyCount}🎁)` : `🎯 Quests`;
  }

  // Inventory Preview in Left Profile
  const bdayItemsBox = document.getElementById('birthday-items-container');
  if (bdayItemsBox) {
    const inv = gameState.inventory || [];
    if (inv.length === 0) {
      bdayItemsBox.innerHTML = `<div class="skill-chip" style="color:#888;justify-content:center;">Empty — Pack food or unwrap Birthday Gifts! 🎒</div>`;
    } else {
      bdayItemsBox.innerHTML = inv.slice(0, 8).map((it, idx) => `
        <div class="skill-chip" style="cursor:pointer;" onclick="useInventoryItem(${idx})" title="${it.desc}">
          <span>${it.icon} ${it.name}${it.qty > 1 ? ` ×${it.qty}` : ''}</span>
          <strong style="color:#E0533C;">${it.category === 'food' ? '🍽️ Eat' : '✨ Use'}</strong>
        </div>
      `).join('');
    }
  }
}

function renderCenterTimeline() {
  const energyPct = Math.max(0, Math.min(100, Math.round(gameState.energy)));
  const energyColor = energyPct > 50 ? '#10B981' : (energyPct > 25 ? '#F59E0B' : '#EF4444');
  const isNight = gameState.timeOfDay === 'night';
  const invCount = (gameState.inventory || []).reduce((acc, i) => acc + (i.qty || 1), 0);

  const sq = document.getElementById('world-2d-square');
  if (sq) {
    sq.classList.toggle('night-mode', isNight);
  }

  document.getElementById('energy-stars-display').innerHTML = `
    <div class="energy-meter-wrap">
      <div class="energy-top-line">
        <strong>⚡ Energy: ${energyPct}%</strong>
        <span class="time-of-day-badge ${isNight ? 'night-badge' : 'day-badge'}">
          ${isNight ? '🌙 Nighttime (Sleep Unlocked!)' : '☀️ Daytime (Nap Only)'}
        </span>
        ${gameState.isSick
          ? `<span class="sick-badge">🤒 SICK (+5% decay)</span>`
          : `<span class="healthy-badge">💚 Healthy</span>`
        }
      </div>
      <div class="progress-track" style="height:10px;margin:5px 0 8px;">
        <div class="progress-fill" style="width:${energyPct}%;background:${energyColor}"></div>
      </div>
      <div class="energy-quick-btns">
        ${isNight ? `
          <button type="button" class="energy-btn sleep-btn" onclick="sleepForEnergy()">🌙😴 Night Sleep (+90% ⚡ -> Next Day ☀️)</button>
        ` : `
          <button type="button" class="energy-btn nap-btn" onclick="napDaytime()">🛋️ Daytime Nap (+25% ⚡ -> 🌙 Night)</button>
          <button type="button" class="energy-btn wait-night-btn" onclick="switchToNighttime()">🌙 Wait for Night</button>
        `}
        <button type="button" class="energy-btn eat-btn" onclick="if(typeof World2D!=='undefined') World2D.openStationView('fridge')">🧊 Open Fridge (+⚡)</button>
        <button type="button" class="energy-btn eat-btn" onclick="openFoodChoiceModal()">🍽️ Pack Food</button>
        <button type="button" class="energy-btn wait-night-btn" onclick="switchTab('inventory')">🎒 Inventory (${invCount})</button>
        ${gameState.isSick ? `
          <button type="button" class="energy-btn cure-btn" onclick="cureSickness()">🍲 Cure Sick</button>
        ` : ''}
      </div>
    </div>
  `;

  // Render 10-Week (7 Days/Week = 70 Days) Birthday Countdown Box
  const calBox = document.getElementById('birthday-calendar-box');
  if (calBox) {
    const wk = gameState.week || 1;
    const dy = gameState.day || 1;
    const dayName = DAY_NAMES[(dy - 1) % 7];
    const totalDaysDone = (wk - 1) * 7 + (dy - 1);
    const bdayPct = Math.round((totalDaysDone / 70) * 100);

    calBox.innerHTML = `
      <div class="calendar-header-line">
        <strong>📅 Week ${wk} / 10 • Day ${dy} / 7 (${dayName})</strong>
        <span class="bday-countdown-tag">🎂 ${70 - totalDaysDone}d to Birthday</span>
      </div>
      <div class="progress-track" style="height:9px;margin:5px 0 8px;">
        <div class="progress-fill" style="width:${bdayPct}%;background:linear-gradient(90deg, #FF7B54, #F15BB5)"></div>
      </div>
      <div class="calendar-btn-row">
        <button type="button" class="cal-step-btn" onclick="advanceDays(1)">☀️ +1 Day</button>
        <button type="button" class="cal-step-btn week-btn" onclick="advanceDays(7)">📅 +1 Week (7d)</button>
        <button type="button" class="cal-step-btn bday-btn" onclick="ageUpOneYear()" title="Fast-forward to Birthday & Open 4 Presents!">🎂 Birthday! 🎁×4</button>
      </div>
    `;
  }

  // Update 2D World Living Banner & Places Unlocked Counter
  const livingBanner = document.getElementById('living-status-banner');
  if (livingBanner) {
    const bf = getTopFriend(gameState);
    const bfName = bf ? bf.name : 'Best Friend';
    if (gameState.livingWith === 'best-friend' || gameState.age >= 21) {
      livingBanner.textContent = `🌟 Living in Best Friend's Home with ${bfName} (Age 21+)`;
      livingBanner.className = 'living-status-pill bestie-home';
    } else if (gameState.livingWith === 'moved-out-16') {
      livingBanner.textContent = `🔑 Moved Out at 16 • Living in Starter Loft (Until Best Friend's Home at 21!)`;
      livingBanner.className = 'living-status-pill loft-home';
    } else {
      livingBanner.textContent = `🏡 Living with Family — Mom & Dad (Move-out option at 16, Bestie's Home at 21!)`;
      livingBanner.className = 'living-status-pill family-home';
    }
  }

  const unlockedBadge = document.getElementById('places-unlocked-badge');
  if (unlockedBadge && typeof FIXED_WORLD_PLACES !== 'undefined') {
    const fixedUnlocked = FIXED_WORLD_PLACES.filter(p => gameState.age >= p.unlockAge).length;
    const randUnlocked = (gameState.unlockedRandomPlaces || []).length;
    const totalUnlocked = fixedUnlocked + randUnlocked;
    unlockedBadge.textContent = `🔓 ${totalUnlocked} Places Unlocked`;
  }

  // Render Live Quest Tracker Bar right inside the 2D World Card!
  const worldQuestBar = document.getElementById('world-quest-tracker-bar');
  if (worldQuestBar) {
    ensureQuestsInitialized();
    const activeQuests = (gameState.activeQuests || []).filter(q => !q.claimed);
    const topQuest = activeQuests.find(q => q.completed) || activeQuests[0];
    const readyCount = activeQuests.filter(q => q.completed).length;

    if (topQuest) {
      worldQuestBar.innerHTML = `
        <div class="quest-tracker-left">
          <span class="quest-tracker-pill ${topQuest.completed ? 'ready' : ''}">
            ${topQuest.completed ? '🎁 QUEST COMPLETE' : '🎯 ACTIVE QUEST'}
          </span>
          <div class="quest-tracker-text">
            <strong>${topQuest.icon} ${topQuest.title} (${topQuest.progress || 0}/${topQuest.goal})</strong>
            <small>${topQuest.desc} • <em>Reward: ${topQuest.rewardText}</em></small>
          </div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
          ${topQuest.completed ? `
            <button type="button" class="energy-btn eat-btn" onclick="claimQuestReward('${topQuest.id}')">
              🎁 Claim Reward!
            </button>
          ` : `
            <button type="button" class="energy-btn sleep-btn" onclick="executeQuestGoAction('${topQuest.id}')">
              📍 Do Quest Now
            </button>
          `}
          <button type="button" class="energy-btn wait-night-btn" onclick="switchTab('quests')">
            📋 All Quests (${activeQuests.length}${readyCount > 0 ? ` • ${readyCount}🎁` : ''})
          </button>
        </div>
      `;
    } else {
      worldQuestBar.innerHTML = '';
    }
  }

  // Timeline Cards
  const feed = document.getElementById('timeline-feed');
  feed.innerHTML = gameState.timeline.map((item, idx) => `
    <div class="timeline-card ${item.type === 'milestone' ? 'milestone-card' : ''} ${idx === 0 ? 'latest-card' : ''}">
      <div class="timeline-card-header">
        <span class="age-pill">Age ${item.age}</span>
        <h4>${item.title}</h4>
      </div>
      <ul class="timeline-entries">
        ${item.entries.map(e => `<li>${e}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

function renderRightPanel() {
  // Update active tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === gameState.activeTab);
  });

  const container = document.getElementById('right-tab-content');
  const tab = gameState.activeTab;

  if (tab === 'friends') {
    const canMeetMore = gameState.friends.length < GAME_DATA.friendPool.length;
    const momAvatar = {
      gender: 'girl',
      skin: gameState.avatar.skin,
      hairColor: gameState.avatar.hairColor,
      hairStyle: 'long-wave',
      outfit: 'cardigan',
      shirt: 'berry',
      accessory: 'none'
    };
    const dadAvatar = {
      gender: 'boy',
      skin: gameState.avatar.skin,
      hairColor: gameState.avatar.hairColor,
      hairStyle: 'short-part',
      outfit: 'hoodie',
      shirt: 'sky',
      accessory: 'round-glasses'
    };

    const familySectionHtml = `
      <div class="panel-top-banner" style="margin-bottom:8px;">
        <div>
          <h3>👨‍👩‍👧‍👦 Your Family (Parents & Siblings)</h3>
          <p>${gameState.livingWith === 'family' ? 'Currently living together in the Family Home!' : 'Your loving family is always cheering you on!'}</p>
        </div>
      </div>
      <div class="family-mini-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
        <div class="friend-card" style="padding:8px 10px;">
          <div style="display:flex;align-items:center;gap:8px;">
            ${renderAvatarSVG(momAvatar, Math.min(75, gameState.age + 27), 48)}
            <div>
              <strong style="font-size:0.84rem;">👩 Mom</strong>
              <div style="font-size:0.72rem;color:#B45309;">Parent • Warm Hugs</div>
              <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap;">
                <button class="friend-btn" style="padding:3px 7px;" onclick="World2D.openDialogueWith('mom')">💬 Talk</button>
                <button class="friend-btn" style="padding:3px 7px;" onclick="interactWithFamily('Mom')">💛 Hug</button>
              </div>
            </div>
          </div>
        </div>
        <div class="friend-card" style="padding:8px 10px;">
          <div style="display:flex;align-items:center;gap:8px;">
            ${renderAvatarSVG(dadAvatar, Math.min(78, gameState.age + 29), 48)}
            <div>
              <strong style="font-size:0.84rem;">👨 Dad</strong>
              <div style="font-size:0.72rem;color:#1D3557;">Parent • Car Rides</div>
              <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap;">
                <button class="friend-btn" style="padding:3px 7px;" onclick="World2D.openDialogueWith('dad')">💬 Talk</button>
                <button class="friend-btn" style="padding:3px 7px;" onclick="triggerPlaceAction('family-car')">🚗 Ride</button>
              </div>
            </div>
          </div>
        </div>
        ${(gameState.siblings || []).map(sib => {
          const sibAge = Math.max(0, gameState.age + sib.ageDiff);
          const sIcon = sib.gender === 'boy' ? '👦' : '👧';
          return `
            <div class="friend-card" style="padding:8px 10px;">
              <div style="display:flex;align-items:center;gap:8px;">
                ${renderAvatarSVG(sib.avatar, sibAge, 48)}
                <div>
                  <strong style="font-size:0.84rem;">${sIcon} ${sib.name}</strong>
                  <div style="font-size:0.72rem;color:#D9532F;">${sib.relation} (Age ${sibAge})</div>
                  <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap;">
                    <button class="friend-btn" style="padding:3px 7px;" onclick="World2D.openDialogueWith('${sib.id}')">💬 Talk</button>
                    <button class="friend-btn" style="padding:3px 7px;" onclick="hangOutWithSibling('${sib.id}')">🎈 Play</button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.innerHTML = `
      ${familySectionHtml}
      <div class="panel-top-banner">
        <div>
          <h3>🤝 Your Circle of Friends (${gameState.friends.length})</h3>
          <p>Your friends grow up alongside you from childhood to your golden years!</p>
        </div>
        ${canMeetMore ? `
          <button class="action-pill-btn highlight" onclick="activelyMakeNewFriend()">
            👋 Meet New Friend (-${getEnergyCost(15)}% ⚡)
          </button>
        ` : ''}
      </div>
      <div class="friends-list">
        ${gameState.friends.map(f => {
          const tier = getFriendshipTier(f.bond);
          const statusLine = getFriendLifeStatus(f, gameState.age);
          const fGenderIcon = (f.gender || (f.avatar && f.avatar.gender)) === 'boy' ? '👦' : '👧';
          return `
            <div class="friend-card">
              <div class="friend-card-top">
                <div class="friend-avatar-wrap">
                  ${renderAvatarSVG(f.avatar, gameState.age, 72)}
                </div>
                <div class="friend-meta">
                  <div class="friend-name-row">
                    <strong>${fGenderIcon} ${f.name}</strong>
                    <span class="tier-badge" style="background:${tier.color}18;color:${tier.color};border:1px solid ${tier.color}44">${tier.label}</span>
                  </div>
                  <div class="friend-status-line">${statusLine}</div>
                  <p class="friend-bio">"${f.bio}"</p>
                  <div class="progress-track mini-track">
                    <div class="progress-fill" style="width:${f.bond}%;background:${tier.color}"></div>
                  </div>
                </div>
              </div>
              <div class="friend-actions">
                <button class="friend-btn" onclick="World2D.openDialogueWith('${f.id}')">💬 Talk (1/2/3)</button>
                <button class="friend-btn" onclick="hangOutWithFriend('${f.id}')">🎈 Hang Out (-${getEnergyCost(15)}% ⚡)</button>
                <button class="friend-btn gift" onclick="openGiftModal('${f.id}')">🎁 Give Gift ($)</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else if (tab === 'quests') {
    ensureQuestsInitialized();
    const activeQuests = (gameState.activeQuests || []).filter(q => !q.claimed);
    const storyQuests = activeQuests.filter(q => q.category === 'story');
    const townQuests = activeQuests.filter(q => q.category === 'town');
    const nextAgeQuest = STORY_QUEST_CATALOG.find(sq => sq.minAge > gameState.age);

    const renderQuestCard = q => {
      const pct = Math.min(100, Math.round(((q.progress || 0) / q.goal) * 100));
      return `
        <div class="friend-card quest-card ${q.completed ? 'quest-card-completed' : ''}">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;">
            <div style="display:flex;gap:10px;flex:1;">
              <span style="font-size:1.75rem;line-height:1.1;">${q.icon}</span>
              <div style="flex:1;">
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <strong>${q.title}</strong>
                  <span class="conseq-tag ${q.completed ? 'conseq-good' : ''}" style="${q.completed ? '' : 'background:#EDE9FE;color:#5B21B6;border:1px solid #C4B5FD;'}">
                    ${q.completed ? '✓ Ready to Claim!' : `${q.progress || 0} / ${q.goal}`}
                  </span>
                </div>
                <p style="font-size:0.78rem;color:#4A4E69;margin:3px 0 5px;">${q.desc}</p>
                <div style="font-size:0.74rem;font-weight:700;color:#15803D;">🎁 Reward: ${q.rewardText}</div>
                <div class="progress-track mini-track" style="margin-top:6px;">
                  <div class="progress-fill" style="width:${pct}%;background:${q.completed ? '#10B981' : '#8B5CF6'}"></div>
                </div>
              </div>
            </div>
            <div style="flex-shrink:0;">
              ${q.completed ? `
                <button type="button" class="energy-btn eat-btn" onclick="claimQuestReward('${q.id}')">
                  🎁 Claim!
                </button>
              ` : `
                <button type="button" class="energy-btn sleep-btn" onclick="executeQuestGoAction('${q.id}')">
                  📍 Go
                </button>
              `}
            </div>
          </div>
        </div>
      `;
    };

    container.innerHTML = `
      <div class="panel-top-banner">
        <div>
          <h3>🎯 SunnyDays Quest Board (🏆 ${gameState.questsCompletedCount || 0} Done)</h3>
          <p>Complete Story & Town Quests to earn Money, Energy, Stats & Scrapbook Badges!</p>
        </div>
        <button class="action-pill-btn" onclick="rerollTownQuests()">
          🔄 New Quests
        </button>
      </div>

      <div style="max-height:560px;overflow-y:auto;padding-right:4px;">
        <div class="sub-section">
          <h4>🌟 Story & Life Milestone Quests (${storyQuests.length})</h4>
          <p class="sub-hint">Unlocks as you grow up and unlock new places around town!</p>
          ${storyQuests.length === 0 ? `
            <div class="friend-card" style="text-align:center;color:#6C757D;font-size:0.82rem;">
              🎉 You completed all Story Quests for Age ${gameState.age}!
              ${nextAgeQuest ? `<br/><strong>Next Story Quest unlocks at Age ${nextAgeQuest.minAge}:</strong> ${nextAgeQuest.icon} ${nextAgeQuest.title}` : ''}
            </div>
          ` : `
            <div class="choice-cards-grid">
              ${storyQuests.map(renderQuestCard).join('')}
            </div>
          `}
        </div>

        <div class="sub-section">
          <h4>🔄 Repeatable Town Quests (${townQuests.length})</h4>
          <p class="sub-hint">New Town Quests appear automatically whenever you claim one!</p>
          <div class="choice-cards-grid">
            ${townQuests.map(renderQuestCard).join('')}
          </div>
        </div>
      </div>
    `;
  } else if (tab === 'inventory') {
    const inv = gameState.inventory || [];
    const foodItems = inv.map((item, idx) => ({ ...item, invIdx: idx })).filter(i => i.category === 'food');
    const gearItems = inv.map((item, idx) => ({ ...item, invIdx: idx })).filter(i => i.category !== 'food');

    container.innerHTML = `
      <div class="panel-top-banner">
        <div>
          <h3>🎒 ${gameState.name}'s Inventory (${inv.length} Slots)</h3>
          <p>Keep your food, snacks, birthday presents, clothes & gear here!</p>
        </div>
        <button class="action-pill-btn" onclick="openFoodChoiceModal()">
          🍽️ Get Food
        </button>
      </div>

      <div class="sub-section">
        <h4>🍎 Stored Food & Snacks (${foodItems.reduce((a, b) => a + (b.qty || 1), 0)})</h4>
        <p class="sub-hint">Click "Eat" on any stored food to gain its specific Energy & Stat effects!</p>
        ${foodItems.length === 0 ? `
          <div class="friend-card" style="text-align:center;color:#6C757D;font-size:0.82rem;">
            No food packed right now! Click <strong>"🍽️ Get Food"</strong> to eat or pack snacks.
          </div>
        ` : `
          <div class="choice-cards-grid">
            ${foodItems.map(f => `
              <div class="mini-choice-card" style="justify-content:space-between;" onclick="useInventoryItem(${f.invIdx})">
                <div style="display:flex;align-items:center;gap:10px;">
                  <span>${f.icon}</span>
                  <div>
                    <strong>${f.name} ${f.qty > 1 ? `×${f.qty}` : ''}</strong>
                    <small>${f.desc}</small>
                  </div>
                </div>
                <button type="button" class="energy-btn eat-btn">🍽️ Eat</button>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <div class="sub-section">
        <h4>🎁 Birthday Items, Clothes & Gear (${gearItems.length})</h4>
        <p class="sub-hint">All your unwrapped Birthday Presents and room items are kept safe here! Click "Use" anytime.</p>
        ${gearItems.length === 0 ? `
          <div class="friend-card" style="text-align:center;color:#6C757D;font-size:0.82rem;">
            Celebrate your Birthday (🎂) to unwrap 4 random age-specific items into your Inventory!
          </div>
        ` : `
          <div class="choice-cards-grid" style="max-height:340px;overflow-y:auto;padding-right:4px;">
            ${gearItems.map(g => `
              <div class="mini-choice-card" style="justify-content:space-between;" onclick="useInventoryItem(${g.invIdx})">
                <div style="display:flex;align-items:center;gap:10px;">
                  <span>${g.icon}</span>
                  <div>
                    <strong>${g.name} ${g.qty > 1 ? `×${g.qty}` : ''}</strong>
                    <small>${g.desc || 'Birthday Treasure'}</small>
                  </div>
                </div>
                <button type="button" class="energy-btn sleep-btn">✨ Use</button>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  } else if (tab === 'store') {
    const furnitureShop = STORE_CATALOG.filter(i => i.section === 'furniture');
    const foodShop = STORE_CATALOG.filter(i => i.section === 'food');
    const gearShop = STORE_CATALOG.filter(i => i.section === 'gear');
    const clothesShop = STORE_CATALOG.filter(i => i.section === 'clothes');

    const renderStoreRow = item => {
      const canAfford = gameState.money >= item.cost;
      return `
        <div class="mini-choice-card" style="justify-content:space-between;opacity:${canAfford ? '1' : '0.65'};"
          onclick="buyStoreItem('${item.id}')">
          <div style="display:flex;align-items:center;gap:10px;">
            <span>${item.icon}</span>
            <div>
              <strong>${item.name} ($${item.cost})</strong>
              <small>${item.desc}</small>
            </div>
          </div>
          <button type="button" class="energy-btn ${canAfford ? 'eat-btn' : 'wait-night-btn'}">
            🛒 Buy $${item.cost}
          </button>
        </div>
      `;
    };

    container.innerHTML = `
      <div class="panel-top-banner">
        <div>
          <h3>🛒 SunnyDays Town Store (🪙 $${gameState.money})</h3>
          <p>Buy furniture, food, toys, electronics & clothes — placed in your Room & 🎒 Inventory!</p>
        </div>
        <button class="action-pill-btn" onclick="switchTab('inventory')">
          🎒 My Inventory
        </button>
      </div>

      <div style="max-height:560px;overflow-y:auto;padding-right:4px;">
        <div class="sub-section">
          <h4>🪑 Room Furniture & Interior Decor</h4>
          <p class="sub-hint">Visually placed inside your 2D Room (Beanbag, Plant, Flat-Screen TV, Arcade Cabinet, Sofa, Desk & Mini Fridge)!</p>
          <div class="choice-cards-grid">
            ${furnitureShop.map(renderStoreRow).join('')}
          </div>
        </div>

        <div class="sub-section">
          <h4>🍎 Groceries, Meals & Snacks</h4>
          <p class="sub-hint">Packed straight into your Inventory so you can eat them anytime for Energy!</p>
          <div class="choice-cards-grid">
            ${foodShop.map(renderStoreRow).join('')}
          </div>
        </div>

        <div class="sub-section">
          <h4>🧸 Toys, Electronics & Bedroom Gear</h4>
          <p class="sub-hint">Kept in your Inventory and displayed on your 🛏️ Bedroom Shelf!</p>
          <div class="choice-cards-grid">
            ${gearShop.map(renderStoreRow).join('')}
          </div>
        </div>

        <div class="sub-section">
          <h4>👕 Clothes, Shoes & Accessories</h4>
          <p class="sub-hint">Kept in your Inventory and equips onto your full-body Avatar!</p>
          <div class="choice-cards-grid">
            ${clothesShop.map(renderStoreRow).join('')}
          </div>
        </div>
      </div>
    `;
  } else if (tab === 'activities') {
    const cost15 = getEnergyCost(15);
    const cost20 = getEnergyCost(20);
    const isNight = gameState.timeOfDay === 'night';
    container.innerHTML = `
      <div class="panel-top-banner">
        <div>
          <h3>⚡ Energy, Activities & Hobbies (${isNight ? '🌙 Nighttime' : '☀️ Daytime'})</h3>
          <p>${isNight ? '🌙 It is Nighttime — full Sleep (+90% ⚡) is unlocked!' : '☀️ In Daytime you can only Nap (+25% ⚡). Sleep (+90% ⚡) is Nighttime-only!'}</p>
        </div>
      </div>
      <div class="activity-grid">
        ${isNight ? `
          <div class="activity-card" onclick="sleepForEnergy()">
            <span class="act-icon">🌙</span>
            <div>
              <strong>Nighttime Sleep (+90% Energy ⚡, +1 Day)</strong>
              <p>Restores +90% Energy, +5 Health, cures Sickness & wakes up Next Morning ☀️!</p>
            </div>
          </div>
        ` : `
          <div class="activity-card" onclick="napDaytime()">
            <span class="act-icon">🛋️</span>
            <div>
              <strong>Daytime Nap (+25% Energy ⚡ -> Turns to 🌙 Night)</strong>
              <p>In Daytime you can only Nap (+25% Energy). Transitions to Nighttime 🌙!</p>
            </div>
          </div>
        `}
        <div class="activity-card" onclick="openFoodChoiceModal()">
          <span class="act-icon">🍽️</span>
          <div>
            <strong>Choose Your Food & Snacks (Different Effects! +⚡)</strong>
            <p>Pick from Soup, Salad, Pancakes, Pizza, Ice Cream, Fruit & more — Eat now or Keep in Inventory!</p>
          </div>
        </div>
        ${gameState.age >= 4 ? `
          <div class="activity-card special" onclick="triggerPlaceAction('school')">
            <span class="act-icon">🏫</span>
            <div>
              <strong>At School: Study vs. Teach Friend vs. Sleep in Class (+35% ⚡)</strong>
              <p>Choose to Study (+12 Smarts), Teach Friend (+15 Bond), or Sleep in Class (+35% Energy, -8 Smarts)!</p>
            </div>
          </div>
        ` : ''}
        <div class="activity-card" onclick="doYearlyActivity('library')">
          <span class="act-icon">📚</span>
          <div>
            <strong>Read & Study (-${cost15}% ⚡)</strong>
            <p>Boosts Smarts (+7) & Storytelling (+8)</p>
          </div>
        </div>
        <div class="activity-card" onclick="doYearlyActivity('art')">
          <span class="act-icon">🎨</span>
          <div>
            <strong>Paint & Practice Music (-${cost15}% ⚡)</strong>
            <p>Boosts Happiness (+7) & Art Skill (+9)</p>
          </div>
        </div>
        <div class="activity-card" onclick="doYearlyActivity('sports')">
          <span class="act-icon">🏃</span>
          <div>
            <strong>Outdoor Bikes & Sports (-${cost15}% ⚡)</strong>
            <p>Boosts Health (+8) & Athletics (+9)</p>
          </div>
        </div>
        <div class="activity-card" onclick="doYearlyActivity('cooking')">
          <span class="act-icon">🧁</span>
          <div>
            <strong>Bake & Eat Homemade Treats (+10% ⚡)</strong>
            <p>Restores +10% Eat Energy, +6 Happiness & +9 Cooking</p>
          </div>
        </div>
        <div class="activity-card" onclick="doYearlyActivity('science')">
          <span class="act-icon">🔬</span>
          <div>
            <strong>Science Kits & Coding Lab (-${cost15}% ⚡)</strong>
            <p>Boosts Smarts (+8) & Science Skill (+9)</p>
          </div>
        </div>
        <div class="activity-card" onclick="doYearlyActivity('volunteer')">
          <span class="act-icon">🌻</span>
          <div>
            <strong>Town Garden & Volunteering (-${cost15}% ⚡)</strong>
            <p>Boosts Kindness (+9) & +4 Bond with ALL Friends!</p>
          </div>
        </div>
        <div class="activity-card special" onclick="hostFriendReunionParty()">
          <span class="act-icon">🎈</span>
          <div>
            <strong>Host a Friendship Party! (-${cost20}% ⚡, $${gameState.age >= 18 ? 40 : 10})</strong>
            <p>Invite all your friends over! +12 Bond with everyone & +12 Happiness!</p>
          </div>
        </div>
      </div>
    `;
  } else if (tab === 'career') {
    let stageSection = '';

    if (gameState.age < 6) {
      stageSection = `
        <div class="info-banner">
          🌱 <strong>Early Childhood (Ages 0–5):</strong> School Clubs unlock at Age 6, Part-Time Jobs at Age 14, and Careers in Adulthood!
        </div>
      `;
    } else if (gameState.age <= 17) {
      stageSection = `
        <div class="sub-section">
          <h4>🏅 After-School Clubs (Ages 6–17)</h4>
          <p class="sub-hint">Joining a club gives yearly skill growth and introduces you to a club friend!</p>
          <div class="choice-cards-grid">
            ${GAME_DATA.schoolClubs.map(c => `
              <div class="mini-choice-card ${gameState.clubId === c.id ? 'selected' : ''}" onclick="joinSchoolClub('${c.id}')">
                <span>${c.icon}</span>
                <div>
                  <strong>${c.name} ${gameState.clubId === c.id ? '✓' : ''}</strong>
                  <small>${c.desc}</small>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      if (gameState.age >= 14) {
        stageSection += `
          <div class="sub-section">
            <h4>🍦 After-School & Summer Jobs (Ages 14+)</h4>
            <div class="choice-cards-grid">
              ${GAME_DATA.teenJobs.map(j => `
                <div class="mini-choice-card ${gameState.teenJobId === j.id ? 'selected' : ''}" onclick="selectTeenJob('${j.id}')">
                  <span>${j.icon}</span>
                  <div>
                    <strong>${j.name} ($${j.pay}/yr) ${gameState.teenJobId === j.id ? '✓' : ''}</strong>
                    <small>${j.desc}</small>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
    } else if (gameState.age <= 21) {
      stageSection = `
        <div class="sub-section">
          <h4>🎓 University Major (Ages 18–21)</h4>
          <div class="choice-cards-grid">
            ${GAME_DATA.collegeMajors.map(m => `
              <div class="mini-choice-card ${gameState.majorId === m.id ? 'selected' : ''}" onclick="selectMajor('${m.id}')">
                <span>${m.icon}</span>
                <div>
                  <strong>${m.name} ${gameState.majorId === m.id ? '✓' : ''}</strong>
                  <small>Boosts ${m.skill.toUpperCase()} for your future career</small>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      stageSection = `
        <div class="sub-section">
          <h4>💼 Dream Careers (Ages 22+)</h4>
          <p class="sub-hint">Earn annual salary and get promoted every 4 years!</p>
          <div class="choice-cards-grid">
            ${GAME_DATA.careers.map(c => {
              const isCurrent = gameState.career && gameState.career.id === c.id;
              return `
                <div class="mini-choice-card ${isCurrent ? 'selected' : ''}" onclick="selectCareer('${c.id}')">
                  <span>${c.icon}</span>
                  <div>
                    <strong>${c.title} ($${c.baseSalary}+/yr) ${isCurrent ? '✓' : ''}</strong>
                    <small>${isCurrent ? `Current Role: ${c.levels[gameState.career.levelIndex]}` : `Uses ${c.reqSkill.toUpperCase()} skill`}</small>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Pets & Homes
    const petsHtml = `
      <div class="sub-section">
        <h4>🐾 Adopt a Loyal Pet</h4>
        <div class="choice-cards-grid">
          ${GAME_DATA.pets.map(p => {
            const owned = gameState.pets.includes(p.id);
            return `
              <div class="mini-choice-card ${owned ? 'selected' : ''}" onclick="${owned ? '' : `adoptPet('${p.id}')`}">
                <span>${p.icon}</span>
                <div>
                  <strong>${p.name} ${owned ? '(Adopted 💛)' : `($${p.cost})`}</strong>
                  <small>${p.bonus}</small>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    const homesHtml = `
      <div class="sub-section">
        <h4>🏡 Cozy Homes (${gameState.age < 18 ? 'Unlocks at Age 18+' : 'Upgrade Your Living Space'})</h4>
        <div class="choice-cards-grid">
          ${GAME_DATA.homes.map(h => {
            const isCurrent = gameState.homeId === h.id;
            const canBuy = gameState.age >= 18 && !isCurrent;
            return `
              <div class="mini-choice-card ${isCurrent ? 'selected' : ''}" onclick="${canBuy ? `upgradeHome('${h.id}')` : ''}">
                <span>${h.icon}</span>
                <div>
                  <strong>${h.name} ${isCurrent ? '(Current Home)' : `($${h.cost})`}</strong>
                  <small>${h.desc}</small>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    container.innerHTML = stageSection + petsHtml + homesHtml;
  } else if (tab === 'scrapbook') {
    container.innerHTML = `
      <div class="panel-top-banner">
        <div>
          <h3>📸 Life & Friendship Scrapbook (${gameState.scrapbook.length})</h3>
          <p>Cherished snapshots and milestones from your journey growing up!</p>
        </div>
      </div>
      <div class="scrapbook-grid">
        ${gameState.scrapbook.map(s => `
          <div class="polaroid-card">
            <div class="polaroid-age">Age ${s.age}</div>
            <h4>${s.title}</h4>
            <p>${s.desc}</p>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function openRestyleModal() {
  if (!gameState) return;
  SoundFX.pop();
  const modal = document.getElementById('event-modal');
  const content = document.getElementById('event-modal-body');

  content.innerHTML = `
    <div class="modal-top-row">
      <div class="modal-header-badge" style="margin-bottom:0;">👕 Avatar Wardrobe & Styling</div>
      <button type="button" class="modal-out-btn" onclick="closeModal()">⬅️ Out / Close ✖</button>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;margin:8px 0 12px;background:#FFF8EB;border:1.5px dashed #F3D5A5;border-radius:14px;padding:10px 16px;">
      <div id="restyle-avatar-preview">${renderAvatarSVG(gameState.avatar, gameState.age, 105)}</div>
      <div style="flex:1;">
        <h2 style="font-size:1.15rem;margin-bottom:4px;">Customize ${gameState.name}'s Look</h2>
        <p style="font-size:0.8rem;color:#6C757D;margin-bottom:8px;">Changes save automatically as you click!</p>
        <button type="button" class="modal-out-btn" style="background:#10B981;" onclick="closeModal()">✓ Save & Step Out</button>
      </div>
    </div>

    <div class="form-group">
      <label>Gender</label>
      <div class="gender-toggle-row">
        ${AVATAR_PALETTE.genders.map(g => `
          <button type="button" class="gender-btn ${gameState.avatar.gender === g.id ? 'active' : ''}"
            onclick="updateInGameAvatar('gender', '${g.id}')">
            <span class="gender-icon">${g.icon}</span>
            <span>${g.name}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <div class="form-group">
      <label>Hair Style</label>
      <div class="pill-row">
        ${AVATAR_PALETTE.hairStyles.map(hs => `
          <button type="button" class="pill-choice ${gameState.avatar.hairStyle === hs.id ? 'active' : ''}"
            onclick="updateInGameAvatar('hairStyle', '${hs.id}')">${hs.name}</button>
        `).join('')}
      </div>
    </div>

    <div class="form-group">
      <label>Hair Color</label>
      <div class="swatch-row">
        ${AVATAR_PALETTE.hairColors.map(h => `
          <button type="button" class="swatch-btn ${gameState.avatar.hairColor === h.id ? 'active' : ''}"
            style="background:${h.fill}" title="${h.name}"
            onclick="updateInGameAvatar('hairColor', '${h.id}')"></button>
        `).join('')}
      </div>
    </div>

    <div class="form-group">
      <label>Outfit Style</label>
      <div class="pill-row">
        ${AVATAR_PALETTE.outfitStyles.map(os => `
          <button type="button" class="pill-choice ${gameState.avatar.outfit === os.id ? 'active' : ''}"
            onclick="updateInGameAvatar('outfit', '${os.id}')">${os.name}</button>
        `).join('')}
      </div>
    </div>

    <div class="form-group">
      <label>Outfit Color</label>
      <div class="swatch-row">
        ${AVATAR_PALETTE.shirtColors.map(sh => `
          <button type="button" class="swatch-btn ${gameState.avatar.shirt === sh.id ? 'active' : ''}"
            style="background:${sh.fill}" title="${sh.name}"
            onclick="updateInGameAvatar('shirt', '${sh.id}')"></button>
        `).join('')}
      </div>
    </div>

    <div class="form-group">
      <label>Accessory</label>
      <div class="pill-row">
        ${AVATAR_PALETTE.accessories.map(acc => `
          <button type="button" class="pill-choice ${gameState.avatar.accessory === acc.id ? 'active' : ''}"
            onclick="updateInGameAvatar('accessory', '${acc.id}')">${acc.name}</button>
        `).join('')}
      </div>
    </div>

    <div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;gap:10px;">
      <button type="button" class="modal-out-btn" onclick="closeModal()">⬅️ Out (Back to Room)</button>
      <button type="button" class="age-up-btn" style="padding:9px 20px;font-size:0.95rem;" onclick="closeModal()">✓ Save Look & Exit</button>
    </div>
  `;
  modal.classList.remove('hidden');
}

function updateInGameAvatar(key, val) {
  if (!gameState) return;
  SoundFX.pop();
  gameState.avatar[key] = val;
  saveGame();
  renderLeftProfile();
  if (typeof World2D !== 'undefined') {
    World2D.renderWorldDOM();
  }
  openRestyleModal();
}

function showToast(msg) {
  const toast = document.getElementById('toast-banner');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3000);
}

window.addEventListener('DOMContentLoaded', initApp);
