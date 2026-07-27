import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ServiceNowDataErasureBlog from '../../../components/blog/ServiceNowDataErasureBlog';

import { vi } from 'vitest';

vi.mock('../../../components/Reveal', () => {
  return {
    default: function DummyReveal({ children }: { children: React.ReactNode }) {
      return <div>{children}</div>;
    }
  };
});

vi.mock('../../../components/SEOHead', () => {
  return {
    default: function DummySEOHead() {
      return <div data-testid="seo-head-mock" />;
    }
  };
});

describe('ServiceNowDataErasureBlog Component', () => {
  const renderComponent = () => {
    return render(
      <HelmetProvider>
        <BrowserRouter>
          <ServiceNowDataErasureBlog />
        </BrowserRouter>
      </HelmetProvider>
    );
  };

  it('renders the blog component without crashing', () => {
    renderComponent();
    expect(screen.getByText(/How to Integrate Data Erasure with ServiceNow and ITAM Workflows/i)).toBeInTheDocument();
  });

  it('includes the SEOHead component', () => {
    renderComponent();
    expect(screen.getByTestId('seo-head-mock')).toBeInTheDocument();
  });

  it('renders the workflow diagram sections', () => {
    renderComponent();
    expect(screen.getAllByText(/The ITAM Erasure Workflow/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Request/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Sanitization/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Evidence/i)[0]).toBeInTheDocument();
  });

  it('renders the call to action button', () => {
    renderComponent();
    const ctaButton = screen.getByRole('link', { name: /Request an Enterprise Trial/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/free-trial');
  });
});
