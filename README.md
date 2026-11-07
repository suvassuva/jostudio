# JO STUDIO – Modern Indian Men's Fashion E-Commerce

A modern, fast, and fully responsive men's fashion e-commerce frontend built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**. 

The UI/UX is inspired by the frictionless shopping journey of **Meesho**, featuring direct **WhatsApp Click-to-Chat Order Confirmation**, localized Indian Rupee (`₹`) pricing, comprehensive filtering, mobile bottom navigation, persistent cart, and wishlist.

---

## 🚀 Key Features

### 1. 🛍️ Product Catalog & Discovery
- **32 realistic men's clothing products** across 9 core categories:
  - T-Shirts (Oversized, Graphic, Henley, Acid Wash)
  - Shirts (Linen Mandarin, Flannel Check, Resort Cuban, Royal Oxford)
  - Jeans (Straight Selvedge, Jet Black Slim, Baggy Skater, Distressed)
  - Trousers (Stretch Chinos, Pleated Gurkha, Cargo, Linen Ankle)
  - Casual Wear (Polo Tipped, Denim Overshirt, Co-ords)
  - Formal Wear (Executive Non-Iron Shirts, Notch Lapel Blazers, Gabardine Pants)
  - Hoodies & Sweats (Heavyweight Fleece, Streetwear Boxy)
  - Jackets & Coats (Sherpa Denim, Packable Puffer, Faux Leather Bomber)
  - Shorts (Everyday Cargo Bermuda, Quick-Dry Gym Shorts)
- **Filters**: Category, Size (`S`, `M`, `L`, `XL`, `XXL`), Price Range presets, and Color Swatches.
- **Sorting**: Popularity, Price (Low to High), Price (High to Low), New Arrivals, and Discount Percentage.
- **Responsive Mobile Filter Drawer**: Smooth slide-out filtering with live item count updates.
- **Live Search**: Instant keyword search across product names, categories, and descriptions.

### 2. 👕 Product Details & Fit
- Multiple high-resolution images with interactive thumbnail gallery.
- Interactive Color and Size selectors (`S`, `M`, `L`, `XL`, `XXL`).
- **Enforced Size Validation**: Prevents adding to cart or purchasing without selecting an available size.
- **Interactive Size Guide Modal**: Detailed chest, length, shoulder, waist, and inseam measurements in inches for all tops and bottoms.
- Direct **"Buy Now"** flow: Immediately selects size and navigates to checkout.
- Direct **"Quick Inquire on WhatsApp"** button.
- Related products recommendations.

### 3. 🛒 Cart & Wishlist (Local Persistence)
- **Slide-out Cart Drawer** accessible from anywhere in the app.
- **Full Cart Page** with quantity controls, unit price calculation, and Meesho-style free shipping progress bar (Free above ₹499).
- Total savings calculator highlighting discounts.
- **Wishlist Page**: Heart toggle on any product card or details page, with a quick "Move to Bag" size picker modal.
- Zero hydration errors with safe `localStorage` synchronization.

### 4. 📲 WhatsApp Order Integration
- **Click-to-Chat API**: `https://wa.me/WHATSAPP_NUMBER?text=ENCODED_MESSAGE`
- Complete order form collecting customer name, phone number, house address, area, city, state, PIN code, and optional delivery notes.
- Strict form validation before message generation.
- Formats orders exactly as required:
  ```text
  NEW ORDER

  Customer Details:
  Name: Rahul Sharma
  Phone: 9876543210
  Address: Flat 402, Royal Residency, Andheri West, Mumbai, Maharashtra - 400053

  Order Details:
  1. Classic Pure Cotton Oversized Crewneck T-Shirt
     Size: XL
     Color: Pitch Black
     Quantity: 2
     Price: ₹998

  2. Smart Stretch Slim Fit Everyday Chino Trousers
     Size: L
     Color: Warm Khaki
     Quantity: 1
     Price: ₹749

  Order Summary:
  Subtotal: ₹1747
  Delivery: ₹0 (Free)
  Total: ₹1747

  Please confirm this order.
  ```
- **Handoff Screen**: Automatically opens WhatsApp in a new tab, displays a copy of the sent message preview, and preserves the cart until confirmed.

### 5. 📱 Responsive Mobile-First Design
- **Mobile**: 2-column product grid, sticky compact header with live search, slide-out drawers, and bottom navigation bar (`Home`, `Explore`, `Wishlist`, `Cart`, `WhatsApp Chat`).
- **Tablet**: 2 to 3-column product layout with comfortable spacing.
- **Desktop**: 4-column product grid, persistent sticky filter sidebar, and rich image gallery.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API (`CartContext`, `WishlistContext`)
- **Persistence**: Browser `localStorage`
- **Build Mode**: Static Site Generation (SSG) with `generateStaticParams` for all 32 products

---

## 📦 Project Structure

```
├── src/
│   ├── app/
│   │   ├── cart/page.tsx               # Full Shopping Cart
│   │   ├── checkout/page.tsx           # Delivery details & WhatsApp checkout
│   │   ├── products/
│   │   │   ├── page.tsx                # Product Listing with filters & sorting
│   │   │   └── [slug]/page.tsx         # SSG Product Details Page
│   │   ├── wishlist/page.tsx           # Saved Wishlist with Move-to-Cart
│   │   ├── globals.css                 # Tailwind & custom scrollbar styles
│   │   ├── layout.tsx                  # Root layout with providers & bottom nav
│   │   ├── not-found.tsx               # Custom 404 page
│   │   └── page.tsx                    # Home page with banners & categories
│   ├── components/
│   │   ├── cart/
│   │   │   └── CartDrawer.tsx          # Slide-out quick cart drawer
│   │   ├── layout/
│   │   │   ├── Header.tsx              # Sticky header with search & badges
│   │   │   ├── Footer.tsx              # Trust markers & WhatsApp help
│   │   │   └── BottomNavigation.tsx    # Mobile bottom nav bar
│   │   ├── product/
│   │   │   ├── ProductCard.tsx         # 2-col/4-col reusable product card
│   │   │   ├── ProductDetailView.tsx   # Gallery, size selector & actions
│   │   │   ├── ProductFilters.tsx      # Sidebar & mobile filter drawer
│   │   │   └── SizeGuideModal.tsx      # Tops & bottoms measurement table
│   │   ├── providers/
│   │   │   └── Providers.tsx           # Context providers wrapper
│   │   └── ui/
│   │       ├── Badge.tsx               # Multi-style badge pill
│   │       ├── PriceDisplay.tsx        # Discount & currency renderer
│   │       └── RatingStars.tsx         # Green rating star badge
│   ├── context/
│   │   ├── CartContext.tsx             # Cart state & localStorage sync
│   │   └── WishlistContext.tsx         # Wishlist state & localStorage sync
│   ├── data/
│   │   └── products.ts                 # 32 comprehensive dummy products
│   ├── lib/
│   │   └── whatsapp.ts                 # WhatsApp URL & order message generator
│   └── types/
│       └── index.ts                    # TypeScript models
├── .env.example                        # Configurable WhatsApp number template
├── .env.local                          # Local environment variables
├── next.config.mjs                     # Image remote patterns configuration
├── tailwind.config.ts                  # Brand colors & system fonts
└── tsconfig.json                       # Path aliases (@/*)
```

---

## ⚙️ Configuration & Setup

### 1. Configure the WhatsApp Business Number
Create or update `.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=918861185066
```
*Note: Specify the full number with country code without the `+` sign or spaces (e.g. `91` followed by 10 digits for India).*

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Test
```bash
npm run build
npm run start
```
The application will statically pre-render all 40 routes and optimize production JavaScript bundles.

