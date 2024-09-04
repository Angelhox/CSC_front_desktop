/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { toast } from "sonner";

interface UseFormProps<T> {
  onSubmit: (values: T) => Promise<void>;
}
const useSubmitForm = <T>({ onSubmit }: UseFormProps<T>) => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleSubmit = async (values: T) => {
    setIsSubmitting(true);
    setError(null);
    console.log(values);
    try {
      onSubmit(values);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    handleSubmit,
    error,
    isSubmitting,
  };
};
export default useSubmitForm;
