import { useEffect, useRef, useState } from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = "", width = 432, height = 596 }: LogoProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate pupil offset for both eyes (using transform instead of absolute position)
  function calculatePupilOffset(eyeCenterX: number, eyeCenterY: number) {
    if (!svgRef.current) return { x: 0, y: 0 };

    const svgRect = svgRef.current.getBoundingClientRect();

    // Convert eye coordinates to screen coordinates
    const eyeScreenX = svgRect.left + (eyeCenterX / 432) * svgRect.width;
    const eyeScreenY = svgRect.top + (eyeCenterY / 596) * svgRect.height;

    // Calculate direction from eye to mouse
    const deltaX = mousePosition.x - eyeScreenX;
    const deltaY = mousePosition.y - eyeScreenY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Limit pupil movement within the eye (radius constraint)
    const maxPupilDistance = 8; // Maximum distance pupil can move from center
    const pupilDistance = Math.min(distance / 10, maxPupilDistance);

    // Calculate pupil offset from center
    const angle = Math.atan2(deltaY, deltaX);
    const offsetX = Math.cos(angle) * pupilDistance;
    const offsetY = Math.sin(angle) * pupilDistance;

    return { x: offsetX, y: offsetY };
  }

  const leftPupilOffset = calculatePupilOffset(118, 174);
  const rightPupilOffset = calculatePupilOffset(312, 174);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox="0 0 432 596"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M45.5081 286C49.1161 287.325 52.4129 289.002 55.7696 290.867C76.7811 302.472 99.6008 310.225 122.375 317.578C147.413 325.673 173.419 335.57 193.508 353C194.837 354.089 194.837 354.089 196.192 355.199C211.528 368.202 222.689 387.96 225.508 408C228.653 446.493 214.384 479.373 190.065 508.743C186.702 512.649 183.125 516.331 179.508 520C178.783 520.745 178.057 521.489 177.309 522.256C152.282 547.907 152.282 547.907 147.168 548.078C143.216 546.476 140.453 543.847 137.321 541C136.325 540.116 136.325 540.116 135.31 539.214C133.368 537.485 131.437 535.744 129.508 534C128.567 533.16 127.626 532.319 126.657 531.453C125.051 530.016 123.451 528.574 121.856 527.125C120.186 525.614 118.505 524.115 116.817 522.625C115.488 521.449 115.488 521.449 114.133 520.25C113.342 519.554 112.55 518.858 111.735 518.141C109.411 515.907 107.512 513.522 105.508 511C103.858 509.317 102.19 507.651 100.508 506C68.113 472.652 42.9713 429.989 34.5081 384C34.3241 383.02 34.1401 382.039 33.9505 381.029C32.4363 372.228 32.0271 363.531 32.0081 354.625C32.0054 353.873 32.0028 353.121 32 352.345C32.0134 334.798 32.5898 298.918 45.5081 286Z"
        fill="url(#paint0_linear_26_3304)"
      />
      <path
        d="M106.952 63.2673C108.126 61.4382 108.867 58.8778 110.538 57.8893C136.792 42.3574 165.009 32.7554 195.499 29.9272C221.72 27.4952 247.566 29.2422 273.074 35.8238C288.407 39.7803 303.527 44.4115 317.337 52.3266C320.685 54.2455 323.136 57.7294 325.778 61.1022C322.365 63.5233 319.173 65.3359 315.665 67.2731C301.523 75.9665 287.276 83.9359 273.962 93.2394C252.009 108.58 234.456 128.206 221.16 151.541C219.404 154.623 217.58 157.665 215.994 160.373C209.895 151.724 203.999 143.363 198.057 134.709C197.674 133.945 197.337 133.473 197 133.001C197 133.001 196.999 133 196.851 132.711C195.473 130.925 194.242 129.428 192.928 127.726C192.679 127.265 192.451 127.087 191.987 126.695C181.148 116.237 171.422 104.774 159.595 96.2167C142.861 84.1094 124.575 74.1467 106.952 63.2673Z"
        fill="#131416"
      />
      <circle cx="312" cy="174" r="27" fill="white" />
      <circle cx="118" cy="174" r="27" fill="white" />
      {/* Animated pupils */}
      <circle 
        cx="118" 
        cy="174" 
        r="8" 
        fill="#171718"
        style={{
          transform: `translate(${leftPupilOffset.x}px, ${leftPupilOffset.y}px)`,
          transition: "transform 0.1s ease-out"
        }}
      />
      <circle 
        cx="312" 
        cy="174" 
        r="8" 
        fill="#171718"
        style={{
          transform: `translate(${rightPupilOffset.x}px, ${rightPupilOffset.y}px)`,
          transition: "transform 0.1s ease-out"
        }}
      />
      <path
        d="M431 0C432.077 3.24713 431.924 5.09431 430.812 8.30859C430.53 9.1315 430.247 9.9544 429.956 10.8022C429.64 11.6719 429.325 12.5415 429 13.4375C428.677 14.3355 428.355 15.2335 428.023 16.1587C421.714 33.2667 411.59 47.8954 399 61C398.108 61.9552 397.216 62.9104 396.297 63.8945C375.674 85.5974 347.974 97.6642 320.836 109.219C305.771 115.638 291.934 123.929 279 134C278.148 134.66 277.296 135.32 276.418 136C264.494 145.497 253.139 155.757 244 168C243.513 168.639 243.026 169.278 242.525 169.936C234.786 180.12 228.108 190.55 222.141 201.86C220.146 205.602 218.07 209.299 216 213C215.34 213 214.68 213 214 213C213.749 212.508 213.499 212.016 213.241 211.51C187.662 161.535 153.038 128.711 101.664 106.223C76.989 95.4078 55.5913 84.6704 36 66C35.2807 65.3336 34.5614 64.6671 33.8203 63.9805C27.806 58.2439 22.9109 51.6725 18 45C17.4547 44.2846 16.9095 43.5691 16.3477 42.832C8.79744 32.3538 1.39843 17.9919 0 5C0.33 4.01 0.66 3.02 1 2C1.66645 2.49629 2.33289 2.99258 3.01953 3.50391C9.51974 8.29497 16.1479 12.7328 23 17C24.2064 17.7685 25.4121 18.5381 26.6172 19.3086C36.5301 25.6192 46.6747 31.3949 57 37C57.9832 37.5367 58.9665 38.0735 59.9795 38.6265C71.3133 44.8103 82.6725 50.9082 94.25 56.625C143.442 80.9496 188.781 110.197 215 160C217.235 157.188 219.064 154.241 220.852 151.129C238.236 121.03 263.926 96.5688 293.948 79.1953C296.439 77.7444 298.909 76.2611 301.383 74.7812C315.239 66.5702 329.353 59.1341 343.823 52.0745C352.804 47.6818 361.538 42.9714 370.218 38.0105C372.746 36.577 375.299 35.1912 377.855 33.8086C396.312 23.7837 414.245 12.6906 431 0Z"
        fill="#4A4C50"
      />
      <path
        d="M50.6561 106L67.6765 115.47L64.6182 119.738C64.6182 119.738 55.4431 134.542 54.1133 140.277C54.1133 140.277 47.0658 156.149 47.0658 166.419C47.0658 166.419 40.1513 200.829 67.6765 230.305C67.6765 230.305 82.7023 248.444 110.095 258.18C110.095 258.18 170.597 273.918 188.415 311.53C188.415 311.53 192.936 318.465 194 323C194 323 178.176 308.862 165.411 303.394C165.411 303.394 149.986 292.591 101.85 281.654C101.85 281.654 63.9533 269.517 49.4593 249.511C49.4593 249.511 26.987 228.704 23.6627 188.425C23.5297 188.559 16.6152 143.478 50.6561 106Z"
        fill="url(#paint1_linear_26_3304)"
      />
      <path
        d="M379.344 107L362.324 116.47L365.382 120.738C365.382 120.738 374.557 135.542 375.887 141.277C375.887 141.277 382.934 157.149 382.934 167.419C382.934 167.419 389.849 201.829 362.324 231.305C362.324 231.305 347.298 249.444 319.905 259.18C319.905 259.18 259.403 274.918 241.585 312.53C241.585 312.53 237.064 319.465 236 324C236 324 251.824 309.862 264.589 304.394C264.589 304.394 280.014 293.591 328.15 282.654C328.15 282.654 366.047 270.517 380.541 250.511C380.541 250.511 403.013 229.704 406.337 189.425C406.47 189.559 413.385 144.478 379.344 107Z"
        fill="url(#paint2_linear_26_3304)"
      />
      <path
        d="M393.268 290C393.268 290 335.219 335.091 295.543 406.941C295.543 406.941 255.601 471.031 227.242 498.192C227.242 498.192 190.761 537.128 164 558.268L212.197 596C212.197 596 326.831 516.523 354.924 474.911C354.791 474.911 423.624 403.195 393.268 290Z"
        fill="url(#paint3_linear_26_3304)"
      />
      <path
        d="M215 217C215 217 205.254 237.293 192 248.435L215 293V217Z"
        fill="#56585C"
      />
      <path
        d="M215 217C215 217 224.746 237.293 238 248.435L215 293V217Z"
        fill="#171718"
      />
      <defs>
        <linearGradient
          id="paint0_linear_26_3304"
          x1="128.97"
          y1="548.078"
          x2="128.97"
          y2="286"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#171718" />
          <stop offset="1" stopColor="#535050" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_26_3304"
          x1="67.5"
          y1="115.5"
          x2="194"
          y2="323"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#171718" />
          <stop offset="1" stopColor="#B5BAC2" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_26_3304"
          x1="379"
          y1="107"
          x2="236"
          y2="324"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#171718" />
          <stop offset="1" stopColor="#B5BAC2" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_26_3304"
          x1="211.5"
          y1="596"
          x2="393.5"
          y2="290"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#171718" />
          <stop offset="1" stopColor="#535151" />
        </linearGradient>
      </defs>
    </svg>
  );
}
