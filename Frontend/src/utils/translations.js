// Translation dictionary for MandiTrack (English & Marathi)

const translations = {
  en: {
    // Brand & Header
    brandName: "MandiTrack",
    portalSubtitle: "A step towards a stronger farming community",
    prototypeBadge: "Prototype | Built for a Better Tomorrow",
    home: "Home",
    about: "About",
    features: "Features",
    contact: "Contact",

    // Language Selection Screen
    chooseLanguage: "Choose your language",
    chooseLanguageSub: "Select your preferred language to get started with MandiTrack",
    englishTitle: "English",
    englishDesc: "Continue in English",
    marathiTitle: "मराठी",
    marathiDesc: "मराठी भाषेत पुढे जा",
    continueBtn: "Continue",

    // Landing Page
    heroHeadline: "Track your produce from entry to payment",
    heroSubtext: "A simple and transparent platform for farmers and market officers.",
    farmerLoginBtn: "Farmer Login",
    officerLoginBtn: "Officer Login",
    betterMarketAccess: "Better Market Access",
    transparentProcess: "Transparent Process",
    fairPrices: "Fair Prices",
    supportForFarmers: "Support for Farmers",

    // Roles
    selectRole: "Select Role",
    farmerRole: "Farmer",
    officerRole: "Officer / Market Officer",

    // Login Page
    loginTitle: "Login to MandiTrack",
    loginSub: "Enter your credentials to continue",
    mobileNumber: "Mobile Number",
    mobilePlaceholder: "Enter your mobile number",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    loginBtn: "Login",
    dontHaveAccount: "Don't have an account?",
    registerHere: "Register here",

    // Registration Page
    registerTitle: "Create Your Account",
    registerSub: "Join MandiTrack today",
    fullName: "Full Name",
    namePlaceholder: "Enter your full name",
    createPasswordPlaceholder: "Create a password",
    registerBtn: "Register",
    alreadyHaveAccount: "Already have an account?",
    loginHere: "Login here",

    // Statuses
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    sold: "Sold",

    // Farmer Dashboard
    farmerPortal: "🌾 Farmer Portal",
    welcomeFarmer: "Welcome",
    farmerSubtext: "Submit your produce and track it through the mandi",
    addProduceBtn: "+ Add Produce",
    myProduceLots: "My Produce Lots",
    myLotsSubtext: "Every lot you have submitted, with its latest status",
    totalSubmitted: "Total Submitted",
    pendingReview: "Pending Review",
    approvedLots: "Approved",
    soldCompleted: "Sold",
    noLotsTitle: "No produce lots yet",
    noLotsSubtext: "Add your first crop to get started",

    // Officer Dashboard
    officerPortal: "Officer Portal",
    officerTitle: "Officer Dashboard",
    officerSubtext: "Review farmer submissions and update lot status",
    allLots: "All Lots",
    rejectedLots: "Rejected",
    farmerInfo: "Farmer",
    actions: "Actions",
    approveBtn: "Approve",
    rejectBtn: "Reject",
    markSoldBtn: "Mark Sold",
    noOfficerLotsTitle: "No lots found",
    noOfficerLotsSubtext: "No lots match the selected filter right now.",
    statusUpdatedTo: "Lot status updated to",
    officerLoadFailed: "Could not load lots for review.",
    statusUpdateFailed: "Could not update the lot status.",
    unknownFarmer: "Unknown farmer",
    notAvailable: "N/A",

    // Lot Table Columns
    cropName: "Crop",
    quantity: "Quantity",
    mandi: "Mandi",
    expectedPrice: "Expected Price",
    date: "Date",
    status: "Status",

    // Mandi Prices
    mandiPricesTitle: "Mandi Prices",
    mandiPricesBadge: "📊 Mandi Market Prices",
    mandiPricesHeading: "Agricultural Produce Market Prices",
    mandiPricesSubtext: "Real mandi market arrival prices fetched via open-data services.",
    refreshPrices: "Refresh Prices",
    fetchingPrices: "Fetching market prices...",
    pricesUnavailable: "Market price data is currently unavailable.",
    pricesUnavailableHelp: "Market price data could not be retrieved right now. Please check back later.",
    sourceLabel: "Source",
    dataDateLabel: "Data Date",
    filterByCrop: "Filter by Crop / Commodity",
    filterByCropHint: "e.g. Wheat, Rice, Cotton...",
    filterByMandi: "Filter by Mandi / Market",
    filterByMandiHint: "e.g. Pune, Nashik, Nagpur...",
    colCommodity: "Crop / Commodity",
    colMarket: "Mandi / Market",
    colDistrict: "District / State",
    colMinPrice: "Min Price",
    colMaxPrice: "Max Price",
    colModalPrice: "Modal Price",
    colArrivalDate: "Arrival Date",
    noMatchingPrices: "No prices match your filters.",

    // Navbar
    navTagline: "Farmer & Mandi Process Management",
    logout: "Logout",
    roleFarmer: "Farmer",
    roleOfficer: "Officer",
    roleAdmin: "Admin",

    // Auth Modal
    welcomeBack: "Welcome Back",
    createAccount: "Create Account",
    farmerOption: "🌾 Farmer",
    officerOption: "🏛️ Mandi Officer",
    nameExample: "e.g. Ramesh Patil",
    mobileHint: "10-digit mobile number",
    processing: "Processing...",
    loginAsFarmer: "Login as Farmer",
    loginAsOfficer: "Login as Officer",
    registerAsFarmer: "Register as Farmer",
    registerAsOfficer: "Register as Officer",
    fillMobilePassword: "Please fill in mobile number and password.",
    enterYourName: "Please enter your name.",
    registrationSuccess: "Registration successful! Logging you in...",
    genericAuthError: "Something went wrong. Please try again.",
    close: "Close",
    invalidMobile: "Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9.",
    passwordTooShort: "Password must be at least 6 characters.",
    passwordHint: "At least 6 characters",

    // Add Lot Modal
    addLotTitle: "Add Produce / Create Lot",
    cropLabel: "Crop Name",
    selectCrop: "-- Select Crop --",
    otherSpecify: "Other (Specify)",
    enterCropName: "Enter crop name",
    quantityLabel: "Quantity",
    quantityExample: "e.g. 50",
    unitLabel: "Unit",
    unitQuintal: "quintal",
    unitKg: "kg",
    unitTon: "ton",
    targetMandi: "Target Mandi",
    selectMandi: "-- Select Mandi --",
    enterMandiName: "Enter Mandi name",
    expectedPriceLabel: "Expected Price",
    priceExample: "e.g. 2400",
    perUnit: "per",
    cancel: "Cancel",
    submitting: "Submitting...",
    submitLot: "Submit Produce Lot",
    fillAllFields: "Please fill in all required fields.",
    quantityPositive: "Quantity must be greater than 0.",
    priceNotNegative: "Expected price cannot be negative.",
    lotSubmitted: "Produce lot submitted successfully!",
    lotSubmitFailed: "Failed to submit produce lot.",
    loadFailed: "Could not load your lots.",

    // Landing Hero (logged-out App shell)
    heroBadge: "🌱 Mandi Process Management Platform",
    // The headline is split so Marathi can put the verb last: lead + accent + trail.
    heroHeadlineLead: "Track your produce from",
    heroHeadlineAccent: "entry to payment.",
    heroHeadlineTrail: "",
    heroDescription:
      "MandiTrack connects farmers with market officers — lot submission, an approval queue and live mandi prices, all in one transparent place.",
    farmerRegisterBtn: "Farmer Register",
    statLiveValue: "Live",
    statTransparent: "Transparent",
    statSecureAuth: "Secure Auth",
    statStatusTracking: "Status Tracking",
    previewLotLabel: "Produce Lot",
    previewQuantity: "50 Quintals",
    previewPrice: "₹2,400 / Quintal",
    previewFooter: "Log in as a farmer or officer to see live data",
    footerBrand: "MandiTrack Prototype",
    footerCredit: "Designed & developed by the MandiTrack team",

    // General Actions
    refresh: "Refresh",
    loading: "Loading...",
    backToHome: "Back to Home",
    changeLang: "Change Language",
    refresh: "Refresh",
    footerText: "MandiTrack — A step towards a stronger farming community",
    footerRight: "Prototype | Built for a Better Tomorrow",

    // Farmer Dashboard & Lots
    farmerPortal: "🌾 Farmer Portal",
    welcomeFarmer: "Welcome",
    farmerSubtext: "Track your produce and get the best prices at the mandi.",
    addProduceBtn: "+ Add Produce",
    myProduceLots: "My Produce Lots",
    myLotsSubtext: "All produce lots you have submitted to the mandi.",
    totalSubmitted: "Total Submitted",
    pendingReview: "Pending Review",
    approvedLots: "Approved",
    soldCompleted: "Sold / Completed",
    rejectedLots: "Rejected",
    cropName: "Crop",
    quantity: "Quantity",
    mandi: "Mandi",
    expectedPrice: "Expected Price",
    date: "Date",
    status: "Status",
    farmerInfo: "Farmer Info",
    actions: "Actions",
    mandiPricesTitle: "Mandi Prices",

    // Officer Dashboard
    officerPortal: "Officer Portal",
    officerTitle: "Mandi Officer Dashboard",
    officerSubtext: "Review and process farmer produce submissions.",
    allLots: "All Lots",
    pendingLots: "Pending Lots",

    // Officer Actions
    approveBtn: "Approve",
    rejectBtn: "Reject",
    markSoldBtn: "Mark Sold",

    // Admin
    adminPortal: "Administration",
    adminTitle: "System Overview",
    adminSubtext: "Manage farmers, officers and produce lots.",
  },

  mr: {
    // Brand & Header
    brandName: "मंडीट्रॅक",
    portalSubtitle: "सक्षम शेतकरी समुदायाच्या दिशेने एक पाऊल",
    prototypeBadge: "प्रतिकृती | चांगल्या उद्यासाठी निर्मित",
    home: "मुख्यपृष्ठ",
    about: "आमच्याबद्दल",
    features: "वैशिष्ट्ये",
    contact: "संपर्क",

    // Language Selection Screen
    chooseLanguage: "आपली भाषा निवडा",
    chooseLanguageSub: "मंडीट्रॅक वापरण्यासाठी तुमची पसंतीची भाषा निवडा",
    englishTitle: "English",
    englishDesc: "इंग्रजी भाषेत पुढे जा",
    marathiTitle: "मराठी",
    marathiDesc: "मराठी भाषेत पुढे जा",
    continueBtn: "पुढे जा",

    // Landing Page
    heroHeadline: "तुमचा शेतमाल आवक ते पेमेंटपर्यंत ट्रॅक करा",
    heroSubtext: "शेतकरी आणि बाजार समिती अधिकाऱ्यांसाठी एक सोपे आणि पारदर्शक व्यासपीठ.",
    farmerLoginBtn: "शेतकरी लॉगिन",
    officerLoginBtn: "अधिकारी लॉगिन",
    betterMarketAccess: "उत्कृष्ट बाजार उपलब्धता",
    transparentProcess: "पारदर्शक प्रक्रिया",
    fairPrices: "योग्य व रास्त भाव",
    supportForFarmers: "शेतकऱ्यांना पूर्ण पाठिंबा",

    // Roles
    selectRole: "भूमिका निवडा",
    farmerRole: "शेतकरी",
    officerRole: "अधिकारी / बाजार समिती अधिकारी",

    // Login Page
    loginTitle: "मंडीट्रॅक मध्ये लॉगिन करा",
    loginSub: "पुढे जाण्यासाठी तुमची माहिती प्रविष्ट करा",
    mobileNumber: "मोबाइल नंबर",
    mobilePlaceholder: "तुमचा 10-अंकी मोबाइल नंबर टाका",
    password: "पासवर्ड",
    passwordPlaceholder: "तुमचा पासवर्ड टाका",
    loginBtn: "लॉगिन करा",
    dontHaveAccount: "खाते नाही का?",
    registerHere: "येथे नोंदणी करा",

    // Registration Page
    registerTitle: "नवीन खाते तयार करा",
    registerSub: "आजच मंडीट्रॅक सोबत जोडा",
    fullName: "पूर्ण नाव",
    namePlaceholder: "तुमचे पूर्ण नाव प्रविष्ट करा",
    createPasswordPlaceholder: "पासवर्ड तयार करा",
    registerBtn: "नोंदणी करा",
    alreadyHaveAccount: "आधीपासून खाते आहे का?",
    loginHere: "येथे लॉगिन करा",

    // Statuses
    pending: "प्रलंबित",
    approved: "मंजूर",
    rejected: "नामंजूर",
    sold: "विक्री झाली",

    // Farmer Dashboard
    farmerPortal: "🌾 शेतकरी पोर्टल",
    welcomeFarmer: "स्वागत आहे",
    farmerSubtext: "तुमचा शेतमाल नोंदवा आणि मंडईतील प्रगती पाहा",
    addProduceBtn: "+ शेतमाल नोंदवा",
    myProduceLots: "माझे शेतमाल लॉट",
    myLotsSubtext: "तुम्ही नोंदवलेले सर्व लॉट आणि त्यांची सद्यस्थिती",
    totalSubmitted: "एकूण नोंदवलेले",
    pendingReview: "तपासणी प्रलंबित",
    approvedLots: "मंजूर",
    soldCompleted: "विक्री झाली",
    noLotsTitle: "अद्याप कोणताही लॉट नाही",
    noLotsSubtext: "सुरुवात करण्यासाठी तुमचे पहिले पीक नोंदवा",

    // Officer Dashboard
    officerPortal: "अधिकारी पोर्टल",
    officerTitle: "अधिकारी डॅशबोर्ड",
    officerSubtext: "शेतकऱ्यांचे लॉट तपासा आणि स्थिती अद्ययावत करा",
    allLots: "सर्व लॉट",
    rejectedLots: "नामंजूर",
    farmerInfo: "शेतकरी",
    actions: "कार्यवाही",
    approveBtn: "मंजूर करा",
    rejectBtn: "नामंजूर करा",
    markSoldBtn: "विक्री झाली",
    noOfficerLotsTitle: "कोणताही लॉट सापडला नाही",
    noOfficerLotsSubtext: "सध्या निवडलेल्या फिल्टरमध्ये कोणताही लॉट नाही.",
    statusUpdatedTo: "लॉटची स्थिती बदलली",
    officerLoadFailed: "तपासणीसाठी लॉट मिळवता आले नाहीत.",
    statusUpdateFailed: "लॉटची स्थिती बदलता आली नाही.",
    unknownFarmer: "अज्ञात शेतकरी",
    notAvailable: "उपलब्ध नाही",

    // Lot Table Columns
    cropName: "पीक",
    quantity: "प्रमाण",
    mandi: "बाजार समिती",
    expectedPrice: "अपेक्षित भाव",
    date: "दिनांक",
    status: "स्थिती",

    // Mandi Prices
    mandiPricesTitle: "बाजारभाव",
    mandiPricesBadge: "📊 मंडई बाजारभाव",
    mandiPricesHeading: "शेतमाल बाजारभाव",
    mandiPricesSubtext: "खुल्या सरकारी माहिती सेवेतून मिळालेले प्रत्यक्ष मंडई आवक भाव.",
    refreshPrices: "भाव अद्ययावत करा",
    fetchingPrices: "बाजारभाव आणत आहे...",
    pricesUnavailable: "सध्या बाजारभाव उपलब्ध नाहीत.",
    pricesUnavailableHelp: "याक्षणी बाजारभाव मिळवता आले नाहीत. कृपया थोड्या वेळाने पुन्हा पाहा.",
    sourceLabel: "स्रोत",
    dataDateLabel: "माहितीचा दिनांक",
    filterByCrop: "पिकानुसार शोधा",
    filterByCropHint: "उदा. गहू, तांदूळ, कापूस...",
    filterByMandi: "बाजार समितीनुसार शोधा",
    filterByMandiHint: "उदा. पुणे, नाशिक, नागपूर...",
    colCommodity: "पीक / शेतमाल",
    colMarket: "बाजार समिती",
    colDistrict: "जिल्हा / राज्य",
    colMinPrice: "किमान भाव",
    colMaxPrice: "कमाल भाव",
    colModalPrice: "सरासरी भाव",
    colArrivalDate: "आवक दिनांक",
    noMatchingPrices: "तुमच्या शोधाशी जुळणारे भाव आढळले नाहीत.",

    // Navbar
    navTagline: "शेतकरी व मंडई प्रक्रिया व्यवस्थापन",
    logout: "बाहेर पडा",
    roleFarmer: "शेतकरी",
    roleOfficer: "अधिकारी",
    roleAdmin: "प्रशासक",

    // Auth Modal
    welcomeBack: "पुन्हा स्वागत आहे",
    createAccount: "नवीन खाते तयार करा",
    farmerOption: "🌾 शेतकरी",
    officerOption: "🏛️ मंडई अधिकारी",
    nameExample: "उदा. रमेश पाटील",
    mobileHint: "10-अंकी मोबाइल नंबर",
    processing: "प्रक्रिया सुरू आहे...",
    loginAsFarmer: "शेतकरी म्हणून लॉगिन करा",
    loginAsOfficer: "अधिकारी म्हणून लॉगिन करा",
    registerAsFarmer: "शेतकरी म्हणून नोंदणी करा",
    registerAsOfficer: "अधिकारी म्हणून नोंदणी करा",
    fillMobilePassword: "कृपया मोबाइल नंबर आणि पासवर्ड भरा.",
    enterYourName: "कृपया तुमचे नाव टाका.",
    registrationSuccess: "नोंदणी यशस्वी! लॉगिन करत आहे...",
    genericAuthError: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
    close: "बंद करा",
    invalidMobile: "6, 7, 8 किंवा 9 ने सुरू होणारा वैध 10-अंकी मोबाइल नंबर टाका.",
    passwordTooShort: "पासवर्ड कमीत कमी 6 अक्षरांचा असावा.",
    passwordHint: "कमीत कमी 6 अक्षरे",

    // Add Lot Modal
    addLotTitle: "शेतमाल नोंदवा / नवीन लॉट",
    cropLabel: "पिकाचे नाव",
    selectCrop: "-- पीक निवडा --",
    otherSpecify: "इतर (नमूद करा)",
    enterCropName: "पिकाचे नाव टाका",
    quantityLabel: "प्रमाण",
    quantityExample: "उदा. 50",
    unitLabel: "एकक",
    unitQuintal: "क्विंटल",
    unitKg: "किलो",
    unitTon: "टन",
    targetMandi: "बाजार समिती",
    selectMandi: "-- बाजार समिती निवडा --",
    enterMandiName: "बाजार समितीचे नाव टाका",
    expectedPriceLabel: "अपेक्षित भाव",
    priceExample: "उदा. 2400",
    perUnit: "प्रति",
    cancel: "रद्द करा",
    submitting: "नोंदवत आहे...",
    submitLot: "शेतमाल नोंदवा",
    fillAllFields: "कृपया सर्व आवश्यक माहिती भरा.",
    quantityPositive: "प्रमाण 0 पेक्षा जास्त असावे.",
    priceNotNegative: "अपेक्षित भाव ऋण असू शकत नाही.",
    lotSubmitted: "शेतमाल यशस्वीरित्या नोंदवला!",
    lotSubmitFailed: "शेतमाल नोंदवता आला नाही.",
    loadFailed: "तुमचे लॉट मिळवता आले नाहीत.",

    // Landing Hero (logged-out App shell)
    heroBadge: "🌱 मंडई प्रक्रिया व्यवस्थापन व्यासपीठ",
    heroHeadlineLead: "तुमचा शेतमाल",
    heroHeadlineAccent: "आवक ते पेमेंटपर्यंत",
    heroHeadlineTrail: "ट्रॅक करा",
    heroDescription:
      "मंडीट्रॅक शेतकरी आणि बाजार समिती अधिकाऱ्यांना जोडते — लॉट नोंदणी, मंजुरी रांग आणि प्रत्यक्ष बाजारभाव, सर्व काही एकाच पारदर्शक ठिकाणी.",
    farmerRegisterBtn: "शेतकरी नोंदणी",
    statLiveValue: "थेट",
    statTransparent: "पारदर्शक",
    statSecureAuth: "सुरक्षित प्रवेश",
    statStatusTracking: "स्थिती ट्रॅकिंग",
    previewLotLabel: "शेतमाल लॉट",
    previewQuantity: "50 क्विंटल",
    previewPrice: "₹2,400 / क्विंटल",
    previewFooter: "प्रत्यक्ष माहिती पाहण्यासाठी शेतकरी किंवा अधिकारी म्हणून लॉगिन करा",
    footerBrand: "मंडीट्रॅक प्रतिकृती",
    footerCredit: "मंडीट्रॅक टीमने तयार केले",

    // General Actions
    refresh: "रिफ्रेश",
    loading: "लोड होत आहे...",
    backToHome: "मुख्यपृष्ठावर जा",
    changeLang: "भाषा बदला",
    refresh: "रिफ्रेश करा",
    footerText: "मंडीट्रॅक — सक्षम शेतकरी समुदायाच्या दिशेने एक पाऊल",
    footerRight: "प्रतिकृती | चांगल्या उद्यासाठी निर्मित",

    // Farmer Dashboard & Lots
    farmerPortal: "🌾 शेतकरी पोर्टल",
    welcomeFarmer: "नमस्कार",
    farmerSubtext: "तुमचा शेतमाल ट्रॅक करा आणि मंडीत सर्वोत्तम भाव मिळवा.",
    addProduceBtn: "+ उत्पादन नोंदवा",
    myProduceLots: "माझे उत्पादन लॉट",
    myLotsSubtext: "तुम्ही मंडीत सादर केलेले सर्व उत्पादन लॉट.",
    totalSubmitted: "एकूण सादर",
    pendingReview: "समीक्षेसाठी प्रलंबित",
    approvedLots: "मंजूर",
    soldCompleted: "विक्री / पूर्ण",
    rejectedLots: "नामंजूर",
    cropName: "पीक",
    quantity: "प्रमाण",
    mandi: "मंडी",
    expectedPrice: "अपेक्षित भाव",
    date: "तारीख",
    status: "स्थिती",
    farmerInfo: "शेतकरी माहिती",
    actions: "कृती",
    mandiPricesTitle: "मंडी भाव",

    // Officer Dashboard
    officerPortal: "अधिकारी पोर्टल",
    officerTitle: "मंडी अधिकारी डॅशबोर्ड",
    officerSubtext: "शेतकऱ्यांच्या उत्पादन सादरण्यांचे पुनरावलोकन करा आणि प्रक्रिया करा.",
    allLots: "सर्व लॉट",
    pendingLots: "प्रलंबित लॉट",

    // Officer Actions
    approveBtn: "मंजूर करा",
    rejectBtn: "नाकारा",
    markSoldBtn: "विक्री झाली",

    // Admin
    adminPortal: "प्रशासन",
    adminTitle: "सिस्टम विहंगावलोकन",
    adminSubtext: "शेतकरी, अधिकारी आणि उत्पादन लॉट व्यवस्थापित करा.",
  },
};

// Falls back to English, then to the key itself so a missing key is obvious.
// Checks the type rather than truthiness: a key can legitimately be "" (a word
// one language needs and the other doesn't), and that must not look "missing".
export const getTranslation = (lang, key) => {
  const value = translations[lang]?.[key];
  if (typeof value === "string") return value;

  const fallback = translations.en[key];
  return typeof fallback === "string" ? fallback : key;
};

// Units are stored on the lot in English, so only the display is translated.
// Anything outside this list (older or hand-entered data) is shown as stored.
const UNIT_KEYS = {
  quintal: "unitQuintal",
  kg: "unitKg",
  ton: "unitTon",
};

export const getUnitLabel = (lang, unit) =>
  UNIT_KEYS[unit] ? getTranslation(lang, UNIT_KEYS[unit]) : unit || "";

export default translations;
