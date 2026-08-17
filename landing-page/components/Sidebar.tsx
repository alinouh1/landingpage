'use client';

import { useState, useEffect } from 'react';
import { FiTarget, FiAward, FiTrendingUp, FiUsers, FiLayers, FiPlayCircle, FiBarChart2, FiGrid, FiVideo, FiFileText, FiZap, FiMenu, FiX, FiUser, FiMic } from 'react-icons/fi';
import './sidebar.css';

interface SidebarProps {
  activeItem?: string;
}

export default function Sidebar({ activeItem = 'positioning' }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { id: 'positioning', label: 'Positioning', number: '01', href: '#positioning', icon: <FiTarget /> },
    { id: 'uvp', label: 'UVP', number: '02', href: '#uvp', icon: <FiAward /> },
    { id: 'goals', label: 'Goals Cascade', number: '03', href: '#goals', icon: <FiTrendingUp /> },
    { id: 'audience', label: 'Target Audience', number: '04', href: '#audience', icon: <FiUsers /> },
    { id: 'funnel', label: 'Marketing Funnel', number: '05', href: '#funnel', icon: <FiLayers /> },
    { id: 'pillars', label: 'Content Pillars', number: '06', href: '#pillars', icon: <FiMic /> },
    { id: 'prelaunch', label: 'Pre-Launch', number: '07', href: '#prelaunch', icon: <FiPlayCircle /> },
    { id: 'content', label: 'Content Plan', number: '08', href: '#content', icon: <FiGrid /> },
    { id: 'ads', label: 'ADS Plan', number: '09', href: '#ads', icon: <FiBarChart2 /> },
    { id: 'team', label: 'Team & Roles', number: '10', href: '#team', icon: <FiUser /> },
  ];

  return (
    <>
      {isMobile && (
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '1001',
            backgroundColor: '#FF8500',
            color: '#ffffff',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      )}
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <h1>GROWTH STATION</h1>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`sidebar-nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="sidebar-nav-item-number">{item.number}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {item.icon}
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>Strategy Before Execution</p>
          <p style={{ marginTop: '5px', fontSize: '0.75rem' }}>
            Growth Beyond Borders
          </p>
        </div>
      </div>
    </>
  );
}