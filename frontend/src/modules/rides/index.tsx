import { useEffect, useState } from 'react';
import { PageTitle } from '../../components/page-title';
import { useSearchParams } from 'react-router-dom';
import { CustomerRidesDto } from '../../providers/dtos/customer-rides.dto';
import { RideProvider } from '../../providers/ride.provider';
import { toast } from 'react-toastify';
import { CustomerProvider } from '../../providers/customer.provider';
import { CustomerDto } from '../home/dtos/customer.dto';
import { AxiosError } from 'axios';
import Skeleton from '../../components/skeleton';
import { DriverProvider } from '../../providers/driver.provider';
import { DriverDto } from '../../providers/dtos/driver.dto';
import './index.scss';
import moment from 'moment';
import { IDriverProvider } from '../../providers/interfaces/driver.provider';
import { IRideProvider } from '../../providers/interfaces/ride.provider';
import { ICustomerProvider } from '../../providers/interfaces/customer.provider';

const customerProvider: ICustomerProvider = new CustomerProvider();
const driverProvider: IDriverProvider = new DriverProvider();
const rideProvider: IRideProvider = new RideProvider();

const Rides: React.FC = () => {
  const [searchParams] = useSearchParams();
  const confirmParam = searchParams.get('confirm');

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [customerId, setCustomerId] = useState<string | undefined>();

  const [drivers, setDrivers] = useState<DriverDto[]>([]);
  const [driverId, setDriverId] = useState<number | undefined>();

  const [isLoadingCustomers, setIsLoadingCustomers] = useState<boolean>(true);
  const [isLoadingDrivers, setIsLoadingDrivers] = useState<boolean>(true);
  const [isLoadingRides, setIsLoadingRides] = useState<boolean>(true);

  const [customerRides, setCustomerRides] = useState<
    CustomerRidesDto | undefined
  >(undefined);

  useEffect(() => {
    if (confirmParam === 'success') {
      setShowSuccessMessage(true);
    }

    getCustomers();
    getDrivers();
  }, []);

  useEffect(() => {
    if (customerId) {
      getRides(customerId, driverId);
    }
  }, [customerId, driverId]);

  const getCustomers = () => {
    customerProvider
      .getCustomers()
      .then((customers: CustomerDto[]) => {
        setCustomers(customers);
        setCustomerId(customers[0].id);
        setIsLoadingCustomers(false);
      })
      .catch(() => {
        setCustomers([]);
        setIsLoadingCustomers(false);
        toast.error('Não foi possível carregar a lista de clientes.');
      });
  };

  const getDrivers = () => {
    driverProvider
      .getDrivers()
      .then((drivers: DriverDto[]) => {
        setDrivers(drivers);
        setIsLoadingDrivers(false);
      })
      .catch(() => {
        setDrivers([]);
        setIsLoadingDrivers(false);
        toast.error('Não foi possível carregar a lista de motoristas.');
      });
  };

  const getRides = (customerId: string, driverId: number | undefined) => {
    setCustomerRides(undefined);

    rideProvider
      .getRides(customerId, driverId)
      .then((rides: CustomerRidesDto) => {
        setCustomerRides(rides);
        setIsLoadingRides(false);
      })
      .catch((error: AxiosError) => {
        setIsLoadingRides(false);

        const genericMessage =
          'Não foi possível carregar as corridas do cliente selecionado.';

        if ([404].includes(error?.response?.status || 0)) {
          return toast.error('Não foi localizada nenhuma corrida.');
        }

        toast.error(genericMessage);
      });
  };

  return (
    <>
      <PageTitle title="Minhas Viagens" />

      <div className="container">
        {showSuccessMessage && (
          <div className="row">
            <div className="col-12">
              <div className="alert alert-success" role="alert">
                Obrigado por solicitar sua viagem conosco. Veja abaixo os
                detalhes das suas viagens.
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12 col-md-6">
            {!isLoadingCustomers ? (
              <>
                <label className="ms-1">Cliente </label>
                <select
                  className="form-select"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                >
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <Skeleton height="40px" repeat={1} />
            )}
          </div>
          <div className="col-12 col-md-6">
            {!isLoadingDrivers ? (
              <>
                <label className="ms-1">Motorista</label>
                <select
                  className="form-select"
                  value={driverId}
                  onChange={(e) => setDriverId(+e.target.value)}
                >
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <Skeleton height="40px" repeat={1} />
            )}
          </div>
        </div>

        <div className="row my-3">
          {isLoadingRides && <Skeleton height="220px" repeat={1} />}
          {!isLoadingRides && customerRides ? (
            <>
              <div className="col-12 text-primary ps-3">
                {customerRides.rides.length} corrida
                {customerRides.rides.length > 1 && 's'} encontrada
                {customerRides.rides.length > 1 && 's'}
              </div>
              {customerRides.rides.map((ride) => (
                <div className="col-12" key={ride.id}>
                  <div className="container">
                    <div className="row">
                      <div className="col-12 ride-item mt-3">
                        <div>
                          Data e hora:&nbsp;
                          {moment(ride.date).format('DD/MM/YYYY [às] HH:mm:ss')}
                        </div>
                        <div className="mt-1">
                          Motorista: {ride.driver.name}
                        </div>
                        <div className="mt-1">Origem: {ride.origin}</div>
                        <div className="mt-1">Destino: {ride.destination}</div>
                        <div className="mt-1">Distância: {ride.distance}km</div>
                        <div className="mt-1">Duração: {ride.duration}</div>
                        <div className="mt-1">
                          Valor:{' '}
                          {ride.value.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : null}
          {!isLoadingRides && !customerRides ? (
            <div className="text-danger ms-1">
              Não foi encontrada nenhuma corrida
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export { Rides };
