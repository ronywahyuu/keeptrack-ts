import React, { useEffect, useState } from "react";
// import { MOCK_PROJECTS } from "./MockProject";
import ProjectList from "./ProjectList";
import { Project } from "./Project";
import { projectAPI } from "./projectAPI";

const ProjectsPage = () => {
  // const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage, 8);
        setError("");
        setProjects((projects) => {
          if (currentPage === 1) return data;
          return [...projects, ...data];
        });
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [currentPage]);

  // console.log(projects.length);

  const saveProject = (project: Project) => {
    // let updatedProject = projects.map((p: Project) => {
    //   return p.id === project.id ? project : p;
    // });

    // setProjects(updatedProject);
    projectAPI
      .put(project)
      .then((updatedProject) => {
        let updatedProjects = projects.map((p: Project) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        });
        setProjects(updatedProjects);
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      });
  };

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  return (
    <>
      <h1>Projects</h1>

      {/* Error alert */}
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <ProjectList projects={projects} onSave={saveProject} />

      {/* Pagination */}
      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}

      {/* loading/fetching state */}
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span> <p>Loading...</p>
        </div>
      )}
      {/* <pre>{JSON.stringify(MOCK_PROJECTS, null, "")}</pre> */}
    </>
  );
};

export default ProjectsPage;
