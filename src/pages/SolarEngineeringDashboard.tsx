
import { PlaybookCertification } from "@/components/PlaybookCertification";

const SolarEngineeringDashboard = () => {
  const chapters = [
    { id: "2.1", name: "Basic Engineering", shortName: "Basic Eng" },
    { id: "2.2A", name: "Detailed Engineering - Civil", shortName: "DE Civil" },
    { id: "2.2B", name: "Detailed Engineering - Electrical", shortName: "DE Electrical" },
    { id: "2.3", name: "Engineering Review & Approval", shortName: "Review" },
    { id: "2.4", name: "Drawing Management", shortName: "Drawings" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Solar Engineering Certification</h1>
          <p className="text-xl text-gray-600">Test your knowledge of solar project engineering processes</p>
        </div>

        <PlaybookCertification 
          playbookId="solar-engineering"
          playbookName="Engineering - Solar"
          chapters={chapters}
        />
      </div>
    </div>
  );
};

export default SolarEngineeringDashboard;
