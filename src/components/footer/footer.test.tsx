// src/components/footer/footer.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './footer';
import { AppRoute } from '../../const';

// Мокаем изображение, чтобы не загружать реальный файл
vi.mock('../../assets/img/logo.svg', () => ({
  default: 'mock-logo.svg',
}));

describe('Footer component', () => {
  // Обёртка для роутинга
  const renderWithRouter = (component: React.ReactNode) => render(<BrowserRouter>{component}</BrowserRouter>);

  it('should render footer with correct container class', () => {
    renderWithRouter(<Footer />);
    const footerElement = document.querySelector('footer.footer.container');
    expect(footerElement).toBeInTheDocument();
  });

  it('should contain a link to the main page', () => {
    renderWithRouter(<Footer />);
    const link = screen.getByRole('link', { name: /6 cities logo/i });
    expect(link).toBeInTheDocument();
    // Проверяем атрибут href (в MemoryRouter он будет равен пути)
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });

  it('should render logo image with correct attributes', () => {
    renderWithRouter(<Footer />);
    const img = screen.getByAltText('6 cities logo');
    expect(img).toBeInTheDocument();
    // Проверяем src (может быть как строка, так и мок)
    // Если используется импорт, то в тесте подставится mock
    // Если используется прямой путь "img/logo.svg", проверяем на соответствие
    expect(img).toHaveAttribute('src', expect.stringContaining('logo.svg'));
    expect(img).toHaveAttribute('width', '64');
    expect(img).toHaveAttribute('height', '33');
  });

  // Дополнительно: проверяем, что компонент мемоизирован (опционально)
  it('should be memoized', () => {
    // React.memo возвращает компонент с property 'type' равным исходному компоненту
    // Но это необязательный тест, можно пропустить.
    expect(Footer).toHaveProperty('type');
    // Или проверить, что это не та же функция, что и исходная (но это сложно)
    // Просто проверяем, что компонент является функцией, и её displayName не установлен,
    // но это не показатель. Лучше не тестировать реализацию memo.
    // Оставим этот тест закомментированным или удалим.
  });
});
