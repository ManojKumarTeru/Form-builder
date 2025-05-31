import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Define field types
export type FieldType = "text" | "textarea" | "checkbox" | "dropdown" | "date";

// Define structure of a single form field
export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

// Define structure of a form step
export interface FormStep {
  id: string;
  name: string;
  fields: FormField[];
}

// Define global state structure
export interface FormState {
  steps: FormStep[];
  selectedFieldId: string | null;
  currentStepIndex: number;
}

// Initial state
const initialState: FormState = {
  steps: [
    {
      id: uuidv4(),
      name: "Step 1",
      fields: [],
    },
  ],
  selectedFieldId: null,
  currentStepIndex: 0,
};

// Slice definition
export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<FormField>) => {
      state.steps[state.currentStepIndex].fields.push(action.payload);
    },
    selectField: (state, action: PayloadAction<string>) => {
      state.selectedFieldId = action.payload;
    },
    updateField: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<FormField> }>
    ) => {
      const currentFields = state.steps[state.currentStepIndex].fields;
      const index = currentFields.findIndex((f) => f.id === action.payload.id);
      if (index !== -1) {
        currentFields[index] = {
          ...currentFields[index],
          ...action.payload.updates,
        };
      }
    },
    deleteField: (state, action: PayloadAction<string>) => {
      state.steps[state.currentStepIndex].fields = state.steps[
        state.currentStepIndex
      ].fields.filter((f) => f.id !== action.payload);
    },
    reorderFields: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const currentFields = state.steps[state.currentStepIndex].fields;
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= currentFields.length ||
        toIndex >= currentFields.length
      ) {
        return;
      }

      const [movedField] = currentFields.splice(fromIndex, 1);
      currentFields.splice(toIndex, 0, movedField);
    },
    replaceFields: (state, action: PayloadAction<FormField[]>) => {
      state.steps[state.currentStepIndex].fields = action.payload;
      state.selectedFieldId = null;
    },
    nextStep: (state) => {
      if (state.currentStepIndex < state.steps.length - 1) {
        state.currentStepIndex += 1;
        state.selectedFieldId = null;
      }
    },
    prevStep: (state) => {
      if (state.currentStepIndex > 0) {
        state.currentStepIndex -= 1;
        state.selectedFieldId = null;
      }
    },
    goToStep: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.steps.length) {
        state.currentStepIndex = index;
        state.selectedFieldId = null;
      }
    },
    addStep: (state, action: PayloadAction<{ name: string }>) => {
      state.steps.push({
        id: uuidv4(),
        name: action.payload.name,
        fields: [],
      });
    },
    removeStep: (state, action: PayloadAction<string>) => {
      state.steps = state.steps.filter((step) => step.id !== action.payload);
      if (state.currentStepIndex >= state.steps.length) {
        state.currentStepIndex = Math.max(0, state.steps.length - 1);
      }
    },
    renameStep: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const step = state.steps.find((s) => s.id === action.payload.id);
      if (step) {
        step.name = action.payload.name;
      }
    },
    loadTemplate: (state, action: PayloadAction<FormStep[]>) => {
      state.steps = action.payload;
      state.currentStepIndex = 0;
      state.selectedFieldId = null;
    },
  },
});

export const {
  addField,
  updateField,
  selectField,
  deleteField,
  reorderFields,
  replaceFields,
  nextStep,
  prevStep,
  goToStep,
  addStep,
  removeStep,
  renameStep,
  loadTemplate,
} = formSlice.actions;

export default formSlice.reducer;

// --- Selector helpers ---
// These should be used with useSelector((state: RootState) => ...)
export const selectTotalSteps = (state: { form: FormState }) =>
  state.form.steps.length;

export const selectCurrentStep = (state: { form: FormState }) =>
  state.form.currentStepIndex + 1; // 1-based index for UI
