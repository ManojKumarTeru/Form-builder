// app/routes/fill.$id.tsx
import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

interface FormStep {
  id: string;
  name: string;
  fields: FormField[];
}

export default function PublicFormView() {
  const { id } = useParams();
  const [steps, setSteps] = useState<FormStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(id!);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSteps(parsed);
      } catch (error) {
        setNotFound(true);
      }
    } else {
      setNotFound(true);
    }
  }, [id]);

  if (notFound) {
    return <div className="p-6 text-red-600 text-center">Form not found!</div>;
  }

  const currentStep = steps[currentStepIndex];

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      console.log("Form Submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Fill the Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {currentStep?.fields.map((field) => (
          <div key={field.id} className="space-y-1">
            <label className="block font-medium">
              {field.label} {field.required && "*"}
            </label>

            {["text", "date"].includes(field.type) && (
              <input
                type={field.type}
                value={formData[field.id] || ""}
                placeholder={field.placeholder}
                required={field.required}
                minLength={field.minLength}
                maxLength={field.maxLength}
                pattern={field.pattern}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            )}

            {field.type === "textarea" && (
              <textarea
                placeholder={field.placeholder}
                value={formData[field.id] || ""}
                required={field.required}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            )}

            {field.type === "checkbox" && (
              <input
                type="checkbox"
                checked={!!formData[field.id]}
                onChange={(e) => handleChange(field.id, e.target.checked)}
              />
            )}

            {field.type === "dropdown" && (
              <select
                value={formData[field.id] || ""}
                required={field.required}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select...</option>
                {field.options?.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            disabled={currentStepIndex === 0}
            onClick={() => setCurrentStepIndex((prev) => prev - 1)}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {currentStepIndex < steps.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
