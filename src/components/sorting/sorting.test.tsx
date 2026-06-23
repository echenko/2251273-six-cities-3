import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sorting } from './sorting';
import { PLACES_OPTIONS } from '../../const';
import { getPlacesOptionsLabel } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeSorting } from '../../store/action';
import { getSelectedSorting } from '../../store/selectors/sorting-slice';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Мокаем хуки
vi.mock('../../hooks/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

// Мокаем действие
vi.mock('../../store/action', () => ({
  changeSorting: vi.fn(),
}));

// Мокаем селектор
vi.mock('../../store/selectors/sorting-slice', () => ({
  getSelectedSorting: vi.fn(),
}));

// Мокаем утилиту
vi.mock('../../utils', () => ({
  getPlacesOptionsLabel: vi.fn(),
}));

// Мокаем константы, но можно использовать реальные, если они есть. Для простоты замокаем.
vi.mock('../../const', () => ({
  PLACES_OPTIONS: [
    { value: 'popular', label: 'Popular' },
    { value: 'priceLow', label: 'Price: low to high' },
    { value: 'priceHigh', label: 'Price: high to low' },
    { value: 'topRated', label: 'Top rated first' },
  ],
}));

describe('Sorting component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Устанавливаем мок для useAppDispatch
    (useAppDispatch as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockDispatch);
    // Устанавливаем мок для useAppSelector - возвращаем текущую сортировку
    (useAppSelector as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) => {
      if (selector === getSelectedSorting) {
        return 'popular';
      }
      return undefined;
    });
    // Мокаем getPlacesOptionsLabel - возвращаем метку для значения
    (getPlacesOptionsLabel as unknown as ReturnType<typeof vi.fn>).mockImplementation((value) => {
      const option = PLACES_OPTIONS.find((opt) => opt.value === value);
      return option ? option.label : '';
    });
  });

  it('should render correctly with initial sorting', () => {
    render(<Sorting />);
    // Проверяем, что отображается текущая сортировка (популярные)
    expect(screen.getByText('Sort by')).toBeInTheDocument();

    // Список опций не открыт по умолчанию
    const optionsList = screen.getByRole('list');
    expect(optionsList).not.toHaveClass('places__options--opened');
    // Проверяем, что все опции отображаются

    // Активный пункт - popular
    const activeOption = optionsList.querySelector('.places__option--active');
    expect(activeOption).toBeInTheDocument();
    expect(activeOption).toHaveTextContent('Popular');
  });

  it('should toggle options list when clicking on sorting type', async () => {
    const user = userEvent.setup();
    render(<Sorting />);
    const sortingType = screen.getByTestId('sorting-type');
    // Изначально список закрыт
    const optionsList = screen.getByRole('list');
    expect(optionsList).not.toHaveClass('places__options--opened');
    // Кликаем
    await user.click(sortingType);
    expect(optionsList).toHaveClass('places__options--opened');
    // Кликаем снова
    await user.click(sortingType);
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('should dispatch changeSorting and close list when option is clicked', async () => {
    const user = userEvent.setup();
    render(<Sorting />);
    // Открываем список
    const sortingType = screen.getByTestId('sorting-type');
    await user.click(sortingType);
    const optionsList = screen.getByRole('list');
    expect(optionsList).toHaveClass('places__options--opened');
    // Нажимаем на опцию "Price: low to high"
    const option = screen.getByText('Price: low to high');
    await user.click(option);
    // Проверяем, что диспатч вызван с правильным значением
    expect(mockDispatch).toHaveBeenCalledWith(changeSorting('priceLow'));
    // Список закрыт
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('should match snapshot', () => {
    const { container } = render(<Sorting />);
    expect(container).toMatchSnapshot();
  });
});
