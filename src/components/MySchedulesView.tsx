import React, { useState } from 'react';
import { CalendarEvent } from '../types';

interface MySchedulesViewProps {
  schedules: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onOpenNewEvent: () => void;
}

export const MySchedulesView: React.FC<MySchedulesViewProps> = ({
  schedules,
  onSelectEvent,
  onOpenNewEvent
}) => {
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'work'>('all');

  const filtered = schedules.filter((s) => {
    if (filter === 'confirmed') return s.status.includes('Confirmed');
    if (filter === 'work') return s.category.includes('Work') || s.category.includes('업무');
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1b1b24]">내 일정 목록 (My Schedules)</h1>
          <p className="text-xs text-[#777587] mt-1">
            등록된 모든 미팅 및 일정을 필터링하고 관리할 수 있습니다.
          </p>
        </div>

        <button
          onClick={onOpenNewEvent}
          className="px-4 py-2 rounded-lg bg-[#3525cd] hover:bg-[#3323cc] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          새 일정 만들기
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
            filter === 'all'
              ? 'bg-[#3525cd] text-white'
              : 'bg-[#f0ecf9] text-[#464555] hover:bg-[#eae6f4]'
          }`}
        >
          전체 보기 ({schedules.length})
        </button>
        <button
          onClick={() => setFilter('confirmed')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
            filter === 'confirmed'
              ? 'bg-[#3525cd] text-white'
              : 'bg-[#f0ecf9] text-[#464555] hover:bg-[#eae6f4]'
          }`}
        >
          확정된 일정
        </button>
        <button
          onClick={() => setFilter('work')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
            filter === 'work'
              ? 'bg-[#3525cd] text-white'
              : 'bg-[#f0ecf9] text-[#464555] hover:bg-[#eae6f4]'
          }`}
        >
          업무 미팅
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectEvent(item)}
            className="bg-[#f5f2ff] p-5 rounded-xl border border-[#eae6f4] hover:border-[#3525cd]/40 hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#6df5e1] text-[#006f64] text-[10px] font-bold">
                  {item.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbcc] text-[#351000] text-[10px] font-bold">
                  {item.status}
                </span>
                <span className="text-[11px] text-[#777587]">ID: {item.id}</span>
              </div>
              <h3 className="text-base font-bold text-[#1b1b24] hover:text-[#3525cd] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#464555]">{item.subtitle}</p>
            </div>

            <div className="flex items-center gap-6 sm:border-l sm:border-[#eae6f4] sm:pl-6">
              <div className="text-right sm:text-left">
                <div className="text-xs font-semibold text-[#1b1b24] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#3525cd]">calendar_today</span>
                  {item.date}
                </div>
                <div className="text-xs text-[#3525cd] font-medium mt-0.5">
                  {item.time} ({item.duration})
                </div>
                <div className="text-[11px] text-[#777587] mt-1">
                  {item.location}
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#f0ecf9] flex items-center justify-center text-[#3525cd] shrink-0">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
