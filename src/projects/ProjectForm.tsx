import React, { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ProjectForm = ({
  onCancel,
  onSave,
  project: initialProject,
}: ProjectFormProps) => {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) return;
    onSave(project);
    // onSave(
    //   new Project({
    //     name: "updated project",
    //   })
    // );
  };

  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;

    let updatedValue = type === "checkbox" ? checked : value;

    if (type === "number") {
      updatedValue = Number(updatedValue);
    }

    const change = {
      [name]: updatedValue,
    };

    let updatedProject: Project;

    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    });

    setErrors(() => validate(updatedProject));
  };

  function validate(project: Project) {
    let errors: any = { name: "", description: "", budget: "" };

    if (project.name.length === 0) {
      errors.name = "Name is Required";
    }

    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = "Name needs to be at least 3 characters long";
    }

    if (project.description.length === 0) {
      errors.description = "Description is Required";
    }

    if (project.budget === 0) {
      errors.budget = "budget is Required";
    }

    return errors;
  }

  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }
  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={project.name}
        placeholder="enter name"
      />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        value={project.description}
        onChange={handleChange}
        placeholder="enter description"
      />
      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        value={project.budget}
        onChange={handleChange}
        placeholder="enter budget"
      />
      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}
      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        checked={project.isActive}
        onChange={handleChange}
      />
      <div className="input-group">
        <button type="submit" className="primary bordered medium">
          Save
        </button>
        <span />
        <button onClick={onCancel} type="button" className="bordered medium">
          cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
