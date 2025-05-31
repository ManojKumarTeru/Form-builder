import FieldSidebar from "~/components/FieldSidebar";
import FormCanvas from "~/components/FormCanvas";
import FieldSettings from "~/components/FieldSetting";

export default function Builder() {
  return (
    <div className="flex h-screen">
      < FieldSidebar/>
      <FormCanvas />
      <FieldSettings />
    </div>
  );
}
