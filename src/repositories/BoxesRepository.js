import Repository from "./Repository";
import Logger from "js-logger";
const logger = Logger.get("logger");

const RESOURCE_NAME = "/boxes";

export default {
    async getAll(options = {}) {
        try {
            return (await Repository.get(`${RESOURCE_NAME}`, options)).data;
        } catch (err) {
            logger.error("Error fetching all", options);
            throw err;
        }
    },

    async get(id) {
        try {
            return (await Repository.get(`${RESOURCE_NAME}/${id}`)).data;
        } catch (err) {
            logger.error("Error fetching entity with id " + id);
            throw err;
        }
    },

    async save(entity) {
        if (entity.id) {
            try {
                return (await Repository.put(`${RESOURCE_NAME}/${entity.id}`, entity)).data;
            } catch (err) {
                logger.error("Error updating entity", entity);
                throw err;
            }
        } else {
            try {
                return (await Repository.post(`${RESOURCE_NAME}`, entity)).data;
            } catch (err) {
                logger.error("Error saving entity", entity);
                throw err;
            }
        }
    },

    async delete(id) {
        try {
            return await Repository.delete(`${RESOURCE_NAME}/${id}`);
        } catch (err) {
            logger.error("Error deleting entity with id " + id);
            throw err;
        }
    },
};