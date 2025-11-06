"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputIcon } from "lucide-react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import z from "zod";
import Image from "next/image";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  placeholder: string;
  isPending: boolean;
  onSubmit?: (values: z.infer<typeof formSchema>) => void | Promise<void>;
  confirmText?: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
  description: z.string().optional(),
  layout: z.enum(["single", "multi"]),
})

const layoutOptions = [
  { value: "single", label: "Single Step", image: "/single.png" },
  { value: "multi", label: "Multi Step", image: "/multi.png" },
]

export const EntityDialogComponent = memo(({
  isOpen,
  isPending,
  onOpenChange,
  onSubmit,
  confirmText = "Create",
}: ConfirmationDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      layout: "single",
    },
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (isPending) return; // prevent closing while pending
        onOpenChange(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <FormInputIcon />
            </div>
          </div>
          <DialogTitle>Create new form</DialogTitle>
          <DialogDescription>Give name and description for your form</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-accent-foreground">Form Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter form name" {...field} className="w-full font-mono text-xs" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
<FormField
  control={form.control}
  name="layout"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-xs text-accent-foreground">Layout</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          value={field.value}
          className="flex gap-3"
        >
          <label>
            <RadioGroupItem
              value="single"
              className="peer sr-only after:absolute after:inset-0"
            />
            <div className="relative cursor-pointer overflow-hidden rounded-md border border-input w-[120px] h-[80px] flex items-center justify-center text-sm font-medium shadow-xs transition outline-none peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-data-[state=checked]:border-ring">
              Single Step
            </div>
          </label>

          <label>
            <RadioGroupItem
              value="multi"
              className="peer sr-only after:absolute after:inset-0"
            />
            <div className="relative cursor-pointer overflow-hidden rounded-md border border-input w-[120px] h-[80px] flex items-center justify-center text-sm font-medium shadow-xs transition outline-none peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-data-[state=checked]:border-ring">
              Multi Step
            </div>
          </label>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>




            
            <div className="flex flex-col sm:flex-row sm:justify-end">
              <Button type="submit" disabled={isPending} className="cursor-pointer">
                {isPending ? "Creating..." : confirmText}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});