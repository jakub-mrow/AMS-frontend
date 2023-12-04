import { FavouriteAsset, NewFavouriteAsset } from "../types";

export class FavouriteAssetsService {
    constructor(
        private readonly apiUrl: string,
        private readonly token: string,
    ) { }

    async fetchFavouriteAssets(): Promise<FavouriteAsset[]> {
        const response = await fetch(`${this.apiUrl}/api/favourite_assets`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch favourite assets");
        }

        const result: FavouriteAsset[] = await response.json();
        return result;
    }

    async addFavouriteAsset(newAsset: NewFavouriteAsset): Promise<void> {
        const response = await fetch(`${this.apiUrl}/api/favourite_assets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify(newAsset),
        });

        if (!response.ok) {
            throw new Error("Failed to add asset");
        }

    }

    async deleteFavouriteAsset(assetId: number): Promise<void> {
        const response = await fetch(`${this.apiUrl}/api/favourite_assets/${assetId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete favorite asset: ${response.status} ${response.statusText}`);
        }
    }

}

