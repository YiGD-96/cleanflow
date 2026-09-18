import React from 'react';
import { CalendarEvent } from '../types';

interface MonthlyCalendarViewProps {
  schedules: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onOpenNewEvent: () => void;
}

export const MonthlyCalendarView: React.FC<MonthlyCalendarViewProps> = ({
  schedules,
  onSelectEvent,
  onOpenNewEvent
}) => {
  // Calendar grid representation for October 2023
  // 2023-10-01 was Sunday. October has 31 days.
  const daysInOct = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="flex flex-col w-full pb-10">
      {/* View Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#1b1b24]">2023년 10월</h1>
            <span className="px-3 py-0.5 rounded-full bg-[#3525cd]/10 text-[#3525cd] text-xs font-semibold">
              총 {schedules.length}개의 일정
            </span>
          </div>
          <p className="text-xs text-[#777587] mt-1">
            월간 캘린더를 통해 팀 미팅과 중요 일정을 한눈에 확인하세요.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenNewEvent}
            className="px-4 py-2 rounded-lg bg-[#3525cd] hover:bg-[#3323cc] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            새 일정 등록
          </button>
        </div>
      </div>

      {/* Calendar Grid Box */}
      <div className="bg-[#f5f2ff] rounded-xl border border-[#eae6f4] shadow-xs overflow-hidden">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-[#eae6f4] bg-[#f0ecf9]">
          {weekDays.map((day, idx) => (
            <div
              key={day}
              className={`py-2.5 text-center text-xs font-semibold ${
                idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-[#464555]'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-[#eae6f4] bg-[#ffffff]">
          {daysInOct.map((day) => {
            const dayStr = day < 10 ? `0${day}` : `${day}`;
            const fullDateStr = `2023-10-${dayStr}`;
            const dayEvents = schedules.filter((s) => s.rawDate === fullDateStr);
            const isTargetDay = day === 24;

            return (
              <div
                key={day}
                className={`min-h-[105px] p-2 flex flex-col justify-between transition-colors ${
                  isTargetDay ? 'bg-[#dad7ff]/20' : 'hover:bg-[#fcf8ff]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full ${
                      isTargetDay
                        ? 'bg-[#3525cd] text-white'
                        : 'text-[#1b1b24]'
                    }`}
                  >
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="text-[10px] text-[#777587]">
                      {dayEvents.length}개
                    </span>
                  )}
                </div>

                <div className="space-y-1 mt-1 flex-1">
                  {dayEvents.map((evt) => (
                    <button
                      key={evt.id}
                      onClick={() => onSelectEvent(evt)}
                      className={`w-full text-left px-2 py-1 rounded text-[11px] leading-tight font-medium truncate transition-all cursor-pointer ${
                        evt.id === 'CF-2023-8894'
                          ? 'bg-[#3525cd] text-white shadow-xs'
                          : 'bg-[#6df5e1]/40 text-[#005048] hover:bg-[#6df5e1]/70'
                      }`}
                      title={evt.title}
                    >
                      {evt.time.split(' - ')[0]} {evt.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
