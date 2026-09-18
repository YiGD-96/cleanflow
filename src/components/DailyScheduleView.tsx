import React from 'react';
import { CalendarEvent } from '../types';

interface DailyScheduleViewProps {
  schedules: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onOpenNewEvent: () => void;
}

export const DailyScheduleView: React.FC<DailyScheduleViewProps> = ({
  schedules,
  onSelectEvent,
  onOpenNewEvent
}) => {
  const hours = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // Selected day: 2023.10.24 (화)
  const targetDay = '2023-10-24';
  const dayEvents = schedules.filter((s) => s.rawDate === targetDay);

  return (
    <div className="flex flex-col w-full pb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#1b1b24]">2023년 10월 24일 (화)</h1>
            <span className="px-3 py-0.5 rounded-full bg-[#6df5e1] text-[#006f64] text-xs font-semibold">
              오늘의 타임라인
            </span>
          </div>
          <p className="text-xs text-[#777587] mt-1">
            시간대별 회의 및 업무 일정을 확인하고 상세 내용을 검토하세요.
          </p>
        </div>

        <button
          onClick={onOpenNewEvent}
          className="px-4 py-2 rounded-lg bg-[#3525cd] hover:bg-[#3323cc] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          일정 추가
        </button>
      </div>

      {/* Timeline Schedule Container */}
      <div className="bg-[#f5f2ff] rounded-xl border border-[#eae6f4] p-6 shadow-xs">
        <div className="space-y-4">
          {hours.map((hour) => {
            const isMeetingTime = hour === '14:00';
            const matchedEvent = dayEvents.find((e) => e.time.startsWith(hour));

            return (
              <div key={hour} className="flex items-start gap-4 group">
                <span className="w-14 text-xs font-mono text-[#777587] pt-1">
                  {hour}
                </span>

                <div className="flex-1 min-h-[56px] border-t border-[#eae6f4] pt-2 relative">
                  {isMeetingTime && matchedEvent && (
                    <div
                      onClick={() => onSelectEvent(matchedEvent)}
                      className="bg-[#3525cd] text-white p-4 rounded-xl shadow-md border border-[#4f46e5] cursor-pointer hover:bg-[#3323cc] transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#6df5e1] text-[#006f64] text-[10px] font-bold">
                            {matchedEvent.category}
                          </span>
                          <span className="text-xs font-medium text-[#c3c0ff]">
                            {matchedEvent.time}
                          </span>
                        </div>
                        <span className="text-xs text-[#dad7ff] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          상세보기
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {matchedEvent.title}
                      </h4>
                      <p className="text-xs text-[#c3c0ff] mt-0.5">
                        {matchedEvent.location} · 참석자 {matchedEvent.attendees.length}명
                      </p>
                    </div>
                  )}

                  {!isMeetingTime && (
                    <div className="h-6 rounded border border-dashed border-transparent hover:border-[#c7c4d8] flex items-center px-2 text-[11px] text-[#777587] opacity-0 group-hover:opacity-100 transition-opacity">
                      + 클릭하여 빈 시간대에 일정 예약
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
