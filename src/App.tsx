import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Constants (would typically come from an API or separate file)
const STATUS_OPTIONS = [
  { label: "Active", value: "active_status" },
  { label: "Inactive", value: "inactive_status" },
  { label: "Pending", value: "pending_status" }
] as const;

// Extract values for Zod enum
const STATUS_VALUES = STATUS_OPTIONS.map(opt => opt.value);

// Schema and types
const formSchema = z.object({
  status: z.enum(STATUS_VALUES as [string, ...string[]], {
    errorMap: () => ({ message: "Please select a valid status." })
  })
});

type FormData = z.infer<typeof formSchema>;

// Component
export default function SelectForm() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="status">Status:</label>
      <select id="status" {...register("status")}> 
        <option value="">-- Select Status --</option>
        {STATUS_OPTIONS.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {errors.status && <p>{errors.status.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
