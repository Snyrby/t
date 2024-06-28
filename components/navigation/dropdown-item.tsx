"use client";

import { Button } from "@/components/ui/button";

type DropDownItemProps = {
    text: string,
}

const DropDownItem = ({text}: DropDownItemProps) => {
  return (
    <Button type="button" center fullWidth secondary className="border-b">
        {text}
    </Button>
  )
}

export default DropDownItem