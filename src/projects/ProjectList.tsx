import React, { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

const ProjectList = ({ projects, onSave }: ProjectListProps) => {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});
  const handleEdit = (project: Project) => {
    // console.log(project);
    setProjectBeingEdited(project);
  };

  const handleSave = (project: Project) => {
    // console.log(project);
    onSave(project);
  };

  const handleCancelEdit = () => {
    setProjectBeingEdited({});
  };
  // console.log(projectBeingEdited);
  return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="cols-sm">
          {/* {project !== projectBeingEdited && (
            <ProjectCard project={project} onEdit={handleEdit} />
          )}
          {project === projectBeingEdited && (
            <ProjectForm onCancel={handleCancelEdit} />
          )} */}
          {project === projectBeingEdited ? (
            <ProjectForm
              project={project}
              onCancel={handleCancelEdit}
              onSave={handleSave}
            />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
