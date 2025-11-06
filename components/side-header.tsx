"use client"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { useCreateForm } from "./features/dashboard/hooks/use-form"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"
import { EntityDialogComponent } from "./features/dashboard/components/form-creation-dialog"

 const CreateFormButton = () =>{
  const createForm = useCreateForm()
  const [open, setOpen] = useState(false);

  const handleCreateForm = async (values: { name: string; description?: string }) => {
    await createForm.mutateAsync({
      name: values.name,
      description: values.description || "",
    });
  };

return(
  <>
    <EntityDialogComponent
        isOpen={open}
        placeholder="type the title of the form"
        onOpenChange={setOpen}
        onSubmit={handleCreateForm}
        isPending={createForm.isPending}
      />
    <Button variant="outline" 
    size="sm"
    onClick={() => setOpen(true)}
    className="flex items-center gap-1">
  <PlusIcon className="size-4" />
   <span className="hidden sm:flex text-xs font-medium">create form</span> 
   </Button>
  </>

)
 }
export const Sideheader =() => {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 ease-linear">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <div className="ml-auto flex items-center gap-2">
           <CreateFormButton/>
          </div>
        </div>
      </header>
    )
}