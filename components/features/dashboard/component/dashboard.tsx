"use client"

import { EntityHeader, EntityList } from "@/components/entity-component"
import { useGetForms } from "../hooks/use-form"

export const DashboardHeader = () =>{
    return(
        <EntityHeader
        title={"Welcome Back"}
        description="Hope You will enjoy"
        isButton
        buttonText="New Form"
        onClickButton={()=>{}}
        />
    )
}

export const DashboardList = () => {
  const {data} = useGetForms()
  console.log(data)
    return (
        <EntityList
    items={data || []}
        />
    )
}
