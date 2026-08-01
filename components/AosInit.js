"use client";
import { useEffect } from "react";

export default function AosInit() {
  useEffect(() => {
    import("aos").then(({ default: AOS }) => {
      AOS.init({ duration: 280, once: true, offset: 40, easing: "ease-out" });
    });
  }, []);

  return null;
}
