import heroSpiceFeastImg from '../assets/images/hero_spice_feast_1790602622238.jpg';
import aboutChefDiningImg from '../assets/images/about_chef_dining_1790602635192.jpg';
import dishRoyalBiryaniImg from '../assets/images/dish_royal_biryani_1790602650098.jpg';
import dishStartersMainImg from '../assets/images/dish_starters_main_1790602668410.jpg';
import dishDessertBeverageImg from '../assets/images/dish_dessert_beverage_1790602680952.jpg';

export type MenuCategory =
  | 'Starters'
  | 'Main Course'
  | 'Biryanis'
  | 'Chinese'
  | 'Desserts'
  | 'Beverages';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  imagePosition?: string;
  isVegetarian: boolean;
  isSignature?: boolean;
  spiceLevel: 'Mild' | 'Medium' | 'Spiced' | 'Fiery';
  prepTime: string;
  calories: string;
  pairingNote: string;
  ingredients: string[];
}

export interface SpecialOffer {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  originalPrice: number;
  offerPrice: number;
  savingsLabel: string;
  validityText: string;
  servesText: string;
  image: string;
  includedItems: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Signature Dishes' | 'Dining Room & Craft' | 'Desserts & Cocktails';
  caption: string;
  image: string;
  aspectClass: string;
  locationNote: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  date: string;
  rating: number;
  dishOrdered: string;
  review: string;
  verifiedDining: string;
}

export const IMAGES = {
  heroFeast: heroSpiceFeastImg,
  aboutChefDining: aboutChefDiningImg,
  royalBiryani: dishRoyalBiryaniImg,
  startersMain: dishStartersMainImg,
  dessertBeverage: dishDessertBeverageImg,
};

export const MENU_CATEGORIES: MenuCategory[] = [
  'Starters',
  'Main Course',
  'Biryanis',
  'Chinese',
  'Desserts',
  'Beverages',
];

export const MENU_ITEMS: MenuItem[] = [
  // STARTERS
  {
    id: 'starter-1',
    name: 'Charcoal Malai Paneer Tikka',
    category: 'Starters',
    price: 16.5,
    description:
      'Artisanal cottage cheese cubes marinated for 12 hours in hung curd, crushed white pepper, and green cardamom, blistered over tamarind charcoal.',
    image: dishStartersMainImg,
    imagePosition: 'object-left-top',
    isVegetarian: true,
    isSignature: true,
    spiceLevel: 'Mild',
    prepTime: '18 mins',
    calories: '390 kcal',
    pairingNote: 'Pairs with Smoked Cardamom Mango Lassi',
    ingredients: ['Organic Farm Paneer', 'Green Cardamom', 'Tamarind Wood Smoke', 'Mint Chutney'],
  },
  {
    id: 'starter-2',
    name: 'Awadhi Gilafi Lamb Seekh',
    category: 'Starters',
    price: 19.0,
    description:
      'Hand-minced pasture-raised lamb infused with roasted cumin, bone marrow butter, and ginger, crusted with bell peppers and charred on iron skewers.',
    image: dishStartersMainImg,
    imagePosition: 'object-center',
    isVegetarian: false,
    isSignature: true,
    spiceLevel: 'Medium',
    prepTime: '20 mins',
    calories: '460 kcal',
    pairingNote: 'Pairs with Spiced Pomegranate Elixir',
    ingredients: ['Minced Lamb Shoulder', 'Roasted Cumin', 'Bell Pepper Crust', 'Pickled Shallots'],
  },
  {
    id: 'starter-3',
    name: 'Crispy Tellicherry Pepper Prawns',
    category: 'Starters',
    price: 21.0,
    description:
      'Wild-caught tiger prawns flash-seared with freshly cracked Malabar black peppercorns, crisp curry leaves, and caramelized shallots.',
    image: heroSpiceFeastImg,
    imagePosition: 'object-right-bottom',
    isVegetarian: false,
    spiceLevel: 'Spiced',
    prepTime: '15 mins',
    calories: '340 kcal',
    pairingNote: 'Pairs with Darjeeling First Flush Iced Tea',
    ingredients: ['Tiger Prawns', 'Malabar Black Pepper', 'Curry Leaves', 'Cold-Pressed Coconut Oil'],
  },
  {
    id: 'starter-4',
    name: 'Dahi Ke Kebab with Fig Compote',
    category: 'Starters',
    price: 15.0,
    description:
      'Velvety spiced hung-yogurt medallions pan-seared in clarified ghee to a golden crust, centered with black mission fig and toasted pistachio.',
    image: dishStartersMainImg,
    imagePosition: 'object-left-bottom',
    isVegetarian: true,
    spiceLevel: 'Mild',
    prepTime: '15 mins',
    calories: '360 kcal',
    pairingNote: 'Pairs with Rosewater Pistachio Thandai',
    ingredients: ['Strained Greek Yogurt', 'Black Mission Fig', 'Roasted Gram Flour', 'Green Chili'],
  },

  // MAIN COURSE
  {
    id: 'main-1',
    name: 'Old Delhi Smoked Butter Chicken',
    category: 'Main Course',
    price: 24.0,
    description:
      'Tandoor-charred heritage chicken simmered in a velvety heirloom tomato and sun-dried fenugreek glaze, finished with cultured makhan and clove smoke.',
    image: dishStartersMainImg,
    imagePosition: 'object-right-top',
    isVegetarian: false,
    isSignature: true,
    spiceLevel: 'Medium',
    prepTime: '22 mins',
    calories: '620 kcal',
    pairingNote: 'Served best with Truffle & Black Garlic Naan',
    ingredients: ['Tandoori Chicken Thigh', 'Vine-Ripened Tomatoes', 'Kasuri Methi', 'Cultured Butter'],
  },
  {
    id: 'main-2',
    name: 'Kashmiri Rogan Josh',
    category: 'Main Course',
    price: 27.5,
    description:
      'Slow-braised lamb shanks cooked in a copper lagan with Kashmiri ratan jot root, fennel seed powder, dry ginger, and saffron-scented yogurt gravy.',
    image: heroSpiceFeastImg,
    imagePosition: 'object-center',
    isVegetarian: false,
    isSignature: true,
    spiceLevel: 'Spiced',
    prepTime: '25 mins',
    calories: '670 kcal',
    pairingNote: 'Pairs with Saffron Warqi Paratha',
    ingredients: ['Braised Lamb Shank', 'Kashmiri Chili', 'Fennel Powder', 'Pampore Saffron'],
  },
  {
    id: 'main-3',
    name: '24-Hour Dal Spice Garden',
    category: 'Main Course',
    price: 19.5,
    description:
      'Whole black urad lentils simmered overnight over dying embers of charcoal with ginger juliennes, plum tomato purée, and hand-churned white butter.',
    image: heroSpiceFeastImg,
    imagePosition: 'object-left-center',
    isVegetarian: true,
    isSignature: true,
    spiceLevel: 'Mild',
    prepTime: '15 mins',
    calories: '540 kcal',
    pairingNote: 'Essential accompaniment to any Biryani or Tandoor dish',
    ingredients: ['Whole Black Lentils', 'Plum Tomatoes', 'Fresh Ginger', 'Charcoal Smoke'],
  },
  {
    id: 'main-4',
    name: 'Subz Nizami Handi & Truffle Kulcha',
    category: 'Main Course',
    price: 22.0,
    description:
      'Seasonal baby vegetables, lotus root, and charred baby corn braised in a roasted cashew, poppy seed, and saffron korma accompanied by flaky kulcha.',
    image: dishStartersMainImg,
    imagePosition: 'object-bottom',
    isVegetarian: true,
    spiceLevel: 'Medium',
    prepTime: '20 mins',
    calories: '510 kcal',
    pairingNote: 'Pairs with Smoked Cardamom Mango Lassi',
    ingredients: ['Crisp Lotus Stem', 'Roasted Cashew Paste', 'Saffron Threads', 'Artisanal Kulcha'],
  },

  // BIRYANIS
  {
    id: 'biryani-1',
    name: 'Royal Hyderabadi Zafrani Dum Biryani',
    category: 'Biryanis',
    price: 26.0,
    description:
      'Aged extra-long Dawat basmati rice and Kachri-marinated goat layered in a pastry-sealed copper handi with Pampore saffron milk and crispy birista.',
    image: dishRoyalBiryaniImg,
    imagePosition: 'object-center',
    isVegetarian: false,
    isSignature: true,
    spiceLevel: 'Spiced',
    prepTime: '25 mins',
    calories: '740 kcal',
    pairingNote: 'Served with Mirchi Ka Salan & Burhani Garlic Raita',
    ingredients: ['Aged Basmati Rice', 'Spiced Goat Cuts', 'Pampore Saffron', 'Caramelized Onions'],
  },
  {
    id: 'biryani-2',
    name: 'Lucknowi Murgh Awadhi Pukht Biryani',
    category: 'Biryanis',
    price: 24.0,
    description:
      'Delicate yakhni-poached free-range chicken layered with rosewater-kissed basmati rice, star anise, mace, and silver-leafed roasted almonds.',
    image: dishRoyalBiryaniImg,
    imagePosition: 'object-left-top',
    isVegetarian: false,
    spiceLevel: 'Medium',
    prepTime: '22 mins',
    calories: '680 kcal',
    pairingNote: 'Served with Mint-Pomegranate Raita',
    ingredients: ['Free-Range Chicken', 'Kewra & Rosewater', 'Mace & Nutmeg', 'Toasted Almonds'],
  },
  {
    id: 'biryani-3',
    name: 'Subz Guchhi & Morel Mushroom Dum Biryani',
    category: 'Biryanis',
    price: 25.0,
    description:
      'Wild Himalayan morel mushrooms stuffed with spiced khoya and herbs, slow-steamed under flaky puff pastry with fragrant basmati and mint leaves.',
    image: dishRoyalBiryaniImg,
    imagePosition: 'object-right-bottom',
    isVegetarian: true,
    isSignature: true,
    spiceLevel: 'Medium',
    prepTime: '24 mins',
    calories: '610 kcal',
    pairingNote: 'Served with Roasted Cumin Raita',
    ingredients: ['Himalayan Morel Mushrooms', 'Spiced Khoya', 'Fresh Mint', 'Saffron Basmati'],
  },
  {
    id: 'biryani-4',
    name: 'Coastal Malabar Prawn Moilee Biryani',
    category: 'Biryanis',
    price: 28.0,
    description:
      'Short-grain Kaima rice layered with tiger prawns simmered in coconut milk, curry leaves, green chilies, and toasted cashews with golden raisins.',
    image: heroSpiceFeastImg,
    imagePosition: 'object-right-top',
    isVegetarian: false,
    spiceLevel: 'Spiced',
    prepTime: '25 mins',
    calories: '690 kcal',
    pairingNote: 'Pairs with Spiced Kokum & Curry Leaf Fizz',
    ingredients: ['Kaima Jeerakasala Rice', 'Wild Tiger Prawns', 'Coconut Milk', 'Malabar Spices'],
  },

  // CHINESE (INDO-CHINESE WOK SPECIALTIES)
  {
    id: 'chinese-1',
    name: 'Wok-Seared Hakka Chilli Paneer',
    category: 'Chinese',
    price: 18.5,
    description:
      'Crisp-battered organic cottage cheese tossed at high flame in a cast-iron wok with smoky Sichuan peppercorns, dark soy, bird’s-eye chili, and scallions.',
    image: dishStartersMainImg,
    imagePosition: 'object-center',
    isVegetarian: true,
    isSignature: true,
    spiceLevel: 'Spiced',
    prepTime: '16 mins',
    calories: '450 kcal',
    pairingNote: 'Pairs with Burnt Garlic Hakka Noodles',
    ingredients: ['Crisp Paneer', 'Sichuan Peppercorn', 'Aged Dark Soy', 'Spring Onion Greens'],
  },
  {
    id: 'chinese-2',
    name: 'Tangra-Style Crispy Honey Chilli Lotus Stem',
    category: 'Chinese',
    price: 17.0,
    description:
      'Thinly sliced lotus root wok-glazed with wildflower honey, toasted white sesame seeds, crushed red chilies, and rice vinegar.',
    image: dishStartersMainImg,
    imagePosition: 'object-left-center',
    isVegetarian: true,
    spiceLevel: 'Medium',
    prepTime: '14 mins',
    calories: '380 kcal',
    pairingNote: 'Pairs with Spiced Pomegranate Elixir',
    ingredients: ['Crisp Lotus Root', 'Wildflower Honey', 'Toasted Sesame', ' Kashmiri Chilli Flakes'],
  },
  {
    id: 'chinese-3',
    name: 'Smoky Burnt Garlic & Schezwan Hakka Noodles',
    category: 'Chinese',
    price: 18.0,
    description:
      'Hand-pulled wheat noodles wok-tossed over roaring flame with julienned snow peas, shiitake mushrooms, golden fried garlic chips, and house chili oil.',
    image: heroSpiceFeastImg,
    imagePosition: 'object-bottom',
    isVegetarian: true,
    spiceLevel: 'Spiced',
    prepTime: '15 mins',
    calories: '520 kcal',
    pairingNote: 'Ideal alongside Wok-Seared Chilli Paneer or Drums of Heaven',
    ingredients: ['Artisanal Wheat Noodles', 'Shiitake Mushrooms', 'Golden Garlic', 'House Schezwan Oil'],
  },
  {
    id: 'chinese-4',
    name: 'Calcutta Chinatown Five-Spice Chicken Manchurian',
    category: 'Chinese',
    price: 21.5,
    description:
      'Crisp free-range chicken morsels simmered in a glossy ginger-garlic coriander stem reduction accented with five-spice and cracked black pepper.',
    image: dishStartersMainImg,
    imagePosition: 'object-right-bottom',
    isVegetarian: false,
    isSignature: true,
    spiceLevel: 'Fiery',
    prepTime: '18 mins',
    calories: '560 kcal',
    pairingNote: 'Pairs with Jasmine Egg Fried Rice',
    ingredients: ['Free-Range Chicken', 'Coriander Stems', 'Fresh Ginger', 'Star Anise Soy Glaze'],
  },

  // DESSERTS
  {
    id: 'dessert-1',
    name: 'Saffron & Iranian Pistachio Rasmalai',
    category: 'Desserts',
    price: 13.5,
    description:
      'Poached artisanal chhena dumplings steeped in chilled saffron-cardamom reduced milk, garnished with slivered Iranian pistachios and Damascus rose petals.',
    image: dishDessertBeverageImg,
    imagePosition: 'object-left-center',
    isVegetarian: true,
    isSignature: true,
    spiceLevel: 'Mild',
    prepTime: '10 mins',
    calories: '340 kcal',
    pairingNote: 'Pairs with Artisanal Masala Chai',
    ingredients: ['Artisanal Chhena', 'Saffron Rabri', 'Iranian Pistachios', 'Edible Silver Leaf'],
  },
  {
    id: 'dessert-2',
    name: 'Warm Cardamom Gulab Jamun Tartlet',
    category: 'Desserts',
    price: 14.5,
    description:
      'Caramelized khoya gulab jamun baked inside a buttery almond frangipane tart shell, served warm with Madagascar vanilla bean kulfi.',
    image: dishDessertBeverageImg,
    imagePosition: 'object-center',
    isVegetarian: true,
    isSignature: true,
    spiceLevel: 'Mild',
    prepTime: '12 mins',
    calories: '480 kcal',
    pairingNote: 'Pairs with Filter Kaapi Espresso',
    ingredients: ['Khoya Dumpling', 'Almond Tart Shell', 'Cardamom Rose Syrup', 'Vanilla Bean Kulfi'],
  },
  {
    id: 'dessert-3',
    name: 'Dark Chocolate & Jaggery Shahi Tukda',
    category: 'Desserts',
    price: 15.0,
    description:
      'Ghee-toasted brioche soaked in saffron syrup, layered with 70% Malabar single-origin dark chocolate ganache and salted pistachio praline.',
    image: dishDessertBeverageImg,
    imagePosition: 'object-right-bottom',
    isVegetarian: true,
    spiceLevel: 'Mild',
    prepTime: '12 mins',
    calories: '490 kcal',
    pairingNote: 'Pairs with Smoked Cardamom Mango Lassi',
    ingredients: ['Saffron Brioche', '70% Malabar Chocolate', 'Organic Jaggery', 'Pistachio Praline'],
  },

  // BEVERAGES
  {
    id: 'beverage-1',
    name: 'Smoked Cardamom & Alphonso Mango Lassi',
    category: 'Beverages',
    price: 9.5,
    description:
      'Ratnagiri Alphonso mango purée churned with house-cultured probiotic yogurt, green cardamom pods, and topped with toasted almond slivers.',
    image: dishDessertBeverageImg,
    imagePosition: 'object-right-top',
    isVegetarian: true,
    isSignature: true,
    spiceLevel: 'Mild',
    prepTime: '6 mins',
    calories: '260 kcal',
    pairingNote: 'Balances fiery Biryanis and Tandoor platters',
    ingredients: ['Ratnagiri Alphonso Mango', 'Cultured Yogurt', 'Green Cardamom', 'Saffron Strands'],
  },
  {
    id: 'beverage-2',
    name: 'Spiced Pomegranate & Star Anise Elixir',
    category: 'Beverages',
    price: 11.0,
    description:
      'Cold-pressed ruby pomegranate juice infused with roasted star anise, Himalayan black salt, fresh mint leaves, and ginger beer fizz.',
    image: dishDessertBeverageImg,
    imagePosition: 'object-top',
    isVegetarian: true,
    spiceLevel: 'Mild',
    prepTime: '5 mins',
    calories: '140 kcal',
    pairingNote: 'Refreshing palate cleanser between courses',
    ingredients: ['Ruby Pomegranate', 'Star Anise', 'Himalayan Black Salt', 'Ginger Botanical Fizz'],
  },
  {
    id: 'beverage-3',
    name: 'Royal Rosewater & Almond Thandai',
    category: 'Beverages',
    price: 10.5,
    description:
      'Traditional chilled festival beverage crafted with stone-ground almonds, melon seeds, black pepper, fennel, and Kannauj rosewater.',
    image: dishDessertBeverageImg,
    imagePosition: 'object-bottom',
    isVegetarian: true,
    spiceLevel: 'Mild',
    prepTime: '7 mins',
    calories: '280 kcal',
    pairingNote: 'Pairs wonderfully with Charcoal Seekh & Kebabs',
    ingredients: ['Blanched Almonds', 'Fennel & Poppy Seeds', 'Kannauj Rosewater', 'Saffron Milk'],
  },
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'offer-nawabi-feast',
    kicker: 'Today’s Chef Table Highlight',
    title: 'The Royal Nawabi Dum Biryani Feast for Two',
    subtitle: 'Complete 4-course sharing experience sealed in copper',
    description:
      'Celebrate the art of slow-fire cooking with our signature Hyderabadi or Subz Morel Dum Biryani, paired with two charcoal starters, 24-Hour Dal Spice Garden, artisanal truffle naan, and Saffron Rasmalai.',
    originalPrice: 82.0,
    offerPrice: 64.0,
    savingsLabel: 'Save $18.00',
    validityText: 'Available Daily · 5:30 PM – 10:30 PM · Dine-in & Takeaway',
    servesText: 'Serves 2 Guests Generously',
    image: dishRoyalBiryaniImg,
    includedItems: [
      'Choice of Charcoal Paneer Tikka or Lamb Seekh Kebab',
      'Full Copper Handi of Zafrani or Morel Dum Biryani',
      '24-Hour Dal Spice Garden & Truffle Garlic Naan Basket',
      'Two Portions of Saffron Pistachio Rasmalai',
    ],
  },
  {
    id: 'offer-festival-thali',
    kicker: 'Seasonal Harvest & Festival Special',
    title: 'Grand Spice Garden Tasting Platter',
    subtitle: 'Seven heirloom regional delicacies with craft pairings',
    description:
      'Designed by Executive Chef Aarav Mehta to showcase our single-origin spice harvest: includes Old Delhi Butter Chicken, Kashmiri Rogan Josh, Wok Chilli Paneer, Saffron Pulao, assorted tandoor breads, and two Mango Lassis.',
    originalPrice: 110.0,
    offerPrice: 86.0,
    savingsLabel: 'Save $24.00',
    validityText: 'Festival Edition · Friday to Sunday All Day',
    servesText: 'Serves 2–3 Guests',
    image: heroSpiceFeastImg,
    includedItems: [
      'Trio of Tandoor & Indo-Chinese Wok Appetizers',
      'Two Signature Curries + 24-Hour Black Lentil Dal',
      'Zafrani Pulao, Warqi Paratha & Garlic Naan',
      'Two Smoked Cardamom Mango Lassis + Warm Gulab Jamun Tart',
    ],
  },
  {
    id: 'offer-wok-tandoor',
    kicker: 'Weekday Evening Pairing',
    title: 'Calcutta Tangra Wok & Craft Elixir Duo',
    subtitle: 'High-flame Indo-Chinese favorites with botanical coolers',
    description:
      'Experience the vibrant street-to-table heritage of Old Calcutta Chinatown: choose any two wok-tossed starters, one signature Hakka noodle or fried rice bowl, and two Spiced Pomegranate Elixirs.',
    originalPrice: 58.0,
    offerPrice: 45.0,
    savingsLabel: 'Save $13.00',
    validityText: 'Monday – Thursday · 4:00 PM – 9:00 PM',
    servesText: 'Serves 2 Guests',
    image: dishStartersMainImg,
    includedItems: [
      'Wok-Seared Hakka Chilli Paneer & Honey Chilli Lotus Stem',
      'Smoky Burnt Garlic & Schezwan Hakka Noodles',
      'Two Spiced Pomegranate & Star Anise Elixirs',
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Grand Spice Table',
    category: 'Signature Dishes',
    caption: 'Copper-vessel Dum Biryanis, slow-simmered curries, and blistered tandoori breads served fresh from the hearth.',
    image: heroSpiceFeastImg,
    aspectClass: 'md:col-span-2',
    locationNote: 'Main Dining Room · Evening Service',
  },
  {
    id: 'gal-2',
    title: 'Teakwood & Brass Dining Sanctuary',
    category: 'Dining Room & Craft',
    caption: 'Hand-carved teak screens, warm brass pendant illumination, and our open kitchen pass.',
    image: aboutChefDiningImg,
    aspectClass: 'md:col-span-1',
    locationNote: 'Architectural Interior · Chef’s Pass',
  },
  {
    id: 'gal-3',
    title: 'Hyderabadi Zafrani Dum Biryani',
    category: 'Signature Dishes',
    caption: 'Sealed with golden pastry dough to trap the aroma of Pampore saffron, mint, and aged basmati.',
    image: dishRoyalBiryaniImg,
    aspectClass: 'md:col-span-1',
    locationNote: 'Heirloom Copper Handi · 45-Min Slow Dum',
  },
  {
    id: 'gal-4',
    title: 'Charcoal Tandoor & Wok Mastery',
    category: 'Signature Dishes',
    caption: 'Smoky Seekh Kebabs, Old Delhi Butter Chicken, and Tangra-style Chilli Paneer plated on artisanal stoneware.',
    image: dishStartersMainImg,
    aspectClass: 'md:col-span-1',
    locationNote: 'Tamarind Wood Fired Tandoor',
  },
  {
    id: 'gal-5',
    title: 'Artisanal Mithai & Botanical Elixirs',
    category: 'Desserts & Cocktails',
    caption: 'Saffron Pistachio Rasmalai with edible silver leaf alongside Smoked Cardamom Mango Lassi.',
    image: dishDessertBeverageImg,
    aspectClass: 'md:col-span-1',
    locationNote: 'Pastry & Elixir Bar',
  },
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Dr. Ananya Deshmukh',
    role: 'Culinary Historian & Food Columnist',
    date: 'September 2026',
    rating: 5,
    dishOrdered: 'Royal Hyderabadi Zafrani Dum Biryani',
    review:
      'Opening the pastry crust on the Zafrani Dum Biryani at Spice Garden transported me straight to the royal kitchens of Hyderabad. Every grain of basmati was separate, fragrant with real Pampore saffron, and the 24-Hour Dal had a depth of smoke that only patient overnight cooking achieves.',
    verifiedDining: 'Dined at Chef’s Counter · Party of 4',
  },
  {
    id: 'rev-2',
    name: 'Marcus Vance',
    role: 'Principal Architect, Studio Vance',
    date: 'September 2026',
    rating: 5,
    dishOrdered: 'Grand Spice Garden Tasting Platter',
    review:
      'We hosted our anniversary dinner in the Teakwood Courtyard. Beyond the warm brass lighting and serene acoustics, the culinary balance between the smoky Charcoal Malai Paneer Tikka and the Tangra Honey Chilli Lotus Stem was extraordinary. Truly world-class hospitality.',
    verifiedDining: 'Dined in Teakwood Courtyard · Party of 6',
  },
  {
    id: 'rev-3',
    name: 'Priya & Rohan Kulkarni',
    role: 'Verified Table Reservation Guests',
    date: 'August 2026',
    rating: 5,
    dishOrdered: 'Old Delhi Smoked Butter Chicken & Rasmalai',
    review:
      'Most restaurants drown their curries in heavy cream, but Spice Garden lets whole roasted spices shine. The Old Delhi Butter Chicken paired with Truffle Naan and the Saffron Pistachio Rasmalai is the finest meal we have had all year.',
    verifiedDining: 'Dined in Main Hall · Party of 2',
  },
];

export const RESERVATION_TIME_SLOTS = [
  '12:00 PM',
  '12:30 PM',
  '1:15 PM',
  '2:00 PM',
  '6:00 PM',
  '6:30 PM',
  '7:15 PM',
  '7:45 PM',
  '8:30 PM',
  '9:15 PM',
];
