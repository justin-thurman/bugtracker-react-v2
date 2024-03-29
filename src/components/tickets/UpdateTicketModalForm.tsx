import React, { Fragment } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

// interface imports
import { ProjectMembership, NewOrUpdatedTicketProps, Ticket } from '../../types';
import { getProjectDetails } from '../API/FirebaseAPI';

interface UpdateTicketModalFormProps {
    ticket: Ticket;
    updateTicket: (updatedTicket: NewOrUpdatedTicketProps) => void;
}

interface ParamTypes {
    projectSlug: string;
    teamSlug: string;
}

const UpdateTicketModalForm: React.FunctionComponent<UpdateTicketModalFormProps> = ({
    ticket,
    updateTicket,
}: UpdateTicketModalFormProps): React.ReactElement => {
    // getting the projectSlug from the URL
    const { projectSlug, teamSlug } = useParams<ParamTypes>();
    const { isLoading, error, data: project } = useQuery<any, Error>(
        ['projectDetails', { teamSlug, projectSlug }],
        () => getProjectDetails({ teamSlug, projectSlug }),
        { staleTime: 30000 },
    );

    // state for form data
    const [title, setTitle] = React.useState(ticket.title);
    const [description, setDescription] = React.useState(ticket.description);
    const [developer, setDeveloper] = React.useState(ticket.developer);
    const [priority, setPriority] = React.useState(ticket.priority);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleDeveloperChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDeveloper(e.target.value);
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(parseInt(e.target.value));
    };

    // state for whether the modal is active or not
    const [isActive, setIsActive] = React.useState(false);

    const handleToggleIsActive = () => {
        setIsActive(!isActive);
    };

    // submitting form data
    const handleSubmit = () => {
        const updatedTicket = {
            title: title,
            description: description,
            developer: developer,
            priority: priority,
            project: projectSlug,
        };
        updateTicket(updatedTicket);
        setIsActive(false);
    };

    const createDevelopersOptionsList = (members: ProjectMembership[]): React.ReactElement => {
        const developers: string[] = members
            // .filter((member) => {
            //     return member.role_name == 'Developer';
            // })
            .map((developer) => developer.user);

        return (
            <Fragment>
                <div className="select">
                    <select value={developer || "NONE"} onChange={handleDeveloperChange}>
                        <option value="NONE" disabled>
                            Assign a developer (optional)
                        </option>
                        {developers.map((developer) => (
                            <option key={developer} value={developer}>
                                {developer}
                            </option>
                        ))}
                    </select>
                </div>
            </Fragment>
        );
    };

    return (
        <Fragment>
            <button
                className={isLoading ? 'button is-primary is-loading' : 'button is-primary'}
                onClick={handleToggleIsActive}
            >
                Update Ticket
            </button>

            {error ? error.message : null}
            {project && (
                <div className={isActive ? 'modal is-active' : 'modal'}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Submit Ticket</p>
                            <button className="delete" aria-label="close" onClick={handleToggleIsActive}></button>
                        </header>
                        <section className="modal-card-body">
                            {/* Title Field */}
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className={!title ? 'input is-danger' : 'input'}
                                        value={title}
                                        onChange={handleTitleChange}
                                    />
                                </div>
                                {!title && <p className="help is-danger">Title is required.</p>}
                            </div>

                            {/* Description Field */}
                            <div className="field">
                                <label className="label">Description</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Developer Field */}
                            {ticket.user_permissions.change_developer && (
                                <div className="field">
                                    <label className="label">Developer</label>
                                    <div className="control">
                                        {createDevelopersOptionsList(project.data.memberships)}
                                    </div>
                                    <p className="help">Can edit and close the ticket.</p>
                                </div>
                            )}

                            {/* Priority Field */}
                            <div className="field">
                                <label className="label">Priority</label>
                                <div className="control">
                                    <div className={!priority ? 'select is-danger' : 'select'}>
                                        <select value={priority} onChange={handlePriorityChange}>
                                            <option disabled value="">
                                                Select priority
                                            </option>
                                            <option value="1">Low</option>
                                            <option value="2">High</option>
                                            <option value="3">Urgent</option>
                                        </select>
                                    </div>
                                </div>
                                {!priority && <p className="help is-danger">Priority is required.</p>}
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            {!title || !priority ? (
                                <button className="button is-success" disabled onClick={handleSubmit}>
                                    Submit
                                </button>
                            ) : (
                                <button className="button is-success" onClick={handleSubmit}>
                                    Submit
                                </button>
                            )}

                            <button className="button" onClick={handleToggleIsActive}>
                                Cancel
                            </button>
                        </footer>
                    </div>
                    <button className="modal-close is-large" onClick={handleToggleIsActive}></button>
                </div>
            )}
        </Fragment>
    );
};

export default UpdateTicketModalForm;
