/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Image from 'next/image';

interface AHSLogoProps {
  className?: string;
  type?: 'icon' | 'horizontal' | 'full';
  iconSize?: number;
  /** @deprecated No longer used - styling is handled via className */
  textColor?: 'dark' | 'light';
}

export default function AHSLogo({
  className = '',
  type = 'full',
  iconSize = 40,
  textColor: _textColor,
}: AHSLogoProps) {
  void _textColor;
  if (type === 'icon') {
    return (
      <div
        className={`relative select-none shrink-0 ${className}`}
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src="/assets/ahspdl1.png"
          alt="AHS Logo"
          fill
          className="object-contain"
          sizes="40px"
        />
      </div>
    );
  }

  if (type === 'horizontal') {
    return (
      <div className={`flex items-center select-none ${className}`}>
        <div style={{ height: iconSize * 1.5, width: iconSize * 2 }} className="relative">
          <Image
            src="/assets/ahspdl1.png"
             loading="eager"
            alt="AHS Properties & Development Ltd."
            fill
            className="object-contain"
            sizes="120px"
          />
        </div>
        <div>
          <h1 className="text-sm font-bold 
          text-amber-700">AHS Properties</h1>
          <h1 className="text-sm font-bold text-amber-700"> & Development Ltd.</h1>
        </div>
      </div>
    );
  }

  // Full, vertically-arranged premium representation
  return (
    <div className={`flex flex-col items-center text-center justify-center select-none ${className}`}>
      <div
        style={{ width: iconSize * 2.8, height: iconSize * 2.2 }}
        className="relative mx-auto"
      >
        <Image
          src="/assets/ahspdLogoM.png"
          alt="AHS Logo"
          fill
          className="object-contain "
          sizes="180px"
        />
      </div>
    </div>
  );
}
