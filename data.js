// Wholesome Game Content & Data for SunnyDays: Life & Friendship Sim

const GAME_DATA = {
  hometowns: [
    {
      id: 'maple-creek',
      name: 'Maple Creek',
      icon: '🍁',
      tagline: 'A cozy town famous for autumn leaf festivals, treehouses, and apple orchards.',
      bonus: { kindness: 5, happiness: 5 }
    },
    {
      id: 'starlight-bay',
      name: 'Starlight Bay',
      icon: '🌊',
      tagline: 'A breezy coastal town with lighthouses, tide pools, and boardwalk ice cream shops.',
      bonus: { health: 5, happiness: 5 }
    },
    {
      id: 'sunnyvale',
      name: 'Sunnyvale Meadows',
      icon: '🌻',
      tagline: 'Bright sunflower fields, friendly bike trails, and the best community library around.',
      bonus: { smarts: 5, kindness: 5 }
    },
    {
      id: 'pine-ridge',
      name: 'Pine Ridge',
      icon: '🏔️',
      tagline: 'Nestled by crystal lakes and pine forests where everyone loves camping and stargazing.',
      bonus: { health: 8, smarts: 2 }
    }
  ],

  traits: [
    {
      id: 'kindhearted',
      name: 'Kindhearted',
      icon: '💛',
      desc: 'Makes friends easily and earns extra Kindness & Friendship points when helping others.',
      mods: { kindness: 10, happiness: 5 }
    },
    {
      id: 'curious',
      name: 'Curious Explorer',
      icon: '🔍',
      desc: 'Loves asking how things work! Starts with extra Smarts and learns school subjects faster.',
      mods: { smarts: 12, health: 3 }
    },
    {
      id: 'creative',
      name: 'Creative Dreamer',
      icon: '🎨',
      desc: 'Sees magic in everyday life! Starts with a boost in Art & Storytelling and high Happiness.',
      mods: { happiness: 10, smarts: 5 },
      skillBonus: { art: 15, story: 10 }
    },
    {
      id: 'energetic',
      name: 'Energetic Sprinter',
      icon: '⚡',
      desc: 'Always ready for recess, bike rides, and outdoor adventures! Extra Health & Athletics.',
      mods: { health: 12, happiness: 5 },
      skillBonus: { athletics: 15 }
    }
  ],

  presetNamesByGender: {
    girl: ['Sunny', 'Maya', 'Chloe', 'Mia', 'Lily', 'Zoe', 'Emma', 'Hana', 'Sophie', 'Ruby'],
    boy: ['Leo', 'Noah', 'Oliver', 'Lucas', 'Toby', 'Sam', 'Charlie', 'Milo', 'Finn', 'Owen']
  },

  // Memorable Friends You Can Meet Across Life Stages
  friendPool: [
    {
      id: 'maya',
      name: 'Maya Lin',
      gender: 'girl',
      metStage: 'child',
      trait: 'Animal Lover',
      favoriteInterest: 'Animals & Nature',
      favoriteGift: 'sketchbook',
      childhoodDream: 'open an animal rescue shelter',
      teenUpdate: 'volunteering at the town pet clinic after school',
      collegeUpdate: 'studying Veterinary Science',
      adultJob: 'Town Veterinarian 🐾',
      bio: 'Always has animal stickers on her notebook and knows every dog in the neighborhood by name.',
      avatar: { gender: 'girl', skin: 'warm-light', hairColor: 'midnight', hairStyle: 'bob', outfit: 'overalls', shirt: 'mint', accessory: 'star-clip' }
    },
    {
      id: 'leo',
      name: 'Leo Rivera',
      gender: 'boy',
      metStage: 'child',
      trait: 'Junior Baker & Jokester',
      favoriteInterest: 'Baking & Comics',
      favoriteGift: 'cookie-jar',
      childhoodDream: 'invent a glow-in-the-dark cupcake',
      teenUpdate: 'baking cinnamon rolls for the school club',
      collegeUpdate: 'training at the Starlight Culinary Academy',
      adultJob: 'Head Pastry Chef 🥐',
      bio: 'Brings extra snacks to share at lunch and can make anyone laugh on a rainy day.',
      avatar: { gender: 'boy', skin: 'golden-tan', hairColor: 'chestnut', hairStyle: 'curly', outfit: 'hoodie', shirt: 'coral', accessory: 'cap' }
    },
    {
      id: 'toby',
      name: 'Toby Vance',
      gender: 'boy',
      metStage: 'child',
      trait: 'Stargazer & Tinkerer',
      favoriteInterest: 'Science & Space',
      favoriteGift: 'telescope-lens',
      childhoodDream: 'build a rover that explores Jupiter',
      teenUpdate: 'captain of the Robotics & Astronomy Club',
      collegeUpdate: 'building satellites in Aerospace Lab',
      adultJob: 'Planetarium Director 🔭',
      bio: 'Quiet at first, but once you ask him about constellations or LEGOs, he lights right up!',
      avatar: { gender: 'boy', skin: 'fair-rose', hairColor: 'golden', hairStyle: 'short-part', outfit: 'cardigan', shirt: 'sky', accessory: 'round-glasses' }
    },
    {
      id: 'zoe',
      name: 'Zoe Brooks',
      gender: 'girl',
      metStage: 'child',
      trait: 'Treehouse Captain',
      favoriteInterest: 'Sports & Adventure',
      favoriteGift: 'compass',
      childhoodDream: 'climb every mountain trail in the state',
      teenUpdate: 'leading the track team and organizing campouts',
      collegeUpdate: 'studying Forestry & Outdoor Leadership',
      adultJob: 'Head Park Ranger 🌲',
      bio: 'Fearless, loyal, and always the first to invite new kids to join the game at recess.',
      avatar: { gender: 'girl', skin: 'caramel', hairColor: 'espresso', hairStyle: 'ponytail', outfit: 'varsity', shirt: 'sunflower', accessory: 'freckles' }
    },
    {
      id: 'hana',
      name: 'Hana Takahashi',
      gender: 'girl',
      metStage: 'preteen',
      trait: 'Indie Musician & Painter',
      favoriteInterest: 'Art & Music',
      favoriteGift: 'sketchbook',
      childhoodDream: 'illustrate graphic novels and compose soundtracks',
      teenUpdate: 'playing acoustic guitar at the school talent show',
      collegeUpdate: 'studying Animation & Illustration',
      adultJob: 'Children’s Book Illustrator 🎨',
      bio: 'Moved to town in Middle School with a ukulele and a backpack full of watercolor paints.',
      avatar: { gender: 'girl', skin: 'warm-light', hairColor: 'lavender', hairStyle: 'long-wave', outfit: 'sundress', shirt: 'lavender', accessory: 'ribbon-bow' }
    },
    {
      id: 'samir',
      name: 'Samir Patel',
      gender: 'boy',
      metStage: 'preteen',
      trait: 'Puzzle Master & Coder',
      favoriteInterest: 'Coding & Board Games',
      favoriteGift: 'board-game',
      childhoodDream: 'create a cozy adventure game for friends to play together',
      teenUpdate: 'hosting Friday afternoon tabletop game quests',
      collegeUpdate: 'studying Computer Science & Game Design',
      adultJob: 'Indie Game Director 🎮',
      bio: 'Loves cooperative board games, riddles, and helping friends debug their homework.',
      avatar: { gender: 'boy', skin: 'olive', hairColor: 'midnight', hairStyle: 'spiky', outfit: 'hoodie', shirt: 'teal', accessory: 'headphones' }
    },
    {
      id: 'claire',
      name: 'Claire Beaumont',
      gender: 'girl',
      metStage: 'teen',
      trait: 'School Newspaper Editor',
      favoriteInterest: 'Stories & Photography',
      favoriteGift: 'novel',
      childhoodDream: 'travel the world writing heartwarming stories',
      teenUpdate: 'taking polaroid photos for the High School Yearbook',
      collegeUpdate: 'editing the campus magazine',
      adultJob: 'Travel & Culture Writer 📸',
      bio: 'Always carries a vintage camera to capture fun memories with her friend group.',
      avatar: { gender: 'girl', skin: 'fair-rose', hairColor: 'strawberry', hairStyle: 'pigtails', outfit: 'cardigan', shirt: 'berry', accessory: 'freckles' }
    },
    {
      id: 'marcus',
      name: 'Marcus Green',
      gender: 'boy',
      metStage: 'teen',
      trait: 'Community Gardener & Coach',
      favoriteInterest: 'Sports & Gardening',
      favoriteGift: 'plant-pot',
      childhoodDream: 'turn empty city lots into blooming community gardens',
      teenUpdate: 'coaching little league on Saturday mornings',
      collegeUpdate: 'studying Sustainable Architecture',
      adultJob: 'Botanical Garden Architect 🌱',
      bio: 'Gentle giant with the warmest high-fives and a talent for growing giant sunflowers.',
      avatar: { gender: 'boy', skin: 'deep-umber', hairColor: 'espresso', hairStyle: 'curly', outfit: 'varsity', shirt: 'mint', accessory: 'none' }
    },
    {
      id: 'elena',
      name: 'Elena Rossi',
      gender: 'girl',
      metStage: 'young-adult',
      trait: 'Coffee Shop Philosopher',
      favoriteInterest: 'Baking & Books',
      favoriteGift: 'cookie-jar',
      childhoodDream: 'run a bookshop café with cozy armchairs',
      teenUpdate: 'collecting family recipes',
      collegeUpdate: 'working at the campus library café',
      adultJob: 'Bookshop Café Owner ☕',
      bio: 'Remembers everyone’s favorite warm drink and hosts neighborhood poetry and trivia nights.',
      avatar: { gender: 'girl', skin: 'olive', hairColor: 'chestnut', hairStyle: 'long-wave', outfit: 'cardigan', shirt: 'sunflower', accessory: 'round-glasses' }
    }
  ],

  gifts: [
    { id: 'sketchbook', name: 'Watercolor Sketchbook', cost: 12, icon: '🎨', bestFor: 'Art & Music' },
    { id: 'cookie-jar', name: 'Homemade Honey Cookies', cost: 8, icon: '🍪', bestFor: 'Baking & Comics' },
    { id: 'telescope-lens', name: 'Glow-in-the-Dark Star Map', cost: 15, icon: '🌌', bestFor: 'Science & Space' },
    { id: 'compass', name: 'Brass Trail Compass', cost: 14, icon: '🧭', bestFor: 'Sports & Adventure' },
    { id: 'board-game', name: 'Co-op Strategy Board Game', cost: 18, icon: '🎲', bestFor: 'Coding & Board Games' },
    { id: 'novel', name: 'Signed Mystery Novel', cost: 14, icon: '📖', bestFor: 'Stories & Photography' },
    { id: 'plant-pot', name: 'Painted Succulent Pot', cost: 10, icon: '🪴', bestFor: 'Animals & Nature' }
  ],

  schoolClubs: [
    {
      id: 'explorers',
      name: 'Junior Nature Explorers',
      icon: '🏕️',
      desc: 'Scavenger hunts, birdwatching, and learning trail skills!',
      skill: 'athletics',
      stat: 'health',
      friendMatch: 'zoe'
    },
    {
      id: 'art-guild',
      name: 'Rainbow Art & Music Studio',
      icon: '🎨',
      desc: 'Paint murals, fold origami, and jam on instruments together.',
      skill: 'art',
      stat: 'happiness',
      friendMatch: 'hana'
    },
    {
      id: 'science-sprouts',
      name: 'Robotics & Stargazers Club',
      icon: '🚀',
      desc: 'Build model rockets, code mini-robots, and gaze at planets!',
      skill: 'science',
      stat: 'smarts',
      friendMatch: 'toby'
    },
    {
      id: 'baking-buddies',
      name: 'Little Bakers & Garden Club',
      icon: '🧁',
      desc: 'Bake muffins, grow strawberries, and share treats with friends.',
      skill: 'cooking',
      stat: 'kindness',
      friendMatch: 'leo'
    },
    {
      id: 'story-circle',
      name: 'Young Authors & Drama Club',
      icon: '🎭',
      desc: 'Write comic books, put on school plays, and tell epic tales!',
      skill: 'story',
      stat: 'smarts',
      friendMatch: 'claire'
    }
  ],

  teenJobs: [
    { id: 'dog-walker', name: 'Neighborhood Dog Walker', icon: '🐕', pay: 35, stat: 'health', desc: 'Walk friendly pups through the park after school.' },
    { id: 'ice-cream', name: 'Boardwalk Ice Cream Scooper', icon: '🍦', pay: 40, stat: 'happiness', desc: 'Serve waffle cones with rainbow sprinkles!' },
    { id: 'library-aide', name: 'Town Library Helper', icon: '📚', pay: 38, stat: 'smarts', desc: 'Organize storybooks and help kids find adventures.' },
    { id: 'camp-counselor', name: 'Summer Camp Junior Leader', icon: '🛶', pay: 45, stat: 'kindness', desc: 'Lead campfire songs and arts & crafts for younger kids.' }
  ],

  collegeMajors: [
    { id: 'comp-sci', name: 'Computer Science & Game Design', icon: '💻', skill: 'science' },
    { id: 'fine-arts', name: 'Fine Arts & Animation', icon: '🎨', skill: 'art' },
    { id: 'vet-med', name: 'Veterinary & Animal Care', icon: '🐾', skill: 'science' },
    { id: 'education', name: 'Education & Child Development', icon: '🍎', skill: 'story' },
    { id: 'culinary', name: 'Culinary & Pastry Arts', icon: '🥐', skill: 'cooking' },
    { id: 'environmental', name: 'Environmental & Park Sciences', icon: '🌲', skill: 'athletics' }
  ],

  careers: [
    {
      id: 'game-dev',
      title: 'Cozy Game Developer',
      icon: '🎮',
      baseSalary: 520,
      reqSkill: 'science',
      levels: ['Junior Indie Coder', 'Lead Gameplay Designer', 'Creative Studio Director', 'Legendary Game Creator']
    },
    {
      id: 'vet',
      title: 'Town Veterinarian',
      icon: '🐾',
      baseSalary: 540,
      reqSkill: 'science',
      levels: ['Clinic Assistant', 'Neighborhood Vet', 'Wildlife Sanctuary Director', 'Beloved Animal Hero']
    },
    {
      id: 'teacher',
      title: 'School Teacher',
      icon: '🍎',
      baseSalary: 460,
      reqSkill: 'story',
      levels: ['Student Teacher', 'Homeroom Teacher', 'Beloved Club Advisor', 'Principal of the Year']
    },
    {
      id: 'baker',
      title: 'Artisan Bakery Owner',
      icon: '🥐',
      baseSalary: 480,
      reqSkill: 'cooking',
      levels: ['Apprentice Baker', 'Head Pastry Chef', 'Main Street Café Owner', 'Golden Whisk Master']
    },
    {
      id: 'artist',
      title: 'Storybook Illustrator & Author',
      icon: '🎨',
      baseSalary: 470,
      reqSkill: 'art',
      levels: ['Freelance Sketcher', 'Comic Creator', 'Bestselling Picture Book Author', 'Grand Laureate of Arts']
    },
    {
      id: 'ranger',
      title: 'National Park Ranger',
      icon: '🌲',
      baseSalary: 490,
      reqSkill: 'athletics',
      levels: ['Trail Guide', 'Forest Guardian', 'Conservation Chief', 'Master of the Great Outdoors']
    }
  ],

  pets: [
    { id: 'golden-pup', name: 'Biscuit the Golden Retriever', icon: '🐶', cost: 120, bonus: 'Happiness +6 & Health +4 every year' },
    { id: 'calico-cat', name: 'Mochi the Cozy Calico Cat', icon: '🐱', cost: 95, bonus: 'Happiness +7 every year' },
    { id: 'lop-bunny', name: 'Clover the Floppy-Eared Bunny', icon: '🐰', cost: 75, bonus: 'Happiness +5 & Kindness +3 every year' },
    { id: 'wise-turtle', name: 'Shelby the Garden Turtle', icon: '🐢', cost: 60, bonus: 'Smarts +4 & Happiness +4 every year' }
  ],

  homes: [
    { id: 'family-room', name: 'Childhood Bedroom', icon: '🛏️', cost: 0, desc: 'Decorated with glow-in-the-dark stars and drawings from your friends.' },
    { id: 'sunny-loft', name: 'Sunny Loft Apartment', icon: '🪴', cost: 600, desc: 'A bright starter apartment with window plants and a board game table.' },
    { id: 'maple-cottage', name: 'Maple Porch Cottage', icon: '🏡', cost: 1800, desc: 'A cozy cottage with a front porch swing and a fenced yard for pets!' },
    { id: 'treehouse-villa', name: 'Lakeside Craft House', icon: '🏰', cost: 4200, desc: 'Your dream home with an art & hobby studio, guest rooms, and a big garden for friend reunions!' }
  ]
};

// Dynamic & Age-Specific Wholesome Story Events
function getYearlyEventForPlayer(state) {
  const age = state.age;
  const bestFriend = getTopFriend(state);
  const friendName = bestFriend ? bestFriend.name.split(' ')[0] : 'your neighbor';

  const specificEvents = {
    1: {
      title: 'Age 1: Unlocked Ice Cream Shop & Playground! 🍦🛝',
      text: `Happy 1st Birthday! Mom, Dad, and your siblings buckle you into the Family Car and take you out to celebrate! You just unlocked the Ice Cream Shop 🍦 and the Sunny Playground 🛝 on the 2D Square!`,
      milestone: 'Unlocked Ice Cream Shop & Playground! 🍦🛝',
      choices: [
        { label: 'Try your first baby cone at the Ice Cream Shop 🍦', effects: { happiness: 9, kindness: 5 }, log: 'You tried vanilla ice cream with rainbow sprinkles with your parents and siblings!' },
        { label: 'Go down the baby slide at the Playground with your siblings 🛝', effects: { health: 8, happiness: 8, skill: ['athletics', 5] }, log: 'Your big sister and brother caught you at the bottom of the slide as you giggled!' },
        { label: 'Wave at all the neighbors from the Family Car 🚗', effects: { kindness: 8, happiness: 7 }, log: 'You clapped and waved from the car window all the way home!' }
      ]
    },
    2: {
      title: 'Age 2: Unlocked Pizza Place & Nursery! 🍕🍼',
      text: 'You turned 2! Two brand-new places just unlocked on your 2D Town Square: the cheesy Pizza Place 🍕 and the Cozy Nursery 🍼!',
      milestone: 'Unlocked Pizza Place & Nursery! 🍕🍼',
      choices: [
        { label: 'Have a family pizza party with Mom, Dad & your siblings 🍕', effects: { happiness: 9, kindness: 6, skill: ['cooking', 5] }, log: 'You had a big family dinner at the Pizza Place!' },
        { label: 'Finger-paint and build block towers at the Nursery 🍼', effects: { smarts: 7, happiness: 7, skill: ['art', 8] }, log: 'You painted a masterpiece at the Cozy Nursery and met playmates!', meetNewFriend: true },
        { label: 'Play hide-and-seek at home with your siblings 🧸', effects: { health: 7, happiness: 8 }, log: 'You and your siblings played hide-and-seek in the Family Home!' }
      ]
    },
    3: {
      title: 'Age 3: Unlocked Toy Store & School Bus! 🧸🚌',
      text: 'Happy 3rd Birthday! You just unlocked the Wonder Toy Store 🧸 and the Yellow School Bus 🚌 on the 2D Town Square!',
      milestone: 'Unlocked Toy Store & School Bus! 🧸🚌',
      choices: [
        { label: 'Pick out a plushie and LEGO set at the Toy Store 🧸', effects: { happiness: 10, smarts: 6 }, log: 'Your parents let you pick out your favorite toy at the Wonder Toy Store!', meetNewFriend: true },
        { label: 'Hop on the Yellow School Bus with your siblings 🚌', effects: { happiness: 9, kindness: 8, friendBoost: 12 }, log: 'You sat next to your siblings and friends on your very first School Bus ride!' },
        { label: 'Share your new toys with ${friendName} 🤝', effects: { kindness: 10, happiness: 8, friendBoost: 15 }, log: `You shared your new Toy Store treasures with ${friendName}!` }
      ]
    },
    4: {
      title: 'Age 4: Unlocked School & Snack Store! 🏫🍿',
      text: `You are 4 years old! You just unlocked Hometown School 🏫 and the Corner Snack Store 🍿 on the 2D Square!`,
      milestone: 'Unlocked School & Snack Store! 🏫🍿',
      choices: [
        { label: 'Explore your new classroom at School 🏫', effects: { smarts: 10, happiness: 7, skill: ['science', 6] }, log: 'You loved your first day at Hometown School and learned so much!', meetNewFriend: true },
        { label: 'Stop by the Snack Store with your siblings after school 🍿', effects: { happiness: 10, kindness: 7, friendBoost: 12 }, log: 'You shared pretzels and fruit gummies from the Snack Store with your siblings and ${friendName}!' },
        { label: 'Draw a picture for Mom & Dad in class 🖍️', effects: { happiness: 8, kindness: 8, skill: ['art', 8] }, log: 'Mom & Dad put your school drawing right on the front of the fridge!' }
      ]
    },
    5: {
      title: 'Age 5: Unlocked the Sunnyvale Mall! 🛍️',
      text: 'At Age 5, the grand Sunnyvale Mall 🛍️ unlocks on the 2D Square! Your parents, siblings, and ${friendName} head over for a weekend outing!',
      milestone: 'Unlocked the Mall! 🛍️',
      choices: [
        { label: 'Take silly family & friend photos in the Mall Photo Booth 📸', effects: { kindness: 10, happiness: 10, friendBoost: 15 }, log: 'You took funny photo-booth strips at the Mall with your siblings and ${friendName}!', scrapbook: 'First Trip to Sunnyvale Mall 🛍️' },
        { label: 'Check out the Mall Bookstore & Science Gadget Shop 🔍', effects: { smarts: 10, happiness: 7, skill: ['science', 7] }, log: 'You found an awesome book of experiments at the Mall!' },
        { label: 'Pick out a cool new outfit at the Mall 👕', effects: { happiness: 11, skill: ['art', 7] }, log: 'You strutted through the Mall in your favorite new style!' }
      ]
    },
    6: {
      title: "Age 6: Unlocked Your Best Friend's Home! 🌟🏡",
      text: `You turned 6! You just unlocked ${friendName}'s Home 🌟 on the 2D Square! You can now walk over to your Best Friend's Home anytime to play, and at Age 21 you will move in there together!`,
      milestone: "Unlocked Best Friend's Home! 🌟",
      scrapbook: "First Visit to Best Friend's Home 🌟",
      choices: [
        { label: "Have an epic board game & pillow fort afternoon at ${friendName}'s Home 🏰", effects: { kindness: 10, happiness: 11, friendBoost: 20 }, log: `You spent the whole Saturday playing at ${friendName}'s Home!` },
        { label: 'Bake warm cookies together in their kitchen 🍪', effects: { kindness: 9, happiness: 9, skill: ['cooking', 8], friendBoost: 16 }, log: `You and ${friendName} baked cookies together at their house!` },
        { label: 'Draw comic books in their backyard treehouse 🦸', effects: { smarts: 7, happiness: 9, skill: ['art', 8], skill2: ['story', 6], friendBoost: 16 }, log: `You and ${friendName} started your own comic book series at their house!` }
      ]
    },
    7: {
      title: 'The Secret Backyard Fort 🌳',
      text: `You and ${friendName} spend Saturday afternoon building a headquarters in the backyard out of blankets, cardboard boxes, and fairy lights.`,
      choices: [
        { label: 'Make a "Everyone Welcome" club sign & snack station 🍪', effects: { kindness: 9, happiness: 8, friendBoost: 15 }, log: `Your backyard club with ${friendName} became the neighborhood hangout spot!` },
        { label: 'Create a secret code language & treasure map 🗺️', effects: { smarts: 8, happiness: 7, skill: ['story', 8], friendBoost: 12 }, log: `You and ${friendName} invented a secret cipher and hid treasure clues across the yard!` },
        { label: 'Add a periscope and weather station on top 🔭', effects: { smarts: 9, skill: ['science', 8], friendBoost: 10 }, log: 'Your fort had a working cardboard periscope and rain gauge!' }
      ]
    },
    8: {
      title: 'Choosing Your Elementary Club! 🏅',
      text: 'Now that you are 8 years old, your school lets students sign up for after-school clubs! You can also switch or practice clubs anytime in the Activities tab.',
      choices: [
        { label: 'Join the Robotics & Stargazers Club 🚀', effects: { smarts: 8, happiness: 6, skill: ['science', 10], setClub: 'science-sprouts' }, log: 'You joined the Robotics & Stargazers Club!' },
        { label: 'Join the Rainbow Art & Music Studio 🎨', effects: { happiness: 9, kindness: 5, skill: ['art', 10], setClub: 'art-guild' }, log: 'You joined the Rainbow Art & Music Studio!' },
        { label: 'Join the Junior Nature Explorers 🏕️', effects: { health: 9, happiness: 6, skill: ['athletics', 10], setClub: 'explorers' }, log: 'You joined the Junior Nature Explorers!' }
      ]
    },
    9: {
      title: 'The Elementary Field Trip to the Aquarium 🐠',
      text: 'The yellow school bus rolls up to the Starlight Bay Aquarium! Your buddy partner for the trip is ${friendName}.',
      choices: [
        { label: 'Take notes on the sea otters and ask the biologist questions 🦦', effects: { smarts: 9, happiness: 7, skill: ['science', 8], friendBoost: 10 }, log: 'The aquarium biologist gave you and ${friendName} honorary Junior Marine badges!' },
        { label: 'Sketch the glowing jellyfish in your notebook 🪼', effects: { happiness: 8, skill: ['art', 9], friendBoost: 10 }, log: 'You drew pages of glowing jellyfish and gave one sketch to ${friendName}.' },
        { label: 'Spend your souvenir coins on matching friendship bracelets  bracelets 🐬', effects: { kindness: 10, happiness: 9, money: -5, friendBoost: 18 }, log: `You and ${friendName} got matching dolphin friendship bracelets!`, scrapbook: 'Aquarium Friendship Bracelets 🐬' }
      ]
    },
    10: {
      title: 'Double Digits! 10th Birthday Sleepover 🎉',
      text: 'Whoa, you are officially 10 years old — double digits! Your family helps you throw a big birthday hangout with all your friends.',
      milestone: 'Turned Double Digits (Age 10)! 🎂',
      choices: [
        { label: 'Host a living-room pillow fort & board game marathon 🎲', effects: { happiness: 10, kindness: 8, money: 25, allFriendsBoost: 12 }, log: 'Your 10th birthday board game marathon was legendary! You also got $25 in birthday cards.' },
        { label: 'Bake a giant DIY pizza & cupcake bar together 🍕', effects: { happiness: 10, skill: ['cooking', 10], money: 25, allFriendsBoost: 12 }, log: 'Everyone decorated their own cupcakes at your 10th birthday party!' },
        { label: 'Camp out in tents in the backyard looking at shooting stars 🌠', effects: { happiness: 10, health: 6, money: 25, allFriendsBoost: 14 }, log: 'You and your friends stayed up spotting shooting stars on your 10th birthday!' }
      ]
    },
    11: {
      title: 'Welcome to Middle School! 🏫',
      text: 'At age 11, you move up to Middle School! You have your own locker with a combination lock, and there are kids from all over town.',
      milestone: 'Started Middle School 🏫',
      choices: [
        { label: 'Help a new transfer student figure out their locker combo 🗝️', effects: { kindness: 10, happiness: 8 }, log: 'You helped a new student open their jammed locker and gained a great new middle school friend!', meetNewFriend: true },
        { label: 'Decorate your locker with magnets, mirrors, & friend photos 📸', effects: { happiness: 9, skill: ['art', 6], allFriendsBoost: 8 }, log: 'Your locker became the cheeriest spot in the 6th grade hallway!', meetNewFriend: true },
        { label: 'Sign up for the Middle School Quiz Bowl & Science Fair 🧪', effects: { smarts: 10, skill: ['science', 8] }, log: 'You dove straight into Middle School challenges and met cool classmates!', meetNewFriend: true }
      ]
    },
    12: {
      title: 'The 7th Grade Science & Invention Fair 💡',
      text: `It’s time for the big Middle School Invention Fair! ${friendName} asks if you want to team up on a project.`,
      choices: [
        { label: 'Build an automatic solar-powered plant waterer 🌱', effects: { smarts: 10, skill: ['science', 10], friendBoost: 15, happiness: 8 }, log: `You and ${friendName} won a Blue Ribbon for your solar plant waterer!`, scrapbook: 'Middle School Invention Fair Ribbon 🏅' },
        { label: 'Create an interactive storytelling trivia machine 📖', effects: { smarts: 8, skill: ['story', 10], friendBoost: 15, happiness: 8 }, log: `The whole school lined up to play the trivia machine you built with ${friendName}!` },
        { label: 'Test the chemistry of the fluffiest pancake recipe ever 🥞', effects: { happiness: 10, kindness: 7, skill: ['cooking', 10], friendBoost: 15 }, log: 'The judges loved sampling your scientifically fluffy pancakes!' }
      ]
    },
    13: {
      title: 'Officially a Teenager! The School Talent Show 🎤',
      text: 'You are 13 now! The Middle School Talent Show is tonight, and your friend group is backstage feeling a bit of stage fright.',
      milestone: 'Became a Teenager (Age 13) 🌟',
      choices: [
        { label: 'Give an encouraging pep talk and perform a group skit 🎭', effects: { kindness: 10, happiness: 10, skill: ['story', 8], allFriendsBoost: 14 }, log: 'Your pep talk calmed everyone’s nerves and your group comedy skit brought the house down!' },
        { label: 'Paint the glowing stage backdrop & run the spotlights 🎨', effects: { happiness: 9, smarts: 6, skill: ['art', 10], allFriendsBoost: 10 }, log: 'Your cosmic stage backdrop made every act look magical!' },
        { label: 'Perform an energetic trick routine / acoustic song 🎸', effects: { happiness: 10, health: 7, skill: ['athletics', 7], skill2: ['art', 7] }, log: 'The whole auditorium clapped along to your talent show performance!' }
      ]
    },
    14: {
      title: 'Freshman Year of High School! 🎺',
      text: 'High school is here! The campus is huge, there are pep rallies, clubs, and part-time jobs opening up. How do you kick off 9th grade?',
      milestone: 'Started High School 🎒',
      choices: [
        { label: 'Sit at a big lunch table mixing your old friends & new kids 🥪', effects: { kindness: 10, happiness: 9, allFriendsBoost: 10 }, log: 'You brought your childhood friends and new freshmen together into one big lunch crew!', meetNewFriend: true },
        { label: 'Take Honors classes & join the Academic Decathlon 📚', effects: { smarts: 12, happiness: 5, skill: ['science', 8] }, log: 'You aced your first High School exams and met study buddies!', meetNewFriend: true },
        { label: 'Try out for Track / Outdoor Adventure Team 🏃', effects: { health: 11, happiness: 8, skill: ['athletics', 10] }, log: 'You made the High School team and felt unstoppable!', meetNewFriend: true }
      ]
    },
    16: {
      title: 'Turning 16! Do You Want to Move Out? 🔑🏡',
      text: `Happy 16th Birthday! From Age 0 to 16 you have lived in the Family Home with Mom & Dad. Now that you are 16, your family asks if you want to move out into the Cozy Starter Loft on the 2D Town Square, or stay living with your family until you move in with your best friend at 21!`,
      milestone: 'Age 16 Move-Out Decision 🔑',
      choices: [
        {
          label: '🔑 Yes, I want to move out into the Starter Loft!',
          effects: { happiness: 12, smarts: 8, money: 50, setLivingWith: 'moved-out-16' },
          log: 'At 16, you decided to move out into the Cozy Starter Loft! Mom & Dad helped you carry your boxes and gave you $50 for houseplants!',
          scrapbook: 'Moved Out at 16 into Starter Loft 🔑'
        },
        {
          label: '🏡 No, I want to stay living with my Family!',
          effects: { happiness: 12, kindness: 10, health: 8, setLivingWith: 'family' },
          log: 'You chose to stay in the warm Family Home with Mom & Dad — enjoying family dinners and hugs every day!',
          scrapbook: 'Stayed Close with Family at 16 🏡'
        }
      ]
    },
    18: {
      title: 'High School Graduation! Tossing the Caps 🎓',
      text: `At 18, you stand on the field in your cap and gown! The University & Career Hub has unlocked on the 2D Square! ${friendName} gives you a huge hug. What is your next step?`,
      milestone: 'Graduated High School! 🎓',
      scrapbook: 'High School Graduation Day 🎓',
      choices: [
        { label: 'Enroll in University to study your passion 🏛️', effects: { smarts: 10, happiness: 8, setLifePath: 'college' }, log: 'You tossed your graduation cap high and headed off to the University Hub!', meetNewFriend: true },
        { label: 'Start an Apprenticeship & Career right away 💼', effects: { money: 200, smarts: 6, happiness: 8, setLifePath: 'career-early' }, log: 'You jumped straight into starting your career and earned a $200 signing bonus!' },
        { label: 'Volunteer & explore with friends 🌍', effects: { kindness: 12, happiness: 12, health: 8, allFriendsBoost: 15, setLifePath: 'college' }, log: 'You spent an unforgettable season volunteering with friends!' }
      ]
    },
    21: {
      title: "Age 21: Moving Into Your Best Friend's Home! 🌟🏡",
      text: `You turned 21! Just as you promised while growing up, your best friend ${friendName} waves the keys to the brand-new Best Friend's Home in the bottom-right corner of the 2D Town Square! You are officially moving in together!`,
      milestone: "Moved Into Best Friend's Home (Age 21)! 🌟",
      scrapbook: "Moved Into Best Friend's Home at 21 🌟",
      choices: [
        {
          label: '🛋️ Decorate the living room with fairy lights & board games!',
          effects: { happiness: 15, kindness: 10, friendBoost: 25, setLivingWith: 'best-friend' },
          log: `You moved into ${friendName}'s home at age 21! You decorated the living room together and stayed up laughing!`
        },
        {
          label: '🍕 Throw a "Bestie Housewarming Pizza Party" for all your friends!',
          effects: { happiness: 16, kindness: 12, allFriendsBoost: 18, friendBoost: 20, setLivingWith: 'best-friend' },
          log: `You moved into ${friendName}'s home at age 21 and hosted the best housewarming pizza party ever!`
        },
        {
          label: '🪴 Plant a backyard garden & build a hobby room together!',
          effects: { happiness: 14, health: 10, smarts: 8, friendBoost: 22, setLivingWith: 'best-friend' },
          log: `You moved into ${friendName}'s home at age 21 and set up an awesome backyard garden and hobby studio!`
        }
      ]
    },
    22: {
      title: 'Stepping Into Adulthood & Career Launch! 🌟',
      text: 'At 22, college days wrap up and your adult journey is in full swing! You can choose or switch your dream career in the Career tab anytime.',
      milestone: 'Launched Adult Career 🌟',
      choices: [
        { label: 'Host a "First Real Paycheck" Taco Night for your childhood friends 🌮', effects: { kindness: 10, happiness: 12, money: 150, allFriendsBoost: 16 }, log: 'All your friends came over to celebrate entering adulthood together!', scrapbook: 'First Adult Dinner Party with Friends 🌮' },
        { label: 'Focus on a stellar first project at work (+$300) 🚀', effects: { money: 300, smarts: 8, happiness: 7 }, log: 'Your dedication at work impressed everyone and earned a $300 bonus!' },
        { label: 'Adopt a healthy daily routine: morning jogs & home cooking 🥗', effects: { health: 12, happiness: 9, skill: ['cooking', 8], money: 150 }, log: 'You built great adult habits in fitness and home cooking!' }
      ]
    },
    25: {
      title: 'The Quarter-Century Reunion Trip! ✈️',
      text: `You’re 25! Even though everyone has busy jobs now, ${friendName} suggests a reunion trip back to your favorite childhood spots and a mountain cabin.`,
      choices: [
        { label: 'Recreate your childhood photos together! 📸', effects: { happiness: 14, kindness: 10, money: -40, allFriendsBoost: 20 }, log: 'You recreated your elementary school photos side-by-side — everyone laughed until they cried!', scrapbook: 'Age 25 Childhood Photo Recreation 📸' },
        { label: 'Organize a charity fun-run in ${state.hometown.name} 🏃', effects: { kindness: 14, health: 10, happiness: 10, allFriendsBoost: 12 }, log: 'Your friend group raised funds for the local elementary school library!' },
        { label: 'Bring homemade pastries and play board games all weekend 🎲', effects: { happiness: 12, skill: ['cooking', 8], allFriendsBoost: 16 }, log: 'Nothing beats a cozy cabin weekend with the friends who know you best.' }
      ]
    },
    30: {
      title: 'Thriving at 30! Community Pillar 🏡',
      text: `Welcome to your 30s! People in ${state.hometown.name} look up to you, and your career and friendships are flourishing.`,
      milestone: 'Entered Your 30s in Style 🏡',
      choices: [
        { label: 'Mentor young students at your old school’s Career Day 🍎', effects: { kindness: 14, happiness: 10, smarts: 8 }, log: 'Speaking at your old school’s Career Day inspired a whole classroom of kids!' },
        { label: 'Lead a major creative breakthrough in your career (+$450) 🏆', effects: { money: 450, smarts: 10, happiness: 10 }, log: 'Your big project was a huge success, earning community praise and $450!' },
        { label: 'Throw a Backyard Garden Festival for friends & neighbors 🌻', effects: { happiness: 15, kindness: 12, allFriendsBoost: 18 }, log: 'Lanterns hung in the trees as lifelong friends and neighbors celebrated together!', scrapbook: '30th Birthday Garden Lantern Festival 🏮' }
      ]
    },
    40: {
      title: 'Fabulous 40: Mastering Your Craft 🌟',
      text: 'At 40, you have decades of wisdom, stories, and treasured friendships. You feel inspired to take on a meaningful passion project.',
      milestone: 'Reached Age 40 Milestone 🌟',
      choices: [
        { label: 'Co-create a community workshop with ${friendName} 🛠️', effects: { kindness: 14, happiness: 12, friendBoost: 20, money: 250 }, log: `You and ${friendName} launched a weekend workshop teaching kids and adults your favorite skills!` },
        { label: 'Write a book of stories & recipes from your life 📚', effects: { smarts: 12, happiness: 12, skill: ['story', 15], money: 350 }, log: 'Your heartwarming book became a local bestseller!', scrapbook: 'Published a Hometown Book 📖' },
        { label: 'Train for a scenic mountain trail marathon 🏔️', effects: { health: 15, happiness: 12, skill: ['athletics', 12] }, log: 'You crossed the finish line feeling healthier and stronger than ever at 40!' }
      ]
    },
    50: {
      title: 'The Golden Half-Century Celebration! 🥂',
      text: `50 years of sunshine, learning, and kindness! ${friendName} and all your friends surprise you at the Town Hall with a tribute slideshow of your life.`,
      milestone: 'Celebrated 50th Birthday Jubilee 🎉',
      scrapbook: '50th Birthday Surprise Tribute 🎉',
      choices: [
        { label: 'Give a heartfelt speech thanking every friend by name 💛', effects: { kindness: 15, happiness: 15, allFriendsBoost: 20 }, log: 'There wasn’t a dry eye in the hall as you celebrated 40+ years of friendship!' },
        { label: 'Donate a new playground & telescope to the town park 🔭', effects: { kindness: 18, happiness: 15, money: -200 }, log: 'The town named the new stargazing pavilion in honor of you and your friends!' },
        { label: 'Dance the night away to your favorite throwback tunes 🎶', effects: { health: 10, happiness: 16, allFriendsBoost: 15 }, log: 'You showed everyone you still have the best dance moves in town!' }
      ]
    },
    65: {
      title: 'Happy Retirement & The Golden Years! 🌅',
      text: 'At 65, you celebrate a wonderful career and step into your Golden Years with a pension, plenty of free time, and lifelong pals right down the street!',
      milestone: 'Retired into the Golden Years 🌅',
      scrapbook: 'Golden Retirement Party 🌅',
      choices: [
        { label: 'Start a morning Tea & Board Game Club with ${friendName} 🍵', effects: { happiness: 15, kindness: 12, friendBoost: 20, money: 300 }, log: `Every Tuesday morning, you and ${friendName} play games and swap stories on the porch.` },
        { label: 'Travel by scenic train across the country with friends 🚂', effects: { happiness: 18, health: 10, allFriendsBoost: 18, money: 200 }, log: 'You took the Great Scenic Railway adventure with your lifelong friends!' },
        { label: 'Become the beloved volunteer Storyteller at the Library 📚', effects: { kindness: 16, smarts: 10, happiness: 14, money: 250 }, log: 'Every week, kids gather around your rocking chair to hear your stories!' }
      ]
    }
  };

  if (specificEvents[age]) {
    const ev = JSON.parse(JSON.stringify(specificEvents[age]));
    ev.text = ev.text.replace(/\$\{friendName\}/g, friendName).replace(/\$\{state\.hometown\.name\}/g, state.hometown.name);
    ev.choices.forEach(c => {
      c.label = c.label.replace(/\$\{friendName\}/g, friendName).replace(/\$\{state\.hometown\.name\}/g, state.hometown.name);
      c.log = c.log.replace(/\$\{friendName\}/g, friendName).replace(/\$\{state\.hometown\.name\}/g, state.hometown.name);
    });
    return ev;
  }

  // Dynamic Stage Pool Events for ages without a fixed milestone
  const stagePools = {
    child: [
      {
        title: 'Recess Kickball Championship ⚽',
        text: `During recess, the two teams are tied! ${friendName} passes the ball to you while a kid who usually sits on the sidelines watches eagerly.`,
        choices: [
          { label: 'Pass the ball so the new kid scores the winning run! 🤝', effects: { kindness: 10, happiness: 8, friendBoost: 10 }, log: 'You passed the ball so a classmate could score their first ever winning run!' },
          { label: 'Kick a sky-high home run over the playground fence! 🚀', effects: { health: 8, happiness: 8, skill: ['athletics', 8] }, log: 'Your kick soared higher than the swingset for a playground home run!' },
          { label: 'Invent a new cooperative game where everyone plays together 🎈', effects: { smarts: 7, kindness: 8, happiness: 7 }, log: 'Your new recess game became a playground favorite!' }
        ]
      },
      {
        title: 'The Town Library Summer Reading Challenge 📖',
        text: `The library in ${state.hometown.name} is giving out scratch-and-sniff bookmarks and pizza vouchers for reading books this summer!`,
        choices: [
          { label: 'Read adventure & mystery books with ${friendName} 🔍', effects: { smarts: 9, happiness: 7, skill: ['story', 8], friendBoost: 12 }, log: `You and ${friendName} finished 10 books and won the Gold Reader Prize!` },
          { label: 'Check out illustrated encyclopedias about space & dinosaurs 🦕', effects: { smarts: 10, skill: ['science', 8], happiness: 5 }, log: 'You became the classroom expert on dinosaurs and planets!' },
          { label: 'Draw bookmarks for the younger kids at the library 🎨', effects: { kindness: 9, happiness: 7, skill: ['art', 8] }, log: 'The librarian laminated your handmade bookmarks for the whole town!' }
        ]
      },
      {
        title: 'Snow Day / Sunny Picnic Surprise! ☀️',
        text: `School lets out early for a special Town Appreciation Day! ${friendName} waves from across the street asking what you want to do.`,
        choices: [
          { label: 'Bake warm chocolate chip cookies together 🍪', effects: { happiness: 8, kindness: 7, skill: ['cooking', 8], friendBoost: 14 }, log: `You and ${friendName} baked a batch of warm cookies and shared them with neighbors!` },
          { label: 'Build an epic obstacle course in the park 🏃', effects: { health: 9, happiness: 8, skill: ['athletics', 8], friendBoost: 12 }, log: `You and ${friendName} timed each other on your park obstacle course!` },
          { label: 'Create a puppet show for the neighborhood 🎭', effects: { happiness: 9, skill: ['story', 7], skill2: ['art', 6], friendBoost: 12 }, log: 'Your sock-puppet show had the whole block clapping!' }
        ]
      }
    ],
    preteen: [
      {
        title: 'The Middle School Pen-Pal & Friendship Fair ✉️',
        text: `Your class is organizing a Friendship & Culture Fair. ${friendName} is having trouble finishing their booth display in time!`,
        choices: [
          { label: 'Stay after school to help ${friendName} paint & finish it 🎨', effects: { kindness: 11, happiness: 8, skill: ['art', 6], friendBoost: 18 }, log: `You stayed after school to help ${friendName}, making your friendship stronger than ever!` },
          { label: 'Bring homemade snacks to keep the whole class energized 🥨', effects: { kindness: 9, happiness: 8, skill: ['cooking', 8], allFriendsBoost: 10 }, log: 'Your snack tray saved the day during fair setup!' },
          { label: 'Design a cool interactive quiz board for both booths 💡', effects: { smarts: 10, skill: ['science', 8], friendBoost: 14 }, log: 'Your interactive light-up quiz board drew a huge crowd!' }
        ]
      },
      {
        title: 'Saturday Bike Trail Mystery 🚲',
        text: `While riding bikes with ${friendName} along the creek trail, you spot a friendly lost puppy wearing a collar tag from the next street over.`,
        choices: [
          { label: 'Gently walk the puppy home to its grateful family 🐾', effects: { kindness: 12, happiness: 10, money: 15, friendBoost: 15 }, log: 'The puppy’s family was overjoyed and gave you and ${friendName} $15 for ice cream!' },
          { label: 'Share water and make a cozy rest spot while calling the tag 📞', effects: { smarts: 8, kindness: 10, happiness: 8, friendBoost: 12 }, log: 'You kept the pup calm and safe until its owner arrived with big smiles!' },
          { label: 'Draw "Found Puppy" flyers and reunite them in record time 🎨', effects: { kindness: 9, skill: ['art', 7], happiness: 9, friendBoost: 12 }, log: 'Your quick thinking reunited the puppy with its family before sunset!' }
        ]
      }
    ],
    teen: [
      {
        title: 'High School Autumn Festival & Spirit Week 🍁',
        text: `It’s Spirit Week at High School! Your class is building a float and running booths for the town festival with ${friendName}.`,
        choices: [
          { label: 'Run the Friendship Photo Booth & Polaroid Wall 📸', effects: { happiness: 10, kindness: 9, skill: ['art', 7], allFriendsBoost: 14 }, log: 'Everyone took Polaroids at your booth—you kept the best ones in your locker!' },
          { label: 'Engineer the moving gears & lights on the class float ⚙️', effects: { smarts: 10, skill: ['science', 9], happiness: 8, friendBoost: 12 }, log: 'Your high school float won First Prize for engineering!' },
          { label: 'Bake 100 apple cider donuts for the charity bake sale 🍩', effects: { kindness: 11, skill: ['cooking', 10], money: 30, happiness: 9 }, log: 'Your apple cider donuts sold out in 20 minutes!' }
        ]
      },
      {
        title: 'Final Exams & Late-Afternoon Study Group 📚',
        text: `Big High School exams are coming up next week! ${friendName} looks stressed about passing their toughest subject.`,
        choices: [
          { label: 'Host a cozy flashcard & smoothie study session for friends 🍓', effects: { smarts: 10, kindness: 10, happiness: 7, allFriendsBoost: 15 }, log: 'Thanks to your study group, you and all your friends passed with flying colors!' },
          { label: 'Create funny memory songs & doodles to explain the lessons 🎶', effects: { smarts: 9, happiness: 9, skill: ['story', 8], friendBoost: 16 }, log: `${friendName} remembered every single answer thanks to your funny memory songs!` },
          { label: 'Study hard at the library and go for a refreshing run after 🏃', effects: { smarts: 12, health: 8, happiness: 6 }, log: 'You balanced top-notch study habits with outdoor exercise and aced the exam!' }
        ]
      }
    ],
    'young-adult': [
      {
        title: 'Campus & Young Adult Adventures ☕',
        text: `Between classes, projects, and growing into adulthood, you and ${friendName} meet up at your favorite cozy café on a crisp afternoon.`,
        choices: [
          { label: 'Brainstorm big life dreams & promise to support each other 🌟', effects: { happiness: 11, kindness: 9, smarts: 6, friendBoost: 18 }, log: `You and ${friendName} mapped out your dreams on café napkins—a memory for a lifetime.` },
          { label: 'Collaborate on a weekend creative/tech hackathon project 💻', effects: { smarts: 11, money: 120, skill: ['science', 8], friendBoost: 14 }, log: 'Your weekend project won a $120 community innovation prize!' },
          { label: 'Organize an intramural frisbee & picnic afternoon in the park 🥏', effects: { health: 10, happiness: 10, allFriendsBoost: 14 }, log: 'Your sunny park picnic brought old and new friends together!' }
        ]
      }
    ],
    adult: [
      {
        title: 'Sunny Saturday in the Neighborhood 🌻',
        text: `Life is humming along nicely! Your career brings new experiences, and ${friendName} calls to see what you’re up to this weekend.`,
        choices: [
          { label: 'Host a Board Game & Homemade Lasagna Night 🎲', effects: { happiness: 11, kindness: 9, skill: ['cooking', 8], allFriendsBoost: 15 }, log: 'Laughter echoed from your dining table all evening long!' },
          { label: 'Go on a scenic weekend hike & nature photography trip 🌲', effects: { health: 11, happiness: 10, skill: ['athletics', 7], friendBoost: 16 }, log: `You and ${friendName} hiked to the lookout point and felt totally refreshed.` },
          { label: 'Take on a rewarding bonus project & donate part to charity 💼', effects: { money: 280, kindness: 8, smarts: 7, happiness: 6 }, log: 'You excelled at work, earned $280, and supported a great local cause!' }
        ]
      },
      {
        title: 'Hometown Festival & Old Friends 🎡',
        text: `${state.hometown.name} is holding its annual Founders’ Day Festival! Banners line Main Street and music floats through the air.`,
        choices: [
          { label: 'Enter your signature dish in the Town Bake-Off 🥧', effects: { happiness: 10, skill: ['cooking', 10], money: 100, allFriendsBoost: 10 }, log: 'Your entry won a prize ribbon and $100 at the Founders’ Day Bake-Off!' },
          { label: 'Spend the whole day catching up with ${friendName} on the Ferris wheel 🎡', effects: { happiness: 12, kindness: 9, friendBoost: 18 }, log: `Looking out over ${state.hometown.name} with ${friendName}, you marveled at how far you’ve both come.` },
          { label: 'Run the Art & Science discovery booth for neighborhood kids 🎨', effects: { kindness: 12, smarts: 8, happiness: 10 }, log: 'You sparked curiosity in dozens of young kids at the festival!' }
        ]
      }
    ],
    senior: [
      {
        title: 'Golden Afternoon in the Sunlit Garden 🌺',
        text: `In your golden years, every season feels precious. ${friendName} stops by with a basket of fresh peaches and a deck of cards.`,
        choices: [
          { label: 'Flip through your lifelong photo scrapbooks & laugh together 📸', effects: { happiness: 14, kindness: 10, allFriendsBoost: 18 }, log: 'Reminiscing over decades of adventures filled your heart with warmth.' },
          { label: 'Teach neighborhood kids how to garden, paint, & bake 🌱', effects: { kindness: 14, health: 8, happiness: 12, smarts: 6 }, log: 'The neighborhood kids adore learning stories and skills from you!' },
          { label: 'Take a gentle sunset stroll by the water with friends 🌅', effects: { health: 10, happiness: 14, friendBoost: 16 }, log: 'A peaceful golden sunset walk with your dearest friends.' }
        ]
      }
    ]
  };

  const stageId = getLifeStageInfo(age).id;
  const pool = stagePools[stageId] || stagePools.adult;
  const template = pool[age % pool.length];
  const ev = JSON.parse(JSON.stringify(template));
  ev.text = ev.text.replace(/\$\{friendName\}/g, friendName).replace(/\$\{state\.hometown\.name\}/g, state.hometown.name);
  ev.choices.forEach(c => {
    c.label = c.label.replace(/\$\{friendName\}/g, friendName).replace(/\$\{state\.hometown\.name\}/g, state.hometown.name);
    c.log = c.log.replace(/\$\{friendName\}/g, friendName).replace(/\$\{state\.hometown\.name\}/g, state.hometown.name);
  });
  return ev;
}

function getTopFriend(state) {
  if (!state.friends || state.friends.length === 0) return null;
  return [...state.friends].sort((a, b) => b.bond - a.bond)[0];
}
