import type { AddressFeature } from '../types/address';

interface AddressResponse {
  type: string;
  version: string;
  features: AddressFeature[];
  attribution: string;
  licence: string;
  query: string;
  limit: number;
}

export async function getSuggestions(query: string): Promise<AddressFeature[]> {
  if (!query || query.length < 3) return [];

  try {
    const cleanQuery = query.trim();
    // Utiliser l'API avec des paramètres plus permissifs
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(cleanQuery)}&limit=5&autocomplete=1`
    );
    
    if (!response.ok) {
      const errorMessage = `Erreur HTTP: ${response.status}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data: AddressResponse = await response.json();
    
    if (!Array.isArray(data.features)) {
      throw new Error('Format de réponse invalide');
    }

    // Filtrer pour ne garder que les résultats pertinents
    return data.features.filter(feature => 
      feature.properties.type === 'housenumber' || 
      feature.properties.type === 'street'
    );
  } catch (error) {
    console.error('Erreur API adresse:', error);
    throw error;
  }
}