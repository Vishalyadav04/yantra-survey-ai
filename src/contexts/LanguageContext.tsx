import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Translation {
  [key: string]: string;
}

interface Translations {
  [language: string]: Translation;
}

const translations: Translations = {
  en: {
    // Landing Page
    landingTitle: "Sahi data, behtar disha",
    landingSubtitle: "Correct data leads to better direction. Yantra is an AI-powered smart survey platform designed for accurate data collection and meaningful insights across India.",
    getStarted: "Get Started",
    signIn: "Sign In",
    featuresTitle: "Powerful Features for Smart Data Collection",
    featuresSubtitle: "Built for India's diverse landscape with support for multiple languages, channels, and verification methods including Aadhaar integration.",
    
    // Features
    smartSurveyBuilder: "Smart Survey Builder",
    smartSurveyDesc: "AI-powered drag-and-drop survey creation with question suggestions",
    whatsappIntegration: "WhatsApp Integration", 
    whatsappDesc: "Deploy surveys directly through WhatsApp for maximum reach",
    ivrSupport: "IVR Support",
    ivrDesc: "Voice-based surveys through Interactive Voice Response",
    realTimeAnalytics: "Real-time Analytics",
    analyticsDesc: "Live dashboards with completion rates and response metrics",
    multiLanguageSupport: "Multi-language Support",
    multiLanguageDesc: "Auto-translate to Hindi, Tamil, Bengali and other Indian languages",
    
    // Sample Survey
    sampleSurveyTitle: "Health & Wellness Survey",
    sampleSurveyDesc: "Help us understand health needs in your community. Takes 2-3 minutes.",
    takeSurvey: "Take Survey",
    shareWhatsApp: "Share via WhatsApp",
    
    // Survey Questions
    surveyTitle: "Community Health Survey",
    question1: "How would you rate your overall health?",
    question2: "What is your primary health concern?",
    question3: "How often do you exercise per week?",
    excellent: "Excellent",
    good: "Good", 
    average: "Average",
    poor: "Poor",
    submit: "Submit",
    cancel: "Cancel",
    
    // Dashboard
    dashboard: "Dashboard",
    surveys: "Surveys",
    analytics: "Analytics", 
    respondents: "Respondents",
    compliance: "Compliance",
    settings: "Settings",
    
    // Footer
    footerText: "Empowering India with smart data collection."
  },
  hi: {
    // Landing Page
    landingTitle: "सही डेटा, बेहतर दिशा",
    landingSubtitle: "सही डेटा से बेहतर दिशा मिलती है। यंत्र एक AI-संचालित स्मार्ट सर्वे प्लेटफॉर्म है जो भारत भर में सटीक डेटा संग्रह और सार्थक अंतर्दृष्टि के लिए डिज़ाइन किया गया है।",
    getStarted: "शुरू करें",
    signIn: "साइन इन",
    featuresTitle: "स्मार्ट डेटा संग्रह के लिए शक्तिशाली सुविधाएं",
    featuresSubtitle: "भारत के विविध परिदृश्य के लिए बनाया गया, आधार एकीकरण सहित कई भाषाओं, चैनलों और सत्यापन विधियों के समर्थन के साथ।",
    
    // Features
    smartSurveyBuilder: "स्मार्ट सर्वे बिल्डर",
    smartSurveyDesc: "प्रश्न सुझावों के साथ AI-संचालित ड्रैग-एंड-ड्रॉप सर्वे निर्माण",
    whatsappIntegration: "व्हाट्सऐप एकीकरण",
    whatsappDesc: "अधिकतम पहुंच के लिए व्हाट्सऐप के माध्यम से सीधे सर्वे तैनात करें",
    ivrSupport: "IVR समर्थन",
    ivrDesc: "इंटरैक्टिव वॉयस रिस्पांस के माध्यम से आवाज-आधारित सर्वे",
    realTimeAnalytics: "रियल-टाइम एनालिटिक्स",
    analyticsDesc: "पूर्णता दरों और प्रतिक्रिया मेट्रिक्स के साथ लाइव डैशबोर्ड",
    multiLanguageSupport: "बहुभाषी समर्थन",
    multiLanguageDesc: "हिंदी, तमिल, बंगाली और अन्य भारतीय भाषाओं में स्वचालित अनुवाद",
    
    // Sample Survey
    sampleSurveyTitle: "स्वास्थ्य और कल्याण सर्वेक्षण",
    sampleSurveyDesc: "अपने समुदाय में स्वास्थ्य आवश्यकताओं को समझने में हमारी मदद करें। 2-3 मिनट लगते हैं।",
    takeSurvey: "सर्वे लें",
    shareWhatsApp: "व्हाट्सऐप के माध्यम से साझा करें",
    
    // Survey Questions
    surveyTitle: "सामुदायिक स्वास्थ्य सर्वेक्षण",
    question1: "आप अपने समग्र स्वास्थ्य को कैसे रेट करेंगे?",
    question2: "आपकी प्राथमिक स्वास्थ्य चिंता क्या है?",
    question3: "आप सप्ताह में कितनी बार व्यायाम करते हैं?",
    excellent: "उत्कृष्ट",
    good: "अच्छा",
    average: "औसत",
    poor: "खराब",
    submit: "जमा करें",
    cancel: "रद्द करें",
    
    // Dashboard
    dashboard: "डैशबोर्ड",
    surveys: "सर्वेक्षण",
    analytics: "एनालिटिक्स",
    respondents: "उत्तरदाता",
    compliance: "अनुपालन",
    settings: "सेटिंग्स",
    
    // Footer
    footerText: "स्मार्ट डेटा संग्रह के साथ भारत को सशक्त बनाना।"
  },
  ta: {
    // Landing Page
    landingTitle: "சரியான தரவு, சிறந்த திசை",
    landingSubtitle: "சரியான தரவு சிறந்த திசையை அளிக்கிறது. யந்திரம் என்பது இந்தியா முழுவதும் துல்லியமான தரவு சேகரிப்பு மற்றும் அர்த்தமுள்ள நுண்ணறிவுகளுக்காக வடிவமைக்கப்பட்ட AI-இயங்கும் ஸ்மார்ட் கணக்கெடுப்பு தளமாகும்.",
    getStarted: "தொடங்குங்கள்",
    signIn: "உள்நுழைய",
    featuresTitle: "ஸ்மார்ட் தரவு சேகரிப்புக்கான சக்திவாய்ந்த அம்சங்கள்",
    featuresSubtitle: "ஆதார் ஒருங்கிணைப்பு உட்பட பல மொழிகள், சேனல்கள் மற்றும் சரிபார்ப்பு முறைகளின் ஆதரவுடன் இந்தியாவின் பன்முக நிலப்பரப்புக்காக உருவாக்கப்பட்டது.",
    
    // Features
    smartSurveyBuilder: "ஸ்மார்ட் கணக்கெடுப்பு உருவாக்கி",
    smartSurveyDesc: "கேள்வி பரிந்துரைகளுடன் AI-இயங்கும் இழுத்து விடு கணக்கெடுப்பு உருவாக்கம்",
    whatsappIntegration: "வாட்ஸ்அப் ஒருங்கிணைப்பு",
    whatsappDesc: "அதிகபட்ச அளவிற்காக வாட்ஸ்அப் மூலம் நேரடியாக கணக்கெடுப்புகளை வைப்பு",
    ivrSupport: "IVR ஆதரவு",
    ivrDesc: "ஊடாடும் குரல் பதில் மூலம் குரல் அடிப்படையிலான கணக்கெடுப்புகள்",
    realTimeAnalytics: "நிகழ்நேர பகுப்பாய்வு",
    analyticsDesc: "நிறைவு விகிதங்கள் மற்றும் பதில் அளவீடுகளுடன் நேரடி டாஷ்போர்டுகள்",
    multiLanguageSupport: "பல மொழி ஆதரவு",
    multiLanguageDesc: "இந்தி, தமிழ், பெங்காலி மற்றும் பிற இந்திய மொழிகளுக்கு தானியங்கு மொழிபெயர்ப்பு",
    
    // Sample Survey
    sampleSurveyTitle: "சுகாதாரம் மற்றும் நல்வாழ்வு ஆய்வு",
    sampleSurveyDesc: "உங்கள் சமூகத்தில் சுகாதார தேவைகளை புரிந்து கொள்ள எங்களுக்கு உதவுங்கள். 2-3 நிமிடங்கள் ஆகும்.",
    takeSurvey: "கணக்கெடுப்பு எடுங்கள்",
    shareWhatsApp: "வாட்ஸ்அப் மூலம் பகிரவும்",
    
    // Survey Questions
    surveyTitle: "சமூக சுகாதார ஆய்வு",
    question1: "உங்கள் ஒட்டுமொத்த சுகாதாரத்தை எப்படி மதிப்பீடு செய்வீர்கள்?",
    question2: "உங்கள் முதன்மை சுகாதார கவலை என்ன?",
    question3: "வாரத்தில் எத்தனை முறை உடற்பயிற்சி செய்கிறீர்கள்?",
    excellent: "சிறந்த",
    good: "நல்ல",
    average: "சராசரி",
    poor: "மோசமான",
    submit: "சமர்பிக்கவும்",
    cancel: "ரத்து செய்",
    
    // Dashboard
    dashboard: "டாஷ்போர்டு",
    surveys: "கணக்கெடுப்புகள்",
    analytics: "பகுப்பாய்வு",
    respondents: "பதிலளிப்பவர்கள்",
    compliance: "இணக்கம்",
    settings: "அமைப்புகள்",
    
    // Footer
    footerText: "ஸ்மார்ட் தரவு சேகரிப்புடன் இந்தியாவை சக்திவாய்ந்ததாக்குதல்."
  },
  bn: {
    // Landing Page
    landingTitle: "সঠিক ডেটা, ভাল দিকনির্দেশনা",
    landingSubtitle: "সঠিক ডেটা ভাল দিকনির্দেশনার দিকে নিয়ে যায়। যন্ত্র হল একটি AI-চালিত স্মার্ট সার্ভে প্ল্যাটফর্ম যা ভারত জুড়ে নির্ভুল ডেটা সংগ্রহ এবং অর্থপূর্ণ অন্তর্দৃষ্টির জন্য ডিজাইন করা হয়েছে।",
    getStarted: "শুরু করুন",
    signIn: "সাইন ইন",
    featuresTitle: "স্মার্ট ডেটা সংগ্রহের জন্য শক্তিশালী বৈশিষ্ট্য",
    featuresSubtitle: "আধার একীকরণ সহ একাধিক ভাষা, চ্যানেল এবং যাচাইকরণ পদ্ধতির সহায়তায় ভারতের বৈচিত্র্যময় ভূদৃশ্যের জন্য তৈরি।",
    
    // Features
    smartSurveyBuilder: "স্মার্ট সার্ভে বিল্ডার",
    smartSurveyDesc: "প্রশ্নের পরামর্শ সহ AI-চালিত ড্র্যাগ-এন্ড-ড্রপ সার্ভে তৈরি",
    whatsappIntegration: "হোয়াটসঅ্যাপ একীকরণ",
    whatsappDesc: "সর্বোচ্চ পৌঁছানোর জন্য হোয়াটসঅ্যাপের মাধ্যমে সরাসরি সার্ভে মোতায়েন",
    ivrSupport: "IVR সহায়তা",
    ivrDesc: "ইন্টারঅ্যাক্টিভ ভয়েস রেসপন্সের মাধ্যমে ভয়েস-ভিত্তিক সার্ভে",
    realTimeAnalytics: "রিয়েল-টাইম অ্যানালিটিক্স",
    analyticsDesc: "সমাপ্তির হার এবং প্রতিক্রিয়া মেট্রিক্স সহ লাইভ ড্যাশবোর্ড",
    multiLanguageSupport: "বহুভাষিক সহায়তা",
    multiLanguageDesc: "হিন্দি, তামিল, বাংলা এবং অন্যান্য ভারতীয় ভাষায় স্বয়ংক্রিয় অনুবাদ",
    
    // Sample Survey
    sampleSurveyTitle: "স্বাস্থ্য ও সুস্থতা সার্ভে",
    sampleSurveyDesc: "আপনার সম্প্রদায়ের স্বাস্থ্য চাহিদা বুঝতে আমাদের সাহায্য করুন। ২-৩ মিনিট সময় লাগে।",
    takeSurvey: "সার্ভে নিন",
    shareWhatsApp: "হোয়াটসঅ্যাপের মাধ্যমে শেয়ার করুন",
    
    // Survey Questions
    surveyTitle: "সামুদায়িক স্বাস্থ্য সার্ভে",
    question1: "আপনি আপনার সামগ্রিক স্বাস্থ্যকে কীভাবে রেট করবেন?",
    question2: "আপনার প্রাথমিক স্বাস্থ্য উদ্বেগ কী?",
    question3: "আপনি সপ্তাহে কতবার ব্যায়াম করেন?",
    excellent: "চমৎকার",
    good: "ভাল",
    average: "গড়",
    poor: "খারাপ",
    submit: "জমা দিন",
    cancel: "বাতিল করুন",
    
    // Dashboard
    dashboard: "ড্যাশবোর্ড",
    surveys: "সার্ভে",
    analytics: "অ্যানালিটিক্স",
    respondents: "উত্তরদাতা",
    compliance: "সম্মতি",
    settings: "সেটিংস",
    
    // Footer
    footerText: "স্মার্ট ডেটা সংগ্রহের মাধ্যমে ভারতকে ক্ষমতায়ন।"
  }
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  availableLanguages: Array<{
    code: string;
    name: string;
    nativeName: string;
  }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const availableLanguages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  ];

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t,
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};