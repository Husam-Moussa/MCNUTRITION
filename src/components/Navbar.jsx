import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useCart } from '../context/CartContext';

// Neon Line Effect
const NeonLineEffect = () => (
  <div className="absolute inset-x-0 bottom-0 h-px">
    <div className="absolute inset-0 bg-lime-500/50 blur"></div>
    <motion.div
      className="h-px w-full bg-lime-500"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: [0, 1, 0.9, 1] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  </div>
);

// Magnetic Logo Component
const Logo = () => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.15;
    const y = (clientY - (top + height / 2)) * 0.15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="relative cursor-pointer"
    >
      <Link to="/" className="block">
        <motion.div
          className="relative text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 bg-clip-text text-transparent">
            MC NUTRITION
          </span>
          <motion.div
            className="absolute inset-0 bg-lime-500/20 rounded-lg blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

// Enhanced Nav Link with Glow Effect
const NavLink = ({ to, children, isActive }) => {
  const controls = useAnimation();
  
  return (
    <Link to={to} className="relative group px-4 py-2">
      <motion.div
        className="absolute inset-0 bg-lime-500/10 rounded-lg opacity-0"
        whileHover={{ opacity: 1, scale: 1.1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-lime-500/0 via-lime-500/20 to-lime-500/0 rounded-lg blur-lg"
        animate={controls}
        initial={{ opacity: 0, scale: 0.95 }}
        whileHover={{ 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.3 }
        }}
      />
      <motion.span
        onHoverStart={() => controls.start({ opacity: 1, scale: 1 })}
        onHoverEnd={() => controls.start({ opacity: 0, scale: 0.95 })}
        className={`relative z-10 text-lg font-medium ${
          isActive ? 'text-lime-500' : 'text-gray-300'
        }`}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-lime-500"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </motion.span>
    </Link>
  );
};

// Animated Cart Icon with Ripple Effect
const CartIcon = ({ count }) => {
  const [isRippling, setIsRippling] = useState(false);

  const handleClick = () => {
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 600);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="relative group"
      onClick={handleClick}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-lime-500/30 to-lime-400/30 rounded-xl blur-lg"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="relative overflow-hidden bg-gradient-to-r from-lime-500 to-lime-400 px-6 py-2.5 rounded-xl">
        {isRippling && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-white/30 rounded-full"
            style={{ transformOrigin: 'center' }}
          />
        )}
        <div className="flex items-center gap-2 text-black font-semibold">
          <motion.svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </motion.svg>
          <span className="relative z-10">Cart</span>
          {count > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="min-w-[20px] h-5 px-1.5 bg-black text-lime-500 rounded-full flex items-center justify-center text-sm font-bold"
            >
              {count}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Particle Effect Component
const ParticleEffect = () => {
  const particles = Array.from({ length: 20 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-lime-500/30 rounded-full"
          initial={{ 
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0
          }}
          animate={{
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Cart Item Component with Remove Animation
const CartItem = ({ item, onRemove, onUpdateQuantity }) => (
  <motion.div
    className="flex items-center justify-between p-4 border-b border-lime-500/10 group"
  >
    <div className="flex items-center gap-4">
      <motion.img 
        src={item.image} 
        alt={item.name} 
        className="w-12 h-12 object-cover rounded-lg"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />
      <div>
        <motion.h3 
          className="text-white font-medium group-hover:text-lime-500 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {item.name}
        </motion.h3>
        <motion.div 
          className="flex items-center gap-2 mt-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
            className="text-gray-400 hover:text-lime-500 transition-colors"
          >
            -
          </motion.button>
          <span className="text-gray-400">{item.quantity}</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="text-gray-400 hover:text-lime-500 transition-colors"
          >
            +
          </motion.button>
        </motion.div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <motion.span 
        className="text-lime-500 font-bold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        ${(item.price * item.quantity).toFixed(2)}
      </motion.span>
      {/* Desktop remove button (hidden on small screens) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onRemove(item.id)}
        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </motion.button>
      {/* Mobile remove button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onRemove(item.id)}
        className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-500 active:bg-red-500/20"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>
    </div>
  </motion.div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { cartItems, getCartItemsCount, getCartTotal, updateCartQuantity, removeFromCart } = useCart();
  const cartCount = getCartItemsCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="h-[80px] md:h-[100px]">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-lg border-b border-lime-500/10 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <NeonLineEffect />
        <ParticleEffect />
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
             <motion.div 
  className="flex-shrink-0 mr-3 md:mr-0"
  initial={{ x: -50, opacity: 0 }}
   animate={{ x: 0, opacity: 1 }}
   transition={{ type: "spring", stiffness: 300, damping: 30 }}
>
              <Logo />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 px-16">
              <motion.div 
                className="flex space-x-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    isActive={location.pathname === link.path}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </motion.div>
            </div>

            {/* Cart Button */}
            <motion.div 
              className="flex items-center"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative"
                >
                  <CartIcon count={cartCount} />
                </button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div 
                className="ml-6 md:hidden"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="relative group p-3"
                >
                  <div className="absolute inset-0 bg-lime-500/20 rounded-lg blur group-hover:bg-lime-500/30" />
                  <div className="relative">
                    <motion.div
                      className="w-7 h-0.5 bg-lime-500 mb-1.5"
                      animate={{
                        rotate: isMobileMenuOpen ? 45 : 0,
                        y: isMobileMenuOpen ? 8 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.div
                      className="w-7 h-0.5 bg-lime-500 mb-1.5"
                      animate={{
                        opacity: isMobileMenuOpen ? 0 : 1,
                        x: isMobileMenuOpen ? 20 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.div
                      className="w-7 h-0.5 bg-lime-500"
                      animate={{
                        rotate: isMobileMenuOpen ? -45 : 0,
                        y: isMobileMenuOpen ? -8 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-black/90 to-black backdrop-blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <div className="relative px-6 pt-4 pb-8 space-y-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-lime-500/10 pb-4"
                  >
                    <Link
                      to={link.path}
                      className={`block text-2xl font-medium transition-colors ${
                        location.pathname === link.path 
                          ? 'text-lime-500' 
                          : 'text-gray-300 active:text-lime-500'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Dropdown */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute right-4 top-full mt-4 w-96 bg-black/95 backdrop-blur-lg border border-lime-500/10 rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-4 border-b border-lime-500/10">
                <h2 className="text-lg font-bold text-white">Shopping Cart</h2>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                        mass: 1
                      }}
                    >
                      <CartItem
                        key={item.id}
                        item={item}
                        onRemove={removeFromCart}
                        onUpdateQuantity={updateCartQuantity}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {cartItems.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 text-center text-gray-400"
                  >
                    Your cart is empty
                  </motion.div>
                )}
              </div>
              {cartItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-black/50 border-t border-lime-500/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-bold">Total:</span>
                    <span className="text-lime-500 font-bold text-xl">
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                  <a href="https://wa.me/+96103903800?text=I%20want%20to%20order">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-lime-500 text-black font-bold py-3 rounded-lg hover:bg-lime-600 transition-colors"
                  >
                    Checkout
                  </motion.button>
                  </a>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Backdrop for mobile menu and cart */}
      <AnimatePresence>
        {(isMobileMenuOpen || isCartOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCartOpen(false);
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 