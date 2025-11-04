import 'jasmine';
import { configure } from '@testing-library/react';

// Configurar testing-library
configure({ testIdAttribute: 'data-testid' });

// Mock de console para evitar warnings en tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};

// Configuración global de Jasmine
beforeEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

// Helpers globales para tests
window.testHelpers = {
  flushPromises: () => new Promise(resolve => setImmediate(resolve)),
  
  waitFor: (condition, timeout = 3000) => {
    return new Promise((resolve, reject) => {
      const interval = 100;
      let elapsed = 0;
      
      const check = () => {
        if (condition()) {
          resolve();
        } else if (elapsed >= timeout) {
          reject(new Error('Timeout waiting for condition'));
        } else {
          elapsed += interval;
          setTimeout(check, interval);
        }
      };
      
      check();
    });
  }
};