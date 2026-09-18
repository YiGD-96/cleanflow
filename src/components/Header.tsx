import React, { useState } from 'react';
import { CalendarEvent } from '../types';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  schedules: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
  searchQuery,
  onSearchChange,
  schedules,
  onSelectEvent
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const filteredEvents = searchQuery.trim()
    ? schedules.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.attendees.some((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#fcf8ff]/85 backdrop-blur-xl border-b border-[#eae6f4] shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6"
    >
      {/* Left: Mobile menu toggle & Search Bar */}
      <div className="flex items-center gap-3">
        <button
          id="mobile-menu-toggle"
          onClick={onToggleMobileSidebar}
          className="p-2 rounded-lg hover:bg-[#eae6f4] lg:hidden text-[#464555]"
          aria-label="메뉴 열기"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <div className="relative w-64 sm:w-80">
          <div className="flex items-center bg-[#f0ecf9] rounded-lg px-3 py-1.5 w-full focus-within:ring-2 focus-within:ring-[#3525cd]/30 focus-within:bg-[#ffffff] transition-all">
            <span className="material-symbols-outlined text-[#777587] text-[20px] mr-2 shrink-0">
              search
            </span>
            <input
              id="header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search schedules..."
              className="bg-transparent border-none outline-none text-sm text-[#1b1b24] placeholder:text-[#777587] w-full"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-[#777587] hover:text-[#1b1b24] text-xs p-0.5"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchQuery.trim() && (
            <div
              id="search-results-dropdown"
              className="absolute left-0 top-full mt-2 w-full bg-[#ffffff] rounded-xl shadow-lg border border-[#eae6f4] py-2 z-50 overflow-hidden max-h-80 overflow-y-auto"
            >
              <div className="px-3 py-1 text-[11px] font-semibold text-[#777587] uppercase tracking-wider">
                검색된 일정 ({filteredEvents.length})
              </div>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((evt) => (
                  <button
                    key={evt.id}
                    onClick={() => {
                      onSelectEvent(evt);
                      onSearchChange('');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-[#f5f2ff] transition-colors flex flex-col cursor-pointer"
                  >
                    <span className="text-sm font-medium text-[#1b1b24]">{evt.title}</span>
                    <span className="text-xs text-[#464555]">
                      {evt.date} · {evt.time}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-4 text-xs text-center text-[#777587]">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Actions: Notifications & User Profile */}
      <div className="flex items-center space-x-3">
        {/* Notification Popover */}
        <div className="relative">
          <button
            id="notifications-button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-full hover:bg-[#eae6f4] text-[#464555] hover:text-[#1b1b24] transition-colors relative cursor-pointer"
            aria-label="알림"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#3525cd]"></span>
          </button>

          {showNotifications && (
            <div
              id="notifications-popover"
              className="absolute right-0 top-full mt-2 w-72 bg-[#ffffff] rounded-xl shadow-lg border border-[#eae6f4] p-3 z-50"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#eae6f4] mb-2">
                <span className="text-xs font-semibold text-[#1b1b24]">최신 알림</span>
                <span className="text-[11px] text-[#3525cd] hover:underline cursor-pointer">
                  모두 읽음
                </span>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-[#f5f2ff] rounded-lg text-xs">
                  <p className="font-medium text-[#1b1b24]">
                    Mark Lee님이 'Q3 제품 로드맵 전략 회의'를 수락했습니다.
                  </p>
                  <p className="text-[11px] text-[#777587] mt-0.5">15분 전</p>
                </div>
                <div className="p-2 hover:bg-[#f0ecf9] rounded-lg text-xs transition-colors">
                  <p className="font-medium text-[#1b1b24]">
                    내일 오전 10:00 주간 스프린트 플래닝 일정이 있습니다.
                  </p>
                  <p className="text-[11px] text-[#777587] mt-0.5">2시간 전</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            id="user-profile-button"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="w-8 h-8 rounded-full bg-[#3525cd] flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition-opacity"
            aria-label="사용자 프로필"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>

          {showProfileMenu && (
            <div
              id="profile-dropdown"
              className="absolute right-0 top-full mt-2 w-52 bg-[#ffffff] rounded-xl shadow-lg border border-[#eae6f4] py-2 z-50 text-xs"
            >
              <div className="px-3 py-2 border-b border-[#eae6f4]">
                <p className="font-semibold text-[#1b1b24]">Alex Kim</p>
                <p className="text-[#777587] text-[11px]">alex.k@calenflow.io</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#f5f2ff] text-[#1b1b24]"
                >
                  내 계정 설정
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#f5f2ff] text-[#1b1b24]"
                >
                  캘린더 연동 관리
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
