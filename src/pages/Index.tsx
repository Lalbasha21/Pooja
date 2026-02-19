import { useState, useRef, useEffect, useCallback } from "react";
import TempleCurtains from "@/components/TempleCurtains";
import Diya from "@/components/Diya";
import TempleLamp from "@/components/TempleLamp";
import GaneshMurti from "@/components/GaneshMurti";
import CelestialEffects from "@/components/CelestialEffects";
import GarlandsRangoli from "@/components/GarlandsRangoli";
import SoundToggle from "@/components/SoundToggle";
import templeBg from "@/assets/temple-bg.jpg";

const TOTAL_DIYAS = 6;

// Simple bhajan synthesis using Web Audio API oscillators
const createBhajan = (ctx: AudioContext) => {
  const notes = [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25];
  const pattern = [0, 2, 4, 5, 7, 5, 4, 2, 0, 4, 7, 5, 2, 0, 4, 2];

  let time = ctx.currentTime;
  const nodes: AudioNode[] = [];

  const master = ctx.createGain();
  master.gain.value = 0;
  master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 3);
  master.connect(ctx.destination);
  nodes.push(master);

  // Tanpura drone
  const droneOsc = ctx.createOscillator();
  const droneGain = ctx.createGain();
  droneOsc.frequency.value = 130.81;
  droneOsc.type = "sawtooth";
  droneGain.gain.value = 0.04;
  droneOsc.connect(droneGain);
  droneGain.connect(master);
  droneOsc.start();
  nodes.push(droneOsc, droneGain);

  // Harmonic drone
  const droneOsc2 = ctx.createOscillator();
  droneOsc2.frequency.value = 196;
  droneOsc2.type = "sine";
  const drone2Gain = ctx.createGain();
  drone2Gain.gain.value = 0.03;
  droneOsc2.connect(drone2Gain);
  drone2Gain.connect(master);
  droneOsc2.start();
  nodes.push(droneOsc2, drone2Gain);

  // Melody
  const scheduleNextNote = (idx: number) => {
    if (idx >= pattern.length * 4) return;
    const noteIdx = pattern[idx % pattern.length];
    const freq = notes[noteIdx];

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = "triangle";
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(0.08, time + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
    osc.connect(gainNode);
    gainNode.connect(master);
    osc.start(time);
    osc.stop(time + 0.6);
    nodes.push(osc, gainNode);

    time += 0.55;
  };

  // Schedule 80 notes
  for (let i = 0; i < 80; i++) {
    scheduleNextNote(i);
  }

  return { master, nodes };
};

const Index = () => {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [diyasLit, setDiyasLit] = useState<boolean[]>(
    Array(TOTAL_DIYAS).fill(false),
  );
  const [lampsVisible, setLampsVisible] = useState(false);
  const [blessingVisible, setBlessingVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // const audioCtxRef = useRef<AudioContext | null>(null);
  // const masterGainRef = useRef<AudioNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const songSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const allDiyasLit = diyasLit.every(Boolean);
  const litCount = diyasLit.filter(Boolean).length;

  // Initialize audio context on first interaction
  // const initAudio = useCallback(() => {
  //   if (!hasInteracted) {
  //     setHasInteracted(true);
  //     // Create audio context
  //     const ctx = new (
  //       window.AudioContext || (window as any).webkitAudioContext
  //     )();
  //     audioCtxRef.current = ctx;
  //     // Bhajan is muted by default
  //     const { master } = createBhajan(ctx);
  //     masterGainRef.current = master;
  //     (master as GainNode).gain.value = 0;
  //   }
  // }, [hasInteracted]);
  const initAudio = useCallback(async () => {
    if (!hasInteracted) {
      setHasInteracted(true);

      // Create audio context
      const ctx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      audioCtxRef.current = ctx;

      // Create bhajan chain
      const { master } = createBhajan(ctx);
      masterGainRef.current = master;

      // Mute by default
      master.gain.value = 0;

      // 🔊 Load song
      const response = await fetch("/song.mp3"); // <-- replace with your path
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

      // Create source
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;

      // Connect song → master gain
      source.connect(master);
      source.start(0);

      songSourceRef.current = source;
    }
  }, [hasInteracted]);

  const handleCurtainOpen = () => {
    initAudio();
    setCurtainsOpen(true);
  };

  const handleDiyaClick = (idx: number) => {
    if (diyasLit[idx]) return;
    initAudio();

    // Play ignition sound
    if (audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 660;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }

    setDiyasLit((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  // When all diyas lit → reveal lamps + blessing
  useEffect(() => {
    if (allDiyasLit && curtainsOpen) {
      setTimeout(() => setLampsVisible(true), 500);
      setTimeout(() => setBlessingVisible(true), 1200);
    }
  }, [allDiyasLit, curtainsOpen]);

  // Sound toggle
  const handleSoundToggle = () => {
    initAudio();
    setSoundEnabled((prev) => {
      const next = !prev;
      if (audioCtxRef.current && masterGainRef.current) {
        const gain = masterGainRef.current as GainNode;
        gain.gain.linearRampToValueAtTime(
          next ? 0.12 : 0,
          audioCtxRef.current.currentTime + 1,
        );
      }
      return next;
    });
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex flex-col"
      style={{ fontFamily: "Palatino Linotype, serif" }}
    >
      {/* Temple background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${templeBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark overlay for depth */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(to bottom, hsl(20 15% 5% / 0.55), hsl(20 15% 5% / 0.35) 40%, hsl(20 15% 5% / 0.7) 100%)",
        }}
      />

      {/* Celestial particles & mandala */}
      <CelestialEffects active={allDiyasLit} />

      {/* Garlands & Rangoli */}
      <GarlandsRangoli visible={curtainsOpen} />

      {/* ---- MAIN CONTENT ---- */}
      <div className="relative z-20 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start px-4 pt-3 pb-2">
          <div>
            {curtainsOpen && (
              <div
                style={{
                  animation: "lamp-reveal 1s ease forwards",
                  color: "hsl(42 95% 65%)",
                  fontSize: "clamp(11px, 2vw, 14px)",
                  letterSpacing: "2px",
                  textShadow: "0 0 12px hsl(42 95% 55% / 0.6)",
                  fontFamily: "serif",
                }}
              >
                ॐ गं गणपतये नमः
              </div>
            )}
            {curtainsOpen && (
              <div
                style={{
                  color: "hsl(40 30% 55%)",
                  fontSize: "clamp(9px, 1.5vw, 11px)",
                  marginTop: "2px",
                }}
              >
                {litCount < TOTAL_DIYAS
                  ? `Light all ${TOTAL_DIYAS} diyas to awaken divine glory • ${litCount}/${TOTAL_DIYAS} lit`
                  : "🙏 All diyas illuminated • Divine presence awakened"}
              </div>
            )}
          </div>
          <SoundToggle enabled={soundEnabled} onToggle={handleSoundToggle} />
        </div>

        {/* Blessing message */}
        {blessingVisible && (
          <div
            className="absolute left-0 right-0 z-30 flex flex-col items-center"
            style={{
              top: "clamp(60px, 10vh, 100px)",
              animation:
                "blessing-appear 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
          >
            <div
              className="animate-blessing-glow"
              style={{
                background:
                  "linear-gradient(135deg, hsl(42 60% 10% / 0.9), hsl(20 40% 8% / 0.9))",
                border: "1px solid hsl(42 90% 50% / 0.5)",
                borderRadius: "12px",
                padding: "clamp(8px, 2vw, 14px) clamp(16px, 4vw, 32px)",
                boxShadow:
                  "0 0 30px hsl(42 95% 55% / 0.25), inset 0 0 20px hsl(42 95% 55% / 0.05)",
                textAlign: "center",
                maxWidth: "90vw",
              }}
            >
              <div
                style={{
                  color: "hsl(42 95% 70%)",
                  fontSize: "clamp(14px, 3.5vw, 22px)",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  textShadow: "0 0 20px hsl(42 95% 55% / 0.8)",
                }}
              >
                ✨ Shubh Labh ✨
              </div>
              <div
                style={{
                  color: "hsl(35 70% 65%)",
                  fontSize: "clamp(11px, 2.5vw, 16px)",
                  marginTop: "4px",
                  letterSpacing: "0.5px",
                }}
              >
                गणेश जी की कृपा आप पर सदा बनी रहे
              </div>
              <div
                style={{
                  color: "hsl(40 40% 55%)",
                  fontSize: "clamp(9px, 1.8vw, 12px)",
                  marginTop: "6px",
                  fontStyle: "italic",
                }}
              >
                May Lord Ganesha shower his divine blessings upon you
              </div>
            </div>
          </div>
        )}

        {/* Temple stage — lamps + murti + diyas */}
        <div className="flex-1 flex flex-col items-center justify-center relative px-4">
          {/* Lamps row + Murti */}
          <div className="flex items-end justify-center gap-4 md:gap-8 mb-4 md:mb-6">
            {/* Left lamp pair */}
            <div className="flex gap-2 md:gap-4">
              <TempleLamp visible={lampsVisible} side="left" delay={0} />
              <TempleLamp visible={lampsVisible} side="left" delay={300} />
            </div>

            {/* Ganesh Murti center */}
            <GaneshMurti revealed={curtainsOpen} allDiyasLit={allDiyasLit} />

            {/* Right lamp pair */}
            <div className="flex gap-2 md:gap-4">
              <TempleLamp visible={lampsVisible} side="right" delay={150} />
              <TempleLamp visible={lampsVisible} side="right" delay={450} />
            </div>
          </div>

          {/* Diya shelf */}
          {curtainsOpen && (
            <div
              className="relative flex flex-col items-center"
              style={{
                animation: "lamp-reveal 0.8s ease 0.3s both",
              }}
            >
              {/* Shelf base */}
              <div
                className="flex items-end gap-3 md:gap-6 px-6 md:px-10 py-3 md:py-4 rounded-xl"
                style={{
                  background:
                    "linear-gradient(to bottom, hsl(30 30% 12%), hsl(25 25% 8%))",
                  border: "1px solid hsl(42 60% 30% / 0.5)",
                  boxShadow:
                    "0 4px 20px hsl(0 0% 0% / 0.5), inset 0 1px 0 hsl(42 60% 40% / 0.3)",
                }}
              >
                {diyasLit.map((lit, idx) => (
                  <Diya
                    key={idx}
                    lit={lit}
                    onClick={() => handleDiyaClick(idx)}
                    delay={idx * 80}
                  />
                ))}
              </div>

              {/* Shelf label */}
              <div
                className="mt-2"
                style={{
                  color: "hsl(40 30% 50%)",
                  fontSize: "clamp(9px, 1.8vw, 12px)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {allDiyasLit
                  ? "🙏 All Diyas Lit — Divine Grace Awakened"
                  : "Tap each diya to light it"}
              </div>
            </div>
          )}

          {/* Pre-curtain instruction */}
          {!curtainsOpen && (
            <div
              className="text-center"
              style={{
                color: "hsl(42 70% 55%)",
                fontSize: "clamp(12px, 2.5vw, 18px)",
                letterSpacing: "1px",
                textShadow: "0 0 20px hsl(42 95% 55% / 0.4)",
                animation: "blessing-glow-pulse 2s ease-in-out infinite",
              }}
            >
              <div style={{ fontSize: "clamp(24px, 5vw, 40px)" }}>🔔</div>
              <div>Pull the sacred rope to unveil the temple</div>
              <div
                style={{
                  fontSize: "clamp(10px, 1.8vw, 14px)",
                  color: "hsl(40 30% 45%)",
                  marginTop: "8px",
                }}
              >
                ← Find the rope on the right side →
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="text-center pb-2"
          style={{
            color: "hsl(40 20% 35%)",
            fontSize: "clamp(9px, 1.5vw, 11px)",
            letterSpacing: "3px",
          }}
        >
          🕉 DIVINE GANESH MANDIR 🕉
        </div>
      </div>

      {/* Curtains — on top of everything */}
      <TempleCurtains isOpen={curtainsOpen} onOpen={handleCurtainOpen} />
    </div>
  );
};

export default Index;