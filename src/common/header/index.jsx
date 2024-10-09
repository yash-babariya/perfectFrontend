import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { BsTelephone } from 'react-icons/bs';
import './header.scss';

export default function Header() {
    const [activeIndex, setActiveIndex] = useState(null);
    const categoriesRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

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

    return (
        <header className="header">
            <div className="container">
                <div className="header__top">
                    <NavLink to="/" className="header__logo">
                        Yash
                    </NavLink>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            <li><NavLink to="/catalog">Catalog</NavLink></li>
                            <li><NavLink to="/ideas">Ideas</NavLink></li>
                            <li><NavLink to="/rooms">Rooms</NavLink></li>
                        </ul>
                    </nav>
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
                    <div className="header__actions">
                        <span className="header__location">
                            <IoLocationOutline />
                            Surat
                        </span>
                        <a href="tel:8553535342" className="header__phone">
                            <BsTelephone />
                            85 53 53 53 42
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
    );
}