import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MapsApiProvider } from '../abstract-providers/map-api.provider';
import { createClient } from '@google/maps';
import { DistanceMatrixDto } from '../dtos/distance-matrix.dto';
import { GeoLocationDto } from 'src/modules/ride/dtos/geo-location.dto';
import {
  Client,
  PlaceAutocompleteResult,
} from '@googlemaps/google-maps-services-js';
import { AddressPredictionDto } from '../dtos/address-prediction.dto';

@Injectable()
export class GoogleMapsApiProvider implements MapsApiProvider {
  private googleMapsClient;
  private googleMapsServicesJs: Client;

  /**
   * Creates an instance of the GoogleMapsApiProvider.
   * Initializes the Google Maps API client with the provided API key.
   */
  constructor() {
    this.googleMapsClient = createClient({
      key: process.env.GOOGLE_API_KEY,
      Promise: Promise,
    });
    this.googleMapsServicesJs = new Client({});
  }

  /**
   * Retrieves the distance and duration between the origin and destination using the Google Maps Distance Matrix API.
   *
   * @param origin - The starting point for the distance calculation, typically an address or coordinates in string format.
   * @param destination - The endpoint for the distance calculation, also an address or coordinates in string format.
   * @returns A promise that resolves to a `DistanceMatrixDto` containing the distance in meters and duration in seconds.
   * @throws HttpException if the origin or destination is invalid.
   * @throws HttpException if the API request fails.
   */
  async getDistance(
    origin: string,
    destination: string,
  ): Promise<DistanceMatrixDto> {
    try {
      const response = await this.googleMapsClient
        .distanceMatrix({
          origins: [origin],
          destinations: [destination],
        })
        .asPromise();

      const element = response.json.rows[0].elements[0];
      if (element.status === 'OK') {
        return {
          distanceInMeters: element.distance.value,
          durationInSeconds: element.duration.value,
          providerResponse: response.json,
        };
      } else {
        throw new HttpException(
          {
            error_code: 'INVALID_DATA',
            error_description: 'O endereço de origem ou de destino é inválido.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch {
      throw new HttpException(
        {
          error_code: 'BAD_GATEWAY',
          error_description: 'Não foi possível calcular a distância.',
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  /**
   * Retrieves the geographical coordinates (latitude and longitude) for a given address using the Google Maps Geocoding API.
   *
   * @param address - The address whose geographical location is to be retrieved.
   * @returns A promise that resolves to a `GeoLocationDto` containing the latitude and longitude.
   * @throws HttpException if the address is not found.
   * @throws HttpException if the API request fails.
   */
  async getGeoLocation(address: string): Promise<GeoLocationDto> {
    try {
      const response = await this.googleMapsClient
        .geocode({ address })
        .asPromise();

      const result = response.json.results[0];
      if (!result) {
        throw new HttpException(
          {
            error_code: 'INVALID_DATA',
            error_description: 'Endereço não encontrado.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
      };
    } catch {
      throw new HttpException(
        {
          error_code: 'BAD_GATEWAY',
          error_description: 'Não foi possível obter as coordenadas.',
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  /**
   * Retrieves place predictions for a given input using the Google Maps Places Autocomplete API.
   *
   * @param input - The text input provided by the user to search for place predictions.
   * @returns A promise that resolves to a list of place predictions.
   * @throws HttpException if the input is invalid or the API request fails.
   */
  async getPredictions(input: string): Promise<AddressPredictionDto[]> {
    try {
      // Aqui estamos fazendo a chamada correta para o Autocomplete API
      const response = await this.googleMapsServicesJs.placeAutocomplete({
        params: {
          input,
          language: 'pt-br',
          components: ['country:br'],
          key: process.env.GOOGLE_API_KEY,
        },
      });

      const predictions: PlaceAutocompleteResult[] = response.data.predictions;

      return predictions.map((p) => ({
        placeId: p.place_id,
        description: p.description,
      }));
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          error_code: 'BAD_GATEWAY',
          error_description: 'Não foi possível obter a lista de locais.',
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
