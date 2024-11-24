import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  PathValue,
  UseFormSetValue,
  UseFormStateReturn,
} from 'react-hook-form';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { MapsApiProvider } from '../../providers/interfaces/maps-api.provider';
import { GoogleMapsApiProvider } from '../../providers/google-maps-api.provider';
import { MapsApiPredictionDto } from '../../providers/dtos/maps-api-prediction.dto';
import { toast } from 'react-toastify';
import './index.scss';

interface AutoCompleteAddressProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
  fieldName: string;
  setValue: UseFormSetValue<TFieldValues>;
}

const mapsApiProvider: MapsApiProvider = new GoogleMapsApiProvider();

const AutoCompleteAddress = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  fieldState,
  formState,
  fieldName,
  setValue,
}: AutoCompleteAddressProps<TFieldValues, TName>) => {
  const [keyword, setKeyword] = useState<string>('');
  const [predictions, setPredictions] = useState<MapsApiPredictionDto[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      setTypingTimeout(null);
    }

    if (keyword.length > 2) {
      const timeout = setTimeout(() => {
        mapsApiProvider
          .getPredictions(keyword)
          .then((predictions: MapsApiPredictionDto[]) => {
            setPredictions(predictions);
          })
          .catch(() => {
            toast.error('Não foi possível carregar os endereços.');
          });
      }, 1000);

      setTypingTimeout(timeout);
    } else {
      setPredictions([]);
    }

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [keyword]);

  const handleSelect = (prediction: MapsApiPredictionDto) => {
    setKeyword(prediction.description);
    updateValue(prediction.description);
  };

  const updateValue = (value: string) => {
    setValue(fieldName as TName, value as PathValue<TFieldValues, TName>, {
      shouldValidate: true,
    });
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        className={classNames({
          'form-control': true,
          'is-valid':
            formState.isSubmitted && !formState.isValid && !fieldState.error,
          'is-invalid': formState.isSubmitted && fieldState.error,
        })}
        ref={field.ref}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        autoComplete="off"
        placeholder="Digite um bairro, rua, cidade..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={() => updateValue('')}
      />

      {predictions.length && isFocused ? (
        <ul className="predictions-container mt-2">
          {predictions.map((prediction) => (
            <li
              key={prediction.placeId}
              onClick={() => handleSelect(prediction)}
            >
              {prediction.description}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export { AutoCompleteAddress };
