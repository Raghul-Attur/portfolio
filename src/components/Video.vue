<template>

  <!-- ── PAGE HEADER ───────────────────────────────────────── -->
  <div class="vd-header">
    <div class="vd-header-inner">
      <span class="vd-eyebrow">Portfolio</span>
      <h1 class="vd-page-title">Video<br>&amp; Motion</h1>
      <p class="vd-page-desc">
        Brand films, campaign edits, animated content, and motion graphics, produced across agency and freelance environments over 6 years.
      </p>
    </div>
    <div class="vd-header-count">{{ videos.length + 2 }} Films</div>
  </div>

  <!-- ── POSTER GRID ───────────────────────────────────────── -->
  <transition name="grid-fade">
    <div v-if="activeVideo === null && !funskoolOpen && !mhOpen" class="vd-grid">

      <!-- Funskool special entry -->
      <div class="vd-poster vd-poster--wide vd-poster--funskool" @click="openFunskool">
        <div class="vd-poster-img">
          <div class="vd-funskool-bg"></div>
        </div>
        <div class="vd-poster-grain"></div>
        <!-- Animated spinning dots hint -->
        <div class="vd-clock-hint">
          <div class="vd-clock-ring">
            <span
              v-for="n in 7" :key="n"
              class="vd-clock-dot"
              :style="{ transform: `rotate(${n * (360/7)}deg) translateY(-22px)` }"
            ></span>
          </div>
        </div>
        <div class="vd-poster-overlay">
          <div class="vd-poster-top">
            <span class="vd-poster-cat">Social Content · Motion</span>
            <span class="vd-play-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 2L11 7L3 12V2Z" fill="white"/>
              </svg>
            </span>
          </div>
          <div class="vd-poster-bottom">
            <span class="vd-poster-client">Smitten Worldwide / Funskool</span>
            <h3 class="vd-poster-title">Funskool, Social Campaign</h3>
            <p class="vd-poster-sub">7-post animated social series · 125% engagement increase</p>
            <span class="vd-poster-cta">View All Posts ↗</span>
          </div>
        </div>
      </div>

      <!-- Monsoon Harvest stacked deck entry -->
      <div class="vd-poster vd-poster--normal vd-poster--mh" @click="openMH">
        <div class="vd-mh-bg"></div>
        <div class="vd-poster-grain"></div>
        <!-- Stacked deck hint -->
        <div class="vd-deck-hint">
          <div class="vd-deck-card vd-deck-card--3"></div>
          <div class="vd-deck-card vd-deck-card--2"></div>
          <div class="vd-deck-card vd-deck-card--1"></div>
        </div>
        <div class="vd-poster-overlay">
          <div class="vd-poster-top">
            <span class="vd-poster-cat">Social Content · Motion</span>
            <span class="vd-play-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 2L11 7L3 12V2Z" fill="white"/>
              </svg>
            </span>
          </div>
          <div class="vd-poster-bottom">
            <span class="vd-poster-client">Smitten Worldwide / Monsoon Harvest</span>
            <h3 class="vd-poster-title">Monsoon Harvest, Ads</h3>
            <p class="vd-poster-sub">3 animated ad creatives for a premium snack brand</p>
            <span class="vd-poster-cta">View All Ads ↗</span>
          </div>
        </div>
      </div>


      <div
        v-for="(video, index) in videos"
        :key="video.id"
        class="vd-poster"
        :class="'vd-poster--' + video.size"
        @click="open(index)"
      >
        <div class="vd-poster-img">
          <img
            :src="'https://img.youtube.com/vi/' + video.id + '/maxresdefault.jpg'"
            :alt="video.title"
            loading="lazy"
          />
        </div>
        <div class="vd-poster-grain"></div>
        <div class="vd-poster-overlay">
          <div class="vd-poster-top">
            <span class="vd-poster-cat">{{ video.category }}</span>
            <span class="vd-play-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 2L11 7L3 12V2Z" fill="white"/>
              </svg>
            </span>
          </div>
          <div class="vd-poster-bottom">
            <span class="vd-poster-client">{{ video.client }}</span>
            <h3 class="vd-poster-title">{{ video.title }}</h3>
            <p class="vd-poster-sub">{{ video.subtitle }}</p>
            <span class="vd-poster-cta">Watch Film ↗</span>
          </div>
        </div>
      </div>

    </div>
  </transition>

  <!-- ── FUNSKOOL CLOCK SHOWCASE ───────────────────────────── -->
  <transition name="detail-fade">
    <div v-if="funskoolOpen" class="vd-funskool-showcase">

      <div class="vd-detail-body">
        <button class="vd-back-btn" @click="closeFunskool">← Back to Films</button>

        <div class="vd-title-block">
          <span class="vd-detail-cat">Social Content · Motion Graphics</span>
          <h1 class="vd-detail-title">Funskool Campaign</h1>
          <p class="vd-detail-subtitle">7-post animated social series producing a 125% engagement increase over 6 months. Hover each post to preview, click to watch with sound.</p>
        </div>

        <!-- Clock / fan stage -->
        <div class="vd-clock-stage">

          <!-- Centre label -->
          <div class="vd-clock-center">
            <div class="vd-clock-center-ring"></div>
            <span class="vd-clock-center-text">
              {{ expandedPost !== null ? funskoolPosts[expandedPost].title : '7 posts' }}
            </span>
          </div>

          <!-- Fan cards -->
          <div
            v-for="(post, i) in funskoolPosts"
            :key="i"
            class="vd-clock-card"
            :class="{
              'vd-clock-card--expanded': expandedPost === i,
              'vd-clock-card--dimmed':   expandedPost !== null && expandedPost !== i
            }"
            :style="getClockStyle(i)"
            @click="togglePost(i)"
          >
            <div class="vd-clock-card-inner">
              <video
                :ref="el => { if (el) videoRefs[i] = el }"
                :src="post.src"
                class="vd-clock-video"
                autoplay
                muted
                loop
                playsinline
                preload="auto"
              ></video>
              <div class="vd-clock-card-overlay">
                <span class="vd-clock-card-title">{{ post.title }}</span>
                <span class="vd-clock-expand-btn">
                  <svg v-if="expandedPost !== i" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M12 2L2 12M2 2l10 10" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Meta strip -->
        <div class="vd-meta-strip">
          <div class="vd-meta-item">
            <span class="vd-meta-label">Client</span>
            <span class="vd-meta-value">Funskool India</span>
          </div>
          <div class="vd-meta-item">
            <span class="vd-meta-label">Agency</span>
            <span class="vd-meta-value">Smitten Worldwide</span>
          </div>
          <div class="vd-meta-item">
            <span class="vd-meta-label">Year</span>
            <span class="vd-meta-value">2022</span>
          </div>
          <div class="vd-meta-item">
            <span class="vd-meta-label">Tools</span>
            <span class="vd-meta-value">After Effects, Illustrator, Photoshop</span>
          </div>
          <div class="vd-meta-item">
            <span class="vd-meta-label">Result</span>
            <span class="vd-meta-value">125% engagement increase over 6 months</span>
          </div>
        </div>

        <!-- Write-up -->
        <div class="vd-case-section">
          <div class="vd-section-label">Overview</div>
          <div class="vd-section-content">
            <p>Animated social content series for Funskool, one of India's largest toy manufacturers. The account moved from static product photography to motion-first content, short looping animations designed specifically for Reels and Stories. Modular animation templates were built in After Effects to allow rapid production across different products and seasonal moments.</p>
            <p>The campaign covered product launches, seasonal events, and brand storytelling across 7 posts. Each post was designed as a 15-30 second looping sequence paced for mobile-first viewing, energetic, playful, and unmistakably Funskool.</p>
          </div>
        </div>

        <div class="vd-case-section">
          <div class="vd-section-label">Approach</div>
          <div class="vd-section-content">
            <p>Animation was the brief from the start, not a finishing layer. A consistent visual system was maintained across all posts to build brand recognition over time, compounding the engagement numbers. Colour, motion language, and typographic rhythm were locked early so each post felt part of a family rather than a standalone execution.</p>
            <p>The 125% engagement increase was driven by the shift to motion, the platform rewards content that holds attention past the first second, and a well-timed loop does exactly that.</p>
          </div>
        </div>

        <div class="vd-detail-nav">
          <button class="vd-back-btn" @click="closeFunskool">← All Films</button>
        </div>
      </div>
    </div>
  </transition>

  <!-- ── MONSOON HARVEST MOCKUP SHOWCASE ──────────────────── -->
  <transition name="detail-fade">
    <div v-if="mhOpen" class="vd-mh-showcase">
      <div class="vd-detail-body">
        <button class="vd-back-btn" @click="closeMH">← Back to Films</button>
        <div class="vd-title-block">
          <span class="vd-detail-cat">Social Content · Motion Graphics</span>
          <h1 class="vd-detail-title">Monsoon Harvest</h1>
          <p class="vd-detail-subtitle">Animated ad creatives for a premium Australian health snack brand, square posts for Instagram feed, widescreen for YouTube.</p>
        </div>

        <!-- ── INSTAGRAM ROW (2 square posts) ────────────────── -->
        <div class="mh-ig-row">

          <div
            v-for="i in [0, 1]"
            :key="i"
            class="mh-ig-phone"
          >
            <!-- Phone chrome -->
            <div class="mh-phone-frame">
              <!-- Status bar -->
              <div class="mh-phone-status">
                <span class="mh-status-time">9:41</span>
                <div class="mh-status-icons">
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="white" opacity="0.9">
                    <rect x="0" y="3" width="3" height="7" rx="0.5"/>
                    <rect x="4" y="2" width="3" height="8" rx="0.5"/>
                    <rect x="8" y="1" width="3" height="9" rx="0.5"/>
                    <rect x="12" y="0" width="3" height="10" rx="0.5"/>
                  </svg>
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="white" opacity="0.9">
                    <path d="M7.5 2.5C9.8 2.5 11.8 3.5 13.2 5L14.5 3.7C12.7 1.9 10.2 0.8 7.5 0.8S2.3 1.9 0.5 3.7L1.8 5C3.2 3.5 5.2 2.5 7.5 2.5z"/>
                    <path d="M7.5 5.5C9 5.5 10.3 6.1 11.3 7.1L12.6 5.8C11.2 4.4 9.5 3.8 7.5 3.8S3.8 4.4 2.4 5.8L3.7 7.1C4.7 6.1 6 5.5 7.5 5.5z"/>
                    <circle cx="7.5" cy="9.5" r="1.3"/>
                  </svg>
                  <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                    <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" stroke-opacity="0.35"/>
                    <rect x="2" y="2" width="17" height="8" rx="2" fill="white"/>
                    <path d="M23 4v4a2 2 0 000-4z" fill="white" opacity="0.4"/>
                  </svg>
                </div>
              </div>

              <!-- Instagram chrome -->
              <div class="mh-ig-chrome">
                <div class="mh-ig-header">
                  <svg width="80" height="28" viewBox="0 0 80 28" fill="white">
                    <text x="0" y="22" font-family="'Billabong', Georgia, serif" font-size="24">Instagram</text>
                  </svg>
                  <div class="mh-ig-header-icons">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.4 11.27 19.79 19.79 0 01.34 2.7 2 2 0 012.32.7h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l.76-.76a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                </div>

                <!-- Stories strip -->
                <div class="mh-ig-stories">
                  <div class="mh-story-item" v-for="s in ['MH', 'Snacks', 'Natural', 'Clean']" :key="s">
                    <div class="mh-story-ring">
                      <div class="mh-story-avatar">{{ s[0] }}</div>
                    </div>
                    <span class="mh-story-label">{{ s }}</span>
                  </div>
                </div>
              </div>

              <!-- Post card -->
              <div class="mh-ig-post">
                <!-- Post header -->
                <div class="mh-post-header">
                  <div class="mh-post-avatar">MH</div>
                  <div class="mh-post-account">
                    <span class="mh-post-handle">monsoonharvest</span>
                    <span class="mh-post-sponsored">Sponsored</span>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" opacity="0.6" style="margin-left:auto">
                    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
                  </svg>
                </div>

                <!-- Video -->
                <div class="mh-ig-video-wrap">
                  <video
                    :ref="el => { if (el) mhVideoRefs[i] = el }"
                    :src="mhPosts[i].src"
                    class="mh-ig-video"
                    autoplay muted loop playsinline preload="auto"
                  ></video>
                </div>

                <!-- Action bar -->
                <div class="mh-post-actions">
                  <div class="mh-action-left">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </div>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                  </svg>
                </div>

                <!-- Stats -->
                <div class="mh-post-stats">
                  <span class="mh-likes">{{ formatCount(mhCounters[i].likes) }} likes</span>
                </div>
                <div class="mh-post-caption">
                  <span class="mh-caption-handle">monsoonharvest</span>
                  {{ mhPosts[i].caption }}
                </div>

                <!-- View counter -->
                <div class="mh-post-views">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  {{ formatCount(mhCounters[i].views) }} views
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- ── YOUTUBE MOCKUP (widescreen) ────────────────────── -->
        <div class="mh-yt-section">
          <div class="mh-yt-browser">
            <!-- Browser chrome -->
            <div class="mh-yt-browser-bar">
              <div class="mh-yt-dots">
                <span class="mh-yt-dot mh-yt-dot--r"></span>
                <span class="mh-yt-dot mh-yt-dot--y"></span>
                <span class="mh-yt-dot mh-yt-dot--g"></span>
              </div>
              <div class="mh-yt-url">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                youtube.com/watch?v=monsoonharvest
              </div>
            </div>

            <!-- YouTube UI -->
            <div class="mh-yt-ui">
              <!-- YT Header -->
              <div class="mh-yt-header">
                <div class="mh-yt-logo">
                  <svg viewBox="0 0 90 20" width="90" height="20">
                    <path d="M27.97 3.6S27.7 1.76 26.9 1c-.97-1.01-2.05-1.01-2.55-1.07C20.3-.4 14.03-.4 14.03-.4h-.06S7.7-.4 3.65.07c-.5.06-1.58.06-2.55 1.07C.3 1.76.03 3.6.03 3.6S-.25 5.76-.25 7.93v2.03c0 2.16.28 4.33.28 4.33s.27 1.84 1.07 2.6c1.02 1.07 2.35.98 2.95 1.09C6.1 18.19 14 18.25 14 18.25s6.3-.01 10.35-.48c.5-.06 1.58-.06 2.55-1.07.8-.76 1.07-2.6 1.07-2.6s.28-2.17.28-4.33V7.93c0-2.17-.28-4.33-.28-4.33zM11.12 12.5V5.42l6.88 3.55-6.88 3.53z" fill="#FF0000"/>
                    <path d="M33.4 12.43V14h-1.3V3.43h1.3v3.83A2.4 2.4 0 0135.3 6.1c.63 0 1.12.28 1.47.84.35.56.52 1.34.52 2.34v.54c0 1-.17 1.77-.52 2.33-.35.56-.84.84-1.47.84a2.4 2.4 0 01-1.9-1.56zm0-1.11c.25.5.6.76 1.05.76.43 0 .75-.22.96-.66.21-.44.31-1.09.31-1.95v-.53c0-.87-.1-1.52-.31-1.96-.21-.44-.53-.66-.96-.66-.45 0-.8.25-1.05.75v4.25zm5.9 2.5c-.38-.43-.57-1.07-.57-1.91V8.43l1.3-.2v3.32c0 .54.08.91.23 1.1.16.2.4.3.73.3.47 0 .84-.27 1.12-.8V6.24h1.3V14h-1.1l-.1-.93a1.9 1.9 0 01-1.63 1.07c-.54 0-.94-.22-1.28-.32zm6.74.21V7.23h-1.11V6.24h2.4V14h-1.29zm-.05-9.15V3.43h1.4v1.42h-1.4zm3.08 9.15V3.43h1.3V14h-1.3zm8.14 0h-1.3l-2.38-10.57h1.36l1.68 7.86 1.67-7.86h1.35L57.21 14zm4.18 0V6.24h1.3V14h-1.3zm-.05-9.15V3.43h1.4v1.42h-1.4zm5.8 9.3c-.74 0-1.3-.27-1.7-.8-.4-.54-.6-1.31-.6-2.32v-.7c0-1.04.2-1.84.6-2.38.4-.54.97-.81 1.7-.81.72 0 1.27.24 1.65.72.38.48.57 1.2.57 2.16v.8h-3.23v.4c0 .65.12 1.14.35 1.47.23.33.57.5 1 .5.3 0 .57-.06.8-.18.23-.12.44-.3.63-.54l.73.77c-.5.72-1.19 1.08-2.1 1.08zm-.01-6.2c-.4 0-.7.16-.92.47-.22.31-.34.77-.36 1.38h2.55v-.15c0-.58-.1-1.02-.3-1.3-.2-.27-.47-.4-.97-.4zm4.92 6.05l-.08-.72a1.83 1.83 0 01-1.6.87c-.52 0-.93-.17-1.22-.5-.3-.33-.44-.79-.44-1.38 0-.7.23-1.22.7-1.57.47-.35 1.15-.53 2.04-.53h.52v-.54c0-.42-.09-.72-.26-.91-.17-.19-.44-.29-.8-.29-.3 0-.54.07-.73.2a.7.7 0 00-.28.6l-1.3-.02c0-.57.2-1.02.62-1.36.41-.34.97-.51 1.69-.51.74 0 1.3.18 1.68.55.38.37.57.9.57 1.58V12.6c0 .5.05.98.15 1.4H66.1z" fill="#282828"/>
                  </svg>
                </div>
                <div class="mh-yt-search">
                  <input type="text" value="monsoon harvest ad" readonly class="mh-yt-search-input"/>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#666"><path d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" stroke="#666" stroke-width="2" fill="none"/></svg>
                </div>
              </div>

              <!-- Main player area -->
              <div class="mh-yt-main">
                <!-- Player -->
                <div class="mh-yt-player-wrap">
                  <div class="mh-yt-player">
                    <video
                      :ref="el => { if (el) mhVideoRefs[2] = el }"
                      :src="mhPosts[2].src"
                      class="mh-yt-video"
                      autoplay muted loop playsinline preload="auto"
                    ></video>
                    <!-- YT player controls bar -->
                    <div class="mh-yt-controls">
                      <div class="mh-yt-progress">
                        <div class="mh-yt-progress-bar" :style="{ width: mhProgressPct + '%' }"></div>
                      </div>
                      <div class="mh-yt-ctrl-row">
                        <div class="mh-yt-ctrl-left">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="11 19 2 12 11 5 11 19"/><line x1="22" y1="5" x2="22" y2="19"/></svg>
                          <span class="mh-yt-time">0:{{ String(mhVideoSec).padStart(2,'0') }} / 0:30</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
                        </div>
                        <div class="mh-yt-ctrl-right">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- View counter under player -->
                  <div class="mh-yt-video-info">
                    <h3 class="mh-yt-video-title">{{ mhPosts[2].title }}</h3>
                    <div class="mh-yt-video-meta">
                      <span class="mh-yt-views">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        {{ formatCount(mhCounters[2].views) }} views
                      </span>
                      <div class="mh-yt-actions">
                        <button class="mh-yt-action-btn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
                          {{ formatCount(mhCounters[2].likes) }}
                        </button>
                        <button class="mh-yt-action-btn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                          Share
                        </button>
                        <button class="mh-yt-action-btn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                          Save
                        </button>
                      </div>
                    </div>
                    <!-- Channel info -->
                    <div class="mh-yt-channel">
                      <div class="mh-yt-channel-avatar">MH</div>
                      <div class="mh-yt-channel-info">
                        <span class="mh-yt-channel-name">Monsoon Harvest</span>
                        <span class="mh-yt-channel-subs">{{ formatCount(mhCounters[2].subs) }} subscribers</span>
                      </div>
                      <button class="mh-yt-subscribe">Subscribe</button>
                    </div>
                  </div>
                </div>

                <!-- Sidebar suggestions -->
                <div class="mh-yt-sidebar">
                  <div class="mh-yt-suggestion" v-for="s in mhSuggestions" :key="s.title">
                    <div class="mh-yt-sug-thumb" :style="{ background: s.color }"></div>
                    <div class="mh-yt-sug-info">
                      <span class="mh-yt-sug-title">{{ s.title }}</span>
                      <span class="mh-yt-sug-channel">{{ s.channel }}</span>
                      <span class="mh-yt-sug-views">{{ s.views }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Meta + writeup -->
        <div class="vd-meta-strip">
          <div class="vd-meta-item"><span class="vd-meta-label">Client</span><span class="vd-meta-value">Monsoon Harvest</span></div>
          <div class="vd-meta-item"><span class="vd-meta-label">Agency</span><span class="vd-meta-value">Smitten Worldwide</span></div>
          <div class="vd-meta-item"><span class="vd-meta-label">Category</span><span class="vd-meta-value">Animated Ad Creatives</span></div>
          <div class="vd-meta-item"><span class="vd-meta-label">Tools</span><span class="vd-meta-value">After Effects, Illustrator, Photoshop</span></div>
          <div class="vd-meta-item"><span class="vd-meta-label">Formats</span><span class="vd-meta-value">Square (1:1), Widescreen (16:9)</span></div>
        </div>

        <div class="vd-case-section">
          <div class="vd-section-label">Overview</div>
          <div class="vd-section-content">
            <p>Animated ad creatives for Monsoon Harvest, a premium Australian health snack brand known for natural ingredients and clean-label positioning. Three ads produced across square and widescreen formats, each built around the product as hero, using motion to bring texture and freshness to life.</p>
            <p>The animation language was restrained and premium. Movement was used to suggest quality: ingredients settling, light catching texture, type appearing with weight and intention.</p>
          </div>
        </div>

        <div class="vd-detail-nav">
          <button class="vd-back-btn" @click="closeMH">← All Films</button>
        </div>
      </div>
    </div>
  </transition>


  <!-- ── FUNSKOOL POST LIGHTBOX ───────────────────────────── -->
  <transition name="lb-fade">
    <div v-if="expandedPost !== null" class="vd-post-lightbox" @click.self="collapsePost">
      <button class="lb-close" @click="collapsePost">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 3l14 14M17 3L3 17" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="vd-post-player">
        <video
          :ref="el => { expandedVideoRef = el }"
          :src="funskoolPosts[expandedPost].src"
          class="vd-post-video"
          autoplay
          loop
          playsinline
          controls
        ></video>
      </div>
      <div class="vd-post-info">
        <span class="vd-post-label">{{ funskoolPosts[expandedPost].title }}</span>
        <p class="vd-post-desc">{{ funskoolPosts[expandedPost].desc }}</p>
      </div>
    </div>
  </transition>

  <!-- ── YOUTUBE VIDEO DETAIL ───────────────────────────────── -->
  <transition name="detail-fade">
    <div v-if="activeVideo !== null" class="vd-detail">
      <div class="vd-theatre">
        <div class="vd-embed-wrap">
          <iframe
            :src="'https://www.youtube.com/embed/' + current.id + '?autoplay=1&rel=0&modestbranding=1'"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div class="vd-detail-body">
        <button class="vd-back-btn" @click="close">← Back to Films</button>
        <div class="vd-title-block">
          <span class="vd-detail-cat">{{ current.category }}</span>
          <h1 class="vd-detail-title">{{ current.title }}</h1>
          <p class="vd-detail-subtitle">{{ current.subtitle }}</p>
        </div>
        <div class="vd-meta-strip">
          <div class="vd-meta-item">
            <span class="vd-meta-label">Client</span>
            <span class="vd-meta-value">{{ current.client }}</span>
          </div>
          <div class="vd-meta-item">
            <span class="vd-meta-label">Year</span>
            <span class="vd-meta-value">{{ current.year }}</span>
          </div>
          <div class="vd-meta-item">
            <span class="vd-meta-label">Category</span>
            <span class="vd-meta-value">{{ current.category }}</span>
          </div>
          <div class="vd-meta-item" v-if="current.tools">
            <span class="vd-meta-label">Tools</span>
            <span class="vd-meta-value">{{ current.tools }}</span>
          </div>
          <div class="vd-meta-item" v-if="current.deliverables">
            <span class="vd-meta-label">Deliverables</span>
            <span class="vd-meta-value">{{ current.deliverables }}</span>
          </div>
        </div>
        <div v-for="(section, i) in current.sections" :key="i" class="vd-case-section">
          <div class="vd-section-label">{{ section.label }}</div>
          <div class="vd-section-content" v-html="section.content"></div>
        </div>
        <div class="vd-detail-nav">
          <button class="vd-back-btn" @click="close">← All Films</button>
          <button v-if="activeVideo < videos.length - 1" class="vd-next-btn" @click="open(activeVideo + 1)">
            Next Film →
          </button>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'Video',

  data() {
    return {
      activeVideo:      null,
      funskoolOpen:     false,
      expandedPost:     null,
      videoRefs:        [],
      expandedVideoRef: null,
      wheelAngle:       0,
      isSpinning:       false,
      wheelTimer:       null,
      wheelSpeed:       0.4,

      // Monsoon Harvest
      mhOpen:             false,
      mhVideoRefs:        [],
      mhCounterTimer:     null,
      mhProgressTimer:    null,
      mhVideoSec:         0,
      mhProgressPct:      0,

      mhCounters: [
        { views: 142800, likes: 8340  },
        { views: 98600,  likes: 6120  },
        { views: 231400, likes: 14200, subs: 48700 },
      ],

      mhSuggestions: [
        { title: 'Healthy Snacking in 2024',      channel: 'Clean Eating Hub',   views: '1.2M views',  color: '#2d5a27' },
        { title: 'Granola Bar Taste Test',        channel: 'Snack Review Co',    views: '856K views',  color: '#4a7c3f' },
        { title: 'Australian Snack Brands',       channel: 'FoodieAustralia',    views: '412K views',  color: '#8fbc5a' },
        { title: 'Banana Cluster Recipe',         channel: 'Wholesome Kitchen',  views: '234K views',  color: '#3d6b32' },
        { title: 'Best Natural Snacks 2024',      channel: 'Health Hacks Daily', views: '1.8M views',  color: '#5c9445' },
      ],

      mhPosts: [
        {
          title:   'Granola Bars, Ad V4',
          format:  '1 : 1  Square',
          src:     '/videos/mh/MH---Granola-Bars-Ad---V4.mp4',
          aspect:  '1/1',
          caption: 'Fuel your day the natural way 🌿 Our crunchy granola bars are made with real oats, honey, and nothing you can\'t pronounce. #MonsoonHarvest #CleanEating',
        },
        {
          title:   'Granola Bars, Ad V2',
          format:  '1 : 1  Square',
          src:     '/videos/mh/MH---Granola-Bras-Ad---V2.mp4',
          aspect:  '1/1',
          caption: 'Simple ingredients. Big flavour. 🌾 The snack that doesn\'t compromise. #MonsoonHarvest #NaturalSnacks #HealthyLiving',
        },
        {
          title:   'Monsoon Harvest, Banana Clusters',
          format:  '16 : 9  Widescreen',
          src:     '/videos/mh/MH---SBV-Banana-Clusters---V2.mp4',
          aspect:  '16/9',
          desc:    'Widescreen display ad for Banana Clusters, textural close-ups and natural product movement.',
        },
      ],

      funskoolPosts: [
        {
          title: 'Cupcake Party',
          src:   '/videos/funskool/Cupcake_party_post.mp4',
          desc:  'Animated product launch post for the baking playset, sweet, colourful, and paced for Reels.'
        },
        {
          title: 'Dough Alphabet',
          src:   '/videos/funskool/Dough_Alphabet_Post_V4.mp4',
          desc:  'Educational play content, letters come alive through stop-motion-inspired animation.'
        },
        {
          title: 'Easter Egg',
          src:   '/videos/funskool/Easter_Egg_post_V3.mp4',
          desc:  'Seasonal Easter campaign post, festive motion design timed to the holiday moment.'
        },
        {
          title: 'Ask Santa',
          src:   '/videos/funskool/Funskool_Ask_Santa.mp4',
          desc:  'Christmas campaign animation, building excitement around gifting season and product discovery.'
        },
        {
          title: 'Food Truck',
          src:   '/videos/funskool/Funskool---Food-Truck-Post---V2.mp4',
          desc:  'Product feature post for the Food Truck playset, dynamic cuts and bright colour palette.'
        },
        {
          title: 'My Clock',
          src:   '/videos/funskool/Funskool---My-Clock-Post---V1.mp4',
          desc:  'Learning-focused product post, animated clock faces teaching kids to tell time.'
        },
        {
          title: 'Strike 4',
          src:   '/videos/funskool/Strike_4_v3.mp4',
          desc:  'Game launch content, fast-paced edit built around competitive play energy.'
        },
      ],

      videos: [
        {
          id: 'LPFtsO1CuVQ',
          title: 'Deloitte, Learning in Motion',
          subtitle: 'Internal instructional motion graphics video for Deloitte employee training',
          client: 'Deloitte',
          year: '2023',
          category: 'Motion Graphics',
          tools: 'Adobe After Effects, Adobe Illustrator',
          deliverables: 'Full-length instructional video, motion graphics system, storyboard',
          size: 'wide',
          sections: [
            { label: 'Overview', content: '<p>An internal training video commissioned by Deloitte, designed to communicate complex procedural information in a way that was clear, engaging, and unmistakably on-brand. Every element was built from scratch: storyboard, illustration, animation, and sound, a cohesive system rather than slides with motion applied as an afterthought.</p>' },
            { label: 'Storyboard', content: '<p>The process started with pencil sketches. The entire narrative arc was mapped as rough thumbnail frames before opening After Effects. The decision to use simple geometric shapes as the core visual language came from this stage, abstract forms strip away the noise and force the message to carry the weight.</p>' },
            { label: 'Design & Motion', content: '<p>Working strictly within Deloitte\'s brand guidelines produced something that felt owned by the brand rather than borrowed from it. Motion timing was treated with the same discipline as layout, easing curves dialled to feel deliberate and calm. Nothing bounces, nothing overshoots.</p>' },
          ]
        },
        {
          id: '32hKGUPsk7g',
          title: 'ReadEase, Product Launch Film',
          subtitle: 'Explainer and pitch film for the ReadEase accessibility platform',
          client: 'ReadEase (Personal)',
          year: '2025',
          category: 'Brand Film',
          tools: 'Adobe Premiere Pro, After Effects, Pexels Stock Library',
          deliverables: 'Hero launch film, investor pitch video',
          size: 'normal',
          sections: [
            { label: 'Overview', content: '<p>ReadEase needed a film that could introduce the product to first-time users and make a compelling case to investors simultaneously. The brief was to communicate empathy, utility, and technological credibility without feeling clinical or remedial.</p>' },
            { label: 'Approach', content: '<p>Built entirely from stock footage sourced through Pexels. The visual language was deliberately contemporary and inclusive. Technology is woven into the narrative as a bridge, not a spectacle, the product solves something real, and the film makes that felt before it makes it understood.</p>' },
          ]
        },
        {
          id: 'KKN9RsGv2YY',
          title: 'I\'m Here',
          subtitle: 'A personal travel film shot across 10 cities on an iPhone 15',
          client: 'Personal',
          year: '2024',
          category: 'Personal Film',
          tools: 'iPhone 15, Adobe Premiere Pro',
          deliverables: 'Short film',
          size: 'wide',
          sections: [
            { label: 'Overview', content: '<p>Melbourne. Singapore. Bangalore. Salem. Coimbatore. Dubai. Seattle. Portland. Los Angeles. Melbourne again. Ten cities. One question underneath all of it: where do I fit?</p>' },
            { label: 'The Constraint', content: '<p>Shooting on a phone was a creative decision. There is no colour grade, the footage is exactly as the camera rendered it. The imperfections are the point. This is what those places actually looked like.</p>' },
            { label: 'The Idea', content: '<p>The search for belonging across continents only to arrive back where you started, and realise the answer was never geographic. <em>I\'m Here</em> is a declaration made after a long look around. Not a discovery of place, but of self.</p>' },
          ]
        },
        {
          id: 'IxPqinGQR8o',
          title: 'pH Projecct, pHact or pHiction',
          subtitle: 'Launch campaign film for pH Projecct\'s debut summer collection',
          client: 'pH Projecct (Freelance)',
          year: '2022',
          category: 'Campaign Edit',
          tools: 'Adobe Premiere Pro, After Effects',
          deliverables: 'Campaign launch film, social cutdowns',
          size: 'normal',
          sections: [
            { label: 'Overview', content: '<p>pHact or pHiction introduced both the brand and its debut summer collection to the world: fast, loud, and unapologetically confident. Full-service production, shot, edited, and colour graded from the ground up.</p>' },
            { label: 'Direction', content: '<p>Quick cuts timed to the music, colour that pops off the screen, movement that never sits still long enough to feel posed. The colour grade pushed the summer palette hard, warm, saturated, alive.</p>' },
          ]
        },
        {
          id: '2S42BNMtn1M',
          title: 'Moments',
          subtitle: 'A personal film, frames from life during the 2020 lockdowns',
          client: 'Personal',
          year: '2020',
          category: 'Personal Film',
          tools: 'Adobe Premiere Pro',
          deliverables: 'Short film',
          size: 'normal',
          sections: [
            { label: 'Overview', content: '<p>A collection of moments shot during the Covid lockdowns. Not a document of the pandemic, not a statement. Just frames from a life that had gone very quiet.</p>' },
            { label: 'Tone', content: '<p>Grainy, moody, a little underexposed. But the music holds something the images don\'t always show, hope underneath it. <em>Moments</em> is both a record of what was hard and a reminder that it was still a life worth filming.</p>' },
          ]
        },
        {
          id: 'Sc5d1SZilLs',
          title: 'XO, Shaq-T ft. Da$a',
          subtitle: 'No-budget music video shot, edited, and graded for independent hip-hop artists',
          client: 'Shaq-T & Da$a (Freelance)',
          year: '2020',
          category: 'Music Video',
          tools: 'Adobe Premiere Pro, After Effects',
          deliverables: 'Full music video, colour grade, visual effects',
          size: 'wide',
          sections: [
            { label: 'Overview', content: '<p>Shot, edited, colour graded, and finished with essentially no budget. The visual concept drew direct inspiration from ASAP Rocky\'s Forever video: a single rotating shot as the centrepiece, built around the artists rather than around resources.</p>' },
            { label: 'The Rig', content: '<p>The rotating shot required equipment that didn\'t exist in the budget, so it was built. A custom camera rig, constructed specifically for this shoot, made the signature visual possible without a single rental invoice.</p>' },
            { label: 'Post-Production', content: '<p>The colour grade pushed the footage into a filmic, high-contrast register. Effects were applied with restraint, used to reinforce moments rather than compensate for them.</p>' },
          ]
        },
      ],
    };
  },

  computed: {
    current() {
      return this.activeVideo !== null ? this.videos[this.activeVideo] : null;
    }
  },

  methods: {

    // ── Clock position per card ───────────────────────────────
    getClockStyle(i) {
      const total      = this.funskoolPosts.length;
      const angleDeg   = (i / total) * 360 - 90 + this.wheelAngle;
      const angleRad   = (angleDeg * Math.PI) / 180;
      const radius     = 320;
      const x          = Math.cos(angleRad) * radius;
      const y          = Math.sin(angleRad) * radius;
      const cardRotate = angleDeg + 90;

      const isExpanded = this.expandedPost === i;
      const isDimmed   = this.expandedPost !== null && !isExpanded;

      return {
        transform: isExpanded
          ? `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg) scale(1.15)`
          : `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${cardRotate}deg) scale(1)`,
        zIndex:     isExpanded ? 20 : 10,
        opacity:    isDimmed ? 0.2 : 1,
        transition: this.isSpinning
          ? 'transform 0.05s linear, opacity 0.3s ease'
          : 'transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.35s ease',
      };
    },

    // ── Wheel rotation ────────────────────────────────────────
    startWheel() {
      this.isSpinning = true;
      const spin = () => {
        if (!this.isSpinning) return;
        this.wheelAngle = (this.wheelAngle + this.wheelSpeed) % 360;
        this.wheelTimer = requestAnimationFrame(spin);
      };
      this.wheelTimer = requestAnimationFrame(spin);
    },

    stopWheel() {
      this.isSpinning = false;
      if (this.wheelTimer) {
        cancelAnimationFrame(this.wheelTimer);
        this.wheelTimer = null;
      }
    },

    // ── Funskool open / close ─────────────────────────────────
    openFunskool() {
      this.funskoolOpen = true;
      this.$nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => this.startWheel(), 400);
      });
    },

    closeFunskool() {
      this.stopWheel();
      this.collapsePost();
      this.funskoolOpen = false;
      this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },

    // ── Toggle individual post in lightbox ────────────────────
    togglePost(i) {
      if (this.expandedPost === i) {
        this.collapsePost();
      } else {
        this.stopWheel();
        this.expandedPost = i;
        this.$nextTick(() => {
          if (this.expandedVideoRef) {
            this.expandedVideoRef.currentTime = 0;
            this.expandedVideoRef.play();
          }
        });
      }
    },

    collapsePost() {
      this.expandedPost = null;
      setTimeout(() => this.startWheel(), 300);
    },

    // ── MH helpers ────────────────────────────────────────────
    formatCount(n) {
      if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
      if (n >= 1000)    return (n / 1000).toFixed(1)    + 'K';
      return n.toString();
    },

    startMHCounters() {
      this.mhCounterTimer = setInterval(() => {
        // Views tick up faster, likes slower
        this.mhCounters[0].views += Math.floor(Math.random() * 8 + 3);
        this.mhCounters[0].likes += Math.random() > 0.7 ? 1 : 0;
        this.mhCounters[1].views += Math.floor(Math.random() * 6 + 2);
        this.mhCounters[1].likes += Math.random() > 0.75 ? 1 : 0;
        this.mhCounters[2].views += Math.floor(Math.random() * 12 + 5);
        this.mhCounters[2].likes += Math.random() > 0.65 ? 1 : 0;
        this.mhCounters[2].subs  += Math.random() > 0.92 ? 1 : 0;
      }, 400);

      // Progress bar for YT video (30s loop)
      this.mhVideoSec    = 0;
      this.mhProgressPct = 0;
      this.mhProgressTimer = setInterval(() => {
        this.mhVideoSec    = (this.mhVideoSec + 1) % 30;
        this.mhProgressPct = ((this.mhVideoSec / 30) * 100);
      }, 1000);
    },

    stopMHCounters() {
      if (this.mhCounterTimer)  clearInterval(this.mhCounterTimer);
      if (this.mhProgressTimer) clearInterval(this.mhProgressTimer);
      this.mhCounterTimer  = null;
      this.mhProgressTimer = null;
    },

    // ── MH open / close ───────────────────────────────────────
    openMH() {
      this.mhOpen = true;
      this.$nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => this.startMHCounters(), 500);
      });
    },

    closeMH() {
      this.stopMHCounters();
      this.mhOpen = false;
      this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },

    // ── YouTube videos ────────────────────────────────────────
    open(index) {
      this.activeVideo = index;
      this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },

    close() {
      this.activeVideo = null;
      this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },
  },

  beforeUnmount() {
    this.stopWheel();
    this.stopMHCounters();
    this.videoRefs.forEach(v => { if (v) v.pause(); });
    this.mhVideoRefs.forEach(v => { if (v) v.pause(); });
  }
};
</script>

<style scoped>

/* ── PAGE HEADER ─────────────────────────────────────────────── */
.vd-header {
  width: 100%;
  padding: 8rem 6vw 4rem;
  background: #0a0a0a;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid #1e1e1e;
  margin-top: 70px;
}

.vd-eyebrow {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #444;
  font-family: Arial, sans-serif;
  margin-bottom: 1rem;
}

.vd-page-title {
  font-size: clamp(4rem, 10vw, 9rem);
  font-weight: 900;
  line-height: 0.9;
  color: #fff;
  letter-spacing: -0.03em;
  margin: 0 0 1.5rem 0;
  font-family: Arial, sans-serif;
}

.vd-page-desc {
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  color: #666;
  line-height: 1.7;
  max-width: 460px;
  font-family: Arial, sans-serif;
  margin: 0;
}

.vd-header-count {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #333;
  font-family: Arial, sans-serif;
  padding-bottom: 0.5rem;
}

/* ── POSTER GRID ─────────────────────────────────────────────── */
.vd-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 280px;
  gap: 3px;
  padding: 3px;
  background: #060606;
}

.vd-poster--wide   { grid-column: span 2; }
.vd-poster--normal { grid-column: span 1; }

.vd-poster {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: #111;
}

.vd-poster-img {
  position: absolute;
  inset: 0;
}

.vd-poster-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.55) saturate(0.8);
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease;
}

.vd-poster:hover .vd-poster-img img {
  transform: scale(1.06);
  filter: brightness(0.35) saturate(0.6);
}

/* ── FUNSKOOL TILE ───────────────────────────────────────────── */
.vd-funskool-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #f97316 0%, #ec4899 45%, #8b5cf6 100%);
  opacity: 0.9;
  transition: opacity 0.4s ease;
}

.vd-poster--funskool:hover .vd-funskool-bg { opacity: 0.7; }

/* Spinning dots clock indicator */
.vd-clock-hint {
  position: absolute;
  top: 50%;
  right: 2.5rem;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  z-index: 3;
  opacity: 0.6;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.vd-poster--funskool:hover .vd-clock-hint {
  opacity: 1;
  transform: translateY(-50%) scale(1.15);
}

.vd-clock-ring {
  position: relative;
  width: 100%;
  height: 100%;
  animation: spin-ring 6s linear infinite;
}

.vd-clock-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255,255,255,0.9);
  border-radius: 50%;
  transform-origin: 0 0;
  margin: -2.5px 0 0 -2.5px;
}

@keyframes spin-ring {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ── GRAIN + OVERLAY (shared) ────────────────────────────────── */
.vd-poster-grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
}

.vd-poster-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.2rem 1.4rem;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%);
  transition: background 0.35s ease;
}

.vd-poster:hover .vd-poster-overlay {
  background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.92) 100%);
}

.vd-poster-top { display: flex; justify-content: space-between; align-items: flex-start; }

.vd-poster-cat {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  font-family: Arial, sans-serif;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.vd-poster:hover .vd-poster-cat { opacity: 1; }

.vd-play-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.3s ease, transform 0.3s ease, border-color 0.2s ease;
}

.vd-poster:hover .vd-play-icon {
  opacity: 1;
  transform: scale(1);
  border-color: rgba(255,255,255,0.7);
}

.vd-poster-bottom { display: flex; flex-direction: column; gap: 0.2rem; }

.vd-poster-client {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  font-family: Arial, sans-serif;
}

.vd-poster-title {
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 900;
  color: #fff;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.01em;
  font-family: Arial, sans-serif;
}

.vd-poster-sub {
  font-size: 0.76rem;
  color: rgba(255,255,255,0.5);
  margin: 0.2rem 0 0.4rem;
  line-height: 1.4;
  font-family: Arial, sans-serif;
  max-width: 280px;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
}

.vd-poster:hover .vd-poster-sub { opacity: 1; transform: translateY(0); }

.vd-poster-cta {
  font-size: 0.72rem;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
  font-family: Arial, sans-serif;
  letter-spacing: 0.06em;
  opacity: 0;
  transition: opacity 0.3s ease 0.1s;
  width: fit-content;
}

.vd-poster:hover .vd-poster-cta { opacity: 1; }

/* ── FUNSKOOL SHOWCASE ───────────────────────────────────────── */
.vd-funskool-showcase {
  width: 100%;
  background: #0a0a0a;
  min-height: 100vh;
  padding-top: 70px;
}

/* ── CLOCK STAGE ─────────────────────────────────────────────── */
.vd-clock-stage {
  position: relative;
  width: 100%;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0 3rem;
  overflow: visible;
}

/* Centre marker */
.vd-clock-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  pointer-events: none;
}

.vd-clock-center-ring {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 1px solid #2a2a2a;
  background: radial-gradient(circle, #1a1a1a, #0a0a0a);
}

.vd-clock-center-text {
  font-family: Arial, sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #333;
  white-space: nowrap;
}

/* Individual clock card, square and bigger */
.vd-clock-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 170px;
  cursor: pointer;
  will-change: transform, opacity;
}

.vd-clock-card-inner {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4);
  border: 1.5px solid rgba(255,255,255,0.07);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.vd-clock-card:hover .vd-clock-card-inner {
  box-shadow: 0 16px 48px rgba(0,0,0,0.8);
  border-color: rgba(255,255,255,0.25);
}

.vd-clock-card--expanded .vd-clock-card-inner {
  border-color: rgba(255,255,255,0.4);
  box-shadow: 0 24px 72px rgba(0,0,0,0.9);
}

.vd-clock-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.vd-clock-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0.75rem 0.7rem;
  opacity: 0;
  transition: opacity 0.22s ease;
}

.vd-clock-card:hover .vd-clock-card-overlay,
.vd-clock-card--expanded .vd-clock-card-overlay {
  opacity: 1;
}

.vd-clock-card-title {
  font-family: Arial, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.04em;
  line-height: 1.3;
  display: block;
  margin-bottom: 0.4rem;
}

.vd-clock-expand-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  flex-shrink: 0;
}

/* ── POST LIGHTBOX, square player ──────────────────────────── */
.vd-post-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.94);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
}

.lb-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255,255,255,0.08);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.lb-close:hover { background: rgba(255,255,255,0.18); }

.vd-post-player {
  width: min(480px, 85vw);
  aspect-ratio: 1 / 1;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,0.9);
  background: #000;
}

.vd-post-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.vd-post-info { text-align: center; max-width: 480px; }

.vd-post-label {
  display: block;
  font-family: Arial, sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.vd-post-desc {
  font-family: Arial, sans-serif;
  font-size: 0.85rem;
  color: #666;
  line-height: 1.65;
  margin: 0;
}

/* ── DETAIL BODY (shared) ────────────────────────────────────── */
.vd-detail {
  width: 100%;
  background: #0a0a0a;
  min-height: 100vh;
}

.vd-theatre {
  width: 100%;
  background: #000;
  padding: 4rem 0 0;
  margin-top: 70px;
}

.vd-embed-wrap {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  background: #000;
}

.vd-embed-wrap iframe {
  width: 100%;
  height: 100%;
  display: block;
  border: none;
}

.vd-detail-body {
  max-width: 960px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.vd-back-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 700;
  color: #555;
  letter-spacing: 0.06em;
  font-family: Arial, sans-serif;
  padding: 0;
  margin-bottom: 3rem;
  display: block;
  transition: color 0.2s;
}

.vd-back-btn:hover { color: #fff; }

.vd-title-block { margin-bottom: 3rem; }

.vd-detail-cat {
  display: block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #444;
  font-family: Arial, sans-serif;
  margin-bottom: 0.8rem;
}

.vd-detail-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  color: #fff;
  margin: 0 0 0.75rem 0;
  line-height: 1;
  letter-spacing: -0.03em;
  font-family: Arial, sans-serif;
}

.vd-detail-subtitle {
  font-size: clamp(0.9rem, 1.3vw, 1.05rem);
  color: #555;
  line-height: 1.65;
  margin: 0;
  max-width: 560px;
  font-family: Arial, sans-serif;
}

.vd-meta-strip {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
  padding: 2rem 0;
  border-top: 1px solid #1e1e1e;
  border-bottom: 1px solid #1e1e1e;
  margin-bottom: 4rem;
}

.vd-meta-item { display: flex; flex-direction: column; gap: 0.3rem; }

.vd-meta-label {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #333;
  font-family: Arial, sans-serif;
}

.vd-meta-value {
  font-size: 0.88rem;
  font-weight: 600;
  color: #ccc;
  font-family: Arial, sans-serif;
  max-width: 220px;
  line-height: 1.4;
}

.vd-case-section {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 2rem;
  align-items: start;
  margin-bottom: 3.5rem;
}

.vd-section-label {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #333;
  font-family: Arial, sans-serif;
  padding-top: 0.3rem;
  position: sticky;
  top: 100px;
}

.vd-section-content {
  font-size: 1rem;
  color: #888;
  line-height: 1.85;
  font-family: Arial, sans-serif;
}

.vd-section-content p { margin: 0 0 1.1rem 0; }
.vd-section-content p:last-child { margin: 0; }

.vd-detail-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 3rem;
  border-top: 1px solid #1e1e1e;
  margin-top: 2rem;
}

.vd-detail-nav .vd-back-btn { margin-bottom: 0; }

.vd-next-btn {
  background: #fff;
  color: #000;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  font-family: Arial, sans-serif;
  padding: 0.85rem 2rem;
  border-radius: 999px;
  transition: background 0.2s ease;
}

.vd-next-btn:hover { background: #e0e0e0; }

/* ── TRANSITIONS ─────────────────────────────────────────────── */
.grid-fade-enter-active,   .grid-fade-leave-active   { transition: opacity 0.3s ease; }
.grid-fade-enter-from,     .grid-fade-leave-to       { opacity: 0; }
.detail-fade-enter-active, .detail-fade-leave-active { transition: opacity 0.35s ease, transform 0.35s ease; }
.detail-fade-enter-from,   .detail-fade-leave-to     { opacity: 0; transform: translateY(10px); }
.lb-fade-enter-active,     .lb-fade-leave-active     { transition: opacity 0.25s ease; }
.lb-fade-enter-from,       .lb-fade-leave-to         { opacity: 0; }

/* ── MONSOON HARVEST TILE ────────────────────────────────────── */
.vd-poster--mh { cursor: pointer; }

.vd-mh-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #2d5a27 0%, #4a7c3f 40%, #8fbc5a 100%);
  opacity: 0.9;
  transition: opacity 0.4s ease;
}

.vd-poster--mh:hover .vd-mh-bg { opacity: 0.7; }

.vd-deck-hint {
  position: absolute;
  top: 50%;
  right: 2.5rem;
  transform: translateY(-50%);
  width: 44px;
  height: 56px;
  z-index: 3;
  opacity: 0.6;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.vd-poster--mh:hover .vd-deck-hint {
  opacity: 1;
  transform: translateY(-50%) scale(1.12);
}

.vd-deck-card {
  position: absolute;
  width: 38px;
  height: 52px;
  border-radius: 5px;
  border: 1.5px solid rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.1);
}

.vd-deck-card--1 { top: 0;   left: 0;   transform: rotate(-5deg); z-index: 3; }
.vd-deck-card--2 { top: 2px; left: 3px; transform: rotate(0deg);  z-index: 2; }
.vd-deck-card--3 { top: 4px; left: 6px; transform: rotate(5deg);  z-index: 1; }

/* ── MH SHOWCASE ─────────────────────────────────────────────── */
.vd-mh-showcase {
  width: 100%;
  background: #0a0a0a;
  min-height: 100vh;
  padding-top: 70px;
}

/* ── INSTAGRAM ROW ───────────────────────────────────────────── */
.mh-ig-row {
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0 3rem;
  flex-wrap: wrap;
}

.mh-ig-phone {
  width: 300px;
  flex-shrink: 0;
}

.mh-phone-frame {
  background: #1a1a1a;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid #2a2a2a;
  box-shadow:
    0 32px 80px rgba(0,0,0,0.7),
    0 0 0 1px rgba(255,255,255,0.05),
    inset 0 1px 0 rgba(255,255,255,0.08);
}

/* Status bar */
.mh-phone-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px 4px;
  background: #000;
}

.mh-status-time {
  font-family: Arial, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  color: #fff;
}

.mh-status-icons {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Instagram header */
.mh-ig-chrome { background: #000; }

.mh-ig-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  border-bottom: 1px solid #1a1a1a;
}

.mh-ig-header-icons {
  display: flex;
  gap: 14px;
}

/* Stories strip */
.mh-ig-stories {
  display: flex;
  gap: 14px;
  padding: 10px 12px;
  overflow: hidden;
  border-bottom: 1px solid #1a1a1a;
}

.mh-story-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.mh-story-ring {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mh-story-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #2d5a27;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  color: #fff;
}

.mh-story-label {
  font-family: Arial, sans-serif;
  font-size: 0.55rem;
  color: #fff;
  white-space: nowrap;
}

/* Post */
.mh-ig-post { background: #000; }

.mh-post-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
}

.mh-post-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2d5a27, #8fbc5a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  font-size: 0.55rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.mh-post-account { display: flex; flex-direction: column; gap: 1px; }

.mh-post-handle {
  font-family: Arial, sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  color: #fff;
}

.mh-post-sponsored {
  font-family: Arial, sans-serif;
  font-size: 0.55rem;
  color: #888;
}

/* Video square */
.mh-ig-video-wrap {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #111;
  overflow: hidden;
}

.mh-ig-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Action bar */
.mh-post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px 4px;
}

.mh-action-left {
  display: flex;
  gap: 14px;
  align-items: center;
}

/* Post stats */
.mh-post-stats {
  padding: 0 12px 2px;
}

.mh-likes {
  font-family: Arial, sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  color: #fff;
}

.mh-post-caption {
  padding: 0 12px 4px;
  font-family: Arial, sans-serif;
  font-size: 0.62rem;
  color: #ccc;
  line-height: 1.45;
}

.mh-caption-handle {
  font-weight: 700;
  color: #fff;
  margin-right: 4px;
}

.mh-post-views {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 12px 10px;
  font-family: Arial, sans-serif;
  font-size: 0.62rem;
  font-weight: 600;
  color: #4a9e3f;
}

/* ── YOUTUBE MOCKUP ──────────────────────────────────────────── */
.mh-yt-section {
  padding: 1rem 0 3rem;
}

.mh-yt-browser {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.5);
  max-width: 960px;
  margin: 0 auto;
}

.mh-yt-browser-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: #f1f3f4;
  border-bottom: 1px solid #e0e0e0;
}

.mh-yt-dots { display: flex; gap: 6px; flex-shrink: 0; }

.mh-yt-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.mh-yt-dot--r { background: #ff5f57; }
.mh-yt-dot--y { background: #febc2e; }
.mh-yt-dot--g { background: #28c840; }

.mh-yt-url {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 4px 12px;
  font-family: Arial, sans-serif;
  font-size: 0.7rem;
  color: #666;
  max-width: 480px;
}

/* YouTube UI */
.mh-yt-ui { background: #0f0f0f; }

.mh-yt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #0f0f0f;
  border-bottom: 1px solid #272727;
  gap: 12px;
}

.mh-yt-logo { flex-shrink: 0; }

.mh-yt-search {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 40px;
  padding: 6px 14px;
  max-width: 400px;
}

.mh-yt-search-input {
  background: none;
  border: none;
  outline: none;
  font-family: Arial, sans-serif;
  font-size: 0.78rem;
  color: #fff;
  width: 100%;
}

/* Main + sidebar layout */
.mh-yt-main {
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 0;
}

.mh-yt-player-wrap { padding: 12px 12px 0; }

/* Player */
.mh-yt-player {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.mh-yt-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* YT controls overlay */
.mh-yt-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.85));
  padding: 16px 12px 8px;
}

.mh-yt-progress {
  width: 100%;
  height: 3px;
  background: rgba(255,255,255,0.2);
  border-radius: 2px;
  margin-bottom: 8px;
  cursor: pointer;
  position: relative;
}

.mh-yt-progress-bar {
  height: 100%;
  background: #ff0000;
  border-radius: 2px;
  transition: width 0.9s linear;
}

.mh-yt-ctrl-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mh-yt-ctrl-left,
.mh-yt-ctrl-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mh-yt-time {
  font-family: Arial, sans-serif;
  font-size: 0.65rem;
  color: #fff;
  white-space: nowrap;
}

/* Video info below player */
.mh-yt-video-info { padding: 10px 12px 12px; }

.mh-yt-video-title {
  font-family: Arial, sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 6px;
  line-height: 1.3;
}

.mh-yt-video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 6px;
}

.mh-yt-views {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: Arial, sans-serif;
  font-size: 0.72rem;
  color: #22c55e;
  font-weight: 600;
}

.mh-yt-actions {
  display: flex;
  gap: 4px;
}

.mh-yt-action-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #272727;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  font-family: Arial, sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
}

/* Channel row */
.mh-yt-channel {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid #272727;
}

.mh-yt-channel-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2d5a27, #8fbc5a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.mh-yt-channel-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
}

.mh-yt-channel-name {
  font-family: Arial, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  color: #fff;
}

.mh-yt-channel-subs {
  font-family: Arial, sans-serif;
  font-size: 0.62rem;
  color: #aaa;
}

.mh-yt-subscribe {
  background: #ff0000;
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  font-family: Arial, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  flex-shrink: 0;
}

/* Sidebar suggestions */
.mh-yt-sidebar {
  padding: 12px 10px;
  background: #0f0f0f;
  border-left: 1px solid #1a1a1a;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.mh-yt-suggestion {
  display: flex;
  gap: 8px;
  cursor: pointer;
}

.mh-yt-sug-thumb {
  width: 90px;
  height: 54px;
  border-radius: 6px;
  flex-shrink: 0;
  opacity: 0.7;
}

.mh-yt-sug-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mh-yt-sug-title {
  font-family: Arial, sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mh-yt-sug-channel,
.mh-yt-sug-views {
  font-family: Arial, sans-serif;
  font-size: 0.58rem;
  color: #aaa;
}

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media (max-width: 1100px) {
  .vd-clock-stage { height: 780px; }
  .vd-clock-card  { width: 140px; }
}

@media (max-width: 1024px) {
  .vd-grid { grid-template-columns: repeat(3, 1fr); grid-auto-rows: 240px; }
}

@media (max-width: 768px) {
  .vd-header { padding: 6rem 1.5rem 3rem; flex-direction: column; align-items: flex-start; gap: 1rem; }
  .vd-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 200px; gap: 2px; padding: 2px; }
  .vd-poster--wide { grid-column: span 2; }
  .vd-poster-cat, .vd-play-icon, .vd-poster-sub, .vd-poster-cta { opacity: 1 !important; transform: none !important; }
  .vd-clock-stage { height: 560px; }
  .vd-clock-card  { width: 96px; }
  .vd-theatre { padding: 3rem 0 0; }
  .vd-embed-wrap { max-width: 100%; }
  .vd-detail-body { padding: 2rem 1.5rem 4rem; }
  .vd-case-section { grid-template-columns: 1fr; gap: 0.6rem; }
  .vd-section-label { position: static; }
  .vd-meta-strip { gap: 1.5rem; }
  .vd-detail-nav { flex-direction: column; align-items: flex-start; gap: 1rem; }
}

@media (max-width: 480px) {
  .vd-grid { grid-template-columns: 1fr; grid-auto-rows: 220px; }
  .vd-poster--wide { grid-column: 1; }
  .vd-clock-stage { height: 460px; }
  .vd-clock-card  { width: 78px; }
}
</style>