const fieldTypes = ["text", "textarea", "checkbox", "dropdown", "date"];

export default function FieldSidebar() {
  return (
    <div className="w-1/4 p-4 bg-gray-100 dark:bg-gray-800 border-r">
      <h2 className="text-xl font-semibold mb-2">Field Types</h2>
      {fieldTypes.map((type, index) => (
        <div
          key={type}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("field-type", type)}
          className="p-2 mb-2 bg-white dark:bg-gray-700 rounded shadow cursor-grab"
        >
          {type}
        </div>
      ))}
    </div>
  );
}
