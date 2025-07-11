import StudioHeader from "@/components/organisms/StudioHeader";
import TransformationWorkspace from "@/components/organisms/TransformationWorkspace";

const Studio = () => {
  return (
    <div className="min-h-screen bg-anime-bg">
      <StudioHeader />
      <TransformationWorkspace />
    </div>
  );
};

export default Studio;