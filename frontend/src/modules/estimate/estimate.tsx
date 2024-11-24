import { useEffect, useState } from 'react';
import { PageTitle } from '../../components/page-title';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  EstimateSliceState,
  selectEstimate,
  setEstimate,
  StoredRideEstimateDto,
} from '../../reducers/estimate.slice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';
import './index.scss';
import { DriverOptionDto } from '../../providers/dtos/driver-option.dto';
import classNames from 'classnames';
import { Rating } from '../../components/rating';
import { RideProvider } from '../../providers/ride.provider';
import { RideConfirmCreateInput } from '../../providers/inputs/ride-confirm-create.input';
import { IRideProvider } from '../../providers/interfaces/ride.provider';

const rideProvider: IRideProvider = new RideProvider();

const Estimate: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDLVnvCm-ElL74_6owdP-muVQYbkC6yKIc', // Substitua por sua chave de API
    id: 'google-maps-script', // Evita duplicar o script
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { estimate } = useAppSelector<EstimateSliceState>(selectEstimate);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [directionsLoaded, setDirectionsLoaded] = useState(false);

  const [selectedDriver, setSelectedDriver] = useState<
    DriverOptionDto | undefined
  >(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  useEffect(() => {
    if (!estimate) {
      navigate('/');
      toast.error('Solicite sua estimativa novamente.');
    }
  }, []);

  useEffect(() => {
    if (!estimate || directionsLoaded || !isLoaded) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: new google.maps.LatLng(
          estimate.origin.latitude,
          estimate.origin.longitude
        ),
        destination: new google.maps.LatLng(
          estimate.destination.latitude,
          estimate.destination.longitude
        ),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      handleDirectionsCallback
    );
  }, [estimate?.origin, estimate?.destination, directionsLoaded, isLoaded]);

  const handleDirectionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (
      status === google.maps.DirectionsStatus.OK &&
      result !== null &&
      !directionsLoaded
    ) {
      setDirections(result);
      setDirectionsLoaded(true);
      return;
    }
  };

  const handleSelectedDriver = (option: DriverOptionDto) => {
    setSelectedDriver(option);
    setErrorMessage(undefined);
  };

  const handleConfirm = (
    estimate: StoredRideEstimateDto,
    selectedDriver: DriverOptionDto | undefined
  ) => {
    if (!selectedDriver) {
      setErrorMessage('É necessário selecionar um motorista');
      return;
    }

    const createInput: RideConfirmCreateInput = {
      customer_id: estimate.customerId,
      origin: estimate.originString,
      destination: estimate.destinationString,
      distance: estimate.distance,
      duration: estimate.duration,
      driver: {
        id: selectedDriver.id,
        name: selectedDriver.name,
      },
      value: selectedDriver.value,
    };

    setIsConfirming(true);

    rideProvider
      .createRideConfirm(createInput)
      .then(() => {
        setIsConfirming(false);
        dispatch(setEstimate(undefined));
        navigate('/rides?confirm=success');
      })
      .catch(() => {
        setIsConfirming(false);
        toast.error(
          'Não foi possível confirmar a viagem. Tente novamente em alguns instantes'
        );
      });
  };

  return (
    <>
      <PageTitle title="Estimativa de Viagem" />

      <div className="container">
        <div className="row mb-4">
          {estimate && estimate.options.length ? (
            <div className="col-12 mb-4">
              Encontramos as seguintes opções para a sua viagem:
            </div>
          ) : null}

          <div className="col-12 col-lg-4 d-flex flex-column gap-2">
            {estimate?.options.map((option) => (
              <div
                key={option.id}
                className={classNames({
                  'option-item': true,
                  selected: selectedDriver?.id == option.id,
                })}
                onClick={() => handleSelectedDriver(option)}
              >
                <div>
                  Motorista: <span className="fw-semibold">{option.name}</span>
                  <div>{option.description}</div>
                </div>
                <div className="mt-2">
                  Carro: <span className="fw-semibold">{option.vehicle}</span>
                </div>
                <div className="mt-2">
                  Avaliação: <Rating rating={option.review.rating} />
                  <div>{option.review.comment}</div>
                </div>
                <div className="mt-2">
                  Preço:{' '}
                  <span className="fw-bold">
                    {option.value.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
              </div>
            ))}

            {estimate && !estimate.options.length ? (
              <>
                <div className="text-danger">OPS!</div>
                <div>
                  A viagem é muito curta! Infelizmente não encontramos
                  motoristas disponíveis.
                </div>
              </>
            ) : null}
          </div>

          <div className="col-12 col-lg-8 mt-4 mt-lg-0">
            {estimate && estimate.options.length ? (
              <>
                <div className="d-flex flex-column mb-4">
                  <div>
                    Trajeto:&nbsp;
                    <span className="text-info">{estimate?.originString}</span>
                    &nbsp;a&nbsp;
                    <span className="text-primary">
                      {estimate?.destinationString}
                    </span>
                  </div>
                  <div className="mt-2">
                    Distância:&nbsp;{estimate?.distance} km
                  </div>
                  <div className="mt-2">Duração:&nbsp;{estimate?.duration}</div>
                </div>

                <div className="d-flex justify-content-end align-items-center mb-4 mt-2">
                  {errorMessage && (
                    <div className="text-danger py-2 px-1" style={{ flex: 1 }}>
                      {errorMessage}
                    </div>
                  )}
                  {isConfirming && (
                    <div className="spinner-border text-info" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => handleConfirm(estimate, selectedDriver)}
                    disabled={isConfirming}
                  >
                    Confirmar
                  </button>
                </div>
              </>
            ) : null}

            {isLoaded && estimate ? (
              <GoogleMap
                mapContainerStyle={{
                  width: '100%',
                  height: '500px',
                }}
                zoom={8}
                options={{
                  disableDefaultUI: true, // Remove controles padrão como zoom, etc
                  zoomControl: false, // Desabilita o controle de zoom
                  streetViewControl: false, // Desabilita o controle de Street View
                  mapTypeControl: false, // Desabilita o controle de tipo de mapa
                  draggable: false, // Desabilita a possibilidade de arrastar e manipular o zoom
                }}
              >
                {directions && (
                  <DirectionsRenderer
                    options={{
                      directions: directions,
                    }}
                  />
                )}
              </GoogleMap>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export { Estimate };
