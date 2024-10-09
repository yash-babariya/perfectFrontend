import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoLocationOutline } from 'react-icons/io5';
import { SlMenu } from "react-icons/sl";
import Sidebar from '../sidebar';
import logo from '../../assets/logo/logo.png';
import './header.scss';

export default function Header() {
    const [activeIndex, setActiveIndex] = useState(null);
    const categoriesRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const categories = [
        { path: '/sofas&armchairs', label: 'Sofas and armchairs' },
        { path: '/beds&mattresses', label: 'Beds and mattresses' },
        { path: '/cabinets&pedestals', label: 'Cabinets and pedestals' },
        { path: '/textiles', label: 'Textile' },
        { path: '/tables&chairs', label: 'Tables and chairs' },
        { path: '/lighting', label: 'Lighting' },
        { path: '/decor', label: 'Decor' },
    ];


    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const handleKeyDown = (e) => {
        if (activeIndex === null) return;

        let newIndex;
        if (e.key === 'ArrowLeft') {
            newIndex = activeIndex > 0 ? activeIndex - 1 : categories.length - 1;
        } else if (e.key === 'ArrowRight') {
            newIndex = activeIndex < categories.length - 1 ? activeIndex + 1 : 0;
        } else {
            return;
        }

        setActiveIndex(newIndex);
        navigate(categories[newIndex].path);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeIndex]);

    useEffect(() => {
        const currentIndex = categories.findIndex(category => category.path === location.pathname);
        if (currentIndex !== -1) {
            setActiveIndex(currentIndex);
        } else if (location.pathname === '/') {
            setActiveIndex(null);
        }
    }, [location]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setSuggestions([]);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.trim()) {
            const categoryMatches = categories.filter(cat =>
                cat.label.toLowerCase().includes(value.toLowerCase())
            );
            const alphabeticalMatches = categories
                .filter(cat => cat.label.toLowerCase().startsWith(value.toLowerCase()))
                .sort((a, b) => a.label.localeCompare(b.label));

            setSuggestions([...new Set([...categoryMatches, ...alphabeticalMatches])]);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (path) => {
        navigate(path);
        setSearchQuery('');
        setSuggestions([]);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__top">
                        {isMobile && (
                            <div className="mobile">
                                <button className="header__mobile-menu" aria-label="Menu" onClick={toggleSidebar}>
                                    <SlMenu />
                                </button>
                                <button className="header__mobile-search" aria-label="Search" onClick={toggleSearch}>
                                    <FiSearch />
                                </button>
                            </div>
                        )}
                        <NavLink to="/" className={`header__logo ${isMobile ? 'header__logo--centered' : ''}`}>
                            <img src={logo} alt="logo" />
                            ash
                        </NavLink>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li><NavLink to="/catalog">Catalog</NavLink></li>
                                <li><NavLink to="/ideas">Ideas</NavLink></li>
                                <li><NavLink to="/rooms">Rooms</NavLink></li>
                            </ul>
                        </nav>
                        {!isMobile && (
                            <div className="header__search-container">
                                <form className="header__search" onSubmit={handleSearch}>
                                    <input
                                        type="text"
                                        placeholder="I want to find..."
                                        value={searchQuery}
                                        onChange={handleInputChange}
                                    />
                                    <button type="submit" aria-label="Search">
                                        <FiSearch className="header__search-icon" />
                                    </button>
                                </form>
                                {suggestions.length > 0 && (
                                    <ul className="header__search-suggestions">
                                        {suggestions.map((suggestion) => (
                                            <li
                                                key={suggestion.path}
                                                onClick={() => handleSuggestionClick(suggestion.path)}
                                            >
                                                {suggestion.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        <div className="header__actions">
                            <div className="header__location">
                                <IoLocationOutline />
                                <p>Surat</p>
                            </div>
                            <a href="tel:8553535342" className="header__phone">
                                <IoPhonePortraitOutline />
                                <p>85 53 53 53 42</p>
                            </a>
                            <button className="header__account" aria-label="User account">
                                <FiUser />
                            </button>
                            <button className="header__wishlist" aria-label="Wishlist">
                                <FiHeart />
                            </button>
                            <button className="header__cart" aria-label="Shopping cart">
                                <FiShoppingCart />
                            </button>
                        </div>
                    </div>
                </div>
                <nav className="header__categories">
                    <div className="container">
                        <ul className="header__categories-list" ref={categoriesRef}>
                            {categories.map((category, index) => (
                                <li key={category.path}>
                                    <NavLink
                                        to={category.path}
                                        className={({ isActive }) =>
                                            isActive ? 'active' : ''
                                        }
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {category.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </header>
            {isMobile && (
                <>
                    <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                    {isSearchOpen && (
                        <div className="header__mobile-search-overlay">
                            <form className="header__search" onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="I want to find..."
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                />
                                <button type="button" aria-label="Close" onClick={toggleSearch}>
                                    <FiSearch />
                                </button>
                            </form>
                            {suggestions.length > 0 && (
                                <ul className="header__search-suggestions">
                                    {suggestions.map((suggestion) => (
                                        <li
                                            key={suggestion.path}
                                            onClick={() => { handleSuggestionClick(suggestion.path); toggleSearch(); }}
                                        >
                                            {suggestion.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
}