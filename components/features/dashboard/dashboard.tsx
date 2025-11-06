"use client"
import { EntityHeader, EntityContainer, EntityCard } from "@/components/entity-component"
import { useCreateForm } from "./hooks/use-form"
import { useState } from "react"
import { EntityDialogComponent } from "./components/form-creation-dialog"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"


export const DashboardList = () => {
  const trpc = useTRPC()
  const {data} = useSuspenseQuery(trpc.getAll.queryOptions())
  const items = data;
  return (
    <div>
      {
        JSON.stringify(items , null , 2)
      }
    </div>
  )
}
export const DashboardHeader = () => {
  const createForm = useCreateForm()
  const [open, setOpen] = useState(false);

  const handleCreateForm = async (values: { name: string; description?: string }) => {
    await createForm.mutateAsync({
      name: values.name,
      description: values.description || "",
    });
  };

  return (
    <>
      <EntityDialogComponent
        isOpen={open}
        placeholder="type the title of the form"
        onOpenChange={setOpen}
        onSubmit={handleCreateForm}
        isPending={createForm.isPending}
      />
      
      <EntityHeader
        description="View your forms, track responses and publish new ones"
        title="Your Forms"
        isButton={true}
        onClick={() => setOpen(true)}
        isPending={false}
      />
    </>
  )
}

export const DashboardCard = () =>{
    return(
        <EntityCard
        href="/login"
        name="Title"
        description="Looks nice"
        />  
    )
  
}
export const DashboardContainer = () => {
  return (
    <EntityContainer
      header={<DashboardHeader />}
      content={<DashboardCard />}
      />
  )
}