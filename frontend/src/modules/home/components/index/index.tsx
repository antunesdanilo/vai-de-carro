import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CustomerDto } from '../../dtos/customer.dto';
import classNames from 'classnames';
import { CustomerProvider } from '../../../../providers/customer.provider';
import { PageTitle } from '../../../../components/page-title';
import { toast } from 'react-toastify';
import './index.scss';
import { CustomerCreateInput } from '../../../../providers/inputs/customer-create.input';
import { AxiosError } from 'axios';
import { ErrorResponseDto } from '../../../../dtos/error-response.dto';
import { AutoCompleteAddress } from '../../../../components/autocomplete-address';
import { RideProvider } from '../../../../providers/ride.provider';
import { EstimateInput } from '../../../../providers/inputs/estimate.input';
import { RideEstimateDto } from '../../../../providers/dtos/ride-estimate.dto';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  EstimateSliceState,
  selectEstimate,
  setEstimate,
} from '../../../../reducers/estimate.slice';
import { Link, useNavigate } from 'react-router-dom';
import { IRideProvider } from '../../../../providers/interfaces/ride.provider';
import { ICustomerProvider } from '../../../../providers/interfaces/customer.provider';

/**
 * Interface que define os campos do formulário de novo cliente.
 */
interface NewCustomerForm {
  id: string;
  name: string;
}

/**
 * Interface que define os campos do formulário de solicitação de viagem.
 */
interface RideRequestForm {
  customerId: string;
  origin: string;
  destination: string;
}

// Instâncias dos provedores de clientes e corridas
const customerProvider: ICustomerProvider = new CustomerProvider();
const rideProvider: IRideProvider = new RideProvider();

/**
 * Página inicial que permite ao usuário solicitar uma estimativa de viagem
 * e criar novos clientes, caso necessário.
 */
const Home: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { estimate } = useAppSelector<EstimateSliceState>(selectEstimate);

  const [customers, setCustomers] = useState<CustomerDto[]>([]);

  const [showNewCustomerForm, setShowNewCustomerForm] =
    useState<boolean>(false);

  const [customerCreatedName, setCustomerCreatedName] = useState<
    string | undefined
  >(undefined);

  const newCustomerInitialState = { id: '', name: '' };
  const newCustomerForm = useForm<NewCustomerForm>({
    values: newCustomerInitialState,
  });

  const rideFormInitialState: RideRequestForm = {
    customerId: '',
    origin: '',
    destination: '',
  };
  const rideForm = useForm<RideRequestForm>({
    values: rideFormInitialState,
  });

  /**
   * Carrega a lista de clientes no momento da montagem do componente.
   */
  useEffect(() => {
    getCustomers();
  }, []);

  /**
   * Atualiza o formulário de viagem com o ID do cliente recém-criado, se aplicável.
   */
  useEffect(() => {
    if (customers.length && customerCreatedName !== undefined) {
      const customerCreated = customers.find(
        (cust) => cust.name === customerCreatedName
      );

      if (customerCreated) {
        rideForm.setValue('customerId', customerCreated.id);
        setCustomerCreatedName(undefined);
      }
    }
  }, [customers, customerCreatedName]);

  /**
   * Obtém a lista de clientes do servidor.
   */
  const getCustomers = () => {
    customerProvider
      .getCustomers()
      .then((customers: CustomerDto[]) => {
        setCustomers(customers);
      })
      .catch(() => {
        toast.error('Não foi possível carregar a lista de clientes.');
      });
  };

  /**
   * Exibe o formulário para criar um novo cliente.
   */
  const onShowNewCustomerForm = () => {
    setShowNewCustomerForm(true);
  };

  /**
   * Cancela a exibição do formulário de novo cliente.
   */
  const onCancelNewCustomerForm = () => {
    setShowNewCustomerForm(false);
    newCustomerForm.reset();
  };

  /**
   * Cria um novo cliente através do formulário.
   * @param form Dados do novo cliente
   */
  const onCreateNewCustomer: SubmitHandler<NewCustomerForm> = async (
    form: NewCustomerForm
  ) => {
    const createInput: CustomerCreateInput = {
      id: form.id,
      name: form.name,
    };

    customerProvider
      .createCustomer(createInput)
      .then(() => {
        setCustomerCreatedName(form.name);
        newCustomerForm.reset(newCustomerInitialState);
        setShowNewCustomerForm(false);
        getCustomers();
        toast.success('Cliente adicionado com sucesso!');
      })
      .catch((error: AxiosError) => {
        const genericMessage =
          'Não foi possível adicionar o cliente. Tente novamente em alguns instantes.';

        const errorData = error.response?.data as ErrorResponseDto;

        if ([400, 404, 406].includes(error?.response?.status || 0)) {
          return toast.error(errorData.error_description || genericMessage);
        }

        toast.error(genericMessage);
      });
  };

  /**
   * Solicita uma estimativa de viagem com base nos dados do formulário de viagem.
   * @param form Dados do formulário de viagem
   */
  const onRequestRide: SubmitHandler<RideRequestForm> = async (
    form: RideRequestForm
  ) => {
    const estimateInput: EstimateInput = {
      customer_id: form.customerId,
      origin: form.origin,
      destination: form.destination,
    };

    rideProvider
      .getRideEstimate(estimateInput)
      .then((estimate: RideEstimateDto) => {
        navigate('estimate');
        dispatch(
          setEstimate({
            ...estimate,
            customerId: form.customerId,
            originString: form.origin,
            destinationString: form.destination,
          })
        );
      })
      .catch((error: AxiosError) => {
        const genericMessage =
          'Não foi solicitar a estimativa. Tente novamente em alguns instantes.';

        const errorData = error.response?.data as ErrorResponseDto;

        if ([400].includes(error?.response?.status || 0)) {
          return toast.error(errorData.error_description || genericMessage);
        }

        toast.error(genericMessage);
      });
  };

  return (
    <>
      <PageTitle title="Solicite uma Viagem" />

      {/* Seção de introdução */}
      <div className="container mt-3 mb-4">
        <div className="row">
          <div className="col-12">
            Preencha os campos abaixo e solicite uma estimativa para visualizar
            as opções disponíveis.
          </div>
        </div>

        {/* Exibição da última estimativa, se disponível */}
        {estimate && (
          <div className="row mt-3">
            <div className="col-12">
              A sua última estimativa ainda está disponível.&nbsp;
              <Link to="estimate">Clique aqui</Link> para visualizá-la.
            </div>
          </div>
        )}
      </div>

      {/* Formulário de criação de novo cliente */}
      <form onSubmit={newCustomerForm.handleSubmit(onCreateNewCustomer)}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-info">
              <div className="alert alert-primary" role="alert">
                Caso seja o seu primeiro acesso, comece clicando em "Não
                encontrou o seu nome na lista?", para visualizar um formulário
                em que poderá
                <br />
                fornecer o seu nome e criar um ID de usuário.
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <a href="#" onClick={onShowNewCustomerForm}>
                Não encontrou o seu nome na lista?
              </a>
            </div>
          </div>
        </div>
        {showNewCustomerForm && (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="container form-container p-3">
                  <div className="row">
                    <div className="col-12">
                      <Controller
                        control={newCustomerForm.control}
                        name="id"
                        rules={{
                          required: 'O id do cliente não pode ficar em branco',
                          minLength: {
                            value: 3,
                            message:
                              'O id do cliente deve possuir 3 caracteres ou mais',
                          },
                        }}
                        render={({ field, fieldState }) => {
                          return (
                            <>
                              <input
                                {...field}
                                type="text"
                                className={classNames({
                                  'form-control': true,
                                  'is-valid':
                                    newCustomerForm.formState.isSubmitted &&
                                    !fieldState.error,
                                  'is-invalid':
                                    newCustomerForm.formState.isSubmitted &&
                                    fieldState.error,
                                })}
                                ref={field.ref}
                                placeholder="Digite o id do novo cliente"
                              />
                              {fieldState.error && (
                                <div className="text-danger">
                                  {fieldState.error.message}
                                </div>
                              )}
                            </>
                          );
                        }}
                      />
                    </div>
                    <div className="col-12 mt-3">
                      <Controller
                        control={newCustomerForm.control}
                        name="name"
                        rules={{
                          required:
                            'O nome do cliente não pode ficar em branco',
                          minLength: {
                            value: 3,
                            message:
                              'O nome do cliente deve possuir 3 caracteres ou mais',
                          },
                        }}
                        render={({ field, fieldState }) => {
                          return (
                            <>
                              <input
                                {...field}
                                type="text"
                                className={classNames({
                                  'form-control': true,
                                  'is-valid':
                                    newCustomerForm.formState.isSubmitted &&
                                    !fieldState.error,
                                  'is-invalid':
                                    newCustomerForm.formState.isSubmitted &&
                                    fieldState.error,
                                })}
                                ref={field.ref}
                                placeholder="Digite o nome do novo cliente"
                              />
                              {fieldState.error && (
                                <div className="text-danger">
                                  {fieldState.error.message}
                                </div>
                              )}
                            </>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 text-danger">{}</div>
                  </div>
                  <div className="row">
                    <div className="col-12 mt-3 d-flex align-items-center justify-content-end">
                      {newCustomerForm.formState.isSubmitting && (
                        <div className="spinner-border text-info" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                      <button
                        type="button"
                        className="btn btn-danger ms-3"
                        onClick={onCancelNewCustomerForm}
                        disabled={newCustomerForm.formState.isSubmitting}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary ms-3"
                        disabled={newCustomerForm.formState.isSubmitting}
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Formulário para solicitar estimativa de viagem */}
      <form onSubmit={rideForm.handleSubmit(onRequestRide)}>
        <div className="container mb-4">
          <div className="row">
            <div className="col-12">
              <div className="container form-container p-3">
                <div className="row">
                  <div className="col-12">
                    <label>Selecione o cliente:</label>
                    <Controller
                      control={rideForm.control}
                      name="customerId"
                      rules={{
                        required: 'É necessário selecionar um cliente',
                      }}
                      render={({ field, fieldState }) => {
                        return (
                          <>
                            <select
                              {...field}
                              className={classNames({
                                'form-select': true,
                                'is-valid':
                                  rideForm.formState.isSubmitted &&
                                  !rideForm.formState.isValid &&
                                  fieldState.error === undefined,
                                'is-invalid':
                                  rideForm.formState.isSubmitted &&
                                  fieldState.error !== undefined,
                              })}
                              ref={field.ref}
                            >
                              <option value="">-</option>
                              {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                  {customer.name}
                                </option>
                              ))}
                            </select>
                            {fieldState.error && (
                              <div className="text-danger">
                                {fieldState.error.message}
                              </div>
                            )}
                          </>
                        );
                      }}
                    />
                  </div>

                  <div className="col-12 mt-3">
                    <label>Informe o local de origem:</label>
                    <Controller
                      control={rideForm.control}
                      name="origin"
                      rules={{
                        required: 'O local de origem não pode ficar em branco',
                        minLength: {
                          value: 3,
                          message:
                            'O local de origem deve possuir 3 caracteres ou mais',
                        },
                      }}
                      render={({ field, fieldState, formState }) => {
                        return (
                          <AutoCompleteAddress
                            field={field}
                            fieldState={fieldState}
                            formState={formState}
                            fieldName="origin"
                            setValue={rideForm.setValue}
                          />
                        );
                      }}
                    />
                    {rideForm.formState.isSubmitted &&
                    rideForm.formState.errors.origin ? (
                      <div className="text-danger">
                        {rideForm.formState.errors.origin.message}
                      </div>
                    ) : null}
                  </div>

                  <div className="col-12 mt-3">
                    <label>Selecione o local de destino:</label>
                    <Controller
                      control={rideForm.control}
                      name="destination"
                      rules={{
                        required: 'O local de destino não pode ficar em branco',
                        minLength: {
                          value: 3,
                          message:
                            'O local de destino deve possuir 3 caracteres ou mais',
                        },
                      }}
                      render={({ field, fieldState, formState }) => {
                        return (
                          <AutoCompleteAddress
                            field={field}
                            fieldState={fieldState}
                            formState={formState}
                            fieldName="destination"
                            setValue={rideForm.setValue}
                          />
                        );
                      }}
                    />
                    {rideForm.formState.isSubmitted &&
                    rideForm.formState.errors.destination ? (
                      <div className="text-danger">
                        {rideForm.formState.errors.destination.message}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 mt-3 d-flex align-items-center justify-content-end">
                    {rideForm.formState.isSubmitting && (
                      <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                    <button
                      className="btn btn-primary ms-3"
                      disabled={rideForm.formState.isSubmitting}
                    >
                      Solicitar Estimativa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { Home };
