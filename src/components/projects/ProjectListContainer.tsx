import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

// internal imports
import ProjectListView from './ProjectListView';
import CreateProjectModalForm from './CreateProjectModalForm';
import { useAuth } from '../context/AuthContext';
import { getProjectList } from '../API/Api';
import LoadingBar from '../LoadingBar';

interface ParamTypes {
    teamSlug: string;
}

const ProjectListContainer = (): React.ReactElement => {
    // project details and ticket list prefetching happens in the ProjectTableRow component
    const { teamSlug } = useParams<ParamTypes>();
    const { user } = useAuth();
    // const { data: user } = useQuery('user', async () => await currentUser.getIdToken(), {staleTime: Infinity});
    const { isLoading, error, data } = useQuery<any, Error>(
        ['projectList', { user, teamSlug }],
        () => getProjectList({ user, teamSlug }),
        { enabled: !!user, staleTime: 30000 },
    );

    return (
        <div className="container">
            <div className="block">
                {isLoading ? (
                    <div className="block">
                        <h1 className="title is-1 has-text-grey-dark">Projects</h1>
                        <LoadingBar />
                    </div>
                ) : null}
                {error ? error.message : null}
                {data ? <ProjectListView projects={data.data} /> : null}
            </div>
            <div className="block">
                <CreateProjectModalForm />
            </div>
        </div>
    );
};

export default ProjectListContainer;
