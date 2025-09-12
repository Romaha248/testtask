import apiClient from "../utils/api-client";

export function getAllHeroes(page) {
    return apiClient.get(`/heroes?page=${page}`)
}

export function getHeroById(id) {
    return apiClient.get(`/heroes/${id}`)
}

export function deleteHeroById(id) {
    return apiClient.delete(`/heroes/${id}`)
}