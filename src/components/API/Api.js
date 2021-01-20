import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { baseURL, getHeaders } from './ApiConfig';

export const getTeamsList = (token) => {
    return axios.get(baseURL + 'teams/', { headers: getHeaders(token) }).catch((err) => {
        if (err.response) {
            throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error']);
        } else {
            throw new Error(err);
        }
    });
};

export const getProjectList = ({ user, teamSlug }) =>
    axios.get(`${baseURL}teams/${teamSlug}/projects/`, { headers: getHeaders(user) }).catch((err) => {
        if (err.response) {
            throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error']);
        } else {
            throw new Error(err);
        }
    });

export const getTeamDetails = ({ user, teamSlug }) =>
    axios.get(`${baseURL}teams/${teamSlug}`, { headers: getHeaders(user) }).catch((err) => {
        if (err.response) {
            throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error']);
        } else {
            throw new Error(err);
        }
    });

export const getTicketList = ({ user, teamSlug, projectSlug }) =>
    axios
        .get(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/tickets/`, { headers: getHeaders(user) })
        .catch((err) => {
            if (err.response) {
                throw new Error(
                    err.response.data['errors'] || err.response.data['detail'] || err.response.data['error'],
                );
            } else {
                throw new Error(err);
            }
        });

export const getProjectDetails = ({ user, teamSlug, projectSlug }) =>
    axios.get(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/`, { headers: getHeaders(user) }).catch((err) => {
        if (err.response) {
            throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error']);
        } else {
            throw new Error(err);
        }
    });

export const getTicketDetails = ({ user, teamSlug, projectSlug, ticketSlug }) =>
    axios
        .get(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/tickets/${ticketSlug}`, { headers: getHeaders(user) })
        .catch((err) => {
            if (err.response) {
                throw new Error(
                    err.response.data['errors'] || err.response.data['detail'] || err.response.data['error'],
                );
            } else {
                throw new Error(err);
            }
        });

// POST REQUESTS

export const createTeam = ({ user, newTeam }) => {
    return axios.post(baseURL + 'teams/', newTeam, { headers: getHeaders(user) }).catch((err) => {
        if (err.response) {
            throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error']);
        } else {
            throw new Error(err);
        }
    });
};

export const createProject = ({ user, teamSlug, newProject }) => {
    return axios
        .post(`${baseURL}teams/${teamSlug}/projects/`, newProject, { headers: getHeaders(user) })
        .catch((err) => {
            if (err.response) {
                throw new Error(
                    err.response.data['errors'] || err.response.data['detail'] || err.response.data['error'],
                );
            } else {
                throw new Error(err);
            }
        });
};

export const createTicket = ({ user, teamSlug, projectSlug, newTicket }) => {
    return axios
        .post(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/tickets/`, newTicket, { headers: getHeaders(user) })
        .catch((err) => {
            if (err.response) {
                throw new Error(
                    err.response.data['errors'] || err.response.data['detail'] || err.response.data['error'],
                );
            } else {
                throw new Error(err);
            }
        });
};