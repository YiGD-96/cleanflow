import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { EventDetailView } from './components/EventDetailView';
import { MonthlyCalendarView } from './components/MonthlyCalendarView';
import { DailyScheduleView } from './components/DailyScheduleView';
import { MySchedulesView } from './components/MySchedulesView';
import { ReviewView } from './components/ReviewView';
import { EditEventModal } from './components/EditEventModal';
import { IndoorMapModal } from './components/IndoorMapModal';
import { JoinMeetingModal } from './components/JoinMeetingModal';
import { NewEventModal } from './components/NewEventModal';
import { OTHER_SCHEDULES, INITIAL_EVENT } from './data/mockData';
import { ActiveTab, CalendarEvent } from './types';

export default function App() {
  const [schedules, setSchedules] = useState<CalendarEvent[]>(OTHER_SCHEDULES);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>(INITIAL_EVENT);
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    if (window.location.pathname === '/review' || window.location.hash === '#review') {
      return 'review';
    }
    return 'event-detail';
  });

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/review' || window.location.hash === '#review') {
        setActiveTab('review');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabSelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'review') {
      window.history.pushState({}, '', '/review');
    } else {
      window.history.pushState({}, '', '/');
    }
  };
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isIndoorMapOpen, setIsIndoorMapOpen] = useState(false);
  const [isJoinMeetingOpen, setIsJoinMeetingOpen] = useState(false);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSaveEvent = (updated: CalendarEvent) => {
    setSelectedEvent(updated);
    setSchedules((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    showToast('일정 내용이 성공적으로 수정되었습니다.');
  };

  const handleConfirmCancelEvent = () => {
    const isAlreadyCancelled = selectedEvent.status.includes('Cancelled') || selectedEvent.status.includes('취소');
    const newStatus = isAlreadyCancelled ? '확정 (Confirmed)' : '취소됨 (Cancelled)';
    const updated: CalendarEvent = {
      ...selectedEvent,
      status: newStatus
    };
    setSelectedEvent(updated);
    setSchedules((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setIsCancelConfirmOpen(false);
    showToast(isAlreadyCancelled ? '일정이 다시 확정되었습니다.' : '일정이 취소 처리되었습니다.');
  };

  const handleCreateEvent = (newEvent: CalendarEvent) => {
    setSchedules((prev) => [newEvent, ...prev]);
    setSelectedEvent(newEvent);
    setActiveTab('event-detail');
    showToast('새 일정이 정상적으로 등록되었습니다.');
  };

  const handleSelectEventFromList = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setActiveTab('event-detail');
  };

  return (
    <div id="calenflow-app-root" className="min-h-screen bg-[#fcf8ff] text-[#1b1b24] flex">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="toast-notification"
          className="fixed bottom-6 right-6 z-50 bg-[#1b1b24] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <span className="material-symbols-outlined text-green-400 text-[18px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => handleTabSelect(tab)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenNewEvent={() => setIsNewEventModalOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 w-full pl-0 lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <Header
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          schedules={schedules}
          onSelectEvent={handleSelectEventFromList}
        />

        {/* Content Page based on Active Tab */}
        <main
          id="page-main-container"
          className="relative pt-16 bg-[#fcf8ff] min-h-screen p-6 sm:p-8 flex-1"
        >
          {activeTab === 'event-detail' && (
            <EventDetailView
              event={selectedEvent}
              onBackToCalendar={() => handleTabSelect('monthly-calendar')}
              onEditEvent={() => setIsEditModalOpen(true)}
              onCancelEvent={() => setIsCancelConfirmOpen(true)}
              onOpenIndoorMap={() => setIsIndoorMapOpen(true)}
              onJoinMeeting={() => setIsJoinMeetingOpen(true)}
            />
          )}

          {activeTab === 'monthly-calendar' && (
            <MonthlyCalendarView
              schedules={schedules}
              onSelectEvent={handleSelectEventFromList}
              onOpenNewEvent={() => setIsNewEventModalOpen(true)}
            />
          )}

          {activeTab === 'daily-schedule' && (
            <DailyScheduleView
              schedules={schedules}
              onSelectEvent={handleSelectEventFromList}
              onOpenNewEvent={() => setIsNewEventModalOpen(true)}
            />
          )}

          {activeTab === 'my-schedules' && (
            <MySchedulesView
              schedules={schedules}
              onSelectEvent={handleSelectEventFromList}
              onOpenNewEvent={() => setIsNewEventModalOpen(true)}
            />
          )}

          {activeTab === 'review' && <ReviewView />}
        </main>
      </div>

      {/* Interactive Modals */}
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={selectedEvent}
        onSave={handleSaveEvent}
      />

      <IndoorMapModal
        isOpen={isIndoorMapOpen}
        onClose={() => setIsIndoorMapOpen(false)}
        event={selectedEvent}
      />

      <JoinMeetingModal
        isOpen={isJoinMeetingOpen}
        onClose={() => setIsJoinMeetingOpen(false)}
        event={selectedEvent}
      />

      <NewEventModal
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
        onCreate={handleCreateEvent}
      />

      {/* Cancel Event Confirmation Dialog */}
      {isCancelConfirmOpen && (
        <div
          id="cancel-dialog-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsCancelConfirmOpen(false)}
        >
          <div
            id="cancel-dialog-content"
            className="bg-[#ffffff] w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-[#eae6f4] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">warning</span>
              </div>
              <div>
                <h4 className="text-base font-bold text-[#1b1b24]">
                  {selectedEvent.status.includes('Cancelled') || selectedEvent.status.includes('취소')
                    ? '일정을 재확정하시겠습니까?'
                    : '일정을 취소하시겠습니까?'}
                </h4>
                <p className="text-xs text-[#464555] mt-0.5">
                  {selectedEvent.title}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#464555] leading-relaxed">
              취소 시 모든 등록된 참석자(Alex, Sarah, Mark)에게 일정 취소 알림이 전송됩니다.
            </p>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsCancelConfirmOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#eae6f4] hover:bg-[#dcd8e5] text-[#1b1b24] text-xs font-medium cursor-pointer"
              >
                닫기
              </button>
              <button
                onClick={handleConfirmCancelEvent}
                className="px-4 py-2 rounded-lg bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                {selectedEvent.status.includes('Cancelled') || selectedEvent.status.includes('취소')
                  ? '일정 복원하기'
                  : '일정 취소 확정'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
