import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
}

export const SearchIcon = ({ className }: Props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={18}
      role="presentation"
      viewBox="0 0 24 24"
      width={18}
    >
      <path
        className={clsx(className ? className : "stroke-default-400")}
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={clsx(className ? className : "stroke-default-400")}
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
