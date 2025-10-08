import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExportCSV } from '../components/utilityFolder/csvUtility';

test('ExportCSV download button present and calls createObjectURL', () => {
  const originalCreate = URL.createObjectURL;
  const originalRevoke = URL.revokeObjectURL;
  URL.createObjectURL = jest.fn(() => 'blob:url');
  URL.revokeObjectURL = jest.fn();

  const expenses = [{ id: '1', amount: 100, description: 't', category: 'c' }];
  render(<ExportCSV expenses={expenses} />);
  fireEvent.click(screen.getByText(/download csv/i));
  expect(URL.createObjectURL).toHaveBeenCalled();
  expect(URL.revokeObjectURL).toHaveBeenCalled();

  URL.createObjectURL = originalCreate;
  URL.revokeObjectURL = originalRevoke;
});