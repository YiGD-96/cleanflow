import React, { useState } from 'react';
import { CalendarEvent } from '../types';

interface JoinMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent;
}

export const JoinMeetingModal: React.FC<JoinMeetingModalProps> = ({
  isOpen,
  onClose,
  event
}) => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${event.videoMeetingUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="join-meeting-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="join-meeting-modal-content"
        className="bg-[#202124] text-white w-full max-w-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Meet Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-green-400">videocam</span>
            <span className="font-semibold text-sm">Google Meet 화상 회의실</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {!isJoined ? (
          /* Preview State */
          <div className="p-6 space-y-5">
            <div>
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p className="text-xs text-white/70 mt-0.5">
                {event.videoMeetingUrl} · 참석자 3명 대기 중
              </p>
            </div>

            {/* Video preview mock */}
            <div className="relative w-full h-56 bg-[#303134] rounded-xl flex items-center justify-center overflow-hidden border border-white/10">
              {camOn ? (
                <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-[#4f46e5] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2 shadow-lg ring-4 ring-white/10">
                      AK
                    </div>
                    <p className="text-sm font-medium">Alex Kim (내 화면)</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-white/50 text-xs">
                  <span className="material-symbols-outlined text-4xl block mb-1">videocam_off</span>
                  카메라가 꺼져 있습니다
                </div>
              )}

              {/* Media Controls Bar */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <button
                  onClick={() => setMicOn(!micOn)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    micOn ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-red-500 text-white'
                  }`}
                  title={micOn ? '마이크 끄기' : '마이크 켜기'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {micOn ? 'mic' : 'mic_off'}
                  </span>
                </button>
                <button
                  onClick={() => setCamOn(!camOn)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    camOn ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-red-500 text-white'
                  }`}
                  title={camOn ? '카메라 끄기' : '카메라 켜기'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {camOn ? 'videocam' : 'videocam_off'}
                  </span>
                </button>
              </div>
            </div>

            {/* Waiting Attendees Preview */}
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-xs">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {event.attendees.map((att, i) => (
                    <img
                      key={i}
                      src={att.avatar}
                      alt={att.name}
                      className="w-7 h-7 rounded-full ring-2 ring-[#202124] object-cover"
                    />
                  ))}
                </div>
                <span className="text-white/80">Sarah Park, Mark Lee 님이 이미 참가했습니다</span>
              </div>
              <button
                onClick={handleCopyLink}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                {copied ? '복사됨' : '링크 복사'}
              </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => setIsJoined(true)}
                className="px-6 py-2 rounded-lg bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs font-semibold shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">video_call</span>
                지금 참가하기
              </button>
            </div>
          </div>
        ) : (
          /* Active Call State */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl animate-bounce">call</span>
            </div>
            <div>
              <h4 className="text-base font-bold">화상 회의에 연결되었습니다</h4>
              <p className="text-xs text-white/70 mt-1">
                '{event.title}' 실시간 세션 진행 중
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 py-3">
              {event.attendees.map((att, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
                  <img
                    src={att.avatar}
                    alt={att.name}
                    className="w-10 h-10 rounded-full mx-auto object-cover ring-2 ring-green-400 mb-1"
                  />
                  <p className="text-xs font-medium text-white truncate">{att.name}</p>
                  <p className="text-[10px] text-green-400">말하는 중...</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setIsJoined(false);
                onClose();
              }}
              className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              회의 나가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
