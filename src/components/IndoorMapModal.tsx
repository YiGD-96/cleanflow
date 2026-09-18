import React from 'react';
import { CalendarEvent } from '../types';

interface IndoorMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent;
}

export const IndoorMapModal: React.FC<IndoorMapModalProps> = ({
  isOpen,
  onClose,
  event
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="indoor-map-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="indoor-map-modal-content"
        className="bg-[#ffffff] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#eae6f4] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eae6f4] bg-[#f5f2ff]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#71f8e4] flex items-center justify-center text-[#00201c]">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#1b1b24]">
                실내 지도 및 위치 안내
              </h3>
              <p className="text-xs text-[#464555]">
                {event.indoorMapInfo?.building || '본사 신관 (HQ Tower)'} · {event.indoorMapInfo?.floor || '4층'}
              </p>
            </div>
          </div>
          <button
            id="indoor-map-close-btn"
            onClick={onClose}
            className="p-1 rounded-lg text-[#777587] hover:bg-[#eae6f4] hover:text-[#1b1b24] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Visual Floor Plan Diagram */}
          <div className="bg-[#f0ecf9]/60 rounded-xl p-5 border border-[#eae6f4] relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#3525cd] uppercase tracking-wider">
                HQ 4F FLOOR PLAN
              </span>
              <span className="text-xs text-[#777587]">엘리베이터 홀에서 좌측으로 30m</span>
            </div>

            {/* Schematic SVG Map */}
            <div className="w-full h-56 bg-[#ffffff] rounded-lg border border-[#c7c4d8] p-4 relative shadow-inner flex flex-col justify-between">
              {/* Floor schematic grid */}
              <div className="grid grid-cols-4 gap-2 h-full">
                {/* Office Zone A */}
                <div className="col-span-1 border border-dashed border-[#c7c4d8] rounded-md p-2 flex flex-col justify-between bg-[#fcf8ff]">
                  <span className="text-[11px] font-semibold text-[#777587]">회의실 A</span>
                  <span className="text-[10px] text-[#777587]">8인실</span>
                </div>

                {/* Target Room: Meeting Room B (Highlighted!) */}
                <div className="col-span-2 border-2 border-[#3525cd] bg-[#dad7ff]/30 rounded-md p-3 relative flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3525cd] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#3525cd] animate-ping"></span>
                      회의실 B (현재 예약 위치)
                    </span>
                    <span className="px-2 py-0.5 bg-[#4f46e5] text-white text-[10px] font-medium rounded-full">
                      수용 인원 12명
                    </span>
                  </div>

                  <div className="my-auto flex items-center justify-center">
                    <div className="w-32 h-14 border border-[#3525cd]/40 bg-white/80 rounded flex items-center justify-center text-center">
                      <div className="text-[11px] font-medium text-[#3525cd]">
                        중앙 회의 테이블<br />(12좌석 + 모니터)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#3323cc]">
                    <span>도어락: 4892*</span>
                    <span>빔프로젝터 4K</span>
                  </div>
                </div>

                {/* Rest Area / Elevator */}
                <div className="col-span-1 flex flex-col gap-2">
                  <div className="flex-1 border border-[#c7c4d8] rounded-md p-2 bg-[#eae6f4] flex flex-col justify-center items-center text-center">
                    <span className="material-symbols-outlined text-[#777587] text-[18px]">elevator</span>
                    <span className="text-[10px] text-[#464555] font-medium">엘리베이터 홀</span>
                  </div>
                  <div className="flex-1 border border-[#c7c4d8] rounded-md p-2 bg-[#fcf8ff] flex flex-col justify-center items-center text-center">
                    <span className="material-symbols-outlined text-[#777587] text-[18px]">coffee</span>
                    <span className="text-[10px] text-[#464555]">라운지/탕비실</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Amenities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#f5f2ff] p-4 rounded-xl border border-[#eae6f4]">
              <h4 className="text-xs font-semibold text-[#1b1b24] mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#3525cd]">info</span>
                공간 스펙
              </h4>
              <ul className="text-xs text-[#464555] space-y-1.5">
                <li>• <strong>위치:</strong> 본사 타워 4층 서편 복도 끝</li>
                <li>• <strong>적정 인원:</strong> 6인 ~ 12인</li>
                <li>• <strong>네트워크:</strong> HQ-Guest-5G (PW: welcome2023)</li>
              </ul>
            </div>

            <div className="bg-[#f5f2ff] p-4 rounded-xl border border-[#eae6f4]">
              <h4 className="text-xs font-semibold text-[#1b1b24] mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#006b5f]">devices</span>
                지원 장비
              </h4>
              <ul className="text-xs text-[#464555] space-y-1.5">
                <li>• 85인치 4K 스마트 디스플레이 (HDMI / AirPlay)</li>
                <li>• Logitech Rally 화상회의 카메라 & 마이크</li>
                <li>• 양면 자석 화이트보드 및 마커 세트</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#eae6f4] bg-[#fcf8ff] flex justify-end">
          <button
            id="indoor-map-confirm-btn"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#3525cd] text-white text-xs font-medium hover:bg-[#3323cc] transition-colors cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
