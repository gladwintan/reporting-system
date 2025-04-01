"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const reportFormSchema = z.object({
  reportType: z.string().min(1, { message: "Report type is required" }),
  targetId: z.string().min(1, { message: "Target ID is required" }),
  reason: z.string().min(1, { message: "Reason is required" }),
  description: z.string().optional(),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

export default function Report() {
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      reportType: "",
      targetId: "",
      reason: "",
      description: "",
    },
  });

  const onSubmit = async (values: ReportFormValues) => {
    try {
      const response = await fetch("/api/reports/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the report");
      }

      alert("Report submitted successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Report Type */}
        <FormField
          control={form.control}
          name="reportType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Report Type</FormLabel>
              <FormControl>
                <select {...field} className="w-full border rounded p-2">
                  <option value="">Select a type</option>
                  <option value="review">Review</option>
                  <option value="user">User</option>
                  <option value="business">Business</option>
                  <option value="service">Service</option>
                  <option value="other">Other</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Target ID */}
        <FormField
          control={form.control}
          name="targetId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter target ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Reason */}
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <select {...field} className="w-full border rounded p-2">
                  <option value="">Select a reason</option>
                  <option value="spam">Spam</option>
                  <option value="harassment">Harassment</option>
                  <option value="misleading">Misleading</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Add additional details..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Submit Report
        </Button>
      </form>
    </Form>
  );
}
