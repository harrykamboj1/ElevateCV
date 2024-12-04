import { useSectionStore } from "@/store/store";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const SectionOrder = () => {
  const { sectionsOrder, updateSectionOrder } = useSectionStore();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sectionsOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateSectionOrder(items);
  };

  return (
    <div>
      <div className="px-5 py-10 h-full   border-t-customDarkBlue border-t-4  rounded-3xl p-6 shadow-xl border  bg-white  shadow-black/[0.4] ">
        <h1 className="text-2xl text-customDarkBlue font-openSans font-semibold">
          Section Order
        </h1>
        <p className="text-gray-600 font-openSans font-normal text-sm">
          Arrange the sections as per your need
        </p>
        <div className="border my-3 border-customDarkBlue"></div>
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
                        className={`p-4 rounded-lg border text-customDarkBlue  transition-all  border-customDarkBlue font-openSans text-lg font-bold shadow-md ${
                          snapshot.isDragging
                            ? "bg-blue-100"
                            : "bg-white hover:bg-gray-100"
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
      </div>
    </div>
  );
};

export default SectionOrder;
