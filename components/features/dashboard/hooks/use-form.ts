import { useTRPC } from "@/trpc/client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
export const useCreateForm = () => {
    const trpc = useTRPC();
    return useMutation(trpc.create.mutationOptions({
        onSuccess: (data) => {
            console.log(data);
            toast.success(`Form ${data.name} created successfully`)
        },
        onError:(data) =>{
            toast.error(data.message)
            console.log(data);
        }
    }))
}

export const useGetAllForms = () => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.getAll.queryOptions());
}