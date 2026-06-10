import { Column, JobApplication } from "@/lib/models/models.type";
import { ExternalLink } from "lucide-react";

type JobApplicationCardProps = {
  job: JobApplication;
  columns: Column[];
};

function JobApplicationCard({ job, columns }: JobApplicationCardProps) {
  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <h3>{job.position}</h3>
              <p>{job.company}</p>
              {job.description && <p>{job.description}</p>}
              {job.tags && job.tags.length > 0 && (
                <div>
                  {job.tags.map((tag, key) => (
                    <span key={key}>{tag}</span>
                  ))}
                </div>
              )}
              {job.jobUrl && (
                <a href={job.jobUrl} target="_blank" onClick={(e)=> e.stopPropagation}>
                  <ExternalLink />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobApplicationCard;
