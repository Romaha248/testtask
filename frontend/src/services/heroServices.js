import apiClient from "../utils/api-client";

export function getAllHeroes(page) {
    return apiClient.get(`/heroes?page=${page}`)
}

export function getHeroById(id) {
    return apiClient.get(`/heroes/${id}`)
}

export function createHero(heroData, images) {
    const formData = new FormData();

    Object.entries(heroData).forEach(([key, value]) => {
        formData.append(key, value);
    });

    if (images && images.length > 0) {
        images.forEach((img) => formData.append("images", img));
    }

    return apiClient.post("/heroes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}


export function updateHero(id, heroData) {
    return apiClient.patch(`/heroes/${id}`, heroData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
}

export function deleteHeroImage(heroId, imageUrl) {
    return apiClient.delete("/heroes/image", {
        data: { heroId, imageUrl },
    });
}

export function deleteHeroById(id) {
    return apiClient.delete(`/heroes/${id}`)
}