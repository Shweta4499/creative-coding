"use client";
import { useEffect, useState } from "react";
import batBg from "../bat.jpg";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    RotateCcw,
    Volume2,
} from "lucide-react";

// Replace these original demo lines with lyrics you have permission to use.
const lines = [
    "Hum toh mar hi ",
    "chuke the",
    "Phir janam ...",
    "aa raha hai",
    "♪",
    " Sajan Sajan",
    " teri dulhan ",
    "tujhko pukaare",
    "aaa ja.....",
    "Aakar mere ",
    "haathon mein",
    " mehendi tu hi",
    " rachaa ja.....",
];
export default function Home() {
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [speed, setSpeed] = useState(3);
    const [typed, setTyped] = useState("");
    useEffect(() => {
        if (!playing) return;
        const t = setTimeout(
            () => setIndex((i) => (i + 1) % lines.length),
            speed * 1800,
        );
        return () => clearTimeout(t);
    }, [index, playing, speed]);
    useEffect(() => {
        setTyped("");
        let n = 0;
        const id = setInterval(() => {
            n++;
            setTyped((lines[index] as string).slice(0, n));
            if (n >= (lines[index] as string).length) clearInterval(id);
        }, 55);
        return () => clearInterval(id);
    }, [index]);
    const prev = () => setIndex((i) => (i - 1 + lines.length) % lines.length);
    const next = () => setIndex((i) => (i + 1) % lines.length);
    return (
        <main
            className="scene"
            style={{ backgroundImage: `url(${batBg.src})` }}
        >
            <div className="moon" />
            <div className="cloud cloud1" />
            <div className="cloud cloud2" />
            <div className="bat-mark">✦</div>
            <div className="city">
                {Array.from({ length: 24 }, (_, i) => (
                    <i
                        key={i}
                        style={{
                            height: `${45 + ((i * 37) % 130)}px`,
                            width: `${22 + ((i * 7) % 28)}px`,
                        }}
                    />
                ))}
            </div>
            <div className="rain" />
            <section className="hero">
                <div className="device">
                    <div className="screw tl" />
                    <div className="screw tr" />
                    <div className="screw bl" />
                    <div className="screw br" />
                    <div className="board-top">
                        <span>SSD1306 // 128×64</span>
                        <span className="board-power">
                            <i /> POWER
                        </span>
                    </div>
                    <div className="oled">
                        <div className="oled-top">
                            <span>NOW PLAYING</span>
                            <span>
                                {String(index + 1).padStart(2, "0")} /{" "}
                                {String(lines.length).padStart(2, "0")}
                            </span>
                        </div>
                        <div className="wave">
                            {Array.from({ length: 27 }, (_, i) => (
                                <i
                                    key={i}
                                    style={{
                                        height: `${8 + ((i * 13 + index * 9) % 28)}px`,
                                        animationDelay: `${i * 0.035}s`,
                                    }}
                                />
                            ))}
                        </div>
                        <div className="lyric" key={index}>
                            {typed}
                            <span className="cursor">▋</span>
                        </div>
                    </div>
                    <div className="board-bottom">
                        <span>VCC</span>
                        <span>GND</span>
                        <span>SCL</span>
                        <span>SDA</span>
                        <span className="leds">
                            <i />
                            <i />
                            <i />
                        </span>
                    </div>
                </div>
            </section>
        </main>
    );
}
