import React, { useState } from 'react';
import { CalendarEvent } from '../types';

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newEvent: CalendarEvent) => void;
}

export const NewEventModal: React.FC<NewEventModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('업무 (Work)');
  const [date, setDate] = useState('2023.10.26 (목)');
  const [rawDate, setRawDate] = useState('2023-10-26');
  const [time, setTime] = useState('11:00 - 12:00');
  const [location, setLocation] = useState('회의실 C (HQ 4층)');
  const [agendaSummary, setAgendaSummary] = useState('');
  const [videoMeetingUrl, setVideoMeetingUrl] = useState('meet.google.com/new-meet-2023');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvent: CalendarEvent = {
      id: `CF-2023-${Math.floor(1000 + Math.random() * 9000)}`,
      title: title.trim(),
      subtitle: subtitle.trim() || '신규 등록 일정',
      category,
      status: '확정 (Confirmed)',
      date,
      rawDate,
      time,
      duration: '1시간',
      location,
      roomDetail: `${location} 전용 회의공간`,
      agendaSummary: agendaSummary.trim() || '팀 회의 및 협업 안건 검토',
      agendaItems: [
        '주요 안건 개요 발표',
        '팀별 질의응답 및 액션 아이템 수립'
      ],
      attendees: [
        {
          name: 'Alex Kim',
          email: 'alex.k@calenflow.io',
          role: 'Organizer',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfy4uVZtbcWpiFQSwUjMcrdsOU1Fx86FV_AxXSbgafKYDh-bEBkARsEbC7Y4r64pFdW6b_miIY4-wk2U2DLxJUmaxaASFhxjWwgryn84bGjrny45toiYKPu-uxIh81ytE9YS1ZL2KiPi1zT5y9hKIrhNyBTfGx-Ij9ZpB1g3QNOngl1ecP6wMKScu5d_MREE1bUyYyvdocyGgb-j2Je7Vxgj_ksaNCtJChWP2duerAtmdT8A1wpOON',
          status: '수락함'
        }
      ],
      videoService: 'Google Meet',
      videoMeetingUrl,
      reminders: [
        { id: 'r-new-1', label: '10분 전 알림', active: true }
      ],
      calendarName: '기본 업무 캘린더',
      createdAt: new Date().toLocaleDateString('ko-KR'),
      repeat: '반복 없음',
      visibility: '전체 공개'
    };

    onCreate(newEvent);
    onClose();
  };

  return (
    <div
      id="new-event-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="new-event-modal-content"
        className="bg-[#ffffff] w-full max-w-xl rounded-2xl shadow-2xl border border-[#eae6f4] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eae6f4] bg-[#f5f2ff]">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[#3525cd]">add_circle</span>
            <h3 className="text-base font-semibold text-[#1b1b24]">새 일정 등록 (New Event)</h3>
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
            <label className="block font-medium text-[#1b1b24] mb-1">일정 제목 *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 4분기 디자인 시스템 리뷰"
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
              placeholder="일정에 대한 간략한 목표"
              className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-[#1b1b24] mb-1">분류 (카테고리)</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30"
              >
                <option value="업무 (Work)">업무 (Work)</option>
                <option value="디자인">디자인</option>
                <option value="엔지니어링">엔지니어링</option>
                <option value="프로젝트">프로젝트</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-[#1b1b24] mb-1">시간</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="11:00 - 12:00"
                className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-[#1b1b24] mb-1">날짜 표시</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="2023.10.26 (목)"
                className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30"
              />
            </div>
            <div>
              <label className="block font-medium text-[#1b1b24] mb-1">캘린더 연동 날짜 (YYYY-MM-DD)</label>
              <input
                type="date"
                value={rawDate}
                onChange={(e) => setRawDate(e.target.value)}
                className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-[#1b1b24] mb-1">장소</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="회의실 C (HQ 4층)"
              className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 text-sm"
            />
          </div>

          <div>
            <label className="block font-medium text-[#1b1b24] mb-1">화상 회의 주소</label>
            <input
              type="text"
              value={videoMeetingUrl}
              onChange={(e) => setVideoMeetingUrl(e.target.value)}
              placeholder="meet.google.com/xxx-xxxx-xxx"
              className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 text-sm"
            />
          </div>

          <div>
            <label className="block font-medium text-[#1b1b24] mb-1">회의 개요 설명</label>
            <textarea
              rows={3}
              value={agendaSummary}
              onChange={(e) => setAgendaSummary(e.target.value)}
              placeholder="회의의 주된 목표 및 안건"
              className="w-full px-3 py-2 border border-[#c7c4d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3525cd]/30 text-xs leading-relaxed"
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
              일정 등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
