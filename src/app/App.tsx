import { useState, useEffect } from "react";
import {
  ShoppingCart, X, Plus, Minus, MapPin, Phone, Mail, Globe,
  CheckCircle, Clock, Bike, Package, ChevronDown
} from "lucide-react";
import meerathLogo from "../imports/meerath_logo_png.png";

// ─── Types ─────────────────────────────────────────────────────────────────

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description?: string;
  imageId: string;
}

interface Category {
  name: string;
  items: MenuItem[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// ─── Data ──────────────────────────────────────────────────────────────────

const menuData: Category[] = [
  {
    name: "BEEF BBQ",
    items: [
      { id: "b1", name: "Beef Behari Kabab (2 Seekh)", price: "640", imageId: "photo-1588182657969-777d766e31ab" },
      { id: "b2", name: "Beef Gola Kabab (6 Pcs)", price: "650", imageId: "photo-1588182657969-777d766e31ab" },
      { id: "b3", name: "Beef Boti (2 Seekh)", price: "580", imageId: "photo-1588182657969-777d766e31ab" },
      { id: "b4", name: "Behari Kabab Fry", price: "1250", imageId: "photo-1552530322-835f6dedcca2" },
      { id: "b5", name: "Dhaga Kabab (2 Seekh)", price: "650", imageId: "photo-1588182657969-777d766e31ab" },
    ],
  },
  {
    name: "CHICKEN BBQ",
    items: [
      { id: "c1", name: "Chicken Behari Tikka", price: "480", imageId: "photo-1527477396000-e27163b481c2" },
      { id: "c2", name: "Chicken Malai Boti (2 Seekh)", price: "640", imageId: "photo-1527477396000-e27163b481c2" },
      { id: "c3", name: "Seekh Kabab (6 Seekh)", price: "600", imageId: "photo-1777994505601-fe18ab41f8f0" },
      { id: "c4", name: "Reshmi Kabab (6 Seekh)", price: "600", imageId: "photo-1777994505601-fe18ab41f8f0" },
      { id: "c5", name: "Chicken Tikka", price: "480", imageId: "photo-1527477396000-e27163b481c2" },
      { id: "c6", name: "Chicken Liver (4 Seekh)", price: "500", imageId: "photo-1553025934-296397db4010" },
      { id: "c7", name: "Chicken Sandana (4 Seekh)", price: "500", imageId: "photo-1527477396000-e27163b481c2" },
      { id: "c8", name: "Chicken Chargha Grill", price: "900+", imageId: "photo-1527477396000-e27163b481c2" },
      { id: "c9", name: "Chicken Boti (2 Seekh)", price: "620", imageId: "photo-1777994505601-fe18ab41f8f0" },
    ],
  },
  {
    name: "KATAKAT",
    items: [
      { id: "k1", name: "Brain Masala (Per Plate)", price: "1500", imageId: "photo-1553025934-296397db4010" },
      { id: "k2", name: "Katakat (Per Plate)", price: "1500", imageId: "photo-1553025934-296397db4010" },
      { id: "k3", name: "Chicken Katakat", price: "1300", imageId: "photo-1553025934-296397db4010" },
    ],
  },
  {
    name: "KARAHI",
    items: [
      { id: "ka1", name: "Chicken Karahi", price: "1300+", imageId: "photo-1762631383556-7fa1365898b7" },
      { id: "ka2", name: "Chicken White Karahi", price: "1300+", imageId: "photo-1762631383556-7fa1365898b7" },
      { id: "ka3", name: "Mutton Karahi", price: "1650+", imageId: "photo-1762631383556-7fa1365898b7" },
    ],
  },
  {
    name: "HANDI & TAWWA",
    items: [
      { id: "h1", name: "SP Chicken Handi", price: "2300+", imageId: "photo-1762631383556-7fa1365898b7" },
      {
        id: "h2", name: "Tawwa Chicken", price: "1150",
        description: "Tender chicken marinated in a rich blend of aromatic spices",
        imageId: "photo-1527477396000-e27163b481c2",
      },
    ],
  },
  {
    name: "FAST FOOD",
    items: [
      { id: "f1", name: "Chicken Burger", price: "400", imageId: "photo-1552530322-835f6dedcca2" },
      { id: "f2", name: "Beef Burger", price: "400", imageId: "photo-1552530322-835f6dedcca2" },
      {
        id: "f3", name: "Zinger Burger", price: "460",
        description: "Crispy, juicy chicken with fresh lettuce, tangy pickles, and creamy mayo in a soft toasted bun",
        imageId: "photo-1552530322-835f6dedcca2",
      },
      {
        id: "f4", name: "Club Sandwich", price: "450",
        description: "Layers of fresh ingredients stacked between toasted bread, crispy chicken, veggies, and mayo",
        imageId: "photo-1553025934-296397db4010",
      },
      {
        id: "f5", name: "Chicken Broast", price: "600",
        description: "Crispy, golden chicken with juicy, flavorful meat",
        imageId: "photo-1527477396000-e27163b481c2",
      },
      { id: "f6", name: "French Fries", price: "250", imageId: "photo-1552530322-835f6dedcca2" },
    ],
  },
  {
    name: "ROLLS",
    items: [
      { id: "r1", name: "Beef Kabab Roll", price: "300", imageId: "photo-1777994505601-fe18ab41f8f0" },
      { id: "r2", name: "Beef Boti Roll", price: "340", imageId: "photo-1777994505601-fe18ab41f8f0" },
      { id: "r3", name: "Chicken Boti Roll", price: "340", imageId: "photo-1777994505601-fe18ab41f8f0" },
      { id: "r4", name: "Chicken Mayo Roll", price: "360", imageId: "photo-1777994505601-fe18ab41f8f0" },
      { id: "r5", name: "Beef Mayo Roll", price: "360", imageId: "photo-1777994505601-fe18ab41f8f0" },
      { id: "r6", name: "Crispy Zinger Roll", price: "400", imageId: "photo-1777994505601-fe18ab41f8f0" },
    ],
  },
  {
    name: "OTHERS & SIDES",
    items: [
      { id: "s1", name: "Halwa (Per Plate)", price: "150", imageId: "photo-1553025934-296397db4010" },
      { id: "s2", name: "Plain Naan", price: "40", imageId: "photo-1553025934-296397db4010" },
      { id: "s3", name: "Puri Paratha", price: "110", imageId: "photo-1553025934-296397db4010" },
      { id: "s4", name: "Garlic Naan", price: "60", imageId: "photo-1553025934-296397db4010" },
      { id: "s5", name: "Raita", price: "140", imageId: "photo-1553025934-296397db4010" },
      { id: "s6", name: "Can (Soda)", price: "130", imageId: "photo-1553025934-296397db4010" },
      { id: "s7", name: "Mineral Water", price: "70+", imageId: "photo-1553025934-296397db4010" },
    ],
  },
];

const trackingSteps = [
  { label: "Order Placed", Icon: CheckCircle },
  { label: "Being Prepared", Icon: Clock },
  { label: "Out for Delivery", Icon: Bike },
  { label: "Delivered", Icon: Package },
];

// ─── Main Component ────────────────────────────────────────────────────────

export default function App() {
  const [activeCategory, setActiveCategory] = useState("BEEF BBQ");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingStatus, setTrackingStatus] = useState<number | null>(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const addToCart = (item: MenuItem) => {
    const price = parseFloat(item.price.replace("+", ""));
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { id: item.id, name: item.name, price, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c)
        .filter(c => c.quantity > 0)
    );
  };

  const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  const itemCount = cart.reduce((sum, c) => sum + c.quantity, 0);
  const currentCategory = menuData.find(c => c.name === activeCategory);

  const handleTrack = () => {
    if (trackingCode.trim()) setTrackingStatus(Math.floor(Math.random() * 4));
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className="min-h-screen"
      style={{ background: "#111111", color: "#F5F0E8", fontFamily: "'Inter', sans-serif" }}
    >

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navScrolled ? "rgba(17,17,17,0.95)" : "transparent",
          backdropFilter: navScrolled ? "blur(12px)" : "none",
          borderBottom: navScrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <a href="#" onClick={() => scrollTo("hero")}>
            <img src={meerathLogo} alt="Meerath Famous Kabab Paratha" className="h-14 w-auto" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", id: "hero" },
              { label: "Menu", id: "menu" },
              { label: "Track Order", id: "tracking" },
              { label: "Contact", id: "footer" },
            ].map(({ label, id }) => (
              <button
                key={label}
                onClick={() => scrollTo(id)}
                className="text-sm font-medium tracking-wide transition-colors duration-200"
                style={{ color: "rgba(245,240,232,0.65)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#E8821A")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.65)")}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setCartOpen(true); setCheckoutOpen(false); }}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(245,240,232,0.8)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#E8821A")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              <ShoppingCart size={15} />
              <span className="text-sm hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  style={{ background: "#E8821A", color: "#111111" }}
                >
                  {itemCount}
                </span>
              )}
            </button>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(v => !v)}
              style={{ color: "rgba(245,240,232,0.8)" }}
            >
              {mobileMenuOpen ? <X size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div
            className="md:hidden px-6 pb-4 flex flex-col gap-4"
            style={{ background: "rgba(17,17,17,0.97)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {[
              { label: "Home", id: "hero" },
              { label: "Menu", id: "menu" },
              { label: "Track Order", id: "tracking" },
              { label: "Contact", id: "footer" },
            ].map(({ label, id }) => (
              <button
                key={label}
                onClick={() => { scrollTo(id); setMobileMenuOpen(false); }}
                className="text-sm font-medium py-2 text-left"
                style={{ color: "rgba(245,240,232,0.7)" }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{ background: "#111111" }}>
          <img
            src="https://images.unsplash.com/photo-1531973968078-9bb02785f13d?w=1920&h=1080&fit=crop&auto=format"
            alt="Premium restaurant interior"
            className="w-full h-full object-cover"
            style={{ opacity: 0.18 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, #111111 70%)" }}
          />
        </div>

        {/* Fire accent — subtle glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center bottom, rgba(232,130,26,0.12) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <p
            className="text-xs font-medium tracking-[0.4em] uppercase mb-6"
            style={{ color: "#E8821A" }}
          >
            Est. 2003 &nbsp;·&nbsp; North Nazimabad, Karachi
          </p>

          <h1
            className="font-bold leading-[1.05] mb-6 text-5xl md:text-7xl lg:text-[5.5rem]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Legendary Taste<br />
            of{" "}
            <span style={{ color: "#E8821A" }}>North Nazimabad</span>
            <br />
            — Redefined
          </h1>

          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "rgba(245,240,232,0.55)" }}>
            22 years of authentic BBQ, Karahi, and legendary Kabab Paratha —<br className="hidden md:block" />
            now at your doorstep. The taste that defined a generation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { setCartOpen(true); setCheckoutOpen(false); }}
              className="px-8 py-4 font-semibold tracking-wider text-sm transition-all duration-200 hover:scale-105"
              style={{ background: "#E8821A", color: "#111111" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F09030")}
              onMouseLeave={e => (e.currentTarget.style.background = "#E8821A")}
            >
              ORDER ONLINE NOW
            </button>
            <button
              onClick={() => scrollTo("menu")}
              className="px-8 py-4 font-semibold tracking-wider text-sm transition-all duration-200"
              style={{ border: "1px solid rgba(245,240,232,0.35)", color: "#F5F0E8" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(245,240,232,0.8)";
                e.currentTarget.style.background = "rgba(245,240,232,0.05)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(245,240,232,0.35)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              EXPLORE MENU
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "rgba(245,240,232,0.25)" }}>
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, rgba(245,240,232,0.3), transparent)" }} />
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────────────── */}
      <div style={{ background: "#E8821A" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-3 gap-4 text-center" style={{ color: "#111111" }}>
          {[
            { value: "22", label: "Years of Legacy" },
            { value: "50+", label: "Menu Items" },
            { value: "∞", label: "Happy Customers" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-bold text-2xl md:text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</p>
              <p className="text-xs font-medium tracking-widest uppercase mt-0.5 opacity-70">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MENU ────────────────────────────────────────────────────────── */}
      <section id="menu" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <p className="text-xs font-medium tracking-[0.4em] uppercase mb-3" style={{ color: "#E8821A" }}>
              Our Offerings
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Menu
            </h2>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {menuData.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className="px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-200"
                style={
                  activeCategory === cat.name
                    ? { background: "#E8821A", color: "#111111", border: "1px solid #E8821A" }
                    : { background: "transparent", color: "rgba(245,240,232,0.5)", border: "1px solid rgba(255,255,255,0.15)" }
                }
                onMouseEnter={e => {
                  if (activeCategory !== cat.name) {
                    e.currentTarget.style.color = "#F5F0E8";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                  }
                }}
                onMouseLeave={e => {
                  if (activeCategory !== cat.name) {
                    e.currentTarget.style.color = "rgba(245,240,232,0.5)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  }
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{ gap: "5px",  }}
          >
          {/* background: "rgba(255,255,255,0.05)" */}
            {currentCategory?.items.map(item => (
              <MenuCard key={item.id} item={item} onAdd={() => addToCart(item)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ORDER TRACKING ───────────────────────────────────────────────── */}
      <section
        id="tracking"
        className="py-24 px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-medium tracking-[0.4em] uppercase mb-3" style={{ color: "#E8821A" }}>
            Live Status
          </p>
          <h2
            className="text-4xl font-bold mb-12"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Track Your Order
          </h2>

          <div className="flex">
            <input
              type="text"
              value={trackingCode}
              onChange={e => setTrackingCode(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleTrack()}
              placeholder="Enter your order number or tracking code"
              className="flex-1 px-5 py-4 text-sm focus:outline-none transition-colors duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRight: "none",
                color: "#F5F0E8",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "#E8821A")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
            />
            <button
              onClick={handleTrack}
              className="px-8 py-4 font-semibold text-sm tracking-wider transition-colors duration-200"
              style={{ background: "#E8821A", color: "#111111" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F09030")}
              onMouseLeave={e => (e.currentTarget.style.background = "#E8821A")}
            >
              TRACK
            </button>
          </div>

          {trackingStatus !== null && (
            <div className="mt-14 px-4">
              <div className="relative flex items-start justify-between">
                {/* Background line */}
                <div
                  className="absolute top-5 left-0 right-0 h-px"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
                {/* Progress line */}
                <div
                  className="absolute top-5 left-0 h-px transition-all duration-700"
                  style={{ width: `${(trackingStatus / 3) * 100}%`, background: "#E8821A" }}
                />
                {trackingSteps.map(({ label, Icon }, i) => {
                  const active = i <= trackingStatus;
                  return (
                    <div key={label} className="relative z-10 flex flex-col items-center gap-3 flex-1">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: active ? "#E8821A" : "#1A1A1A",
                          border: `2px solid ${active ? "#E8821A" : "rgba(255,255,255,0.15)"}`,
                        }}
                      >
                        <Icon size={16} style={{ color: active ? "#111111" : "rgba(255,255,255,0.3)" }} />
                      </div>
                      <span
                        className="text-xs font-medium text-center leading-snug"
                        style={{ color: active ? "#F5F0E8" : "rgba(245,240,232,0.3)", maxWidth: "5rem" }}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-8 text-sm" style={{ color: "rgba(245,240,232,0.45)" }}>
                Status last updated · just now
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── BRAND STATEMENT ─────────────────────────────────────────────── */}
      <section
        className="py-32 px-6 relative overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(232,130,26,0.06) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-xs font-medium tracking-[0.4em] uppercase mb-8" style={{ color: "rgba(232,130,26,0.6)" }}>
            Since 2003
          </p>
          <h2
            className="font-bold leading-tight text-5xl md:text-7xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Serving the Finest<br />
            <span style={{ color: "#E8821A" }}>Desi Flavors</span><br />
            for 22 Years
          </h2>
          <p className="mt-8 text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(245,240,232,0.45)" }}>
            A legacy forged in fire, flavor, and family — right in the heart of North Nazimabad.
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer
        id="footer"
        className="py-16 px-6"
        style={{ background: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <img src={meerathLogo} alt="Meerath Famous" className="h-16 w-auto mb-5" />
              <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.4)" }}>
                22 years of legendary kabab, paratha, and BBQ in the heart of North Nazimabad. The taste that brought generations together.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: "#E8821A" }}>
                Contact
              </h4>
              <div className="space-y-3">
                {[
                  { Icon: Phone, text: "0335-2115512", href: "tel:03352115512" },
                  { Icon: Mail, text: "meeruthkababparatha@gmail.com", href: "mailto:meeruthkababparatha@gmail.com" },
                  { Icon: Globe, text: "meerathfamous.pk", href: "https://meerathfamous.pk/" },
                ].map(({ Icon, text, href }) => (
                  <a
                    key={text}
                    href={href}
                    className="flex items-center gap-3 text-sm transition-colors duration-200"
                    style={{ color: "rgba(245,240,232,0.55)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#F5F0E8")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.55)")}
                  >
                    <Icon size={13} style={{ color: "#E8821A", flexShrink: 0 }} />
                    {text}
                  </a>
                ))}
                <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(245,240,232,0.55)" }}>
                  <MapPin size={13} style={{ color: "#E8821A", flexShrink: 0, marginTop: 2 }} />
                  D 8, Block A North Nazimabad Town, Karachi, Pakistan
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: "#E8821A" }}>
                Location
              </h4>
              <div
                className="overflow-hidden"
                style={{ height: 180, border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.5462897!2d67.05380!3d24.94080!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e9ab6c0e5e5%3A0x0!2zMjTCsDU2JzI2LjkiTiA2N8KwMDMnMTMuNyJF!5e0!3m2!1sen!2spk!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.4)" }}
                  allowFullScreen
                  loading="lazy"
                  title="Meerath Famous Location"
                />
              </div>
            </div>
          </div>

          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(245,240,232,0.3)" }}
          >
            <p>© 2025 Meerath Famous Kabab Paratha. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "FAQs"].map(link => (
                <a
                  key={link}
                  href="#"
                  className="transition-colors duration-200"
                  onMouseEnter={e => (e.currentTarget.style.color = "#F5F0E8")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.3)")}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING CART BUTTON ─────────────────────────────────────────── */}
      <button
        onClick={() => { setCartOpen(true); setCheckoutOpen(false); }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110"
        style={{ background: "#E8821A" }}
        onMouseEnter={e => (e.currentTarget.style.background = "#F09030")}
        onMouseLeave={e => (e.currentTarget.style.background = "#E8821A")}
      >
        <ShoppingCart size={20} style={{ color: "#111111" }} />
        {itemCount > 0 && (
          <span
            className="absolute -top-1 -right-1 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            style={{ background: "#F5F0E8", color: "#111111" }}
          >
            {itemCount}
          </span>
        )}
      </button>

      {/* ── CART DRAWER ─────────────────────────────────────────────────── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 cursor-pointer"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setCartOpen(false)}
          />
          <div
            className="w-full max-w-sm flex flex-col"
            style={{ background: "#161616", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h3 className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Order
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                className="transition-colors duration-200"
                style={{ color: "rgba(245,240,232,0.45)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F5F0E8")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.45)")}
              >
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div
                className="flex-1 flex flex-col items-center justify-center gap-4"
                style={{ color: "rgba(245,240,232,0.3)" }}
              >
                <ShoppingCart size={44} />
                <p className="text-sm">Your cart is empty</p>
                <button
                  onClick={() => { setCartOpen(false); scrollTo("menu"); }}
                  className="mt-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(245,240,232,0.6)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#E8821A")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug truncate">{item.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#E8821A" }}>Rs. {item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center transition-all duration-150"
                          style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(245,240,232,0.7)" }}
                          onMouseEnter={e => (e.currentTarget.style.borderColor = "#E8821A")}
                          onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center transition-all duration-150"
                          style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(245,240,232,0.7)" }}
                          onMouseEnter={e => (e.currentTarget.style.borderColor = "#E8821A")}
                          onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <span className="text-sm w-16 text-right" style={{ color: "rgba(245,240,232,0.65)" }}>
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="px-6 py-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-sm" style={{ color: "rgba(245,240,232,0.55)" }}>Total</span>
                    <span className="text-xl font-bold" style={{ color: "#E8821A", fontFamily: "'Playfair Display', serif" }}>
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>

                  {!checkoutOpen ? (
                    <button
                      onClick={() => setCheckoutOpen(true)}
                      className="w-full py-4 font-semibold tracking-wider text-sm transition-colors duration-200"
                      style={{ background: "#E8821A", color: "#111111" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#F09030")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#E8821A")}
                    >
                      PROCEED TO CHECKOUT
                    </button>
                  ) : (
                    <div className="space-y-3">
                      {/* Payment method */}
                      <div className="flex gap-2">
                        {(["cod", "online"] as const).map(method => (
                          <button
                            key={method}
                            onClick={() => setPaymentMethod(method)}
                            className="flex-1 py-3 text-xs font-semibold tracking-wide uppercase transition-all duration-150"
                            style={
                              paymentMethod === method
                                ? { background: "#E8821A", color: "#111111", border: "1px solid #E8821A" }
                                : { background: "transparent", color: "rgba(245,240,232,0.5)", border: "1px solid rgba(255,255,255,0.15)" }
                            }
                          >
                            {method === "cod" ? "Cash on Delivery" : "Online Payment"}
                          </button>
                        ))}
                      </div>
                      {["Full Name", "Phone Number", "Delivery Address"].map(ph => (
                        <input
                          key={ph}
                          placeholder={ph}
                          className="w-full px-4 py-3 text-sm focus:outline-none transition-colors duration-150"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#F5F0E8",
                          }}
                          onFocus={e => (e.currentTarget.style.borderColor = "#E8821A")}
                          onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                        />
                      ))}
                      <button
                        className="w-full py-4 font-semibold tracking-wider text-sm transition-colors duration-200"
                        style={{ background: "#E8821A", color: "#111111" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#F09030")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#E8821A")}
                      >
                        PLACE ORDER · Rs. {total.toLocaleString()}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Menu Card ─────────────────────────────────────────────────────────────

function MenuCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{ background: "#161616" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setBtnHovered(false); }}
    >
      {/* Image */}
      <div className="overflow-hidden" style={{ aspectRatio: "4/3", background: "#1A1A1A" }}>
        <img
          src={`https://images.unsplash.com/${item.imageId}?w=480&h=360&fit=crop&auto=format`}
          alt={item.name}
          className="w-full h-full object-cover transition-all duration-500"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)", opacity: hovered ? 0.95 : 0.75 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #161616 0%, rgba(22,22,22,0.3) 50%, transparent 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold leading-snug mb-1">{item.name}</h3>
        <p className="text-sm font-medium" style={{ color: "#E8821A" }}>Rs. {item.price}</p>

        {/* Description — animates in on hover */}
        {item.description && (
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: hovered ? "4rem" : "0", opacity: hovered ? 1 : 0 }}
          >
            <p className="text-xs leading-relaxed mt-2" style={{ color: "rgba(245,240,232,0.4)" }}>
              {item.description}
            </p>
          </div>
        )}

        {/* Add to cart */}
        <button
          onClick={e => { e.stopPropagation(); onAdd(); }}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          className="mt-3 w-full py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-200"
          style={
            btnHovered || hovered
              ? { background: "#E8821A", color: "#111111", border: "1px solid #E8821A" }
              : { background: "transparent", color: "rgba(245,240,232,0.45)", border: "1px solid rgba(255,255,255,0.12)" }
          }
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
