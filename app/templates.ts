// src/templates.ts

import type { FieldType } from "./store/formSlice";

export interface TemplateField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  pattern?:string
}

export interface Template {
  id: string;
  name: string;
  fields: TemplateField[];
}

export const predefinedTemplates: Template[] = [
  {
    id: "contact-us",
    name: "Contact Us",
    fields: [
      {
        id: "1",
        type: "text",
        label: "Full Name",
        placeholder: "Enter your name",
        required: true,
      },
      {
        id: "2",
        type: "text",
        label: "Email",
        placeholder: "Enter your email",
        required: true,
        pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
      },
      {
        id: "3",
        type: "textarea",
        label: "Message",
        placeholder: "Write your message here",
        required: true,
      },
    ],
  },
  {
    id: "feedback",
    name: "Feedback Form",
    fields: [
      {
        id: "1",
        type: "text",
        label: "Name",
        placeholder: "Your name",
        required: false,
      },
      {
        id: "2",
        type: "dropdown",
        label: "Rating",
        required: true,
        options: ["Excellent", "Good", "Fair", "Poor"],
      },
      {
        id: "3",
        type: "textarea",
        label: "Comments",
        placeholder: "Your comments",
        required: false,
      },
    ],
  },
];
