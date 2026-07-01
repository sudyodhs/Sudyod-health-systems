import { useState } from "react";

// Brand tokens
const NAVY = "#1A2B4A";
const GOLD = "#C9A84C";
const GOLD_DARK = "#8A6420";
const GREEN = "#2D5016";
const GREEN_MID = "#4A7C2A";
const GREEN_LIGHT = "#EEF5E7";
const CREAM = "#F9F5EE";
const TERRACOTTA = "#B85C38";
const WARM_BEIGE = "#F3EDE0";
const SLATE = "#64748B";
const WHITE = "#FFFFFF";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: ${CREAM}; color: ${NAVY}; }
  .thai { font-family: 'Noto Sans Thai', sans-serif; }
  .serif { font-family: 'Cormorant Garamond', serif; }

  /* NAV */
  nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    background: ${NAVY}; height: 66px; display: flex; align-items: center;
    justify-content: space-between; padding: 0 48px;
    border-bottom: 1px solid rgba(201,168,76,0.15); }
  .nav-brand { display: flex; align-items: center; gap: 12px; }
  .nav-wordmark { color: ${WHITE}; font-size: 15px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; }
  .nav-thai { color: ${GOLD}; font-size: 13px; }
  .nav-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.15); margin: 0 4px; }
  .nav-subbrand { color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 0.1em;
    text-transform: uppercase; }
  .nav-links { display: flex; align-items: center; gap: 28px; }
  .nav-links a { color: rgba(255,255,255,0.7); font-size: 12.5px; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer;
    text-decoration: none; transition: color 0.2s; }
  .nav-links a:hover { color: ${GOLD}; }
  .nav-btn { background: ${GOLD}; color: ${NAVY}; padding: 8px 18px;
    border-radius: 6px; font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; cursor: pointer; border: none; transition: all 0.2s; }
  .nav-btn:hover { background: #DEB84A; }

  /* HERO */
  .hero { min-height: 100vh; background: ${NAVY}; display: flex; align-items: center;
    padding: 100px 48px 80px; position: relative; overflow: hidden; }
  .hero-pattern { position: absolute; inset: 0; opacity: 0.06;
    background-image: repeating-linear-gradient(0deg, transparent, transparent 40px,
      rgba(201,168,76,0.4) 40px, rgba(201,168,76,0.4) 41px),
      repeating-linear-gradient(90deg, transparent, transparent 40px,
      rgba(201,168,76,0.4) 40px, rgba(201,168,76,0.4) 41px); }
  .hero-inner { max-width: 1140px; margin: 0 auto; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
    position: relative; z-index: 2; }
  .hero-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
  .hero-eyebrow-line { width: 32px; height: 1.5px; background: ${GOLD}; }
  .hero-eyebrow-text { color: ${GOLD}; font-size: 11px; font-weight: 600;
    letter-spacing: 0.26em; text-transform: uppercase; }
  .hero-h1 { font-size: clamp(38px, 5vw, 64px); font-weight: 300; color: ${WHITE};
    line-height: 1.12; letter-spacing: -0.01em; margin-bottom: 12px; }
  .hero-h1 em { font-style: italic; color: ${GOLD}; font-family: 'Cormorant Garamond', serif;
    font-size: 1.12em; font-weight: 400; }
  .hero-thai-block { margin-bottom: 28px; }
  .hero-thai-word { font-size: 36px; font-weight: 600; color: rgba(201,168,76,0.9);
    display: block; line-height: 1; margin-bottom: 4px; }
  .hero-thai-meaning { color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 0.18em;
    text-transform: uppercase; }
  .hero-p { color: rgba(255,255,255,0.6); font-size: 16px; line-height: 1.75;
    max-width: 420px; margin-bottom: 40px; }
  .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
  .btn-primary { background: ${GOLD}; color: ${NAVY}; padding: 13px 30px; border-radius: 7px;
    font-size: 13px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase;
    border: none; cursor: pointer; transition: all 0.2s; }
  .btn-primary:hover { background: #DEB84A; transform: translateY(-1px); }
  .btn-ghost { background: transparent; color: rgba(255,255,255,0.75);
    padding: 13px 30px; border-radius: 7px; font-size: 13px; font-weight: 600;
    letter-spacing: 0.07em; text-transform: uppercase; cursor: pointer;
    border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s; }
  .btn-ghost:hover { border-color: ${GOLD}; color: ${GOLD}; }
  .hero-right { display: flex; flex-direction: column; gap: 14px; }
  .hero-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px; padding: 22px 24px; display: flex; align-items: flex-start; gap: 14px;
    transition: background 0.2s; cursor: default; }
  .hero-card:hover { background: rgba(201,168,76,0.08); border-color: rgba(201,168,76,0.25); }
  .hero-card-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
  .hero-card-title { color: ${WHITE}; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
  .hero-card-text { color: rgba(255,255,255,0.5); font-size: 13px; line-height: 1.55; }
  .hero-card-badge { display: inline-block; background: rgba(201,168,76,0.2);
    color: ${GOLD}; font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; padding: 3px 8px; border-radius: 4px; margin-top: 8px; }

  /* CREDENTIALS BAR */
  .creds-bar { background: ${GREEN}; padding: 14px 48px; display: flex; align-items: center;
    justify-content: center; gap: 48px; flex-wrap: wrap; }
  .cred-item { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.75);
    font-size: 11.5px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
  .cred-icon { font-size: 14px; }

  /* ABOUT HERB BASICS */
  .about-section { background: ${CREAM}; padding: 96px 48px; }
  .about-inner { max-width: 1140px; margin: 0 auto; display: grid;
    grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .about-visual { background: ${GREEN}; border-radius: 20px; height: 440px;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden; }
  .about-visual-bg { position: absolute; inset: 0; opacity: 0.07;
    background: repeating-radial-gradient(circle at 50% 50%, transparent 0,
      transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px); }
  .about-visual-content { text-align: center; position: relative; z-index: 2; padding: 32px; }
  .about-brand-name { font-size: 32px; font-weight: 700; color: ${WHITE};
    letter-spacing: 0.04em; margin-bottom: 4px; }
  .about-brand-sub { color: rgba(255,255,255,0.45); font-size: 11px; letter-spacing: 0.18em;
    text-transform: uppercase; margin-bottom: 24px; }
  .about-since { background: ${GOLD}; color: ${NAVY}; font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; padding: 8px 20px;
    border-radius: 20px; display: inline-block; margin-bottom: 20px; }
  .about-certifications { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
  .cert-badge { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.8); font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 5px 12px; border-radius: 20px; }
  .section-eyebrow { color: ${GREEN_MID}; font-size: 11px; font-weight: 600;
    letter-spacing: 0.28em; text-transform: uppercase; margin-bottom: 12px; }
  .section-title { font-size: clamp(26px, 3vw, 40px); font-weight: 700; line-height: 1.15;
    letter-spacing: -0.01em; margin-bottom: 16px; }
  .section-body { color: ${SLATE}; font-size: 16px; line-height: 1.75; }
  .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 36px; }
  .stat-box { background: ${GREEN_LIGHT}; border-radius: 12px; padding: 20px; }
  .stat-num { font-size: 32px; font-weight: 700; color: ${GREEN}; line-height: 1; }
  .stat-label { color: ${SLATE}; font-size: 12px; margin-top: 4px; line-height: 1.4; }

  /* COLLECTIONS */
  .collections { background: ${WARM_BEIGE}; padding: 96px 48px; }
  .collections-inner { max-width: 1140px; margin: 0 auto; }
  .collection-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
    margin-top: 56px; }
  .collection-card { border-radius: 16px; overflow: hidden; cursor: pointer;
    transition: all 0.25s; }
  .collection-card:hover { transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(45,80,22,0.15); }
  .collection-img { height: 200px; display: flex; align-items: center;
    justify-content: center; position: relative; }
  .collection-emoji { font-size: 52px; }
  .collection-body { background: ${WHITE}; padding: 22px 24px; }
  .collection-name { font-size: 16px; font-weight: 700; color: ${NAVY}; margin-bottom: 8px; }
  .collection-desc { color: ${SLATE}; font-size: 13px; line-height: 1.6; margin-bottom: 14px; }
  .collection-scents { display: flex; flex-wrap: wrap; gap: 6px; }
  .scent-tag { background: ${GREEN_LIGHT}; color: ${GREEN}; font-size: 10px; font-weight: 600;
    padding: 3px 10px; border-radius: 20px; letter-spacing: 0.06em; }

  /* FEATURED PRODUCTS */
  .featured { background: ${CREAM}; padding: 96px 48px; }
  .featured-inner { max-width: 1140px; margin: 0 auto; }
  .product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px;
    margin-top: 56px; }
  .product-card { background: ${WHITE}; border-radius: 14px; overflow: hidden;
    border: 1px solid rgba(45,80,22,0.08); transition: all 0.22s; cursor: pointer; }
  .product-card:hover { transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(45,80,22,0.12); }
  .product-img { height: 180px; display: flex; align-items: center;
    justify-content: center; font-size: 44px; }
  .product-body { padding: 18px; }
  .product-tag { display: inline-block; font-size: 9.5px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 9px;
    border-radius: 20px; margin-bottom: 8px; }
  .tag-green { background: ${GREEN_LIGHT}; color: ${GREEN}; }
  .tag-gold { background: #FDF3D6; color: ${GOLD_DARK}; }
  .tag-terra { background: #FDF0EB; color: ${TERRACOTTA}; }
  .product-name { font-size: 14px; font-weight: 700; color: ${NAVY}; margin-bottom: 6px; }
  .product-desc { color: ${SLATE}; font-size: 12px; line-height: 1.55; margin-bottom: 14px; }
  .product-footer { display: flex; align-items: center; justify-content: space-between; }
  .product-price { font-size: 16px; font-weight: 700; color: ${NAVY}; }
  .add-btn { background: ${GREEN}; color: ${WHITE}; border: none; border-radius: 7px;
    padding: 7px 14px; font-size: 11px; font-weight: 700; letter-spacing: 0.07em;
    text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
  .add-btn:hover { background: ${GREEN_MID}; }
  .tm-mini { display: flex; align-items: center; gap: 5px; margin-top: 10px;
    font-size: 10px; color: ${SLATE}; font-weight: 500; }
  .tm-dot { width: 6px; height: 6px; background: #00ACC1; border-radius: 50%; }

  /* WHY SUDYOD */
  .why { background: ${GREEN}; padding: 96px 48px; }
  .why-inner { max-width: 1140px; margin: 0 auto; }
  .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
    margin-top: 56px; }
  .why-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px; padding: 32px; }
  .why-icon { font-size: 32px; margin-bottom: 16px; }
  .why-title { color: ${WHITE}; font-size: 17px; font-weight: 700; margin-bottom: 10px; }
  .why-text { color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.65; }
  .why-highlight { color: ${GOLD}; font-weight: 600; }

  /* SCENT OF CHIANG MAI HERO */
  .scent-section { background: ${NAVY}; padding: 96px 48px; }
  .scent-inner { max-width: 1140px; margin: 0 auto; display: grid;
    grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .scent-content .section-eyebrow { color: ${GOLD}; }
  .scent-content .section-title { color: ${WHITE}; }
  .scent-content .section-body { color: rgba(255,255,255,0.6); }
  .scent-items { margin-top: 32px; display: flex; flex-direction: column; gap: 14px; }
  .scent-item { display: flex; align-items: center; gap: 14px; padding: 14px 18px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; transition: background 0.2s; }
  .scent-item:hover { background: rgba(201,168,76,0.08); border-color: rgba(201,168,76,0.2); }
  .scent-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .scent-item-name { color: ${WHITE}; font-size: 14px; font-weight: 600; }
  .scent-item-note { color: rgba(255,255,255,0.4); font-size: 12px; }
  .scent-visual { background: rgba(255,255,255,0.04); border-radius: 20px;
    height: 400px; display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(255,255,255,0.08); }
  .scent-emoji-stack { text-align: center; }
  .scent-emoji-big { font-size: 80px; display: block; margin-bottom: 16px;
    animation: float 4s ease-in-out infinite; }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  .scent-label { color: rgba(255,255,255,0.35); font-size: 11px; letter-spacing: 0.2em;
    text-transform: uppercase; }

  /* AI CHAT */
  .chat-section { background: ${WARM_BEIGE}; padding: 80px 48px; }
  .chat-inner { max-width: 1140px; margin: 0 auto; display: flex;
    align-items: center; gap: 72px; flex-wrap: wrap; }
  .chat-content { flex: 1; min-width: 280px; }
  .chat-content .section-eyebrow { color: ${GREEN_MID}; }
  .chat-features { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
  .chat-feature { display: flex; align-items: flex-start; gap: 12px; font-size: 14px;
    color: ${SLATE}; }
  .chat-check { width: 22px; height: 22px; background: ${GREEN}; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: ${WHITE}; font-size: 11px; font-weight: 700; flex-shrink: 0; margin-top: 1px; }
  .chat-widget { background: ${NAVY}; border-radius: 18px; padding: 24px; width: 320px;
    flex-shrink: 0; box-shadow: 0 20px 60px rgba(26,43,74,0.2); }
  .chat-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
  .chat-avatar { width: 38px; height: 38px; background: ${GREEN_MID}; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0; }
  .chat-name { color: ${WHITE}; font-size: 14px; font-weight: 600; }
  .chat-status { color: rgba(255,255,255,0.4); font-size: 11px; }
  .chat-bubble { border-radius: 12px; padding: 11px 14px; font-size: 12.5px;
    line-height: 1.55; margin-bottom: 10px; max-width: 92%; }
  .chat-bot { background: rgba(255,255,255,0.09); color: rgba(255,255,255,0.85); }
  .chat-user { background: ${GOLD}; color: ${NAVY}; font-weight: 500; margin-left: auto; }
  .chat-input { background: rgba(255,255,255,0.07); border-radius: 9px; padding: 10px 14px;
    color: rgba(255,255,255,0.3); font-size: 12px; margin-top: 14px;
    display: flex; justify-content: space-between; align-items: center;
    font-family: 'DM Sans', sans-serif; }
  .chat-send { background: ${GREEN_MID}; border: none; border-radius: 7px;
    width: 28px; height: 28px; color: ${WHITE}; cursor: pointer;
    font-size: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }

  /* TRADEME */
  .trademe-section { background: ${WHITE}; padding: 72px 48px; }
  .trademe-inner { max-width: 1140px; margin: 0 auto; display: flex;
    align-items: center; gap: 72px; flex-wrap: wrap; }
  .trademe-content { flex: 1; min-width: 260px; }
  .trademe-content .section-eyebrow { color: ${GREEN_MID}; }
  .trademe-badges { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
  .tm-badge { display: flex; align-items: center; gap: 8px; padding: 12px 20px;
    border-radius: 10px; font-size: 13px; font-weight: 600; }
  .tm-blue { background: #E5F8FA; border: 1.5px solid #80DEEA; color: #006B7E; }
  .tm-green { background: ${GREEN_LIGHT}; border: 1.5px solid #A5D6A7; color: ${GREEN}; }
  .tm-gold { background: #FDF6E3; border: 1.5px solid #F0D080; color: ${GOLD_DARK}; }
  .shipping-box { flex: 1; min-width: 260px; background: ${CREAM}; border-radius: 16px;
    padding: 32px; display: flex; flex-direction: column; gap: 16px; }
  .ship-row { display: flex; align-items: center; gap: 14px; }
  .ship-icon { font-size: 20px; width: 36px; text-align: center; }
  .ship-label { font-size: 14px; font-weight: 700; color: ${NAVY}; }
  .ship-note { font-size: 12px; color: ${SLATE}; }

  /* FOOTER */
  footer { background: ${NAVY}; padding: 64px 48px 32px; }
  .footer-inner { max-width: 1140px; margin: 0 auto; }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
  .footer-tagline { color: rgba(255,255,255,0.45); font-size: 13px; line-height: 1.7;
    margin-top: 12px; max-width: 240px; }
  .footer-col-title { color: ${GOLD}; font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; }
  .footer-links { display: flex; flex-direction: column; gap: 9px; }
  .footer-links a { color: rgba(255,255,255,0.5); font-size: 13px; cursor: pointer;
    text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: ${GOLD}; }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding-top: 24px;
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: 24px; flex-wrap: wrap; }
  .footer-copy { color: rgba(255,255,255,0.25); font-size: 11.5px; }
  .footer-legal { color: rgba(255,255,255,0.18); font-size: 11px;
    line-height: 1.6; max-width: 480px; }

  /* FLOATING CHAT FAB */
  .chat-fab { position: fixed; bottom: 28px; right: 28px; z-index: 300;
    width: 58px; height: 58px; border-radius: 50%; background: ${GREEN};
    border: none; display: flex; align-items: center; justify-content: center;
    cursor: pointer; box-shadow: 0 4px 24px rgba(45,80,22,0.45);
    font-size: 22px; transition: all 0.2s; animation: glow 3s infinite; }
  .chat-fab:hover { transform: scale(1.08); background: ${GREEN_MID}; }
  @keyframes glow {
    0%, 100% { box-shadow: 0 4px 20px rgba(45,80,22,0.45); }
    50% { box-shadow: 0 4px 32px rgba(45,80,22,0.7); }
  }
  .chat-tooltip { position: fixed; bottom: 98px; right: 28px; z-index: 300;
    background: ${WHITE}; border-radius: 12px; padding: 14px 18px;
    box-shadow: 0 8px 32px rgba(26,43,74,0.15); max-width: 210px; font-size: 13px;
    color: ${NAVY}; line-height: 1.5; border: 1px solid rgba(45,80,22,0.15);
    animation: fadeUp 0.3s ease; }
  .tooltip-close { float: right; cursor: pointer; color: ${SLATE}; font-size: 15px;
    background: none; border: none; margin-left: 8px; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 900px) {
    nav { padding: 0 24px; }
    .nav-links { display: none; }
    .hero-inner { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .about-inner { grid-template-columns: 1fr; }
    .collection-grid { grid-template-columns: repeat(2, 1fr); }
    .product-grid { grid-template-columns: repeat(2, 1fr); }
    .why-grid { grid-template-columns: 1fr; }
    .scent-inner { grid-template-columns: 1fr; }
    .footer-top { grid-template-columns: 1fr 1fr; }
  }
`;

const collections = [
  { name: "Scent of Chiang Mai", emoji: "🌸", bg: "#FEF6FF",
    desc: "The signature collection — Eau de Toilette, Solid Perfume, Foam Bath, Skin Conditioner, Reed Diffuser.",
    scents: ["Jasmine", "Ylang Ylang", "Lotus", "Rose"] },
  { name: "Thai Herb Massage & Spa", emoji: "🌿", bg: "#EEF8F0",
    desc: "Spa Oils, Spa Balms, Herbal Bath Tea, Poultices. Five traditional scents for the home spa experience.",
    scents: ["Ginger", "Lemongrass", "Kaffir Lime", "Green Tea", "Peppermint"] },
  { name: "Essential & Base Oils", emoji: "💧", bg: "#EFF8FF",
    desc: "30+ pure essential oils and base oils. Perfect for aromatherapy, blending, and massage.",
    scents: ["Lavender", "Eucalyptus", "Tea Tree", "Citronella"] },
  { name: "Herbal Skincare", emoji: "🍃", bg: "#FFFBEC",
    desc: "Lotions, creams, and treatments using Pandan, Tamarind, Gotu Kola, and Guava Leaf extracts.",
    scents: ["Pandan", "Tamarind", "Guava", "Gotu Kola"] },
  { name: "Face & Hair", emoji: "✨", bg: "#FFF5F5",
    desc: "Shampoo, conditioner, facial soap, and scrubs. Coconut, Kaffir Lime, Honey formulas.",
    scents: ["Coconut", "Kaffir Lime", "Honey", "Ginger"] },
  { name: "Gift Sets", emoji: "🎁", bg: "#F5F5FF",
    desc: "Beautifully packaged Thai home spa gift collections. Perfect for corporate gifts and souvenirs.",
    scents: ["Mixed Sets", "Spa Collection", "Scent of CM"] },
];

const products = [
  { name: "Scent of Chiang Mai Eau de Toilette", emoji: "🌸", bg: "#FEF6FF",
    tag: "Bestseller", tagClass: "tag-gold", desc: "Signature floral Thai fragrance. 30ml.", price: "NZ$38", tm: true },
  { name: "Lemongrass Spa Massage Oil", emoji: "🌿", bg: "#EEF8F0",
    tag: "Spa Range", tagClass: "tag-green", desc: "Pure Thai herb spa oil. 60ml.", price: "NZ$29", tm: true },
  { name: "Thai Herbal Soap Set (3-pack)", emoji: "🧼", bg: "#FFFBEC",
    tag: "Gift Idea", tagClass: "tag-gold", desc: "Hand-crafted herbal soaps in gift packaging.", price: "NZ$34", tm: true },
  { name: "Kaffir Lime Reed Diffuser", emoji: "💧", bg: "#EFF8FF",
    tag: "Aromatherapy", tagClass: "tag-green", desc: "Natural bamboo reed diffuser. 30ml.", price: "NZ$42", tm: false },
  { name: "Coconut & Peppermint Shampoo", emoji: "✨", bg: "#FFF5F5",
    tag: "Hair Care", tagClass: "tag-terra", desc: "Balancing shampoo for oily scalps. 200ml.", price: "NZ$24", tm: true },
  { name: "Ginger Herbal Balm & Poultice", emoji: "🌱", bg: "#EEF8F0",
    tag: "Massage", tagClass: "tag-green", desc: "Traditional Thai herbal compress balm.", price: "NZ$26", tm: true },
  { name: "Chiang Mai Gift Set — Spa", emoji: "🎁", bg: "#F5F5FF",
    tag: "Gift Set", tagClass: "tag-gold", desc: "5-piece Thai spa experience gift box.", price: "NZ$89", tm: false },
  { name: "Pandan Facial Soap Bar", emoji: "🍃", bg: "#FFFBEC",
    tag: "Skincare", tagClass: "tag-green", desc: "Anti-inflammatory pandan extract soap.", price: "NZ$18", tm: true },
];

const scentItems = [
  { name: "Jasmine", note: "Floral, classic Thai", dot: "#E879F9" },
  { name: "Ylang Ylang", note: "Sweet, exotic", dot: "#FACC15" },
  { name: "Lotus", note: "Soft, aquatic", dot: "#60A5FA" },
  { name: "Kaffir Lime", note: "Citrus, uplifting", dot: "#4ADE80" },
  { name: "Lemongrass", note: "Fresh, energising", dot: "#FCD34D" },
];

export default function SudyodHerbBasics() {
  const [tooltip, setTooltip] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav>
        <div className="nav-brand">
          <span className="nav-wordmark">Sudyod</span>
          <span className="nav-thai thai">สุดยอด</span>
          <div className="nav-divider" />
          <span className="nav-subbrand">NZ · Thai Herbal</span>
        </div>
        <div className="nav-links">
          <a href="#collections">Collections</a>
          <a href="#products">Shop</a>
          <a href="#story">Our Story</a>
          <a href="#trademe">Delivery</a>
          <button className="nav-btn">Shop Now</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-pattern" />
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-line" />
              <span className="hero-eyebrow-text">Herb Basics · Chiang Mai · Since 2003</span>
            </div>
            <h1 className="hero-h1">
              Authentic Thai herbs,<br />
              <em>brought to New Zealand.</em>
            </h1>
            <div className="hero-thai-block">
              <span className="hero-thai-word thai">สมุนไพรไทย</span>
              <span className="hero-thai-meaning">Thai Herbal Products</span>
            </div>
            <p className="hero-p">
              We are the New Zealand importer and representative for Herb Basics — 
              Chiang Mai's most trusted aromatherapy and herbal spa brand. 
              GMP certified. Halal certified. Green Factory certified.
            </p>
            <div className="hero-actions">
              <button className="btn-primary">Shop the Collection</button>
              <button className="btn-ghost">Our Story</button>
            </div>
          </div>
          <div className="hero-right">
            {[
              { icon: "🏆", title: "GMP Certified (ISO22716:2007)", text: "Every product surpasses international GMP requirements for cosmetics manufacture.", badge: "Certified" },
              { icon: "☪️", title: "Halal Certified", text: "Full Halal certification for the entire cosmetics range — welcoming all New Zealand customers.", badge: "Halal" },
              { icon: "🌱", title: "Green Factory Certified", text: "Herb Basics is environmentally certified — sustainable sourcing of local Chiang Mai herbs.", badge: "Eco" },
              { icon: "🇳🇿", title: "Exclusive NZ Importer", text: "Sudyod Health Systems is the official New Zealand importer and representative for Herb Basics.", badge: "NZ Exclusive" },
            ].map(c => (
              <div className="hero-card" key={c.title}>
                <div className="hero-card-icon">{c.icon}</div>
                <div>
                  <div className="hero-card-title">{c.title}</div>
                  <div className="hero-card-text">{c.text}</div>
                  <span className="hero-card-badge">{c.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDENTIALS BAR */}
      <div className="creds-bar">
        {[
          ["🏭", "GMP ISO22716:2007"],
          ["☪️", "Halal Certified"],
          ["🌱", "Green Factory"],
          ["🇹🇭", "Made in Chiang Mai"],
          ["🇳🇿", "NZ Importer: Sudyod Health Systems"],
          ["🛒", "Available on Trade Me"],
        ].map(([icon, text]) => (
          <div className="cred-item" key={text}>
            <span className="cred-icon">{icon}</span>
            {text}
          </div>
        ))}
      </div>

      {/* ABOUT HERB BASICS */}
      <section className="about-section" id="story">
        <div className="about-inner">
          <div className="about-visual">
            <div className="about-visual-bg" />
            <div className="about-visual-content">
              <div className="about-brand-name">Herb Basics</div>
              <div className="about-brand-sub">เฮิร์บ เบสิคส์ · เชียงใหม่</div>
              <div className="about-since">Est. 2003 · Chiang Mai, Thailand</div>
              <div className="about-certifications">
                {["GMP ISO22716", "Halal", "Green Factory", "CM Top 10 Brand"].map(c => (
                  <span className="cert-badge" key={c}>{c}</span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="section-eyebrow">The Brand Behind the Products</div>
            <h2 className="section-title">Chiang Mai's original<br />herbal spa brand.</h2>
            <p className="section-body">
              Herb Basics has been creating authentic Thai home spa experiences from Chiang Mai 
              since 2003. Using local herbs and botanicals sourced from Northern Thailand, 
              their products are crafted with an emphasis on both efficacy and unique gift packaging.
            </p>
            <p className="section-body" style={{ marginTop: 14 }}>
              Sudyod Health Systems is proud to be the exclusive New Zealand importer — 
              bringing Herb Basics products to New Zealand customers for the first time. 
              Our founder's 15 years in Chiang Mai makes this a genuine partnership, not just a supply deal.
            </p>
            <div className="about-stats">
              {[
                { num: "20+", label: "Years crafting Thai herbal products in Chiang Mai" },
                { num: "3", label: "Internationally recognised certifications" },
                { num: "100+", label: "Products across 12 collections" },
                { num: "4", label: "Retail locations across Thailand" },
              ].map(s => (
                <div className="stat-box" key={s.num}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="collections" id="collections">
        <div className="collections-inner">
          <div className="section-eyebrow">What We Carry</div>
          <h2 className="section-title">Twelve collections,<br />one Chiang Mai story.</h2>
          <p className="section-body" style={{ maxWidth: 560 }}>
            From the signature Scent of Chiang Mai fragrance range to traditional Thai massage oils 
            and herbal skincare — every product in the Herb Basics range is now available in New Zealand.
          </p>
          <div className="collection-grid">
            {collections.map(col => (
              <div className="collection-card" key={col.name}>
                <div className="collection-img" style={{ background: col.bg }}>
                  <span className="collection-emoji">{col.emoji}</span>
                </div>
                <div className="collection-body">
                  <div className="collection-name">{col.name}</div>
                  <p className="collection-desc">{col.desc}</p>
                  <div className="collection-scents">
                    {col.scents.map(s => <span className="scent-tag" key={s}>{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured" id="products">
        <div className="featured-inner">
          <div className="section-eyebrow">Featured Products</div>
          <h2 className="section-title">Shop the Herb Basics range.</h2>
          <p className="section-body" style={{ maxWidth: 500 }}>
            All prices in NZD, including GST. Free shipping on orders over $80. 
            Also available on Trade Me — find us by searching "Sudyod" or "Herb Basics NZ".
          </p>
          <div className="product-grid">
            {products.map(p => (
              <div className="product-card" key={p.name}>
                <div className="product-img" style={{ background: p.bg }}>
                  {p.emoji}
                </div>
                <div className="product-body">
                  <span className={`product-tag ${p.tagClass}`}>{p.tag}</span>
                  <div className="product-name">{p.name}</div>
                  <p className="product-desc">{p.desc}</p>
                  <div className="product-footer">
                    <span className="product-price">{p.price}</span>
                    <button className="add-btn">Add</button>
                  </div>
                  {p.tm && (
                    <div className="tm-mini">
                      <div className="tm-dot" />
                      Also on Trade Me
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SUDYOD */}
      <section className="why" id="why">
        <div className="why-inner">
          <div className="section-eyebrow" style={{ color: GOLD }}>Why Buy From Us</div>
          <h2 className="section-title" style={{ color: WHITE }}>
            The only NZ source for<br />authentic Herb Basics products.
          </h2>
          <div className="why-grid">
            {[
              { icon: "🤝", title: "Official NZ Importer", text: "Sudyod Health Systems is Herb Basics' exclusive NZ representative — ", highlight: "not a grey-market reseller." },
              { icon: "🇹🇭", title: "15 Years in Chiang Mai", text: "Our founder lived in Chiang Mai for 15 years. This is a ", highlight: "genuine partnership built on real relationships." },
              { icon: "📦", title: "Direct from Source", text: "Products shipped directly from Herb Basics' Chiang Mai facilities, ", highlight: "not stored in third-party warehouses." },
              { icon: "✅", title: "All Certifications Verified", text: "GMP ISO22716:2007, Halal, and Green Factory certificates are ", highlight: "held on file and available on request." },
              { icon: "🛒", title: "Trade Me & Direct", text: "Shop directly on this site, or find us on Trade Me — ", highlight: "same products, same prices, your choice." },
              { icon: "💬", title: "Thai-Speaking Support", text: "Our team includes Thai speakers — ", highlight: "product questions answered in English and Thai." },
            ].map(w => (
              <div className="why-card" key={w.title}>
                <div className="why-icon">{w.icon}</div>
                <div className="why-title">{w.title}</div>
                <p className="why-text">{w.text}<span className="why-highlight">{w.highlight}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENT OF CHIANG MAI */}
      <section className="scent-section">
        <div className="scent-inner">
          <div className="scent-content">
            <div className="section-eyebrow">Signature Collection</div>
            <h2 className="section-title">Scent of Chiang Mai</h2>
            <p className="section-body">
              The most beloved Herb Basics collection. Five iconic Thai floral and botanical 
              scents, available as Eau de Toilette, Solid Perfume, Foam Bath, Skin Conditioner, 
              and Reed Diffuser — the complete Chiang Mai home spa experience.
            </p>
            <div className="scent-items">
              {scentItems.map(s => (
                <div className="scent-item" key={s.name}>
                  <div className="scent-dot" style={{ background: s.dot }} />
                  <div>
                    <div className="scent-item-name">{s.name}</div>
                    <div className="scent-item-note">{s.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="scent-visual">
            <div className="scent-emoji-stack">
              <span className="scent-emoji-big">🌸</span>
              <span className="scent-label">Scent of Chiang Mai</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI CHAT */}
      <section className="chat-section" id="chat">
        <div className="chat-inner">
          <div className="chat-content">
            <div className="section-eyebrow">Ask Kiri</div>
            <h2 className="section-title">Your Herb Basics<br />product guide.</h2>
            <p className="section-body">
              Not sure which scent to choose, or which collection suits your needs? 
              Ask Kiri — available 24/7 in English and Thai.
            </p>
            <div className="chat-features">
              {[
                "Which scent is right for your home or lifestyle",
                "Ingredients and benefits of each collection",
                "Gift set recommendations for any occasion",
                "Order tracking and shipping questions",
                "Available in English and Thai — สอบถามได้ภาษาไทย",
              ].map(f => (
                <div className="chat-feature" key={f}>
                  <div className="chat-check">✓</div>
                  {f}
                </div>
              ))}
            </div>
            <p style={{ marginTop: 20, fontSize: 11.5, color: SLATE, fontStyle: "italic" }}>
              Kiri provides general product information only and is not a health adviser. 
              All Herb Basics products are cosmetics — not medicines.
            </p>
          </div>
          <div className="chat-widget">
            <div className="chat-header">
              <div className="chat-avatar">🌿</div>
              <div>
                <div className="chat-name">Kiri · Herb Basics NZ</div>
                <div className="chat-status">● Online · Thai & English</div>
              </div>
            </div>
            <div className="chat-bubble chat-bot">
              Kia ora! I'm Kiri. I can help you find the perfect Herb Basics product from our Chiang Mai range. What are you looking for today?
            </div>
            <div className="chat-bubble chat-user">
              What's the Scent of Chiang Mai collection?
            </div>
            <div className="chat-bubble chat-bot">
              It's Herb Basics' most loved range — five iconic Thai floral scents (Jasmine, Ylang Ylang, Lotus, Kaffir Lime, Lemongrass) available as perfume, foam bath, diffuser, and more. Perfect as a gift set! Want to see the options?
            </div>
            <div className="chat-input">
              <span>Ask about products or scents...</span>
              <button className="chat-send">→</button>
            </div>
          </div>
        </div>
      </section>

      {/* TRADE ME */}
      <section className="trademe-section" id="trademe">
        <div className="trademe-inner">
          <div className="trademe-content">
            <div className="section-eyebrow">Where to Buy</div>
            <h2 className="section-title">Available on Trade Me<br />and direct from us.</h2>
            <p className="section-body">
              Shop the full Herb Basics NZ range directly on this site, 
              or find selected products on Trade Me. Same prices, same products.
            </p>
            <div className="trademe-badges">
              <div className="tm-badge tm-blue">🛒 Available on Trade Me</div>
              <div className="tm-badge tm-green">🇳🇿 NZ Owned & Operated</div>
              <div className="tm-badge tm-gold">☪️ Halal Certified Range</div>
            </div>
          </div>
          <div className="shipping-box">
            {[
              { icon: "🚚", label: "Free NZ Shipping", note: "On orders over NZ$80" },
              { icon: "📦", label: "Chiang Mai Direct", note: "Imported fresh from source" },
              { icon: "🔁", label: "Easy Returns", note: "30-day satisfaction guarantee" },
              { icon: "💳", label: "Secure Checkout", note: "Stripe · PayPal · Afterpay" },
            ].map(s => (
              <div className="ship-row" key={s.label}>
                <div className="ship-icon">{s.icon}</div>
                <div>
                  <div className="ship-label">{s.label}</div>
                  <div className="ship-note">{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: WHITE, fontWeight: 700, letterSpacing: "0.1em", fontSize: 14 }}>SUDYOD</span>
                <span className="thai" style={{ color: GOLD, fontSize: 13 }}>สุดยอด</span>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>· Thai Herbal NZ</span>
              </div>
              <p className="footer-tagline">
                Official NZ importer of Herb Basics, Chiang Mai. 
                Authentic Thai herbal spa and aromatherapy products, 
                brought to New Zealand.
              </p>
            </div>
            <div>
              <div className="footer-col-title">Collections</div>
              <div className="footer-links">
                {["Scent of Chiang Mai", "Thai Spa & Massage", "Essential Oils", "Skincare", "Gift Sets"].map(l => <a key={l}>{l}</a>)}
              </div>
            </div>
            <div>
              <div className="footer-col-title">About</div>
              <div className="footer-links">
                {["About Herb Basics", "Our Chiang Mai Story", "Certifications", "Contact Us"].map(l => <a key={l}>{l}</a>)}
              </div>
            </div>
            <div>
              <div className="footer-col-title">Help</div>
              <div className="footer-links">
                {["Shipping & Delivery", "Returns Policy", "Trade Me Store", "Privacy Policy"].map(l => <a key={l}>{l}</a>)}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">
              © 2026 Sudyod Health Systems Ltd · 3 Plimsoll St, Carterton 5713, NZ · Official NZ Importer for Herb Basics
            </div>
            <div className="footer-legal">
              All Herb Basics products are cosmetics and are not intended to diagnose, treat, or prevent any disease. 
              GMP ISO22716:2007, Halal, and Green Factory certificates held on file.
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING CHAT */}
      {tooltip && (
        <div className="chat-tooltip">
          <button className="tooltip-close" onClick={() => setTooltip(false)}>×</button>
          <strong>Ask Kiri</strong> — find the right Herb Basics scent for you. English & Thai.
        </div>
      )}
      <button className="chat-fab" onClick={() => { setChatOpen(v => !v); setTooltip(false); }}>
        🌿
      </button>
    </>
  );
}
