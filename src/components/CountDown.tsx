"use client"
import React, { useEffect, useState } from 'react'

const CountDown = () => {

    const difference = +new Date(`07/21/2025`) - +new Date();
    const [delay, setDelay] = useState(difference);

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const m = Math.floor((difference / 1000 / 60) % 60);
    const s = Math.floor((difference / 1000) % 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setDelay(delay - 1);
        }, 1000);

        if (delay === 0) {
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        };
    });
    return (
        <span className="font-bold text-5xl text-yellow-300">
            {d}:{h}:{m}:{s}
        </span>
    );
};

export default CountDown;
