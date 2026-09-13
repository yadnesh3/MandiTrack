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

    // Landing Page (Panel 1)
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

    // Login Page (Panel 2)
    loginTitle: "Login to MandiTrack",
    loginSub: "Enter your credentials to continue",
    mobileNumber: "Mobile Number",
    mobilePlaceholder: "Enter your mobile number",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    loginBtn: "Login",
    dontHaveAccount: "Don't have an account?",
    registerHere: "Register here",

    // Registration Page (Panel 3)
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

    // General Actions
    backToHome: "Back to Home",
    changeLang: "Change Language",
    footerText: "MandiTrack — A step towards a stronger farming community",
    footerRight: "Prototype | Built for a Better Tomorrow",
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

    // Landing Page (Panel 1)
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

    // Login Page (Panel 2)
    loginTitle: "मंडीट्रॅक मध्ये लॉगिन करा",
    loginSub: "पुढे जाण्यासाठी तुमची माहिती प्रविष्ट करा",
    mobileNumber: "मोबाइल नंबर",
    mobilePlaceholder: "तुमचा 10-अंकी मोबाइल नंबर टाका",
    password: "पासवर्ड",
    passwordPlaceholder: "तुमचा पासवर्ड टाका",
    loginBtn: "लॉगिन करा",
    dontHaveAccount: "खाते नाही का?",
    registerHere: "येथे नोंदणी करा",

    // Registration Page (Panel 3)
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

    // General Actions
    backToHome: "मुख्यपृष्ठावर जा",
    changeLang: "भाषा बदला",
    footerText: "मंडीट्रॅक — सक्षम शेतकरी समुदायाच्या दिशेने एक पाऊल",
    footerRight: "प्रतिकृती | चांगल्या उद्यासाठी निर्मित",
  },
};

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations["en"][key] || key;
};

export default translations;
