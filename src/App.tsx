import { useState } from "react";
import type { CSSProperties } from "react";
import { ArrowRight, Menu, Plus, X } from "lucide-react";

const drinks = [
  { id: "caramel", eye: "today's sip is", first: "Iced", second: "Caramel", copy: "Double espresso, cold milk and real caramel, under a soft top of cloud foam we whip every morning.", price: "$5.40", ink: "#2a1009", syrup: "#c8792e", straw: "#ee9298" },
  { id: "mocha", eye: "meet your new", first: "Iced", second: "Mocha", copy: "Bold espresso, cool milk and rich chocolate, finished with a little cloud of cocoa foam.", price: "$5.20", ink: "#4a2117", syrup: "#75412a", straw: "#dbc0a0" },
  { id: "berry", eye: "a little bit of", first: "Berry", second: "Cloud", copy: "Bright strawberry, smooth milk and espresso, topped with the softest cloud of cream.", price: "$5.60", ink: "#a72b53", syrup: "#dc6481", straw: "#f0acba" },
];

type Drink = (typeof drinks)[number];

function Cloud({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 180 100" aria-hidden="true"><path fill="currentColor" d="M25 82C11 82 2 71 2 57s10-25 24-25c4 0 8 1 11 3C42 16 59 3 80 3c24 0 43 18 46 41 4-3 10-5 16-5 19 0 34 14 34 32s-14 31-33 31z" /></svg>;
}

function BrandCloud() {
  return <svg className="brand-cloud" viewBox="0 0 42 28" aria-hidden="true"><path fill="currentColor" d="M8 25h25c5 0 8-3 8-7 0-4-3-7-7-7h-1C31 5 26 2 21 2c-6 0-11 4-12 10-5-1-8 2-8 6s3 7 7 7Z" /></svg>;
}

function Bean({ className = "" }: { className?: string }) {
  return <svg className={`bean ${className}`} viewBox="0 0 80 46" aria-hidden="true"><ellipse cx="40" cy="23" rx="36" ry="18" transform="rotate(-17 40 23)" fill="#472216" /><path d="M24 36c18-9 25-20 33-31" fill="none" stroke="#a05c3b" strokeWidth="3" strokeLinecap="round" /></svg>;
}

function Cup({ drink }: { drink: Drink }) {
  return <svg className="cup" viewBox="0 0 300 560" role="img" aria-label={`${drink.second} iced drink`}>
    <defs>
      <linearGradient id="glass" x2="1"><stop stopColor="white" stopOpacity=".7" /><stop offset=".2" stopColor="white" stopOpacity=".1" /><stop offset=".85" stopColor="white" stopOpacity=".25" /><stop offset="1" stopColor="white" stopOpacity=".7" /></linearGradient>
      <linearGradient id="drink-fill" x2="1" y2="1"><stop stopColor={drink.syrup} /><stop offset=".5" stopColor="#eac596" /><stop offset="1" stopColor="#bb7141" /></linearGradient>
      <clipPath id="inside"><path d="M57 106h186l-21 399c-1 15-12 25-27 25h-91c-15 0-26-10-27-25z" /></clipPath>
    </defs>
    <path d="m180 108 47-89c4-8 16-4 12 5l-45 90" fill={drink.straw} stroke="#ffd9ce" strokeWidth="5" />
    <path d="M47 98h207l-5 25H51z" fill="#e8e2d9" stroke="white" strokeWidth="5" />
    <g clipPath="url(#inside)"><path d="M50 180h205v355H50z" fill="url(#drink-fill)" /><path d="M76 174c8 27 25 44 42 58-6 47-3 84 11 124m85-190c-15 28-25 49-24 81 0 32 26 60 29 105" fill="none" stroke={drink.syrup} strokeWidth="14" strokeLinecap="round" /><path d="m94 205 30 26-7 45-31-8zm69-14 39 18-9 49-32-8zm-31 98 39 7 2 44-31 19zM87 352l37 8 3 43-37 2z" fill="white" fillOpacity=".55" /></g>
    <path d="M57 106h186l-21 399c-1 15-12 25-27 25h-91c-15 0-26-10-27-25z" fill="url(#glass)" stroke="white" strokeWidth="5" />
    <path d="M75 134 96 485" stroke="white" strokeWidth="7" opacity=".4" />
    <g fill="white" transform="translate(105 351)"><path d="M12 14C4 14 0 9 0 3c0-5 4-9 9-9 2-7 8-11 15-11 8 0 14 6 15 14 7-3 15 2 15 9 0 5-4 8-10 8z" /><text x="1" y="36" fontFamily="Figtree" fontSize="15" fontWeight="700">cloudbrew</text></g>
    <g><ellipse cx="151" cy="109" rx="88" ry="34" fill="#f7eee2" /><circle cx="95" cy="99" r="25" fill="#fff9ef" /><circle cx="120" cy="81" r="29" fill="#fffaf2" /><circle cx="153" cy="75" r="31" fill="#fffaf2" /><circle cx="187" cy="83" r="29" fill="#fff8ed" /><circle cx="212" cy="101" r="22" fill="#fffaf2" /><path d="M77 106c26-14 45 14 70 1 21-11 40-5 62 5" fill="none" stroke={drink.syrup} strokeWidth="7" strokeLinecap="round" /></g>
  </svg>;
}

const navItems = ["Menu", "Our foam", "Baristas", "Contact Us"];

export default function App() {
  const [active, setActive] = useState(0);
  const [cart, setCart] = useState<number[]>([]);
  const [orderOpen, setOrderOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const drink = drinks[active];
  const counts = drinks.map((_, index) => cart.filter((item) => item === index).length);
  const total = cart.reduce((sum, index) => sum + Number(drinks[index].price.slice(1)), 0);

  function addCurrentDrink() {
    setCart((items) => [...items, active]);
    setNotice(`${drink.second} added to your order.`);
  }

  return <main id="top" className="page" style={{ "--ink": drink.ink } as CSSProperties}>
    <header className="nav">
      <a className="logo" href="#top" aria-label="Cloudbrew home"><BrandCloud /><span>cloudbrew</span></a>
      <nav className={mobileMenuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
        {navItems.map((label) => <a className="nav-link" href="#" key={label} onClick={(event) => { event.preventDefault(); setMobileMenuOpen(false); }}>{label}</a>)}
      </nav>
      <button className="order" type="button" onClick={() => { setOrderOpen(true); setMobileMenuOpen(false); }}>
        Order ahead{cart.length > 0 && <span className="order-count">{cart.length}</span>}<ArrowRight size={16} aria-hidden="true" />
      </button>
      <button className="hamb" type="button" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}><Menu /></button>
    </header>

    <section className="hero" aria-label="Featured drink">
      <Cloud className="leftcloud" />
      <div className="copy">
        <div className="eyebrow">{drink.eye}</div>
        <h1><span>{drink.first}</span><strong>{drink.second}</strong></h1>
        <p>{drink.copy}</p>
        <div className="buy"><div><small>From</small><b>{drink.price}</b></div><button className="add" type="button" onClick={addCurrentDrink}>Add to order <Plus size={17} aria-hidden="true" /></button></div>
        <div className="thumbs" aria-label="Choose a drink">{drinks.map((item, index) => <button type="button" key={item.id} onClick={() => setActive(index)} className={active === index ? "selected" : ""} aria-label={`Choose ${item.second}`} aria-pressed={active === index}><i className={`tiny tiny-${item.id}`} /></button>)}</div>
      </div>

      <div className="scene" aria-label="Cloudbrew drink illustration">
        <div className="arch"><span>cloud</span><em>brew</em></div>
        <Bean className="bean1" /><Bean className="bean2" /><Bean className="bean3" />
        <div className="cupbox" key={drink.id}><Cup drink={drink} /></div>
        <Cloud className="bottomcloud" />
      </div>
    </section>
    <div className="scallop" aria-hidden="true" /><div className="base" aria-hidden="true" />

    {notice && <div className="order-notice" role="status" aria-live="polite">{notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}><X size={15} /></button></div>}
    {orderOpen && <div className="order-backdrop" onClick={() => setOrderOpen(false)}>
      <section className="order-dialog" role="dialog" aria-modal="true" aria-labelledby="order-title" onClick={(event) => event.stopPropagation()}>
        <button className="close-order" type="button" aria-label="Close order" onClick={() => setOrderOpen(false)}><X size={20} /></button>
        <p className="dialog-eyebrow">cloudbrew</p><h2 id="order-title">Your order</h2>
        {cart.length === 0 ? <p className="empty-order">Your order is empty. Choose a drink and add it to get started.</p> : <div className="order-lines">{drinks.map((item, index) => counts[index] > 0 && <div className="order-line" key={item.id}><span>{item.second} <small>× {counts[index]}</small></span><strong>${(Number(item.price.slice(1)) * counts[index]).toFixed(2)}</strong></div>)}
          <div className="order-total"><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div></div>}
        <p className="checkout-note">Online checkout is not connected yet.</p>
        <button className="dialog-done" type="button" onClick={() => setOrderOpen(false)}>Keep browsing</button>
      </section>
    </div>}
  </main>;
}