import { GeoLocationDto } from 'src/modules/ride/dtos/geo-location.dto';
import { DistanceMatrixDto } from '../dtos/distance-matrix.dto';

/**
 * Defines an interface that the map API connection provider should implement.
 */
export abstract class MapsApiProvider {
  /**
   * Retrieves the distance between the origin and destination.
   *
   * @param origin - The starting point for the distance calculation, usually in a string format (e.g., an address or coordinates).
   * @param destination - The endpoint for the distance calculation, also in string format (e.g., an address or coordinates).
   * @returns A promise that resolves to a `DistanceMatrixDto` containing the distance details.
   */
  abstract getDistance(
    origin: string,
    destination: string,
  ): Promise<DistanceMatrixDto>;

  /**
   * Retrieves the geographical coordinates (latitude and longitude) for the given address.
   *
   * @param address - The address whose geographical location is to be retrieved.
   * @returns A promise that resolves to a `GeoLocationDto` containing the geographical coordinates (lat, lng).
   */
  abstract getGeoLocation(address: string): Promise<GeoLocationDto>;

  /**
   * Retrieves place predictions based on the input text using the Google Maps Places Autocomplete API.
   *
   * @param input - The text input provided by the user for searching places.
   * @returns A promise that resolves to a list of place predictions.
   */
  abstract getPredictions(input: string): Promise<any>;
}
