export default function DocumentIcon({
  className,
  text,
}: {
  className: string;
  text: string;
}) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.99995 0H52.4823L74.9998 22.4301V75C74.9998 77.7625 72.7599 80 69.9999 80H9.99995C7.23988 80 5 77.7625 5 75V4.99995C5 2.23755 7.24014 0 9.99995 0Z"
        fill="#F3EEEE"
      />
      <rect
        x="2.18481"
        y="14.8691"
        width="41"
        height="22"
        rx="4"
        fill="currentFill"
      />
      <path
        d="M74.9275 22.4998H57.5C54.7399 22.4998 52.5 20.2599 52.5 17.4998V0.0498047L74.9275 22.4998Z"
        fill="#D2BDBE"
      />
      <text y="31.179085" x="6.772306" fill="currentColor">
        {text}
      </text>
      <rect
        x="14.5071"
        y="45.4116"
        width="51.4643"
        height="5.33333"
        rx="2.66667"
        fill="white"
      />
      <rect
        x="14.5066"
        y="55.8022"
        width="51.4643"
        height="5.33333"
        rx="2.66667"
        fill="white"
      />
      <rect
        x="14.5066"
        y="66.1914"
        width="34.3128"
        height="5.33333"
        rx="2.66667"
        fill="white"
      />
    </svg>
  );
}
