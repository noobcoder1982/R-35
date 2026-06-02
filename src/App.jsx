import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

// Unified Film Catalog Database
// Easily extensible: To add a new movie, just append its details to this array!
const moviesCatalog = [
  {
    id: '01',
    title: 'AKIRA',
    director: 'KATSUHIRO OTOMO',
    year: '1988',
    spec1: '35MM REEL',
    spec2: 'JAPANESE RELEASE',
    price: '$219',
    poster: '/assets/akira_poster.jpg',
    gauge: '35MM FILMPRINT',
    ratio: '1.85:1 WIDESCREEN',
    audio: 'OPTICAL MONO (JAPANESE)',
    condition: 'ARCHIVAL GRADE A+',
    length: '10,200 FT (5 REELS)',
    synopsis: 'An archival-grade 35mm print of Katsuhiro Otomo\'s groundbreaking 1988 cyberpunk masterpiece. This copy features the original Japanese theatrical audio track and pristine color depth. Stored in a climate-controlled vault, it represents the absolute pinnacle of hand-drawn cel animation preservation.',
    vaultStatus: 'Safety Triacetate Base',
    inspectionDate: 'Dec 2025',
    nitrateStatus: 'Non-Flammable Safety Film',
    certificate: 'R-35 Archival Cert Included',
    cropPosition: 'center 28%'
  },
  {
    id: '02',
    title: 'ALIEN',
    director: 'RIDLEY SCOTT',
    year: '1979',
    spec1: '35MM REEL',
    spec2: 'US THEATRICAL CUT',
    price: '$249',
    poster: '/assets/alien_poster.png',
    gauge: '35MM FILMPRINT',
    ratio: '2.39:1 ANAMORPHIC',
    audio: 'OPTICAL DOLBY STEREO',
    condition: 'EXCELLENT GRADE A',
    length: '10,500 FT (6 REELS)',
    synopsis: 'A rare 1979 theatrical print of Ridley Scott\'s sci-fi horror masterpiece. This cellulose triacetate safety film contains the iconic US theatrical cut with an optical Dolby Stereo soundtrack. Minor cosmetic wear consistent with standard projection, overall outstanding contrast.',
    vaultStatus: 'Cellulose Triacetate Base',
    inspectionDate: 'Jan 2026',
    nitrateStatus: 'Non-Flammable Safety Film',
    certificate: 'R-35 Archival Cert Included',
    cropPosition: 'center 42%'
  },
  {
    id: '03',
    title: '2001: A SPACE ODYSSEY',
    director: 'STANLEY KUBRICK',
    year: '1968',
    spec1: '35MM REEL',
    spec2: 'US THEATRICAL CUT',
    price: '$299',
    poster: '/assets/space_odyssey_poster.jpg',
    gauge: '35MM FILMPRINT',
    ratio: '2.20:1 SUPER PANAVISION',
    audio: 'OPTICAL 6-CH SURROUND',
    condition: 'ARCHIVAL GRADE A+',
    length: '12,400 FT (7 REELS)',
    synopsis: 'Stanley Kubrick\'s visionary science fiction magnum opus from 1968. This exceptional 35mm copy is pulled from the legendary Metro-Goldwyn-Mayer vaults, retaining its original cinematic density and Todd-AO color timing. An essential artifact of filmmaking history.',
    vaultStatus: 'Estar Polyester Base',
    inspectionDate: 'Feb 2026',
    nitrateStatus: 'Non-Flammable Polyester Base',
    certificate: 'R-35 Archival Cert Included',
    cropPosition: 'center 35%'
  },
  {
    id: '04',
    title: 'THE SEVENTH SEAL',
    director: 'INGMAR BERGMAN',
    year: '1957',
    spec1: '35MM REEL',
    spec2: 'ORIGINAL RELEASE',
    price: '$189',
    poster: '/assets/seventh_seal_poster.png',
    gauge: '35MM FILMPRINT',
    ratio: '1.37:1 ACADEMY RATIO',
    audio: 'OPTICAL MONO (SWEDISH)',
    condition: 'FINE GRADE B+',
    length: '8,600 FT (4 REELS)',
    synopsis: 'Ingmar Bergman\'s profound 1957 Swedish classic. Stored in pristine condition, this original Swedish-release print exhibits excellent contrast ratios and a clean optical soundtrack. The ultimate piece of European art-house cinema history.',
    vaultStatus: 'Cellulose Triacetate Base',
    inspectionDate: 'Mar 2026',
    nitrateStatus: 'Non-Flammable Safety Film',
    certificate: 'R-35 Archival Cert Included',
    cropPosition: 'center 35%'
  },
  {
    id: '05',
    title: 'CASABLANCA',
    director: 'MICHAEL CURTIZ',
    year: '1942',
    spec1: '35MM REEL',
    spec2: 'ORIGINAL RELEASE',
    price: '$199',
    poster: '/assets/casablanca_poster.png',
    gauge: '35MM FILMPRINT',
    ratio: '1.37:1 ACADEMY RATIO',
    audio: 'OPTICAL MONO (ENGLISH)',
    condition: 'EXCELLENT GRADE A',
    length: '9,200 FT (5 REELS)',
    synopsis: 'Humphrey Bogart and Ingrid Bergman star in Michael Curtiz\'s legendary 1942 classic. This fine archival safety print exhibits rich monochrome tones, capturing the legendary cinematography in its original glorious Academy ratio. Fully verified safety base.',
    vaultStatus: 'Safety Triacetate Base',
    inspectionDate: 'Apr 2026',
    nitrateStatus: 'Non-Flammable Safety Film',
    certificate: 'R-35 Archival Cert Included',
    cropPosition: 'center 46%'
  },
  {
    id: '06',
    title: 'GONE WITH THE WIND',
    director: 'VICTOR FLEMING',
    year: '1939',
    spec1: '35MM REEL',
    spec2: 'ORIGINAL RELEASE',
    price: '$249',
    poster: '/assets/gone_wind_poster.png',
    gauge: '35MM FILMPRINT',
    ratio: '1.37:1 ACADEMY RATIO',
    audio: 'OPTICAL MONO (ENGLISH)',
    condition: 'FINE GRADE B+',
    length: '20,100 FT (11 REELS)',
    synopsis: 'A monumental print of Victor Fleming\'s 1939 Technicolor epic. While showing natural historical grain, this cellulose print has been carefully cleaned to preserve the vivid color saturation and dramatic contrast of the original three-strip Technicolor prints.',
    vaultStatus: 'Safety Triacetate Base',
    inspectionDate: 'May 2026',
    nitrateStatus: 'Non-Flammable Safety Film',
    certificate: 'R-35 Archival Cert Included',
    cropPosition: 'center 16%'
  },
  {
    id: '07',
    title: 'ONCE UPON A TIME IN THE WEST',
    director: 'SERGIO LEONE',
    year: '1968',
    spec1: '35MM REEL',
    spec2: 'ORIGINAL RELEASE',
    price: '$299',
    poster: '/assets/once_west_poster.png',
    gauge: '35MM FILMPRINT',
    ratio: '2.35:1 ANAMORPHIC',
    audio: 'OPTICAL STEREO (ENGLISH)',
    condition: 'ARCHIVAL GRADE A+',
    length: '15,200 FT (8 REELS)',
    synopsis: 'Sergio Leone\'s grand operatic 1968 western print. Features Leone\'s signature extreme close-ups in immaculate widescreen framing. Original Italian release print with an optical stereo audio track, displaying beautiful Techniscope density.',
    vaultStatus: 'Safety Triacetate Base',
    inspectionDate: 'Jun 2026',
    nitrateStatus: 'Non-Flammable Safety Film',
    certificate: 'R-35 Archival Cert Included',
    cropPosition: 'center 38%'
  },
  {
    id: '08',
    title: 'THE SEARCHERS',
    director: 'JOHN FORD',
    year: '1956',
    spec1: '35MM REEL',
    spec2: 'ORIGINAL RELEASE',
    price: '$199',
    poster: '/assets/the_searchers_poster.png',
    gauge: '35MM FILMPRINT',
    ratio: '1.96:1 VistaVision',
    audio: 'OPTICAL MONO (ENGLISH)',
    condition: 'EXCELLENT GRADE A',
    length: '10,800 FT (6 REELS)',
    synopsis: 'John Ford\'s stunningly photographed 1956 cinematic milestone. The print captures the breathtaking VistaVision landscape of Monument Valley with rich depth and clarity. Kept in climate-controlled vault storage at 40°F.',
    vaultStatus: 'Safety Triacetate Base',
    inspectionDate: 'Jul 2026',
    nitrateStatus: 'Non-Flammable Safety Film',
    certificate: 'R-35 Archival Cert Included',
    cropPosition: 'center 26%'
  },
  {
    id: '09',
    title: 'RIO BRAVO',
    director: 'HOWARD HAWKS',
    year: '1959',
    spec1: '35MM REEL',
    spec2: 'ORIGINAL RELEASE',
    price: '$179',
    poster: '/assets/rio_bravo_poster.png',
    gauge: '35MM FILMPRINT',
    ratio: '1.85:1 WIDESCREEN',
    audio: 'OPTICAL MONO (ENGLISH)',
    condition: 'FINE GRADE B+',
    length: '12,700 FT (7 REELS)',
    synopsis: 'Howard Hawks\' beautifully paced 1959 western. An authentic theatrical release copy featuring John Wayne. Clear mono soundtrack, excellent stability, and zero sprocket damage.',
    vaultStatus: 'Safety Triacetate Base',
    inspectionDate: 'Aug 2026',
    nitrateStatus: 'Non-Flammable Safety Film',
    certificate: 'R-35 Archival Cert Included',
    cropPosition: 'center 46%'
  },
  {
    id: '10',
    title: 'STAGECOACH',
    director: 'JOHN FORD',
    year: '1939',
    spec1: '35MM REEL',
    spec2: 'ORIGINAL RELEASE',
    price: '$179',
    poster: '/assets/stagecoach_poster.png',
    gauge: '35MM FILMPRINT',
    ratio: '1.37:1 ACADEMY RATIO',
    audio: 'OPTICAL MONO (ENGLISH)',
    condition: 'FINE GRADE B+',
    length: '8,700 FT (4 REELS)',
    synopsis: 'The legendary 1939 film that redefined the Western genre. This rare archival print preserves John Ford\'s stark black-and-white shadows and deep focus compositions with stunning precision. Triacetate safety base.',
    vaultStatus: 'Safety Triacetate Base',
    inspectionDate: 'Sep 2026',
    nitrateStatus: 'Non-Flammable Safety Film',
    certificate: 'R-35 Archival Cert Included',
    cropPosition: 'center 35%'
  },
  {
    id: '11',
    title: 'THE GOOD THE BAD AND THE UGLY',
    director: 'SERGIO LEONE',
    year: '1966',
    spec1: '35MM REEL',
    spec2: 'ORIGINAL RELEASE',
    price: '$299',
    poster: '/assets/good_bad_ugly_poster.png',
    gauge: '35MM FILMPRINT',
    ratio: '2.35:1 ANAMORPHIC',
    audio: 'OPTICAL STEREO (ENGLISH)',
    condition: 'ARCHIVAL GRADE A+',
    length: '16,100 FT (9 REELS)',
    synopsis: 'Sergio Leone\'s 1966 epic spaghetti western masterpiece. This complete 35mm reel set is exceptionally rare, featuring the iconic Ennio Morricone soundtrack in crisp optical stereo. Minimal projection lines, rich saturated color print.',
    vaultStatus: 'Safety Triacetate Base',
    inspectionDate: 'Oct 2026',
    nitrateStatus: 'Non-Flammable Safety Film',
    certificate: 'R-35 Archival Cert Included',
    cropPosition: 'center 82%'
  },
  {
    id: '12',
    title: 'A FISTFUL OF DOLLARS',
    director: 'SERGIO LEONE',
    year: '1964',
    spec1: '35MM REEL',
    spec2: 'ORIGINAL RELEASE',
    price: '$199',
    poster: '/assets/fistful_dollars_poster.png',
    gauge: '35MM FILMPRINT',
    ratio: '2.35:1 ANAMORPHIC',
    audio: 'OPTICAL MONO (ENGLISH)',
    condition: 'EXCELLENT GRADE A',
    length: '9,100 FT (5 REELS)',
    synopsis: 'The 1964 classic that launched Clint Eastwood into international stardom. This original release print features excellent black levels and superb audio fidelity. Hand-inspected by R-35 technicians in 2026.',
    vaultStatus: 'Safety Triacetate Base',
    inspectionDate: 'Nov 2026',
    nitrateStatus: 'Non-Flammable Safety Film',
    certificate: 'R-35 Archival Cert Included',
  }
];

const filmmakersList = [
  {
    name: 'JOHN FORD',
    works: ['The Searchers', 'Stagecoach', 'Rio Bravo'],
    reels: 24
  },
  {
    name: 'SERGIO LEONE',
    works: ['Once Upon a Time in the West', 'The Good, the Bad and the Ugly', 'A Fistful of Dollars'],
    reels: 18
  },
  {
    name: 'MICHAEL CURTIZ',
    works: ['Casablanca'],
    reels: 6
  },
  {
    name: 'VICTOR FLEMING',
    works: ['Gone with the Wind'],
    reels: 5
  },
  {
    name: 'STANLEY KUBRICK',
    works: ['2001: A Space Odyssey'],
    reels: 12
  },
  {
    name: 'RIDLEY SCOTT',
    works: ['Alien', 'Blade Runner', 'Gladiator'],
    reels: 15
  },
  {
    name: 'AKIRA KUROSAWA',
    works: ['Seven Samurai', 'Rashomon', 'Yojimbo'],
    reels: 11
  },
  {
    name: 'INGMAR BERGMAN',
    works: ['The Seventh Seal', 'Wild Strawberries', 'Persona'],
    reels: 9
  }
];

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('r35_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartActive, setIsCartActive] = useState(false);
  const [activeNav, setActiveNav] = useState('HOME');
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [isPreloaderExiting, setIsPreloaderExiting] = useState(false);
  const [preloaderStatus, setPreloaderStatus] = useState('VAULT // SYSTEM BOOTING');
  const [preloaderPercent, setPreloaderPercent] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isProductActive, setIsProductActive] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ── Auth and Profile states ──
  const [user, setUser] = useState(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [authFullName, setAuthFullName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [isAuthWarningOpen, setIsAuthWarningOpen] = useState(false);
  const [isPricingYearly, setIsPricingYearly] = useState(false);

  // ── Wishlist, Search, and Dropdown states ──
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('r35_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isWishlistActive, setIsWishlistActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // ── High-Fidelity Custom Profile states ──
  const [activePlan, setActivePlan] = useState(() => {
    return localStorage.getItem('r35_active_plan') || 'None';
  });
  const [userFullName, setUserFullName] = useState(() => {
    return localStorage.getItem('r35_user_fullname') || 'Yash Patel';
  });
  const [userPhone, setUserPhone] = useState(() => {
    return localStorage.getItem('r35_user_phone') || '+91 98765 43210';
  });
  const [userDob, setUserDob] = useState(() => {
    return localStorage.getItem('r35_user_dob') || '12 March 1998';
  });
  const [memberSince, setMemberSince] = useState(() => {
    return localStorage.getItem('r35_member_since') || 'May 2024';
  });
  
  // Shipping Address states
  const [shipFullName, setShipFullName] = useState(() => {
    return localStorage.getItem('r35_ship_name') || 'Yash Patel';
  });
  const [shipStreet, setShipStreet] = useState(() => {
    return localStorage.getItem('r35_ship_street') || '123 Film Street, Andheri West';
  });
  const [shipCity, setShipCity] = useState(() => {
    return localStorage.getItem('r35_ship_city') || 'Mumbai';
  });
  const [shipState, setShipState] = useState(() => {
    return localStorage.getItem('r35_ship_state') || 'Maharashtra';
  });
  const [shipZip, setShipZip] = useState(() => {
    return localStorage.getItem('r35_ship_zip') || '400053';
  });
  const [shipCountry, setShipCountry] = useState(() => {
    return localStorage.getItem('r35_ship_country') || 'India';
  });
  const [shipPhone, setShipPhone] = useState(() => {
    return localStorage.getItem('r35_ship_phone') || '+91 98765 43210';
  });

  // Edit / Action Mode toggles
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Settings Console States
  const [consoleTheme, setConsoleTheme] = useState(() => {
    return localStorage.getItem('r35_console_theme') || 'red';
  });
  const [skipPreloader, setSkipPreloader] = useState(() => {
    return localStorage.getItem('r35_skip_preloader') === 'true';
  });
  const [alertSound, setAlertSound] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [catalogAlerts, setCatalogAlerts] = useState(true);

  // ── Onboarding state hooks ──
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [tempOnboardName, setTempOnboardName] = useState('');
  const [tempOnboardPhone, setTempOnboardPhone] = useState('');
  const [tempOnboardStreet, setTempOnboardStreet] = useState('');
  const [tempOnboardCity, setTempOnboardCity] = useState('');
  const [tempOnboardState, setTempOnboardState] = useState('');
  const [tempOnboardZip, setTempOnboardZip] = useState('');
  const [tempOnboardCountry, setTempOnboardCountry] = useState('');

  // Watch user session to trigger onboarding modal
  useEffect(() => {
    if (user) {
      const onboarded = localStorage.getItem('r35_onboarded_' + user.id);
      if (!onboarded) {
        setShowOnboarding(true);
      }
    } else {
      setShowOnboarding(false);
    }
  }, [user]);

  // Load user specific keys when session changes
  useEffect(() => {
    if (user) {
      const storedName = localStorage.getItem('r35_user_fullname_' + user.id);
      const storedPhone = localStorage.getItem('r35_user_phone_' + user.id);
      const storedDob = localStorage.getItem('r35_user_dob_' + user.id);
      const storedSince = localStorage.getItem('r35_member_since_' + user.id);
      const storedPlan = localStorage.getItem('r35_active_plan_' + user.id);
      
      const storedShipName = localStorage.getItem('r35_ship_name_' + user.id);
      const storedShipStreet = localStorage.getItem('r35_ship_street_' + user.id);
      const storedShipCity = localStorage.getItem('r35_ship_city_' + user.id);
      const storedShipState = localStorage.getItem('r35_ship_state_' + user.id);
      const storedShipZip = localStorage.getItem('r35_ship_zip_' + user.id);
      const storedShipCountry = localStorage.getItem('r35_ship_country_' + user.id);
      const storedShipPhone = localStorage.getItem('r35_ship_phone_' + user.id);

      setUserFullName(storedName || 'Yash Patel');
      setUserPhone(storedPhone || '+91 98765 43210');
      setUserDob(storedDob || '12 March 1998');
      setMemberSince(storedSince || 'May 2024');
      setActivePlan(storedPlan || 'None');
      
      setShipFullName(storedShipName || storedName || 'Yash Patel');
      setShipStreet(storedShipStreet || '123 Film Street, Andheri West');
      setShipCity(storedShipCity || 'Mumbai');
      setShipState(storedShipState || 'Maharashtra');
      setShipZip(storedShipZip || '400053');
      setShipCountry(storedShipCountry || 'India');
      setShipPhone(storedShipPhone || storedPhone || '+91 98765 43210');
    } else {
      setUserFullName('Yash Patel');
      setUserPhone('+91 98765 43210');
      setUserDob('12 March 1998');
      setMemberSince('May 2024');
      setActivePlan('None');
      
      setShipFullName('Yash Patel');
      setShipStreet('123 Film Street, Andheri West');
      setShipCity('Mumbai');
      setShipState('Maharashtra');
      setShipZip('400053');
      setShipCountry('India');
      setShipPhone('+91 98765 43210');
    }
  }, [user]);

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    setUserFullName(tempOnboardName);
    setUserPhone(tempOnboardPhone);
    setShipFullName(tempOnboardName);
    setShipStreet(tempOnboardStreet);
    setShipCity(tempOnboardCity);
    setShipState(tempOnboardState);
    setShipZip(tempOnboardZip);
    setShipCountry(tempOnboardCountry);
    setShipPhone(tempOnboardPhone);
    
    const registryMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    setMemberSince(registryMonthYear);

    localStorage.setItem('r35_user_fullname_' + user.id, tempOnboardName);
    localStorage.setItem('r35_user_phone_' + user.id, tempOnboardPhone);
    localStorage.setItem('r35_user_dob_' + user.id, '12 March 1998');
    localStorage.setItem('r35_member_since_' + user.id, registryMonthYear);
    
    localStorage.setItem('r35_ship_name_' + user.id, tempOnboardName);
    localStorage.setItem('r35_ship_street_' + user.id, tempOnboardStreet);
    localStorage.setItem('r35_ship_city_' + user.id, tempOnboardCity);
    localStorage.setItem('r35_ship_state_' + user.id, tempOnboardState);
    localStorage.setItem('r35_ship_zip_' + user.id, tempOnboardZip);
    localStorage.setItem('r35_ship_country_' + user.id, tempOnboardCountry);
    localStorage.setItem('r35_ship_phone_' + user.id, tempOnboardPhone);
    
    localStorage.setItem('r35_onboarded_' + user.id, 'true');

    setShowOnboarding(false);
    alert("Archivist details encrypted and onboarded successfully! Welcome to the vault.");
  };

  // Effect to apply dynamic theme accent colors
  useEffect(() => {
    document.body.className = '';
    if (consoleTheme === 'amber') {
      document.body.classList.add('accent-theme-amber');
    } else if (consoleTheme === 'green') {
      document.body.classList.add('accent-theme-green');
    } else if (consoleTheme === 'blue') {
      document.body.classList.add('accent-theme-blue');
    }
  }, [consoleTheme]);

  useEffect(() => {
    try {
      localStorage.setItem('r35_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {
      // Ignore
    }
  }, [wishlistItems]);

  const handleToggleWishlist = (movie) => {
    if (!user) {
      setIsAuthWarningOpen(true);
      return;
    }
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === movie.id);
      if (exists) {
        return prev.filter(item => item.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user && (activeNav === 'PROFILE' || activeNav === 'VAULT-ID')) {
      supabase.from('orders')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (data) setUserOrders(data);
        });
    }
  }, [user, activeNav]);

  // ── Checkout multi-step flow state ──
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCheckoutActive, setIsCheckoutActive] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1=billing 2=payment 3=confirm
  const [orderRef, setOrderRef] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard'); // standard | express
  const [billingInfo, setBillingInfo] = useState({
    fullName: '', email: '', phone: '', country: '', address: '', apt: '', city: '', state: '', zip: '', sameAddress: true
  });
  const [cardInfo, setCardInfo] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: ''
  });
  const [orderedItems, setOrderedItems] = useState([]); // snapshot at order placement
  const [moviesList, setMoviesList] = useState(moviesCatalog);
  const [filmmakers, setFilmmakers] = useState(filmmakersList);

  useEffect(() => {
    async function loadDatabase() {
      try {
        const { data: mv, error: mvErr } = await supabase.from('movies').select('*');
        const { data: fm, error: fmErr } = await supabase.from('filmmakers').select('*');
        if (mvErr) console.error("Error loading movies:", mvErr);
        if (fmErr) console.error("Error loading filmmakers:", fmErr);
        if (mv && mv.length > 0) {
          const sortedMv = [...mv].sort((a, b) => {
            const idA = parseInt(a.id, 10) || 0;
            const idB = parseInt(b.id, 10) || 0;
            return idA - idB;
          });
          setMoviesList(sortedMv);
        }
        if (fm && fm.length > 0) {
          setFilmmakers(fm);
        }
      } catch (e) {
        console.warn("Vault offline. Loading static elements...", e);
      }
    }
    loadDatabase();
  }, []);

  // ── Mobile bespoke interface state ──
  const [isMobile, setIsMobile] = useState(false);
  const [directorFilter, setDirectorFilter] = useState(null);
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);
  const [isVaultAlertMode, setIsVaultAlertMode] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Synchronise cartCount with cartItems quantity sum
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('r35_cart', JSON.stringify(cartItems));
    } catch (e) {
      // storage full or unavailable — silently ignore
    }
  }, [cartItems]);

  // Sync isCartActive for slide transitions
  useEffect(() => {
    if (isCartOpen) {
      setTimeout(() => { setIsCartActive(true); }, 20);
    } else {
      setIsCartActive(false);
    }
  }, [isCartOpen]);

  // Sync isWishlistActive for slide transitions
  useEffect(() => {
    if (isWishlistOpen) {
      setTimeout(() => { setIsWishlistActive(true); }, 20);
    } else {
      setIsWishlistActive(false);
    }
  }, [isWishlistOpen]);

  // Sync isCheckoutActive for slide transitions
  useEffect(() => {
    if (isCheckoutOpen) {
      setTimeout(() => { setIsCheckoutActive(true); }, 20);
    } else {
      setIsCheckoutActive(false);
    }
  }, [isCheckoutOpen]);

  // Open checkout from cart
  const openCheckout = () => {
    setIsCartOpen(false);
    setCheckoutStep(1);
    setTimeout(() => { setIsCheckoutOpen(true); }, 350);
  };

  // Close checkout entirely
  const closeCheckout = () => {
    setIsCheckoutActive(false);
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setCheckoutStep(1);
    }, 650);
  };

  // Handlers for cart controls
  const handleIncreaseQty = (id) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleDecreaseQty = (id) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity - 1) };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Split movie database into Home and Collections sets
  const homeMovies = moviesList.slice(0, 4);
  const collectionMovies = moviesList.slice(4, 12);

  useEffect(() => {
    if (skipPreloader) {
      setIsPreloaderActive(false);
      setIsPreloaderExiting(true);
      return;
    }
    // Dynamic status text ticker for high-fidelity brutalist preloader
    const timer1 = setTimeout(() => setPreloaderStatus('SCANNING NITRATE STORAGE BASE...'), 350);
    const timer2 = setTimeout(() => setPreloaderStatus('DECRYPTING CELLULOID ARCHIVES...'), 750);
    const timer3 = setTimeout(() => setPreloaderStatus('VAULT ONLINE // REELS SECURED'), 1150);
    const timer4 = setTimeout(() => setPreloaderStatus('ENGAGING CURTAIN REVEAL...'), 1350);

    // Dynamic percentage counter loading meter
    const pctInterval = setInterval(() => {
      setPreloaderPercent(prev => {
        if (prev >= 100) {
          clearInterval(pctInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    // Curtains split at 1400ms
    const exitTimer = setTimeout(() => {
      setIsPreloaderExiting(true);
    }, 1400);

    // Completely unmount preloader at 2200ms
    const removeTimer = setTimeout(() => {
      setIsPreloaderActive(false);
    }, 2200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(pctInterval);
    };
  }, []);

  // Safe navigation handler that closes any open product page and cart overlay
  const handleNavClick = (item) => {
    setIsProductActive(false);
    setSelectedMovie(null);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsMobileMenuOpen(false);
    setActiveNav(item);
  };

  // Triggers slide-up entering transition
  const openProductPage = (movie) => {
    setSelectedMovie(movie);
    setTimeout(() => {
      setIsProductActive(true);
    }, 20);
  };

  // Triggers slide-down exiting transition and unmounts after 600ms
  const closeProductPage = () => {
    setIsProductActive(false);
    setTimeout(() => {
      setSelectedMovie(null);
    }, 600);
  };

  // Add to cart with micro-animation
  const handleAddToCart = (movie) => {
    if (!user) {
      setIsAuthWarningOpen(true);
      return;
    }
    setCartItems(prev => {
      const existing = prev.find(item => item.title === movie.title);
      if (existing) {
        return prev.map(item => item.title === movie.title ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [
        ...prev,
        {
          id: movie.id,
          title: movie.title,
          director: movie.director,
          year: movie.year,
          gauge: movie.gauge || '35MM FILMPRINT',
          spec2: movie.spec2 || 'ORIGINAL RELEASE',
          price: movie.price,
          quantity: 1
        }
      ];
    });

    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1800);
  };

  // Calculate pricing metrics
  const subtotal = cartItems.reduce((sum, item) => {
    const p = parseFloat(item.price.replace('$', ''));
    return sum + p * item.quantity;
  }, 0);
  const shipping = cartItems.length === 0 ? 0 : 45.00;
  const total = subtotal + shipping;

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      if (isSignUpMode) {
        if (authPassword !== authConfirmPassword) {
          throw new Error("Passwords do not match!");
        }
        const { data, error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            data: {
              full_name: authFullName,
            }
          }
        });
        if (error) throw error;
        alert('Authentication keys registered! Please check your email inbox to verify your account session.');
        setIsSignUpMode(false);
        setAuthFullName('');
        setAuthPassword('');
        setAuthConfirmPassword('');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
        handleNavClick('PROFILE');
        setAuthPassword('');
      }
    } catch (err) {
      setAuthError(err.message || 'System decryption error.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserOrders([]);
    handleNavClick('HOME');
  };

  const renderAuth = () => {
    return (
      <div className="auth-pane-container">
        <div className="auth-console-box">
          <div className="console-tab-bar">
            <button 
              className={`console-tab ${!isSignUpMode ? 'active' : ''}`}
              onClick={() => { setIsSignUpMode(false); setAuthError(''); }}
            >
              SIGN IN
            </button>
            <button 
              className={`console-tab ${isSignUpMode ? 'active' : ''}`}
              onClick={() => { setIsSignUpMode(true); setAuthError(''); }}
            >
              SIGN UP
            </button>
          </div>

          {authError && (
            <div className="console-error-banner">
              <span className="error-icon">⚠️</span>
              <span className="error-text">{authError}</span>
            </div>
          )}

          {!isSignUpMode ? (
            /* ==========================================
               SIGN IN VIEW (MATCHING DESIGN INSPIRATION)
               ========================================== */
            <form className="console-auth-form" onSubmit={handleAuthSubmit}>
              <div className="console-form-group">
                <label className="console-label">EMAIL</label>
                <input 
                  type="email" 
                  className="console-input" 
                  placeholder="enter your email" 
                  value={authEmail} 
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required 
                />
              </div>
              
              <div className="console-form-group">
                <label className="console-label">PASSWORD</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="console-input" 
                    placeholder="enter your password" 
                    value={authPassword} 
                    onChange={(e) => setAuthPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button" 
                    className="password-toggle-eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <div className="form-utils-row">
                <label className="checkbox-container">
                  <input type="checkbox" className="console-checkbox" />
                  <span className="checkbox-label">REMEMBER ME</span>
                </label>
                <a href="#forgot" className="forgot-password-link" onClick={(e) => { e.preventDefault(); alert("Auth key recovery terminal engaged. System notification transmitted."); }}>
                  FORGOT PASSWORD?
                </a>
              </div>
              
              <button type="submit" className="console-submit-btn" disabled={authLoading}>
                {authLoading ? 'DECRYPTING SEGMENT...' : 'SIGN IN'}
              </button>

              <div className="console-divider-or">
                <span className="divider-line" />
                <span className="divider-text">OR</span>
                <span className="divider-line" />
              </div>

              <button 
                type="button" 
                className="console-google-btn"
                onClick={async () => {
                  setAuthLoading(true);
                  try {
                    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
                    if (error) throw error;
                  } catch (err) {
                    setAuthError(err.message || 'OAuth verification failed.');
                  } finally {
                    setAuthLoading(false);
                  }
                }}
              >
                <span className="google-icon-svg">G</span>
                <span className="google-btn-text">CONTINUE WITH GOOGLE</span>
              </button>
            </form>
          ) : (
            /* ==========================================
               SIGN UP VIEW (MATCHING DESIGN INSPIRATION)
               ========================================== */
            <form className="console-auth-form" onSubmit={handleAuthSubmit}>

              <div className="console-form-group">
                <label className="console-label">EMAIL</label>
                <input 
                  type="email" 
                  className="console-input" 
                  placeholder="enter your email" 
                  value={authEmail} 
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required 
                />
              </div>
              
              <div className="console-form-group">
                <label className="console-label">PASSWORD</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showSignUpPassword ? "text" : "password"} 
                    className="console-input" 
                    placeholder="create a password" 
                    value={authPassword} 
                    onChange={(e) => setAuthPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button" 
                    className="password-toggle-eye"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                  >
                    {showSignUpPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <div className="console-form-group">
                <label className="console-label">CONFIRM PASSWORD</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showSignUpConfirmPassword ? "text" : "password"} 
                    className="console-input" 
                    placeholder="confirm your password" 
                    value={authConfirmPassword} 
                    onChange={(e) => setAuthConfirmPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button" 
                    className="password-toggle-eye"
                    onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}
                  >
                    {showSignUpConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <div className="form-utils-row">
                <label className="checkbox-container">
                  <input type="checkbox" className="console-checkbox" required />
                  <span className="checkbox-label">
                    I AGREE TO THE <span className="highlight-red">TERMS & PRIVACY POLICY</span>
                  </span>
                </label>
              </div>
              
              <button type="submit" className="console-submit-btn" disabled={authLoading}>
                {authLoading ? 'CREATING KEYS...' : 'CREATE ACCOUNT'}
              </button>

              <div className="console-divider-or">
                <span className="divider-line" />
                <span className="divider-text">OR</span>
                <span className="divider-line" />
              </div>

              <button 
                type="button" 
                className="console-google-btn"
                onClick={async () => {
                  setAuthLoading(true);
                  try {
                    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
                    if (error) throw error;
                  } catch (err) {
                    setAuthError(err.message || 'OAuth verification failed.');
                  } finally {
                    setAuthLoading(false);
                  }
                }}
              >
                <span className="google-icon-svg">G</span>
                <span className="google-btn-text">SIGN UP WITH GOOGLE</span>
              </button>
            </form>
          )}

          <div className="auth-footer-agreement">
            By continuing, you agree to our <span className="highlight-red">Terms of Service</span> and <span className="highlight-red">Privacy Policy</span>.
          </div>
        </div>
      </div>
    );
  };

  const handleDeleteAccount = async () => {
    if (user) {
      // 1. Call the secure RPC function to delete the auth user record from Supabase
      try {
        const { error: rpcError } = await supabase.rpc('delete_current_user');
        if (rpcError) {
          console.error("RPC account deletion failed:", rpcError);
          alert("Vault account purge aborted: The 'delete_current_user' SQL function is missing in your Supabase project.\n\nPlease go to your Supabase Dashboard > SQL Editor, execute the SQL script provided, and try again!");
          return;
        }
      } catch (e) {
        console.warn("RPC account deletion exception:", e);
        alert("An error occurred during account deletion: " + (e.message || e));
        return;
      }

      // 2. Delete user orders from the database
      try {
        const { error } = await supabase.from('orders').delete().eq('email', user.email);
        if (error) console.error("Database orders purge failed:", error);
      } catch (e) {
        console.warn("Database purge exception:", e);
      }
      
      // 2. Clear all user-specific localStorage entries
      const userId = user.id;
      localStorage.removeItem('r35_user_fullname_' + userId);
      localStorage.removeItem('r35_user_phone_' + userId);
      localStorage.removeItem('r35_user_dob_' + userId);
      localStorage.removeItem('r35_member_since_' + userId);
      localStorage.removeItem('r35_active_plan_' + userId);
      localStorage.removeItem('r35_ship_name_' + userId);
      localStorage.removeItem('r35_ship_street_' + userId);
      localStorage.removeItem('r35_ship_city_' + userId);
      localStorage.removeItem('r35_ship_state_' + userId);
      localStorage.removeItem('r35_ship_zip_' + userId);
      localStorage.removeItem('r35_ship_country_' + userId);
      localStorage.removeItem('r35_ship_phone_' + userId);
      localStorage.removeItem('r35_onboarded_' + userId);
    }

    // 3. Wiping generic spectator local storage keys
    localStorage.removeItem('r35_active_plan');
    localStorage.removeItem('r35_user_fullname');
    localStorage.removeItem('r35_user_phone');
    localStorage.removeItem('r35_user_dob');
    localStorage.removeItem('r35_member_since');
    localStorage.removeItem('r35_ship_name');
    localStorage.removeItem('r35_ship_street');
    localStorage.removeItem('r35_ship_city');
    localStorage.removeItem('r35_ship_state');
    localStorage.removeItem('r35_ship_zip');
    localStorage.removeItem('r35_ship_country');
    localStorage.removeItem('r35_ship_phone');
    localStorage.removeItem('r35_cart');
    localStorage.removeItem('r35_wishlist');
    
    // 4. Sign out auth session
    await supabase.auth.signOut();
    setUser(null);
    setUserOrders([]);

    // 5. Reset state to initial SPECTATOR values
    setActivePlan('None');
    setUserFullName('Yash Patel');
    setUserPhone('+91 98765 43210');
    setUserDob('12 March 1998');
    setShipFullName('Yash Patel');
    setShipStreet('123 Film Street, Andheri West');
    setShipCity('Mumbai');
    setShipState('Maharashtra');
    setShipZip('400053');
    setShipCountry('India');
    setShipPhone('+91 98765 43210');
    setCartItems([]);
    setWishlistItems([]);
    setIsDeleteModalOpen(false);
    alert("Operator Session and Vault access key successfully destroyed. Redirecting to SPECTATOR terminal.");
    handleNavClick('HOME');
  };

  const renderProfile = () => {
    // Gather movies bought ever on this account from userOrders
    const boughtMovies = [];
    userOrders.forEach((order) => {
      if (order.ordered_items && Array.isArray(order.ordered_items)) {
        order.ordered_items.forEach((item) => {
          // Look up full movie details from moviesCatalog to get its poster
          const catalogMovie = moviesList.find(
            (m) => m.title.toUpperCase() === item.title.toUpperCase() || m.id === item.id
          );
          
          boughtMovies.push({
            id: `${order.id}-${item.id}`,
            title: item.title,
            reference: `Order #${order.order_reference}`,
            date: `Delivered on ${new Date(order.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}`,
            price: item.price || '$249.00',
            poster: catalogMovie?.poster || '/assets/vintage_film_reel.png',
          });
        });
      }
    });

    // Seed/Fallback orders are high-fidelity movies instead of physical gear
    const displayOrders = boughtMovies.length > 0 ? boughtMovies.slice(0, 3) : [
      { id: 'seed-01', title: 'AKIRA', reference: 'Order #R35-1024', date: 'Delivered on May 20, 2024', price: '₹49,999', status: 'Delivered', poster: '/assets/akira_poster.jpg' },
      { id: 'seed-02', title: 'ALIEN', reference: 'Order #R35-0987', date: 'Delivered on May 15, 2024', price: '₹18,999', status: 'Delivered', poster: '/assets/alien_poster.png' },
      { id: 'seed-03', title: '2001: A SPACE ODYSSEY', reference: 'Order #R35-0956', date: 'Delivered on May 10, 2024', price: '₹24,999', status: 'Delivered', poster: '/assets/space_odyssey_poster.jpg' }
    ];

    const planName = activePlan === 'None' ? 'Basic' : activePlan;
    const isPremium = activePlan === 'Collector' || activePlan === 'Archivist' || activePlan === 'Premium';

    // Calculate total orders and spent details
    const totalOrdersCount = boughtMovies.length > 0 ? boughtMovies.length : 12;
    const totalSpentText = boughtMovies.length > 0 
      ? '₹' + boughtMovies.reduce((sum, m) => sum + parseFloat((m.price || '').replace(/[^0-9.]/g, '') || 0), 0).toLocaleString() 
      : '₹48,750';

    return (
      <div className="profile-v2-container">
        <div className="profile-v2-header">
          <h1 className="profile-v2-title">My Profile</h1>
          <p className="profile-v2-subtitle">Manage your personal information and account preferences.</p>
        </div>

        {/* Row 1: Profile card + 3 Stats Card aligned horizontally */}
        <div className="profile-v2-row-1">
          <div className="profile-v2-user-card">
            <div className="profile-v2-avatar-container" onClick={() => alert("Avatar scan verified.")}>
              <img src="/assets/editor_avatar.png" alt="Archivist Avatar" className="profile-v2-avatar-img" />
              <div className="profile-v2-avatar-overlay">
                <span className="avatar-cam-icon">📷</span>
              </div>
            </div>

            <div className="profile-v2-user-info">
              <div className="profile-v2-name-row">
                <h2 className="profile-v2-user-name">{userFullName}</h2>
                <span className="profile-v2-user-badge">
                  {isPremium ? `${activePlan} Member` : 'Premium Member'}
                </span>
              </div>
              <span className="profile-v2-user-email">{user?.email || 'yashpatel@gmail.com'}</span>
              <span className="profile-v2-user-phone">{userPhone}</span>
              <span className="profile-v2-user-since">Member since {memberSince}</span>
            </div>
          </div>

          <div className="profile-v2-stats-column">
            {/* Total Orders Stats */}
            <div className="stats-card-v2" onClick={() => {
              const el = document.querySelector('.profile-v2-orders-list');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              <div className="stats-card-icon-box orders">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="stats-card-details">
                <span className="stats-card-label">Total Orders</span>
                <strong className="stats-card-number">{totalOrdersCount}</strong>
              </div>
              <span className="stats-card-link red">View all orders &rarr;</span>
            </div>

            {/* Total Spent Stats */}
            <div className="stats-card-v2">
              <div className="stats-card-icon-box spending">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 4v16M2 10h20" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="stats-card-details">
                <span className="stats-card-label">Total Spent</span>
                <strong className="stats-card-number">{totalSpentText}</strong>
              </div>
              <span className="stats-card-link green">View spending &rarr;</span>
            </div>

            {/* Member Level Stats */}
            <div className="stats-card-v2" onClick={() => handleNavClick('PRICING')}>
              <div className="stats-card-icon-box level">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="stats-card-details">
                <span className="stats-card-label">Member Level</span>
                <strong className="stats-card-number">{planName}</strong>
              </div>
              <span className="stats-card-link blue">View benefits &rarr;</span>
            </div>
          </div>
        </div>

        {/* Row 2: Recent Orders, Account Details, Shipping Address */}
        <div className="profile-v2-row-2">
          {/* Card 1: Recent Orders */}
          <div className="profile-v2-card">
            <div className="profile-v2-card-header">
              <h3 className="profile-v2-card-title">Recent Orders</h3>
              <span className="profile-v2-card-link" onClick={() => handleNavClick('COLLECTION')}>View all &rarr;</span>
            </div>
            
            <div className="profile-v2-orders-list">
              {displayOrders.map((order, idx) => (
                <div key={order.id || idx} className="order-item-v2">
                  <div className="order-item-icon-box">
                    <img src={order.poster} alt={order.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                  </div>
                  <div className="order-item-details">
                    <span className="order-item-title">{order.title}</span>
                    <span className="order-item-meta">{order.reference}</span>
                    <span className="order-item-meta">{order.date}</span>
                  </div>
                  <div className="order-item-pricing">
                    <span className="order-item-price">{order.price}</span>
                    <span className="order-item-status">Delivered</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="profile-v2-btn-bottom" onClick={() => handleNavClick('COLLECTION')}>
              View All Orders
            </button>
          </div>

          {/* Card 2: Account Details */}
          <div className="profile-v2-card">
            <div className="profile-v2-card-header">
              <h3 className="profile-v2-card-title">Account Details</h3>
              {isEditingProfile ? (
                <span className="profile-v2-card-link" onClick={() => setIsEditingProfile(false)}>Cancel</span>
              ) : (
                <span className="profile-v2-card-link" onClick={() => setIsEditingProfile(true)}>Edit</span>
              )}
            </div>

            {isEditingProfile ? (
              <form className="profile-v2-edit-form" onSubmit={(e) => {
                e.preventDefault();
                localStorage.setItem('r35_user_fullname_' + user.id, userFullName);
                localStorage.setItem('r35_user_phone_' + user.id, userPhone);
                localStorage.setItem('r35_user_dob_' + user.id, userDob);
                setIsEditingProfile(false);
                alert("Vault operator profile details encrypted and updated!");
              }}>
                <div className="profile-v2-edit-group">
                  <label className="profile-v2-edit-label">FULL NAME</label>
                  <input 
                    type="text" 
                    className="profile-v2-edit-input" 
                    value={userFullName} 
                    onChange={(e) => setUserFullName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="profile-v2-edit-group">
                  <label className="profile-v2-edit-label">PHONE NUMBER</label>
                  <input 
                    type="text" 
                    className="profile-v2-edit-input" 
                    value={userPhone} 
                    onChange={(e) => setUserPhone(e.target.value)} 
                    required 
                  />
                </div>
                <div className="profile-v2-edit-group">
                  <label className="profile-v2-edit-label">DATE OF BIRTH</label>
                  <input 
                    type="text" 
                    className="profile-v2-edit-input" 
                    value={userDob} 
                    onChange={(e) => setUserDob(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="profile-v2-edit-actions">
                  <button type="submit" className="edit-action-btn save">SAVE CHANGES</button>
                </div>
              </form>
            ) : (
              <div className="profile-v2-details-list">
                <div className="profile-v2-detail-row" onClick={() => setIsEditingProfile(true)}>
                  <span className="profile-v2-detail-label">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle', opacity: 0.6 }}>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Full Name
                  </span>
                  <span className="profile-v2-detail-value">
                    {userFullName}
                    <span className="profile-v2-detail-chevron">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4 }}>
                        <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </div>
                
                <div className="profile-v2-detail-row" onClick={() => setIsEditingProfile(true)}>
                  <span className="profile-v2-detail-label">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle', opacity: 0.6 }}>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Email Address
                  </span>
                  <span className="profile-v2-detail-value" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                    {user?.email || 'yashpatel@gmail.com'}
                    <span className="profile-v2-detail-chevron">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4 }}>
                        <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </div>

                <div className="profile-v2-detail-row" onClick={() => setIsEditingProfile(true)}>
                  <span className="profile-v2-detail-label">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle', opacity: 0.6 }}>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Phone Number
                  </span>
                  <span className="profile-v2-detail-value">
                    {userPhone}
                    <span className="profile-v2-detail-chevron">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4 }}>
                        <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </div>

                <div className="profile-v2-detail-row" onClick={() => setIsEditingProfile(true)}>
                  <span className="profile-v2-detail-label">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle', opacity: 0.6 }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Date of Birth
                  </span>
                  <span className="profile-v2-detail-value">
                    {userDob}
                    <span className="profile-v2-detail-chevron">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4 }}>
                        <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </div>

                <div className="profile-v2-detail-row" onClick={() => alert("Secure encryption restricts direct editing of passwords. Change in Auth console.")}>
                  <span className="profile-v2-detail-label">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle', opacity: 0.6 }}>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Password
                  </span>
                  <span className="profile-v2-detail-value">
                    ••••••••
                    <span className="profile-v2-detail-chevron">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4 }}>
                        <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Shipping Address */}
          <div className="profile-v2-card">
            <div className="profile-v2-card-header">
              <h3 className="profile-v2-card-title">Shipping Address</h3>
              {isEditingAddress ? (
                <span className="profile-v2-card-link" onClick={() => setIsEditingAddress(false)}>Cancel</span>
              ) : (
                <span className="profile-v2-card-link" onClick={() => setIsEditingAddress(true)}>Manage</span>
              )}
            </div>

            {isEditingAddress ? (
              <form className="profile-v2-edit-form" onSubmit={(e) => {
                e.preventDefault();
                localStorage.setItem('r35_ship_name_' + user.id, shipFullName);
                localStorage.setItem('r35_ship_street_' + user.id, shipStreet);
                localStorage.setItem('r35_ship_city_' + user.id, shipCity);
                localStorage.setItem('r35_ship_state_' + user.id, shipState);
                localStorage.setItem('r35_ship_zip_' + user.id, shipZip);
                localStorage.setItem('r35_ship_country_' + user.id, shipCountry);
                localStorage.setItem('r35_ship_phone_' + user.id, shipPhone);
                setIsEditingAddress(false);
                alert("Archival shipping coordinates registered!");
              }}>
                <div className="profile-v2-edit-group">
                  <label className="profile-v2-edit-label">FULL NAME</label>
                  <input type="text" className="profile-v2-edit-input" value={shipFullName} onChange={(e) => setShipFullName(e.target.value)} required />
                </div>
                <div className="profile-v2-edit-group">
                  <label className="profile-v2-edit-label">STREET ADDRESS</label>
                  <input type="text" className="profile-v2-edit-input" value={shipStreet} onChange={(e) => setShipStreet(e.target.value)} required />
                </div>
                <div className="profile-v2-edit-group">
                  <label className="profile-v2-edit-label">CITY</label>
                  <input type="text" className="profile-v2-edit-input" value={shipCity} onChange={(e) => setShipCity(e.target.value)} required />
                </div>
                <div className="profile-v2-edit-group">
                  <label className="profile-v2-edit-label">STATE</label>
                  <input type="text" className="profile-v2-edit-input" value={shipState} onChange={(e) => setShipState(e.target.value)} required />
                </div>
                <div className="profile-v2-edit-group">
                  <label className="profile-v2-edit-label">ZIP CODE</label>
                  <input type="text" className="profile-v2-edit-input" value={shipZip} onChange={(e) => setShipZip(e.target.value)} required />
                </div>
                <div className="profile-v2-edit-group">
                  <label className="profile-v2-edit-label">COUNTRY</label>
                  <input type="text" className="profile-v2-edit-input" value={shipCountry} onChange={(e) => setShipCountry(e.target.value)} required />
                </div>
                <div className="profile-v2-edit-group">
                  <label className="profile-v2-edit-label">PHONE NUMBER</label>
                  <input type="text" className="profile-v2-edit-input" value={shipPhone} onChange={(e) => setShipPhone(e.target.value)} required />
                </div>
                
                <div className="profile-v2-edit-actions">
                  <button type="submit" className="edit-action-btn save">SAVE ADDRESS</button>
                </div>
              </form>
            ) : (
              <div className="profile-v2-address-block">
                <div className="address-house-icon-row">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent-red)', verticalAlign: 'middle' }}>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="address-badge-v2">Default Address</span>
                </div>
                
                <div className="profile-v2-address-text">
                  <p style={{ fontWeight: 'bold', color: 'var(--text-white)' }}>{shipFullName}</p>
                  <p>{shipStreet}, {shipCity}, {shipState} {shipZip}, {shipCountry}</p>
                </div>
                <span className="profile-v2-address-phone">{shipPhone}</span>

                <button className="profile-v2-btn-bottom" style={{ marginTop: 'auto', borderStyle: 'dashed' }} onClick={() => setIsEditingAddress(true)}>
                  + Add New Address
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Row 3: Premium Benefits Banner */}
        <div className="profile-v2-row-3">
          <div className="premium-benefit-banner">
            <div className="premium-benefit-left">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="benefit-star-box-v2">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" style={{ color: '#fff' }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="premium-benefit-headline">
                    You're a Premium Member!
                  </h3>
                  <p className="premium-benefit-sub" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Enjoy exclusive benefits and priority support.
                  </p>
                </div>
              </div>
              <div className="premium-benefit-list" style={{ marginTop: '1.2rem' }}>
                <div className="premium-benefit-item">
                  <span className="benefit-chk-circle">✓</span> <span style={{ color: '#fff' }}>Free Shipping</span>
                </div>
                <div className="premium-benefit-item">
                  <span className="benefit-chk-circle">✓</span> <span style={{ color: '#fff' }}>Early Access</span>
                </div>
                <div className="premium-benefit-item">
                  <span className="benefit-chk-circle">✓</span> <span style={{ color: '#fff' }}>Extended Warranty</span>
                </div>
                <div className="premium-benefit-item">
                  <span className="benefit-chk-circle">✓</span> <span style={{ color: '#fff' }}>Priority Support</span>
                </div>
              </div>
            </div>
            <div className="premium-benefit-right">
              <button className="premium-benefit-btn" onClick={() => handleNavClick('PRICING')}>
                View All Benefits
              </button>
            </div>
          </div>
        </div>

        {/* Delete Account Danger Zone */}
        <div className="profile-v2-danger-zone">
          <div className="danger-zone-left">
            <h4 className="danger-zone-title">Danger Zone</h4>
            <p className="danger-zone-desc">Permanently terminate your film vault credentials and completely erase all orders history.</p>
          </div>
          <button className="danger-zone-btn" onClick={() => setIsDeleteModalOpen(true)}>
            Delete Account
          </button>
        </div>

        {/* Delete Account Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="profile-modal-overlay-v2">
            <div className="profile-modal-box-v2">
              <h2 className="profile-modal-title">PURGE VAULT ACCOUNT?</h2>
              <p className="profile-modal-desc">
                WARNING: This action is irreversible. Deleting your operator keys will permanently delete all order history and subscription records from the R-35 console database.
              </p>
              <div className="profile-modal-actions">
                <button className="profile-modal-btn confirm" onClick={handleDeleteAccount}>
                  YES, DELETE ACCOUNT
                </button>
                <button className="profile-modal-btn cancel" onClick={() => setIsDeleteModalOpen(false)}>
                  CANCEL PURGE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPricing = () => {
    const handleSelectPlan = (planName) => {
      if (!user) {
        setIsAuthWarningOpen(true);
        return;
      }
      setActivePlan(planName);
      localStorage.setItem('r35_active_plan_' + user.id, planName);
      alert(`${planName} Membership activated! Vault clearance granted!`);
    };

    return (
      <div className="pricing-v2-container">
        <div className="pricing-v2-top-row">
          <div className="pricing-v2-header-block">
            <h1 className="pricing-v2-title font-heading-bebas">PRICING PLANS</h1>
            <div className="pricing-v2-accent-bar" />
            <p className="pricing-v2-subtitle">
              Choose the plan that fits your passion. <br className="desktop-only" />
              Upgrade, downgrade or cancel anytime.
            </p>
          </div>
          
          <div className="pricing-v2-compare-card" onClick={() => alert("Feature comparison catalog verified.")}>
            <div className="compare-card-icon-box">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="compare-card-text">
              <span className="compare-card-title">NOT SURE WHICH PLAN?</span>
              <span className="compare-card-desc">Compare features and find the perfect plan for you.</span>
              <span className="compare-card-link-text">COMPARE PLANS &rarr;</span>
            </div>
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="pricing-v2-toggle-bar">
          <span className={`pricing-toggle-label ${!isPricingYearly ? 'active' : ''}`}>MONTHLY</span>
          <button 
            className={`pricing-toggle-switch ${isPricingYearly ? 'yearly' : 'monthly'}`}
            onClick={() => setIsPricingYearly(!isPricingYearly)}
          >
            <div className="pricing-toggle-knob" />
          </button>
          <span className={`pricing-toggle-label ${isPricingYearly ? 'active' : ''}`}>YEARLY</span>
          <span className="pricing-yearly-discount-badge">SAVE 20%</span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-v2-grid">
          {/* Card 1: FREE */}
          <div className="pricing-plan-card">
            <div className="plan-card-meta">
              <h2 className="plan-card-tier-title">FREE</h2>
              <p className="plan-card-tier-desc">Explore the archive</p>
            </div>
            
            <div className="plan-card-pricing-block">
              <span className="plan-price-currency">₹</span>
              <span className="plan-price-amount">0</span>
              <span className="plan-price-period">/ month</span>
            </div>

            <div className="plan-card-features-list">
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Browse limited collection</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Watch trailers</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Standard resolution</span>
              </div>
              <div className="plan-feature-row disabled">
                <span className="feature-check-icon disabled">✕</span>
                <span className="feature-text">Full film access</span>
              </div>
              <div className="plan-feature-row disabled">
                <span className="feature-check-icon disabled">✕</span>
                <span className="feature-text">Early access to new releases</span>
              </div>
              <div className="plan-feature-row disabled">
                <span className="feature-check-icon disabled">✕</span>
                <span className="feature-text">Exclusive content</span>
              </div>
              <div className="plan-feature-row disabled">
                <span className="feature-check-icon disabled">✕</span>
                <span className="feature-text">Priority support</span>
              </div>
            </div>

            <button 
              className={`pricing-action-btn ${activePlan === 'Free' ? 'current-active' : ''}`}
              onClick={() => handleSelectPlan('Free')}
            >
              {activePlan === 'Free' ? 'ACTIVE PLAN' : 'GET STARTED'}
            </button>
          </div>

          {/* Card 2: BASIC */}
          <div className="pricing-plan-card highlighted">
            <div className="plan-popular-ribbon">MOST POPULAR</div>
            <div className="plan-card-meta">
              <h2 className="plan-card-tier-title">BASIC</h2>
              <p className="plan-card-tier-desc">For film enthusiasts</p>
            </div>
            
            <div className="plan-card-pricing-block">
              <span className="plan-price-currency">₹</span>
              <span className="plan-price-amount">{isPricingYearly ? '199' : '249'}</span>
              <span className="plan-price-period">/ month</span>
              <span className="plan-price-strikethrough">₹{isPricingYearly ? '249' : '299'}</span>
            </div>

            <div className="plan-card-features-list">
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Unlimited archive access</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Watch in HD</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">New releases every month</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Early access (7 days)</span>
              </div>
              <div className="plan-feature-row disabled">
                <span className="feature-check-icon disabled">✕</span>
                <span className="feature-text">Exclusive content</span>
              </div>
              <div className="plan-feature-row disabled">
                <span className="feature-check-icon disabled">✕</span>
                <span className="feature-text">Priority support</span>
              </div>
            </div>

            <button 
              className={`pricing-action-btn solid-red ${activePlan === 'Basic' ? 'current-active' : ''}`}
              onClick={() => handleSelectPlan('Basic')}
            >
              {activePlan === 'Basic' ? 'ACTIVE PLAN' : 'CHOOSE PLAN'}
            </button>
          </div>

          {/* Card 3: PREMIUM */}
          <div className="pricing-plan-card">
            <div className="plan-card-meta">
              <h2 className="plan-card-tier-title">PREMIUM</h2>
              <p className="plan-card-tier-desc">For serious collectors</p>
            </div>
            
            <div className="plan-card-pricing-block">
              <span className="plan-price-currency">₹</span>
              <span className="plan-price-amount">{isPricingYearly ? '399' : '499'}</span>
              <span className="plan-price-period">/ month</span>
              <span className="plan-price-strikethrough">₹{isPricingYearly ? '499' : '599'}</span>
            </div>

            <div className="plan-card-features-list">
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Everything in Basic</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Watch in 4K</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Exclusive content & interviews</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Early access (14 days)</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Behind-the-scenes footage</span>
              </div>
              <div className="plan-feature-row disabled">
                <span className="feature-check-icon disabled">✕</span>
                <span className="feature-text">Priority support</span>
              </div>
            </div>

            <button 
              className={`pricing-action-btn ${activePlan === 'Premium' ? 'current-active' : ''}`}
              onClick={() => handleSelectPlan('Premium')}
            >
              {activePlan === 'Premium' ? 'ACTIVE PLAN' : 'CHOOSE PLAN'}
            </button>
          </div>

          {/* Card 4: PRO */}
          <div className="pricing-plan-card">
            <div className="plan-card-meta">
              <h2 className="plan-card-tier-title">PRO</h2>
              <p className="plan-card-tier-desc">For filmmakers & pros</p>
            </div>
            
            <div className="plan-card-pricing-block">
              <span className="plan-price-currency">₹</span>
              <span className="plan-price-amount">{isPricingYearly ? '799' : '999'}</span>
              <span className="plan-price-period">/ month</span>
              <span className="plan-price-strikethrough">₹{isPricingYearly ? '999' : '1,199'}</span>
            </div>

            <div className="plan-card-features-list">
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Everything in Premium</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Offline downloads</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Private screenings</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Early access (30 days)</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Priority support</span>
              </div>
              <div className="plan-feature-row checked">
                <span className="feature-check-icon checked">✓</span>
                <span className="feature-text">Invites to exclusive events</span>
              </div>
            </div>

            <button 
              className={`pricing-action-btn ${activePlan === 'Pro' ? 'current-active' : ''}`}
              onClick={() => handleSelectPlan('Pro')}
            >
              {activePlan === 'Pro' ? 'ACTIVE PLAN' : 'CHOOSE PLAN'}
            </button>
          </div>
        </div>

        {/* Pricing Footer Info Badge Panel */}
        <div className="pricing-v2-footer-features">
          <div className="pricing-footer-feature-item">
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="feature-text-block">
              <span className="feature-title">FLEXIBLE & RISK FREE</span>
              <span className="feature-desc">Cancel or change your plan anytime.</span>
            </div>
          </div>

          <div className="pricing-footer-feature-item">
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="feature-text-block">
              <span className="feature-title">SECURE PAYMENT</span>
              <span className="feature-desc">Your payment information is always safe with us.</span>
            </div>
          </div>

          <div className="pricing-footer-feature-item">
            <div className="feature-icon-box">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="feature-text-block">
              <span className="feature-title">NEED HELP?</span>
              <span className="feature-desc">Contact our support team anytime.</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="settings-v2-container">
        <div className="profile-v2-header">
          <h1 className="profile-v2-title font-heading-bebas">Console Settings</h1>
          <p className="profile-v2-subtitle">Configure your film archive console environment, notifications, and vault security protocols.</p>
        </div>

        <div className="settings-card-v2">
          {/* Section 1: Appearance */}
          <div className="settings-section-v2">
            <h3 className="settings-section-title font-heading-bebas">Console Interface</h3>
            
            <div className="settings-row-v2">
              <div className="settings-row-info">
                <span className="settings-row-title">Accent Styling Theme</span>
                <span className="settings-row-desc">Select the primary glowing terminal color for your vault screen.</span>
              </div>
              
              <div className="theme-picker-grid-v2">
                {[
                  { id: 'red', name: 'Crimson Base', color: '#ff3b30' },
                  { id: 'amber', name: 'Amber Glow', color: '#ff9500' },
                  { id: 'green', name: 'Terminal Green', color: '#30d158' },
                  { id: 'blue', name: 'Celluloid Blue', color: '#0a84ff' },
                ].map(t => (
                  <button
                    key={t.id}
                    className={`theme-pill-v2 ${consoleTheme === t.id ? 'active' : ''}`}
                    onClick={() => {
                      setConsoleTheme(t.id);
                      localStorage.setItem('r35_console_theme', t.id);
                    }}
                  >
                    <span className="theme-pill-dot" style={{ backgroundColor: t.color }} />
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-row-v2">
              <div className="settings-row-info">
                <span className="settings-row-title">Console Boot Sequence</span>
                <span className="settings-row-desc">Bypass the immersive R-35 preloader sequence on session logins.</span>
              </div>
              <label className="settings-switch-v2">
                <input 
                  type="checkbox" 
                  checked={skipPreloader} 
                  onChange={(e) => {
                    setSkipPreloader(e.target.checked);
                    localStorage.setItem('r35_skip_preloader', e.target.checked);
                  }} 
                />
                <span className="settings-slider-v2" />
              </label>
            </div>
          </div>

          {/* Section 2: Vault Security */}
          <div className="settings-section-v2">
            <h3 className="settings-section-title font-heading-bebas">Vault Security</h3>
            
            <div className="settings-row-v2">
              <div className="settings-row-info">
                <span className="settings-row-title">Ambient Security Pulse</span>
                <span className="settings-row-desc">Engage the emergency glowing amber security pulse on the main viewport.</span>
              </div>
              <label className="settings-switch-v2">
                <input 
                  type="checkbox" 
                  checked={isVaultAlertMode} 
                  onChange={(e) => setIsVaultAlertMode(e.target.checked)} 
                />
                <span className="settings-slider-v2" />
              </label>
            </div>

            <div className="settings-row-v2">
              <div className="settings-row-info">
                <span className="settings-row-title">Sound Alerts</span>
                <span className="settings-row-desc">Play console beep and telemetry alerts on active state changes.</span>
              </div>
              <label className="settings-switch-v2">
                <input 
                  type="checkbox" 
                  checked={alertSound} 
                  onChange={(e) => setAlertSound(e.target.checked)} 
                />
                <span className="settings-slider-v2" />
              </label>
            </div>
          </div>

          {/* Section 3: Ledger Notifications */}
          <div className="settings-section-v2">
            <h3 className="settings-section-title font-heading-bebas">Notifications Settings</h3>
            
            <div className="settings-row-v2">
              <div className="settings-row-info">
                <span className="settings-row-title">Canister Shipment Alerts</span>
                <span className="settings-row-desc">Receive immediate email alerts when acquired reels leave the vault storage hubs.</span>
              </div>
              <label className="settings-switch-v2">
                <input 
                  type="checkbox" 
                  checked={orderNotifications} 
                  onChange={(e) => setOrderNotifications(e.target.checked)} 
                />
                <span className="settings-slider-v2" />
              </label>
            </div>

            <div className="settings-row-v2">
              <div className="settings-row-info">
                <span className="settings-row-title">Nitrate Base Catalog Logs</span>
                <span className="settings-row-desc">Receive monthly ledgers regarding newly unsealed vault canister collections.</span>
              </div>
              <label className="settings-switch-v2">
                <input 
                  type="checkbox" 
                  checked={catalogAlerts} 
                  onChange={(e) => setCatalogAlerts(e.target.checked)} 
                />
                <span className="settings-slider-v2" />
              </label>
            </div>
          </div>

          {/* Section 4: System Reset */}
          <div className="settings-section-v2">
            <h3 className="settings-section-title font-heading-bebas">Console Database</h3>
            
            <div className="settings-row-v2">
              <div className="settings-row-info">
                <span className="settings-row-title">Clear Session Ledger Cache</span>
                <span className="settings-row-desc">Wipe all local console states (clearing wishlists, cart reels, and themes).</span>
              </div>
              <button className="settings-reset-btn" onClick={() => {
                if (window.confirm("ARE YOU SURE? This will log you out, empty your cart, empty your wishlist, and restore all default system properties.")) {
                  handleDeleteAccount();
                }
              }}>
                Reset Console
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`app-layout ${isPreloaderExiting ? 'preloader-done' : ''} ${isMobile ? 'app-mobile-mode' : ''} ${isVaultAlertMode ? 'vault-alert-on' : ''}`}>
      {isPreloaderActive && (
        <div className={`split-preloader ${isPreloaderExiting ? 'exiting' : ''}`}>
          {/* Stark Brutalist curtains */}
          <div className="preloader-curtain top-curtain">
            {/* Corner tags on curtains */}
            <div className="curtain-corner top-left-tag">SYS // R35-SECURE-VAULT</div>
            <div className="curtain-corner top-right-tag">LOC // VAULT-01.LN</div>
          </div>
          <div className="preloader-curtain bottom-curtain">
            <div className="curtain-corner bottom-left-tag">LAT // 51.5074° N</div>
            <div className="curtain-corner bottom-right-tag">CELLULOID SAFETY CLASS</div>
          </div>

          <div className="preloader-center-content">
            {/* Massive Typographic Branding */}
            <h1 className="preloader-giant-logo font-heading-bebas">R-35</h1>
            
            <div className="preloader-divider-laser" />
            
            <div className="preloader-tech-details">
              <span className="preloader-tagline">FILM ARCHIVE & CELLULOID VAULT</span>
              
              {/* Dynamic Loading Meter */}
              <div className="preloader-brutalist-meter">
                <div className="preloader-progress-track">
                  <div className="preloader-progress-fill" style={{ width: `${preloaderPercent}%` }} />
                </div>
                <div className="preloader-loading-metrics">
                  <span className="preloader-percent-number">{String(preloaderPercent).padStart(3, '0')}%</span>
                  <span className="preloader-frame-counter">FRAME #0{String(Math.floor(preloaderPercent * 0.24)).padStart(3, '0')}</span>
                </div>
              </div>

              {/* Dynamic status message */}
              <div className="preloader-status-terminal">
                <span className="terminal-prompt">&gt;&gt;</span> {preloaderStatus}
              </div>
            </div>
          </div>
        </div>
      )}
      {isMobile ? (
        /* ==========================================================
           100% BESPOKE MOBILE USER INTERFACE
           ========================================================== */
        <div className="mobile-app-wrapper">
          {/* MOBILE TOP STATUS BAR */}
          <header className="mobile-top-header">
            <div className="mobile-logo-box" onClick={() => handleNavClick('HOME')}>R-35</div>
            <div className="mobile-header-status">
              <span className="live-pulse" /> VAULT ONLINE
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {user && (
                <button className="mobile-cart-trigger mobile-wishlist-trigger" onClick={() => setIsWishlistOpen(!isWishlistOpen)}>
                  WISHLIST [ <span className="cart-num-highlight">{String(wishlistItems.length).padStart(2, '0')}</span> ]
                </button>
              )}
              <button className="mobile-cart-trigger" onClick={() => setIsCartOpen(!isCartOpen)}>
                CART [ <span className="cart-num-highlight">{String(cartCount).padStart(2, '0')}</span> ]
              </button>
            </div>
          </header>

          {/* MOBILE MAIN WORKSPACE */}
          <main key={activeNav} className="mobile-main-content m-pane-entry-wrapper">
            {(() => {
              if (activeNav === 'ABOUT') {
                return (
                  <div className="m-about-pane">
                    <div className="m-section-header">
                      <span className="m-badge">INFO</span>
                      <h1 className="m-pane-title">PRESERVING CINEMA</h1>
                      <div className="m-accent-line" />
                    </div>
                    <div className="m-text-card">
                      <p>R-35 is an archive and marketplace dedicated to physical 35mm motion picture celluloid.</p>
                      <p>We source authentic print safety bases from legendary vaults worldwide and preserve them for directors, institutions, and dedicated collectors.</p>
                    </div>
                    
                    <div className="m-halftone-showcase">
                      <div className="m-portrait-container">
                        <img src="/assets/halftone/ridley.png" alt="Ridley Scott" className="m-portrait-img" />
                        <div className="m-portrait-tag">
                          <strong>RIDLEY SCOTT</strong>
                          <span>R-35 ADVISOR</span>
                        </div>
                      </div>
                    </div>

                    <div className="m-stats-list">
                      <div className="m-stat-box">
                        <span className="m-stat-num">12K+</span>
                        <span className="m-stat-label">REELS SAVED</span>
                      </div>
                      <div className="m-stat-box">
                        <span className="m-stat-num">85+</span>
                        <span className="m-stat-label">COUNTRIES</span>
                      </div>
                      <div className="m-stat-box">
                        <span className="m-stat-num">100%</span>
                        <span className="m-stat-label">AUTHENTIC</span>
                      </div>
                    </div>
                  </div>
                );
              } else if (activeNav === 'COLLECTION') {
                const displayedCollection = directorFilter 
                  ? collectionMovies.filter(m => m.director.toUpperCase().includes(directorFilter.toUpperCase()))
                  : collectionMovies;

                return (
                  <div className="m-archive-pane">
                    <div className="m-section-header">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <div>
                          <span className="m-badge">ARCHIVE</span>
                          <h1 className="m-pane-title">THE REELS</h1>
                        </div>
                        {directorFilter && (
                          <button className="clear-filter-btn" onClick={() => setDirectorFilter(null)}>
                            CLEAR FILTER ✕
                          </button>
                        )}
                      </div>
                      <div className="m-accent-line" />
                    </div>

                    {directorFilter && (
                      <div className="m-active-filter-banner">
                        FILTERED BY: <strong>{directorFilter}</strong>
                      </div>
                    )}

                    <div className="m-archive-stack">
                      {displayedCollection.map((movie, idx) => {
                        const displayId = (idx + 1).toString().padStart(3, '0');
                        return (
                          <div key={movie.id} className="m-reel-tin-card" onClick={() => openProductPage(movie)}>
                            <div className="m-reel-card-header">
                              <span className="m-reel-id">REEL #{displayId}</span>
                              <span className="m-reel-price">{movie.price}</span>
                            </div>
                            
                            <h2 className="m-reel-title">{movie.title}</h2>
                            
                            <div className="m-reel-meta-grid">
                              <div><span>DIR:</span> <strong>{movie.director}</strong></div>
                              <div><span>YEAR:</span> <strong>{movie.year}</strong></div>
                              <div><span>BASE:</span> <strong>{movie.vaultStatus}</strong></div>
                            </div>

                            <div className="m-reel-cinematic-banner">
                              <img src={movie.poster} alt={movie.title} className="m-reel-banner-img" style={{ objectPosition: movie.cropPosition || 'center' }} />
                              <div className="m-reel-screen-overlay" />
                              <div className="m-halftone-grid-overlay" />
                            </div>

                            <div className="m-reel-actions">
                              <span>INSPECT VAULT METADATA &rarr;</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              } else if (activeNav === 'FILMMAKERS') {
                return (
                  <div className="m-directors-pane">
                    <div className="m-section-header">
                      <span className="m-badge">DIRECTORS</span>
                      <h1 className="m-pane-title">ARCHIVAL CATALOG</h1>
                      <div className="m-accent-line" />
                    </div>

                    <div className="m-directors-deck">
                      {filmmakers.map((director, i) => (
                        <div 
                          key={director.name} 
                          className="m-director-ledger-card"
                          onClick={() => {
                            setDirectorFilter(director.name);
                            setActiveNav('COLLECTION');
                          }}
                        >
                          <div className="m-dir-card-left">
                            <span className="m-dir-num">{(i + 1).toString().padStart(2, '0')}</span>
                            <div>
                              <h3 className="m-dir-name">{director.name}</h3>
                              <span className="m-dir-works-summary">{director.works.join(' \u2022 ')}</span>
                            </div>
                          </div>
                          <div className="m-dir-card-right">
                            <span className="m-dir-reels-count">{director.reels}</span>
                            <span className="m-dir-reels-lbl">REELS</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              } else if (activeNav === 'CONTACT') {
                return (
                  <div className="m-inbox-pane">
                    <div className="m-section-header">
                      <span className="m-badge">INBOX</span>
                      <h1 className="m-pane-title">ACQUISITIONS CHANNEL</h1>
                      <div className="m-accent-line" />
                    </div>

                    <form className="m-console-form" onSubmit={(e) => { e.preventDefault(); e.target.reset(); alert('Secure channel transmission complete.'); }}>
                      <div className="m-form-group">
                        <label className="m-form-label">IDENTITY / NAME</label>
                        <input className="m-form-input" placeholder="Secure code or identity name" required />
                      </div>
                      <div className="m-form-group">
                        <label className="m-form-label">VAULT / CONTACT EMAIL</label>
                        <input className="m-form-input" type="email" placeholder="Your secure email channel" required />
                      </div>
                      <div className="m-form-group">
                        <label className="m-form-label">TRANSMISSION CONTENT</label>
                        <textarea className="m-form-textarea" placeholder="Detail your vault acquisition or inquiry..." required></textarea>
                      </div>
                      <button type="submit" className="m-submit-btn">
                        TRANSMIT INQUIRY &rarr;
                      </button>
                    </form>
                  </div>
                );
              } else if (activeNav === 'AUTH' || activeNav === 'LOGIN') {
                return renderAuth();
              } else if (activeNav === 'PROFILE') {
                return renderProfile();
              } else if (activeNav === 'PRICING') {
                return renderPricing();
              } else if (activeNav === 'SETTINGS') {
                return renderSettings();
              } else {
                return (
                  <div className="m-home-pane">
                    {/* CUSTOM DIGITAL MARQUEE */}
                    <div className="m-ticker-marquee">
                      <div className="m-ticker-track">
                        <span>R-35 PRESERVATION SECURE HUB // VAULT ONLINE // 35MM CELLULOID ACQUISITIONS ACTIVE // R-35 PRESERVATION SECURE HUB // </span>
                      </div>
                    </div>

                    {/* VAULT ALARM TOGGLE PANEL */}
                    <div className={`m-vault-alarm-panel ${isVaultAlertMode ? 'alert-active' : ''}`}>
                      <div className="m-alarm-left">
                        <span className="m-alarm-badge">{isVaultAlertMode ? 'WARNING // VAULT ALERT ACTIVE' : 'AMBIENT SYSTEM MODE'}</span>
                        <div className="m-alarm-desc">{isVaultAlertMode ? 'EMERGENCY RED WARNING LINE SYSTEM ENGAGED' : 'ENGAGE SECURITY RED WARNING LEVEL?'}</div>
                      </div>
                      <button 
                        className="m-alarm-toggle-btn"
                        onClick={() => setIsVaultAlertMode(!isVaultAlertMode)}
                      >
                        {isVaultAlertMode ? 'RESET VAULT' : 'ENGAGE SECURITY'}
                      </button>
                    </div>

                    {/* VAULT CONTROL ENVIRONMENTAL TELEMETRY */}
                    <div className="m-vault-telemetry-panel">
                      <div className="m-telemetry-header">
                        <span className="m-telemetry-title">SENSORY TELEMETRY READOUT</span>
                        <span className="m-telemetry-status">ONLINE</span>
                      </div>
                      <div className="m-telemetry-grid">
                        <div className="m-telemetry-item">
                          <span className="m-tel-lbl">VAULT TEMP</span>
                          <strong className="m-tel-val">39.8°F</strong>
                        </div>
                        <div className="m-telemetry-item">
                          <span className="m-tel-lbl">HUMIDITY</span>
                          <strong className="m-tel-val">34.6% RH</strong>
                        </div>
                        <div className="m-telemetry-item">
                          <span className="m-tel-lbl">AIR FILT</span>
                          <strong className="m-tel-val neon-green">ISO CLASS 5</strong>
                        </div>
                        <div className="m-telemetry-item">
                          <span className="m-tel-lbl">NITRATE CLASS</span>
                          <strong className="m-tel-val">STABLE BASE</strong>
                        </div>
                      </div>
                    </div>

                    {/* IMMERSIVE SPROCKET FILM STRIP CAROUSEL */}
                    <div className="m-stream-header sprocket-header">
                      <span>35MM SPROCKET FILMSTREAM</span>
                      <span className="dot-blink" />
                    </div>

                    <div className="m-sprocket-film-strip-outer">
                      <div className="m-sprocket-film-strip">
                        {moviesList.map((movie, idx) => (
                          <div 
                            key={movie.id} 
                            className="m-sprocket-frame"
                            onClick={() => openProductPage(movie)}
                          >
                            {/* Top sprockets */}
                            <div className="m-sprocket-holes-row top">
                              {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="m-sprocket-hole" />
                              ))}
                            </div>

                            {/* Film cell scene */}
                            <div className="m-sprocket-image-area">
                              <img src={movie.poster} alt={movie.title} className="m-sprocket-img" style={{ objectPosition: movie.cropPosition || 'center' }} />
                              <div className="m-sprocket-burn-filter" />
                              <span className="m-sprocket-frame-num">{String(idx + 1).padStart(2, '0')}</span>
                            </div>

                            {/* Bottom sprockets */}
                            <div className="m-sprocket-holes-row bottom">
                              {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="m-sprocket-hole" />
                              ))}
                            </div>

                            {/* Film info block */}
                            <div className="m-sprocket-metadata">
                              <span className="m-sprocket-gauge">35MM GAUGE REEL</span>
                              <h3 className="m-sprocket-title">{movie.title}</h3>
                              <div className="m-sprocket-sub">
                                <span>{movie.year}</span>
                                <span className="m-sprocket-price">{movie.price}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* DYNAMIC LOG FEED */}
                    <div className="m-vault-logs-feed" onClick={() => { 
                      const r = 'SECURE-' + Math.random().toString(36).substring(7).toUpperCase();
                      alert(`RE-VERIFYING ARCHIVE SYSTEM PROTOCOL... CHANNEL [CH-${r}] ACTIVE.`); 
                    }}>
                      <div className="m-log-feed-title">REAL-TIME OPERATIONAL LOGS</div>
                      <div className="m-log-terminal">
                        <div className="m-log-line"><code>[16:56:12] VAULT_01_LN PORTAL SECURE... LOCKED</code></div>
                        <div className="m-log-line"><code>[16:56:20] SCANNING SPINDLE NITRATE BALANCE... VERIFIED</code></div>
                        <div className="m-log-line"><code>[16:56:28] DECRYPTING RETRO CELLULOID ENCRYPT... ENGAGED</code></div>
                        <div className="m-log-line text-highlight"><code>&gt;&gt; TAP TO TEST VAULT CONNECTION SECURE CHANNEL</code></div>
                      </div>
                    </div>

                    {/* SPOTLIGHT REEL */}
                    <div className="m-spotlight-box" onClick={() => openProductPage(moviesList[0])}>
                      <span className="m-spotlight-tag">PRESERVATIONS SPOTLIGHT</span>
                      <h1 className="m-spotlight-title">{moviesList[0].title}</h1>
                      <p className="m-spotlight-desc">DIR. {moviesList[0].director} &bull; {moviesList[0].year}</p>
                      
                      <div className="m-spotlight-image-holder">
                        <img src={moviesList[0].poster} alt={moviesList[0].title} className="m-spotlight-img" />
                        <div className="m-spotlight-vignette" />
                      </div>
                      <div className="m-spotlight-inspect">
                        <span>INSPECT SPOTLIGHT PRINT &rarr;</span>
                      </div>
                    </div>
                  </div>
                );
              }
            })()}
          </main>

          {/* MOBILE FLOATING PILL NAVIGATION */}
          <div className={`mobile-floating-nav-container ${isMobileNavExpanded ? 'is-expanded' : 'is-collapsed'}`}>
            {isMobileNavExpanded ? (
              <div className="mobile-floating-nav-expanded">
                {[
                  ['HOME', 'HOME [04]', '\u25C6'],
                  ['COLLECTION', 'REELS [08]', '\u25A3'],
                  ['FILMMAKERS', 'CATALOG [08]', '\u2630'],
                  ['ABOUT', 'INFO [NUM]', '\u25B2'],
                  ['CONTACT', 'INBOX [SEC]', '\u2709'],
                  ['PRICING', 'PRICING [₹]', '₹'],
                  ...(user 
                    ? [
                        ['PROFILE', 'PROFILE [👤]', '👤'],
                        ['SETTINGS', 'SETTINGS [⚙️]', '⚙️'],
                        ['LOGOUT', 'LOGOUT [🔐]', '🔐']
                      ] 
                    : [['AUTH', 'SECURE-IN', '🔑']])
                ].map(([navId, label, symbol]) => (
                  <button
                    key={navId}
                    className={`floating-dock-item ${activeNav === navId ? 'active' : ''}`}
                    onClick={() => {
                      if (navId === 'LOGOUT') {
                        handleLogout();
                      } else {
                        handleNavClick(navId);
                      }
                      setIsMobileNavExpanded(false);
                    }}
                  >
                    <span className="dock-symbol">{symbol}</span>
                    <span className="dock-label">{label}</span>
                  </button>
                ))}
                <button 
                  className="floating-dock-close"
                  onClick={() => setIsMobileNavExpanded(false)}
                >
                  ✕
                </button>
              </div>
            ) : (
              <button 
                className="mobile-floating-trigger-pill"
                onClick={() => setIsMobileNavExpanded(true)}
              >
                <span className="trigger-pulse-dot" />
                <span className="trigger-label">
                  {activeNav === 'HOME' ? '\u25C6 HOME' :
                   activeNav === 'COLLECTION' ? '\u25A3 REELS' :
                   activeNav === 'FILMMAKERS' ? '\u2630 CATALOG' :
                   activeNav === 'ABOUT' ? '\u25B2 INFO' :
                   activeNav === 'CONTACT' ? '\u2709 INBOX' :
                   activeNav === 'PROFILE' ? '👤 PROFILE' :
                   activeNav === 'PRICING' ? '₹ PRICING' :
                   activeNav === 'SETTINGS' ? '⚙️ SETTINGS' :
                   '🔑 SECURE-IN'}
                </span>
                <span className="trigger-icon-chevron">&#9652;</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ==========================================================
           ORIGINAL DESKTOP USER INTERFACE
           ========================================================== */
        <>
          <aside className="sidebar">
            <div className="sidebar-top">
              <div className="brand-logo">R-35</div>
              <div className="brand-subtext">
                <span>FILM ARCHIVE</span>
                <span>COLLECTIBLE 35MM</span>
                <span>EST. 2026</span>
              </div>
            </div>

            <nav className="sidebar-nav">
              <div className="accent-bar" />
              <ul className="nav-list">
                {[
                  'HOME',
                  'COLLECTION',
                  'FILMMAKERS',
                  'ABOUT',
                  'PRICING',
                  'CONTACT',
                  ...(user ? ['LOGOUT'] : ['LOGIN / SIGNUP'])
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className={`nav-item ${((activeNav === item || (item === 'LOGIN / SIGNUP' && activeNav === 'AUTH')) && !selectedMovie) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (item === 'LOGOUT') {
                          handleLogout();
                        } else if (item === 'LOGIN / SIGNUP') {
                          handleNavClick('AUTH');
                        } else {
                          handleNavClick(item);
                        }
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="sidebar-bottom">
              <div className="archive-status">
                <span>ARCHIVE STATUS</span>
                <span className="status-online">
                  <span className="dot" /> ONLINE
                </span>
              </div>
              <div className="sidebar-footer">
                © 2026 R-35 FILM ARCHIVE<br />ALL RIGHTS RESERVED
              </div>
            </div>
          </aside>

          <main className="main-content">
            {/* TOP HEADER NAVIGATION */}
            <header className="header-nav revamped-header">
              <div className="mobile-header-brand" onClick={() => handleNavClick('HOME')}>R-35</div>
              
              {/* REVAMPED REAL-TIME SEARCH BAR */}
              <div className="revamped-search-bar-container">
                <span className="search-magnifying-glass">🔍</span>
                <input 
                  type="text" 
                  className="revamped-search-input" 
                  placeholder="Search for films, directors..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeNav !== 'COLLECTION') {
                      setActiveNav('COLLECTION');
                    }
                  }}
                />
                {searchQuery && (
                  <button className="search-clear-btn" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div>

              <div className="header-right-actions">
                {/* WISHLIST TRIGGER BADGE */}
                <div 
                  className="header-trigger-block wishlist-trigger" 
                  onClick={() => setIsWishlistOpen(!isWishlistOpen)}
                  title="Your Wishlist"
                >
                  <span className="trigger-icon">{wishlistItems.length > 0 ? '❤️' : '♡'}</span>
                  {wishlistItems.length > 0 && <span className="trigger-badge">{wishlistItems.length}</span>}
                </div>

                {/* CART TRIGGER BADGE */}
                <div 
                  className="header-trigger-block cart-trigger-badge" 
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  title="Your Cart"
                >
                  <span className="trigger-icon">🛒</span>
                  {cartCount > 0 && <span className="trigger-badge">{cartCount}</span>}
                </div>

                <span className="header-vertical-divider">|</span>

                {/* USER PROFILE DRIVEN AVATAR OR LOGIN */}
                {user ? (
                  <div className="header-user-dropdown-container">
                    <div className="header-user-avatar-trigger" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                      <div className="header-avatar-circle">
                        {(user?.email?.[0] || 'A').toUpperCase()}
                        <div className="avatar-active-dot" />
                      </div>
                      <span className="chevron-icon">▼</span>
                    </div>
                    
                    {isProfileDropdownOpen && (
                      <div className="header-user-dropdown-menu">
                        <div className="dropdown-user-email">{user.email}</div>
                        <button className="dropdown-menu-item" onClick={() => { setIsProfileDropdownOpen(false); handleNavClick('PROFILE'); }}>
                          👤 Profile
                        </button>
                        <button className="dropdown-menu-item" onClick={() => { setIsProfileDropdownOpen(false); handleNavClick('PRICING'); }}>
                          ₹ Pricing
                        </button>
                        <button className="dropdown-menu-item" onClick={() => { setIsProfileDropdownOpen(false); handleNavClick('SETTINGS'); }}>
                          ⚙️ Settings
                        </button>
                        <div className="dropdown-divider" />
                        <button className="dropdown-menu-item logout" onClick={() => { setIsProfileDropdownOpen(false); handleLogout(); }}>
                          🔐 Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button className="header-login-trigger-btn" onClick={() => handleNavClick('LOGIN / SIGNUP')}>
                    [ SECURE LOGIN ]
                  </button>
                )}
              </div>

              <button 
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? 'CLOSE \u2715' : 'MENU \u2630'}
              </button>
            </header>

            {/* DYNAMIC VIEW ROUTING LAYER */}
            {(() => {
              if (activeNav === 'ABOUT') {
                return (
                  <>
                    {/* ABOUT SHOWCASE SECTION */}
                    <section className="hero-section">
                      <div className="hero-left">
                        <span className="about-badge">ABOUT</span>
                        <h2 className="hero-tagline font-heading-bebas">
                          PRESERVING CINEMA.<br />HONORING HISTORY.
                        </h2>
                        <div className="accent-bar-large" />
                        <div className="hero-description about-description">
                          <p>
                            R-35 is an archive and marketplace dedicated<br />
                            to collectible 35mm motion picture film.
                          </p>
                          <p>
                            We preserve original film elements and provide<br />
                            access to rare, authentic cinema for collectors,<br />
                            institutions, and filmmakers.
                          </p>
                          <p>
                            Every reel has a story.<br />
                            We protect that story for the future.
                          </p>
                        </div>
                        <button 
                          className="about-archive-btn" 
                          onClick={() => handleNavClick('HOME')}
                        >
                          OUR ARCHIVE <span className="arrow-wide">&rarr;</span>
                        </button>
                      </div>

                      <div className="hero-right">
                        <div className="portrait-container">
                          <img 
                            src="/assets/halftone/ridley.png" 
                            alt="Ridley Scott Halftone Portrait" 
                            className="halftone-portrait"
                          />
                          <div className="portrait-metadata">
                            <span className="meta-name">RIDLEY SCOTT</span>
                            <span className="meta-role">DIRECTOR / PRODUCER</span>
                            <span className="meta-title">R-35 ADVISOR</span>
                            <div className="meta-line" />
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* BOTTOM NUMBERS & NEWSLETTER GRID */}
                    <section className="featured-section">
                      <div className="featured-sidebar">
                        <span className="vertical-label">R-35 BY THE NUMBERS</span>
                      </div>

                      <div className="featured-content">
                        <div className="stats-grid">
                          {/* STAT 01 */}
                          <div className="stat-column">
                            <div className="stat-num">12,000+</div>
                            <div className="stat-label">REELS ARCHIVED</div>
                            <p className="stat-desc">Original 35mm motion picture reels and elements.</p>
                          </div>

                          {/* STAT 02 */}
                          <div className="stat-column">
                            <div className="stat-num">85+</div>
                            <div className="stat-label">COUNTRIES REPRESENTED</div>
                            <p className="stat-desc">Film from around the world. Preserved in our archive.</p>
                          </div>

                          {/* STAT 03 */}
                          <div className="stat-column">
                            <div className="stat-num">100%</div>
                            <div className="stat-label">AUTHENTIC</div>
                            <p className="stat-desc">Every reel is verified, inspected, and cataloged.</p>
                          </div>

                          {/* STAT 04 */}
                          <div className="stat-column">
                            <div className="stat-num">EST. 2026</div>
                            <div className="stat-label">FOUNDED</div>
                            <p className="stat-desc">Built by filmmakers and archivists. For cinema.</p>
                          </div>

                          {/* NEWSLETTER COLUMN */}
                          <div className="newsletter-column">
                            <div className="newsletter-label">STAY UPDATED</div>
                            <p className="newsletter-desc">New acquisitions, archive stories, and film history.</p>
                            <form className="newsletter-input-form" onSubmit={(e) => { e.preventDefault(); e.target.reset(); }}>
                              <input type="email" placeholder="Enter your email" className="newsletter-input" required />
                              <button type="submit" className="newsletter-submit-arrow">&rarr;</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </section>
                  </>
                );
              } else if (activeNav === 'COLLECTION') {
                return (
                  <div className="collections-container">
                    <div className="collections-header-block">
                      <h1 className="collections-main-title font-heading-bebas">COLLECTIONS</h1>
                      <div className="accent-bar-small" />
                      <p className="collections-subtitle">
                        Timeless films. Original elements.<br />Preserved on 35mm.
                      </p>
                    </div>

                    <div className="collections-filter-bar">
                      <div className="filter-group">
                        <button className="filter-dropdown-btn">
                          FILTER <span className="chevron-down">&#9662;</span>
                        </button>
                        <button className="filter-dropdown-btn">
                          SORT BY <span className="chevron-down">&#9662;</span>
                        </button>
                      </div>
                      <div className="view-toggle">
                        <span className="view-label">VIEW</span>
                        <button className="toggle-btn active" title="Grid View">
                          <svg className="toggle-icon" viewBox="0 0 24 24" width="16" height="16">
                            <rect x="3" y="3" width="7" height="7" fill="currentColor"/>
                            <rect x="14" y="3" width="7" height="7" fill="currentColor"/>
                            <rect x="3" y="14" width="7" height="7" fill="currentColor"/>
                            <rect x="14" y="14" width="7" height="7" fill="currentColor"/>
                          </svg>
                        </button>
                        <button className="toggle-btn" title="List View">
                          <svg className="toggle-icon" viewBox="0 0 24 24" width="16" height="16">
                            <rect x="3" y="5" width="18" height="2" fill="currentColor"/>
                            <rect x="3" y="11" width="18" height="2" fill="currentColor"/>
                            <rect x="3" y="17" width="18" height="2" fill="currentColor"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="collections-cards-grid">
                      {collectionMovies
                        .filter(movie => {
                          const query = searchQuery.toLowerCase();
                          return movie.title.toLowerCase().includes(query) || movie.director.toLowerCase().includes(query) || movie.year.toLowerCase().includes(query);
                        })
                        .map((movie, index) => {
                          const displayId = (index + 1).toString().padStart(3, '0');
                          return (
                            <div 
                              key={movie.id} 
                              className="collections-vintage-card" 
                              onClick={() => openProductPage(movie)}
                            >
                              {/* Top half text details */}
                              <div className="collections-card-top">
                                <div className="card-brand-header">
                                  <span className="card-brand-tag">R-35</span>
                                  <span 
                                    className={`card-wishlist-toggle ${wishlistItems.find(item => item.id === movie.id) ? 'active' : ''}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleWishlist(movie);
                                    }}
                                    title={wishlistItems.find(item => item.id === movie.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                  >
                                    {wishlistItems.find(item => item.id === movie.id) ? '❤️' : '♡'}
                                  </span>
                                  <span className="card-index-tag">{displayId}</span>
                                </div>
                              
                              <h2 className="collections-card-title">{movie.title}</h2>
                              
                              <div className="card-divider-line" />
                              
                              <div className="card-directors-row">
                                <div className="card-director-group">
                                  <span className="card-dir-label">DIRECTED BY</span>
                                  <span className="card-dir-val">{movie.director}</span>
                                  <span className="card-gauge-label">35MM</span>
                                </div>
                                <span className="card-year-val">{movie.year}</span>
                              </div>
                            </div>

                            {/* Bottom half halftone scene */}
                            <div className="collections-card-bottom">
                              <div className="scene-image-wrapper">
                                <img 
                                  src={movie.poster} 
                                  alt={`${movie.title} Halftone Scene`} 
                                  className="scene-image-crop"
                                  style={{ objectPosition: movie.cropPosition || 'center center' }}
                                />
                                <div className="halftone-grid-overlay" />
                              </div>
                              <div className="card-footer-label">CLASSIC CINEMA ARCHIVE</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="collections-pagination">
                      <button className="pag-btn">&larr;</button>
                      <button className="pag-number active">01</button>
                      <button className="pag-number">02</button>
                      <button className="pag-number">03</button>
                      <button className="pag-btn">&rarr;</button>
                    </div>
                  </div>
                );
              } else if (activeNav === 'FILMMAKERS') {
                return (
                  <div className="filmmakers-container">
                    <div className="filmmakers-header-block">
                      <div className="filmmakers-header-top">
                        <h1 className="filmmakers-main-title font-heading-bebas">FILMMAKERS</h1>
                        <span className="filmmakers-count-badge">08 FILMMAKERS</span>
                      </div>
                      <div className="accent-bar-small" />
                      <div className="filmmakers-header-bottom">
                        <div className="filmmakers-subtitle">
                          <p>The visionaries behind timeless stories.</p>
                          <p>Explore collections by filmmaker.</p>
                        </div>
                        <div className="filmmakers-sort-control">
                          <span className="sort-label">SORT BY</span>
                          <button className="sort-dropdown-trigger">
                            A &ndash; Z <span className="chevron-down">&#9662;</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="filmmakers-table">
                      <div className="table-header">
                        <span className="th-filmmaker">FILMMAKER</span>
                        <span className="th-works">NOTABLE WORKS</span>
                        <span className="th-reels">REELS IN ARCHIVE</span>
                      </div>

                      <div className="table-body">
                        {filmmakers.map((director, i) => (
                          <div key={director.name} className="filmmaker-row">
                            <div className="col-filmmaker">
                              <span className="director-index">{(i + 1).toString().padStart(2, '0')}</span>
                              <span className="director-name">{director.name}</span>
                            </div>
                            <div className="col-works">
                              {director.works.map((work, wIdx) => (
                                <React.Fragment key={work}>
                                  {wIdx > 0 && <span className="work-dot">&bull;</span>}
                                  <span className="work-title">{work}</span>
                                </React.Fragment>
                              ))}
                            </div>
                            <div className="col-reels">
                              <span className="reels-count">{director.reels}</span>
                            </div>
                            <div className="col-arrow">
                              <span className="arrow-indicator">&rarr;</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              } else if (activeNav === 'CONTACT') {
                return (
                  <div className="contact-container">
                    <div className="contact-left">
                      <span className="contact-badge">INQUIRIES</span>
                      <h1 className="contact-title font-heading-bebas">GET IN TOUCH WITH R-35</h1>
                      <div className="accent-bar-large" />
                      <div className="contact-info-block">
                        <div className="info-item">
                          <span className="info-label">HEADQUARTERS</span>
                          <span className="info-val">35mm Vault St, London, EC1A 4HD</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">EMAIL</span>
                          <span className="info-val">archive@r-35.com</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">PHONE</span>
                          <span className="info-val">+44 (0) 20 7946 0192</span>
                        </div>
                      </div>
                    </div>
                    <div className="contact-right">
                      <form className="contact-form" onSubmit={(e) => { e.preventDefault(); e.target.reset(); alert('Inquiry sent successfully.'); }}>
                        <div className="form-row">
                          <div className="form-group">
                            <label className="form-label">NAME</label>
                            <input type="text" className="form-input" placeholder="Your name" required />
                          </div>
                          <div className="form-group">
                            <label className="form-label">EMAIL</label>
                            <input type="email" className="form-input" placeholder="Your email" required />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">SUBJECT</label>
                          <input type="text" className="form-input" placeholder="Acquisitions, Sales, etc." required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">MESSAGE</label>
                          <textarea className="form-textarea" placeholder="Describe your inquiry in detail..." required></textarea>
                        </div>
                        <button type="submit" className="contact-submit-btn">
                          SUBMIT FORM <span className="arrow-wide">&rarr;</span>
                        </button>
                      </form>
                    </div>
                  </div>
                );
              } else if (activeNav === 'AUTH' || activeNav === 'LOGIN / SIGNUP') {
                return renderAuth();
              } else if (activeNav === 'PROFILE') {
                return renderProfile();
              } else if (activeNav === 'PRICING') {
                return renderPricing();
              } else if (activeNav === 'SETTINGS') {
                return renderSettings();
              } else {
                // Default activeNav === 'HOME' Page view
                return (
                  <>
                    {/* HERO CORE SHOWCASE SECTION */}
                    <section className="hero-section">
                      <div className="hero-left">
                        <h1 className="hero-logo-large">R-35</h1>
                        <div className="accent-bar-large" />
                        <h2 className="hero-tagline">COLLECTIBLE<br />35MM FILM REELS.</h2>
                        <p className="hero-description">
                          Rare film. Verified history.<br />Preserved for the future.
                        </p>
                        <a href="#collection" className="browse-link" onClick={(e) => { e.preventDefault(); handleNavClick('COLLECTION'); }}>
                          BROWSE ARCHIVE <span className="arrow">&rarr;</span>
                        </a>
                      </div>

                      <div className="hero-right">
                        <div className="portrait-container">
                          <img 
                            src="/assets/halftone/katsuhiro.png" 
                            alt="Katsuhiro Otomo Halftone Portrait" 
                            className="halftone-portrait"
                          />
                          <div className="portrait-metadata">
                            <span className="meta-name">KATSUHIRO OTOMO</span>
                            <span className="meta-role">DIRECTOR</span>
                            <span className="meta-title">AKIRA</span>
                            <span className="meta-year">1988</span>
                            <div className="meta-line" />
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* BOTTOM FEATURED ARCHIVE BAR */}
                    <section className="featured-section">
                      <div className="featured-sidebar">
                        <span className="vertical-label">FEATURED ARCHIVE</span>
                      </div>

                      <div className="featured-content">
                        <div className="featured-header">
                          <a href="#collection" className="view-all-link" onClick={(e) => { e.preventDefault(); handleNavClick('COLLECTION'); }}>
                            VIEW ALL ARCHIVE <span className="arrow">&rarr;</span>
                          </a>
                        </div>

                        <div className="cards-grid">
                          {homeMovies.map((movie) => (
                            <div 
                              key={movie.id} 
                              className="movie-card" 
                              onClick={() => openProductPage(movie)}
                            >
                              <div className="card-number">{movie.id}</div>
                              <div className="card-body">
                                <div className="poster-wrapper">
                                  <img src={movie.poster} alt={`${movie.title} Movie Poster`} className="poster-img" />
                                </div>
                                <div className="card-details">
                                  <div className="movie-info">
                                    <h4 className="movie-title">{movie.title}</h4>
                                    <div className="movie-specs">
                                      <span>DIR. {movie.director}</span>
                                      <span>{movie.year}</span>
                                      <span>{movie.spec1}</span>
                                      <span>{movie.spec2}</span>
                                    </div>
                                  </div>
                                  <div className="movie-footer">
                                    <span className="price">{movie.price}</span>
                                    <span className="action-arrow">&rarr;</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </>
                );
              }
            })()}
          </main>
        </>
      )}

        {/* ==========================================================
           REUSABLE DYNAMIC PRODUCT DETAIL VIEW OVERLAY
           ========================================================== */}
        {selectedMovie && (
          <div className={`product-page-container ${isProductActive ? 'active' : 'exiting'}`}>
            {/* Left Content Half: Back link + Giant poster + Tech specs */}
            <div className="product-left">
              <button 
                className="product-back-btn" 
                onClick={closeProductPage}
              >
                &darr; BACK TO ARCHIVE
              </button>

              <div className="product-poster-section">
                <img 
                  src={selectedMovie.poster} 
                  alt={`${selectedMovie.title} Archival Poster`} 
                  className="product-poster-img"
                />
              </div>

              <div className="product-specs-grid">
                <div className="spec-item">
                  <span className="spec-label">FILM GAUGE</span>
                  <span className="spec-val">{selectedMovie.gauge}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">ASPECT RATIO</span>
                  <span className="spec-val">{selectedMovie.ratio}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">AUDIO ENCODING</span>
                  <span className="spec-val">{selectedMovie.audio}</span>
                </div>
              </div>
            </div>

            {/* Right Content Half: Film Description + Vault inspection + Action buttons */}
            <div className="product-right">
              <div className="product-main-details">
                <div className="product-meta-row">
                  <span className="product-meta-badge badge-highlight">PHYSICAL ASSET</span>
                  <span className="product-meta-badge">{selectedMovie.year}</span>
                  <span className="product-meta-badge">{selectedMovie.condition}</span>
                </div>

                <h1 className="product-title">{selectedMovie.title}</h1>
                <h3 className="product-director">DIR. {selectedMovie.director}</h3>
                
                <p className="product-synopsis">{selectedMovie.synopsis}</p>

                {/* Secure Archival Vault Verification Block */}
                <div className="product-vault-verification">
                  <div className="vault-title">
                    <span className="vault-check-icon">&#10003;</span> ARCHIVAL VAULT VERIFICATION
                  </div>
                  <div className="vault-grid">
                    <div className="vault-item">
                      <span className="vault-label">Vault Status</span>
                      <span className="vault-val">VERIFIED</span>
                    </div>
                    <div className="vault-item">
                      <span className="vault-label">Inspection</span>
                      <span className="vault-val">{selectedMovie.inspectionDate}</span>
                    </div>
                    <div className="vault-item">
                      <span className="vault-label">Film Base</span>
                      <span className="vault-val">{selectedMovie.vaultStatus}</span>
                    </div>
                    <div className="vault-item">
                      <span className="vault-label">Reel Length</span>
                      <span className="vault-val">{selectedMovie.length}</span>
                    </div>
                    <div className="vault-item">
                      <span className="vault-label">Safety Class</span>
                      <span className="vault-val">NON-FLAMMABLE</span>
                    </div>
                    <div className="vault-item">
                      <span className="vault-label">Certificate</span>
                      <span className="vault-val">ISSUED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Trigger Block */}
              <div className="product-purchase-section">
                <span className="product-price">{selectedMovie.price}</span>
                <div className="product-action-buttons">
                  <button 
                    className="product-buy-btn" 
                    onClick={() => handleAddToCart(selectedMovie)}
                    disabled={isAddedToCart}
                  >
                    {isAddedToCart ? (
                      <>REEL SECURED <span className="vault-check-icon">&#10003;</span></>
                    ) : (
                      <>ACQUIRE REEL <span className="arrow-wide">&rarr;</span></>
                    )}
                  </button>
                  <button 
                    className={`product-wishlist-btn ${wishlistItems.find(item => item.id === selectedMovie.id) ? 'active' : ''}`}
                    onClick={() => handleToggleWishlist(selectedMovie)}
                    title={wishlistItems.find(item => item.id === selectedMovie.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    {wishlistItems.find(item => item.id === selectedMovie.id) ? '❤️' : '♡'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================================
           YOUR WISHLIST OVERLAY VIEW
           ========================================================== */}
        {isWishlistOpen && (
          <div className={`cart-page-container wishlist-drawer-overlay ${isWishlistActive ? 'active' : 'exiting'}`}>
            <div className="cart-left-col">
              <h1 className="cart-main-title font-heading-bebas">YOUR WISHLIST</h1>
              <div className="accent-bar-small" />
              <p className="cart-subtitle-desc">
                Your archival collection favorites.<br />
                Acquire reels directly or manage your catalog bookmarks here.
              </p>

              <div className="cart-items-table">
                <div className="cart-table-header">
                  <span className="th-item">ITEM</span>
                  <span className="th-format">FORMAT</span>
                  <span className="th-price">PRICE</span>
                  <span className="th-remove">ACTION</span>
                </div>

                <div className="cart-table-body">
                  {wishlistItems.length === 0 ? (
                    <div className="empty-cart-state">
                      <div className="empty-cart-reel-icon">
                        <span style={{ fontSize: '3rem' }}>❤️</span>
                      </div>
                      <span className="empty-cart-label">WISHLIST EMPTY</span>
                      <p className="empty-cart-hint">Your favorites showcase is empty. Bookmarks help you track reels.</p>
                      <button
                        className="empty-cart-browse-btn"
                        onClick={() => { setIsWishlistOpen(false); }}
                      >
                        BROWSE CATALOG <span className="arrow-wide">&rarr;</span>
                      </button>
                    </div>
                  ) : (
                    wishlistItems.map((item, idx) => (
                      <div key={item.id} className="cart-item-row">
                        <div className="col-item-details">
                          <span className="item-index">{String(idx + 1).padStart(2, '0')}</span>
                          <div className="item-title-block">
                            <span className="item-title font-heading-bebas">{item.title}</span>
                            <span className="item-meta">DIR. {item.director}</span>
                            <span className="item-meta">{item.year}</span>
                          </div>
                        </div>

                        <div className="col-item-format">
                          <span className="format-gauge">{item.gauge || '35MM REEL'}</span>
                          <span className="format-cut">{item.spec2 || 'ORIGINAL RELEASE'}</span>
                        </div>

                        <div className="col-item-price">
                          <span className="item-price-val">{item.price}</span>
                        </div>

                        <div className="col-item-quantity" style={{ display: 'flex', gap: '1rem', width: 'auto', justifySelf: 'flex-end', alignItems: 'center' }}>
                          <button 
                            className="wishlist-acquire-btn"
                            onClick={() => {
                              handleAddToCart(item);
                            }}
                          >
                            [ ACQUIRE ]
                          </button>
                          <button 
                            className="remove-item-btn"
                            style={{ margin: 0 }}
                            onClick={() => handleToggleWishlist(item)}
                          >
                            &#10005;
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button className="continue-shopping-btn" onClick={() => setIsWishlistOpen(false)}>
                &larr; CLOSE WISHLIST
              </button>
            </div>
          </div>
        )}

        {/* ==========================================================
           YOUR CART OVERLAY VIEW
           ========================================================== */}
        {isCartOpen && (
          <div className={`cart-page-container ${isCartActive ? 'active' : 'exiting'}`}>
            <div className="cart-left-col">
              <h1 className="cart-main-title font-heading-bebas">YOUR CART</h1>
              <div className="accent-bar-small" />
              <p className="cart-subtitle-desc">
                Review your selected items.<br />
                All reels are carefully packed and shipped with archival-grade protection.
              </p>

              <div className="cart-items-table">
                <div className="cart-table-header">
                  <span className="th-item">ITEM</span>
                  <span className="th-format">FORMAT</span>
                  <span className="th-price">PRICE</span>
                  <span className="th-remove">REMOVE</span>
                </div>

                <div className="cart-table-body">
                  {cartItems.length === 0 ? (
                    <div className="empty-cart-state">
                      <div className="empty-cart-reel-icon">
                        <svg viewBox="0 0 80 80" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.2">
                          <circle cx="40" cy="40" r="36" strokeDasharray="4 3" />
                          <circle cx="40" cy="40" r="20" />
                          <circle cx="40" cy="40" r="5" fill="currentColor" stroke="none" />
                          <circle cx="40" cy="20" r="4" fill="currentColor" stroke="none" />
                          <circle cx="40" cy="60" r="4" fill="currentColor" stroke="none" />
                          <circle cx="57.3" cy="30" r="4" fill="currentColor" stroke="none" />
                          <circle cx="22.7" cy="30" r="4" fill="currentColor" stroke="none" />
                          <circle cx="57.3" cy="50" r="4" fill="currentColor" stroke="none" />
                          <circle cx="22.7" cy="50" r="4" fill="currentColor" stroke="none" />
                        </svg>
                      </div>
                      <span className="empty-cart-label">NO REELS ACQUIRED</span>
                      <p className="empty-cart-hint">Browse the archive and add a film reel to your collection.</p>
                      <button
                        className="empty-cart-browse-btn"
                        onClick={() => { setIsCartOpen(false); }}
                      >
                        BROWSE ARCHIVE <span className="arrow-wide">&rarr;</span>
                      </button>
                    </div>
                  ) : (
                    cartItems.map((item, idx) => (
                      <div key={item.id} className="cart-item-row">
                        <div className="col-item-details">
                          <span className="item-index">{String(idx + 1).padStart(2, '0')}</span>
                          <div className="item-title-block">
                            <span className="item-title font-heading-bebas">{item.title}</span>
                            <span className="item-meta">DIR. {item.director}</span>
                            <span className="item-meta">{item.year}</span>
                          </div>
                        </div>

                        <div className="col-item-format">
                          <span className="format-gauge">{item.gauge || '35MM REEL'}</span>
                          <span className="format-cut">{item.spec2 || 'ORIGINAL RELEASE'}</span>
                        </div>

                        <div className="col-item-price">
                          <span className="item-price-val">{item.price}</span>
                        </div>

                        <div className="col-item-quantity">
                          <div className="quantity-selector">
                            <button className="qty-btn" onClick={() => handleDecreaseQty(item.id)}>&ndash;</button>
                            <span className="qty-val">{item.quantity}</span>
                            <button className="qty-btn" onClick={() => handleIncreaseQty(item.id)}>+</button>
                          </div>
                        </div>

                        <div className="col-item-remove">
                          <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>&#10005;</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button className="continue-shopping-btn" onClick={() => setIsCartOpen(false)}>
                &larr; CONTINUE SHOPPING
              </button>
            </div>

            <div className="cart-right-col">
              <div className="order-summary-card">
                <h2 className="summary-title font-heading-bebas">ORDER SUMMARY</h2>
                <div className="accent-bar-small" />
                
                <div className="summary-rows">
                  <div className="summary-row">
                    <span className="row-label">SUBTOTAL</span>
                    <span className="row-val">${subtotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </div>
                  <div className="summary-row">
                    <span className="row-label">SHIPPING</span>
                    <span className="row-val">${shipping.toFixed(2)}</span>
                  </div>
                </div>

                <div className="summary-divider" />

                <div className="summary-total-row">
                  <span className="total-label">TOTAL</span>
                  <span className="total-val">${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </div>

                <button
                  className="checkout-btn"
                  onClick={openCheckout}
                  disabled={cartItems.length === 0}
                  style={cartItems.length === 0 ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                >
                  PROCEED TO CHECKOUT <span className="arrow-wide">&rarr;</span>
                </button>

                <div className="trust-badges-list">
                  <div className="badge-item">
                    <div className="badge-icon-box">
                      <svg className="badge-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 8H17" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 12H17" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 16H13" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="badge-text-block">
                      <span className="badge-title">SECURE PACKAGING</span>
                      <span className="badge-desc">All reels are packed with archival materials for maximum protection.</span>
                    </div>
                  </div>

                  <div className="badge-item">
                    <div className="badge-icon-box">
                      <svg className="badge-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="4" width="14" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 8h4l2 3v5h-6V8z" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="5.5" cy="18.5" r="2.5"/>
                        <circle cx="16.5" cy="18.5" r="2.5"/>
                      </svg>
                    </div>
                    <div className="badge-text-block">
                      <span className="badge-title">WORLDWIDE SHIPPING</span>
                      <span className="badge-desc">Tracked and insured shipping to select countries.</span>
                    </div>
                  </div>

                  <div className="badge-item">
                    <div className="badge-icon-box">
                      <svg className="badge-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="badge-text-block">
                      <span className="badge-title">AUTHENTIC & VERIFIED</span>
                      <span className="badge-desc">Every reel is verified for authenticity and condition.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            MULTI-STEP CHECKOUT OVERLAY
            ================================================================ */}
        {isCheckoutOpen && (() => {
          // Shared order summary sidebar
          const shippingCostNow = shippingMethod === 'express' ? 85 : 45;
          // Use snapshot on confirmation step (cart is cleared at that point)
          const summaryItems = checkoutStep === 3 ? orderedItems : cartItems;
          const subTotalNow = summaryItems.reduce((s, i) => s + parseFloat(i.price.replace('$','')) * i.quantity, 0);
          const totalNow = subTotalNow + (summaryItems.length === 0 ? 0 : shippingCostNow);

          const SummaryCol = () => (
            <div className="checkout-summary-col">
              <h2 className="checkout-summary-title font-heading-bebas">ORDER SUMMARY</h2>
              <div className="accent-bar-small" />
              <div className="checkout-summary-items">
                {summaryItems.map(item => (
                  <div key={item.id} className="checkout-summary-item">
                    <div className="cs-item-info">
                      <span className="cs-qty-badge">{String(item.quantity).padStart(2,'0')}</span>
                      <div>
                        <div className="cs-item-title">{item.title}</div>
                        <span className="cs-item-sub">35MM REEL</span>
                      </div>
                    </div>
                    <span className="cs-item-price">${(parseFloat(item.price.replace('$','')) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="checkout-totals">
                <div className="checkout-total-row">
                  <span className="ct-label">SUBTOTAL</span>
                  <span className="ct-val">${subTotalNow.toFixed(2)}</span>
                </div>
                <div className="checkout-total-row">
                  <span className="ct-label">SHIPPING</span>
                  <span className="ct-val">${shippingCostNow.toFixed(2)}</span>
                </div>
                <div className="checkout-total-row grand">
                  <span className="ct-label">TOTAL</span>
                  <span className="ct-val">${totalNow.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                </div>
              </div>
              <div className="checkout-summary-badges">
                {[{icon:'M3 3h18l-2 13H5L3 3z M7 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M17 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', label:'SECURE PACKAGING', desc:'Archival-grade materials on every reel.'},
                  {icon:'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label:'WORLDWIDE SHIPPING', desc:'Tracked & insured to select countries.'},
                  {icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label:'AUTHENTIC & VERIFIED', desc:'Every reel verified for authenticity.'}]
                  .map(b => (
                    <div key={b.label} className="badge-item">
                      <div className="badge-icon-box">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d={b.icon} strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="badge-text-block">
                        <span className="badge-title">{b.label}</span>
                        <span className="badge-desc">{b.desc}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );

          const stepClass = (n) =>
            checkoutStep > n ? 'done' : checkoutStep === n ? 'active' : '';

          const StepsBar = () => (
            <div className="checkout-steps-bar">
              {[
                [1, 'CART'],
                [2, 'CHECKOUT'],
                [3, 'PAYMENT'],
                [4, 'CONFIRMATION'],
              ].map(([n, label]) => (
                <div key={n} className={`checkout-step-item ${checkoutStep >= n ? (checkoutStep === n ? 'active' : 'done') : ''}`}>
                  <span className="step-num">{String(n).padStart(2,'0')}.</span>
                  {label}
                </div>
              ))}
            </div>
          );

          /* ── STEP 1: BILLING / SHIPPING ── */
          if (checkoutStep === 1) return (
            <div className={`checkout-overlay ${isCheckoutActive ? 'active' : 'exiting'}`}>
              <StepsBar />
              <div className="checkout-body">
                <div className="checkout-form-col">
                  <h1 className="checkout-col-title font-heading-bebas">CHECKOUT</h1>

                  {/* Billing */}
                  <div className="form-section-heading">
                    BILLING INFORMATION
                    <span className="form-section-req">* REQUIRED</span>
                  </div>
                  <div className="form-row-2">
                    <div className="field-group">
                      <label className="field-label">FULL NAME *</label>
                      <input className="field-input" placeholder="Enter your full name" value={billingInfo.fullName} onChange={e => setBillingInfo(p=>({...p,fullName:e.target.value}))} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">EMAIL ADDRESS *</label>
                      <input className="field-input" type="email" placeholder="Enter your email" value={billingInfo.email} onChange={e => setBillingInfo(p=>({...p,email:e.target.value}))} />
                    </div>
                  </div>
                  <div className="form-row-2">
                    <div className="field-group">
                      <label className="field-label">PHONE NUMBER</label>
                      <input className="field-input" placeholder="Enter your phone number" value={billingInfo.phone} onChange={e => setBillingInfo(p=>({...p,phone:e.target.value}))} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">COUNTRY / REGION *</label>
                      <select className="field-select" value={billingInfo.country} onChange={e => setBillingInfo(p=>({...p,country:e.target.value}))}>
                        <option value="">Select country</option>
                        {['United States','United Kingdom','Germany','France','Japan','Australia','Canada','India','Italy','Spain'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-row-1">
                    <div className="field-group">
                      <label className="field-label">ADDRESS *</label>
                      <input className="field-input" placeholder="Enter your address" value={billingInfo.address} onChange={e => setBillingInfo(p=>({...p,address:e.target.value}))} />
                    </div>
                  </div>
                  <div className="form-row-1">
                    <div className="field-group">
                      <label className="field-label">APARTMENT, SUITE, ETC. (OPTIONAL)</label>
                      <input className="field-input" placeholder="Enter apartment, suite, etc." value={billingInfo.apt} onChange={e => setBillingInfo(p=>({...p,apt:e.target.value}))} />
                    </div>
                  </div>
                  <div className="form-row-3">
                    <div className="field-group">
                      <label className="field-label">CITY *</label>
                      <input className="field-input" placeholder="Enter your city" value={billingInfo.city} onChange={e => setBillingInfo(p=>({...p,city:e.target.value}))} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">STATE / PROVINCE *</label>
                      <input className="field-input" placeholder="Enter your state" value={billingInfo.state} onChange={e => setBillingInfo(p=>({...p,state:e.target.value}))} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">ZIP / POSTAL CODE *</label>
                      <input className="field-input" placeholder="Enter ZIP" value={billingInfo.zip} onChange={e => setBillingInfo(p=>({...p,zip:e.target.value}))} />
                    </div>
                  </div>

                  <label className="field-checkbox-row">
                    <input type="checkbox" className="field-checkbox" checked={billingInfo.sameAddress} onChange={e => setBillingInfo(p=>({...p,sameAddress:e.target.checked}))} />
                    <span className="field-checkbox-label">SHIPPING ADDRESS IS THE SAME AS BILLING ADDRESS</span>
                  </label>

                  {/* Shipping method */}
                  <div className="form-section-heading">SHIPPING METHOD</div>
                  <div className="shipping-options">
                    {[
                      { id:'standard', name:'STANDARD SHIPPING', eta:'7–14 business days', price:'$45.00' },
                      { id:'express',  name:'EXPRESS SHIPPING',  eta:'2–5 business days',  price:'$85.00' },
                    ].map(opt => (
                      <div key={opt.id} className={`shipping-option ${shippingMethod===opt.id?'selected':''}`} onClick={() => setShippingMethod(opt.id)}>
                        <div className="shipping-radio"><div className="shipping-radio-dot" /></div>
                        <div className="shipping-info">
                          <span className="shipping-name">{opt.name}</span>
                          <span className="shipping-eta">{opt.eta}</span>
                        </div>
                        <span className="shipping-price">{opt.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="form-actions-bar">
                    <button className="form-back-btn" onClick={closeCheckout}>&larr; RETURN TO CART</button>
                    <button className="form-next-btn" onClick={() => setCheckoutStep(2)}>CONTINUE TO PAYMENT &rarr;</button>
                  </div>
                </div>
                <SummaryCol />
              </div>
            </div>
          );

          /* ── STEP 2: PAYMENT ── */
          if (checkoutStep === 2) return (
            <div className={`checkout-overlay ${isCheckoutActive ? 'active' : 'exiting'}`}>
              <StepsBar />
              <div className="checkout-body">
                <div className="checkout-form-col">
                  <h1 className="checkout-col-title font-heading-bebas">PAYMENT</h1>

                  {/* Fake card visual */}
                  <div className="card-visual">
                    <div className="card-visual-top">
                      <div className="card-chip" />
                      <span className="card-brand-name">R-35 VAULT CARD</span>
                    </div>
                    <div className="card-number-display">
                      {cardInfo.cardNumber
                        ? cardInfo.cardNumber.replace(/(.{4})/g,'$1 ').trim().padEnd(19,'─')
                        : '──── ──── ──── ────'}
                    </div>
                  </div>

                  <div className="form-section-heading">
                    CARD DETAILS
                    <span className="form-section-req">SECURE SSL ENCRYPTED</span>
                  </div>

                  <div className="form-row-1">
                    <div className="field-group">
                      <label className="field-label">NAME ON CARD *</label>
                      <input className="field-input" placeholder="As it appears on the card" value={cardInfo.cardName} onChange={e => setCardInfo(p=>({...p,cardName:e.target.value}))} />
                    </div>
                  </div>

                  <div className="form-row-1">
                    <div className="field-group card-number-field">
                      <label className="field-label">CARD NUMBER *</label>
                      <input
                        className="field-input"
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        value={cardInfo.cardNumber}
                        onChange={e => {
                          const v = e.target.value.replace(/\D/g,'').slice(0,16);
                          const fmt = v.replace(/(.{4})/g,'$1 ').trim();
                          setCardInfo(p=>({...p,cardNumber:fmt}));
                        }}
                      />
                      <div className="card-type-icons">
                        <div className="card-type-icon">VISA</div>
                        <div className="card-type-icon">MC</div>
                        <div className="card-type-icon">AMEX</div>
                      </div>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="field-group">
                      <label className="field-label">EXPIRY DATE *</label>
                      <input
                        className="field-input"
                        placeholder="MM / YY"
                        maxLength={7}
                        value={cardInfo.expiry}
                        onChange={e => {
                          const v = e.target.value.replace(/\D/g,'').slice(0,4);
                          const fmt = v.length > 2 ? v.slice(0,2)+' / '+v.slice(2) : v;
                          setCardInfo(p=>({...p,expiry:fmt}));
                        }}
                      />
                    </div>
                    <div className="field-group">
                      <label className="field-label">CVV *</label>
                      <input
                        className="field-input"
                        placeholder="───"
                        maxLength={4}
                        type="password"
                        value={cardInfo.cvv}
                        onChange={e => setCardInfo(p=>({...p,cvv:e.target.value.replace(/\D/g,'').slice(0,4)}))}
                      />
                    </div>
                  </div>

                  <div className="form-section-heading">BILLING ADDRESS</div>
                  <p style={{fontFamily:'var(--font-mono)',fontSize:'0.62rem',color:'var(--text-muted)',letterSpacing:'0.05em',margin:'0 0 1rem'}}>
                    {billingInfo.sameAddress ? `${billingInfo.address}${billingInfo.apt?', '+billingInfo.apt:''}, ${billingInfo.city}, ${billingInfo.state} ${billingInfo.zip}, ${billingInfo.country}` : 'Different from shipping address.'}
                  </p>

                  <div className="form-actions-bar">
                    <button className="form-back-btn" onClick={() => setCheckoutStep(1)}>&larr; BACK TO CHECKOUT</button>
                    <button
                      className="form-next-btn"
                      onClick={async () => {
                        const ref = 'R35-' + Date.now().toString(36).toUpperCase();
                        setOrderRef(ref);
                        setOrderedItems([...cartItems]); // snapshot before clearing

                        try {
                          const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);
                          const shippingCostNow = shippingMethod === 'express' ? 35 : 15;
                          const totalNow = subtotal + shippingCostNow;

                          const { error } = await supabase.from('orders').insert([
                            {
                              order_reference: ref,
                              full_name: billingInfo.fullName,
                              email: user?.email || billingInfo.email,
                              phone: billingInfo.phone,
                              country: billingInfo.country,
                              address_line: billingInfo.address,
                              apartment: billingInfo.apt,
                              city: billingInfo.city,
                              state: billingInfo.state,
                              zip_code: billingInfo.zip,
                              shipping_method: shippingMethod,
                              subtotal: subtotal,
                              shipping_cost: shippingCostNow,
                              total_cost: totalNow,
                              ordered_items: cartItems
                            }
                          ]);

                          if (!error && user) {
                            // Dynamically refresh orders logs for instant profile mapping
                            supabase.from('orders')
                              .select('*')
                              .eq('email', user.email)
                              .order('created_at', { ascending: false })
                              .then(({ data }) => {
                                if (data) setUserOrders(data);
                              });
                          }

                          if (error) {
                            console.error("Order insertion failed to Supabase:", error);
                          }
                        } catch (err) {
                          console.warn("Could not sync order log to Supabase:", err);
                        }

                        setCheckoutStep(3);
                        setCartItems([]);
                      }}
                    >
                      PLACE ORDER &rarr;
                    </button>
                  </div>
                </div>
                <SummaryCol />
              </div>
            </div>
          );

          /* ── STEP 3: CONFIRMATION ── */
          return (
            <div className={`checkout-overlay ${isCheckoutActive ? 'active' : 'exiting'}`}>
              <StepsBar />
              <div className="confirmation-body">
                <div className="confirmation-card">
                  {/* Film reel hole strip decoration */}
                  <div className="conf-reel-strip">
                    {Array.from({length:24}).map((_,i) => <div key={i} className="conf-reel-hole" />)}
                  </div>

                  <div className="confirmation-icon-ring">
                    <span className="confirmation-check">&#10003;</span>
                  </div>

                  <h1 className="confirmation-headline font-heading-bebas">REEL SECURED.</h1>
                  <p className="confirmation-sub">
                    Your archival film print has been reserved from the R-35 vault.<br />
                    A confirmation receipt has been sent to <strong style={{color:'var(--text-white)'}}>{billingInfo.email || 'your email'}</strong>.<br />
                    Expect delivery within {shippingMethod === 'express' ? '2–5' : '7–14'} business days.
                  </p>

                  {/* Reference bar */}
                  <div className="confirmation-ref-bar">
                    <div>
                      <div className="conf-ref-label">ORDER REFERENCE</div>
                      <div className="conf-ref-val">{orderRef}</div>
                    </div>
                    <div className="conf-ref-divider" />
                    <div>
                      <div className="conf-ref-label">DATE</div>
                      <div className="conf-ref-val">{new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase()}</div>
                    </div>
                    <div className="conf-ref-divider" />
                    <div>
                      <div className="conf-ref-label">SHIPPING</div>
                      <div className="conf-ref-val">{shippingMethod === 'express' ? 'EXPRESS' : 'STANDARD'}</div>
                    </div>
                  </div>

                  <div className="confirmation-actions">
                    <button
                      className="conf-home-btn"
                      onClick={() => {
                        closeCheckout();
                        setTimeout(() => handleNavClick('HOME'), 700);
                      }}
                    >
                      BACK TO HOME &rarr;
                    </button>
                    <button
                      className="conf-browse-btn"
                      onClick={() => {
                        closeCheckout();
                        setTimeout(() => handleNavClick('COLLECTION'), 700);
                      }}
                    >
                      BROWSE ARCHIVE &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

      {isAuthWarningOpen && (
        <div className="cartoon-warning-overlay">
          <div className="cartoon-warning-box theme-dark-vault">
            <div className="cartoon-warning-header theme-dark-vault">
              <span className="warning-status-dot red blink" />
              <span className="warning-status-dot grey" />
              <span className="warning-status-dot grey" />
              <span className="cartoon-warning-title">VAULT LOCKDOWN // ACCESS RESTRICTED</span>
              <button 
                className="cartoon-warning-close-btn theme-dark-vault" 
                onClick={() => setIsAuthWarningOpen(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="cartoon-warning-body theme-dark-vault">
              <div className="cartoon-warning-icon theme-dark-vault">
                <span className="warning-eyes theme-dark-vault">🚨</span>
                <span className="warning-excl theme-dark-vault">⚠️</span>
              </div>
              
              <h2 className="cartoon-warning-heading theme-dark-vault font-heading-bebas">HALT! AUTHENTICATION REQUIRED</h2>
              <p className="cartoon-warning-message theme-dark-vault">
                Whoops! You are trying to acquire physical 35mm motion picture celluloid reels as a <strong>GUEST SPECTATOR</strong>.
                <br /><br />
                Archival regulations require a verified <strong>Operator Account</strong> to decrypt print pricing and unlock checkouts. Secure your keys now!
              </p>
              
              <div className="cartoon-warning-actions theme-dark-vault">
                <button 
                  className="cartoon-btn-primary theme-dark-vault"
                  onClick={() => {
                    setIsAuthWarningOpen(false);
                    handleNavClick(user ? 'PROFILE' : 'LOGIN / SIGNUP');
                  }}
                >
                  DECRYPT ACCESS KEY (LOGIN) →
                </button>
                <button 
                  className="cartoon-btn-secondary theme-dark-vault"
                  onClick={() => setIsAuthWarningOpen(false)}
                >
                  DISMISS VAULT ALERT ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && showOnboarding && (
        <div className="profile-modal-overlay-v2" style={{ zIndex: 11000 }}>
          <div className="profile-modal-box-v2" style={{ maxWidth: '540px' }}>
            <h2 className="profile-modal-title" style={{ fontFamily: 'var(--font-sans)', fontWeight: 'bold' }}>Operator Onboarding</h2>
            <p className="profile-modal-desc" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Welcome to R-35 Vault. Please complete your archivist details to initialize catalog authorization.
            </p>
            <form onSubmit={handleOnboardingSubmit} className="profile-v2-edit-form" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div className="profile-v2-edit-group">
                <label className="profile-v2-edit-label">FULL NAME</label>
                <input 
                  type="text" 
                  className="profile-v2-edit-input" 
                  placeholder="e.g. Yash Patel" 
                  value={tempOnboardName} 
                  onChange={e => setTempOnboardName(e.target.value)} 
                  required 
                />
              </div>
              <div className="profile-v2-edit-group">
                <label className="profile-v2-edit-label">PHONE NUMBER</label>
                <input 
                  type="text" 
                  className="profile-v2-edit-input" 
                  placeholder="e.g. +91 98765 43210" 
                  value={tempOnboardPhone} 
                  onChange={e => setTempOnboardPhone(e.target.value)} 
                  required 
                />
              </div>
              <div className="profile-v2-edit-group">
                <label className="profile-v2-edit-label">SHIPPING ADDRESS</label>
                <input 
                  type="text" 
                  className="profile-v2-edit-input" 
                  placeholder="e.g. 123 Film Street, Andheri West" 
                  value={tempOnboardStreet} 
                  onChange={e => setTempOnboardStreet(e.target.value)} 
                  required 
                />
              </div>
              
              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <div className="profile-v2-edit-group" style={{ flex: 1 }}>
                  <label className="profile-v2-edit-label">CITY</label>
                  <input type="text" className="profile-v2-edit-input" placeholder="e.g. Mumbai" value={tempOnboardCity} onChange={e => setTempOnboardCity(e.target.value)} required />
                </div>
                <div className="profile-v2-edit-group" style={{ flex: 1 }}>
                  <label className="profile-v2-edit-label">STATE</label>
                  <input type="text" className="profile-v2-edit-input" placeholder="e.g. Maharashtra" value={tempOnboardState} onChange={e => setTempOnboardState(e.target.value)} required />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <div className="profile-v2-edit-group" style={{ flex: 1 }}>
                  <label className="profile-v2-edit-label">ZIP CODE</label>
                  <input type="text" className="profile-v2-edit-input" placeholder="e.g. 400053" value={tempOnboardZip} onChange={e => setTempOnboardZip(e.target.value)} required />
                </div>
                <div className="profile-v2-edit-group" style={{ flex: 1 }}>
                  <label className="profile-v2-edit-label">COUNTRY</label>
                  <input type="text" className="profile-v2-edit-input" placeholder="e.g. India" value={tempOnboardCountry} onChange={e => setTempOnboardCountry(e.target.value)} required />
                </div>
              </div>

              <button type="submit" className="edit-action-btn save" style={{ marginTop: '1rem', padding: '0.95rem' }}>
                ACTIVATE CONSOLE ACCESS &rarr;
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const navItems = ['HOME', 'COLLECTION', 'FILMMAKERS', 'ABOUT', 'CONTACT'];
