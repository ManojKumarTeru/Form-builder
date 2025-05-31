import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { contactUsTemplate, feedbackTemplate, jobApplicationTemplate } from "./templates";
import { loadTemplate, selectField, addField, reorderFields } from "../store/formSlice";
import { useTheme } from "~/theme-context";
import { v4 as uuidv4 } from "uuid";
import type { FieldType, FormField } from "../store/formSlice";
import type { FormStep } from "../store/formSlice";
import Progress from "./Progress";

// Type guard for field validation
const isValidFieldType = (type: string): type is FieldType => {
  return ["text", "textarea", "checkbox", "dropdown", "date"].includes(type);
};

function StepProgress({
  steps,
  currentStepIndex,
}: {
  steps: FormStep[];
  currentStepIndex: number;
}) {
  return (
    <div
      className="flex space-x-6 mb-6"
      role="progressbar"
      aria-valuenow={currentStepIndex + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
    >

      {steps.map((step, index) => (
        <div key={step.id ?? index} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index === currentStepIndex
                ? "bg-blue-600 text-white"
                : index < currentStepIndex
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {index + 1}
          </div>
          <span className="ml-2">{step.name ?? step}</span>
        </div>
      ))}
    </div>
  );
}

export default function FormCanvas() {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const steps = useSelector((state: RootState) => state.form.steps);
  const currentStepIndex = useSelector((state: RootState) => state.form.currentStepIndex);
  const selectedFieldId = useSelector((state: RootState) => state.form.selectedFieldId);

  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [shareLink, setShareLink] = useState("");

  const dragOverIndex = useRef<number | null>(null);

  const fieldsForCurrentStep: FormField[] = steps[currentStepIndex]?.fields ?? [];

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("field-type");

    if (isValidFieldType(type)) {
      dispatch(
        addField({
          id: uuidv4(),
          type,
          label: `Untitled ${type}`,
          placeholder: "",
          required: false,
          options: type === "dropdown" ? ["Option 1", "Option 2"] : undefined,
        } as FormField)
      );
    } else {
      const fromIndex = parseInt(e.dataTransfer.getData("reorder-index"), 10);
      if (dragOverIndex.current !== null && !isNaN(fromIndex)) {
        dispatch(reorderFields({ fromIndex, toIndex: dragOverIndex.current }));
      }
    }

    dragOverIndex.current = null;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    dragOverIndex.current = index;
  };

  const validateStepFields = (fieldsToValidate: FormField[]) => {
    for (const field of fieldsToValidate) {
      if (field.required && (!field.label || field.label.trim() === "")) {
        alert(`Field "${field.label || "Untitled"}" label is required.`);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStepFields(fieldsForCurrentStep)) {
      if (currentStepIndex < steps.length - 1) {
        dispatch({ type: "form/nextStep" });
      }
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      dispatch({ type: "form/prevStep" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStepFields(fieldsForCurrentStep)) {
      alert("Form is valid and submitted!");
    }
  };

  const handleSave = () => {
    const formId = uuidv4();
    localStorage.setItem(formId, JSON.stringify(steps));
    const link = `${window.location.origin}/fill/${formId}`;
    setShareLink(link);
  };

  const containerWidthClass =
    previewMode === "desktop"
      ? "max-w-4xl"
      : previewMode === "tablet"
      ? "max-w-md"
      : "max-w-xs";

  return (
    <div
      className="flex-1 p-4 overflow-y-auto"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >

      <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded border"
      aria-label="Toggle dark/light theme"
    >
      {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
    </button>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Load a Template</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => dispatch(loadTemplate(contactUsTemplate))}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
          >
            Contact Us
          </button>
          <button
            onClick={() => dispatch(loadTemplate(feedbackTemplate))}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
          >
            Feedback
          </button>
          <button
            onClick={() => dispatch(loadTemplate(jobApplicationTemplate))}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
          >
            Job Application
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Form Preview</h2>
      <Progress steps={steps} currentStepIndex={currentStepIndex} />

      <div className="mb-4 flex space-x-2">
        {["desktop", "tablet", "mobile"].map((mode) => (
          <button
            key={mode}
            onClick={() => setPreviewMode(mode as typeof previewMode)}
            className={`px-3 py-1 rounded ${
              previewMode === mode ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            aria-pressed={previewMode === mode}
            aria-label={`Preview ${mode} Mode`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      <div
        className={`mx-auto border rounded p-4 bg-white shadow ${containerWidthClass}`}
        style={{ minHeight: "400px" }}
        role="region"
        aria-live="polite"
        aria-label={`Form preview in ${previewMode} mode, ${steps[currentStepIndex]?.name}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {fieldsForCurrentStep.map((field, index) => (
              <div
                key={field.id}
                className={`p-3 border rounded ${
                  field.id === selectedFieldId
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                draggable
                onClick={() => dispatch(selectField(field.id))}
                onDragStart={(e) =>
                  e.dataTransfer.setData("reorder-index", index.toString())
                }
                onDragOver={(e) => handleDragOver(e, index)}
              >
                <label className="block font-medium mb-1">
                  {field.label} {field.required && "*"}
                </label>

                {(field.type === "text" || field.type === "date") && (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    minLength={field.minLength}
                    maxLength={field.maxLength}
                    pattern={field.pattern}
                    className="w-full border px-3 py-2 rounded"
                  />
                )}

                {field.type === "textarea" && (
                  <textarea
                    placeholder={field.placeholder}
                    required={field.required}
                    minLength={field.minLength}
                    maxLength={field.maxLength}
                    className="w-full border px-3 py-2 rounded"
                  />
                )}

                {field.type === "checkbox" && (
                  <input type="checkbox" required={field.required} />
                )}

                {field.type === "dropdown" && (
                  <select
                    className="w-full border px-3 py-2 rounded"
                    required={field.required}
                  >
                    {field.options?.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              disabled={currentStepIndex === 0}
              onClick={handleBack}
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
              Back
            </button>

            {currentStepIndex < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save and Generate Link
      </button>

      {shareLink && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <p>Share this form link:</p>
          <a href={shareLink} className="text-blue-600 underline">
            {shareLink}
          </a>
        </div>
      )}
    </div>
  );
}
