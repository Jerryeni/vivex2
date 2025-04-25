import React from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
}) => {
  const [minVal, maxVal] = value;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), maxVal - step);
    onChange([newMin, maxVal]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), minVal + step);
    onChange([minVal, newMax]);
  };

  const calculatePercent = (val: number) =>
    Math.round(((val - min) / (max - min)) * 100);

  return (
    <div className="relative h-10">
      {/* Slider Track */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-gray-200 rounded" />

      {/* Range Highlight */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 h-2 bg-orange-500 rounded"
        style={{
          left: `${calculatePercent(minVal)}%`,
          width: `${calculatePercent(maxVal) - calculatePercent(minVal)}%`,
        }}
      />

      {/* Min Thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={handleMinChange}
        className="absolute top-0 left-0 w-full pointer-events-none appearance-none z-20"
        style={{ WebkitAppearance: 'none' }}
      />

      {/* Max Thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={handleMaxChange}
        className="absolute top-0 left-0 w-full pointer-events-none appearance-none z-20"
        style={{ WebkitAppearance: 'none' }}
      />

      {/* Thumb Styling */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          pointer-events: all;
          width: 16px;
          height: 16px;
          background: #f97316; /* Tailwind orange-500 */
          border-radius: 50%;
          cursor: pointer;
          -webkit-appearance: none;
        }

        input[type='range']::-moz-range-thumb {
          pointer-events: all;
          width: 16px;
          height: 16px;
          background: #f97316;
          border-radius: 50%;
          cursor: pointer;
        }

        input[type='range'] {
          background: transparent;
        }
      `}</style>
    </div>
  );
};