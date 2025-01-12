import { Button } from "@/components/ui/button";
import {
  useDataSaveType,
  useResumeState,
  useSectionStore,
} from "@/store/store";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { apiUrl, FailFlag } from "@/lib/constants";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const SectionOrder = ({ resumeId }: { resumeId: string | undefined }) => {
  const { user } = useAuth();
  const { sectionsOrder, updateSectionOrder } = useSectionStore();
  const setIsDataSave = useDataSaveType((state) => state.setIsDataSave);
  const [loading, setLoading] = useState(false);
  const personal = useResumeState((state) => state.personal);
  const education = useResumeState((state) => state.education);
  const experience = useResumeState((state) => state.experience);
  const skills = useResumeState((state) => state.skills);
  const projects = useResumeState((state) => state.projects);
  const sectionOrder = useResumeState((state) => state.sectionOrder);
  const resumeSectionOrder = useResumeState(
    (state) => state.updateSectionOrder
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sectionsOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);
    updateSectionOrder(items);
    resumeSectionOrder(items);
    setIsDataSave(false);
  };

  const saveData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiUrl}/resume/saveAllData`,
        {
          email: user!.email,
          resumeId,
          personal,
          education,
          skills,
          experience,
          projects,
          sectionOrder,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      if (response.data.errorCode == FailFlag) {
        toast.error(response.data.message);
        setIsDataSave(false);
      } else {
        toast.success(response.data.message);
        setIsDataSave(true);
      }
    } catch (e) {
      console.log("Error in save Data ::" + e);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Toaster />
      <div className="px-5 py-10 h-full   border-2 border-blue-500  rounded-xl p-6 shadow-xl      bg-customDarkBlue  ">
        <h1 className="text-2xl text-red-600 font-dmSans font-semibold">
          Section Order
        </h1>
        <p className="text-white font-dmSans font-normal text-sm">
          Arrange the sections as per your need
        </p>
        <div className="border my-3 border-zinc-500"></div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {sectionsOrder.map((section, index) => (
                  <Draggable key={section} draggableId={section} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 rounded-lg font-dmSans border-zinc-5  00 bg-neutral-800 border-gray-700 border text-white text-lg  focus-visible:ring-transparent ${snapshot.isDragging
                          ? "bg-neutral-800"
                          : "bg-neutral-700 hover:bg-customDarkBlue hover:border-gray-300 "
                          }`}
                      >
                        {index + 1} {section}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-10 flex justify-end">
          <Button
            className="flex items-center bg-blue-800 hover:bg-blue-900 rounded-lg px-8 py-2.5  font-dmSans text-white "
            onClick={() => saveData()}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Save All The Details"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionOrder;
