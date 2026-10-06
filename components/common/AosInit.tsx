'use client';

import AOS from 'aos';
import { useEffect } from 'react';

import 'aos/dist/aos.css';

export default function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 80,
    });
  }, []);

  return null;
}
