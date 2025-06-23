
import { PlaybookCertification } from "@/components/PlaybookCertification";

const ProjectControlsDashboard = () => {
  const chapters = [
    { id: "1", name: "PMO Structure and Responsibilities", shortName: "PMO" },
    { id: "2", name: "Project Review Meetings", shortName: "Reviews" },
    { id: "3", name: "Risk Management", shortName: "Risk" },
    { id: "4", name: "Performance Tracking", shortName: "Performance" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Project Controls Certification
          </h1>
          <p className="text-gray-600">
            Test your knowledge of project controls, PMO structure, and performance management
          </p>
        </div>
        
        <PlaybookCertification
          playbookId="project-controls"
          playbookName="Project Controls"
          chapters={chapters}
        />
      </div>
    </div>
  );
};

export default ProjectControlsDashboard;
