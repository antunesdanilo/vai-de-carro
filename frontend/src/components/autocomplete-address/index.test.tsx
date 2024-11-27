import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { AutoCompleteAddress } from './index';
import { MapsApiProvider } from '../../providers/maps-api.provider';

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

  it('should call getPredictions mock directly', async () => {
    const instance = new MapsApiProvider();
    const spy = jest.spyOn(instance, 'getPredictions');

    await instance.getPredictions('Rua A');
    expect(spy).toHaveBeenCalledWith('Rua A');
  });

  it('should render the input field correctly', () => {
    render(<AutoCompleteAddress {...defaultProps} />);
    expect(screen.getByTestId('keyword-input')).toBeInTheDocument();
  });

  it('should update keyword on input change', () => {
    render(<AutoCompleteAddress {...defaultProps} />);
    const input = screen.getByTestId('keyword-input');
    fireEvent.change(input, { target: { value: 'Rua A' } });
    expect(input).toHaveValue('Rua A');
  });

  it('should fetch predictions after typing', async () => {
    jest.useFakeTimers();

    render(<AutoCompleteAddress {...defaultProps} />);

    const input = screen.getByTestId('keyword-input');

    fireEvent.change(input, { target: { value: 'Rua A' } });
    fireEvent.focus(input);

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      const list = screen.getByTestId('predictions-list');
      expect(list).toBeInTheDocument();

      const items = list.querySelectorAll('li');

      expect(items.length).toBe(2);
      expect(items[0].textContent).toBe('Rua A, Cidade B');
    });

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should update value and close predictions on selection', async () => {
    jest.useFakeTimers();

    render(<AutoCompleteAddress {...defaultProps} />);
    const input = screen.getByTestId('keyword-input');

    fireEvent.change(input, { target: { value: 'Rua A' } });
    fireEvent.focus(input);

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      const list = screen.getByTestId('predictions-list');
      expect(list).toBeInTheDocument();

      const prediction = within(list).getByText('Rua A, Cidade B');

      fireEvent.click(prediction);

      fireEvent.blur(input);

      jest.advanceTimersByTime(300);

      expect(input).toHaveValue('Rua A, Cidade B');
    });

    await waitFor(() => {
      console.log('passou aqui');
      expect(screen.queryByTestId('predictions-list')).not.toBeInTheDocument();
    });
  });
});
