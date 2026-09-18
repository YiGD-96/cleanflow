export interface Attendee {
  name: string;
  email: string;
  role?: string;
  avatar: string;
  status: '수락함' | '대기중' | '거절함';
}

export interface Reminder {
  id: string;
  label: string;
  active: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  status: '확정 (Confirmed)' | '대기중 (Pending)' | '취소됨 (Cancelled)';
  date: string;
  rawDate: string; // YYYY-MM-DD
  time: string;
  duration: string;
  location: string;
  roomDetail: string;
  indoorMapInfo?: {
    building: string;
    floor: string;
    room: string;
    capacity: number;
    equipment: string[];
  };
  agendaSummary: string;
  agendaItems: string[];
  attendees: Attendee[];
  videoService: string;
  videoMeetingUrl: string;
  reminders: Reminder[];
  calendarName: string;
  createdAt: string;
  repeat: string;
  visibility: string;
}

export interface ArticlePage {
  pageNumber: number;
  title?: string;
  subtitle?: string;
  content: string[];
  image?: string;
  imageCaption?: string;
  quote?: string;
  highlights?: string[];
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  thumbnail: string;
  summary: string;
  tags: string[];
  pages: ArticlePage[];
}

export type ActiveTab = 'monthly-calendar' | 'daily-schedule' | 'new-event' | 'event-detail' | 'my-schedules' | 'review';
