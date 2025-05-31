// src/components/StepProgress.tsx

import React from "react";
import { useDispatch } from "react-redux";
import { goToStep } from "../store/formSlice";
import type { FormStep } from "../store/formSlice";

interface StepProgressProps {
  steps: FormStep[];
  currentStepIndex: number;
}

export default function Progress({
  steps,
  currentStepIndex,
}: StepProgressProps) {
  const dispatch = useDispatch();

  return (
    <div
      className="flex space-x-6 mb-6"
      role="progressbar"
      aria-valuenow={currentStepIndex + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
    >
      {steps.map((step, index) => (
        <button
          key={step.id}
          onClick={() => dispatch(goToStep(index))}
          className="flex items-center focus:outline-none"
          type="button"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index === currentStepIndex
                ? "bg-blue-600 text-white"
                : index < currentStepIndex
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {index < currentStepIndex ? "✓" : index + 1}
          </div>
          <span className="ml-2">{step.name || `Step ${index + 1}`}</span>
        </button>
      ))}
    </div>
  );
}
