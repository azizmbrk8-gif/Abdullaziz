#!/usr/bin/env python3
"""Upbeat corporate/tech music for ProChain V3 TikTok ad.

Structure (at 120 BPM, beat=0.5s, bar=2s):
- Bars  1-2  (0-4s):   intro — soft pad + gentle hat
- Bars  3-6  (4-12s):  verse — soft kick + bass enters
- Bars  7-8  (12-16s): pre-build — kick louder, lead tease
- Bars  9-14 (16-28s): drop — full beat + lead hook
- Bars 15-18 (28-36s): breakdown — pad + lead, softer
- Bars 19-22 (36-44s): final peak — all + riser to CTA
- Bars 23    (44-46s): outro button — final thump
"""
import numpy as np
import wave
import sys

SR = 44100
DUR = 46.0
BPM = 120
BEAT = 60.0 / BPM  # 0.5s
BAR = 4 * BEAT  # 2s

N = int(SR * DUR)
t = np.arange(N) / SR
rng = np.random.default_rng(7)


def one_shot(start, length, decay):
    env = np.zeros(N)
    s = int(start * SR)
    e = min(N, int((start + length) * SR))
    if s < N:
        local = np.arange(e - s) / SR
        env[s:e] = np.exp(-local * decay)
    return env


def gate(start_sec, end_sec):
    """1.0 between start and end, with short fades."""
    g = np.zeros(N)
    s = int(start_sec * SR)
    e = min(N, int(end_sec * SR))
    fade = int(0.1 * SR)
    if s < N:
        g[s:e] = 1.0
        if s + fade < N:
            g[s : s + fade] = np.linspace(0, 1, fade)
        if e - fade > s:
            g[e - fade : e] = np.linspace(1, 0, fade)
    return g


# ---------- KICK DRUM: soft but present, 4-on-floor ----------
kick_sig = np.zeros(N)
kick_total_beats = int(DUR / BEAT)
for i in range(kick_total_beats + 1):
    start = i * BEAT
    if start >= DUR:
        break
    s = int(start * SR)
    length = int(0.5 * SR)
    e = min(N, s + length)
    if s >= N:
        break
    local = np.arange(e - s) / SR
    # pitch sweep from 100Hz to 50Hz
    freq = 100 * np.exp(-local * 14) + 48
    phase = 2 * np.pi * np.cumsum(freq) / SR
    env = np.exp(-local * 11)
    kick_sig[s:e] += np.sin(phase) * env * 0.7

# Kick gates: softer in intro, strong in drop
kick_gain = (
    0.2 * gate(0, 4)
    + 0.55 * gate(4, 12)
    + 0.8 * gate(12, 16)
    + 1.0 * gate(16, 28)
    + 0.35 * gate(28, 36)
    + 1.0 * gate(36, 44)
    + 0.6 * gate(44, 46)
)
kick_sig *= kick_gain

# ---------- SNARE / CLAP: beats 2 and 4, softer and filtered ----------
snare_sig = np.zeros(N)
noise = rng.standard_normal(N)
hp_noise = np.concatenate([[0], np.diff(noise)])
for i in range(kick_total_beats + 1):
    if i % 2 == 0:
        continue  # snare only on 2, 4
    start = i * BEAT
    if start >= DUR:
        break
    s = int(start * SR)
    e = min(N, s + int(0.3 * SR))
    local = np.arange(e - s) / SR
    env = np.exp(-local * 25)
    tone = np.sin(2 * np.pi * 180 * local) * np.exp(-local * 30) * 0.5
    body = hp_noise[s:e] * env * 0.4 + tone * env
    snare_sig[s:e] += body

snare_gain = (
    0.0 * gate(0, 4)
    + 0.25 * gate(4, 12)
    + 0.5 * gate(12, 16)
    + 0.8 * gate(16, 28)
    + 0.25 * gate(28, 36)
    + 0.9 * gate(36, 44)
    + 0.4 * gate(44, 46)
)
snare_sig *= snare_gain

# ---------- HI-HAT: 8th notes, soft ticks ----------
hat_sig = np.zeros(N)
hat_noise = rng.standard_normal(N)
hat_hp = np.concatenate([[0, 0], np.diff(np.diff(hat_noise))])
eighth = BEAT / 2
for i in range(int(DUR / eighth) + 1):
    start = i * eighth
    if start >= DUR:
        break
    s = int(start * SR)
    e = min(N, s + int(0.1 * SR))
    local = np.arange(e - s) / SR
    decay = 90 if i % 2 == 0 else 140  # off-beats shorter
    env = np.exp(-local * decay)
    amp = 0.15 if i % 2 == 0 else 0.1
    hat_sig[s:e] += hat_hp[s:e] * env * amp

hat_gain = (
    0.35 * gate(0, 4)
    + 0.6 * gate(4, 12)
    + 0.8 * gate(12, 16)
    + 1.0 * gate(16, 28)
    + 0.5 * gate(28, 36)
    + 1.0 * gate(36, 44)
    + 0.3 * gate(44, 46)
)
hat_sig *= hat_gain

# ---------- BASS: rolling pattern in C major for corporate tech feel ----------
# C2=65.41, E2=82.41, G2=98.0, B2=123.47
# Pattern over 2 bars (16 eighth notes):
# C C G C | E E G E | F F C F | G G E C
bass_seq = [
    65.41, 65.41, 98.0, 65.41, 82.41, 82.41, 98.0, 82.41,
    87.31, 87.31, 65.41, 87.31, 98.0, 98.0, 82.41, 65.41,
]
bass_freq = np.zeros(N)
for i in range(int(DUR / eighth) + 2):
    note = bass_seq[i % len(bass_seq)]
    s = int(i * eighth * SR)
    e = min(N, int((i + 1) * eighth * SR))
    bass_freq[s:e] = note
bass_phase = 2 * np.pi * np.cumsum(bass_freq) / SR
bass_raw = 0.55 * np.sin(bass_phase) + 0.25 * np.sin(2 * bass_phase) + 0.12 * np.sin(3 * bass_phase)

# Gate bass on 8ths for groove
bass_gate_env = np.zeros(N)
for i in range(int(DUR / eighth) + 1):
    start = i * eighth
    if start >= DUR:
        break
    bass_gate_env += one_shot(start, eighth, 3.0)
bass_gate_env = np.clip(bass_gate_env, 0, 1)

bass_gain = (
    0.0 * gate(0, 4)
    + 0.4 * gate(4, 12)
    + 0.55 * gate(12, 16)
    + 0.7 * gate(16, 28)
    + 0.4 * gate(28, 36)
    + 0.7 * gate(36, 44)
    + 0.3 * gate(44, 46)
)
bass_sig = bass_raw * bass_gate_env * bass_gain

# ---------- PAD: sustained chord (C major) for warmth ----------
# Cmaj: C(261.63) E(329.63) G(392.0)  + Am (A(220) C(262) E(330)) alternating per 2 bars
pad_sig = np.zeros(N)
chord_dur = 2 * BAR  # 4s per chord
chords = [
    (261.63, 329.63, 392.0),  # C
    (220.0, 261.63, 329.63),  # Am
    (174.61, 220.0, 261.63),  # F
    (196.0, 246.94, 293.66),  # G
]
for i in range(int(DUR / chord_dur) + 1):
    f1, f2, f3 = chords[i % 4]
    s = int(i * chord_dur * SR)
    e = min(N, int((i + 1) * chord_dur * SR))
    tt = np.arange(e - s) / SR
    chord = (
        np.sin(2 * np.pi * f1 * tt) * 0.1
        + np.sin(2 * np.pi * f2 * tt) * 0.08
        + np.sin(2 * np.pi * f3 * tt) * 0.07
    )
    pad_sig[s:e] += chord

# slow tremolo
pad_sig *= 0.7 + 0.3 * np.sin(2 * np.pi * 2.5 * t)

pad_gain = (
    0.9 * gate(0, 4)
    + 0.7 * gate(4, 12)
    + 0.6 * gate(12, 16)
    + 0.5 * gate(16, 28)
    + 0.9 * gate(28, 36)
    + 0.6 * gate(36, 44)
    + 1.0 * gate(44, 46)
)
pad_sig *= pad_gain * 0.55

# ---------- LEAD: catchy 4-bar motif, pentatonic ----------
# Quarter notes: E5 G5 C6 G5 | A5 E5 G5 E5 | F5 A5 C6 A5 | G5 B5 D6 G5
lead_seq = [
    659.25, 783.99, 1046.50, 783.99,
    880.0, 659.25, 783.99, 659.25,
    698.46, 880.0, 1046.50, 880.0,
    783.99, 987.77, 1174.66, 783.99,
]
lead_freq = np.zeros(N)
for i in range(int(DUR / BEAT) + 2):
    note = lead_seq[i % len(lead_seq)]
    s = int(i * BEAT * SR)
    e = min(N, int((i + 1) * BEAT * SR))
    lead_freq[s:e] = note
lead_phase = 2 * np.pi * np.cumsum(lead_freq) / SR
lead_raw = 0.5 * np.sin(lead_phase) + 0.2 * np.sin(lead_phase * 2) + 0.1 * np.sin(lead_phase * 3)

# Gate per quarter
lead_gate_env = np.zeros(N)
for i in range(int(DUR / BEAT) + 1):
    start = i * BEAT
    if start >= DUR:
        break
    lead_gate_env += one_shot(start, BEAT * 0.9, 3.5)
lead_gate_env = np.clip(lead_gate_env, 0, 1)

lead_gain = (
    0.0 * gate(0, 12)
    + 0.25 * gate(12, 16)
    + 0.5 * gate(16, 28)
    + 0.55 * gate(28, 36)
    + 0.6 * gate(36, 44)
    + 0.2 * gate(44, 46)
)
lead_sig = lead_raw * lead_gate_env * lead_gain * 0.6

# ---------- RISER: white noise rising into peak at 36s ----------
riser_sig = np.zeros(N)
rs = int(34 * SR)
re = int(36 * SR)
if rs < N:
    local = np.arange(re - rs) / SR
    rise_pitch = 200 + 1800 * (local / (local[-1])) ** 2
    rise_phase = 2 * np.pi * np.cumsum(rise_pitch) / SR
    rise_noise = rng.standard_normal(re - rs) * np.linspace(0.2, 1.0, re - rs)
    riser_sig[rs:re] = (0.2 * np.sin(rise_phase) + 0.3 * rise_noise) * np.linspace(0, 0.6, re - rs)

# ---------- IMPACT: big hit at 36s (start of final peak) ----------
impact_sig = np.zeros(N)
impact_start = 36.0
s = int(impact_start * SR)
e = min(N, s + int(1.0 * SR))
local = np.arange(e - s) / SR
# sub thud + cymbal
sub = np.sin(2 * np.pi * (40 + 30 * np.exp(-local * 10)) * local) * np.exp(-local * 6) * 0.8
cymbal = rng.standard_normal(e - s) * np.exp(-local * 3) * 0.15
impact_sig[s:e] = sub + cymbal

# ---------- MIX ----------
mix = kick_sig + snare_sig + hat_sig + bass_sig + pad_sig + lead_sig + riser_sig + impact_sig

# Soft clip
mix = np.tanh(mix * 1.15) * 0.85

# Normalize
peak = np.max(np.abs(mix))
if peak > 0:
    mix = mix / peak * 0.93

# Stereo with slight panning on lead (R) and hat (L)
left = mix - lead_sig * 0.04 + hat_sig * 0.03
right = mix + lead_sig * 0.04 - hat_sig * 0.03
left = np.clip(left, -1, 1)
right = np.clip(right, -1, 1)

stereo = np.empty((N, 2), dtype=np.float32)
stereo[:, 0] = left
stereo[:, 1] = right
stereo_int16 = (stereo * 32767).astype(np.int16)

out = sys.argv[1] if len(sys.argv) > 1 else "music_v3.wav"
with wave.open(out, "wb") as f:
    f.setnchannels(2)
    f.setsampwidth(2)
    f.setframerate(SR)
    f.writeframes(stereo_int16.tobytes())

print(f"Wrote {out} ({DUR}s @ {BPM} BPM, peak {peak:.3f})")
