// Voice Note Transcriber — 3D WebGL Audio Wave & Interactive System
document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Three.js WebGL 3D Particle Audio Wavefield ---
  const canvas = document.getElementById('webgl-canvas');
  let scene, camera, renderer, particles, geometry, material;
  let countX = 65, countZ = 65;
  let numParticles = countX * countZ;
  let positions, colors, initialY;
  let clock = new THREE.Clock();

  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  // Audio-reactive state simulation
  let audioIntensity = 1.0;
  let targetIntensity = 1.0;
  let isConverged = false;

  function initThree() {
    if (!window.THREE || !canvas) return;

    try {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000);
      camera.position.set(0, 350, 750);
      camera.lookAt(0, -50, 0);

      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Create Particle Grid Geometry
      geometry = new THREE.BufferGeometry();
      positions = new Float32Array(numParticles * 3);
      colors = new Float32Array(numParticles * 3);
      initialY = new Float32Array(numParticles);

      const separation = 38;
      const offsetX = (countX * separation) / 2;
      const offsetZ = (countZ * separation) / 2;

      let idx = 0;
      for (let ix = 0; ix < countX; ix++) {
        for (let iz = 0; iz < countZ; iz++) {
          const x = ix * separation - offsetX;
          const z = iz * separation - offsetZ;
          const y = 0;

          positions[idx * 3] = x;
          positions[idx * 3 + 1] = y;
          positions[idx * 3 + 2] = z;

          initialY[idx] = y;

          // Color gradient: Emerald Green (#00a884) to Soft Cyan (#7ed9e8)
          const distFromCenter = Math.sqrt(x * x + z * z) / 1200;
          colors[idx * 3] = 0.0 + distFromCenter * 0.15;     // R
          colors[idx * 3 + 1] = 0.66 + distFromCenter * 0.2;  // G
          colors[idx * 3 + 2] = 0.52 + distFromCenter * 0.35; // B

          idx++;
        }
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Circular glowing particle texture
      const particleTexture = createGlowTexture();

      material = new THREE.PointsMaterial({
        size: 7,
        vertexColors: true,
        map: particleTexture,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      window.addEventListener('resize', onWindowResize, { passive: true });
      document.addEventListener('mousemove', onMouseMove, { passive: true });

      animate();
    } catch (e) {
      console.warn('WebGL initialization skipped:', e);
      if (canvas) canvas.style.display = 'none';
    }
  }

  function createGlowTexture() {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(0, 168, 132, 0.8)');
    gradient.addColorStop(0.7, 'rgba(0, 168, 132, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(c);
    texture.needsUpdate = true;
    return texture;
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(event) {
    targetMouseX = (event.clientX - windowHalfX) * 0.4;
    targetMouseY = (event.clientY - windowHalfY) * 0.3;
  }

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Smooth mouse inertia
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    camera.position.x = mouseX * 0.7;
    camera.position.y = 350 - mouseY * 0.5;
    camera.lookAt(0, -30, 0);

    // Audio-reactive intensity interpolation
    audioIntensity += (targetIntensity - audioIntensity) * 0.08;

    const pos = geometry.attributes.position.array;
    const col = geometry.attributes.color.array;

    let idx = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iz = 0; iz < countZ; iz++) {
        const x = pos[idx * 3];
        const z = pos[idx * 3 + 2];

        // Complex 3D audio-wave harmonics
        const wave1 = Math.sin((ix * 0.2) + (time * 2.2)) * 35;
        const wave2 = Math.cos((iz * 0.2) + (time * 1.8)) * 30;
        const radialWave = Math.sin(Math.sqrt(ix * ix + iz * iz) * 0.25 - time * 3.0) * 22;

        const dynamicHeight = (wave1 + wave2 + radialWave) * audioIntensity;

        if (isConverged) {
          // Crystallization convergence effect towards a calm plane
          pos[idx * 3 + 1] += (0 - pos[idx * 3 + 1]) * 0.08;
        } else {
          pos[idx * 3 + 1] = dynamicHeight;
        }

        // Modulate color on audio spike
        if (audioIntensity > 1.4) {
          col[idx * 3] = Math.min(1.0, 0.2 + (audioIntensity - 1.0) * 0.5);
          col[idx * 3 + 1] = 0.95;
          col[idx * 3 + 2] = 0.85;
        } else {
          const dist = Math.sqrt(x * x + z * z) / 1200;
          col[idx * 3] = 0.0 + dist * 0.15;
          col[idx * 3 + 1] = 0.66 + dist * 0.2;
          col[idx * 3 + 2] = 0.52 + dist * 0.35;
        }

        idx++;
      }
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
  }

  initThree();

  // --- 2. Interactive 3D Audio Spike Triggers ---
  function pulse3dWave(magnitude = 2.4, duration = 1200) {
    targetIntensity = magnitude;
    isConverged = false;
    setTimeout(() => {
      targetIntensity = 1.0;
    }, duration);
  }

  const trigger3dBtn = document.getElementById('trigger3dBtn');
  if (trigger3dBtn) {
    trigger3dBtn.addEventListener('click', () => {
      pulse3dWave(3.0, 1600);
      const status = document.getElementById('stageStatus');
      if (status) {
        status.textContent = '3D WebGL audio wave harmonic spike active!';
        setTimeout(() => {
          status.textContent = 'Move mouse to rotate 3D soundfield';
        }, 1800);
      }
    });
  }

  // --- 3. WhatsApp Interactive Message Simulation ---
  const stageAudioBtn = document.getElementById('stageAudioBtn');
  const stagePlayIcon = document.getElementById('stagePlayIcon');
  const stagePauseIcon = document.getElementById('stagePauseIcon');
  const miniWaveformBars = document.querySelectorAll('#miniWaveform .m-bar');
  let isPlayingAudio = false;
  let audioTimer = null;

  function toggleAudioSimulation() {
    isPlayingAudio = !isPlayingAudio;
    if (isPlayingAudio) {
      if (stagePlayIcon) stagePlayIcon.style.display = 'none';
      if (stagePauseIcon) stagePauseIcon.style.display = 'block';

      pulse3dWave(2.2, 3500);

      let barIdx = 0;
      audioTimer = setInterval(() => {
        miniWaveformBars.forEach((bar, i) => {
          if (i <= barIdx) {
            bar.classList.add('active');
          } else {
            bar.classList.remove('active');
          }
        });
        barIdx = (barIdx + 1) % miniWaveformBars.length;
      }, 180);
    } else {
      if (stagePlayIcon) stagePlayIcon.style.display = 'block';
      if (stagePauseIcon) stagePauseIcon.style.display = 'none';
      targetIntensity = 1.0;
      clearInterval(audioTimer);
    }
  }

  if (stageAudioBtn) {
    stageAudioBtn.addEventListener('click', toggleAudioSimulation);
  }

  // --- 4. Transcribe Button & Convergence Simulation ---
  const stageTranscribeBtn = document.getElementById('stageTranscribeBtn');
  const transcribeLabel = document.getElementById('transcribeLabel');
  const transcriptPanel = document.getElementById('transcriptPanel');
  const btnRefresh = document.getElementById('btnRefresh');
  const btnCopy = document.getElementById('btnCopy');
  const panelOutput = document.getElementById('panelOutput');

  function startTranscriptionSimulation() {
    if (!stageTranscribeBtn || !transcriptPanel) return;

    stageTranscribeBtn.classList.add('loading');
    transcribeLabel.textContent = 'Extracting audio...';

    // Boost 3D wave during extraction
    pulse3dWave(2.6, 900);

    setTimeout(() => {
      transcribeLabel.textContent = 'Whisper v3 inferencing...';
    }, 450);

    setTimeout(() => {
      stageTranscribeBtn.style.display = 'none';
      transcriptPanel.style.display = 'block';
      stageTranscribeBtn.classList.remove('loading');

      // Converge 3D wave into crystalline plane to represent structured text
      isConverged = true;
      targetIntensity = 0.3;

      setTimeout(() => {
        isConverged = false;
        targetIntensity = 1.0;
      }, 2500);
    }, 1100);
  }

  if (stageTranscribeBtn) {
    stageTranscribeBtn.addEventListener('click', startTranscriptionSimulation);
  }

  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      transcriptPanel.style.display = 'none';
      stageTranscribeBtn.style.display = 'inline-flex';
      transcribeLabel.textContent = 'Transcribe';
      startTranscriptionSimulation();
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const text = panelOutput ? panelOutput.innerText.replace(/"/g, '') : '';
      navigator.clipboard.writeText(text).then(() => {
        const orig = btnCopy.textContent;
        btnCopy.textContent = 'Copied!';
        btnCopy.style.borderColor = 'var(--wa-emerald)';
        btnCopy.style.color = 'var(--wa-emerald)';
        setTimeout(() => {
          btnCopy.textContent = orig;
          btnCopy.style.borderColor = '';
          btnCopy.style.color = '';
        }, 1600);
      });
    });
  }

  // --- 5. Terminal Code Copy Snippet ---
  document.querySelectorAll('.copy-cmd-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-copy');
      if (cmd) {
        navigator.clipboard.writeText(cmd).then(() => {
          const original = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.borderColor = 'var(--wa-emerald)';
          btn.style.color = 'var(--wa-emerald)';
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
