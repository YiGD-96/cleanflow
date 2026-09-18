import React, { useState } from 'react';
import { CalendarEvent } from '../types';

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent;
  onSave: (updated: CalendarEvent) => void;
}

export const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  event,
  onSave
}) => {
  const [title, setTitle] = useState(event.title);
  const [subtitle, setSubtitle] = useState(event.subtitle);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [location, setLocation] = useState(event.location);
  const [agendaSummary, setAgendaSummary] = useState(event.agendaSummary);
  const [agendaItemsText, setAgendaItemsText] = useState(event.agendaItems.join('\n'));
  const [videoMeetingUrl, setVideoMeetingUrl] = useState(event.videoMeetingUrl);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CalendarEvent = {
      ...event,
      title: title.trim() || event.title,
      subtitle: subtitle.trim() || event.subtitle,
      date: date.trim() || event.date,
      time: time.trim() || event.time,
      location: location.trim() || event.location,
      agendaSummary: agendaSummary.trim() || event.agendaSummary,
      agendaItems: agendaItemsText.split('\n').map((s) => s.trim()).filter(Boolean),
      videoMeetingUrl: videoMeetingUrl.trim() || event.videoMeetingUrl
    };
    onSave(updated);
    onClose();
  };

  return (
    <div
      id="edit-event-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="edit-event-modal-content"
        className="bg-[#ffffff] w-full max-w-xl rounded-2xl shadow-2xl border border-[#eae6f4] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eae6f4] bg-[#f5f2ff]">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[#3525cd]">edit_calendar</span>
            <h3 className="text-base font-semibold text-[#1b1b24]">일정 수정 (Edit Event)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#777587] hover:bg-[#eae6f4] hover:text-[#1b1b24]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          <div>
            <label className="block font-medium text-[#1b1b24] mb-1">일정 제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 text-sm"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-[#1b1b24] mb-1">부제목 / 설명</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-[#1b1b24] mb-1">날짜</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30"
                placeholder="2023.10.24 (화)"
              />
            </div>
            <div>
              <label className="block font-medium text-[#1b1b24] mb-1">시간</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30"
                placeholder="14:00 - 15:30"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-[#1b1b24] mb-1">장소</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 text-sm"
            />
          </div>

          <div>
            <label className="block font-medium text-[#1b1b24] mb-1">화상 회의 URL</label>
            <input
              type="text"
              value={videoMeetingUrl}
              onChange={(e) => setVideoMeetingUrl(e.target.value)}
              className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 text-sm"
            />
          </div>

          <div>
            <label className="block font-medium text-[#1b1b24] mb-1">회의 개요 설명</label>
            <textarea
              rows={3}
              value={agendaSummary}
              onChange={(e) => setAgendaSummary(e.target.value)}
              className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-medium text-[#1b1b24] mb-1">안건 목록 (줄 단위로 구분)</label>
            <textarea
              rows={4}
              value={agendaItemsText}
              onChange={(e) => setAgendaItemsText(e.target.value)}
              className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 text-xs font-mono"
            />
          </div>

          <div className="pt-3 border-t border-[#eae6f4] flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#eae6f4] hover:bg-[#dcd8e5] text-[#1b1b24] font-medium transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#3525cd] hover:bg-[#3323cc] text-white font-medium shadow-xs transition-colors cursor-pointer"
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
