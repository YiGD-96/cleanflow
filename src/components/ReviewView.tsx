import React, { useState } from 'react';
import { Article } from '../types';
import { MOCK_ARTICLES } from '../data/articlesData';

export const ReviewView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', '생산성 & AI', '팀 협업', '생산성 노하우'];

  const filteredArticles = MOCK_ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === '전체' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentPageNum(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    setCurrentPageNum(1);
  };

  const handlePageChange = (pageNum: number) => {
    setCurrentPageNum(pageNum);
    const contentElement = document.getElementById('article-content-top');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // If an article is selected, render the detailed Article Reader with 1, 2, 3 page navigation
  if (selectedArticle) {
    const totalPages = selectedArticle.pages.length;
    const currentPageData =
      selectedArticle.pages.find((p) => p.pageNumber === currentPageNum) ||
      selectedArticle.pages[0];

    return (
      <div id="review-article-reader" className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200 pb-16">
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between border-b border-[#eae6f4] pb-4">
          <button
            id="btn-back-to-articles"
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#eae6f4] text-sm font-medium text-[#464555] hover:text-[#1b1b24] hover:bg-[#f5f2ff] hover:border-[#4f46e5]/30 transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>기사 목록으로 돌아가기</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#777587]">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>리뷰 기사 읽기 모드</span>
          </div>
        </div>

        {/* Article Metadata Header */}
        <header className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#eae6f4] shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#4f46e5]/10 text-[#4f46e5]">
              {selectedArticle.category}
            </span>
            <span className="text-xs text-[#777587] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {selectedArticle.readTime}
            </span>
            <span className="text-xs text-[#777587] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              {selectedArticle.date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1b1b24] leading-tight">
            {selectedArticle.title}
          </h1>
          <p className="text-sm sm:text-base text-[#464555] leading-relaxed">
            {selectedArticle.subtitle}
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#eae6f4]">
            <img
              src={selectedArticle.author.avatar}
              alt={selectedArticle.author.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#4f46e5]/20"
            />
            <div>
              <p className="text-sm font-semibold text-[#1b1b24]">
                {selectedArticle.author.name}
              </p>
              <p className="text-xs text-[#777587]">
                {selectedArticle.author.role}
              </p>
            </div>
          </div>
        </header>

        {/* Page Switcher Control Bar (1, 2, 3 페이지 구분) */}
        <div
          id="article-content-top"
          className="sticky top-20 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#eae6f4] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#1b1b24] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#4f46e5] text-[18px]">
                auto_stories
              </span>
              페이지 선택:
            </span>
            <div className="flex items-center space-x-1 bg-[#f5f2ff] p-1 rounded-xl border border-[#eae6f4]">
              {selectedArticle.pages.map((page) => {
                const isActive = page.pageNumber === currentPageNum;
                return (
                  <button
                    key={page.pageNumber}
                    id={`btn-page-${page.pageNumber}`}
                    onClick={() => handlePageChange(page.pageNumber)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      isActive
                        ? 'bg-[#4f46e5] text-white shadow-xs'
                        : 'text-[#464555] hover:text-[#1b1b24] hover:bg-white'
                    }`}
                  >
                    <span>페이지 {page.pageNumber}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Previous / Next Quick Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-[#777587] font-medium">
              {currentPageNum} / {totalPages} 페이지
            </span>

            <div className="flex items-center gap-1">
              <button
                id="btn-prev-page"
                disabled={currentPageNum === 1}
                onClick={() => handlePageChange(currentPageNum - 1)}
                className={`p-2 rounded-lg text-xs font-medium border flex items-center justify-center transition-all cursor-pointer ${
                  currentPageNum === 1
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-[#1b1b24] border-[#eae6f4] hover:bg-[#f5f2ff] hover:text-[#4f46e5]'
                }`}
                title="이전 페이지"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>

              <button
                id="btn-next-page"
                disabled={currentPageNum === totalPages}
                onClick={() => handlePageChange(currentPageNum + 1)}
                className={`p-2 rounded-lg text-xs font-medium border flex items-center justify-center transition-all cursor-pointer ${
                  currentPageNum === totalPages
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-[#4f46e5] text-white border-[#4f46e5] hover:bg-[#3525cd]'
                }`}
                title="다음 페이지"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Page Main Body Content */}
        <article
          id={`page-content-${currentPageNum}`}
          className="bg-white p-6 sm:p-10 rounded-2xl border border-[#eae6f4] shadow-xs space-y-8 animate-in fade-in duration-300"
        >
          {/* Section Heading for this page */}
          {currentPageData.title && (
            <div className="border-l-4 border-[#4f46e5] pl-4 py-1 space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1b1b24]">
                {currentPageData.title}
              </h2>
              {currentPageData.subtitle && (
                <p className="text-sm font-medium text-[#4f46e5]">
                  {currentPageData.subtitle}
                </p>
              )}
            </div>
          )}

          {/* Article Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-[#353443] leading-relaxed tracking-wide">
            {currentPageData.content.map((paragraph, idx) => (
              <p key={idx} className="indent-0">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Featured Image on Page */}
          {currentPageData.image && (
            <figure className="space-y-2 my-6">
              <div className="overflow-hidden rounded-xl border border-[#eae6f4] shadow-xs bg-gray-50">
                <img
                  src={currentPageData.image}
                  alt={currentPageData.title || 'Article Section Graphic'}
                  className="w-full h-64 sm:h-80 object-cover hover:scale-102 transition-transform duration-500"
                />
              </div>
              {currentPageData.imageCaption && (
                <figcaption className="text-xs text-center text-[#777587] italic">
                  {currentPageData.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Blockquote Callout */}
          {currentPageData.quote && (
            <blockquote className="p-5 sm:p-6 rounded-xl bg-[#f5f2ff] border-l-4 border-[#4f46e5] text-[#3525cd] font-medium text-sm sm:text-base italic shadow-2xs leading-relaxed">
              {currentPageData.quote}
            </blockquote>
          )}

          {/* Key Highlights Bullet Points */}
          {currentPageData.highlights && currentPageData.highlights.length > 0 && (
            <div className="p-5 rounded-xl bg-[#fcf8ff] border border-[#eae6f4] space-y-3">
              <h4 className="text-xs font-bold text-[#4f46e5] tracking-wider uppercase flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                이 페이지의 핵심 포인트
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#353443]">
                {currentPageData.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#4f46e5] text-[16px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {/* Footer Page Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#eae6f4]">
          {currentPageNum > 1 ? (
            <button
              onClick={() => handlePageChange(currentPageNum - 1)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#eae6f4] text-xs font-semibold text-[#1b1b24] hover:bg-[#f5f2ff] hover:text-[#4f46e5] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>이전 페이지 ({currentPageNum - 1}페이지로 이동)</span>
            </button>
          ) : (
            <div></div>
          )}

          {currentPageNum < totalPages ? (
            <button
              onClick={() => handlePageChange(currentPageNum + 1)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#4f46e5] text-white text-xs font-semibold hover:bg-[#3525cd] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ml-auto"
            >
              <span>다음 페이지 ({currentPageNum + 1}페이지 읽기)</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={handleBackToList}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#1b1b24] text-white text-xs font-semibold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ml-auto"
            >
              <span>기사 완독 완료 (목록으로 돌아가기)</span>
              <span className="material-symbols-outlined text-[18px]">check</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Articles Collection List View
  return (
    <div id="review-articles-list" className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200 pb-16">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3525cd] via-[#4f46e5] to-[#6366f1] p-8 sm:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium border border-white/20">
            <span className="material-symbols-outlined text-[16px]">newspaper</span>
            CalenFlow 아티클 & 리뷰 라이브러리
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            스마트 오피스와 최신 생산성 리뷰 모음집
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            AI 캘린더 도입 효과부터 하이브리드 미팅 노하우, 딥 워크를 지키는 시간 관리 전략까지 전문 분석 기사를 탐색해보세요.
          </p>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-32 top-4 w-40 h-40 rounded-full bg-indigo-300/20 blur-xl pointer-events-none" />
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#eae6f4] shadow-xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#4f46e5] text-white shadow-xs'
                    : 'bg-[#f5f2ff] text-[#464555] hover:bg-[#eae6f4] hover:text-[#1b1b24]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#777587] text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="기사 제목, 키워드 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#fcf8ff] border border-[#eae6f4] text-xs text-[#1b1b24] placeholder-[#777587] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/40 transition-all"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => handleOpenArticle(article)}
              className="group bg-white rounded-2xl border border-[#eae6f4] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Thumbnail Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#1b1b24]/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#4f46e5]">
                    auto_stories
                  </span>
                  <span>{article.pages.length}개 페이지 구분</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#777587]">
                    <span className="font-semibold text-[#4f46e5]">
                      {article.category}
                    </span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1b1b24] group-hover:text-[#4f46e5] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#464555] line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Card Footer Author & Button */}
                <div className="pt-4 border-t border-[#eae6f4] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#4f46e5]/30"
                    />
                    <span className="text-xs font-medium text-[#1b1b24]">
                      {article.author.name}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-[#4f46e5] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    기사 읽기 (1-3p)
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-2xl border border-[#eae6f4] space-y-3">
          <span className="material-symbols-outlined text-[48px] text-[#777587]">
            search_off
          </span>
          <h3 className="text-base font-bold text-[#1b1b24]">검색 결과가 없습니다.</h3>
          <p className="text-xs text-[#777587]">
            다른 검색어를 입력하시거나 카테고리 필터를 변경해 보세요.
          </p>
        </div>
      )}
    </div>
  );
};

