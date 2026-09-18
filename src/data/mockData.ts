import { CalendarEvent } from '../types';

export const CALENFLOW_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAMw_pDUTSalXK0lV-42euV0c6yElQjbHwtGHbLLA2dD6BSE10yZ86M4znVg_cIhvW7j6GXWElVyLa0M682VoecIhC9YgobjBJyH_tgX0H0TYC2UCs1dMmcykDJhtR3xnKkvXRJICVS31eK4rSsWrxll6OARJMHUEPas_u-FlF4kvF8P9vcxwwFLOS7Cvb1CVooTYgVXfxVosak8G62D55Uh-aVHuUSGPmH5cQpn2-F5Og-Tb-VSlO';

export const INITIAL_EVENT: CalendarEvent = {
  id: 'CF-2023-8894',
  title: 'Q3 제품 로드맵 전략 회의',
  subtitle: '제품 개발 및 UX 방향성 검토',
  category: '업무 (Work)',
  status: '확정 (Confirmed)',
  date: '2023.10.24 (화)',
  rawDate: '2023-10-24',
  time: '14:00 - 15:30',
  duration: '1시간 30분',
  location: '회의실 B (HQ 4층)',
  roomDetail: 'HQ 4층 컨퍼런스 홀 서편 회의실 B',
  indoorMapInfo: {
    building: '본사 신관 (HQ Tower)',
    floor: '4층',
    room: '회의실 B (디자인/제품 전용)',
    capacity: 12,
    equipment: ['4K 전자칠판 & 빔프로젝터', '화상회의 고화질 서라운드 마이크', '에어컨 & 환기시스템', '화이트보드 (양면)'],
  },
  agendaSummary: '본 회의에서는 다가오는 Q3 분기별 주요 제품 로드맵 마일스톤을 검토하고, 핵심 사용자 경험(UX) 개선 방향성에 대해 논의합니다. 각 팀별 진행 상황 공유 및 리스크 요인 분석이 포함됩니다.',
  agendaItems: [
    'Q2 핵심 지표 회고 및 피드백 공유',
    'Q3 신규 기능 우선순위 설정 (Prioritization Matrix)',
    '디자인 시스템 컴포넌트 통합 가이드 라인 검토',
    'Q&A 및 향후 액션 아이템 할당'
  ],
  attendees: [
    {
      name: 'Alex Kim',
      email: 'alex.k@calenflow.io',
      role: 'Product Manager / 진행자',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfy4uVZtbcWpiFQSwUjMcrdsOU1Fx86FV_AxXSbgafKYDh-bEBkARsEbC7Y4r64pFdW6b_miIY4-wk2U2DLxJUmaxaASFhxjWwgryn84bGjrny45toiYKPu-uxIh81ytE9YS1ZL2KiPi1zT5y9hKIrhNyBTfGx-Ij9ZpB1g3QNOngl1ecP6wMKScu5d_MREE1bUyYyvdocyGgb-j2Je7Vxgj_ksaNCtJChWP2duerAtmdT8A1wpOON',
      status: '수락함'
    },
    {
      name: 'Sarah Park',
      email: 'sarah.p@calenflow.io',
      role: 'UX Designer / 발표자',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArEshCt-OQxKnUMtUe9T6peINjbrsySabuXOjZTyvMkn4KCsOKazU3Htc5jgbb0JHiQmO5T1Gq9-FLvHs9GXjnMcQqdlfbe5DDiMZKaH_YnjbQsQejctlOFjdxFjeVZHil5s82F5D1NGhnU5CK6eqlhABvudzuaeaOgOKLwqeLJG1tJ5vCgG1Wa3L8VQ4OYUoEXH7mzuJmBBbshAx8vZNfETUx6VXxHAe3l-L4MiG-Im5nz1hBkmys',
      status: '수락함'
    },
    {
      name: 'Mark Lee',
      email: 'mark.l@calenflow.io',
      role: 'Software Architect / 검토자',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqbUqxwePXNMssNqr2ltU1iZrl2AUrXzm0xGJgmsc8g9q4gBlqBH1UZuYwPmeYSGoGCAvGEdFbFGb8ylkqMeVCOTLdZ-vpKSme_pG_uDCdLW0UkhqLO0w0_qTyCMVEKH78VzWBr8MUw7o_CeknyscmcAzD_ZdINKQiGoetFRQXbqkkMwZZmxd0U_DxU2e2Jrs6JWixz2sanHJOzoS15wHwk3tezveb7xy3Swk3OaQm1Le5qeYi2rt4',
      status: '수락함'
    }
  ],
  videoService: 'Google Meet',
  videoMeetingUrl: 'meet.google.com/abc-defg-hij',
  reminders: [
    { id: 'r1', label: '10분 전 알림', active: true },
    { id: 'r2', label: '1시간 전 알림', active: true }
  ],
  calendarName: '기본 업무 캘린더',
  createdAt: '2023.10.15 10:24 AM',
  repeat: '반복 없음',
  visibility: '전체 공개'
};

export const OTHER_SCHEDULES: CalendarEvent[] = [
  INITIAL_EVENT,
  {
    id: 'CF-2023-8895',
    title: '주간 개발팀 스프린트 플래닝',
    subtitle: 'Sprint #42 백로그 리뷰 및 작업 분배',
    category: '엔지니어링',
    status: '확정 (Confirmed)',
    date: '2023.10.23 (월)',
    rawDate: '2023-10-23',
    time: '10:00 - 11:30',
    duration: '1시간 30분',
    location: '온라인 화상 (Google Meet)',
    roomDetail: '원격 온라인 회의',
    agendaSummary: '새로운 2주 스프린트 목표 수립 및 티켓 리뷰를 진행합니다.',
    agendaItems: [
      '지난 스프린트 번다운 차트 검토',
      '신규 기능 티켓 우선순위 선정',
      '기술 부채 및 인프라 최적화 안건 논의'
    ],
    attendees: [
      INITIAL_EVENT.attendees[0],
      INITIAL_EVENT.attendees[2]
    ],
    videoService: 'Google Meet',
    videoMeetingUrl: 'meet.google.com/spr-plan-2023',
    reminders: [{ id: 'r3', label: '15분 전 알림', active: true }],
    calendarName: '개발팀 프로젝트 캘린더',
    createdAt: '2023.10.14 09:00 AM',
    repeat: '매주 월요일',
    visibility: '팀 공개'
  },
  {
    id: 'CF-2023-8896',
    title: '디자인 시스템 싱크 및 신규 컴포넌트 검토',
    subtitle: '피그마 UI 키트 v2.4 릴리즈 사전 점검',
    category: '디자인',
    status: '확정 (Confirmed)',
    date: '2023.10.25 (수)',
    rawDate: '2023-10-25',
    time: '15:00 - 16:00',
    duration: '1시간',
    location: '회의실 A (HQ 4층)',
    roomDetail: 'HQ 4층 회의실 A',
    agendaSummary: '디자인 토큰 통일 및 인터랙션 상태 피드백을 수렴합니다.',
    agendaItems: [
      '다크모드 색상 팔레트 가이드라인 확정',
      '접근성(WCAG) 대비비 준수 테스트 결과 공유'
    ],
    attendees: [
      INITIAL_EVENT.attendees[0],
      INITIAL_EVENT.attendees[1]
    ],
    videoService: 'Google Meet',
    videoMeetingUrl: 'meet.google.com/des-sync-v24',
    reminders: [{ id: 'r4', label: '10분 전 알림', active: true }],
    calendarName: '디자인팀 캘린더',
    createdAt: '2023.10.16 11:20 AM',
    repeat: '반복 없음',
    visibility: '전체 공개'
  }
];
