import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { updateField } from "../store/formSlice";

export default function FieldSettings() {
  const dispatch = useDispatch<AppDispatch>();
 const steps = useSelector((state: RootState) => state.form.steps);
const currentStepIndex = useSelector((state: RootState) => state.form.currentStepIndex);
const fields = steps[currentStepIndex]?.fields || [];

  const selectedFieldId = useSelector((state: RootState) => state.form.selectedFieldId);

  const field = fields.find((f) => f.id === selectedFieldId);

  const handleChange = (key: string, value: any) => {
    if (field) {
      dispatch(updateField({ id: field.id, updates: { [key]: value } }));
    }
  };

  if (!field) {
    return (
      <div className="w-1/4 p-4 bg-gray-50 border-l text-gray-500">
        Select a field to edit
      </div>
    );
  }

  return (
    <div className="w-1/4 p-4 bg-gray-50 border-l">
      <h2 className="text-xl font-semibold mb-4">Field Settings</h2>
      <div className="space-y-3">
        {/* Label */}
        <div>
          <label className="block font-medium">Label</label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => handleChange("label", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Placeholder */}
        {field.type !== "checkbox" && (
          <div>
            <label className="block font-medium">Placeholder</label>
            <input
              type="text"
              value={field.placeholder || ""}
              onChange={(e) => handleChange("placeholder", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}

        {/* Required */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => handleChange("required", e.target.checked)}
          />
          <label className="font-medium">Required</label>
        </div>

        {/* Dropdown Options */}
        {field.type === "dropdown" && (
          <div>
            <label className="block font-medium">Options (comma separated)</label>
            <input
              type="text"
              value={field.options?.join(",") || ""}
              onChange={(e) =>
                handleChange(
                  "options",
                  e.target.value.split(",").map((opt) => opt.trim())
                )
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}

        {/* Validation for text and textarea */}
        {(field.type === "text" || field.type === "textarea") && (
          <>
            <div>
              <label className="block font-medium">Min Length</label>
              <input
                type="number"
                value={field.minLength ?? ""}
                onChange={(e) =>
                  handleChange(
                    "minLength",
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                className="w-full border px-3 py-2 rounded"
                min={0}
              />
            </div>

            <div>
              <label className="block font-medium">Max Length</label>
              <input
                type="number"
                value={field.maxLength ?? ""}
                onChange={(e) =>
                  handleChange(
                    "maxLength",
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                className="w-full border px-3 py-2 rounded"
                min={0}
              />
            </div>

            <div>
              <label className="block font-medium">Pattern (Regex for Email/Phone)</label>
              <input
                type="text"
                value={field.pattern || ""}
                onChange={(e) => handleChange("pattern", e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="e.g. ^\S+@\S+\.\S+$"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
