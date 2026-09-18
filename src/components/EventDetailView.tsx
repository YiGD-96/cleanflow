import React, { useState } from 'react';
import { CalendarEvent } from '../types';

interface EventDetailViewProps {
  event: CalendarEvent;
  onBackToCalendar: () => void;
  onEditEvent: () => void;
  onCancelEvent: () => void;
  onOpenIndoorMap: () => void;
  onJoinMeeting: () => void;
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({
  event,
  onBackToCalendar,
  onEditEvent,
  onCancelEvent,
  onOpenIndoorMap,
  onJoinMeeting
}) => {
  const [reminders, setReminders] = useState(event.reminders);

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Top Bar: Back & Quick Actions */}
      <div className="flex items-center justify-between mb-6">
        <button
          id="back-to-calendar-btn"
          onClick={onBackToCalendar}
          className="inline-flex items-center text-sm font-medium text-[#464555] hover:text-[#3525cd] transition-colors group cursor-pointer"
        >
          <span className="material-symbols-outlined mr-1 text-[20px] group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          캘린더로 돌아가기 (Back to Calendar)
        </button>

        <div className="flex items-center space-x-2">
          <button
            id="edit-event-btn"
            onClick={onEditEvent}
            className="px-4 py-2 rounded-lg bg-[#f0ecf9] hover:bg-[#eae6f4] text-[#1b1b24] text-sm font-medium transition-colors flex items-center shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined mr-1.5 text-[18px]">edit</span>
            일정 수정 (Edit Event)
          </button>
          <button
            id="cancel-event-btn"
            onClick={onCancelEvent}
            className="px-4 py-2 rounded-lg bg-[#ffdad6] text-[#93000a] hover:opacity-90 text-sm font-medium transition-opacity flex items-center shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined mr-1.5 text-[18px]">close</span>
            일정 취소 (Cancel Event)
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Core Info & Description (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Hero Card */}
          <div
            id="event-hero-card"
            className="bg-[#f5f2ff] rounded-xl p-8 shadow-xs relative overflow-hidden flex flex-col justify-between border border-[#eae6f4]"
          >
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#3525cd]/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="px-3.5 py-1 rounded-full bg-[#6df5e1] text-[#006f64] text-xs font-semibold">
                  {event.category}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-[#ffdbcc] text-[#351000] text-xs font-semibold flex items-center">
                  <span className="material-symbols-outlined text-[14px] mr-1">check_circle</span>
                  {event.status}
                </span>
              </div>
              <span className="text-xs text-[#777587]">ID: {event.id}</span>
            </div>

            <div className="my-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1b1b24] mb-1 tracking-tight">
                {event.title}
              </h1>
              <p className="text-base text-[#464555]">{event.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#eae6f4]/70">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#e2dfff] flex items-center justify-center text-[#0f0069] shrink-0">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1b1b24]">날짜 및 시간</div>
                  <div className="text-sm text-[#464555]">{event.date}</div>
                  <div className="text-xs text-[#3525cd] font-semibold mt-0.5">
                    {event.time} ({event.duration})
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#71f8e4] flex items-center justify-center text-[#00201c] shrink-0">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1b1b24]">장소</div>
                  <div className="text-sm text-[#464555]">{event.location}</div>
                  <button
                    id="view-indoor-map-link"
                    onClick={onOpenIndoorMap}
                    className="text-xs text-[#3525cd] underline hover:text-[#3323cc] font-medium mt-0.5 cursor-pointer text-left block"
                  >
                    실내 지도 보기
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Agenda / Details Card */}
          <div
            id="agenda-details-card"
            className="bg-[#f5f2ff] rounded-xl p-8 shadow-xs space-y-4 border border-[#eae6f4]"
          >
            <h2 className="text-xl font-semibold text-[#1b1b24] flex items-center">
              <span className="material-symbols-outlined mr-2 text-[#3525cd]">
                format_list_bulleted
              </span>
              안건 및 회의 개요
            </h2>

            <div className="space-y-3 text-sm text-[#464555] leading-relaxed">
              <p>{event.agendaSummary}</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-4 text-[#464555]">
                {event.agendaItems.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Attendees Section */}
          <div
            id="attendees-section"
            className="bg-[#f5f2ff] rounded-xl p-8 shadow-xs space-y-4 border border-[#eae6f4]"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#1b1b24] flex items-center">
                <span className="material-symbols-outlined mr-2 text-[#3525cd]">group</span>
                참석자 ({event.attendees.length}명 참석 확정)
              </h2>
              <span className="text-xs text-[#777587]">모든 참석자 수락 완료</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {event.attendees.map((attendee, idx) => (
                <div
                  key={idx}
                  id={`attendee-card-${idx}`}
                  className="bg-[#f0ecf9] rounded-lg p-4 flex items-center space-x-3 border border-[#eae6f4]/60 hover:bg-[#eae6f4]/60 transition-colors"
                >
                  <img
                    className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-white/80"
                    src={attendee.avatar}
                    alt={attendee.name}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#1b1b24] truncate">
                      {attendee.name}
                    </div>
                    <div className="text-xs text-[#777587] truncate">
                      {attendee.email}
                    </div>
                    <span className="inline-flex items-center text-xs text-[#006b5f] font-medium mt-1">
                      <span className="material-symbols-outlined text-[14px] mr-0.5">check</span>
                      {attendee.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Video Link, Reminders & Meta (1 col) */}
        <div className="space-y-6">
          {/* Video Conference Card */}
          <div
            id="video-conference-card"
            className="bg-[#3525cd] text-white rounded-xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 pointer-events-none">
              <span className="material-symbols-outlined text-[120px]">videocam</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#c3c0ff]">
                  온라인 화상 회의
                </span>
                <span className="w-2 h-2 rounded-full bg-[#71f8e4] animate-pulse"></span>
              </div>
              <h3 className="text-xl font-bold mb-1 text-white">{event.videoService}</h3>
              <p className="text-xs text-[#c3c0ff] mb-6 truncate font-mono">
                {event.videoMeetingUrl}
              </p>
            </div>

            <button
              id="join-meeting-btn"
              onClick={onJoinMeeting}
              className="w-full py-2.5 px-4 rounded-lg bg-[#fcf8ff] text-[#3525cd] text-sm font-semibold hover:bg-white transition-colors flex items-center justify-center shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined mr-2 text-[20px]">video_call</span>
              회의 참가 (Join Meeting)
            </button>
          </div>

          {/* Reminder Settings Card */}
          <div
            id="reminder-settings-card"
            className="bg-[#f5f2ff] rounded-xl p-6 shadow-xs space-y-4 border border-[#eae6f4]"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#1b1b24] flex items-center">
                <span className="material-symbols-outlined mr-2 text-[#3525cd]">
                  notifications_active
                </span>
                알림 설정 (Reminders)
              </h3>
            </div>

            <div className="space-y-2">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  onClick={() => toggleReminder(reminder.id)}
                  className="flex items-center justify-between bg-[#f0ecf9] p-3.5 rounded-lg cursor-pointer hover:bg-[#eae6f4] transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`material-symbols-outlined ${
                        reminder.active ? 'text-[#3525cd]' : 'text-[#777587]'
                      }`}
                    >
                      alarm
                    </span>
                    <span
                      className={`text-sm ${
                        reminder.active ? 'text-[#1b1b24] font-medium' : 'text-[#777587]'
                      }`}
                    >
                      {reminder.label}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                      reminder.active
                        ? 'bg-[#3525cd]/10 text-[#3525cd]'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {reminder.active ? '활성' : '꺼짐'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Metadata Card */}
          <div
            id="metadata-card"
            className="bg-[#f5f2ff] rounded-xl p-6 shadow-xs space-y-2 text-xs text-[#464555] border border-[#eae6f4]"
          >
            <div className="flex justify-between py-1">
              <span className="text-[#777587]">캘린더</span>
              <span className="font-semibold text-[#1b1b24]">{event.calendarName}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#777587]">생성일</span>
              <span>{event.createdAt}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#777587]">반복 여부</span>
              <span>{event.repeat}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#777587]">공개 설정</span>
              <span>{event.visibility}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
