import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const Budget = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border bg-slate-500"
      />
    </>
  );
};

export default Budget;
