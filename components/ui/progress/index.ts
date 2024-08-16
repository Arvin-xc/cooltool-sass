import { type VariantProps, cva } from "class-variance-authority";

export { default as Progress } from "./Progress.vue";

export const progressVariants = cva("", {
  variants: {
    variant: {
      default: "bg-primary",
      secondary: "bg-secondary",
      success: "bg-success",
      error: "bg-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type ProgressVariants = VariantProps<typeof progressVariants>;
