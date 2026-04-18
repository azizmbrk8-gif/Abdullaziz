import type { PromoConfig } from "./ProChainPromoV2";

// ======================================================================
// 4 PromoConfigs — one per (language × audience) combination
// Scene durations derived from measured VO lengths @30fps + ~15 frame pad
// ======================================================================

export const enBuyerConfig: PromoConfig = {
  lang: "en",
  audience: "buyer",
  audioBase: "en-buyer",
  durations: [100, 115, 100, 134, 95],
  texts: {
    hookBadge: "ATTENTION",
    hookMain: "CAFÉS &",
    hookAccent: "RESTAURANTS",
    painTitle: "Sick of these hassles?",
    painCards: [
      { emoji: "😤", title: "Flaky suppliers", sub: "Broken promises, late deliveries" },
      { emoji: "💸", title: "Overpaying", sub: "Shady pricing, no comparison" },
      { emoji: "⏳", title: "Wasted hours", sub: "Calling, chasing, confirming" },
    ],
    solutionTag: "MEET",
    solutionMain: "PROCHAIN",
    solutionSub: "Every supplier. One trusted app.",
    demoBadge: "BUYER VIEW",
    demoHeadline: "ORDER IN",
    demoAccent: "SECONDS",
    ctaIntro: "Ready to stock up smarter?",
    ctaBig: "FREE",
    ctaStamp: "LIMITED!",
    ctaCaption: "Scan • Save • Scale",
  },
};

export const enSupplierConfig: PromoConfig = {
  lang: "en",
  audience: "supplier",
  audioBase: "en-supplier",
  durations: [110, 106, 112, 121, 96],
  texts: {
    hookBadge: "SUPPLIERS",
    hookMain: "SELL",
    hookAccent: "MORE",
    painTitle: "Tired of chasing buyers?",
    painCards: [
      { emoji: "📞", title: "Cold calls", sub: "Shops never pick up" },
      { emoji: "📉", title: "Small reach", sub: "Stuck with same clients" },
      { emoji: "🧾", title: "Messy orders", sub: "WhatsApp chaos daily" },
    ],
    solutionTag: "INTRODUCING",
    solutionMain: "PROCHAIN",
    solutionSub: "Hundreds of buyers. One powerful store.",
    demoBadge: "SUPPLIER VIEW",
    demoHeadline: "GROW YOUR",
    demoAccent: "BUSINESS",
    ctaIntro: "Turn your catalog into cash.",
    ctaBig: "JOIN FREE",
    ctaStamp: "LIMITED!",
    ctaCaption: "List • Sell • Scale",
  },
};

export const arBuyerConfig: PromoConfig = {
  lang: "ar",
  audience: "buyer",
  audioBase: "ar-buyer",
  durations: [103, 150, 118, 164, 115],
  texts: {
    hookBadge: "انتباه",
    hookMain: "مقاهي",
    hookAccent: "ومطاعم",
    painTitle: "هل تعاني من هذه المشاكل؟",
    painCards: [
      { emoji: "😤", title: "موردون غير موثوقين", sub: "وعود وتأخير في التوصيل" },
      { emoji: "💸", title: "أسعار مرتفعة", sub: "بدون مقارنة أو شفافية" },
      { emoji: "⏳", title: "وقت ضائع", sub: "اتصالات ومتابعات بلا نهاية" },
    ],
    solutionTag: "تعرّف على",
    solutionMain: "بروتشين",
    solutionSub: "كل الموردين في تطبيق واحد موثوق",
    demoBadge: "للمشترين",
    demoHeadline: "اطلب خلال",
    demoAccent: "ثوانٍ",
    ctaIntro: "جاهز توفر وقتك ومالك؟",
    ctaBig: "مجاناً",
    ctaStamp: "محدود!",
    ctaCaption: "حمّل • وفّر • انطلق",
  },
};

export const arSupplierConfig: PromoConfig = {
  lang: "ar",
  audience: "supplier",
  audioBase: "ar-supplier",
  durations: [110, 107, 122, 124, 124],
  texts: {
    hookBadge: "موردين",
    hookMain: "بيع",
    hookAccent: "أكثر",
    painTitle: "تعبت من ملاحقة العملاء؟",
    painCards: [
      { emoji: "📞", title: "مكالمات بدون رد", sub: "محلات لا تستجيب" },
      { emoji: "📉", title: "انتشار محدود", sub: "نفس العملاء فقط" },
      { emoji: "🧾", title: "طلبات مشتتة", sub: "فوضى في الواتساب" },
    ],
    solutionTag: "نقدّم لكم",
    solutionMain: "بروتشين",
    solutionSub: "مئات المشترين في متجر واحد",
    demoBadge: "للموردين",
    demoHeadline: "نمّي",
    demoAccent: "أعمالك",
    ctaIntro: "حوّل كتالوجك إلى مبيعات.",
    ctaBig: "مجاناً",
    ctaStamp: "محدود!",
    ctaCaption: "اعرض • بع • انمُ",
  },
};

export const totalFrames = (c: PromoConfig) =>
  c.durations.reduce((a, b) => a + b, 0);
