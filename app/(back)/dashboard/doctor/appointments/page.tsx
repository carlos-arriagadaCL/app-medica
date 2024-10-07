import HomeDisplayCard from "@/components/Dashboard/Doctor/HomeDisplayCard";
import ListPanel from "@/components/Dashboard/Doctor/ListPanel";
import NewButton from "@/components/Dashboard/Doctor/NewButton";
import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
import { Calendar } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-4 py-3 border-r border-gray-100">
          <PanelHeader title="Appointments" count="11" icon={Calendar} />
          <div className="px-3">
            <ListPanel />
          </div>
        </div>
        <div className="col-span-8">
          <div className="py-2 border-b border-gray-200 flex items-center justify-end px-4">
            <div className="flex items-center gap-4">
              <NewButton title="New Appointment" href="#" />
            </div>
          </div>
          <HomeDisplayCard />
        </div>
      </div>
    </div>
  );
}
