// Voice Note Transcriber — Client Interaction & Localization
document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Localization Dictionary (Zero Emoji, Natural Professional Tone) ---
  const translations = {
    en: {
      'nav.overview': 'Overview',
      'nav.simulator': 'Live Simulator',
      'nav.architecture': 'Architecture',
      'nav.installation': 'Installation',
      'nav.audit': 'Security Audit',

      'hero.status': 'Brave & Chromium Extension • Zero Data Retention',
      'hero.heading': 'On-demand transcription for WhatsApp Web voice notes',
      'hero.description': 'Converts selected incoming voice messages to text without audio playback leaks, background conversation scraping, or credential exposure. Powered by Groq Whisper Large v3 and native operating system keyrings.',
      'hero.ctaCode': 'View Source & Setup',
      'hero.ctaSimulator': 'Launch Simulator',

      'specs.engine': 'Engine',
      'specs.latency': 'Inference',
      'specs.capture': 'Audio Hook',
      'specs.secrets': 'Secrets',

      'sim.subtitle': 'WhatsApp Web session',
      'sim.pill': 'Messages are end-to-end encrypted',
      'sim.msg1': 'The audit confirmed that Groq Zero Data Retention is active. Can you confirm the audio capture hook never plays out loud?',
      'sim.btnLabel': 'Transcribe',
      'sim.engineTag': 'Whisper Large v3',
      'sim.actionRefresh': 'Refresh',
      'sim.actionCopy': 'Copy',
      'sim.transcribedText': '"Exactly right. The detached Audio hook mutes the media channel before source resolution, suppresses native play(), and leaves the message paused at time zero. Zero audio bytes leak into the room."',
      'sim.msgOut': 'Excellent. The transcript renders directly inside the message bubble and avoids clock overlap.',
      'sim.caption': 'Click the "Transcribe" button inside the message bubble above to trigger the simulated flow.',

      'arch.title': 'Security & Technical Architecture',
      'arch.subtitle': 'Designed specifically to prevent WhatsApp Web chat scraping, audio eavesdropping, and plain-text credential leaks.',
      'arch.c1Title': 'MAIN-World Detached Audio Hook',
      'arch.c1Desc': 'WhatsApp Web isolates decrypted voice streams in headless JavaScript Audio instances rather than DOM audio tags. The extension intercepts the in-memory blob: URL at document start, sets media volume to zero, and resets position before dispatch.',
      'arch.c2Title': 'Loopback-Only Node.js Helper',
      'arch.c2Desc': 'Third-party API credentials never touch browser storage or extension content scripts. Audio arrays pass through 127.0.0.1:4318 over a restricted loopback origin with strictly validated Opus/OGG headers.',
      'arch.c3Title': 'Native OS Secret Storage',
      'arch.c3Desc': 'When persistent authentication is enabled, the Groq API key is written directly to the operating system credential vault (GNOME Keyring on Linux, macOS Keychain, or Windows Credential Manager) with filesystem mode 0600.',
      'arch.c4Title': 'Account-Level Zero Data Retention',
      'arch.c4Desc': 'Inference uses Groq Speech-to-Text endpoint under configured Zero Data Retention. Neither audio bytes nor textual output are stored on disk, logged in server output, or cached in cloud databases.',

      'setup.title': 'Setup & Deployment',
      'setup.subtitle': 'Three steps to run the helper daemon and install the unpacked extension in Brave or Chrome.',
      'setup.step1Header': '1. Start Local Helper Daemon',
      'setup.step1Text': 'Clone the open-source repository and start the local helper server. It binds strictly to 127.0.0.1:4318.',
      'setup.step2Header': '2. Load Extension in Browser',
      'setup.step2Text': 'Open your browser extension manager and enable Developer Mode:',
      'setup.step3Header': '3. Authorize via Local Setup Page',
      'setup.step3Text': 'Navigate to http://127.0.0.1:4318/setup in your browser. Enter your Groq API key once. The helper verifies authentication against Groq and stores the credential in your system vault.',

      'audit.title': 'Data Privacy Matrix',
      'audit.subtitle': 'Comparing the architectural guarantees of Voice Note Transcriber against conventional transcription methods.',

      'footer.legal': 'Independent open-source project. Not affiliated with, authorized, or endorsed by WhatsApp, Meta Platforms, Inc., Brave Software, or Groq, Inc.'
    },

    az: {
      'nav.overview': 'İcmal',
      'nav.simulator': 'Canlı Simulyator',
      'nav.architecture': 'Arxitektura',
      'nav.installation': 'Quraşdırma',
      'nav.audit': 'Təhlükəsizlik Auditi',

      'hero.status': 'Brave və Chromium Əlavəsi • Sıfır Məlumat Saxlanması',
      'hero.heading': 'WhatsApp Web səsli mesajları üçün səssiz transkripsiya',
      'hero.description': 'Seçilmiş səsli mesajları otağa səs yaymadan, çatları qeydə almadan və API açarlarını brauzerə çıxarmadan mətnə çevirir. Groq Whisper Large v3 və əməliyyat sisteminin etibarlı şifrə anbarı ilə işləyir.',
      'hero.ctaCode': 'Mənbə Kodu və Quraşdırma',
      'hero.ctaSimulator': 'Simulyatoru Başlat',

      'specs.engine': 'Model',
      'specs.latency': 'İnfrans',
      'specs.capture': 'Audio Hook',
      'specs.secrets': 'Açarlar',

      'sim.subtitle': 'WhatsApp Web sessiyası',
      'sim.pill': 'Mesajlar uçdan-uca şifrələnir',
      'sim.msg1': 'Audit təsdiq etdi ki, Groq Zero Data Retention aktivdir. Audio hook-un otağa heç vaxt səs buraxmadığını təsdiq edə bilərsiniz?',
      'sim.btnLabel': 'Transkript',
      'sim.engineTag': 'Whisper Large v3',
      'sim.actionRefresh': 'Yenilə',
      'sim.actionCopy': 'Kopyala',
      'sim.transcribedText': '"Tam doğrudur. Detached Audio hook-u media mənbəyini oxumamışdan əvvəl audionu səssizləşdirir, native play() çağırılmır və mesaj dərhal sıfır saniyəyə qaytarılır. Heç bir səs baytı otağa yayılmır."',
      'sim.msgOut': 'Mükəmməl. Transkript birbaşa mesaj bubble-ı daxilində oxundu, saat göstəricisi ilə də toqquşmur.',
      'sim.caption': 'Simulyasiyanı işə salmaq üçün yuxarıdakı mesaj qutusundakı "Transkript" düyməsinə klikləyin.',

      'arch.title': 'Təhlükəsizlik və Texniki Arxitektura',
      'arch.subtitle': 'WhatsApp Web çatlarının oxunmasının, audio sızmalarının və açıq mətnli açar təhlükələrinin qarşısını almaq üçün xüsusi olaraq layihələndirilib.',
      'arch.c1Title': 'MAIN-World Detached Audio Hook',
      'arch.c1Desc': 'WhatsApp Web səs axınlarını DOM teqlərində deyil, fonda Audio obyektlərində saxlayır. Extension document_start anında decrypted blob: URL-i tutur, səsi sıfırlayır və səs çıxmadan dərhal dayandırır.',
      'arch.c2Title': 'Yalnız Loopback Node.js Köməkçisi',
      'arch.c2Desc': 'Kənar API açarları brauzer yaddaşına və ya content script-ə düşmür. Audio baytları yalnız 127.0.0.1:4318 ünvanında işləyən yerli serverdən və Opus/OGG yoxlamasından keçir.',
      'arch.c3Title': 'Əməliyyat Sisteminin Şifrə Anbarı',
      'arch.c3Desc': 'Açar daimi saxlanıldıqda birbaşa əməliyyat sisteminin rəsmi anbarına (Linux GNOME Keyring, macOS Keychain, Windows Credential Vault) 0600 icazəsi ilə yazılır.',
      'arch.c4Title': 'Hesab Səviyyəsində Sıfır Məlumat Saxlanması',
      'arch.c4Desc': 'Transkripsiya Groq-un rəsmi Zero Data Retention siyasəti altında işləyir. Nə audio baytları, nə də çıxarılan mətn diskə, server loqlarına və ya kənar bazalara yazılmır.',

      'setup.title': 'Quraşdırma və İşə Salma',
      'setup.subtitle': 'Yerli serveri işə salmaq və unpacked extension-ı Brave və ya Chrome-a yükləmək üçün 3 addım.',
      'setup.step1Header': '1. Yerli Serveri Başladın',
      'setup.step1Text': 'Açıq qaynaqlı repozitoriyanı klonlayın və köməkçi serveri işə salın. Yalnız 127.0.0.1:4318 ünvanına bağlanır.',
      'setup.step2Header': '2. Extension-ı Brauzerə Yükləyin',
      'setup.step2Text': 'Brauzerin əlavələr menecerini açın və Developer rejimini aktivləşdirin:',
      'setup.step3Header': '3. Yerli Setup Səhifəsindən Təsdiq Edin',
      'setup.step3Text': 'Brauzerdə http://127.0.0.1:4318/setup ünvanına daxil olun. Groq API açarınızı daxil edin. Köməkçi açarı yoxlayaraq sisteminizin etibarlı anbarında saxlayır.',

      'audit.title': 'Məlumat Məxfiliyi Matrisi',
      'audit.subtitle': 'Voice Note Transcriber arxitekturasının ənənəvi transkripsiya metodları ilə müqayisəsi.',

      'footer.legal': 'Müstəqil açıq qaynaqlı layihədir. WhatsApp, Meta Platforms, Inc., Brave Software və ya Groq, Inc. ilə heç bir rəsmi bağlılığı yoxdur.'
    }
  };

  let activeLang = 'en';

  function setLanguage(lang) {
    activeLang = lang;
    const dict = translations[lang] || translations.en;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    const langLabel = document.getElementById('lang-label');
    if (langLabel) {
      langLabel.textContent = lang === 'en' ? 'AZ' : 'EN';
    }
    document.documentElement.lang = lang;
  }

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      setLanguage(activeLang === 'en' ? 'az' : 'en');
    });
  }

  // --- 2. Theme Switching ---
  const themeBtn = document.getElementById('theme-toggle');
  const sunIcon = document.querySelector('.icon-theme-sun');
  const moonIcon = document.querySelector('.icon-theme-moon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vnt-theme', theme);
    if (sunIcon && moonIcon) {
      sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
      moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
    }
  }

  const savedTheme = localStorage.getItem('vnt-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // --- 3. WhatsApp Audio Player & Extension Simulator ---
  const simPlayBtn = document.getElementById('sim-play-btn');
  const simIconPlay = document.getElementById('sim-icon-play');
  const simIconPause = document.getElementById('sim-icon-pause');
  const waveformBars = document.querySelectorAll('#sim-waveform .wf-bar');

  let isPlaying = false;
  let waveTimer = null;

  function toggleAudioSimulation() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      if (simIconPlay) simIconPlay.style.display = 'none';
      if (simIconPause) simIconPause.style.display = 'block';

      let currentBar = 0;
      waveTimer = setInterval(() => {
        waveformBars.forEach((bar, idx) => {
          if (idx <= currentBar) {
            bar.classList.add('past');
          } else {
            bar.classList.remove('past');
          }
        });
        currentBar = (currentBar + 1) % waveformBars.length;
      }, 180);
    } else {
      if (simIconPlay) simIconPlay.style.display = 'block';
      if (simIconPause) simIconPause.style.display = 'none';
      clearInterval(waveTimer);
    }
  }

  if (simPlayBtn) {
    simPlayBtn.addEventListener('click', toggleAudioSimulation);
  }

  // --- 4. Transcription Hook Simulation ---
  const simTriggerBtn = document.getElementById('sim-trigger-btn');
  const simTriggerLabel = document.getElementById('sim-trigger-label');
  const simTranscriptPanel = document.getElementById('sim-transcript-panel');
  const simBtnRefresh = document.getElementById('sim-btn-refresh');
  const simBtnCopy = document.getElementById('sim-btn-copy');
  const simTranscriptText = document.getElementById('sim-transcript-text');

  function runTranscriptSimulation() {
    if (!simTriggerBtn || !simTranscriptPanel) return;

    simTriggerBtn.classList.add('is-loading');
    simTriggerLabel.textContent = activeLang === 'az' ? 'Audio tutulur...' : 'Extracting audio...';

    setTimeout(() => {
      simTriggerLabel.textContent = activeLang === 'az' ? 'Whisper çevirir...' : 'Whisper inferencing...';
    }, 450);

    setTimeout(() => {
      simTriggerBtn.style.display = 'none';
      simTranscriptPanel.style.display = 'block';
      simTriggerBtn.classList.remove('is-loading');
    }, 1100);
  }

  if (simTriggerBtn) {
    simTriggerBtn.addEventListener('click', runTranscriptSimulation);
  }

  if (simBtnRefresh) {
    simBtnRefresh.addEventListener('click', () => {
      simTranscriptPanel.style.display = 'none';
      simTriggerBtn.style.display = 'inline-flex';
      simTriggerLabel.textContent = activeLang === 'az' ? 'Transkript' : 'Transcribe';
      runTranscriptSimulation();
    });
  }

  if (simBtnCopy) {
    simBtnCopy.addEventListener('click', () => {
      const text = simTranscriptText ? simTranscriptText.innerText.replace(/"/g, '') : '';
      navigator.clipboard.writeText(text).then(() => {
        const prev = simBtnCopy.textContent;
        simBtnCopy.textContent = activeLang === 'az' ? 'Kopyalandı' : 'Copied';
        simBtnCopy.style.borderColor = 'var(--brand-wa)';
        simBtnCopy.style.color = 'var(--brand-wa)';
        setTimeout(() => {
          simBtnCopy.textContent = prev;
          simBtnCopy.style.borderColor = '';
          simBtnCopy.style.color = '';
        }, 1600);
      });
    });
  }

  // --- 5. Terminal Code Copy Button ---
  document.querySelectorAll('.terminal-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-copy');
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          const original = btn.textContent;
          btn.textContent = 'Copied';
          btn.style.borderColor = 'var(--brand-wa)';
          btn.style.color = 'var(--brand-wa)';
          setTimeout(() => {
            btn.textContent = original;
            btn.style.borderColor = '';
            btn.style.color = '';
          }, 1800);
        });
      }
    });
  });
});
