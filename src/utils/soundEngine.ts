let audioCtx: AudioContext | null = null

function getContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// --- Active sound tracking (for stop/stopAll) ---
interface ActiveSoundEntry {
  gains: GainNode[]
  timeouts: Set<number>
}
const activeSounds = new Map<string, ActiveSoundEntry>()

function ensureEntry(id: string): ActiveSoundEntry {
  if (!activeSounds.has(id)) {
    activeSounds.set(id, { gains: [], timeouts: new Set() })
  }
  return activeSounds.get(id)!
}

function registerGain(id: string, gain: GainNode) {
  const entry = ensureEntry(id)
  entry.gains.push(gain)
}

function registerTimeout(id: string, timeoutId: number) {
  const entry = ensureEntry(id)
  entry.timeouts.add(timeoutId)
}

function createTrackedGain(ctx: AudioContext, volume: number, id: string): GainNode {
  const gain = ctx.createGain()
  gain.gain.value = volume
  gain.connect(ctx.destination)
  registerGain(id, gain)
  return gain
}

/** Stop a specific sound immediately by fading all its gain nodes to silence */
export function stopSound(id: string) {
  const entry = activeSounds.get(id)
  if (!entry) return
  const ctx = audioCtx
  if (ctx) {
    entry.gains.forEach(g => {
      try {
        g.gain.cancelScheduledValues(ctx.currentTime)
        g.gain.setValueAtTime(g.gain.value, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05)
      } catch { /* already disposed */ }
    })
  }
  entry.timeouts.forEach(t => clearTimeout(t))
  activeSounds.delete(id)
}

/** Stop every currently-playing sound immediately */
export function stopAllSounds() {
  const ctx = audioCtx
  if (ctx) {
    activeSounds.forEach((entry) => {
      entry.gains.forEach(g => {
        try {
          g.gain.cancelScheduledValues(ctx.currentTime)
          g.gain.setValueAtTime(g.gain.value, ctx.currentTime)
          g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05)
        } catch { /* already disposed */ }
      })
      entry.timeouts.forEach(t => clearTimeout(t))
    })
  }
  activeSounds.clear()
}

// --- Sound functions ---
// Each accepts (ctx, volume, id) and uses tracked gain/timeout wrappers

const bell = (ctx: AudioContext, vol: number, id: string) => {
  const gain = createTrackedGain(ctx, vol * 0.4, id)
  const osc = ctx.createOscillator()
  const osc2 = ctx.createOscillator()
  osc.type = 'sine'; osc.frequency.value = 1200
  osc2.type = 'sine'; osc2.frequency.value = 1800
  gain.gain.setValueAtTime(vol * 0.4, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)
  osc.connect(gain); osc2.connect(gain)
  osc.start(ctx.currentTime); osc2.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 1.5); osc2.stop(ctx.currentTime + 1.5)
}

const dogBark = (ctx: AudioContext, vol: number, id: string) => {
  const gain = createTrackedGain(ctx, vol * 0.5, id)
  const osc = ctx.createOscillator()
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(400, ctx.currentTime)
  osc.frequency.setValueAtTime(600, ctx.currentTime + 0.05)
  osc.frequency.setValueAtTime(300, ctx.currentTime + 0.1)
  gain.gain.setValueAtTime(vol * 0.5, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
  osc.connect(gain); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.3)

  const gain2 = createTrackedGain(ctx, vol * 0.4, id)
  const osc2 = ctx.createOscillator()
  osc2.type = 'sawtooth'
  osc2.frequency.setValueAtTime(500, ctx.currentTime + 0.2)
  osc2.frequency.setValueAtTime(700, ctx.currentTime + 0.25)
  osc2.frequency.setValueAtTime(400, ctx.currentTime + 0.3)
  gain2.gain.setValueAtTime(vol * 0.4, ctx.currentTime + 0.2)
  gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
  osc2.connect(gain2); osc2.start(ctx.currentTime + 0.2); osc2.stop(ctx.currentTime + 0.5)
}

const catMeow = (ctx: AudioContext, vol: number, id: string) => {
  const gain = createTrackedGain(ctx, vol * 0.3, id)
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(400, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3)
  osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.5)
  gain.gain.setValueAtTime(vol * 0.3, ctx.currentTime)
  gain.gain.setValueAtTime(vol * 0.3, ctx.currentTime + 0.4)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7)
  osc.connect(gain); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.7)
}

const whiteNoise = (ctx: AudioContext, duration: number, vol: number, id: string) => {
  const bufferSize = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
  const source = ctx.createBufferSource()
  source.buffer = buffer
  const gain = createTrackedGain(ctx, vol, id)
  gain.gain.setValueAtTime(vol, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  source.connect(gain)
  source.start(ctx.currentTime)
  source.stop(ctx.currentTime + duration)
}

const rain = (ctx: AudioContext, vol: number, id: string) => {
  whiteNoise(ctx, 2, vol * 0.15, id)
  registerTimeout(id, window.setTimeout(() => { try { whiteNoise(ctx, 2, vol * 0.12, id) } catch {} }, 500))
  registerTimeout(id, window.setTimeout(() => { try { whiteNoise(ctx, 2, vol * 0.1, id) } catch {} }, 1000))
  registerTimeout(id, window.setTimeout(() => { try { whiteNoise(ctx, 2, vol * 0.14, id) } catch {} }, 1500))
}

const thunder = (ctx: AudioContext, vol: number, id: string) => {
  const gain = createTrackedGain(ctx, vol * 0.6, id)
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(80, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1)
  gain.gain.setValueAtTime(vol * 0.6, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(vol * 0.4, ctx.currentTime + 0.1)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)
  osc.connect(gain); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 1.5)
  whiteNoise(ctx, 0.3, vol * 0.3, id)
}

const ocean = (ctx: AudioContext, vol: number, id: string) => {
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.3; lfo.type = 'sine'
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = 0.3; lfo.connect(lfoGain)
  const bufferSize = ctx.sampleRate * 4
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
  const source = ctx.createBufferSource()
  source.buffer = buffer; source.loop = true
  const noiseGain = ctx.createGain()
  noiseGain.gain.value = vol * 0.2
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'; filter.frequency.value = 400
  lfoGain.connect(filter.frequency)
  source.connect(filter); filter.connect(noiseGain)
  noiseGain.connect(ctx.destination)
  registerGain(id, noiseGain)
  noiseGain.gain.setValueAtTime(vol * 0.2, ctx.currentTime)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4)
  lfo.start(ctx.currentTime); source.start(ctx.currentTime)
  lfo.stop(ctx.currentTime + 4); source.stop(ctx.currentTime + 4)
}

const keyboardClick = (ctx: AudioContext, vol: number, id: string) => {
  const gain = createTrackedGain(ctx, vol * 0.3, id)
  const osc = ctx.createOscillator()
  osc.type = 'square'; osc.frequency.value = 800
  gain.gain.setValueAtTime(vol * 0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
  osc.connect(gain); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.05)
}

const cameraShutter = (ctx: AudioContext, vol: number, id: string) => {
  const gain = createTrackedGain(ctx, vol * 0.4, id)
  const osc = ctx.createOscillator()
  osc.type = 'square'; osc.frequency.value = 600
  gain.gain.setValueAtTime(vol * 0.4, ctx.currentTime)
  gain.gain.setValueAtTime(vol * 0.3, ctx.currentTime + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
  osc.connect(gain); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.1)
  const gain2 = createTrackedGain(ctx, vol * 0.2, id)
  const osc2 = ctx.createOscillator()
  osc2.type = 'sine'; osc2.frequency.value = 1000
  gain2.gain.setValueAtTime(vol * 0.2, ctx.currentTime + 0.05)
  gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
  osc2.connect(gain2); osc2.start(ctx.currentTime + 0.05); osc2.stop(ctx.currentTime + 0.15)
}

const applause = (ctx: AudioContext, vol: number, id: string) => {
  for (let i = 0; i < 8; i++) {
    const delay = i * 0.12 + Math.random() * 0.05
    const tid = window.setTimeout(() => {
      try {
        const g = createTrackedGain(ctx, vol * 0.2, id)
        const osc = ctx.createOscillator()
        osc.type = 'sawtooth'; osc.frequency.value = 600 + Math.random() * 400
        g.gain.setValueAtTime(vol * 0.2, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
        osc.connect(g); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.08)
      } catch {}
    }, delay * 1000)
    registerTimeout(id, tid)
  }
}

const laugh = (ctx: AudioContext, vol: number, id: string) => {
  const notes = [400, 500, 450, 550, 420, 520, 470, 570]
  notes.forEach((freq, i) => {
    const delay = i * 0.12
    const g = createTrackedGain(ctx, vol * 0.2, id)
    const osc = ctx.createOscillator()
    osc.type = 'sine'; osc.frequency.value = freq
    g.gain.setValueAtTime(vol * 0.2, ctx.currentTime + delay)
    g.gain.setValueAtTime(vol * 0.2, ctx.currentTime + delay + 0.05)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.1)
    osc.connect(g); osc.start(ctx.currentTime + delay); osc.stop(ctx.currentTime + delay + 0.1)
  })
}

const whistle = (ctx: AudioContext, vol: number, id: string) => {
  const gain = createTrackedGain(ctx, vol * 0.3, id)
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(600, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3)
  osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.5)
  gain.gain.setValueAtTime(vol * 0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)
  osc.connect(gain); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.8)
}

const drumBeat = (ctx: AudioContext, vol: number, id: string) => {
  for (let i = 0; i < 4; i++) {
    const delay = i * 0.3
    const gain = createTrackedGain(ctx, vol * 0.5, id)
    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(150, ctx.currentTime + delay)
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + delay + 0.15)
    gain.gain.setValueAtTime(vol * 0.5, ctx.currentTime + delay)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.2)
    osc.connect(gain); osc.start(ctx.currentTime + delay); osc.stop(ctx.currentTime + delay + 0.2)
    const gain2 = createTrackedGain(ctx, vol * 0.2, id)
    const osc2 = ctx.createOscillator()
    osc2.type = 'square'; osc2.frequency.value = 200
    gain2.gain.setValueAtTime(vol * 0.2, ctx.currentTime + delay)
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.05)
    osc2.connect(gain2); osc2.start(ctx.currentTime + delay); osc2.stop(ctx.currentTime + delay + 0.05)
  }
}

// --- Sound registry ---
type SoundFn = (ctx: AudioContext, vol: number, id: string) => void
const soundMap: Record<string, SoundFn> = {
  bell, dog: dogBark, cat: catMeow, rain, thunder, ocean,
  keyboard: keyboardClick, camera: cameraShutter, applause, laugh, whistle, drum: drumBeat,
}

// --- Public API ---

/** Start playing a sound. The sound auto-stops after its natural duration. */
export function playSound(id: string, volume: number): Promise<void> {
  return new Promise((resolve) => {
    try {
      const ctx = getContext()
      const synth = soundMap[id]
      if (synth) {
        synth(ctx, Math.min(1, Math.max(0, volume)), id)
      }
      registerTimeout(id, window.setTimeout(resolve, Math.max(100, getSoundDuration(id) * 1000)))
    } catch {
      resolve()
    }
  })
}

export function getSoundDuration(id: string): number {
  const durations: Record<string, number> = {
    bell: 1.5, dog: 0.5, cat: 0.7, rain: 2, thunder: 1.5,
    ocean: 4, keyboard: 0.1, camera: 0.2, applause: 1,
    laugh: 1, whistle: 0.8, drum: 1.2,
  }
  return durations[id] ?? 1
}
