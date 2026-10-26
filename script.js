// Voice Note Transcriber — Interactive Logic & Localization
document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Localization Dictionary ---
  const i18n = {
    en: {
      'nav.features': 'Features',
      'nav.demo': 'Interactive Demo',
      'nav.howItWorks': 'How It Works',
      'nav.setup': 'Quick Setup',
      'nav.security': 'Privacy & Security',

      'hero.badge': '100% Silent In-Memory Capture • Zero Data Retention',
      'hero.title': 'Read WhatsApp Voice Notes <span class="highlight">Without Playing Them Aloud</span>',
      'hero.lead': 'A privacy-conscious browser extension for Brave and Chrome. Converts voice messages into text on demand using Groq Whisper Large v3 — without unmuting audio, logging chats, or exposing your credentials.',
      'hero.ctaPrimary': 'Get Extension on GitHub',
      'hero.ctaSecondary': 'Try Interactive Demo',

      'trust.silentTitle': 'Silent Capture',
      'trust.silentDesc': 'Audio is extracted in RAM without room playback',
      'trust.retentionTitle': 'Zero Retention',
      'trust.retentionDesc': 'Groq account-level Zero Data Retention supported',
      'trust.speedTitle': '~1.2s Latency',
      'trust.speedDesc': 'High-speed Whisper Large v3 inference',
      'trust.vaultTitle': 'OS Credential Vault',
      'trust.vaultDesc': 'API keys stay in GNOME Keyring / macOS Keychain',

      'demo.eyebrow': 'Simulated WhatsApp Web Experience',
      'demo.title': 'See It in Action Right Here',
      'demo.subtitle': 'Test the exact UI injection, silent capture, and instant transcription panel without needing WhatsApp open right now.',
      'demo.chatOnline': 'online • encrypted chat',
      'demo.today': 'TODAY',
      'demo.msg1': 'Hey team! Quick update on the v0.2.0 release checklist. Can you check this voice note from our security review?',
      'demo.btnTranscribe': 'Transcribe',
      'demo.panelTitle': 'Transcript (Groq Whisper v3)',
      'demo.btnRefresh': 'Refresh',
      'demo.btnCopy': 'Copy',
      'demo.transcriptContent': '"Hello everyone. Security audit and automated tests have all passed successfully. All API keys are protected and v0.2.0 is ready for public release."',
      'demo.msgReply': 'Awesome! Read the transcript without having to listen. Ready to push to GitHub!',
      'demo.footerNote': '💡 Try clicking the green <strong>"Transcribe"</strong> button above to test the simulation!',

      'features.eyebrow': 'Privacy & Architecture',
      'features.title': 'Engineered Specifically for Privacy',
      'features.subtitle': 'Standard transcribers forward chats to third-party servers. Voice Note Transcriber keeps everything private, client-side, and on-demand.',
      'features.card1Title': 'Silent DOM Hook',
      'features.card1Desc': 'WhatsApp Web no longer exposes standard <audio> DOM tags. Our MAIN-world hook captures the decrypted in-memory Opus Blob URL, silences the playback channel, and resets media position instantly.',
      'features.card2Title': 'Zero Data Retention',
      'features.card2Desc': 'Audio stays in temporary memory and is sent directly to your Groq endpoint. No audio bytes or text transcripts are written to disk, server logs, or cloud databases.',
      'features.card3Title': 'OS Credential Keyring',
      'features.card3Desc': 'Your Groq API key is stored securely in your OS keychain (GNOME Keyring, macOS Keychain, or Windows Credential Manager). It never touches the browser extension storage or Git files.',
      'features.card4Title': 'User-Triggered Privacy Model',
      'features.card4Desc': 'The extension never runs in the background across your entire chat. It only wakes up and transcribes the single message where you explicitly clicked "Transcribe".',
      'features.card5Title': 'Whisper Large v3 Accuracy',
      'features.card5Desc': 'Leverages OpenAI benchmark Whisper Large v3 model running on Groq high-performance LPU inference engine, giving 90+ language support with native accents.',
      'features.card6Title': 'Seamless Native Bubble Fit',
      'features.card6Desc': 'Mounts directly inside WhatsApp real speech bubble with auto-adapting light/dark mode, scroll-recycle cleanup, and a dedicated 20px footer lane so timestamps never collide.',

      'how.eyebrow': 'Under The Hood',
      'how.title': 'How It Works in 4 Steps',
      'how.step1Title': 'User Clicks Transcribe',
      'how.step1Desc': 'You click the discreet inline Transcribe button inside the voice message bubble.',
      'how.step2Title': 'Silent Blob Extraction',
      'how.step2Desc': 'The MAIN-world hook extracts the in-memory decrypted Opus audio blob silently with zero speaker leak.',
      'how.step3Title': 'Local Helper Forwarding',
      'how.step3Desc': 'Audio is forwarded to 127.0.0.1:4318, which attaches your OS-stored Groq key and queries Whisper.',
      'how.step4Title': 'Instant Inline Render',
      'how.step4Desc': 'The transcript arrives in ~1.2s and mounts cleanly below the waveform with 1-click Copy.',

      'setup.eyebrow': 'Get Started in 2 Minutes',
      'setup.title': 'Quick Installation Guide',
      'setup.subtitle': 'Works on Linux (Fedora/Ubuntu), macOS, and Windows with Brave, Chrome, or any Chromium-based browser.',
      'setup.step1Label': 'Step 1 • Clone & Start Local Helper',
      'setup.step2Label': 'Step 2 • Load Unpacked Extension in Brave / Chrome',
      'setup.step3Label': 'Step 3 • Add Free Groq Key to Secure OS Keyring',
      'setup.step3Desc': 'Open http://127.0.0.1:4318/setup in your browser. Paste your free Groq API key (starts with gsk_...). The helper verifies the key and securely saves it in your system credential vault.',

      'security.eyebrow': 'Trust & Transparency',
      'security.title': 'Privacy Comparison Matrix',

      'footer.desc': 'An open-source, privacy-first solution for WhatsApp Web audio messages. Created by Fadayat Shamilov.'
    },

    az: {
      'nav.features': 'Özəlliklər',
      'nav.demo': 'İnteraktiv Demo',
      'nav.howItWorks': 'Necə İşləyir',
      'nav.setup': 'Quraşdırma',
      'nav.security': 'Məxfilik və Təhlükəsizlik',

      'hero.badge': '100% Səssiz RAM Capture • Sıfır Məlumat Saxlanması',
      'hero.title': 'WhatsApp Səsli Mesajlarını <span class="highlight">Səsi Açmadan Oxuyun</span>',
      'hero.lead': 'Brave və Chrome üçün tam məxfi brauzer extension-ı. Səsli mesajları Groq Whisper Large v3 ilə dərhal mətnə çevirir — otağa səs yayılmır, çatlar qeydə alınmır və açarlarınız qorunur.',
      'hero.ctaPrimary': 'GitHub-da Əldə Edin',
      'hero.ctaSecondary': 'İnteraktiv Demonu Yoxla',

      'trust.silentTitle': 'Səssiz Qəbul',
      'trust.silentDesc': 'Audio birbaşa RAM-dan səssiz oxunur, otağa səs getmir',
      'trust.retentionTitle': 'Zero Retention',
      'trust.retentionDesc': 'Groq səviyyəsində Sıfır Məlumat Saxlanması dəstəklənir',
      'trust.speedTitle': '~1.2s Sürət',
      'trust.speedDesc': 'Whisper Large v3 ilə yüksək sürətli çevirmə',
      'trust.vaultTitle': 'Sistem Keyring-i',
      'trust.vaultDesc': 'API açarları birbaşa ƏS-in şifrə anbarında saxlanılır',

      'demo.eyebrow': 'Real WhatsApp Web Simulyasiyası',
      'demo.title': 'Elə İndi Burada Sınayın',
      'demo.subtitle': 'WhatsApp-ı açmadan real extension interfeysini, səssiz qəbulu və transkript panelini dərhal test edin.',
      'demo.chatOnline': 'onlayn • şifrələnmiş çat',
      'demo.today': 'BUGÜN',
      'demo.msg1': 'Salam komanda! v0.2.0 reliz yoxlama siyahısı hazırdır. Təhlükəsizlik auditi barədə bu səsli mesaja baxa bilərsiniz?',
      'demo.btnTranscribe': 'Transkript',
      'demo.panelTitle': 'Transkript (Groq Whisper v3)',
      'demo.btnRefresh': 'Yenilə',
      'demo.btnCopy': 'Kopyala',
      'demo.transcriptContent': '"Hamıya salam. Təhlükəsizlik auditi və avtomatlaşdırılmış testlər tam keçdi. Bütün açarlar qorunub, v0.2.0 versiyasını rahatlıqla yayımlaya bilərik."',
      'demo.msgReply': 'Əla! Səsə qulaq asmadan oxudum. GitHub-a push edirik!',
      'demo.footerNote': '💡 Simulyasiyanı yoxlamaq üçün yuxarıdakı yaşıl <strong>"Transkript"</strong> düyməsinə klikləyin!',

      'features.eyebrow': 'Məxfilik və Arxitektura',
      'features.title': 'Yalnız Məxfilik üçün Mühəndislik',
      'features.subtitle': 'Adi transkript alətləri bütün çatı kənar serverlərə ötürür. Voice Note Transcriber hər şeyi lokal, yalnız tələb olunduqda və tam məxfi saxlayır.',
      'features.card1Title': 'Səssiz DOM Hook',
      'features.card1Desc': 'WhatsApp Web artıq audio teqlərini DOM-a çıxarmır. Bizim MAIN-world hook şifrəsi açılmış in-memory Opus Blob URL-i tutur, medianı dərhal səssizləşdirir və sıfırlayır.',
      'features.card2Title': 'Sıfır Saxlanma (Zero Retention)',
      'features.card2Desc': 'Audio yalnız müvəqqəti RAM-da qalır və birbaşa Groq API-ya göndərilir. Heç bir audio və ya mətn faylı diskə, loqlara və ya bulud bazalarına yazılmır.',
      'features.card3Title': 'ƏS Keyring Mühafizəsi',
      'features.card3Desc': 'Groq API açarınız ƏS-in rəsmi anbarında (GNOME Keyring, macOS Keychain, Windows Credential Manager) saxlanılır. Extension-a və Git-ə düşmür.',
      'features.card4Title': 'İstifadəçi Tələbli Model',
      'features.card4Desc': 'Extension bütün çatları arxa fonda dinləmir. Yalnız və yalnız sizin "Transkript" seçdiyiniz tək mesaj emal olunur.',
      'features.card5Title': 'Whisper Large v3 Dəqiqliyi',
      'features.card5Desc': 'Groq-un ultra sürətli LPU prosessorlarında işləyən rəsmi Whisper Large v3 modeli Azərbaycan və 90+ dil üçün yüksək dəqiqlik təmin edir.',
      'features.card6Title': 'Mesaj Bubble-ına Dəqiq Yerləşmə',
      'features.card6Desc': 'WhatsApp-ın real mesaj qutusu daxilinə inteqrasiya olunur, qaranlıq/işıqlı mövzuya uyğunlaşır və saat göstəricisi ilə toqquşmur.',

      'how.eyebrow': 'Daxili İş Mexanizmi',
      'how.title': '4 Sadə Addımda Necə İşləyir',
      'how.step1Title': 'İstifadəçi Klikləyir',
      'how.step1Desc': 'Mesaj qutusunun daxilindəki "Transkript" düyməsinə klikləyirsiniz.',
      'how.step2Title': 'Səssiz Blob Qəbulu',
      'how.step2Desc': 'MAIN-world hook RAM-dakı şifrəsi açılmış Opus səs faylını otağa heç bir səs buraxmadan səssiz tutur.',
      'how.step3Title': 'Lokal Serverə Ötürmə',
      'how.step3Desc': 'Audio 127.0.0.1:4318 ünvanına ötürülür və ƏS anbarındakı Groq açarınızla Whisper-ə sorğu göndərilir.',
      'how.step4Title': 'Dərhal Ekrana Çıxış',
      'how.step4Desc': 'Transkript ~1.2 saniyəyə hazır olur və səs dalğasının altında tək toxunuşla Kopyalama düyməsi ilə açılır.',

      'setup.eyebrow': '2 Dəqiqəyə Başlayın',
      'setup.title': 'Sürətli Quraşdırma Bələdçisi',
      'setup.subtitle': 'Linux (Fedora/Ubuntu), macOS və Windows-da Brave, Chrome və Chromium əsaslı brauzerlərlə işləyir.',
      'setup.step1Label': 'Addım 1 • Repozitoriyanı Klonlayın və Serveri Başladın',
      'setup.step2Label': 'Addım 2 • Extension-ı Brave / Chrome-a Yükləyin',
      'setup.step3Label': 'Addım 3 • Pulsuz Groq Açarını ƏS Anbarına Əlavə Edin',
      'setup.step3Desc': 'Brauzerdə http://127.0.0.1:4318/setup səhifəsini açın. Pulsuz Groq API açarınızı yapışdırın. Sistem açarı yoxlayıb etibarlı sistem anbarınızda yadda saxlayacaq.',

      'security.eyebrow': 'Şəffaflıq və Etimad',
      'security.title': 'Məxfilik Müqayisə Cədvəli',

      'footer.desc': 'WhatsApp Web səsli mesajları üçün açıq qaynaqlı və məxfilik yönümlü həll. Müəllif: Fədayət Şamilov.'
    }
  };

  let currentLang = 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    const dict = i18n[lang] || i18n.en;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
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
      const nextLang = currentLang === 'en' ? 'az' : 'en';
      applyLanguage(nextLang);
    });
  }

  // --- 2. Dark / Light Theme Toggle ---
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = themeBtn ? themeBtn.querySelector('.theme-icon') : null;

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vnt-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  const savedTheme = localStorage.getItem('vnt-theme') || 'dark';
  setTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // --- 3. Interactive WhatsApp Simulator ---
  const btnTranscribe = document.getElementById('btn-transcribe');
  const transcribeBtnText = document.getElementById('transcribe-btn-text');
  const transcriptPanel = document.getElementById('transcript-panel');
  const btnDemoRefresh = document.getElementById('btn-demo-refresh');
  const btnDemoCopy = document.getElementById('btn-demo-copy');
  const transcriptText = document.getElementById('transcript-text');
  const playBtn = document.getElementById('demo-play-btn');
  const playIcon = playBtn ? playBtn.querySelector('.play-icon') : null;
  const pauseIcon = playBtn ? playBtn.querySelector('.pause-icon') : null;
  const waveformBars = document.querySelectorAll('#demo-waveform .bar');

  let isPlaying = false;
  let playInterval = null;

  function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';
      let activeIndex = 0;
      playInterval = setInterval(() => {
        waveformBars.forEach((bar, idx) => {
          if (idx <= activeIndex) {
            bar.classList.add('active');
          } else {
            bar.classList.remove('active');
          }
        });
        activeIndex = (activeIndex + 1) % waveformBars.length;
      }, 200);
    } else {
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
      clearInterval(playInterval);
    }
  }

  if (playBtn) {
    playBtn.addEventListener('click', togglePlay);
  }

  function simulateTranscription() {
    if (!btnTranscribe || !transcriptPanel) return;

    btnTranscribe.classList.add('loading');
    const loadingText = currentLang === 'az' ? 'Səs oxunur...' : 'Extracting audio...';
    transcribeBtnText.textContent = loadingText;

    // Simulate silent audio capture & Groq inference latency (~1.1s)
    setTimeout(() => {
      const inferenceText = currentLang === 'az' ? 'Groq Whisper v3 çevirir...' : 'Whisper v3 transcribing...';
      transcribeBtnText.textContent = inferenceText;
    }, 450);

    setTimeout(() => {
      btnTranscribe.style.display = 'none';
      transcriptPanel.style.display = 'block';
      btnTranscribe.classList.remove('loading');
    }, 1100);
  }

  if (btnTranscribe) {
    btnTranscribe.addEventListener('click', simulateTranscription);
  }

  if (btnDemoRefresh) {
    btnDemoRefresh.addEventListener('click', () => {
      transcriptPanel.style.display = 'none';
      btnTranscribe.style.display = 'inline-flex';
      transcribeBtnText.textContent = currentLang === 'az' ? 'Transkript' : 'Transcribe';
      simulateTranscription();
    });
  }

  if (btnDemoCopy) {
    btnDemoCopy.addEventListener('click', () => {
      const textToCopy = transcriptText ? transcriptText.innerText.replace(/"/g, '') : '';
      navigator.clipboard.writeText(textToCopy).then(() => {
        const origText = btnDemoCopy.textContent;
        btnDemoCopy.textContent = currentLang === 'az' ? 'Kopyalandı!' : 'Copied!';
        btnDemoCopy.style.borderColor = '#00a884';
        btnDemoCopy.style.color = '#00a884';
        setTimeout(() => {
          btnDemoCopy.textContent = origText;
          btnDemoCopy.style.borderColor = '';
          btnDemoCopy.style.color = '';
        }, 1800);
      });
    });
  }

  // --- 4. Copy Code Snippet Buttons ---
  document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-clipboard');
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          const original = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.backgroundColor = '#00a884';
          btn.style.borderColor = '#00a884';
          setTimeout(() => {
            btn.textContent = original;
            btn.style.backgroundColor = '';
            btn.style.borderColor = '';
          }, 2000);
        });
      }
    });
  });
});
