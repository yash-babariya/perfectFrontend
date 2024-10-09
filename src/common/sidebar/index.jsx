import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoCloseOutline, IoLocationOutline } from 'react-icons/io5';
import './sidebar.scss';

const Sidebar = ({ isOpen, onClose }) => {
    const categories = [
        { path: '/sofas&armchairs', label: 'Sofas and armchairs', count: 543 },
        { path: '/beds&mattresses', label: 'Beds and mattresses', count: 370 },
        { path: '/cabinets&pedestals', label: 'Cabinets and pedestals' },
        { path: '/textiles', label: 'Textile' },
        { path: '/tables&chairs', label: 'Tables and chairs' },
        { path: '/lighting', label: 'Lighting' },
        { path: '/decor', label: 'Decor' },
    ];

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar__header">
                <button className="sidebar__close" onClick={onClose}>
                    <IoCloseOutline />
                </button>
                <div className="sidebar__location">
                    <IoLocationOutline />
                    <span>Surat</span>
                </div>
                <div className="sidebar__logo">YASH</div>
            </div>
            <nav className="sidebar__nav">
                <ul className="sidebar__menu">
                    <li><NavLink to="/catalog">Catalog</NavLink></li>
                    <li><NavLink to="/ideas">Ideas</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>
            </nav>
            <div className="sidebar__categories">
                <h3>Popular categories</h3>
                <div className="sidebar__category-grid">
                    {categories.slice(0, 3).map((category, index) => (
                        <NavLink key={index} to={category.path} className="sidebar__category-item">
                            <div className="sidebar__category-image"></div>
                            <span>{category.label}</span>
                            {category.count && <span className="sidebar__category-count">{category.count}</span>}
                        </NavLink>
                    ))}
                </div>
                <ul className="sidebar__category-list">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <NavLink onClick={onClose} to={category.path}>
                                {category.label}
                                <span className="sidebar__arrow">›</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;