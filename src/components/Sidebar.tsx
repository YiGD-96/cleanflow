import React from 'react';
import { ActiveTab } from '../types';
import { CALENFLOW_LOGO } from '../data/mockData';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenNewEvent: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  onOpenNewEvent
}) => {
  const navItems: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'monthly-calendar', label: 'Monthly Calendar', icon: 'calendar_month' },
    { id: 'daily-schedule', label: 'Daily Schedule', icon: 'schedule' },
    { id: 'new-event', label: 'New Event', icon: 'add_circle' },
    { id: 'event-detail', label: 'Event Detail', icon: 'info' },
    { id: 'my-schedules', label: 'My Schedules', icon: 'event_note' },
    { id: 'review', label: 'Review & News', icon: 'newspaper' }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          id="mobile-sidebar-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        id="main-sidebar"
        className={`fixed left-0 top-0 h-full w-72 bg-[#f5f2ff] z-50 flex flex-col pt-6 pb-10 transition-transform duration-200 border-r border-[#eae6f4] ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Logo & Name */}
        <div className="px-6 mb-8 flex items-center justify-between">
          <button
            id="brand-home-button"
            onClick={() => onSelectTab('event-detail')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <img
              alt="CalenFlow Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src={CALENFLOW_LOGO}
            />
            <span className="text-lg font-semibold tracking-tight text-[#3525cd]">
              CalenFlow
            </span>
          </button>

          {/* Close for mobile */}
          <button
            id="mobile-sidebar-close"
            onClick={onCloseMobile}
            className="p-1 rounded-lg hover:bg-[#eae6f4] lg:hidden text-[#464555]"
            aria-label="사이드바 닫기"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => {
                  if (item.id === 'new-event') {
                    onOpenNewEvent();
                  } else {
                    onSelectTab(item.id);
                  }
                  onCloseMobile();
                }}
                className={`w-full flex items-center px-4 py-2.5 rounded-xl transition-all text-sm cursor-pointer ${
                  isActive
                    ? 'bg-[#4f46e5] text-[#ffffff] font-medium shadow-xs'
                    : 'text-[#464555] hover:bg-[#eae6f4] hover:text-[#1b1b24]'
                }`}
              >
                <span className={`material-symbols-outlined mr-3 text-[20px] ${isActive ? 'text-white' : 'text-[#777587]'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Info */}
        <div className="px-6 pt-4 border-t border-[#eae6f4]/60">
          <div className="p-3 bg-[#ffffff] rounded-xl border border-[#eae6f4] shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-[#1b1b24]">클라우드 동기화 됨</span>
            </div>
            <p className="text-[11px] text-[#777587] leading-relaxed">
              Google Workspace & Meet 계정과 실시간 연동 중입니다.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
