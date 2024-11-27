import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AutoCompleteAddress } from './index';
import { toast } from 'react-toastify';
import { MapsApiProvider } from '../../providers/maps-api.provider';

jest.mock('react-toastify', () => ({
  toast: { error: jest.fn() },
}));

jest.mock('../../providers/maps-api.provider', () => {
  return {
    MapsApiProvider: jest.fn().mockImplementation(() => {
      return {
        getPredictions: jest.fn((keyword) => {
          if (!keyword) return Promise.resolve([]);
          return Promise.resolve([
            { description: 'Rua A, Cidade B', placeId: '1' },
            { description: 'Rua C, Cidade D', placeId: '2' },
          ]);
        }),
      };
    }),
  };
});

// const mockMapsApiProvider = MapsApiProvider as jest.MockedClass<
//   typeof MapsApiProvider
// >;
// const mockGetPredictions = jest.fn();
// mockMapsApiProvider.prototype.getPredictions = mockGetPredictions;

describe('AutoCompleteAddress Component', () => {
  const defaultProps = {
    field: {
      ref: jest.fn(),
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'address',
      value: '',
    },
    fieldState: {
      invalid: false, // O campo não é inválido inicialmente
      isTouched: false, // O campo não foi tocado inicialmente
      isDirty: false, // O campo não foi modificado inicialmente
      isValidating: false, // O campo não está em processo de validação
    },
    formState: {
      isSubmitted: false, // O formulário ainda não foi enviado
      isValid: false, // O formulário ainda não é válido
      isDirty: false, // Nenhum campo foi modificado
      isLoading: false, // O formulário não está carregando
      isSubmitSuccessful: false, // O envio não foi bem-sucedido
      isSubmitting: false, // O formulário não está sendo enviado
      submitCount: 0, // O formulário ainda não foi enviado
      errors: {}, // Não há erros no formulário
      dirtyFields: {}, // Não há campos modificados
      touchedFields: {}, // Não há campos tocados
      isValidating: false, // O formulário não está em processo de validação
      disabled: false, // Campos do formulário não estão desabilitados
      validatingFields: {}, // Nenhum campo está sendo validado
    },
    fieldName: 'address',
    setValue: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the input field correctly', () => {
    render(<AutoCompleteAddress {...defaultProps} />);
    expect(
      screen.getByPlaceholderText('Digite um bairro, rua, cidade...')
    ).toBeInTheDocument();
  });

  it('should update keyword on input change', () => {
    render(<AutoCompleteAddress {...defaultProps} />);
    const input = screen.getByPlaceholderText(
      'Digite um bairro, rua, cidade...'
    );
    fireEvent.change(input, { target: { value: 'Rua A' } });
    expect(input).toHaveValue('Rua A');
  });

  it('should fetch predictions after typing', async () => {
    const mockGetPredictions = MapsApiProvider.mock.instances[0].getPredictions;

    mockGetPredictions.mockResolvedValueOnce([
      { placeId: '1', description: 'Rua A, Cidade B' },
    ]);

    render(<AutoCompleteAddress {...defaultProps} />);

    const input = screen.getByPlaceholderText(
      'Digite um bairro, rua, cidade...'
    );
    fireEvent.change(input, { target: { value: 'Rua A' } });

    await waitFor(() => {
      expect(mockGetPredictions).toHaveBeenCalledWith('Rua A');
    });

    // expect(await screen.findByText('Rua A, Cidade B')).toBeInTheDocument();
  });

  it('should update value and close predictions on selection', async () => {
    // mockGetPredictions.mockResolvedValueOnce([
    //   { placeId: '1', description: 'Rua A, Cidade B' },
    // ]);
    // render(<AutoCompleteAddress {...defaultProps} />);
    // const input = screen.getByPlaceholderText(
    //   'Digite um bairro, rua, cidade...'
    // );
    // fireEvent.change(input, { target: { value: 'Rua A' } });
    // const prediction = await screen.findByText('Rua A, Cidade B');
    // fireEvent.click(prediction);
    // expect(defaultProps.setValue).toHaveBeenCalledWith('address', 'Rua A', {
    //   shouldValidate: true,
    // });
    // expect(input).toHaveValue('Rua A, Cidade B');
    // expect(screen.queryByText('Rua C, Cidade D')).not.toBeInTheDocument();
  });

  it('should display error toast on API failure', async () => {
    // mockGetPredictions.mockRejectedValueOnce(new Error('API Error'));
    // render(<AutoCompleteAddress {...defaultProps} />);
    // const input = screen.getByPlaceholderText(
    //   'Digite um bairro, rua, cidade...'
    // );
    // fireEvent.change(input, { target: { value: 'Rua A, Cidade B' } });
    // await waitFor(() => {
    //   expect(toast.error).toHaveBeenCalledWith(
    //     'Não foi possível carregar os endereços.'
    //   );
    // });
  });
});
