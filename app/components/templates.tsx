// src/templates.ts
import type { FormStep,FormField } from "~/store/formSlice";

export const contactUsTemplate: FormStep[] = [
  {
    id: "step1",
    name: "Contact Info",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        placeholder: "Enter your name",
        required: true,
      },
      {
        id: "email",
        type: "text",
        label: "Email Address",
        placeholder: "Enter your email",
        required: true,
      },
      {
        id: "message",
        type: "textarea",
        label: "Message",
        placeholder: "Your message here...",
        required: true,
      },
    ],
  },
];

export const feedbackTemplate: FormStep[] = [
  {
    id: "step1",
    name: "Feedback Form",
    fields: [
      {
        id: "feedbackName",
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        required: false,
      },
      {
        id: "rating",
        type: "dropdown",
        label: "Rating",
        required: true,
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: "comments",
        type: "textarea",
        label: "Comments",
        required: false,
        placeholder: "Leave your feedback here...",
      },
    ],
  },
];

export const jobApplicationTemplate: FormStep[] = [
  {
    id: "step1",
    name: "Personal Details",
    fields: [
      { id: "fullName", type: "text", label: "Full Name", placeholder: "Enter your full name", required: true },
      { id: "email", type: "text", label: "Email", placeholder: "Enter your email", required: true },
      { id: "phone", type: "text", label: "Phone Number", placeholder: "Enter your contact number", required: true },
    ],
  },
  {
    id: "step2",
    name: "Resume & Experience",
    fields: [
      { id: "resume", type: "text", label: "Upload Resume", required: true },
      { id: "experience", type: "textarea", label: "Work Experience", placeholder: "Describe your experience", required: false },
    ],
  },
  {
    id: "step3",
    name: "Terms & conditions",
    fields: [
      { id: "resume", type: "text", label: "Share experience", required: true }
    ],
  },
];
