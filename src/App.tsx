import React, { useState, useMemo } from 'react';
import {
  Utensils,
  ShoppingBag,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  Plus,
  Minus,
  X,
  Check,
  Search,
  ChevronRight,
  Flame,
  Sparkles,
  Award,
  Users,
  ArrowRight,
  Menu as MenuIcon,
  Instagram,
  Facebook,
  Compass,
  Eye,
} from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  SPECIAL_OFFERS,
  GALLERY_ITEMS,
  INITIAL_REVIEWS,
  RESERVATION_TIME_SLOTS,
  IMAGES,
  MenuCategory,
  MenuItem,
  SpecialOffer,
  GalleryItem,
  CustomerReview,
} from './data/restaurantData';
import { ResilientImage } from './components/ResilientImage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  note?: string;
}

interface ReservationRecord {
  referenceCode: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  seating: string;
  specialRequests: string;
}

export default function App() {
  // Navigation & Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Menu Filtering State
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'All'>('All');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'signature'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDishModal, setActiveDishModal] = useState<MenuItem | null>(null);

  // Cart / Order Drawer State
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'biryani-1',
      name: 'Royal Hyderabadi Zafrani Dum Biryani',
      price: 26.0,
      quantity: 1,
      image: IMAGES.royalBiryani,
      note: 'Medium Spice · With Burhani Raita',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [checkoutCustomerName, setCheckoutCustomerName] = useState('');
  const [checkoutCustomerPhone, setCheckoutCustomerPhone] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [confirmedOrderCode, setConfirmedOrderCode] = useState<string | null>(null);
  const [orderFormError, setOrderFormError] = useState('');

  // Gallery Filter & Lightbox State
  const [galleryFilter, setGalleryFilter] = useState<
    'All' | 'Signature Dishes' | 'Dining Room & Craft' | 'Desserts & Cocktails'
  >('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Customer Reviews State
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRole, setNewReviewRole] = useState('');
  const [newReviewDish, setNewReviewDish] = useState('Royal Hyderabadi Zafrani Dum Biryani');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewSubmittedNotice, setReviewSubmittedNotice] = useState(false);

  // Reservation Form State
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState('2026-09-28');
  const [resTime, setResTime] = useState('7:15 PM');
  const [resGuests, setResGuests] = useState('4 Guests');
  const [resSeating, setResSeating] = useState('Main Dining Sanctuary');
  const [resRequests, setResRequests] = useState('');
  const [resError, setResError] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationRecord | null>(null);

  // Contact Inquiry & Map State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Private Dining & Events');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);
  const [activeTransitTab, setActiveTransitTab] = useState<'valet' | 'transit' | 'landmarks'>('valet');

  // Footer Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Recently Added Toast Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Filtered Menu Items
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesDietary =
        dietaryFilter === 'all' ||
        (dietaryFilter === 'veg' && item.isVegetarian) ||
        (dietaryFilter === 'signature' && item.isSignature);
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(query));
      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  // Filtered Gallery Items
  const filteredGalleryItems = useMemo(() => {
    if (galleryFilter === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((g) => g.category === galleryFilter);
  }, [galleryFilter]);

  // Cart Calculations
  const totalCartItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const addToCart = (item: { id: string; name: string; price: number; image: string; note?: string }) => {
    setConfirmedOrderCode(null);
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    triggerToast(`Added "${item.name}" to your order`);
  };

  const handleOrderSpecialOffer = (offer: SpecialOffer) => {
    addToCart({
      id: offer.id,
      name: offer.title,
      price: offer.offerPrice,
      image: offer.image,
      note: `${offer.servesText} · ${offer.savingsLabel}`,
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutCustomerName.trim() || !checkoutCustomerPhone.trim()) {
      setOrderFormError('Please enter your name and phone number to confirm your order.');
      return;
    }
    if (orderType === 'delivery' && !checkoutAddress.trim()) {
      setOrderFormError('Please provide a delivery address.');
      return;
    }
    setOrderFormError('');
    const code = `SG-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrderCode(code);
    triggerToast(`Order ${code} confirmed! Preparing in our kitchen.`);
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName.trim()) {
      setResError('Please enter your full name for the reservation.');
      return;
    }
    if (!resPhone.trim() || resPhone.trim().length < 7) {
      setResError('Please enter a valid contact phone number.');
      return;
    }
    if (!resDate) {
      setResError('Please select a dining date.');
      return;
    }
    setResError('');
    const code = `SG-TBL-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedReservation({
      referenceCode: code,
      name: resName.trim(),
      phone: resPhone.trim(),
      date: resDate,
      time: resTime,
      guests: resGuests,
      seating: resSeating,
      specialRequests: resRequests.trim() || 'Standard fine-dining table setup',
    });
    triggerToast(`Table reserved (${code}) for ${resGuests}`);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;
    const created: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: newReviewName.trim(),
      role: newReviewRole.trim() || 'Verified Dining Guest',
      date: 'September 2026',
      rating: newReviewRating,
      dishOrdered: newReviewDish,
      review: newReviewText.trim(),
      verifiedDining: 'Verified Dining Experience',
    };
    setReviews((prev) => [created, ...prev]);
    setNewReviewName('');
    setNewReviewRole('');
    setNewReviewText('');
    setShowReviewForm(false);
    setReviewSubmittedNotice(true);
    setTimeout(() => setReviewSubmittedNotice(false), 4000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setContactSent(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    triggerToast('Your message has been received by our Concierge.');
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0D0B] text-[#F7F4EF] flex flex-col selection:bg-[#D97706]/30">
      {/* Sticky Top Navigation Bar — Strictly 3 Zones per Top Bar Contract */}
      <header className="sticky top-0 z-40 h-16 bg-[#0F0D0B]/95 backdrop-blur-md border-b border-[#29231E] transition-colors">
        <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <a
            href="#home"
            className="font-display text-2xl sm:text-[26px] font-semibold tracking-tight text-[#F7F4EF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D97706]"
          >
            Spice Garden Restaurant
          </a>

          {/* Zone 2: 6 Clean Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#B8AFA6]"
          >
            <a
              href="#about"
              className="hover:text-[#F7F4EF] transition-colors duration-150 whitespace-nowrap py-1 border-b border-transparent hover:border-[#D97706]"
            >
              About Us
            </a>
            <a
              href="#menu"
              className="hover:text-[#F7F4EF] transition-colors duration-150 whitespace-nowrap py-1 border-b border-transparent hover:border-[#D97706]"
            >
              Menu
            </a>
            <a
              href="#offers"
              className="hover:text-[#F7F4EF] transition-colors duration-150 whitespace-nowrap py-1 border-b border-transparent hover:border-[#D97706]"
            >
              Special Offers
            </a>
            <a
              href="#gallery"
              className="hover:text-[#F7F4EF] transition-colors duration-150 whitespace-nowrap py-1 border-b border-transparent hover:border-[#D97706]"
            >
              Gallery
            </a>
            <a
              href="#reviews"
              className="hover:text-[#F7F4EF] transition-colors duration-150 whitespace-nowrap py-1 border-b border-transparent hover:border-[#D97706]"
            >
              Reviews
            </a>
            <a
              href="#contact"
              className="hover:text-[#F7F4EF] transition-colors duration-150 whitespace-nowrap py-1 border-b border-transparent hover:border-[#D97706]"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open order bag"
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-[#F7F4EF] bg-[#171411] hover:bg-[#221D18] border border-[#29231E] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#D97706]" />
              <span className="hidden sm:inline">Order Bag</span>
              <span className="font-mono-tabular text-xs text-[#D97706] font-semibold">
                ({totalCartItems})
              </span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('reservation')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#0F0D0B] bg-[#D97706] hover:bg-[#F59E0B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book a Table
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 text-[#B8AFA6] hover:text-[#F7F4EF] border border-[#29231E] rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#14110E] border-b border-[#29231E] px-6 py-5 space-y-3 shadow-2xl">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <button
                type="button"
                onClick={() => scrollToSection('home')}
                className="text-left py-2 text-[#B8AFA6] hover:text-[#F7F4EF]"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className="text-left py-2 text-[#B8AFA6] hover:text-[#F7F4EF]"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('menu')}
                className="text-left py-2 text-[#B8AFA6] hover:text-[#F7F4EF]"
              >
                Menu
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('offers')}
                className="text-left py-2 text-[#B8AFA6] hover:text-[#F7F4EF]"
              >
                Special Offers
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('gallery')}
                className="text-left py-2 text-[#B8AFA6] hover:text-[#F7F4EF]"
              >
                Gallery
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('reviews')}
                className="text-left py-2 text-[#B8AFA6] hover:text-[#F7F4EF]"
              >
                Customer Reviews
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('reservation')}
                className="text-left py-2 text-[#D97706] font-semibold"
              >
                Table Reservation
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="text-left py-2 text-[#B8AFA6] hover:text-[#F7F4EF]"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Subtle Floating Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg bg-[#171411] border border-[#D97706]/60 text-[#F7F4EF] text-sm shadow-2xl transition-opacity duration-150"
        >
          <Check className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs font-semibold text-[#D97706] underline hover:text-[#F59E0B] whitespace-nowrap cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}

      <main className="flex-1">
        {/* =====================================================================
            1. HOME — HERO SECTION
        ===================================================================== */}
        <section
          id="home"
          className="relative min-h-[84vh] flex items-center overflow-hidden border-b border-[#29231E]"
        >
          {/* Background High-Res Feast Photography with Measured Scrim */}
          <div className="absolute inset-0 z-0">
            <ResilientImage
              src={IMAGES.heroFeast}
              alt="Spice Garden Restaurant Royal Feast featuring Zafrani Dum Biryani, Tandoori Kebabs, and Artisanal Naan"
              containerClassName="w-full h-full"
              className="w-full h-full object-cover object-center scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0B] via-[#0F0D0B]/85 to-[#0F0D0B]/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0B] via-transparent to-[#0F0D0B]/50" />
          </div>

          <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-2xl space-y-6">
              {/* Quiet Unboxed Kicker Metadata (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#D97706] font-medium tracking-wide">
                <span>Heirloom Indian &amp; Indo-Chinese Kitchen</span>
                <span aria-hidden="true">·</span>
                <span>Est. 2014</span>
                <span aria-hidden="true">·</span>
                <span>Michelin Guide Selected</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-[68px] font-semibold text-[#F7F4EF] leading-[1.06] tracking-tight text-balance">
                Spice Garden Restaurant
              </h1>

              <p className="font-display italic text-xl sm:text-2xl text-[#E5DEC9] font-normal">
                “Where Heirloom Whole Spices Meet Slow-Fire Culinary Craft.”
              </p>

              <p className="text-base sm:text-lg text-[#B8AFA6] leading-relaxed max-w-[62ch]">
                Nestled in the heart of the Heritage Quarter, Spice Garden celebrates centuries-old
                royal kitchens and vibrant Tangra wok traditions. Every dish begins with freshly
                stone-ground spices from Malabar, Kashmir, and Guntur—slow-simmered in hammered
                copper handis and blistered over glowing tamarind charcoal.
              </p>

              {/* Primary CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('menu')}
                  className="px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0F0D0B] bg-[#D97706] hover:bg-[#F59E0B] rounded-lg transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>View Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('reservation')}
                  className="px-6 py-3.5 text-sm sm:text-base font-medium text-[#F7F4EF] bg-[#171411]/90 hover:bg-[#221D18] border border-[#3D332A] rounded-lg transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#D97706]" />
                  <span>Book a Table</span>
                </button>
              </div>

              {/* Unboxed Hospitality Proof Bar */}
              <div className="pt-8 border-t border-[#29231E]/90 grid grid-cols-3 gap-6 max-w-xl">
                <div>
                  <div className="font-mono-tabular text-xl sm:text-2xl font-semibold text-[#F7F4EF]">
                    24 Hours
                  </div>
                  <div className="text-xs text-[#B8AFA6] mt-0.5">
                    Slow-simmered signature Dal &amp; stocks
                  </div>
                </div>
                <div>
                  <div className="font-mono-tabular text-xl sm:text-2xl font-semibold text-[#F7F4EF]">
                    38 Spices
                  </div>
                  <div className="text-xs text-[#B8AFA6] mt-0.5">
                    Single-origin whole harvest roasted daily
                  </div>
                </div>
                <div>
                  <div className="font-mono-tabular text-xl sm:text-2xl font-semibold text-[#F7F4EF]">
                    4.9 / 5.0
                  </div>
                  <div className="text-xs text-[#B8AFA6] mt-0.5">
                    Across 1,840+ verified guest tables
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            2. ABOUT US — STORY, CHEFS & QUALITY INGREDIENTS
        ===================================================================== */}
        <section id="about" className="py-20 lg:py-28 border-b border-[#29231E] bg-[#0F0D0B]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Visual Showcase */}
              <div className="lg:col-span-6 space-y-6">
                <div className="rounded-xl overflow-hidden border border-[#29231E] bg-[#171411]">
                  <ResilientImage
                    src={IMAGES.aboutChefDining}
                    alt="Executive Chef Aarav Mehta plating a dish at the open brass pass of Spice Garden Restaurant"
                    containerClassName="aspect-[4/3] w-full"
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-200"
                  />
                  <div className="p-5 border-t border-[#29231E] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#B8AFA6]">
                    <span>Executive Chef Aarav Mehta at the Spice Garden Open Pass</span>
                    <span className="font-mono-tabular text-[#D97706]">
                      Teakwood &amp; Brass Dining Sanctuary
                    </span>
                  </div>
                </div>

                {/* Secondary Dual Image Strip */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-xl overflow-hidden border border-[#29231E] bg-[#171411]">
                    <ResilientImage
                      src={IMAGES.royalBiryani}
                      alt="Copper handi Hyderabadi Dum Biryani sealed with golden puff pastry"
                      containerClassName="aspect-[4/3] w-full"
                      className="w-full h-full object-cover"
                    />
                    <div className="p-3.5 text-xs text-[#B8AFA6]">
                      <strong className="text-[#F7F4EF] block font-medium">
                        Hammered Copper Dum
                      </strong>
                      Pastry-sealed to preserve volatile saffron oils
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-[#29231E] bg-[#171411]">
                    <ResilientImage
                      src={IMAGES.startersMain}
                      alt="Charcoal roasted Tandoori kebabs and Indo-Chinese wok dishes"
                      containerClassName="aspect-[4/3] w-full"
                      className="w-full h-full object-cover"
                    />
                    <div className="p-3.5 text-xs text-[#B8AFA6]">
                      <strong className="text-[#F7F4EF] block font-medium">
                        Tamarind Wood Tandoor
                      </strong>
                      800°F clay oven for blistered, smoky char
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative, Chef Bio & 3 Pillars */}
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-3">
                  <div className="text-xs font-medium text-[#D97706] tracking-wide">
                    Our Culinary Heritage · Since 2014
                  </div>
                  <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#F7F4EF] leading-tight text-balance">
                    Crafted with Patience, Whole Spices, and Ancestral Fire
                  </h2>
                </div>

                <p className="text-[#B8AFA6] text-base leading-relaxed">
                  Spice Garden Restaurant was born from a simple conviction: true Indian and
                  Indo-Chinese gastronomy cannot be rushed. Long before service begins each
                  morning, our spice masters hand-roast whole Tellicherry peppercorns, green
                  cardamom from Idukki, and sun-dried Guntur chilies over cast-iron tawas before
                  grinding them in small stone batches.
                </p>

                <p className="text-[#B8AFA6] text-base leading-relaxed">
                  Led by <strong className="text-[#F7F4EF] font-medium">Executive Chef Aarav Mehta</strong>—an
                  alumnus of the royal kitchens of Lucknow and Hyderabad with over two decades of
                  culinary stewardship—our kitchen bridges time-honored Dum Pukht slow-steaming with
                  the high-flame wok artistry of Old Calcutta’s Tangra district.
                </p>

                {/* Editorial Numbered Pillars (Human Editorial Format: 01. / 02. / 03.) */}
                <div className="space-y-5 pt-2 border-t border-[#29231E]">
                  <div className="flex gap-4 items-start">
                    <span className="font-mono-tabular text-sm font-semibold text-[#D97706] pt-0.5">
                      01.
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[#F7F4EF]">
                        Single-Origin Spice Harvest &amp; Zero Artificial Colors
                      </h3>
                      <p className="text-sm text-[#B8AFA6] mt-1 leading-relaxed">
                        Our crimson hues come strictly from Kashmiri ratan jot bark and Byadgi
                        chilies; our golden aromas come from Grade-A Pampore saffron threads
                        steeped in warm farm milk.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="font-mono-tabular text-sm font-semibold text-[#D97706] pt-0.5">
                      02.
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[#F7F4EF]">
                        Master Chefs of Tandoor, Dum &amp; Cast-Iron Wok
                      </h3>
                      <p className="text-sm text-[#B8AFA6] mt-1 leading-relaxed">
                        Our brigade is organized into specialized guilds: Ustad kababiyas tending
                        live tamarind-wood clay ovens, Dum masters sealing biryanis, and Tangra wok
                        chefs searing over roaring flames.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="font-mono-tabular text-sm font-semibold text-[#D97706] pt-0.5">
                      03.
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[#F7F4EF]">
                        Locally Sourced Organic Produce &amp; Pasture-Raised Cuts
                      </h3>
                      <p className="text-sm text-[#B8AFA6] mt-1 leading-relaxed">
                        We partner with family-owned regional farms for daily paneer curds,
                        heirloom baby vegetables, and humanely raised meats marinated for up to 24
                        hours.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('menu')}
                    className="px-5 py-2.5 text-sm font-semibold text-[#0F0D0B] bg-[#D97706] hover:bg-[#F59E0B] rounded-lg transition-colors cursor-pointer"
                  >
                    Explore Our Full Menu
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('reservation')}
                    className="px-5 py-2.5 text-sm font-medium text-[#F7F4EF] border border-[#29231E] hover:border-[#D97706] rounded-lg transition-colors cursor-pointer"
                  >
                    Reserve Chef’s Counter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. MENU SECTION — 6 CATEGORIES, SEARCH, DIETARY FILTER & ORDERING
        ===================================================================== */}
        <section id="menu" className="py-20 lg:py-28 border-b border-[#29231E] bg-[#120F0D]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="text-xs font-medium text-[#D97706] tracking-wide">
                  Curated Culinary Index · Freshly Prepared to Order
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#F7F4EF] text-balance">
                  Our Signature Menu
                </h2>
                <p className="text-sm sm:text-base text-[#B8AFA6]">
                  Explore six distinct culinary chapters—from smoky charcoal starters and copper-pot
                  Dum Biryanis to fiery Calcutta Chinatown wok specialties.
                </p>
              </div>

              {/* Search Input & Dietary Segmented Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#B8AFA6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes or spices..."
                    aria-label="Search menu dishes"
                    className="w-full sm:w-60 pl-9 pr-4 py-2 text-sm bg-[#171411] border border-[#29231E] rounded-lg text-[#F7F4EF] placeholder:text-[#8A8077] focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                {/* Interactive Filter Controls (Functional Buttons) */}
                <div
                  role="group"
                  aria-label="Dietary filter"
                  className="flex items-center p-1 bg-[#171411] border border-[#29231E] rounded-lg"
                >
                  <button
                    type="button"
                    onClick={() => setDietaryFilter('all')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      dietaryFilter === 'all'
                        ? 'bg-[#D97706] text-[#0F0D0B] font-semibold'
                        : 'text-[#B8AFA6] hover:text-[#F7F4EF]'
                    }`}
                  >
                    All Dishes
                  </button>
                  <button
                    type="button"
                    onClick={() => setDietaryFilter('veg')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      dietaryFilter === 'veg'
                        ? 'bg-[#D97706] text-[#0F0D0B] font-semibold'
                        : 'text-[#B8AFA6] hover:text-[#F7F4EF]'
                    }`}
                  >
                    Vegetarian
                  </button>
                  <button
                    type="button"
                    onClick={() => setDietaryFilter('signature')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      dietaryFilter === 'signature'
                        ? 'bg-[#D97706] text-[#0F0D0B] font-semibold'
                        : 'text-[#B8AFA6] hover:text-[#F7F4EF]'
                    }`}
                  >
                    Chef’s Signature
                  </button>
                </div>
              </div>
            </div>

            {/* Category Selector Bar (All + 6 Required Categories) */}
            <div
              role="tablist"
              aria-label="Menu Categories"
              className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#29231E]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'All'}
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === 'All'
                    ? 'bg-[#D97706] text-[#0F0D0B] font-semibold'
                    : 'bg-[#171411] text-[#B8AFA6] hover:text-[#F7F4EF] border border-[#29231E]'
                }`}
              >
                All Categories ({MENU_ITEMS.length})
              </button>

              {MENU_CATEGORIES.map((category) => {
                const count = MENU_ITEMS.filter((i) => i.category === category).length;
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#D97706] text-[#0F0D0B] font-semibold'
                        : 'bg-[#171411] text-[#B8AFA6] hover:text-[#F7F4EF] border border-[#29231E]'
                    }`}
                  >
                    <span>{category}</span>
                    <span className="ml-1.5 font-mono-tabular text-xs opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Menu Grid — 3 Columns Desktop, 2 Tablet, 1 Mobile */}
            {filteredMenuItems.length === 0 ? (
              <div className="py-16 text-center bg-[#171411] border border-[#29231E] rounded-xl p-8 space-y-4">
                <p className="font-display text-2xl text-[#F7F4EF]">
                  No dishes match your current filter selection.
                </p>
                <p className="text-sm text-[#B8AFA6]">
                  Try clearing your search query or switching back to All Categories.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setDietaryFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-[#0F0D0B] bg-[#D97706] rounded-lg cursor-pointer"
                >
                  Reset Menu Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredMenuItems.map((item) => {
                  const inCartItem = cart.find((c) => c.id === item.id);
                  return (
                    <article
                      key={item.id}
                      className="group bg-[#171411] border border-[#29231E] hover:border-[#3D332A] rounded-xl overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-0.5"
                    >
                      {/* Dish Photography */}
                      <div
                        onClick={() => setActiveDishModal(item)}
                        className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer"
                      >
                        <ResilientImage
                          src={item.image}
                          alt={item.name}
                          containerClassName="w-full h-full"
                          className={`w-full h-full object-cover ${
                            item.imagePosition || 'object-center'
                          } group-hover:scale-105 transition-transform duration-200`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#171411] via-transparent to-transparent opacity-65" />
                      </div>

                      {/* Card Body — Clean Unboxed Metadata, Title, Description, Price & Actions */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">
                          {/* Unboxed Metadata with Typographic Separators (Zero-Pill Rule) */}
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#B8AFA6]">
                            <span className="text-[#D97706] font-medium">{item.category}</span>
                            <span aria-hidden="true">·</span>
                            <span
                              className={
                                item.isVegetarian ? 'text-emerald-400 font-medium' : 'text-amber-300'
                              }
                            >
                              {item.isVegetarian ? 'Vegetarian' : 'Chef’s Meat Cut'}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{item.spiceLevel} Spice</span>
                            {item.isSignature && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="text-[#F7F4EF] font-medium">House Signature</span>
                              </>
                            )}
                          </div>

                          {/* Title & Price Row */}
                          <div className="flex items-baseline justify-between gap-3">
                            <h3
                              onClick={() => setActiveDishModal(item)}
                              className="font-display text-2xl font-semibold text-[#F7F4EF] group-hover:text-[#D97706] transition-colors cursor-pointer"
                            >
                              {item.name}
                            </h3>
                            <span className="font-mono-tabular text-base font-semibold text-[#F7F4EF] shrink-0">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>

                          <p className="text-sm text-[#B8AFA6] leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Bottom Action Row */}
                        <div className="pt-4 border-t border-[#29231E] flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setActiveDishModal(item)}
                            className="text-xs font-medium text-[#B8AFA6] hover:text-[#F7F4EF] transition-colors whitespace-nowrap cursor-pointer"
                          >
                            Ingredients &amp; Pairing
                          </button>

                          {inCartItem ? (
                            <div className="flex items-center gap-2 bg-[#0F0D0B] border border-[#D97706]/50 rounded-lg px-2 py-1">
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, -1)}
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="p-1 text-[#B8AFA6] hover:text-[#F7F4EF] cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-mono-tabular text-xs font-semibold text-[#F7F4EF] px-1">
                                {inCartItem.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                                className="p-1 text-[#D97706] hover:text-[#F59E0B] cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                addToCart({
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  image: item.image,
                                  note: `${item.category} · ${item.spiceLevel} Spice`,
                                })
                              }
                              className="px-4 py-2 text-xs font-semibold text-[#0F0D0B] bg-[#D97706] hover:bg-[#F59E0B] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Order</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================================
            4. SPECIAL OFFERS — TODAY'S & FESTIVAL SPECIAL DISHES
        ===================================================================== */}
        <section id="offers" className="py-20 lg:py-28 border-b border-[#29231E] bg-[#0F0D0B]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="text-xs font-medium text-[#D97706] tracking-wide">
                  Limited-Time Culinary Celebrations · Dine-In &amp; Online Takeaway
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#F7F4EF] text-balance">
                  Today’s &amp; Festival Special Offers
                </h2>
                <p className="text-sm sm:text-base text-[#B8AFA6]">
                  Thoughtfully composed multi-course tasting feasts for family gatherings, festive
                  evenings, and intimate dinners.
                </p>
              </div>
              <div className="text-xs text-[#B8AFA6] font-mono-tabular">
                Complimentary Saffron Mithai Box on Feast Orders Over $75
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {SPECIAL_OFFERS.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-[#171411] border border-[#29231E] hover:border-[#D97706]/50 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-150"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <ResilientImage
                        src={offer.image}
                        alt={offer.title}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#171411] via-[#171411]/30 to-transparent" />
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Unboxed Kicker & Savings Metadata */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#D97706] font-medium">
                        <span>{offer.kicker}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-400 font-mono-tabular">
                          {offer.savingsLabel}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-display text-2xl sm:text-[28px] font-semibold text-[#F7F4EF] leading-snug">
                          {offer.title}
                        </h3>
                        <p className="text-xs text-[#E5DEC9]">{offer.subtitle}</p>
                      </div>

                      <p className="text-sm text-[#B8AFA6] leading-relaxed">{offer.description}</p>

                      {/* Included Courses List */}
                      <div className="pt-3 border-t border-[#29231E] space-y-2">
                        <div className="text-xs font-medium text-[#F7F4EF]">
                          Included in this Feast:
                        </div>
                        <ul className="space-y-1.5 text-xs text-[#B8AFA6]">
                          {offer.includedItems.map((inc, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Offer Footer with Tabular Price & Order Now CTA */}
                  <div className="p-6 pt-4 border-t border-[#29231E] bg-[#14110E] space-y-4">
                    <div className="text-xs text-[#B8AFA6]">{offer.validityText}</div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-[#8A8077] line-through font-mono-tabular mr-2">
                          ${offer.originalPrice.toFixed(2)}
                        </span>
                        <span className="font-mono-tabular text-2xl font-semibold text-[#F7F4EF]">
                          ${offer.offerPrice.toFixed(2)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOrderSpecialOffer(offer)}
                        className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0F0D0B] bg-[#D97706] hover:bg-[#F59E0B] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. GALLERY — FOOD & RESTAURANT AMBIANCE WITH HOVER & LIGHTBOX
        ===================================================================== */}
        <section id="gallery" className="py-20 lg:py-28 border-b border-[#29231E] bg-[#120F0D]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="text-xs font-medium text-[#D97706] tracking-wide">
                  Visual Story · Architecture, Hearth &amp; Plating
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#F7F4EF]">
                  Inside Spice Garden
                </h2>
                <p className="text-sm sm:text-base text-[#B8AFA6]">
                  From our hand-carved teakwood dining room and brass pendant lamps to our
                  steaming copper handis. Click any photograph to inspect in full detail.
                </p>
              </div>

              {/* Gallery Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#171411] border border-[#29231E] rounded-lg">
                {(
                  [
                    'All',
                    'Signature Dishes',
                    'Dining Room & Craft',
                    'Desserts & Cocktails',
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setGalleryFilter(tab)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      galleryFilter === tab
                        ? 'bg-[#D97706] text-[#0F0D0B] font-semibold'
                        : 'text-[#B8AFA6] hover:text-[#F7F4EF]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Asymmetric Bento Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredGalleryItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  className={`group relative rounded-xl overflow-hidden border border-[#29231E] bg-[#171411] cursor-pointer ${
                    galleryFilter === 'All' ? item.aspectClass : 'md:col-span-1'
                  }`}
                >
                  <ResilientImage
                    src={item.image}
                    alt={item.title}
                    containerClassName="aspect-[16/10] w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {/* Measured Contrast Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0B]/95 via-[#0F0D0B]/35 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-150 flex flex-col justify-end p-6">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#D97706] mb-1">
                      <span>{item.category}</span>
                      <span className="flex items-center gap-1 text-[#E5DEC9] opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Full Size</span>
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#F7F4EF]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B8AFA6] mt-1 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            6. CUSTOMER REVIEWS — ATTRIBUTABLE TESTIMONIALS & GUEST REVIEW FORM
        ===================================================================== */}
        <section id="reviews" className="py-20 lg:py-28 border-b border-[#29231E] bg-[#0F0D0B]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="text-xs font-medium text-[#D97706] tracking-wide">
                  Guest Voices · 4.9 Average Across 1,840+ Verified Reservations
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#F7F4EF]">
                  What Our Guests Say
                </h2>
                <p className="text-sm sm:text-base text-[#B8AFA6]">
                  Reflections from food critics, neighborhood regulars, and private dining hosts who
                  have gathered around our tables.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewForm((prev) => !prev)}
                className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#F7F4EF] bg-[#171411] hover:bg-[#221D18] border border-[#29231E] rounded-lg transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
              >
                {showReviewForm ? 'Close Review Form' : 'Share Your Dining Experience'}
              </button>
            </div>

            {reviewSubmittedNotice && (
              <div className="p-4 rounded-lg bg-[#171411] border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>
                  Thank you for sharing your review! Your reflection has been added to our guestbook
                  below.
                </span>
              </div>
            )}

            {/* Interactive Add Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleAddReview}
                className="bg-[#171411] border border-[#29231E] rounded-xl p-6 sm:p-8 space-y-5"
              >
                <h3 className="font-display text-2xl font-semibold text-[#F7F4EF]">
                  Add Your Guestbook Reflection
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-[#B8AFA6] mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="e.g.,Elena Rostova"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#B8AFA6] mb-1.5">
                      Profession or Dining Context
                    </label>
                    <input
                      type="text"
                      value={newReviewRole}
                      onChange={(e) => setNewReviewRole(e.target.value)}
                      placeholder="e.g., Sommelier / Anniversary Dinner"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#B8AFA6] mb-1.5">Favorite Dish</label>
                    <select
                      value={newReviewDish}
                      onChange={(e) => setNewReviewDish(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] focus:outline-none focus:border-[#D97706]"
                    >
                      {MENU_ITEMS.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
                  <div>
                    <label className="block text-xs text-[#B8AFA6] mb-1.5">Star Rating</label>
                    <div className="flex items-center gap-1.5 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          aria-label={`Rate ${star} stars`}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newReviewRating
                                ? 'text-[#D97706] fill-[#D97706]'
                                : 'text-[#3D332A]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-xs text-[#B8AFA6] mb-1.5">Your Review *</label>
                    <textarea
                      rows={3}
                      required
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="Share what stood out about the flavors, ambiance, or hospitality..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0F0D0B] bg-[#D97706] hover:bg-[#F59E0B] rounded-lg transition-colors cursor-pointer"
                  >
                    Publish Guest Review
                  </button>
                </div>
              </form>
            )}

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {reviews.map((rev) => (
                <article
                  key={rev.id}
                  className="bg-[#171411] border border-[#29231E] rounded-xl p-7 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    {/* Star Rating & Date Row */}
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className="flex items-center gap-1"
                        aria-label={`${rev.rating} out of 5 stars`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rev.rating
                                ? 'text-[#D97706] fill-[#D97706]'
                                : 'text-[#3D332A]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#8A8077] font-mono-tabular">{rev.date}</span>
                    </div>

                    {/* Dish Ordered Metadata (Unboxed) */}
                    <div className="text-xs text-[#D97706]">
                      Ordered: <span className="text-[#E5DEC9]">{rev.dishOrdered}</span>
                    </div>

                    <p className="text-sm sm:text-base text-[#F7F4EF]/90 leading-relaxed">
                      “{rev.review}”
                    </p>
                  </div>

                  {/* Attributable Author Footer */}
                  <div className="pt-4 border-t border-[#29231E]">
                    <div className="font-display text-xl font-semibold text-[#F7F4EF]">
                      {rev.name}
                    </div>
                    <div className="text-xs text-[#B8AFA6] mt-0.5">
                      {rev.role} · {rev.verifiedDining}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            7. RESERVATION — TABLE BOOKING FORM WITH INSTANT CONFIRMATION PASS
        ===================================================================== */}
        <section
          id="reservation"
          className="py-20 lg:py-28 border-b border-[#29231E] bg-[#120F0D]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Dining Sanctuary Details & Policies */}
              <div className="lg:col-span-5 space-y-6">
                <div className="text-xs font-medium text-[#D97706] tracking-wide">
                  Table Reservations · Instant Online Confirmation
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#F7F4EF] leading-tight text-balance">
                  Reserve Your Table at Spice Garden
                </h2>
                <p className="text-[#B8AFA6] text-base leading-relaxed">
                  Whether you are planning an intimate candlelit dinner, a family Dum Biryani feast,
                  or a seat at Chef Aarav Mehta’s open kitchen counter, we hold tables for both
                  lunch and evening service.
                </p>

                <div className="space-y-4 pt-4 border-t border-[#29231E] text-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#D97706] shrink-0 mt-1" />
                    <div>
                      <strong className="text-[#F7F4EF] block font-medium">
                        Lunch &amp; Dinner Service Hours
                      </strong>
                      <span className="text-[#B8AFA6] font-mono-tabular text-xs">
                        Mon–Thu: 11:30 AM – 10:00 PM · Fri–Sun: 11:30 AM – 11:00 PM
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-[#D97706] shrink-0 mt-1" />
                    <div>
                      <strong className="text-[#F7F4EF] block font-medium">
                        Private Dining &amp; Celebrations
                      </strong>
                      <span className="text-[#B8AFA6] text-xs">
                        Our Teakwood Courtyard accommodates private banquets of up to 24 guests with
                        bespoke tasting menus.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Utensils className="w-4 h-4 text-[#D97706] shrink-0 mt-1" />
                    <div>
                      <strong className="text-[#F7F4EF] block font-medium">
                        Dietary &amp; Allergen Care
                      </strong>
                      <span className="text-[#B8AFA6] text-xs">
                        Jain, vegan, gluten-free, and nut-free preparations are gladly crafted upon
                        request.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Booking Form or Confirmed Pass */}
              <div className="lg:col-span-7 bg-[#171411] border border-[#29231E] rounded-xl p-6 sm:p-10">
                {confirmedReservation ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-[#29231E] pb-4">
                      <div>
                        <span className="text-xs text-emerald-400 font-medium">
                          Reservation Confirmed · Table Held
                        </span>
                        <h3 className="font-display text-3xl font-semibold text-[#F7F4EF] mt-1">
                          We Look Forward to Welcoming You, {confirmedReservation.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-[#B8AFA6] block">Booking Ref</span>
                        <span className="font-mono-tabular text-lg font-semibold text-[#D97706]">
                          {confirmedReservation.referenceCode}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-2 text-sm">
                      <div>
                        <span className="text-xs text-[#B8AFA6] block">Date</span>
                        <span className="font-mono-tabular font-medium text-[#F7F4EF]">
                          {confirmedReservation.date}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-[#B8AFA6] block">Time</span>
                        <span className="font-mono-tabular font-medium text-[#F7F4EF]">
                          {confirmedReservation.time}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-[#B8AFA6] block">Party Size</span>
                        <span className="font-medium text-[#F7F4EF]">
                          {confirmedReservation.guests}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-[#B8AFA6] block">Seating Zone</span>
                        <span className="font-medium text-[#F7F4EF]">
                          {confirmedReservation.seating}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-[#B8AFA6] block">Guest Phone</span>
                        <span className="font-mono-tabular font-medium text-[#F7F4EF]">
                          {confirmedReservation.phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-[#B8AFA6] block">Special Notes</span>
                        <span className="text-xs text-[#E5DEC9]">
                          {confirmedReservation.specialRequests}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#29231E] flex flex-wrap items-center justify-between gap-4">
                      <p className="text-xs text-[#B8AFA6]">
                        A confirmation SMS has been prepared for {confirmedReservation.phone}. We
                        hold reserved tables for 15 minutes past the booking time.
                      </p>
                      <button
                        type="button"
                        onClick={() => setConfirmedReservation(null)}
                        className="px-4 py-2 text-xs font-semibold text-[#0F0D0B] bg-[#D97706] hover:bg-[#F59E0B] rounded-lg transition-colors cursor-pointer"
                      >
                        Modify or Book Another Table
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleReservationSubmit} className="space-y-6" noValidate>
                    <div className="flex items-center justify-between border-b border-[#29231E] pb-4">
                      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F7F4EF]">
                        Table Booking Form
                      </h3>
                      <span className="text-xs text-[#B8AFA6]">No booking fees · Instant hold</span>
                    </div>

                    {resError && (
                      <div
                        role="alert"
                        className="p-3.5 rounded-lg bg-red-950/50 border border-red-500/40 text-red-200 text-xs"
                      >
                        {resError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="res-name"
                          className="block text-xs font-medium text-[#B8AFA6] mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          id="res-name"
                          type="text"
                          required
                          value={resName}
                          onChange={(e) => setResName(e.target.value)}
                          placeholder="e.g., Vikramaditya Rao"
                          className="w-full px-4 py-2.5 text-sm bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] placeholder:text-[#8A8077] focus:outline-none focus:border-[#D97706]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="res-phone"
                          className="block text-xs font-medium text-[#B8AFA6] mb-1.5"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="res-phone"
                          type="tel"
                          required
                          value={resPhone}
                          onChange={(e) => setResPhone(e.target.value)}
                          placeholder="e.g., +1 (415) 555-0192"
                          className="w-full px-4 py-2.5 text-sm font-mono-tabular bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] placeholder:text-[#8A8077] focus:outline-none focus:border-[#D97706]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="res-date"
                          className="block text-xs font-medium text-[#B8AFA6] mb-1.5"
                        >
                          Preferred Date *
                        </label>
                        <input
                          id="res-date"
                          type="date"
                          required
                          value={resDate}
                          onChange={(e) => setResDate(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm font-mono-tabular bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] focus:outline-none focus:border-[#D97706]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="res-guests"
                          className="block text-xs font-medium text-[#B8AFA6] mb-1.5"
                        >
                          Number of Guests *
                        </label>
                        <select
                          id="res-guests"
                          value={resGuests}
                          onChange={(e) => setResGuests(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] focus:outline-none focus:border-[#D97706]"
                        >
                          <option value="1 Guest">1 Guest</option>
                          <option value="2 Guests">2 Guests</option>
                          <option value="3 Guests">3 Guests</option>
                          <option value="4 Guests">4 Guests</option>
                          <option value="5 Guests">5 Guests</option>
                          <option value="6 Guests">6 Guests</option>
                          <option value="8 Guests (Large Table)">8 Guests (Large Table)</option>
                          <option value="10+ Guests (Private Courtyard)">
                            10+ Guests (Private Courtyard)
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Interactive Time Slot Buttons */}
                    <div>
                      <label className="block text-xs font-medium text-[#B8AFA6] mb-2">
                        Select Dining Time *
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {RESERVATION_TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setResTime(slot)}
                            className={`py-2 px-2.5 text-xs font-mono-tabular rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                              resTime === slot
                                ? 'bg-[#D97706] text-[#0F0D0B] border-[#D97706] font-semibold'
                                : 'bg-[#0F0D0B] text-[#B8AFA6] border-[#29231E] hover:border-[#3D332A] hover:text-[#F7F4EF]'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Seating Preference */}
                    <div>
                      <label className="block text-xs font-medium text-[#B8AFA6] mb-2">
                        Dining Area Preference
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          'Main Dining Sanctuary',
                          'Teakwood Courtyard',
                          'Chef’s Open Pass Counter',
                        ].map((zone) => (
                          <button
                            key={zone}
                            type="button"
                            onClick={() => setResSeating(zone)}
                            className={`py-2.5 px-3 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                              resSeating === zone
                                ? 'bg-[#221D18] text-[#F7F4EF] border-[#D97706]'
                                : 'bg-[#0F0D0B] text-[#B8AFA6] border-[#29231E] hover:text-[#F7F4EF]'
                            }`}
                          >
                            {zone}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="res-requests"
                        className="block text-xs font-medium text-[#B8AFA6] mb-1.5"
                      >
                        Special Requests (Allergies, Anniversary, High Chair, Spice Preference)
                      </label>
                      <textarea
                        id="res-requests"
                        rows={2}
                        value={resRequests}
                        onChange={(e) => setResRequests(e.target.value)}
                        placeholder="Let our concierge and kitchen know how we can personalize your visit..."
                        className="w-full px-4 py-2.5 text-sm bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] placeholder:text-[#8A8077] focus:outline-none focus:border-[#D97706]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 text-sm sm:text-base font-semibold text-[#0F0D0B] bg-[#D97706] hover:bg-[#F59E0B] rounded-lg transition-colors cursor-pointer"
                    >
                      Book Table
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            8. CONTACT US — ADDRESS, HOURS, INTERACTIVE GOOGLE MAPS & INQUIRY
        ===================================================================== */}
        <section id="contact" className="py-20 lg:py-28 border-b border-[#29231E] bg-[#0F0D0B]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-medium text-[#D97706] tracking-wide">
                Location, Hours &amp; Concierge
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#F7F4EF]">
                Visit Spice Garden Restaurant
              </h2>
              <p className="text-sm sm:text-base text-[#B8AFA6]">
                Located in the historic Heritage Quarter with complimentary evening valet parking
                and private event suites.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Address, Phone, Email, Hours & Direct Message */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-[#171411] border border-[#29231E] rounded-xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#D97706] shrink-0 mt-1" />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[#F7F4EF]">
                        Restaurant Address
                      </h3>
                      <p className="text-sm text-[#B8AFA6] mt-1 leading-relaxed">
                        428 Spice Garden Boulevard, Heritage Quarter
                        <br />
                        San Francisco, CA 94108, United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 border-t border-[#29231E] pt-5">
                    <Phone className="w-5 h-5 text-[#D97706] shrink-0 mt-1" />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[#F7F4EF]">
                        Reservations &amp; Direct Line
                      </h3>
                      <p className="text-sm font-mono-tabular text-[#E5DEC9] mt-1">
                        +1 (415) 892-4700
                      </p>
                      <p className="text-xs text-[#B8AFA6] mt-0.5">
                        Private Dining &amp; Catering: +1 (415) 892-4705
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 border-t border-[#29231E] pt-5">
                    <Mail className="w-5 h-5 text-[#D97706] shrink-0 mt-1" />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[#F7F4EF]">
                        Concierge Email
                      </h3>
                      <p className="text-sm text-[#E5DEC9] mt-1">concierge@spicegarden.com</p>
                      <p className="text-xs text-[#B8AFA6] mt-0.5">
                        events@spicegarden.com · press@spicegarden.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 border-t border-[#29231E] pt-5">
                    <Clock className="w-5 h-5 text-[#D97706] shrink-0 mt-1" />
                    <div className="w-full">
                      <h3 className="font-display text-xl font-semibold text-[#F7F4EF]">
                        Opening Hours
                      </h3>
                      <div className="mt-2 space-y-1.5 text-xs sm:text-sm">
                        <div className="flex justify-between text-[#B8AFA6]">
                          <span>Monday – Thursday</span>
                          <span className="font-mono-tabular text-[#F7F4EF]">
                            11:30 AM – 10:00 PM
                          </span>
                        </div>
                        <div className="flex justify-between text-[#B8AFA6]">
                          <span>Friday – Saturday</span>
                          <span className="font-mono-tabular text-[#F7F4EF]">
                            11:30 AM – 11:00 PM
                          </span>
                        </div>
                        <div className="flex justify-between text-[#B8AFA6]">
                          <span>Sunday &amp; Royal Brunch</span>
                          <span className="font-mono-tabular text-[#F7F4EF]">
                            11:30 AM – 10:30 PM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Icons */}
                  <div className="pt-5 border-t border-[#29231E] flex items-center justify-between">
                    <span className="text-xs text-[#B8AFA6]">Follow Our Culinary Journal</span>
                    <div className="flex items-center gap-3">
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          triggerToast('Opening @SpiceGardenRestaurant on Instagram');
                        }}
                        aria-label="Spice Garden on Instagram"
                        className="p-2 rounded-lg bg-[#0F0D0B] border border-[#29231E] text-[#B8AFA6] hover:text-[#D97706] hover:border-[#D97706] transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          triggerToast('Opening Spice Garden Official on Facebook');
                        }}
                        aria-label="Spice Garden on Facebook"
                        className="p-2 rounded-lg bg-[#0F0D0B] border border-[#29231E] text-[#B8AFA6] hover:text-[#D97706] hover:border-[#D97706] transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          triggerToast('Opening Spice Garden Culinary Guide');
                        }}
                        aria-label="Spice Garden Directions & Guide"
                        className="p-2 rounded-lg bg-[#0F0D0B] border border-[#29231E] text-[#B8AFA6] hover:text-[#D97706] hover:border-[#D97706] transition-colors"
                      >
                        <Compass className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Google Maps Section + Quick Inquiry Form */}
              <div className="lg:col-span-7 space-y-6">
                {/* Google Maps Container */}
                <div className="bg-[#171411] border border-[#29231E] rounded-xl overflow-hidden">
                  <div className="relative h-[320px] w-full bg-[#1C1713]">
                    <iframe
                      title="Spice Garden Restaurant Google Maps Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.063684162825!2d-122.4089664!3d37.7891282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808949995555%3A0x8888888888888888!2sUnion%20Square%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                      className="w-full h-full border-0 filter contrast-105 opacity-90"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  {/* Interactive Arrival & Parking Guide Tabs */}
                  <div className="p-5 border-t border-[#29231E] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {(['valet', 'transit', 'landmarks'] as const).map((tab) => (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTransitTab(tab)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                              activeTransitTab === tab
                                ? 'bg-[#D97706] text-[#0F0D0B] font-semibold'
                                : 'bg-[#0F0D0B] text-[#B8AFA6] hover:text-[#F7F4EF]'
                            }`}
                          >
                            {tab === 'valet'
                              ? 'Valet & Parking'
                              : tab === 'transit'
                              ? 'Metro & Transit'
                              : 'Nearby Landmarks'}
                          </button>
                        ))}
                      </div>

                      <span className="text-xs font-mono-tabular text-[#D97706]">
                        37.7891° N, 122.4089° W
                      </span>
                    </div>

                    <p className="text-xs text-[#B8AFA6] leading-relaxed">
                      {activeTransitTab === 'valet' &&
                        'Complimentary valet drop-off is located directly at our brass canopy entrance on Spice Garden Blvd starting at 5:30 PM daily. Self-parking is available at the Heritage Garage (50 yards west).'}
                      {activeTransitTab === 'transit' &&
                        'Two blocks north of Montgomery & Powell BART stations. The historic Powell-Mason cable car stops 120 feet from our main teakwood doors.'}
                      {activeTransitTab === 'landmarks' &&
                        'Situated directly across from the Heritage Botanical Conservatory and two minutes from Union Square Theater District.'}
                    </p>
                  </div>
                </div>

                {/* Direct Concierge & Private Events Inquiry Form */}
                <form
                  onSubmit={handleContactSubmit}
                  className="bg-[#171411] border border-[#29231E] rounded-xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-semibold text-[#F7F4EF]">
                      Send a Message to Our Concierge
                    </h3>
                    {contactSent && (
                      <span className="text-xs text-emerald-400 font-medium">
                        Message Sent · We reply within 2 hours
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your Name *"
                      className="px-3.5 py-2 text-sm bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] placeholder:text-[#8A8077] focus:outline-none focus:border-[#D97706]"
                    />
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Your Email *"
                      className="px-3.5 py-2 text-sm bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] placeholder:text-[#8A8077] focus:outline-none focus:border-[#D97706]"
                    />
                    <select
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="px-3.5 py-2 text-sm bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] focus:outline-none focus:border-[#D97706]"
                    >
                      <option value="Private Dining & Events">Private Dining &amp; Events</option>
                      <option value="Catering & Festival Boxes">
                        Catering &amp; Festival Boxes
                      </option>
                      <option value="Dietary & Chef Inquiry">Dietary &amp; Chef Inquiry</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Write your question or private event inquiry..."
                      className="flex-1 px-3.5 py-2.5 text-sm bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] placeholder:text-[#8A8077] focus:outline-none focus:border-[#D97706]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0F0D0B] bg-[#D97706] hover:bg-[#F59E0B] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Send Inquiry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          9. FOOTER — BRAND, QUICK LINKS, CONTACT, HOURS, SOCIAL & COPYRIGHT
      ===================================================================== */}
      <footer className="bg-[#0B0908] border-t border-[#29231E] text-[#B8AFA6]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#29231E]">
            {/* Col 1: Brand & Philosophy */}
            <div className="lg:col-span-4 space-y-4">
              <a
                href="#home"
                className="font-display text-3xl font-semibold text-[#F7F4EF] tracking-tight block"
              >
                Spice Garden Restaurant
              </a>
              <p className="text-sm text-[#B8AFA6] leading-relaxed max-w-sm">
                Celebrating heirloom Indian royal recipes, pastry-sealed Dum Biryanis, and
                high-flame Calcutta Tangra wok craft since 2014.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerToast('Following @SpiceGardenRestaurant on Instagram');
                  }}
                  aria-label="Instagram"
                  className="p-2 rounded-lg bg-[#171411] border border-[#29231E] text-[#B8AFA6] hover:text-[#F7F4EF] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerToast('Following Spice Garden Restaurant on Facebook');
                  }}
                  aria-label="Facebook"
                  className="p-2 rounded-lg bg-[#171411] border border-[#29231E] text-[#B8AFA6] hover:text-[#F7F4EF] transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-display text-lg font-semibold text-[#F7F4EF]">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#home" className="hover:text-[#F7F4EF] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#F7F4EF] transition-colors">
                    About Our Kitchen
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#F7F4EF] transition-colors">
                    Signature Menu
                  </a>
                </li>
                <li>
                  <a href="#offers" className="hover:text-[#F7F4EF] transition-colors">
                    Special Offers
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-[#F7F4EF] transition-colors">
                    Visual Gallery
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-[#F7F4EF] transition-colors">
                    Guest Reviews
                  </a>
                </li>
                <li>
                  <a href="#reservation" className="hover:text-[#D97706] transition-colors">
                    Book a Table
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact Details */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-display text-lg font-semibold text-[#F7F4EF]">
                Contact Details
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <span className="text-[#F7F4EF] block font-medium">Address</span>
                  <span>428 Spice Garden Blvd, San Francisco, CA 94108</span>
                </li>
                <li>
                  <span className="text-[#F7F4EF] block font-medium">Telephone</span>
                  <span className="font-mono-tabular">+1 (415) 892-4700</span>
                </li>
                <li>
                  <span className="text-[#F7F4EF] block font-medium">Email</span>
                  <span>concierge@spicegarden.com</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Opening Hours & Seasonal Table Dispatch */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-display text-lg font-semibold text-[#F7F4EF]">Opening Hours</h4>
              <div className="space-y-1.5 text-xs font-mono-tabular">
                <div className="flex justify-between">
                  <span>Mon – Thu:</span>
                  <span className="text-[#F7F4EF]">11:30 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Fri – Sat:</span>
                  <span className="text-[#F7F4EF]">11:30 AM – 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-[#F7F4EF]">11:30 AM – 10:30 PM</span>
                </div>
              </div>

              {/* Quiet Chef's Dispatch Signup */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail.trim()) {
                    setNewsletterSubscribed(true);
                    setNewsletterEmail('');
                  }
                }}
                className="pt-2 space-y-2"
              >
                <label htmlFor="footer-newsletter" className="block text-xs text-[#E5DEC9]">
                  Receive seasonal festival menu invitations:
                </label>
                {newsletterSubscribed ? (
                  <p className="text-xs text-emerald-400">
                    Welcome to the Spice Garden Table Society.
                  </p>
                ) : (
                  <div className="flex gap-2">
                    <input
                      id="footer-newsletter"
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full px-3 py-1.5 text-xs bg-[#171411] border border-[#29231E] rounded-lg text-[#F7F4EF] focus:outline-none focus:border-[#D97706]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-semibold text-[#0F0D0B] bg-[#D97706] hover:bg-[#F59E0B] rounded-lg whitespace-nowrap cursor-pointer"
                    >
                      Join
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8077]">
            <p>© {new Date().getFullYear()} Spice Garden Restaurant. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#about" className="hover:text-[#B8AFA6]">
                Spice Sourcing Charter
              </a>
              <span aria-hidden="true">·</span>
              <a href="#reservation" className="hover:text-[#B8AFA6]">
                Private Dining Policy
              </a>
              <span aria-hidden="true">·</span>
              <a href="#contact" className="hover:text-[#B8AFA6]">
                Accessibility Statement
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE DISH DETAIL MODAL
      ===================================================================== */}
      {activeDishModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dish-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveDishModal(null)}
        >
          <div
            className="bg-[#171411] border border-[#3D332A] rounded-xl max-w-xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full">
              <ResilientImage
                src={activeDishModal.image}
                alt={activeDishModal.name}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveDishModal(null)}
                aria-label="Close dish details"
                className="absolute top-4 right-4 p-2 rounded-full bg-[#0F0D0B]/80 text-[#F7F4EF] hover:bg-[#D97706] hover:text-[#0F0D0B] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#D97706]">
                <span>{activeDishModal.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeDishModal.isVegetarian ? 'Vegetarian' : 'Chef’s Meat Selection'}</span>
                <span aria-hidden="true">·</span>
                <span>{activeDishModal.spiceLevel} Spice</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">{activeDishModal.prepTime}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">{activeDishModal.calories}</span>
              </div>

              <div className="flex items-baseline justify-between gap-4">
                <h3
                  id="dish-modal-title"
                  className="font-display text-3xl font-semibold text-[#F7F4EF]"
                >
                  {activeDishModal.name}
                </h3>
                <span className="font-mono-tabular text-xl font-semibold text-[#D97706]">
                  ${activeDishModal.price.toFixed(2)}
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#B8AFA6] leading-relaxed">
                {activeDishModal.description}
              </p>

              <div className="pt-3 border-t border-[#29231E] space-y-2">
                <div className="text-xs font-medium text-[#F7F4EF]">
                  Key Ingredients &amp; Provenance:
                </div>
                <div className="text-xs text-[#B8AFA6]">
                  {activeDishModal.ingredients.join(' · ')}
                </div>
                <div className="text-xs text-[#E5DEC9] pt-1">
                  Sommelier &amp; Chef Note: {activeDishModal.pairingNote}
                </div>
              </div>

              <div className="pt-4 border-t border-[#29231E] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveDishModal(null)}
                  className="px-4 py-2 text-xs font-medium text-[#B8AFA6] hover:text-[#F7F4EF] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addToCart({
                      id: activeDishModal.id,
                      name: activeDishModal.name,
                      price: activeDishModal.price,
                      image: activeDishModal.image,
                      note: `${activeDishModal.category} · ${activeDishModal.spiceLevel} Spice`,
                    });
                    setActiveDishModal(null);
                  }}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0F0D0B] bg-[#D97706] hover:bg-[#F59E0B] rounded-lg transition-colors cursor-pointer"
                >
                  Add to Order (${activeDishModal.price.toFixed(2)})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          INTERACTIVE GALLERY LIGHTBOX MODAL
      ===================================================================== */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="max-w-3xl w-full bg-[#171411] border border-[#3D332A] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full">
              <ResilientImage
                src={lightboxItem.image}
                alt={lightboxItem.title}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Close gallery lightbox"
                className="absolute top-4 right-4 p-2 rounded-full bg-[#0F0D0B]/85 text-[#F7F4EF] hover:bg-[#D97706] hover:text-[#0F0D0B] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#D97706] mb-1">
                  {lightboxItem.category} · {lightboxItem.locationNote}
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#F7F4EF]">
                  {lightboxItem.title}
                </h3>
                <p className="text-sm text-[#B8AFA6] mt-1">{lightboxItem.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="px-4 py-2 text-xs font-semibold text-[#0F0D0B] bg-[#D97706] rounded-lg shrink-0 self-start sm:self-center cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          INTERACTIVE CART & TAKEAWAY ORDER DRAWER
      ===================================================================== */}
      {isCartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Your Spice Garden Order Bag"
          className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#14110E] border-l border-[#29231E] h-full flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#29231E] flex items-center justify-between sticky top-0 bg-[#14110E]/95 backdrop-blur-md z-10">
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#F7F4EF]">
                  Your Culinary Order
                </h3>
                <p className="text-xs text-[#B8AFA6]">
                  Freshly prepared &amp; sealed in insulated copper-lined packaging
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close order drawer"
                className="p-2 text-[#B8AFA6] hover:text-[#F7F4EF] rounded-lg border border-[#29231E] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 flex-1 space-y-6">
              {confirmedOrderCode ? (
                <div className="bg-[#171411] border border-emerald-500/40 rounded-xl p-6 space-y-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-emerald-400 font-mono-tabular">
                    Order Confirmed · #{confirmedOrderCode}
                  </div>
                  <h4 className="font-display text-2xl font-semibold text-[#F7F4EF]">
                    Thank You, {checkoutCustomerName}!
                  </h4>
                  <p className="text-xs text-[#B8AFA6] leading-relaxed">
                    Our spice kitchen has received your order for{' '}
                    <strong className="text-[#F7F4EF]">
                      {orderType === 'pickup' ? 'Express Pickup' : 'Chauffeur Delivery'}
                    </strong>
                    . Estimated readiness: <span className="font-mono-tabular">25–30 minutes</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCart([]);
                      setConfirmedOrderCode(null);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-2.5 text-xs font-semibold text-[#0F0D0B] bg-[#D97706] rounded-lg cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <ShoppingBag className="w-10 h-10 text-[#D97706] mx-auto opacity-70" />
                  <p className="font-display text-2xl text-[#F7F4EF]">Your Order Bag is Empty</p>
                  <p className="text-xs text-[#B8AFA6]">
                    Explore our Menu or Special Offers to add signature biryanis, kebabs, and
                    artisanal desserts.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      scrollToSection('menu');
                    }}
                    className="px-5 py-2.5 text-xs font-semibold text-[#0F0D0B] bg-[#D97706] rounded-lg cursor-pointer"
                  >
                    Browse Signature Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Pickup vs Delivery Toggle */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#0F0D0B] border border-[#29231E] rounded-lg">
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        orderType === 'pickup'
                          ? 'bg-[#D97706] text-[#0F0D0B] font-semibold'
                          : 'text-[#B8AFA6] hover:text-[#F7F4EF]'
                      }`}
                    >
                      Restaurant Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        orderType === 'delivery'
                          ? 'bg-[#D97706] text-[#0F0D0B] font-semibold'
                          : 'text-[#B8AFA6] hover:text-[#F7F4EF]'
                      }`}
                    >
                      Direct Delivery
                    </button>
                  </div>

                  {/* Itemized List */}
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#171411] border border-[#29231E]"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <ResilientImage
                            src={item.image}
                            alt={item.name}
                            containerClassName="w-14 h-14 rounded-lg shrink-0"
                            className="w-full h-full object-cover"
                          />
                          <div className="min-w-0">
                            <h4 className="font-display text-lg font-semibold text-[#F7F4EF] truncate">
                              {item.name}
                            </h4>
                            {item.note && (
                              <p className="text-[11px] text-[#B8AFA6] truncate">{item.note}</p>
                            )}
                            <span className="font-mono-tabular text-xs text-[#D97706]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 bg-[#0F0D0B] border border-[#29231E] rounded-lg px-2 py-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                            className="p-1 text-[#B8AFA6] hover:text-[#F7F4EF] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono-tabular text-xs font-semibold px-1">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                            className="p-1 text-[#D97706] hover:text-[#F59E0B] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Verification Form */}
                  <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-3 pt-4 border-t border-[#29231E]">
                    <div className="text-xs font-medium text-[#F7F4EF]">
                      Guest Details for Kitchen Preparation
                    </div>
                    {orderFormError && (
                      <p className="text-xs text-red-300">{orderFormError}</p>
                    )}
                    <input
                      type="text"
                      required
                      value={checkoutCustomerName}
                      onChange={(e) => setCheckoutCustomerName(e.target.value)}
                      placeholder="Full Name *"
                      className="w-full px-3.5 py-2 text-xs bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] focus:outline-none focus:border-[#D97706]"
                    />
                    <input
                      type="tel"
                      required
                      value={checkoutCustomerPhone}
                      onChange={(e) => setCheckoutCustomerPhone(e.target.value)}
                      placeholder="Phone Number for Order Updates *"
                      className="w-full px-3.5 py-2 text-xs font-mono-tabular bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] focus:outline-none focus:border-[#D97706]"
                    />
                    {orderType === 'delivery' && (
                      <input
                        type="text"
                        required
                        value={checkoutAddress}
                        onChange={(e) => setCheckoutAddress(e.target.value)}
                        placeholder="Delivery Street Address & Suite *"
                        className="w-full px-3.5 py-2 text-xs bg-[#0F0D0B] border border-[#29231E] rounded-lg text-[#F7F4EF] focus:outline-none focus:border-[#D97706]"
                      />
                    )}
                  </form>
                </>
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && !confirmedOrderCode && (
              <div className="p-6 border-t border-[#29231E] bg-[#171411] space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#B8AFA6]">
                    <span>Subtotal</span>
                    <span className="font-mono-tabular">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#B8AFA6]">
                    <span>Packaging &amp; Heirloom Chutney Trio</span>
                    <span className="font-mono-tabular text-emerald-400">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-[#F7F4EF] pt-2 border-t border-[#29231E]">
                    <span>Total Due</span>
                    <span className="font-mono-tabular text-[#D97706]">
                      ${cartSubtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full py-3 px-5 text-sm font-semibold text-[#0F0D0B] bg-[#D97706] hover:bg-[#F59E0B] rounded-lg transition-colors cursor-pointer"
                >
                  Confirm Order (${cartSubtotal.toFixed(2)})
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
