import { useMemo, useState } from "react";

type Page =
  | "home"
  | "catalog"
  | "product"
  | "search"
  | "wishlist"
  | "cart"
  | "checkout"
  | "confirmation"
  | "about"
  | "account";

type Product = {
  id: number;
  name: string;
  price: number;
  previous?: number;
  rating: number;
  category: string;
  tags: string[];
  image: string;
  badge?: string;
};

type CartItem = {
  product: Product;
  color: string;
  size: string;
  quantity: number;
  image: string;
};

const plumImages = {
  "Deep Plum":
    "https://images.unsplash.com/photo-1657550853452-f13aa437f6c9?auto=format&fit=crop&w=1200&q=88",
  Black:
    "https://images.unsplash.com/photo-1619799130797-eac818972fb3?auto=format&fit=crop&w=1200&q=88",
  Burgundy:
    "https://images.unsplash.com/photo-1626255591490-17348b6e92ec?auto=format&fit=crop&w=1200&q=88",
  "Emerald Green":
    "https://images.unsplash.com/photo-1728485299033-a3b6e98cb5b2?auto=format&fit=crop&w=1200&q=88",
};

const products: Product[] = [
  {
    id: 1,
    name: "Satin Wrap Midi Dress",
    price: 899,
    rating: 4.9,
    category: "Midi Dresses",
    tags: ["midi", "new", "plum", "black", "burgundy", "green"],
    image: plumImages["Deep Plum"],
    badge: "NEW",
  },
  {
    id: 2,
    name: "Elegant Floral Maxi Dress",
    price: 999,
    rating: 4.8,
    category: "Maxi Dresses",
    tags: ["maxi", "floral", "new"],
    image:
      "https://images.unsplash.com/photo-1778574187207-094dec1125d2?auto=format&fit=crop&w=900&q=86",
    badge: "NEW",
  },
  {
    id: 3,
    name: "Curve Bodycon Evening Dress",
    price: 799,
    previous: 949,
    rating: 4.7,
    category: "Evening Dresses",
    tags: ["evening", "party", "black", "sale"],
    image:
      "https://images.unsplash.com/photo-1630424884669-a70e163dcf15?auto=format&fit=crop&w=900&q=86",
    badge: "SALE",
  },
  {
    id: 4,
    name: "Soft Knit Casual Midi",
    price: 699,
    rating: 4.8,
    category: "Casual Dresses",
    tags: ["casual", "midi"],
    image:
      "https://images.unsplash.com/photo-1639297953616-66fe28cc9cb9?auto=format&fit=crop&w=900&q=86",
  },
  {
    id: 5,
    name: "Pleated Office Midi Dress",
    price: 849,
    rating: 4.9,
    category: "Work Dresses",
    tags: ["work", "midi", "new"],
    image:
      "https://images.unsplash.com/photo-1708912587604-5ccd643bfc4c?auto=format&fit=crop&w=900&q=86",
    badge: "NEW",
  },
  {
    id: 6,
    name: "Velvet Party Dress",
    price: 1099,
    previous: 1299,
    rating: 4.7,
    category: "Party Dresses",
    tags: ["party", "burgundy", "sale"],
    image:
      "https://images.unsplash.com/photo-1626255591490-17348b6e92ec?auto=format&fit=crop&w=900&q=86",
    badge: "SALE",
  },
  {
    id: 7,
    name: "Midnight Column Maxi Dress",
    price: 949,
    rating: 4.8,
    category: "Maxi Dresses",
    tags: ["maxi", "evening", "black"],
    image:
      "https://images.unsplash.com/photo-1597724939949-c55f24e34d48?auto=format&fit=crop&w=900&q=86",
  },
  {
    id: 8,
    name: "Burgundy Occasion Dress",
    price: 749,
    previous: 899,
    rating: 4.6,
    category: "Evening Dresses",
    tags: ["occasion", "burgundy", "party", "sale"],
    image:
      "https://images.unsplash.com/photo-1786865572991-69d8a3dd69cd?auto=format&fit=crop&w=900&q=86",
    badge: "SALE",
  },
  {id: 9,
    name: "Pleated Office Midi Dress",
    price: 900,
    rating: 4.8,
    category: "Work Dresses",
    tags: ["work", "midi",],
    image:
      "https://n.nordstrommedia.com/it/5a406a13-0315-441a-b231-f949e77ce293.jpeg?h=368&w=240&dpr=2",},
  { id: 10,
    name: "Soft Knit Casual Midi",
    price: 799,
    rating: 4.4,
    category: "Casual Dresses",
    tags: ["casual", "midi"],
    image:
      "https://img.staticdj.com/a83de7ed536e1db5915d8b49fcd62f9c.jpeg",},
  { id: 11,
    name: "Mermaid Sequin Maxi Dresses",
    price: 600,
    rating: 4.9,
    category: "Casual Dresses",
    tags: ["casual", "midi", "new"],
    image:
      "https://i.pinimg.com/originals/53/13/04/531304ccd27659c7840ff4c4e2c65aff.png",
    badge: "NEW",},
  {id: 12,
    name: "KOITOTO",
    price: 900,
    rating: 4,
    category: "Casual Dresses",
    tags: ["casual", "midi", "new"],
    image:
      "https://i.pinimg.com/736x/1e/b8/b0/1eb8b0302027b40aec3da9a86d890bf4.jpg",
    badge: "NEW"},
  {id: 13,
    name: "Cocktail& Party",
    price: 800,
    rating: 4.2,
    category: "Casual Dresses",
    tags: ["casual", "midi", "new"],
    image:
      "https://img.staticdj.com/bc746e63b60b0fea71a1879afb5e5e7d.jpg",
    badge: "NEW"},
  {id: 14,
    name: "Knee Length Wrap Dress",
    price: 500,
    previous: 900,
    rating: 4.7,
    category: "Casual Dresses",
    tags: ["casual", "burgundy", "sale"],
    image:
      "https://pluslook.eu/wp-content/uploads/Plus-Size-Wrap-Knee-Length-Holiday-Party-Dress.jpg",
    badge: "SALE",},
  {id: 15,
    name: "Mini Dresses Classy",
    price: 900,
    previous: 400,
    rating: 4.1,
    category: "Casual Dresses",
    tags: ["casual", "burgundy", "sale"],
    image:
      "https://i.pinimg.com/736x/86/03/b8/8603b84b180e9dd1c9fdd9447a4b71b6.jpg",
    badge: "SALE",},
  { id: 16,
    name: "Mini Shirt Dress",
    price: 500,
    rating: 4.2,
    category: "Casual Dresses",
    tags: ["casual", "midi", "new"],
    image:
      "https://chicandcurvy.com/cdn/shop/files/CBC5B3BE-2A29-45FF-961A-DE3098DA1E79.jpg?v=1771197896",
    badge: "NEW"},
  { id: 17,
    name: "Babe Dress",
    price: 499,
    rating: 3.8,
    category: "Work Dresses",
    tags: ["work", "midi", "new"],
    image:
      "https://i.pinimg.com/736x/ae/46/0a/ae460af20e988a1ea68b965c48805957.jpg",},
  { id: 18,
    name: "Classy Dress",
    price: 499,
    previous: 600,
    rating: 3.8,
    category: "Work Dresses",
    tags: ["work", "midi", "sale"],
    image:
      "https://i.pinimg.com/originals/01/10/c9/0110c9ef740f393f67e567eb886a19e6.png",
    badge: "SALE",},
  {id: 19,
    name: "Winter OutFit, Dress& coat",
    price:799,
    rating: 4,
    category: "Work Dresses",
    tags: ["work", "midi", "new"],
    image:
      "https://thegoodpositive.com/wp-content/uploads/2025/11/Plus-Size-Cashmere-Sweater-and-Midi-Skirt-Outfit-683x1024.webp",},
  {id: 20,
    name: "Professional & Comfartable Outfit",
    price: 300,
    previous: 689,
    rating: 4.8,
    category: "Work Dresses",
    tags: ["work", "midi", "sale"],
    image:
      "https://fitsbydee.com/wp-content/uploads/2025/09/0_2_640_N-3fc50b0a-f844-4258-8fff-bfda16d14e1e.webp",
    badge: "SALE",},
  {id: 21,
    name: "Lapel Maxi Dress",
    price: 500,
    rating: 4.6,
    category: "Work Dresses",
    tags: ["work", "midi", "new"],
    image:
      "https://jeebas.com/cdn/shop/files/2_ee7865a8-4253-425a-9da3-0f154afd4cb0.jpg?v=1766454827",
    badge: "NEW"},
  {id: 22,
    name: "Sage Pro",
    price: 700,
    rating: 4.8,
    category: "Work Dresses",
    tags: ["work", "midi", "new"],
    image:
      "https://stylesagepro.com/wp-content/uploads/2025/05/belted_dress_monochrome_style.jpg",
    badge: "NEW"},
  {id: 23,
    name: "Trandy Slay in Style",
    price: 199,
    rating: 4.7,
    category: "Party Dresses",
    tags: ["party", "burgundy"],
    image:
      "https://i.pinimg.com/736x/2d/be/23/2dbe2331674f576a3a044ed3660bf7a2.jpg",},
  {id: 24,
    name: "Halter Neck",
    price: 150,
    rating: 4.5,
    category: "Party Dresses",
    tags: ["party", "burgundy"],
    image:
      "https://i5.walmartimages.com/seo/CASSIE-LIZ-Women-s-Plus-Size-Dress-3X-Hot-Pink-Halter-Neck-Solid-Pleated-Dress-Sleeveless-Casual-Loose-Fits-Dress-For-Summer-3XL-22W-24W_35c3c016-fb71-4c1a-acb8-63ddf0d077e0.da6f40ffb14563f614083379dc617296.jpeg",},
  {id: 25,
    name: "Flatter Dress",
    price: 300,
    previous: 589,
    rating: 4.8,
    category: "Party Dresses",
    tags: ["party", "midi", "sale"],
    image:
      "https://i.pinimg.com/originals/1c/cb/2a/1ccb2a8aff33ba844f0262f12627f727.jpg",
    badge: "SALE",},
  {id: 26,
    name: "Spring Club",
    price: 300,
    rating: 4.8,
    category: "Party Dresses",
    tags: ["party", "burgundy"],
    image:
      "https://thegoodpositive.com/wp-content/uploads/2026/02/Plus-Size-Party-Black-V-Neck-Puff-Sleeve-Long-Sleeve-See-Through-Elegant-Ruffle-Lace-Mini-Dress-683x1024.webp",},
  {id: 27,
    name: "Curvy Sense",
    price: 260,
    rating: 4.9,
    category: "Party Dresses",
    tags: ["party", "midi", "new"],
    image:
      "https://i.pinimg.com/736x/7d/ed/2e/7ded2e6d098cdeb1997dd26e3ad3a4c2.jpg",
    badge: "NEW" ,},
  {id: 28,
    name: "Allie Metallic Sequin Dress",
    price: 280,
    previous: 489,
    rating: 4.8,
    category: "Party Dresses",
    tags: ["party", "midi", "sale"],
    image:
      "https://i.pinimg.com/736x/57/43/8a/57438acd2b7ffec7c9b1e3101e43c8a6.jpg",
    badge: "SALE",},
  {id: 29,
    name: "Blue High Low Tulle",
    price: 299,
    rating: 4.6,
    category: "Party Dresses",
    tags: ["party", "burgundy"],
    image:
      "https://i.pinimg.com/originals/b0/46/e2/b046e2751c7633da8b1355c38157333b.jpg",},
  {id: 30,
    name: "Couture Candy Prom Dress",
    price: 1199,
    rating: 4.8,
    category: "Evening Dresses",
    tags: ["evening", "party", "black"],
    image:
      "https://www.couturecandy.com/cdn/shop/files/sydney-s-closet-jk2202-plunging-v-neck-evening-gown-prom-dresses-10-onyx-32389581209683_1080x.jpg?v=1684822187",},
  {id: 31,
    name: "Graident Off The Shoulder Dress",
    price: 1000,
    rating: 4.5,
    category: "Evening Dresses",
    tags: ["evening", "party", "black"],
    image:
      "https://i.pinimg.com/736x/af/e4/8f/afe48f599f057f0e00634f4d6bea44ad.jpg",},
  {id: 32,
    name: "Evening Gown",
    price: 980,
    rating: 4.2,
    category: "Evening Dresses",
    tags: ["evening", "midi", "new"],
    image:
      "https://cdn.shopify.com/s/files/1/0022/0132/1547/files/formal-dress-asymmetric-neck-sheath-gala-gown-by-may-queen-mq2150-dress-embellished-evening-fitted-bodice-formaldressshops-992.png?v=1763887516&width=800",
    badge: "NEW" ,},
  {id: 33,
    name: "Flycurvy Dress",
    price: 1399,
    rating: 4.8,
    category: "Evening Dresses",
    tags: ["evening", "party"],
    image:
      "https://img.staticdj.com/1275d0f786a53cfee22320065b5bef8e.jpeg",},
  {id: 34,
    name: "Off Shoulder Evening Gown",
    price: 1200,
    previous: 1699,
    rating: 4.8,
    category: "Evening Dresses",
    tags: ["evening", "midi", "sale"],
    image:
      "https://i.pinimg.com/736x/77/8f/c5/778fc567e856c3e1fed49eaf3c7ddd2e.jpg",
    badge: "SALE",},
  {id: 35,
    name: "Gold Gown Dress",
    price: 1899,
    rating: 4.8,
    category: "Evening Dresses",
    tags: ["evening", "party"],
    image:
      "https://i.pinimg.com/originals/c0/ad/3a/c0ad3a4e78eec8fabe7208b9edfdae6d.jpg",},
  {id: 36,
    name: "Chocolate Underwire Dress",
    price: 299,
    rating: 4.5,
    category: "Midi Dresses",
    tags: ["midi", "party"],
    image:
      "https://mediahub.prettylittlething.com/cne9098_chocolate_xl?qlt=70&w=549&ssz=true&dpr=1" ,},
  {id: 37,
    name: "Ribbed Knit Long Sleeve Dress",
    price: 300,
    previous: 499,
    rating: 4.6,
    category: "Midi Dresses",
    tags: ["midi", "sale"],
    image:
      "https://i5.walmartimages.com/seo/Plus-Size-Dresses-for-Women-Ribbed-Knit-Long-Sleeve-V-Neck-Color-Block-Front-Button-Down-Loose-Casual-Dress-Also-for-Loungewear_96c19b4e-71ad-4c39-b777-2ea60386f20e.3af1a5126c7037eaec995470090fcf6b.jpeg",
    badge: "SALE",},
  {id: 38,
    name: "Flower Dress",
    price: 459,
    rating: 4.2,
    category: "Midi Dresses",
    tags: ["midi"],
    image:
      "https://cdn.shopify.com/s/files/1/0293/9277/files/01-14-25_S4_42_24GWQ8236_WhiteBlue_AE_JS_11-35-43_PLUS_124821_PXF.jpg?v=1737596335&width=1200&height=1796&crop=center" ,},
  {id: 39,
    name: "Spring Church Dress",
    price: 250,
    previous: 489,
    rating: 4.6,
    category: "Midi Dresses",
    tags: ["midi", "sale", "party"],
    image:
      "https://thegoodpositive.com/wp-content/uploads/2025/12/Plus-Size-Wedding-Guest-White-Floral-Wrap-Neck-High-Low-Hem-Pocket-Midi-Dress-683x1024.webp",
    badge: "SALE",},
  {id: 40,
    name: "White Dress",
    price: 150,
    rating: 4.6,
    category: "Midi Dresses",
    tags: ["midi", "new", "burgundy"],
    image:
      "https://www.curvyoutfits.com/wp-content/uploads/2015/04/plus-size-designer-dress1.jpg",
    badge: "NEW",},
  {id: 41,
    name: "Chic & Cofindent Dress",
    price: 459,
    rating: 4.2,
    category: "Midi Dresses",
    tags: ["midi"],
    image:
      "https://cdn.midjourney.com/42d82263-2271-4433-bd5a-6b6bb3972e36/0_0_640_N.webp?method=shortest",},
  {id: 42,
    name: "Stripe Wrap Dress",
    price: 320,
    rating: 4.8,
    category: "Midi Dresses",
    tags: ["midi", "party"],
    image:
      "https://i.pinimg.com/736x/d7/8a/d3/d78ad36f6f736bee9c8bc2a246217d6e.jpg",},
  { id: 43,
    name: "Guest Maxi Dress",
    price: 180,
    rating: 4.8,
    category: "Maxi Dresses",
    tags: ["maxi", "floral", "new"],
    image:
      "https://c77339a900.mjedge.net/wp-content/uploads/2022/09/backless-plus-size-fall-wedding-guest-dress.webp",
    badge: "NEW",},
  {id: 44,
    name: "Spring Maxi Dress",
    price: 220,
    previous: 500,
    rating: 4.7,
    category: "Maxi Dresses",
    tags: ["maxi", "burgundy", "sale"],
    image:
      "https://alisonsnotebook.com/wp-content/uploads/2023/06/spring-dress-683x1024.jpg",
    badge: "SALE",},
  {id: 45,
    name: "Tie Front Cotton Crush Dress",
    price: 180,
    rating: 4,
    category: "Maxi Dresses",
    tags: ["maxi", "party"],
    image:
      "https://youandallfashion.com/cdn/shop/products/cdd25322-35ab_blush_1.jpg?v=1689868529",},
  {id: 46,
    name: "Zig Zag Fringe Dress",
    price: 400,
    previous: 599,
    rating: 4.8,
    category: "Maxi Dresses",
    tags: ["maxi", "party", "sale"],
    image:
      "https://cdn.shopify.com/s/files/1/0904/3371/6589/files/Siofra_Mini_Dress_-_Zig_Zag_Fringe_Dress_in_Black_1.jpg?v=1744831844&width=850&height=1360&crop=center",
    badge: "SALE",},
  {id: 47,
    name: "Blue Denim Outfit",
    price: 210,
    rating: 4.6,
    category: "Maxi Dresses",
    tags: ["maxi", "party", "Denim"],
    image:
      "https://chicandcurvy.com/cdn/shop/files/C911F6DB-1662-4C90-90BF-C2B4E4C07620.png?v=1772300045",},
  {id: 48,
    name: "Striped Polka Dot Corset Maxi Dress",
    price: 280,
    rating: 4.9,
    category: "Maxi Dresses",
    tags: ["maxi", "floral", "new", "party"],
    image:
      "https://ellaelisque.com/cdn/shop/files/celine-white-striped-polka-dot-corset-maxi-dress-cspcmdwhite-xs-7179999.png?crop=center&format=webp&height=1402&v=1778879358&width=1122",
    badge: "NEW",},
]

const categories = [
  "All Dresses",
  "Maxi Dresses",
  "Midi Dresses",
  "Casual Dresses",
  "Party Dresses",
  "Work Dresses",
  "Evening Dresses",
  "New Arrivals",
  "Sale",
];

const money = (amount: number) =>
  `R${amount.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}`;

function Icon({
  name,
  size = 20,
}: {
  name: "search" | "heart" | "user" | "bag" | "menu" | "arrow" | "close" | "check" | "star";
  size?: number;
}) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    check: <path d="m5 12 4 4L19 6" />,
    star: <path d="m12 2 3 6 6 .9-4.5 4.4 1.1 6.2L12 16.7l-5.6 2.8 1.1-6.2L3 8.9 9 8l3-6Z" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Action({
  children,
  onClick,
  kind = "primary",
  className = "",
  type = "button",
  disabled = false,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  kind?: "primary" | "secondary" | "ghost" | "icon" | "light";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`action action-${kind} ${className}`}
    >
      {children}
    </button>
  );
}

function Field({
  placeholder,
  value,
  onChange,
  type = "text",
  label,
}: {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  label?: string;
}) {
  return (
    <label className="field">
      {label && <span>{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </label>
  );
}

function SectionTitle({ eyebrow, title, detail }: { eyebrow?: string; title: string; detail?: string }) {
  return (
    <div className="section-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <p className="display-title">{title}</p>
      {detail && <p className="section-detail">{detail}</p>}
    </div>
  );
}

function Header({
  navigate,
  cartCount,
  wishlistCount,
  onSearch,
}: {
  navigate: (page: Page) => void;
  cartCount: number;
  wishlistCount: number;
  onSearch: (value: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const submitSearch = () => {
    if (query.trim()) onSearch(query.trim());
    setSearchOpen(false);
  };
  return (
    <>
      <div className="announcement">FREE DELIVERY ON ORDERS OVER R1,200 <span>•</span> EASY 30-DAY RETURNS</div>
      <header className="header">
        <Action kind="icon" className="mobile-only" onClick={() => setMenuOpen(!menuOpen)} ariaLabel="Open menu">
          <Icon name={menuOpen ? "close" : "menu"} />
        </Action>
        <Action kind="ghost" className="brand" onClick={() => navigate("home")}>
          <span className="brand-name">LUNA CURVE</span>
          <span className="brand-tagline">Fashion that fits your curves.</span>
        </Action>
        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <Action kind="ghost" onClick={() => { navigate("home"); setMenuOpen(false); }}>Home</Action>
          <Action kind="ghost" onClick={() => { navigate("catalog"); setMenuOpen(false); }}>Dresses</Action>
          <Action kind="ghost" onClick={() => { onSearch("new"); setMenuOpen(false); }}>New Arrivals</Action>
          <Action kind="ghost" className="sale-link" onClick={() => { onSearch("sale"); setMenuOpen(false); }}>Sale</Action>
          <Action kind="ghost" onClick={() => { navigate("about"); setMenuOpen(false); }}>About Us</Action>
        </nav>
        <div className="header-actions">
          <Action kind="icon" onClick={() => setSearchOpen(true)} ariaLabel="Search"><Icon name="search" /></Action>
          <Action kind="icon" onClick={() => navigate("wishlist")} ariaLabel="Wishlist">
            <Icon name="heart" />{wishlistCount > 0 && <span className="count">{wishlistCount}</span>}
          </Action>
          <Action kind="icon" className="desktop-icon" onClick={() => navigate("account")} ariaLabel="Account"><Icon name="user" /></Action>
          <Action kind="icon" onClick={() => navigate("cart")} ariaLabel="Shopping bag">
            <Icon name="bag" />{cartCount > 0 && <span className="count">{cartCount}</span>}
          </Action>
        </div>
      </header>
      {searchOpen && (
        <div className="search-overlay">
          <div className="search-panel">
            <div>
              <p className="eyebrow">FIND YOUR PERFECT DRESS</p>
              <Action kind="icon" onClick={() => setSearchOpen(false)} ariaLabel="Close search"><Icon name="close" /></Action>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); submitSearch(); }}>
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search maxi, burgundy, party..." />
              <Action type="submit" kind="icon"><Icon name="arrow" size={26} /></Action>
            </form>
            <p>Popular: Maxi dresses · Party dresses · Burgundy · New arrivals</p>
          </div>
        </div>
      )}
    </>
  );
}

function ProductCard({
  product,
  liked,
  onLike,
  onOpen,
  onAdd,
}: {
  product: Product;
  liked: boolean;
  onLike: () => void;
  onOpen: () => void;
  onAdd: () => void;
}) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={`Plus-size model wearing ${product.name}`} onClick={onOpen} />
        {product.badge && <span className={`badge ${product.badge === "SALE" ? "badge-sale" : ""}`}>{product.badge}</span>}
        <Action kind="icon" className={`heart-btn ${liked ? "liked" : ""}`} onClick={onLike} ariaLabel="Save to wishlist">
          <Icon name="heart" />
        </Action>
        <div className="card-actions">
          <Action kind="light" onClick={onOpen}>Quick view</Action>
          <Action kind="primary" onClick={onAdd}>Add to bag</Action>
        </div>
      </div>
      <div className="product-copy" onClick={onOpen}>
        <p className="product-name">{product.name}</p>
        <div className="rating"><Icon name="star" size={14} /> {product.rating} <span>(48)</span></div>
        <div className="price"><strong>{money(product.price)}</strong>{product.previous && <s>{money(product.previous)}</s>}</div>
      </div>
    </article>
  );
}

function ProductGrid({
  items,
  wishlist,
  toggleWishlist,
  openProduct,
  addQuick,
}: {
  items: Product[];
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  openProduct: (product: Product) => void;
  addQuick: (product: Product) => void;
}) {
  return (
    <div className="product-grid">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          liked={wishlist.includes(product.id)}
          onLike={() => toggleWishlist(product.id)}
          onOpen={() => openProduct(product)}
          onAdd={() => addQuick(product)}
        />
      ))}
    </div>
  );
}

function Home({
  navigate,
  filterCategory,
  ...gridProps
}: {
  navigate: (page: Page) => void;
  filterCategory: (category: string) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  openProduct: (product: Product) => void;
  addQuick: (product: Product) => void;
}) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">THE NEW SEASON · SIZES XL–5XL</p>
          <p className="hero-title">MADE FOR<br /><em>EVERY</em> CURVE</p>
          <p className="hero-text">Stylish, comfortable and affordable dresses designed with plus-size women in mind.</p>
          <div className="hero-buttons">
            <Action onClick={() => navigate("catalog")}>Shop dresses <Icon name="arrow" /></Action>
            <Action kind="secondary" onClick={() => filterCategory("New Arrivals")}>Explore new arrivals</Action>
          </div>
          <div className="hero-proof">
            <span><strong>XL–5XL</strong> Thoughtful sizing</span>
            <span><strong>4.8/5</strong> Loved by our community</span>
          </div>
        </div>
        <div className="hero-visual">
          <img src="https://i.pinimg.com/736x/64/a3/75/64a375ddb1ee5eeb189cc1724961bc9b.jpg" alt="Confident plus-size woman wearing a rich purple occasion dress" />
          <div className="hero-note"><span>01</span><p>THE SATIN EDIT<br /><strong>Fluid shapes. Confident colour.</strong></p></div>
        </div>
      </section>

      <section className="category-strip">
        <p className="category-label">SHOP BY MOOD</p>
        <div>
          {categories.map((category, index) => (
            <Action key={category} kind="ghost" onClick={() => filterCategory(category)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{category}
            </Action>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading-row">
          <SectionTitle eyebrow="JUST LANDED" title="New arrivals" detail="Fresh silhouettes, made to move with you." />
          <Action kind="ghost" onClick={() => filterCategory("New Arrivals")}>View the edit <Icon name="arrow" /></Action>
        </div>
        <ProductGrid items={products.slice(0, 4)} {...gridProps} />
      </section>

      <section className="editorial">
        <div className="editorial-image">
          <img src="https://i.pinimg.com/736x/2f/2a/3e/2f2a3e376a51df47de68bfd596978cd9.jpg" alt="Plus-size woman wearing an emerald green high-low dress" />
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">AFFORDABLE FASHION · CONSIDERED FIT</p>
          <p className="display-title">A beautiful fit<br />should never be<br />a luxury.</p>
          <p>Our dresses are cut with real curves in mind, so you can spend less time searching and more time feeling incredible.</p>
          <Action onClick={() => navigate("catalog")}>Discover dresses <Icon name="arrow" /></Action>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading-row">
          <SectionTitle eyebrow="COMMUNITY FAVOURITES" title="Best sellers" />
          <Action kind="ghost" onClick={() => navigate("catalog")}>Shop all <Icon name="arrow" /></Action>
        </div>
        <ProductGrid items={products.slice(4, 8)} {...gridProps} />
      </section>

      <section className="sale-banner">
        <div><p className="eyebrow">THE LUNA SALE</p><p>BEAUTIFUL STYLE,<br /><em>BETTER PRICES</em></p></div>
        <div><p>Save up to 30% on selected dresses.<br />Your next favourite is waiting.</p><Action kind="light" onClick={() => filterCategory("Sale")}>Shop sale <Icon name="arrow" /></Action></div>
      </section>

      <section className="reviews">
        <SectionTitle eyebrow="REAL WOMEN · REAL CONFIDENCE" title="The Luna community" />
        <div className="review-grid">
          {[
            ["“Finally, a dress that fits my waist and hips beautifully. I felt incredible all evening.”", "NALedi M. · JOHANNESBURG"],
            ["“The quality is gorgeous and the sizing is honest. Luna Curve is my new go-to.”", "THANDI P. · CAPE TOWN"],
            ["“I ordered my usual size and it fit perfectly. So flattering, and delivery was quick.”", "AMY R. · DURBAN"],
          ].map(([quote, author]) => <div className="review" key={author}><div className="stars">★★★★★</div><p>{quote}</p><span>{author}</span></div>)}
        </div>
      </section>
    </main>
  );
}

function Catalog({
  category,
  setCategory,
  ...gridProps
}: {
  category: string;
  setCategory: (value: string) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  openProduct: (product: Product) => void;
  addQuick: (product: Product) => void;
}) {
  const filtered = category === "All Dresses"
    ? products
    : category === "New Arrivals"
      ? products.filter((item) => item.tags.includes("new"))
      : category === "Sale"
        ? products.filter((item) => item.previous)
        : products.filter((item) => item.category === category);
  return (
    <main className="catalog-page">
      <div className="catalog-hero">
        <p className="eyebrow">THE COLLECTION · XL–5XL</p>
        <p className="page-title">{category}</p>
        <p>Dresses for every plan, every mood and every curve.</p>
      </div>
      <div className="catalog-toolbar">
        <div className="filter-scroll">
          {categories.map((item) => <Action key={item} kind="ghost" className={category === item ? "active-filter" : ""} onClick={() => setCategory(item)}>{item}</Action>)}
        </div>
        <span>{filtered.length} styles</span>
      </div>
      <section className="content-section catalog-content">
        <ProductGrid items={filtered} {...gridProps} />
      </section>
    </main>
  );
}

function ProductDetail({
  product,
  liked,
  toggleWishlist,
  addToCart,
  buyNow,
}: {
  product: Product;
  liked: boolean;
  toggleWishlist: () => void;
  addToCart: (color: string, size: string, quantity: number, image: string) => void;
  buyNow: (color: string, size: string, quantity: number, image: string) => void;
}) {
  const [color, setColor] = useState("Deep Plum");
  const [size, setSize] = useState("2XL");
  const [quantity, setQuantity] = useState(1);
  const [sizeGuide, setSizeGuide] = useState(false);
  const [zoom, setZoom] = useState(false);
  const colors = product.id === 1 ? Object.keys(plumImages) : product.tags.includes("burgundy") ? ["Burgundy", "Black"] : ["Black", "Deep Plum"];
  const currentImage = product.id === 1 ? plumImages[color as keyof typeof plumImages] : product.image;
  const gallery = product.id === 1
    ? [
        currentImage,
        color === "Deep Plum" ? "https://images.unsplash.com/photo-1657549091422-3b748b8f72b2?auto=format&fit=crop&w=900&q=88" : currentImage,
        color === "Deep Plum" ? "https://images.unsplash.com/photo-1657550853413-a646ba6a1877?auto=format&fit=crop&w=900&q=88" : currentImage,
      ]
    : [currentImage];
  const [thumb, setThumb] = useState(0);
  const shownImage = thumb === 0 ? currentImage : gallery[thumb] || currentImage;
  return (
    <main className="detail-page">
      <div className="breadcrumbs">HOME / DRESSES / {product.category.toUpperCase()}</div>
      <div className="detail-layout">
        <div className="gallery">
          <div className="thumbs">
            {gallery.map((image, index) => <Action key={`${image}-${index}`} kind="ghost" className={thumb === index ? "selected-thumb" : ""} onClick={() => setThumb(index)}><img src={image} alt={`${product.name} view ${index + 1}`} /></Action>)}
          </div>
          <div className="main-image" onClick={() => setZoom(true)}>
            <img src={shownImage} alt={`Plus-size model wearing ${product.name} in ${color}`} />
            <span>CLICK TO ZOOM</span>
          </div>
        </div>
        <div className="product-info">
          {product.badge && <span className="detail-badge">{product.badge}</span>}
          <p className="detail-title">{product.name}</p>
          <div className="rating"><span className="stars">★★★★★</span> {product.rating} <u>48 reviews</u></div>
          <div className="detail-price"><strong>{money(product.price)}</strong>{product.previous && <s>{money(product.previous)}</s>}</div>
          <p className="description">A flattering, curve-loving silhouette with a soft drape and an adjustable wrap waist. Designed to celebrate your shape from every angle, without compromising on comfort.</p>
          <div className="option-block">
            <div className="option-title"><strong>COLOUR</strong><span>{color}</span></div>
            <div className="swatches">
              {colors.map((item) => (
                <Action key={item} kind="ghost" className={color === item ? "selected-swatch" : ""} onClick={() => { setColor(item); setThumb(0); }} ariaLabel={item}>
                  <span className={`swatch swatch-${item.toLowerCase().replace(" ", "-")}`} />
                </Action>
              ))}
            </div>
          </div>
          <div className="option-block">
            <div className="option-title"><strong>SELECT SIZE</strong><Action kind="ghost" onClick={() => setSizeGuide(true)}>Size guide</Action></div>
            <div className="sizes">
              {["XL", "2XL", "3XL", "4XL", "5XL"].map((item) => <Action key={item} kind="secondary" className={size === item ? "selected-size" : ""} onClick={() => setSize(item)}>{item}</Action>)}
            </div>
          </div>
          <div className="purchase-row">
            <div className="quantity">
              <Action kind="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</Action>
              <span>{quantity}</span>
              <Action kind="icon" onClick={() => setQuantity(quantity + 1)}>+</Action>
            </div>
            <Action className="add-wide" onClick={() => addToCart(color, size, quantity, currentImage)}>Add to bag — {money(product.price * quantity)}</Action>
            <Action kind="secondary" onClick={toggleWishlist} ariaLabel="Add to wishlist"><Icon name="heart" /></Action>
          </div>
          <Action kind="secondary" className="buy-now" onClick={() => buyNow(color, size, quantity, currentImage)}>Buy now</Action>
          <div className="service-list">
            <div><Icon name="bag" /><p><strong>DELIVERY</strong><span>Free over R1,200 · 2–5 working days</span></p></div>
            <div><Icon name="check" /><p><strong>EASY RETURNS</strong><span>30 days to change your mind</span></p></div>
          </div>
          <details open><summary>FIT & FABRIC</summary><p>Soft-touch satin with gentle stretch. True to size with an adjustable tie waist. 96% polyester, 4% elastane.</p></details>
          <details><summary>DELIVERY & RETURNS</summary><p>Nationwide delivery across South Africa. Return unworn items within 30 days.</p></details>
        </div>
      </div>
      <section className="detail-reviews">
        <SectionTitle eyebrow="WORN & LOVED" title="Customer reviews" />
        <div className="review-summary"><strong>4.9</strong><span><span className="stars">★★★★★</span><br />Based on 48 reviews</span><p>96% would recommend this dress</p></div>
      </section>
      {sizeGuide && (
        <div className="modal-backdrop">
          <div className="modal">
            <Action kind="icon" className="modal-close" onClick={() => setSizeGuide(false)}><Icon name="close" /></Action>
            <p className="eyebrow">FIND YOUR LUNA FIT</p><p className="modal-title">Size guide</p>
            <p>Measure around the fullest part of your bust, waist and hips.</p>
            <table><thead><tr><th>SIZE</th><th>BUST</th><th>WAIST</th><th>HIPS</th></tr></thead><tbody>
              {[["XL", "112", "94", "120"], ["2XL", "120", "102", "128"], ["3XL", "128", "110", "136"], ["4XL", "136", "118", "144"], ["5XL", "144", "126", "152"]].map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}{cell !== row[0] && " cm"}</td>)}</tr>)}
            </tbody></table>
          </div>
        </div>
      )}
      {zoom && <div className="zoom-view" onClick={() => setZoom(false)}><Action kind="icon"><Icon name="close" /></Action><img src={shownImage} alt={`Zoomed ${product.name}`} /></div>}
    </main>
  );
}

function SearchResults({ query, ...gridProps }: { query: string; wishlist: number[]; toggleWishlist: (id: number) => void; openProduct: (product: Product) => void; addQuick: (product: Product) => void }) {
  const found = products.filter((product) => `${product.name} ${product.category} ${product.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <main className="catalog-page">
      <div className="catalog-hero search-results-title"><p className="eyebrow">SEARCH RESULTS FOR</p><p className="page-title">“{query}”</p><p>{found.length} {found.length === 1 ? "style" : "styles"} found</p></div>
      <section className="content-section catalog-content">{found.length ? <ProductGrid items={found} {...gridProps} /> : <div className="empty"><p>No dresses found.</p><span>Try searching “maxi”, “burgundy” or “party”.</span></div>}</section>
    </main>
  );
}

function CartPage({ cart, setCart, navigate }: { cart: CartItem[]; setCart: React.Dispatch<React.SetStateAction<CartItem[]>>; navigate: (page: Page) => void }) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const update = (index: number, change: number) => setCart((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, quantity: Math.max(1, item.quantity + change) } : item));
  return (
    <main className="bag-page">
      <SectionTitle eyebrow="YOUR SELECTION" title="Shopping bag" />
      {!cart.length ? <div className="empty"><p>Your bag is waiting.</p><span>Find a dress that makes you feel incredible.</span><Action onClick={() => navigate("catalog")}>Shop dresses</Action></div> : (
        <div className="bag-layout">
          <div className="bag-items">
            {cart.map((item, index) => (
              <article className="bag-item" key={`${item.product.id}-${index}`}>
                <img src={item.image} alt={item.product.name} />
                <div><p className="product-name">{item.product.name}</p><p>Colour: <strong>{item.color}</strong></p><p>Size: <strong>{item.size}</strong></p>
                  <div className="quantity"><Action kind="icon" onClick={() => update(index, -1)}>−</Action><span>{item.quantity}</span><Action kind="icon" onClick={() => update(index, 1)}>+</Action></div>
                </div>
                <div className="bag-item-end"><strong>{money(item.product.price * item.quantity)}</strong><Action kind="ghost" onClick={() => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</Action></div>
              </article>
            ))}
          </div>
          <aside className="summary"><p className="summary-title">Order summary</p><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery</span><strong>{subtotal >= 1200 ? "FREE" : money(89)}</strong></div><div className="total"><span>Total</span><strong>{money(subtotal + (subtotal >= 1200 ? 0 : 89))}</strong></div><Action onClick={() => navigate("checkout")}>Secure checkout <Icon name="arrow" /></Action><small>Secure payments · Easy 30-day returns</small></aside>
        </div>
      )}
    </main>
  );
}

function Checkout({ cart, navigate }: { cart: CartItem[]; navigate: (page: Page) => void }) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return (
    <main className="checkout-page">
      <div className="checkout-heading"><p className="brand-name">LUNA CURVE</p><span>Secure checkout</span></div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); navigate("confirmation"); }}>
          <p className="checkout-step"><span>1</span> Customer information</p>
          <div className="form-grid"><Field label="First name" placeholder="Thandi" /><Field label="Last name" placeholder="Mokoena" /><Field label="Email" placeholder="thandi@example.co.za" type="email" /><Field label="Mobile number" placeholder="+27 82 123 4567" /></div>
          <p className="checkout-step"><span>2</span> Delivery information</p>
          <div className="form-grid"><div className="full"><Field label="Street address" placeholder="14 Rosebank Road" /></div><Field label="Suburb" placeholder="Rosebank" /><Field label="City" placeholder="Johannesburg" /><Field label="Province" placeholder="Gauteng" /><Field label="Postal code" placeholder="2196" /></div>
          <p className="checkout-step"><span>3</span> Payment</p>
          <div className="payment-tabs"><Action kind="secondary" className="selected-size">Card</Action><Action kind="secondary">Instant EFT</Action></div>
          <div className="form-grid"><div className="full"><Field label="Card number" placeholder="0000 0000 0000 0000" /></div><Field label="Expiry date" placeholder="MM / YY" /><Field label="CVV" placeholder="123" /></div>
          <Action type="submit" className="place-order">Place order — {money(subtotal + (subtotal >= 1200 ? 0 : 89))}</Action>
        </form>
        <aside className="checkout-review"><p className="checkout-step"><span>4</span> Order review</p>{cart.map((item, index) => <div className="mini-item" key={index}><img src={item.image} alt={item.product.name} /><div><strong>{item.product.name}</strong><span>{item.color} · {item.size} · Qty {item.quantity}</span></div><strong>{money(item.product.price * item.quantity)}</strong></div>)}<div className="total"><span>Total</span><strong>{money(subtotal + (subtotal >= 1200 ? 0 : 89))}</strong></div></aside>
      </div>
    </main>
  );
}

function Confirmation({ cart, navigate }: { cart: CartItem[]; navigate: (page: Page) => void }) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return <main className="confirmation"><div className="confirm-check"><Icon name="check" size={38} /></div><p className="eyebrow">THANK YOU FOR SHOPPING WITH US</p><p className="page-title">ORDER CONFIRMED</p><p>Your order <strong>#LC24819</strong> is being prepared. A confirmation has been sent to your email.</p><div className="confirmation-card">{cart.map((item, index) => <div className="mini-item" key={index}><img src={item.image} alt={item.product.name} /><div><strong>{item.product.name}</strong><span>{item.color} · {item.size} · Qty {item.quantity}</span></div><strong>{money(item.product.price * item.quantity)}</strong></div>)}<div className="total"><span>Total</span><strong>{money(total + (total >= 1200 ? 0 : 89))}</strong></div><p><strong>DELIVERING TO</strong><br />14 Rosebank Road, Rosebank<br />Johannesburg, Gauteng, 2196</p></div><Action onClick={() => navigate("catalog")}>Continue shopping <Icon name="arrow" /></Action></main>;
}

function About() {
  return <main className="about-page"><div className="about-hero"><img src="https://images.unsplash.com/photo-1573878222998-40b24a653ac8?auto=format&fit=crop&w=1200&q=88" alt="Confident smiling plus-size woman" /><div><p className="eyebrow">OUR STORY</p><p className="page-title">Fashion that fits your curves.<br /><em>Confidence that fits you.</em></p></div></div><section className="about-copy"><SectionTitle eyebrow="WELCOME TO LUNA CURVE" title="Beautiful clothes. Zero limitations." /><p>At Luna Curve, we believe every woman deserves to feel confident in what she wears. We create stylish, comfortable and affordable dresses designed with plus-size women in mind. Our goal is to make finding the perfect dress easier, so you never have to feel limited by your size or struggle to find something beautiful for your wardrobe.</p></section><section className="values">{[["01", "DESIGNED FOR CURVES", "Fashion created with plus-size women in mind."], ["02", "AFFORDABLE FASHION", "Beautiful styles without unnecessary prices."], ["03", "CONFIDENCE INCLUDED", "Clothing that helps every woman feel confident."]].map(([number, title, text]) => <div key={number}><span>{number}</span><p>{title}</p><small>{text}</small></div>)}</section></main>;
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return <footer><div className="footer-brand"><p className="brand-name">LUNA CURVE</p><p>Fashion that fits your curves.<br />Confidence that fits you.</p></div><div><strong>SHOP</strong><Action kind="ghost" onClick={() => navigate("catalog")}>All dresses</Action><Action kind="ghost">New arrivals</Action><Action kind="ghost">Sale</Action></div><div><strong>HELP</strong><Action kind="ghost">Delivery & returns</Action><Action kind="ghost">Size guide</Action><Action kind="ghost">Contact us</Action></div><div className="newsletter"><strong>THE LUNA LETTER</strong><p>New styles, confidence notes and offers — straight to your inbox.</p><div><input placeholder="Email address" /><Action kind="icon"><Icon name="arrow" /></Action></div></div><small>© 2026 LUNA CURVE · SOUTH AFRICA</small></footer>;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [category, setCategory] = useState("All Dresses");
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigate = (next: Page) => { setPage(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const filterCategory = (value: string) => { setCategory(value); navigate("catalog"); };
  const openProduct = (product: Product) => { setSelectedProduct(product); navigate("product"); };
  const toggleWishlist = (id: number) => setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const addItem = (product: Product, color: string, size: string, quantity: number, image: string) => {
    setCart((current) => [...current, { product, color, size, quantity, image }]);
  };
  const addQuick = (product: Product) => addItem(product, product.tags.includes("burgundy") ? "Burgundy" : "Deep Plum", "2XL", 1, product.image);
  const runSearch = (query: string) => { setSearchQuery(query); navigate("search"); };
  const gridProps = useMemo(() => ({ wishlist, toggleWishlist, openProduct, addQuick }), [wishlist]);

  let content: React.ReactNode;
  if (page === "home") content = <Home navigate={navigate} filterCategory={filterCategory} {...gridProps} />;
  else if (page === "catalog") content = <Catalog category={category} setCategory={setCategory} {...gridProps} />;
  else if (page === "product") content = <ProductDetail product={selectedProduct} liked={wishlist.includes(selectedProduct.id)} toggleWishlist={() => toggleWishlist(selectedProduct.id)} addToCart={(color, size, quantity, image) => addItem(selectedProduct, color, size, quantity, image)} buyNow={(color, size, quantity, image) => { addItem(selectedProduct, color, size, quantity, image); navigate("checkout"); }} />;
  else if (page === "search") content = <SearchResults query={searchQuery} {...gridProps} />;
  else if (page === "cart") content = <CartPage cart={cart} setCart={setCart} navigate={navigate} />;
  else if (page === "checkout") content = <Checkout cart={cart} navigate={navigate} />;
  else if (page === "confirmation") content = <Confirmation cart={cart} navigate={navigate} />;
  else if (page === "about") content = <About />;
  else if (page === "account") content = <main className="simple-page"><SectionTitle eyebrow="YOUR LUNA SPACE" title="Welcome back" detail="Sign in to see your orders, saved addresses and Luna favourites." /><div className="account-card"><Field label="Email address" placeholder="you@example.co.za" /><Field label="Password" placeholder="Your password" type="password" /><Action>Sign in</Action><p>New to Luna Curve? <u>Create an account</u></p></div></main>;
  else {
    const wished = products.filter((product) => wishlist.includes(product.id));
    content = <main className="bag-page wishlist-page"><SectionTitle eyebrow="SAVED FOR LATER" title="My wishlist" />{wished.length ? <ProductGrid items={wished} {...gridProps} /> : <div className="empty"><Icon name="heart" size={38} /><p>Nothing saved yet.</p><span>Tap the heart on any style you love.</span><Action onClick={() => navigate("catalog")}>Explore dresses</Action></div>}</main>;
  }

  return (
    <div className="app">
      {page !== "checkout" && page !== "confirmation" && <Header navigate={navigate} cartCount={cartCount} wishlistCount={wishlist.length} onSearch={runSearch} />}
      {content}
      {page !== "checkout" && page !== "confirmation" && <Footer navigate={navigate} />}
    </div>
  );
}
